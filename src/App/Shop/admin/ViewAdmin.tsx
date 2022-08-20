import { None, propertyOf } from "App/tool";
import { useState } from "react";
import { LMR } from "tonwa-com";
import { UserUnit } from "tonwa-uq";
import { ListEdit, ListEditContext } from "tonwa-uq-com";
import { ButtonAddUser, OnUserChanged } from "../ButtonAddUser";
import { Me } from "../Me";
import { ViewUser } from "../ViewUser";

export function ViewAdmin({ me, userUnits, onUserChanged }: { me: number; userUnits: UserUnit[]; onUserChanged: OnUserChanged; }) {
    let listEditContext = new ListEditContext<UserUnit>(userUnits, propertyOf<UserUnit>('unit'));

    function ItemView({ value }: { value: UserUnit }) {
        let [userUnit, setUserUnit] = useState(value);
        async function onAssignChanged(assigned: string) {
            setUserUnit({ ...value, assigned });
        }
        if (value.user === me) return <Me />;
        return <div className="px-3 py-2">
            <ViewUser user={userUnit} onAssignChanged={onAssignChanged} pageHeader={"管理员"} />
        </div>;
    }

    return <>
        <div className="card mt-3 mx-1">
            <div className="card-header pe-0 py-0">
                <LMR className="align-items-center">
                    <span>管理员</span>
                    <ButtonAddUser admin="admin" onUserChanged={onUserChanged} />
                </LMR>
            </div>
            <ListEdit context={listEditContext} none={<None />} ItemView={ItemView} />
        </div>
        <ul className="small text-muted mt-2 mb-5 mx-3">
            <li>管理员可以给用户赋予角色</li>
            <li>管理员拥有全部角色权限</li>
        </ul>
    </>;
}
