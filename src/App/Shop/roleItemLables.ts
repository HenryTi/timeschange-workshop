import { EnumRole, Enumshop } from "uqs/BzUShop";

export const roleItemLables: { [key in (EnumRole | Enumshop)]: string } = {
    [EnumRole.shopmanager]: '店铺总管',
    [Enumshop.product]: '产品经理',
    [Enumshop.delivery]: '发运经理',
    [Enumshop.accountant]: '会计',
}
