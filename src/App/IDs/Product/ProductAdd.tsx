import { createIndustryProduct, industryCaption } from "App/Industry";
import { useUqApp } from "App/UqApp";
import { Band, Page, Submit, useNav } from "tonwa-com";
import { FieldsForm, BandIDNOInput } from "tonwa-uq-com";
import { Product } from "uqs/JksWarehouse";
import { caption } from "./ProductLink";

interface Props {
    industry: string,
    onProductAdded: (person: Product) => void;
}

export function ProductAddPage({ industry, onProductAdded }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
    let { Product } = JksWarehouse;
    let { fields } = Product;
    let inputIndustryProduct = createIndustryProduct(industry);
    let industryInActs = {
        ID: JksWarehouse.Industry,
        name: industry,
    }
    async function onSubmit(data: Product) {
        /*
        let ret = await JksWarehouse.Acts({
            product: [{ industry, ...data }],
        });
        */
        let ret = await JksWarehouse.ActID({
            ID: JksWarehouse.Product,
            IX: [JksWarehouse.IxIndustryProduct],
            value: { industry: industryInActs, ...data },
            ix: [industryInActs],
        })
        let id = ret;
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
            'industry': null as JSX.Element,
        }
        return <FieldsForm className={className} fields={fields} replacer={replacer} values={values}>
            {inputIndustryProduct.renderInputBands()}
            <Band>
                <Submit onSubmit={onSubmit} />
            </Band>
        </FieldsForm>
    }
    return <Page header={`${industryCaption[industry]} Add ${caption}`}>
        <FormView className="p-3" values={undefined} onSubmit={onSubmit} />
    </Page>;
}
