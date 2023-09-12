'use client';
import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useTender = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [tenders, setTenders] = useState<any[]>([]);

  useEffect(() => {
    getAllTenders();
  }, []);

  const createTender = async (
    submissionDate: string,
    requirements: string,
    title: string
  ) => {
    try {
      const response = await fetch('http://localhost:3000/api/tenders', {
        method: 'POST',
        //@ts-ignore
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          submission_deadline: submissionDate,
          requirements,
          is_published: false,
          title,
        }),
      });

      if (!response.ok) {
        throw new Error('Creating tender failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Creating the tender request failed');
    }
  };

  const getAllTenders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/tenders', {
        method: 'GET',
        //@ts-ignore
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error('Fetching request failed');
      }

      const data = await response.json();
      setLoading(false);
      setTenders(data);

      return data;
    } catch (error) {
      setLoading(false);
      throw new Error('Fetching the tender failed');
    }
  };

  const updateTender = async (id: string, data: any) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/tenders/${id}`, {
        method: 'POST',
        //@ts-ignore
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          id,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Updating request failed');
      }

      const res = await response.json();
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      throw new Error('Updating the procurement request failed');
    }
  };

  return {
    createTender,
    getAllTenders,
    updateTender,
    tenders,
    loading,
    setTenders,
  };
};

export default useTender;
