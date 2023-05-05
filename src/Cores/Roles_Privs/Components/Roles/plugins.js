import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';

export const RolesAdminPlugins = {
    type: "mapps-admin-route",
    name: "route-mapps-actions-roles",
    component: LazyLoading(() => import("./index.js"))
}
