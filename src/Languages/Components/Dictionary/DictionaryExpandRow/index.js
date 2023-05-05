import { Grid } from "@material-ui/core";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";


export function DictionaryExpandRow(props) {
    const MappsSection = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const TranslateComponent = React.useMemo(() => mappsPlugins.byName('mapps-component-translate-component').component, [])

    return <Grid container style={{ display: 'flex' }}>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="Translation" >
                <TranslateComponent translation={props.message || {}} isReadOnly={true}></TranslateComponent>
            </MappsSection>
        </Grid>
    </Grid>

}





