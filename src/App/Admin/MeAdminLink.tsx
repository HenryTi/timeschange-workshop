import { AdminLink } from "tonwa-uq-com";
import { FA, LMR, useT } from "tonwa-com";
import { useUqApp } from "../UqApp";
import { appT } from '../res';
import { meT } from "./meRes";
import { useSnapshot } from "valtio";
import { ReactNode } from "react";
import { IconCommand } from "App/IconCommand";

export function MeAdminLink() {
    let uqApp = useUqApp();
    let { user } = useSnapshot(uqApp.responsive);
    const { uqs } = uqApp;
    const { JksWarehouse } = uqs;

    let loadAdmins = async (): Promise<any[]> => {
        let a = await JksWarehouse.sys.RoleMe();
        let ret = await JksWarehouse.AdminGetList();
        return ret;
    }

    let setMeAdmin = async (): Promise<void> => {
        await uqs.JksWarehouse.AdminSetMe();
    }

    let setAdmin = async (user: number, role: number, assigned: string): Promise<void> => {
        await uqs.JksWarehouse.AdminSet(user, role, assigned);
    }

    function MeAdminLinkContainer({ onClick, children }: { onClick: () => void; children: ReactNode; }) {
        return <div onClick={onClick}>
            {children}
        </div>;
    }

    let t = useT(meT, appT);
    return <AdminLink LinkContainer={MeAdminLinkContainer}
        me={user?.id} loadAdmins={loadAdmins} setMeAdmin={setMeAdmin} setAdmin={setAdmin}>
        <IconCommand caption={t('admin')} icon="cogs" iconClass="text-danger" onClick={undefined} />
    </AdminLink>;
}
