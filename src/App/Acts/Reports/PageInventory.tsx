import { ShipperView } from "App/IDs/Shipper";
import { useUqApp } from "App/UqApp";
import { useEffect, useState } from "react";
import { List, LMR, Page, useNav } from "tonwa-com";
import { BzView } from "./BzView";
import { PageHistory } from "./PageHistory";

interface Props {
    caption: string;
    list?: any[];
}

export function PageInventory({ caption }: Props) {
    let nav = useNav();
    let uqApp = useUqApp();
    let { JksWarehouse } = uqApp.uqs;
    let [list, setList] = useState<any[]>(undefined);
    useEffect(() => {
        async function load() {
            let ret = await JksWarehouse.QueryID({ ID: JksWarehouse.Shipper });
            setList(ret);
        }
        load();
    }, [JksWarehouse]);
    async function showInventoryReport(item: any) {
        nav.open(async () => {
            let ret = await JksWarehouse.QueryID({ IDX: [JksWarehouse.BzValue] });
            return <PageInventoryReport caption={caption} list={ret} />
        });
    }
    async function showShipperInventoryReport(item: any) {
        nav.open(async () => {
            let ret = await JksWarehouse.GetBzShipperInventorySpec.page({
                shipper: item.id,
            }, 0, 100);
            return <PageInventoryReport caption={caption} list={ret.$page} />;
        });
    }
    function ItemView({ value }: { value: any }) {
        return <div className="px-3 py-2 border-bottom d-flex">
            <div className="me-3">货主库存账</div>
            <ShipperView value={value} />
        </div>;
    }
    return <Page header={caption}>
        <div className="px-3 py-2 border-bottom cursor-pointer tonwa-list-item"
            onClick={showInventoryReport}>全部货品库存账</div>
        <List items={list} ItemView={ItemView} onItemClick={showShipperInventoryReport} />
    </Page>
}

function PageInventoryReport({ caption, list }: Props) {
    let nav = useNav();
    function ItemView({ value }: { value: any }) {
        let { value: quantity, id } = value;
        return <LMR className="px-3 py-2">
            <div><BzView bz={id} /></div>
            <div>{quantity}</div>
        </LMR>
    }

    function onItemClick(item: any) {
        nav.open(<PageHistory bz={item.id} />);
    }
    return <Page header={caption}>
        <List items={list} ItemView={ItemView} onItemClick={onItemClick} />
    </Page>
}
