import { Grid } from "@material-ui/core";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { TextBox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";
import React from 'react';
import { v4 } from "uuid";


export function CategoryOptionsTemplateTranslate({ categoryOptionTemplate, setCategoryOptionTemplate }) {
    const { translate, getLabel, getPlaceholder } = useDictionaryStoreFacade()
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const TranslateComponent = React.useMemo(() => mappsPlugins.byName('mapps-component-translate-component').component, [])

    const [catOptionTemplate, setCatOptionTemplate] = React.useState({ ...categoryOptionTemplate })
    React.useEffect(() => {
        setCategoryOptionTemplate(catOptionTemplate)
    }, [catOptionTemplate])



    function setTranslate(translation) {
        if (!catOptionTemplate.value_translation_id) {
            catOptionTemplate.value_translation_id = v4()
        }
        if (!translation.id) {
            translation.id = catOptionTemplate.value_translation_id
        }
        setCatOptionTemplate({
            ...catOptionTemplate,
            value_translation: translation
        })
    }
    return (<>
        <MappsSections title={translate(getLabel, "LANG_TEXTBOX")}>
            <TranslateComponent translation={catOptionTemplate.value_translation || {}} setTranslate={setTranslate}></TranslateComponent>
        </MappsSections>
    </>
    )
}


