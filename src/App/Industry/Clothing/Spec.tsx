import { Band, BandString, String } from "tonwa-com";
import { IndustrySpec } from "../IndustrySpec";

export class ClothingSpec extends IndustrySpec {
    protected inputBands(): JSX.Element[] {
        return [
            <BandString label="服装批次" name="spec" maxLength={16} placeholder="服装批次" />
        ];
    }
    protected viewBands(): JSX.Element[] {
        return [
            <Band label="服装批次">
                <String readOnly={true} name="spec" />
            </Band>
        ];
    }
}
