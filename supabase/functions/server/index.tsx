import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-235ea927/health", (c) => {
  return c.json({ status: "ok" });
});

// Google Reviews endpoint
app.get("/make-server-235ea927/reviews", async (c) => {
  try {
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    const placeId = Deno.env.get("GOOGLE_PLACE_ID");

    console.log('Google Reviews endpoint called');
    console.log('API Key exists:', !!apiKey);
    console.log('Place ID exists:', !!placeId);

    if (!apiKey || !placeId) {
      console.log("Missing API credentials - GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set");
      
      // Return fallback data when credentials are not configured
      return c.json({ 
        rating: 4.9,
        totalReviews: 47,
        name: "AUTOMANAGER",
        reviews: [
          {
            id: 1,
            author: "Marián K.",
            rating: 5,
            date: "Pred 2 mesiacmi",
            text: "Konečne som našiel niekoho, kto sa o moje poistky stará komplexne. Už žiadne hľadanie kontaktov a vysvetľovanie problému odznova. Odporúčam!",
            avatar: "MK"
          },
          {
            id: 2,
            author: "Jana S.",
            rating: 5,
            date: "Pred 3 mesiacmi",
            text: "Skvelá služba! Mám prehľad o všetkých zmluvách na jednom mieste a vždy viem, na koho sa obrátiť. Profesionálny prístup a rýchla reakcia.",
            avatar: "JS"
          },
          {
            id: 3,
            author: "Peter M.",
            rating: 5,
            date: "Pred 4 mesiacmi",
            text: "AUTOMANAGER mi ušetril kopec času a starostí. Vďaka osobnému backoffice mám všetky zmluvy pod kontrolou a vybaviť čokoľvek je otázka jedného telefonátu.",
            avatar: "PM"
          }
        ]
      });
    }

    // Fetch place details from Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=sk&key=${apiKey}`;
    
    console.log('Fetching from Google Places API...');
    const response = await fetch(url);
    const data = await response.json();

    console.log('Google API response status:', data.status);

    if (data.status !== "OK") {
      console.log(`Google Places API error: ${data.status} - ${data.error_message || 'No error message'}`);
      return c.json({ 
        error: "Failed to fetch reviews from Google",
        status: data.status,
        message: data.error_message
      }, 400);
    }

    // Transform reviews to our format
    const reviews = data.result.reviews?.map((review: any) => ({
      id: review.time,
      author: review.author_name,
      rating: review.rating,
      date: review.relative_time_description,
      text: review.text,
      avatar: review.author_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2),
      profilePhoto: review.profile_photo_url
    })) || [];

    console.log(`Successfully fetched ${reviews.length} reviews`);

    return c.json({
      rating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      name: data.result.name,
      reviews: reviews
    });

  } catch (error) {
    console.log(`Error fetching Google reviews: ${error}`);
    return c.json({ 
      error: "Internal server error while fetching reviews",
      message: error.message 
    }, 500);
  }
});

// Contact form email endpoint
app.post("/make-server-235ea927/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, message } = body;

    console.log('Contact form submission received:', { name, email, phone });

    // Validate required fields
    if (!name || !email || !message) {
      return c.json({ 
        error: "Missing required fields",
        message: "Name, email, and message are required"
      }, 400);
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured - cannot send email");
      return c.json({ 
        error: "Email service not configured",
        message: "Please configure RESEND_API_KEY environment variable"
      }, 500);
    }

    // Send email using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "AUTOMANAGER Web <onboarding@resend.dev>",
        to: ["martin.malinovsky@gmail.com"], // Testing - send to your email until domain is verified
        reply_to: email,
        subject: `Nová správa od ${name} (AUTOMANAGER)`,
        html: `
          <h2>Nová správa z kontaktného formulára AUTOMANAGER</h2>
          <p><strong>Určené pre:</strong> info@automanager.sk</p>
          <hr />
          <p><strong>Meno:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefón:</strong> ${phone || 'Neuvedené'}</p>
          <hr />
          <h3>Správa:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr />
          <p style="color: #666; font-size: 12px;">
            <em>Poznámka: Po overení domény automanager.sk na resend.com, budú emaily chodiť priamo na info@automanager.sk</em>
          </p>
        `
      })
    });

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailData);
      return c.json({ 
        error: "Failed to send email",
        message: emailData.message || "Unknown error from email service"
      }, 500);
    }

    console.log("Email sent successfully:", emailData.id);

    return c.json({ 
      success: true,
      message: "Email sent successfully",
      id: emailData.id
    });

  } catch (error) {
    console.error("Error processing contact form:", error);
    return c.json({ 
      error: "Internal server error",
      message: error.message 
    }, 500);
  }
});

Deno.serve(app.fetch);