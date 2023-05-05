import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useStatusAdminStoreFacade } from "../../Stores/hooks";


export function StatusProjectUpsert(props) {
    const MappsSection = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const TranslateComponent = React.useMemo(() => mappsPlugins.byName('mapps-component-translate-component').component, [])
    const Textbox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const Checkbox = React.useMemo(MappsComponents().FormComponents.Checkbox)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const { getPlaceholder, getLabel, translate } = useDictionaryStoreFacade()
    const { actions } = useDrawerStoreFacade();
    const [loading, setLoading] = React.useState(false)
    const [status, setStatus] = React.useState(props.status.statusProject)

    const {
        actions: {
            upsertStatus,
        } } = useStatusAdminStoreFacade()

    function save(event, rowData) {
        setLoading(true)
        upsertStatus(status).then(succ => {
            setLoading(false)
            actions.closeDrawer()
        })
    }

    function setTranslate(translation) {
        if (!status.translation_id) {
            status.translation_id = v4()
        }
        if (!translation.id) {
            translation.id = status.translation_id
        }
        setStatus({
            ...status,
            translation: translation
        })
    }
    return <Grid container style={{ display: 'flex' }}>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="Status Translation" >
                <TranslateComponent translation={status.translation || {}} setTranslate={setTranslate} i></TranslateComponent>
            </MappsSection>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="Status Details" >
                <Textbox
                    onChange={(event) => {
                        setStatus({ ...status, status_order: event.target.value });
                    }}
                    placeholder={translate(getPlaceholder, "Order")}
                    isRequired={true}
                    label={translate(getLabel, "Status order")}
                    value={status.status_order}
                    field="code"
                    validation={[]}
                />
                <Checkbox
                    label={translate(getLabel, "Status is closing")}
                    value={status.is_closed}
                    onChange={(event) => {
                        setStatus({ ...status, is_closed: event.target.checked });
                    }}
                ></Checkbox>
            </MappsSection>
        </Grid>
        <Grid style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
            <ButtonLoader
                color={"primary"}
                onClick={save}
                value={translate(getLabel, "Save")}
                variant={"outlined"}
                isLoading={loading}

            >
            </ButtonLoader>
        </Grid>
    </Grid>

}





