const dev = process.env.NODE_ENV !== "production";

export const baseUrl = dev
  ? "http://localhost:3000"
  : `http://${process.env.NEXT_PUBLIC_SERVER}`;

// export const server = dev ? "" : process.env.NEXT_PUBLIC_SERVER;
