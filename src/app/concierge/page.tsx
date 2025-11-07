import type { Metadata } from "next";
import { ConciergeContent } from "./concierge-content";

export const metadata: Metadata = {
  title: "AI 컨시어지 서비스 제안서",
  description: "호텔을 위한 AI 컨시어지 서비스 제안서 다운로드 페이지",
  alternates: {
    canonical: "/concierge",
  },
  openGraph: {
    title: "AI Concierge Service Proposal",
    description: "Download the tailored AI concierge service proposals for your hotel in Korean and Thai.",
    url: "/concierge",
    type: "website",
  },
};

export default function ConciergePage() {
  return <ConciergeContent />;
}

