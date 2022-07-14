import { IndustryView } from "App/Industry";
import { MutedSmall } from "tonwa-com";
import { Product } from "uqs/JksWarehouse";

export function ProductView({ value }: { value: Product; }) {
    let { no, discription, industry } = value;
    return <>
        <MutedSmall className="me-3">[<IndustryView id={industry} />]</MutedSmall>
        <span className="me-3">{no} {discription}</span>
    </>;
}
