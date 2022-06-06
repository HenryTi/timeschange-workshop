import { useContext, useRef } from 'react';
import { NavigateFunction } from "react-router-dom";
import { AppConfig, AutoRefresh, UqAppBase, UqAppBaseView, UqAppContext } from "tonwa-uq-com";
import { UqConfig } from 'tonwa-uq';
import { UQs } from "uqs";
import { Role } from "uqs/JksWarehouse";
//import { AppRoutes } from './AppWithTabs';
import { AppRoutes } from './AppWithPageStack';
import uqconfigJson from '../uqconfig.json';

type Roles = { [role in Role]: number };

export class UqApp extends UqAppBase<UQs> {
    private autoRefresh: AutoRefresh;
    private meAdmin: boolean;
    private meRoles: Roles;

    async init(initPage: React.ReactNode, navigateFunc: NavigateFunction): Promise<any> {
        await super.init(initPage, navigateFunc);
        let poked = () => this.uqs.JksWarehouse.$poked.query(undefined, undefined, false);
        let autoLoader: Promise<any> = undefined;
        this.autoRefresh = new AutoRefresh(poked, autoLoader);
        this.autoRefresh.start();
    }

    async getIsRole(roles: Role[]): Promise<boolean> {
        if (roles === undefined) return false;
        await this.loadMeRoles();
        for (let r of roles) {
            if (this.meRoles[r] !== undefined) return true;
        }
        return false;
    }

    async getIsAdminOrRole(roles: Role[]): Promise<boolean> {
        let promises = [this.loadIsMeAdmin()];
        if (roles) promises.push(this.loadMeRoles());
        await Promise.all([this.loadMeRoles(), this.loadIsMeAdmin()]);
        if (this.meAdmin === true) return true;
        return await this.getIsRole(roles);
    }

    async getIsPersonMe(person: number): Promise<boolean> {
        await this.loadMeRoles();
        for (let i in this.meRoles) {
            if (person === this.meRoles[Number(i) as Role]) return true;
        }
        return false;
    }

    private async loadIsMeAdmin(): Promise<void> {
        if (this.meAdmin === undefined) {
            this.meAdmin = await this.uqs.JksWarehouse.AdminIsMe();
        }
    }

    private async loadMeRoles(): Promise<void> {
        if (this.meRoles === undefined) {
            let { JksWarehouse } = this.uqs;
            let ret = await JksWarehouse.IX<{ ix: number; type: string; value: string; }>({
                IX: JksWarehouse.IxUserPerson,
                IX1: JksWarehouse.IxPersonRole,
                ix: undefined,
            });
            this.meRoles = this.buildRoles(ret as any);
        }
    }

    private buildRoles(typeValues: { type: string; value: string }[]): Roles {
        let { JksWarehouse } = this.uqs;
        let roles: Roles = {} as Roles;
        for (let row of typeValues) {
            let { type, value } = row;
            let v = JksWarehouse.IDValue(type, value);
            switch (type) {
                case 'personrole':
                    let { person, role } = v as any;
                    roles[role as Role] = person;
                    break;
            }
        }
        return roles;
    }
}

const appConfig: AppConfig = {
    version: '0.1.0',
    center: 'https://tv.jkchemical.com',
    debug: {
        center: 'localhost:3000',
        uq: 'localhost:3015',
        res: 'localhost:3015',
    },
    noUnit: true,
    oem: undefined,
    htmlTitle: 'Warehouse',
};
/*
const jksDev = {
    "name": "jksoft",
    "alias": "jks"
};

const uqConfigs: UqConfig[] = [
    {
        "dev": jksDev,
        "name": "warehouse",
        "alias": "Warehouse"
    },
];
*/
function uqConfigsFromJson(json: { devs: { [dev: string]: any }; uqs: any[]; }): UqConfig[] {
    let ret: UqConfig[] = [];
    let { devs, uqs } = json;
    for (let uq of uqs) {
        let { dev, name, alias } = uq;
        ret.push({
            dev: devs[dev],
            name,
            alias,
        });
    }
    return ret;
}

const uqConfigs = uqConfigsFromJson(uqconfigJson);

export function UqAppView() {
    let { current: uqApp } = useRef(new UqApp(appConfig, uqConfigs));
    return <UqAppBaseView uqApp={uqApp}>
        <AppRoutes />
    </UqAppBaseView>
}

export function useUqApp() {
    return useContext<UqApp>(UqAppContext);
}
