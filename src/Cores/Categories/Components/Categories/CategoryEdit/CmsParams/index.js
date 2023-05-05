import { Grid } from "@material-ui/core";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { ChromePicker } from "react-color";
import { useCategoryAdminStoreFacade } from "../../../../Stores/hooks";
import { CategoryUploadImage } from "../UploadImage";
import './style.scss';

export function CategoryCmsParams({ categoryId }) {
    const { translate, getLabel } = useDictionaryStoreFacade()
    const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
    const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
    const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)

    const [category, setCategory] = React.useState()
    const { selectors: {
        getCategoryLeaf
    },
        actions: {
            editCategory,
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

    function save(event) {
        editCategory(category);
    }
    if (!category) {
        return <Grid></Grid>
    }

    return category && (<><Grid container spacing={3} >
        <Grid item xs={2} sm={2} >
            <MappsSections title={'Upload Icon (Pin, Category List)'} >
                <CategoryUploadImage categoryId={categoryId} setCategoryParent={setCategory}></CategoryUploadImage>
            </MappsSections>
        </Grid>
        <Grid item xs={2} sm={2} >
            <MappsSections title={'Choose Main Color (Pin,List element)'} style={{ justifyContent: 'center' }} >
                <ChromePicker
                    className="chrome-picker "
                    disableAlpha={true}
                    color={category.color ? category.color : "#666666"}
                    onChangeComplete={({ hex }) => setCategory({ ...category, color: hex })}
                />
            </MappsSections>

        </Grid>

        <Grid item xs={8} sm={8} >
            <MappsSections title={'Cms Fields'} >
                <TextBox
                    onChange={(event) => setCategory({ ...category, expired_day: event.target.value })}
                    label={translate(getLabel, "CATEGORY_EXPIRE_DATE_PLACEHOLDER")}
                    value={category.expired_day}
                    field="expired_day"
                    validation={[]}
                />
            </MappsSections>
        </Grid>
    </Grid >
        <ButtonLoader
            color={"primary"}
            onClick={save}
            value={translate(getLabel, "Save")}
            variant={"outlined"}
        >
        </ButtonLoader>
    </>
    )
}


