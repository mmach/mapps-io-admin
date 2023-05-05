import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';
import {ProcessActionPrivileges} from './ProcessContainer/ProcessViewer/ProcessChainEdit/Actions/ProcessActionPrivileges/index'
export const ProcessAdminRoutePlugin = {
    type: "mapps-admin-route",
    name: "route-mapps-actions-process",
    component: LazyLoading(
        () => import("./index.js").then(module => ({ default: module.Process }))
    )
}
export const ProcessActionDetailsPreviewAdminPlugins = {
    type: "mapps-process-list",
    name: "mapps-process-action-details-preview",
    component: ProcessActionPrivileges
}
