import React, { useState, useEffect } from 'react';
import {
  Scale,
  Copy,
  Check,
  Download,
  BookOpen,
  Home,
  Github,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  FileText,
  Terminal
} from 'lucide-react';

interface LicensePageProps {
  onNavigate: (page: 'home' | 'docs' | 'license' | 'blueprint') => void;
  onShowToast: (msg: string, desc?: string, type?: 'info' | 'success' | 'warning') => void;
}

const APACHE_LICENSE_TEXT = `                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      patent license to make, have made, use, offer to sell, sell, import,
      and otherwise transfer the Work.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      shall any Contributor be liable to You for damages, including any
      direct, indirect, special, incidental, or consequential damages.

   END OF TERMS AND CONDITIONS

   Copyright 2026 Aakhil Shaik

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.`;

export function LicensePage({ onNavigate, onShowToast }: LicensePageProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCopyLicense = () => {
    navigator.clipboard.writeText(APACHE_LICENSE_TEXT);
    setCopied(true);
    onShowToast('License copied', 'Apache License 2.0 text copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadLicense = () => {
    const blob = new Blob([APACHE_LICENSE_TEXT], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'LICENSE';
    link.click();
    URL.revokeObjectURL(url);
    onShowToast('Downloading LICENSE file', 'Saved LICENSE to your downloads.', 'info');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-baseline font-extrabold tracking-tight text-xl text-slate-950 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Nava
            <span className="inline-block w-2 h-2 bg-indigo-600 rounded-[1px] ml-1 mb-0.5" />
          </button>

          <span className="text-slate-300 font-mono">/</span>

          <span className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
            <Scale size={15} className="text-indigo-600" />
            <span>License</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-950 font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Home</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('docs')}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-950 font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            <BookOpen size={14} />
            <span>Docs</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('blueprint')}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-950 font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            <FileText size={14} />
            <span>Blueprint</span>
          </button>

          <a
            href="https://pypi.org/project/nava-agent/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono rounded-lg transition-colors flex items-center gap-1.5 font-semibold"
          >
            <Terminal size={13} className="text-emerald-600" />
            <span>v0.3.1 PyPI</span>
          </a>

          <a
            href="https://github.com/Aakhilshaik204/nava-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
            title="GitHub Repository"
          >
            <Github size={16} />
          </a>
        </div>
      </header>

      {/* Main License Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto py-10 px-4 sm:px-8 space-y-8">
        {/* Title Header */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-semibold">
            <span>SPDX: Apache-2.0</span>
            <span>•</span>
            <span>OSI Approved</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Apache License 2.0
          </h1>

          <p className="text-slate-600 text-sm leading-relaxed">
            NAVA is open source software released under the <strong className="text-slate-900 font-semibold">Apache License, Version 2.0</strong> with dual MIT compatibility. Copyright © 2026 <strong>Aakhil Shaik</strong>.
          </p>
        </div>

        {/* 3 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-mono text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
              ✓ Permissions Granted
            </span>
            <p className="text-slate-700 leading-relaxed">
              Commercial use, modification, distribution, sublicensing, private use, and an express patent grant from contributors.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-mono text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
              ℹ Conditions Required
            </span>
            <p className="text-slate-700 leading-relaxed">
              Include original copyright notice, a copy of this license, and prominent state change notices on modified source files.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              ⚠ Limitations
            </span>
            <p className="text-slate-700 leading-relaxed">
              No trademark rights are granted. Software is provided on an "AS IS" basis with zero liability and warranty.
            </p>
          </div>
        </div>

        {/* License Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500 font-mono">
            <span>Source: </span>
            <code className="text-slate-800 font-semibold">LICENSE</code>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLicense}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? 'Copied Full Text' : 'Copy License'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadLicense}
              className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download size={14} />
              <span>Download LICENSE</span>
            </button>
          </div>
        </div>

        {/* Formatted License Text Box */}
        <div className="p-6 bg-slate-950 text-slate-300 font-mono text-xs rounded-2xl border border-slate-800 leading-relaxed overflow-x-auto shadow-inner selection:bg-indigo-500 selection:text-white">
          <pre>{APACHE_LICENSE_TEXT}</pre>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>© 2026 Aakhil Shaik. Licensed under Apache 2.0.</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('docs')}
              className="text-indigo-600 hover:underline font-medium cursor-pointer"
            >
              Read Documentation →
            </button>
            <button
              type="button"
              onClick={() => onNavigate('blueprint')}
              className="text-slate-700 hover:underline font-medium cursor-pointer"
            >
              55-Page Blueprint
            </button>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-slate-700 hover:underline font-medium cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
