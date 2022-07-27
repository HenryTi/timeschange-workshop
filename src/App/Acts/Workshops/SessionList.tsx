import { FA, renderDate, renderHourMinute, useNav } from "tonwa-com";
import { ListEdit, useListEdit } from "tonwa-uq-com";
import { MSession } from "./linkFace";
import { PageSession } from "./PageSession";

export function SessionList({ sessions }: { sessions: MSession[]; }) {
    let nav = useNav();
    function keyCompare(item1: MSession, item2: MSession) {
        return item1.id - item2.id > 0;
    }
    let listEditContext = useListEdit(sessions, keyCompare);
    function SessionView({ value }: { value: MSession; }) {
        let { date, time, span, substitue, done } = value;
        return <div className="px-3 py-2 d-block">
            <div>{renderDate(date)} {renderHourMinute(time)} {span}</div>
            <div>
                {done > 0 && <FA className="text-danger" name="check-circle-o" />}
                {substitue > 0 && <FA className="text-primary" name="star-o" />}
            </div>
        </div>;
    }
    function onSessionClick(session: MSession) {
        nav.open(<PageSession session={session} />);
    }
    return <ListEdit className="ms-4"
        context={listEditContext}
        ItemView={SessionView} onItemClick={onSessionClick} />;
}
