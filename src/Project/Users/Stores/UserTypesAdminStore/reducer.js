import { USER_TYPES_ACTION } from "./actions";

const emptyState = {
    userTypes: [],
};
export function UserTypesAdminReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {

        case USER_TYPES_ACTION.GET_USER_TYPES_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.userTypes = [...action.data];
            return { ...result };
        }

        default: {
            return state;
        }
    }
}
