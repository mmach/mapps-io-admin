import { Grid } from "@material-ui/core";
import { useConfigStoreFacade, useLanguageStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React, { useEffect, useRef, useState } from "react";
import { contextMenu, Item, Menu, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";
import { GraphView } from "react-digraph";
import { v4 as uuid, validate } from "uuid";
import { useProcessAdminStoreFacade } from "../../../Stores/hooks.js";
import { GraphConfig } from "./GraphConfig/index.js";
import { ProcessChainEdgeContextMenu } from "./ProcessContextMenu/EdgeContextMenu/index.js";
import { ProcessChainContextMenu } from "./ProcessContextMenu/NodeContextMenu/index.js";
import './style.css'
//import { ProcessChainContextMenu } from "./ProcessContextMenu/NodeContextMenu/index.js";

const NODE_KEY = "id"; // Allows D3 to correctly update DOM

export function ProcessViewer({ processId }) {
    const [process, setProcess] = useState({ process_chain: [] });
    const [currentNode, setCurrentNode] = useState({});
    const [currentEdge, setCurrentEdge] = useState({});

    const { selectors: {
        statusesSelector,
        actionsSelector
    } } = useConfigStoreFacade()
    const { lang } = useLanguageStoreFacade()
    const { selectors: {
        getProcessReducer,
        processAdminReducer
    },
        actions: {
            upsertNodeNoFetch,
            upsertNode
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
            setProcess({ ...getProcessReducer })
        }
    }, [getProcessReducer])

    const onUpdateNode = (event) => {
        const node = process.process_chain.filter((i) => i.id == event.id)[0];
        if (node.x != event.x || node.y != event.y) {
            node.x = event.x;
            node.y = event.y;
            upsertNodeNoFetch(node);
        }
    };

    const onContextMenu = async (x, y, mouseEvent) => {
        mouseEvent.preventDefault();
        const parent = mouseEvent.srcElement.parentElement.parentElement;
        if (
            parent.getAttribute("data-source") &&
            parent.getAttribute("data-target")
        ) {
            let node = process.process_chain.find(
                (i) => i.id == parent.getAttribute("data-source")
            );
            let edge = node.process_chain_state.find((i) => {
                return i.next_process_chain_id == parent.getAttribute("data-target");
            });
            if (!edge) {
                node = process.process_chain.find(
                    (i) => i.id == mouseEvent.path[2].getAttribute("data-target")
                );
                edge = node.process_chain_state.find((i) => {
                    return (
                        i.next_process_chain_id == parent.getAttribute("data-source")
                    );
                });
            }
            setCurrentEdge(edge);

            contextMenu.show({ id: "edge_id", event: mouseEvent });
        } else if (
            parent.getAttribute("id") &&
            parent.getAttribute("id").replace("node-", "")
        ) {
            setCurrentNode(parent.getAttribute("id").replace("node-", ""));

            contextMenu.show({ id: "menu_id", event: mouseEvent });
        } else {
            const node = {
                id: uuid(),
                process_id: process.id,
                x: x,
                y: y,
                process_chain_state: [],
                is_reminder: false,
                process_chain_actions: []
            };
            upsertNode(node);

           // setProcess({
           //     ...process,
           //     process_chain: [...process.process_chain, node]
           // });
        }

        //mouseEvent.path[2].getAttribute('data-source')
        //mouseEvent.path[2].getAttribute('data-target')
        //mouseEvent.path[2].getAttribute('id').replace('node-','')

        mouseEvent.preventDefault();
    };

    const nodesList = React.useMemo(() => {
        const node = process.process_chain ?
            process.process_chain.map((i) => {
                const status = statusesSelector.find((st) => st.id == i.status_id);

                const action = actionsSelector.find((st) => st.id == i.action_id);
                return {
                    id: i.id,
                    x: i.x,
                    y: i.y,
                    title: (
                        <tspan x="0" dy="1.2em">
                            <tspan x="0" dy="1.2em">
                                {action && action.action}
                            </tspan>
                            <tspan x="0" dy="1.2em">
                                {(i.change_status && status && status.translation[lang])}
                            </tspan>
                            <tspan x="0" dy="1.2em">
                                {i.id.split("-")[0]}
                            </tspan>

                        </tspan>
                    ),
                    type:
                        i.is_start == true
                            ? "start"
                            : i.is_last == true
                                ? "end"
                                : i.is_reminder == true
                                    ? "is_reminder"
                                    : i.change_status == true
                                        ? "empty"
                                        : "func"
                };
            }) : [];
        return node;
    }, [process])

    const edgesList = React.useMemo(() => {
        const edges = [];

        process.process_chain &&
            process.process_chain.forEach((i) => {
                i.process_chain_state.forEach((c) => {
                    let next = process.process_chain.filter((n) => n.id == c.next_process_chain_id)[0];
                    next = next ? next : {};
                    edges.push({
                        id: c.id,
                        source: c.process_chain_id,
                        target: c.next_process_chain_id,
                        type:
                            i.is_reminder == true && next.has_reminder == true
                                ? c.is_accept == true ? "reminderEdgeAccept" :
                                    c.is_accept == false ? "reminderEdgeReject" :
                                        'reminderEdgeEmpty'
                                : i.autorun == true && c.is_accept == true
                                    ? "autoRunEdge"
                                    : c.is_accept == true
                                        ? "acceptEdge"
                                        : c.is_accept == false
                                            ? "rejectEdge" : "emptyEdge",
                        handleText: i.is_reminder == true && next.has_reminder ? i.in_days : ""
                    });
                });
            });
        return edges
    }, [process])
    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;
    return (
        <Grid id="graph" style={{ height: "85vh" }}>
            <ProcessChainContextMenu processId={processId} currentProcessChainId={currentNode}></ProcessChainContextMenu>
            <ProcessChainEdgeContextMenu processId={processId} currentEdge={currentEdge}
            ></ProcessChainEdgeContextMenu>
            {!processAdminReducer.isLoading && <GraphView
                nodeKey={NODE_KEY}
                nodes={nodesList || []}
                selected={{}}
                edges={[...edgesList]}
                nodeTypes={NodeTypes}
                nodeSubtypes={NodeSubtypes}
                edgeTypes={EdgeTypes}
                onContextMenu={onContextMenu}
                onUpdateNode={onUpdateNode}
                allowMultiselect={false}
            />}
        </Grid>
    );
}

