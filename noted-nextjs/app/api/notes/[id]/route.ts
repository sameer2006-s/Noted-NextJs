import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase client initialization
const supabaseUrl = 'https://gbjtqylynbmhrxietpxt.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Handle GET request for a specific note
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const {id} =  await params;

//   if (!id) {
//     return NextResponse.json({ message: 'Note ID is required' }, { status: 400 });
//   }

//   try {
//     const { data, error } = await supabase.from('notes').select('*').eq('id', id).single();

//     if (error) {
//       return NextResponse.json({ message: 'Error fetching note', error }, { status: 500 });
//     }

//     if (!data) {
//       return NextResponse.json({ message: 'Note not found' }, { status: 404 });
//     }

//     return NextResponse.json(data, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ message: 'Unexpected error', error: err }, { status: 500 });
//   }
// }

// Handle PUT request to update a specific note
export async function PUT(req: Request, context: { params: { id: string } }) {
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

    // if (!data ) {
    //   return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    // }

    return NextResponse.json({ message: 'Note updated successfully', data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Unexpected error', error: err }, { status: 500 });
  }
}

// Handle DELETE request to delete a specific note
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ message: 'Note ID is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.from('notes').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ message: 'Error deleting note', error }, { status: 500 });
    }

    // if (!data ) {
    //   return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    // }

    return NextResponse.json({ message: 'Note deleted successfully', data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Unexpected error', error: err }, { status: 500 });
  }
}
