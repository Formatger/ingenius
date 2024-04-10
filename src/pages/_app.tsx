import React, { useEffect, useState } from "react";
import Head from "next/head";
import "@/styles/core.css";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import "@/styles/elements.css";
import "@/styles/modal.css";
import "@/styles/dropdown.css";
import "@/styles/auth.css";
import "@/styles/profile.css";
import "@/styles/tables.css";
import "@/styles/kanban.css";
import "@/styles/easyFilters.css";
import "@/styles/sidepanel.css";
import "@/styles/dashboard.css";
import "@/styles/form.css";
import "@/styles/drag&drop.css";
import type { AppProps } from "next/app";
import { DEPLOYED_API_BASE_URL } from "@/utils/apiConfig";
import { useRouter } from "next/router";
import { AppProvider } from "@/components/context/AppContext";
import { refreshToken } from "@/utils/httpCalls";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.access_token || !localStorage.refresh_token) {
      router.push('/auth');
    } else {
      if (localStorage.refresh_token) {
        refreshToken((error) => {
          console.error('Error:', error);
        });
        setInterval(() => {
          refreshToken((error) => {
            console.error('Error:', error);
          });
        }, 1000 * 30);
      } else {
        router.push('/auth');
      }
    }
  }, []);

  return (
    <AppProvider>
      <Head>
        <title>Ingenius</title>
      </Head>
      <div className="root">
        <Component {...pageProps} />
      </div>
    </AppProvider>
  );
}
