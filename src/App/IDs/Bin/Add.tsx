import { useUqApp } from "App/UqApp";
import { Band, FA, LMR, Page, Submit, useNav } from "tonwa-com";
import { FieldsDetail, FieldsForm, IDListEdit, BandIDNOInput, useIdListEdit } from "tonwa-uq-com";
import { Bin } from "uqs/JksWarehouse";
import { caption } from "./Link";

interface Props {
    onAdded: (item: Bin) => void;
}

export function BinAddPage({ onAdded }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
    let { Bin } = JksWarehouse;
    let { fields } = Bin;
    async function onSubmit(data: Bin) {
        let ret = await JksWarehouse.Acts({
            bin: [data],
        });
        let id = ret[0];
        data.id = id;
        onAdded(data);
        nav.close();
    }
    function FormView({ className, values, onSubmit }: {
        className?: string;
        values?: Bin;
        onSubmit: (data: Bin) => Promise<void>;
    }) {
        let replacer = {
            'no': <BandIDNOInput label="NO" name="no" ID={Bin} />,
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
