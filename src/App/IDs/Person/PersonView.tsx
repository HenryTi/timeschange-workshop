import { UserView } from "tonwa-uq-com";
import { LMR } from "tonwa-com";
import { MPerson } from "./UqPerson";

export function PersonView({ value }: { value: MPerson; }) {
    let { no, name, user } = value;
    return <div className="px-3 py-2">
        <div className="small text-muted me-3">{no} <UserView id={user} /></div>
        <div>
            {name} {user}
        </div>
    </div>;
}

export function renderSelectPerson(item: any) {
    let { no, name, firstName, lastName, middleName } = item;
    return <LMR className="w-100">
        {name ?? <>{lastName} {middleName} {firstName}</>}
        <span className="small text-muted">{no}</span>
    </LMR>;
}
