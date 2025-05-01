"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Simplify the Button component to avoid potential hydration issues
function Button({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed",
        className || ""
      )}
      {...props}
    />
  );
}

export { Button };
