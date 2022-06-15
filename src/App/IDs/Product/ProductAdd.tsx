import { useUqApp } from "App/UqApp";
import { Band, FA, LMR, Page, Submit, useNav } from "tonwa-com";
import { FieldsDetail, FieldsForm, IDListEdit, BandIDNOInput, useIdListEdit } from "tonwa-uq-com";
import { Product } from "uqs/JksWarehouse";
import { caption } from "./ProductLink";

interface Props {
    onProductAdded: (person: Product) => void;
}

export function ProductAddPage({ onProductAdded }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
    let { Product } = JksWarehouse;
    let { fields } = Product;
    async function onSubmit(data: Product) {
        let ret = await JksWarehouse.Acts({
            product: [data],
        });
        let id = ret[0];
        data.id = id;
        onProductAdded(data);
        nav.close();
    }
    function FormView({ className, values, onSubmit }: {
        className?: string;
        values?: Product;
        onSubmit: (data: Product) => Promise<void>;
    }) {
        let replacer = {
            'no': <BandIDNOInput label="NO" name="no" ID={Product} />,
        }
        return <FieldsForm className={className} fields={fields} replacer={replacer} values={values}>
            <Band>
                <Submit onSubmit={onSubmit} />
            </Band>
        </FieldsForm>
    }
    return <Page header={`Add ${caption}`}>
        <FormView className="p-3" values={undefined} onSubmit={onSubmit} />
    </Page>;
}
