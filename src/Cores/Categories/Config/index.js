export const categoryOptionsLinkColumnDefinition = ({ openCategoryOption }) => ({
    columns: [
        { titleToken: "#", field: "link.order", type: "numeric", isActive: true },
        { titleToken: "SEARCH#", field: "link.order_search", type: "numeric", isActive: true },
        { titleToken: "CATEGORY_OPTION_NAME_TBL_HEADER", type: 'button', onClick: openCategoryOption, isActive: true, field: "name" },
        { titleToken: "CATEGORY_OPTION_TYPE_TBL_HEADER", type: 'text', field: "cat_opt.name", isActive: true },
        { titleToken: "CATEGORY_OPTION_REQUIRE_TBL_HEADER", type: 'checkbox', field: "is_required", isActive: true },
        { titleToken: "CATEGORY_OPTION_SEARCHABLE_TBL_HEADER", type: 'checkbox', field: "link.is_searchable", isActive: true },
        { titleToken: "CATEGORY_OPTION_IS_ON_MAP_TBL_HEADER", type: 'checkbox', field: "link.is_on_map", isActive: true },
        { titleToken: "CATEGORY_OPTION_IS_ON_TOOLTIP_TBL_HEADER", type: 'checkbox', field: "link.is_on_pin_map", isActive: true },
        { titleToken: "CATEGORY_OPTION_FORM_HIDDEN_TBL_HEADER", type: 'checkbox', field: "link.is_form_hidden" },
        { titleToken: "CATEGORY_OPTION_ABOVE_TBL_HEADER", type: 'checkbox', field: "link.can_above_pin", isActive: true },
        { titleToken: "CATEGORY_OPTION_IS_IUA_HEADER", type: 'checkbox', field: "link.is_on_iua" },
        { titleToken: "CATEGORY_OPTION_IS_IUA_REQ_HEADER", type: 'checkbox', field: "link.is_on_iua_request" },
        { titleToken: "CATEGORY_OPTION_IS_PARAM_HEADER", type: 'checkbox', field: "link.is_params" },
        { titleToken: "CATEGORY_OPTION_IS_VISIBLE_HEADER", type: 'checkbox', field: "link.is_visible_view" },
        { titleToken: "CATEGORY_OPTION_IS_ON_MAIN_PAGE_HEADER", type: 'checkbox', field: "link.is_on_main_page " },
        { titleToken: "FORM RENDERED", field: "link.is_form_rendered", type: 'checkbox' },
        { titleToken: "CATEGORY_OPTION_LIMIT_TBL_HEADER", field: "link.limit_of", type: "numeric" }
    ],
//detailPanelPlugin: 'mapps-component-layout-groups',
    /*detailsContainerPlugins: [
        {
            size: 8,
            style: { display: 'flex' },
            grid: [{
                mappsNamePlugin: "mapps-component-layout-groups", size: 12,
                style: { display: 'flex' }
            }],
        },
        {
            size: 4,
            style: { display: 'flex' },
            grid: [
                {
                    mappsNamePlugin: "mapps-component-layout-groups",
                    size: 12,
                    style: { display: 'flex' }
                }
            ],

        }]*/
})