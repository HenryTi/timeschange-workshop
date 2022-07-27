import { IconCommand } from "App/tool";
import { useUqApp } from "App/UqApp";
import { useNav } from "tonwa-com";
import { Role } from "uqs/BzWorkshop";
import { MPerson, PersonLinkFace } from "./defines";

interface Props {
    face: PersonLinkFace;
    PageList: (props: { items: MPerson[] }) => JSX.Element;
}

export function PersonLink({ face, PageList }: Props) {
    let nav = useNav();
    let { BzWorkshop } = useUqApp().uqs;
    let { caption, icon, iconClass, role } = face;
    async function onClick() {
        let result = await BzWorkshop.GetPersonList.query({ role });
        let { ret, roles: retRoles } = result;
        let mPerson: MPerson;
        for (let row of ret) {
            let { id } = row;
            mPerson = row as any;
            for (let r of retRoles) {
                let { person, role: roleValue } = r;
                if (person !== id) continue;
                if (roleValue === role) continue;
                mPerson.role = roleValue as Role;
            }
        }
        nav.open(<PageList items={ret as MPerson[]} />);
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
