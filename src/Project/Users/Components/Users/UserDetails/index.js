/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import { mappsPlugins, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useUserAdminStoreFacade, useUserTypesAdminStoreFacade } from "../../../Stores/hooks.js";
import { UserRoles } from "./UserRoles/index.js";



export function UserDetails(props) {

    const [loading, setLoading] = React.useState(true)
    const MappsSection = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)

    const { translate, getLabel } = useDictionaryStoreFacade()
    const [user, setUser] = React.useState()

    const {
        selectors: {
            getUserByIdeReducer
        },
        actions: {
        },
        hooks: {
            setUserId
        } } = useUserAdminStoreFacade()

    React.useEffect(() => {
        setUserId(props.id)
    }, [])

    React.useEffect(() => {
        if (!!getUserByIdeReducer) {
            setUser({ ...getUserByIdeReducer })
        }
    }, [getUserByIdeReducer])


    return user &&
        <MappsTabs defaultTab={0} tabConfig={
            [
                {
                    label: translate(getLabel, '[TODO]Profile && Roles'),
                    render: () => <Grid container style={{ justifyContent: 'center' }}>
                        <Grid item xs={8} style={{ display: 'flex' }}>
                            <MappsSection title="User Profile" >
                            </MappsSection>
                        </Grid>
                        <Grid item xs={4} style={{ display: 'flex' }}>
                            <MappsSection title="User Roles" >
                                <UserRoles userId={props.id}></UserRoles>
                            </MappsSection>
                        </Grid>

                    </Grid>
                },
                {
                    label: translate(getLabel, '[TODO] ITEMS'),
                    render: () => <Grid container style={{ justifyContent: 'center' }}>
                        <Grid item xs={4} style={{ display: 'flex' }}>
                            <MappsSection title="User Address" >
                            </MappsSection>
                        </Grid>

                    </Grid>
                },
                {
                    label: translate(getLabel, '[TODO] PROCESS'),
                    render: () => <Grid container style={{ justifyContent: 'center' }}>
                        <Grid item xs={4} style={{ display: 'flex' }}>
                            <MappsSection title="User Address" >
                            </MappsSection>
                        </Grid>

                    </Grid>
                },
                {
                    label: translate(getLabel, '[TODO] CATEGORY PREVIEW'),
                    render: () => <Grid container style={{ justifyContent: 'center' }}>
                        <Grid item xs={4} style={{ display: 'flex' }}>
                            <MappsSection title="User Address" >
                            </MappsSection>
                        </Grid>

                    </Grid>
                },
                {
                    label: translate(getLabel, '[TODO] IUA RELATED'),
                    render: () => <Grid container style={{ justifyContent: 'center' }}>
                        <Grid item xs={4} style={{ display: 'flex' }}>
                            <MappsSection title="User Address" >
                            </MappsSection>
                        </Grid>

                    </Grid>
                },
                {
                    label: translate(getLabel, '[TODO] INVOICES'),
                    render: () => <Grid container style={{ justifyContent: 'center' }}>
                        <Grid item xs={4} style={{ display: 'flex' }}>
                            <MappsSection title="User Address" >
                            </MappsSection>
                        </Grid>

                    </Grid>
                },
            ]}
        ></MappsTabs>

}

