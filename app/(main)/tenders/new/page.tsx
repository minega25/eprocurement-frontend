//@ts-nocheck
'use client';
import useTender from '@/layout/hooks/useTender';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Editor } from 'primereact/editor';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import { useRef, useState } from 'react';

function CreateTender() {
  const toast = useRef(null);
  const { createTender } = useTender();
  const [title, setTitle] = useState('');
  const [requirements, setRequirements] = useState('');
  const [submissionDate, setSubmissionDate] = useState();

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

  const handleCreateTender = async (e: any) => {
    e.preventDefault();
    if (submissionDate.length === 0) {
      alert('Please enter at least one item');
      return;
    }
    if (requirements.length === 0) {
      alert('Please enter at least one requirement');
      return;
    }
    if (title.length === 0) {
      alert('Please enter a title');
      return;
    }

    const response = await createTender(
      submissionDate.toString(),
      requirements,
      title
    );

    if (!response) {
      showToast(toast, {
        severity: 'error',
        summary: 'Error',
        message: 'Creating Tender failed',
      });
      return;
    } else {
      showToast(toast, {
        severity: 'success',
        summary: 'Success',
        message: 'Creating Tender successful',
      });
    }
  };

  const onUpload = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <span className="text-900 text-xl font-bold mb-4 block">
        Create Tender
      </span>
      <div className="grid">
        <div className="col-8 lg:col-8">
          <form className="grid formgrid p-fluid" onSubmit={handleCreateTender}>
            <div className="field mb-4 col-12">
              <label htmlFor="nickname" className="font-medium text-900">
                Title
              </label>
              <InputText
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </div>
            <div className="field mb-4 col-12">
              <label htmlFor="avatar" className="font-medium text-900">
                Requirements
              </label>
              <Editor
                value={requirements}
                onTextChange={(e) => setRequirements(e.htmlValue)}
                style={{ height: '320px' }}
              />
            </div>
            <div className="field mb-4 col-12">
              <label htmlFor="bio" className="font-medium text-900">
                Submission Deadline
              </label>
              <Calendar
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.value)}
                showIcon
              />
            </div>
            <div className="field mb-4 col-12 md:col-12">
              <label htmlFor="email" className="font-medium text-900">
                Attachments
              </label>
              <FileUpload
                mode="basic"
                name="demo[]"
                url="/api/upload"
                accept="image/*"
                maxFileSize={1000000}
                onUpload={onUpload}
              />
            </div>
            <div className="col-12">
              <Button
                label="Create Tender"
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

export default CreateTender;
