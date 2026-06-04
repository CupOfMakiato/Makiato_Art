import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonScreen = ({
  show = true,
  overlay = false,
  embedded = false,
  layout = "default",
}) => {
  if (!show) return null;

  const wrapperClass = overlay
    ? "absolute left-0 right-0 bottom-0 bg-[`#1B1D25`]/95 z-20 rounded-b-2xl overflow-hidden"
    : embedded
      ? "relative z-10 bg-[`#1B1D25`]/95 rounded-b-2xl"
    : "min-h-screen flex items-center justify-center bg-transparent p-6";

  const innerClass = !overlay && !embedded
    ? "w-full max-w-3xl"
    : layout === "commission"
      ? "w-full container mx-auto px-6 py-12"
      : "w-full p-8 md:p-12";

  const overlayStyle = overlay ? { top: "64px" } : undefined;

  return (
    <div className={wrapperClass} style={overlayStyle}>
      <div className={innerClass}>
        <SkeletonTheme baseColor="#1E212C" highlightColor="#313855">
          {layout === "home" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex flex-col justify-center order-2 md:order-1">
                <div className="mb-2">
                  <Skeleton height={64} width={`88%`} />
                </div>
                <div className="mb-6 space-y-2">
                  <Skeleton height={24} width={`86%`} />
                  <Skeleton height={24} width={`68%`} />
                </div>
                <div className="mb-6 space-y-4">
                  <Skeleton height={24} width={`100%`} />
                  <Skeleton height={24} width={`94%`} />
                  <Skeleton height={24} width={`78%`} />
                </div>
                <div className="border-b-2 border-[#313855] my-6 border-dashed opacity-70"></div>
                <div className="flex items-center gap-2">
                  <Skeleton width={112} height={24} />
                  <Skeleton width={88} height={28} />
                </div>
              </div>

              <div className="flex justify-center items-center order-1 md:order-2">
                <Skeleton height={256} width={256} className="rounded-2xl" />
              </div>
            </div>
          ) : layout === "tos" ? (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="mb-4">
                  <Skeleton height={48} width={`72%`} />
                </div>
                <div className="border-b-2 border-[#313855] border-dashed opacity-70"></div>
                <div className="mt-3 space-y-2">
                  <Skeleton height={24} width={`94%`} />
                  <Skeleton height={24} width={`82%`} />
                </div>
              </div>

              {[0, 1, 2].map((i) => (
                <div key={i} className="mb-8">
                  <div className="text-center mb-4">
                    <Skeleton height={36} width={`48%`} />
                  </div>
                  <div className="space-y-2">
                    <Skeleton height={24} width={`100%`} />
                    <Skeleton height={24} width={`96%`} />
                    <Skeleton height={24} width={`88%`} />
                    <Skeleton height={24} width={`62%`} />
                  </div>
                  {i < 2 && (
                    <div className="border-b border-[#313855] opacity-70 mt-6"></div>
                  )}
                </div>
              ))}
            </div>
          ) : layout === "commission" ? (
            <div>
              <div className="text-center mb-4">
                <Skeleton height={48} width={`66%`} />
              </div>

              <div className="border-b-2 border-[#313855] my-6 border-dashed opacity-70"></div>

              <div className="text-center mt-3">
                <Skeleton height={24} width={`72%`} />
              </div>

              <div className="mt-16">
                <div className="mb-8 text-center">
                  <Skeleton height={36} width={`46%`} />
                  <div className="mt-3 space-y-2">
                    <Skeleton height={24} width={`82%`} />
                    <Skeleton height={24} width={`58%`} />
                  </div>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                  {[220, 280, 200, 260, 240, 300].map((height, i) => (
                    <div key={i} className="break-inside-avoid mb-6">
                      <Skeleton height={height} className="rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <Skeleton height={36} width={`60%`} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Skeleton height={200} />
                </div>
                <div>
                  <Skeleton height={200} />
                </div>
              </div>

              <div className="mt-6">
                <Skeleton count={4} />
              </div>
            </div>
          )}
        </SkeletonTheme>
      </div>
    </div>
  );
};

export default SkeletonScreen;
