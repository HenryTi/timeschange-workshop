import { IconCommand } from "App/tool";
import { useUqApp } from "App/UqApp";
import { useNav } from "tonwa-com";
import { linkFace } from "./linkFace";
import { PageList } from "./PageList";

export function NotesLink() {
    let nav = useNav();
    let app = useUqApp();
    let { caption, icon, iconClass } = linkFace;
    async function onClick() {
        let { BzWorkshop } = app.uqs;
        let ret = await BzWorkshop.MyClients.query({});
        nav.open(<PageList items={ret.ret} />);
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
