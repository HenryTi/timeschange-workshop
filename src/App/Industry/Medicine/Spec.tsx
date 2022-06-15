import { Band, BandString, String } from "tonwa-com";
import { IndustrySpec } from "../IndustrySpec";

export class MedicineSpec extends IndustrySpec {
    protected inputBands(): JSX.Element[] {
        return [
            <BandString label="药品批次" name="spec" maxLength={16} placeholder="药品批次" />,
            <BandString label="效期" name="validTo" placeholder="药品效期 格式: 年-月-日" />
        ];
    }
    protected viewBands(): JSX.Element[] {
        return [
            <Band label="药品批次">
                <String readOnly={true} name="spec" />
            </Band>,
            <BandString label="效期" readOnly={true} name="validTo" />
        ];
    }
}

