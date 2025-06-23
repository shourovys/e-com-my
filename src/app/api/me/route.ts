import { getDB, writeDB } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await getDB();
    return NextResponse.json(db.me);
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const db = await getDB();
    const updates = await request.json();

    // Update the profile with new data
    db.me = { ...db.me, ...updates };

    // Write the updated profile back to the database
    await writeDB(db);

    return NextResponse.json(db.me);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
