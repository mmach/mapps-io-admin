
import { Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDialogStoreFacade, useDictionaryStoreFacade, useLanguageStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useProcessAdminStoreFacade } from "../../../../../../Stores/hooks";

export function ProcessExternalActionCreate({ processChain }) {

    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const { translate, getLabel } = useDictionaryStoreFacade()
    const { actions: {
        closeDialog
    } } = useDialogStoreFacade()

    const [actionModel, setActionModel] = React.useState({
        id: v4(),
        action_type: 'PROCESS',
        action_id: undefined,
        show_on_current: false,
        show_on_next: true,
        process_chain_id: processChain.id,
        process_id: processChain.process_id,
        external_process_id: undefined,
        external_process_chain_id: undefined,
        on_before_hook:false,
        on_after_hook:true,
        action_privileges: []

    })
    const { lang } = useLanguageStoreFacade()

    const [loading, setLoading] = React.useState(false)
    const { selectors: {
        statusesSelector,
        processesSelector
    } } = useConfigStoreFacade()
    const { actions: {
        upsertAction
    } } = useProcessAdminStoreFacade()

    function getActionsList() {
        const process = processesSelector.find(i => i.id == actionModel.external_process_id)
        if (process) {
            return [...process.process_chain.filter(i => i.is_start)].map((item) => {
                const status = statusesSelector.find(status => status.id == item.status_id)
                return {
                    id: item.id,
                    value: `[${item.id.split('-')[0]}] - ` + (status && status.translation[lang]),
                };
            });
        } else {
            return []
        }
    }

    function getProcessList() {

        return ["", ...processesSelector].map((item) => {
            return {
                id: item.id,
                value: item.token
            };
        });
    }

    function save() {
        if (actionModel.external_process_chain_id) {
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
                label={translate(getLabel, "Select External Process")}
                valueOptions={getProcessList()}
                onChange={(event) => {
                    const process = processesSelector.find(i => i.id == event.target.value)
                    const process_chain = process.process_chain.find(i => i.is_start)
                    setActionModel({
                        ...actionModel,
                        external_process_id: event.target.value,
                        external_process_chain_id: process_chain && process_chain.id
                    })
                }}
                field="type"
                validation={[]}
                value={actionModel.external_process_id}
            />
            {actionModel.external_process_id && <DropDownList
                label={translate(getLabel, "Select External Chain Action")}

                valueOptions={getActionsList()}
                onChange={(event) => setActionModel({
                    ...actionModel,
                    external_process_chain_id: event.target.value,

                })}
                field="type"
                validation={[]}
                value={actionModel.external_process_chain_id}
            />}
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

