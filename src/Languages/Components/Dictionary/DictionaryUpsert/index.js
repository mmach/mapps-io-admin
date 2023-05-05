import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useDictionaryAdminStoreFacade } from "../../../Stores/hooks";


export function DictionaryUpsert({ translation }) {
    const MappsSection = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const TranslateComponent = React.useMemo(() => mappsPlugins.byName('mapps-component-translate-component').component, [])
    const Textbox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)

    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const { getPlaceholder, getLabel, translate } = useDictionaryStoreFacade()
    const { actions } = useDrawerStoreFacade();
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState(translation || { id: v4() })

    const {
        actions: {
            addDictionary,
        },
        functions: {
            getTypeDictionaries
        } } = useDictionaryAdminStoreFacade()

    function save(event) {
        setLoading(true)
        addDictionary(message).then(succ => {
            setLoading(false)
            actions.closeDrawer()
        })
    }

    function setTranslate(translation) {

        if (!message.id) {
            message.id = v4()
        }
        setMessage({
            ...message,
            ...translation
        })
    }
    function getTypesList() {

        return ["", ...Object.keys(getTypeDictionaries())].map((item, index) => {
            return {
                id: item,
                value: item
            };
        });
    }
    return <Grid container style={{ display: 'flex' }}>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="Details" >
                <DropDownList
                    label={translate(getLabel, "Type")}
                    valueOptions={getTypesList()}
                    isRequired={true}
                    value={message.type}
                    onChange={(event) => setMessage({ ...message, type: event.target.value })}
                    field="type"
                    validation={[]}
                />
                <Textbox
                    onChange={(event) => {
                        setMessage({ ...message, token: event.target.value });
                    }}
                    placeholder={translate(getPlaceholder, "Code")}
                    isRequired={true}
                    label={translate(getLabel, "Code")}
                    value={message.token}
                    field="Code"
                    validation={[]}
                />

                <Textbox
                    onChange={(event) => {
                        setMessage({ ...message, respStatus: event.target.value });
                    }}
                    placeholder={translate(getPlaceholder, "Status")}
                    label={translate(getLabel, "Status")}
                    value={message.respStatus}
                    field="Status"
                    validation={[]}
                />

            </MappsSection>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex' }}>
            <MappsSection title="Translation" >
                <TranslateComponent translation={message || {}} setTranslate={setTranslate} i></TranslateComponent>
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
    </Grid >

}





