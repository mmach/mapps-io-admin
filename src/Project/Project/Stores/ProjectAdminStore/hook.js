import { CommandList, QueryList } from 'justshare-shared'
import { BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const projectAdminActions = (dispatch) => {
    const actionsLocal = {
        uploadBlob: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Project.UPLOAD_BLOB, dto));
        },
        getProjectInfo: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Project.GET_PROJECT_INFO, dto));
        },
        updateProject: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Project.UPDATE_PROJECT, dto)
            );
        }
    }
    return {
        ...actionsLocal,
        updateProject: async (dto) => {
            await actionsLocal.updateProject(dto);
            return await actionsLocal.getProjectInfo()
        }
    }
}

export function useProjectAdminStoreFacade() {
    const dispatch = useDispatch()

    const uploadBlob = useCallback(
        projectAdminActions(dispatch).uploadBlob,
        [dispatch]
    )
    const getProjectInfo = useCallback(
        projectAdminActions(dispatch).getProjectInfo,
        [dispatch]
    )
    const updateProject = useCallback(
        projectAdminActions(dispatch).updateProject,
        [dispatch]
    )



    return {
        selectors: {

        },
        actions: {
            updateProject,
            getProjectInfo,
            uploadBlob,

        },
        state: {

        },
        hooks: {

        },
        functions: {

        }
    }

}