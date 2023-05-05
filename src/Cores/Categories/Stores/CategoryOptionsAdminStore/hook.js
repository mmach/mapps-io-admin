import { QueryList, CommandList } from 'justshare-shared'
import { useCategoriesOptionsStoreFacade, BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const categoriesOptionsAdminActions = (dispatch) => {
    const actionsLocal = {

        getAllCategoryOptions: () => {
            return dispatch(
                new BaseService().queryThunt(QueryList.CategoryOptions.GET_ALL_CETEGORIES_OPTIONS)
            );
        },
        getCategoryOption: (id) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.CategoryOptions.GET_ALL_CETEGORIES_OPTIONS, {
                    id: id
                }, 'SINGLE')
            );
        },
        removeCategoryOptions: (dto) => {
            return dispatch(
                new BaseService().queryThunt(CommandList.Category_Options.DELETE_CATEGORY_OPTIONS, dto)
            );
        },
        upsertCategoryOptions: async (dto) => {
            return await dispatch(
                new BaseService().commandThunt(CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS, dto)
            );
        },
        upsertCategoryOptionTemplate: (dto) => {
            return dispatch(
                new BaseService().commandThunt(
                    CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS_TEMPLATE,
                    dto
                )
            );
        }

    }

    return {
        ...actionsLocal,
        upsertCategoryOptions: async (dto) => {
            await actionsLocal.upsertCategoryOptions(dto);
            return await actionsLocal.getCategoryOption(dto.id)
        },
        upsertCategoryOptionTemplate: async (dto) => {
            await actionsLocal.upsertCategoryOptionTemplate(dto);
            return await actionsLocal.getCategoryOption(dto.co_id)
        },

    }
}

export const getAllCategoryOptionsSelect = () => store => {
    return store.CategoryReducer.catOptions
}

export function useCategoriesOptionsAdminStoreFacade() {
    const dispatch = useDispatch()
    const categoryOptionsFacade = useCategoriesOptionsStoreFacade()

    const getAllCategoryOptionsReducer = useSelector(getAllCategoryOptionsSelect());


    const getAllCategoryOptions = useCallback(
        categoriesOptionsAdminActions(dispatch).getAllCategoryOptions,
        [dispatch]
    )
    const removeCateogryOptions = useCallback(
        categoriesOptionsAdminActions(dispatch).removeCategoryOptions,
        [dispatch]
    )
    const upsertCategoryOptionTemplate = useCallback(
        categoriesOptionsAdminActions(dispatch).upsertCategoryOptionTemplate,
        [dispatch]
    )
    const upsertCategoryOptions = useCallback(
        categoriesOptionsAdminActions(dispatch).upsertCategoryOptions,
        [dispatch]
    )

    function getCategoryTypesValues() {
        const result = Array.isArray(categoryOptionsFacade.selectors.getCategoryTypes) ? categoryOptionsFacade.selectors.getCategoryTypes.map((item) => {
            return { id: item.id, value: item.name, type: item.type };
        }) : [];
        return [{ id: undefined, value: "", type: undefined }, ...result];
    }

    return {
        selectors: {
            ...categoryOptionsFacade.selectors,
            getAllCategoryOptionsReducer
        },
        actions: {
            ...categoryOptionsFacade.actions,
            getAllCategoryOptions,
            removeCateogryOptions,
            upsertCategoryOptionTemplate,
            upsertCategoryOptions
        },
        hooks: {
            ...categoryOptionsFacade.hooks,

        },
        state: {
            ...categoryOptionsFacade.state,
        },
        functions: {
            ...categoryOptionsFacade.functions,
            getCategoryTypesValues

        }
    }
}