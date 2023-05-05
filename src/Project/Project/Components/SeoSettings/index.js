/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React, { useEffect } from "react";
import { v4 } from "uuid";
import { useProjectSeoAdminStoreFacade } from "../../Stores/ProjectSeoAdminStore/hook";

export function SeoSettings({ seo }) {

    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const Checkbox = React.useMemo(MappsComponents().FormComponents.Checkbox)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const [_seo, setSeo] = React.useState({
        id: v4(),
        ...seo
    })
    const [loading, setLoading] = React.useState(false)

    const { translate, getLabel } = useDictionaryStoreFacade()
    const { actions: {
        getSeo,
        upsertSeo
    } } = useProjectSeoAdminStoreFacade()

    useEffect(() => {
        setLoading(true)
        getSeo().then(succ => {
            setSeo(succ.data[0])
            setLoading(false)
        })
    }, [])

    function submit() {
        setLoading(true)
        upsertSeo(_seo).then(suc => {
            setSeo(suc.data[0])
            setLoading(false)
        })
    }
    return <Grid container style={{ justifyContent: 'center' }}>

        <MappsSections title={"Open Graph Settings"}  xs={12} sm={12}>
            <TextBox
                label={translate(getLabel, "Facebook App")}
                value={_seo.fb_app_id}
                onChange={(event) => setSeo({
                    ..._seo,
                    fb_app_id: event.target.value
                })}
                field="fb_app_id"
                validation={[]}
            />
            <TextBox

                label={translate(getLabel, "URL")}
                value={_seo.fb_url}
                onChange={(event) => setSeo({
                    ..._seo,
                    fb_url: event.target.value
                })}
                field="fb_url"
                validation={[]}
            />
            <TextBox

                label={translate(getLabel, "Title")}
                value={_seo.fb_title}
                onChange={(event) => setSeo({
                    ..._seo,
                    fb_title: event.target.value
                })}
                field="fb_title"
                validation={[]}
            />
            <TextBox

                label={translate(getLabel, "Type")}
                value={_seo.fb_type}
                onChange={(event) => setSeo({
                    ..._seo,
                    fb_type: event.target.value
                })}
                field="fb_type"
                validation={[]}
            />
            <TextBox

                label={translate(getLabel, "Image URL")}
                value={_seo.fb_image}
                onChange={(event) => setSeo({
                    ..._seo,
                    fb_image: event.target.value
                })}
                field="fb_image"
                validation={[]}
            />
            <TextBox

                label={translate(getLabel, "Description")}
                value={_seo.fb_description}
                onChange={(event) => setSeo({
                    ..._seo,
                    fb_description: event.target.value
                })}
                field="fb_description"
                validation={[]}
            />
            <TextBox

                label={translate(getLabel, "Site Name")}
                value={_seo.fb_site_name}
                onChange={(event) => setSeo({
                    ..._seo,
                    fb_site_name: event.target.value
                })}
                field="fb_site_name"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Sietmap generator")}
                value={_seo.sitemap_gen}
                onChange={(event) => setSeo({
                    ..._seo,
                    sitemap_gen: event.target.checked
                })}
            ></Checkbox>


        </MappsSections>
        <ButtonLoader
            onClick={submit}
            size={"md"}
            color={"primary"}
            value={translate(getLabel, "ACTION_BUTTON_SAVE")}
            isLoading={loading}
        />
    </Grid>
}

