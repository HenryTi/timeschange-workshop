import { useUqApp } from "App/MyUqAppView";
import { FA, List, Page, useNav } from "tonwa-com";
import { UserUnit } from "tonwa-uq";
import { Shop } from "uqs/BzUShop";
import { PageAdmin } from "./PageAdmin";
import { PageForUser } from "./PageForUser";
import { ShopAddLink } from "./ShopAdd";
import { ViewUnit } from "./ViewUnit";

export function PageShops() {
    let nav = useNav();
    let uqApp = useUqApp();

    function ItemView({ value }: { value: UserUnit<Shop>; }) {
        let { isAdmin, isOwner, unit, entity } = value;
        function onClick() {
            uqApp.setCurrentUnit(value);
            let page: JSX.Element;
            if (isOwner === true) {
                page = <PageAdmin header="拥有者" />;
            }
            else if (isAdmin === true) {
                page = <PageAdmin header="角色管理" />;
            }
            else {
                page = <PageForUser />;
            }
            nav.open(page);
        }
        return <div className="d-flex px-3 py-2 cursor-pointer" onClick={onClick}>
            <FA name="book" size="lg" className="mt-1 me-4 text-info" fixWidth={true} />
            <div className="w-100">
                <ViewUnit unit={unit} entity={entity} />
            </div>
        </div>;
    }
    return <Page header="我的店铺">
        <ShopAddLink />
        <div className="tonwa-bg-gray-1 h-1c" />
        <div className="border-top border-bottom">
            <List items={uqApp.uqUnit.myUnits} itemKey={(item) => item.unitId} ItemView={ItemView} />
        </div>
    </Page>
}
