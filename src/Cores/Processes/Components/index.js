/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useLocation } from "react-router-dom";
import { useProcessAdminStoreFacade } from "../Stores/hooks.js";
import ProcessList from './ProcessList/index.js'
import { ProcessContainer } from "./ProcessContainer/index.js";



export function Process() {
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const [loading, setLoading] = React.useState(false)
    const location = useLocation()


    const { selectors: {
        processesSelector
    }, actions: {
        getAllProcess
    } } = useProcessAdminStoreFacade()

    React.useEffect(() => {
        if (processesSelector.length == 0) {
            setLoading(true)
            getAllProcess().then(succ => {
                setLoading(false)
            })
        }
    }, [])


    return (
        <Grid container >
            <MappsContainer title={"TODOOOO"} xs={12} sm={12}>
                TODOOOOOOs
                <Grid >
                    EDIT PROCESS - Change Name
                    Tab with related processes and from which process state we run external process
                </Grid>

            </MappsContainer>
            <MappsContainer xs={12} sm={3}>
                <ProcessList />
            </MappsContainer>
            <MappsContainer style={{ padding: "10px" }} xs={12} sm={9}>
                <ProcessContainer></ProcessContainer>
            </MappsContainer>
        </Grid>
    );
}
