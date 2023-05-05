import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import AceEditor from "react-ace";

export function CmsElementEditCMS({ cmsElement, setCmsElement }) {
    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)

    const [_cmsElement, _setCmsElement] = React.useState({ ...cmsElement })
    React.useEffect(() => {
        setCmsElement(_cmsElement)
    }, [_cmsElement])

    return (<Grid container >
        <MappsTabs defaultTab={0} tabConfig={
            [
                {
                    label: 'CMS Json',
                    render: () => (<AceEditor
                        key={1}
                        mode={"json"}
                        theme="monokai"
                        value={_cmsElement.cms}
                        onChange={(code) => {
                            _setCmsElement({ ..._cmsElement, cms: code });
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
                }


            ]
        }>
        </MappsTabs>
    </Grid>
    )
}


