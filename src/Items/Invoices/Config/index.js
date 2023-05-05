import { PreviewInvoiceProcess } from "../Components/InvoicesList/PreviewProcess"


export const invoiceColumnDefinition = ({ }) => ({
    //enableSorting:false,
    columns: [
        {
            titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true,
            //  enableColumnFilter: false,
            //  enableSorting:false
        },
        {
            titleToken: "NUMBER", field: "number_string", isActive: true,
            //    enableColumnFilter: false,
            //    enableSorting:false
        },
        {
            titleToken: "IS AUTOGENERATED", field: "is_auto", isActive: true,
            //    enableColumnFilter: false,
            //    enableSorting:false
        },
        {
            titleToken: "TYPE", field: "type", isActive: true,
            //    enableColumnFilter: false,
            //    enableSorting:false
        },
        {
            titleToken: "PRICe NET", type: 'function', field: "price_net", isActive: true,
            //enableColumnFilter: false,
            render: (rowdate) => {
                return Number(rowdate.price_net).toFixed(2) + " " + rowdate.currency
            }
        },
        {
            titleToken: "PRICE TAX", type: 'function', field: "price_tax",
            isActive: true,
            //enableColumnFilter: false,
            //enableSorting:false,
            render: (rowdate) => {
                return Number(rowdate.price_tax).toFixed(2) + " " + rowdate.currency
            }
        },
        {
            titleToken: "PRICE", type: 'function', field: "price",
            //enableColumnFilter: false,
            //enableSorting:false,
            render: (rowdate) => {
                return Number(rowdate.price).toFixed(2) + " " + rowdate.currency
            }, isActive: true
        },
        {
            titleToken: "TITLE", field: "title", isActive: true,
            //enableColumnFilter: false,
            //enableSorting:false
        },
        {
            titleToken: "PARENT IUA", field: "iua.parent_iua_id", isActive: true,
            //enableColumnFilter: false,
            //enableSorting:false
        },
        {
            titleToken: "DUE DATE", field: "dueDate", isActive: true,
            //enableColumnFilter: false,
            //enableSorting:false
        },
        {
            titleToken: "PROCESS STATUS", type: 'component', field: 'process', isActive: true, component: {
                Component: PreviewInvoiceProcess,
                params: {
                    cmsMode: 'INVOICE_ADMIN_STATUS'
                }
            },

            enableColumnFilter: false,
            enableSorting: false
        },
        {
            titleToken: "PROCESS ACTIONS", type: 'component', field: 'process', isActive: true, component: {
                Component: PreviewInvoiceProcess,
                params: {
                    cmsMode: 'INVOICE_ADMIN_BUTTON'
                }
            },

            enableColumnFilter: false,
            enableSorting: false
        }
    ],
    detailPanelPlugin: 'mapps-invoice-details',


})



export const invoiceItemsColumnsDefinition = ({ }) => ({
    //enableSorting:false,
    columns: [

        {
            titleToken: "TITLE", field: 'title', isActive: true,
            //    enableColumnFilter: false,
            //    enableSorting:false
        },
        {
            titleToken: "AMOUNT", field: "amount",
            isActive: true,
            //enableColumnFilter: false,
            //enableSorting:false,

        },
        {
            titleToken: "PRICE NET", type: 'function', field: "price_net", isActive: true,
            //enableColumnFilter: false,
            render: (rowdate) => {
                return Number(rowdate.price_net).toFixed(2) + " " + rowdate.currency
            }
        },
        {
            titleToken: "TAX", type: 'function', field: "tax",
            isActive: true,
            //enableColumnFilter: false,
            //enableSorting:false,
            render: (rowdate) => {
                return Number(rowdate.tax) + " %"
            }
        },

        {
            titleToken: "PRICE TAX", type: 'function', field: "price_tax",
            isActive: true,
            //enableColumnFilter: false,
            //enableSorting:false,
            render: (rowdate) => {
                return Number(rowdate.price_tax).toFixed(2) + " " + rowdate.currency
            }
        },
        {
            titleToken: "PRICE", type: 'function', field: "price", isActive: true,
            //enableColumnFilter: false,
            render: (rowdate) => {
                return Number(rowdate.price).toFixed(2) + " " + rowdate.currency
            }
        }
    ],
    enablePagination: false

})