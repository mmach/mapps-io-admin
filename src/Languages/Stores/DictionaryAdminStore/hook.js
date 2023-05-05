import { CommandList, QueryList } from 'justshare-shared'
import { BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const dictionaryAdminActions = (dispatch) => {
    const actionsLocal = {
        removeDictionary: (dto) => {
            dispatch(new BaseService().commandThunt(CommandList.Dictionary.REMOVE_DICTIONARY, dto));
        },
        addDictionary: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Dictionary.ADD_DICTIONARY, dto));
        },
        getDictionary: () => {
            return dispatch(new BaseService().queryThunt(QueryList.Dictionary.GET_DICTIONARY, {}));
        }
    }
    return {
        ...actionsLocal,
        addDictionary: async (dto) => {
            await actionsLocal.addDictionary(dto);
            await actionsLocal.getDictionary()
        },
        removeDictionary: async (dto) => {
            await actionsLocal.removeDictionary(dto);
            await actionsLocal.getDictionary()
        },
    }
}

export const getAllDictionarySelect = () => store => {
    return store.DictionaryAdminReducer.dictionary
}

export function useDictionaryAdminStoreFacade() {
    const dispatch = useDispatch()

    const { dictionaryAdminReducer } = useSelector(state => ({
        dictionaryAdminReducer: state.DictionaryAdminReducer
    }));
    const [dictionaryId, setDictionaryId] = useState()

    const getAllDictionaryReducer = useSelector(getAllDictionarySelect());

    const removeDictionary = useCallback(
        dictionaryAdminActions(dispatch).removeDictionary,
        [dispatch]
    )
    const addDictionary = useCallback(
        dictionaryAdminActions(dispatch).addDictionary,
        [dispatch]
    )
    const getDictionary = useCallback(
        dictionaryAdminActions(dispatch).getDictionary,
        [dispatch]
    )

    function getTypeDictionaries() {
        const values = {}

        getAllDictionaryReducer.forEach(i => {
            if (!values[i.type]) {
                values[i.type] = 1;
            } else {
                values[i.type]++
            }
        })
        return values
    }
    return {
        selectors: {
            dictionaryAdminReducer,
            getAllDictionaryReducer
        },
        actions: {
            removeDictionary,
            addDictionary,
            getDictionary
        },
        state: {
            dictionaryId
        },
        hooks: {
            setDictionaryId
        },
        functions: {
            getTypeDictionaries
        }
    }

}