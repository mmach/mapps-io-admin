import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";

import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React from "react";
import { CmsElementEditDetails } from "./CmsElementEditDetails";
import { TextBox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { CmsElementEditCMS } from "./Cms";
import { useCmsElementsAdminStoreFacade } from "../../Stores/hooks";
import { v4 } from "uuid";


export function CmsElementEdit({ cmsElementId }) {
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const MappsGroups = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)
    const drawerStoreFacadeHooks = useDrawerStoreFacade()
    const { translate, getLabel } = useDictionaryStoreFacade()
    const [loading, setLoading] = React.useState(true)
    const [cmsElement, setCmsElement] = React.useState({})

    const {
        selectors: {
            getCmsElementIdReducer
        },
        actions: {
            upsertProjectCmsElement
        },
        hooks: {
            setCmsElementId
        } } = useCmsElementsAdminStoreFacade()

    React.useEffect(() => {
        if (cmsElementId) {
            setCmsElementId(cmsElementId)
        } else {
            setCmsElement({ id: v4() })
            setLoading(false)
        }
    }, [])
    React.useEffect(() => {
        if (getCmsElementIdReducer) {
            setCmsElement(getCmsElementIdReducer)
            setLoading(false)
        }
    }, [getCmsElementIdReducer])

    async function save() {
        await upsertProjectCmsElement(cmsElement)
        drawerStoreFacadeHooks.actions.closeDrawer()
    }

    return !loading && (
        <Grid container>
            <MappsGroups xs={12} sm={6} title="CMS Element Details">
                <TextBox
                    label={translate(getLabel, "Token")}
                    value={cmsElement.token}
                    field="order"
                    disabled={true}
                    validation={[]}
                />
            </MappsGroups>

            <MappsTabs defaultTab={0} tabConfig={
                [
                    {
                        label: 'Details',
                        render: () => <CmsElementEditDetails cmsElement={{ ...cmsElement }} setCmsElement={setCmsElement} ></CmsElementEditDetails>
                    },
                    {
                        label: 'CMS JSON',
                        render: () => <CmsElementEditCMS cmsElement={{ ...cmsElement }} setCmsElement={setCmsElement}></CmsElementEditCMS>
                    },
                ]
            }>
            </MappsTabs>
            <Grid style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                <ButtonLoader
                    color={"primary"}
                    onClick={save}
                    value={translate(getLabel, "Save")}
                    variant={"outlined"}
                >
                </ButtonLoader>
            </Grid>
        </Grid >
    );
}


