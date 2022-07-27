import { LinkFace } from "App/tool";
import { useUqApp } from "App/UqApp";
import { Band, BandRadio, FA, Page, Submit, useNav } from "tonwa-com";
import { BandIDNOInput, FieldsForm, ListEditContext } from "tonwa-uq-com";
import { Gender } from "uqs/BzWorkshop";

interface Props {
    face: LinkFace;
    list: ListEditContext<any>;
}

export function ButtonAdd({ face, list }: Props) {
    let nav = useNav();
    let app = useUqApp();
    let { caption } = face;
    let { BzWorkshop } = app.uqs;
    let genderOptions = [
        { label: 'female', value: Gender.female },
        { label: 'male', value: Gender.male },
    ];
    let replacer = {
        'no': <BandIDNOInput label="NO" name="no" ID={BzWorkshop.Person} />,
        'gender': <BandRadio label="Gender" name="gender" options={genderOptions} />,
    }
    async function onSubmit(data: any) {
        let ret = await BzWorkshop.ActIX({
            IX: BzWorkshop.IxPersonRole,
            ID: BzWorkshop.Person,
            values: [{
                ix: data,
                xi: 1,
            }],
        });
        let id = ret[0];
        list.onItemChanged({ ...data, id });
        nav.cease();
        nav.open(<PageSucceed />);
    }
    function onAdd() {
        nav.open(<PageAdd />);
    }

    function PageAdd() {
        return <Page header={'Add ' + caption}>
            <FieldsForm className="m-3" fields={BzWorkshop.Person.fields} replacer={replacer}>
                <Band>
                    <Submit onSubmit={onSubmit}>Add {caption}</Submit>
                </Band>
            </FieldsForm>
        </Page>
    }

    function PageSucceed() {
        let nav = useNav();
        return <Page header="Saved" back="close">
            <div className="m-5 border border-warning rounded-3 bg-white w-30c p-5 mx-auto">
                <div className="text-center">Saved OK! </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-primary me-3" onClick={onNext}>Continue Add {caption}</button>
                    <button className="btn btn-outline-primary" onClick={onExit}>Exit</button>
                </div>
            </div>
        </Page>;
        async function onNext() {
            nav.cease();
            nav.open(<PageAdd />);
        }

        async function onExit() {
            nav.close();
        }
    }
    return <button className="btn btn-sm btn-success me-2" onClick={onAdd}>
        <FA name="plus" />
    </button>;
}
