import { processInquiry } from "../../src/server/inquiryService";

interface PagesContext {
  request: Request;
  env: Record<string, string>;
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  try {
    const clientIp = context.request.headers.get("cf-connecting-ip") || "127.0.0.1";
    let body: any = {};
    try {
      body = await context.request.json();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          statusCode: 400,
          message: "Invalid JSON request body",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await processInquiry(body, clientIp, context.env);

    return new Response(JSON.stringify(result), {
      status: result.statusCode,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        statusCode: 500,
        message: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Reject unsupported methods
export async function onRequestGet(): Promise<Response> {
  return new Response(
    JSON.stringify({
      success: false,
      statusCode: 405,
      message: "Method Not Allowed. Only POST requests are accepted.",
    }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "POST",
      },
    }
  );
}

export async function onRequestPut(): Promise<Response> {
  return onRequestGet();
}

export async function onRequestDelete(): Promise<Response> {
  return onRequestGet();
}
