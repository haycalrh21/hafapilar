"use client";

import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Link from "next/link";

declare global {
  interface jsPDF {
    autoTable(options: any): void;
  }
}

interface Candidate {
  id: number;
  fullname: string;
  lastname: string;
  gender: string;
  dateOfBirth: string;
  passportNumber: string;
  email: string;
  phoneNumber: string;
  department: string;
  position: string;
  cv: string;
  certificate: string;
  cvUrl: string;
  certificateUrl: string;
}

export default function AdminCandidatePage({ data }: { data: Candidate[] }) {
  // Fungsi Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Candidate List", 10, 10);
    (doc as any).autoTable({
      head: [
        [
          "No",
          "Full Name",
          "Last Name",
          "Gender",
          "Date of Birth",
          "Email",
          "Phone",
          "Department",
          "Position",
        ],
      ],
      body: data.map((candidate, index) => [
        index + 1,
        candidate.fullname,
        candidate.lastname,
        candidate.gender,
        candidate.dateOfBirth,
        candidate.email,
        candidate.phoneNumber,
        candidate.department,
        candidate.position,
      ]),
    });
    doc.save("candidates.pdf");
  };

  // Fungsi Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((candidate, index) => ({
        No: index + 1,
        "Full Name": candidate.fullname,
        "Last Name": candidate.lastname,
        Gender: candidate.gender,
        "Date of Birth": candidate.dateOfBirth,
        Email: candidate.email,
        Phone: candidate.phoneNumber,
        Department: candidate.department,
        Position: candidate.position,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "candidates.xlsx");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Candidate Page</h1>

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

      {/* Tabel Data Kandidat */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Last Name</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Date of Birth</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">CV</th>
              <th className="px-4 py-2 text-left">Certificate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((candidate, index) => (
              <tr key={candidate.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{candidate.fullname}</td>
                <td className="px-4 py-2">{candidate.lastname}</td>
                <td className="px-4 py-2">{candidate.gender}</td>
                <td className="px-4 py-2">{candidate.dateOfBirth}</td>
                <td className="px-4 py-2">{candidate.email}</td>
                <td className="px-4 py-2">{candidate.phoneNumber}</td>
                <td className="px-4 py-2">{candidate.department}</td>
                <td className="px-4 py-2">{candidate.position}</td>
                <td className="px-4 py-2">
                  <Link
                    href={candidate.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View CV
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={candidate.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
