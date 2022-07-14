import { Query } from "tonwa-uq";
import { IndustrySpec } from "../IndustrySpec";

export class NoneSpec extends IndustrySpec {
    get hasSpec() { return false; }
    protected inputBands(): JSX.Element[] { return null; }
    protected viewBands(): JSX.Element[] { return []; }
    protected get GetProductSpecs(): Query { return undefined };
    save(data: any): Promise<number> { return; }
}
