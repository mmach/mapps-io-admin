export const processActionsColumnDefinition = ({ }) => ({
    columns: [
        { titleToken: 'ORDER', field: 'sort_order' },
        { titleToken: "ACTION", field: "action_name", isActive: true },
        { titleToken: "TYPE", field: "action_type", isActive: true },
        { titleToken: "GROUP", field: "action_group", isActive: true },
        { titleToken: "REF KEY", field: "ref_key", isActive: true },
        { titleToken: "ON NEXT", type: 'checkbox', field: "show_on_next", isActive: true },
        { titleToken: "ON CURRENT", type: 'checkbox', field: "show_on_current", isActive: true },
        { titleToken: 'USE PRIVS', field: 'privilege', isActive: true },
        { titleToken: "USE PRIV FUNCTION", type: 'checkbox', field: "func", isActive: true }
    ],
    enableGrouping: true,
    detailPanelPlugin: 'mapps-process-action-details-preview',

})

export const processExternalActionsColumnDefinition = ({ }) => ({
    columns: [
        { titleToken: 'ORDER', field: 'sort_order' },
        { titleToken: "PROCESS", field: "process", isActive: true },
        { titleToken: "PROCESS STEP", field: "process_step", isActive: true },
     //   { titleToken: "ON NEXT", type: 'checkbox', field: "show_on_next", isActive: true },
     //   { titleToken: "ON CURRENT", type: 'checkbox', field: "show_on_current", isActive: true },
        { titleToken: 'BEFORE HOOK', type: 'checkbox', field: 'on_before_hook', isActive: true },
        { titleToken: "AFTER HOOK", type: 'checkbox', field: "on_after_hook", isActive: true }
    ],
})

//