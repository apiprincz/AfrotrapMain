import { server, baseUrl } from "../config";

// const server = process.env.NEXT_PUBLIC_SERVER;

export const getData = async (url) => {
  const baseURL = `${baseUrl}/api/${url}`;
  const reqUrl = `${server}`;

  const res = await fetch(new URL(reqUrl, baseURL), {
    method: "GET",
    origin: "*",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
      Accept: "application/json; charset=UTF-8",
    },
  });

  const data = await res.json({});

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
