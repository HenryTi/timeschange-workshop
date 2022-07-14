import { useNav } from "tonwa-com";
import { IconCommand } from "../../IconCommand";
import { IndustryList } from "./IndustryList";

export const caption = '行业产品';
export const icon = 'book';
export const iconClass = 'text-warning';

export function ProductLink() {
    let nav = useNav();
    function onClick() {
        nav.open(<IndustryList />);
    }
    return <IconCommand caption={caption} icon={icon} onClick={onClick} />;
}
