import { useUqApp } from "App/MyUqAppView";
import { Page, useNav } from "tonwa-com";
import { Band, FA, LMR, Submit } from "tonwa-com";
import { FieldsDetail, FieldsForm, IDListEdit, BandIDNOInput, useIdListEdit } from "tonwa-uq-com";
import { Shop } from "uqs/BzUShop";
import { IconCommand } from "../tool";

export const caption = 'New shop';
export const icon = 'book';
export const iconClass = 'text-warning';

export function ShopAddLink() {
    let nav = useNav();
    function onClick() {
        nav.open(<ShopAdd onAdded={undefined} />);
    }
    return <IconCommand caption={caption} icon={icon} onClick={onClick} />;
}

interface Props {
    onAdded: (shop: Shop) => void;
}

function ShopAdd({ onAdded }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { BzUShop } = app.uqs;
    let { Shop } = BzUShop;
    let { fields } = Shop;
    async function onSubmit(data: Shop) {
        let ret = await BzUShop.Acts({
            shop: [data],
        });
        let id = ret[0];
        data.id = id;
        onAdded?.(data);
        nav.close();
    }
    function FormView({ className, values, onSubmit }: {
        className?: string;
        values?: Shop;
        onSubmit: (data: Shop) => Promise<void>;
    }) {
        let replacer = {
            'no': <BandIDNOInput label="NO" name="no" ID={Shop} />,
        }
        return <FieldsForm className={className} fields={fields} replacer={replacer} values={values}>
            <Band>
                <Submit onSubmit={onSubmit} />
            </Band>
        </FieldsForm>
    }
    return <Page header={caption}>
        <FormView className="p-3" values={undefined} onSubmit={onSubmit} />
    </Page>;
}
