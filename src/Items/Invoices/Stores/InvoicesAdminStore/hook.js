import { QueryList } from 'justshare-shared'
import { BaseService } from "mapps-io-base-plugins/src/Common/index.js"
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { INVOICES_ACTIONS } from './actions'

export const invoiceAdminActions = (dispatch) => {
    const actionsLocal = {
        getInvoices: ({ page, size, status, asAdmin, month, year }) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Invoice.GET_USER_INVOICES, {
                    status: status,
                    page: page,
                    size: size,
                    asAdmin,
                    month,
                    year
                })
            );
        },
        clean: () => {
            return dispatch({
                type: INVOICES_ACTIONS.CLEAN,
                dto: {}
            });
        },
    }
    return {
        ...actionsLocal,
    }
}
export const getInvoiceById = (invoice_id) => store => {
    if (invoice_id) {
        const invoice = store.InvoicesAdminReducer.invoices.find((el) => {
            return el.id == invoice_id;
        });
        return invoice
    }
    return null;
}
export function useInvoiceAdminStoreFacade() {
    const dispatch = useDispatch()
    const [invoiceId, setInvoiceId] = useState()

    const { invoicesAdminReducer } = useSelector(state => ({
        invoicesAdminReducer: state.InvoicesAdminReducer
    }));
    const getInvoiceByIdReducer = useSelector(getInvoiceById(invoiceId));

    const getInvoices = useCallback(
        invoiceAdminActions(dispatch).getInvoices,
        [dispatch]
    )
    const clean = useCallback(
        invoiceAdminActions(dispatch).clean,
        [dispatch]
    )

    return {
        selectors: {
            invoicesAdminReducer,
            getInvoiceByIdReducer
        },
        actions: {
            getInvoices,
            clean
        },
        state: {
            invoiceId
        },
        hooks: {
            setInvoiceId
        },
        functions: {

        }
    }

}