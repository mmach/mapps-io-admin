import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import InovicesList from './InvoicesList/index'

function Invoices() {
    const MappsContainer = React.useMemo(MappsComponents().Layouts.Containers.V1)
    return (
        <Grid container style={{ justifyContent: 'center' }}>
            <MappsContainer title={"TODOOOO"} icon={<AccountBalanceWalletIcon />} xs={12} sm={12}>
                TODOOOOOOs
                <Grid >
                    Income/Outcome types,<br />
                    Fill auto get incoide or manual invoice flag,<br />
                    Allow to gen manual invoice,<br />
                    Allow edit only manual invoice,<br />
                    link income / outcome invoices,<br />
                    Snapshot for user invoice information values<br />
                    FIX backend to gen invoice based on inputs<br />
                    Socket for invoice status change<br />

                </Grid>
                <Grid>
                    Income - include fees and tax, Outcome - price with tax
                </Grid>
                <Grid>
                    Calculate summary income for all fees
                </Grid>
            </MappsContainer>
            <MappsContainer title={"Invoices"} icon={<AccountBalanceWalletIcon />} xs={12} sm={12}>
                <InovicesList></InovicesList>
            </MappsContainer>
        </Grid>
    );

}
export default Invoices;
