import { ProductView } from "App/IDs/Product";
import { createIndustrySpec, IndustrySpec } from "App/Industry";
import { useUqApp } from "App/UqApp";
import { Band, BandFormErrors, BandInt, BandString, Form, Page, PickQueryPage, SearchBox, String, Submit, useNav } from "tonwa-com";
import { Product, SpecSheet, SpecSheetRow } from "uqs/JksWarehouse";

interface Props {
    sheet: SpecSheet;
    row?: SpecSheetRow;
    onRowChanged: (row: SpecSheetRow) => Promise<void>;
}

export function Detail({ sheet, row, onRowChanged }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
    let product: Product;
    let spec: string;
    let inputIndustrySpec: IndustrySpec;
    return <SelectProduct />;

    function SelectProduct() {
        async function onSearch(key: string) {
            async function query() {
                return await JksWarehouse.QueryID<Product>({
                    ID: JksWarehouse.Product,
                    key: {
                        no: key,
                        discription: key,
                    }
                });
            }
            product = await nav.call<Product>(<PickQueryPage query={query} header="选择产品" ItemView={ProductView} />);
            inputIndustrySpec = createIndustrySpec(product.industry);
            nav.close();
            nav.open(<InputSpecDetail />);
        }
        return <Page header="明细" back="close">
            <div>选择产品</div>
            <SearchBox onSearch={onSearch} placeholder="产品编号或名称" allowEmptySearch={true} />
        </Page>;
    }

    function InputSpecDetail() {
        async function onSubmit(data: any) {
            spec = data.spec + '@' + inputIndustrySpec.caption;
            nav.open(<InputQuanity />)
        }
        return <Page header="产品批次" back="close">
            <Form className="m-3"
                values={{ spec }}
            >
                <BandFormErrors />
                <Band label="产品">
                    <ProductView value={product} />
                </Band>
                {inputIndustrySpec.renderInputBands()}
                <Band>
                    <Submit onSubmit={onSubmit} />
                </Band>
            </Form>
        </Page>;
    }

    function InputQuanity() {
        async function onSubmit(data: any) {
            let { quantity } = data;
            await onRowChanged({ sheet: sheet.id, id: undefined, bin: 0, spec: 0, quantity });
            nav.close(2);
            nav.open(<SelectProduct />);
        }
        return <Page header="产品数量" back="close">
            <Form className="m-3"
                values={{ spec }}
            >
                <BandFormErrors />
                <Band label="产品">
                    <ProductView value={product} />
                </Band>
                {inputIndustrySpec.renderViewBands()}
                <BandInt label="数量" name="quantity" placeholder="请输入数量" min={0} />
                <Band>
                    <Submit onSubmit={onSubmit} />
                </Band>
            </Form>
        </Page>;
    }

    function DetailSubmit({ row: value, onRowChanged }: Props) {
        let nav = useNav();
        function onFinish() {
            onRowChanged({ sheet: 0, id: 0, bin: 0, spec: 0, quantity: 1 });
            nav.close();
        }
        function onContinue() {
            onRowChanged({ sheet: 0, id: 0, bin: 0, spec: 0, quantity: 2 });
            nav.close();
            nav.open(<Detail sheet={sheet} onRowChanged={onRowChanged} />);
        }
        let btnSubmit = <button className="btn btn-primary me-3" onClick={onFinish}>提交</button>;
        let btnContinue = <button className="btn btn-primary me-3" onClick={onContinue}>提交后继续新增</button>;
        let buttons = value === undefined ?
            <>{btnContinue} {btnSubmit}</> : <>{btnSubmit} {btnContinue}</>;
        return <Page header="明细" back="close">
            <div>明细</div>
            <div>{buttons}</div>
        </Page>;
    }

}
