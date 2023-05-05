import { CommandList, QueryList } from 'justshare-shared'
import { BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const languageAdminActions = (dispatch) => {
    const actionsLocal = {
        insertLanguage: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Languages.INSERT_LANGUAGE, dto)
            );
        },
        setAsMain: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Languages.SET_AS_MAIN_LANG, dto)
            );
        },
        deleteLanguage: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Languages.DELETE_LANGUAGE, dto)
            );
        },
        getLanguages: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Languages.GET_LANGUAGES, dto));
        },
        getAllLanguages: (dto) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Languages.GET_GLOBAL_LANGUAGES, dto)
            );
        }
    }
    return {
        ...actionsLocal,
        deleteLanguage: async (dto) => {
            await actionsLocal.deleteLanguage(dto);
            await actionsLocal.getLanguages()
        },
        setAsMain: async (dto) => {
            await actionsLocal.setAsMain(dto);
            await actionsLocal.getLanguages()
        },
        insertLanguage: async (dto) => {
            await actionsLocal.insertLanguage(dto);
            await actionsLocal.getLanguages()
        },
    }
}

export const getAllLanguagesGlobalSelect = () => store => {
    return store.LangaugesAdminReducer.languagesGlobal
}
export const getAllLanguagesSelect = () => store => {
    return store.LangaugesAdminReducer.languages
}
export function useLanguageAdminStoreFacade() {
    const dispatch = useDispatch()

    const { langaugesAdminReducer } = useSelector(state => ({
        langaugesAdminReducer: state.LangaugesAdminReducer
    }));

    const getAllLanguagesGlobalReducer = useSelector(getAllLanguagesGlobalSelect());
    const getAllLanguagesReducer = useSelector(getAllLanguagesSelect());

    const getLanguages = useCallback(
        languageAdminActions(dispatch).getLanguages,
        [dispatch]
    )
    const getAllLanguages = useCallback(
        languageAdminActions(dispatch).getAllLanguages,
        [dispatch]
    )
    const deleteLanguage = useCallback(
        languageAdminActions(dispatch).deleteLanguage,
        [dispatch]
    )
    const setAsMain = useCallback(
        languageAdminActions(dispatch).setAsMain,
        [dispatch]
    )
    const insertLanguage = useCallback(
        languageAdminActions(dispatch).insertLanguage,
        [dispatch]
    )

    return {
        selectors: {
            langaugesAdminReducer,
            getAllLanguagesGlobalReducer,
            getAllLanguagesReducer
        },
        actions: {
            getLanguages,
            getAllLanguages,
            deleteLanguage,
            setAsMain,
            insertLanguage
        },
        state: {

        },
        hooks: {

        },
        functions: {

        }
    }

}