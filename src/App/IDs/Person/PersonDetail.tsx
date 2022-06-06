import { useUqApp } from "App/UqApp";
import { FieldsDetail } from "tonwa-uq-com";
import { Field } from "tonwa-uq";
import { MPerson } from "./UqPerson";

interface Props {
    person: MPerson;
    fields: Field[];
    children?: React.ReactNode;
    onPersonChanged?: (person: MPerson) => void;
}

export function PersonDetail({ person, fields, children, onPersonChanged }: Props) {
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
    async function onValuesChanged(values: { name: string; value: any; preValue: any; }) {
        let { id } = person;
        let { name, value } = values;
        await JksWarehouse.ActIDProp(JksWarehouse.Person, id, name, value);
        onPersonChanged?.(person);
    }
    return <FieldsDetail values={person} fields={fields} onValuesChanged={onValuesChanged}>
        {children}
    </FieldsDetail>;
}
