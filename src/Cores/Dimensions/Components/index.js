/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useCategoriesOptionsAdminStoreFacade } from "../../Categories/Stores/hooks.js";
import { statusColumnDefinition } from "../Config/index.js";
import { useDimensionAdminStoreFacade } from './../Stores/hooks.js';
import { DimensionGlobalAdd } from "./DimensionGlobalAdd/index.js";
//import { StatusAdd } from "./StatusAdd/index.js";
//import { StatusProjectUpsert } from './StatusProjectUpsert/index.js';
function Dimensions(props) {

    const [loading, setLoading] = React.useState(true)
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const CategoryOptionTempMapper = React.useMemo(() => mappsPlugins.byName('mapps-category-option-preview').component)

    const { translate, getLabel } = useDictionaryStoreFacade()
    const { actions } = useDrawerStoreFacade();
    const { selectors: {
        getAllCategoryOptionsReducer,
        getCategoryTypes
    }, actions: {
        getAllCategoryOptions
    } } = useCategoriesOptionsAdminStoreFacade()


    const {
        selectors: {
            getAllDimensionsReducer,
            getAllDimensionsGlobalReducer
        },
        actions: {
            upsertDimension,
            get,
            getAll,
            deleteDimension,
            deleteDimensionGlobal

        },
        functions: {
            buildAdminDims
        } } = useDimensionAdminStoreFacade()

    React.useEffect(() => {
        setLoading(true)
        Promise.all([
            get(),
            getAll()]).then(() => {
                setLoading(false)
            })
    }, [])

    React.useEffect(() => {
        if (getAllCategoryOptionsReducer.length == 0) {
            getAllCategoryOptions().then(succ => {
            })
        }
    }, [])

    const dimData = React.useMemo(() => {
        return buildAdminDims({ getAllDimensionsGlobalReducer, getAllDimensionsReducer, getAllCategoryOptionsReducer, getCategoryTypes })
    }, [getAllDimensionsGlobalReducer, getAllDimensionsReducer, getAllCategoryOptionsReducer, getCategoryTypes])

    function activateDimension(event, rowData) {
        const objId = v4();
        setLoading(true)
        upsertDimension({ id: objId, dimension_id: rowData.id, status: true }).then(() => {
            setLoading(false)
        })
    }
    function deactivateDimension(event, rowData) {
        setLoading(true)
        deleteDimension(rowData.dimensionProject).then(() => {
            setLoading(false)
        })
    }
    function clickDeleteDimensionGlobal(event, rowData) {
        setLoading(true)
        deleteDimensionGlobal(rowData).then(() => {
            setLoading(false)
        })
    }

    function addDimensionGlobal() {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <DimensionGlobalAdd></DimensionGlobalAdd>
            </Grid>
            , "right");
    }

    function openCategoryOption(event) {
        const categoryOptionId = event.currentTarget.dataset.key;
        console.log(categoryOptionId)
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <CategoryOptionTempMapper
                    readOnly={true}
                    categoryOptionId={categoryOptionId}
                ></CategoryOptionTempMapper>
            </Grid>
            , "right");

    }
    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsContainer title={"Dimension List"} icon={<FlashOnIcon />} xs={12} sm={12}>
            <MappsTable
                isLoading={loading}
                title="Manage Dimensions"
                {...statusColumnDefinition({ openCategoryOption: openCategoryOption })}
                freeActions={[
                    <ButtonLoader
                        key={1}
                        size={"small"}
                        value={translate(getLabel, "Add Dimension")}
                        variant={"outlined"}
                        onClick={addDimensionGlobal}
                        startIcon={<AddIcon></AddIcon>}
                    >
                    </ButtonLoader >,
                ]}
                pageSize={20}
                actions={
                    [
                        rowData => ({
                            icon: TableIcons.Check,
                            label: 'Activate Dimension',
                            onClick: activateDimension,
                            hidden: rowData.dimensionProject
                        }),
                        rowData => ({
                            icon: TableIcons.Clear,
                            label: 'Deactivate Dimension',
                            onClick: deactivateDimension,
                            hidden: !rowData.dimensionProject
                        }),
                        rowData => ({
                            icon: TableIcons.Delete,
                            label: 'Delete Dimension Global',
                            onClick: clickDeleteDimensionGlobal,
                            hidden: !rowData.project_id || rowData.dimensionProject || rowData.categoryOptions.length > 0
                        })
                    ]}
                data={dimData}
            />
        </MappsContainer>
    </Grid>
}

export default Dimensions;
