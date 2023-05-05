
import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useConfigStoreFacade, useDialogStoreFacade, useDictionaryStoreFacade, useLanguageStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { processExternalActionsColumnDefinition } from "../../../../../Config";
import { useProcessAdminStoreFacade } from "../../../../../Stores/hooks";
import { ProcessExternalActionCreate } from "./ProcessExternalActionCreate";

export function ProcessChainExternalActions({ chainModel, setProcessChain }) {

    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const dialogStoreFacadeHooks = useDialogStoreFacade()
    const { translate, getLabel } = useDictionaryStoreFacade()
    const ConfirmationDialog = React.useMemo(MappsComponents().ConfirmationDialog)
    const { lang } = useLanguageStoreFacade()

    const { selectors: {
        processesSelector
    }, actions: {
        removeAction
    } } = useProcessAdminStoreFacade()
    const { actions: {
        openDialog
    } } = useDialogStoreFacade()

    const { selectors: {
        statusesSelector
    } } = useConfigStoreFacade()
    const actionsData = React.useMemo(() => {
        return chainModel.process_chain_actions.filter(i => !i.action_id).map(i => {
            const relProc = processesSelector.find(proc => proc.id == i.external_process_id);
            if (relProc) {
                const relProcChain = relProc.process_chain.find(pc => pc.id == i.external_process_chain_id);
                const status = statusesSelector.find((st) => st.id == relProcChain.status_id);
                return {
                    ...i,
                    process: relProc.token,
                    process_step: `[${i.external_process_chain_id.split('-')[0]}] - ` + (status && status.translation[lang]),
                }
            }
        }).filter(i => i)

    }, [chainModel])

    function addAction() {
        openDialog(true, <ProcessExternalActionCreate processChain={chainModel}
        ></ProcessExternalActionCreate>)
    }

    function deleteAction(event, rowData) {
        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <ConfirmationDialog title="Delete Relation To Process"
                description="Do you want to delete relation?"
                onConfirm={async () => {
                    await removeAction({
                        id: rowData.id,
                        process_id: chainModel.process_id
                    })
                    dialogStoreFacadeHooks.actions.closeDialog();
                }}></ConfirmationDialog>

        );
    }
    return (
        <Grid container style={{ justifyContent: 'center' }}>
            <MappsTable
                isLoading={false}

                title="Manage External Process Triggers"
                freeActions={[
                    <ButtonLoader
                        key={1}
                        size={"small"}
                        value={translate(getLabel, "Add External Process")}
                        variant={"outlined"}
                        onClick={addAction}
                        startIcon={<AddIcon></AddIcon>}
                    >
                    </ButtonLoader >,
                ]}
                {...processExternalActionsColumnDefinition({})}
                pageSize={20}
                data={actionsData || []}
                actions={
                    [
                        rowData => ({
                            icon: TableIcons.Delete,
                            label: 'Delete Relation',
                            onClick: deleteAction,
                        })

                    ]
                }
            />
        </Grid>
    )
}



