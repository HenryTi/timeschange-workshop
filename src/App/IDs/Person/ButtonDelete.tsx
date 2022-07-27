import { useUqApp } from "App/UqApp";
import { FA, Sep, useNav } from "tonwa-com";
import { IDListEditContext } from "tonwa-uq-com";
import { MPerson, PersonLinkFace } from "./defines";

interface Props {
    item: MPerson;
    face: PersonLinkFace;
    listEditContext: IDListEditContext<MPerson>;
}

export function ButtonDelete({ item, face, listEditContext }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;

    async function onPersonDeleted() {
        if (await nav.confirm('Do you really want to delete?') === false) return;
        await BzWorkshop.ActIX({
            IX: BzWorkshop.IxPersonRole,
            values: [
                { ix: item.id, xi: -face.role }
            ]
        });
        listEditContext.onItemDeleted(item);
        nav.close();
    }

    return <>
        <Sep sep={2} />
        <div className="d-flex p-3">
            <div className="flex-grow-1" />
            <button className="btn btn-outline-primary" onClick={onPersonDeleted}>
                <FA name="trash" /> Delete
            </button>
        </div>
    </>
}