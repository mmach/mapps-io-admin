export const privilegesColumnDefinition = ({ }) => ({
    columns: [
        { titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true },
        { titleToken: "ROLE", field: "name", isActive: true },
        { titleToken: "ACTIVATED", type: 'checkbox', field: "roleProject", isActive: true },
        { titleToken: "PREDEFINED", type: '!checkbox', field: "project_id", isActive: true },

    ],

})
