import { USER_ADMIN_ACTION } from "./actions";

const emptyState = {
    users: [],
};
export function UsersAdminReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {

        case USER_ADMIN_ACTION.GET_PROJECT_USERS_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.users = [...action.data.users.map(i => ({ ...i, is_main: i.id == action.data.user_id }))];
            return { ...result };
        }

        default: {
            return state;
        }
    }
}
