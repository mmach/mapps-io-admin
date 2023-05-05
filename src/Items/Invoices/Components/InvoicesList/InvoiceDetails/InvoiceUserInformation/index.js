import {
  TableIcons
} from "mapps-io-base-plugins/src/Common/Components/index.js";
import { useDictionaryStoreFacade } from "mapps-io-base-plugins/src/Common/index.js";
import { MappsComponents } from "mapps-io-base-plugins/src/index.js";
import React from "react";
import { invoiceItemsColumnsDefinition } from "../../../../Config";
import { useInvoiceAdminStoreFacade } from "../../../../Stores/hooks";


export function InvoiceUserInformation(props) {

  const MappsSections = React.useMemo(MappsComponents().Layouts.Sections.V1)
  const TextBox = React.useMemo(MappsComponents().FormComponents.TextBox)

  const inoviceAdminStoreFacade = useInvoiceAdminStoreFacade()
  const { translate, getLabel } = useDictionaryStoreFacade();

  return (
    <>
      <TextBox
        label={translate(getLabel, "User Name")}
        value={props.user_name}
        disabled={true}
        field="user_name"
        validation={[]}
      />
      <TextBox
        label={translate(getLabel, "Name")}
        value={props.name}
        disabled={true}
        field="name"
        validation={[]}
      />
      <TextBox
        label={translate(getLabel, "City")}
        value={props.city}
        disabled={true}
        field="city"
        validation={[]}
      />
      <TextBox
        label={translate(getLabel, "Zip Code")}
        value={props.zip_code}
        disabled={true}
        field="zip_code"
        validation={[]}
      />
      <TextBox
        label={translate(getLabel, "Address")}
        value={props.address}
        disabled={true}
        field="address"
        validation={[]}
      />
      <TextBox
        label={translate(getLabel, "Tax number")}
        value={props.tax_number}
        disabled={true}
        field="tax_number"
        validation={[]}
      />
      <TextBox
        label={translate(getLabel, "Bank Account")}
        value={props.bank_account_nr}
        disabled={true}
        field="name"
        validation={[]}
      />
    </>

  );

}
