import { MeAdminLink } from "App/Admin";
import { Page } from "tonwa-com";
import { NotesLink } from "./Notes";
import { WorkshopsLink } from "./Workshops";

export function ActsPage() {
    return <Page header="Home">
        <div className="">
            <NotesLink />
            <WorkshopsLink />
            <MeAdminLink />
        </div>
    </Page>;
}
