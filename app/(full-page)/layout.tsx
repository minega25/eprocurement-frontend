import { Metadata } from 'next';
import React from 'react';

interface FullPageLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'E-Proc',
  description:
    'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
};

export default function FullPageLayout({ children }: FullPageLayoutProps) {
  return (
    <React.Fragment>
      {children}
      {/* <AppConfig minimal /> */}
    </React.Fragment>
  );
}

