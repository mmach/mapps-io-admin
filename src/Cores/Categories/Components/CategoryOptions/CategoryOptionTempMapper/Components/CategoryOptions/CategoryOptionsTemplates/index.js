
import {
    Grid, List,
    ListItem, ListItemText
} from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/Stores/hooks";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useCategoriesOptionsAdminStoreFacade } from "../../../../../../Stores/hooks.js";
import { CategoryOptionsTemplateUpsert } from './../../../CategoryOptionsTemplateUpsert/index.js';

export function CategoryOptionsTemplates({ catOptionId, readOnly }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const { selectors: {
        getCategoryOptionsById
    }, hooks: {
        setCategoryOptionId
    }, functions: {
        isLoaded
    },
        actions: {
            upsertCategoryOptionTemplate
        } } = useCategoriesOptionsAdminStoreFacade()
    const { actions } = useDrawerStoreFacade()
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const [categoryOptionTemplateId, setCatOptionTemplateId] = React.useState()
    const [catOption, setCatOption] = React.useState()

    React.useEffect(() => {
        setCategoryOptionId(catOptionId)
    }, [catOptionId])
    React.useEffect(() => {
        setCatOption(getCategoryOptionsById)
    }, [getCategoryOptionsById])

    const CategoryOptionsTemplate = React.useMemo(() => {
        const item = catOption && catOption.cat_opt_temp.find(
            (i) => i.id == categoryOptionTemplateId
        )
        if (categoryOptionTemplateId && item) {
            return <CategoryOptionsTemplateUpsert
                catSingleOption={item}
            ></CategoryOptionsTemplateUpsert>
        } else {
            return <Grid></Grid>
        }
    }, [categoryOptionTemplateId, catOption])
    function openDrawer(event) {
        const item = catOption.cat_opt_temp.find(
            (i) => i.id == event.currentTarget.dataset.key
        )
        if (item) {
            actions.openDrawer(
                true,
                <Grid style={{ width: '50vw', display: 'flex' }}>
                    <CategoryOptionsTemplateUpsert
                        readOnly={true}
                        catSingleOption={item}
                    ></CategoryOptionsTemplateUpsert>
                </Grid>
            );
        }
    }

    function clickCatOptionTemplate(event) {
        if (readOnly) {
            openDrawer(event)
        } else {
            const item = catOption.cat_opt_temp.find(
                (i) => i.id == event.currentTarget.dataset.key
            )
            setCatOptionTemplateId(item.id)
        }
    }

    function createNewCatOptionTemplate(event) {
        if (readOnly) {
            return;
        }
        const newId = v4()
        const catOptionTypeTemplate = catOption.cat_opt.cat_options_type_temp.find(i => i.id == event.currentTarget.dataset.tag)

        const translation_id = v4()
        upsertCategoryOptionTemplate({
            co_id: catOption.id,
            id: newId,
            cott_id: event.currentTarget.dataset.tag,
            order: catOptionTypeTemplate.order,
            status: 1,
            value_translation_id: translation_id,
            value_translation: {
                id: translation_id
            }
        })
        setCatOptionTemplateId(newId)
    }

    function createNewSelect(event) {
        const newId = v4()
        const catOptionTypeTemplate = catOption.cat_opt.cat_options_type_temp[0]
        const translation_id = v4()

        upsertCategoryOptionTemplate({
            co_id: catOption.id,
            id: newId,
            cott_id: catOptionTypeTemplate.id,
            order: -1,
            status: 0,
            value_translation_id: translation_id,
            value_translation: {
                id: translation_id
            }
        })
        setCatOptionTemplateId(newId)
    }

    if (!(isLoaded(catOptionId) && catOption)) {
        return <></>
    }

    return isLoaded(catOptionId) && catOption && (<Grid container style={{ flexFlow: 'row', gap: '1rem' }} >
        <Grid container style={{ flexDirection: 'column' }} sm={readOnly ? 12 : 2} xs={12}>
            {catOption.cat_opt
                && catOption.cat_opt.is_strict
                && <MappsSections title={translate(getLabel, "Category Option Templates Strict")} >
                    <List className="mapps-io-list-link" style={{ width: '100%' }}>
                        {catOption.cat_opt && catOption.cat_opt.is_strict && (
                            catOption.cat_opt.cat_options_type_temp.sort((a, b) => Number(a.order) > Number(b.order) ? 1 : -1).map((item) => {
                                const catOptionsItem = catOption.cat_opt_temp.find(
                                    (i) => i.cott_id == item.id
                                ) || {}

                                return (
                                    <Grid className="mapps-io-list-item" key={item.id}>
                                        <ListItem
                                            data-tag={item.id}
                                            button
                                            data-key={catOptionsItem.id}
                                            onClick={!catOptionsItem.id ? createNewCatOptionTemplate : clickCatOptionTemplate}
                                            className={
                                                !catOptionsItem.id ? 'primary' :
                                                    categoryOptionTemplateId == catOptionsItem.id && 'selected'}>
                                            <ListItemText >
                                                {catOptionsItem.token ||  catOptionsItem.value || item.order}
                                            </ListItemText>

                                        </ListItem>
                                    </Grid>)

                            })
                        )
                        }
                    </List>
                </MappsSections>}

            {catOption.cat_opt
                && !catOption.cat_opt.is_strict
                && <MappsSections title={translate(getLabel, "Category Option Templates Not Strict")} >
                    <><List className="mapps-io-list-link" style={{ width: '100%' }}>
                        {(
                            catOption.cat_opt_temp.filter(i => i.status == 1).sort((a, b) => Number(a.order) > Number(b.order) ? 1 : -1).map((item) => {

                                return (
                                    <Grid className="mapps-io-list-item" key={item.id}>
                                        <ListItem
                                            data-tag={item.cott_id}
                                            button
                                            data-key={item.id}
                                            onClick={!item.id ? createNewCatOptionTemplate : clickCatOptionTemplate}
                                            className={
                                                !item.id ? 'primary' :
                                                    categoryOptionTemplateId == item.id && 'selected'}>
                                            <ListItemText >
                                                {item.token || item.value || item.order}
                                            </ListItemText>

                                        </ListItem>
                                    </Grid>)

                            })
                        )
                        }
                    </List>

                        {!readOnly && <ButtonLoader
                            color={"primary"}
                            onClick={createNewSelect}
                            value={translate(getLabel, "Create new template")}
                            variant={"outlined"}
                        >
                        </ButtonLoader>}
                    </>

                </MappsSections>}
            {
                !readOnly
                && catOption.cat_opt
                && !catOption.cat_opt.is_strict
                && catOption.cat_opt_temp.find(i => i.status == 0)
                && <MappsSections title={translate(getLabel, "Category Option Templates Not Active")} >
                    <>
                        {<List className="mapps-io-list-link" style={{ width: '100%' }}>
                            {(
                                catOption.cat_opt_temp.filter(i => i.status == 0).sort((a, b) => Number(a.order) > Number(b.order) ? 1 : -1).map((item) => {

                                    return (
                                        <Grid className="mapps-io-list-item" key={item.id}>
                                            <ListItem
                                                data-tag={item.cott_id}
                                                button
                                                data-key={item.id}
                                                onClick={!item.id ? createNewCatOptionTemplate : clickCatOptionTemplate}
                                                className={
                                                    !item.id ? 'primary' :
                                                        categoryOptionTemplateId == item.id && 'selected'}>
                                                <ListItemText >
                                                    {item.token  || item.value || item.order}
                                                </ListItemText>

                                            </ListItem>
                                        </Grid>)

                                })
                            )
                            }
                        </List>}


                    </>
                </MappsSections>
            }
        </Grid>
        {
            !readOnly
            && <MappsSections title={translate(getLabel, "Category Option Templates")} sm={10} xs={12}>
                <Grid container spacing={"3"} style={{ flexDirection: 'column' }}>
                    {CategoryOptionsTemplate}
                </Grid>
            </MappsSections>
        }
    </Grid >
    )
}


