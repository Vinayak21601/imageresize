import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { IpStudioProvider, IpHeroCard, IpDetailsDashboard } from '@/components/ip/IpStudio';
import { AdBanner } from '@/components/common/AdBanner';
import { Globe, Shield, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What Is My IP Address? - Public IPv4, IPv6 & Location Lookup',
  description:
    'Instantly check your public IPv4 & IPv6 address, internet service provider (ISP), geolocation, city, country, timezone, proxy/VPN security status, and network latency.',
  keywords: [
    'what is my ip',
    'my ip address',
    'ip lookup',
    'ipv4 address',
    'ipv6 address',
    'ip location finder',
    'isp lookup',
    'vpn check',
    'proxy detector',
  ],
};

export default function WhatIsMyIpPage() {
  return (
    <IpStudioProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
        <main className="flex-1 w-full">
          
          {/* HERO SECTION WITH CLOUD BACKDROP (STRICTLY CLOSES AFTER THE HERO IP CARD!) */}
          <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden min-h-screen flex flex-col justify-between">
            <Navbar />

            <section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto space-y-4">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-zinc-200/80 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  Instant IP Geolocation &amp; ISP Security Tool
                </div>

                {/* H1 Heading */}
                <h1 className="sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                  What is my IP address? <br className="hidden sm:inline" />
                  <em className="font-serif italic font-normal text-slate-900">Instant &amp; accurate network details.</em>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                  Discover your public IPv4 / IPv6 address, Internet Service Provider (ISP), exact location coordinates, proxy/VPN security status, and device diagnostics in real time.
                </p>
              </div>
            </section>

            {/* TOP CONTAINER: AD BANNER + HERO IP CARD */}
            <div id="ip-studio" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-6">
              <AdBanner slot="top-landing-leaderboard" format="horizontal" label="Advertisement" />

              <div className="py-6">
                <IpHeroCard />
              </div>
            </div>
          </div>
          {/* === CLOUD BACKDROP ENDS HERE! === */}

          {/* ALL OTHER DASHBOARD & DETAILS SECTIONS SIT ON LIGHT BACKGROUND BELOW */}
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            
            {/* IP Search Lookup, Location Grid, Map, Ping Test, Diagnostics & FAQ */}
            <IpDetailsDashboard />

            {/* FEATURE HIGHLIGHT SECTION */}
            <div className="pt-8 border-t border-zinc-200/80 space-y-12">
              
              <div className="text-center space-y-3">
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading">
                  Complete Network Intelligence &amp; Privacy
                </h2>
                <p className="text-sm text-slate-700 max-w-lg mx-auto font-normal">
                  Get enterprise-grade insights into your digital footprint and online connection status.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black shadow-sm">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-sans">Dual IPv4 &amp; IPv6 Resolution</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Detects both IPv4 and modern IPv6 addresses with automatic protocol classification and host domain lookup.
                  </p>
                </div>

                <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black shadow-sm">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-sans">Interactive Map Geolocation</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Pinpoint geographic coordinates down to city, state, postal code, and ISP routing hub with embedded OpenStreetMap.
                  </p>
                </div>

                <div className="p-8 bg-white border border-zinc-200/80 rounded-3xl space-y-4 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black shadow-sm">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-sans">Proxy &amp; VPN Security Check</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Verify whether your internet traffic is passing through a VPN tunnel, proxy server, Tor node, or datacenter network.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </main>

        <Footer />
      </div>
    </IpStudioProvider>
  );
}
