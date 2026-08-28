import type { BlogPost } from '../../../types/blog';

export const erc3643ComplianceEngineDeepDive: BlogPost = {
  id: 'erc3643-trex-token-standard-deep-dive',
  category: 'software-engineer',
  title: 'Under the Hood of Permissioned Tokens: ERC-3643 (T-REX) Compliance Engine & ONCHAINID',
  description: 'A comprehensive technical deep dive into ERC-3643 (formerly T-REX), the open-source Ethereum standard for permissioned security tokens — examining ONCHAINID (ERC-734/735), the Identity Registry, the modular Compliance Engine, and forced transfer recovery mechanisms.',
  date: '2026-08-28',
  updatedDate: '2026-08-28',
  tags: ['Blockchain', 'Solidity', 'Smart Contracts', 'ERC-3643', 'T-REX', 'Identity', 'Compliance', 'Security Tokens'],
  image: 'blockchain-end-of-idealism-en.webp',
  content: `
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">Home</a></li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <a href="/blog/software-engineer/list" class="ml-2 hover:text-gray-700 dark:hover:text-gray-300">Software Engineer</a>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="ml-2 text-gray-400">ERC-3643 Deep Dive</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-indigo-600 dark:text-indigo-400 uppercase" data-section="true">
        RWA & STO Deep Dive Series #04
      </p>
      <h1 data-title="true" class="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white">
        Under the Hood of Permissioned Tokens: ERC-3643 (T-REX) Compliance Engine & ONCHAINID
      </h1>
      <div class="text-sm text-gray-500 mt-2">Published: August 28, 2026 &bull; 15 min read</div>
    </header>

    <div class="xl:hidden mt-4 mb-6 border rounded-xl p-4 bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700">
      <h3 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 text-sm">
        <li class="whitespace-nowrap mobile-wrap"><a href="#why-erc20-fails" class="hover:text-indigo-600 dark:hover:text-indigo-400">1. Why Standard ERC-20 Fails for Securities</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#erc3643-architecture" class="hover:text-indigo-600 dark:hover:text-indigo-400">2. The 4-Pillar Architecture of ERC-3643</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#onchainid" class="hover:text-indigo-600 dark:hover:text-indigo-400">3. ONCHAINID: Verifiable Claims without Exposing PII</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#transfer-lifecycle" class="hover:text-indigo-600 dark:hover:text-indigo-400">4. The Transfer Execution Lifecycle (Step-by-Step)</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#solidity-compliance" class="hover:text-indigo-600 dark:hover:text-indigo-400">5. Modular Compliance Engine in Solidity</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#legal-recovery" class="hover:text-indigo-600 dark:hover:text-indigo-400">6. Legal Recovery: Force Transfer & Loss of Private Key</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">

      <!-- Section 1: Why ERC-20 Fails -->
      <section class="mb-10" id="why-erc20-fails">
        <h2 class="inline-block mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">1. Why Standard ERC-20 Fails for Securities</h2>
        
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          The standard <code>ERC-20</code> token specification was designed under the philosophy of <strong>permissionless open access</strong>: anyone holding a private key can transfer tokens to any arbitrary Ethereum address (<code>0x...</code>) with zero restrictions.
        </p>

        <div class="p-4 my-4 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded-r-xl">
          <h4 class="font-bold text-red-900 dark:text-red-200 text-sm">Why ERC-20 Violates Securities Law</h4>
          <ul class="list-disc pl-5 space-y-1 text-xs text-gray-700 dark:text-gray-300 mt-2">
            <li><strong>No KYC/AML Check at Runtime:</strong> Tokens can be transferred to sanctioned individuals (OFAC list) or non-accredited retail buyers.</li>
            <li><strong>Inability to Enforce Jurisdictional Caps:</strong> Cannot restrict maximum token holders per country (e.g., US 2,000 shareholder cap under Exchange Act Rule 12g-1).</li>
            <li><strong>No Asset Recovery Mechanism:</strong> If an investor loses their private key or a court issues a freeze/seizure order, tokens cannot be legally reissued or burned.</li>
          </ul>
        </div>

        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          To solve this without sacrificing public blockchain interoperability, the Ethereum community finalized <strong>ERC-3643 (formerly T-REX: Token for Regulated EXchanges)</strong>.
        </p>
      </section>

      <!-- Section 2: ERC-3643 Architecture -->
      <section class="mb-10" id="erc3643-architecture">
        <h2 class="inline-block mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">2. The 4-Pillar Architecture of ERC-3643</h2>

        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          ERC-3643 decouples the security token into four interconnected smart contracts:
        </p>

        <!-- 4-Pillar Architecture Cards -->
        <div class="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div class="p-5 bg-slate-900 text-slate-100 rounded-xl border border-slate-700">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-indigo-400 uppercase">Core Token</span>
              <span class="text-xs px-2 py-0.5 bg-indigo-900/60 text-indigo-300 rounded font-mono">IERC3643</span>
            </div>
            <h4 class="text-base font-bold text-white mt-2">1. Token Contract</h4>
            <p class="text-xs text-slate-300 mt-1">
              Extends standard ERC-20 interfaces for balance queries and transfers, but intercepts every <code>transfer()</code> and <code>transferFrom()</code> call to enforce mandatory compliance checks before altering balances.
            </p>
          </div>

          <div class="p-5 bg-slate-900 text-slate-100 rounded-xl border border-slate-700">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-emerald-400 uppercase">Identity Registry</span>
              <span class="text-xs px-2 py-0.5 bg-emerald-900/60 text-emerald-300 rounded font-mono">IIdentityRegistry</span>
            </div>
            <h4 class="text-base font-bold text-white mt-2">2. Identity Registry</h4>
            <p class="text-xs text-slate-300 mt-1">
              Maintains the mapping between user wallet addresses (<code>0x...</code>), their sovereign identity smart contract (ONCHAINID), and their ISO country code.
            </p>
          </div>

          <div class="p-5 bg-slate-900 text-slate-100 rounded-xl border border-slate-700">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-blue-400 uppercase">Issuer Registry</span>
              <span class="text-xs px-2 py-0.5 bg-blue-900/60 text-blue-300 rounded font-mono">IClaimTopicsRegistry</span>
            </div>
            <h4 class="text-base font-bold text-white mt-2">3. Claim Topics & Trusted Issuers</h4>
            <p class="text-xs text-slate-300 mt-1">
              Defines which verified claim topics (e.g., Topic 1 = KYC Cleared, Topic 7 = Accredited Investor) and which authorized trusted KYC providers (e.g., Securitize, Synaps) are valid for this token.
            </p>
          </div>

          <div class="p-5 bg-slate-900 text-slate-100 rounded-xl border border-slate-700">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-amber-400 uppercase">Rule Engine</span>
              <span class="text-xs px-2 py-0.5 bg-amber-900/60 text-amber-300 rounded font-mono">ICompliance</span>
            </div>
            <h4 class="text-base font-bold text-white mt-2">4. Modular Compliance Contract</h4>
            <p class="text-xs text-slate-300 mt-1">
              A pluggable rule engine that evaluates portfolio-level and market-level rules (e.g., maximum tokens per investor, holding period locks, nationality transfer restrictions).
            </p>
          </div>

        </div>
      </section>

      <!-- Section 3: ONCHAINID -->
      <section class="mb-10" id="onchainid">
        <h2 class="inline-block mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">3. ONCHAINID: Verifiable Claims without Exposing PII</h2>

        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          Storing personal data (names, social security numbers, passport copies) on a public blockchain violates privacy laws like GDPR and PIPA. 
          ERC-3643 resolves this by leveraging <strong>ONCHAINID (based on ERC-734 / ERC-735)</strong>:
        </p>

        <div class="my-4 p-5 bg-slate-900 text-slate-100 rounded-xl border border-slate-700 font-mono text-xs">
          <div class="text-indigo-400 font-bold mb-2">// On-Chain Identity Verification Scheme</div>
          <div class="text-slate-300">
            1. Investor conducts off-chain KYC with a Trusted KYC Provider.<br/>
            2. KYC Provider signs an attestation hash: <span class="text-amber-300">keccak256(InvestorAddress, ClaimTopic, Expiration)</span>.<br/>
            3. The signature hash is stored in the investor's ONCHAINID smart contract.<br/>
            4. <strong>Result:</strong> Zero plain text PII on-chain. Smart contracts verify only cryptographic signatures!
          </div>
        </div>
      </section>

      <!-- Section 4: Transfer Lifecycle -->
      <section class="mb-10" id="transfer-lifecycle">
        <h2 class="inline-block mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">4. The Transfer Execution Lifecycle (Step-by-Step)</h2>

        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          When Alice calls <code>token.transfer(Bob, 1000)</code>, the token contract executes the following verification sequence before updating ledger balances:
        </p>

        <div class="my-6 p-6 bg-slate-900 text-slate-100 rounded-2xl border border-slate-700">
          <ol class="list-decimal pl-5 space-y-3 text-xs text-slate-300">
            <li>
              <strong class="text-white">Address Validation:</strong> Checks that Alice and Bob are both registered in the <code>IdentityRegistry</code>.
            </li>
            <li>
              <strong class="text-white">Claim Verification:</strong> Reads Bob's <code>ONCHAINID</code> to verify that Bob holds valid, unexpired claims issued by a trusted KYC provider for all required <code>ClaimTopics</code>.
            </li>
            <li>
              <strong class="text-white">Compliance Check:</strong> Invokes <code>compliance.canTransfer(Alice, Bob, 1000)</code> to evaluate dynamic rules (e.g., maximum investor limits, lockup schedules).
            </li>
            <li>
              <strong class="text-white">State Update & Notification:</strong> If and only if all checks return <code>true</code>, balances are updated and <code>compliance.transferred(Alice, Bob, 1000)</code> is triggered to update state counters.
            </li>
          </ol>
        </div>
      </section>

      <!-- Section 5: Solidity Code Breakdown -->
      <section class="mb-10" id="solidity-compliance">
        <h2 class="inline-block mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">5. Modular Compliance Engine in Solidity</h2>

        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          Here is a simplified architectural implementation of how the <code>canTransfer</code> and <code>transfer</code> hooks are constructed in Solidity:
        </p>

        <div class="my-4 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-4 font-mono text-xs text-slate-200">
<pre><code><span class="text-indigo-400">// SPDX-License-Identifier: MIT</span>
<span class="text-purple-400">pragma solidity</span> ^0.8.20;

<span class="text-purple-400">interface</span> <span class="text-blue-400">ICompliance</span> {
    <span class="text-purple-400">function</span> <span class="text-yellow-300">canTransfer</span>(<span class="text-purple-400">address</span> _from, <span class="text-purple-400">address</span> _to, <span class="text-purple-400">uint256</span> _amount) <span class="text-purple-400">external view returns</span> (<span class="text-purple-400">bool</span>);
    <span class="text-purple-400">function</span> <span class="text-yellow-300">transferred</span>(<span class="text-purple-400">address</span> _from, <span class="text-purple-400">address</span> _to, <span class="text-purple-400">uint256</span> _amount) <span class="text-purple-400">external</span>;
}

<span class="text-purple-400">contract</span> <span class="text-blue-400">ERC3643Token</span> {
    <span class="text-blue-400">IIdentityRegistry</span> <span class="text-purple-400">public</span> identityRegistry;
    <span class="text-blue-400">ICompliance</span> <span class="text-purple-400">public</span> compliance;
    <span class="text-purple-400">mapping</span>(<span class="text-purple-400">address</span> => <span class="text-purple-400">uint256</span>) <span class="text-purple-400">private</span> _balances;

    <span class="text-purple-400">function</span> <span class="text-yellow-300">transfer</span>(<span class="text-purple-400">address</span> _to, <span class="text-purple-400">uint256</span> _amount) <span class="text-purple-400">public returns</span> (<span class="text-purple-400">bool</span>) {
        <span class="text-yellow-300">require</span>(identityRegistry.<span class="text-yellow-300">isVerified</span>(_to), <span class="text-emerald-400">"Receiver not KYC verified"</span>);
        <span class="text-yellow-300">require</span>(compliance.<span class="text-yellow-300">canTransfer</span>(msg.sender, _to, _amount), <span class="text-emerald-400">"Compliance rule violation"</span>);

        _balances[msg.sender] -= _amount;
        _balances[_to] += _amount;

        compliance.<span class="text-yellow-300">transferred</span>(msg.sender, _to, _amount);
        <span class="text-purple-400">return true</span>;
    }
}</code></pre>
        </div>
      </section>

      <!-- Section 6: Legal Recovery -->
      <section class="mb-10" id="legal-recovery">
        <h2 class="inline-block mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">6. Legal Recovery: Force Transfer & Loss of Private Key</h2>

        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          In DeFi, <em>"not your keys, not your coins"</em> is absolute. But in regulated capital markets, if an investor dies or loses their private key, <strong>legal ownership of the asset does not vanish</strong>.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div class="p-4 bg-slate-900 rounded-xl border border-slate-700 text-slate-100">
            <h4 class="font-bold text-sm text-indigo-400">1. Forced Transfer (<code>forcedTransfer</code>)</h4>
            <p class="text-xs text-slate-300 mt-1">
              Authorized token agents can execute a transfer without the sender's signature upon receiving a court order, regulatory seizure, or inheritance verdict.
            </p>
          </div>
          <div class="p-4 bg-slate-900 rounded-xl border border-slate-700 text-slate-100">
            <h4 class="font-bold text-sm text-emerald-400">2. Identity Wallet Recovery (<code>recoveryAddress</code>)</h4>
            <p class="text-xs text-slate-300 mt-1">
              If an investor loses their private key, the identity issuer verifies their off-chain identity, burns the tokens at the lost address, and remints them to the investor's newly verified wallet.
            </p>
          </div>
        </div>
      </section>

    </div>
  `
};
