import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { ButtonLoader } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useDictionaryStoreFacade, useLayoutContainerContextFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React from "react";
import "react-contexify/dist/ReactContexify.min.css";
import { useProcessAdminStoreFacade } from "../../Stores/hooks";
//import Process from "./index.js";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { useLocation, useNavigate } from "react-router-dom";

function ProcessList(props) {
    const { state: {
    }, functions: {
        setTitle,
        setIcon
    } } = useLayoutContainerContextFacade()

    const { selectors: {
        processesSelector
    }, actions: {
        getAllProcess
    } } = useProcessAdminStoreFacade()
    const { translate, getLabel } = useDictionaryStoreFacade()

    const navigate = useNavigate()
    const location = useLocation()
    const processId = React.useMemo(() => new URLSearchParams(location.search).get("processId"), [location.search]);

    React.useEffect(() => {
        setTitle('Process List')
        setIcon(<AccountTreeIcon />)
    }, [])

    function navigateToProcess(process) {
        navigate(`/mapps/permissions/processes?processId=${process.id}`)
    }
    function createProcess(event) {
        navigate(`/mapps/permissions/processes`)
    }
    return (<><Grid>
        <ButtonLoader
            color={"primary"}
            onClick={createProcess}
            value={translate(getLabel, "Create Process")}
            startIcon={<AddIcon></AddIcon>}
            variant={"outlined"}
        >
        </ButtonLoader>
    </Grid>
        <List className="mapps-io-list-link" style={{ width: '100%' }}>

            {processesSelector.sort((a, b) => a.token > b.token ? 1 : -1).map((item) => {
                return (
                    <Grid className="mapps-io-list-item" key={item.id}>

                        <ListItem button
                            onClick={() => {
                                navigateToProcess(item);
                            }}
                            className={processId == item.id ? 'selected' : ''}>
                            <ListItemText primary={item.token} ></ListItemText>
                        </ListItem>
                    </Grid>
                );
            })}
        </List>
    </>

    );
}


export default ProcessList
