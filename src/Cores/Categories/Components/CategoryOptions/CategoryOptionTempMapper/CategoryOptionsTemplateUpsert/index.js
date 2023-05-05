import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";
import React from "react";
import { useCategoriesOptionsAdminStoreFacade } from "../../../../Stores/hooks.js";
import { CategoryOptionsTemplateCmsFlags, CategoryOptionsTemplateCore, CategoryOptionsTemplateDetails, CategoryOptionsTemplateTranslate, CategoryOptionsTemplateValidation } from './CategoryOptionsTemplate/index.js';

export const CategoryOptionsTemplateUpsert = ({ catSingleOption, readOnly }) => {
  const [catOptionTemplate, setCatOptionTemplate] = React.useState(catSingleOption)
  const [loading, setLoading] = React.useState(true)

  const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)
  const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
  const BodyLoader = React.useMemo(MappsComponents().BodyLoader)

  const { translate, getLabel } = useDictionaryStoreFacade()
  const { selectors: {
    getCategoryTypes
  }, actions: {
    upsertCategoryOptionTemplate
  } } = useCategoriesOptionsAdminStoreFacade()
  
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCatOptionTemplate(catSingleOption)
      setLoading(false)
    }, 500)

  }, [catSingleOption])

  function save() {
    upsertCategoryOptionTemplate(catOptionTemplate);
  }

  function isSelection() {
    return ['SELECT', 'MULTISELECT'].includes(getCategoryTypes.find(i => i.id == catOptionTemplate.cat_opt_type_template.cot_id).type)
  }

  function isNumeric() {
    return ['float', 'int'].includes(catOptionTemplate.cat_opt_type_template.type)
  }

  function isStrict() {
    return getCategoryTypes.find(i => i.id == catOptionTemplate.cat_opt_type_template.cot_id).is_strict
  }

  function isDimReference() {
    return catOptionTemplate.dim_ref_id
  }

  if (!readOnly && loading) {
    return (<Grid
      style={{
        height: "400px",
        display: "flex"
      }}
    >
      <BodyLoader text=" " size="25px" />
    </Grid>)
  }
  return !loading && (<Grid container >
    <MappsTabs defaultTab={0} tabConfig={
      [
        {
          label: 'Core',
          render: () => <CategoryOptionsTemplateCore categoryOptionTemplate={catOptionTemplate} setCategoryOptionTemplate={setCatOptionTemplate} isSelection={isSelection} isDimReference={isDimReference} isNumeric={isNumeric} isStrict={isStrict} ></CategoryOptionsTemplateCore>
        },
        (!isDimReference() && !isSelection()) && {
          label: 'Validation',
          render: () => <CategoryOptionsTemplateValidation categoryOptionTemplate={catOptionTemplate} setCategoryOptionTemplate={setCatOptionTemplate} isSelection={isSelection} isDimReference={isDimReference} isNumeric={isNumeric}></CategoryOptionsTemplateValidation>
        },
        !isDimReference() && {
          label: 'CMS Flags',
          render: () => <CategoryOptionsTemplateCmsFlags categoryOptionTemplate={catOptionTemplate} setCategoryOptionTemplate={setCatOptionTemplate} isSelection={isSelection} isDimReference={isDimReference} isNumeric={isNumeric}></CategoryOptionsTemplateCmsFlags>
        },
        !isDimReference() && {
          label: 'Translate',
          render: () => <CategoryOptionsTemplateTranslate categoryOptionTemplate={catOptionTemplate} setCategoryOptionTemplate={setCatOptionTemplate} isSelection={isSelection} isDimReference={isDimReference} isNumeric={isNumeric}></CategoryOptionsTemplateTranslate>
        },
        {
          label: 'Details',
          render: () => <CategoryOptionsTemplateDetails categoryOptionTemplate={catOptionTemplate} setCategoryOptionTemplate={setCatOptionTemplate} isSelection={isSelection} isDimReference={isDimReference} isNumeric={isNumeric}></CategoryOptionsTemplateDetails>
        }
      ]
    }>
    </MappsTabs>
    {!readOnly && <ButtonLoader
      color={"primary"}
      onClick={save}
      value={translate(getLabel, "Save")}
      variant={"outlined"}
    >
    </ButtonLoader>}
  </Grid>
  )
}
