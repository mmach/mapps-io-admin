import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { TextBox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";
import React from "react";


export function CategoryOptionsTemplateDetails({ categoryOptionTemplate }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)

    const [catOptionTemplate, setCatOptionTemplate] = React.useState({ ...categoryOptionTemplate })


    return (<>
        <MappsSections title={translate(getLabel, "Category Options Template Details")}>
            <TextBox
                label={translate(getLabel, "Id")}
                value={catOptionTemplate.id}
                field="Id"
                disabled={true}
                validation={[]}
            />
            <TextBox
                label={translate(getLabel, "Order")}
                value={catOptionTemplate.order}
                disabled={true}

                field="order"
                validation={[]}
            />
            <TextBox
                label={translate(getLabel, "Type")}
                value={catOptionTemplate.cat_opt_type_template.type}
                disabled={true}
                field="type"
                validation={[]}
            />
        </MappsSections>

    </>
    )
}


