import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

export async function POST(req: Request) {
  const user = await req.json();
  console.log("setting session:", user);
  const session = await getIronSession(cookies(), {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "session",
  });
  Object.assign(session, user);
  await session.save();
  return new Response(null, {
    status: 200,
  });
}

export async function GET() {
  const session = await getIronSession(cookies(), {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "session",
  });
  return new Response(JSON.stringify(session), {
    status: 200,
  });
}

export async function DELETE() {
  const session = await getIronSession(cookies(), {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "session",
  });
  session.destroy();
  return new Response(null, {
    status: 200,
  });
}
