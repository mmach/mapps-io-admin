import { useLanguageStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React from "react";
import { Item, Menu } from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";
import { useProcessAdminStoreFacade } from "../../../../../Stores/hooks";


export function ProcessChainEdgeContextMenu({ currentEdge }) {
    const { actions: {
        deleteEdge,
        upsertNodeState,
    }
    } = useProcessAdminStoreFacade()
    const { lang } = useLanguageStoreFacade()

    const onDeleteEdge = () => {
        deleteEdge({ id: currentEdge.id });
    };

    const onChangeRoleNodeAccept = () => {
        upsertNodeState({
            ...currentEdge,
            is_accept: true
        });

    };

    const onChangeRoleNodeReject = () => {
        upsertNodeState({
            ...currentEdge,
            is_accept: false
        });

    };

    const onChangeRoleNodeNull = () => {
        upsertNodeState({
            ...currentEdge,
            is_accept: null
        });
    };



    return (
        <Menu id="edge_id" ref={(ref) => (ref = ref)}>
            <Item onClick={onDeleteEdge}>DELETE</Item>

            {currentEdge.is_accept != null && <Item onClick={onChangeRoleNodeNull}>
                CHANGE TO UNDEFINED
            </Item>}
            {currentEdge.is_accept != true && <Item onClick={onChangeRoleNodeAccept}>
                CHANGE TO ACCEPT
            </Item>}
            {currentEdge.is_accept != false && <Item onClick={onChangeRoleNodeReject}>
                CHANGE TO REJECT
            </Item>}
        </Menu>
    );
}

