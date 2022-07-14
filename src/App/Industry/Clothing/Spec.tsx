import { Band, BandString, String } from "tonwa-com";
import { IndustrySpec } from "../IndustrySpec";

export class ClothingSpec extends IndustrySpec {
    protected get GetProductSpecs() { return this.app.uqs.JksWarehouse.GetClothingSpecs; };
    protected inputBands(): JSX.Element[] {
        return [
            <BandString label="服装批次" name="no" maxLength={16} placeholder="服装批次" />
        ];
    }
    protected viewBands(): JSX.Element[] {
        return [
            <Band label="服装批次">
                <String readOnly={true} name="no" />
            </Band>
        ];
    }

    async save(data: any): Promise<number> {
        let { JksWarehouse } = this.app.uqs;
        let ret = await JksWarehouse.Acts({
            specCloth: [{ product: this.product.id, ...data }],
        });
        return ret[0];
    }

    ItemView = ({ value }: { value: any }) => {
        let { no, validTo } = value;
        return <>
            服装批次：{no}
        </>;
    }
}
