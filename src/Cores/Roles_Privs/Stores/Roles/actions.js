import { QueryList, CommandList } from "justshare-shared";
import { ActionsGen } from "mapps-io-base-plugins/src/Common/index.js";

export const ROLES_ACTIONS = {
    GET_ROLES_FETCH: ActionsGen(QueryList.Roles.GET_ROLES),
    GET_GLOBAL_ROLES_FETCH: ActionsGen(QueryList.Roles.GET_GLOBAL_ROLES),
};

