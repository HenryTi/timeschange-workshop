import { UserUnit } from "tonwa-uq";
import { ListEdit, ListEditContext } from "tonwa-uq-com";
import { None } from "App/tool";

export function ViewUserUnitList({ userUnits }: { userUnits: UserUnit[] }) {
    let items = new ListEditContext<UserUnit>(userUnits, (item1, item2) => item1.unit > item2.unit);
    return <ListEdit context={items} none={<None />} />;
}
