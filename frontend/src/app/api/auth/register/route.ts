import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (name && email && password) {
      return NextResponse.json({
        message: 'Registration successful',
        user: { id: 'usr_new', name: name, email: email },
        token: 'mock-jwt-token-for-testing'
      });
    }

    return NextResponse.json(
      { message: 'Missing fields' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
