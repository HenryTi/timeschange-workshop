import { FA, Page, useNav } from "tonwa-com";
import { User } from "tonwa-uq";
import { SelectUser } from "tonwa-uq-com";

interface Props {
    admin: 'user' | 'owner' | 'admin';
    onUserChanged: OnUserChanged;
}
export function ButtonAddUser({ admin, onUserChanged }: Props) {
    let nav = useNav();
    function PageAddUser() {
        let nav = useNav();
        async function onClick() {
            let ret = await nav.call<User>(<SelectUser header={'用户'} />);
            await onUserChanged(ret.id, 'add', admin);
            nav.close();
        }
        return <Page header="新增用户">
            <button onClick={onClick}>增加用户3</button>
        </Page>;
    }
    function onAddUser() {
        nav.open(<PageAddUser />);
    }
    return <button className="btn btn-small btn-link" onClick={onAddUser}><FA name="plus" /> 新增</button>
}

export type OnUserChanged = (userId: number, action: 'add' | 'del', admin: 'user' | 'owner' | 'admin') => Promise<void>;
