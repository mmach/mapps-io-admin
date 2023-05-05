
import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { Checkbox, TextBox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import React from "react";


export function CategoryOptionsLinkCmsFlags({ categoryOptionLink, isImage, setCategoryOptionLink }) {
    const { translate, getLabel } = useDictionaryStoreFacade()

    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const [catOptionLink, setCatOptionLink] = React.useState({ ...categoryOptionLink })
    React.useEffect(() => {
        setCategoryOptionLink(catOptionLink)
    }, [catOptionLink])
    return (<>
        {isImage() && <MappsSections title={'Limitations settings'}>
            <Grid container spacing={3} >
                <TextBox
                    label={translate(getLabel, "Limit of")}
                    value={catOptionLink.limit_of}
                    onChange={(event) => {
                        setCatOptionLink({
                            ...catOptionLink, limit_of: event.target.value
                        });
                    }}
                    type={'numeric'}
                    field="name"
                    validation={[]}
                />
            </Grid>
        </MappsSections>}
        <MappsSections title={'Search settings'}>
            <TextBox
                label={translate(getLabel, "Order search")}
                value={catOptionLink.order_search}
                onChange={(event) => {
                    setCatOptionLink({
                        ...catOptionLink, order_search: event.target.value
                    });
                }}
                type={'numeric'}
                field="order"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is searchable")}
                value={catOptionLink.is_searchable}
                onChange={(event) => {
                    setCatOptionLink({ ...catOptionLink, is_searchable: event.target.checked })

                }}
                field="is_searchable"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Show above pin on map")}
                value={catOptionLink.is_on_pin_map}
                onChange={(event) => {
                    setCatOptionLink({ ...catOptionLink, is_on_pin_map: event.target.checked });
                }}
                field="is_on_pin_map"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Can above pin (search)")}
                value={catOptionLink.can_above_pin}
                onChange={(event) => {
                    setCatOptionLink({
                        ...catOptionLink, can_above_pin: event.target.checked
                    });
                }}
                field="is_visible_view"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Treat as url params")}
                value={catOptionLink.is_params}
                onChange={(event) => {
                    setCatOptionLink({ ...catOptionLink, is_params: event.target.checked });
                }}
                field="is_form_hidden"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "On main page search")}
                value={catOptionLink.is_on_main_page}
                onChange={(event) => {
                    setCatOptionLink({
                        ...catOptionLink, is_on_main_page: event.target.checked
                    });
                }}
                field="is_visible_view"
                validation={[]}
            />
        </MappsSections>
        <MappsSections title={'Create settings'}>
            <TextBox
                label={translate(getLabel, "Order label")}
                value={catOptionLink.order}
                onChange={(event) => {
                    setCatOptionLink({
                        ...catOptionLink, order: event.target.value
                    });
                }}
                type={'numeric'}
                field="order"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is require")}
                value={catOptionLink.is_require}
                onChange={(event) => {
                    setCatOptionLink({ ...catOptionLink, is_require: event.target.checked });
                }}
                field="is_require"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is  on form rendered")}
                value={catOptionLink.is_form_rendered}
                onChange={(event) => {
                    setCatOptionLink({
                        ...catOptionLink, is_form_rendered: event.target.checked
                    });
                }}
                field="is_form_rendered"
                validation={[]}
            />

            <Checkbox
                label={translate(getLabel, "Is in form hidden")}
                value={catOptionLink.is_form_hidden}
                onChange={(event) => {
                    setCatOptionLink({ ...catOptionLink, is_form_hidden: event.target.checked });
                }}
                field="is_form_hidden"
                validation={[]}
            />
        </MappsSections>
        <MappsSections title={'Preview settings'}>
            <Checkbox
                label={translate(getLabel, "Is on map list")}
                value={catOptionLink.is_on_map}
                onChange={(event) => {
                    setCatOptionLink({ ...catOptionLink, is_on_map: event.target.checked });
                }}
                field="is_on_map"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is visible in preview")}
                value={catOptionLink.is_visible_view}
                onChange={(event) => {
                    setCatOptionLink({ ...catOptionLink, is_visible_view: event.target.checked });
                }}
                field="is_visible_view"
                validation={[]}
            />
        </MappsSections>
        <MappsSections title={'IUA settings'}>
            <Checkbox
                label={translate(getLabel, "On IUA view")}
                value={catOptionLink.is_on_iua}
                onChange={(event) => {
                    setCatOptionLink({
                        ...catOptionLink, is_on_iua: event.target.checked
                    });
                }}
                field="is_visible_view"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Init on IUA request")}
                value={catOptionLink.is_on_iua_request}
                onChange={(event) => {
                    setCatOptionLink({ ...catOptionLink, is_on_iua_request: event.target.checked });
                }}
                field="is_on_pin_map"
                validation={[]}
            />
        </MappsSections>

    </>
    )
}


