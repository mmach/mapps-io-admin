
import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';

export const UsersAdminPlugin = {
    type: "mapps-admin-route",
    name: "route-mapps-project-users-list",
    component: LazyLoading(
        () => import("./index.js")
    )
}


export const UserDetailsAdminPlugin = {
    type: "user-admin-component",
    name: "user-admin-details-preview",
    component: LazyLoading(
        () => import("./UserDetails/index.js").then(module=> ({ default: module.UserDetails }))
    )
}
