import { Button, Grid, ListItem, List, ListItemText } from "@material-ui/core";
import { useDictionaryStoreFacade, useLanguageStoreFacade, useConfigStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCategoriesOptionsAdminStoreFacade } from "../../../../../../Stores/hooks";

export function CategoryOptionsRelations({ catOptionId }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const MappsGroups = React.useMemo(MappsComponents().Layouts.Groups.V1)

    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const { selectors: {
        getCategoryOptionsById,
        getAllCategoryOptionsReducer
    },
        hooks: {
            setCategoryOptionId
        }, functions: {
            isLoaded
        } } = useCategoriesOptionsAdminStoreFacade()
    const { selectors: {
        dimensionsSelector
    } } = useConfigStoreFacade();
     const navigate = useNavigate()

    const { lang } = useLanguageStoreFacade();

    const [catOption, setCatOption] = React.useState()
    const [relatedCategoryOptions, setRelatedCategoryOptions] = React.useState([])
    const [linkedCategoryOptions, setLinkedCategoryOptions] = React.useState([])
    const [functionLinkedCategoryOptions, setFunctionLinkedCategoryOptions] = React.useState([])
    const [currentFunctionLinkedCategoryOptions, setCurrentFunctionLinkedCategoryOptions] = React.useState([])

    React.useEffect(() => {
        setCategoryOptionId(catOptionId)
    }, [catOptionId])

    React.useEffect(() => {
        setCatOption(getCategoryOptionsById)
        if (getCategoryOptionsById) {
            findDimRelations(getCategoryOptionsById, getAllCategoryOptionsReducer)
        }
    }, [getCategoryOptionsById])

    function findDimRelations(catOption, catOptionsList) {
        findRelatedCategoryOptionWhichOtherCategiryOptionsUseAsDimRefId(catOption, catOptionsList)
        findLinkedCategoryOptions(catOption, catOptionsList)
        findAllRelatedCategoryOptionsWhichUseThisInFunction(catOption, catOptionsList)
        findRelatedCategoryOptionsWhichThisCateogyryUseInFunction(catOption, catOptionsList)

    }
    function findRelatedCategoryOptionsWhichThisCateogyryUseInFunction(catOption, catOptionsList) {
        const currentFunction = catOption.cat_opt_temp.filter(i => i.func).map(i => ({
            func: i.func,
            dim: i.func.match(/#\$\w*#/g) ? i.func.match(/#\$\w*#/g).map(i => dimensionsSelector.find(dim => dim.name == i.replace('#$', '').replace('#', ''))) : []
        }))
        const functionResulsts = currentFunction.map(func => {
            return {
                func: func.func,
                relation: catOptionsList.filter(i => func.dim.map(i => i.id).includes(i.dim_id) || i.cat_opt_temp.find(cot => func.dim.map(i => i.id).includes(cot.dim_id)))
            }
        })
        setCurrentFunctionLinkedCategoryOptions([...functionResulsts])

    }
    function findAllRelatedCategoryOptionsWhichUseThisInFunction(catOption, catOptionsList) {
        const dim_id = catOption.dim_id
        const dimMain = dimensionsSelector.filter(i => i.id == dim_id).map(i => i.name)
        const dimCategoryOptionsTemplate = dimensionsSelector.filter(i => catOption.cat_opt_temp.map(cot => cot.dim_id).includes(i.id)).filter(i => i).map(i => i.name)

        const dimNames = [...dimMain, ...dimCategoryOptionsTemplate]
        const funcLinkedCategoryOptions = dimNames.map(dim => {
            return {
                name: dim,
                relation: catOptionsList.map(co => {
                    if (co.cat_opt_temp.filter(i => i.func).filter(i =>
                        i.func.includes(`#$${dim}#`)
                    ).length > 0) {
                        return co;
                    }
                }).filter(i => i)
            }
        })

        setFunctionLinkedCategoryOptions([...funcLinkedCategoryOptions])


    }
    function findRelatedCategoryOptionWhichOtherCategiryOptionsUseAsDimRefId(catOption, catOptionsList) {
        const dim_id = catOption.dim_id
        const relatedCategoryOptionsResults = catOptionsList.filter(i => i.cat_opt_temp.find(i => i.dim_ref_id == dim_id && i.dim_ref_id))
        setRelatedCategoryOptions([...relatedCategoryOptionsResults])

    }

    function findLinkedCategoryOptions(catOption, catOptionsList) {
        const allLinkedUsedDimId = catOptionsList.filter(cat => catOption.cat_opt_temp.filter(i => i.dim_ref_id).map(i => i.dim_ref_id).includes(cat.dim_id))
        setLinkedCategoryOptions([...allLinkedUsedDimId])

    }

    function redirectToCategory(event) {
        navigate("/mapps/categories/categories/edit/" + event.currentTarget.dataset.key)
    }
    function redirectToCategoryOption(event) {
        navigate("/mapps/categories/categoriesOptions?catOptionId=" + event.currentTarget.dataset.key)
    }
    if (!(isLoaded(catOptionId) && catOption)) {
        return <></>
    }

    return isLoaded(catOptionId) && catOption && (<>

        <MappsGroups container style={{ flexFlow: 'row', gap: '1rem' }} title="Category Relations by Key" >
            <Grid container spacing={3}>
                <Grid item xs={4} sm={4} >
                    <MappsSections title={translate(getLabel, "Linked Categories")} >
                        <List className="mapps-io-list-link" style={{ width: '100%' }}>
                            {catOption.category_link.map((item, index) => {
                                return (
                                    <Grid className="mapps-io-list-item" key={item.category_id}>
                                        <ListItem
                                            data-key={item.category_id}
                                            button
                                            onClick={redirectToCategory}
                                        >
                                            <ListItemText >
                                                {item.category["category_" + lang]}
                                            </ListItemText>

                                        </ListItem>
                                    </Grid>
                                );
                            })}
                        </List>
                    </MappsSections>
                </Grid>
                <Grid item xs={4} sm={4} >

                    <MappsSections title={translate(getLabel, "This Category Option is linked as Related Dim")}>
                        <List className="mapps-io-list-link" style={{ width: '100%' }}>

                            {relatedCategoryOptions.map((item) => {
                                return (
                                    <Grid className="mapps-io-list-item" key={item.id} >
                                        <ListItem
                                            data-key={item.id}
                                            button
                                            onClick={redirectToCategoryOption}
                                        >
                                            <ListItemText >
                                                {item.name}
                                            </ListItemText>

                                        </ListItem>
                                    </Grid>
                                );
                            })}
                        </List>

                    </MappsSections>
                </Grid>
                <Grid item xs={4} sm={4} >

                    <MappsSections title={translate(getLabel, "This Category Option use other Category Options")} >
                        <List className="mapps-io-list-link" style={{ width: '100%' }}>

                            {linkedCategoryOptions.map((item) => {
                                return (
                                    <Grid className="mapps-io-list-item" key={item.id} >
                                        <ListItem
                                            data-key={item.id}
                                            button
                                            onClick={redirectToCategoryOption}
                                        >
                                            <ListItemText >
                                                {item.name}
                                            </ListItemText>

                                        </ListItem>
                                    </Grid>
                                );
                            })}
                        </List>

                    </MappsSections>
                </Grid>
            </Grid>
        </MappsGroups>
        <MappsGroups container style={{ flexFlow: 'row', gap: '1rem' }} title="This Category Option is used in other category option function">
            <Grid container spacing={3}>

                {functionLinkedCategoryOptions.map(dim => {
                    if (dim.relation.length > 0) {
                        return (
                            <Grid item xs={4} sm={4} >
                                <MappsSections title={translate(getLabel, `[${dim.name}] `)}>
                                    <List className="mapps-io-list-link" style={{ width: '100%' }}>
                                        {dim.relation.map((item) => {
                                            return (
                                                <Grid className="mapps-io-list-item" key={item.id} >
                                                    <ListItem
                                                        data-key={item.id}
                                                        button
                                                        onClick={redirectToCategoryOption}
                                                    >
                                                        <ListItemText >
                                                            {item.name}
                                                        </ListItemText>

                                                    </ListItem>
                                                </Grid>
                                            );
                                        })}
                                    </List>
                                </MappsSections>
                            </Grid>)
                    }
                })}
            </Grid>
        </MappsGroups>
        <MappsGroups container style={{ flexFlow: 'row', gap: '1rem' }} title="Category Options Related by this Category Option Functions">
            <Grid container spacing={3}>
                {currentFunctionLinkedCategoryOptions.map(dim => {
                    if (dim.relation.length > 0) {
                        return (
                            <Grid item xs={4} sm={4} ><MappsSections title={translate(getLabel, `[${dim.func}]`)} >
                                <List className="mapps-io-list-link" style={{ width: '100%' }}>
                                    {dim.relation.map((item) => {
                                        return (
                                            <Grid className="mapps-io-list-item" key={item.id} >
                                                <ListItem
                                                    data-key={item.id}
                                                    button
                                                    onClick={redirectToCategoryOption}
                                                >
                                                    <ListItemText >
                                                        {item.name}
                                                    </ListItemText>

                                                </ListItem>
                                            </Grid>
                                        );
                                    })}
                                </List>
                            </MappsSections>
                            </Grid>)
                    }
                })}
            </Grid>
        </MappsGroups>

    </>
    )
}


