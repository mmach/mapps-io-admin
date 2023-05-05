import { QueryList, CommandList } from "justshare-shared";
import { ActionsGen } from "mapps-io-base-plugins/src/Common/index.js";

export const PRIVILEGES_ACTIONS = {
    GET_PRIV_FETCH: ActionsGen(QueryList.Privileges.GET_PRIVS),
    GET_GLOBAL_PRIV_FETCH: ActionsGen(QueryList.Privileges.GET_GLOBAL_PRIVS),
};

