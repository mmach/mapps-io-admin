import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade, useDrawerStoreFacade, useModalStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { useInvoiceAdminStoreFacade } from "../../../Stores/hooks";
import { InvoiceItemsPreview } from "./InvoiceItemsPreview";
import { InvoicePrices } from "./InvoicePrices";
import { InvoiceUserInformation } from "./InvoiceUserInformation";


export function InvoiceDetails(props) {

    const MappsGroup = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const MappsSection = React.useMemo(MappsComponents().Layouts.Sections.V1)

    const inoviceAdminStoreFacade = useInvoiceAdminStoreFacade()
    const { translate, getLabel } = useDictionaryStoreFacade();

    const [invoice, setInvoice] = React.useState()
    React.useEffect(() => {
        inoviceAdminStoreFacade.hooks.setInvoiceId(props.id)
    }, [])

    React.useEffect(() => {
        if (inoviceAdminStoreFacade.selectors.getInvoiceByIdReducer) {
            setInvoice(inoviceAdminStoreFacade.selectors.getInvoiceByIdReducer)
        }
    }, [inoviceAdminStoreFacade.selectors.getInvoiceByIdReducer])
    return invoice && (
        <Grid container style={{ display: 'flex' }}>
            <Grid item xs={6} style={{ display: 'flex' }}>
                <MappsGroup title={translate(getLabel, "Invoice User Information")} >
                    <Grid container style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        <MappsSection xs={6} title={translate(getLabel, "Customer Information")}>
                            <InvoiceUserInformation {...props.user_src} />
                        </MappsSection>
                        <MappsSection xs={6} title={translate(getLabel, "Destination User Information")}>
                            <InvoiceUserInformation {...props.user_dest} />
                        </MappsSection>
                    </Grid>
                </MappsGroup>
            </Grid>
            <Grid item xs={6}>
                <MappsGroup title={translate(getLabel, "Invoice")} >
                    <Grid container style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        <MappsSection xs={6} title={translate(getLabel, "Invoice Detail Informations")}>
                            <InvoicePrices {...invoice} />
                        </MappsSection>
                        <MappsSection xs={6} title={translate(getLabel, "IUA Details")}>
                        </MappsSection>
                    </Grid>
                    <InvoiceItemsPreview {...props} />
                </MappsGroup>
            </Grid>
        </Grid >

    );

}
