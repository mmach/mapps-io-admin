
import * as coreReducerPlugins from "./Cores/reducers.js";
import * as itemsReducerPlugins from "./Items/reducers.js";
import * as projectReducerPlugins from "./Project/reducers.js";
import * as languagesReducerPlugins from "./Languages/reducers.js";
import * as cmsElementsReducerPlugins from "./Cms/reducers.js";

import MailsListReducer from "./Project/Mails/MailsListGlobal/reducer.js";

const reducers = {
    MailsListReducer,
    ...coreReducerPlugins,
    ...itemsReducerPlugins,
    ...projectReducerPlugins,
    ...languagesReducerPlugins,
    ...cmsElementsReducerPlugins
};

const ReducerArray = Object.keys(reducers).map((i) => {
    return {
        name: "mapps-reducer-" + i,
        type: "mapps-reducers",
        // eslint-disable-next-line react/display-name
        reducerName: i,
        reducer: reducers[i]
    };
});

export default ReducerArray;
