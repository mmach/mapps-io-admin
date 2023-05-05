import { CommandList, QueryList } from 'justshare-shared'
import { BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'

export const rolesAdminActions = (dispatch) => {
    const actionsLocal = {
        upsertRole: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Roles.GRANT_ROLE_TO_PROJECT, dto)
            );
        },
        deleteRole: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Roles.REVOKE_ROLE_TO_PROJECT, dto)
            );
        },

        upsertRoleGlobal: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Roles.CREATE_ROLE_GLOBAL, dto)
            );
        },
        get: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Roles.GET_ROLES, dto));
        },
        getAll: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Roles.GET_GLOBAL_ROLES, dto));
        }

    }
    return {
        ...actionsLocal,
        upsertRole: async (dto) => {
            await actionsLocal.upsertRole(dto);
            await actionsLocal.get()
        },
        deleteRole: async (dto) => {
            await actionsLocal.deleteRole(dto);
            await actionsLocal.get()
        },
        upsertRoleGlobal: async (dto) => {
            await actionsLocal.upsertRoleGlobal(dto);
            await actionsLocal.upsertRole({ role_id: dto.id, id: v4(), status: true });
            await actionsLocal.getAll()
            await actionsLocal.get()
        },
        deleteRoleGlobal: async (dto) => {
            await actionsLocal.deleteRoleGlobal(dto);
            await actionsLocal.getAll()
            await actionsLocal.get()
        },
    }
}

export const getAllRolesGlobalSelect = () => store => {
    return store.RolesAdminReducer.rolesGlobal
}

export const getAllRolesSelect = () => store => {
    return store.RolesAdminReducer.roles
}


export function useRolesAdminStoreFacade() {
    const dispatch = useDispatch()
    const { rolesAdminReducer } = useSelector(state => ({
        rolesAdminReducer: state.RolesAdminReducer
    }));
    const getAllRolesGlobalReducer = useSelector(getAllRolesGlobalSelect());
    const getAllRolesReducer = useSelector(getAllRolesSelect());


    const getAll = useCallback(
        rolesAdminActions(dispatch).getAll,
        [dispatch]
    )
    const get = useCallback(
        rolesAdminActions(dispatch).get,
        [dispatch]
    )
    const upsertRoleGlobal = useCallback(
        rolesAdminActions(dispatch).upsertRoleGlobal,
        [dispatch]
    )
    const deleteAction = useCallback(
        rolesAdminActions(dispatch).deleteAction,
        [dispatch]
    )
    const deleteRoleGlobal = useCallback(
        rolesAdminActions(dispatch).deleteRoleGlobal,
        [dispatch]
    )

    const deleteRole = useCallback(
        rolesAdminActions(dispatch).deleteRole,
        [dispatch]
    )

    const upsertRole = useCallback(
        rolesAdminActions(dispatch).upsertRole,
        [dispatch]
    )


    return {
        selectors: {
            rolesAdminReducer,
            getAllRolesGlobalReducer,
            getAllRolesReducer
        },
        actions: {
            upsertRole,
            deleteRole,
            deleteRoleGlobal,
            deleteAction,
            upsertRoleGlobal,
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