import { useEffect } from "react";
import { Band, FA, LMR, Page, Submit, useNav } from "tonwa-com";
import { FieldsDetail, FieldsForm, IDListEdit, BandIDNOInput, useIdListEdit } from "tonwa-uq-com";
import { useUqApp } from "../../UqApp";
import { Shipper } from "uqs/JksWarehouse";
import { ShipperItem } from "./ShipperItem";
import { caption, icon, iconClass } from './ShipperLink';
import { ShipperAddPage } from "./ShipperAdd";
// import { TestPage } from "./TestPage";
// import { TagInput } from "App/Tag";
// import { SessionList } from "./SessionList";

/*
interface Props {
    caption: string;
    icon: string;
    iconClass: string;
}
*/
export function ShipperList() {
    let app = useUqApp();
    let nav = useNav();
    // let { caption, icon, iconClass } = props;
    function ItemView({ value: item }: { value: Shipper }) {
        return <LMR className="px-3 py-2 align-items-center">
            <FA name={icon} className={'me-4 ' + iconClass} fixWidth={true} size="lg" />
            <div><ShipperItem item={item} /></div>
            <FA name="angle-right" />
        </LMR>;
    }
    let listEditContext = useIdListEdit<Shipper>(undefined)
    useEffect(() => {
        async function loadList() {
            let { JksWarehouse } = app.uqs;
            let ret = await JksWarehouse.QueryID<Shipper>({
                ID: JksWarehouse.Shipper,
                page: { start: 0, size: 10 },
                order: 'desc',
            });
            listEditContext.setItems(ret);
        }
        loadList();
    }, [app, listEditContext]);

    let { JksWarehouse } = app.uqs;
    let { Shipper } = JksWarehouse;
    let { fields } = Shipper;
    function onAdded(item: Shipper) {
        listEditContext.onItemChanged(item);
    }
    let onAdd = async () => {
        nav.open(<ShipperAddPage onAdded={onAdded} />);
    };

    let onEditItem = (item: Shipper): Promise<void> => {
        function EditPage() {
            let { id } = item;
            async function onValuesChanged(values: { name: string; value: any; preValue: any; }) {
                let newItem = { ...item };
                let { name, value } = values;
                (newItem as any)[name] = value;
                switch (name) {
                    default:
                        await JksWarehouse.ActIDProp(Shipper, id, name, value);
                        break;
                    case 'staff':
                        //await JksWarehouse.SaveWorkshopStaff.submit({ id, staff: value });
                        debugger;
                        break;
                }
                listEditContext.onItemChanged(newItem);
            }
            return <Page header="Detail">
                <FieldsDetail className="my-3 border-2 border-top border-bottom"
                    values={item}
                    fields={fields}
                    onValuesChanged={onValuesChanged}>
                </FieldsDetail>
            </Page>;
            /*
            <TagInput id={id} className="my-3 border-2 border-top border-bottom"
                tagGroupName="workshop-tags" />
            <SessionList workshop={item} />
            */
        }
        nav.open(<EditPage />);
        return;
    };

    let right = <button className="btn btn-sm btn-success me-2" onClick={onAdd}>
        <FA name="plus" />
    </button>;

    return <Page header={caption} right={right}>
        <IDListEdit context={listEditContext} itemKey="id" ItemView={ItemView} onItemClick={onEditItem} />
    </Page>;
}
