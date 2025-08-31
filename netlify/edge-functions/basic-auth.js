export default async (request, context) => {
  const auth = request.headers.get("authorization") || "";
  const expected = "Basic " + btoa("admin:secret123");
  if (auth !== expected) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
    });
  }
  return context.next();
};

export const config = { path: "/*" };


