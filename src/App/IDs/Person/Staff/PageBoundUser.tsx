import { LMR, Page, useNav } from "tonwa-com";
import { UserView } from "tonwa-uq-com";

interface Props {
    userBound: number;
    onChangeUser: () => Promise<void>;
    onUserUnbound: () => Promise<void>;
}

export function PageBoundUser({ userBound, onChangeUser, onUserUnbound }: Props) {
    let nav = useNav();
    let btnRemove = <button className="btn btn-outline-secondary"
        onClick={onRemoveBound}>
        Remove bound
    </button>;

    async function onChange() {
        if (await nav.confirm('Change user account bound is not recommented. Still want to do so?') === false) return;
        await onChangeUser();
        nav.close(1);
    }

    async function onRemoveBound() {
        if (await nav.confirm('Removing user account, the user can not do jobs. Still want to do so?') === false) return;
        await onUserUnbound();
    }
    return <Page header="Bound user" back="close">
        <div className="m-5 rounded-3 border bg-white w-max-30c p-5 mx-auto border-5">
            <div className="mb-5 text-center">
                The person has bound to website user account:
                <br /><br />
                <UserView id={userBound} />
            </div>
            <LMR className="">
                <button className="btn btn-primary" onClick={onChange}>Change user</button>
                {btnRemove}
            </LMR>
        </div>
    </Page>;
}
