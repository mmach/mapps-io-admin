import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';

export const DimensionsAdminPlugins = {
    type: "mapps-admin-route",
    name: "route-mapps-project-dimmensions",
    component: LazyLoading(
        () => import("./index.js")
    )
}
/*
export const StatusDetailsPreviewAdminPlugins = {
    type: "mapps-status-list",
    name: "mapps-status-expanded-preview",
    component: LazyLoading(
        () => import("./StatusExpandedRow/index.js").then(module => ({ default: module.StatusExpandRow }))
    )
}*/
