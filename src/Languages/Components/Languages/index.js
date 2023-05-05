/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import LanguageIcon from '@mui/icons-material/Language';
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useDialogStoreFacade, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { languageColumnDefinition } from "../../Config/index.js";
import { useLanguageAdminStoreFacade } from "../../Stores/hooks.js";

function Languages() {
    const [loading, setLoading] = React.useState(true)
    const ConfirmationDialog = React.useMemo(MappsComponents().ConfirmationDialog)
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)

    const { translate, getLabel } = useDictionaryStoreFacade()
    const dialogStoreFacadeHooks = useDialogStoreFacade()

    const {
        selectors: {
            getAllLanguagesGlobalReducer,
            getAllLanguagesReducer
        },
        actions: {
            getAllLanguages,
            getLanguages,
            setAsMain,
            insertLanguage,
            deleteLanguage
        },
        functions: {

        }
    } = useLanguageAdminStoreFacade()

    const languageData = React.useMemo(() => {
        return getAllLanguagesGlobalReducer
            .sort((a, b) => {
                return b.name < a.name ? 1 : -1;
            })
            .map((item) => {
                const lang = getAllLanguagesReducer.find((el) => {
                    return el.language_id == item.id;
                });
                return { ...item, languageProject: lang };
            })
    }, [getAllLanguagesReducer, getAllLanguagesGlobalReducer])

    React.useEffect(() => {
        setLoading(true)
        Promise.all([
            getLanguages(),
            getAllLanguages(),
        ]).then(i => {
            setLoading(false)
        })
    }, [])

    function clickSetAsMain(event, rowData) {
        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <ConfirmationDialog title="Set as Main"
                description={`Do you want set ${rowData.name} as main language?`}
                onConfirm={async () => {
                    dialogStoreFacadeHooks.actions.closeDialog();
                    setLoading(true)
                    await setAsMain(rowData)
                    setLoading(false)
                }}></ConfirmationDialog>

        );
    }

    function activateLanguage(event, rowData) {
        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <ConfirmationDialog title="Activate Language"
                description={`Do you want activate ${rowData.name} language?`}
                onConfirm={async () => {
                    dialogStoreFacadeHooks.actions.closeDialog();
                    setLoading(true)
                    await insertLanguage({ id: v4(), language_id: rowData.id, status: true })
                    setLoading(false)
                }}></ConfirmationDialog>

        );
    }
    function deactivateLanguage(event, rowData) {
        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <ConfirmationDialog title="Deactivate Language"
                description={`Do you want deactivate ${rowData.name} language?`}
                onConfirm={async () => {
                    dialogStoreFacadeHooks.actions.closeDialog();
                    setLoading(true)
                    await deleteLanguage({ id: rowData.languageProject.id })
                    setLoading(false)
                }}></ConfirmationDialog>

        );
    }
    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsContainer title={"Languages"} icon={<LanguageIcon />} xs={12} sm={12}>
            <MappsTable

                isLoading={loading}
                title={translate(getLabel, "Manage Languages")}
                {...languageColumnDefinition({})}
                pageSize={20}
                data={languageData}
                actions={
                    [
                        rowData => ({
                            icon: TableIcons.Check,
                            label: 'Set As Main',
                            onClick: clickSetAsMain,
                            hidden: (rowData.languageProject && rowData.languageProject.is_main) || !rowData.languageProject

                        }),
                        rowData => ({
                            icon: TableIcons.Check,
                            label: 'Activate Language',
                            onClick: activateLanguage,
                            hidden: rowData.languageProject
                        }),
                        rowData => ({
                            icon: TableIcons.Clear,
                            label: 'Deactivate Language',
                            onClick: deactivateLanguage,
                            hidden: !rowData.languageProject || (rowData.languageProject && rowData.languageProject.is_main)
                        })
                    ]}
            />
        </MappsContainer>
    </Grid>
}

export default Languages;
