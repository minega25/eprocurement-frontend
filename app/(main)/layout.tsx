'use client';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Layout from '../../layout/layout';

import useAuth from '@/layout/hooks/useAuth';
import { ProgressSpinner } from 'primereact/progressspinner';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'E-Proc',
  description:
    'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
  robots: { index: false, follow: false },
  viewport: { initialScale: 1, width: 'device-width' },
  openGraph: {
    type: 'website',
    title: 'PrimeReact APOLLO-REACT',
    url: 'https://www.primefaces.org/apollo-react',
    description:
      'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
    images: ['https://www.primefaces.org/static/social/apollo-react.png'],
    ttl: 604800,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, []);

  if (!token) {
    return (
      <div className="card flex justify-content-center h-screen w-screen">
        <ProgressSpinner color="#10b981" />
      </div>
    );
  }

  return <Layout>{children}</Layout>;
}

