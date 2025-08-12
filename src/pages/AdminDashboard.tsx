
import React from "react";
import RequireAdmin from "@/components/RequireAdmin";

export default function AdminDashboard() {
  return (
    <RequireAdmin>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome, admin! Here you will manage users, games, and universities.
        </p>
      </div>
    </RequireAdmin>
  );
}
