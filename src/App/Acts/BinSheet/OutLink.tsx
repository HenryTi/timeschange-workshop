import { useNav } from "tonwa-com";
import { SheetType } from "uqs/JksWarehouse";
import { IconCommand } from "../../IconCommand";
import { BinSheet } from "./BinSheet";

export const outCaption = '出库';
export const outIcon = 'desktop';
export const outIconClass = 'text-warning';

export function BinOutLink() {
    let nav = useNav();
    function onClick() {
        nav.open(<BinSheet caption={outCaption + '单'} sheetType={SheetType.out} />);
    }
    return <IconCommand caption={outCaption} icon={outIcon} iconClass={outIconClass} onClick={onClick} />;
}
