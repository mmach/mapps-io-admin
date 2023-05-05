import { DICTIONARY_ADMIN_ACTION } from "./actions";

const emptyState = {
    dictionary: [],
};
export function DictionaryAdminReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {

        case DICTIONARY_ADMIN_ACTION.GET_DICTIONARY_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            const values = []
            Object.keys(action.data).map(i =>
                Object.values(action.data[i]).forEach(val => {
                    values.push(val);
                })
            )
            result.dictionary = values
            return { ...result };
        }

        default: {
            return state;
        }
    }
}
