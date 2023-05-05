import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { Checkbox, TextBox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";
import React from 'react';



export function CategoryOptionsTemplateCmsFlags({ categoryOptionTemplate, setCategoryOptionTemplate, isSelection, isNumeric }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)

    const [catOptionTemplate, setCatOptionTemplate] = React.useState({ ...categoryOptionTemplate })
    React.useEffect(() => {
        setCategoryOptionTemplate(catOptionTemplate)
    }, [catOptionTemplate])

    return (<>
        <MappsSections title={translate(getLabel, "Category Options Template CMS Common Flags")}>
            <Checkbox
                label={translate(getLabel, "Allow to freetext search")}
                value={catOptionTemplate.is_not_in_clob}
                onChange={(event) => {
                    setCatOptionTemplate({ ...catOptionTemplate, is_not_in_clob: event.target.checked });
                }}
                field="is_in_clob"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is visible in view")}
                value={catOptionTemplate.is_visible_view}
                onChange={(event) => {
                    setCatOptionTemplate({ ...catOptionTemplate, is_visible_view: event.target.checked });
                }}
                field="is_visible_view"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is visible in form")}
                value={catOptionTemplate.is_visible_form}
                onChange={(event) => {
                    setCatOptionTemplate({ ...catOptionTemplate, is_visible_form: event.target.checked });
                }}
                field="is_visible_form"
                validation={[]}
            />

            <Checkbox
                label={translate(getLabel, "Is visible in search")}
                value={catOptionTemplate.is_visible_search}
                onChange={(event) => {
                    setCatOptionTemplate({ ...catOptionTemplate, is_visible_search: event.target.checked });
                }}
                field="is_visible_search"
                validation={[]}
            />
        </MappsSections>
        {isSelection() && <MappsSections title={translate(getLabel, "Category Select/Multiselect Flags")}>
            <Checkbox
                label={translate(getLabel, "Is Prefix")}
                value={catOptionTemplate.is_prefix}
                onChange={(event) => setCatOptionTemplate({
                    ...catOptionTemplate,
                    is_prefix: event.target.checked
                })}

                field="is_prefix"
                validation={[]}
            />

            <Checkbox
                label={translate(getLabel, "Is Suffix")}
                value={catOptionTemplate.is_suffix}
                onChange={(event) => setCatOptionTemplate({
                    ...catOptionTemplate,
                    is_suffix: event.target.checked
                })}

                field="is_suffix"
                validation={[]}
            />


            <Checkbox
                label={translate(getLabel, "Is readonly")}
                value={catOptionTemplate.is_readOnly}
                onChange={(event) => {
                    setCatOptionTemplate({ ...catOptionTemplate, is_readOnly: event.target.checked });
                }}
                field="is_visible_search"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is DEFAULT")}
                value={catOptionTemplate.is_default_value}
                onChange={(event) => {
                    setCatOptionTemplate({ ...catOptionTemplate, is_default_value: event.target.checked });
                }}
                field="is_default_value"
                validation={[]}
            />

        </MappsSections>}
        {isNumeric() && <MappsSections title={translate(getLabel, "Category options template numeric type flags")}>
            <Grid container spacing={3}>
                <Grid item xs="4">
                    <TextBox
                        label={translate(getLabel, "Decimal Scale")}
                        value={catOptionTemplate.decimal_scale}
                        onChange={(event) => setCatOptionTemplate({
                            ...catOptionTemplate,
                            decimal_scale: event.target.value
                        })}
                        field="mask"
                        validation={[]}
                    />

                </Grid>
                <Grid item xs="4">
                    <TextBox

                        label={translate(getLabel, "DEFAULT VALUE")}
                        value={catOptionTemplate.default_value}
                        onChange={(event) => setCatOptionTemplate({
                            ...catOptionTemplate,
                            default_value: event.target.value
                        })}
                        field="default_value"
                        validation={[]}
                    />

                </Grid>
                <Grid item xs="4">
                    <TextBox
                        label={translate(getLabel, "INPUT FORMAT")}
                        value={catOptionTemplate.input_format}
                        onChange={(event) => setCatOptionTemplate({
                            ...catOptionTemplate,
                            input_format: event.target.value
                        })}
                        field="input_format"
                        validation={[]}
                    />
                </Grid>
            </Grid>
        </MappsSections>}
        {!isSelection() && <MappsSections title={translate(getLabel, "Category options template textfield type flags")}>
            <Grid item xs="12">
                <TextBox
                    label={translate(getLabel, "mask")}
                    value={catOptionTemplate.mask}
                    onChange={(event) => setCatOptionTemplate({
                        ...catOptionTemplate,
                        mask: event.target.value
                    })}
                    field="mask"
                    validation={[]}
                />

            </Grid>
        </MappsSections>}
    </>
    )
}


