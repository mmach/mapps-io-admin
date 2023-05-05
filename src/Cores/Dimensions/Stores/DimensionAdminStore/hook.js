import { CommandList, QueryList } from 'justshare-shared';
import { BaseService } from 'mapps-io-base-plugins/src/Common/index.js';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid';

export const dimensionAdminActions = (dispatch) => {
  const actionsLocal = {

    deleteDimension: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Dimensions.DELETE_DIM, dto));
    },
    deleteDimensionGlobal: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Dimensions.DELETE_DIM_GLOBALLY, dto)
      );
    },
    upsertDimensionGlobal: (dto) => {
      return dispatch(
        new BaseService().commandThunt(CommandList.Dimensions.UPSERT_DIM_GLOBALLY, dto)
      );
    },
    get: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Dimensions.GET_DIM, dto));
    },
    getAll: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Dimensions.GET_GLOBAL_DIM, dto));
    },
    upsertDimension: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Dimensions.UPSERT_DIM, dto));
    },

  }
  return {
    ...actionsLocal,
    upsertDimensionGlobal: async (dto) => {
      await actionsLocal.upsertDimensionGlobal(dto);
      await actionsLocal.upsertDimension({ dimension_id: dto.id, id: v4(), status: true });
      await actionsLocal.getAll()
      await actionsLocal.get()
    },
    upsertDimension: async (dto) => {
      await actionsLocal.upsertDimension(dto);
      await actionsLocal.get()
    },
    deleteDimension: async (dto) => {
      await actionsLocal.deleteDimension(dto);
      await actionsLocal.get()
    },
    deleteDimensionGlobal: async (dto) => {
      await actionsLocal.deleteDimensionGlobal(dto);
      await actionsLocal.getAll()
      await actionsLocal.get()

    },
    
  }
}


export const getAllDimensionsGlobalSelect = () => store => {
  return store.DimensionAdminReducer.dimensionsGlobal
}

export const getAllDimensionsSelect = () => store => {
  return store.DimensionAdminReducer.dimensions
}

export function useDimensionAdminStoreFacade() {
  const dispatch = useDispatch()

  const { dimensionAdminReducer } = useSelector(state => ({
    dimensionAdminReducer: state.DimensionAdminReducer
  }));
  const getAllDimensionsGlobalReducer = useSelector(getAllDimensionsGlobalSelect());
  const getAllDimensionsReducer = useSelector(getAllDimensionsSelect());


  const get = useCallback(
    dimensionAdminActions(dispatch).get,
    [dispatch]
  )

  const getAll = useCallback(
    dimensionAdminActions(dispatch).getAll,
    [dispatch]
  )
  const upsertDimension = useCallback(
    dimensionAdminActions(dispatch).upsertDimension,
    [dispatch]
  )
  const upsertDimensionGlobal = useCallback(
    dimensionAdminActions(dispatch).upsertDimensionGlobal,
    [dispatch]
  )
  const deleteDimensionGlobal = useCallback(
    dimensionAdminActions(dispatch).deleteDimensionGlobal,
    [dispatch]
  )
  const deleteDimension = useCallback(
    dimensionAdminActions(dispatch).deleteDimension,
    [dispatch]
  )


  const buildAdminDims = ({ getAllDimensionsGlobalReducer, getAllDimensionsReducer, getAllCategoryOptionsReducer, getCategoryTypes }) => {
    return getAllDimensionsGlobalReducer
      .sort((a, b) => {
        return b.name < a.name ? 1 : -1;
      })
      .map((item) => {
        const dim = getAllDimensionsReducer.find((el) => {
          return el.dimension_id == item.id;
        });
        let co_type = {}
        let co_type_item = {}
        let categoryOption = []
        let categoryOptionItem = []


        if (item.co_type_id && getCategoryTypes) {
          co_type = getCategoryTypes.find(i => i.id == item.co_type_id)
        }

        if (co_type && item.cott_id) {
          co_type_item = co_type.cat_options_type_temp.find(i => i.id == item.cott_id)
          co_type_item.show = `${co_type_item.order} - ${co_type_item.type}`
        }
        if (dim && getAllCategoryOptionsReducer.length > 0) {
          const cat = getAllCategoryOptionsReducer.filter(i => i.dim_id == dim.id)
          categoryOption = cat || categoryOption
        }
        if (dim && categoryOption.length == 0 && getAllCategoryOptionsReducer.length > 0) {
          const cat_opt_tem = []
          getAllCategoryOptionsReducer.forEach(i => cat_opt_tem.push(...i.cat_opt_temp))
          categoryOptionItem = cat_opt_tem.filter(cot => cot.dim_id == dim.id)
          categoryOption = getAllCategoryOptionsReducer.filter(co => categoryOptionItem.find(coi => coi.co_id == co.id))
        }
        return { ...item, dimensionProject: dim, coType: co_type, coTypeItem: co_type_item, categoryOptions: categoryOption, categoryOptionItems: categoryOptionItem };
      })
  }
  return {
    selectors: {
      dimensionAdminReducer,
      getAllDimensionsReducer,
      getAllDimensionsGlobalReducer
    },
    actions: {
      getAll,
      get,
      deleteDimension,
      deleteDimensionGlobal,
      upsertDimensionGlobal,
      upsertDimension
    },
    state: {

    },
    hooks: {

    },
    functions: {
      buildAdminDims
    }
  }

}