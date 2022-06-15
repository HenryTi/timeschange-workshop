import { useNav } from "tonwa-com";
import { IconCommand } from "../../IconCommand";
import { BinList } from "./List";

export const caption = 'Bin';
export const icon = 'book';
export const iconClass = 'text-warning';

export function BinLink() {
    let nav = useNav();
    function onClick() {
        nav.open(<BinList />);
    }
    return <IconCommand caption={caption} icon={icon} onClick={onClick} />;
}
