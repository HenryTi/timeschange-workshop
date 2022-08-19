import { FA, LMR } from "tonwa-com";
import { UserUnit } from "tonwa-uq";
import { ListEdit, ListEditContext } from "tonwa-uq-com";
import { EnumRole, Enumshop } from "uqs/BzUShop";
import { roleItemLables } from "../roleItemLables";

export function ViewRoles({ roleItems, users }: { roleItems: string[], users: UserUnit[] }) {
    let roleCaptions = roleItems.map(v => roleItemLables[v as (EnumRole | Enumshop)]);
    let listEditContext = new ListEditContext(users, (item1, item2) => item1.user === item2.user);

    function ItemView({ value }: { value: UserUnit }) {
        return <div className="px-3 py-2">
            {value.user}
        </div>;
    }
    return <>
        {roleCaptions.join(', ')}
        <div className="card mt-3 mx-3">
            <div className="card-header">
                <LMR className="align-items-center">
                    <span>用户</span>
                    <button className="btn btn-small btn-link"><FA name="plus" /> 新增</button>
                </LMR>
            </div>
            <ListEdit context={listEditContext} ItemView={ItemView} />
        </div>
        <ul className="small text-muted mt-2 mb-5 mx-3">
            <li>说明1</li>
            <li>说明2</li>
        </ul>
    </>;
}
