export const userTypesColumnDefinition = ({ }) => ({
    columns: [
        { titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true },
        { titleToken: "USER TYPE", field: "name", isActive: true }

    ],
    detailPanelPlugin: 'user-types-admin-details-preview',

})


export const usersColumnDefinition = ({ }) => ({
    columns: [
        { titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true },
        { titleToken: "EMAIL", field: "email", isActive: true },
        { titleToken: "NAME", field: "name", isActive: true },
        { titleToken: "SURNAME", field: "surname", isActive: true },
        { titleToken: "PHONE", field: "phone", isActive: true },
        { titleToken: "NICKNAME", field: "nickname", isActive: true },
        { titleToken: "USER TYPE", field: "user_type.name", isActive: true },

        { titleToken: "BIRTHDATE", field: "birthDate", type: "date", isActive: true },
        { titleToken: "ADMIN", field: "is_admin", type: "checkbox", isActive: true },
        { titleToken: "ROOT", field: "is_root", type: "checkbox", isActive: true },
        { titleToken: "MAIN PROJECT OWNER", field: "is_main", type: "checkbox", isActive: true }
    ],
    detailPanelPlugin: 'user-admin-details-preview',

})
