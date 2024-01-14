import { createApi } from "unsplash-js";

export const getUnsplash = () => {
  if (!process.env.NEXT_PUBLIC_UNSPALSH_ACCESS_KEY) {
    throw Error("The unsplash access key is not provided");
  }

  return createApi({
    fetch: fetch,
    accessKey: process.env.NEXT_PUBLIC_UNSPALSH_ACCESS_KEY,
  });
};
