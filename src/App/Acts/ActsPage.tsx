import { MeAdminLink } from "App/Admin";
import { Page } from "tonwa-com";
import { BinInLink, BinOutLink } from "./BinSheet";
import { BinInPendingLink } from "./BinSheet";
import { BinOutPendingLink } from "./BinSheet";
import { ReportInventoryLink } from "./Reports";

export function ActsPage() {
    return <Page header="Home">
        <div className="">
            <BinInLink />
            <BinInPendingLink />
            <BinOutLink />
            <BinOutPendingLink />
            <ReportInventoryLink />
            <MeAdminLink />
        </div>
    </Page>;
}
