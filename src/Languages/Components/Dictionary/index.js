/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TranslateIcon from '@mui/icons-material/Translate';
import { useDialogStoreFacade, useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { dictionaryColumnDefinition } from "../../Config/index.js";
import { useDictionaryAdminStoreFacade } from "../../Stores/DictionaryAdminStore/hook";
import { DictionaryUpsert } from "./DictionaryUpsert/index.js";
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";

function Dictionary() {
    const [loading, setLoading] = React.useState(true)
    const ConfirmationDialog = React.useMemo(MappsComponents().ConfirmationDialog)
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)
    const Checkbox = React.useMemo(MappsComponents().FormComponents.Checkbox)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const { actions } = useDrawerStoreFacade();

    const { translate, getLabel } = useDictionaryStoreFacade()
    const dialogStoreFacadeHooks = useDialogStoreFacade()

    const [fitleredType, setFilterType] = React.useState([])
    const {
        selectors: {
            getAllDictionaryReducer
        },
        actions: {
            getDictionary,
            removeDictionary
        },
        functions: {
            getTypeDictionaries
        } } = useDictionaryAdminStoreFacade()

    const dictionaryData = React.useMemo(() => {
        return getAllDictionaryReducer.filter(i => {
            return fitleredType.includes(i.type)
        })
            .sort((a, b) => {
                return b.code < a.code ? 1 : -1;
            })

    }, [getAllDictionaryReducer, fitleredType])

    React.useEffect(() => {
        setLoading(true)
        Promise.all([
            getDictionary()
        ]).then(i => {
            setFilterType(Object.keys(getTypeDictionaries()))
            setLoading(false)
        })
    }, [])

    function onFilterChange(event) {
        const value = event.currentTarget.name
        if (fitleredType.includes(value)) {
            setFilterType([...fitleredType.filter(i => i != value)]);

        } else {
            setFilterType([...fitleredType, value]);
        }
    }

    function addDictionary() {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <DictionaryUpsert ></DictionaryUpsert>
            </Grid>
            , "right");
    }

    function upsertDictionary(event, rowData) {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <DictionaryUpsert translation={{ ...rowData.message, status: rowData.status }} ></DictionaryUpsert>
            </Grid>
            , "right");
    }

    function clickDeleteDictionary(event, rowData) {
        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <ConfirmationDialog title="Delete Word"
                description={`Do you want to delete ${rowData.code} word?`}
                onConfirm={async () => {
                    dialogStoreFacadeHooks.actions.closeDialog();
                    setLoading(true)
                    await removeDictionary(rowData)
                    setLoading(false)
                }}></ConfirmationDialog>

        );
    }

    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsContainer title={"Dictionary"} icon={<TranslateIcon />} xs={12} sm={12}>
            <MappsTable
                freeActions={[
                    <Grid container >
                        <Grid item xs={2} style={{
                            display: 'flex',
                            alignSelf: 'center'
                        }}>
                            <ButtonLoader
                                key={1}
                                size={"small"}
                                value={translate(getLabel, "Add Word")}
                                variant={"outlined"}
                                onClick={addDictionary}
                                startIcon={<AddIcon></AddIcon>}
                            >
                            </ButtonLoader >
                        </Grid>
                        <Grid container item xs={10} style={{ flexWrap: 'nowrap' }}>
                            {Object.entries(getTypeDictionaries()).map(i => {
                                return <Checkbox
                                    key={i[0]}
                                    dataKey={i[0]}
                                    label={`${translate(getLabel, i[0])}`}
                                    value={fitleredType.includes(i[0])}
                                    onChange={onFilterChange}
                                    field={i[0]}
                                    validation={[]}
                                />
                            })}
                        </Grid>
                    </Grid>
                ]}
                actions={
                    [

                        rowData => ({
                            icon: TableIcons.Edit,
                            label: 'Edit',
                            onClick: upsertDictionary,
                        }),
                        rowData => ({
                            icon: TableIcons.Delete,
                            label: 'Delete',
                            onClick: clickDeleteDictionary,
                        })
                    ]}
                isLoading={loading}
                title={translate(getLabel, "Manage Dictionary")}
                {...dictionaryColumnDefinition({})}
                pageSize={20}
                data={dictionaryData}
            />
        </MappsContainer>
    </Grid>
}

export default Dictionary;
