import { Person } from "uqs/BzWorkshop";

interface Props {
    client: Person;
}

export function PersonHeader({ client }: Props) {
    let { firstName, lastName, no } = client;
    return <>{firstName} {lastName} &nbsp; <small className="text-muted">{no}</small></>;
}
