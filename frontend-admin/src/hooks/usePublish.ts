import { env } from "@/lib/env.ts";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext.ts";

export const usePublish = () => {
  const { token } = useAuthContext();
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishError, setPublishError] = useState<Error | null>(null);

  const publish = async (postId: number) => {
    setPublishLoading(true);
    setPublishError(null);

    try {
      const response = await fetch(
        `${env.apiBaseUrl}/admin/posts/${postId}/published`,
        {
          method: "PATCH",
          headers: {
            ...(token && { Authorization: token }),
            "Content-type": "application/json",
          },
          body: JSON.stringify({ published: true }),
        },
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setPublishError(error);
      }
      return false;
    } finally {
      setPublishLoading(false);
    }
  };

  return { publish, publishLoading, publishError };
};
