import { useUqApp } from "App/MyUqAppView";
import { FA, LMR, MutedSmall } from "tonwa-com";

export function Me({ right }: { right?: JSX.Element; }) {
    let uqApp = useUqApp();

    return <LMR className="px-3 py-3 border-bottom align-items-center">
        <span>[ <FA name="user-circle" className="me-2 text-danger" /> 自己 - <MutedSmall>{uqApp.responsive.user.name}</MutedSmall> ]</span>
        <span>{right}</span>
    </LMR>;
}
