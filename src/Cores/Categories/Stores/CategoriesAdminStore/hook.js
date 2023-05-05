import { CommandList, QueryList } from 'justshare-shared'
import { BaseService, useCategoriesStoreFacade } from "mapps-io-base-plugins/src/Common/index.js"
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CATEGORY_TREE_ACTIONS } from './actions'

export const categoriesAdminActions = (dispatch) => {
    const actionsLocal = {
        getAllCategories: () => {
            return dispatch(new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_ALL_TREE, {}));
        },
        deleteCategory: (id) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Category.DELETE_CATEGORY, { id: id })
            );
        },
        setCategoryParent: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Category.SET_PARENT, dto));
        },
        expandCategoryTreeByCategoryId: (category_id) => {
            return dispatch({
                type: CATEGORY_TREE_ACTIONS.EXPAND_CATEGORY,
                dto: { category_id: category_id }
            });
        },
        createCategory: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Category.ADD_CATEGORY, dto));
        },
        editCategory: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Category.EDIT_CATEGORY, dto));
        },
        getCategories: ({ parent, id }) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_HIERARCHY, { parent, id })
            );
        },
        getCategoryOptions: (category_id) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, {
                    id: category_id
                })
            );
        },
        linkCategoryOptionToCategory: (dto) => {
            return dispatch(
                new BaseService().commandThunt(
                    CommandList.Category_Options.UPSERT_CAETEGORY_OPTIONS_FOR_CATEGORY,
                    dto
                )
            );
        },
        deleteCategoryOptionLink: (dto) => {
            return dispatch(
                new BaseService().commandThunt(
                    CommandList.Category_Options.DELETE_CAETEGORY_OPTIONS_FOR_CATEGORY,
                    dto
                )
            );
        },
        editCategoryOptionLink: (dto) => {
            return dispatch(
                new BaseService().commandThunt(
                    CommandList.Category_Options.UPSERT_CAETEGORY_OPTIONS_FOR_CATEGORY,
                    dto
                )
            );
        }

    }


    return {
        ...actionsLocal,
        getAllCategories: async (dto) => {
            const allElementsRsponse = await actionsLocal.getAllCategories()
            await actionsLocal.getCategories({ id: allElementsRsponse.data.map(i => i.category_child_id) })
            return allElementsRsponse
        },
        editCategory: async (dto) => {
            await actionsLocal.editCategory(dto)
            await actionsLocal.getCategories({ id: dto.id })
            await actionsLocal.getCategoryOptions(dto.id)
        },
        linkCategoryOptionToCategory: async (dto) => {
            await actionsLocal.linkCategoryOptionToCategory(dto)
            await actionsLocal.getCategories({ id: dto.category_id })
            await actionsLocal.getCategoryOptions(dto.category_id)
        },
        deleteCategoryOptionLink: async (dto) => {
            await actionsLocal.deleteCategoryOptionLink(dto)
            await actionsLocal.getCategories({ id: dto.category_id })
            await actionsLocal.getCategoryOptions(dto.category_id)
        },
        editCategoryOptionLink: async (dto) => {
            await actionsLocal.editCategoryOptionLink(dto)
            await actionsLocal.getCategories({ id: dto.category_id })
            await actionsLocal.getCategoryOptions(dto.category_id)
        },
        createCategory: async (dto) => {
            await actionsLocal.createCategory(dto)
            await actionsLocal.getCategories({ id: dto.id })
            return await actionsLocal.getCategoryOptions(dto.id)
        },

    }
}

export function useCategoryAdminStoreFacade(withCategoryOptions = true) {
    const dispatch = useDispatch()
    const categoryStoreFacade = useCategoriesStoreFacade(withCategoryOptions)
    const { categoriesAdminReducer } = useSelector(state => ({
        categoriesAdminReducer: state.CategoriesAdminReducer
    }));

    const getAllCategories = useCallback(
        categoriesAdminActions(dispatch).getAllCategories,
        [dispatch]
    )
    const setCategoryParent = useCallback(
        categoriesAdminActions(dispatch).setCategoryParent,
        [dispatch]
    )
    const deleteCategory = useCallback(
        categoriesAdminActions(dispatch).deleteCategory,
        [dispatch]
    )
    const expandCategoryTreeByCategoryId = useCallback(
        categoriesAdminActions(dispatch).expandCategoryTreeByCategoryId,
        [dispatch]
    )
    const editCategory = useCallback(
        categoriesAdminActions(dispatch).editCategory,
        [dispatch]
    )
    const linkCategoryOptionToCategory = useCallback(
        categoriesAdminActions(dispatch).linkCategoryOptionToCategory,
        [dispatch]
    )
    const deleteCategoryOptionLink = useCallback(
        categoriesAdminActions(dispatch).deleteCategoryOptionLink,
        [dispatch]
    )
    const editCategoryOptionLink = useCallback(
        categoriesAdminActions(dispatch).editCategoryOptionLink,
        [dispatch]
    )
    const createCategory = useCallback(
        categoriesAdminActions(dispatch).createCategory,
        [dispatch]
    )

    return {
        selectors: {
            ...categoryStoreFacade.selectors,
            categoriesAdminReducer
        },
        actions: {
            ...categoryStoreFacade.actions,
            getAllCategories,
            setCategoryParent,
            deleteCategory,
            expandCategoryTreeByCategoryId,
            editCategory,
            linkCategoryOptionToCategory,
            deleteCategoryOptionLink,
            editCategoryOptionLink,
            createCategory

        },
        state: {
            ...categoryStoreFacade.state,

        },
        hooks: {
            ...categoryStoreFacade.hooks,
        },
        functions: {
            ...categoryStoreFacade.functions,

        }
    }

}