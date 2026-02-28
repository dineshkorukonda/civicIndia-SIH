'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ContractorPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/login');
      } else if (user.role !== 'contractor') {
        router.push('/dashboard');
      } else {
        router.push('/contractor/dashboard');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading contractor dashboard...</p>
      </div>
    </div>
  );
}
