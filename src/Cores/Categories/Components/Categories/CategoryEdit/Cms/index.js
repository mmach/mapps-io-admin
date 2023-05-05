import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import AceEditor from "react-ace";
import { useCategoryAdminStoreFacade } from "../../../../Stores/hooks";

export function CategoryCms({ categoryId }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)
    const [category, setCategory] = React.useState()
    const { selectors: {
        getCategoryLeaf
    },
        actions: {
            expandCategoryTreeByCategoryId,
            editCategory
        },

        hooks: {
            setCategoryId
        },
        functions: {
            isCategoryLeafLoaded
        }
    } = useCategoryAdminStoreFacade()




    React.useEffect(() => {
        setCategoryId(categoryId)
    }, [categoryId])
    React.useEffect(() => {
        if (isCategoryLeafLoaded()) {
            setCategory(getCategoryLeaf)
        }
    }, [getCategoryLeaf])

    function save(event) {
        editCategory(category);
    }
    if (!category) {
        return <Grid></Grid>
    }
    return category && (<Grid container >
        <MappsTabs defaultTab={0} tabConfig={
            [
                {
                    label: 'Search',
                    render: () => (<AceEditor
                        key={1}
                        mode={"json"}
                        theme="monokai"
                        value={category.cms_search}
                        onChange={(code) => {
                            setCategory({ ...category, cms_search: code });
                        }}
                        padding={10}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 12,

                            width: "100%",
                            height: "80vh"
                        }}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2
                        }}
                    />)
                },
                {
                    label: 'Create',
                    render: () => <>
                        <AceEditor
                            key={2}
                            mode={"json"}
                            theme="monokai"
                            value={category.cms_create}
                            onChange={(code) => {
                                setCategory({ ...category, cms_create: code });
                            }}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 12,

                                width: "100%",
                                height: "80vh"
                            }}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2
                            }}
                        />
                    </>
                },
                {
                    label: 'Preview',
                    render: () => <>
                        <AceEditor
                            key={3}
                            mode={"json"}
                            theme="monokai"
                            value={category.cms_preview}
                            onChange={(code) => {
                                setCategory({ ...category, cms_preview: code });
                            }}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 12,

                                width: "100%",
                                height: "80vh"
                            }}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2
                            }}
                        /></>
                },

            ]
        }>
        </MappsTabs>
        <ButtonLoader
            color={"primary"}
            onClick={save}
            value={translate(getLabel, "Save")}
            variant={"outlined"}
        >
        </ButtonLoader>
    </Grid>
    )
}


