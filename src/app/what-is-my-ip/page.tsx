import React from 'react';
import { Metadata } from 'next';
import { WhatIsMyIpView } from '@/components/ip/IpStudio';

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
  return <WhatIsMyIpView />;
}
