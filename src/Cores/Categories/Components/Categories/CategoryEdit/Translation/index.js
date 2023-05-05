import { Grid } from "@material-ui/core";
import { mappsPlugins, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useCategoryAdminStoreFacade } from "../../../../Stores/hooks";

export function CategoryTranslation({ categoryId }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const TranslateComponent = React.useMemo(() => mappsPlugins.byName('mapps-component-translate-component').component, [])

    const [category, setCategory] = React.useState()
    const { selectors: {
        getCategoryLeaf
    },
        actions: {
            editCategory
        },

        hooks: {
            setCategoryId
        },
        functions: {
            isCategoryLeafLoaded
        }
    } = useCategoryAdminStoreFacade()

    React.useEffect(() => {
        setCategoryId(categoryId)
    }, [categoryId])
    React.useEffect(() => {
        if (isCategoryLeafLoaded()) {
            setCategory(getCategoryLeaf)
        }
    }, [getCategoryLeaf])

    function setTranslate(translation) {
        setCategory({
            ...category,
            translation: translation
        })
    }
    function save(event) {
        if (!category.translation_id) {
            category.translation_id = v4()
        }
        category.translation.id = category.translation_id;
        editCategory(category);
    }
    if (!category) {
        return <Grid></Grid>
    }

    return category && (<>
        <MappsSections title={translate(getLabel, "LANG_TEXTBOX")}>
            <TranslateComponent translation={category.translation || {}} setTranslate={setTranslate}></TranslateComponent>
        </MappsSections>

        <ButtonLoader
            color={"primary"}
            onClick={save}
            value={translate(getLabel, "Save")}
            variant={"outlined"}
        >s
        </ButtonLoader>
    </>
    )
}


