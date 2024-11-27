import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const parentPath = pathname.substring(0, pathname.indexOf('/web-pages'));
  return redirect(parentPath);
}
