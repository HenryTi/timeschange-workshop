import { useUqApp } from "App/UqApp";
import { Page } from "tonwa-com";
import { FieldsDetail } from "tonwa-uq-com";
import { Session } from "uqs/BzWorkshop";

interface Props {
    item: Session;
    onItemChanged: (item: Session) => void;
}

export function PageEditSession({ item, onItemChanged }: Props) {
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    async function onValuesChanged(values: { name: string; value: any; preValue: any; }) {
        let { id } = item;
        let { name, value } = values;
        await BzWorkshop.ActIDProp(BzWorkshop.Session, id, name, value);
        let newSession = { ...item };
        (newSession as any)[name] = value;
        onItemChanged(newSession);
    }
    return <Page header="Edit Session">
        <FieldsDetail values={item}
            fields={BzWorkshop.Session.fields}
            replacer={{ workshop: null }}
            onValuesChanged={onValuesChanged} />
    </Page>;
}