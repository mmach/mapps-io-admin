import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { Checkbox, TextBox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import React from "react";
import { useCategoriesOptionsAdminStoreFacade } from "../../../../../../Stores/hooks";


export function CategoryOptionsValidation({ catOptionId, isMultiselection }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const { selectors: {
        getCategoryOptionsById
    }, hooks: {
        setCategoryOptionId
    }, actions: {
        upsertCategoryOptions
    }, functions: {
        isLoaded
    } } = useCategoriesOptionsAdminStoreFacade()
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const [catOption, setCatOption] = React.useState()

    React.useEffect(() => {
        setCategoryOptionId(catOptionId)
    }, [catOptionId])
    React.useEffect(() => {
        setCatOption(getCategoryOptionsById)
    }, [getCategoryOptionsById])

    function save(event) {
        upsertCategoryOptions(catOption);
    }

    if (!(isLoaded(catOptionId) && catOption)) {
        return <></>
    }

    return isLoaded(catOptionId) && catOption && (<>
        <MappsSections title={translate(getLabel, "Select Limitation")}>

            <Grid container spacing={3} >
                <Grid item xs="12" sm="5">
                    <Checkbox
                        label={translate(getLabel, "Is Required")}
                        value={catOption.is_required}
                        onChange={(event) => {
                            setCatOption({ catOption, is_required: event.target.checked })

                        }}
                        field="is_required"
                        validation={[]}
                    />
                </Grid>
                <Grid item xs="12" sm="7">
                    <TextBox
                        label={translate(getLabel, "Is Required Message")}
                        value={catOption.is_required_message}
                        onChange={(event) => {
                            setCatOption({
                                catOption, is_required_message: event.target.value
                            });
                        }}
                        field="is_required_message"
                        validation={[]}
                    />
                </Grid>
            </Grid>
            {isMultiselection() && <><Grid container spacing={3} >
                <Grid item xs="12" sm="5">

                    <TextBox
                        label={translate(getLabel, "Min Selected")}
                        value={catOption.min_selected}
                        onChange={(event) => {
                            setCatOption({
                                catOption, min_selected: event.target.value
                            });
                        }}
                        field="min_selected"
                        validation={[]}
                    />
                </Grid>
                <Grid item xs="12" sm="7" >
                    <TextBox
                        label={translate(getLabel, "Min Selected Message")}
                        value={catOption.min_selected_message}
                        onChange={(event) => {
                            setCatOption({
                                catOption, min_selected_message: event.target.value
                            });
                        }}
                        field="min_selected_message"
                        validation={[]}
                    />
                </Grid>
            </Grid>
                <Grid container spacing={3} >
                    <Grid item xs="12" sm="5">
                        <TextBox
                            label={translate(getLabel, "Max Selected")}
                            value={catOption.max_selected}
                            onChange={(event) => {
                                setCatOption({
                                    catOption, max_selected: event.target.value
                                });
                            }}
                            field="max_selected"
                            validation={[]}
                        />
                    </Grid>
                    <Grid item xs="12" sm="7">
                        <TextBox
                            label={translate(getLabel, "Max  Selected Message")}
                            value={catOption.max_selected_message}
                            onChange={(event) => {
                                setCatOption({
                                    catOption, max_selected_message: event.target.value
                                });
                            }}
                            field="max_selected_message"
                            validation={[]}
                        />
                    </Grid>
                </Grid>
            </>}
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

