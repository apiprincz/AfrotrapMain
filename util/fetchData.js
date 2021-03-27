const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getData = async (url) => {
  const baseURL = `${BASE_URL}/api/${url}`;
  // const reqUrl = `${server}`;

  const res = await fetch(baseURL, {
    method: "GET",
    origin: "*",
    headers: {
      "User-Agent": "*",
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
