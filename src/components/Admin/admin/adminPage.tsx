"use client";
import { useState } from "react";
import ModalCreate from "./modal/CreateModal";
import { Skeleton } from "@/components/ui/skeleton";
import { getDataAdmin } from "@/services/admin/api";

export default function AdminPageAdmin() {
  // Query untuk ambil data user
  const { dataUser, isLoading, error, refetch } = getDataAdmin();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    // console.log("Closing modal...");
    setIsOpen(false);
  };
  if (error) {
    return <div>data not found</div>;
  }
  return (
    <div className="p-4">
      {/* <div className="mb-4"> */}
      {/* <h1 className="text-2xl font-bold text-gray-800">Admin Page</h1> */}
      {/* </div> */}
      <div>
        <button
          className="bg-hijau text-textpartner rounded-2xl py-2 px-4 my-2 mb-4"
          onClick={openModal}
        >
          Create User
        </button>
        <ModalCreate
          fetchdata={refetch} // Passing refetch function dari useQuery
          onClose={closeModal}
          isOpen={isOpen}
        />
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <table className="min-w-full">
            <thead className="bg-tableName">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-500" />
                  </td>
                  <td className="px-4 py-2">
                    <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full">
            <thead className="bg-tableName">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(dataUser) ? (
                dataUser.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 text-left">{item.email}</td>
                    <td className="px-4 py-2 text-left">{item.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-4 py-2 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
