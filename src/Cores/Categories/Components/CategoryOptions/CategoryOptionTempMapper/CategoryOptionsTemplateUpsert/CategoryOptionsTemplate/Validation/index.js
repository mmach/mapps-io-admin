import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { Checkbox, TextBox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";
import React from 'react';



export function CategoryOptionsTemplateValidation({ categoryOptionTemplate, setCategoryOptionTemplate, isSelection, isNumeric, isDimReference }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)

    const [catOptionTemplate, setCatOptionTemplate] = React.useState({ ...categoryOptionTemplate })
    React.useEffect(() => {
        setCategoryOptionTemplate(catOptionTemplate)
    }, [catOptionTemplate])

    return (<>

        {isNumeric() && <MappsSections title={translate(getLabel, "Category numeric type flags")}>
            <Checkbox
                label={translate(getLabel, "Allow Negative")}
                value={catOptionTemplate.allow_negative}
                onChange={(event) => setCatOptionTemplate({
                    ...catOptionTemplate,
                    allow_negative: event.target.checked
                })}
                field="is_required"
                validation={[]}
            />

            <Checkbox
                label={translate(getLabel, "Allow Empty Formatting")}
                value={catOptionTemplate.allow_empty_formatting}
                onChange={(event) => setCatOptionTemplate({
                    ...catOptionTemplate,
                    allow_empty_formatting: event.target.checked
                })}

                field="allow_empty_formatting"
                validation={[]}
            />

            <Checkbox
                label={translate(getLabel, "Allow Leading Zero")}
                value={catOptionTemplate.allow_leading_zeros}
                onChange={(event) => setCatOptionTemplate({
                    ...catOptionTemplate,
                    allow_leading_zeros: event.target.checked
                })}
                field="is_required"
                validation={[]}
            />
            <Grid container >
                <Grid container spacing={3}>

                    <Grid item xs="6">
                        <TextBox

                            label={translate(getLabel, "Min")}
                            value={catOptionTemplate.min}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                min: event.target.value
                            })}
                            field="min"
                            validation={[]}
                        />

                    </Grid>
                    <Grid item xs="6">
                        <TextBox

                            label={translate(getLabel, "Min Message Token")}
                            value={catOptionTemplate.min_message}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                min_message: event.target.value
                            })}
                            field="min_message"
                            validation={[]}
                        />

                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs="6">
                        <TextBox

                            label={translate(getLabel, "Max")}
                            value={catOptionTemplate.max}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                max: event.target.value
                            })}
                            field="max"
                            validation={[]}
                        />

                    </Grid>
                    <Grid item xs="6">
                        <TextBox

                            label={translate(getLabel, "Max Message Token")}
                            value={catOptionTemplate.max_message}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                max_message: event.target.value
                            })}
                            field="max_message"
                            validation={[]}
                        />

                    </Grid>
                </Grid>

            </Grid>
        </MappsSections>}

        <MappsSections title={translate(getLabel, "Category types with textfield")}>
            <Grid item xs="12">


                <Grid container spacing={3}>
                    <Grid item xs="6">
                        <Checkbox

                            label={translate(getLabel, "Is Required")}
                            value={catOptionTemplate.is_required}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                is_required: event.target.checked
                            })}

                            field="is_required"
                            validation={[]}
                        />
                    </Grid>
                    <Grid item xs="6">
                        <TextBox

                            label={translate(getLabel, "Is Required Message Token")}
                            value={catOptionTemplate.is_required_message}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                is_required_message: event.target.value
                            })}

                            field="is_required_message"
                            validation={[]}
                        />

                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs="6">
                        <TextBox

                            label={translate(getLabel, "Min Length")}
                            value={catOptionTemplate.min_length}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                min_length: event.target.value
                            })}
                            field="min_length"
                            validation={[]}
                        />

                    </Grid>
                    <Grid item xs="6">
                        <TextBox

                            label={translate(getLabel, "Min Length Message Token")}
                            value={catOptionTemplate.min_length_message}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                min_length_message: event.target.value
                            })}
                            field="min_length"
                            validation={[]}
                        />

                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs="6">
                        <TextBox
                            label={translate(getLabel, "Max Length")}
                            value={catOptionTemplate.max_length}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                max_length: event.target.value
                            })}
                            field="max_length"
                            validation={[]}
                        />

                    </Grid>
                    <Grid item xs="6">
                        <TextBox
                            label={translate(getLabel, "Max Length Message Token")}
                            value={catOptionTemplate.max_length_message}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                max_length_message: event.target.value
                            })}
                            field="max_length"
                            validation={[]}
                        />

                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs="6">
                        <TextBox
                            label={translate(getLabel, "Pattern")}
                            value={catOptionTemplate.pattern}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                pattern: event.target.value
                            })}
                            field="pattern"
                            validation={[]}
                        />

                    </Grid>
                    <Grid item xs="6">
                        <TextBox
                            label={translate(getLabel, "Pattern Message Token")}
                            value={catOptionTemplate.pattern_message}
                            onChange={(event) => setCatOptionTemplate({
                                ...catOptionTemplate,
                                pattern_message: event.target.value
                            })}
                            field="pattern_length"
                            validation={[]}
                        />

                    </Grid>
                </Grid>
            </Grid>

        </MappsSections>
    </>
    )
}


