import { useUqApp } from "App/UqApp";
import { FieldsDetail } from "tonwa-uq-com";
import { Field } from "tonwa-uq";
import { MPerson } from "./defines";

interface Props {
    person: MPerson;
    fields: Field[];
    children?: React.ReactNode;
    onPersonChanged?: (person: MPerson) => void;
}

export function PersonDetail({ person, fields, children, onPersonChanged }: Props) {
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    async function onValuesChanged(values: { name: string; value: any; preValue: any; }) {
        let { id } = person;
        let { name, value } = values;
        await BzWorkshop.ActIDProp(BzWorkshop.Person, id, name, value);
        let newPerson = { ...person };
        (newPerson as any)[name] = value;
        onPersonChanged?.(newPerson);
    }
    return <FieldsDetail values={person} fields={fields} onValuesChanged={onValuesChanged}>
        {children}
    </FieldsDetail>;
}
