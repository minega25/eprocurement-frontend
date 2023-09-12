'use client';
import useAuth from '@/layout/hooks/useAuth';
import { showToast } from '@/layout/utils';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import { useEffect, useRef, useState } from 'react';

function ProfileCreate() {
  const toast = useRef(null);
  const { token } = useAuth();
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<any[]>([]);

  useEffect(() => {
    setRoles([
      { name: 'Admin', code: 'admin' },
      { name: 'Vendor', code: 'vendor' },
      { name: 'Procurement officer', code: 'proc_officer' },
      { name: 'Staff', code: 'staff' },
    ]);
  }, []);

  const handleRegisterUser = async (e: any) => {
    e.preventDefault();
    const { email, firstName, lastName } = e.target;
    const response = await fetch('http://localhost:3000/api/register_staff', {
      method: 'POST',
      //@ts-ignore
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        email: email.value,
        //@ts-ignore
        role: selectedRole.code,
        firstName: firstName.value,
        lastName: lastName.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => data);
    console.log(response);
    if (response.email) {
      showToast(toast, {
        message: 'User created successfully',
        severity: 'success',
        life: 3000,
      });
    } else {
      showToast(toast, {
        summary: 'Error',
        message: response.message,
        severity: 'error',
        life: 3000,
      });
    }
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <span className="text-900 text-xl font-bold mb-4 block">Create User</span>
      <div className="grid">
        <div className="col-12 lg:col-12">
          <form className="grid formgrid p-fluid" onSubmit={handleRegisterUser}>
            <div className="field mb-4 col-12 lg:col-6">
              <label htmlFor="firstName" className="font-medium text-900">
                First Name
              </label>
              <InputText id="firstName" type="text" />
            </div>
            <div className="field mb-4 col-12 lg:col-6">
              <label htmlFor="lastName" className="font-medium text-900">
                Last Name
              </label>
              <InputText id="lastName" type="text" />
            </div>
            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="email" className="font-medium text-900">
                Email
              </label>
              <InputText id="email" type="text" />
            </div>
            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="country" className="font-medium text-900">
                Role
              </label>
              <Dropdown
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.value)}
                options={roles}
                optionLabel="name"
                placeholder="Select a Role"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="col-12">
              <Button
                label="Create User"
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

export default ProfileCreate;

