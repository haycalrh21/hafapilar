import dynamic from "next/dynamic";
import React from "react";
const CandidateForm = dynamic(
  () => import("@/components/Candidate/Form/CandidateForm"),
  { ssr: false }
);
export default function page() {
  return <CandidateForm />;
}
