import React, { useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import type { RootState } from "../../store/store";
import type { Poll } from "../../features/polls/pollsSlice";
import { useNavigate } from "react-router-dom";
import { updatePoll } from "../../features/polls/pollsSlice";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const StatTile: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-bold mt-2">{value}</div>
  </div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { polls } = useAppSelector((s: RootState) => s.polls);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "closed" | "draft">("all");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Derived stats
  const total = polls?.length ?? 0;
  const active = polls?.filter((p) => p.status === "active").length ?? 0;
  const closed = polls?.filter((p) => p.status === "closed").length ?? 0;
  const totalVotes = polls?.reduce((acc, p) => acc + (p.totalVotes ?? 0), 0) ?? 0;

  // Filtered & searched list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (polls ?? [])
      .filter((p) => (statusFilter === "all" ? true : p.status === statusFilter))
      .filter((p) => (q ? (p.title || "").toLowerCase().includes(q) || String(p.id).includes(q) : true))
      .sort((a, b) => (b.totalVotes ?? 0) - (a.totalVotes ?? 0));
  }, [polls, query, statusFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil((filtered?.length ?? 0) / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Chart data - top 5 by votes
  const chartData = useMemo(() => {
    return (polls ?? [])
      .map((p) => ({ name: (p.title || "Untitled").slice(0, 20), votes: p.totalVotes ?? 0 }))
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 5);
  }, [polls]);

  const handleView = (id: string) => navigate(`/polls/${id}`);
  const handleEdit = (id: string) => navigate(`/create?edit=${id}`);

  const handleToggleStatus = (p: Poll) => {
    const newStatus = p.status === "active" ? "closed" : "active";
    // optimistic update locally — replace with a thunk if you want server persistence
    dispatch(updatePoll({ ...p, status: newStatus }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">My Polls Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of polls, votes and recent activity</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate("/create")}
            className="bg-teal-600 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-teal-700"
          >
            + Create New
          </button>
        </div>
      </header>

      {/* KPI row + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatTile title="Total Polls" value={total} />
          <StatTile title="Active" value={active} />
          <StatTile title="Closed" value={closed} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">Top polls (by votes)</div>
            <div className="text-xs text-gray-400">{chartData.length} shown</div>
          </div>

          <div style={{ width: "100%", height: 160 }}>
            {chartData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#0f766e" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-sm text-gray-500">No poll data for chart</div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <input
          type="search"
          placeholder="Search by title or id..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-72 p-2 border rounded-md"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as any);
            setPage(1);
          }}
          className="p-2 border rounded-md"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
          <option value="draft">Draft</option>
        </select>

        <div className="ml-auto text-sm text-gray-500">Showing {filtered.length} result(s)</div>
      </div>

      {/* Table */}
      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
              <tr>
                <th className="p-3 text-left">Question</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-right">Votes</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length ? (
                pageItems.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium">{p.title}</div>
                      <div className="text-xs text-gray-400">ID: {p.id}</div>
                    </td>
                    <td className="p-3 capitalize">{p.status || "draft"}</td>
                    <td className="p-3 text-right">{p.totalVotes ?? 0}</td>
                    <td className="p-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleView(p.id)}
                          className="text-xs px-3 py-1 rounded bg-slate-100"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(p.id)}
                          className="text-xs px-3 py-1 rounded bg-slate-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleStatus(p)}
                          className={`text-xs px-3 py-1 rounded ${p.status === "active" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}
                        >
                          {p.status === "active" ? "Close" : "Open"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={4}>
                    No polls found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </div>

        <div className="inline-flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
