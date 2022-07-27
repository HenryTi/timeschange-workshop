import { Page, Sep, useNav } from "tonwa-com";
import { IDListEdit, TagInput, useIdListEdit } from "tonwa-uq-com";
import { ButtonAdd } from "../ButtonAdd";
import { PersonEdit } from "../PersonEdit";
import { PersonView } from "../PersonView";
import { MPerson } from "../defines";
import { clientLinkFace } from "./linkFace";
import { useUqApp } from "App/UqApp";
import { createUqTagProps } from "App/tool";
import { ButtonDelete } from "../ButtonDelete";
import { TagGroupNames } from "uqs/BzWorkshop";

export function PageList({ items }: { items: MPerson[]; }) {
    let nav = useNav();
    let listEditContext = useIdListEdit<MPerson>(items);
    let { caption } = clientLinkFace;
    function PageEdit({ item }: { item: MPerson; }) {
        let app = useUqApp();
        let uqTagProps = createUqTagProps(app.uqs);
        return <Page header={'Edit ' + caption}>
            <PersonEdit item={item} listEditContext={listEditContext} />
            <Sep />
            <TagInput id={item.id} uqTagProps={uqTagProps} tagGroupName={TagGroupNames.client} />
            <ButtonDelete item={item} face={clientLinkFace} listEditContext={listEditContext} />
        </Page>;
    }
    function onItemClick(item: MPerson) {
        nav.open(<PageEdit item={item} />);
    }
    function ItemView({ value }: { value: MPerson; }) {
        return <PersonView value={value} face={clientLinkFace} />;
    }
    let buttonAdd = <ButtonAdd face={clientLinkFace} list={listEditContext} />;
    return <Page header={caption} right={buttonAdd}>
        <IDListEdit context={listEditContext} ItemView={ItemView} onItemClick={onItemClick} />
    </Page>;
}
