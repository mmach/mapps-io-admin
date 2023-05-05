
import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';

export const LanguagesAdminPlugin = {
    type: "mapps-admin-route",
    name: "route-mapps-languages-list",
    component: LazyLoading(
        () => import("./index.js")
    )
}