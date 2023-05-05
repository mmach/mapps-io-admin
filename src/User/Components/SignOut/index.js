import { Grid } from "@material-ui/core";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';

export function UserLogOut() {
    const LogOut = React.useMemo(() => mappsPlugins.byName('mapps-user-logout-default').component);


    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)

    return (
        <Grid container style={{ justifyContent: 'center' }} >
            <MappsContainer title={"Log Out"} icon={<LogoutIcon />} xs={6} sm={6}>
                <Grid style={{ justifyContent: 'center', display: 'flex' }}>
                    <LogOut
                        mappsSettings={{
                            mappsNameViewPlugin: "mapps-user-logout-view-default",
                        }}
                    ></LogOut>
                </Grid>
            </MappsContainer>

        </Grid>
    );
}

