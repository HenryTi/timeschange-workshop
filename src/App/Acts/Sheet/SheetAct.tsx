import { env, Page } from "tonwa-com";

export function SheetAct() {
    let e = env;
    return <Page header="Sheet">
        sheet e.isDevelopment: {String(e.isDevelopment)}
    </Page>
}
