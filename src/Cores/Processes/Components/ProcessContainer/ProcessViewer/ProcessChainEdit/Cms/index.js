import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import AceEditor from "react-ace";

export function ProcessChainCMS({ chainModel, setProcessChain }) {

    const [processChain, setProcessChainState] = React.useState({ ...chainModel })

    React.useEffect(() => {
        setProcessChain({...processChain})
    }, [processChain])

    return (<Grid container >
        <AceEditor
            key={1}
            mode={"json"}
            theme="monokai"
            value={processChain.params}
            onChange={(code) => {
                setProcessChainState({ ...processChain, params: code });
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
    </Grid>
    )
}


