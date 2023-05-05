import { ROLES_ACTIONS } from "./actions";

const emptyState = {
    roles: [],
    rolesGlobal: []
};
export function RolesAdminReducer(state = Object.assign({}, emptyState), action) {

    switch (action.type) {
        case ROLES_ACTIONS.GET_ROLES_FETCH.SUCCESS: {
            return {
                ...state,
                roles: action.data
            }
        }
        case ROLES_ACTIONS.GET_GLOBAL_ROLES_FETCH.SUCCESS: {
            return {
                ...state,
                rolesGlobal: action.data
            }
        }
        default: {
            return state;
        }
    }
}
