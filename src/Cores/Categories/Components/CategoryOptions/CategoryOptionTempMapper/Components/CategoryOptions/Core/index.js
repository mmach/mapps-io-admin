import { Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { DropDownList, TextBox, Checkbox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useCategoriesOptionsAdminStoreFacade } from "../../../../../../Stores/hooks";

export function CategoryOptionsCore({ catOptionId, readOnly }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const { selectors: {
        getCategoryOptionsById,
        getCategoryTypes
    },
        actions: {
            upsertCategoryOptions
        },
        hooks: {
            setCategoryOptionId
        }, functions: {
            isLoaded
        } } = useCategoriesOptionsAdminStoreFacade()

    const { selectors: {
        dimensionsSelector
    } } = useConfigStoreFacade();

    const [catOption, setCatOption] = React.useState()

    React.useEffect(() => {
        setCategoryOptionId(catOptionId)
    }, [catOptionId])

    React.useEffect(() => {
        setCatOption(getCategoryOptionsById)
    }, [getCategoryOptionsById])

    function getDimensionsValues() {
        return [
            { id: null, value: null },
            ...dimensionsSelector
                .filter((item) => {
                    return item.co_type_id == catOption.cot_id && item.cott_id == null;
                })
                .map((item) => {
                    return {
                        id: item.id,
                        value: item.name
                    };
                })
        ];
    }
    function getCategoryTypesValues() {
        const result = Array.isArray(getCategoryTypes) ? getCategoryTypes.map((item) => {
            return { id: item.id, value: item.name, type: item.type };
        }) : [];
        return [{ id: undefined, value: "", type: undefined }, ...result];
    }

    function save(event) {
        upsertCategoryOptions(catOption);
    }
    if (!(isLoaded(catOptionId) && catOption)) {
        return <></>
    }

    return isLoaded(catOptionId) && catOption && (<>
        <MappsSections title={translate(getLabel, "Core")}>
            {readOnly && <Grid item xs="12">
                <TextBox
                    label={translate(getLabel, "Id")}
                    value={catOption.id}
                    onChange={(event) => {
                        setCatOption({ ...catOption, name: event.target.value })

                    }}
                    disabled={true}
                    field="name"
                    validation={[]}
                />
                {catOption.lang}
            </Grid>}
            <Grid item xs="12">
                <TextBox
                    label={translate(getLabel, "Name")}
                    value={catOption.name}
                    onChange={(event) => {
                        setCatOption({ ...catOption, name: event.target.value })

                    }}
                    disabled={readOnly}
                    field="name"
                    validation={[]}
                />
                {catOption.lang}
            </Grid>


            <DropDownList
                disabled={catOption.cot_id}
                isRequired={true}
                value={catOption && catOption.cot_id}
                label={translate(getLabel, "CATEGORY_TEMP_OPTION_TYPE_LABEL")}
                valueOptions={getCategoryTypesValues()}
                field="type"
            />
            <Grid item xs="12">
                <DropDownList
                    disabled={readOnly}
                    label={translate(getLabel, "Dimension")}
                    valueOptions={getDimensionsValues()}
                    value={catOption.dim_id}
                    onChange={(event) => {
                        setCatOption({
                            ...catOption,
                            dim_id: event.target.value.length > 0 ? event.target.value : null
                        });
                    }}
                    field="type"
                    validation={[]}
                />
            </Grid>
            <Grid item xs="12">
                <Checkbox
                    disabled={readOnly}
                    label={translate(getLabel, "Active")}
                    value={catOption.status}
                    onChange={(event) => setCatOption({
                        ...catOption,
                        status: event.target.checked
                    })}
                    field="status"
                    validation={[]}
                />
            </Grid>
        </MappsSections>
        {!readOnly && <>
            <ButtonLoader
                color={"primary"}
                onClick={save}
                value={translate(getLabel, "Save")}
                variant={"outlined"}
            >
            </ButtonLoader>
        </>
        }

    </>
    )
}


