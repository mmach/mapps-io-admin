/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useDictionaryStoreFacade, useDrawerStoreFacade, useDialogStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { userTypesColumnDefinition } from "../../Config/index.js";
import { useUserTypesAdminStoreFacade } from "../../Stores/hooks.js";
import { UserTypeUpsert } from "./UserTypeUpsert/index.js";
import { v4 } from "uuid";
import AddIcon from "@material-ui/icons/Add";


function UserTypes(props) {
    const ConfirmationDialog = React.useMemo(MappsComponents().ConfirmationDialog)

    const [loading, setLoading] = React.useState(true)
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const { actions } = useDrawerStoreFacade();
    const dialogStoreFacadeHooks = useDialogStoreFacade()

    const { translate, getLabel } = useDictionaryStoreFacade()

    const {
        selectors: {
            getAllUserTypesReducer
        },
        actions: {
            getUserTypes,
            removeUserType
        } } = useUserTypesAdminStoreFacade()

    React.useEffect(() => {
        setLoading(true)
        Promise.all([
            getUserTypes(),
        ]).then(i => {
            setLoading(false)
        })
    }, [])

    const userTypesData = React.useMemo(() => {
        return getAllUserTypesReducer
            .sort((a, b) => {
                return b.name < a.name ? 1 : -1;
            })

    }, [getAllUserTypesReducer])

    function editUserType(event, rowData) {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <UserTypeUpsert userType={rowData}></UserTypeUpsert>
            </Grid>
            , "right");
    }
    function clickDeleteUserType(event, rowData) {
        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <ConfirmationDialog title="Delete User Type"
                description={`Do you want to delete ${rowData.name} user type?`}
                onConfirm={async () => {
                    dialogStoreFacadeHooks.actions.closeDialog();
                    setLoading(true)
                    await removeUserType(rowData)
                    setLoading(false)
                }}></ConfirmationDialog>

        );
    }
    function createUserType(event) {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <UserTypeUpsert userType={{ id: v4() }}></UserTypeUpsert>
            </Grid>
            , "right");
    }

    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsContainer title={translate(getLabel, "User Types")} icon={<AccountBoxIcon />} xs={12} sm={12}>
            <MappsTable
                isLoading={loading}
                title={translate(getLabel, "Manage User Types")}
                {...userTypesColumnDefinition({})}
                pageSize={20}
                data={userTypesData}
                freeActions={[
                    <ButtonLoader
                        key={1}
                        size={"small"}
                        value={translate(getLabel, "Add User Type")}
                        variant={"outlined"}
                        onClick={createUserType}
                        startIcon={<AddIcon></AddIcon>}
                    >
                    </ButtonLoader >
                ]}
                actions={
                    [
                        rowData => ({
                            icon: TableIcons.Edit,
                            label: 'Edit User Type',
                            onClick: editUserType,
                        }),
                        rowData => ({
                            icon: TableIcons.Delete,
                            label: 'Delete User Type',
                            onClick: clickDeleteUserType,
                        })
                    ]}
            />
        </MappsContainer>
    </Grid>
}

export default UserTypes;
