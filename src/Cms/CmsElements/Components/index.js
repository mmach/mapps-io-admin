/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExtensionIcon from '@mui/icons-material/Extension';
import { useDialogStoreFacade, useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { cmsElementColumnDefinition } from "../Config";
import { useCmsElementsAdminStoreFacade } from "../Stores/hooks";
import { CmsElementEdit } from "./CmsElementEdit";
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { v4 } from "uuid";

function CmsElements() {
    const ConfirmationDialog = React.useMemo(MappsComponents().ConfirmationDialog)

    const [loading, setLoading] = React.useState(true)
    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)

    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const { actions } = useDrawerStoreFacade();
    const dialogStoreFacadeHooks = useDialogStoreFacade()

    const { translate, getLabel } = useDictionaryStoreFacade()
    const {
        selectors: {
            cmsElementsAdminReducer
        },
        actions: {
            getCmsElementAdmin,
            upsertProjectCmsElement,
            deleteProjectCmsElement,
            deleteCmsElement
        } } = useCmsElementsAdminStoreFacade()

    React.useEffect(() => {
        setLoading(true)
        Promise.all([
            getCmsElementAdmin()
        ]).then(i => {
            setLoading(false)
        })
    }, [])

    function addCmsElement() {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <CmsElementEdit ></CmsElementEdit>
            </Grid>
            , "right");
    }
    function editCmsElement(event, rowData) {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <CmsElementEdit cmsElementId={rowData.id} ></CmsElementEdit>
            </Grid>
            , "right");
    }
    function duplicateCmsElement(event, rowData) {
        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <ConfirmationDialog title="Duplicate CMS Element"
                description={`Do you want to duplicate ${rowData.token} element?`}
                onConfirm={async () => {
                    dialogStoreFacadeHooks.actions.closeDialog();
                    setLoading(true)
                    await upsertProjectCmsElement({
                        ...rowData,
                        id: v4(),
                        token: rowData.token + '- COPY',
                        cms_element_id: rowData.cms_element_id || rowData.id
                    })
                    setLoading(false)
                }}></ConfirmationDialog>

        );
    }
    function clickDeleteCmsElement(event, rowData) {
        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <ConfirmationDialog title="Delete CMS Element"
                description={`Do you want to delete ${rowData.token} element?`}
                onConfirm={async () => {
                    dialogStoreFacadeHooks.actions.closeDialog();
                    setLoading(true)
                    await deleteProjectCmsElement(rowData)
                    setLoading(false)
                }}></ConfirmationDialog>

        );
    }

    return <Grid container style={{ justifyContent: 'center' }}>
        <MappsContainer title={"CMS Elements"} icon={<ExtensionIcon />} xs={12} sm={12}>
            <MappsTable
                freeActions={[
                    <ButtonLoader
                        key={1}
                        size={"small"}
                        value={translate(getLabel, "Create CMS Element")}
                        variant={"outlined"}
                        onClick={addCmsElement}
                        startIcon={<AddIcon></AddIcon>}
                    >
                    </ButtonLoader >,
                ]}
                isLoading={loading}
                title="Manage CMS Elements"

                pageSize={20}
                {...cmsElementColumnDefinition({})}
                data={cmsElementsAdminReducer.cms || []}
                actions={
                    [
                        rowData => ({
                            icon: TableIcons.Edit,
                            label: 'Edit CMS Element',
                            onClick: editCmsElement,
                            hidden: !rowData.project_id
                        }),
                        rowData => ({
                            icon: TableIcons.Delete,
                            label: 'Delete CMS Element',
                            onClick: clickDeleteCmsElement,
                            hidden: !rowData.project_id
                        }),
                        rowData => ({
                            icon: TableIcons.Save,
                            label: 'Duplicate CMS Element',
                            onClick: duplicateCmsElement,
                        })
                        //   rowData => ({
                        //       icon: TableIcons.Add,
                        //       label: 'Set as Global CMS Element',
                        //       onClick: editCmsElement,
                        //       hidden: !rowData.project_id
                        //   })
                    ]}
            ></MappsTable>
        </MappsContainer>
    </Grid>
}

export default CmsElements;
