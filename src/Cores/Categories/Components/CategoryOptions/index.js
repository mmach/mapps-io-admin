/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useCategoriesOptionsAdminStoreFacade } from "../../Stores/hooks.js";
import CategoryOptionsListByType from "./CategoryOptionsListByType/index.js";
import CategoryOptionTempMapper from "./CategoryOptionTempMapper/index.js";

export function CategoryOptions() {
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const BodyLoader = React.useMemo(MappsComponents().BodyLoader)
    const [loading, setLoading] = React.useState(false)

    const { selectors: {
        getAllCategoryOptionsReducer
    }, actions: {
        getAllCategoryOptions
    } } = useCategoriesOptionsAdminStoreFacade()

    React.useEffect(() => {
        if (getAllCategoryOptionsReducer.length == 0) {
            setLoading(true)
            getAllCategoryOptions().then(succ => {
                setLoading(false)
            })
        }
    }, [])


    return (
        <Grid container >
            <MappsContainer xs={12} sm={3}>
                {!loading && <CategoryOptionsListByType />}
                {loading && <BodyLoader text=" " size="25px" />}
            </MappsContainer>
            <MappsContainer style={{ padding: "10px" }} xs={12} sm={9}>
                {!loading && <CategoryOptionTempMapper />}
                {loading && <BodyLoader text=" " size="25px" />}
            </MappsContainer>
        </Grid>
    );
}
