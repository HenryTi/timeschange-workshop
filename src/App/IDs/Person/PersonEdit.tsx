import { useUqApp } from "App/UqApp";
import { Sep } from "tonwa-com";
import { IDListEditContext } from "tonwa-uq-com";
import { PersonDetail } from "./PersonDetail";
import { MPerson } from "./UqPerson";

interface Props {
    item: MPerson;
    listEditContext: IDListEditContext<MPerson>;
}

export function PersonEdit({ item, listEditContext }: Props) {
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    function onPersonChanged(person: MPerson) {
        listEditContext.onItemChanged(person);
    }
    function onPersonDeleted() {
        listEditContext.onItemDeleted(item);
    }
    return <>
        <PersonDetail person={item} fields={BzWorkshop.Person.fields}
            onPersonChanged={onPersonChanged} />
        <Sep sep={2} />
        <div className="d-flex p-3">
            <div className="flex-grow-1" />
            <button className="btn btn-outline-primary" onClick={onPersonDeleted}>delete</button>
        </div>
    </>;
}
