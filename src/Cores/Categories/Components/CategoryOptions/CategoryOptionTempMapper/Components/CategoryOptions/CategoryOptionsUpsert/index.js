import { Button, Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDictionaryStoreFacade, useLanguageStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { DropDownList, TextBox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useCategoriesOptionsAdminStoreFacade } from "../../../../../../Stores/hooks";

export function CategoryOptionsUpsert({ catOptionId, readOnly }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
     const navigate = useNavigate()
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


    const [catOption, setCatOption] = React.useState({
        id: v4()
    })

    function getCategoryTypesValues() {
        const result = Array.isArray(getCategoryTypes) ? getCategoryTypes.map((item) => {
            return { id: item.id, value: item.name, type: item.type };
        }) : [];
        return [{ id: undefined, value: "", type: undefined }, ...result];
    }

    function save(event) {
        catOption.translation_id = v4()
        catOption.translation = {
            id: catOption.translation_id
        }

        upsertCategoryOptions(catOption).then(succ => {
            navigate(`/mapps/categories/categoriesOptions?catOptionId=${catOption.id}`)
        });
    }

    return (<>
        <MappsSections title={translate(getLabel, "Create new Category Option")}>
            <DropDownList
                value={catOption.cot_id}
                label={translate(getLabel, "CATEGORY_TEMP_OPTION_TYPE_LABEL")}
                valueOptions={getCategoryTypesValues()}
                onChange={(event) => {
                    setCatOption({ ...catOption, cot_id: event.target.value })
                }}
                field="type"
            />
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
            <ButtonLoader
                color={"primary"}
                onClick={save}
                value={translate(getLabel, "Create")}
                variant={"outlined"}
            >
            </ButtonLoader>
        </MappsSections>
    </>
    )
}


