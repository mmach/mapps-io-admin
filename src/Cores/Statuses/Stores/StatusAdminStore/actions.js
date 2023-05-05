import { QueryList } from "justshare-shared";
import { ActionsGen } from "mapps-io-base-plugins/src/Common/index.js";

export const STATUS_ACTIONS = {
    GET_STATUS_FETCH: ActionsGen(QueryList.Status.GET_STATUS),
    GET_GLOBAL_STATUS_FETCH: ActionsGen(QueryList.Status.GET_GLOBAL_STATUSES),
};

