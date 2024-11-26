import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  return redirect(`${ pathname }/positions`);
}
