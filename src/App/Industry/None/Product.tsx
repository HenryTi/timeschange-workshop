import { IndustryProduct } from "../IndustryProduct";

export class NoneProduct extends IndustryProduct {
    protected inputBands(): JSX.Element[] { return []; }
    protected viewBands(): JSX.Element[] { return []; }
}
