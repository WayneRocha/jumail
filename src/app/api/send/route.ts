import { SBclients } from "@/clients/sendinblue";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return NextResponse.json({message: "hello!"});
}

interface POSTRequest_send {
    sender: {
        email: string,
        name?: string,
    },
    to: Array<{email: string, name?: string}>,
    cc: Array<{email: string, name?: string}>,
    bcc: Array<{email: string, name?: string}>,
    content: string,
    subject: string,
}

export async function POST(request: Request) {
    const {
        sender,
        to = [],
        cc = [],
        bcc = [],
        content = "",
        subject = "",
    }: POSTRequest_send = await request.json();

    console.log(sender, to, cc, bcc, content, subject);

    if (!sender || !to) {
        return NextResponse.json({"error": "missing field or incorrect format"});
    }

    try {
        const { response } = await SBclients.tEmails.sendTransacEmail({
            sender: {
                email: sender.email,
                name: sender.name,
            },
            to: to.map((item) => ({email: item.email})),
            subject: subject,
            htmlContent: decodeURIComponent(content)
        });

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({"error": error});
    }

}