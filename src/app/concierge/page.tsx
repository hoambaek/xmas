import type { Metadata } from "next";
import { ConciergeContent } from "./concierge-content";

export const metadata: Metadata = {
  title: "AI 컨시어지 서비스 제안서",
  description: "호텔을 위한 AI 컨시어지 서비스 제안서 다운로드 페이지",
};

export default function ConciergePage() {
  return <ConciergeContent />;
}

