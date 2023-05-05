import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { usePrivilegesAdminStoreFacade } from "../../../Stores/hooks";


export function PrivilegeAdd({ }) {
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const TextArea = React.useMemo(MappsComponents().FormComponents.TextArea)
    const Checkbox = React.useMemo(MappsComponents().FormComponents.Checkbox)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const {
        selectors: {
        },
        actions: {
            upsertPrivGlobal
        } } = usePrivilegesAdminStoreFacade()

    const { translate, getLabel } = useDictionaryStoreFacade()
    const drawerStoreFacade = useDrawerStoreFacade()
    const [_action, setAction] = React.useState({
        id: v4(),
    })
    const [loading, setLoading] = React.useState(false)


    function save() {
        setLoading(true)
        upsertPrivGlobal({
            ..._action,
            id: _action.id
        }).then(succ => {
            setLoading(false)
            drawerStoreFacade.actions.closeDrawer()
        })
    }
    return (<Grid container>
        <MappsSections title={'Action Details'} style={{ flexDirection: 'column' }}>
            <TextBox

                label={translate(getLabel, "Name")}
                value={_action.name}
                onChange={(event) => setAction({
                    ..._action,
                    name: event.target.value.toUpperCase()
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

 



