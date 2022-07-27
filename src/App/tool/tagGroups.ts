import { TagGroup, UqTagProps } from "tonwa-uq-com";
import { UQs } from "uqs";
import { TagGroupNames } from "uqs/BzWorkshop";

export const tagGroups: TagGroup[] = [
    { name: TagGroupNames.workshop, vice: 'Workshop tags', tags: undefined },
    { name: TagGroupNames.client, vice: 'Client tags', tags: undefined },
    { name: TagGroupNames.staff, vice: 'Staff tags', tags: undefined },
    { name: TagGroupNames.donator, vice: 'Donator tags', tags: undefined },
    { name: TagGroupNames.note, vice: 'Note tags', tags: undefined },
];

export function createUqTagProps(uqs: UQs): UqTagProps {
    let { BzWorkshop } = uqs;
    let { TagGroup: IxTagGroup, Tag, TagItem, IxTag, IxIdTag } = BzWorkshop;
    return {
        uq: BzWorkshop,
        TagGroup: IxTagGroup,
        Tag: Tag,
        TagItem: TagItem,
        IxTag: IxTag,
        IxIDTag: IxIdTag,
        groups: tagGroups,
    }
};
