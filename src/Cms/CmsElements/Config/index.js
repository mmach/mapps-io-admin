

export const cmsElementColumnDefinition = ({ type }) => ({
    columns: [
        {
            titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true,
        },
        {
            titleToken: "TOKEN", field: "token", isActive: true,
        },
        {
            titleToken: "IS LAZY", field: "load_on_init", isActive: true, type: '!checkbox'
        },
        {
            titleToken: "CMS PARENT", field: "cms_element_id", isActive: true,
        },
        {
            titleToken: "ACTIVATE", field: "is_active", isActive: true, type: 'checkbox'
        },
        {
            titleToken: "IS_PREDEFINED", field: "project_id", isActive: true, type: '!checkbox',
        }


    ]

})

