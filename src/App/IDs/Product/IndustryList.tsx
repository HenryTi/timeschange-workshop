import { industryCaption } from "App/Industry";
import { FA, List, LMR, Page, useNav } from "tonwa-com";
import { NameIndustry } from "uqs/JksWarehouse";
import { ProductList } from "./ProductList";

interface IndustryItem {
    industry: string;
    caption: string;
}

export function IndustryList() {
    let nav = useNav();
    let arr = Object.values(NameIndustry);
    let captions = arr.map(v => ({
        industry: v,
        caption: industryCaption[v],
    })
    );
    function IndustryCaption({ value }: { value: IndustryItem; }) {
        return <LMR className="px-3 py-2 align-items-center">
            {value.caption}
            <FA name="angle-right" />
        </LMR>;
    }
    function onIndustry(industryItem: IndustryItem) {
        nav.open(<ProductList industry={industryItem.industry} />);
    }
    return <Page header="行业产品">
        <List items={captions} ItemView={IndustryCaption} onItemClick={onIndustry} />
    </Page>;
}
