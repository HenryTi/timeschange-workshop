import { IconCommand } from "App/tool";
import { useNav } from "tonwa-com";
import { Role } from "uqs/BzWorkshop";
import { useUqPerson } from "../UqPerson";
import { PageList } from "./PageList";
import { caption, icon, iconClass } from "./consts";

export function StaffLink() {
    let nav = useNav();
    let uqPerson = useUqPerson(Role.staff);
    async function onClick() {
        let items = await uqPerson.loadList();
        nav.open(<PageList items={items} />);
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
