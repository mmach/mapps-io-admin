import { Grid } from "@material-ui/core";
import { useConfigStoreFacade, useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { ProcessViewer } from "../../../../../Processes/Components/ProcessContainer/ProcessViewer";
import { useCategoryAdminStoreFacade } from "../../../../Stores/hooks";
import './style.scss';

export function CategoryProcess({ categoryId }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const DropDownList = React.useMemo(MappsComponents().FormComponents.DropDownList)
    const { selectors: { processesSelector } } = useConfigStoreFacade()
    
    const [category, setCategory] = React.useState({})
    const [currentProcess, setCurrentProcess] = React.useState({});

    const { selectors: {
        getCategoryLeaf
    },
        actions: {
            editCategory
        },

        hooks: {
            setCategoryId
        },
        functions: {
            isCategoryLeafLoaded
        }
    } = useCategoryAdminStoreFacade()

    React.useEffect(() => {
        setCategoryId(categoryId)
    }, [categoryId])
    React.useEffect(() => {
        if (isCategoryLeafLoaded()) {
            setCategory(getCategoryLeaf)
        }
    }, [getCategoryLeaf])
    React.useEffect(() => {
        const process = processesSelector.find(i => i.id == category.process_id)
        setCurrentProcess(process)
    }, [category.process_id])
    function getProcessList() {

        return [{ id: "", token: " " }, ...processesSelector].map((item) => {
            return {
                id: item.id,
                value: item.token
            };
        });
    }
    function save(event) {
        editCategory(category);
    }
    if (!category.id) {
        return <Grid></Grid>
    }

    return category.id && (<>
        <MappsSections title={translate(getLabel, "Processes")}>
            <DropDownList
                label={translate(getLabel, "Assign Process")}
                valueOptions={getProcessList()}
                onChange={(event) => setCategory({ ...category, process_id: event.target.value })}
                field="type"
                validation={[]}
                value={category.process_id}
            />
        </MappsSections>
        <MappsSections title={translate(getLabel, "Processes Preview")}>
            <Grid container className="mapps-io-preview-process">
                {currentProcess && <ProcessViewer  processId={currentProcess.id} ></ProcessViewer>}
            </Grid>
        </MappsSections>
        <ButtonLoader
            color={"primary"}
            onClick={save}
            value={translate(getLabel, "Save")}
            variant={"outlined"}
        >s
        </ButtonLoader>
    </>
    )
}


