export const statusColumnDefinition = ({ }) => ({
    columns: [
        { titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true },
        { titleToken: "STATUS", field: "token", isActive: true },
        { titleToken: "ACTIVATED", type: 'checkbox', field: "statusProject", isActive: true },
        { titleToken: "PREDEFINED", type: '!checkbox', field: "project_id", isActive: true },
    ],
    detailPanelPlugin: 'mapps-status-expanded-preview'
})
