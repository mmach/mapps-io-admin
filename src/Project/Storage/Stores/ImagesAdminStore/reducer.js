import { IMAGE_STORE_ACTION } from "./actions";

const emptyState = {
    files: [],

    getImagesIsLoading: false
};
export function StorageAdminReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case IMAGE_STORE_ACTION.CLEAN: {
            const result = Object.assign({}, state);
            result.files = []
            result.getImagesIsLoading = false;
            return result;
        }
        case IMAGE_STORE_ACTION.GET_UNVERIFIED_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.files = [...action.data.sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1)];
            return { ...result };
        }
        case IMAGE_STORE_ACTION.GET_UNVERIFIED_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = true;
            return result;
        }
        case IMAGE_STORE_ACTION.GET_UNVERIFIED_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = false;
            return result;
        }
        case IMAGE_STORE_ACTION.GET_PROJECT_STORAGE_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.files = [...action.data.sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1)];
            return { ...result };
        }
        case IMAGE_STORE_ACTION.GET_PROJECT_STORAGE_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = true;
            return result;
        }
        case IMAGE_STORE_ACTION.GET_PROJECT_STORAGE_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = false;
            return result;
        }
        case IMAGE_STORE_ACTION.REMOVE_IMAGE_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.files = state.files.map((item) => {
                if (item.id == action.dto.id) {
                    item.isLoading = true;
                }
                return item;
            });
            return result;
        }
        case IMAGE_STORE_ACTION.REMOVE_IMAGE_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.files = state.files.filter((item) => {
                return item.id != action.dto.id;
            });
            return result;
        }
        case IMAGE_STORE_ACTION.REMOVE_IMAGE_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = true;

            return result;
        }
        case IMAGE_STORE_ACTION.VERIFY_IMAGE_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.files = state.files.filter((item) => {
                return item.id != action.dto.id;
            });
            return result;
        }
        case IMAGE_STORE_ACTION.VERIFY_IMAGE_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = false;
            return result;
        }
        default: {
            return state;
        }
    }
}
