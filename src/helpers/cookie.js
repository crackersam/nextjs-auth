import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function getData(url, options) {
  const cStore = cookies();
  const cookees = cStore.getAll();
  const req = new NextRequest(url);

  cookees.forEach((cookie) => {
    req.cookies.set(cookie.name, cookie.value);
  });

  const res = await fetch(req, options);

  return res.json();
}
