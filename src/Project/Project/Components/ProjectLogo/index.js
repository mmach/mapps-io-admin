/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React, { useEffect } from "react";
import { v4 } from "uuid";
import { useProjectAdminStoreFacade } from "../../Stores/ProjectAdminStore/hook";
import { LogoUploadImage } from "./LogoUploader";

export function ProjectLogoSettings({ project }) {

    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)

    const [_project, setProject] = React.useState({
        id: v4(),
        ...project
    })
    const [loading, setLoading] = React.useState(false)

    const { actions: {
        getProjectInfo,
    } } = useProjectAdminStoreFacade()

    useEffect(() => {
        setLoading(true)
        getProjectInfo().then(succ => {
            setProject(succ.data)
            setLoading(false)
        })
    }, [])


    return !loading && <Grid container item style={{ flexWrap: 'nowrap' }}>
        <Grid container item xs={4} style={{ justifyContent: 'center' }}>
            <MappsSections title={"Logo"}  >
                <LogoUploadImage project_logo={_project.logo} project_logo_dest={'blob_logo_id'} />
            </MappsSections>
        </Grid>
        <Grid container item xs={4} style={{ justifyContent: 'center' }}>

            <MappsSections title={"Logo Vertical"}  >
                <LogoUploadImage project_logo={_project.logo_ver} project_logo_dest={'blob_logo_ver_id'} />
            </MappsSections>
        </Grid>
        <Grid container item xs={4} style={{ justifyContent: 'center' }}>

            <MappsSections title={"Logo Horizontal"}  >
                <LogoUploadImage project_logo={_project.logo_hor} project_logo_dest={'blob_logo_hor_id'} />
            </MappsSections>
        </Grid>
    </Grid>

}

