import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001/api";

interface AdminStats {
  totalUsers: number;
  totalPortfolios: number;
  deployedPortfolios: number;
  totalProfiles: number;
  totalAITemplates: number;
  tierCounts: Record<string, number>;
  recentUsers: Array<{ email: string; displayName: string; tier: string; createdAt: string }>;
}

interface AdminUser {
  _id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  tier: string;
  portfolioCount: number;
  hasProfile: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const { getToken } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    const token = await getToken();
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setStats(await res.json());
  }, [getToken]);

  const fetchUsers = useCallback(async (searchVal: string, pageNum: number) => {
    const token = await getToken();
    const params = new URLSearchParams({ page: String(pageNum), limit: "20" });
    if (searchVal) params.set("search", searchVal);
    const res = await fetch(`${API_BASE}/admin/users?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    }
  }, [getToken]);

  useEffect(() => {
    Promise.all([fetchStats(), fetchUsers("", 1)])
      .finally(() => setLoading(false));
  }, [fetchStats, fetchUsers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchUsers(search, 1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchUsers]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchUsers(search, newPage);
  };

  const handleTierToggle = async (userId: string, currentTier: string) => {
    const newTier = currentTier === "free" ? "pro" : "free";
    const token = await getToken();
    const res = await fetch(`${API_BASE}/admin/users/${userId}/tier`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tier: newTier }),
    });
    if (res.ok) {
      setUsers((prev) => prev.map((u) => u._id === userId ? { ...u, tier: newTier } : u));
      fetchStats();
      toast.success(`User set to ${newTier}`);
    } else {
      toast.error("Failed to update tier");
    }
  };

  if (loading) {
    return (
      <div className="py-8 pb-[60px] flex-1 animate-fade-in">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="skeleton h-8 w-48 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-cream border border-border rounded-xl p-6">
                <div className="skeleton h-8 w-16 mb-2" />
                <div className="skeleton h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 pb-[60px] flex-1 animate-fade-in">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="text-[28px] font-semibold tracking-[-0.5px] mb-8">Admin Dashboard</h1>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive hover:shadow-card-hover transition-all duration-200">
              <div className="text-3xl font-semibold text-charcoal tracking-tight">{stats.totalUsers}</div>
              <div className="text-sm text-muted">Total Users</div>
            </div>
            <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive hover:shadow-card-hover transition-all duration-200">
              <div className="text-3xl font-semibold text-charcoal tracking-tight">{stats.totalPortfolios}</div>
              <div className="text-sm text-muted">Portfolios</div>
            </div>
            <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive hover:shadow-card-hover transition-all duration-200">
              <div className="text-3xl font-semibold text-charcoal tracking-tight">{stats.deployedPortfolios}</div>
              <div className="text-sm text-muted">Deployed</div>
            </div>
            <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive hover:shadow-card-hover transition-all duration-200">
              <div className="text-3xl font-semibold text-charcoal tracking-tight">{stats.totalAITemplates}</div>
              <div className="text-sm text-muted">AI Templates</div>
            </div>
          </div>
        )}

        {/* Tier breakdown */}
        {stats && (
          <div className="flex gap-4 mb-8">
            <div className="bg-cream border border-border rounded-xl px-5 py-3">
              <span className="text-sm text-muted">Free: </span>
              <span className="font-semibold text-charcoal">{stats.tierCounts.free || 0}</span>
            </div>
            <div className="bg-cream border border-border rounded-xl px-5 py-3">
              <span className="text-sm text-muted">Pro: </span>
              <span className="font-semibold text-charcoal">{stats.tierCounts.pro || 0}</span>
            </div>
          </div>
        )}

        {/* Users table */}
        <div className="bg-cream border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by email or name..."
              className="w-full px-3 py-2 border border-border rounded-sm bg-cream text-charcoal placeholder:text-muted focus:outline-none focus:border-blue-500/50 focus:ring-3 focus:ring-blue-500/15 transition-[box-shadow,border-color]"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs text-muted font-medium px-4 py-3 uppercase tracking-wider">User</th>
                  <th className="text-left text-xs text-muted font-medium px-4 py-3 uppercase tracking-wider">Tier</th>
                  <th className="text-left text-xs text-muted font-medium px-4 py-3 uppercase tracking-wider">Portfolios</th>
                  <th className="text-left text-xs text-muted font-medium px-4 py-3 uppercase tracking-wider">Profile</th>
                  <th className="text-left text-xs text-muted font-medium px-4 py-3 uppercase tracking-wider">Joined</th>
                  <th className="text-right text-xs text-muted font-medium px-4 py-3 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-border last:border-0 hover:bg-charcoal/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {u.photoURL ? (
                          <img src={u.photoURL} alt="" className="w-7 h-7 rounded-full border border-border" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-charcoal text-cream-light flex items-center justify-center text-xs font-semibold">
                            {(u.displayName || u.email)[0].toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-charcoal">{u.displayName || "—"}</p>
                          <p className="text-xs text-muted">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        u.tier === "pro"
                          ? "bg-charcoal text-cream-light"
                          : "bg-charcoal/[0.04] text-muted"
                      }`}>
                        {u.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-charcoal">{u.portfolioCount}</td>
                    <td className="px-4 py-3">
                      {u.hasProfile ? (
                        <span className="text-xs text-success">✓</span>
                      ) : (
                        <span className="text-xs text-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        className="text-xs px-3 py-1.5 border border-border-interactive text-charcoal rounded-sm hover:opacity-80 active:scale-[0.98] transition-all"
                        onClick={() => handleTierToggle(u._id, u.tier)}
                      >
                        {u.tier === "free" ? "Set Pro" : "Set Free"}
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <span className="text-sm text-muted">Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <button
                  className="text-xs px-3 py-1.5 border border-border-interactive text-charcoal rounded-sm hover:opacity-80 disabled:opacity-40 transition-all"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                >
                  Previous
                </button>
                <button
                  className="text-xs px-3 py-1.5 border border-border-interactive text-charcoal rounded-sm hover:opacity-80 disabled:opacity-40 transition-all"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
