import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";

import { useLayoutContainerContextFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React from "react";
import { useLocation } from "react-router-dom";
import { useCategoriesOptionsAdminStoreFacade } from "../../../Stores/hooks.js";
import { CategoryOptionsCms, CategoryOptionsCmsFlags, CategoryOptionsCore, CategoryOptionsRelations, CategoryOptionsTemplates, CategoryOptionsTranslate, CategoryOptionsUpsert, CategoryOptionsValidation } from './Components/index.js';


function CategoryOptionTempMapper({ categoryOptionId }) {
  const { functions: {
    setTitle
  } } = useLayoutContainerContextFacade()

  const MappsGroups = React.useMemo(MappsComponents().Layouts.Groups.V1)
  const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)
  const BodyLoader = React.useMemo(MappsComponents().BodyLoader)

  const { hooks: {
    setCategoryOptionId
  },
    selectors: {
      getCategoryOptionsById,
      getCategoryTypes
    }, } = useCategoriesOptionsAdminStoreFacade()
  const location = useLocation()
  const [catOptionId, setCatOptionId] = React.useState()
  const [catOption, setCatOption] = React.useState()

  const categoryIdURL = React.useMemo(() => new URLSearchParams(location.search).get("catOptionId") || categoryOptionId, [location.search, categoryOptionId]);
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setTitle('Category Option')
  }, [])

  React.useEffect(() => {
    setCatOption(getCategoryOptionsById)
  }, [getCategoryOptionsById])

  React.useEffect(() => {
    setLoading(true)
    if (categoryIdURL == 'new') {
      setCatOption({})
    } else {
      setCategoryOptionId(categoryIdURL)
      setCatOptionId(categoryIdURL)
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [categoryIdURL])

  function isSelection() {
    return ['SELECT', 'MULTISELECT'].includes(getCategoryTypes.find(i => i.id == catOption.cot_id).type)
  }

  function isMultiselection() {
    return ['MULTISELECT'].includes(getCategoryTypes.find(i => i.id == catOption.cot_id).type)
  }

  function isRadioSelection() {
    return ['SELECT'].includes(getCategoryTypes.find(i => i.id == catOption.cot_id).type)
  }
  function isImage() {
    return ['IMAGES'].includes(getCategoryTypes.find(i => i.id == catOption.cot_id).type)
  }

  if (loading || !catOption) {
    return (<Grid
      style={{
        height: "400px",
        display: "flex"
      }}
    >
      <BodyLoader text=" " size="25px" />
    </Grid>)
  }
  return !loading && catOption && (
    <Grid container>
      {!catOptionId && <><MappsGroups title="Create Category Option">
        <CategoryOptionsUpsert></CategoryOptionsUpsert>
      </MappsGroups>
      </>}
      {catOptionId && <> <Grid container style={{ flexFlow: 'row' }}>
        <MappsGroups xs={12} sm={6} title="Category Option Detail">
          <CategoryOptionsCore catOptionId={catOptionId} readOnly={true}></CategoryOptionsCore>
        </MappsGroups>
        <MappsGroups title="Category Option Templates" xs={12} sm={6}>
          <CategoryOptionsTemplates catOptionId={catOptionId} readOnly={true}></CategoryOptionsTemplates>
        </MappsGroups>
      </Grid>
        <MappsTabs defaultTab={0} tabConfig={
          [
            {
              label: 'Core',
              render: () => <CategoryOptionsCore catOptionId={catOptionId}></CategoryOptionsCore>
            },
            {
              label: 'Translation',
              render: () => <CategoryOptionsTranslate catOptionId={catOptionId}></CategoryOptionsTranslate>
            },
            isSelection() && {
              label: 'Validation',
              render: () => <CategoryOptionsValidation catOptionId={catOptionId} isMultiselection={isMultiselection}></CategoryOptionsValidation>
            },
            {
              label: 'CMS Flags',
              render: () => <CategoryOptionsCmsFlags catOptionId={catOptionId} isImage={isImage}></CategoryOptionsCmsFlags>
            },
            {
              label: 'CMS',
              render: () => <CategoryOptionsCms catOptionId={catOptionId}></CategoryOptionsCms>
            },
            {
              label: 'Category Options Items',
              render: () => <CategoryOptionsTemplates catOptionId={catOptionId}></CategoryOptionsTemplates>
            },
            {
              label: 'Relations',
              render: () => <CategoryOptionsRelations catOptionId={catOptionId}></CategoryOptionsRelations>
            }
          ]
        }>
        </MappsTabs>
      </>
      }
    </Grid >
  );
}


export default CategoryOptionTempMapper;
