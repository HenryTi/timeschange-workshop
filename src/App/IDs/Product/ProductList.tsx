import { useEffect } from "react";
import { FA, LMR, Page, useNav } from "tonwa-com";
import { FieldsDetail, IDListEdit, useIdListEdit } from "tonwa-uq-com";
import { useUqApp } from "../../UqApp";
import { Product } from "uqs/JksWarehouse";
import { ProductItem } from "./ProductItem";
import { caption, icon, iconClass } from './ProductLink';
import { ProductAddPage } from "./ProductAdd";
import { industryCaption } from "App/Industry";

interface Props {
    industry: string;
}

export function ProductList({ industry }: Props) {
    let app = useUqApp();
    let nav = useNav();
    function ItemView({ value: item }: { value: Product }) {
        return <LMR className="px-3 py-2 align-items-center">
            <FA name={icon} className={'me-4 ' + iconClass} fixWidth={true} size="lg" />
            <div><ProductItem item={item} /></div>
            <FA name="angle-right" />
        </LMR>;
    }
    let listEditContext = useIdListEdit<Product>(undefined)
    useEffect(() => {
        async function loadList() {
            let { JksWarehouse } = app.uqs;
            let ret = await JksWarehouse.GetIndustryProducts.query({ industryName: industry });
            /*.QueryID<Product>({
                ID: JksWarehouse.Product,
                page: { start: 0, size: 10 },
                order: 'desc',
            });*/
            listEditContext.setItems(ret.ret);
        }
        loadList();
    }, [app, listEditContext, industry]);

    let { JksWarehouse } = app.uqs;
    let { Product } = JksWarehouse;
    let { fields } = Product;
    function onProductAdded(product: Product) {
        listEditContext.onItemChanged(product);
    }
    let onAdd = async () => {
        nav.open(<ProductAddPage industry={industry} onProductAdded={onProductAdded} />);
    };

    let onEditItem = (item: Product): Promise<void> => {
        function EditPage() {
            let { id } = item;
            async function onValuesChanged(values: { name: string; value: any; preValue: any; }) {
                let newItem = { ...item };
                let { name, value } = values;
                (newItem as any)[name] = value;
                switch (name) {
                    default:
                        await JksWarehouse.ActIDProp(Product, id, name, value);
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

    return <Page header={caption + ' - ' + industryCaption[industry]} right={right}>
        <IDListEdit context={listEditContext} itemKey="id" ItemView={ItemView} onItemClick={onEditItem} />
    </Page>;
}
