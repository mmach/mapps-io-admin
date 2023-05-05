import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';

export const StorageAdminPlugins = {

    type: "mapps-admin-route",
    name: "route-mapps-project-projects",
    component: LazyLoading(
        () => import("./index.js")
    )
}