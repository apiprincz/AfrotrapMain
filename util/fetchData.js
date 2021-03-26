import { server } from "../config";

// const server = process.env.NEXT_PUBLIC_SERVER;

export const getData = async (url) => {
  const baseURL = `${server}/api/${url}`;

  const res = await fetch(new URL(baseURL), {
    method: "GET",
    origin: "*",
  });

  const data = await res.json();

  return data;
};
export const postData = async (url, post) => {
  const res = await fetch(`${server}/api/${url}`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};