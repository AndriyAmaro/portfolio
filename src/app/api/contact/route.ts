import { contactSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

// In-memory storage for demo (replace with database in production)
const messages: Array<{
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}> = [];

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: errors,
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // Create message object
    const newMessage = {
      id: generateId(),
      name,
      email,
      message,
      createdAt: new Date(),
    };

    // Store in memory (for demo)
    // TODO: Replace with database storage using Prisma
    // Example with Prisma:
    // const contactMessage = await prisma.contactMessage.create({
    //   data: { name, email, message },
    // });
    messages.push(newMessage);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
        data: {
          id: newMessage.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    // Don't expose internal errors to client
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Health check / info endpoint
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Contact API is running",
    messageCount: messages.length,
    endpoints: {
      POST: "/api/contact - Submit a contact message",
    },
    note: "Messages are stored in memory. Configure database for persistence.",
  });
}
