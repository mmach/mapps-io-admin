import {
  TableIcons
} from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { invoiceItemsColumnsDefinition } from "../../../../Config";
import { useInvoiceAdminStoreFacade } from "../../../../Stores/hooks";


export function InvoiceItemsPreview(props) {

  const MaterialTable = React.useMemo(MappsComponents().Layouts.Table.V2)

  const inoviceAdminStoreFacade = useInvoiceAdminStoreFacade()
  const { translate, getLabel } = useDictionaryStoreFacade();

  const [invoice, setInvoice] = React.useState()

  React.useEffect(() => {
    inoviceAdminStoreFacade.hooks.setInvoiceId(props.id)
  }, [])

  React.useEffect(() => {
    if (inoviceAdminStoreFacade.selectors.getInvoiceByIdReducer) {
      setInvoice(inoviceAdminStoreFacade.selectors.getInvoiceByIdReducer)
    }
  }, [inoviceAdminStoreFacade.selectors.getInvoiceByIdReducer])
  return invoice && (

    <MaterialTable
      title={translate(getLabel, "Invoice Items")}
      icons={TableIcons}
      {...invoiceItemsColumnsDefinition({})}
      data={invoice.items || []}
    />


  );

}
