"use client";
import HomePage from "@/pages/HomePage";
import dynamic from "next/dynamic";
import ClarityScript from "../components/Clartity";

const TawkToChat = dynamic(() => import("@/components/TawkToChat"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <HomePage />
      <ClarityScript />
      <TawkToChat />
     
    </>
  );
}
