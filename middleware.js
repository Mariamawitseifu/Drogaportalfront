import { NextResponse } from "next/server";

export default function middleware(request) {
    console.log('Middleware is running');
    return NextResponse.next();
}
