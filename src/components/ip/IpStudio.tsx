'use client';

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { IpResponseData } from '@/app/api/ip/route';
import { useHeroTheme } from '@/components/common/HeroThemeProvider';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { AdBanner } from '@/components/common/AdBanner';

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
  openFaq: number | null;
  setOpenFaq: React.Dispatch<React.SetStateAction<number | null>>;
  fetchIpDetails: (targetIp?: string) => Promise<void>;
  copyToClipboard: (text: string, label: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Load search history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cmi_ip_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const addToHistory = (ip: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== ip);
      const updated = [ip, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('cmi_ip_history', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('cmi_ip_history');
    } catch {
      // ignore
    }
  };

  // Fetch dedicated IPv4 if primary connection is IPv6
  const fetchDedicatedIpv4 = useCallback(async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      if (data?.ip && !data.ip.includes(':')) {
        setIpv4(data.ip);
      }
    } catch {
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

  const fetchIpDetails = useCallback(
    async (targetIp?: string) => {
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
            setError(data.message || 'Could not resolve IP details.');
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
      } catch (err) {
        console.error('IP Fetch Error:', err);
        setError('Network error while looking up IP information.');
      } finally {
        setLoading(false);
      }
    },
    [fetchDedicatedIpv4]
  );

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

  const downloadReport = (format: 'txt' | 'json') => {
    if (!ipData) return;

    let content = '';
    const mime = format === 'json' ? 'application/json' : 'text/plain';
    const filename = `ip-${ipData.ip}.${format}`;

    if (format === 'json') {
      content = JSON.stringify({ ...ipData, ipv4, ipv6 }, null, 2);
    } else {
      content = `CropMyImages — Public IP Lookup
Generated: ${new Date().toLocaleString()}

IP Address:       ${ipData.ip} (${ipData.type || 'IPv4'})
IPv4:             ${ipv4 || 'N/A'}
IPv6:             ${ipv6 || 'N/A'}
Hostname:         ${ipData.hostname || 'N/A'}

Location:         ${ipData.city}, ${ipData.region}, ${ipData.country} (${ipData.countryCode})
Postal Code:      ${ipData.postal || 'N/A'}
Coordinates:      ${ipData.latitude}, ${ipData.longitude}
Timezone:         ${ipData.timezone}

Provider:         ${ipData.isp}
Organization:     ${ipData.org}
ASN:              ${ipData.asn}

VPN Detected:     ${ipData.security?.isVpn ? 'Yes' : 'No'}
Proxy Detected:   ${ipData.security?.isProxy ? 'Yes' : 'No'}
Tor Node:         ${ipData.security?.isTor ? 'Yes' : 'No'}
Hosting/Cloud:    ${ipData.security?.isHosting ? 'Yes' : 'No'}
`;
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
        openFaq,
        setOpenFaq,
        fetchIpDetails,
        copyToClipboard,
        handleSearchSubmit,
        downloadReport,
        clearHistory,
      }}
    >
      {children}
    </IpStudioContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO IP STUDIO CARD (Clean, purposeful tool UI matching Cropper & Converter)
// ─────────────────────────────────────────────────────────────────────────────
export function IpHeroCard() {
  const { theme } = useHeroTheme();
  const isDark = theme === 'dark';

  const {
    ipData,
    ipv4,
    ipv6,
    loading,
    searchQuery,
    setSearchQuery,
    copied,
    fetchIpDetails,
    copyToClipboard,
    handleSearchSubmit,
  } = useIpStudioContext();

  const [activeTab, setActiveTab] = useState<'ipv4' | 'ipv6'>('ipv4');
  const displayIp =
    activeTab === 'ipv6'
      ? ipv6 || (ipData?.ip.includes(':') ? ipData.ip : null)
      : ipv4 || (ipData && !ipData.ip.includes(':') ? ipData.ip : null);

  return (
    <div
      className={`rounded-[2rem] p-6 sm:p-8 border transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] ${
        isDark
          ? 'bg-[#0B101D] border-slate-800/80 text-white'
          : 'bg-white border-slate-200/80 text-slate-900'
      }`}
    >
      {/* Top Controls: Protocol Tabs + Security Status Pill + Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/70 dark:border-slate-800/60">
        {/* Protocol Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('ipv4')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'ipv4'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-900 shadow-xs'
                : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            IPv4 Address
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ipv6')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ipv6'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-900 shadow-xs'
                : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>IPv6 Address</span>
            {ipv6 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
          </button>
        </div>

        {/* Status + Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Security connection badge */}
          {ipData && (
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
                ipData.security?.isVpn || ipData.security?.isProxy
                  ? isDark
                    ? 'bg-amber-950/60 text-amber-300 border-amber-800/50'
                    : 'bg-amber-50 text-amber-700 border-amber-200/80'
                  : isDark
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  ipData.security?.isVpn || ipData.security?.isProxy
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
              />
              <span>
                {ipData.security?.isVpn || ipData.security?.isProxy
                  ? 'VPN / Proxy Detected'
                  : 'Direct Connection'}
              </span>
            </span>
          )}

          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => fetchIpDetails(searchQuery || undefined)}
            disabled={loading}
            className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer disabled:opacity-50 ${
              isDark
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700/80'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
            }`}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Primary IP Display Section */}
      <div className="py-6 sm:py-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {activeTab === 'ipv4' ? 'Public IPv4' : 'Public IPv6'}
            </span>
            {loading ? (
              <div className="h-10 sm:h-12 w-64 rounded-xl animate-pulse bg-slate-200 dark:bg-slate-800" />
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`text-3xl sm:text-5xl font-mono font-bold tracking-tight select-all ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {displayIp || (activeTab === 'ipv6' ? 'No IPv6 Detected' : ipData?.ip || 'Resolving...')}
                </span>

                {displayIp && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(displayIp, 'main-ip')}
                    className={`inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                      copied === 'main-ip'
                        ? 'bg-emerald-500 text-white'
                        : isDark
                          ? 'bg-[#1E50F2] hover:bg-[#1945D4] text-white shadow-xs'
                          : 'bg-slate-900 hover:bg-black text-white shadow-xs'
                    }`}
                  >
                    {copied === 'main-ip' ? 'Copied' : 'Copy IP'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick Copy cURL helper */}
          {displayIp && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => copyToClipboard(`curl -s ${displayIp}`, 'curl-cmd')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors border cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                }`}
                title="Copy terminal command"
              >
                <span className="text-[#1E50F2] dark:text-sky-400 font-bold">$</span>
                <span>{copied === 'curl-cmd' ? 'Copied' : 'curl command'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Metadata Bar (Flag • Location • Provider • ASN) */}
        {!loading && ipData && (
          <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-medium">
            <span className="text-xl leading-none">{ipData.countryFlag}</span>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {ipData.city ? `${ipData.city}, ` : ''}{ipData.country}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{ipData.isp}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{ipData.asn}</span>
          </div>
        )}
      </div>

      {/* Integrated Search & Lookup Bar */}
      <div className="pt-5 border-t border-slate-200/70 dark:border-slate-800/60 space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Lookup an IP address or hostname (e.g. 1.1.1.1 or github.com)..."
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E50F2]/30 ${
                isDark
                  ? 'bg-slate-950/80 border-slate-800 text-white placeholder-slate-500 focus:border-[#1E50F2]'
                  : 'bg-slate-50 border-slate-200/80 text-slate-900 placeholder-slate-400 focus:border-[#1E50F2]'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all active:scale-95 shadow-xs cursor-pointer disabled:opacity-50 ${
              isDark
                ? 'bg-white hover:bg-slate-100 text-slate-950'
                : 'bg-slate-900 hover:bg-black text-white'
            }`}
          >
            Lookup
          </button>

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                fetchIpDetails();
              }}
              className={`px-3.5 py-2.5 rounded-xl font-semibold text-xs border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
              }`}
            >
              Reset to My IP
            </button>
          )}
        </form>

        {/* Quick DNS Presets */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="font-semibold text-slate-500 dark:text-slate-400">DNS Presets:</span>
          {[
            { label: 'Cloudflare', ip: '1.1.1.1' },
            { label: 'Google DNS', ip: '8.8.8.8' },
            { label: 'Quad9', ip: '9.9.9.9' },
          ].map((preset) => (
            <button
              key={preset.ip}
              type="button"
              onClick={() => {
                setSearchQuery(preset.ip);
                fetchIpDetails(preset.ip);
              }}
              className={`px-2.5 py-0.5 rounded-lg border font-mono transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-slate-800'
                  : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200/80 hover:border-blue-200'
              }`}
            >
              {preset.label} <span className="text-[10px] text-slate-400">({preset.ip})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DETAILS DASHBOARD: 2-COLUMN NETWORK & GEOLOCATION WORKBENCH
// ─────────────────────────────────────────────────────────────────────────────
export function IpDetailsDashboard() {
  const { theme } = useHeroTheme();
  const isDark = theme === 'dark';

  const {
    ipData,
    ipv4,
    ipv6,
    copied,
    localTime,
    copyToClipboard,
    downloadReport,
    openFaq,
    setOpenFaq,
  } = useIpStudioContext();

  const faqs = [
    {
      q: 'What is a public IP address?',
      a: 'A public IP address is an identifier assigned to your network connection by your Internet Service Provider (ISP). It enables web servers to deliver images, websites, and data back to your device across the internet.',
    },
    {
      q: 'How accurate is IP geolocation?',
      a: 'IP geolocation estimates your location based on your ISP routing hubs. It accurately identifies your country, state/region, and city, but it cannot pinpoint your exact street address or home coordinates.',
    },
    {
      q: 'What is the difference between IPv4 and IPv6?',
      a: 'IPv4 uses 32-bit addresses formatted as four dot-separated numbers (e.g., 192.0.2.1). IPv6 is the modern standard with 128-bit hexadecimal addresses (e.g., 2001:db8::1) created to provide virtually limitless unique addresses.',
    },
    {
      q: 'How can I keep my IP address private?',
      a: 'You can mask your public IP address by connecting through a Virtual Private Network (VPN), an encrypted proxy server, or by tethering to mobile cellular data.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* 2-Column Core Workbench: Left Specs + Right Geolocation Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Complete Network, Geolocation & Security Specs (7 cols) */}
        <div
          className={`lg:col-span-7 rounded-[2rem] p-6 sm:p-7 border transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-6 ${
            isDark
              ? 'bg-[#0B101D] border-slate-800/80 text-white'
              : 'bg-white border-slate-200/80 text-slate-900'
          }`}
        >
          <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 dark:border-slate-800/60">
              <div>
                <h3 className="font-bold text-sm tracking-tight font-sans">
                  Network &amp; Geolocation Specs
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  Technical attributes reported by your internet connection
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadReport('json')}
                  disabled={!ipData}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer disabled:opacity-50 ${
                    isDark
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                  }`}
                  title="Export JSON"
                >
                  Export JSON
                </button>
                <button
                  type="button"
                  onClick={() => downloadReport('txt')}
                  disabled={!ipData}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer disabled:opacity-50 ${
                    isDark
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                  }`}
                  title="Export TXT"
                >
                  Export TXT
                </button>
              </div>
            </div>

            {/* Structured Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 text-xs">
              {/* Row 1 */}
              <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Internet Provider</span>
                <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[150px]" title={ipData?.isp}>
                  {ipData?.isp || 'Unknown'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 font-medium">ASN</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">
                  {ipData?.asn || 'N/A'}
                </span>
              </div>

              {/* Row 2 */}
              <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Country</span>
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{ipData?.countryFlag}</span>
                  <span>{ipData?.country || 'Unknown'}</span>
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 font-medium">City &amp; Region</span>
                <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[150px]">
                  {ipData?.city ? `${ipData.city}, ` : ''}{ipData?.region || 'N/A'}
                </span>
              </div>

              {/* Row 3 */}
              <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Postal Code</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">
                  {ipData?.postal || 'N/A'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Coordinates</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">
                  {ipData?.latitude ? `${ipData.latitude.toFixed(3)}, ${ipData.longitude?.toFixed(3)}` : 'N/A'}
                </span>
              </div>

              {/* Row 4 */}
              <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Timezone</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {ipData?.timezone || 'UTC'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Local Clock</span>
                <span className="font-mono font-semibold text-[#1E50F2] dark:text-sky-400">
                  {localTime || 'Synchronizing...'}
                </span>
              </div>
            </div>

            {/* Security Status Badges Grid */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Connection Security Checks
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 space-y-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Proxy</span>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {ipData?.security?.isProxy ? 'Detected' : 'None'}
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 space-y-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">VPN</span>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {ipData?.security?.isVpn ? 'Active' : 'None'}
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 space-y-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Tor Node</span>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {ipData?.security?.isTor ? 'Yes' : 'Clean'}
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 space-y-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Network Type</span>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {ipData?.security?.isHosting ? 'Hosting' : 'Residential'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Copy summary button */}
          <button
            type="button"
            onClick={() => {
              if (ipData?.ip) {
                copyToClipboard(
                  `IP: ${ipData.ip} | Location: ${ipData.city}, ${ipData.country} | ISP: ${ipData.isp} (${ipData.asn})`,
                  'summary-copy'
                );
              }
            }}
            className={`w-full py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer flex items-center justify-center ${
              isDark
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
            }`}
          >
            {copied === 'summary-copy' ? 'Copied to Clipboard!' : 'Copy Summary Specs'}
          </button>
        </div>

        {/* RIGHT: Interactive Geolocation Map (5 cols) */}
        <div
          className={`lg:col-span-5 rounded-[2rem] p-6 sm:p-7 border transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-4 ${
            isDark
              ? 'bg-[#0B101D] border-slate-800/80 text-white'
              : 'bg-white border-slate-200/80 text-slate-900'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-800/60">
              <div>
                <h3 className="font-bold text-sm tracking-tight font-sans">
                  Geolocation Map
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  Approximate routing coordinates
                </p>
              </div>

              {ipData?.latitude && ipData?.longitude && (
                <a
                  href={`https://www.openstreetmap.org/?mlat=${ipData.latitude}&mlon=${ipData.longitude}#map=12/${ipData.latitude}/${ipData.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#1E50F2] dark:text-sky-400 hover:underline"
                >
                  Open Full Map ↗
                </a>
              )}
            </div>

            {/* Embedded OpenStreetMap Preview */}
            <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 relative bg-slate-100 dark:bg-slate-950">
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
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-medium">
                  Loading map coordinates...
                </div>
              )}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
            Note: IP-based geolocation maps to your ISP provider’s regional hub rather than a physical street address.
          </p>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3 SHOWCASE FEATURE CARDS (Matching CropMyImages Studio aesthetic) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200/70 dark:border-white/10">
        
        {/* Card 1: Dual-Stack Resolution */}
        <div
          className={`rounded-[2rem] p-6 border transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 ${
            isDark
              ? 'bg-[#0B101D] border-slate-800/80 text-white'
              : 'bg-white border-slate-200/70 text-slate-900'
          }`}
        >
          <div className="space-y-3">
            <span className="inline-block text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border text-[#1E50F2] bg-blue-50 border-blue-200/60 dark:text-sky-300 dark:bg-blue-950/60 dark:border-blue-800/50">
              Protocol Telemetry
            </span>
            <h4 className="font-body font-sans font-bold text-sm tracking-tight text-slate-900 dark:text-white">
              Dual-Stack IPv4 &amp; IPv6
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Detects both legacy IPv4 and modern IPv6 addresses simultaneously, with automatic protocol classification.
            </p>
          </div>
        </div>

        {/* Card 2: Privacy Guarantee */}
        <div
          className={`rounded-[2rem] p-6 border transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 ${
            isDark
              ? 'bg-[#0B101D] border-slate-800/80 text-white'
              : 'bg-white border-slate-200/70 text-slate-900'
          }`}
        >
          <div className="space-y-3">
            <span className="inline-block text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border text-emerald-700 bg-emerald-50 border-emerald-200/60 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-800/50">
              Zero Retention
            </span>
            <h4 className="font-body font-sans font-bold text-sm tracking-tight text-slate-900 dark:text-white">
              Zero Query Logging
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Your lookups are queried in real time. We never retain, store, or profile your personal IP address or search history.
            </p>
          </div>
        </div>

        {/* Card 3: ISP & Routing Health */}
        <div
          className={`rounded-[2rem] p-6 border transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 ${
            isDark
              ? 'bg-[#0B101D] border-slate-800/80 text-white'
              : 'bg-white border-slate-200/70 text-slate-900'
          }`}
        >
          <div className="space-y-3">
            <span className="inline-block text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border text-purple-700 bg-purple-50 border-purple-200/60 dark:text-purple-300 dark:bg-purple-950/60 dark:border-purple-800/50">
              ASN &amp; Routing
            </span>
            <h4 className="font-body font-sans font-bold text-sm tracking-tight text-slate-900 dark:text-white">
              ISP &amp; Autonomous Systems
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Inspect your autonomous system numbers (ASN), Internet Service Provider routing nodes, and proxy status in one click.
            </p>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* FAQ SECTION (Clean accordion with natural, helpful answers) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        className={`rounded-[2rem] p-6 sm:p-8 border transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6 ${
          isDark
            ? 'bg-[#0B101D] border-slate-800/80 text-white'
            : 'bg-white border-slate-200/80 text-slate-900'
        }`}
      >
        <div className="space-y-1">
          <h3 className="font-body font-sans font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
            Helpful answers on public IP addresses, geolocation, and online privacy
          </p>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200/70 dark:border-slate-800/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className={`w-full p-4 text-left font-semibold text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-slate-950/40 hover:bg-slate-900/60 text-white'
                      : 'bg-slate-50/70 hover:bg-slate-100/80 text-slate-900'
                  }`}
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 text-slate-400 ${
                      isOpen ? 'rotate-180 text-[#1E50F2] dark:text-sky-400' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="p-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900/30">
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

// ─────────────────────────────────────────────────────────────────────────────
// FULL PAGE VIEW (With Navbar, Sky Cloud Hero, and Footer)
// ─────────────────────────────────────────────────────────────────────────────
export function WhatIsMyIpView() {
  const { theme } = useHeroTheme();
  const isDark = theme === 'dark';

  return (
    <IpStudioProvider>
      <div
        className={`ip-page-container min-h-screen flex flex-col font-sans transition-colors duration-300 ${
          isDark
            ? 'bg-[#060913] text-slate-100 selection:bg-sky-500 selection:text-white'
            : 'bg-[#F8FAFC] text-slate-900 selection:bg-slate-900 selection:text-white'
        }`}
      >
        <main className="flex-1 w-full">
          {/* HERO SECTION WITH CLOUD BACKDROP */}
          <div
            className={`relative bg-sky-cloud-hero border-b overflow-hidden min-h-screen flex flex-col justify-between transition-colors duration-300 ${
              isDark ? 'border-white/10' : 'border-zinc-200/60'
            }`}
          >
            <div>
              <Navbar />

              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                <AdBanner slot="top-landing-leaderboard" format="horizontal" label="Advertisement" />
              </div>

              {/* CLEAN, AUTHENTIC HERO HEADLINE */}
              <section className="pt-6 pb-6 px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-3xl mx-auto space-y-3">
                  <h1
                    className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight font-heading transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    What is my IP address?
                  </h1>

                  <p
                    className={`text-sm sm:text-base max-w-lg mx-auto font-normal leading-relaxed transition-colors ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Check your public IP, internet service provider, approximate location, and connection security in real time.
                  </p>
                </div>
              </section>

              {/* MAIN HERO IP STUDIO */}
              <div id="ip-studio" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 scroll-mt-6">
                <IpHeroCard />
              </div>
            </div>
          </div>

          {/* DASHBOARD DETAILS, MAP & FAQ SECTION */}
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <IpDetailsDashboard />
          </div>

        </main>

        <Footer />
      </div>
    </IpStudioProvider>
  );
}

// Standalone export wrapper
export function IpStudio() {
  return (
    <IpStudioProvider>
      <div className="space-y-8">
        <IpHeroCard />
        <IpDetailsDashboard />
      </div>
    </IpStudioProvider>
  );
}
