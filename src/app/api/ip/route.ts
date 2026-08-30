import { NextRequest, NextResponse } from 'next/server';

export interface IpResponseData {
  ip: string;
  type?: string;
  ipv4?: string;
  ipv6?: string;
  country?: string;
  countryCode?: string;
  countryFlag?: string;
  region?: string;
  city?: string;
  postal?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  isp?: string;
  org?: string;
  asn?: string;
  connectionType?: string;
  hostname?: string;
  security?: {
    isProxy?: boolean;
    isVpn?: boolean;
    isTor?: boolean;
    isHosting?: boolean;
  };
  isLocalhost?: boolean;
  query?: string;
  success: boolean;
  message?: string;
}

/**
 * Normalize an IPv6 address by stripping the ::ffff: prefix (IPv4-mapped IPv6)
 * and converting IPv6 loopback ::1 to 127.0.0.1.
 */
function normalizeIp(ip: string): string {
  if (!ip) return ip;
  const trimmed = ip.trim();
  // IPv6 loopback → IPv4 loopback
  if (trimmed === '::1') return '127.0.0.1';
  // IPv4-mapped IPv6 (e.g. ::ffff:192.168.1.1) → IPv4
  const ffffMatch = trimmed.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (ffffMatch) return ffffMatch[1];
  return trimmed;
}

function getCountryFlag(code?: string): string {
  if (!code || code.length !== 2) return '🌐';
  const codePoints = code
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function isPrivateIp(ip: string): boolean {
  if (!ip) return true;
  const cleanIp = ip.replace(/^::ffff:/, '').trim();
  if (
    cleanIp === '127.0.0.1' ||
    cleanIp === '::1' ||
    cleanIp === 'localhost' ||
    cleanIp.startsWith('10.') ||
    cleanIp.startsWith('192.168.') ||
    /^172\.(1[6-9]|2[0-9]|3[01])\./.test(cleanIp) ||
    cleanIp.startsWith('fc00:') ||
    cleanIp.startsWith('fe80:')
  ) {
    return true;
  }
  return false;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customQuery = searchParams.get('ip')?.trim();

    // Extract client IP from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    const clientIpHeader = request.headers.get('x-client-ip');

    let rawClientIp = (
      cfConnectingIp ||
      forwardedFor?.split(',')[0] ||
      realIp ||
      clientIpHeader ||
      ''
    ).trim();

    // If no proxy headers provided a real IP, try to read the socket remote address
    // This is needed because on localhost, browsers prefer IPv6 (::1) over IPv4
    if (!rawClientIp) {
      const anyReq = request as any;
      const socketAddr = anyReq?.socket?.remoteAddress || anyReq?.headers?.host || '';
      rawClientIp = socketAddr;
    }

    const clientIp = normalizeIp(rawClientIp || '127.0.0.1');

    // For localhost/private IPs without a custom query, leave targetQuery empty
    // so the external service resolves the server's own public IP
    const targetQuery = customQuery || (isPrivateIp(clientIp) ? '' : clientIp);

    // Call ipwho.is service
    const apiUrl = targetQuery
      ? `https://ipwho.is/${encodeURIComponent(targetQuery)}`
      : 'https://ipwho.is/';

    const res = await fetch(apiUrl, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CropMyImages/1.0',
      },
    });

    if (!res.ok) {
      throw new Error(`External IP service error: ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.success && data.message) {
      return NextResponse.json(
        {
          success: false,
          ip: targetQuery || clientIp || 'Unknown',
          message: data.message || 'Could not resolve IP details',
        },
        { status: 400 }
      );
    }

    const response: IpResponseData = {
      success: true,
      ip: data.ip || clientIp,
      type: data.type || (data.ip?.includes(':') ? 'IPv6' : 'IPv4'),
      country: data.country || 'Unknown',
      countryCode: data.country_code || '',
      countryFlag: data.flag?.emoji || getCountryFlag(data.country_code),
      region: data.region || 'Unknown',
      city: data.city || 'Unknown',
      postal: data.postal || '',
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
      timezone: data.timezone?.id || data.timezone?.code || 'UTC',
      isp: data.connection?.isp || data.connection?.org || 'Unknown Provider',
      org: data.connection?.org || data.connection?.isp || 'Unknown Org',
      asn: data.connection?.asn ? `AS${data.connection.asn}` : 'N/A',
      connectionType: data.connection?.domain ? 'Broadband / Corporate' : 'Standard IP',
      hostname: data.connection?.domain || data.ip,
      security: {
        isProxy: Boolean(data.security?.proxy),
        isVpn: Boolean(data.security?.vpn),
        isTor: Boolean(data.security?.tor),
        isHosting: Boolean(data.security?.hosting),
      },
      isLocalhost: isPrivateIp(clientIp) && !customQuery,
      query: customQuery || undefined,
    };

    // Asynchronously log check event to backend admin logger
    // Use the resolved public IP for logging when client IP is private/loopback
    const logClientIp = isPrivateIp(clientIp) && !customQuery ? (response.ip || clientIp) : clientIp;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    fetch(`${backendUrl}/api/admin/ip-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientIp: logClientIp,
        targetIp: response.ip,
        type: response.type,
        country: response.country,
        countryCode: response.countryCode,
        countryFlag: response.countryFlag,
        city: response.city,
        region: response.region,
        isp: response.isp,
        asn: response.asn,
        isVpnOrProxy: response.security?.isVpn || response.security?.isProxy,
        userAgent: request.headers.get('user-agent') || '',
      }),
    }).catch(() => {});

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('IP API Route error:', error);
    return NextResponse.json(
      {
        success: false,
        ip: 'Unavailable',
        message: error?.message || 'Failed to retrieve IP information',
      },
      { status: 500 }
    );
  }
}
