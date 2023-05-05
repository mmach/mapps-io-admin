/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useActionsAdminStoreFacade } from './../Stores/hooks.js';
import { ActionsViewTable } from './ActionsTable/ActionsViewTable/index.js';
import { ActionsTable } from './ActionsTable/index.js';

function Actions(props) {

    const [loading, setLoading] = React.useState(true)
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)

    const { translate, getLabel } = useDictionaryStoreFacade()

    const {

        actions: {
            getAllActions,
            getActions
        } } = useActionsAdminStoreFacade()

    React.useEffect(() => {
        setLoading(true)
        Promise.all([
            getAllActions(),
            getActions()]).then(i => {
                setLoading(false)
            })
    }, [])



    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsContainer title={"Actions"} icon={<FlashOnIcon />} xs={12} sm={12}>
            <MappsTabs defaultTab={0} tabConfig={
                [
                    {
                        label: translate(getLabel, 'View Actions'),
                        render: () => <ActionsViewTable key={1} actionType={'VIEW'}></ActionsViewTable>
                    },
                    {
                        label: translate(getLabel, 'Process Actions'),
                        render: () => <ActionsTable key={2} actionType={'PROCESS'}></ActionsTable>
                    },
                    {
                        label: translate(getLabel, 'Command Actions'),
                        render: () => <ActionsTable key={3} actionType={'COMMAND'}></ActionsTable>
                    },
                    {
                        label: translate(getLabel, 'Query Actions'),
                        render: () => <ActionsTable key={4} actionType={'QUERY'}></ActionsTable>
                    },

                ]
            }>
            </MappsTabs>
        </MappsContainer>
    </Grid>
}

export default Actions;
