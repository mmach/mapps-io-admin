/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { ActionPrivileges } from './ActionPrivileges/index.js';
import { ActionProcess } from './ActionProcess/index.js';

export function ActionDetailsPreview(props) {
    // const MappsSection = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const MappsSection = React.useMemo(MappsComponents().Layouts.Groups.V1)
    return props.actionsProject ? <Grid container style={{ display: 'flex' }}>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="Privileges" >
                <ActionPrivileges {...props}></ActionPrivileges>
            </MappsSection>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="Process Related" >
                <ActionProcess {...props}></ActionProcess>
            </MappsSection>
        </Grid>
    </Grid> : <></>
}

