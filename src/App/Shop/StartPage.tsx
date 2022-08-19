import { useUqApp } from "App/MyUqAppView";
import { FA, List, LMR, MutedSmall, Page, useNav } from "tonwa-com";
import { UserUnit, UnitRoles } from "tonwa-uq";
import { Shop } from "uqs/BzUShop";
import { ViewAdmin } from "./admin/ViewAdmin";
import { ViewOwner } from "./owner";
import { ViewRoles } from "./roles";
import { ShopAddLink } from "./ShopAdd";

export function ShopStartPage() {
    let nav = useNav();
    let uqApp = useUqApp();

    function ItemView({ value }: { value: UserUnit<Shop>; }) {
        let { isAdmin, isOwner, entity, unit } = value;
        function onClick() {
            uqApp.setCurrentUnit(value);
            let header: string;
            if (isOwner === true) {
                header = "拥有者";
            }
            else if (isAdmin === true) {
                header = "角色管理";
            }
            nav.open(async () => {
                let unitRoles = await uqApp.uqUnit.loadUnitUsers(uqApp.me, value.unitId);
                return <PageRoles header={header} unitRoles={unitRoles} />;
            });
        }
        return <div className="d-flex px-3 py-2 cursor-pointer" onClick={onClick}>
            <FA name="book" size="lg" className="mt-1 me-4 text-info" fixWidth={true} />
            <div className="w-100">
                <ViewUnit entity={entity} unit={unit} />
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

function PageRoles({ unitRoles, header }: {
    unitRoles: UnitRoles,
    header: string;
}) {
    let uqApp = useUqApp();
    let { entity, unit, isOwner, isAdmin } = uqApp.userUnit;
    let { meAdmin, meOwner, owners, admins, users } = unitRoles;
    let roleItems = uqApp.uq.Role[unit === 0 ? '$' : entity];

    return <Page header={header}>
        <div className="px-3 py-2 bg-light border-bottom">
            <ViewUnit entity={entity} unit={unit} />
        </div>
        {isOwner === true && <ViewOwner me={meOwner} userUnits={owners} />}
        {isAdmin === true && <ViewAdmin me={meAdmin} userUnits={admins} />}
        <ViewRoles roleItems={roleItems} users={users} />
        {JSON.stringify(unitRoles)}
        {JSON.stringify(roleItems)}
    </Page>;
}

function ViewUnit({ entity, unit }: { entity: string; unit: any }) {
    if (unit === 0) {
        return <ViewUqSys />;
    }
    switch (entity) {
        case 'shop': return <ViewShop value={unit as Shop} />;
    }
}

function ViewUqSys() {
    return <>
        <div className="text-info"><b>UQ DB</b></div>
        <div>Uq 数据管理</div>
    </>
}

function ViewShop({ value }: { value: Shop }) {
    let { no, name, discription } = value;
    return <>
        <LMR><b>{name}</b> <MutedSmall>{no}</MutedSmall></LMR>
        {discription && <div className="my-2">{discription}</div>}
    </>
}
