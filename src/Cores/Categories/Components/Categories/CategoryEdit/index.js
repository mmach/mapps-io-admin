import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";

import { useLayoutContainerContextFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React from "react";
import { useCategoryAdminStoreFacade } from "../../../Stores/hooks";
import { CategoryCms } from "./Cms/index.js";
import { CategoryCmsParams } from './CmsParams/index.js';
import { CategoryProcess } from './Process/index.js';
import { CategoryTranslation } from './Translation/index.js';
import { CategoryCategoryOptions } from './CategoryOptions/index.js'
import { useParams } from "react-router-dom";

export function CategoryEdit() {
    const { functions: {
        setTitle,
        setIcon
    } } = useLayoutContainerContextFacade()

    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)
    const BodyLoader = React.useMemo(MappsComponents().BodyLoader)
    const [loading, setLoading] = React.useState(false)
    const params = useParams()
    const { selectors: {
        getCategoryLeaf,
        getCategoryLeafIcon
    },
        actions: {
            expandCategoryTreeByCategoryId
        },

        hooks: {
            setCategoryId
        },
        state: {
            categoryId
        },
        functions: {
            isCategoryLeafLoaded
        }
    } = useCategoryAdminStoreFacade()


    React.useEffect(() => {
        setTitle('Category');
    }, [getCategoryLeafIcon])

    React.useEffect(() => {
        if (params.id) {
            setLoading(true)
            setCategoryId(params.id)
        }
    }, [params])


    React.useEffect(() => {
        setLoading(true)
        if (isCategoryLeafLoaded()) {
            setTitle(getCategoryLeaf.category)
            expandCategoryTreeByCategoryId(categoryId)
            setLoading(false)
            setIcon(<img
                src={
                    getCategoryLeafIcon
                }
            />
            )
        }
    }, [getCategoryLeaf])

    if (loading || !isCategoryLeafLoaded()) {
        return (<Grid
            style={{
                height: "400px",
                display: "flex"
            }}
        >
            <BodyLoader text=" " size="25px" />
        </Grid>)
    }

    return !loading && isCategoryLeafLoaded() && (
        <Grid container >
            <Grid container spacing={3}>
                <Grid item xs={8}>

                </Grid>
                <Grid itemxs={3}>

                </Grid>

            </Grid>
            <MappsTabs defaultTab={0} tabConfig={
                [
                    {
                        label: 'Category Options',
                        render: () => <CategoryCategoryOptions categoryId={categoryId}></CategoryCategoryOptions>,
                    },
                    {
                        label: 'Process',
                        render: () => <CategoryProcess categoryId={categoryId}></CategoryProcess>,
                    },
                    {
                        label: 'Translation',
                        render: () => <CategoryTranslation categoryId={categoryId}></CategoryTranslation>,
                    },
                    {
                        label: 'CMS',
                        render: () => <CategoryCms categoryId={categoryId}></CategoryCms>,
                    },
                    {
                        label: 'CMS Params',
                        render: () => <CategoryCmsParams categoryId={categoryId}></CategoryCmsParams>,
                    }
                ]
            }>
            </MappsTabs>


        </Grid >
    );
}

