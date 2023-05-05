
import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useConfigStoreFacade, useDialogStoreFacade, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { processActionsColumnDefinition } from "../../../../../Config";
import { useProcessAdminStoreFacade } from "../../../../../Stores/hooks";
import { ProcessActionCreate } from './ProcessActionCreate/index.js'
import { ProcessActionEdit } from "./ProcessActionEdit";

export function ProcessChainActions({ chainModel, setProcessChain }) {

    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const dialogStoreFacadeHooks = useDialogStoreFacade()
    const { translate, getLabel } = useDictionaryStoreFacade()
    const ConfirmationDialog = React.useMemo(MappsComponents().ConfirmationDialog)

    const { actions: {
        removeAction
    } } = useProcessAdminStoreFacade()
    const { actions: {
        openDialog
    } } = useDialogStoreFacade()

    const { selectors: {
        actionsSelector,
        privsSelector
    } } = useConfigStoreFacade()
    const actionsData = React.useMemo(() => {
        return chainModel.process_chain_actions.filter(i => i.action_id).map(i => {
            return {
                ...i,
                action_name: actionsSelector.find(action => action.id == i.action_id).action,
                privilege: i.action_privileges.map(actionPriv => {
                    const privs = privsSelector.find(priv => priv.id == actionPriv.privilege_id);

                    return String(privs.privilege).trim()
                }).join(', ')
            }
        })

    }, [chainModel])

    function addAction() {
        openDialog(true, <ProcessActionCreate processChain={chainModel}
        ></ProcessActionCreate>)
    }
    function editAction(event, rawData) {
        openDialog(true, <ProcessActionEdit processChainActionId={rawData.id}
        ></ProcessActionEdit>)
    }
    function deleteAction(event, rowData) {
        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <ConfirmationDialog title="Delete Action"
                description="Do you want to delete this action?"
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

                title="Manage Process Actions"
                freeActions={[
                    <ButtonLoader
                        key={1}
                        size={"small"}
                        value={translate(getLabel, "Add Process Action")}
                        variant={"outlined"}
                        onClick={addAction}
                        startIcon={<AddIcon></AddIcon>}
                    >
                    </ButtonLoader >,
                ]}
                {...processActionsColumnDefinition({})}
                pageSize={20}
                data={actionsData || []}
                actions={
                    [
                        rowData => ({
                            icon: TableIcons.Edit,
                            label: 'Edit Action',
                            onClick: editAction,
                            hidden:rowData.action_type=='MAIN_ACTION'

                        }),
                        rowData => ({
                            icon: TableIcons.Delete,
                            label: 'Delete Action',
                            onClick: deleteAction,
                            hidden:rowData.action_type=='MAIN_ACTION'
                        })

                    ]
                }
            />
        </Grid>
    )
}



