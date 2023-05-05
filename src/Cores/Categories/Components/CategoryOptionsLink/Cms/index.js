import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import AceEditor from "react-ace";

export function CategoryOptionsLinkCms({ categoryOptionLink, setCategoryOptionLink }) {
    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)

    const [catOptionLink, setCatOptionLink] = React.useState({ ...categoryOptionLink })
    React.useEffect(() => {
        setCategoryOptionLink(catOptionLink)
    }, [catOptionLink])
    
    return (<Grid container >
        <MappsTabs defaultTab={0} tabConfig={
            [
                {
                    label: 'Search',
                    render: () => (<AceEditor
                        key={1}
                        mode={"json"}
                        theme="monokai"
                        value={catOptionLink.search_params}
                        onChange={(code) => {
                            setCatOptionLink({ ...catOptionLink, search_params: code });
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
                            value={catOptionLink.create_params}
                            onChange={(code) => {
                                setCatOptionLink({ ...catOptionLink, create_params: code });
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
                            value={catOptionLink.preview_params}
                            onChange={(code) => {
                                setCatOptionLink({ ...catOptionLink, preview_params: code });
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
    </Grid>
    )
}


