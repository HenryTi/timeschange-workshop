import { IndustrySpec } from "../IndustrySpec";

export class NoneSpec extends IndustrySpec {
    protected inputBands(): JSX.Element[] { return []; }
    protected viewBands(): JSX.Element[] { return []; }
}
