/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { ProjectSettings } from "./Project/index.js";
import { ProjectLogoSettings } from "./ProjectLogo/index.js";
import { SeoSettings } from "./SeoSettings/index.js";
import SettingsIcon from '@mui/icons-material/Settings';

function Project() {

    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)

    const { translate, getLabel } = useDictionaryStoreFacade()

    return <Grid container style={{ justifyContent: 'center' }}>

        <MappsContainer title={"Project Settings"} icon={<SettingsIcon />} xs={12} sm={12}>
            <MappsTabs defaultTab={0} tabConfig={
                [
                    {
                        label: translate(getLabel, 'Project'),
                        render: () => <ProjectSettings></ProjectSettings>
                    },
                    {
                        label: translate(getLabel, 'SEO'),
                        render: () => <SeoSettings ></SeoSettings>
                    },
                    {
                        label: translate(getLabel, 'LOGO'),
                        render: () => <ProjectLogoSettings></ProjectLogoSettings>
                    },
                ]
            }>
            </MappsTabs>
        </MappsContainer>
    </Grid>
}

export default Project;
