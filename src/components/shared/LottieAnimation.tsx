"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react").then((mod) => mod.Lottie), {
  ssr: false,
});

type LottieAnimationProps = {
  srcPaths: string[];
  fallback?: React.ReactNode;
  className?: string;
};

export default function LottieAnimation({
  srcPaths,
  fallback = null,
  className = "w-full max-w-lg aspect-square flex items-center justify-center",
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function tryLoadAnimation() {
      for (const path of srcPaths) {
        try {
          const res = await fetch(path);
          if (res.ok) {
            const data = await res.json();
            if (isMounted && data && (data.layers || data.v)) {
              setAnimationData(data);
              return;
            }
          }
        } catch {
          // continue checking next path
        }
      }
    }

    tryLoadAnimation();

    return () => {
      isMounted = false;
    };
  }, [srcPaths]);

  if (animationData) {
    return (
      <div className={className}>
        <Lottie
          src={animationData}
          loop={true}
          autoplay={true}
          className="w-full h-full"
        />
      </div>
    );
  }

  // Fallback while lottie is loading or if file is not yet added
  if (fallback) {
    return <div className={className}>{fallback}</div>;
  }

  return null;
}
