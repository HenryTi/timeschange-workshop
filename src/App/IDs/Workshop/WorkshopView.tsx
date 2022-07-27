import { FA, LMR } from "tonwa-com";
import { Workshop } from "uqs/BzWorkshop";
import { workshopLinkFace } from "./linkFace";

export function WorkshopView({ value }: { value: Workshop; }) {
    let { no, name } = value;
    let { icon, iconClass } = workshopLinkFace;
    return <LMR className="px-3 py-2 align-items-center">
        <FA name={icon} className={iconClass + ' me-4'} size="lg" />
        <div>
            <div className="small text-muted me-3">{no}</div>
            <div>{name}</div>
        </div>
        <FA name="angle-right" />
    </LMR>;
}
