import { AdminLink } from "tonwa-uq-com";
import { useT } from "tonwa-com";
import { useUqApp } from "../UqApp";
import { appT } from '../res';
import { meT } from "./meRes";
import { useSnapshot } from "valtio";
import { ReactNode } from "react";
import { IconCommand } from "App/tool";

export function MeAdminLink() {
    let uqApp = useUqApp();
    let { user } = useSnapshot(uqApp.responsive);
    const { uqs } = uqApp;
    const { BzWorkshop } = uqs;

    let loadAdmins = async (): Promise<any[]> => {
        await BzWorkshop.sys.RoleMe();
        let ret = await BzWorkshop.AdminGetList();
        return ret;
    }

    let setMeAdmin = async (): Promise<void> => {
        await uqs.BzWorkshop.AdminSetMe();
    }

    let setAdmin = async (user: number, role: number, assigned: string): Promise<void> => {
        await uqs.BzWorkshop.AdminSet(user, role, assigned);
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
