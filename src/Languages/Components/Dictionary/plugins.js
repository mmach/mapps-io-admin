
import { LazyLoading } from 'mapps-io-base-plugins/src/Common/index.js';
import { DictionaryExpandRow } from './DictionaryExpandRow/index.js';

export const DictionaryAdminPlugin = {
    type: "mapps-admin-route",
    name: "route-mapps-languages-dictionaries",
    component: LazyLoading(
        () => import("./index.js")
    )
}

export const DictionaryExpandedRowPreviewAdminPlugins = {
    type: "mapps-dictionary-list",
    name: "mapps-dictionary-expanded-preview",
    component: DictionaryExpandRow
}
