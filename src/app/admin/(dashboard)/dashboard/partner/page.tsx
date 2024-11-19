import AdminPartnerPage from "@/components/Admin/partner/partnerPage";

export default async function page() {
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${api_url}/partner`);

    if (!res.ok) {
      throw new Error("Failed to fetch candidates");
    }

    const data = await res.json();
    console.log(data);
    return <AdminPartnerPage data={data} />;
  } catch (error) {
    return <div>Failed to load</div>;
  }
}

export const dynamic = "force-dynamic";
