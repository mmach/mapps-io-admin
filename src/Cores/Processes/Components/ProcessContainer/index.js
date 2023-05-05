import { useLayoutContainerContextFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React, { useEffect, useState } from "react";
import "react-contexify/dist/ReactContexify.min.css";
import { validate } from "uuid";
import { useProcessAdminStoreFacade } from "../../Stores/hooks";
import { ProcessViewer } from "./ProcessViewer";
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import TouchAppIcon from '@material-ui/icons/TouchApp';

export function ProcessContainer() {

    const { state: {
    }, functions: {
        setTitle,
        setIcon
    } } = useLayoutContainerContextFacade()

    const processId = React.useMemo(() => new URLSearchParams(location.search).get("processId"), [location.search]);
    const { selectors: {
        getProcessReducer
    },
        actions: {
        },
        hooks: {
            setProcessId
        } } = useProcessAdminStoreFacade()

    useEffect(() => {
        if (validate(processId)) {
            setProcessId(processId)
        }
    }, [processId]);
    useEffect(() => {
        if (getProcessReducer) {
            setTitle(getProcessReducer.token)
            setIcon(<BubbleChartIcon></BubbleChartIcon>)
        }else{
            setTitle('Select Process')
            setIcon(<TouchAppIcon></TouchAppIcon>)

        }
    }, [getProcessReducer])
    

    return processId ? (<ProcessViewer processId={processId}>

    </ProcessViewer>

    ) : <></>
}