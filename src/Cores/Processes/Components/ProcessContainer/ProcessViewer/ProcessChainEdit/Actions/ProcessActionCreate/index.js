
import { Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDialogStoreFacade, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useProcessAdminStoreFacade } from "../../../../../../Stores/hooks";

export function ProcessActionCreate({ processChain }) {

    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const { translate, getLabel } = useDictionaryStoreFacade()
    const { actions: {
        closeDialog
    } } = useDialogStoreFacade()
    const [actionType, setActionType] = React.useState('')
    const [actionModel, setActionModel] = React.useState({
        id: v4(),
        process_chain_id: processChain.id,
        process_id: processChain.process_id
    })
    const [loading, setLoading] = React.useState(false)
    const { selectors: {
        actionsSelector
    } } = useConfigStoreFacade()
    const { actions: {
        upsertAction
    } } = useProcessAdminStoreFacade()

    function getActionsList() {

        return [{ id: "", value: " " }, ...actionsSelector.filter(i => i.type == actionType)].map((item) => {
            return {
                id: item.id,
                value: item.action
            };
        });
    }

    function getActionsTypeList() {
        const set = {}
        actionsSelector.forEach(i => {
            set[i.type] = i.type;
        })
        return ["", ...Object.values(set)].map((item) => {
            return {
                id: item,
                value: item
            };
        });
    }
    
    function save() {
        if (actionModel.action_id) {
            setLoading(true)
            upsertAction(actionModel).then(suc => {
                setLoading(false)
                closeDialog()
            })
        }
    }
    return (<Grid container style={{ width: '400px' }}>
        <MappsSections container style={{ justifyContent: 'center' }} title={"Add new action"}>
            <DropDownList
                label={translate(getLabel, "Select Action Type")}
                valueOptions={getActionsTypeList()}
                onChange={(event) => setActionType(event.target.value)}
                field="type"
                validation={[]}
                value={actionType}
            />
            <DropDownList
                label={translate(getLabel, "Select Action")}
                disabled={!actionType}
                valueOptions={getActionsList()}
                onChange={(event) => setActionModel({
                    ...actionModel,
                    action_id: event.target.value,
                    action_privileges: [],
                    action_type: actionsSelector.find((a) => a.id == event.target.value).type,
                    show_on_current: false,
                    show_on_next: true,
                })}
                field="type"
                validation={[]}
                value={actionModel.action_id}
            />
        </MappsSections>
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
    </Grid >
    )
}

