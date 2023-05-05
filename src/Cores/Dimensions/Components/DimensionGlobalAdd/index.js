import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade, useDrawerStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useCategoriesOptionsAdminStoreFacade } from "../../../Categories/Stores/hooks";
import { useDimensionAdminStoreFacade } from "../../Stores/hooks";


export function DimensionGlobalAdd({ }) {
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)
    const TextArea = React.useMemo(MappsComponents().FormComponents.TextArea)
    const Checkbox = React.useMemo(MappsComponents().FormComponents.Checkbox)
    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)

    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const {
        selectors: {
        },
        actions: {
            upsertDimensionGlobal
        } } = useDimensionAdminStoreFacade()
    const { selectors: {
        getCategoryTypes
    }, actions: {
    },
        functions: {
            getCategoryTypesValues
        } } = useCategoriesOptionsAdminStoreFacade()

    const { translate, getLabel } = useDictionaryStoreFacade()
    const drawerStoreFacade = useDrawerStoreFacade()
    const [_model, setModel] = React.useState({
        id: v4()
    })
    const [loading, setLoading] = React.useState(false)

    function save() {
        setLoading(true)
        upsertDimensionGlobal({
            ..._model,
            id: _model.id
        }).then(succ => {
            setLoading(false)
            drawerStoreFacade.actions.closeDrawer()
        })
    }
    function getDropDownValuesCott() {
        const cot = getCategoryTypes.find((item) => {
            return item.id == _model.co_type_id;
        });
        if (!cot) {
            return []
        }
        return [{ id: null, value: "" }, ...cot.cat_options_type_temp].map((item) => {
            return {
                id: item.id,
                value: item.order ? item.order + " " + item.type : item.value
            };
        });
    }


    return (<Grid container>
        <MappsSections title={'Dimension Global Details'} style={{ flexDirection: 'column' }}>
            <TextBox

                label={translate(getLabel, "Name")}
                value={_model.name}
                onChange={(event) => setModel({
                    ..._model,
                    name: event.target.value.toUpperCase()
                })}
                field="name"
                validation={[]}
            />

            <TextArea

                label={translate(getLabel, "Descritpion")}
                value={_model.descritpion}
                onChange={(event) => setModel({
                    ..._model,
                    descritpion: event.target.value
                })}
                field="descritpion"
                validation={[]}
            />

            <Checkbox
                label={translate(getLabel, "Use as reference for other dimensions [ex. dictionaries with Unit Of Measure]")}
                onChange={(event) => setModel({
                    ..._model,
                    as_cat_ref: event.target.checked
                })}
            ></Checkbox>
        </MappsSections>
        <MappsSections title={'Select Category Type Relation for this Dimension Details'} style={{ flexDirection: 'column' }}>


            <DropDownList
                label={translate(getLabel, "Category Type")}
                valueOptions={getCategoryTypesValues()}
                value={_model.co_type_id}
                onChange={(event) => setModel({
                    ..._model,
                    co_type_id: event.target.value
                })}
                field="cottChoose"
                validation={[]}
            />
            <DropDownList
                label={translate(getLabel, "Category Type Item")}
                valueOptions={getDropDownValuesCott()}
                value={_model.cott_id}
                onChange={(event) => setModel({
                    ..._model,
                    cott_id: event.target.value
                })}
                disabled={!_model.co_type_id}
                field="cottChoose"
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





