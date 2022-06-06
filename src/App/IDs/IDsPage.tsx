import { Page } from "tonwa-com";
import { PersonLink } from "./Person";

export function IDsPage() {
    return <Page header="Items">
        <div>
            <PersonLink />
        </div>
    </Page>;
}
