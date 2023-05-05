import { CommandList, QueryList } from 'justshare-shared'
import { BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'

export const privilegesAdminActions = (dispatch) => {
    const actionsLocal = {
        upsertPriv: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Privileges.UPSERT_PRIV, dto));
        },
        deletePriv: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Privileges.DELETE_PRIV, dto));
        },
        deletePrivGlobal: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Privileges.DELETE_PRIV_GLOBALLY, dto)
            );
        },
        upsertPrivGlobal: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Privileges.UPSERT_PRIV_GLOBALLY, dto)
            );
        },
        get: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Privileges.GET_PRIVS, dto));
        },
        getAll: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Privileges.GET_GLOBAL_PRIVS, dto));
        }

    }
    return {
        ...actionsLocal,
        upsertPriv: async (dto) => {
            await actionsLocal.upsertPriv(dto);
            await actionsLocal.get()
        },
        deletePriv: async (dto) => {
            await actionsLocal.deletePriv(dto);
            await actionsLocal.get()
        },
        upsertPrivGlobal: async (dto) => {
            await actionsLocal.upsertPrivGlobal(dto);
            await actionsLocal.upsertPriv({ privilege_id: dto.id, id: v4(), status: true });
            await actionsLocal.getAll()
            await actionsLocal.get()
        },
        deletePrivGlobal: async (dto) => {
            await actionsLocal.deletePrivGlobal(dto);
            await actionsLocal.getAll()
            await actionsLocal.get()
        },
    }
}

export const getAllPrivilegesGlobalSelect = () => store => {
    return store.PrivilegesAdminReducer.privilegesGlobal
}

export const getAllPrivilegesSelect = () => store => {
    return store.PrivilegesAdminReducer.privileges
}


export function usePrivilegesAdminStoreFacade() {
    const dispatch = useDispatch()
    const { privilegesAdminReducer } = useSelector(state => ({
        privilegesAdminReducer: state.PrivilegesAdminReducer
    }));
    const getAllPrivilegesGlobalReducer = useSelector(getAllPrivilegesGlobalSelect());
    const getAllPrivilegesReducer = useSelector(getAllPrivilegesSelect());


    const getAll = useCallback(
        privilegesAdminActions(dispatch).getAll,
        [dispatch]
    )
    const get = useCallback(
        privilegesAdminActions(dispatch).get,
        [dispatch]
    )
    const upsertPrivGlobal = useCallback(
        privilegesAdminActions(dispatch).upsertPrivGlobal,
        [dispatch]
    )
    const deleteAction = useCallback(
        privilegesAdminActions(dispatch).deleteAction,
        [dispatch]
    )
    const deletePrivGlobal = useCallback(
        privilegesAdminActions(dispatch).deletePrivGlobal,
        [dispatch]
    )

    const deletePriv = useCallback(
        privilegesAdminActions(dispatch).deletePriv,
        [dispatch]
    )

    const upsertPriv = useCallback(
        privilegesAdminActions(dispatch).upsertPriv,
        [dispatch]
    )


    return {
        selectors: {
            privilegesAdminReducer,
            getAllPrivilegesGlobalReducer,
            getAllPrivilegesReducer
        },
        actions: {
            upsertPriv,
            deletePriv,
            deletePrivGlobal,
            deleteAction,
            upsertPrivGlobal,
            getAll,
            get
        },
        state: {
        },
        hooks: {
        },
        functions: {
        }
    }

}