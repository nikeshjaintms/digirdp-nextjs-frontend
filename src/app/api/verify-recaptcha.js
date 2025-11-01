export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(JSON.stringify({ success: false, message: "Token is required" }), { status: 400 });
    }

    const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

    // Verify reCAPTCHA token with Google
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return new Response(JSON.stringify({ success: false, message: "reCAPTCHA verification failed" }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, message: "reCAPTCHA verification passed", score: data.score }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}