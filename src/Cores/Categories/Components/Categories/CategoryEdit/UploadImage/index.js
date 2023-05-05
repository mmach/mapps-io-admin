import { Grid } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { mappsPlugins } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { v4 } from "uuid";
import { useCategoryAdminStoreFacade } from "../../../../Stores/hooks";
import './style.scss';

export function CategoryUploadImage({ setCategoryParent, categoryId }) {
    const IconButton = React.useMemo(MappsComponents().IconButton);
    const Image = React.useMemo(() => mappsPlugins.byName("mapps-component-image").component);
    let fileUploader

    const [category, setCategory] = React.useState()
    const { selectors: {
        getCategoryLeaf
    },
        actions: {
            expandCategoryTreeByCategoryId,
            editCategory
        },

        hooks: {
            setCategoryId
        },
        functions: {
            isCategoryLeafLoaded
        }
    } = useCategoryAdminStoreFacade()
    const [file, setFile] = React.useState([]);

    React.useEffect(() => {
        setCategoryId(categoryId)
    }, [categoryId])
    React.useEffect(() => {
        if (isCategoryLeafLoaded()) {
            setCategory(getCategoryLeaf)
            setFile(isCategoryLeafLoaded.icon_blob)
        }
    }, [getCategoryLeaf])

    function uploadClick() {
        fileUploader.click();
    }

    function uploadIconHandler(e) {
        // get the files
        const files = e.target.files;

        // Process each file
        const allFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Make new FileReader
            const reader = new window.FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                const fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + " kB",
                    base64: reader.result,
                    file: file
                };

                // Push it to the state
                allFiles.push(fileInfo);

                // If all files have been proceed
                if (allFiles.length == files.length) {
                    // Apply Callback function
                    const dto = {};
                    dto.id = v4();
                    dto.blob = allFiles[0].base64.split("base64,")[1];
                    dto.type = allFiles[0].type;
                    setFile(allFiles[0])
                    setCategory({
                        ...category,
                        blob: dto
                    })
                    setCategoryParent({
                        ...category,
                        blob: dto
                    })

                }
            };
        } // for
    }

    if (!category) {
        return <Grid></Grid>
    }
    const img = category && category.icon_blob
        ? global.env.BLOB_URL + "/blob/" + category.icon_blob.blob_id
        : '';
    return category && (<>
        <Grid item xs="12">

            <Grid
                onClick={uploadClick}
                style={{
                    cursor: "pointer",
                    display: img ? "default" : "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {file == null ? (
                    img ? (
                        <Image src={img} />
                    ) : (
                        <IconButton>
                            <CloudUploadIcon />
                        </IconButton>
                    )
                ) : (
                    <Image src={file.base64 ? file.base64 : img} />
                )}
            </Grid>


            <input
                type="file"
                ref={refParam => fileUploader = refParam}
                style={{ display: "none" }}
                onChange={uploadIconHandler}
            />
        </Grid>
    </>
    )
}


