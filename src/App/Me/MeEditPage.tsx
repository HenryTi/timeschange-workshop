import { useUqApp } from "App/MyUqAppView";
import { AppLogout } from "App/AppWithTabs/AppImage";
import { Page, useT, FA, Detail, BandString, Sep, BandCom, useNav } from "tonwa-com";
import { ChangePassword, UserQuit } from "tonwa-uq-com";
import { useSnapshot } from "valtio";
import { appT } from '../res';
import { meT } from "./meRes";

export function MeEditPage() {
    let nav = useNav();
    let app = useUqApp();
    let { user } = useSnapshot(app.responsive);
    let t = useT(meT, appT);

    let onValuesChanged = async (values: { name: string; value: any; preValue: any; }) => {
        let { name, value } = values;
        app.setUserProp(name, value);
    }

    let onExit = () => {
        //app.auth.showLogout();
        nav.open(<AppLogout />);
    }

    let changePassword = async () => {
        nav.open(<ChangePassword />);
        //await app.auth.changePassword();
    }

    let userQuit = async () => {
        nav.open(<UserQuit />)
        //await app.auth.userQuit();
    }

    //<BandImage label="头像" name="icon" />
    return <Page header="个人信息">
        <div>
            <Detail values={user} onValuesChanged={onValuesChanged}>
                <BandString label="别名" name="nick" placeholder="好的别名更方便记忆" />
                <BandCom label={t('changePassword')} onEdit={changePassword}>
                    <FA className="text-info m-2 align-self-center" name="key" />
                </BandCom>
                <BandCom label={t('userQuit')} onEdit={userQuit}>
                    <FA className="text-info m-2 align-self-center" name="key" />
                </BandCom>
            </Detail>
            <Sep />
            <div className="mt-5 w-100 text-center">
                <button className="btn btn-danger w-100 w-max-20c" onClick={onExit}>
                    <FA name="sign-out" size="lg" /> {t('logout')}
                </button>
            </div>
        </div>
    </Page>;
}
