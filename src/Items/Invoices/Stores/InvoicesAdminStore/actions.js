import { QueryList } from "justshare-shared";
import { ActionsGen } from "mapps-io-base-plugins/src/Common/index.js";

export const INVOICES_ACTIONS = {
    GET_USER_INVOICES_FETCH: ActionsGen(QueryList.Invoice.GET_USER_INVOICES),
    CLEAN: 'INVOICE_ADMIN_CLEAN',

};

