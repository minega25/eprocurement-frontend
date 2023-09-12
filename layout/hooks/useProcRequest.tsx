'use client';
import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useProcRequest = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    getAllRequests();
  }, []);

  const createRequest = async (
    preferredVendor: string[],
    budget: number,
    quantities: string[],
    itemsNeeded: string[]
  ) => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/procurement_requests',
        {
          method: 'POST',
          //@ts-ignore
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
          body: JSON.stringify({
            preferred_vendor: JSON.stringify(preferredVendor),
            budget,
            quantities: JSON.stringify(quantities),
            items_needed: JSON.stringify(itemsNeeded),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Creating request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Creating the procurement request failed');
    }
  };

  const getAllRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://localhost:3000/api/procurement_requests',
        {
          method: 'GET',
          //@ts-ignore
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Fetching request failed');
      }

      const data = await response.json();
      setLoading(false);
      setRequests(data);

      return data;
    } catch (error) {
      setLoading(false);
      throw new Error('Fetching the procurement request failed');
    }
  };

  const updateRequest = async (id: string, data: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/procurement_requests/${id}`,
        {
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
        }
      );

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
    createRequest,
    getAllRequests,
    updateRequest,
    requests,
    loading,
    setRequests,
  };
};

export default useProcRequest;
