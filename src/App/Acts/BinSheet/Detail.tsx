import { SpecInput, SpecNewMode } from "App/Industry";
import { ProductView } from "App/IDs/Product";
import { createIndustrySpec, IndustrySpec } from "App/Industry";
import { useUqApp } from "App/UqApp";
import { Band, BandFormErrors, BandInt, Form, Page, PickQueryPage, ruleIsRequired, SearchBox, Submit, useNav } from "tonwa-com";
import { Product, BinSheet, BinSheetRow, Industry } from "uqs/JksWarehouse";

interface Props {
    sheet: BinSheet;
    row?: BinSheetRow;
    specNewMode: SpecNewMode;
    onRowChanged: (row: BinSheetRow) => Promise<void>;
}

export function Detail({ sheet, row, specNewMode, onRowChanged }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { JksWarehouse } = app.uqs;
    let product: Product;
    let spec: any;
    let inputIndustrySpec: IndustrySpec;
    return <SelectProduct />;

    function onSpecInputed(specItem: any) {
        spec = specItem;
        nav.open(<InputQuanity />);
    }

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
            function ItemView({ value }: { value: Product }) {
                return <div className="px-3 py-2">
                    <ProductView value={value} />
                </div>;
            }
            product = await nav.call<Product>(<PickQueryPage query={query} header="选择产品" ItemView={ItemView} />);
            let industry = await JksWarehouse.idObj<Industry>(product.industry);
            inputIndustrySpec = createIndustrySpec(app, product, industry);
            nav.close();
            nav.open(<SpecInput
                newMode={specNewMode}
                inputIndustrySpec={inputIndustrySpec}
                onInputed={onSpecInputed} />);
        }
        return <Page header={'明细 - 选择产品'} back="close">
            <SearchBox className="m-3" onSearch={onSearch}
                placeholder="产品编号或名称"
                allowEmptySearch={true} />
        </Page>;
    }

    function InputQuanity() {
        async function onSubmit(data: any) {
            let { quantity } = data;
            await onRowChanged({ sheet: sheet.id, id: undefined, bin: 0, spec: spec.id, quantity });
            nav.close(2);
            nav.open(<SelectProduct />);
        }
        return <Page header="产品数量" back="close">
            <Form className="m-3"
                values={spec}
            >
                <BandFormErrors />
                <Band label="产品">
                    <ProductView value={product} />
                </Band>
                {inputIndustrySpec.renderViewBands()}
                <BandInt label="数量" name="quantity" placeholder="请输入数量" min={0}
                    rule={ruleIsRequired} />
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
            nav.open(<Detail sheet={sheet} specNewMode={specNewMode} onRowChanged={onRowChanged} />);
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
