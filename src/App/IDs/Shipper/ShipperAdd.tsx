import { useUqApp } from "App/UqApp";
import { Band, FA, LMR, Page, Submit, useNav } from "tonwa-com";
import { FieldsDetail, FieldsForm, IDListEdit, BandIDNOInput, useIdListEdit } from "tonwa-uq-com";
import { Shipper } from "uqs/JksWarehouse";
import { caption } from "./ShipperLink";

interface Props {
    onAdded: (person: Shipper) => void;
}

export function ShipperAddPage({ onAdded }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
    let { Shipper } = JksWarehouse;
    let { fields } = Shipper;
    async function onSubmit(data: Shipper) {
        let ret = await JksWarehouse.Acts({
            shipper: [data],
        });
        let id = ret[0];
        data.id = id;
        onAdded(data);
        nav.close();
    }
    function FormView({ className, values, onSubmit }: {
        className?: string;
        values?: Shipper;
        onSubmit: (data: Shipper) => Promise<void>;
    }) {
        let replacer = {
            'no': <BandIDNOInput label="NO" name="no" ID={Shipper} />,
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
