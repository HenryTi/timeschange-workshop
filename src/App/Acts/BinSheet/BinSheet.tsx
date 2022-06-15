import { FA, LMR, Nav, Page, PickQueryPage, SearchBox, useNav } from "tonwa-com";
import { ShipperView } from "App/IDs/Shipper";
import { useUqApp } from "App/UqApp";
import { SheetType, Shipper, SpecSheet, SpecSheetRow } from "uqs/JksWarehouse";
import { ListEdit, useListEdit } from "tonwa-uq-com";
import { Detail } from "./Detail";

interface Props {
    caption: string;
    sheetType: SheetType;
}

export function BinSheet({ caption, sheetType }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
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
        let ret = await nav.call<Shipper>(<PickQueryPage query={query} header="Select client" ItemView={ShipperView} />);
        let no = await JksWarehouse.IDNO({ ID: JksWarehouse.SpecSheet });
        let sheet: SpecSheet = {
            id: undefined,
            no,
            shipper: ret.id,
            type: sheetType
        };
        let sheetSaved = await JksWarehouse.Acts({
            specSheet: [sheet],
        });
        sheet.id = sheetSaved['specSheet'][0];
        nav.close();
        nav.open(<SheetWithDetail caption={caption} shipper={ret} sheet={sheet} />);
    }

    return <Page header={caption}>
        <div className="p-3">
            <div className="mb-3">第一步：选择货主</div>
            <SearchBox onSearch={onSearch} placeholder="货主编号或名称" allowEmptySearch={true} />
        </div>
    </Page>
}

function SheetWithDetail({ caption, shipper, sheet }: {
    sheet: SpecSheet;
    caption: string;
    shipper: Shipper;
}) {
    let nav = useNav();
    let list: SpecSheetRow[] = [];
    const listEditContext = useListEdit(list, (item1, item2) => item1.id === item2.id);
    function AddButton() {
        return <button className="btn btn-sm btn-outline-primary" onClick={onAddDetail}>
            <FA name="plus" /> 明细
        </button>;
    }

    async function onRowChanged(row: SpecSheetRow) {
        let { items } = listEditContext.getResponse();
        items.push(row);
    }
    async function onAddDetail() {
        nav.open(<Detail sheet={sheet} onRowChanged={onRowChanged} />);
    }
    function RowView({ value }: { value: SpecSheetRow; }) {
        return <div className="px-3 py-2">row: {JSON.stringify(value)}</div>;
    }
    function onDetailClick(detail: SpecSheetRow) {
        nav.open(<Detail sheet={sheet} onRowChanged={onRowChanged} row={detail} />)
    }
    return <Page header={caption}>
        <div className="d-flex my-3 border-bottom px-3">
            <div className="me-3">no: </div>
            <div>{sheet.no}</div>
        </div>
        <div className="d-flex my-3 border-bottom px-3">
            <div className="me-3">shipper: </div>
            <div><ShipperView value={shipper} /></div>
        </div>
        <div className="my-3">
            <LMR className="border-bottom mb-2 align-items-end pb-1 px-3 bg-light">
                <div className="small muted">明细</div>
                <AddButton />
            </LMR>
            <ListEdit className="" context={listEditContext}
                ItemView={RowView}
                onItemClick={onDetailClick} />
            <LMR className="border-top mt-2 pt-1 px-3 bg-light">
                <div></div>
                <AddButton />
            </LMR>
        </div>
    </Page>
}
