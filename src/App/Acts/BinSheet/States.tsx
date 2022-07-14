import { useUqApp } from "App/UqApp";
import { Page, useNav } from "tonwa-com";
import { NameSheetAct } from "uqs/JksWarehouse";

interface Props {
    sheet: number;
    state: string;
    done: (act: string) => Promise<void>;
}

export function SheetStates({ sheet, state, done }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;

    const states: { [name: string]: () => JSX.Element } = {
        start: StartState,
    }
    const auditIn = '核准入库';

    return <div className="m-3">
        {states[state]()}
    </div>;

    function StartState() {
        async function Pass() {
            let act = NameSheetAct.ToEnd;
            await JksWarehouse.BinSheetAct.submit({ sheet, act });
            done?.(act);
            nav.cease();
            nav.open(<Page header={'完成'} contentClassName="p-5" back="close">
                <div className="mb-5">{auditIn}已提交。</div>
                <div>
                    <button className="btn btn-primary me-3" onClick={close}>退出</button>
                    <button className="btn btn-primary me-3" onClick={next}>下一个</button>
                </div>
            </Page>);
        }
        return <>
            <button className="btn btn-primary me-3" onClick={Pass}>{auditIn}</button>
        </>;
    }

    function close() {
        nav.close(1);
    }
    function next() {
        nav.close(1);
    }
}
