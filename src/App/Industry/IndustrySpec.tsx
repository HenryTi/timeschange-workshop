import React from "react";
import { Industry } from "uqs/JksWarehouse";
import { industryCaption } from "./consts";

export abstract class IndustrySpec {
    private industry: Industry;
    constructor(industry: Industry) {
        this.industry = industry;
    }

    renderInputBands() {
        return this.inputBands().map((v, index) => React.cloneElement(v, { key: index }));
    }
    renderViewBands() {
        return this.viewBands().map((v, index) => React.cloneElement(v, { key: index }));
    }
    protected abstract inputBands(): JSX.Element[];
    protected abstract viewBands(): JSX.Element[];
    get caption() { return industryCaption[this.industry]; }
}
