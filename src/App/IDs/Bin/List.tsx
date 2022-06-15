import { useEffect } from "react";
import { Band, FA, LMR, Page, Submit, useNav } from "tonwa-com";
import { FieldsDetail, FieldsForm, IDListEdit, BandIDNOInput, useIdListEdit } from "tonwa-uq-com";
import { useUqApp } from "../../UqApp";
import { Bin } from "uqs/JksWarehouse";
import { BinItem } from "./Item";
import { caption, icon, iconClass } from './Link';
import { BinAddPage } from "./Add";
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
export function BinList() {
    let app = useUqApp();
    let nav = useNav();
    // let { caption, icon, iconClass } = props;
    function ItemView({ value: item }: { value: Bin }) {
        return <LMR className="px-3 py-2 align-items-center">
            <FA name={icon} className={'me-4 ' + iconClass} fixWidth={true} size="lg" />
            <div><BinItem item={item} /></div>
            <FA name="angle-right" />
        </LMR>;
    }
    let listEditContext = useIdListEdit<Bin>(undefined)
    useEffect(() => {
        async function loadList() {
            let { JksWarehouse } = app.uqs;
            let ret = await JksWarehouse.QueryID<Bin>({
                ID: JksWarehouse.Bin,
                page: { start: 0, size: 10 },
                order: 'desc',
            });
            listEditContext.setItems(ret);
        }
        loadList();
    }, [app, listEditContext]);

    let { JksWarehouse } = app.uqs;
    let { Bin } = JksWarehouse;
    let { fields } = Bin;
    function onAdded(item: Bin) {
        listEditContext.onItemChanged(item);
    }
    let onAdd = async () => {
        nav.open(<BinAddPage onAdded={onAdded} />);
    };

    let onEditItem = (item: Bin): Promise<void> => {
        function EditPage() {
            let { id } = item;
            async function onValuesChanged(values: { name: string; value: any; preValue: any; }) {
                let newItem = { ...item };
                let { name, value } = values;
                (newItem as any)[name] = value;
                switch (name) {
                    default:
                        await JksWarehouse.ActIDProp(Bin, id, name, value);
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
