import { WorkshopView } from "App/IDs/Workshop/WorkshopView";
import { useUqApp } from "App/UqApp";
import { Page } from "tonwa-com";
import { IdView, ListEdit, useListEdit } from "tonwa-uq-com";
import { linkFace, WorkshopItem } from "./linkFace";
import { SessionList } from "./SessionList";

interface Props {
    items: WorkshopItem[];
}

export function PageList({ items }: Props) {
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    let { caption } = linkFace;
    function keyCompare(item1: WorkshopItem, item2: WorkshopItem) {
        return item1.workshop - item2.workshop > 0;
    }
    let listEditContext = useListEdit(items, keyCompare);
    function ItemView({ value }: { value: WorkshopItem; }) {
        let { workshop, sessions } = value;
        function onWorkshopClick() {
            alert(JSON.stringify(workshop));
        }
        return <>
            <div className="mb-3">
                <div onClick={onWorkshopClick}
                    className="align-items-center cursor-pointer border-bottom tonwa-bg-gray-1">
                    <IdView uq={BzWorkshop} ID={BzWorkshop.Workshop} id={workshop} Template={WorkshopView as any} />
                </div>
                <div className="ms-3">
                    <SessionList sessions={sessions} />
                </div>
            </div>
            <div className="tonwa-bg-gray-2 h-1c" />
        </>;
    }
    return <Page header={caption}>
        <ListEdit context={listEditContext} ItemView={ItemView} />
    </Page>;
}
