import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';

export const ActionsAdminPlugins = {
    type: "mapps-admin-route",
    name: "route-mapps-actions-action",
    component: LazyLoading(
        () => import("./index.js")
    )
}
export const ActionsDetailsPreviewAdminPlugins = {
    type: "mapps-action-list",
    name: "mapps-action-details-preview",
    component: LazyLoading(
        () => import("./ActionsTable/ActionDetailsPreview/index.js").then(module => ({ default: module.ActionDetailsPreview }))
    )
}
