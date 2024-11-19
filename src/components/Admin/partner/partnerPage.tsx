"use client";

import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

declare global {
  interface jsPDF {
    autoTable(options: any): void;
  }
}

// Partner interface without the missing fields like gender, dateOfBirth, etc.
interface Partner {
  id: number;
  fullname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  country: string;
  message: string;
}

export default function AdminPartnerPage({ data }: { data: Partner[] }) {
  // Fungsi Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Partner List", 10, 10);
    (doc as any).autoTable({
      head: [
        [
          "No",
          "Full Name",
          "Last Name",
          "Email",
          "Phone",
          "Country",
          "Message",
        ],
      ],
      body: data.map((partner, index) => [
        index + 1,
        partner.fullname,
        partner.lastname,
        partner.email,
        partner.phoneNumber,
        partner.country,
        partner.message,
      ]),
    });
    doc.save("partners.pdf");
  };

  // Fungsi Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((partner, index) => ({
        No: index + 1,
        "Full Name": partner.fullname,
        "Last Name": partner.lastname,
        Email: partner.email,
        Phone: partner.phoneNumber,
        Country: partner.country,
        Message: partner.message,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Partners");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "partners.xlsx");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Partner Page</h1>

      {/* Tombol Export PDF dan Excel */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Export PDF
        </button>
        <button
          onClick={exportExcel}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Export Excel
        </button>
      </div>

      {/* Tabel Data Partner */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Last Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {data.map((partner, index) => (
              <tr key={partner.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{partner.fullname}</td>
                <td className="px-4 py-2">{partner.lastname}</td>
                <td className="px-4 py-2">{partner.email}</td>
                <td className="px-4 py-2">{partner.phoneNumber}</td>
                <td className="px-4 py-2">{partner.country}</td>
                <td className="px-4 py-2">{partner.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
