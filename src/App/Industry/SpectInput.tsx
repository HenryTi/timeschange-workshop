import { ProductView } from "App/IDs/Product";
import { IndustrySpec } from "App/Industry";
import { useEffect } from "react";
import { Band, BandFormErrors, FA, Form, List, MutedSmall, Page, SearchBox, Submit, useNav } from "tonwa-com";
import { useSnapshot } from "valtio";

export enum SpecNewMode {
    ExistOnly,          // 只允许选择现有的
    AllowNew,           // 如果现没有，则创建
    MustNew,            // 必须创建新ID
}

interface Props {
    newMode: SpecNewMode;  // 允许添加
    inputIndustrySpec: IndustrySpec;
    onInputed: (specItem: any) => void;
}

export function SpecInput({ newMode, inputIndustrySpec, onInputed }: Props) {
    let { product } = inputIndustrySpec;
    if (inputIndustrySpec.hasSpec === false) {
        onInputed({ id: product.id });
        return;
    }
    let spec: string;
    async function onSubmit(data: any) {
        spec = data.spec + '@' + inputIndustrySpec.caption;
        onInputed({ id: 0, });
        //nav.open(<InputQuanity />)
    }

    // 必须输入新ID
    if (newMode === SpecNewMode.MustNew) {
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
    return <ExistsOrNew newMode={newMode} inputIndustrySpec={inputIndustrySpec} onInputed={onInputed} />;
}

function ExistsOrNew({ newMode, inputIndustrySpec, onInputed }: Props) {
    let nav = useNav();
    //let app = useUqApp();
    //let [products, setProducts] = useState(undefined as Product[]);
    let { response, product, ItemView } = inputIndustrySpec;
    let { list } = useSnapshot(response);

    async function onSearchSpec(key: string) {
        await inputIndustrySpec.loadSpecList(key);
        //let ret = await app.uqs.JksWarehouse.GetIndustryProducts.query({ industry: 1 });
        //setProducts(ret.ret);
    }

    useEffect(() => {
        onSearchSpec(undefined);
    }, []);

    async function onNewSpec(data: any) {
        let ret = await inputIndustrySpec.save(data);
        nav.close();
        onInputed({ id: ret, ...data });
    }

    function SpecView({ value }: { value: any }) {
        return <div className="d-flex px-3 py-2 align-items-center">
            <FA name="square-o" className="me-3" fixWidth={true} />
            <ItemView value={value} />
        </div>;
    }
    function onSpecItemClick(item: any) {
        onInputed(item);
    }

    let vSearchBox = <SearchBox className="my-4 mx-md-5 mx-3" placeholder="批次号" onSearch={onSearchSpec} />;
    let vList = <List className="border-top border-bottom"
        items={list}
        ItemView={SpecView}
        onItemClick={onSpecItemClick}
        none={<div className="px-3 py-2 bg-light">
            <FA name="exclamation-circle" className="text-warning me-3" />
            <MutedSmall>没有合适批次</MutedSmall>
        </div>}
    />;
    let formNew = <div className="mx-md-5 mx-3 my-3 border rounded-3">
        <Form className="m-3">
            {inputIndustrySpec.renderInputBands()}
            <Band>
                <Submit onSubmit={onNewSpec}>新建批次</Submit>
            </Band>
        </Form>
    </div>;
    function openNewSpecPage() {
        nav.open(<Page header="新建批次" back="close">
            {formNew}
        </Page>);
    }
    let vContent: any;
    if (!list) {
        vContent = <>
            {vSearchBox}
            {vList}
        </>;
    }
    else if (list.length === 0) {
        if (newMode === SpecNewMode.AllowNew) {
            vContent = formNew;
        }
        else {
            vContent = <>
                {vSearchBox}
                {vList}
            </>;
        }
    }
    else {
        vContent = <>
            {vSearchBox}
            <div className="px-3 py-2 border-top cursor-pointer text-primary" onClick={openNewSpecPage}>
                <FA name="plus" className="me-3" fixWidth={true} />
                新建批次
            </div>
            {vList}
        </>;
    }

    return <Page header="输入批次" back="close">
        <div>
            <div className="mx-md-5 mx-3 my-3">
                <ProductView value={product} />
            </div>
            {vContent}
        </div>
    </Page>;
}
