import { CommandList, QueryList } from 'justshare-shared'
import { BaseService, mappsPlugins, useConfigStoreFacade } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4, validate } from 'uuid'
import React from 'react'
import { PROCESS_ADMIN_ACTIONS } from './actions'
export const processAdminActions = (dispatch) => {
    const actionsLocal = {
        upsertProcess: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.UPSERT_PROCESS, dto)
            );
        },
        get: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Process.GET_PROCESS, dto));
        },
        deleteEdge: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.DELETE_CHAIN_STATE, dto)
            );
        },
        upsertNodeState: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.UPSERT_CHAIN_STATE, dto)
            );
        },
        upsertNode: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.UPSERT_CHAIN_ELEMENT, dto)
            );
        },
        deleteNode: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.DELETE_CHAIN_ELEMENT, dto)
            );
        },
        startLoading: (dto) => {
            return dispatch(
                {
                    type: PROCESS_ADMIN_ACTIONS.START_LOADING,
                }
            );
        },
        endLoading: (dto) => {
            return dispatch(
                {
                    type: PROCESS_ADMIN_ACTIONS.END_LOADING,
                }
            );
        },
        grantPrivs: (dto) => {
            return dispatch(
                new BaseService().commandThunt('upsertProcessActionPrivilegeCommand'/*CommandList.Process.UPSERT_CHAIN_PRIVILEGE #TODO*/, dto)
            );
        },
        revokePrivs: (dto) => {
            return dispatch(
                new BaseService().commandThunt('deleteProcessActionPrivilegeCommand' /**#TODO */, dto)
            );
        },
        upsertAction: (dto) => {
            return dispatch(
                new BaseService().commandThunt('upsertProcessElementActionCommand' /**#TODO */, dto)
            );
        },
        removeAction: (dto) => {
            return dispatch(
                new BaseService().commandThunt('deleteProcessElementActionCommand' /**#TODO */, dto)
            );
        }

    }
    return {
        ...actionsLocal,
        upsertNodeState: async (dto) => {
            await actionsLocal.upsertNodeState(dto);
            return await actionsLocal.get()
        },
        upsertNode: async (dto) => {
            await actionsLocal.upsertNode(dto);
            return await actionsLocal.get()
        },
        upsertNodeNoFetch: async (dto) => {
            return await actionsLocal.upsertNode(dto);
        },
        deleteEdge: async (dto) => {
            actionsLocal.startLoading()
            await actionsLocal.deleteEdge(dto);
            await actionsLocal.get()
            actionsLocal.endLoading()
        },
        deleteNode: async (dto) => {
            //  actionsLocal.startLoading()
            await actionsLocal.deleteNode(dto);
            await actionsLocal.get()
            //actionsLocal.endLoading()
        },
        upsertAction: async (dto) => {
            //  actionsLocal.startLoading()
            await actionsLocal.upsertAction(dto);
            await actionsLocal.get()
            //actionsLocal.endLoading()
        },
        removeAction: async (dto) => {
            //  actionsLocal.startLoading()
            await actionsLocal.removeAction(dto);
            await actionsLocal.get()
            //actionsLocal.endLoading()
        },
        grantPrivs: async (dto) => {
            await actionsLocal.grantPrivs(dto);
            await actionsLocal.get()
        },
        revokePrivs: async (dto) => {
            await actionsLocal.revokePrivs(dto);
            await actionsLocal.get()
        }
        
    }
}


export const getProcessSelect = (process_id) => store => {
    return process_id && store.ConfigReducer.processes.find(i => i.id == process_id)
}
export const getProcessChainSelect = (process_chain_id) => store => {
    if (validate(process_chain_id)) {
        return store.ConfigReducer.processes.find(i => i.process_chain.find(pc => pc.id == process_chain_id)).process_chain.find(pc => pc.id == process_chain_id)
    }
    return null
}

export const getProcessChainActionSelect = (process_chain_action_id) => store => {
    if (validate(process_chain_action_id)) {
        let pcaObject;
        store.ConfigReducer.processes.find(i => i.process_chain.find(pc => pc.process_chain_actions.find(pca => {
            if (pca.id == process_chain_action_id) {
                pcaObject = pca
                return true;
            }
            return false
        })))
        return pcaObject;
    }
    return null
}

export function useProcessAdminStoreFacade() {
    const [processId, setProcessId] = React.useState()
    const [processChainId, setProcessChainId] = React.useState()
    const [processChainActionId, setProcessChainActionId] = React.useState()

    const dispatch = useDispatch()
    const { processAdminReducer } = useSelector(state => ({
        processAdminReducer: state.ProcessAdminReducer
    }));
    const { selectors: {
        processesSelector
    } } = useConfigStoreFacade()
    const getProcessReducer = useSelector(getProcessSelect(processId));
    const getProcessChainReducer = useSelector(getProcessChainSelect(processChainId));
    const getProcessChainActionReducer = useSelector(getProcessChainActionSelect(processChainActionId));


    const getAllProcess = useCallback(
        processAdminActions(dispatch).get,
        [dispatch]
    )
    const upsertProcess = useCallback(
        processAdminActions(dispatch).upsertProcess,
        [dispatch]
    )

    const deleteEdge = useCallback(
        processAdminActions(dispatch).deleteEdge,
        [dispatch]
    )

    const upsertNodeState = useCallback(
        processAdminActions(dispatch).upsertNodeState,
        [dispatch]
    )
    const upsertNode = useCallback(
        processAdminActions(dispatch).upsertNode,
        [dispatch]
    )
    const upsertNodeNoFetch = useCallback(
        processAdminActions(dispatch).upsertNodeNoFetch,
        [dispatch]
    )

    const deleteNode = useCallback(
        processAdminActions(dispatch).deleteNode,
        [dispatch]
    )
    const upsertAction = useCallback(
        processAdminActions(dispatch).upsertAction,
        [dispatch]
    )
    const grantPrivs = useCallback(
        processAdminActions(dispatch).grantPrivs,
        [dispatch]
    )
    const revokePrivs = useCallback(
        processAdminActions(dispatch).revokePrivs,
        [dispatch]
    )
    const removeAction = useCallback(
        processAdminActions(dispatch).removeAction,
        [dispatch]
    )

    return {
        selectors: {
            processesSelector,
            getProcessReducer,
            getProcessChainReducer,
            processAdminReducer,
            getProcessChainActionReducer
        },
        actions: {
            getAllProcess,
            upsertProcess,
            deleteEdge,
            upsertNodeState,
            upsertNode,
            deleteNode,
            upsertNodeNoFetch,
            upsertAction,
            removeAction,
            revokePrivs,
            grantPrivs
        },
        state: {
            processId,
            processChainId,
            processChainActionId
        },
        hooks: {
            setProcessId,
            setProcessChainId,
            setProcessChainActionId
        },
        functions: {

        }
    }

}