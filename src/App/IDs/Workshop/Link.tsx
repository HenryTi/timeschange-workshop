import { IconCommand } from "App/tool";
import { useUqApp } from "App/UqApp";
import { useNav } from "tonwa-com";
import { Workshop } from "uqs/BzWorkshop";
import { workshopLinkFace } from "./linkFace";
import { PageList } from "./PageList";

export function WorkshopLink() {
    let nav = useNav();
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    let { caption, icon, iconClass } = workshopLinkFace;
    async function onClick() {
        let items: Workshop[] = await BzWorkshop.QueryID({
            ID: BzWorkshop.Workshop,
            page: { start: 0, size: 10 },
            order: 'desc',
        });
        nav.open(<PageList items={items} />);
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
