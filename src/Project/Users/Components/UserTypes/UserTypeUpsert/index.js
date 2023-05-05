import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useUserTypesAdminStoreFacade } from "../../../Stores/hooks";


export function UserTypeUpsert(props) {
    const MappsSection = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const TranslateComponent = React.useMemo(() => mappsPlugins.byName('mapps-component-translate-component').component, [])
    const Textbox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const { getPlaceholder, getLabel, translate } = useDictionaryStoreFacade()
    const { actions } = useDrawerStoreFacade();
    const [loading, setLoading] = React.useState(false)
    const [userType, setUserType] = React.useState(props.userType)

    const {
        actions: {
            upserUserType,
        } } = useUserTypesAdminStoreFacade()

    function save(event, rowData) {
        setLoading(true)
        upserUserType(userType).then(succ => {
            setLoading(false)
            actions.closeDrawer()
        })
    }

    function setTranslate(translation) {
        if (!userType.translation_id) {
            userType.translation_id = v4()
        }
        if (!translation.id) {
            translation.id = userType.translation_id
        }
        setUserType({
            ...userType,
            translation: translation
        })
    }
    return <Grid container style={{ display: 'flex' }}>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="User Type Translation" >
                <TranslateComponent translation={userType.translation || {}} setTranslate={setTranslate} i></TranslateComponent>
            </MappsSection>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="User Type Details" >
                <Textbox
                    onChange={(event) => {
                        setUserType({ ...userType, name: event.target.value });
                    }}
                    placeholder={translate(getPlaceholder, "Name")}
                    isRequired={true}
                    label={translate(getLabel, "User Type Name")}
                    value={userType.name}
                    field="name"
                    validation={[]}
                />

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





