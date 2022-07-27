import { createUqTagProps } from "App/tool";
import { useUqApp } from "App/UqApp";
import { Page, Sep } from "tonwa-com";
import { FieldsDetail, TagInput } from "tonwa-uq-com";
import { Session, TagGroupNames, Workshop } from "uqs/BzWorkshop";
import { workshopLinkFace } from "./linkFace";
import { ViewSessionList } from "./ViewSessionList";

interface Props {
    item: Workshop;
    sessions: Session[];
    onItemChanged: (item: Workshop) => void;
}

export function PageEditWorkshop({ item, sessions, onItemChanged }: Props) {
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    let uqTagProps = createUqTagProps(app.uqs);
    async function onValuesChanged(values: { name: string; value: any; preValue: any; }) {
        let { id } = item;
        let { name, value } = values;
        await BzWorkshop.ActIDProp(BzWorkshop.Workshop, id, name, value);
        let newPerson = { ...item };
        (newPerson as any)[name] = value;
        onItemChanged(newPerson);
    }
    return <Page header={'Edit ' + workshopLinkFace.caption}>
        <FieldsDetail values={item}
            fields={BzWorkshop.Workshop.fields}
            onValuesChanged={onValuesChanged} />
        <TagInput id={item.id} uqTagProps={uqTagProps} tagGroupName={TagGroupNames.workshop} />
        <Sep />
        <div className="my-3 border rounded">
            <ViewSessionList items={sessions} />
        </div>
    </Page>;
    /*
        {this.renderStaffPick()}

        {this.renderTagInput()}

        <div className="my-3 border rounded-3">
            {this.controller.cSession.renderList()}
        </div>
    */
}
