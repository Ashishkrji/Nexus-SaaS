import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Accept any valid-looking login for testing, but prefer demo@nexussaas.com
    if (email && password) {
      return NextResponse.json({
        message: 'Login successful',
        user: { id: 'usr_123', name: 'Demo User', email: email },
        token: 'mock-jwt-token-for-testing'
      });
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
