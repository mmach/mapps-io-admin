import { CommandList, QueryList } from "justshare-shared";
import { ActionsGen } from "mapps-io-base-plugins/src/Common/index.js";

export const USER_ADMIN_ACTION = {
    GET_PROJECT_USERS_FETCH: ActionsGen(QueryList.Project.GET_PROJECT_USERS),

};

