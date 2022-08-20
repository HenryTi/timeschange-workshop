import { useUqApp } from "App/MyUqAppView";
import { Band, BandString, FA, Form, LMR, MutedSmall, Page, Submit, useNav } from "tonwa-com";
import { UserUnit } from "tonwa-uq";
import { Image } from "tonwa-uq-com";

interface Props {
    user: UserUnit;
    onAssignChanged: (assigned: string) => Promise<void>;
    pageHeader: string;
}

export function ViewUser({ user, onAssignChanged, pageHeader }: Props) {
    let nav = useNav();
    let uqApp = useUqApp();
    let { name, icon, nick, assigned } = user;
    let vUser;
    if (nick) {
        vUser = <>{nick} <MutedSmall>用户:{name}</MutedSmall></>;
    }
    else {
        vUser = name;
    }

    let vAssignedUser: any;
    if (assigned) {
        vAssignedUser = <><div>{assigned}</div> <MutedSmall>{nick} 用户:{name}</MutedSmall></>
    }
    else {
        vAssignedUser = vUser;
    }
    function onEditAssigned() {
        function PageUserAssign() {
            async function onSubmit(data: any): Promise<[name: string, err: string][] | string[] | string | void> {
                let { assigned } = data;
                await uqApp.uqUnit.addUser(user.user, assigned);
                await onAssignChanged(assigned);
                nav.close();
                return;
            }
            return <Page header={pageHeader}>
                <div className="mb-3 p-3 border-bottom tonwa-bg-gray-1">{vAssignedUser}</div>
                <Form values={user} className="m-3">
                    <BandString name="assigned" label="标注" />
                    <Band contentContainerClassName="text-center my-3">
                        <Submit onSubmit={onSubmit}><div className='mx-5'>保存</div></Submit>
                    </Band>
                </Form>
            </Page>;
        }
        nav.open(<PageUserAssign />);
    }
    return <LMR className="my-2">
        <Image className="w-2c h-2c me-3" src={icon} />
        <div>
            {vAssignedUser}
        </div>
        <div className="cursor-pointer text-info" onClick={onEditAssigned}>
            <FA name="pencil" />
        </div>
    </LMR>;
}
