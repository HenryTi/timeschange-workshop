import { useContext, useRef } from 'react';
// import { NavigateFunction } from "react-router-dom";
import { AppConfig, UqApp, UqAppView, UqAppContext } from "tonwa-uq-com";
import { Uq, UqConfig } from 'tonwa-uq';
import { UQs, uqsSchema } from "uqs";
//import { AppRoutes } from './AppWithTabs';
import { AppRoutes } from './AppWithPageStack';
import uqconfigJson from '../uqconfig.json';

class MyUqApp extends UqApp<UQs> {
    protected get defaultUq(): Uq {
        return this.uqs.BzUShop;
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

export function MyUqAppView() {
    let { current: uqApp } = useRef(new MyUqApp(appConfig, uqConfigs, uqsSchema));
    return <UqAppView uqApp={uqApp}>
        <AppRoutes />
    </UqAppView>
}

export function useUqApp() {
    return useContext<UqApp>(UqAppContext);
}
