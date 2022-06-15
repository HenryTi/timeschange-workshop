import { useNav } from "tonwa-com";
import { SheetType } from "uqs/JksWarehouse";
import { IconCommand } from "../../IconCommand";
import { BinSheet } from "./BinSheet";

export const inCaption = '入库';
export const inIcon = 'desktop';
export const inIconClass = 'text-warning';

export function BinInLink() {
    let nav = useNav();
    function onClick() {
        nav.open(<BinSheet caption={inCaption + '单'} sheetType={SheetType.in} />);
    }
    return <IconCommand caption={inCaption} icon={inIcon} iconClass={inIconClass} onClick={onClick} />;
}
