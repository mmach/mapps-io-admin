
import { Grid } from "@material-ui/core";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { Checkbox, TextBox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import React from "react";


export function CmsElementEditDetails({ cmsElement, setCmsElement }) {
    const { translate, getLabel } = useDictionaryStoreFacade()

    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const [_cmsElement, _setCmsElement] = React.useState({ ...cmsElement })

    React.useEffect(() => {
        setCmsElement(_cmsElement)
    }, [_cmsElement])
    return (<>

        <MappsSections title={'Cms Element'}>
            <TextBox
                label={translate(getLabel, "Token")}
                value={_cmsElement.token}
                onChange={(event) => {
                    _setCmsElement({
                        ..._cmsElement, token: event.target.value
                    });
                }}
                field="order"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Lazy loading")}
                value={!_cmsElement.load_on_init}
                onChange={(event) => {
                    _setCmsElement({ ..._cmsElement, load_on_init: event.target.checked })

                }}
                field="load_on_init"
                validation={[]}
            />
            <Checkbox
                label={translate(getLabel, "Is Active")}
                value={_cmsElement.is_active}
                onChange={(event) => {
                    _setCmsElement({ ..._cmsElement, is_active: event.target.checked })

                }}
                field="is_active"
                validation={[]}
            />
        </MappsSections>



    </>
    )
}


