import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';

export const PrivilegesAdminPlugins = {
    type: "mapps-admin-route",
    name: "route-mapps-actions-privileges",
    component: LazyLoading(() => import("./index.js"))
}
