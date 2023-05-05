import { QueryList } from "justshare-shared";
import { ActionsGen } from "mapps-io-base-plugins/src/Common/index.js";

export const DIMENSIONS_ADMIN_ACTIONS = {
    GET_DIMENSION_FETCH: ActionsGen(QueryList.Dimensions.GET_DIM),
    GET_GLOBAL_DIMENSION_FETCH: ActionsGen(QueryList.Dimensions.GET_GLOBAL_DIM),
};

