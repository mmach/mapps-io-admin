/*
    ./client/components/App.jsx
*/

import { Chip, Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useProcessAdminStoreFacade } from "../../../../../../Stores/hooks.js";
import { ProcessActionPrivilegesEdit } from "../ProcessActionPrivilegesEdit/index.js";

const operator = ["!", "|", "&", "="];

export function ProcessActionPrivileges(props) {
    const MappsGroup = React.useMemo(MappsComponents().Layouts.Groups.V1)

    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const TagComponent = React.useMemo(MappsComponents().FormComponents.TagComponent)
    const { actions } = useDrawerStoreFacade();

    const { translate, getLabel } = useDictionaryStoreFacade()

    const {
        selectors: {
            getProcessChainActionReducer
        },
        hooks: {
            setProcessChainActionId
        } } = useProcessAdminStoreFacade()
    const {
        selectors: {
            privsSelector
        } } = useConfigStoreFacade()
        
    const [action, setActions] = React.useState(props)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setProcessChainActionId(props.id)
    }, [])

    React.useEffect(() => {
        if (!!getProcessChainActionReducer) {
            setLoading(true)
            setActions({ ...getProcessChainActionReducer })
            setTimeout(i => {
                setLoading(false)
            }, 100)
        }
    }, [getProcessChainActionReducer])

    function edit() {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <ProcessActionPrivilegesEdit processActionId={action.id} actionId={action.action_id}></ProcessActionPrivilegesEdit>
            </Grid>
            , "right");
    }

    try {
        return action && !loading && <Grid container style={{ display: 'flex' }}>
            <MappsGroup title="Allowed Privileges">
                {

                    action.action_privileges.map(priv => <Chip
                        key={priv.id}
                        data-key={priv.id}
                        label={privsSelector.find(i => i.id == priv.privilege_id).privilege.trim()}
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
                        ...action.action_privileges.map((priv) => {
                            return {
                                id: v4(),
                                value: v4(),
                                label: `#$${privsSelector.find(i => i.id == priv.privilege_id).privilege.trim()}#`,// `#$${i.privileges.privilege_details.name.trim()}#`,
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

