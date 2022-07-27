import { FA } from "tonwa-com";
import { UserView } from "tonwa-uq-com";
import { PersonLinkFace, MPerson } from "./defines";

interface Props {
    value: MPerson;
    face: PersonLinkFace;
    roleTitle?: JSX.Element;
}

export function PersonView({ value, face, roleTitle }: Props) {
    let { no, name, firstName, lastName, middleName, user } = value;
    let { icon, iconClass } = face;
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
