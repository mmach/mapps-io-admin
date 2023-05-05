
import { Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDialogStoreFacade, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useProcessAdminStoreFacade } from "../../../../../../Stores/hooks";

export function ProcessActionEdit({ processChainActionId }) {

    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const Checkbox = React.useMemo(MappsComponents().FormComponents.Checkbox)

    const { translate, getLabel } = useDictionaryStoreFacade()
    const { actions: {
        closeDialog
    } } = useDialogStoreFacade()
    const [actionType, setActionType] = React.useState('')
    const [actions, setActions] = React.useState()
    const [loading, setLoading] = React.useState(false)

    const {
        selectors: {
            getProcessChainActionReducer
        },
        hooks: {
            setProcessChainActionId
        } } = useProcessAdminStoreFacade()

    const { selectors: {
        actionsSelector
    } } = useConfigStoreFacade()

    React.useEffect(() => {
        setProcessChainActionId(processChainActionId)
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

    function getActionsList() {

        return [{ id: "", value: " " }, ...actionsSelector.filter(i => i.type == actions.action_type)].map((item) => {
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
        if (actions.action_id) {
            setLoading(true)
            upsertAction(actions).then(suc => {
                setLoading(false)
                closeDialog()
            })
        }
    }
    return actions && (<Grid container style={{ width: '600px' }}>
        <MappsSections container style={{ justifyContent: 'center' }} title={"Edit action"}>
            <DropDownList
                label={translate(getLabel, "Select Action Type")}
                valueOptions={getActionsTypeList()}
                onChange={(event) => setActions({
                    ...actions,
                    action_type: event.target.value
                })}
                field="type"
                validation={[]}
                disabled={true}
                value={actions.action_type}
            />
            <DropDownList
                label={translate(getLabel, "Select Action")}
                disabled={!actions.action_type}
                valueOptions={getActionsList()}
                onChange={(event) => setActions({
                    ...actions,
                    action_id: event.target.value,

                })}
                field="type"
                validation={[]}
                value={actions.action_id}
            />
        </MappsSections>
        {actions.action_type == 'VIEW' && <MappsSections container style={{ justifyContent: 'center' }} title={"References Keys/Group"}>
            <TextBox
                label={translate(getLabel, "Sort Ordering")}
                onChange={(event) => setActions({
                    ...actions,
                    sort_order: event.target.value,

                })}
                field="sort_order"
                validation={[]}
                value={actions.sort_order}
            />
            <TextBox
                label={translate(getLabel, "Reference Group Key")}
                onChange={(event) => setActions({
                    ...actions,
                    action_group: event.target.value,

                })}
                field="action_group"
                validation={[]}
                value={actions.action_group}
            />
            <TextBox
                label={translate(getLabel, "Reference Key")}
                onChange={(event) => setActions({
                    ...actions,
                    ref_key: event.target.value,

                })}
                field="ref_key"
                validation={[]}
                value={actions.ref_key}
            />
        </MappsSections>}
        {actions.action_type == 'VIEW' && <MappsSections container style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }} title={"Trigger Flags"}>
            <Checkbox
                label={translate(getLabel, "Show on current")}
                onChange={(event) => setActions({
                    ...actions,
                    show_on_current: event.currentTarget.checked,

                })}
                field="show_on_current"
                validation={[]}
                value={actions.show_on_current}
            />
            <Checkbox
                label={translate(getLabel, "Show on next")}
                onChange={(event) => setActions({
                    ...actions,
                    show_on_next: event.currentTarget.checked,

                })}
                field="show_on_next"
                validation={[]}
                value={actions.show_on_next}
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
    </Grid >
    )
}

