import { FA, List, LMR, MutedSmall, Nav, Page, PickQueryPage, SearchBox, Submit, useNav } from "tonwa-com";
import { ShipperView } from "App/IDs/Shipper";
import { UqApp, useUqApp } from "App/UqApp";
import { Shipper, BinSheet, BinSheetRow, NameSheetType, SheetType, SheetTypeInActs, BinSheetInActs, BinSheetRowInActs, NameSheetAct, NameSheetState } from "uqs/JksWarehouse";
import { IdView, ListEdit, useListEdit } from "tonwa-uq-com";
import { Detail } from "./Detail";
import { IdSpecProductView, SpecNewMode } from "App/Industry";
import { useState } from "react";
import { SheetStates } from "./States";
import { Pending } from "./Pending";

interface Props {
    caption: string;
    sheetType: string;
}

export function PageBinSheet({ caption, sheetType }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
    let sheetTypeInActs: SheetTypeInActs = {
        ID: JksWarehouse.SheetType,
        entity: JksWarehouse.BinSheet.typeId,
        name: sheetType,
    };
    let sheet: BinSheet = {
        id: undefined,
        no: undefined,
        shipper: undefined,
        type: undefined,
        //type: sheetTypeIdObj, // sheetType
    };
    let shipper: Shipper;
    let details: BinSheetRow[] = [];
    async function onSearch(key: string) {
        async function query() {
            return await JksWarehouse.QueryID<Shipper>({
                ID: JksWarehouse.Shipper,
                key: {
                    no: key,
                    discription: key,
                }
            });
        }
        function ShipperItemView({ value }: { value: any; }) {
            return <div className="px-3 py-2">
                <ShipperView value={value} />
            </div>;
        }
        shipper = await nav.call<Shipper>(<PickQueryPage query={query} header="Select client" ItemView={ShipperItemView} />);
        nav.cease();
        async function openSheetWithDetail() {
            let no = await JksWarehouse.IDNO({ ID: JksWarehouse.BinSheet });
            sheet.no = no;
            sheet.shipper = shipper.id;
            let sheetSaved = await JksWarehouse.Acts({
                binSheet: [{ ...sheet, type: sheetTypeInActs }],
            });
            sheet.id = sheetSaved['binSheet'][0];
            let state = {
                entity: JksWarehouse.BinSheet.typeId,
                sheetType: sheetTypeInActs,
                name: NameSheetState.Draft,
            };
            await JksWarehouse.ActIX({
                IX: JksWarehouse.IxSheetState,
                ID: JksWarehouse.SheetState,
                values: [{ ix: state, xi: sheet.id }],
            });
            return <PageSheetEdit caption={caption} sheetType={sheetType}
                sheet={sheet} details={details} done={undefined} />;
        }
        nav.open(openSheetWithDetail);
    }
    return <Page header={caption}>
        <div className="p-3">
            <div className="mb-3">第一步：选择货主</div>
            <SearchBox onSearch={onSearch} placeholder="货主编号或名称" allowEmptySearch={true} />
        </div>
        <Pending caption={caption} sheetType={sheetType}
            state={NameSheetState.Draft} hideNone={true}
            listHeader={<div className="px-3 pb-1 mt-3 small text-muted border-bottom">草稿</div>} />
    </Page>;
}

function SheetMain({ sheet }: { sheet: BinSheet; }) {
    let app = useUqApp();
    let { shipper } = sheet;
    return <>
        <div className="d-flex my-3 border-bottom px-3">
            <div className="me-3">编号</div>
            <div>{sheet.no}</div>
        </div>
        <div className="d-flex my-3 border-bottom px-3">
            <div className="me-3">货主</div>
            <div><IdView id={shipper} uq={app.uqs.JksWarehouse} Template={ShipperView} /></div>
        </div>
    </>;
}

function DetailRow({ value }: { value: BinSheetRow; }) {
    let app = useUqApp();
    let { spec, quantity } = value;
    return <LMR className="px-3 py-2">
        <div>
            <IdSpecProductView id={spec} app={app} />
        </div>
        <div>{quantity}</div>
    </LMR>;
}

function DetailNone() {
    return <div className="m-4"><MutedSmall>
        <FA name="exclamation-circle me-3" className="text-warning" />
        无货品
    </MutedSmall>
    </div>;
}

export function PageSheetEdit({ caption, sheetType, sheet, details, done }: {
    sheet: BinSheet;
    details: BinSheetRow[];
    caption: string;
    sheetType: string;
    done: (act: string) => void;
}) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
    let [submitDisabled, setSubmitDisabled] = useState<boolean>(details.length === 0);
    function close() {
        nav.close(1);
    }
    function restart() {
        nav.cease();
        nav.open(<PageBinSheet caption={caption} sheetType={sheetType} />);
    }
    function PageDone({ header, message }: { header: string; message: string; }) {
        return <Page header={header} contentClassName="p-5" back="close">
            <div className="mb-5">{message}</div>
            <div>
                <button className="btn btn-primary me-3" onClick={close}>退出</button>
                <button className="btn btn-primary me-3" onClick={restart}>继续制单</button>
            </div>
        </Page>;
    }
    async function onSubmitSheet() {
        await JksWarehouse.BinSheetAct.submit({ sheet: sheet.id, act: NameSheetAct.ToStart });
        done?.(NameSheetAct.ToStart);
        nav.cease();
        nav.open(<PageDone header="提交" message="单据已提交" />);
    }
    async function onDeleteSheet() {
        await JksWarehouse.BinSheetAct.submit({ sheet: sheet.id, act: NameSheetAct.ToTrash });
        done?.(NameSheetAct.ToTrash);
        nav.cease();
        nav.open(<PageDone header="作废" message="单据已作废" />);
    }
    async function onRowSaved(row: BinSheetRow): Promise<number> {
        let rowSaved = await JksWarehouse.Acts({
            binSheetRow: [row],
        });
        let id = rowSaved['binSheetRow'][0]
        row.id = id;
        details.push(row);
        setSubmitDisabled(details.length === 0);
        return id;
    }
    let specNewMode: SpecNewMode;
    switch (sheetType) {
        default: specNewMode = SpecNewMode.ExistOnly; break;
        case NameSheetType.BinIn: specNewMode = SpecNewMode.AllowNew; break;
        case NameSheetType.BinOut: specNewMode = SpecNewMode.ExistOnly; break;
    }
    return <Page header={caption}>
        <SheetWithDetail sheet={sheet} specNewMode={specNewMode}
            details={details}
            onRowSaved={onRowSaved} />
        <div className="my-3 p-3 border-top d-flex">
            <button className="btn btn-primary me-3"
                disabled={submitDisabled}
                onClick={onSubmitSheet}>
                <FA name="send" className="me-3" />
                提交
            </button>
            <button className="btn btn-outline-primary ms-auto"
                onClick={onDeleteSheet}>
                <FA name="trash-o" className="text-warning me-1" />
                作废
            </button>
        </div>
    </Page>;
}

function SheetWithDetail({ sheet, details, specNewMode, onRowSaved }: {
    sheet: BinSheet;
    details: BinSheetRow[];
    specNewMode: SpecNewMode;
    onRowSaved: (row: BinSheetRow) => Promise<number>;
}) {
    let nav = useNav();
    const listEditContext = useListEdit(details, (item1, item2) => item1.id === item2.id);
    function AddButton() {
        return <button className="btn btn-sm btn-outline-primary" onClick={onAddDetail}>
            <FA name="plus" /> 明细
        </button>;
    }
    async function onRowChanged(row: BinSheetRow) {
        let { items } = listEditContext.getResponse();
        let id = await onRowSaved(row);
        row.id = id;
        items.push(row);
    }
    async function onAddDetail() {
        nav.open(<Detail sheet={sheet} onRowChanged={onRowChanged} specNewMode={specNewMode} />);
    }
    function onDetailClick(detail: BinSheetRow) {
        nav.open(<Detail sheet={sheet} onRowChanged={onRowChanged} row={detail} specNewMode={specNewMode} />)
    }
    return <>
        <SheetMain sheet={sheet} />
        <div className="my-3">
            <LMR className="border-bottom mb-2 align-items-end pb-1 px-3 bg-light">
                <div className="small muted">明细</div>
                <AddButton />
            </LMR>
            <ListEdit className="" context={listEditContext}
                ItemView={DetailRow}
                onItemClick={onDetailClick}
                none={<DetailNone />} />
            <LMR className="border-top mt-2 pt-1 px-3 bg-light">
                <div></div>
                <AddButton />
            </LMR>
        </div>
    </>;
}

type StateActDone = (sheet: number, state: string) => void;

export async function loadSheetView(
    app: UqApp
    , id: number
    , caption: string
    , sheetType: string
    , stateActDone: StateActDone) {
    let ret = await app.uqs.JksWarehouse.GetSheet.query({ sheet: id });
    let state = ret.state[0].name;
    let sheet = ret.main[0];
    let details = ret.details;
    if (state === NameSheetState.Draft) {
        return <PageSheetEdit caption={caption}
            sheetType={sheetType} sheet={sheet} details={details}
            done={done} />;
    }
    function onDetailClick(row: BinSheetRow) {
        alert(JSON.stringify(row));
    }
    if (!sheet) return null;
    async function done(act: string) {
        stateActDone(id, act);
    }
    return <Page header="单据">
        <SheetMain sheet={sheet} />
        <div className="my-3">
            <List className=""
                items={details}
                ItemView={DetailRow}
                onItemClick={onDetailClick}
                none={<DetailNone />} />
        </div>
        <SheetStates sheet={id} state={state} done={done} />
    </Page>;
}
