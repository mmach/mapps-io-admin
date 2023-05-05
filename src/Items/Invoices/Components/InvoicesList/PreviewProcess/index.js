import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import { useIuaStoreFacade } from "mapps-io-base-plugins/src/Elements/Iua/Stores/hooks";
import React from "react";
import { useCategoriesStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";


export function PreviewInvoiceProcess({ row, params }) {

    const iuaStoreFacade = useIuaStoreFacade({});
    const categoriesStoreFacade = useCategoriesStoreFacade();

    const PreviewIUA = React.useMemo(MappsComponents().IUA.PREVIEW.DEFAULT);

    try {
        let mainIua = iuaStoreFacade.selectors.iuaReducer.iuaRelations[row.iua.id]
        let iua = iuaStoreFacade.selectors.iuaReducer.iuaList[mainIua]
        if (iua && categoriesStoreFacade.functions.isLoadedByCategoryId(iua.category_id)) {
            return <PreviewIUA
                iua_id={row.iua.id}
                cmsMode={params.cmsMode}
                device='desktop'
                inlineLoader={true}
            />
        } else {
            return <>Loading...</>
        }

    } catch (err) {
        console.log(err)
        return <></>
    }
}
