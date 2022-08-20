import { useUqApp } from "App/MyUqAppView";
import { useCallback, useState } from "react";
import { Page, useEffectOnce, Waiting } from "tonwa-com";
import { ViewAdmin } from "./admin/ViewAdmin";
import { OnUserChanged } from "./ButtonAddUser";
import { ViewOwner } from "./owner";
import { ViewRoles } from "./roles";
import { ViewUnit } from "./ViewUnit";

export function PageAdmin({ header }: {
    header: string;
}) {
    let uqApp = useUqApp();
    let [unitRoles, setUnitRoles] = useState(undefined);
    let loadUnitRoles = useCallback(async () => {
        let ret = await uqApp.uqUnit.loadUnitUsers();
        setUnitRoles(ret);
    }, [uqApp]);
    useEffectOnce(() => {
        loadUnitRoles();
    });
    if (unitRoles === undefined) return <Waiting />;

    let { entity, unit, isOwner, isAdmin } = uqApp.userUnit;
    let { owners, admins, users } = unitRoles;
    let roleItems = uqApp.uq.Role[unit === 0 ? '$' : entity];
    const onUserChanged: OnUserChanged = async (user, action, admin) => {
        await uqApp.uqUnit.addAdmin(user, admin === 'admin' ? 1 : 3, undefined);
        await loadUnitRoles();
    }
    let me = uqApp.responsive.user.id;
    return <Page header={header}>
        <div className="px-3 py-2 bg-light border-bottom">
            <ViewUnit unit={unit} entity={entity} />
        </div>
        {isOwner === true && <>
            <ViewOwner me={me} userUnits={owners} onUserChanged={onUserChanged} />
            <ViewAdmin me={me} userUnits={admins} onUserChanged={onUserChanged} />
        </>}
        {isAdmin === true && <ViewRoles roleItems={roleItems} users={users} />}
    </Page>;
}

