import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';

export const CategoryOptionsAdminPlugin = {
    type: "mapps-admin-route",
    name: "route-mapps-actions-catopt",
    component: LazyLoading(
        () => import("./index.js").then(module => ({ default: module.CategoryOptions }))
    )
}
export const CategoryOptionsPreviewAdminPlugin = {
    type: "mapps-admin-category-option",
    name: "mapps-category-option-preview",
    component: LazyLoading(
        () => import("./CategoryOptionTempMapper/index")
    )
}