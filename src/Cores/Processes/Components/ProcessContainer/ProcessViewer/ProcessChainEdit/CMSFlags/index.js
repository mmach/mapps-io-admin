import { Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDictionaryStoreFacade, useLanguageStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";
import React from 'react';



export function ProcessChainCmsFlags({ chainModel, setProcessChain }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const { lang } = useLanguageStoreFacade()

    const { selectors: {
        actionsSelector,
        statusesSelector
    } } = useConfigStoreFacade()

    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const Checkbox = React.useMemo(MappsComponents().FormComponents.Checkbox)

    const [processChain, setProcessChainState] = React.useState({ ...chainModel })

    React.useEffect(() => {
        setProcessChain({...processChain})
    }, [processChain])

    function getActionsList() {
        const roles = actionsSelector.filter((item) => {
            if (processChain.is_start == true) {
                return item.is_process_start;
            }
            if (processChain.is_reminder) {
                return item.action.indexOf('cron') > 0;

            }
            return item.type == "PROCESS" || item.as_process == 1;
        }).sort((a, b) => a.action > b.action ? 1 : -1);
        return [{ id: "", value: "" }, ...roles].map((item) => {
            return {
                id: item.id,
                value: item.action ? item.action : item.id
            };
        });
    }
    function getStatusList() {
        const roles = statusesSelector.sort((a, b) => a.translation && b.translation && a.translation[lang] > b.translation[lang] ? 1 : -1);;
        return [{ id: "", value: "" }, ...roles].map((item) => {
            return {
                id: item.id,
                value: item.translation ? item.translation[lang] : item.id
            };
        });
    }
    return (<>
        <MappsSections title={translate(getLabel, "Set Process Chain Main Action")}>
            <DropDownList
                label={"Action"}
                valueOptions={getActionsList()}
                value={processChain.action_id}
                onChange={(event) => {
                    setProcessChainState({ ...processChain, action_id: event.target.value });
                }}
                field="type"
            />
        </MappsSections>
        <MappsSections title={translate(getLabel, "Process DB Persistent Flags")}>
            <Grid item xs="6">
                <Checkbox
                    label={translate(getLabel, "Invoke state only")}
                    value={processChain.invoke_only}
                    onChange={(event) => setProcessChainState({
                        ...processChain,
                        invoke_only: event.target.checked,
                        change_status: event.target.checked ? false : processChain.change_status,
                        is_start: event.target.checked ? false : processChain.is_start,
                        is_last: event.target.checked ? false : processChain.is_last,
                        is_autoclose_state: event.target.checked ? false : processChain.is_autoclose_state
                    })}
                    field="invoke_only"
                />
            </Grid>
            <Grid item xs="6">
                <Checkbox
                    label={translate(getLabel, "Use ElasticSearch, to improve performance")}
                    value={processChain.use_es}
                    onChange={(event) => setProcessChainState({
                        ...processChain,
                        use_es: event.target.checked
                    })}
                    field="use_es"
                />
            </Grid>
        </MappsSections>
        <MappsSections title={translate(getLabel, "Process State Type")}>
            <Grid item xs="3">
                {<Checkbox
                    renderType={"radio"}
                    label={translate(getLabel, "Status")}
                    value={processChain.change_status}
                    disabled={processChain.invoke_only}
                    onChange={(event) => setProcessChainState({
                        ...processChain,
                        change_status: event.target.checked,
                        is_reminder: event.target.checked ? false : processChain.is_reminder,
                        is_condition: event.target.checked ? false : processChain.is_condition,
                    })}
                    field="change_status"
                />}
            </Grid>
            <Grid item xs="3">
                <Checkbox
                    renderType={"radio"}
                    label={translate(getLabel, "Function")}
                    value={!processChain.is_reminder && !processChain.is_condition && !processChain.change_status}
                    onChange={(event) => setProcessChainState({
                        ...processChain,
                        is_reminder: event.target.checked ? false : processChain.is_reminder,
                        is_condition: event.target.checked ? false : processChain.is_condition,
                        change_status: event.target.checked ? false : processChain.change_status,
                        is_autoclose_state: event.target.checked ? false : processChain.is_autoclose_state,
                        is_start: event.target.checked ? false : processChain.is_start,
                        is_last: event.target.checked ? false : processChain.is_last,
                        autorun: event.target.checked ? false : processChain.autorun,
                        has_reminder: event.target.checked ? false : processChain.has_reminder,
                        status_id: event.target.checked ? '' : processChain.status_id,

                    })}
                    field="function"
                />
            </Grid>
            <Grid item xs="3">
                <Checkbox
                    renderType={"radio"}
                    label={translate(getLabel, "Reminder")}
                    value={processChain.is_reminder}
                    onChange={(event) => setProcessChainState({
                        ...processChain,
                        is_reminder: event.target.checked,
                        is_condition: event.target.checked ? false : processChain.is_condition,
                        change_status: event.target.checked ? false : processChain.change_status,
                        is_autoclose_state: event.target.checked ? false : processChain.is_autoclose_state,
                        is_start: event.target.checked ? false : processChain.is_start,
                        is_last: event.target.checked ? false : processChain.is_last,
                        autorun: event.target.checked ? false : processChain.autorun,
                        has_reminder: event.target.checked ? false : processChain.has_reminder,
                        status_id: event.target.checked ? '' : processChain.status_id,
                    })}
                    field="is_reminder"
                />
            </Grid>
            <Grid item xs="3">
                <Checkbox
                    renderType={"radio"}
                    label={translate(getLabel, "Condition")}
                    value={processChain.is_condition}
                    onChange={(event) => setProcessChainState({
                        ...processChain,
                        is_condition: event.target.checked,
                        is_reminder: event.target.checked ? false : processChain.is_reminder,
                        change_status: event.target.checked ? false : processChain.change_status,
                        is_autoclose_state: event.target.checked ? false : processChain.is_autoclose_state,
                        is_start: event.target.checked ? false : processChain.is_start,
                        is_last: event.target.checked ? false : processChain.is_last,
                        status_id: event.target.checked ? '' : processChain.status_id

                    })}
                    field="is_condition"
                />
            </Grid>
        </MappsSections>
        {!processChain.is_reminder && <MappsSections title={translate(getLabel, "Process Trigger Handle Flags")}>
            <Grid item xs="6">
                <Checkbox
                    label={translate(getLabel, "Autorun")}
                    value={processChain.autorun}
                    onChange={(event) => setProcessChainState({
                        ...processChain,
                        autorun: event.target.checked
                    })}
                    field="autorun"
                />
            </Grid>
            <Grid item xs="6">
                <Checkbox
                    label={translate(getLabel, "Has reminder")}
                    value={processChain.has_reminder}
                    onChange={(event) => setProcessChainState({
                        ...processChain,
                        has_reminder: event.target.checked
                    })}
                    field="has_reminder"
                />
            </Grid>
        </MappsSections>}
        {(processChain.change_status) && <MappsSections title={translate(getLabel, "Process State Status Settings")}>
            <Grid item xs="12">
                <DropDownList
                    label={"Status"}
                    valueOptions={getStatusList()}
                    value={processChain.status_id}
                    onChange={(event) => {
                        setProcessChainState({
                            ...processChain, status_id: event.target.value
                        });
                    }}
                    field="type"
                />

            </Grid>
            <Grid item xs="4">
                <Checkbox
                    label={translate(getLabel, "Is start state")}
                    value={processChain.is_start}
                    onChange={(event) => setProcessChainState({
                        ...processChain,
                        is_start: event.target.checked
                    })}
                    field="is_start"
                />
            </Grid>
            <Grid item xs="4">
                <Checkbox
                    label={translate(getLabel, "Is last state")}
                    value={processChain.is_last}
                    onChange={(event) => setProcessChainState({
                        ...processChain,
                        is_last: event.target.checked,
                        is_autoclose_state: event.target.checked ? false : processChain.is_autoclose_state
                    })}
                    field="is_last"
                />
            </Grid>
            <Grid item xs="4">
                {processChain.is_last && <Checkbox
                    label={translate(getLabel, "Auto close state")}
                    value={processChain.is_autoclose_state}
                    onChange={(event) => setProcessChainState({
                        ...processChain,
                        is_autoclose_state: event.target.checked
                    })}
                    field="is_autoclose_state"
                />}

            </Grid>
        </MappsSections>}
        {(processChain.is_reminder) && <MappsSections title={translate(getLabel, "Reminder Settings")}>
            <TextBox
                label={"Start trigger reminder before (x) days or count (x) days"}
                value={processChain.in_days}
                onChange={(event) => {
                    setProcessChainState({
                        ...processChain, in_days: event.target.value
                    });
                }}
            ></TextBox>
            <TextBox
                label={"Reminder Cron"}
                value={processChain.reminder_cron}
                onChange={(event) => {
                    setProcessChainState({
                        ...processChain, reminder_cron: event.target.value
                    });
                }}
            />
        </MappsSections>}


    </>
    )
}


