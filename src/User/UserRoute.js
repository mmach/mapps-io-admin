/* eslint-disable react/display-name */
import { LazyLoading } from "mapps-io-base-plugins/src/Common/index.js";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";

export default [
    {
        type: "mapps-admin-route",
        name: "route-mapps-user-login",
        component: LazyLoading(
            () => import("./Components/SignIn/index.js").then(module => ({ default: module.UserSignIn }))
        )
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-user-logout",
        component: LazyLoading(
            () => import("./Components/SignOut/index.js").then(module => ({ default: module.UserLogOut }))
        )
    }
];