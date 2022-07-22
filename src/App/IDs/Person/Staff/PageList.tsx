import { BandContainerContext, BandRadio, Detail, FA, LabelBand, Page, Sep, useNav } from "tonwa-com";
import { IDListEdit, SelectUser, useIdListEdit, UserView } from "tonwa-uq-com";
import { MPerson } from "../UqPerson";
import { PersonEdit } from "../PersonEdit";
import { caption, icon, iconClass } from "./consts";
import { PageBoundUser } from "./PageBoundUser";
import { Role } from "uqs/BzWorkshop";
import { User } from "tonwa-uq";
import { useState } from "react";
import { useUqApp } from "App/UqApp";
import { OptionItem } from "tonwa-com/defines";
import { ButtonAdd } from "../ButtonAdd";
import { PersonView } from "../PersonView";

const roleOptions: OptionItem[] = [
    { label: <span>Counselor</span>, value: Role.counselor },
    { label: <span>Support</span>, value: Role.support },
    { label: <span>Volunteer</span>, value: Role.volunteer },
];

export function PageList({ items }: { items: MPerson[]; }) {
    let nav = useNav();
    let app = useUqApp();
    let { BzWorkshop } = app.uqs;
    let listEditContext = useIdListEdit<MPerson>(items);
    function onItemClick(item: MPerson) {
        function PageDetail() {
            let [user, setUser] = useState(item.user);
            let roleInitValues = {
                role: item.role,
            }
            async function onChangeUser() {
                let userSelected: User = await nav.call(<SelectUser />);
                let userId = userSelected.id;
                await BzWorkshop.ActIX({
                    IX: BzWorkshop.IxUserPerson,
                    values: [
                        { ix: userId, xi: item.id }
                    ]
                })
                setUser(userId);
                listEditContext.onItemChanged({ ...item, user: userId });
            }
            async function onUserUnbound() {
                await BzWorkshop.ActIX({
                    IX: BzWorkshop.IxUserPerson,
                    values: [
                        { ix: user, xi: -item.id }
                    ]
                })
                setUser(undefined);
                nav.close();
                listEditContext.onItemChanged({ ...item, user: undefined });
            }
            async function onBoundUser() {
                if (user) {
                    nav.open(<PageBoundUser userBound={item.user}
                        onChangeUser={onChangeUser}
                        onUserUnbound={onUserUnbound} />);
                }
                else {
                    await onChangeUser();
                    nav.close(0);
                }
            }
            async function onRoleChanged(changed: { name: string; value: any; preValue: any; }, context: BandContainerContext<any>) {
                let role = changed.value;
                let personId = item.id;
                await BzWorkshop.ActIX({
                    IX: BzWorkshop.IxPersonRole,
                    values: [
                        { ix: personId, xi: -changed.preValue },
                        { ix: personId, xi: role },
                    ]
                });
                listEditContext.onItemChanged({ ...item, role })
            }
            return <Page header={'Edit ' + caption}>
                <Sep />
                <LabelBand label="Bind user" onEdit={onBoundUser} rightIcon={<FA name="angle-right" />}>
                    {
                        user ? <>
                            <UserView id={user} />
                            &nbsp; &nbsp; <small>(user account)</small>
                        </>
                            :
                            <small>no user account</small>
                    }
                </LabelBand>
                <Detail className="" values={roleInitValues} onValuesChanged={onRoleChanged}>
                    <BandRadio label="Role" name="role" options={roleOptions} />
                </Detail>
                <Sep />
                <Sep className="mt-3" />
                <PersonEdit item={item} listEditContext={listEditContext} />
            </Page>;
        }
        nav.open(<PageDetail />);
    }
    function ItemView({ value }: { value: MPerson; }) {
        let { role } = value;
        let roleTitle: any;
        let label = roleOptions.find(v => v.value === role)?.label;
        if (label) roleTitle = <>{label}</>;
        return <PersonView value={value} icon={icon} iconClass={iconClass}
            roleTitle={roleTitle} />;
    }
    let buttonAdd = <ButtonAdd caption={caption} role={Role.staff} list={listEditContext} />;
    return <Page header={caption} right={buttonAdd}>
        <IDListEdit context={listEditContext} ItemView={ItemView} onItemClick={onItemClick} />
    </Page>;
}
