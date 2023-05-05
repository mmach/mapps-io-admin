import { Grid } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { mappsPlugins } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React, { useEffect } from "react";
import { v4 } from "uuid";
import { useProjectAdminStoreFacade } from "../../../Stores/ProjectAdminStore/hook";
import './style.scss'

export function LogoUploadImage({ project_logo, project_logo_dest }) {
    const IconButton = React.useMemo(MappsComponents().IconButton);
    let fileUploader

    const [file, setFile] = React.useState([]);
    const { actions: {
        uploadBlob
    } } = useProjectAdminStoreFacade()
    React.useEffect(() => {
        setFile(project_logo)
    }, [project_logo])

    function uploadClick() {
        fileUploader.click();
    }

    function uploadIconHandler(e) {
        const files = e.target.files;

        const allFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const reader = new window.FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                const fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + " kB",
                    base64: reader.result,
                    file: file
                };

                allFiles.push(fileInfo);

                if (allFiles.length == files.length) {
                    const dto = {};
                    dto.id = v4();
                    dto.blob = allFiles[0].base64.split("base64,")[1];
                    dto.type = allFiles[0].type;
                    dto.dest = project_logo_dest;
                    uploadBlob(dto);
                    setFile(allFiles[0])


                }
            };
        }
    }


    const img = project_logo
        ? global.env.BLOB_URL + "/blob/" + project_logo.blob_id
        : '';
    return (<>

        <Grid
            onClick={uploadClick}
            style={{ width: 'inherit' }}
        >
            {file == null ? (
                img ? (
                    <img src={img} style={{ width: 'inherit' }} />
                ) : (
                    <IconButton>
                        <CloudUploadIcon />
                    </IconButton>
                )
            ) : (
                <img src={file.base64 ? file.base64 : img} style={{ width: 'inherit' }} />
            )}
        </Grid>


        <input
            type="file"
            ref={refParam => fileUploader = refParam}
            style={{ display: "none" }}
            onChange={uploadIconHandler}
        />
    </>
    )
}


