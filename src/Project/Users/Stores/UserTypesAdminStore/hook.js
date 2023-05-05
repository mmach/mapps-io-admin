import { CommandList, QueryList } from 'justshare-shared'
import { BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const userTypesAdminActions = (dispatch) => {
    const actionsLocal = {
        grantRole: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.GRANT_USERTYPE_ROLE, dto));
        },
        revokeRole: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.REVOKE_USERTYPE_ROLE, dto));
        },
        getUserTypes: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.User.GET_USER_TYPES, dto));
        },
        upserUserType: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.UPSERT_USERTYPE, dto));
        },
        removeUserType: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.REMOVE_USERTYPE, dto));
        }
    }
    return {
        ...actionsLocal,
        revokeRole: async (dto) => {
            await actionsLocal.revokeRole(dto);
            return await actionsLocal.getUserTypes()
        },
        grantRole: async (dto) => {
            await actionsLocal.grantRole(dto);
            return await actionsLocal.getUserTypes()
        },
        upserUserType: async (dto) => {
            await actionsLocal.upserUserType(dto);
            return await actionsLocal.getUserTypes()
        },
        removeUserType: async (dto) => {
            await actionsLocal.removeUserType(dto);
            return await actionsLocal.getUserTypes()
        },
        
    }
}

export const getAllUserTypesSelect = () => store => {
    return store.UserTypesAdminReducer.userTypes
}
export const getUserTypeByIdSelect = (userTypeId) => store => {
    if (userTypeId) {
        return store.UserTypesAdminReducer.userTypes.find(i => i.id == userTypeId)
    }
    return null
}

export function useUserTypesAdminStoreFacade() {
    const dispatch = useDispatch()

    const { userTypesAdminReducer } = useSelector(state => ({
        userTypesAdminReducer: state.UserTypesAdminReducer
    }));
    const [userTypeId, setUserTypeId] = useState()

    const getAllUserTypesReducer = useSelector(getAllUserTypesSelect());
    const getUserTypeByIdReducer = useSelector(getUserTypeByIdSelect(userTypeId));

    const grantRole = useCallback(
        userTypesAdminActions(dispatch).grantRole,
        [dispatch]
    )
    const revokeRole = useCallback(
        userTypesAdminActions(dispatch).revokeRole,
        [dispatch]
    )
    const getUserTypes = useCallback(
        userTypesAdminActions(dispatch).getUserTypes,
        [dispatch]
    )
    const upserUserType = useCallback(
        userTypesAdminActions(dispatch).upserUserType,
        [dispatch]
    )
    const removeUserType = useCallback(
        userTypesAdminActions(dispatch).removeUserType,
        [dispatch]
    )

    return {
        selectors: {
            userTypesAdminReducer,
            getAllUserTypesReducer,
            getUserTypeByIdReducer
        },
        actions: {
            grantRole,
            revokeRole,
            getUserTypes,
            upserUserType,
            removeUserType
        },
        state: {
            userTypeId
        },
        hooks: {
            setUserTypeId
        },
        functions: {

        }
    }

}