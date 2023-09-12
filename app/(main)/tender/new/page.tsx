'use client';
import useProcRequest from '@/layout/hooks/useProcRequest';
import { Button } from 'primereact/button';
import { Chips } from 'primereact/chips';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';

function ProcurementRequest() {
  const toast = useRef(null);
  const { createRequest } = useProcRequest();
  const [itemsNeeded, setItemsNeeded] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [preferredVendor, setPreferredVendor] = useState<string[]>([]);

  const showToast = (
    toast: any,
    {
      severity = 'info',
      summary = 'Success',
      message = 'Message Content',
      life = 3000,
    }
  ) => {
    toast.current.show({ severity, summary, detail: message, life });
  };

  const handleCreateProcRequest = async (e: any) => {
    e.preventDefault();
    if (itemsNeeded.length === 0) {
      alert('Please enter at least one item');
      return;
    }
    if (quantities.length === 0) {
      alert('Please enter at least one quantity');
      return;
    }
    if (budget === 0) {
      alert('Please enter a budget');
      return;
    }
    if (preferredVendor.length === 0) {
      alert('Please enter at least one preferred vendor');
      return;
    }

    const response = await createRequest(
      preferredVendor,
      budget,
      quantities,
      itemsNeeded
    );

    if (!response) {
      showToast(toast, {
        severity: 'error',
        summary: 'Error',
        message: 'Creating request failed',
      });
      return;
    } else {
      showToast(toast, {
        severity: 'success',
        summary: 'Success',
        message: 'Creating request successful',
      });
    }
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <span className="text-900 text-xl font-bold mb-4 block">
        Create Procurement Request
      </span>
      <div className="grid">
        <div className="col-8 lg:col-8">
          <form
            className="grid formgrid p-fluid"
            onSubmit={handleCreateProcRequest}
          >
            <div className="field mb-4 col-12">
              <label htmlFor="nickname" className="font-medium text-900">
                Items Needed
              </label>
              <Chips
                value={itemsNeeded}
                onChange={(e) => setItemsNeeded(e?.value || '')}
                separator=","
                placeholder='Enter items separated by a semi colon eg: "item1, item2"'
              />
            </div>
            <div className="field mb-4 col-12">
              <label htmlFor="avatar" className="font-medium text-900">
                Quantities
              </label>
              <Chips
                value={quantities}
                onChange={(e) => setQuantities(e?.value || '')}
                separator=","
                placeholder='Enter quantities separated by a semi colon eg: "item1, item2"'
              />
            </div>
            <div className="field mb-4 col-12">
              <label htmlFor="bio" className="font-medium text-900">
                Budget
              </label>
              <InputNumber
                inputId="currency-rw"
                value={budget}
                onValueChange={(e) => setBudget(e.value)}
                mode="currency"
                currency="RWF"
                locale="en-US"
              />
            </div>
            <div className="field mb-4 col-12 md:col-12">
              <label htmlFor="email" className="font-medium text-900">
                Preferred Vendor
              </label>
              <Chips
                value={preferredVendor}
                onChange={(e) => setPreferredVendor(e?.value || '')}
                separator=","
                placeholder='Enter Preferred Vendor separated by a semi colon eg: "item1, item2"'
              />
            </div>
            <div className="col-12">
              <Button
                label="Create Request"
                className="w-auto mt-3"
                type="submit"
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProcurementRequest;
