/*
    ./client/components/App.jsx
*/

import { Chip, Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useProcessAdminStoreFacade } from "../../../../../../Stores/hooks.js";

const operator = ["!", "|", "&", "="];

export function ProcessActionPrivilegesEdit({ processActionId, actionId }) {
    // const MappsSection = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const MappsSection = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const BodyLoader = React.useMemo(MappsComponents().BodyLoader)

    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const TagComponent = React.useMemo(MappsComponents().FormComponents.TagComponent)

    const {
        selectors: {
            getProcessChainActionReducer
        },
        actions: {
            grantPrivs,
            revokePrivs,
            upsertAction
        },
        hooks: {
            setProcessChainActionId
        } } = useProcessAdminStoreFacade()

    const { translate, getLabel } = useDictionaryStoreFacade()

    const { selectors: {
        privsSelector,
        actionsSelector
    } } = useConfigStoreFacade()

    const [action, setAction] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [actionTitle, setActionTitle] = React.useState('')

    React.useEffect(() => {
        setProcessChainActionId(processActionId)
        const actionTitle = actionsSelector.find(i => i.id == actionId).action;
        setActionTitle(actionTitle)
    }, [])

    React.useEffect(() => {
        if (!!getProcessChainActionReducer) {
            setAction({ ...getProcessChainActionReducer })
        }
    }, [getProcessChainActionReducer])


    function saveFunc() {
        setLoading(true)
        upsertAction(action).then(suc => {
            setLoading(false)

        })
    }

    function getPrivileges() {
        const privsUsedId = action.action_privileges.map(i => i.privilege_id)
        const roles = privsSelector.filter(i => !privsUsedId.includes(i.id));

        return [{ id: "", value: "" }, ...roles].map((item) => {
            return {
                id: item.id,
                value: item.privilege || item.value
            };
        });
    }

    function revokePrivileges(event) {
        const priv_id = event.currentTarget.dataset.key;
        setLoading(true)
        revokePrivs({ id: priv_id }).then(suc => {
            setLoading(false)
        })
    }

    function grantPrivileges(event) {
        setLoading(true)
        grantPrivs({
            id: v4(),
            status: 1,
            privilege_id: event.target.value,
            process_chain_action_id: action.id,
            process_chain_id: action.process_chain_id

        }).then(suc => {
            setLoading(false)
        })

    }
    function isValidOnp(val, privs) {
        if (
            val.split(" ").filter((i) => !i.startsWith("#")).length + 1 !=
            val.split(" ").filter((i) => i.startsWith("#")).length
        ) {
            return false;
        } else {
            const hash = val
                .split(" ")
                .filter((i) => i.startsWith("#$"))
                .map((d) => {
                    return d.replace(/#/g, "").replace("$", "");
                });
            const filtered = hash.filter((i) =>
                privs.map((p) => privsSelector.find(ps => ps.id == p.privilege_id).privilege.trim()
                ).includes(i)
            );
            return filtered.length == hash.length;
        }
    }


    try {


        return action && !loading ? <Grid container style={{ display: 'flex' }}>
            <MappsSection title="Action Title">
                <TextBox
                    disabled={true}
                    label={translate(getLabel, "Name")}
                    value={actionTitle}
                    field="value"
                    validation={[]}
                />
            </MappsSection>
            <MappsSection title="Allowed Privileges">
                <DropDownList

                    label={"Privileges"}
                    valueOptions={getPrivileges()}
                    value={""}
                    onChange={grantPrivileges}
                    field="type"
                    validation={[]}
                />
                {

                    action.action_privileges.map((priv, index) => <Chip
                        key={priv.id}
                        data-key={priv.id}
                        onClick={revokePrivileges}
                        label={
                            privsSelector.find(i => i.id == priv.privilege_id).privilege.trim()
                        }
                    ></Chip>)
                }
            </MappsSection>
            <MappsSection title="Function" style={{ display: 'flex', width: '100%', }}>

                <Grid xs={12}>

                    <TagComponent
                        notUniq={true}
                        disabled={true}
                        tags={
                            action.func
                                ? action.func
                                    .split(" ")
                                    .map((i) => {
                                        return {
                                            id: v4(),
                                            value: v4(),
                                            label: i
                                        };
                                    })
                                : []
                        }
                        noLabel={true}
                        onChange={(event) => {
                            const func = event.map((i) => i.label).join(" ");
                            setAction({ ...action, func: func })
                        }}
                        suggestions={[
                            ...operator.map((i) => {
                                return {
                                    value: i,
                                    label: i,
                                    type: "OPERATOR"
                                };
                            }),
                            ,
                            ...action.action_privileges.map((priv) => {
                                return {
                                    id: v4(),
                                    value: v4(),
                                    label: `#$${privsSelector.find(i => i.id == priv.privilege_id).privilege.trim()}#`,
                                    type: "PRIV"
                                };
                            })
                        ]}
                    ></TagComponent>
                </Grid>
                <Grid xs={12} style={{ marginLeft: '1rem', marginBottom: '1rem', marginTop: '1rem' }}>
                    {action.func ? <Grid style={{
                        color: isValidOnp(
                            action.func,
                            action.action_privileges
                        )
                            ? "green"
                            : "red"
                    }}>{action.func}
                    </Grid> : <></>}
                </Grid>
                <Grid xs={12} style={{ marginLeft: '1rem', marginBottom: '1rem', marginTop: '1rem' }}>
                    <ButtonLoader
                        color={"primary"}
                        onClick={saveFunc}
                        value={translate(getLabel, "Save Func")}
                        variant={"outlined"}
                    >
                    </ButtonLoader>
                </Grid>
            </MappsSection >

        </Grid > : <Grid
            style={{
                height: "400px",
                display: "flex",
                width: '100%'
            }}
        >
            <BodyLoader text=" " size="25px" />
        </Grid>
    } catch (er) {
        console.log(er)
        return <></>
    }
}

