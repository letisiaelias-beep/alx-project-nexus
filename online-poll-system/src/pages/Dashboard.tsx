import React from "react";
import { useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const StatTile: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-semibold mt-2">{value}</div>
  </div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { polls } = useAppSelector((s: RootState) => s.polls);

  const totalPolls = polls?.length ?? 0;
  const active = polls?.filter((p: any) => p.status === "active").length ?? 0;
  const totalVotes = polls?.reduce((acc: number, p: any) => acc + (p.totalVotes ?? 0), 0) ?? 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Polls Dashboard</h1>
        <button
          onClick={() => navigate("/create")}
          className="bg-teal-600 text-white px-4 py-2 rounded shadow-sm"
        >
          + Create New
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatTile title="Total Polls" value={totalPolls} />
        <StatTile title="Active" value={active} />
        <StatTile title="Total Votes" value={totalVotes} />
      </div>

      <section className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-medium mb-4">Recent Polls</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs text-gray-500 uppercase">
              <tr>
                <th className="p-2">Question</th>
                <th className="p-2">Status</th>
                <th className="p-2">Votes</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {polls?.map((p: any) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.title}</td>
                  <td className="p-2 capitalize">{p.status}</td>
                  <td className="p-2">{p.totalVotes ?? 0}</td>
                  <td className="p-2">
                    <button onClick={() => navigate(`/poll/${p.id}`)} className="mr-2 text-sm bg-slate-100 px-3 py-1 rounded">View</button>
                    <button onClick={() => navigate(`/create?edit=${p.id}`)} className="mr-2 text-sm bg-slate-100 px-3 py-1 rounded">Edit</button>
                    <button className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded">Close</button>
                  </td>
                </tr>
              )) || (
                <tr>
                  <td className="p-2" colSpan={4}>No polls yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
