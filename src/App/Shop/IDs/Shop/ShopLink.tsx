import { useNav } from "tonwa-com";
import { IconCommand } from "../../../tool";
import { ShopList } from "./ShopList";

export const caption = 'Shipper';
export const icon = 'book';
export const iconClass = 'text-warning';

export function ShopLink() {
    let nav = useNav();
    function onClick() {
        nav.open(<ShopList />);
    }
    return <IconCommand caption={caption} icon={icon} onClick={onClick} />;
}
