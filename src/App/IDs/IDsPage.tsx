import { Page } from "tonwa-com";
import { PersonLink } from "./Person";
import { ProductLink } from "./Product";
import { ShipperLink } from "./Shipper";
import { BinLink } from "./Bin";

export function IDsPage() {
    return <Page header="Items">
        <div>
            <ShipperLink />
            <ProductLink />
            <PersonLink />
            <BinLink />
        </div>
    </Page>;
}
