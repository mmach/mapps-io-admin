import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/mappsComponents.js";

import { useDialogStoreFacade, useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React from "react";
import { CategoryOptionsCore } from "../CategoryOptions/CategoryOptionTempMapper/Components/index.js";
import { CategoryOptionsLinkCms } from './Cms/index.js';
import { CategoryOptionsLinkCmsFlags } from './CmsFlag/index.js';
import { useCategoryAdminStoreFacade } from "../../Stores/hooks.js";


export function CategoryOptionLink({ categoryOptionLink, categoryOption }) {
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const MappsGroups = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const MappsTabs = React.useMemo(MappsComponents().Layouts.Tab.V1)
    const drawerStoreFacadeHooks = useDrawerStoreFacade()
    const { translate, getLabel } = useDictionaryStoreFacade()

    const { selectors: {
        getCategoryTypes
    },
        actions: {
            editCategoryOptionLink
        }
    } = useCategoryAdminStoreFacade()

    const [catOptionLink, setCatOptionLink] = React.useState({ ...categoryOptionLink })

  
    function isSelection() {
        return ['SELECT', 'MULTISELECT'].includes(getCategoryTypes.find(i => i.id == categoryOption.cot_id).type)
    }

    function isMultiselection() {
        return ['MULTISELECT'].includes(getCategoryTypes.find(i => i.id == categoryOption.cot_id).type)
    }

    function isRadioSelection() {
        return ['SELECT'].includes(getCategoryTypes.find(i => i.id == categoryOption.cot_id).type)
    }

    function isImage() {
        return ['IMAGES'].includes(getCategoryTypes.find(i => i.id == categoryOption.cot_id).type)
    }

    async function save() {
        drawerStoreFacadeHooks.actions.closeDrawer()
        await editCategoryOptionLink(catOptionLink);
    }

    return (
        <Grid container>
            <MappsGroups xs={12} sm={6} title="Category Option Link Detail">
                <CategoryOptionsCore catOptionId={categoryOption.id} readOnly={true}></CategoryOptionsCore>
            </MappsGroups>

            <MappsTabs defaultTab={0} tabConfig={
                [
                    {
                        label: 'Core',
                        render: () => <CategoryOptionsLinkCmsFlags isImage={isImage} categoryOptionLink={{ ...catOptionLink }} setCategoryOptionLink={setCatOptionLink}></CategoryOptionsLinkCmsFlags>
                    },
                    {
                        label: 'CMS',
                        render: () => <CategoryOptionsLinkCms categoryOptionLink={{ ...catOptionLink }} setCategoryOptionLink={setCatOptionLink} ></CategoryOptionsLinkCms>
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


