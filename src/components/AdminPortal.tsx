import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  RefreshCw, 
  Trash2, 
  Download, 
  Lock, 
  AlertCircle
} from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuoteRecord {
  id: number;
  reference_id: string;
  full_name: string;
  company_name: string;
  email: string | null;
  phone: string;
  service: string;
  commuter_count: string | null;
  message: string | null;
  status: 'NEW' | 'CONTACTED' | 'QUOTED' | 'CLOSED';
  notes: string | null;
  created_at: string;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>(() => sessionStorage.getItem('svt_admin_token') || '');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, quoted: 0 });

  // Verify stored session on modal open
  useEffect(() => {
    if (isOpen && token) {
      fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setIsAuthenticated(true);
          } else {
            sessionStorage.removeItem('svt_admin_token');
            setToken('');
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          sessionStorage.removeItem('svt_admin_token');
          setToken('');
          setIsAuthenticated(false);
        });
    }
  }, [isOpen, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passwordInput })
      });
      const data = await res.json();
      if (data.success && data.token) {
        sessionStorage.setItem('svt_admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        setPasswordInput('');
      } else {
        setAuthError(data.error || 'Invalid management passcode. Please try again.');
      }
    } catch {
      setAuthError('Connection error contacting authentication service.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('svt_admin_token');
    setToken('');
    setIsAuthenticated(false);
  };

  const fetchQuotes = async () => {
    setLoading(true);
    const currentToken = token || sessionStorage.getItem('svt_admin_token') || '';
    try {
      const url = new URL('/api/quotes', window.location.origin);
      if (statusFilter !== 'ALL') url.searchParams.append('status', statusFilter);
      if (searchTerm.trim()) url.searchParams.append('search', searchTerm.trim());

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setQuotes(data.quotes);
        }
      } else if (res.status === 401 || res.status === 403) {
        handleLogout();
        setAuthError('Session expired. Please log in again.');
      }

      const statsRes = await fetch('/api/stats', {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.stats);
      }
    } catch (err) {
      console.error('Error fetching admin quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchQuotes();
    }
  }, [isOpen, statusFilter, isAuthenticated]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    const currentToken = token || sessionStorage.getItem('svt_admin_token') || '';
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentToken}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchQuotes();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this inquiry record from SQLite database?')) return;
    const currentToken = token || sessionStorage.getItem('svt_admin_token') || '';
    try {
      const res = await fetch(`/api/quotes/${id}`, { 
        method: 'DELETE',
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      if (res.ok) {
        fetchQuotes();
      }
    } catch (err) {
      console.error('Failed to delete quote:', err);
    }
  };

  const exportCSV = () => {
    if (quotes.length === 0) return;
    const headers = ['Reference ID', 'Company', 'Contact Person', 'Phone', 'Email', 'Service', 'Headcount', 'Status', 'Date', 'Message'];
    const rows = quotes.map(q => [
      `"${q.reference_id}"`,
      `"${q.company_name}"`,
      `"${q.full_name}"`,
      `"${q.phone}"`,
      `"${q.email || ''}"`,
      `"${q.service}"`,
      `"${q.commuter_count || ''}"`,
      `"${q.status}"`,
      `"${q.created_at}"`,
      `"${(q.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SVT_Corporate_Inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      {/* If Not Authenticated, Show Clean Passcode Gate */}
      {!isAuthenticated ? (
        <div className="relative w-full max-w-sm bg-[#111827] border border-white/15 p-6 sm:p-8 rounded-2xl shadow-2xl text-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#F97316] mb-3">
            <Lock className="w-6 h-6 text-[#F97316]" />
          </div>

          <h3 className="text-lg font-bold text-white font-display">
            Administrator Authentication
          </h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Enter authorized management passcode to access client inquiries database.
          </p>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <input
                type="password"
                placeholder="Passcode: svtadmin2026 or svt2026"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 shadow-sm"
                autoFocus
              />
              {authError && (
                <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 text-xs font-bold rounded-xl shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white hover:brightness-110"
            >
              {isLoggingIn ? 'Verifying Credentials...' : 'Unlock Database Portal'}
            </button>
          </form>
        </div>
      ) : (
        /* Authenticated Clean Dark Dashboard */
        <div className="relative w-full max-w-6xl h-[90vh] bg-[#111827] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
          
          {/* Header Bar */}
          <div className="p-4 sm:p-5 bg-[#0B0F19] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[#F97316]">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-display">
                    Corporate Inquiries Database
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                    SQLite Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Tours &amp; Travels Operations Database
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={exportCSV}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-slate-200 font-semibold transition-colors cursor-pointer"
                title="Export all to CSV"
              >
                <Download className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={fetchQuotes}
                className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 transition-colors cursor-pointer"
                title="Refresh"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
                title="Log out from admin session"
              >
                Log Out
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close admin dashboard"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0E1524] border-b border-white/10">
            <div className="p-3 rounded-xl bg-[#162032] border border-white/5">
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Total Proposals</div>
              <div className="text-xl font-bold text-white font-display mt-0.5">{stats.total}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#162032] border border-white/5">
              <div className="text-[11px] text-emerald-400 font-semibold uppercase">New Inquiries</div>
              <div className="text-xl font-bold text-emerald-400 font-display mt-0.5">{stats.new}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#162032] border border-white/5">
              <div className="text-[11px] text-sky-400 font-semibold uppercase">Contacted</div>
              <div className="text-xl font-bold text-sky-400 font-display mt-0.5">{stats.contacted}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#162032] border border-white/5">
              <div className="text-[11px] text-orange-400 font-semibold uppercase">Quoted / Finalized</div>
              <div className="text-xl font-bold text-[#F97316] font-display mt-0.5">{stats.quoted}</div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="p-3 bg-[#111827] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              {['ALL', 'NEW', 'CONTACTED', 'QUOTED', 'CLOSED'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === st
                      ? 'bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white shadow-sm'
                      : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search reference, company, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchQuotes()}
                className="px-3 py-1 rounded-xl bg-[#0B0F19] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
              <button
                type="button"
                onClick={fetchQuotes}
                className="px-3 py-1 text-xs font-bold rounded-xl cursor-pointer bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white"
              >
                Search
              </button>
            </div>
          </div>

          {/* Records Table */}
          <div className="flex-1 overflow-auto bg-[#111827] p-4">
            {quotes.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-sm">
                No corporate quote records found for current criteria.
              </div>
            ) : (
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0B0F19] text-white font-semibold">
                    <th className="py-2.5 px-3">Reference</th>
                    <th className="py-2.5 px-3">Company &amp; Contact</th>
                    <th className="py-2.5 px-3">Phone &amp; Email</th>
                    <th className="py-2.5 px-3">Service &amp; Scale</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 font-mono font-semibold text-orange-400">
                        {q.reference_id}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white">{q.company_name}</div>
                        <div className="text-slate-400 text-[11px]">{q.full_name}</div>
                      </td>
                      <td className="py-3 px-3">
                        <a href={`tel:${q.phone}`} className="font-medium text-emerald-400 hover:underline">
                          {q.phone}
                        </a>
                        {q.email && <div className="text-slate-400 text-[11px]">{q.email}</div>}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-200">{q.service}</div>
                        {q.commuter_count && (
                          <div className="text-slate-400 text-[11px]">{q.commuter_count}</div>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={q.status}
                          onChange={(e) => handleStatusChange(q.id, e.target.value)}
                          className="px-2 py-1 rounded-lg bg-[#0B0F19] border border-white/15 text-xs font-semibold text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="QUOTED">QUOTED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                        {new Date(q.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(q.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
