"use client"
import React, { useState } from "react";
import md5 from "md5";

export function EmailAvatar({ email, size = 48 }: { email: string | undefined; size?: number }) {
  const [error, setError] = useState(false);

  const hash = md5((email ?? "").trim().toLowerCase());
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=404`; // 404 kalau tidak ada
  const dicebearUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
    email ?? ""
  )}&size=${size}`;

  return (
    <img
      src={error ? dicebearUrl : gravatarUrl}
      alt={email}
      width={size}
      height={size}
      className="rounded-full"
      onError={() => setError(true)} // kalau Gravatar ga ada → fallback DiceBear
    />
  );
}
