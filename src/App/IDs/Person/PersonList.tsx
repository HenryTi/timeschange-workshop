import { FA, Page, Sep, useNav } from "tonwa-com";
import { IDListEdit, useIdListEdit } from "tonwa-uq-com";
import { Role } from "uqs/JksWarehouse";
import { AddPerson } from "./AddPerson";
import { MPerson } from "./UqPerson";
import { caption } from './PersonLink';
import { PersonDetail } from "./PersonDetail";
import { PersonView } from "./PersonView";
import { useUqApp } from "App/UqApp";

export function PersonList({ items }: {
    items: MPerson[];
}) {
    let nav = useNav();
    let app = useUqApp();
    let listEditContext = useIdListEdit(items);
    function onPersonAdded(person: MPerson) {
        listEditContext.onItemChanged(person);
    }
    let onAdd = async () => {
        nav.open(<AddPerson role={Role.staff} header={'Add ' + caption}
            onPersonAdded={onPersonAdded} />)
    }
    let right = <button className="btn btn-sm btn-primary me-2" onClick={onAdd}><FA name="plus" /></button>
    function onItemClick(item: MPerson) {
        nav.open(<PersonDetail person={item} fields={app.uqs.JksWarehouse.Person.fields} />);
    }
    return <Page header={caption} right={right}>
        <IDListEdit context={listEditContext} ItemView={PersonView} onItemClick={onItemClick} />
        <Sep />
    </Page>;
}
