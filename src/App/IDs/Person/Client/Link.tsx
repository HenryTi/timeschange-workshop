import { PersonLink } from "../PersonLink";
import { clientLinkFace } from "./linkFace";
import { PageList } from "./PageList";

export function ClientLink() {
    return <PersonLink face={clientLinkFace} PageList={PageList} />;
}
