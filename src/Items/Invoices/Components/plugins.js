import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';
import { InvoiceDetails } from './InvoicesList/InvoiceDetails/index.js';


export const InvoiceAdminPlugins = {
    type: "mapps-admin-route",
    name: "route-mapps-project-items-payments-invoices",
    component: LazyLoading(
        () => import("./index.js")
    )
}

export const InvoiceItemsPreviewPlugins = {
    type: "mapps-inovice-comopnents",
    name: "mapps-invoice-details",
    component: InvoiceDetails
}
