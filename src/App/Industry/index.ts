import { UqApp } from 'App/UqApp';
import { Industry, Product, NameIndustry } from 'uqs/JksWarehouse';
import { ClothingProduct, ClothingSpec } from './Clothing';
import { IndustryProduct } from './IndustryProduct';
import { IndustrySpec } from './IndustrySpec';
import { MedicineProduct, MedicineSpec } from './Medicine';
import { NoneProduct, NoneSpec } from './None';

export * from './SpectInput';
export * from './consts';
export * from './IndustrySpec';
export * from './SpecView';
export * from './IndustryView';

interface IndustryClass {
    Prod: new (industry: string) => IndustryProduct;
    Spec: new (app: UqApp, product: Product, industry: Industry) => IndustrySpec;
}

const industryClasses: { [industry: string]: IndustryClass } = {
    [NameIndustry.General]: {
        Prod: NoneProduct,
        Spec: NoneSpec,
    },
    [NameIndustry.Clothing]: {
        Prod: ClothingProduct,
        Spec: ClothingSpec,
    },
    [NameIndustry.Medicine]: {
        Prod: MedicineProduct,
        Spec: MedicineSpec,
    }
};

export function createIndustryProduct(industry: string): IndustryProduct {
    return new industryClasses[industry].Prod(industry);
}

export function createIndustrySpec(app: UqApp, product: Product, industry: Industry): IndustrySpec {
    if (!industry) return undefined;
    return new industryClasses[industry.name].Spec(app, product, industry);
}
