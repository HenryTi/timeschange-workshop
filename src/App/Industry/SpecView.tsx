import { UqApp } from "App/UqApp";
import { useEffect, useState } from "react";
import { MutedSmall } from "tonwa-com";
import { Industry, Product } from "uqs/JksWarehouse";
import { createIndustrySpec } from "./index";
import { industryCaption } from './consts';

interface State {
    spec: any;
    product: Product;
    industry: Industry;
}

export function IdSpecProductView({ id, app }: { id: number; app: UqApp; }) {
    let [value, setValue] = useState<State>(undefined);
    let { JksWarehouse } = app.uqs;
    useEffect(() => {
        (async function () {
            if (!id) return;
            let industry: Industry;
            let product: Product;
            let spec = await JksWarehouse.idObj(id);
            if (spec) {
                if (spec.$type === 'product') {
                    product = spec;
                    spec = undefined;
                }
                else {
                    product = await JksWarehouse.idObj(spec.product);
                }
                if (product) {
                    industry = await JksWarehouse.idObj(product.industry);
                }
            }
            setValue({
                spec,
                product,
                industry,
            });
        })();
    }, [id, JksWarehouse]);
    if (value === null || value === undefined) return null;
    let { spec, product, industry } = value;
    if (!product) return null;
    if (!industry) return null;
    let { no, discription } = product;
    let industrySpec = createIndustrySpec(app, product, industry);
    let vSpec = spec && <div>{industrySpec?.ItemView({ value: spec })}</div>;
    return <div className="d-flex">
        <MutedSmall className="w-min-4c me-3">{industryCaption[industry?.name]}</MutedSmall>
        <div>
            <span className="me-3">{no} {discription}</span>
            {vSpec}
        </div>
    </div>;
}
