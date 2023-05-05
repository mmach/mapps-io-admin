import { useConfigStoreFacade, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { DropDownList, TagComponent, TextBox, Checkbox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";
import React from "react";
import { v4 } from "uuid";

const operator = ["!", "|", "&", "=", ">", ">=", "*", "+", "-", "/", "<=", "<"];

export function CategoryOptionsTemplateCore({ categoryOptionTemplate, setCategoryOptionTemplate, isSelection, isNumeric, isStrict, isDimReference }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)

    const [catOptionTemplate, setCatOptionTemplate] = React.useState({ ...categoryOptionTemplate })
    React.useEffect(() => {
        setCategoryOptionTemplate(catOptionTemplate)
    }, [catOptionTemplate])

    const { selectors: {
        dimensionsSelector
    } } = useConfigStoreFacade();

    function onTagFunc(event) {
        const func = Object.keys(event)
            .map((i) => event[i].label)
            .join(" ");
        setCatOptionTemplate({
            ...catOptionTemplate,
            func: func

        });
    }

    function getDimValues() {
        return [
            { id: null, value: null },
            ...dimensionsSelector
                .filter((item) => {
                    return (
                        item.cott_id ==
                        (catOptionTemplate.cott_id.id
                            ? catOptionTemplate.cott_id.id
                            : catOptionTemplate.cott_id)
                    );
                })
                .map((item) => {
                    return {
                        id: item.id,
                        value: item.name
                    };
                })
        ];
    }
    function getDimValuesRef() {
        return [
            { id: "", value: "" },
            ...dimensionsSelector
                .filter((item) => {
                    return item.as_cat_ref == true;
                })
                .map((item) => {
                    return {
                        id: item.id,
                        value: item.name
                    };
                })
        ];
    }

    return (<>
        <MappsSections title={translate(getLabel, "Category Options Template Core")}>
            <TextBox
                label={translate(getLabel, "Token")}
                value={catOptionTemplate.token}
                onChange={(event) => setCatOptionTemplate({
                    ...catOptionTemplate,
                    token: event.target.value
                })}
                field="Name"
                validation={[]}
            />
            <TextBox
                noLabel
                label={translate(getLabel, "Option Value")}
                value={catOptionTemplate.value}
                onChange={(event) => setCatOptionTemplate({
                    ...catOptionTemplate,
                    value: event.target.value
                })}
                field="value"
                validation={[]}
            />
            {!isSelection() && <DropDownList
                label={translate(getLabel, "Dimension referance value")}
                valueOptions={getDimValuesRef()}
                value={catOptionTemplate.dim_ref_id}
                onChange={(event) => setCatOptionTemplate({
                    ...catOptionTemplate,
                    dim_ref_id: event.target.value
                })}
                field="type"
                validation={[]}
            />}

            {!isSelection() && <DropDownList
                label={translate(getLabel, "Dimension type")}
                valueOptions={getDimValues()}
                value={catOptionTemplate.dim_id}
                onChange={(event) => setCatOptionTemplate({
                    ...catOptionTemplate,
                    dim_id: event.target.value
                })}
                field="type"
                validation={[]}
            />}
            {!isStrict() && <TextBox
                label={translate(getLabel, "Order")}
                value={catOptionTemplate.order}
                onChange={(event) => setCatOptionTemplate({
                    ...catOptionTemplate,
                    order: event.target.value
                })}
                field="order"
                validation={[]}
            />}
            {!isStrict() && <Checkbox
                label={translate(getLabel, "Active")}
                value={catOptionTemplate.status}
                onChange={(event) => setCatOptionTemplate({
                    ...catOptionTemplate,
                    status: event.target.checked
                })}
                field="order"
                validation={[]}
            />}
            {!isDimReference() && !isSelection() && <TagComponent
                id={"tagComponent"}
                notUniq={true}
                tags={
                    catOptionTemplate.func
                        ? catOptionTemplate.func.split(" ").map((i) => {
                            return {
                                id: v4(),
                                value: v4(),
                                label: i
                            };
                        })
                        : []
                }
                label={"Function"}
                onChange={onTagFunc}
                suggestions={[
                    ...operator.map((i) => {
                        return {
                            value: i,
                            label: i,
                            type: "OPERATOR"
                        };
                    }),
                    ,
                    ...dimensionsSelector.map((i) => {
                        return {
                            id: v4(),
                            value: v4(),
                            label: `#$${i.name.trim()}#`,
                            type: "PRIV"
                        };
                    })
                ]}
            ></TagComponent>}
        </MappsSections>

    </>
    )
}


