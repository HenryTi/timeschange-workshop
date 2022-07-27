import { PageList } from "./PageList";
import { faceProps } from "./faceProps";
import { PersonLink } from "../PersonLink";

export function StaffLink() {
    return <PersonLink face={faceProps} PageList={PageList} />;
}
