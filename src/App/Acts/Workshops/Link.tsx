import { IconCommand } from "App/tool";
import { useUqApp } from "App/UqApp";
import { useNav } from "tonwa-com";
import { linkFace, WorkshopItem } from "./linkFace";
import { PageList } from "./PageList";

export function WorkshopsLink() {
    let nav = useNav();
    let app = useUqApp();
    let { caption, icon, iconClass } = linkFace;
    async function onClick() {
        let ret = await app.uqs.BzWorkshop.MySessions.query({});
        let coll: { [id: number]: WorkshopItem } = {};
        let workshopItems: WorkshopItem[] = [];
        for (let row of ret.ret) {
            let { workshop } = row;
            let workshopItem = coll[workshop];
            if (!workshopItem) {
                workshopItem = { workshop, sessions: [] };
                coll[workshop] = workshopItem;
                workshopItems.push(workshopItem);
            }
            workshopItem.sessions.push(row);
        }
        workshopItems.sort((a, b) => {
            let { workshop: wa } = a;
            let { workshop: wb } = b;
            if (wa > wb) return -1;
            if (wa === wb) return 0;
            return 1;
        })
        nav.open(<PageList items={workshopItems} />);
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
