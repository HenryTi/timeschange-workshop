import React from "react";

export abstract class IndustryProduct {
    constructor(industry: string) {
        this.industry = industry;
    }
    readonly industry: string;
    renderInputBands() {
        return this.inputBands().map((v, index) => React.cloneElement(v, { key: index }));
    }
    renderViewBands() {
        return this.viewBands().map((v, index) => React.cloneElement(v, { key: index }));
    }
    protected abstract inputBands(): JSX.Element[];
    protected abstract viewBands(): JSX.Element[];
}
