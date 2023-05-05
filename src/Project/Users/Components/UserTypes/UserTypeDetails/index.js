/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import { mappsPlugins, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useUserTypesAdminStoreFacade } from "../../../Stores/hooks.js";
import { UserTypeRoles } from "./UserTypeRoles/index.js";



export function UserTypeDetails(props) {

    const [loading, setLoading] = React.useState(true)
    const MappsSection = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const TranslateComponent = React.useMemo(() => mappsPlugins.byName('mapps-component-translate-component').component, [])

    const { translate, getLabel } = useDictionaryStoreFacade()
    const [userType, setUserType] = React.useState()

    const {
        selectors: {
            getUserTypeByIdReducer
        },
        actions: {
        },
        hooks: {
            setUserTypeId
        } } = useUserTypesAdminStoreFacade()

    React.useEffect(() => {
        setUserTypeId(props.id)
    }, [])

    React.useEffect(() => {
        if (!!getUserTypeByIdReducer) {
            setUserType({ ...getUserTypeByIdReducer })
        }
    }, [getUserTypeByIdReducer])


    return userType && <Grid container style={{ justifyContent: 'center' }}>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="User Type Translation" >
                <TranslateComponent translation={userType.translation || {}} isReadOnly={true}></TranslateComponent>
            </MappsSection>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="User Type Roles" >
                <UserTypeRoles userTypeId={userType.id}></UserTypeRoles>
            </MappsSection>
        </Grid>

    </Grid>
}

