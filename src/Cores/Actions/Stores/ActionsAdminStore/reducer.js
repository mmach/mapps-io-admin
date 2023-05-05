import { ACTIONS_ACTIONS } from "./actions";

const emptyState = {
    actions: [],
    actionsGlobal: []
};
export function ActionsAdminReducer(state = Object.assign({}, emptyState), action) {

    switch (action.type) {
        case ACTIONS_ACTIONS.GET_ACTIONS_FETCH.SUCCESS: {
            return {
                ...state,
                actions: action.data
            }
        }
        case ACTIONS_ACTIONS.GET_GLOBAL_ACTIONS_FETCH.SUCCESS: {
            return {
                ...state,
                actionsGlobal: action.data
            }
        }
        default: {
            return state;
        }
    }
}
