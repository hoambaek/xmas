"use client";

import { motion } from "motion/react";

import { AuroraBackground } from "@/components/ui/aurora-background";

const DownloadIcon = () => (
  <svg className="mr-2 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1Z" />
    <path d="M5 15a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" />
  </svg>
);

const ActionLink = ({ href, label, disabled }: { href: string; label: string; disabled?: boolean }) => {
  if (disabled) {
    return (
      <span className="flex h-14 w-full items-center justify-center overflow-hidden rounded-lg bg-white/10 px-5 text-base font-bold leading-normal tracking-[0.015em] text-white/60 backdrop-blur transition-transform duration-300">
        <DownloadIcon />
        <span className="truncate">{label}</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-14 w-full items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-base font-bold leading-normal tracking-[0.015em] text-white transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-primary"
    >
      <DownloadIcon />
      <span className="truncate">{label}</span>
    </a>
  );
};

export function ConciergeContent() {
  return (
    <AuroraBackground
      containerClassName="flex min-h-screen flex-col items-center justify-between px-4 py-12 text-white"
      style={{ fontFamily: "'Space Grotesk', 'Noto Sans KR', sans-serif" }}
    >
      <div className="flex w-full flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="flex w-full max-w-4xl flex-col items-center gap-16 text-center"
        >
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-4xl font-black leading-tight tracking-[-0.033em] text-white md:text-5xl"
            >
              호텔을 위한 AI 컨시어지 서비스
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
              className="mt-4 text-lg text-white/80"
            >
              서비스 제안서를 다운로드하여 자세한 내용을 확인해보세요.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="flex w-full max-w-md flex-col gap-4 sm:flex-row"
          >
            <ActionLink href="https://qazhqhzz.gensparkspace.com/" label="한국어버전 제안서" />
            <ActionLink href="https://agergvhc.gensparkspace.com/" label="ข้อเสนอภาษาไทย" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_35px_-15px_rgba(20,80,240,0.45)] backdrop-blur"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            24시간 응답하는 디지털 컨시어지
          </motion.div>
        </motion.div>
      </div>

      <footer className="mt-12 flex items-center gap-2 text-sm font-semibold text-white/70">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM13 11V15H11V11H13ZM11 7H13V9H11V7Z"
          />
        </svg>
        주식회사 오크니
      </footer>
    </AuroraBackground>
  );
}

