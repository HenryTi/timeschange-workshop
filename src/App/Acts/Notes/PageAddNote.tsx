import { useUqApp } from "App/UqApp";
import { Band, BandCheck, Page, Submit, useNav } from "tonwa-com";
import { FieldsForm } from "tonwa-uq-com";
import { Person } from "uqs/BzWorkshop";
import { PersonHeader } from "./PersonHeader";

interface Props {
    client: Person;
    onSaveNote: (data: any) => Promise<void>;
}

export function PageAddNote({ client, onSaveNote }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    async function onSubmit(data: any) {
        await onSaveNote(data);
        nav.close();
    }
    let replacer: { [fieldName: string]: JSX.Element } = {
        'staff': null,
        'client': null,
        'sensitive': <BandCheck label="Sensitive" name="sensitive" />,
    }
    return <Page header={<PersonHeader client={client} />}>
        <FieldsForm className="m-3" fields={BzWorkshop.Note.fields} replacer={replacer}>
            <Band>
                <Submit onSubmit={onSubmit}>Add note</Submit>
            </Band>
        </FieldsForm>
    </Page>
}
