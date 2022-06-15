import { useNav } from "tonwa-com";
import { IconCommand } from "../../IconCommand";
import { ShipperList } from "./ShipperList";

export const caption = 'Shipper';
export const icon = 'book';
export const iconClass = 'text-warning';

export function ShipperLink() {
    let nav = useNav();
    function onClick() {
        nav.open(<ShipperList />);
    }
    return <IconCommand caption={caption} icon={icon} onClick={onClick} />;
}
