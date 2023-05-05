import {
  Collapse, Grid, IconButton,
  List,
  ListItem, ListItemText
} from "@material-ui/core";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import RemoveIcon from "@material-ui/icons/Remove";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { TextBox } from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useLayoutContainerContextFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCategoriesOptionsAdminStoreFacade } from "../../../Stores/hooks";

function CategoryOptionsListByType({ selectionMode, onClick, selectedCategories = [] }) {
  const { state: {
  }, functions: {
    setTitle,
    setIcon
  } } = useLayoutContainerContextFacade()

  const [filter, setFilter] = React.useState('')
  const { translate, getLabel } = useDictionaryStoreFacade()
  const { selectors: {
    getCategoryTypes,
    getAllCategoryOptionsReducer
  },
    actions: {
      expandCategoryOptionsType
    } } = useCategoriesOptionsAdminStoreFacade()
   const navigate = useNavigate()
  const ButtonLoader = React.useMemo(MappsComponents().ButtonLoader)
  const location = useLocation()

  const categoryOptionId = React.useMemo(() => new URLSearchParams(location.search).get("catOptionId"), [location.search]);

  React.useEffect(() => {
    setTitle('Category Options List')
    setIcon(<AccountTreeIcon />)
  }, [])

  React.useEffect(() => {
    if (getAllCategoryOptionsReducer.length > 0 && getCategoryTypes.length > 0) {
      const catOption = getAllCategoryOptionsReducer.find(i => i.id == categoryOptionId)
      if (catOption) {
        const catType = getCategoryTypes.find(i => i.id == catOption.cot_id)
        if (!catType.expanded) {
          expandCategoryOptionsType(catType.id)
        }
      }
    }
  }, [categoryOptionId, getAllCategoryOptionsReducer, getCategoryTypes])
  function removeOption(event) {
    const id = event.currentTarget.dataset.tag;
    this.props
      .removeCategoryOptions({
        id: id
      })
      .then(() => {
        this.props.getCategoryOptions();
        this.setState({
          categoryOptions: this.state.categoryOptions.filter((item) => {
            return item.id != id;
          })
        });
      });
  }

  function openCollapse(event) {
    expandCategoryOptionsType(event.currentTarget.dataset.key)
  }

  function openLink(event) {
    if (selectionMode) {
      onClick(event)
    } else {
      const id = event.currentTarget.dataset.key
      navigate(`/mapps/categories/categoriesOptions?catOptionId=${id}`)
    }
  }

  function createCategoryClick(event) {
    navigate(`/mapps/categories/categoriesOptions?catOptionId=new`)
  }

  return (
    <>
      {!selectionMode && <Grid>
        <ButtonLoader
          color={"primary"}
          onClick={createCategoryClick}
          value={translate(getLabel, "Create")}
          startIcon={<AddIcon></AddIcon>}
          variant={"outlined"}
        >
        </ButtonLoader>
      </Grid>}
      <Grid style={{
        paddingTop: 0, paddingBottom: 0
      }}>
        <TextBox
          label={translate(getLabel, "CODE_FILTER_LABEL")}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </Grid>
      <List className="mapps-io-list-link">
        {Array.isArray(getCategoryTypes) && getCategoryTypes.
          filter((item, el) => {
            const catFiltered = getAllCategoryOptionsReducer.filter((element) => {
              return element.cot_id == item.id;
            });
            return catFiltered.length > 0
          })
          .map((item, el) => {
            const catFiltered = getAllCategoryOptionsReducer.filter((element) => {
              return element.cot_id == item.id;
            });
            const matched = catFiltered.filter((item) => {
              return (
                String(item.name.toLowerCase()).startsWith(filter.toLowerCase()) ||
                String(item.name.toLowerCase()).indexOf(filter.toLowerCase()) > 0
              );
            });
            return (
              <Grid className="mapps-io-list-item" key={el}>
                <ListItem button data-key={item.id} onClick={openCollapse} className={item.expanded && 'selected'}>
                  <ListItemText >
                    {item.name}
                  </ListItemText>
                  <Grid className="mapps-io-list-item-description">
                    {matched.length + " / " + catFiltered.length}
                  </Grid>
                  {item.expanded ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  data-key={item.id}
                  in={item.expanded}
                  timeout="auto"
                  unmountOnExit
                >
                  <List className="mapps-io-list-link-collapse mapps-io-list-item ">
                    {catFiltered
                      .sort((a, b) => {
                        return String(a.code) > String(b.code) ? 1 : -1;
                      })
                      .map((item, indx) => {
                        if (
                          String(item.name)
                            .toUpperCase()
                            .startsWith(filter.toUpperCase()) ||
                          String(item.name).toUpperCase().indexOf(filter.toUpperCase()) >
                          0
                        ) {
                          return (
                            <ListItem
                              className={!item.status ? 'primary' : categoryOptionId == item.id && 'selected'}
                              button
                              disabled={selectedCategories.includes(item.id)}
                              key={indx}
                              data-key={item.id}
                              onClick={openLink}
                            >
                              <ListItemText>
                                <ListItemText >
                                  {item.name}
                                </ListItemText>

                              </ListItemText>
                              {!selectionMode && <IconButton>
                                <RemoveIcon
                                  data-tag={item.id}
                                  onClick={removeOption}
                                ></RemoveIcon>
                              </IconButton>}
                            </ListItem>
                          );
                        }
                      })}
                  </List>
                </Collapse>
              </Grid>
            );
          })}
      </List>
    </>
  );

}


export default CategoryOptionsListByType;
