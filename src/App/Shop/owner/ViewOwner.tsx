import { None } from "App/tool";
import { useState } from "react";
import { FA, LMR, Page, useNav } from "tonwa-com";
import { UserUnit } from "tonwa-uq";
import { ListEdit, ListEditContext } from "tonwa-uq-com";
import { ButtonAddUser, OnUserChanged } from "../ButtonAddUser";
import { Me } from "../Me";
import { ViewUser } from "../ViewUser";

export function ViewOwner({ me, userUnits, onUserChanged }: { me: number; userUnits: UserUnit[]; onUserChanged: OnUserChanged; }) {
    let nav = useNav();
    let listEditContext = new ListEditContext<UserUnit>(userUnits, (item1, item2) => item1.unit > item2.unit);

    function ItemView({ value }: { value: UserUnit }) {
        let [userUnit, setUserUnit] = useState(value);
        async function onAssignChanged(assigned: string) {
            setUserUnit({ ...value, assigned });
        }
        function iQuitOwner() {
            function PageIQuitOwner() {
                async function confirmQuit() {
                    alert('yes');
                    onUserChanged(value.user, "del", "owner");
                    nav.close();
                }
                return <Page header="退出拥有者">
                    <div className="w-20c rounded border px-3 py-4 mx-auto my-3 text-center">
                        <LMR>
                            <FA name="question-circle-o" size="3x" className="text-danger me-3" />
                            <div className="text-start">
                                <b>真的要退出拥有者吗？</b>
                                <br />
                                <small className="text-muted">你将无法设置角色权限</small>
                                <br />
                                <br />
                                <button className="btn btn-outline-primary" onClick={confirmQuit}>确认退出</button>
                            </div>
                            <span></span>
                        </LMR>
                    </div>
                </Page>;
            }
            nav.open(<PageIQuitOwner />);
        }
        if (value.user === me) {
            let vIQuitOwner: any;
            if (userUnits.length > 1) {
                vIQuitOwner = <span className="cursor-pointer" onClick={iQuitOwner}>
                    <FA name="times" className="text-info" />
                </span>;
            }
            return <Me right={vIQuitOwner} />;
        }
        return <div className="px-3 py-2">
            <ViewUser user={userUnit} onAssignChanged={onAssignChanged} pageHeader={"拥有者"} />
        </div>;

    }

    return <>
        <div className="card mt-3 mx-1">
            <div className="card-header pe-0 py-0">
                <LMR className="align-items-center">
                    <span>拥有者</span>
                    <ButtonAddUser admin="owner" onUserChanged={onUserChanged} />
                </LMR>
            </div>
            <ListEdit context={listEditContext} none={<None />} ItemView={ItemView} />
        </div>
        <ul className="small text-muted mt-2 mb-5 mx-3">
            <li>拥有者可以增加其他拥有者</li>
            <li>拥有者可以增减管理员</li>
        </ul>
    </>;
}
