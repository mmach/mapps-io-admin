import { CommandList, QueryList } from 'justshare-shared'
import { BaseService, mappsPlugins } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'

export const actionsAdminActions = (dispatch) => {
    const actionsLocal = {
        upsertAction: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.UPSERT_ACTIONS, dto)
            );
        },
        deleteAction: ({ id }) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.DELETE_ACTIONS, { id })
            );
        },
        upsertActionGlobal: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.UPSERT_GLOBAL_ACTIONS, dto)
            );
        },
        deleteActionGlobal: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.DELETE_GLOBAL_ACTIONS, dto)
            );
        },

        getActions: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Actions.GET_ACTIONS, dto));
        },
        getAllActions: (dto) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Actions.GET_GLOBAL_ACTIONS, dto)
            );
        },
        grantPrivs: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.UPSERT_ACTIONS_PRIVS, dto)
            );
        },
        revokePrivs: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.DELETE_ACTIONS_PRIVS, dto)
            );
        },

    }
    return {
        ...actionsLocal,
        upsertAction: async (dto) => {
            await actionsLocal.upsertAction(dto);
            await actionsLocal.getActions()
        },
        deleteAction: async (dto) => {
            await actionsLocal.deleteAction(dto);
            await actionsLocal.getActions()
        },
        upsertActionGlobal: async (dto) => {
            await actionsLocal.upsertActionGlobal(dto);
            await actionsLocal.upsertAction({ action_id: dto.id, id: v4(), status: true });
            await actionsLocal.getAllActions()
            await actionsLocal.getActions()
        },
        deleteActionGlobal: async (dto) => {
            await actionsLocal.deleteActionGlobal(dto);
            await actionsLocal.getAllActions()
            await actionsLocal.getActions()
        },
        grantPrivs: async (dto) => {
            await actionsLocal.grantPrivs(dto);
            await actionsLocal.getActions()
        },
        revokePrivs: async (dto) => {
            await actionsLocal.revokePrivs(dto);
            await actionsLocal.getActions()
        },

    }
}

export const getAllActionsGlobalSelect = () => store => {
    return store.ActionsAdminReducer.actionsGlobal
}

export const getAllActionsSelect = () => store => {
    return store.ActionsAdminReducer.actions
}


export const getActionByIdSelect = (action_id) => store => {
    if (action_id) {
        const action = store.ActionsAdminReducer.actions.find((el) => {
            return el.id == action_id;
        });
        return action
    }
    return null;
}

export function useActionsAdminStoreFacade() {
    const dispatch = useDispatch()
    const { actionsAdminReducer } = useSelector(state => ({
        actionsAdminReducer: state.ActionsAdminReducer
    }));
    const [actionId, setActionId] = useState()
    const getAllActionsGlobalReducer = useSelector(getAllActionsGlobalSelect());
    const getAllActionsReducer = useSelector(getAllActionsSelect());
    const getActionByIdReducer = useSelector(getActionByIdSelect(actionId));


    const getAllActions = useCallback(
        actionsAdminActions(dispatch).getAllActions,
        [dispatch]
    )
    const getActions = useCallback(
        actionsAdminActions(dispatch).getActions,
        [dispatch]
    )
    const upsertAction = useCallback(
        actionsAdminActions(dispatch).upsertAction,
        [dispatch]
    )
    const deleteAction = useCallback(
        actionsAdminActions(dispatch).deleteAction,
        [dispatch]
    )
    const deleteActionGlobal = useCallback(
        actionsAdminActions(dispatch).deleteActionGlobal,
        [dispatch]
    )

    const upsertActionGlobal = useCallback(
        actionsAdminActions(dispatch).upsertActionGlobal,
        [dispatch]
    )

    const grantPrivs = useCallback(
        actionsAdminActions(dispatch).grantPrivs,
        [dispatch]
    )

    const revokePrivs = useCallback(
        actionsAdminActions(dispatch).revokePrivs,
        [dispatch]
    )

    return {
        selectors: {
            actionsAdminReducer,
            getAllActionsGlobalReducer,
            getAllActionsReducer,
            getActionByIdReducer
        },
        actions: {
            getAllActions,
            getActions,
            upsertAction,
            deleteAction,
            deleteActionGlobal,
            upsertActionGlobal,
            grantPrivs,
            revokePrivs
        },
        state: {
            actionId
        },
        hooks: {
            setActionId
        },
        functions: {

        }
    }

}