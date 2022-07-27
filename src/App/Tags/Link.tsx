import { IconCommand, tagGroups } from "App/tool";
import { useUqApp } from "App/UqApp";
import { useNav } from "tonwa-com";
import { TagPage, UqTagProps } from "tonwa-uq-com";
import { faceProps } from "./faceProps";

export function TagsAdminLink() {
    let nav = useNav();
    let app = useUqApp();
    let { caption, icon, iconClass } = faceProps;
    let { BzWorkshop } = app.uqs;
    let { TagGroup: IxTagGroup, Tag, TagItem, IxTag, IxIdTag } = BzWorkshop;
    let uqTagProps: UqTagProps = {
        uq: BzWorkshop,
        TagGroup: IxTagGroup,
        Tag: Tag,
        TagItem: TagItem,
        IxTag: IxTag,
        IxIDTag: IxIdTag,
        groups: tagGroups,
    };
    async function onClick() {
        nav.open(<TagPage {...faceProps} uqTagProps={uqTagProps} />);
    }
    return <IconCommand caption={caption} icon={icon} iconClass={iconClass} onClick={onClick} />;
}
