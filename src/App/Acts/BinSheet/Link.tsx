import { useNav } from "tonwa-com";
import { IconCommand } from "../../IconCommand";
import { PagePending } from "./Pending";
import { PageBinSheet } from "./BinSheet";
import { NameSheetState, NameSheetType } from "uqs/JksWarehouse";

const pending = '待';

export const inCaption = '入库';
export const inIcon = 'desktop';
export const inIconClass = 'text-warning';

export function BinInLink() {
    let nav = useNav();
    function onClick() {
        nav.open(<PageBinSheet caption={inCaption + '单'} sheetType={NameSheetType.BinIn} />);
    }
    return <IconCommand caption={`${inCaption}制单`} icon={inIcon} iconClass={inIconClass} onClick={onClick} />;
}

export const inPendingIcon = 'desktop';
export const inPendingIconClass = 'text-warning';

export function BinInPendingLink() {
    let caption = `${pending}${inCaption}`;
    let nav = useNav();
    function onClick() {
        nav.open(<PagePending caption={caption} sheetType={NameSheetType.BinIn}
            state={NameSheetState.Start} />);
    }
    return <IconCommand caption={caption} icon={inPendingIcon} iconClass={inPendingIconClass} onClick={onClick} />;
}

export const outCaption = '出库';
export const outIcon = 'desktop';
export const outIconClass = 'text-warning';

export function BinOutLink() {
    let nav = useNav();
    function onClick() {
        nav.open(<PageBinSheet caption={outCaption + '单'} sheetType={NameSheetType.BinOut} />);
    }
    return <IconCommand caption={`${outCaption}制单`} icon={outIcon} iconClass={outIconClass} onClick={onClick} />;
}

export const outPendingIcon = 'desktop';
export const outPendingIconClass = 'text-warning';

export function BinOutPendingLink() {
    let caption = `${pending}${outCaption}`;
    let nav = useNav();
    function onClick() {
        nav.open(<PagePending caption={caption} sheetType={NameSheetType.BinOut}
            state={NameSheetState.Start} />);
    }
    return <IconCommand caption={caption} icon={outPendingIcon} iconClass={outPendingIconClass} onClick={onClick} />;
}
