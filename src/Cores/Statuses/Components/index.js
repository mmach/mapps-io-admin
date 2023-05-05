/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { statusColumnDefinition } from "../Config/index.js";
import { useStatusAdminStoreFacade } from './../Stores/hooks.js';
import { StatusAdd } from "./StatusAdd/index.js";
import { StatusProjectUpsert } from './StatusProjectUpsert/index.js';

function Status(props) {

    const [loading, setLoading] = React.useState(true)
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const { translate, getLabel } = useDictionaryStoreFacade()
    const { actions } = useDrawerStoreFacade();

    const {
        selectors: {
            getAllStatusesGlobalReducer,
            getAllStatusesReducer
        },
        actions: {
            getStatuses,
            getStatusesProject,
            upsertStatus
        } } = useStatusAdminStoreFacade()

    React.useEffect(() => {
        setLoading(true)
        Promise.all([
            getStatusesProject(),
            getStatuses()]).then(i => {
                setLoading(false)
            })
    }, [])

    const statusData = React.useMemo(() => {
        return getAllStatusesGlobalReducer
            .sort((a, b) => {
                return b.token < a.token ? 1 : -1;
            })
            .map((item) => {
                const role = getAllStatusesReducer.find((el) => {
                    return el.status_id == item.id;
                });
                return { ...item, statusProject: role };
            })
    }, [getAllStatusesGlobalReducer, getAllStatusesReducer])

    function activateStatus(event, rowData) {
        const objId = v4();
        setLoading(true)
        upsertStatus({ id: objId, status_id: rowData.id, status: true }).then(succ => {
            setLoading(false)
        })
    }

    function addStatusGlobal() {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <StatusAdd ></StatusAdd>
            </Grid>
            , "right");
    }


    function upsertStatusProject(event, rowData) {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <StatusProjectUpsert status={rowData} ></StatusProjectUpsert>
            </Grid>
            , "right");
    }

    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsContainer title={"Status List"} icon={<FlashOnIcon />} xs={12} sm={12}>
            <MappsTable
                isLoading={loading}
                title="Manage Statuses"
                {...statusColumnDefinition({})}
                freeActions={[
                    <ButtonLoader
                        key={1}
                        size={"small"}
                        value={translate(getLabel, "Add Status")}
                        variant={"outlined"}
                        onClick={addStatusGlobal}
                        startIcon={<AddIcon></AddIcon>}
                    >
                    </ButtonLoader >,
                ]}
                pageSize={20}
                actions={
                    [
                        rowData => ({
                            icon: TableIcons.Check,
                            label: 'Activate Status',
                            onClick: activateStatus,
                            hidden: rowData.statusProject
                        }),
                        rowData => ({
                            icon: TableIcons.Edit,
                            label: 'Edit Status',
                            onClick: upsertStatusProject,
                            hidden: !rowData.statusProject
                        })
                    ]}
                data={statusData}
            />
        </MappsContainer>
    </Grid>
}

export default Status;
