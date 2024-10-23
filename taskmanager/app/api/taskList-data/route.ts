import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import TaskList from '@/db-schemas/TaskList';

export async function GET() {
  try {
    await dbConnect();
    const taskLists = await TaskList.find({});

    return NextResponse.json({ success: true, data: taskLists });
  } catch (error: unknown) {
    // Vérifier que l'erreur est un objet avec un message
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const taskList = await TaskList.create(body);
    return NextResponse.json({ success: true, data: taskList }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, data } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing ID parameter' }, { status: 400 });
    }
    const taskLists = await TaskList.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!taskLists) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: taskLists });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing ID parameter' }, { status: 400 });
    }
    const deletedTaskList = await TaskList.findByIdAndDelete(id);
    if (!deletedTaskList) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 400 });
  }
}