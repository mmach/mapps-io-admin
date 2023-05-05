import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import AceEditor from "react-ace";
import { useCategoriesOptionsAdminStoreFacade } from "../../../../../../Stores/hooks";

export function CategoryOptionsCms({ catOptionId }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)

    const { selectors: {
        getCategoryOptionsById
    }, actions: {
        upsertCategoryOptions
    }, hooks: {
        setCategoryOptionId
    }, functions: {
        isLoaded
    } } = useCategoriesOptionsAdminStoreFacade()



    const [catOption, setCatOption] = React.useState()

    React.useEffect(() => {
        setCategoryOptionId(catOptionId)
    }, [catOptionId])
    React.useEffect(() => {
        setCatOption(getCategoryOptionsById)
    }, [getCategoryOptionsById])

    if (!(isLoaded(catOptionId) && catOption)) {
        return <></>
    }

    function save(event) {
        upsertCategoryOptions(catOption);
    }
    return isLoaded(catOptionId) && catOption && (<Grid container >
        <MappsTabs defaultTab={0} tabConfig={
            [
                {
                    label: 'Search',
                    render: () => (<AceEditor
                        key={1}
                        mode={"json"}
                        theme="monokai"
                        value={catOption.search_params}
                        onChange={(code) => {
                            setCatOption({ ...catOption, search_params: code });
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
                            value={catOption.create_params}
                            onChange={(code) => {
                                setCatOption({ ...catOption, create_params: code });
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
                            value={catOption.preview_params}
                            onChange={(code) => {
                                setCatOption({ ...catOption, preview_params: code });
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


