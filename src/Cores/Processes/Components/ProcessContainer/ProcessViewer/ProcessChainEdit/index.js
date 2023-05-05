import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";
import React from "react";
import { useProcessAdminStoreFacade } from "../../../../Stores/hooks";
import { ProcessChainActions } from "./Actions";
import { ProcessChainCMS } from "./Cms";
import { ProcessChainCmsFlags } from './CMSFlags/index.js'
import { ProcessChainExternalActions } from "./ExternalActions";

export const ProcessChainEdit = ({ process_chain_id, readOnly }) => {
    const [processChain, setProcessChain] = React.useState()
    const [loading, setLoading] = React.useState(true)


    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const BodyLoader = React.useMemo(MappsComponents().BodyLoader)

    const { translate, getLabel } = useDictionaryStoreFacade()

    const { selectors: {
        getProcessChainReducer
    }, actions: {
        upsertNode
    },
        hooks: {
            setProcessChainId
        }
    } = useProcessAdminStoreFacade()
    
    React.useEffect(() => {
        setProcessChainId(process_chain_id)
    }, [process_chain_id])

    React.useEffect(() => {
        if (getProcessChainReducer) {
            setProcessChain(getProcessChainReducer)
            setLoading(false)
        }
    }, [getProcessChainReducer])

    function save() {
        upsertNode(processChain);
    }

    if (!readOnly && loading && !processChain) {
        return (<Grid
            style={{
                height: "400px",
                display: "flex"
            }}
        >
            <BodyLoader text=" " size="25px" />
        </Grid>)
    }

    return (<Grid container >
        <MappsTabs defaultTab={0} memoRefresh={[processChain]} tabConfig={
            [
                {
                    label: 'Core',
                    render: () => <><ProcessChainCmsFlags chainModel={processChain} setProcessChain={setProcessChain}></ProcessChainCmsFlags>
                        {!readOnly && <ButtonLoader
                            color={"primary"}
                            onClick={save}
                            value={translate(getLabel, "Save")}
                            variant={"outlined"}
                        >
                        </ButtonLoader>}
                    </>
                },
                {
                    label: 'CMS',
                    render: () => <>
                        <ProcessChainCMS chainModel={processChain} setProcessChain={setProcessChain}></ProcessChainCMS>
                        {!readOnly && <ButtonLoader
                            color={"primary"}
                            onClick={save}
                            value={translate(getLabel, "Save")}
                            variant={"outlined"}
                        >
                        </ButtonLoader>}
                    </>
                },
                {
                    label: 'Actions',
                    render: () => <>
                        <ProcessChainActions chainModel={processChain} setProcessChain={setProcessChain}></ProcessChainActions>
                    </>
                },
                {
                    label: 'External Process',
                    render: () => <>
                        <ProcessChainExternalActions chainModel={processChain} setProcessChain={setProcessChain}></ProcessChainExternalActions>
                    </>
                },
            ]
        }>
        </MappsTabs >

    </Grid >
    )
}
