/*
    ./client/components/App.jsx
*/

import { Grid, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import { useDialogStoreFacade, useLayoutContainerContextFacade, useSnackbarStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SortableTreeWithoutDndContext as SortableTree } from 'mapps-io-ext-react-sortable-tree';
import "mapps-io-ext-react-sortable-tree/style.css"; // This only needs to be imported once in your app
import { useCategoryAdminStoreFacade } from "../../../Stores/hooks";
import { CategoryLeafPreview } from "./CategoryLeafPreview";
import "./style.scss";

export function CategoryTree(props) {
  const MappsGroup = React.useMemo(MappsComponents().Layouts.Groups.V1)
  const BodyLoader = React.useMemo(MappsComponents().BodyLoader)
  const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)
  React.useEffect(() => {
    if (window.__isReactDndBackendSetUp) {
      window.__isReactDndBackendSetUp = false
    }
  }, [])
  const { state: {
  }, functions: {
    setTitle,
    setIcon
  } } = useLayoutContainerContextFacade()
  const snackbarsStoreFacade = useSnackbarStoreFacade()
  const { actions: {
    openDialog, closeDialog
  } } = useDialogStoreFacade()

  const { selectors: {
    categoriesAdminReducer
  }, actions: {
    getAllCategories,
    setCategoryParent,
    deleteCategory
  }
  } = useCategoryAdminStoreFacade()
  const [treeData, setTreeData] = React.useState([{ title: "src/", category: " ", children: [{ title: "index.js", category: " " }] }])
  const [loading, setLoading] = React.useState(false)
  const [initLoaded, setInitLoaded] = React.useState(false)

  const [search, setSearch] = React.useState('')
  const navigate = useNavigate()

  React.useEffect(() => {
    setTitle('Category Tree Manager')
    setIcon(<AccountTreeIcon />)
  }, [])

  React.useEffect(() => {
    if (categoriesAdminReducer.categories.length == 0) {
      setInitLoaded(false)
      getAllCategories().then(succ => {
        setInitLoaded(true)
      })
    }
    else {
      setInitLoaded(true)
    }
  }, [])

  React.useEffect(() => {
    setLoading(true)
    loadData();
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [categoriesAdminReducer.categories])

  function loadData() {
    const verified = categoriesAdminReducer.categories.filter((item) => {
      return item.status == 1;
    });
    const notVerified = categoriesAdminReducer.categories.filter((item) => {
      return item.status == 0;
    });
    const resultVer = listToTree(
      [...verified.map(i => ({ ...i }))]
    );
    const resultNotVer = listToTree(
      [...notVerified.map(i => ({ ...i }))]
    );
    const result = [
      {
        title: "_VERIFIED",
        category: "_VERIFIED",
        status: 1,
        forEvent: true,
        forSell: true,
        forThing: true,
        expanded:
          verified.filter((item) => {
            return item.expanded == true;
          }).length > 0
            ? true
            : false,
        children: resultVer
      },
      {
        title: "_NOT_VERIFIED",
        category: "_NOT_VERIFIED",
        forEvent: true,
        forSell: true,
        forThing: true,
        status: 0,
        expanded:
          notVerified.filter((item) => {
            return item.expanded == true;
          }).length > 0
            ? true
            : false,
        children: resultNotVer
      }
    ];
    setTreeData([...result.map(i => ({ ...i }))])

  }

  function listToTree(list) {
    const map = {};
    let node;
    const roots = [];
    let i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].category_child_id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
      try {
        node = list[i];
        if (node.category_parent_id !== null) {
          list[map[node.category_parent_id]].children.push(node);
        } else {
          roots.push(node);
        }
      } catch (exception) { }
    }
    return roots;
  }

  function setParentFromNode(parent) {
    const dto = {
      id: parent.id,
      status: parent.status,
      CategoryHierarchy: {
        category_parent_id: parent.parentId
      }
    };
    setLoading(true)

    setCategoryParent(dto).then(() => {
      //loadData();
      snackbarsStoreFacade.actions.setSuccessGlobal('Move Category to new Category Parent Successed')
    });
  }

  function removeCategory(event) {
    const id = event.currentTarget.dataset.tag;
    event.preventDefault();
    openDialog(
      true,
      <React.Fragment>
        <DialogTitle id="alert-dialog-slide-title">Remove Category</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure that you want to remove this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              const curentCategory = categoriesAdminReducer.categories.find(i => i.id == id);
              await deleteCategory(id)
              await closeDialog();
              if (curentCategory.isActive) {
                navigate('/mapps/categories/categories')
              }
            }}
            color="primary"
          >
            YES
          </Button>
          <Button
            onClick={() => {
              closeDialog();
            }}
            color="primary"
          >
            NO
          </Button>
        </DialogActions>
      </React.Fragment>

    );
  }

  function searchHandler(event) {
    const search = event.target.value;
    setSearch(String(search).toUpperCase())
  }

  return (
    <Grid container>
      <TextBox
        label={"Filter"}
        isRequired={true}
        value={search}
        onChange={searchHandler}
        field="search"
        validation={[]}
      />
      <MappsGroup title="Category Tree">

        <Grid style={{ display: 'block', width: '100%', height: '100%' }}>
          {(loading || !initLoaded) && <BodyLoader text=" " size="25px" />}
          {!loading && initLoaded && <SortableTree
            rowHeight={55}
            style={{ height: "800px" }}
            treeData={treeData}
            onChange={(treeData) => {
              setTreeData([...treeData])
            }}
            onMoveNode={(element) => {
              setParentFromNode({
                id: element.node.id,
                parentId: element.nextParentNode.id,
                status: element.nextParentNode.status
              });
              return element;
            }}
            searchQuery={search}
            onlyExpandSearchedNodes={true}
            canDrag={(node) => {
              if (
                ["_SPAM", "_NOT_VERIFIED", "_VERIFIED", "_TO_DO", "_ROOT"].includes(
                  node.node.category
                )
              ) {
                return false;
              }
              return true;
            }}
            canDrop={(node) => {
              if (
                (node.nextParent.forEvent == node.node.forEvent ||
                  node.nextParent.forEvent == true) &&
                (node.nextParent.forSell == node.node.forSell || node.nextParent.forSell == true) &&
                (node.nextParent.forThing == node.node.forThing || node.nextParent.forThing == true)
              ) {
                return true;
              }
              return false;
            }}
            generateNodeProps={(item) => {
              item.node.title =
                item.node.category && item.node.category.startsWith("_") ? (
                  <Grid style={{ paddingLeft: 20 }}>{String(item.node.category).toUpperCase()}</Grid>
                ) : (<Grid key={item.node.category_child_id}>
                  <Grid style={{ display: 'none' }}>{String(item.node.category).toUpperCase()}</Grid>

                  <CategoryLeafPreview node={{ ...item.node }} />
                  {/** <ButtonLoader
                    className={item.node.isActive == true ? 'selected' : ''}
                    variant={'clean'}
                    size="small"
                    onClick={() => {
                      navigate(`/mapps/categories/categories/edit/${item.node.category_child_id}`)
                    }}
                    value={String(item.node.category).toUpperCase()}
                  >
                  </ButtonLoader> */}
                </Grid>
                );
              item.buttons = [];
              item.buttons.push(
                <IconButton size={"small"}
                  onClick={() => {
                    navigate(`/mapps/categories/categories/add/${item.node.status}/${item.node.category_child_id}`)
                  }}>
                  <AddIcon />
                </IconButton>
              );
              if (
                !["_SPAM", "_NOT_VERIFIED", "_VERIFIED", "_TO_DO", "_ROOT"].includes(
                  item.node.category
                )
              ) {
                item.buttons.push(
                  <IconButton size={"small"}
                    data-tag={item.node.category_child_id}
                    data-name={item.node.category}
                    onClick={removeCategory}>
                    <CloseIcon />
                  </IconButton>
                );
              }
              return item;
            }}
          />}
        </Grid>
      </MappsGroup>
    </Grid>
  );

}



