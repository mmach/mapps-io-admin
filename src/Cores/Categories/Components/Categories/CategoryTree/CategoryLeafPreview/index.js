/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryAdminStoreFacade } from "../../../../Stores/hooks";

export function CategoryLeafPreview({ node }) {
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const { selectors: {
        getCategoryLeafIcon,
        getCategoryLeaf
    },
        hooks: {
            setCategoryId
        },
        functions: {
            isCategoryLeafLoaded
        }
    } = useCategoryAdminStoreFacade(false)

     const navigate = useNavigate()

    React.useEffect(() => {
        setCategoryId(node.category_child_id)
    }, [])

    return <>
        {!isCategoryLeafLoaded() && <ButtonLoader
            key={node.category_child_id}
            className={node.isActive == true ? 'selected' : ''}
            variant={'clean'}
            size="small"
            onClick={() => {
                navigate(`/mapps/categories/categories/edit/${node.category_child_id}`)
            }}
            value={String(node.category).toUpperCase()}
            startIcon={<Grid style={{
                maxWidth: 20,
                maxHeight: 20,
                width: 20
            }}></Grid>}
        >
        </ButtonLoader>}
        {isCategoryLeafLoaded() && <ButtonLoader
            key={getCategoryLeaf.id}
            className={node.isActive == true ? 'selected' : ''}
            variant={'clean'}
            size="small"
            onClick={() => {
                navigate(`/mapps/categories/categories/edit/${getCategoryLeaf.id}`)
            }}
            value={String(getCategoryLeaf.translation.name).toUpperCase()}
            startIcon={isCategoryLeafLoaded() ? <img
                key={getCategoryLeaf.category_child_id}
                style={{
                    maxWidth: 20,
                    maxHeight: 20,
                    width: 20
                }}
                src={
                    getCategoryLeafIcon
                }
            /> : <Grid style={{
                maxWidth: 20,
                maxHeight: 20,
                width: 20
            }}></Grid>}
        >
        </ButtonLoader>}
    </>;

}



