
import MailGlobal from "./Mails/MailGlobal";
import MailsSenderView from "./Mails/MailsSenderView";
import MailsTemplatesView from "./Mails/MailsTemplatesView";
//import * as allStorageAdminPlugins from "./Storage/Components/plugins";
import * as allStoragesAdminPlugins from './Storage/plugins';
import * as allProjectAdminPlugins from './Project/plugins';
import * as allUsersAdminPlugins from './Users/plugins';

export default [
    ...Object.values(allStoragesAdminPlugins),
    ...Object.values(allProjectAdminPlugins),
    ...Object.values(allUsersAdminPlugins),


   
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-mails-globallist",
        component: MailGlobal
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-mails-email-accounts",
        component: MailsSenderView
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-project-mails-templates",
        component: MailsTemplatesView
    }
];
