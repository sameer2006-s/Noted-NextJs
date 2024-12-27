import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase client initialization
const supabaseUrl = 'https://gbjtqylynbmhrxietpxt.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Handle GET requests
export async function GET() {
  try {
    const { data, error } = await supabase.from('notes').select('*');
    if (error) {
      return NextResponse.json({ message: 'Error fetching notes', error }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Unexpected error', error: err }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    const { data, error } = await supabase.from('notes').insert([{ title, content }]);

    if (error) {
      return NextResponse.json({ message: 'Error creating note', error }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Unexpected error', error: err }, { status: 500 });
  }
}
