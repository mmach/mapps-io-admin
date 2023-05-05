import { PROCESS_ADMIN_ACTIONS } from "./actions";

const emptyState = {
    isLoading: false
};
export function ProcessAdminReducer(state = Object.assign({}, emptyState), action) {

    switch (action.type) {

        case PROCESS_ADMIN_ACTIONS.START_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }
        case PROCESS_ADMIN_ACTIONS.END_LOADING: {
            return {
                ...state,
                isLoading: false
            }
        }
        default: {
            return state;
        }
    }
}
