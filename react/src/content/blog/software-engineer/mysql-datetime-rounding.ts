import type { BlogPost } from '../../../types/blog';

export const mysqlDatetimeRounding: BlogPost = {
  id: 'mysql-datetime-rounding',
  title: 'The Backfire of MySQL DATETIME Rounding (feat. A Broken 365-Day Streak)',
  description: 'A deep dive into data integrity issues caused by nanosecond rounding in MySQL\'s DATETIME and TIMESTAMP columns, and how a microsecond can break a user\'s daily check-in streak.',
  category: 'software-engineer',
  date: '2026-04-16',
  updatedDate: '2026-04-17',
  tags: ['MySQL', 'Database', 'Troubleshooting', 'DATETIME', 'Timestamp', 'Rounding'],
  image: 'mysql-rounding-placeholder.webp',
  content: `
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <li><a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">Home</a></li>
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
          <span class="ml-2 text-gray-400 dark:text-gray-500">MySQL DATETIME Rounding Issue</span>
        </li>
      </ol>
    </nav>

    <header class="mb-8">
      <div class="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-600 dark:text-gray-300 uppercase">
        Database & Troubleshooting
      </div>
      <h1 class="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">
        The Backfire of MySQL DATETIME Rounding (feat. A Broken 365-Day Streak)
      </h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Published: April 16, 2026</div>
    </header>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">The Problem</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        In our application, we recently received a furious support ticket from a highly engaged user. They claimed their hard-earned <strong>365-day daily check-in streak</strong> had suddenly reset to zero, despite them swearing they clicked the check-in button just before midnight.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Upon investigating the data, the application logs showed they did indeed check in at the last possible fraction of a second. However, when the application attempted to persist the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">last_check_in_at</code> timestamp with nanoseconds calculated as <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">.999999999</code>, MySQL <strong>rounded it up to the next second</strong> upon saving, causing the date to inadvertently roll over to the next day.
      </p>
      

    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Root Cause Analysis</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        MySQL's <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">DATETIME</code> and <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">TIMESTAMP</code> types can store fractional seconds. 
        However, their behavior is determined by the declared fractional seconds precision (known as <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">fsp</code>).
      </p>

      <ul class="list-disc pl-5 space-y-3 mb-6 text-gray-900 dark:text-gray-100">
        <li>
          <strong>Default Behavior:</strong> If the column is simply declared as <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">DATETIME</code> or <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">DATETIME(0)</code>, it does not store fractional seconds.
        </li>
        <li>
          <strong>How it Operates:</strong> When inserting or updating <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">LocalDateTime</code> data containing nanoseconds from a Java or Kotlin application, MySQL automatically <strong>rounds</strong> the value to match the column's precision. (It does not simply truncate/drop the decimals!)
        </li>
      </ul>
      
      <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-4 my-6">
        <h3 class="font-bold text-lg mb-2 text-red-900 dark:text-red-100">Example of the Problematic Value</h3>
        <ul class="text-red-800 dark:text-red-200 list-none space-y-2 font-mono text-sm">
          <li>👉 <span class="font-bold">Application sent:</span> <code class="bg-white dark:bg-gray-800 px-1 py-0.5 rounded ml-1">2026-02-18 23:59:59.999999999</code></li>
          <li>🚨 <span class="font-bold">MySQL DATETIME(0) stored value:</span> <code class="bg-white dark:bg-gray-800 px-1 py-0.5 rounded ml-1">2026-02-19 00:00:00</code> (Rounding occurred!)</li>
        </ul>
      </div>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8 text-gray-900 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Why Did the Streak Break?</h2>
      <p class="mb-4">
        When evaluating daily attendance streaks, our chronological queries often check if a user has a <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">last_check_in_at</code> record occurring on the expected day. Developers frequently use inclusive conditions like <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">check_in_time BETWEEN '2026-02-18 00:00:00' AND '2026-02-18 23:59:59'</code>.
      </p>
      <p class="mb-4">
        Since the user's last-minute check-in was rounded up to the literal value <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">2026-02-19 00:00:00</code> in the database, the check-in count for the 18th queried as <strong>zero</strong>. Our streak evaluation job ran, noticed the gap for the 18th, and immediately wiped out the 365-day streak.
      </p>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8 text-gray-900 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Solutions</h2>
      <p class="mb-4">
        To completely circumvent this "split-second discrepancy", here are three viable strategies to consider:
      </p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">1. Truncate at the Application Level</h3>
      <p class="mb-4">
        Explicitly control the time fraction before passing the value to the DB. You can manually adjust the precision by stripping the nanoseconds or dropping them to the microsecond level prior to saving.
      </p>
      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-xs font-mono">
<span class="text-gray-500">// Kotlin/Java Example</span>
<span class="text-gray-500">// Remove nanoseconds entirely for safe storage</span>
<span class="text-blue-400">val</span> safeCheckInTime = LocalDateTime.now().withNano(<span class="text-blue-400">0</span>) 

<span class="text-gray-500">// Or explicitly truncate to 6 decimal places (Microseconds)</span>
<span class="text-blue-400">val</span> truncatedTime = LocalDateTime.now().truncatedTo(ChronoUnit.MICROS)</pre>

      <h3 class="text-xl font-bold mb-3 mt-6">2. Safely Expand Database Schema Precision</h3>
      <p class="mb-4">
        Minimize data loss directly by declaring the schema realistically as <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">DATETIME(3)</code> (milliseconds) or <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">DATETIME(6)</code> (microseconds). 
      </p>
      <p class="mb-4 text-sm text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded border border-yellow-200 dark:border-yellow-900/30">
        ⚠️ <strong>Warning:</strong> Even in this case, the possibility of rounding at the last digit still exists, meaning it acts more as an enhancement of precision rather than a fundamental solution.
      </p>

      <h3 class="text-xl font-bold mb-3 mt-6">3. Change the Paradigm for Search Logic (Highly Recommended)</h3>
      <p class="mb-4">
        Avoid using the inclusive condition (<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">&lt;= 23:59:59</code>) or <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">BETWEEN</code> completely, and adopt the <strong>half-open exclusive (&lt;) condition as the safest and most universal approach</strong>.
      </p>
      <p class="mb-4">
        In other words, by designing the queried range as <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">check_in_time >= '2026-02-18 00:00:00' AND check_in_time < '2026-02-19 00:00:00'</code>, you ensure an accurate and unified range search across programming languages and DB paradigms, effectively bypassing the rounding risk.
      </p>
    </section>

    <section class="mb-8 text-gray-900 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">💡 Lessons Learned</h2>
      
      <div class="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl border-l-8 border-l-indigo-500 relative overflow-hidden">
        <div class="absolute -right-4 -top-4 opacity-5">
           <svg class="h-32 w-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        </div>
        <blockquote class="text-lg text-gray-700 dark:text-gray-300 relative z-10 space-y-4">
          <p class="font-medium text-xl text-indigo-900 dark:text-indigo-200">
            "Never blindly trust that the database will innocently store the exact data you hand over to it."
          </p>
          <p class="text-base leading-relaxed">
            The inherent <strong>precision</strong> and <strong>default rounding/conversion policies</strong> of each data type natively supported by the database aren't just mere schema configuration choices. They are critical details capable of instantaneously collapsing the data integrity of an application's core business logic (leading to false streak resets or premature coupon expirations).
          </p>
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Troubleshooting Takeaway</span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
              <span class="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              Data Integrity Maintained
            </span>
          </div>
        </blockquote>
      </div>
    </section>
  `
};
