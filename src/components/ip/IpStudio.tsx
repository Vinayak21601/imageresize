'use client';

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import {
  Globe,
  Copy,
  Check,
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Search,
  MapPin,
  Clock,
  Wifi,
  Monitor,
  Download,
  Share2,
  ExternalLink,
  Zap,
  ChevronDown,
  HelpCircle,
  History,
  Activity,
  Compass,
  ArrowRight,
  Server
} from 'lucide-react';
import { IpResponseData } from '@/app/api/ip/route';

interface BrowserDiagnostics {
  userAgent: string;
  browser: string;
  os: string;
  screenResolution: string;
  pixelRatio: number;
  language: string;
  online: boolean;
  timeZone: string;
}

interface IpStudioContextType {
  ipData: IpResponseData | null;
  ipv4: string | null;
  ipv6: string | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  copied: string | null;
  localTime: string;
  history: string[];
  pingLatency: number | null;
  testingPing: boolean;
  openFaq: number | null;
  setOpenFaq: React.Dispatch<React.SetStateAction<number | null>>;
  diagnostics: BrowserDiagnostics | null;
  fetchIpDetails: (targetIp?: string) => Promise<void>;
  copyToClipboard: (text: string, label: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  testPing: () => Promise<void>;
  downloadReport: (format: 'txt' | 'json') => void;
  clearHistory: () => void;
}

const IpStudioContext = createContext<IpStudioContextType | null>(null);

export function useIpStudioContext() {
  const ctx = useContext(IpStudioContext);
  if (!ctx) {
    throw new Error('useIpStudioContext must be used within an IpStudioProvider');
  }
  return ctx;
}

export function IpStudioProvider({ children }: { children: React.ReactNode }) {
  const [ipData, setIpData] = useState<IpResponseData | null>(null);
  const [ipv4, setIpv4] = useState<string | null>(null);
  const [ipv6, setIpv6] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<string | null>(null);
  const [localTime, setLocalTime] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [pingLatency, setPingLatency] = useState<number | null>(null);
  const [testingPing, setTestingPing] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [diagnostics, setDiagnostics] = useState<BrowserDiagnostics | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ip_lookup_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Fetch client diagnostics
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ua = navigator.userAgent;
    let browser = 'Unknown Browser';
    if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';
    else if (ua.includes('Edg/')) browser = 'Microsoft Edge';
    else if (ua.includes('Chrome/')) browser = 'Google Chrome';
    else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Apple Safari';
    else if (ua.includes('OPR/') || ua.includes('Opera/')) browser = 'Opera';

    let os = 'Unknown OS';
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    setDiagnostics({
      userAgent: ua,
      browser,
      os,
      screenResolution: `${window.screen.width} x ${window.screen.height}`,
      pixelRatio: window.devicePixelRatio || 1,
      language: navigator.language || 'en-US',
      online: navigator.onLine,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }, []);

  const addToHistory = (ip: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== ip);
      const updated = [ip, ...filtered].slice(0, 8);
      try {
        localStorage.setItem('ip_lookup_history', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('ip_lookup_history');
    } catch {
      // ignore
    }
  };

  // Dedicated IPv4 fetcher when primary connection is IPv6
  const fetchDedicatedIpv4 = useCallback(async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      if (data?.ip && !data.ip.includes(':')) {
        setIpv4(data.ip);
      }
    } catch {
      // Secondary fallback for IPv4
      try {
        const res2 = await fetch('https://ipwho.is/');
        const data2 = await res2.json();
        if (data2?.ip && !data2.ip.includes(':')) {
          setIpv4(data2.ip);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const fetchIpDetails = useCallback(async (targetIp?: string) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = targetIp
        ? `/api/ip?ip=${encodeURIComponent(targetIp)}`
        : '/api/ip';
      
      const res = await fetch(endpoint);
      const data: IpResponseData = await res.json();

      if (!data.success) {
        const fallbackUrl = targetIp
          ? `https://ipwho.is/${encodeURIComponent(targetIp)}`
          : 'https://ipwho.is/';
        const fallbackRes = await fetch(fallbackUrl);
        const fbData = await fallbackRes.json();

        if (fbData && fbData.ip) {
          const fallbackResponse: IpResponseData = {
            success: true,
            ip: fbData.ip,
            type: fbData.type || (fbData.ip.includes(':') ? 'IPv6' : 'IPv4'),
            country: fbData.country || 'Unknown',
            countryCode: fbData.country_code || '',
            countryFlag: fbData.flag?.emoji || '🌐',
            region: fbData.region || 'Unknown',
            city: fbData.city || 'Unknown',
            postal: fbData.postal || '',
            latitude: fbData.latitude || 0,
            longitude: fbData.longitude || 0,
            timezone: fbData.timezone?.id || 'UTC',
            isp: fbData.connection?.isp || fbData.connection?.org || 'ISP Provider',
            org: fbData.connection?.org || fbData.connection?.isp || 'Organization',
            asn: fbData.connection?.asn ? `AS${fbData.connection.asn}` : 'N/A',
            connectionType: 'Broadband',
            hostname: fbData.connection?.domain || fbData.ip,
            security: {
              isProxy: Boolean(fbData.security?.proxy),
              isVpn: Boolean(fbData.security?.vpn),
              isTor: Boolean(fbData.security?.tor),
              isHosting: Boolean(fbData.security?.hosting),
            },
          };
          setIpData(fallbackResponse);
          if (fallbackResponse.ip.includes(':')) {
            setIpv6(fallbackResponse.ip);
            fetchDedicatedIpv4();
          } else {
            setIpv4(fallbackResponse.ip);
          }
        } else {
          setError(data.message || 'Failed to fetch IP information.');
        }
      } else {
        setIpData(data);
        if (data.ip.includes(':')) {
          setIpv6(data.ip);
          fetchDedicatedIpv4();
        } else {
          setIpv4(data.ip);
        }
        if (targetIp && data.ip) {
          addToHistory(data.ip);
        }
      }
    } catch (err: any) {
      console.error('IP Fetch Error:', err);
      try {
        const fallbackRes = await fetch(
          targetIp ? `https://ipwho.is/${encodeURIComponent(targetIp)}` : 'https://ipwho.is/'
        );
        const fbData = await fallbackRes.json();
        if (fbData && fbData.ip) {
          const isV6 = fbData.ip.includes(':');
          setIpData({
            success: true,
            ip: fbData.ip,
            type: isV6 ? 'IPv6' : 'IPv4',
            country: fbData.country || 'Unknown',
            countryCode: fbData.country_code || '',
            countryFlag: fbData.flag?.emoji || '🌐',
            region: fbData.region || 'Unknown',
            city: fbData.city || 'Unknown',
            postal: fbData.postal || '',
            latitude: fbData.latitude || 0,
            longitude: fbData.longitude || 0,
            timezone: fbData.timezone?.id || 'UTC',
            isp: fbData.connection?.isp || fbData.connection?.org || 'Network',
            org: fbData.connection?.org || fbData.connection?.isp || 'Org',
            asn: fbData.connection?.asn ? `AS${fbData.connection.asn}` : 'N/A',
            hostname: fbData.connection?.domain || fbData.ip,
            security: {
              isProxy: Boolean(fbData.security?.proxy),
              isVpn: Boolean(fbData.security?.vpn),
              isTor: Boolean(fbData.security?.tor),
              isHosting: Boolean(fbData.security?.hosting),
            },
          });
          if (isV6) {
            setIpv6(fbData.ip);
            fetchDedicatedIpv4();
          } else {
            setIpv4(fbData.ip);
          }
        } else {
          setError('Unable to fetch IP details. Check network connection.');
        }
      } catch {
        setError('Network error while reaching IP service.');
      }
    } finally {
      setLoading(false);
    }
  }, [fetchDedicatedIpv4]);

  useEffect(() => {
    fetchIpDetails();
  }, [fetchIpDetails]);

  // Clock tick for target IP local time
  useEffect(() => {
    if (!ipData?.timezone) return;

    const timer = setInterval(() => {
      try {
        const timeStr = new Date().toLocaleTimeString('en-US', {
          timeZone: ipData.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setLocalTime(timeStr);
      } catch {
        setLocalTime(new Date().toLocaleTimeString());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [ipData?.timezone]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    fetchIpDetails(searchQuery.trim());
  };

  const testPing = async () => {
    setTestingPing(true);
    setPingLatency(null);
    const pings: number[] = [];
    
    for (let i = 0; i < 3; i++) {
      const start = performance.now();
      try {
        await fetch('/api/ip', { cache: 'no-store' });
        const end = performance.now();
        pings.push(end - start);
      } catch {
        // ignore sample error
      }
    }

    if (pings.length > 0) {
      const avg = Math.round(pings.reduce((a, b) => a + b, 0) / pings.length);
      setPingLatency(avg);
    }
    setTestingPing(false);
  };

  const downloadReport = (format: 'txt' | 'json') => {
    if (!ipData) return;

    let content = '';
    let mime = 'text/plain';
    let filename = `ip-details-${ipData.ip}.${format}`;

    if (format === 'json') {
      content = JSON.stringify({ ...ipData, ipv4, ipv6, diagnostics }, null, 2);
      mime = 'application/json';
    } else {
      content = `=========================================
MY IP ADDRESS DETAILS REPORT
Generated on: ${new Date().toLocaleString()}
=========================================

IPv4 Address:      ${ipv4 || 'N/A'}
IPv6 Address:      ${ipv6 || 'N/A'}
Primary IP:        ${ipData.ip} (${ipData.type || 'IPv4'})
Hostname:          ${ipData.hostname || 'N/A'}

LOCATION
Country:           ${ipData.country} (${ipData.countryCode})
Region / State:    ${ipData.region}
City:              ${ipData.city}
Postal Code:       ${ipData.postal || 'N/A'}
Coordinates:       ${ipData.latitude}, ${ipData.longitude}
Timezone:          ${ipData.timezone}

NETWORK & PROVIDER
ISP:               ${ipData.isp}
Organization:      ${ipData.org}
ASN:               ${ipData.asn}

SECURITY ASSESSMENT
Proxy Detected:    ${ipData.security?.isProxy ? 'Yes' : 'No'}
VPN Detected:      ${ipData.security?.isVpn ? 'Yes' : 'No'}
Tor Exit Node:     ${ipData.security?.isTor ? 'Yes' : 'No'}
Datacenter/Hosting:${ipData.security?.isHosting ? 'Yes' : 'No'}

SYSTEM DIAGNOSTICS
Browser:           ${diagnostics?.browser || 'N/A'}
Operating System:  ${diagnostics?.os || 'N/A'}
Screen Resolution: ${diagnostics?.screenResolution || 'N/A'}
User Agent:        ${diagnostics?.userAgent || 'N/A'}
=========================================`;
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <IpStudioContext.Provider
      value={{
        ipData,
        ipv4,
        ipv6,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        copied,
        localTime,
        history,
        pingLatency,
        testingPing,
        openFaq,
        setOpenFaq,
        diagnostics,
        fetchIpDetails,
        copyToClipboard,
        handleSearchSubmit,
        testPing,
        downloadReport,
        clearHistory,
      }}
    >
      {children}
    </IpStudioContext.Provider>
  );
}

{/* HERO IP DISPLAY CARD COMPONENT (Matching light theme card style) */}
export function IpHeroCard() {
  const {
    ipData,
    ipv4,
    ipv6,
    loading,
    error,
    searchQuery,
    copied,
    fetchIpDetails,
    copyToClipboard,
  } = useIpStudioContext();

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      
      {/* Header badges & Action buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200/80 text-xs font-bold">
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            {ipData?.type || 'IPv4'} Active Connection
          </span>

          {ipData?.security?.isVpn || ipData?.security?.isProxy ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              VPN / Proxy Detected
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Clean Direct Connection
            </span>
          )}

          {ipData?.isLocalhost && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-xs font-bold">
              Dev Environment (Public IP Resolved)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => fetchIpDetails(searchQuery || undefined)}
            disabled={loading}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => copyToClipboard(JSON.stringify({ ip: ipData?.ip, ipv4, ipv6, location: `${ipData?.city}, ${ipData?.country}` }, null, 2), 'hero-json')}
            disabled={!ipData}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-slate-800 font-bold text-xs border border-zinc-200/80 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span>{copied === 'hero-json' ? 'Copied!' : 'Share Details'}</span>
          </button>
        </div>
      </div>

      {/* DUAL IP DISPLAY: IPv4 & IPv6 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* IPv4 DISPLAY BOX */}
        <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-sky-700 font-extrabold flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-sky-600" />
              Your IPv4 Address
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 border border-sky-200/80">
              IPv4
            </span>
          </div>

          {loading ? (
            <div className="h-10 w-48 bg-zinc-200 rounded-lg animate-pulse" />
          ) : (
            <div className="flex items-center justify-between gap-3">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight break-all">
                {ipv4 || (ipData && !ipData.ip.includes(':') ? ipData.ip : 'Resolving IPv4...')}
              </span>
              <button
                type="button"
                onClick={() => {
                  const targetIp = ipv4 || (ipData && !ipData.ip.includes(':') ? ipData.ip : '');
                  if (targetIp) copyToClipboard(targetIp, 'ipv4-copy');
                }}
                disabled={!ipv4 && (ipData?.ip.includes(':') ?? true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-40"
              >
                {copied === 'ipv4-copy' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-200" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* IPv6 DISPLAY BOX */}
        <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-indigo-700 font-extrabold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              Your IPv6 Address
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 border border-indigo-200/80">
              IPv6
            </span>
          </div>

          {loading ? (
            <div className="h-10 w-48 bg-zinc-200 rounded-lg animate-pulse" />
          ) : (
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm sm:text-base font-black font-mono text-slate-900 tracking-tight break-all">
                {ipv6 || (ipData && ipData.ip.includes(':') ? ipData.ip : 'Not Detected / IPv4 Active')}
              </span>
              {ipv6 || (ipData && ipData.ip.includes(':')) ? (
                <button
                  type="button"
                  onClick={() => {
                    const targetIp = ipv6 || (ipData && ipData.ip.includes(':') ? ipData.ip : '');
                    if (targetIp) copyToClipboard(targetIp, 'ipv6-copy');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-all active:scale-95 shadow-sm cursor-pointer"
                >
                  {copied === 'ipv6-copy' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-200" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 font-medium">Inactive</span>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Location Subline */}
      {!loading && ipData && (
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium pt-3 border-t border-zinc-100">
          <span className="text-xl leading-none">{ipData.countryFlag}</span>
          <span className="font-bold text-slate-900">
            {ipData.city}, {ipData.region}, {ipData.country}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-700 font-medium">{ipData.isp}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-mono text-xs">{ipData.asn}</span>
        </div>
      )}

    </div>
  );
}

{/* DETAILS DASHBOARD COMPONENT (Rendered on clean light background below hero) */}
export function IpDetailsDashboard() {
  const {
    ipData,
    ipv4,
    ipv6,
    searchQuery,
    setSearchQuery,
    copied,
    localTime,
    history,
    pingLatency,
    testingPing,
    openFaq,
    setOpenFaq,
    diagnostics,
    fetchIpDetails,
    copyToClipboard,
    handleSearchSubmit,
    testPing,
    downloadReport,
    clearHistory,
    loading,
  } = useIpStudioContext();

  const presets = [
    { label: 'Google DNS', ip: '8.8.8.8' },
    { label: 'Cloudflare DNS', ip: '1.1.1.1' },
    { label: 'Quad9', ip: '9.9.9.9' },
    { label: 'OpenDNS', ip: '208.67.222.222' },
  ];

  const faqs = [
    {
      q: 'What is an IP address?',
      a: 'An IP (Internet Protocol) address is a unique numerical or alphanumerical string assigned to every device connected to a computer network. It serves as your digital street address, allowing computers to send and receive data packets across the global Internet.',
    },
    {
      q: 'What is the difference between IPv4 and IPv6?',
      a: 'IPv4 uses 32-bit addresses formatted as four numbers separated by dots (e.g. 192.168.1.1), providing ~4.3 billion unique addresses. IPv6 uses 128-bit hexadecimal addresses separated by colons (e.g. 2001:0db8:85a3::8a2e:0370:7334), creating billions of trillions of addresses to accommodate modern devices.',
    },
    {
      q: 'Can anyone find my exact street address from my IP address?',
      a: 'No. IP geolocation only identifies your country, state/region, city, zip code area, and Internet Service Provider (ISP). It does NOT reveal your physical home address, name, or phone number.',
    },
    {
      q: 'How can I hide or change my public IP address?',
      a: 'You can mask or change your IP address by using a reputable Virtual Private Network (VPN), connecting through a proxy server, using the Tor browser, or using a mobile network hotspot.',
    },
    {
      q: 'What are ISP and ASN?',
      a: 'ISP stands for Internet Service Provider (the company giving you Internet access like Comcast, AT&T, or Airtel). ASN stands for Autonomous System Number, a globally unique identifier for a collection of routing prefixes maintained by a network operator.',
    },
  ];

  return (
    <div className="space-y-10">
      
      {/* 1. SEARCH & LOOKUP TOOL */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-sans flex items-center gap-2">
              <Search className="w-5 h-5 text-sky-600" />
              IP &amp; Domain Lookup Tool
            </h3>
            <p className="text-xs text-slate-600 font-normal">
              Enter any IPv4 address, IPv6 address, or website domain name to inspect full network details.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Presets:</span>
            {presets.map((p) => (
              <button
                key={p.ip}
                type="button"
                onClick={() => {
                  setSearchQuery(p.ip);
                  fetchIpDetails(p.ip);
                }}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-zinc-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 transition-colors border border-zinc-200/80 cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              id="ip-lookup-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. 8.8.8.8, 1.1.1.1 or github.com"
              aria-label="IP address or domain to lookup"
              className="w-full pl-12 pr-4 py-3.5 text-sm rounded-2xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 font-mono transition-all"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-3.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-2xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>Lookup IP</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                fetchIpDetails();
              }}
              className="px-4 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
            >
              My IP
            </button>
          )}
        </form>

        {/* History Pills */}
        {history.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 font-bold text-slate-500 text-[11px]">
                <History className="w-3.5 h-3.5 text-slate-400" />
                Recent Lookups:
              </span>
              {history.map((ip) => (
                <button
                  key={ip}
                  type="button"
                  onClick={() => {
                    setSearchQuery(ip);
                    fetchIpDetails(ip);
                  }}
                  className="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-slate-100 hover:bg-sky-100 hover:text-sky-800 text-slate-700 transition-colors cursor-pointer"
                >
                  {ip}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={clearHistory}
              className="text-[11px] text-zinc-400 hover:text-rose-600 font-medium underline cursor-pointer"
            >
              Clear History
            </button>
          </div>
        )}
      </div>

      {/* 2. DETAILED INFORMATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: GEOLOCATION & LOCATION */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Location Data</h4>
                  <p className="text-[11px] text-slate-500 font-normal">Geographic coordinates</p>
                </div>
              </div>
              <span className="text-2xl">{ipData?.countryFlag || '🌐'}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">Country</span>
                <span className="font-bold text-slate-900">{ipData?.country} ({ipData?.countryCode})</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">Region / State</span>
                <span className="font-bold text-slate-900">{ipData?.region || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">City</span>
                <span className="font-bold text-slate-900">{ipData?.city || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">Postal / Zip Code</span>
                <span className="font-mono font-bold text-slate-900">{ipData?.postal || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">Coordinates</span>
                <span className="font-mono font-bold text-slate-900">
                  {ipData?.latitude?.toFixed(4)}, {ipData?.longitude?.toFixed(4)}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-medium">Timezone</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  {ipData?.timezone || 'UTC'}
                </span>
              </div>
            </div>
          </div>

          {localTime && (
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between bg-sky-50/60 -mx-6 -mb-6 p-4 rounded-b-3xl text-xs">
              <span className="text-sky-900 font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-600" />
                IP Local Time:
              </span>
              <span className="font-mono font-bold text-sky-900 text-sm">{localTime}</span>
            </div>
          )}
        </div>

        {/* CARD 2: NETWORK & ISP */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Network &amp; Provider</h4>
                  <p className="text-[11px] text-slate-500 font-normal">ISP &amp; ASN info</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                {ipData?.type || 'IPv4'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">IPv4 Address</span>
                <span className="font-mono font-bold text-slate-900 truncate max-w-[140px]">
                  {ipv4 || 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">ISP Provider</span>
                <span className="font-bold text-slate-900 truncate max-w-[140px]" title={ipData?.isp}>
                  {ipData?.isp || 'Unknown'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">Organization</span>
                <span className="font-bold text-slate-900 truncate max-w-[140px]" title={ipData?.org}>
                  {ipData?.org || 'Unknown'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">ASN</span>
                <span className="font-mono font-bold text-slate-900">{ipData?.asn || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">Connection Type</span>
                <span className="font-bold text-slate-900">{ipData?.connectionType || 'Broadband'}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-medium">Hostname</span>
                <span className="font-mono font-bold text-slate-900 truncate max-w-[140px]" title={ipData?.hostname}>
                  {ipData?.hostname || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => ipData?.ip && copyToClipboard(`IPv4: ${ipv4 || 'N/A'} | IPv6: ${ipv6 || 'N/A'} | ISP: ${ipData.isp} (${ipData.asn})`, 'isp-info')}
            className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors border border-zinc-200/80 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span>{copied === 'isp-info' ? 'Copied Network Info!' : 'Copy Network Details'}</span>
          </button>
        </div>

        {/* CARD 3: SECURITY & PRIVACY */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Security &amp; Privacy</h4>
                  <p className="text-[11px] text-slate-500 font-normal">Proxy, VPN &amp; Bot check</p>
                </div>
              </div>

              {ipData?.security?.isVpn || ipData?.security?.isProxy ? (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                  Masked
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  Clean
                </span>
              )}
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">Proxy Server</span>
                <span className={`font-bold ${ipData?.security?.isProxy ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {ipData?.security?.isProxy ? 'Yes (Detected)' : 'No (Direct)'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">VPN Tunnel</span>
                <span className={`font-bold ${ipData?.security?.isVpn ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {ipData?.security?.isVpn ? 'Yes (Detected)' : 'No (Direct)'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">Tor Exit Node</span>
                <span className={`font-bold ${ipData?.security?.isTor ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {ipData?.security?.isTor ? 'Yes (Detected)' : 'No (Clean)'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-zinc-50">
                <span className="text-slate-500 font-medium">Datacenter / Hosting</span>
                <span className={`font-bold ${ipData?.security?.isHosting ? 'text-indigo-600' : 'text-slate-700'}`}>
                  {ipData?.security?.isHosting ? 'Hosting / Server' : 'Residential / ISP'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-medium">Overall Threat Score</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Low Risk
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 rounded-2xl text-[11px] text-slate-600 leading-relaxed font-normal">
            💡 Your IP address is visible to websites you visit unless you use an encrypted VPN or proxy server.
          </div>
        </div>

      </div>

      {/* 3. GEOLOCATION MAP & LATENCY TEST */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MAP DISPLAY (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-sans flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-600" />
                IP Geolocation Map
              </h3>
              <p className="text-xs text-slate-600 font-normal">
                Visual interactive location view based on IP latitude ({ipData?.latitude}) and longitude ({ipData?.longitude}).
              </p>
            </div>

            {ipData?.latitude && ipData?.longitude && (
              <a
                href={`https://www.openstreetmap.org/?mlat=${ipData.latitude}&mlon=${ipData.longitude}#map=12/${ipData.latitude}/${ipData.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors"
              >
                <span>Open map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* OpenStreetMap Iframe Embed */}
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-zinc-200 relative bg-slate-100">
            {ipData?.latitude && ipData?.longitude ? (
              <iframe
                title="IP Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${ipData.longitude - 0.05}%2C${ipData.latitude - 0.05}%2C${ipData.longitude + 0.05}%2C${ipData.latitude + 0.05}&layer=mapnik&marker=${ipData.latitude}%2C${ipData.longitude}`}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-semibold">
                Map coordinates loading...
              </div>
            )}
          </div>
        </div>

        {/* LATENCY / SPEED TEST & EXPORT (1 Col) */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 space-y-6 shadow-sm flex flex-col justify-between">
          
          {/* Latency Test */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Network Latency Test</h4>
                <p className="text-[11px] text-slate-500 font-normal">Ping round-trip response time</p>
              </div>
            </div>

            <div className="p-4 bg-zinc-50 rounded-2xl text-center space-y-3">
              <div className="text-xs text-slate-500 font-medium">Average Round-Trip Ping</div>
              <div className="text-4xl font-black text-slate-900 font-mono">
                {testingPing ? (
                  <span className="text-amber-500 animate-pulse">Testing...</span>
                ) : pingLatency !== null ? (
                  `${pingLatency} ms`
                ) : (
                  '--'
                )}
              </div>

              {pingLatency !== null && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <Zap className="w-3.5 h-3.5" />
                  {pingLatency < 80 ? 'Ultra Low Latency' : pingLatency < 200 ? 'Good Latency' : 'Standard Speed'}
                </div>
              )}

              <button
                type="button"
                onClick={testPing}
                disabled={testingPing}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {testingPing ? 'Measuring Ping...' : 'Run Latency Test'}
              </button>
            </div>
          </div>

          {/* Export Report Options */}
          <div className="space-y-3 pt-4 border-t border-zinc-100">
            <div className="text-xs font-bold text-slate-900">Export IP Report</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => downloadReport('txt')}
                disabled={!ipData}
                className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>TXT Report</span>
              </button>

              <button
                type="button"
                onClick={() => downloadReport('json')}
                disabled={!ipData}
                className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>JSON File</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* 4. BROWSER & SYSTEM DIAGNOSTICS */}
      {diagnostics && (
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-sans flex items-center gap-2">
                <Monitor className="w-5 h-5 text-indigo-600" />
                My Device &amp; Browser Diagnostics
              </h3>
              <p className="text-xs text-slate-600 font-normal">
                Technical browser fingerprint metadata transmitted to websites during request headers.
              </p>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard(diagnostics.userAgent, 'ua-copy')}
              className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>{copied === 'ua-copy' ? 'User Agent Copied!' : 'Copy User Agent'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            
            <div className="p-4 bg-zinc-50 rounded-2xl space-y-1">
              <div className="text-slate-500 font-medium">Browser</div>
              <div className="font-bold text-slate-900 text-sm">{diagnostics.browser}</div>
            </div>

            <div className="p-4 bg-zinc-50 rounded-2xl space-y-1">
              <div className="text-slate-500 font-medium">Operating System</div>
              <div className="font-bold text-slate-900 text-sm">{diagnostics.os}</div>
            </div>

            <div className="p-4 bg-zinc-50 rounded-2xl space-y-1">
              <div className="text-slate-500 font-medium">Screen Resolution</div>
              <div className="font-mono font-bold text-slate-900 text-sm">{diagnostics.screenResolution}</div>
            </div>

            <div className="p-4 bg-zinc-50 rounded-2xl space-y-1">
              <div className="text-slate-500 font-medium">System Language</div>
              <div className="font-bold text-slate-900 text-sm">{diagnostics.language}</div>
            </div>

          </div>

          <div className="p-4 bg-slate-900 text-slate-300 rounded-2xl space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400 font-mono">
              Raw User Agent String
            </div>
            <div className="font-mono text-xs break-all leading-relaxed bg-black/40 p-3 rounded-xl border border-slate-800 text-slate-200">
              {diagnostics.userAgent}
            </div>
          </div>
        </div>
      )}

      {/* 5. FAQ ACCORDION SECTION */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-sans flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-sky-600" />
            Frequently Asked Questions about IP Addresses
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Everything you need to know about IPv4, IPv6, location tracking, and online privacy.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                className="border border-zinc-200/80 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between bg-zinc-50/50 hover:bg-zinc-100/80 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-slate-900' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-zinc-100 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

{/* Default component wrapper if rendered directly */}
export function IpStudio() {
  return (
    <IpStudioProvider>
      <div className="space-y-10">
        <IpHeroCard />
        <IpDetailsDashboard />
      </div>
    </IpStudioProvider>
  );
}
