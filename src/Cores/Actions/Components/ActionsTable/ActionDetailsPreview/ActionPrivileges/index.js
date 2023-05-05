/*
    ./client/components/App.jsx
*/

import { Chip, Grid } from "@material-ui/core";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useActionsAdminStoreFacade } from '../../../../Stores/hooks.js';
import { ActionPrivilegesEdit } from './../ActionPrivilegesEdit/index.js';

const operator = ["!", "|", "&", "="];

export function ActionPrivileges(props) {
    const MappsGroup = React.useMemo(MappsComponents().Layouts.Groups.V1)

    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const TagComponent = React.useMemo(MappsComponents().FormComponents.TagComponent)
    const { actions } = useDrawerStoreFacade();

    const { translate, getLabel } = useDictionaryStoreFacade()

    const {
        selectors: {
            getActionByIdReducer
        },
        hooks: {
            setActionId
        } } = useActionsAdminStoreFacade()
    const [action, setActions] = React.useState(props.actionsProject)

    React.useEffect(() => {
        setActionId(props.actionsProject.id)
    }, [])

    React.useEffect(() => {
        if (!!getActionByIdReducer) {
            setActions({ ...getActionByIdReducer })
        }
    }, [getActionByIdReducer])

    function edit() {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <ActionPrivilegesEdit actionId={action.id}></ActionPrivilegesEdit>
            </Grid>
            , "right");
    }

    try {


        return action && <Grid container style={{ display: 'flex' }}>
            <MappsGroup title="Allowed Privileges">
                {

                    action.action_privileges.map(priv => <Chip
                        key={priv.id}
                        data-key={priv.id}
                        label={
                            priv.privileges.privilege_details.name.trim()
                        }
                    ></Chip>)
                }
            </MappsGroup>
            <MappsGroup title="Function" style={{ display: 'flex', width: '100%' }}>
                <TagComponent
                    notUniq={true}
                    disabled={true}
                    tags={
                        action.func
                            ? action.func
                                .split(" ")
                                .map((i) => {
                                    return {
                                        id: v4(),
                                        value: v4(),
                                        label: i
                                    };
                                })
                            : []
                    }
                    noLabel={true}

                    suggestions={[
                        ...operator.map((i) => {
                            return {
                                value: i,
                                label: i,
                                type: "OPERATOR"
                            };
                        }),
                        ,
                        ...action.action_privileges.map((i) => {
                            return {
                                id: v4(),
                                value: v4(),
                                label: `#$${i.privileges.privilege_details.name.trim()}#`,
                                type: "PRIV"
                            };
                        })
                    ]}
                ></TagComponent>
            </MappsGroup>
            <Grid style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                <ButtonLoader
                    color={"primary"}
                    onClick={edit}
                    value={translate(getLabel, "Edit Privileges")}
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

