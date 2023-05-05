import { Grid } from "@material-ui/core";
import { TableIcons } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { toVerifyColumnDefinition } from "../../Config/index.js";
import { useStorageAdminStoreFacade } from "../../Stores/hooks.js";
import { FilePreview } from "../FilePreview/index.js";
import { DropzoneDialog } from 'material-ui-dropzone';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { v4 } from "uuid";


export function StorageImage({ type }) {
  const MaterialTable = React.useMemo(MappsComponents().Layouts.Table.V2, [])
  const MappsSection = React.useMemo(MappsComponents().Layouts.Sections.V1, [])
  const IconButton = React.useMemo(() => mappsPlugins.byName("mapps-component-icon-button").component);
  const [open, setOpen] = React.useState(false);
  const { getLabel, translate } = useDictionaryStoreFacade()
  const [fileObjects, setFileObjects] = React.useState([]);

  const [selectedBlod, setSelectedBlob] = React.useState({})

  const {
    selectors: {
      storageAdminReducer
    },
    actions: {
      clean,
      getProjectStorage,
      removeImage,
      verifyFile,
      uploadBlob
    }
  } = useStorageAdminStoreFacade()

  React.useEffect(() => {
    getProjectStorage({ type: type });
    return clean
  }, [])

  function clickRemoveImage(event, rowdata) {
    removeImage({ ...rowdata });
  }

  function handleUpload(files) {
    const allFiles = [];
    if (files.length == 0) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const fileInfo = {
          id: v4(),
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + " kB",
          blob: reader.result,
          file: file
        };

        allFiles.push(fileInfo);

        const prom = allFiles.map(i => {
          const dto = {};
          dto.id = v4();
          dto.blob = reader.result.split("base64,")[1];
          dto.type = i.type;
          return uploadBlob(dto);
        })

        Promise.all(prom).then(i => {
          getProjectStorage({ type: type })
        });

      }; // reader.onload
    } // for
  }

  return (
    <Grid container >
      <Grid item xs={8}>

        <DropzoneDialog
          filesLimit={1}
          dropzoneText={translate(getLabel, "Upload Image")}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          maxFileSize={2500000}
          useChipsForPreview={false}
          showPreviewsInDropzone={false}
          open={open}
          showAlerts={['error']}
          onChange={newFileObjs => {
            setFileObjects(newFileObjs);
          }}

          onClose={() => {
            setOpen(false); setFileObjects([])
          }}
          onSave={() => {
            handleUpload(fileObjects)
            setOpen(false);
            setFileObjects([])
          }}
          previewText={['error', 'info', 'success']}
          showPreviews={true}
          cancelButtonText={translate(getLabel, "CANCEL_BUTTON")}
          submitButtonText={translate(getLabel, "SUBMIT_BUTTON")}
        />
        <MaterialTable
          isLoading={storageAdminReducer.getImagesIsLoading}
          icons={TableIcons}
          freeActions={[(type=="PROJECT" && <IconButton onClick={() => setOpen(true)}>
            <AddPhotoAlternateIcon style={{ fontSize: 40 }} />
          </IconButton>)]}
          actions={[
            rowData => ({
              icon: TableIcons.Delete,
              label: 'Remove Image',
              onClick: clickRemoveImage,

            }),
          ]}
          {...toVerifyColumnDefinition({ type })}
          onRowSelectionChange={(event) => {
            const blob_id = Object.keys(event).map(i => i)
            if (blob_id.length > 0) {
              const blob = storageAdminReducer.files.find(i => i.id == blob_id[0])
              setSelectedBlob(blob)
            }
          }}
          data={storageAdminReducer.files}
          title="Files"
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



