"use client";

import React, { useEffect, useState } from "react";

import "jspdf-autotable";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { formatToWIB } from "@/lib/DateFormat";
import { IoCheckmarkOutline, IoCopyOutline } from "react-icons/io5";
import { departments } from "@/components/Candidate/Card";
import { Skeleton } from "@/components/ui/skeleton";

import { FaSortAlphaUp } from "react-icons/fa";
import { getDataCandidate } from "@/services/candidate/api";

declare global {
  interface jsPDF {
    autoTable(options: any): void;
  }
}

export default function AdminCandidatePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Default urutan ascending
  const [totalPages, setTotalPages] = useState(0); // Nambahin state totalPages

  const [isCopied, setIsCopied] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    department: "",
    position: "",
    time: "",
    status: "",
  });
  // Fungsi untuk meng-handle perubahan input
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const handleCopy = (passportNumber: string) => {
    navigator.clipboard
      .writeText(passportNumber)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset setelah 2 detik
      })
      .catch((err) => console.error("Gagal menyalin: ", err));
  };
  const limit = 5;

  const {
    dataUser,
    isLoading,
    error,
    totalCount: apiTotalCount,
    totalPages: apiTotalPages,
  } = getDataCandidate(currentPage, limit);

  useEffect(() => {
    if (apiTotalCount) {
      // Hitung totalPages berdasarkan totalCount dan limit
      const calculatedTotalPages = Math.ceil(apiTotalCount / limit);
      setTotalPages(calculatedTotalPages);
      setTotalCount(apiTotalCount);
      // console.log("Total Pages dihitung:", calculatedTotalPages); // Log hasil perhitungan
    }
  }, [apiTotalCount, limit]);

  // Filter data berdasarkan filter yang diberikan

  const filteredData = dataUser.filter((candidate) => {
    return (
      (filters.name === "" ||
        candidate?.fullname
          ?.toLowerCase()
          .includes(filters.name.toLowerCase())) &&
      (filters.gender === "" || candidate.gender === filters.gender) &&
      (filters.department === "" ||
        candidate.department === filters.department) &&
      (filters.position === "" || candidate.position === filters.position) &&
      (filters.time === "" || candidate?.createdAt?.includes(filters.time)) &&
      (filters.status === "" || candidate.status === filters.status)
    );
  });

  // Fungsi untuk paginate data berdasarkan halaman dan limit
  const paginateData = (data: any[], page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return data.slice(startIndex, endIndex);
  };

  // Ambil data yang sudah dipaginate
  const paginatedData = paginateData(filteredData, currentPage, limit);

  const sortedData = paginatedData.sort((a, b) => {
    if (a.fullname < b.fullname) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a.fullname > b.fullname) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });
  const checkNextPageAvailability = () => {
    return currentPage < totalPages; // Cek apakah halaman selanjutnya ada
  };

  const handlePagination = (page: number) => {
    // Cek apakah halaman valid dan masih dalam batas totalPages
    if (page >= 1 && page <= totalPages) {
      console.log("Halaman valid, pindah ke halaman:", page);
      setCurrentPage(page); // Set currentPage ke halaman yang dipilih
      window.history.pushState({}, "", `?page=${page}`); // Update URL di browser
    } else {
    }
  };

  // const TotalInterview = data.filter(
  //   (item) => item.status === "Interview"
  // ).length;

  // const TotalAccepted = data.filter(
  //   (item) => item.status === "Accepted"
  // ).length;
  // const TotalRejected = data.filter(
  //   (item) => item?.candidates?.status === "Rejected"
  // ).length;

  // Get selected department details
  const selectedDepartment = departments.find(
    (dept) => dept.title === filters.department
  );

  return (
    <div className="p-0">
      <div className="mb-20 mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* Applied Section */}
          <div className="w-full sm:w-1/2 lg:w-1/4 text-center mb-4 sm:mb-0">
            <div className="flex justify-center gap-2">
              <p className="text-hijau text-[18px]">{totalCount}</p>
              <p className="text-textlayout text-[18px]">Candidates</p>
            </div>
            <div>
              <p className="text-[20px] font-bold">All Applied</p>
            </div>
          </div>

          {/* Interviewed Section */}
          <div className="w-full sm:w-1/2 lg:w-1/4 text-center mb-4 sm:mb-0">
            <div className="flex justify-center gap-2">
              <p className="text-hijau text-[18px]">{totalCount}</p>
              <p className="text-textlayout text-[18px]">Candidates</p>
            </div>
            <div>
              <p className="text-[20px] font-bold">Interviewed</p>
            </div>
          </div>

          {/* Accepted Section */}
          <div className="w-full sm:w-1/2 lg:w-1/4 text-center mb-4 sm:mb-0">
            <div className="flex justify-center gap-2">
              <p className="text-hijau text-[18px]">{totalCount}</p>
              <p className="text-textlayout text-[18px]">Candidates</p>
            </div>
            <div>
              <p className="text-[20px] font-bold">Accepted</p>
            </div>
          </div>

          {/* Rejected Section */}
          <div className="w-full sm:w-1/2 lg:w-1/4 text-center mb-4 sm:mb-0">
            <div className="flex justify-center gap-2">
              <p className="text-hijau text-[18px]">{totalCount}</p>
              <p className="text-textlayout text-[18px]">Candidates</p>
            </div>
            <div>
              <p className="text-[20px] font-bold">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Export PDF dan Excel */}
      {/* <div className="mb-4 flex gap-4">
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
      </div> */}

      {/* Filter Section */}
      <div className="mb-8">
        <div>
          <p className="text-xl font-semibold">Review All Candidates</p>
          <p className="text-sm text-gray-600">Latest list by apply date</p>
        </div>

        <div className="mt-6">
          <form className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col w-full sm:w-auto">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col w-full sm:w-auto">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                  className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <div className="flex flex-col w-full sm:w-auto">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  name="department"
                  id="department"
                  value={filters.department}
                  onChange={handleFilterChange}
                  className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Department</option>
                  {departments.map((item: any) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-full sm:w-auto">
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700"
                >
                  Position
                </label>
                <select
                  name="position"
                  id="position"
                  value={filters.position}
                  onChange={handleFilterChange}
                  className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={!filters.department} // Disable if no department is selected
                >
                  <option value="">Select Position</option>
                  {selectedDepartment?.positions.split(", ").map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-full sm:w-auto">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time
                </label>
                <input
                  type="date"
                  name="time"
                  id="time"
                  value={filters.time}
                  onChange={handleFilterChange}
                  className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col w-full sm:w-auto">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                </select>
              </div>
              <div className="flex flex-col w-full sm:w-auto">
                <div className="text-white">test</div>
                <button
                  type="button"
                  className="bg-hijau p-2 h-10 rounded-lg flex items-center text-white"
                >
                  <CiSearch className="text-white  mx-2" />
                </button>
              </div>
              <div className="flex flex-col w-full sm:w-auto">
                <div className="text-white">test</div>

                <button
                  type="button"
                  className="bg-white p-2 h-10 rounded-lg border-2 border-hijau flex items-center text-black"
                  onClick={() =>
                    setFilters({
                      name: "",
                      gender: "",
                      department: "",
                      position: "",
                      time: "",
                      status: "",
                    })
                  }
                >
                  <IoMdClose className="mx-2" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Tabel Data Kandidat */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-tableName">
              <th className="px-4 py-2 text-left flex items-center gap-4">
                <FaSortAlphaUp
                  onClick={handleSort}
                  className="cursor-pointer"
                />
                <p> Name</p>
              </th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // While data is being fetched, show loading indicators
              Array.from({ length: limit }).map((_, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-500" />
                  </td>
                  <td className="px-4 py-2">
                    <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-500" />
                  </td>
                  <td className="px-4 py-2">
                    <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-500" />
                  </td>
                  <td className="px-4 py-2">
                    <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-500" />
                  </td>
                  <td className="px-4 py-2">
                    <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-500" />
                  </td>
                  <td className="px-4 py-2">
                    <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-500" />
                  </td>
                  <td className="px-4 py-2">
                    <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-500" />
                  </td>
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td className="text-center py-4" colSpan={7}>
                  Data Not Found
                </td>
              </tr>
            ) : (
              paginatedData.map((candidate: any) => (
                <tr key={candidate.id}>
                  <td className="px-4 py-2">
                    {candidate.fullname}&nbsp;
                    {candidate.lastname}
                  </td>
                  <td className="px-4 py-2">{candidate.gender}</td>
                  <td className="px-4 py-2">{candidate.department}</td>
                  <td className="px-4 py-2">{candidate.position}</td>
                  <td className="px-4 py-2">
                    {formatToWIB(candidate.createdAt)}
                  </td>
                  <td className="px-4 py-2">
                    {/* Status */}
                    <p
                      className={`
      text-center rounded-lg 
      ${
        candidate.status === "Applied"
          ? "bg-[#FF9500]/20 text-[#FF9500]"
          : candidate.status === "Interview"
          ? "bg-[#0F4C5C]/20 text-[#0F4C5C]"
          : candidate.status === "Accepted"
          ? "bg-[#649A41]/20 text-[#649A41]"
          : candidate.status === "Rejected"
          ? "bg-[#9E9E9E]/20 text-[#9E9E9E]"
          : "" // Optional: if status is empty or unknown
      }
    `}
                    >
                      • {candidate.status}
                    </p>
                  </td>

                  <td className="mx-auto px-10">
                    <Sheet>
                      <SheetTrigger>
                        <FaEye />
                      </SheetTrigger>
                      <SheetContent className="bg-white">
                        <div className="p-4 text-left">
                          <h1 className="text-xl font-bold">
                            Candidate Detail
                          </h1>
                        </div>
                        <hr className="border-gray-300 w-full" />
                        <div className="p-4">
                          {/* Section Wrapper */}
                          <div className="space-y-4">
                            {/* Full Name & Last Name */}
                            <div className="flex justify-between">
                              <div className="w-1/2 pr-2">
                                <div className="text-[14px] text-departement">
                                  Full name
                                </div>
                                <div className="text-[16px]">
                                  {candidate.fullname}
                                </div>
                              </div>
                              <div className="w-1/2 pl-2">
                                <div className="text-[14px] text-departement">
                                  Last name
                                </div>
                                <div className="text-[16px]">
                                  {candidate.lastname}
                                </div>
                              </div>
                            </div>

                            {/* Date of Birth & Gender */}
                            <div className="flex justify-between">
                              <div className="w-1/2 pr-2">
                                <div className="text-[14px] text-departement">
                                  Date of birth
                                </div>
                                <div className="text-[16px]">
                                  {candidate.dateOfBirth}
                                </div>
                              </div>
                              <div className="w-1/2 pl-2">
                                <div className="text-[14px] text-departement">
                                  Gender
                                </div>
                                <div className="text-[16px]">
                                  {candidate.gender}
                                </div>
                              </div>
                            </div>

                            {/* Passport ID */}
                            <div className="flex justify-between">
                              <div className="w-1/2 pr-2">
                                <div className="text-[14px] text-departement">
                                  Passport ID
                                </div>
                                <div className="text-[16px] flex items-center space-x-4">
                                  {candidate.passportNumber}
                                  <button
                                    onClick={() =>
                                      handleCopy(candidate.passportNumber)
                                    }
                                    className="ml-4"
                                  >
                                    {isCopied ? (
                                      <IoCheckmarkOutline className="text-green-500" />
                                    ) : (
                                      <IoCopyOutline />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Email & WhatsApp */}
                            <div className="flex justify-between">
                              <div className="w-1/2 pr-2">
                                <div className="text-[14px] text-departement ">
                                  Email
                                </div>
                                <div className="text-[16px] break-words">
                                  {candidate.email}
                                </div>
                              </div>
                              <div className="w-1/2 pl-2">
                                <div className="text-[14px] text-departement">
                                  WhatsApp
                                </div>
                                <div className="text-[16px] ">
                                  {candidate.phoneNumber}
                                </div>
                              </div>
                            </div>

                            {/* CV & Certificate */}
                            <div className="flex justify-between">
                              <div className="w-1/2 pr-2">
                                <div className="text-[14px] text-departement">
                                  CV
                                </div>
                                <div className="text-[16px] flex items-center space-x-2">
                                  {/* Nama file certificate tanpa link */}
                                  <span>{candidate.fullname}.pdf</span>

                                  {/* Link hanya pada icon */}
                                  <Link
                                    href={
                                      isLoading ? "" : candidate.certificate
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <FaEye className=" cursor-pointer" />
                                  </Link>
                                </div>
                              </div>
                              <div className="w-1/2 pl-2">
                                <div className="text-[14px] text-departement">
                                  Certificate
                                </div>
                                <div className="text-[16px] flex items-center space-x-2">
                                  {/* Nama file certificate tanpa link */}
                                  <span>{candidate.fullname}.pdf</span>

                                  {/* Link hanya pada icon */}
                                  <Link
                                    href={
                                      isLoading ? "" : candidate.certificate
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <FaEye className=" cursor-pointer" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                        </div>
                      </SheetContent>
                    </Sheet>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className=" md:left-20 w-full bg-white z-10">
          <div className="flex items-center justify-center space-x-4 py-4">
            {/* Tombol Previous */}
            <button
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-hijau text-white rounded-lg hover:bg-cardtesti disabled:bg-gray-300"
            >
              Previous
            </button>

            {/* Halaman aktif */}
            <span className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg">
              {currentPage}
            </span>

            {/* Tombol Next */}
            <button
              onClick={() => handlePagination(currentPage + 1)}
              disabled={!checkNextPageAvailability()}
              className="px-4 py-2 bg-hijau text-white rounded-lg hover:bg-cardtesti disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
