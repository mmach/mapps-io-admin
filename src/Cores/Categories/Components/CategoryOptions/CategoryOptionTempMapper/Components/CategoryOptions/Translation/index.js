import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React from "react";
import { v4 } from "uuid";
import { useCategoriesOptionsAdminStoreFacade } from "../../../../../../Stores/hooks";


export function CategoryOptionsTranslate({ catOptionId }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const { selectors: {
        getCategoryOptionsById
    },
        actions: {
            upsertCategoryOptions
        }, hooks: {
            setCategoryOptionId
        }, functions: {
            isLoaded
        } } = useCategoriesOptionsAdminStoreFacade()
    const TranslateComponent = React.useMemo(() => mappsPlugins.byName('mapps-component-translate-component').component, [])
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const [catOption, setCatOption] = React.useState()

    React.useEffect(() => {
        setCategoryOptionId(catOptionId)
    }, [catOptionId])
    React.useEffect(() => {
        setCatOption(getCategoryOptionsById)
    }, [getCategoryOptionsById])


    function setTranslate(translation) {
        setCatOption({
            ...catOption,
            translation: translation
        })
    }
    function save(event) {
        if (!catOption.translation_id) {
            catOption.translation_id = v4()
        }
        catOption.translation.id = catOption.translation_id;
        upsertCategoryOptions(catOption);
    }
    if (!(isLoaded(catOptionId) && catOption)) {
        return <></>
    }

    return isLoaded(catOptionId) && catOption && (<>
        <MappsSections title={translate(getLabel, "LANG_TEXTBOX")}>
            <TranslateComponent translation={catOption.translation || {}} setTranslate={setTranslate}></TranslateComponent>
        </MappsSections>

        <ButtonLoader
            color={"primary"}
            onClick={save}
            value={translate(getLabel, "Save")}
            variant={"outlined"}
        >
        </ButtonLoader>

    </>
    )
}


