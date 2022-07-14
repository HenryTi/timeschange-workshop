import { UqApi } from "tonwa-uq/net";

export class UqRole {
    private readonly uqApi: UqApi;
    constructor(uqApi: UqApi) {
        this.uqApi = uqApi;
    }

    RoleMe = async (): Promise<any[]> => {
        let ret = await this.uqApi.post('role-get-my', undefined);
        return ret;
    }
}