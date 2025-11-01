"use client";
import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityScript() {
  useEffect(() => {
    Clarity.init(process.env.NEXT_PUBLIC_PROJECT_ID); // Replace with your actual Microsoft Clarity Project ID
  }, []);

  return null;
}