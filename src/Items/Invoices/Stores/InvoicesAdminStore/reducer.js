import { INVOICES_ACTIONS } from "./actions";

const emptyState = {
    invoices: []
};
export function InvoicesAdminReducer(state = Object.assign({}, emptyState), action) {

    switch (action.type) {
        case INVOICES_ACTIONS.GET_USER_INVOICES_FETCH.SUCCESS: {
            return {
                ...state,
                invoices: action.data
            }
        }
        case INVOICES_ACTIONS.GET_USER_INVOICES_FETCH.LOADING: {
            return {
                ...state,
                invoices: []
            }
        }
        case INVOICES_ACTIONS.CLEAN: {
            return {
                ...state,
                invoices: []
            }
        }
        default: {
            return state;
        }
    }
}
