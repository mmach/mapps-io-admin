/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { privilegesColumnDefinition } from "../../Config/index.js";
import { useRolesAdminStoreFacade } from "../../Stores/hooks.js";
import { RoleAdd } from "./RoleAdd/index.js";

function Roles(props) {
    const [loading, setLoading] = React.useState(true)
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const { actions } = useDrawerStoreFacade();
    const { translate, getLabel } = useDictionaryStoreFacade()
    const {
        selectors: {
            getAllRolesGlobalReducer,
            getAllRolesReducer
        },
        actions: {
            get,
            getAll,
            upsertRole,
            deleteRole,
        } } = useRolesAdminStoreFacade()

    const rolesData = React.useMemo(() => {
        return getAllRolesGlobalReducer
            .sort((a, b) => {
                return b.name < a.name ? 1 : -1;
            })
            .map((item) => {
                const role = getAllRolesReducer.find((el) => {
                    return el.role_id == item.id;
                });
                return { ...item, roleProject: role };
            })
    }, [getAllRolesGlobalReducer, getAllRolesReducer])

    React.useEffect(() => {
        setLoading(true)
        Promise.all([
            getAll(),
            get()]).then(i => {
                setLoading(false)
            })
    }, [])


    function activateRole(event, rowData) {
        const objId = v4();
        setLoading(true)
        upsertRole({ id: objId, role_id: rowData.id, status: true }).then(succ => {
            setLoading(false)
        })
    }
    function deactivateRole(event, rowData) {
        setLoading(true)
        deleteRole({ id: rowData.roleProject.id }).then(succ => {
            setLoading(false)
        })
    }

    function addRoleGlobal() {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <RoleAdd ></RoleAdd>
            </Grid>
            , "right");
    }
 
    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsContainer title={"Roles"} icon={<LockOpenIcon />} xs={12} sm={12}>
            <MappsTable
                isLoading={loading}
                title="Manage Roles"
                {...privilegesColumnDefinition({})}
                freeActions={[
                    <ButtonLoader
                        key={1}
                        size={"small"}
                        value={translate(getLabel, "Add Role")}
                        variant={"outlined"}
                        onClick={addRoleGlobal}
                        startIcon={<AddIcon></AddIcon>}
                    >
                    </ButtonLoader >,
                ]}
                pageSize={20}
                actions={
                    [
                        
                        rowData => ({
                            icon: TableIcons.Check,
                            label: 'Activate Role',
                            onClick: activateRole,
                            hidden: rowData.roleProject
                        }),
                        rowData => ({
                            icon: TableIcons.Clear,
                            label: 'Deactive Role',
                            onClick: deactivateRole,
                            hidden: !rowData.roleProject
                        })
                    ]}
                data={rolesData}
            />
        </MappsContainer>
    </Grid>
}

export default Roles;
