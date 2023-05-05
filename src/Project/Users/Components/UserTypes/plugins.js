
import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';

export const UserTypesAdminPlugin = {
    type: "mapps-admin-route",
    name: "route-mapps-project-user-types",
    component: LazyLoading(
        () => import("./index.js")
    )
}

export const UserTypesDetailsAdminPlugin = {
    type: "user-types-admin-component",
    name: "user-types-admin-details-preview",
    component: LazyLoading(
        () => import("./UserTypeDetails/index.js").then(module=> ({ default: module.UserTypeDetails }))
    )
}

