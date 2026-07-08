import { env } from "@/lib/env.ts";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext.ts";

export const useUnpublish = () => {
  const { token } = useAuthContext();
  const [unpublishLoading, setUnpublishLoading] = useState(false);
  const [unpublishError, setUnpublishError] = useState<Error | null>(null);

  const unpublish = async (postId: number) => {
    setUnpublishLoading(true);
    setUnpublishError(null);

    try {
      const response = await fetch(
        `${env.apiBaseUrl}/admin/posts/${postId}/published`,
        {
          method: "PATCH",
          headers: {
            ...(token && { Authorization: token }),
            "Content-type": "application/json",
          },
          body: JSON.stringify({ published: false }),
        },
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setUnpublishError(error);
      }
      return false;
    } finally {
      setUnpublishLoading(false);
    }
  };

  return { unpublish, unpublishLoading, unpublishError };
};
