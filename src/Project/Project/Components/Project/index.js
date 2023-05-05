/*
    ./client/components/App.jsx
*/

import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React, { useEffect } from "react";
import { ChromePicker } from "react-color";
import { v4 } from "uuid";
import { useProjectAdminStoreFacade } from "../../Stores/ProjectAdminStore/hook";

export function ProjectSettings({ project }) {

    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)

    const [_project, setProject] = React.useState({
        id: v4(),
        ...project
    })
    const [loading, setLoading] = React.useState(false)

    const { translate, getLabel } = useDictionaryStoreFacade()
    const { actions: {
        getProjectInfo,
        updateProject
    } } = useProjectAdminStoreFacade()

    useEffect(() => {
        setLoading(true)
        getProjectInfo().then(succ => {
            setProject(succ.data)
            setLoading(false)
        })
    }, [])

    function submit() {
        setLoading(true)
        updateProject(_project).then(suc => {
            setProject(suc.data)
            setLoading(false)
        })
    }
    return <Grid container style={{ justifyContent: 'center' }}>
        <Grid container item style={{flexWrap:'nowrap'}}>
            <MappsSections title={"Project Settings"}  xs={9} sm={9}>
                <TextBox
                    label={translate(getLabel, "Name")}
                    value={_project.name}
                    onChange={(event) => setProject({
                        ..._project,
                        name: event.target.value
                    })}
                    field="name"
                    validation={[]}
                />
                <TextBox

                    label={translate(getLabel, "Base URL")}
                    value={_project.base_url}
                    onChange={(event) => setProject({
                        ..._project,
                        base_url: event.target.value
                    })}
                    field="base_url"
                    validation={[]}
                />
                <TextBox

                    label={translate(getLabel, "Contact Mail")}
                    value={_project.contact_mail}
                    onChange={(event) => setProject({
                        ..._project,
                        contact_mail: event.target.value
                    })}
                    field="contact_mail"
                    validation={[]}
                />
                <TextBox

                    label={translate(getLabel, "Auth URL")}
                    value={_project.auth_url}
                    onChange={(event) => setProject({
                        ..._project,
                        auth_url: event.target.value
                    })}
                    field="auth_url"
                    validation={[]}
                />
                <TextBox

                    label={translate(getLabel, "Description")}
                    value={_project.description}
                    onChange={(event) => setProject({
                        ..._project,
                        description: event.target.value
                    })}
                    field="description"
                    validation={[]}
                />
            </MappsSections>
            <MappsSections title={"Color Settings"}  xs={3} sm={3}>
                <ChromePicker
                    disableAlpha={true}
                    color={
                        _project.theme_color
                            ? _project.theme_color
                            : "#666666"
                    }
                    onChangeComplete={({ hex }) => setProject({
                        ..._project,
                        theme_color: hex
                    })}
                />
            </MappsSections>
        </Grid>
        <ButtonLoader
            onClick={submit}
            size={"md"}
            color={"primary"}
            value={translate(getLabel, "ACTION_BUTTON_SAVE")}
            isLoading={loading}
        />
    </Grid>
}

