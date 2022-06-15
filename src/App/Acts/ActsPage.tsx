import { Page } from "tonwa-com";
import { BinInLink, BinOutLink } from "./BinSheet";

export function ActsPage() {
    return <Page header="Home">
        <div className="">
            <BinInLink />
            <BinOutLink />
        </div>
    </Page>;
}
