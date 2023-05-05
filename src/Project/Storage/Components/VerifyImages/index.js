import { Grid } from "@material-ui/core";
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { toVerifyColumnDefinition } from "../../Config/index.js";
import { useStorageAdminStoreFacade } from "../../Stores/hooks.js";
import { FilePreview } from "../FilePreview/index.js";


export function VerifyImage(props) {
  const MaterialTable = React.useMemo(MappsComponents().Layouts.Table.V2, [])
  const MappsSection = React.useMemo(MappsComponents().Layouts.Sections.V1, [])

  const [selectedBlod, setSelectedBlob] = React.useState({})

  const {
    selectors: {
      storageAdminReducer
    },
    actions: {
      clean,
      getUnverifiedImages,
      removeImage,
      verifyFile
    }
  } = useStorageAdminStoreFacade()

  React.useEffect(() => {
    getUnverifiedImages();
    return clean;
  }, [])

  function clickRemoveImage(event, rowdata) {
    removeImage({ ...rowdata });
  }
  const clickVerifyImage = (event, rowdata) => {
    verifyFile({ ...rowdata });
  }

  return (
    <Grid container >
      <Grid item xs={8}>
        <MaterialTable
          isLoading={storageAdminReducer.getImagesIsLoading}
          icons={TableIcons}
          actions={[
            rowData => ({
              icon: TableIcons.Check,
              label: 'Verify Image',
              onClick: clickVerifyImage,
            }),
            rowData => ({
              icon: TableIcons.Delete,
              label: 'Remove Image',
              onClick: clickRemoveImage,
            }),
          ]}
          {...toVerifyColumnDefinition({})}
          onRowSelectionChange={(event) => {
            const blob_id = Object.keys(event).map(i => i)
            if (blob_id.length > 0) {
              const blob = storageAdminReducer.files.find(i => i.id == blob_id[0])
              setSelectedBlob(blob)
            }
          }}
          data={storageAdminReducer.files}
          title="To Verify Files"
        />
      </Grid>
      <Grid container item xs={4} style={{ justifyContent: 'center' }}>
        <MappsSection title={"Preview File"}>
          <FilePreview blob={selectedBlod}
            params={{
              size: 'blob_id'
            }}></FilePreview>
        </MappsSection>
      </Grid>
    </Grid >
  );

}



