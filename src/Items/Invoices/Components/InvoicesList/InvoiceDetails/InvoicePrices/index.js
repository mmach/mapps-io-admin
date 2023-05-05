import {
  TableIcons
} from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { invoiceItemsColumnsDefinition } from "../../../../Config";
import { useInvoiceAdminStoreFacade } from "../../../../Stores/hooks";


export function InvoicePrices(props) {

  const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
  const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)

  const inoviceAdminStoreFacade = useInvoiceAdminStoreFacade()
  const { translate, getLabel } = useDictionaryStoreFacade();

  return (
    <>
      <TextBox
        label={translate(getLabel, "Number")}
        value={props.number_string}
        disabled={true}
        field="number"
        validation={[]}
      />
      <TextBox
        label={translate(getLabel, "Price")}
        value={props.price + " " + props.currency}
        disabled={true}
        field="name"
        validation={[]}
      />
      <TextBox
        label={translate(getLabel, "Price Net")}
        value={props.price_net + " " + props.currency}
        disabled={true}
        field="name"
        validation={[]}
      />
       <TextBox
        label={translate(getLabel, "Price Tax")}
        value={props.price_tax + " " + props.currency}
        disabled={true}
        field="name"
        validation={[]}
      />
      <TextBox
        label={translate(getLabel, "Due Date")}
        value={props.dueDate}
        disabled={true}
        field="dueDate"
        validation={[]}
      />
    </>

  );

}
