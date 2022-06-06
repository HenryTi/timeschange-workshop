import { IconCommand } from "../../IconCommand";
import { useNav } from "tonwa-com";
import { PersonList } from "./PersonList";
import { useUqPerson } from "./UqPerson";

export const caption = 'Person';
export const icon = 'user';
export const iconClass: string = 'text-primary';

export function PersonLink() {
    let nav = useNav();
    let uqPerson = useUqPerson();
    let onClick = () => {
        nav.open(async () => {
            let items = await uqPerson.loadList();
            return <PersonList items={items} />;
        });
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
