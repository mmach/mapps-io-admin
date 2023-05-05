import { QueryList } from "justshare-shared";
import { ActionsGen } from "mapps-io-base-plugins/src/Common/index.js";

export const LANGUAGE_ADMIN_ACTION = {
    GET_GLOBAL_LANGUAGES_FETCH: ActionsGen(QueryList.Languages.GET_GLOBAL_LANGUAGES),
    GET_LANGUAGES_FETCH: ActionsGen(QueryList.Languages.GET_LANGUAGES),


};

