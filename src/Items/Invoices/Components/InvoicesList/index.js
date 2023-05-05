import { Grid } from "@material-ui/core";
import { QueryList } from "justshare-shared";
import {
  DayPickerInputComponent, PdfViewer,
  TableIcons
} from "mapps-io-base-plugins/src/Common/Components/index.js";
import { BaseService, useCategoriesStoreFacade, useDictionaryStoreFacade, useDrawerStoreFacade, useModalStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { useIuaStoreFacade } from "mapps-io-base-plugins/src/Elements/Iua/Stores/hooks";
import { MappsComponents, mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { connect } from "react-redux";
import { invoiceColumnDefinition } from "../../Config";
import { useInvoiceAdminStoreFacade } from "../../Stores/hooks";


function InvoicesList(props) {

  const [isLoading, setLoading] = React.useState(true)
  const [date, setDate] = React.useState(new Date())
  const [invoicesList, setInvoicesList] = React.useState([])

  const iuaStoreFacade = useIuaStoreFacade({});
  const modalStoreFacade = useModalStoreFacade();
  const drawerStoreFacade = useDrawerStoreFacade();
  const categoriesStoreFacade = useCategoriesStoreFacade();
  const MaterialTable = React.useMemo(MappsComponents().Layouts.Table.V2)
  const PreviewIUA = React.useMemo(MappsComponents().IUA.PREVIEW.DEFAULT)

  const inoviceAdminStoreFacade = useInvoiceAdminStoreFacade()
  const { translate, getLabel } = useDictionaryStoreFacade();

  React.useEffect(() => {
    return () => inoviceAdminStoreFacade.actions.clean()
  }, [])

  React.useEffect(() => {
    setLoading(true)
    inoviceAdminStoreFacade.actions.getInvoices({
      year: date.getFullYear(),
      month: date.getMonth(),
      asAdmin: true
    }).then(result => {
      const items = result.data.filter(i =>
        !iuaStoreFacade.selectors.iuaReducer.iuaRelations[i.iua.id]
      ).map(i => {
        return i.iua.id
      });
      setLoading(false)

      if (items.length > 0) {
        return iuaStoreFacade.actions.getIuaList(items)
      }
    }).then(succ => {
      if (succ && succ.data) {
        const categories = [...new Set(succ.data.map(i => i.category_id))]
        categoriesStoreFacade.hooks.setCategoryIds(categories)
      }
    })
  }, [date])

  React.useEffect(() => {
    setInvoicesList([...inoviceAdminStoreFacade.selectors.invoicesAdminReducer.invoices])
    console.log(inoviceAdminStoreFacade.selectors.invoicesAdminReducer.invoices)

  }, [inoviceAdminStoreFacade.selectors.invoicesAdminReducer.invoices])

  function onDateChange(event) {
    const date = event;
    window.scrollTo(0, 0);
    setDate(date)
  }

  function clickItem(event, rowData) {
    drawerStoreFacade.actions.openDrawer(true, <Grid container style={{ width: 1100 }}>
      <PreviewIUA
        iua_id={rowData.iua.id}
        cmsMode={'DEFAULT'}
        device='desktop'
      />
    </Grid>, 'right')
  }

  function openInvoice(event, rowData) {
    const id = rowData.id;
    const invoice = invoicesList.filter((i) => i.id == id)[0];
    const obj = {
      pdf_id: invoice.blob.blob_id,
      subject: translate(getLabel,
        "SEND_MAIL_SUBJECT",
        invoice.number_string,
        invoice.month + "/" + invoice.year
      ),
      body: `${global.env.BLOB_URL}/blob/${invoice.blob.blob_id}.pdf`
    };
    modalStoreFacade.actions.openModal(true, <PdfViewer {...obj}></PdfViewer>);
  }


  return (
    <Grid container style={{ justifyContent: 'center' }}>
      <MaterialTable
        isLoading={isLoading}
        icons={TableIcons}
        freeActions={
          [
            <DayPickerInputComponent
              variant="month"
              label={"Month"}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              value={date}
              onChange={onDateChange}
            ></DayPickerInputComponent>
          ]
        }
        {...invoiceColumnDefinition({})}
        actions={
          [
            rowData => ({
              icon: TableIcons.OpenIn,
              label: 'Open IUA',
              onClick: clickItem,
            }),
            rowData => ({
              icon: TableIcons.PictureAsPdf,
              label: 'Open Invoice',
              onClick: openInvoice,
            })
          ]}
        data={invoicesList
          .sort((a, b) => {
            return new Date(b.createdAt) > new Date(a.createdAt);
          })
          .map((i) => {
            return {
              ...i,
              info: { number: i.number },
            };
          })}
        title="Invoices List"
      />
    </Grid>
  );

}


export default InvoicesList;
