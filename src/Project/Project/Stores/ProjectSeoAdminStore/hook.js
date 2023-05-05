import { CommandList, QueryList } from 'justshare-shared'
import { BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const projectSeoAdminActions = (dispatch) => {
    const actionsLocal = {
        upsertSeo: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Seo.UPSERT_SEO, dto));
        },
        getSeo: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Seo.GET_SEO, dto));
        }
    }
    return {
        ...actionsLocal,
        upsertSeo: async (dto) => {
            await actionsLocal.upsertSeo(dto);
            return await actionsLocal.getSeo()
        }
    }
}

export function useProjectSeoAdminStoreFacade() {
    const dispatch = useDispatch()

    const upsertSeo = useCallback(
        projectSeoAdminActions(dispatch).upsertSeo,
        [dispatch]
    )
    const getSeo = useCallback(
        projectSeoAdminActions(dispatch).getSeo,
        [dispatch]
    )



    return {
        selectors: {

        },
        actions: {
            upsertSeo,
            getSeo,

        },
        state: {

        },
        hooks: {

        },
        functions: {

        }
    }

}