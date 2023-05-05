import { STATUS_ACTIONS } from "./actions";

const emptyState = {
    statuses: [],
    statusesGlobal: []
};
export function StatusAdminReducer(state = Object.assign({}, emptyState), action) {

    switch (action.type) {
        case STATUS_ACTIONS.GET_STATUS_FETCH.SUCCESS: {
            return {
                ...state,
                statuses: action.data
            }
        }
        case STATUS_ACTIONS.GET_GLOBAL_STATUS_FETCH.SUCCESS: {
            return {
                ...state,
                statusesGlobal: action.data
            }
        }
        default: {
            return state;
        }
    }
}
