import { Grid } from "@material-ui/core";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";

import { useLayoutContainerContextFacade, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React from "react";
import { useCategoryAdminStoreFacade } from "../../../Stores/hooks";
import { v4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export function CategoryAdd() {
    const { functions: {
        setTitle,
        setIcon
    } } = useLayoutContainerContextFacade()
    const [category, setCategory] = React.useState({})
    const TranslateComponent = React.useMemo(() => mappsPlugins.byName('mapps-component-translate-component').component, [])
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const { translate, getLabel } = useDictionaryStoreFacade()

    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)
    const BodyLoader = React.useMemo(MappsComponents().BodyLoader)
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate();
    const params = useParams()
    const { selectors: {
        getCategoryLeaf,
        getCategoryLeafIcon
    },
        actions: {
            expandCategoryTreeByCategoryId,
            createCategory
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

    React.useEffect(() => {
        setTitle('Create Category');
    }, [])
    React.useState(() => {
        setCategoryId(params.parentId)

    }, [params])

    function setTranslate(translation) {
        setCategory({
            ...category,
            translation: translation
        })
    }
    function save(event) {
        category.id = v4()
        category.category_child_id = category.id;
        category.translation_id = v4()
        category.translation.id = category.translation_id;
        let newCategory
        if (params.parentId != "undefined") {
            category.category_parent_id = getCategoryLeaf.id;
            newCategory = {
                ...getCategoryLeaf,
                ...category,
                category: '',
                category_children: [],
                CategoryHierarchy: {
                    category_parent_id: getCategoryLeaf.id
                }
            }

        } else {
            newCategory = {
                ...category,
                params: '{}',
                forEvent: 1,
                forSell: 1,
                forThing: 1,
                category_parent_id: null,
                status: params.status,
                category_children: [],
                CategoryHierarchy: {
                    category_parent_id: null
                }
            }
        }
        createCategory(newCategory).then(succ => {
            navigate(`/mapps/categories/categories/edit/${newCategory.id}`)
        });
    }
    return (params.parentId == "undefined" || isCategoryLeafLoaded()) && (
        <Grid container >
            <>
                <MappsSections title={translate(getLabel, "Category Name Translation")}>
                    <TranslateComponent translation={category.translation || {}} setTranslate={setTranslate}></TranslateComponent>
                </MappsSections>

                <ButtonLoader
                    color={"primary"}
                    onClick={save}
                    value={translate(getLabel, "Save")}
                    variant={"outlined"}
                >s
                </ButtonLoader>
            </>
        </Grid >
    );
}

