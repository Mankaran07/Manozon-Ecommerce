"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Success() {
  const [countdown, setCountdown] = useState(5);
  if (countdown === 0) redirect("/");

  const updateCountdown = () => {
    setCountdown((prevCountdown) => prevCountdown - 1);
    setTimeout(updateCountdown, 1000);
  };
  useEffect(() => {
    setTimeout(updateCountdown, 1000);

    return () => {
      clearTimeout(updateCountdown as any);
    };
  }, []);
  return (
    <div className="card-bordered card w-full items-center">
        <div className="card-body">
      <h1 className="my-2 text-5xl font-bold text-success">Order has been successfully Placed🎉</h1>
      <p className="text-xl text-slate-400">Redirecting to the home page in {countdown} seconds...</p></div>
    </div>
  );
}
