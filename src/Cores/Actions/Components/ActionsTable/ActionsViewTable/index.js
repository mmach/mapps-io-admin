/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useDictionaryStoreFacade, useDrawerStoreFacade, useDialogStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { actionsViewColumnDefinition } from '../../../Config/index';
import { useActionsAdminStoreFacade } from '../../../Stores/hooks.js';
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { v4 } from "uuid";
import { ActionsAdd } from '../../ActionAdd/index.js'

export function ActionsViewTable({ actionType }) {
    const ConfirmationDialog = React.useMemo(MappsComponents().ConfirmationDialog)

    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const [loading, setLoading] = React.useState(false)
    const { translate, getLabel } = useDictionaryStoreFacade()
    const { actions } = useDrawerStoreFacade();
    const dialogStoreFacadeHooks = useDialogStoreFacade()

    const {
        selectors: {
            getAllActionsGlobalReducer,
            getAllActionsReducer
        },
        actions: {
            upsertAction,
            deleteAction,
            deleteActionGlobal
        } } = useActionsAdminStoreFacade()
    const actionsData = React.useMemo(() => {
        return getAllActionsGlobalReducer.filter(i => i.action_type == actionType)
            .sort((a, b) => {
                return b.name < a.name ? 1 : -1;
            })
            .map((item) => {
                const plugin = mappsPlugins.byName(item.name && item.name.toLowerCase())
                const action = getAllActionsReducer.find((el) => {
                    return el.action_id == item.id;
                });
                return { ...item, actionsProject: action, pluginType: plugin && plugin.type.toUpperCase(), pluginComponent: plugin && !!plugin.component, pluginRender: plugin && !!plugin.render };
            })
    }, [getAllActionsGlobalReducer, actionType, getAllActionsReducer])



    function addActionGlobal() {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <ActionsAdd actionType={actionType}></ActionsAdd>
            </Grid>
            , "right");
    }
    function activateAction(event, rowData) {
        const objId = v4();
        setLoading(true)
        upsertAction({ id: objId, action_id: rowData.id, status: true }).then(succ => {
            setLoading(false)
        })
    }
    function clickDeleteActionGlobal(event, rowData) {
        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <ConfirmationDialog title="Delete Action"
                description="Do you want to delete this action?"
                onConfirm={async () => {
                    dialogStoreFacadeHooks.actions.closeDialog();
                    setLoading(true)
                    await deleteActionGlobal(rowData)
                    setLoading(false)
                }}></ConfirmationDialog>

        );
    }

    function deactivateAction(event, rowData) {
        setLoading(true)
        deleteAction({ id: rowData.actionsProject.id }).then(succ => {
            setLoading(false)
        })
    }
    function editActionGlobal(event, rowData) {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <ActionsAdd actionType={actionType} action={rowData}></ActionsAdd>
            </Grid>
            , "right");
    }

    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsTable
            isLoading={loading}
            title="Manage Actions"
            freeActions={[
                <ButtonLoader
                    key={1}
                    size={"small"}
                    value={translate(getLabel, "Add Action")}
                    variant={"outlined"}
                    onClick={addActionGlobal}
                    startIcon={<AddIcon></AddIcon>}
                >
                </ButtonLoader >,
            ]}
            actions={
                [
                    rowData => ({
                        icon: TableIcons.Edit,
                        label:'Edit Action',
                        onClick: editActionGlobal,
                        hidden: !rowData.project_id

                    }),
                    rowData => ({
                        icon: TableIcons.Check,
                        label:'Activate Action',
                        onClick: activateAction,
                        hidden: rowData.actionsProject
                    }),
                    rowData => ({
                        icon: TableIcons.Clear,
                        label:'Deactive Action',
                        onClick: deactivateAction,
                        hidden: !rowData.actionsProject
                    }),
                    rowData => ({
                        icon: TableIcons.Delete,
                        label:'Delete Action',
                        onClick: clickDeleteActionGlobal,
                        hidden: !rowData.project_id || rowData.actionsProject

                    }),
                ]}
            pageSize={20}
            {...actionsViewColumnDefinition({})}
            data={actionsData || []}
        />
    </Grid>
}

