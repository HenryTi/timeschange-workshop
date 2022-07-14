import { useUqApp } from "App/UqApp";
import { useEffect, useRef, useState } from "react";
import { dateFromMinuteId, EasyDate, EasyTime, List, LMR, MutedSmall, Page, useNav } from "tonwa-com";
import { QueryPageCaller } from "tonwa-uq";
import { BzView } from "./BzView";

interface Props {
    bz: number;
}

export function PageHistory({ bz }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
    let { current: queryList } = useRef(new QueryPageCaller(JksWarehouse.GetBzHistory, {
        pageStart: 0,
        pageSize: 100,
        params: {
            bz
        }
    }));
    let [items, setItems] = useState<any[]>(undefined);
    useEffect(() => {
        (async function () {
            let ret = await queryList.request();
            setItems(ret.$page);
        })();
    }, [JksWarehouse]);

    function ItemView({ value: item }: { value: { track: number; value: number; op: number; } }) {
        let { track, value, op } = item;
        let [opObj, setOpObj] = useState<any>(undefined);
        useEffect(() => {
            (async function () {
                let obj = await JksWarehouse.idObj(op);
                setOpObj(obj);
            })();
        }, [JksWarehouse]);
        if (!opObj) return null;
        let cnValue: string;
        if (opObj.sign === -1) cnValue = 'me-5 text-primary';
        return <LMR className="mx-3 my-2 align-items-center">
            <div className="w-8c"><EasyTime date={dateFromMinuteId(track)} always={true} /></div>
            <div className="w-10c">{opObj?.name}</div>
            <MutedSmall>{track}</MutedSmall>
            <div className={cnValue}>{value}</div>
        </LMR>;
    }
    function BzOpView({ op }: { op: number; }) {
        let [opObj, setOpObj] = useState<any>(undefined);
        useEffect(() => {
            (async function () {
                let obj = await JksWarehouse.idObj(op);
                setOpObj(obj);
            })();
        }, [JksWarehouse]);
        return <>{opObj?.name}</>
    }
    function onItemClick(item: any) {
        nav.open(<PageTrack item={item} />)
    }
    function PageTrack({ item }: { item: any }) {
        return <Page header="详情">
            <ItemView value={item} />
            <div><MutedSmall>单据详情设计中...</MutedSmall></div>
        </Page>;
    }
    return <Page header="明细">
        <div className="py-3">
            <div className="px-3">
                <BzView bz={bz} />
            </div>
            <List className="mt-4 border-top border-bottom border-3"
                items={items}
                ItemView={ItemView}
                onItemClick={onItemClick} />
        </div>
    </Page>;
}

