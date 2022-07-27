import { FA, LMR, renderDate, useNav } from "tonwa-com";
import { IDListEdit, useIdListEdit } from "tonwa-uq-com";
import { Session } from "uqs/BzWorkshop";
import { PageEditSession } from "./PageEditSession";

interface Props {
    items: Session[];
}

export function ViewSessionList({ items }: Props) {
    let nav = useNav();
    let listEditContext = useIdListEdit<Session>(items);
    function onAdd() {
        alert('on add');
    }
    function ItemView({ value }: { value: Session; }) {
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
    function onItemChanged(item: Session) {
        listEditContext.onItemChanged(item);
    }
    function onItemClick(item: Session) {
        nav.open(<PageEditSession item={item} onItemChanged={onItemChanged} />);
    }
    let buttonAdd = <span className="text-success cursor-pointer" onClick={onAdd}>
        <FA name="plus" fixWidth={true} />
    </span>;
    return <>
        <LMR className="px-3 py-2 small text-muted tonwa-bg-gray-1 border-bottom rounded-top">
            <span>Sessions</span>
            {buttonAdd}
        </LMR>
        <IDListEdit context={listEditContext}
            ItemView={ItemView}
            onItemClick={onItemClick}
            none={<div className="small px-3 py-3 text-muted">Click {buttonAdd} to add session</div>} />
    </>
}
