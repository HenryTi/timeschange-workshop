import { useUqApp } from "App/MyUqAppView";
import { None } from "App/tool";
import React, { ReactNode, useState } from "react";
import { LMR } from "tonwa-com";
import { UserUnit } from "tonwa-uq";
import { ListEdit, ListEditContext } from "tonwa-uq-com";
import { EnumRole, Enumshop } from "uqs/BzUShop";
import { ButtonAddUser, OnUserChanged } from "../ButtonAddUser";
import { roleItemLables } from "../roleItemLables";
import { ViewUser } from "../ViewUser";

export function ViewRoles({ roleItems, users }: { roleItems: string[], users: UserUnit[] }) {
    let uqApp = useUqApp();
    let listEditContext = new ListEditContext(users, (item1, item2) => item1.user === item2.user);

    function ItemView({ value }: { value: UserUnit }) {
        let { roles, isAdmin, isOwner, user } = value;
        let [userUnit, setUserUnit] = useState(value);
        if (user === uqApp.me) return null;
        function RoleCheck({ caption, roleItem }: { caption: string; roleItem: string; }) {
            async function onCheckChange(evt: React.ChangeEvent<HTMLInputElement>) {
                await uqApp.uqUnit.setUserRole(
                    value.user,
                    (evt.currentTarget.checked === true) ? 'add' : 'del',
                    roleItem
                );
            }
            let defaultChecked = roles?.findIndex(v => v === roleItem) >= 0;
            return <label className="me-5">
                <input type="checkbox" className="form-check-input"
                    onChange={onCheckChange}
                    defaultChecked={defaultChecked} />
                <span>{caption}</span>
            </label>;
        }
        async function onAssignChanged(assigned: string) {
            setUserUnit({ ...value, assigned });
        }
        function Checked({ children }: { children: ReactNode; }) {
            return <label className="me-5">
                <input type="checkbox" className="form-check-input" checked={true} disabled={true} />
                <span>{children}</span>
            </label>;
        }
        let vRoles = <div className="ms-5 mt-2 form-check form-check-inline">{isOwner === true ?
            <Checked>拥有者</Checked>
            : (
                isAdmin === true ?
                    <Checked>管理员</Checked>
                    :
                    roleItems.map(v => (<RoleCheck key={v} caption={roleItemLables[v as (EnumRole | Enumshop)]} roleItem={v} />))
            )
        }</div>;
        return <div className="px-3 py-2">
            <ViewUser user={userUnit} onAssignChanged={onAssignChanged} pageHeader="用户" />
            {vRoles}
        </div >;
    }
    const onUserChanged: OnUserChanged = async (user: number, action, admin) => {
        let assigned: string = undefined;
        let retUser = await uqApp.uqUnit.addUser(user, assigned);
        let { items } = listEditContext;
        let index = items.findIndex(v => v.user === user);
        if (index >= 0) {
            items.splice(index, 1);
        }
        listEditContext.setItems(
            [{
                ...retUser,
                id: 0,
                user,
                unit: 0,
                admin: 0
            } as any, ...items]
        );
    }
    return <>
        <div className="card mt-3 mx-1">
            <div className="card-header pe-0 py-0">
                <LMR className="align-items-center">
                    <span>用户</span>
                    <ButtonAddUser admin="user" onUserChanged={onUserChanged} />
                </LMR>
            </div>
            <ListEdit context={listEditContext} ItemView={ItemView} none={<None />} />
        </div>
    </>;
}
