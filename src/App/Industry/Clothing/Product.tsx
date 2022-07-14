import { BandString } from "tonwa-com";
import { IndustryProduct } from "../IndustryProduct";

export class ClothingProduct extends IndustryProduct {
    protected inputBands(): JSX.Element[] {
        return [
            <BandString label="颜色" name="color" maxLength={10} placeholder="" />,
            <BandString label="尺码" name="size" maxLength={10} placeholder="" />,
        ];
    }
    protected viewBands(): JSX.Element[] { return []; }
}
