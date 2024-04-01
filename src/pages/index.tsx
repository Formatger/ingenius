import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/dashboard/dashboard`);
  }, [router]);

  return <div></div>;
}

export default Home;