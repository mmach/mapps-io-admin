/*
    ./client/components/App.jsx
*/

import { Chip, Grid } from "@material-ui/core";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useUserAdminStoreFacade } from "../../../../Stores/hooks";
import { UserRolesEdit } from "../UserRolesEdit";




export function UserRoles({ userId }) {
    const MappsGroup = React.useMemo(MappsComponents().Layouts.Groups.V1)

    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const { actions } = useDrawerStoreFacade();

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
        setUserId(userId)
    }, [])

    React.useEffect(() => {
        if (!!getUserByIdeReducer) {
            setUser({ ...getUserByIdeReducer })
        }
    }, [getUserByIdeReducer])


    function edit() {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <UserRolesEdit userId={userId}></UserRolesEdit>
            </Grid>
            , "right");
    }

    try {


        return user && <Grid container style={{ display: 'flex' }}>
            {user.user_type && <MappsGroup title="Inherited Roles from User Type">
                {
                    user.user_type.usertype_roles.map(role => <Chip
                        key={role.id}
                        data-key={role.id}
                        label={
                            role.roles.role_detail.name.trim()
                        }
                    ></Chip>)
                }
            </MappsGroup>}
            <MappsGroup title="Assigned Roles">
                {
                    user.user_roles.map(role => <Chip
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

