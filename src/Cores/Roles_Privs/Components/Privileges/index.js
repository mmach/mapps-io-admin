/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useDictionaryStoreFacade, useDrawerStoreFacade ,useDialogStoreFacade} from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { privilegesColumnDefinition } from "../../Config/index.js";
import { usePrivilegesAdminStoreFacade } from "../../Stores/hooks.js";
import { v4 } from "uuid";
import AddIcon from "@material-ui/icons/Add";
import { PrivilegeAdd } from "./PrivilegesAdd/index.js";

function Privileges(props) {
    const [loading, setLoading] = React.useState(true)
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const ConfirmationDialog = React.useMemo(MappsComponents().ConfirmationDialog)

    const { actions } = useDrawerStoreFacade();
    const dialogStoreFacadeHooks = useDialogStoreFacade()
    const { translate, getLabel } = useDictionaryStoreFacade()
    const {
        selectors: {
            getAllPrivilegesGlobalReducer,
            getAllPrivilegesReducer
        },
        actions: {
            get,
            getAll,
            upsertPriv,
            deletePriv,
            deletePrivGlobal
        } } = usePrivilegesAdminStoreFacade()

    const privilegesData = React.useMemo(() => {
        return getAllPrivilegesGlobalReducer
            .sort((a, b) => {
                return b.name < a.name ? 1 : -1;
            })
            .map((item) => {
                const priv = getAllPrivilegesReducer.find((el) => {
                    return el.privilege_id == item.id;
                });
                return { ...item, privilegesProject: priv };
            })
    }, [getAllPrivilegesGlobalReducer, getAllPrivilegesReducer])

    React.useEffect(() => {
        setLoading(true)
        Promise.all([
            getAll(),
            get()]).then(i => {
                setLoading(false)
            })
    }, [])

    function editPrivilegeGlobal() {

    }

    function activatePrivilege(event, rowData) {
        const objId = v4();
        setLoading(true)
        upsertPriv({ id: objId, privilege_id: rowData.id, status: true }).then(succ => {
            setLoading(false)
        })
    }
    function deactivatePrivilege(event, rowData) {
        setLoading(true)
        deletePriv({ id: rowData.privilegesProject.id }).then(succ => {
            setLoading(false)
        })
    }

    function addPrivilegeGlobal() {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <PrivilegeAdd ></PrivilegeAdd>
            </Grid>
            , "right");
    }
    function clickDeletePrivilegeGlobal(event, rowData) {
        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <ConfirmationDialog title="Delete Privilege"
                description="Do you want to delete this privilege?"
                onConfirm={async () => {
                    dialogStoreFacadeHooks.actions.closeDialog();
                    setLoading(true)
                    await deletePrivGlobal(rowData)
                    setLoading(false)
                }}></ConfirmationDialog>

        );
    }
    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsContainer title={"Privileges"} icon={<LockOpenIcon />} xs={12} sm={12}>
            <MappsTable
                isLoading={loading}
                title="Manage Privileges"
                {...privilegesColumnDefinition({})}
                freeActions={[
                    <ButtonLoader
                        key={1}
                        size={"small"}
                        value={translate(getLabel, "Add Privilege")}
                        variant={"outlined"}
                        onClick={addPrivilegeGlobal}
                        startIcon={<AddIcon></AddIcon>}
                    >
                    </ButtonLoader >,
                ]}
                pageSize={20}
                actions={
                    [
                       
                        rowData => ({
                            icon: TableIcons.Check,
                            label: 'Activate Privilege',
                            onClick: activatePrivilege,
                            hidden: rowData.privilegesProject
                        }),
                        rowData => ({
                            icon: TableIcons.Clear,
                            label: 'Deactive Privilege',
                            onClick: deactivatePrivilege,
                            hidden: !rowData.privilegesProject
                        }),
                        rowData => ({
                            icon: TableIcons.Delete,
                            label: 'Delete Privilege',
                            onClick: clickDeletePrivilegeGlobal,
                            hidden: !rowData.project_id || rowData.privilegesProject

                        }),
                    ]}
                data={privilegesData}
            />
        </MappsContainer>
    </Grid>
}

export default Privileges;
