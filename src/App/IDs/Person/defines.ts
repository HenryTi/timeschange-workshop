import { LinkFace } from "App/tool";
import { Role, Person } from "uqs/BzWorkshop";

export interface MPerson extends Person {
    user: number;
    role: Role;
}

export interface PersonLinkFace extends LinkFace {
    role: Role;
}
