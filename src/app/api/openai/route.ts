import { NextResponse } from "next/server"
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI });

export async function POST(request: Request) {

    const data = await request.json();

    if (data?.image) {
        console.log(data)
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4-vision-preview",
                messages: [
                    {
                        role: "user",
                        content: [
                        { type: "text", text: data?.prompt || "Give me an insta caption based on this image." },
                        {
                            type: "image_url",
                            image_url: {
                            "url": data.image,
                            },
                        },
                        ],
                    },
                ],
                max_tokens: 2000
            });
    
            return NextResponse.json({ response: response.choices[0]}, { status: 200 })
        } catch (error) {
            return NextResponse.json({ error }, { status: 400 })
        }
        
    }
    
    return NextResponse.json({ message: 'Received' }, { status: 400 })
}