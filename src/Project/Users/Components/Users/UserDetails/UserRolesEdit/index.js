/*
    ./client/components/App.jsx
*/

import { Chip, Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useUserAdminStoreFacade } from "../../../../Stores/hooks";


export function UserRolesEdit({ userId }) {
    // const MappsSection = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const MappsSection = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const BodyLoader = React.useMemo(MappsComponents().BodyLoader)

    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)

    const {
        selectors: {
            getUserByIdeReducer
        },
        actions: {
            grantRole,
            revokeRole
        },
        hooks: {
            setUserId
        } } = useUserAdminStoreFacade()


    const { translate, getLabel } = useDictionaryStoreFacade()

    const [user, setUser] = React.useState()
    const [loading, setLoading] = React.useState(false)

    const { selectors: {
        rolesSelector
    } } = useConfigStoreFacade()

    React.useEffect(() => {
        setUserId(userId)
    }, [])

    React.useEffect(() => {
        if (!!getUserByIdeReducer) {
            setUser({ ...getUserByIdeReducer })
        }
    }, [getUserByIdeReducer])

    function getRoles() {
        const rolesUsedByUserType = user.user_type ? user.user_type.usertype_roles.map(i => i.roles.id) : []

        const rolesUsedId = [...user.user_roles.map(i => i.roles.id), ...rolesUsedByUserType]
        const roles = rolesSelector.filter(i => !rolesUsedId.includes(i.id));

        return [{ id: "", value: "" }, ...roles].map((item) => {
            return {
                id: item.id,
                value: item.role || item.value
            };
        });
    }

    function revokePrivileges(event) {
        const role_id = event.currentTarget.dataset.key;
        setLoading(true)
        revokeRole({ id: role_id }).then(suc => {
            setLoading(false)
        })
    }

    function grantPrivileges(event) {
        setLoading(true)
        grantRole({
            id: v4(),
            user_id: user.id,
            role_id: event.target.value
        }).then(suc => {
            setLoading(false)
        })

    }


    try {
        return user && !loading ? <Grid container style={{ display: 'flex' }}>
            <MappsSection title="User Type">
                <TextBox
                    disabled={true}
                    label={translate(getLabel, "Name")}
                    value={user.email}
                    field="value"
                    validation={[]}
                />
            </MappsSection>
            <MappsSection title="Roles">
                <DropDownList

                    label={"Select Role"}
                    valueOptions={getRoles()}
                    value={""}
                    onChange={grantPrivileges}
                    field="type"
                    validation={[]}
                />
                {
                    user.user_roles.map((role, index) => <Chip
                        key={role.id}
                        data-key={role.id}
                        onClick={revokePrivileges}
                        label={
                            role.roles.role_detail.name.trim()
                        }
                    ></Chip>)
                }
            </MappsSection>

        </Grid > : <Grid
            style={{
                height: "400px",
                display: "flex",
                width: '100%'
            }}
        >
            <BodyLoader text=" " size="25px" />
        </Grid>
    } catch (er) {
        console.log(er)
        return <></>
    }
}

