import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getGameRules } from '@/lib/data';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rules = await getGameRules(id);

  if (rules === null) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(rules);
}
