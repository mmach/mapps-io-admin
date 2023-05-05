import { Grid } from "@material-ui/core";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { StatusProcess } from "./StatusProcess/index.js";


export function StatusExpandRow(props) {
    const MappsSection = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const TranslateComponent = React.useMemo(() => mappsPlugins.byName('mapps-component-translate-component').component, [])

    return props.statusProject ? <Grid container style={{ display: 'flex' }}>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="Status Translation" >
                <TranslateComponent translation={props.statusProject.translation || {}}  isReadOnly={true}></TranslateComponent>
            </MappsSection>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="Process Related" >
                <StatusProcess {...props}></StatusProcess>
            </MappsSection>
        </Grid>
    </Grid> : <></>

}





