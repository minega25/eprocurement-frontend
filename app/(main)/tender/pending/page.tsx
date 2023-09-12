//@ts-nocheck
'use client';
import useProcRequest from '@/layout/hooks/useProcRequest';
import { showToast } from '@/layout/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Nullable } from 'primereact/ts-helpers';
import { useEffect, useRef, useState } from 'react';

const PendingProcurementRequests = () => {
  const toast = useRef(null);
  const { requests, loading, updateRequest, setRequests } = useProcRequest();
  const pendingRequests = requests.filter((request) => !request.is_active);
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [displayConfirmation, setDisplayConfirmation] = useState();
  const [loadingApprove, setLoadingApprove] = useState();

  const onGlobalFilterChange1 = (e: { target: { value: any } }) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1['global'].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const approveRequests = async () => {
    setDisplayConfirmation(false);
    setLoadingApprove(true);
    await Promise.all(
      selectedRequests.map(async ({ id }) => {
        return await updateRequest(id, {
          is_active: true,
        });
      })
    );

    setRequests(
      requests.filter((u) => {
        return !selectedRequests.find((s) => s.id === u.id);
      })
    );
    setLoadingApprove(false);
  };

  const confirmationDialogFooter = (
    <>
      <Button
        type="button"
        label="No"
        icon="pi pi-times"
        onClick={() => setDisplayConfirmation(false)}
        className="p-button-text"
      />
      <Button
        type="button"
        label="Yes"
        icon="pi pi-check"
        onClick={() => {
          approveRequests();
          showToast(toast, {
            severity: 'success',
            message: 'Requests approved successfully',
          });
        }}
        className="p-button-text"
        autoFocus
      />
    </>
  );

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      'country.name': {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue1('');
  };

  const priceBodyTemplate = (rowData: { Price: number | bigint }) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'RWF',
    }).format(rowData.budget);
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Search requests"
          />
        </span>
        {selectedRequests.length > 0 && (
          <span>
            <Button
              label="Approve"
              icon="pi pi-check"
              className="p-button-primary"
              onClick={() => setDisplayConfirmation(true)}
            />
            <Dialog
              header="Confirmation"
              visible={displayConfirmation}
              onHide={() => setDisplayConfirmation(false)}
              style={{ width: '350px' }}
              modal
              footer={confirmationDialogFooter}
            >
              <div className="flex align-items-center justify-content-center">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: '2rem' }}
                />
                <span>Are you sure you want to proceed?</span>
              </div>
            </Dialog>
          </span>
        )}
      </div>
    );
  };

  useEffect(() => {
    initFilters1();
  }, []);

  const header1 = renderHeader1();

  const cellEditor = (options: any) => {
    if (options.field === 'budget') return numberEditor(options, true);
    else return textEditor(options);
  };

  const textEditor = (options: {
    value: string | undefined;
    editorCallback: (arg0: string) => void;
  }) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const numberEditor = (
    options: {
      value: number | null | undefined;
      editorCallback: (arg0: Nullable<number | null>) => void;
    },
    isCurrency: boolean
  ) => {
    const priceOptions = {
      mode: 'currency',
      currency: 'RWF',
      locale: 'en-US',
    };
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        {...(isCurrency ? priceOptions : {})}
      />
    );
  };

  const chipBodyTemplate = (values) => {
    const arr = JSON.parse(values);
    return (
      <div>
        {arr.map((item) => (
          <Chip className="m-2 min-w-max" label={item} key={item} />
        ))}
      </div>
    );
  };

  const onCellEditComplete = (e: {
    rowData: any;
    newValue: any;
    field: any;
    originalEvent: any;
    newRowData: any;
  }) => {
    let { rowData, newValue, field, originalEvent: event, newRowData } = e;
    if (rowData[field] === newValue) {
      return;
    }
  };

  return (
    <div>
      <div className="col-12">
        <Toast ref={toast} />

        <div className="card">
          <h5>All Pending Procurement Requests</h5>
          <DataTable
            value={pendingRequests}
            stripedRows
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="id"
            filters={filters1}
            loading={loading}
            emptyMessage="No pending procurement requests found."
            header={header1}
            editMode="cell"
            selectionMode="multiple"
            selection={selectedRequests}
            onSelectionChange={(e) => setSelectedRequests(e.value)}
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
            <Column sortable field="id" header="id" />
            <Column
              sortable
              field="user_id"
              header="Requester"
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              field="items_needed"
              header="Items needed"
              body={(rowdata) => chipBodyTemplate(rowdata.items_needed)}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              field="quantities"
              header="Quantities"
              body={(rowdata) => chipBodyTemplate(rowdata.quantities)}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              sortable
              field="budget"
              header="Budget"
              dataType="numeric"
              body={priceBodyTemplate}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              header="Preferred vendors"
              field="preferred_vendor"
              body={(rowdata) => chipBodyTemplate(rowdata.preferred_vendor)}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              header="Active"
              field="is_active"
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default PendingProcurementRequests;
