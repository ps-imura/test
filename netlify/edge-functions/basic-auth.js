export default async (request, context) => {
  const auth = request.headers.get("authorization") || "";
  const expected = "Basic " + btoa("admin:secret123");
  if (auth !== expected) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"', "X-Edge-Auth": "required" },
    });
  }
  const response = await context.next();
  const newHeaders = new Headers(response.headers);
  newHeaders.set("X-Edge-Function", "basic-auth");
  return new Response(response.body, { status: response.status, headers: newHeaders });
};

export const config = { path: "/*" };


