import { Grid } from "@material-ui/core";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function UserSignIn() {
    const LoginUser = React.useMemo(() => mappsPlugins.byName('mapps-user-login-default').component);


    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)

    return (
        <Grid container style={{ justifyContent: 'center' }} >
            <MappsContainer title={"Sign In"} icon={<AccountCircleIcon />} xs={6} sm={6}>
                <LoginUser
                    mappsSettings={{
                        mappsNameViewPlugin: "mapps-user-login-view-default",
                        basicAuth: true,
                        googleLogin: true,
                        facebookLogin: true
                    }}></LoginUser>
            </MappsContainer>

        </Grid>
    );
}

