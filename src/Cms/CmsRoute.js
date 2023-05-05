
import * as allCmsElementsAdminPlugins from './CmsElements/plugins';
import * as allCmsMenuAdminPlugins from './CmsMenu/plugins';

export default [
    ...Object.values(allCmsElementsAdminPlugins),
    ...Object.values(allCmsMenuAdminPlugins)

]
