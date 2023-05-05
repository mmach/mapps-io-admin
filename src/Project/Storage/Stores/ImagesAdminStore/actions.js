import { CommandList, QueryList } from "justshare-shared";
import { ActionsGen } from "mapps-io-base-plugins/src/Common/index.js";

export const IMAGE_STORE_ACTION = {
    CLEAN: 'IMAGE_STORAGE_CLEAN',
    GET_UNVERIFIED_FETCH: ActionsGen(QueryList.Blob.GET_UNVERIFIED),
    REMOVE_IMAGE_FETCH: ActionsGen(CommandList.Blob.REMOVE_BLOB),
    VERIFY_IMAGE_FETCH: ActionsGen(CommandList.Blob.VERIFY_IMAGE),
    GET_PROJECT_STORAGE_FETCH: ActionsGen(QueryList.Blob.GET_PROJECT_STORAGE)

};

