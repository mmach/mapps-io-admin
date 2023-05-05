
import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';

export const CategoriesAdminPlugin = {
    type: "mapps-admin-route",
    name: "route-mapps-categories-cat",
    component: LazyLoading(
        () => import("./index.js").then(module => ({ default: module.Categories }))
    )
}