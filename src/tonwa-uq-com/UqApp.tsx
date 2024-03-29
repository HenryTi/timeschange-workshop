import React, { ReactNode, useContext, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AppNav, useEffectOnce } from 'tonwa-com';
import { Guest, LocalDb, NetProps, UqConfig, User, UserApi } from 'tonwa-uq';
import { createUQsMan, Net, Hosts, UqUnit, Uq, UserUnit } from "tonwa-uq";
import { env, LocalData } from 'tonwa-com';
import { proxy, useSnapshot } from 'valtio';
import { Spinner } from 'tonwa-com';
import { AppNavContext } from 'tonwa-com';
import { StackContainer } from 'tonwa-com';
import { uqsProxy } from './uq-old';
import jwtDecode from 'jwt-decode';
import { AutoRefresh } from './AutoRefresh';

export interface AppConfig { //extends UqsConfig {
    center: string;
    debug: Hosts;
    version: string;        // 版本变化，缓存的uqs才会重载
    loginTop?: JSX.Element;
    oem?: string;               // 用户注册发送验证码的oem厂家，默认同花
    privacy?: string;
    noUnit?: boolean;			// app的运行，不跟unit绑定
    htmlTitle?: string;
}

let uqAppId = 1;
export abstract class UqApp<U = any> {
    private readonly appConfig: AppConfig;
    private readonly uqConfigs: UqConfig[];
    private readonly uqsSchema: { [uq: string]: any; };
    private localData: LocalData;
    readonly uqAppBaseId: number;
    readonly net: Net;
    readonly appNav: AppNav;
    readonly userApi: UserApi;
    readonly version: string;    // version in appConfig;
    readonly responsive: {
        user: User;
    }
    guest: number;
    uqs: U;
    uq: Uq;
    uqUnit: UqUnit;

    constructor(appConfig: AppConfig, uqConfigs: UqConfig[], uqsSchema: { [uq: string]: any; }) {
        this.uqAppBaseId = uqAppId++;
        this.appConfig = appConfig;
        this.uqConfigs = uqConfigs;
        this.uqsSchema = uqsSchema;
        this.version = appConfig.version;
        this.responsive = proxy({
            user: undefined,
        });
        let props: NetProps = {
            center: appConfig.center,
            debug: appConfig.debug,
            unit: env.unit,
            testing: env.testing,
            localDb: new LocalStorageDb(),
            createObservableMap: () => new Map(), //new ObservableMap(),
        }
        this.net = new Net(props);
        this.localData = new LocalData();

        this.appNav = new AppNav();
        this.userApi = this.net.userApi;
    }

    protected abstract get defaultUq(): Uq;
    setCurrentUnit(userUnit: UserUnit) {
        this.uqUnit.setCurrentUnit(userUnit);
    }
    get userUnit() { return this.uqUnit.userUnit; }
    get me() { return this.responsive.user?.id; }

    async logined(user: User) {
        this.net.logoutApis();
        this.responsive.user = user;
        // this.uqUnit?.reset();
        let autoLoader: Promise<any> = undefined;
        let autoRefresh = new AutoRefresh(this, autoLoader);
        if (user) {
            jwtDecode(user.token);
            this.net.setCenterToken(user.id, user.token);

            if (this.uq !== undefined) {
                this.uqUnit = new UqUnit(this.uq as any);
                await this.uqUnit.loadMyRoles()
                autoRefresh.start();
            }
            this.appNav.onLogined(true);
        }
        else {
            this.net.clearCenterToken();
            this.uqUnit = undefined;
            autoRefresh.stop();
            this.appNav.onLogined(false);
        }
        this.localData.user.set(user);
    }

    async setUserProp(propName: string, value: any) {
        await this.userApi.userSetProp(propName, value);
        let { user } = this.responsive;
        (user as any)[propName] = value;
        this.localData.user.set(user);
    }

    saveLocalData() {
        this.localData.saveToLocalStorage();
    }
    /*
    protected onInited(): Promise<void> {
        return;
    }
    */

    //private uqsUserId: number = -1;
    private initCalled = false;
    initErrors: string[];
    init(initPage: React.ReactNode, navigateFunc: NavigateFunction): void {
        this.appNav.init(initPage, navigateFunc);
    }
    async load(): Promise<void> {
        if (this.initCalled === true) return;
        this.initCalled = true;
        //if (this.responsive.user?.id === this.uqsUserId) return;
        await this.net.init();
        try {
            let uqsMan = await createUQsMan(this.net, this.appConfig.version, this.uqConfigs, this.uqsSchema);
            this.uqs = uqsProxy(uqsMan) as U;
            //await this.onInited();

            if (this.uqs) {
                this.uq = this.defaultUq;
            }
            let user = this.localData.user.get();
            await this.logined(user);
            if (!user) {
                let guest: Guest = this.localData.guest.get();
                if (guest === undefined) {
                    guest = await this.net.userApi.guest();
                }
                if (!guest) {
                    debugger;
                    throw Error('guest can not be undefined');
                }
                this.net.setCenterToken(0, guest.token);
                this.localData.guest.set(guest);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}

class LocalStorageDb extends LocalDb {
    getItem(key: string): string {
        return localStorage.getItem(key);
    }
    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}

export const UqAppContext = React.createContext(undefined);
export function useUqAppBase<U, T extends UqApp<U> = UqApp<U>>() {
    return useContext<T>(UqAppContext);
}

export function UqAppView({ uqApp, children }: { uqApp: UqApp; children: ReactNode; }) {
    let { appNav, responsive } = uqApp;
    let [appInited, setAppInited] = useState<boolean>(false);
    let { stack } = useSnapshot(appNav.data);
    let { user } = useSnapshot(responsive);
    useEffectOnce(() => {
        (async function () {
            await uqApp.load();
            setAppInited(true);
        })();
    }/*, [uqApp, children, navigateFunc]*/);
    let navigateFunc = useNavigate();
    appNav.init(children, navigateFunc);
    if (appInited === false) {
        return <div className="p-5 text-center">
            <Spinner className="text-info" />
        </div>;
    }
    if (uqApp.initErrors) {
        return <div>
            <div>uq app start failed. init errors: </div>
            <ul className="text-danger">
                {
                    uqApp.initErrors.map((v, index) => <li key={index}>{v}</li>)
                }
            </ul>
        </div>;
    }
    return <UqAppContext.Provider value={uqApp}>
        <AppNavContext.Provider value={appNav}>
            <StackContainer stackItems={stack} />
            {user !== undefined}
        </AppNavContext.Provider>
    </UqAppContext.Provider>;
}
