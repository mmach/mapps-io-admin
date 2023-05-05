import { BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const cmsElementsAdminActions = (dispatch) => {
    const actionsLocal = {
        getCmsElementAdmin: () => {
            return dispatch(new BaseService().queryThunt('getCmsElementAdminQuery', {}));
        },
        getProjectCmsElement: () => {
            return dispatch(new BaseService().queryThunt('getProjectCmsElementQuery', {}));
        },
        deleteCmsElement: (dto) => {
            return dispatch(new BaseService().commandThunt('deleteCmsElementCommand', dto));
        },
        deleteProjectCmsElement: (dto) => {
            return dispatch(new BaseService().commandThunt('deleteProjectCmsElementCommand', dto));
        },
        upsertCmsElement: (dto) => {
            return dispatch(new BaseService().commandThunt('upsertCmsElementCommand', dto));
        },
        upsertProjectCmsElement: (dto) => {
            return dispatch(new BaseService().commandThunt('upsertProjectCmsElementCommand', dto));
        },
    }
    return {
        ...actionsLocal,
        upsertProjectCmsElement: async (dto) => {
            await actionsLocal.upsertProjectCmsElement(dto);
            await actionsLocal.getCmsElementAdmin()
        },
        deleteProjectCmsElement: async (dto) => {
            await actionsLocal.deleteProjectCmsElement(dto);
            await actionsLocal.getCmsElementAdmin()
        }
    }
}


export const getCmsElementIdSelect = (cmsElementId) => store => {
    if (cmsElementId) {
        return store.CmsElementsAdminReducer.cms.find(i => i.id == cmsElementId)
    }
    return null
}

export function useCmsElementsAdminStoreFacade() {
    const dispatch = useDispatch()

    const { cmsElementsAdminReducer } = useSelector(state => ({
        cmsElementsAdminReducer: state.CmsElementsAdminReducer
    }));

    const [cmsElementId, setCmsElementId] = useState()
    const getCmsElementIdReducer = useSelector(getCmsElementIdSelect(cmsElementId));


    const getCmsElementAdmin = useCallback(
        cmsElementsAdminActions(dispatch).getCmsElementAdmin,
        [dispatch]
    )

    const getProjectCmsElement = useCallback(
        cmsElementsAdminActions(dispatch).getProjectCmsElement,
        [dispatch]
    )

    const deleteCmsElement = useCallback(
        cmsElementsAdminActions(dispatch).deleteCmsElement,
        [dispatch]
    )

    const deleteProjectCmsElement = useCallback(
        cmsElementsAdminActions(dispatch).deleteProjectCmsElement,
        [dispatch]
    )

    const upsertCmsElement = useCallback(
        cmsElementsAdminActions(dispatch).upsertCmsElement,
        [dispatch]
    )

    const upsertProjectCmsElement = useCallback(
        cmsElementsAdminActions(dispatch).upsertProjectCmsElement,
        [dispatch]
    )

    return {
        selectors: {
            cmsElementsAdminReducer,
            getCmsElementIdReducer
        },
        actions: {
            getCmsElementAdmin,
            getProjectCmsElement,
            deleteCmsElement,
            deleteProjectCmsElement,
            upsertCmsElement,
            upsertProjectCmsElement
        },
        state: {
            cmsElementId
        },
        hooks: {
            setCmsElementId
        },
        functions: {

        }
    }

}