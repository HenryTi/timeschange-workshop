import { useUqApp } from "App/UqApp";
import { Band, BandRadio, Page, Submit, useNav } from "tonwa-com";
import { BandIDNOInput, FieldsForm } from "tonwa-uq-com";
import { Gender, Role } from "uqs/JksWarehouse";
import { JksWarehouse } from "uqs";
import { MPerson } from "./UqPerson";

interface Props {
    role: Role;
    header: string | JSX.Element;
    onPersonAdded: (person: MPerson) => void;
}

export function AddPerson({ role, header, onPersonAdded }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
    let genderOptions = [
        { label: 'female', value: Gender.female },
        { label: 'male', value: Gender.male },
    ];
    let replacer = {
        'no': <BandIDNOInput label="NO" name="no" ID={JksWarehouse.Person} />,
        'gender': <BandRadio label="Gender" name="gender" options={genderOptions} />,
    }
    async function onSubmit(data: JksWarehouse.Person) {
        let ret = await JksWarehouse.ActIX({
            IX: JksWarehouse.IxPersonRole,
            ID: JksWarehouse.Person,
            values: [{
                ix: data,
                xi: role,
            }],
        });
        let id = ret[0];
        data.id = id;
        onPersonAdded(data as MPerson);
        nav.close();
    }
    return <Page header={header}>
        <FieldsForm className="m-3" fields={JksWarehouse.Person.fields} replacer={replacer}>
            <Band>
                <Submit onSubmit={onSubmit} />
            </Band>
        </FieldsForm>
    </Page>;
}
