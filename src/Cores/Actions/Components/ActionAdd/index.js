/*
    ./client/components/App.jsx
*/

import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { Grid } from "@material-ui/core";
import { useActionsAdminStoreFacade } from "../../Stores/hooks";
import { v4 } from "uuid";


export function ActionsAdd({ actionType, action = {} }) {
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const TextArea = React.useMemo(MappsComponents().FormComponents.TextArea)
    const Checkbox = React.useMemo(MappsComponents().FormComponents.Checkbox)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const {
        selectors: {
        },
        actions: {
            upsertActionGlobal
        } } = useActionsAdminStoreFacade()

    const { translate, getLabel } = useDictionaryStoreFacade()
    const drawerStoreFacade = useDrawerStoreFacade()
    const [_action, setAction] = React.useState({
        id: v4(),
        ...action,
        action_type: actionType
    })
    const [loading, setLoading] = React.useState(false)
    const actionTypes = ['QUERY', 'COMMAND', 'VIEW', 'PROCESS']


    function getActionTypesList() {
        return ["", ...actionTypes].map((item, index) => {
            return {
                id: item,
                value: item
            };
        });
    }
    function save() {
        setLoading(true)
        upsertActionGlobal({
            ..._action,
            id: _action.id
        }).then(succ => {
            setLoading(false)
            drawerStoreFacade.actions.closeDrawer()
        })
    }
    return (<Grid container>
        <MappsSections title={'Choose Action Type'} style={{ flexDirection: 'column' }}>
            <DropDownList
                disabled={true}
                label={translate(getLabel, "Type")}
                valueOptions={getActionTypesList()}
                value={_action.action_type}
                onChange={(event) => setAction({ ..._action, action_type: event.target.value })}
                field="type"
                validation={[]}
            />
        </MappsSections>
        {_action.action_type && <MappsSections title={'Action Details'} style={{ flexDirection: 'column' }}>
            <TextBox

                label={translate(getLabel, "Name")}
                value={_action.name}
                onChange={(event) => setAction({
                    ..._action,
                    name: actionType == 'VIEW' ? event.target.value.toUpperCase() : event.target.value
                })}
                field="value"
                validation={[]}
            />
            <TextArea
                label={translate(getLabel, "Description")}
                value={_action.description}
                onChange={(event) => setAction({
                    ..._action,
                    description: event.target.value
                })}
                field="value"
                validation={[]}
            />

        </MappsSections>}
        {_action.action_type == 'PROCESS' && <MappsSections title={'Process Details'} style={{ flexDirection: 'column' }}>
            <Checkbox
                label={translate(getLabel, "Is process start")}
                value={_action.is_process_start}
                onChange={(event) => setAction({
                    ..._action,
                    is_process_start: event.target.checked
                })}
                field="is_process_start"
                validation={[]}
            />

        </MappsSections>}
        <Grid style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
            <ButtonLoader
                color={"primary"}
                onClick={save}
                value={translate(getLabel, "Save")}
                variant={"outlined"}
                isLoading={loading}
            >
            </ButtonLoader>
        </Grid>
    </Grid>
    );

}
