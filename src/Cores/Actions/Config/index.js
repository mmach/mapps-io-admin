export const actionsColumnDefinition = ({ }) => ({
    columns: [
        { titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true },
        { titleToken: "ACTION", field: "name", isActive: true },
        { titleToken: "ACTIVATED", type: 'checkbox', field: "action", isActive: true },
        { titleToken: "IS PROCESS START", type: 'checkbox', field: "is_process_start", isActive: false },
        { titleToken: "PREDEFINED", type: '!checkbox', field: "project_id", isActive: true },

    ],
    detailPanelPlugin: 'mapps-action-details-preview',
})

export const actionsViewColumnDefinition = ({ }) => ({
    columns: [
        { titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true },
        { titleToken: "ACTION", field: "name", isActive: true },
        { titleToken: "PLUGIN TYPE", field: "pluginType", isActive: true },
        { titleToken: "AS COMPONENT", type: 'checkbox', field: "pluginComponent", isActive: true },
        { titleToken: "AS RENDER", type: 'checkbox', field: "pluginRender", isActive: true },
        { titleToken: "ACTIVATED", type: 'checkbox', field: "actionsProject", isActive: true },
        { titleToken: "PREDEFINED", type: '!checkbox', field: "project_id", isActive: true }

    ],
    detailPanelPlugin: 'mapps-action-details-preview',

})