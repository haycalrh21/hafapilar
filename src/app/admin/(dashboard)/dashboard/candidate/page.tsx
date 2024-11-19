"use server";
import AdminCandidatePage from "@/components/Admin/candidate/candidatePage";

export default async function page() {
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${api_url}/candidate`);

    if (!res.ok) {
      throw new Error("Failed to fetch candidates");
    }

    const data = await res.json();

    return <AdminCandidatePage data={data} />;
  } catch (error) {
    console.error(error); // log error for debugging
    return <div>Failed to load</div>;
  }
}

export const dynamic = "force-dynamic";
