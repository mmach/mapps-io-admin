
import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { Checkbox, TextBox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import React from "react";
import { useCategoriesOptionsAdminStoreFacade } from "../../../../../../Stores/hooks";


export function CategoryOptionsCmsFlags({ catOptionId, isImage }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

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

    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)

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
        {isImage() && <MappsSections title={'Limitations settings'}>
            <Grid container spacing={3} >
                <TextBox
                    label={translate(getLabel, "Limit of")}
                    value={catOption.limit_of}
                    onChange={(event) => {
                        setCatOption({
                            ...catOption, limit_of: event.target.value
                        });
                    }}
                    field="name"
                    validation={[]}
                />
            </Grid>
        </MappsSections>}
        <MappsSections title={'Search settings'}>

            <TextBox
                label={translate(getLabel, "Order search")}
                value={catOption.order_search}
                onChange={(event) => {
                    setCatOption({
                        ...catOption, order_search: event.target.value
                    });
                }}
                field="order"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is searchable")}
                value={catOption.is_searchable}
                onChange={(event) => {
                    setCatOption({ ...catOption, is_searchable: event.target.checked })

                }}
                field="is_searchable"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Show above pin on map")}
                value={catOption.is_on_pin_map}
                onChange={(event) => {
                    setCatOption({ ...catOption, is_on_pin_map: event.target.checked });
                }}
                field="is_on_pin_map"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Can above pin (search)")}
                value={catOption.can_above_pin}
                onChange={(event) => {
                    setCatOption({
                        ...catOption, can_above_pin: event.target.checked
                    });
                }}
                field="is_visible_view"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Treat as url params")}
                value={catOption.is_params}
                onChange={(event) => {
                    setCatOption({ ...catOption, is_params: event.target.checked });
                }}
                field="is_form_hidden"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "On main page search")}
                value={catOption.is_on_main_page}
                onChange={(event) => {
                    setCatOption({
                        ...catOption, is_on_main_page: event.target.checked
                    });
                }}
                field="is_visible_view"
                validation={[]}
            />{" "}
        </MappsSections>
        <MappsSections title={'Create settings'}>
            <TextBox
                label={translate(getLabel, "Order label")}
                value={catOption.order}
                onChange={(event) => {
                    setCatOption({
                        ...catOption, order: event.target.value
                    });
                }}
                field="order"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is require")}
                value={catOption.is_require}
                onChange={(event) => {
                    setCatOption({ ...catOption, is_require: event.target.checked });
                }}
                field="is_require"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is  on form rendered")}
                value={catOption.is_form_rendered}
                onChange={(event) => {
                    setCatOption({
                        ...catOption, is_form_rendered: event.target.checked
                    });
                }}
                field="is_form_rendered"
                validation={[]}
            />

            <Checkbox
                label={translate(getLabel, "Is in form hidden")}
                value={catOption.is_form_hidden}
                onChange={(event) => {
                    setCatOption({ ...catOption, is_form_hidden: event.target.checked });
                }}
                field="is_form_hidden"
                validation={[]}
            />
        </MappsSections>
        <MappsSections title={'Preview settings'}>
            <Checkbox
                label={translate(getLabel, "Is on map list")}
                value={catOption.is_on_map}
                onChange={(event) => {
                    setCatOption({ ...catOption, is_on_map: event.target.checked });
                }}
                field="is_on_map"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is visible in preview")}
                value={catOption.is_visible_view}
                onChange={(event) => {
                    setCatOption({ ...catOption, is_visible_view: event.target.checked });
                }}
                field="is_visible_view"
                validation={[]}
            />
        </MappsSections>
        <MappsSections title={'IUA settings'}>
            <Checkbox
                label={translate(getLabel, "On IUA view")}
                value={catOption.is_on_iua}
                onChange={(event) => {
                    setCatOption({
                        ...catOption, is_on_iua: event.target.checked
                    });
                }}
                field="is_visible_view"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Init on IUA request")}
                value={catOption.is_on_iua_request}
                onChange={(event) => {
                    setCatOption({ ...catOption, is_on_iua_request: event.target.checked });
                }}
                field="is_on_pin_map"
                validation={[]}
            />
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


