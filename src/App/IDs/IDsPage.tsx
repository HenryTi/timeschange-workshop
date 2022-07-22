import { Page } from "tonwa-com";
import { StaffLink, ClientLink } from "./Person";
/*
import { ProductLink } from "./Product";
import { ShipperLink } from "./Shipper";
import { BinLink } from "./Bin";
*/
export function IDsPage() {
    return <Page header="Items">
        <div>
            <ClientLink />
            <StaffLink />
        </div>
    </Page>;
}
