/*
    ./client/components/App.jsx
*/

import { Chip, Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useUserTypesAdminStoreFacade } from "../../../../Stores/hooks";


export function UserTypeRolesEdit({ userTypeId }) {
    // const MappsSection = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const MappsSection = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const BodyLoader = React.useMemo(MappsComponents().BodyLoader)

    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)

    const {
        selectors: {
            getUserTypeByIdReducer
        },
        actions: {
            grantRole,
            revokeRole
        },
        hooks: {
            setUserTypeId
        } } = useUserTypesAdminStoreFacade()

    const { translate, getLabel } = useDictionaryStoreFacade()

    const [userType, setUserType] = React.useState()
    const [loading, setLoading] = React.useState(false)

    const { selectors: {
        rolesSelector
    } } = useConfigStoreFacade()

    React.useEffect(() => {
        setUserTypeId(userTypeId)
    }, [])

    React.useEffect(() => {
        if (!!getUserTypeByIdReducer) {
            setUserType({ ...getUserTypeByIdReducer })
        }
    }, [getUserTypeByIdReducer])

    function getRoles() {
        const rolesUsedId = userType.usertype_roles.map(i => i.roles.id)
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
            usertype_id: userType.id,
            role_id: event.target.value
        }).then(suc => {
            setLoading(false)
        })

    }


    try {
        return userType && !loading ? <Grid container style={{ display: 'flex' }}>
            <MappsSection title="User Type">
                <TextBox
                    disabled={true}
                    label={translate(getLabel, "Name")}
                    value={userType.name}
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
                    userType.usertype_roles.map((role, index) => <Chip
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

