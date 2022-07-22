import { Page, useNav } from "tonwa-com";
import { IDListEdit, useIdListEdit } from "tonwa-uq-com";
import { Role } from "uqs/BzWorkshop";
import { ButtonAdd } from "../ButtonAdd";
import { PersonEdit } from "../PersonEdit";
import { PersonView } from "../PersonView";
import { MPerson } from "../UqPerson";
import { caption, icon, iconClass } from "./consts";

export function PageList({ items }: { items: MPerson[]; }) {
    let nav = useNav();
    let listEditContext = useIdListEdit<MPerson>(items);
    function onItemClick(item: MPerson) {
        nav.open(<Page header={'Edit ' + caption}>
            <PersonEdit item={item} listEditContext={listEditContext} />
        </Page>);
    }
    function ItemView({ value }: { value: MPerson; }) {
        return <PersonView value={value} icon={icon} iconClass={iconClass} />;
    }
    let buttonAdd = <ButtonAdd caption={caption} role={Role.client} list={listEditContext} />;
    return <Page header={caption} right={buttonAdd}>
        <IDListEdit context={listEditContext} ItemView={ItemView} onItemClick={onItemClick} />
    </Page>;
}
