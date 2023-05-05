import { Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDrawerStoreFacade, useLanguageStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React, { useState } from "react";
import { Item, Menu, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";
import { v4 as uuid } from "uuid";
import { useProcessAdminStoreFacade } from "../../../../../Stores/hooks";
import { ProcessChainEdit } from "../../ProcessChainEdit";


export function ProcessChainContextMenu({ processId, currentProcessChainId }) {
    const [process, setProcess] = useState({ process_chain: [] });
    const { selectors: {
        getProcessReducer
    },
        actions: {
            deleteNode,
            upsertNodeState,
        },
        hooks: {
            setProcessId
        } } = useProcessAdminStoreFacade()
    const { lang } = useLanguageStoreFacade()

    const { selectors: {
        statusesSelector
    } } = useConfigStoreFacade()
    const { actions: {
        openDrawer
    } } = useDrawerStoreFacade()

    React.useEffect(() => {
        setProcessId(processId)
    }, [currentProcessChainId])
    React.useEffect(() => {
        if (getProcessReducer) {
            setProcess(getProcessReducer)
        }
    }, [getProcessReducer])

    /* Define custom graph editing methods here */
    const onDeleteNode = () => {
        deleteNode({ id: currentProcessChainId });

        //  setProcess({
        //      ...process,
        //     process_chain: [...process.process_chain.filter((i) => i.id != currentNode)]
        // });
    };
    const onLinkItems = (id) => {
        const newEdge = {
            id: uuid(),
            process_chain_id: currentProcessChainId,
            next_process_chain_id: id
        };

        upsertNodeState(newEdge);
    };
    const onEditNode = () => {
        const node = process.process_chain.find((i) => i.id == currentProcessChainId);
        openDrawer(
            true,
            <Grid style={{ width: '70vw', display: 'flex' }}>
                <ProcessChainEdit chainModel={node} process_chain_id={currentProcessChainId}></ProcessChainEdit>
            </Grid>,
            'right'
        );
    };


    return (
        <Menu id="menu_id"   >
            <Item onClick={onEditNode}>EDIT</Item>
            <Item onClick={onDeleteNode}>DELETE</Item>
            <Separator />

            <Submenu label="EDGE">
                {process.process_chain &&
                    process.process_chain
                        .filter((i) => {
                            return i.id != currentProcessChainId;
                        })
                        .map((i) => {
                            const status = statusesSelector.find(
                                (st) => st.id == i.status_id
                            );

                            return (
                                <Item
                                    key={uuid()}
                                    data-key={i.id}
                                    onClick={() => {
                                        onLinkItems(i.id);
                                    }}
                                >
                                    {status && status.translation[lang]}:
                                    {i.id.split("-")[0]}
                                </Item>
                            );
                        })}
            </Submenu>
        </Menu>
    );
}

