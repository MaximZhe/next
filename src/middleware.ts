import { NextResponse, type NextRequest } from "next/server";
import { arrayUrlNewsOld } from "./app/constant/arrayUrlNewsOld";
import { middlewareSeoContentCheck } from "./app/utils/middlewareSeoContent";
import { middlewareActionCheck } from "./app/utils/middlewareAction";
import { middlewareNewsCheck } from "./app/utils/middlewareNews";

const handleFirstRequest = async (request: NextRequest) => {
  const requestCookies = request.cookies;
  const { pathname, href ,origin} = request.nextUrl;
  const referer = request.headers.get("referer");
  const response = NextResponse.next();
  if (referer && !requestCookies.get("referer")) {
    response.cookies.set({
      name: "referer",
      value: `${referer}`,
      httpOnly: true,
      maxAge: 60 * 30,
    });
  }
 
  if (
    pathname.startsWith("/find") &&
    !pathname.includes("client") &&
    !pathname.includes("route")
  ) {
    const statusCode = 308
    if (pathname.includes("-")) {
      const resultCheck = await middlewareSeoContentCheck(pathname);
      const nameArray = pathname.split("-");
      if (nameArray.length > 2) {
        return NextResponse.redirect(`${origin}/404`, statusCode)
      }
       if(resultCheck.Result?.Routes?.length < 1 && resultCheck.Result.Page === null){
        return NextResponse.redirect(`${origin}/404`, statusCode)
      }
      if (href.includes("?date") && !href.includes('/route')) {
        return NextResponse.redirect(`${origin}/404`, statusCode)
      }
    } else {
      
      return NextResponse.redirect(`${origin}/404`, statusCode)

    }
  }
  
  if (pathname.startsWith("/akcii/")) {
    const statusCode = 308
    const resultCheck = await middlewareActionCheck(pathname);
    if (resultCheck === undefined || resultCheck === null) {
      return NextResponse.redirect(`${origin}/404`, statusCode)
    }
  }
  if (pathname.startsWith("/novosti/")) {
    const statusCode = 308
    const resultCheck = await middlewareNewsCheck(pathname);
    if (resultCheck === undefined || resultCheck === null) {
      return NextResponse.redirect(`${origin}/404`, statusCode)
    }
  }
  return response;
};
const handleThirdRequest = (request: NextRequest) => {
  const { pathname, origin } = request.nextUrl;

  const urlParts = pathname;
  if (urlParts.length > 1) {
    for (const urlPart of arrayUrlNewsOld) {
      if (urlPart === urlParts) {
        const newPathname = `/novosti${urlParts}`;
        const newUrl = new URL(newPathname, origin);

        return NextResponse.redirect(newUrl);
      }
    }
  }
  const noIndexPattern = /\/\?/;
  const { href } = request.nextUrl;

  if (noIndexPattern.test(href)) {
    const response = NextResponse.next();
    
    response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  }
  return NextResponse.next();
};
const handleSecondRequest = (request: NextRequest) => {
  const { pathname, href } = request.nextUrl;
  const urlParts = href.split("/");

  if (
    !href.includes("_next") &&
    urlParts[urlParts.length - 1].startsWith("?")
  ) {
    const newUrl = new URL(pathname, request.url);

    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
};


const handleSeoRequest = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  let urlParts = pathname.split("/");
  const cityRoute = [...urlParts].slice(0, 2);

  if (urlParts.length > 2 && urlParts[2].includes("_")) {
    const newPathname = urlParts[2].replace("_", "-");
    const newss = `/${cityRoute[1]}/${newPathname}`;
    const newUrl = new URL(newss, request.url);

    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
};

export default function middleware(
  request: NextRequest,
  response: NextResponse
) {
  const { pathname, href} = request.nextUrl;
  if (
    pathname.startsWith("/find/") ||
    pathname.startsWith("/pages/") ||
    pathname.startsWith("/akcii/") ||
    pathname.startsWith("/novosti/")
  ) {
    return handleFirstRequest(request);
  }
  if (pathname.startsWith("/")) {
    return handleThirdRequest(request);
  }
  return handleSecondRequest(request);
}





