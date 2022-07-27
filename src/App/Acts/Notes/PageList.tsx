import { MPerson, PersonView, clientLinkFace } from "App/IDs";
import { useUqApp } from "App/UqApp";
import { FA, LMR, Page, Sep, useNav } from "tonwa-com";
import { IDListEdit, IDSelect, useIdListEdit } from "tonwa-uq-com";
import { Person, Role } from "uqs/BzWorkshop";
import { linkFace } from "./linkFace";
import { PageClient } from "./PageClient";

interface Props {
    items: Person[];
}

export function PageList({ items }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    let { caption } = linkFace;
    let listEditContext = useIdListEdit<Person>(items);
    function ItemView({ value }: { value: Person; }) {
        return <LMR className="pe-3 align-items-center">
            <PersonView value={value as MPerson} face={clientLinkFace} />
            <FA name="angle-right" />
        </LMR>;
    }
    async function onItemClick(item: Person) {
        let ret = await BzWorkshop.IXValues({
            IX: BzWorkshop.IxPersonLog,
            ix: item.id,
            order: 'desc',
        })
        let notes: any[] = [];
        for (let row of ret) {
            let { type, value } = row;
            let obj: any = BzWorkshop.IDValue(type, value);
            if (obj !== undefined) {
                obj['$type'] = type;
                notes.push(obj);
            }
        }
        nav.open(<PageClient client={item} notes={notes} />);
    }
    async function onSearch() {
        async function query(key: string): Promise<any[]> {
            let result = await BzWorkshop.PersonSearch.query({ role: Role.client, key });
            let { ret } = result;
            return ret;
        }
        let ret = await nav.call<Person>(<IDSelect Row={ItemView} query={query} />);
        await onItemClick(ret);
    }
    let right = <button className="btn btn-sm btn-primary me-2" onClick={onSearch}>
        <FA name="search" />
    </button>;
    return <Page header={caption} right={right}>
        <IDListEdit context={listEditContext} ItemView={ItemView} onItemClick={onItemClick} />
        <Sep sep={2} />
    </Page>;
}