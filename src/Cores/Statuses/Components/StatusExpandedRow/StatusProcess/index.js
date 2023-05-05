import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import { useConfigStoreFacade, useDictionaryStoreFacade, useLanguageStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";

export function StatusProcess(props) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const MappsGroups = React.useMemo(MappsComponents().Layouts.Groups.V1)
    const [processRelations, setProcessRelations] = React.useState([])

    const { selectors: {
        processesSelector,
        statusesSelector
    } } = useConfigStoreFacade();

    const { lang } = useLanguageStoreFacade();
    React.useEffect(() => {
        let result = {}
        processesSelector.forEach(process => {
            process.process_chain.forEach(process_chain => {
                console.log(process_chain)
                if (process_chain.status_id == props.statusProject.id) {
                    if (!result[process.token]) {
                        result[process.token] = []
                    }

                    result = {
                        ...result,
                        [process.token]: [
                            ...result[process.token],
                            {
                                ...process_chain,
                                status: statusesSelector.find(status => status.id == process_chain.status_id)
                            }
                        ]
                    }
                }

            })
        })
        setProcessRelations(result)
    }, [])
    return (<>
        <Grid container spacing={3}>
            {Object.keys(processRelations).map(processToken => {
                return <Grid item xs={4} sm={4} key={processToken}>

                    <MappsSections title={translate(getLabel, processToken)} >
                        <List className="mapps-io-list-link" style={{ width: '100%' }}>

                            {processRelations[processToken].map((item) => {
                                return (
                                    <Grid className="mapps-io-list-item" key={item.id} >
                                        <ListItem
                                            data-key={item.id}
                                            button
                                        >
                                            <ListItemText >
                                                {item.id.split('-')[0]} - {item.status && item.status.name}
                                            </ListItemText>

                                        </ListItem>
                                    </Grid>
                                );
                            })}
                        </List>

                    </MappsSections>
                </Grid>
            })}
        </Grid>
    </>
    )
}


