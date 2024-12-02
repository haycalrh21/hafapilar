"use client";

import React, { useEffect, useState } from "react";

import "jspdf-autotable";

import { FaEye } from "react-icons/fa";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { formatToWIB } from "@/lib/DateFormat";

import { Skeleton } from "@/components/ui/skeleton";
import { Country, Partner } from "@/app/types/types";
import { FaSortAlphaUp } from "react-icons/fa";
import { getDataPartner } from "@/services/partner/api";
import { CountryResponse } from "@/app/types/candidate";

declare global {
  interface jsPDF {
    autoTable(options: any): void;
  }
}

export default function AdminPartnerPage() {
  const [country, setCountry] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Default urutan ascending
  const [totalPages, setTotalPages] = useState(0); // Nambahin state totalPages

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    country: "",
    companyName: "",
    time: "",
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

  const limit = 5; // Limit data per halaman (disesuaikan sesuai kebutuhan)

  const {
    dataPartner,
    isLoading,
    error,
    totalCount: apiTotalCount,
    totalPages: apiTotalPages,
  } = getDataPartner(currentPage, limit);

  const filteredData = dataPartner.filter((partner) => {
    return (
      (filters.name === "" ||
        partner?.fullname
          ?.toLowerCase()
          .includes(filters.name.toLowerCase())) &&
      (filters.email === "" || partner.email) &&
      (filters.country === "" || partner.country === filters.country) &&
      (filters.companyName === "" ||
        partner?.companyName
          ?.toLowerCase()
          .includes(filters.companyName.toLowerCase())) &&
      (filters.time === "" || partner?.createdAt?.includes(filters.time))
    );
  });
  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  // Fungsi untuk meng-handle paginasi setelah filter
  const paginateData = (data: any[], page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return data.slice(startIndex, endIndex);
  };

  // Ambil data yang sudah dipaginate
  const paginatedData = paginateData(filteredData, currentPage, limit);

  useEffect(() => {
    if (apiTotalCount) {
      // Hitung totalPages berdasarkan totalCount dan limit
      const calculatedTotalPages = Math.ceil(apiTotalCount / limit);
      setTotalPages(calculatedTotalPages);
      setTotalCount(apiTotalCount);
      fetchCountry();
    }
  }, [apiTotalCount, limit]);

  const paginatedFilteredData = paginateData(filteredData, currentPage, limit);

  const sortedData = paginatedFilteredData.sort((a, b) => {
    if (a.fullname < b.fullname) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a.fullname > b.fullname) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const fetchCountry = async (): Promise<CountryResponse> => {
    const response = await fetch(`${api_url}/country`);
    if (!response.ok) {
      throw new Error("Failed to fetch candidates");
    }
    const data = await response.json();
    setCountry(data);
    return data;
  };
  // Mengecek apakah halaman berikutnya ada
  const checkNextPageAvailability = () => {
    return currentPage < totalPages; // Cek apakah halaman selanjutnya ada
  };

  const handlePagination = (page: number) => {
    // Cek apakah halaman valid dan masih dalam batas totalPages
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Set currentPage ke halaman yang dipilih
      window.history.pushState({}, "", `?page=${page}`); // Update URL di browser
    } else {
    }
  };

  return (
    <div className="p-0">
      {/* Filter Section */}
      <div className="mb-8">
        <div>
          <p className="text-xl font-semibold">Review All Partner</p>
          <p className="text-sm text-gray-600">Latest list by apply date</p>
        </div>

        <div className="mt-6">
          <form className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {/* Name Field */}
              <div className="flex flex-col w-auto">
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
                  className="w-36 border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col w-auto">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={filters.email}
                  onChange={handleFilterChange}
                  className="w-36 border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Company Name Field */}
              <div className="flex flex-col w-auto">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={filters.companyName}
                  onChange={handleFilterChange}
                  className="w-36 border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Country Field */}
              <div className="flex flex-col w-auto">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  name="country"
                  id="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  className="w-40 border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Country</option>
                  {country.map((item: any) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Field */}
              <div className="flex flex-col w-auto">
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
                  className="w-40 border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Search Button */}
              <div className="flex flex-col w-auto">
                <button
                  type="button"
                  className="bg-hijau p-2 mt-6 h-10 rounded-lg flex items-center text-white"
                >
                  <CiSearch className="text-white mx-2" />
                </button>
              </div>

              {/* Clear Button */}
              <div className="flex flex-col w-auto">
                <button
                  type="button"
                  className="bg-white p-2 mt-6 h-10 rounded-lg border-2 border-hijau flex items-center text-black"
                  onClick={() =>
                    setFilters({
                      name: "",
                      email: "",
                      companyName: "",
                      country: "",
                      time: "",
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
                <p>Name</p>
              </th>
              <th className="px-4 py-2 text-left">Email</th>
              {/* <th className="px-4 py-2 text-left">WhatsApp</th> */}
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Company Name</th>
              {/* <th className="px-4 py-2 text-left">Company Website</th> */}
              <th className="px-4 py-2 text-left">Time</th>
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
                </tr>
              ))
            ) : paginatedFilteredData.length === 0 ? (
              <tr>
                <td className="text-center py-4" colSpan={7}>
                  Data Not Found
                </td>
              </tr>
            ) : (
              paginatedFilteredData.map((partner) => (
                <tr key={partner.id}>
                  <td className="px-4 py-2 break-words">
                    {partner.fullname}&nbsp;
                    {partner.lastname}
                  </td>
                  <td className="px-4 py-2">{partner.email}</td>
                  {/* <td className="px-4 py-2">{partner.whatsapp}</td> */}
                  <td className="px-4 py-2">{partner.country}</td>
                  <td className="px-4 py-2">{partner.companyName}</td>
                  {/* <td className="px-4 py-2">{partner.companyWebsite}</td> */}
                  <td className="px-4 py-2">
                    {formatToWIB(partner.createdAt)}
                  </td>

                  <td className="mx-auto px-10">
                    <Sheet>
                      <SheetTrigger>
                        <FaEye />
                      </SheetTrigger>
                      <SheetContent className="bg-white">
                        <div className="p-4 text-left">
                          <h1 className="text-xl font-bold">Partner Detail</h1>
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
                                  {partner.fullname}
                                </div>
                              </div>
                              <div className="w-1/2 pl-2">
                                <div className="text-[14px] text-departement">
                                  Last name
                                </div>
                                <div className="text-[16px]">
                                  {partner.lastname}
                                </div>
                              </div>
                            </div>

                            {/* Date of Birth & Gender */}

                            {/* Passport ID */}

                            {/* Email & WhatsApp */}
                            <div className="flex justify-between">
                              <div className="w-1/2 pr-2">
                                <div className="text-[14px] text-departement ">
                                  Email
                                </div>
                                <div className="text-[16px] break-words">
                                  {partner.email}
                                </div>
                              </div>
                              <div className="w-1/2 pl-2">
                                <div className="text-[14px] text-departement">
                                  WhatsApp
                                </div>
                                <div className="text-[16px] ">
                                  {partner.whatsapp}
                                </div>
                              </div>
                            </div>

                            {/* company name & company website */}
                            <div className="flex justify-between">
                              <div className="w-1/2 pr-2">
                                <div className="text-[14px] text-departement ">
                                  Company Name
                                </div>
                                <div className="text-[16px] break-words">
                                  {partner.companyName}
                                </div>
                              </div>
                              <div className="w-1/2 pl-2">
                                <div className="text-[14px] text-departement">
                                  Company Website
                                </div>
                                <div className="text-[16px] ">
                                  {partner.companyWebsite}
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
