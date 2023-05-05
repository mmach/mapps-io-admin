/*
    ./client/components/App.jsx
*/

import { Chip, Grid } from "@material-ui/core";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useUserTypesAdminStoreFacade } from "../../../../Stores/hooks";
import { UserTypeRolesEdit } from "../UserTypeRolesEdit";


export function UserTypeRoles({ userTypeId }) {
    const MappsGroup = React.useMemo(MappsComponents().Layouts.Groups.V1)

    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const { actions } = useDrawerStoreFacade();

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
        setUserTypeId(userTypeId)
    }, [])

    React.useEffect(() => {
        if (!!getUserTypeByIdReducer) {
            setUserType({ ...getUserTypeByIdReducer })
        }
    }, [getUserTypeByIdReducer])

    function edit() {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <UserTypeRolesEdit userTypeId={userType.id}></UserTypeRolesEdit>
            </Grid>
            , "right");
    }

    try {


        return userType && <Grid container style={{ display: 'flex' }}>
            <MappsGroup title="Assigned Roles">
                {
                    userType.usertype_roles.map(role => <Chip
                        key={role.id}
                        data-key={role.id}
                        label={
                            role.roles.role_detail.name.trim()
                        }
                    ></Chip>)
                }
            </MappsGroup>
            <Grid style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                <ButtonLoader
                    color={"primary"}
                    onClick={edit}
                    value={translate(getLabel, "Edit Roles")}
                    variant={"outlined"}
                >
                </ButtonLoader>
            </Grid>
        </Grid>
    } catch (er) {
        console.log(er)
        return <></>
    }
}

