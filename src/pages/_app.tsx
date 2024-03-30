import React, { useEffect, useState } from "react";
import Head from "next/head";
import "@/styles/core.css";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import "@/styles/dropdown.css";
import "@/styles/auth.css";
import "@/styles/projects.css";
import "@/styles/revenueCampaigns.css";
import "@/styles/easyFilters.css";
import "@/styles/sidepanel.css";
import "@/styles/breadcrumb.css";
import type { AppProps } from "next/app";
import { DEPLOYED_API_BASE_URL } from "@/utils/apiConfig";
import { useRouter } from "next/router";
import { AppProvider } from "@/components/context/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.access_token || !localStorage.refresh_token) {
      router.push('/auth');
    } else {
      setInterval(() => {
        if (localStorage.refresh_token) {
          const url = DEPLOYED_API_BASE_URL + 'token/refresh/';
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: localStorage.refresh_token }),
          })
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem('access_token', data.access);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          router.push('/auth');
        }
      }, 1000 * 30);
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
