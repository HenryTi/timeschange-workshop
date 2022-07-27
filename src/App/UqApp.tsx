import { useContext, useRef } from 'react';
import { NavigateFunction } from "react-router-dom";
import { AppConfig, AutoRefresh, UqAppBase, UqAppBaseView, UqAppContext } from "tonwa-uq-com";
import { UqConfig } from 'tonwa-uq';
import { UQs, uqsSchema } from "uqs";
import { Role } from "uqs/BzWorkshop";
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
        if (this.uqs) {
            //let poked = () => this.uqs.BzWorkshop.$poked.query(undefined, undefined, false);
            await Promise.all([this.loadIsMeAdmin(), this.loadMeRoles()]);
            //await this.loadMeRoles();
            let autoLoader: Promise<any> = undefined;
            this.autoRefresh = new AutoRefresh(this.uqs.BzWorkshop, autoLoader);
            this.autoRefresh.start();
        }
    }

    isRole(roles: Role[]): boolean {
        if (roles === undefined) return false;
        //await this.loadMeRoles();
        for (let r of roles) {
            if (this.meRoles[r] !== undefined) return true;
        }
        return false;
    }

    isAdminOrRole(roles: Role[]): boolean {
        if (this.meAdmin === true) return true;
        return this.isRole(roles);
    }

    isPersonMe(person: number): boolean {
        for (let i in this.meRoles) {
            if (person === this.meRoles[Number(i) as Role]) return true;
        }
        return false;
    }

    private async loadIsMeAdmin(): Promise<void> {
        if (this.meAdmin === undefined) {
            this.meAdmin = await this.uqs.BzWorkshop.AdminIsMe();
        }
    }

    private async loadMeRoles(): Promise<void> {
        if (this.meRoles === undefined) {
            let { BzWorkshop } = this.uqs;
            let ret = await BzWorkshop.IX<{ ix: number; type: string; value: string; }>({
                IX: BzWorkshop.IxUserPerson,
                IX1: BzWorkshop.IxPersonRole,
                ix: undefined,
            });
            this.meRoles = this.buildRoles(ret as any);
        }
    }

    private buildRoles(typeValues: { type: string; value: string }[]): Roles {
        let { BzWorkshop } = this.uqs;
        let roles: Roles = {} as Roles;
        for (let row of typeValues) {
            let { type, value } = row;
            let v = BzWorkshop.IDValue(type, value);
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
    center: 'https://dev.tonwa.ca',
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
    let { current: uqApp } = useRef(new UqApp(appConfig, uqConfigs, uqsSchema));
    return <UqAppBaseView uqApp={uqApp}>
        <AppRoutes />
    </UqAppBaseView>
}

export function useUqApp() {
    return useContext<UqApp>(UqAppContext);
}
