import React, { lazy, Suspense } from "react";

const MarkdownContent = lazy(() => import("./MarkdownContent"));

function Bear() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MarkdownContent />
    </Suspense>
  );
}

export default Bear;
