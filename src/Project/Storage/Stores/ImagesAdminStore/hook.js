import { CommandList, QueryList } from 'justshare-shared'
import { BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGE_STORE_ACTION } from './actions'

export const storageAdminActions = (dispatch) => {
    const actionsLocal = {
        getUnverifiedImages: () => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_UNVERIFIED, {}));
        },
        removeImage: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Blob.REMOVE_BLOB, dto));
        },
        verifyFile: ({ id }) => {
            return dispatch(new BaseService().commandThunt(CommandList.Blob.VERIFY_IMAGE, { id }));
        },
        getProjectStorage: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_PROJECT_STORAGE, dto));
        },
        uploadBlob: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Blob.UPLOAD_BLOB_TO_PROJECT, dto)
            );
        },
        clean: () => {
            return dispatch({
                type: IMAGE_STORE_ACTION.CLEAN,
                dto: {}
            });
        }
    }
    return {
        ...actionsLocal,
    }
}

export function useStorageAdminStoreFacade() {
    const dispatch = useDispatch()

    const { storageAdminReducer } = useSelector(state => ({
        storageAdminReducer: state.StorageAdminReducer
    }));

    const getUnverifiedImages = useCallback(
        storageAdminActions(dispatch).getUnverifiedImages,
        [dispatch]
    )

    const removeImage = useCallback(
        storageAdminActions(dispatch).removeImage,
        [dispatch]
    )
    const verifyFile = useCallback(
        storageAdminActions(dispatch).verifyFile,
        [dispatch]
    )

    const getProjectStorage = useCallback(
        storageAdminActions(dispatch).getProjectStorage,
        [dispatch]
    )

    const uploadBlob = useCallback(
        storageAdminActions(dispatch).uploadBlob,
        [dispatch]
    )

    const clean = useCallback(
        storageAdminActions(dispatch).clean,
        [dispatch]
    )


    return {
        selectors: {
            storageAdminReducer,
        },
        actions: {
            getUnverifiedImages,
            removeImage,
            verifyFile,
            getProjectStorage,
            uploadBlob,
            clean
        },
        state: {

        },
        hooks: {

        },
        functions: {

        }
    }

}