import { AdminLink } from "tonwa-uq-com";
import { FA, LMR, useT } from "tonwa-com";
import { useUqApp } from "../UqApp";
import { appT } from '../res';
import { meT } from "./meRes";
import { useSnapshot } from "valtio";
import { ReactNode } from "react";

export function MeAdminLink() {
    let uqApp = useUqApp();
    let { user } = useSnapshot(uqApp.responsive);
    const { uqs } = uqApp;

    let loadAdmins = async (): Promise<any[]> => {
        let ret = await uqs.JksWarehouse.AdminGetList();
        return ret;
    }

    let setMeAdmin = async (): Promise<void> => {
        await uqs.JksWarehouse.AdminSetMe();
    }

    let setAdmin = async (user: number, role: number, assigned: string): Promise<void> => {
        await uqs.JksWarehouse.AdminSet(user, role, assigned);
    }

    function MeAdminLinkContainer({ onClick, children }: { onClick: () => void; children: ReactNode; }) {
        return <LMR className="py-3 px-3" onClick={onClick}>
            {children}
        </LMR>;
    }

    let t = useT(meT, appT);
    return <AdminLink LinkContainer={MeAdminLinkContainer}
        me={user?.id} loadAdmins={loadAdmins} setMeAdmin={setMeAdmin} setAdmin={setAdmin}>
        <FA className="text-primary me-3" name="cogs" fixWidth={true} size="lg" />
        <b className="text-danger">{t('admin')}</b>
        <FA className="align-self-center" name="angle-right" />
    </AdminLink>;
}
