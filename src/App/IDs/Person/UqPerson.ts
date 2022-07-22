import { proxy } from "valtio";
import { ID } from "tonwa-uq";
import { Role, Person } from "uqs/BzWorkshop";
import { BzWorkshop } from "uqs";
import { UqApp, useUqApp } from "App/UqApp";
import { useRef } from "react";

export interface MPerson extends Person {
    user: number;
    role: Role;
}

export class UqPerson {
    private readonly role: Role;
    readonly uq: BzWorkshop.UqExt;
    readonly ID: ID;
    initNO: string;

    readonly state: {
        currentItem: any;
        items: any[];
    };

    constructor(uqApp: UqApp, role: Role) {
        this.role = role;
        this.uq = uqApp.uqs.BzWorkshop;
        this.ID = uqApp.uqs.BzWorkshop.Person;

        this.state = proxy({
            currentItem: undefined,
            items: undefined,
        });
    }

    async savePropValue(propName: string, value: string) {
        let { currentItem } = this.state;
        await this.uq.ActIDProp(this.ID, currentItem.id, propName, value);
        currentItem[propName] = value;
    }

    async newIDNO() {
        this.initNO = await this.uq.IDNO({ ID: this.ID });
    }

    async loadList(): Promise<MPerson[]> {
        let result = await this.uq.GetPersonList.query({ role: this.role });
        let { ret, roles: retRoles } = result;
        let mPerson: MPerson;
        for (let row of ret) {
            let { id } = row;
            mPerson = row as any;
            for (let r of retRoles) {
                let { person, role } = r;
                if (person !== id) continue;
                if (role === this.role) continue;
                mPerson.role = role as Role;
            }
        }
        return ret as MPerson[];
    }

    async removeBoundUser() {
        let { currentItem } = this.state;
        await this.uq.ActIX({
            IX: this.uq.IxUserPerson,
            values: [
                { ix: currentItem.user, xi: -currentItem.id }
            ]
        })
        currentItem.user = undefined;
    }
}

export function useUqPerson(role: Role) {
    let app = useUqApp();
    let ret = useRef(new UqPerson(app, role));
    return ret.current;
};
