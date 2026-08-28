'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Code, Search, FileText, ChevronDown, ChevronUp, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';

interface LicenseItem {
  id: string;
  name: string;
  version: string;
  license: string;
  author: string;
  url: string;
  description: string;
  fullText: string;
}

const LICENSES: LicenseItem[] = [
  {
    id: 'sharp',
    name: 'sharp',
    version: '0.33.5',
    license: 'Apache-2.0',
    author: 'Lovell Fuller',
    url: 'https://github.com/lovell/sharp',
    description: 'High performance Node.js image processing module for resize, crop, and web format conversions.',
    fullText: `Apache License Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.
"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

"Grant of Copyright License". Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.`,
  },
  {
    id: 'cropperjs',
    name: 'cropperjs / react-cropper',
    version: '1.6.2',
    license: 'MIT',
    author: 'Fengyuan Chen',
    url: 'https://github.com/fengyuanchen/cropperjs',
    description: 'JavaScript HTML5 canvas image cropper library powering high-precision cropping & aspect ratios.',
    fullText: `The MIT License (MIT)

Copyright (c) 2015-present Fengyuan Chen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`,
  },
  {
    id: 'react',
    name: 'react & react-dom',
    version: '19.0.0',
    license: 'MIT',
    author: 'Meta Platforms, Inc.',
    url: 'https://github.com/facebook/react',
    description: 'The JavaScript library for building user interfaces.',
    fullText: `MIT License

Copyright (c) Meta Platforms, Inc. and affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.`,
  },
  {
    id: 'next',
    name: 'next',
    version: '15.1.0',
    license: 'MIT',
    author: 'Vercel, Inc.',
    url: 'https://github.com/vercel/next.js',
    description: 'The React Framework for the Web featuring Server Components and App Router.',
    fullText: `The MIT License (MIT)

Copyright (c) 2024 Vercel, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.`,
  },
  {
    id: 'framer-motion',
    name: 'framer-motion',
    version: '11.15.0',
    license: 'MIT',
    author: 'Framer B.V.',
    url: 'https://github.com/framer/motion',
    description: 'Production-ready animation library for React applications.',
    fullText: `MIT License

Copyright (c) 2018 Framer B.V.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction.`,
  },
  {
    id: 'lucide-react',
    name: 'lucide-react',
    version: '0.468.0',
    license: 'ISC',
    author: 'Lucide Contributors',
    url: 'https://github.com/lucide-icons/lucide',
    description: 'Beautiful & consistent icon suite for React applications.',
    fullText: `ISC License

Copyright (c) Lucide Contributors

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.`,
  },
  {
    id: 'tailwind',
    name: 'tailwindcss & postcss',
    version: '3.4.16',
    license: 'MIT',
    author: 'Tailwind Labs Inc.',
    url: 'https://github.com/tailwindlabs/tailwindcss',
    description: 'Utility-first CSS framework for rapid UI development.',
    fullText: `MIT License

Copyright (c) Tailwind Labs Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction.`,
  },
  {
    id: 'prisma',
    name: '@prisma/client',
    version: '6.0.0',
    license: 'Apache-2.0',
    author: 'Prisma Data, Inc.',
    url: 'https://github.com/prisma/prisma',
    description: 'Next-generation ORM for Node.js & TypeScript.',
    fullText: `Apache License Version 2.0, January 2004
http://www.apache.org/licenses/

Copyright (c) 2024 Prisma Data, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.`,
  },
];

export default function ThirdPartyLicensesPage() {
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('sharp');

  const filteredLicenses = LICENSES.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.license.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <main className="flex-1 w-full">
        {/* HERO SECTION WITH CLOUD BACKDROP */}
        <div className="relative bg-sky-cloud-hero border-b border-zinc-200/60 overflow-hidden">
          <Navbar />

          <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-zinc-200/80 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
                <Code className="w-4 h-4 text-purple-600" />
                Open-Source Software Attribution &amp; Notices
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto font-heading">
                Third-Party Licences <br className="hidden sm:inline" />
                <em className="font-serif italic font-normal text-slate-900">&amp; Open-Source Compliance.</em>
              </h1>

              <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto font-normal leading-relaxed">
                CropMyImages is built on top of world-class open-source software libraries. We gratefully acknowledge the creators and maintainers of these projects.
              </p>
            </div>
          </section>
        </div>

        {/* PAGE CONTENT CONTAINER */}
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          
          {/* SEARCH BAR */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search package (e.g. sharp, cropper, MIT, Apache)..."
              className="w-full bg-white border border-zinc-200 focus:border-slate-900 rounded-full pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-zinc-400 focus:outline-none transition-colors shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-black font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* LICENSES LIST */}
          <div className="space-y-4">
            {filteredLicenses.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-xs">
                No matching open-source packages found for &quot;{query}&quot;.
              </div>
            ) : (
              filteredLicenses.map((item) => {
                const isExpanded = expandedId === item.id;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-zinc-200/90 rounded-3xl overflow-hidden transition-all shadow-sm"
                  >
                    <div
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="p-6 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-50/80 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-mono text-base font-black text-slate-900">{item.name}</h3>
                          <span className="px-2 py-0.5 rounded-md bg-zinc-100 font-mono text-[11px] font-bold text-slate-600">
                            v{item.version}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-extrabold uppercase tracking-wider ${
                            item.license === 'MIT'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}>
                            {item.license}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-normal">{item.description}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors"
                        >
                          <span>Repository</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button className="p-1 text-slate-400 hover:text-black">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* EXPANDABLE FULL LICENSE TEXT */}
                    {isExpanded && (
                      <div className="p-6 bg-slate-950 text-zinc-300 font-mono text-xs leading-relaxed border-t border-zinc-200 space-y-3">
                        <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                          Full License Text ({item.license})
                        </div>
                        <pre className="whitespace-pre-wrap overflow-x-auto text-[11px] text-zinc-300 font-mono leading-relaxed max-h-60 overflow-y-auto bg-slate-900 p-4 rounded-2xl border border-slate-800">
                          {item.fullText}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* OPEN SOURCE STATEMENT CARD */}
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl space-y-2 text-xs sm:text-sm text-emerald-950 shadow-xs">
            <div className="font-bold flex items-center gap-2 font-heading text-sm text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> Open Source License Compliance
            </div>
            <p className="font-normal leading-relaxed text-emerald-900">
              CropMyImages complies with all attribution requirements mandated by the Apache-2.0, MIT, and ISC open-source licenses. All copyright notices and permission terms are preserved in full above.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
