import { LinkFace } from "App/tool";
import { Session } from "uqs/BzWorkshop";

export const linkFace: LinkFace = {
    caption: "Workshops",
    icon: "user-o",
    iconClass: "text-primary",
};

export interface WorkshopItem {
    workshop: number;
    sessions: MSession[];
}

export interface MSession extends Session {
    workshop: number;
    own: number;
    substitue: number;
    done: number;
}
