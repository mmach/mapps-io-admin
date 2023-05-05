import { CATEGORY_TREE_ACTIONS } from "./actions";

const emptyState = {
    categories: [],
    isLoading: false
};
export function CategoriesAdminReducer(state = Object.assign({}, emptyState), action) {

    const expandCategories = (id, categories, withActive) => {
        let _categories = [...categories.map((item) => {
            item.children = undefined
            if (item.category_child_id == id) {
                item.expanded = true;
                item.isActive = withActive ? true : item.isActive;
                return { ...item }
            }
            return { ...item, isActive: false, expanded: false };
        })];
        let category = _categories.find(item => item.category_child_id == id)
        while (category) {
            category = _categories.find(item => item.category_child_id == category.category_parent_id)
            if (category) {
                categories = [..._categories.map((item) => {
                    if (item.category_child_id == category.category_child_id) {
                        item.expanded = true;
                        return { ...item }
                    }
                    return item;
                })];
            }
        }
        return {
            ...state,
            categories: [..._categories]
        };
    }

    switch (action.type) {

        case CATEGORY_TREE_ACTIONS.EXPAND_CATEGORY: {
            return expandCategories(action.dto.category_id, [...state.categories], true)
        }
        case CATEGORY_TREE_ACTIONS.GET_ALL_CATEGORIES_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.isLoading = true;
            return result;
        }
        case CATEGORY_TREE_ACTIONS.GET_ALL_CATEGORIES_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.categories = action.data;
            result.isLoading = false;
            return result;
        }

        case CATEGORY_TREE_ACTIONS.GET_ALL_CATEGORIES_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            result.isLoading = false;
            if (state.isLoading != result.isLoading) {
                return result;
            }
            return state;
        }
        case CATEGORY_TREE_ACTIONS.EDIT_CATEGORY_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.isLoading = true;
            return result;
        }
        case CATEGORY_TREE_ACTIONS.EDIT_CATEGORY_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            const cat = [];

            result.categories = result.categories.map((item) => {
                if (item.category_child_id == action.dto.id) {

                    return { ...item, ...action.dto };
                }
                return item;
            });
            return result;
        }


        case CATEGORY_TREE_ACTIONS.EDIT_CATEGORY_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            result.isLoading = false;
            return result;
        }

        case CATEGORY_TREE_ACTIONS.SET_PARENT_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.isLoading = true;
            return result;
        }
        case CATEGORY_TREE_ACTIONS.SET_PARENT_FETCH.SUCCESS: {
            const result = Object.assign({}, state);

            result.categories = [...result.categories.map(i => {
                if (i.category_child_id == action.dto.id) {
                    i.category_parent_id = action.dto.CategoryHierarchy.category_parent_id
                    i.status = action.dto.status
                }
                return { ...i }
            })]
            return expandCategories(action.dto.id, result.categories, false)


        }
        case CATEGORY_TREE_ACTIONS.SET_PARENT_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            result.isLoading = false;
            return result;
        }
        case CATEGORY_TREE_ACTIONS.ADD_CATEGORY_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.isLoading = true;
            return result;
        }
        case CATEGORY_TREE_ACTIONS.ADD_CATEGORY_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.categories = [...result.categories, { ...action.dto, category_parent_id: action.dto.CategoryHierarchy.category_parent_id }]
            return expandCategories(action.dto.id, result.categories, false)

        }

        case CATEGORY_TREE_ACTIONS.DELETE_CATEGORY_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.categories = [...result.categories.filter(i => {
                return i.category_child_id != action.dto.id
            }).map(i => ({ ...i }))]
            return { ...result };
        }
        case CATEGORY_TREE_ACTIONS.ADD_CATEGORY_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            result.isLoading = false;
            return result;
        }

        default: {
            return state;
        }
    }
}
