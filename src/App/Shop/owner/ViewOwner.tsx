import { FA, LMR } from "tonwa-com";
import { UserUnit } from "tonwa-uq";
import { ViewUserUnitList } from "../ViewUserUnitList";

export function ViewOwner({ me, userUnits }: { me: boolean; userUnits: UserUnit[]; }) {
    return <>
        <div className="card mt-3 mx-3">
            <div className="card-header">
                <LMR className="align-items-center">
                    <span>拥有者</span>
                    <button className="btn btn-small btn-link"><FA name="plus" /> 新增</button>
                </LMR>
            </div>
            {me && <div className="text-success px-3 py-2 border-bottom">[自己]</div>}
            <ViewUserUnitList userUnits={userUnits} />
        </div>
        <ul className="small text-muted mt-2 mb-5 mx-3">
            <li>拥有者可以增加其他拥有者</li>
            <li>拥有者可以增减管理员</li>
        </ul>
    </>;
}
