import { clientLinkFace, MPerson, PersonView } from "App/IDs";
import { WorkshopView } from "App/IDs/Workshop";
import { useUqApp } from "App/UqApp";
import { dateFromMinuteId, EasyTime, FA, Page, renderDate, useNav } from "tonwa-com";
import { IDListEdit, IdView, useIdListEdit } from "tonwa-uq-com";
import { Note, Person, Session, SessionPerson } from "uqs/BzWorkshop";
import { PageAddNote } from "./PageAddNote";
import { PersonHeader } from "./PersonHeader";

interface Props {
    client: Person;
    notes: Note[];
}

export function PageClient({ client, notes }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let listEditContext = useIdListEdit(notes);
    let { BzWorkshop } = app.uqs;
    function onAddNote() {
        nav.open(<PageAddNote client={client} onSaveNote={onSaveNote} />)
    }
    async function onSaveNote(data: any) {
        let note: Note = {
            ...data,
            staff: undefined,
            client: client.id,
            sensitive: data.sensitive === true ? 1 : 0,
            $type: 'note',
        };
        let ret = await BzWorkshop.SaveNote.submitReturns(note as any);
        note.id = ret.ret[0].id;
        listEditContext.onItemChanged(note);
    }
    let right = <button className="btn btn-sm btn-success me-2" onClick={onAddNote}>
        <FA name="plus" />
    </button>;
    function ItemView({ value }: { value: Note | SessionPerson; }) {
        let { id, $type } = value as (Note & { $type: string });
        let vLog: JSX.Element;
        function renderNote(note: Note) {
            let { note: noteContent, staff, sensitive } = note;
            let vLock: any;
            if (sensitive === 1) {
                vLock = <FA name="lock" className="text-danger me-3" />
                if (app.isPersonMe(staff) === true) {
                    return <div className="text-muted small">{vLock} #sensitive</div>;
                }
            }
            return <>{noteContent.split('\n').map((v, index) =>
                <div key={index} className="my-1">{vLock} {v}</div>
            )}</>;
        }
        function renderSessionPerson(sessionPerson: SessionPerson) {
            let { session, person, workshop } = sessionPerson;
            function StaffView({ value }: { value: MPerson; }) {
                return <PersonView value={value} face={clientLinkFace} />
            }
            function SessionView({ value }: { value: Session; }) {
                let { date, vice, time, span } = value;
                return <div className="p-3">
                    <div>
                        {renderDate(date)} &nbsp; &nbsp;
                        start at {time} &nbsp; &nbsp;
                        for {span} minutes &nbsp; &nbsp;
                    </div>
                    <div>{vice}</div>
                </div>;
            }
            return <>
                <div><IdView id={workshop} uq={BzWorkshop} ID={BzWorkshop.Workshop} Template={WorkshopView} /></div>
                <div><IdView id={session} uq={BzWorkshop} ID={BzWorkshop.Session} Template={SessionView} /></div>
                <div><IdView id={person} uq={BzWorkshop} ID={BzWorkshop.Person} Template={StaffView} /></div>
            </>;
        }
        switch ($type) {
            default: vLog = <>unknown type {$type}</>; break;
            case 'note': vLog = renderNote(value as Note); break;
            case 'sessionperson': vLog = renderSessionPerson(value as SessionPerson); break;
        }
        return <div className="">
            <div className="px-3 py-1 tonwa-bg-gray-1 small text-muted"><EasyTime date={dateFromMinuteId(id)} /></div>
            <div className="px-3 pt-1 pb-3">{vLog}</div>
        </div>
    }
    function onItemClick(item: Note) {
        alert(JSON.stringify(item));
    }
    return <Page header={<PersonHeader client={client} />} right={right}>
        <IDListEdit context={listEditContext} ItemView={ItemView} onItemClick={onItemClick} />
    </Page>
}
