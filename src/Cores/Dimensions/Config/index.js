import Chip from "@material-ui/core/Chip"



export const statusColumnDefinition = ({ openCategoryOption }) => ({
    columns: [
        { titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true },
        { titleToken: "DIMENSION NAME", field: "name", isActive: true },
        { titleToken: "CATEGORY TYPE NAME", field: "coType.name", isActive: true },
        {
            titleToken: "CATEGORY OPTION", type: 'function', field: "categoryOptions", isActive: true,
            render: (rowdate) => {
                return rowdate.categoryOptions.map(i => <Chip onClick={openCategoryOption}
                    key={i.id}
                    data-key={i.id}
                    label={
                        `${i.id.split('-')[0]} - ${i.translation && i.translation.name}`
                    }></Chip>)
            },
            enableSorting: false,
            enableColumnFilter: false,
            enableGrouping: false
        },

        //  { titleToken: "CATEGORY OPTION ID", field: "categoryOptions.id", isActive: false },
        { titleToken: "CATEGORY TYPE", field: "coType.type", isActive: true },
        { titleToken: "CATEGORY TYPE ITEM", field: "coTypeItem.show", isActive: true },
        { titleToken: "AS CAT REF", type: 'checkbox', field: "as_cat_ref", isActive: true },

        { titleToken: "ACTIVATED", type: 'checkbox', field: "dimensionProject", isActive: true },
        { titleToken: "PREDEFINED", type: '!checkbox', field: "project_id", isActive: true },

    ],
    enableGrouping: true,
})
