import jwtDecode from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	if (request.url.match('(png|jpg|jpeg)') != null) {
		return NextResponse.next();
	}
	const userToken = request.cookies.get('bearer')?.value;
	if (userToken == undefined && !request.url.includes('/login')) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (userToken != undefined) {
		try {
			jwtDecode(userToken);
			if (request.url.includes('/login')) {
				return NextResponse.redirect(new URL('/home', request.url));
			}
		} catch (error) {
			console.error(error);
			if (!request.url.includes('/login')) {
				return NextResponse.redirect(new URL('/login', request.url));
			}
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
