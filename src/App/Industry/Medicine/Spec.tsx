import { Band, BandString, String } from "tonwa-com";
import { IndustrySpec } from "../IndustrySpec";

export class MedicineSpec extends IndustrySpec {
    protected get GetProductSpecs() { return this.app.uqs.JksWarehouse.GetMedicineSpecs; };
    protected inputBands(): JSX.Element[] {
        return [
            <BandString label="药品批次" name="no" maxLength={16} placeholder="药品批次" />,
            <BandString label="效期" name="validTo" placeholder="药品效期 格式: 年-月-日" />
        ];
    }
    protected viewBands(): JSX.Element[] {
        return [
            <Band label="药品批次">
                <String readOnly={true} name="no" />
            </Band>,
            <BandString label="效期" readOnly={true} name="validTo" />
        ];
    }

    async save(data: any): Promise<number> {
        let { JksWarehouse } = this.app.uqs;
        let ret = await JksWarehouse.Acts({
            specMedicine: [{ product: this.product.id, ...data }],
        });
        return ret[0];
    }

    ItemView = ({ value }: { value: any }) => {
        let { no, validTo } = value;
        return <>
            药品批次：{no} 效期: {validTo}
        </>;
    }
}
