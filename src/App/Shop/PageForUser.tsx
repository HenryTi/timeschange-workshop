import { useUqApp } from "App/MyUqAppView";
import { Page } from "tonwa-com";
import { ViewUnit } from "./ViewUnit";

export function PageForUser() {
    let uqApp = useUqApp();
    let { unit, entity } = uqApp.userUnit;
    return <Page header="店铺">
        <div className="m-3">
            <ViewUnit unit={unit} entity={entity} />
        </div>
    </Page>
}