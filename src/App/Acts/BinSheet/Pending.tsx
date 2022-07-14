import { defaultListProps } from "App/tool";
import { useUqApp } from "App/UqApp";
import { useEffect, useRef } from "react";
import { dateFromMinuteId, EasyDate, EasyTime, List, Page, useNav } from "tonwa-com";
import { QueryPageCaller } from "tonwa-uq";
import { BinSheet } from "uqs/JksWarehouse";
import { proxy, useSnapshot } from "valtio";
import { loadSheetView } from "./BinSheet";
import { SheetItemView } from "./SheetItemView";

interface Props {
    caption: string;
    sheetType: string;
    state: string;
    hideNone?: boolean;
    listHeader?: JSX.Element;
    listFooter?: JSX.Element;
}

export function PagePending(props: Props) {
    let { caption } = props;
    return <Page header={caption}>
        <Pending {...props} />
    </Page>;
}

export function Pending(props: Props) {
    let { caption, sheetType, state } = props;
    let nav = useNav();
    let app = useUqApp();
    let { uqs } = app;
    let { JksWarehouse } = uqs;
    let { current: querySheetList } = useRef(new QueryPageCaller(JksWarehouse.GetSheetsOfState, {
        pageStart: 0,
        pageSize: 100,
        params: {
            sheetEntity: JksWarehouse.BinSheet.name,
            sheetTypeName: sheetType,
            stateName: state,
        }
    }));
    let { current: proxyItems } = useRef(proxy<{ items: any[] }>({ items: undefined }));
    let snapshotItems = useSnapshot(proxyItems);
    // let [items, setItems] = useState<any[]>(undefined);
    let { items } = snapshotItems;
    useEffect(() => {
        async function loadList() {
            let ret = await querySheetList.request();
            //setItems(ret.$page);
            proxyItems.items = ret.$page;
        }
        loadList();
    }, [querySheetList]);
    function ItemView({ value }: { value: { sheet: number; }; }) {
        function SheetRow(sheet: BinSheet & { $type: string }) {
            let { id, no, $type } = sheet;
            let date = dateFromMinuteId(id);
            return <div className="px-3 py-2">
                <EasyDate date={date} /><EasyTime date={date} /> &nbsp; &nbsp;
                单号: <b>{no}</b>
            </div>;
        }
        return <SheetItemView id={value.sheet} app={app} Template={SheetRow} />;
    }
    function stateActDone(sheet: number, act: string) {
        let p = items.findIndex(v => v.sheet === sheet);
        if (p >= 0) {
            //setItems(items.splice(p, 1));
            proxyItems.items = [...items.slice(0, p), ...items.slice(p + 1)];
        }
    };
    function onSheetClick(item: { sheet: number; }) {
        async function openSheetView() {
            return await loadSheetView(app, item.sheet, caption, sheetType, stateActDone);
        }
        nav.open(openSheetView);
    }
    if (items === undefined) return null;
    let { listHeader, listFooter } = props;
    if (listHeader && items.length === 0) return null;
    return <>
        {listHeader}
        <List items={items} ItemView={ItemView} onItemClick={onSheetClick} {...defaultListProps} />
        {listFooter}
    </>;
}
