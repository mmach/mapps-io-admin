import { CommandList, QueryList } from 'justshare-shared'
import { BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const userAdminActions = (dispatch) => {
    const actionsLocal = {
        getUsers: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Project.GET_PROJECT_USERS, dto));
        },
        grantRole: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.GRANT_USER_ROLE, dto));
        },
        revokeRole: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.REVOKE_USER_ROLE, dto));
        }
    }
    return {
        ...actionsLocal,
        grantRole: async (dto) => {
            await actionsLocal.grantRole(dto);
            return await actionsLocal.getUsers()
        },
        revokeRole: async (dto) => {
            await actionsLocal.revokeRole(dto);
            return await actionsLocal.getUsers()
        },
    }
}

export const getAllUsersSelect = () => store => {
    return store.UsersAdminReducer.users
}
export const getUserByIdeSelect = (userId) => store => {
    if (userId) {
        return store.UsersAdminReducer.users.find(i => i.id == userId)
    }
    return null
}

export function useUserAdminStoreFacade() {
    const dispatch = useDispatch()

    const { usersAdminReducer } = useSelector(state => ({
        usersAdminReducer: state.UsersAdminReducer
    }));
    const [userId, setUserId] = useState()

    const getAllUsersReducer = useSelector(getAllUsersSelect());
    const getUserByIdeReducer = useSelector(getUserByIdeSelect(userId));

    const getUsers = useCallback(
        userAdminActions(dispatch).getUsers,
        [dispatch]
    )
    const revokeRole = useCallback(
        userAdminActions(dispatch).revokeRole,
        [dispatch]
    )
    const grantRole = useCallback(
        userAdminActions(dispatch).grantRole,
        [dispatch]
    )

    return {
        selectors: {
            usersAdminReducer,
            getAllUsersReducer,
            getUserByIdeReducer
        },
        actions: {
            getUsers,
            revokeRole,
            grantRole
        },
        state: {
            userId
        },
        hooks: {
            setUserId
        },
        functions: {

        }
    }

}