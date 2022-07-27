import { TagsAdminLink } from "App/Tags";
import { Page } from "tonwa-com";
import { StaffLink, ClientLink } from "./Person";
import { WorkshopLink } from "./Workshop";

export function IDsPage() {
    return <Page header="Items">
        <div>
            <WorkshopLink />
            <ClientLink />
            <StaffLink />
            <TagsAdminLink />
        </div>
    </Page>;
}
