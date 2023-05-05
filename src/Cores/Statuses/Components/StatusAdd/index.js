import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useStatusAdminStoreFacade } from "../../Stores/hooks";


export function StatusAdd({ }) {
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const {
        selectors: {
        },
        actions: {  
            upsertStatusGlobal
        } } = useStatusAdminStoreFacade()

    const { translate, getLabel } = useDictionaryStoreFacade()
    const drawerStoreFacade = useDrawerStoreFacade()
    const [_model, setModel] = React.useState({
        id: v4()
    })
    const [loading, setLoading] = React.useState(false)


    function save() {
        setLoading(true)
        upsertStatusGlobal({
            ..._model,
            id: _model.id
        }).then(succ => {
            setLoading(false)
            drawerStoreFacade.actions.closeDrawer()
        })
    }
    return (<Grid container>
        <MappsSections title={'Status Details'} style={{ flexDirection: 'column' }}>
            <TextBox

                label={translate(getLabel, "Token")}
                value={_model.token}
                onChange={(event) => setModel({
                    ..._model,
                    token: event.target.value.toUpperCase()
                })}
                field="value"
                validation={[]}
            />
        </MappsSections>
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
    );

}

 



