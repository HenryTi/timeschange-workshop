import { MeAdminLink } from "App/Admin";
import { Page } from "tonwa-com";

export function ActsPage() {
    return <Page header="Home">
        <div className="">
            <div>links</div>
            <MeAdminLink />
        </div>
    </Page>;
}
