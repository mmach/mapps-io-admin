import { CommandList, QueryList } from 'justshare-shared'
import { BaseService, mappsPlugins } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'

export const statusAdminActions = (dispatch) => {
    const actionsLocal = {
        getStatuses: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Status.GET_GLOBAL_STATUSES, dto));
        },
        getStatusesProject: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Status.GET_STATUS, dto));
        },
        upsertStatus: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Status.UPSERT_STATUS, dto));
        },
        upsertStatusGlobal: (dto) => {
            return dispatch(new BaseService().queryThunt(CommandList.Status.UPSERT_STATUS_GLOBAL, dto));
        }

    }
    return {
        ...actionsLocal,
        upsertStatusGlobal: async (dto) => {
            await actionsLocal.upsertStatusGlobal(dto);
            await actionsLocal.getStatuses()
        },
        upsertStatus: async (dto) => {
            await actionsLocal.upsertStatus(dto);
            await actionsLocal.getStatusesProject()
        },
    }
}

export const getAllStatusesGlobalSelect = () => store => {
    return store.StatusAdminReducer.statusesGlobal
}

export const getAllStatusesSelect = () => store => {
    return store.StatusAdminReducer.statuses
}



export function useStatusAdminStoreFacade() {
    const dispatch = useDispatch()
    const { statusAdminReducer } = useSelector(state => ({
        statusAdminReducer: state.StatusAdminReducer
    }));

    const getAllStatusesGlobalReducer = useSelector(getAllStatusesGlobalSelect());
    const getAllStatusesReducer = useSelector(getAllStatusesSelect());
    const getStatuses = useCallback(
        statusAdminActions(dispatch).getStatuses,
        [dispatch]
    )
    const getStatusesProject = useCallback(
        statusAdminActions(dispatch).getStatusesProject,
        [dispatch]
    )
    const upsertStatus = useCallback(
        statusAdminActions(dispatch).upsertStatus,
        [dispatch]
    )
    const upsertStatusGlobal = useCallback(
        statusAdminActions(dispatch).upsertStatusGlobal,
        [dispatch]
    )
    return {
        selectors: {
            statusAdminReducer,
            getAllStatusesReducer,
            getAllStatusesGlobalReducer
        },
        actions: {
            getStatuses,
            getStatusesProject,
            upsertStatus,
            upsertStatusGlobal
        },
        state: {

        },
        hooks: {

        },
        functions: {

        }
    }

}