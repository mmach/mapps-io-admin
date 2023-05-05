import { DIMENSIONS_ADMIN_ACTIONS } from "./actions";

const emptyState = {
    dimensions: [],
    dimensionsGlobal: []
};
export function DimensionAdminReducer(state = Object.assign({}, emptyState), action) {

    switch (action.type) {
        case DIMENSIONS_ADMIN_ACTIONS.GET_DIMENSION_FETCH.SUCCESS: {
            return {
                ...state,
                dimensions: action.data
            }
        }
        case DIMENSIONS_ADMIN_ACTIONS.GET_GLOBAL_DIMENSION_FETCH.SUCCESS: {
            return {
                ...state,
                dimensionsGlobal: action.data
            }
        }
        default: {
            return state;
        }
    }
}
