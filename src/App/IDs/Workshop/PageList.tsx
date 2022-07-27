import { useUqApp } from "App/UqApp";
import { Page, Sep, useNav } from "tonwa-com";
import { IDListEdit, useIdListEdit } from "tonwa-uq-com";
import { Session, Workshop } from "uqs/BzWorkshop";
import { ButtonAdd } from "./ButtonAdd";
import { workshopLinkFace } from "./linkFace";
import { PageEditWorkshop } from "./PageEditWorkshop";
import { WorkshopView } from "./WorkshopView";

export function PageList({ items }: { items: Workshop[]; }) {
    let nav = useNav();
    let app = useUqApp();
    let listEditContext = useIdListEdit<Workshop>(items);
    let { caption } = workshopLinkFace;
    let buttonAdd = <ButtonAdd face={workshopLinkFace} list={listEditContext} />;
    function onItemChanged(item: Workshop) {
        alert(JSON.stringify(item));
    }
    async function onItemClick(item: Workshop) {
        let { BzWorkshop } = app.uqs;
        let ret = await BzWorkshop.QueryID<Session>({
            IX: [BzWorkshop.IxWorkshopSession],
            IDX: [BzWorkshop.Session],
            ix: item.id,
        });
        nav.open(<PageEditWorkshop item={item} sessions={ret} onItemChanged={onItemChanged} />);
    }
    return <Page header={caption} right={buttonAdd}>
        <IDListEdit context={listEditContext} ItemView={WorkshopView} onItemClick={onItemClick} />
        <Sep sep={2} />
    </Page>;
}
