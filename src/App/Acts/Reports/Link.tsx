import { useNav } from "tonwa-com";
import { IconCommand } from "../../IconCommand";
import { PageInventory } from "./PageInventory";

export const caption = '库存账';
export const inIcon = 'desktop';
export const inIconClass = 'text-warning';

export function ReportInventoryLink() {
    let nav = useNav();
    function onClick() {
        nav.open(<PageInventory caption={caption} />);
    }
    return <IconCommand caption={caption} icon={inIcon} iconClass={inIconClass} onClick={onClick} />;
}
