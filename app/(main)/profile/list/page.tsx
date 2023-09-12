'use client';
import useAuth from '@/layout/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import React, { useEffect, useRef, useState } from 'react';
import type { Demo } from '../../../../types/types';

function List() {
  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>({});
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const router = useRouter();
  const dt = useRef(null);

  const getUsers = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'GET',
      //@ts-ignore
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
    setLoading(false);
    setUsers(response);
  };

  const formatDate = (value: Date) => {
    return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  const clearFilter = () => {
    initFilters();
  };

  const initFilters = () => {
    setFilters({
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
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
    });
    setGlobalFilterValue('');
  };

  useEffect(() => {
    getUsers();
    initFilters();
  }, []);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let _filters = { ...filters };
    (_filters['global'] as any).value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
          <i className="pi pi-search"></i>
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Global Search"
            className="w-full"
          />
        </span>
        <Button
          type="button"
          icon="pi pi-user-plus"
          label="Add New"
          className="w-full sm:w-auto flex-order-0 sm:flex-order-1"
          outlined
          onClick={() => router.push('/profile/create')}
        />
      </div>
    );
  };

  const nameBodyTemplate = (customer: Demo.Customer) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {customer.name}
      </>
    );
  };

  const dateBodyTemplate = (customer: Demo.Customer) => {
    return formatDate(customer.date);
  };

  const activityBodyTemplate = (customer: Demo.Customer) => {
    return (
      <ProgressBar
        value={customer.activity}
        showValue={false}
        style={{ height: '.5rem' }}
      />
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        ref={dt}
        value={users}
        header={header}
        paginator
        rows={10}
        responsiveLayout="scroll"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        rowsPerPageOptions={[10, 25, 50]}
        filters={filters}
        loading={loading}
      >
        <Column
          field="firstName"
          header="First Name"
          sortable
          headerClassName="white-space-nowrap"
          style={{ width: '25%' }}
        ></Column>
        <Column
          field="lastName"
          header="Last Name"
          sortable
          headerClassName="white-space-nowrap"
          style={{ width: '25%' }}
        ></Column>
        <Column
          field="createdAt"
          header="Join Date"
          sortable
          // body={dateBodyTemplate}
          headerClassName="white-space-nowrap"
          style={{ width: '25%' }}
        ></Column>
        <Column
          field="role"
          header="Role"
          headerClassName="white-space-nowrap"
          style={{ width: '25%' }}
          sortable
        ></Column>
      </DataTable>
    </div>
  );
}

export default List;

