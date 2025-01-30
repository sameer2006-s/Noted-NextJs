import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase client initialization
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function PUT(req: Request, context: { params:any }) {
  const id =  context.params.id;

  if (!id) {
    return NextResponse.json({ message: 'Note ID is required' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('notes')
      .update({ title, content })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ message: 'Error updating note', error }, { status: 500 });
    }


    return NextResponse.json({ message: 'Note updated successfully', data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Unexpected error', error: err }, { status: 500 });
  }
}

// Handle DELETE request to delete a specific note
export async function DELETE(req: Request, { params }: { params: any }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ message: 'Note ID is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.from('notes').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ message: 'Error deleting note', error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Note deleted successfully', data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Unexpected error', error: err }, { status: 500 });
  }
}
