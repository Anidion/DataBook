"use client";

import useSWR from "swr";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export const useSwrRequest = (url: string) => {
  const { data, error, isLoading } = useSWR(url, fetcher);
  return { data, error, isLoading };
};
