export const languageColumnDefinition = ({ }) => ({
    columns: [
        { titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true },
        { titleToken: "NAME", field: "name", isActive: true },
        { titleToken: "CODE", field: "code", isActive: true },
        { titleToken: "IS MAIN", field: "languageProject.is_main",type: 'checkbox', isActive: true },
        { titleToken: "IS ACTIVE", field: "languageProject",type: 'checkbox', isActive: true }

    ]
})


export const dictionaryColumnDefinition = ({ }) => ({
    columns: [
        { titleToken: "CREATED AT", field: "createdAt", type: "date", isActive: true },
        { titleToken: "TYPE", field: "type", isActive: true },
        { titleToken: "TOKEN", field: "message.token", isActive: true },
        { titleToken: "NAME", field: "message.name", isActive: true },

    ],
    detailPanelPlugin: 'mapps-dictionary-expanded-preview',

})
