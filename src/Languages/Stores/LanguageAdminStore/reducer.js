import { LANGUAGE_ADMIN_ACTION } from "./actions";

const emptyState = {
    languagesGlobal: [],
    languages:[]
};
export function LangaugesAdminReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {

        case LANGUAGE_ADMIN_ACTION.GET_GLOBAL_LANGUAGES_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.languagesGlobal = action.data
            return { ...result };
        }

        case LANGUAGE_ADMIN_ACTION.GET_LANGUAGES_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.languages = action.data
            return { ...result };
        }
        default: {
            return state;
        }
    }
}
