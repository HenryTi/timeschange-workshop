import { IconCommand } from "App/tool";
import { useNav } from "tonwa-com";
import { Role } from "uqs/BzWorkshop";
import { useUqPerson } from "../UqPerson";
import { caption, icon, iconClass } from "./consts";
import { PageList } from "./PageList";

export function ClientLink() {
    let nav = useNav();
    let uqPerson = useUqPerson(Role.client);
    async function onClick() {
        let items = await uqPerson.loadList();
        nav.open(<PageList items={items} />);
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
