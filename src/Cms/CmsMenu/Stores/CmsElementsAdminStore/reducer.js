import { CMS_ELEMENT_STORE_ACTION } from "./actions";

const emptyState = {
    cms: [],
    getImagesIsLoading: false
};

export function CmsMenusAdminReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {

        case CMS_ELEMENT_STORE_ACTION.GET_CMS_ADMIN.SUCCESS: {
            const result = Object.assign({}, state);
            result.cms = action.data
            result.getImagesIsLoading = false;
            return result;
        }

        default: {
            return state;
        }
    }
}
