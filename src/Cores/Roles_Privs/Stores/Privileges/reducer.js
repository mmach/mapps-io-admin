import { PRIVILEGES_ACTIONS } from "./actions";

const emptyState = {
    privileges: [],
    privilegesGlobal: []
};
export function PrivilegesAdminReducer(state = Object.assign({}, emptyState), action) {

    switch (action.type) {
        case PRIVILEGES_ACTIONS.GET_PRIV_FETCH.SUCCESS: {
            return {
                ...state,
                privileges: action.data
            }
        }
        case PRIVILEGES_ACTIONS.GET_GLOBAL_PRIV_FETCH.SUCCESS: {
            return {
                ...state,
                privilegesGlobal: action.data
            }
        }
        default: {
            return state;
        }
    }
}
