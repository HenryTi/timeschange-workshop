import { WorkshopView } from "App/IDs/Workshop";
import { useUqApp } from "App/UqApp";
import { FA, LMR, Page, renderDate, renderHourMinute } from "tonwa-com";
import { IdView, ListEdit, useListEdit } from "tonwa-uq-com";
import { MSession } from "./linkFace";

interface Props {
    session: MSession;
}

export function PageSession({ session }: Props) {
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    let { date, time, span, substitue, done, workshop } = session;
    function keyCompare(item1: MSession, item2: MSession) {
        return item1.id - item2.id > 0;
    }
    let listEditContext = useListEdit([], keyCompare);
    function onAddAttendee() {
    }
    return <Page header="Session">
        <IdView uq={BzWorkshop} ID={BzWorkshop.Workshop} id={workshop} Template={WorkshopView as any} />
        <div className="px-3 py-2 d-block">
            <div>{renderDate(date)} {renderHourMinute(time)} {span}</div>
            <div>
                {done > 0 && <FA className="text-danger" name="check-circle-o" />}
                {substitue > 0 && <FA className="text-primary" name="star-o" />}
            </div>
        </div>
        <div className="mt-3">
            <LMR className="px-3 mb-2 align-items-end">
                <span>Attendees</span>
                <button className="btn btn-sm btn-outline-primary" onClick={onAddAttendee}>
                    <FA name="plus" />
                </button>
            </LMR>
            <ListEdit context={listEditContext} />
        </div>
    </Page>;
}