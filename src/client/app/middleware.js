import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req) {
  // Lấy access token từ cookie
  const cookieStore = await cookies()
  const cookie = cookieStore.get('bearer')
  let token
  if (cookie) {
    token = cookie.value
  }
  if (!token) {
    // Nếu không có token, redirect về trang login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Nếu token tồn tại, cho phép tiếp tục
  return NextResponse.next();
}

// Áp dụng middleware chỉ cho các route được bảo vệ
export const config = {
  matcher: ['/account/wishlist', '/account/profile', '/account/cart', '/account/trackorder'],
};