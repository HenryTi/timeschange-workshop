import { industryCaption } from "App/Industry";
import { useUqApp } from "App/UqApp";
import { IdView } from "tonwa-uq-com";
import { Industry } from "uqs/JksWarehouse";

export function IndustryView({ id }: { id: number; }) {
    let { uqs } = useUqApp();
    function View({ value }: { value: Industry; }) {
        return <>{industryCaption[value.name]}</>;
    }
    return <>
        <IdView id={id} uq={uqs.JksWarehouse} Template={View} />
    </>;
}
