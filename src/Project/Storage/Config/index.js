import { FilePreview } from "../Components/FilePreview"


export const toVerifyColumnDefinition = ({ type }) => ({
    //enableSorting:false,
    columns: [
        {
            titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true,
            //  enableColumnFilter: false,
            //  enableSorting:false
        },
        {
            titleToken: "ID", field: "blob_id", isActive: true,
            //    enableColumnFilter: false,
            //    enableSorting:false
        },
        {
            titleToken: "ITEM", field: "item_id", isActive: type == 'ITEMS',
            //    enableColumnFilter: false,
            //    enableSorting:false
        },
        {
            titleToken: "USER", field: "user_id", isActive: type == 'USERS',
            //    enableColumnFilter: false,
            //    enableSorting:false
        },
        {
            titleToken: "CATEGORY", field: "category_id", isActive: type == 'CATEGORIES',
            //    enableColumnFilter: false,
            //    enableSorting:false
        },
        {
            titleToken: "PREVIEW", type: 'component', field: "title", isActive: true,
            enableColumnFilter: false,
            enableSorting: false,
            component: {
                Component: FilePreview,
                params: {
                    size: 'blob_thumbmail_id'
                }
            },


        },

    ],
    enableMultiRowSelection: false, //shows radio buttons instead of checkboxes
    enableRowSelection: true
})

