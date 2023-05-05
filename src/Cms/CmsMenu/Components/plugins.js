import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';

export const CmsElementsAdminPlugins = {

    type: "mapps-admin-route",
    name: "route-mapps-cms-cms-menu",
    component: LazyLoading(
        () => import("./index.js")
    )
}