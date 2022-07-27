import { useUqApp } from "App/UqApp";
import { IDListEditContext } from "tonwa-uq-com";
import { PersonDetail } from "./PersonDetail";
import { MPerson } from "./defines";

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
    return <PersonDetail person={item}
        fields={BzWorkshop.Person.fields}
        onPersonChanged={onPersonChanged} />;
}
