import { CommandList, QueryList } from "justshare-shared";
import { ActionsGen } from "mapps-io-base-plugins/src/Common/index.js";

export const CMS_ELEMENT_STORE_ACTION = {

    GET_CMS_ADMIN: ActionsGen('getCmsElementAdminQuery'),
    GET_CMS_PROJECT: ActionsGen('getProjectCmsElementQuery'),
    DELETE_CMS_GLOBAL: ActionsGen('deleteCmsElementCommand'),
    DELETE_PROJECT_CMS: ActionsGen('deleteProjectCmsElementCommand'),
    UPSERT_CMS_GLOBAL: ActionsGen('upsertCmsElementCommand'),
    UPSERT_CMS_PROJECT: ActionsGen('upsertProjectCmsElementCommand'),


};

