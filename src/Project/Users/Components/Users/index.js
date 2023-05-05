/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { usersColumnDefinition } from "../../Config/index.js";
import { useUserAdminStoreFacade } from "../../Stores/hooks.js";
//import { ActionsViewTable } from './ActionsTable/ActionsViewTable/index.js';
//import { ActionsTable } from './ActionsTable/index.js';
import PersonIcon from '@mui/icons-material/Person';


function Users(props) {

    const [loading, setLoading] = React.useState(true)
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const { translate, getLabel } = useDictionaryStoreFacade()

    const {
        selectors: {
            getAllUsersReducer
        },
        actions: {
            getUsers
        } } = useUserAdminStoreFacade()

    const usersData = React.useMemo(() => {
        return getAllUsersReducer
            .sort((a, b) => {
                return b.name < a.name ? 1 : -1;
            })

    }, [getAllUsersReducer])

    React.useEffect(() => {
        setLoading(true)
        Promise.all([
            getUsers(),
        ]).then(i => {
            setLoading(false)
        })
    }, [])



    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsContainer title={"Users"} icon={<PersonIcon />} xs={12} sm={12}>
        <MappsTable
                isLoading={loading}
                title={translate(getLabel, "Manage User")}
                {...usersColumnDefinition({})}
                pageSize={20}
                data={usersData}  
            />
        </MappsContainer>
    </Grid>
}

export default Users;
