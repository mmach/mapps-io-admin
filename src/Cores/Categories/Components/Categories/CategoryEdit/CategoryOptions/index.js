import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useDialogStoreFacade, useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useCategoriesOptionsAdminStoreFacade, useCategoryAdminStoreFacade } from "../../../../Stores/hooks";
import CategoryOptionsListByType from "../../../CategoryOptions/CategoryOptionsListByType";
import CategoryOptionTempMapper from "../../../CategoryOptions/CategoryOptionTempMapper";
import { categoryOptionsLinkColumnDefinition } from './../../../../Config/index.js';
import { CategoryOptionLink } from './../../../index.js';

export function CategoryCategoryOptions({ categoryId }) {
    const DialogContent = React.useMemo(() => mappsPlugins.byName("mapps-component-dialog-content").component);
    const DialogActions = React.useMemo(() => mappsPlugins.byName("mapps-component-dialog-actions").component);
    const DialogTitle = React.useMemo(() => mappsPlugins.byName("mapps-component-dialog-title").component);
    const DialogContentText = React.useMemo(() => mappsPlugins.byName("mapps-component-dialog-content-text").component);

    const { translate, getLabel } = useDictionaryStoreFacade()
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const MappsTable = React.useMemo(MappsComponents().Layouts.Table.V2)
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const dialogStoreFacadeHooks = useDialogStoreFacade()
    const { actions } = useDrawerStoreFacade()
    const [loading, setLoading] = React.useState(false)
     const navigate = useNavigate()
    const [category, setCategory] = React.useState()
    const { selectors: {
        getCategoryLeaf,
        getCategoryOptionsByCategoryId
    },
        actions: {
            linkCategoryOptionToCategory,
            deleteCategoryOptionLink
        },
        hooks: {
            setCategoryId
        },
        functions: {
            isCategoryLeafLoaded,
            isLoaded
        }
    } = useCategoryAdminStoreFacade()

    const { selectors: {
        getAllCategoryOptionsReducer
    }, actions: {
        getAllCategoryOptions
    } } = useCategoriesOptionsAdminStoreFacade()

    const catOptionData = React.useMemo(() => {
        return isLoaded() && getCategoryOptionsByCategoryId
            .sort((a, b) => {
                return Number(a.category_link[0].order ? a.category_link[0].order : a.order) >
                    Number(b.category_link[0].order ? b.category_link[0].order : b.order)
                    ? 1
                    : -1;
            })
            .map((item) => {
                let link = item.category_link[0];
                link = link ? link : "";
                return { ...item, link: link, name: item.name };
            })
    }, [getCategoryOptionsByCategoryId])

    React.useEffect(() => {
        if (getAllCategoryOptionsReducer.length == 0) {
            setLoading(true)
            getAllCategoryOptions().then(succ => {
                setLoading(false)
            })
        }
    }, [])
    React.useEffect(() => {
        setCategoryId(categoryId)
    }, [categoryId])

    React.useEffect(() => {
        if (isCategoryLeafLoaded()) {
            setCategory(getCategoryLeaf)
        }
    }, [getCategoryLeaf])

    async function onDeleteRow(_, rowdata) {
        const id = rowdata.id;
        const row = getCategoryOptionsByCategoryId.find((item) => {
            return item.id == id;
        });
        const link = row.category_link.find((item) => {
            return item.category_id == categoryId;
        });

        dialogStoreFacadeHooks.actions.openDialog(
            true,
            <React.Fragment>
                <DialogTitle id="alert-dialog-slide-title" className="mapps-dialog-title">
                    {translate(getLabel, "Unlink Category Options")}
                </DialogTitle>
                <DialogContent className="mapps-dialog-content">
                    <DialogContentText id="alert-dialog-slide-description">
                        {translate(getLabel, "Do you want to unlink this category options")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="mapps-dialog-actions">
                    <ButtonLoader
                        className="mapps-button"
                        onClick={async () => {
                            dialogStoreFacadeHooks.actions.closeDialog();
                            setLoading(true)
                            await deleteCategoryOptionLink({ id: link.id, category_id: categoryId })
                            setLoading(false)
                        }}
                        color="primary"
                        value={translate(getLabel, "YES_LABEL")}
                    >
                    </ButtonLoader>
                    <ButtonLoader
                        className="mapps-button"
                        onClick={() => {
                            dialogStoreFacadeHooks.actions.closeDialog();
                        }}
                        color="primary"
                        value={translate(getLabel, "NO_LABEL")}
                    >
                    </ButtonLoader>
                </DialogActions>
            </React.Fragment>

        );
    }

    function openModal(_, rowdata) {

        const row = getCategoryOptionsByCategoryId.find((item) => {
            return item.id == rowdata.id
        });
        const link = row.category_link.find((item) => {
            return item.category_id == categoryId;
        });
        actions.openDrawer(true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <CategoryOptionLink categoryOptionLink={link} categoryOption={row} />
            </Grid>, "right");
    }

    function openCategoryOption(event) {
        actions.openDrawer(
            true,
            <Grid style={{ width: '50vw', display: 'flex' }}>
                <CategoryOptionTempMapper
                    readOnly={true}
                    categoryOptionId={event.currentTarget.dataset.key}
                ></CategoryOptionTempMapper>
            </Grid>
            , "right");

    }

    function openCategoryOptionsList() {

        actions.openDrawer(
            true,
            <MappsSections title={'Select Category Options'} style={{ flexDirection: 'column' }}>
                <CategoryOptionsListByType
                    selectionMode={true}
                    selectedCategories={catOptionData.map(i => i.id)}
                    onClick={assignCategoryOption}
                ></CategoryOptionsListByType>
            </MappsSections>
            , "right");
    }

    async function assignCategoryOption(event) {
        const co = getAllCategoryOptionsReducer.find((a) => {
            return a.id.toLowerCase() == event.currentTarget.dataset.key.toLowerCase();
        });
        let link = {
            ...co,
            id: v4(),
            co_id: co.id,
            category_id: categoryId
        };
        setLoading(true)
        actions.closeDrawer();
        await linkCategoryOptionToCategory(link)
        setLoading(false)
    }

    if (!category || !isLoaded()) {
        return <Grid></Grid>
    }
    return (<>

        <MappsTable
            title="Manage Category Options Assignment"
            isLoading={loading}
            freeActions={[
                <ButtonLoader
                    key={1}
                    size={"small"}
                    value={translate(getLabel, "Add")}
                    variant={"outlined"}
                    onClick={openCategoryOptionsList}
                    startIcon={<AddIcon></AddIcon>}
                >
                </ButtonLoader >,
            ]}
            actions={
                [
                    rowData => ({
                        icon: TableIcons.Edit,
                        label: 'Edit Link',
                        onClick: openModal,
                        hidden: rowData.link.category_id != category.id
                    }),
                    rowData => ({
                        icon: TableIcons.Delete,
                        label: 'Delete Link',
                        onClick: onDeleteRow,
                        hidden: rowData.link.category_id != category.id
                    }),
                    rowData => ({
                        icon: TableIcons.ViewColumn,
                        label: 'Go to parent',
                        onClick: (event) => navigate(`/mapps/categories/categories/edit/${rowData.link.category_id}`),
                        hidden: rowData.link.category_id == category.id
                    })
                ]}
            pageSize={20}
            {...categoryOptionsLinkColumnDefinition({ openCategoryOption })}
            data={catOptionData}
        />
    </>

    )
}


