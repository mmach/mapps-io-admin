import { Grid } from "@material-ui/core";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { CategoryAdd } from './CategoryAdd/index.js';
import { CategoryEdit } from './CategoryEdit/index.js';
import { CategoryTree } from "./CategoryTree/index.js";

export function Categories() {
  const Route = React.useMemo(() => mappsPlugins.byName('mapps-item-basic-route').component);
  const Routes = React.useMemo(() => mappsPlugins.byName('mapps-item-basic-routes').component);


  const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)

  return (
    <Grid container >
      <MappsContainer xs={12} sm={3}>
        <CategoryTree />
      </MappsContainer>
      <MappsContainer style={{ padding: "10px" }} xs={12} sm={9}>
        <Routes >
          <Route
            path={"/add/:status/:parentId"}
            element={<CategoryAdd ></CategoryAdd>}
          />
          <Route
            path={"/edit/:id"}
            element={<CategoryEdit ></CategoryEdit>}
          />
        </Routes>
      </MappsContainer>
    </Grid>
  );
}

