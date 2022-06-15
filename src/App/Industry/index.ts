import { Industry } from 'uqs/JksWarehouse';
import { ClothingSpec } from './Clothing';
import { IndustrySpec } from './IndustrySpec';
import { MedicineSpec } from './Medicine';
import { NoneSpec } from './None';

export * from './consts';
export * from './IndustrySpec';

export function createIndustrySpec(industry: Industry): IndustrySpec {
    switch (industry) {
        default:
            return new NoneSpec(industry);
        case Industry.Medicine:
            return new MedicineSpec(industry);
        case Industry.Clothing:
            return new ClothingSpec(industry);
    }
}
