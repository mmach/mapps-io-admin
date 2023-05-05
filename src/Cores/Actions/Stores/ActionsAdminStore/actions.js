import { QueryList } from "justshare-shared";
import { ActionsGen } from "mapps-io-base-plugins/src/Common/index.js";

export const ACTIONS_ACTIONS = {
    GET_ACTIONS_FETCH: ActionsGen(QueryList.Actions.GET_ACTIONS),
    GET_GLOBAL_ACTIONS_FETCH: ActionsGen(QueryList.Actions.GET_GLOBAL_ACTIONS),
};

