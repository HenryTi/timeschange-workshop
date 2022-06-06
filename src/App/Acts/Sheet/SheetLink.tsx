import { useNav } from "tonwa-com";
import { IconCommand } from "../../IconCommand";
import { consts } from "./consts";
import { SheetAct } from "./SheetAct";

export function SheetLink() {
    let nav = useNav();
    function onClick() {
        nav.open(<SheetAct />);
    }
    let { caption, icon, iconClass } = consts;
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
