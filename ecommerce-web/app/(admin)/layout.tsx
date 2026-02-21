import type { ReactNode } from 'react';
import { AdminLayoutShell } from '../../components/admin/admin-layout-shell';
import { QueryProvider } from '../../lib/providers/query-provider';
import { Toaster } from 'sonner';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <Toaster position="top-right" />
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </QueryProvider>
  );
}
