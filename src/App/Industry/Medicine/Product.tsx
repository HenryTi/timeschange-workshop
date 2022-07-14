import { BandString } from "tonwa-com";
import { IndustryProduct } from "../IndustryProduct";

export class MedicineProduct extends IndustryProduct {
    protected inputBands(): JSX.Element[] {
        return [
            <BandString label="批准文号" name="permision" maxLength={20} placeholder="" />,
        ];
    }
    protected viewBands(): JSX.Element[] { return []; }
}
