import { industryCaption } from "App/Industry";
import { FA, List, LMR, useNav } from "tonwa-com";
import { Industry } from "uqs/JksWarehouse";
import { ProductList } from "./ProductList";

interface IndustryItem {
    industry: Industry;
    caption: string;
}

export function IndustryList() {
    let nav = useNav();
    let arr = Object.values(Industry);
    let captions = arr.map(v => ({
        industry: v as Industry,
        caption: industryCaption[v as Industry],
    }));
    function IndustryCaption({ value }: { value: IndustryItem; }) {
        return <LMR className="px-3 py-2 align-items-center">
            {value.caption}
            <FA name="angle-right" />
        </LMR>;
    }
    function onIndustry(industryItem: IndustryItem) {
        nav.open(<ProductList industry={industryItem.industry} />);
    }
    return <List items={captions} ItemView={IndustryCaption} onItemClick={onIndustry} />;
}
