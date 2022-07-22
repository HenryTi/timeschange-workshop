import { FA } from "tonwa-com";
import { UserView } from "tonwa-uq-com";
import { MPerson } from "./UqPerson";

interface Props {
    value: MPerson;
    icon: string;
    iconClass: string;
    roleTitle?: JSX.Element;
}

export function PersonView({ value, icon, iconClass, roleTitle }: Props) {
    let { no, name, firstName, lastName, middleName, user } = value;
    return <div className="px-3 py-2 d-flex" >
        <div className="me-3">
            <FA name={icon} className={iconClass} size="lg" />
        </div>
        <div>
            {roleTitle && <div>{roleTitle}</div>}
            <div className="small text-muted me-3">{no} <UserView id={user} /></div>
            <div>
                {name ?? <>{firstName} {middleName} {lastName}</>}
            </div>
        </div>
    </div>;
}
