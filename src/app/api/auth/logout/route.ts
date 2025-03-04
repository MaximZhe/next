import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')
    if(token){
       cookies().delete('token')
    }
    return NextResponse.json(token)
  }
