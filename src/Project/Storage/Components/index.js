/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { StorageImage } from "./Storage/index.js";
import { VerifyImage } from "./VerifyImages/index.js";

function Storages() {

    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)

    const { translate, getLabel } = useDictionaryStoreFacade()

    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsContainer title={"TODOOOO"} xs={12} sm={12}>
            TODOOOOOOs
            <Grid >
                Edit File,<br />
                Save TAG/LABEL for file,<br />
                Save extension,<br />
                Insted of image show icon if pdf<br />
                FLAG - AUTO GENERATED
            </Grid>

        </MappsContainer>
        <MappsContainer title={"Storage"} icon={<PermMediaIcon />} xs={12} sm={12}>
            <MappsTabs defaultTab={0} tabConfig={
                [
                    {
                        label: translate(getLabel, 'To Verify'),
                        render: () => <VerifyImage key={1}></VerifyImage>
                    },
                    {
                        label: translate(getLabel, 'Categories'),
                        render: () => <StorageImage type={"CATEGORIES"} key={2}></StorageImage>
                    },
                    {
                        label: translate(getLabel, 'Users'),
                        render: () => <StorageImage type={"USERS"} key={3}></StorageImage>
                    },
                    {
                        label: translate(getLabel, 'Items'),
                        render: () => <StorageImage type={"ITEMS"} key={4}></StorageImage>
                    },
                    {
                        label: translate(getLabel, 'Project'),
                        render: () => <StorageImage type={"PROJECT"} key={5}></StorageImage>
                    },

                ]
            }>
            </MappsTabs>
        </MappsContainer>
    </Grid>
}

export default Storages;
