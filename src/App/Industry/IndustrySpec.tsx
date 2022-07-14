import { UqApp } from "App/UqApp";
import React from "react";
import { Query } from "tonwa-uq";
import { Industry, Product } from "uqs/JksWarehouse";
import { proxy } from "valtio";
import { industryCaption } from "./consts";

export abstract class IndustrySpec {
    protected app: UqApp;
    private _product: Product;
    private _industry: Industry;
    constructor(app: UqApp, product: Product, industry: Industry) {
        this.app = app;
        this._product = product;
        this._industry = industry;
    }
    get product(): Product { return this._product; }
    set product(value: Product) { this._product = value; }
    get hasSpec() { return true; }

    renderInputBands() {
        return this.inputBands().map((v, index) => React.cloneElement(v, { key: index }));
    }
    renderViewBands() {
        return this.viewBands().map((v, index) => React.cloneElement(v, { key: index }));
    }
    renderList() {
        return <div>List</div>;
    }
    protected abstract inputBands(): JSX.Element[];
    protected abstract viewBands(): JSX.Element[];
    get caption() { return industryCaption[this._industry.name]; }

    readonly response: {
        list: any[];
    } = proxy({
        list: undefined,
    });

    protected abstract get GetProductSpecs(): Query;

    async loadSpecList(key: string) {
        let query = this.GetProductSpecs;
        if (!query) {
            this.response.list = [];
        }
        else {
            let ret = await query.query({
                product: this._product.id,
                key,
            });
            this.response.list = ret.ret;
        }
    }

    ItemView = ({ value }: { value: any }) => {
        return <>
            {JSON.stringify(value)}
        </>;
    }

    abstract save(data: any): Promise<number>;
}
