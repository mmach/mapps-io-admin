import * as allActionsAdminPlugins from './Actions/plugins';
import * as allCategoryAdminPlugins from './Categories/plugins';
import * as allPrivilegesAdminPlugins from './Roles_Privs/plugins';
import * as allProcessAdminPlugins from './Processes/plugins';
import * as allStatusesAdminPlugins from './Statuses/plugins';
import * as allDimensionsAsminPlugins from './Dimensions/plugins';

export default [
  ...Object.values(allCategoryAdminPlugins),
  ...Object.values(allActionsAdminPlugins),
  ...Object.values(allPrivilegesAdminPlugins),
  ...Object.values(allStatusesAdminPlugins),
  ...Object.values(allProcessAdminPlugins),
  ...Object.values(allDimensionsAsminPlugins),  
];
