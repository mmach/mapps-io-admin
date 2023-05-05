import { Grid } from "@material-ui/core";
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { toVerifyColumnDefinition } from "../../Config/index.js";

import './style.scss'

export function FilePreview({ blob, row, params = {} }) {
    return (row || blob).id && (
        <img
            className="img-preview-admin"
            src={`${global.env.BLOB_URL}/blob/${(blob || row)[params.size]}`}

        />

    );

}



