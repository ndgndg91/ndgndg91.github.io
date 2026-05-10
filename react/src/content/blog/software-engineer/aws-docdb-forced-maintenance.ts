import type { BlogPost } from '../../../types/blog';

export const awsDocdbForcedMaintenance: BlogPost = {
  id: 'aws-docdb-forced-maintenance',
  title: 'The AWS DocumentDB Maintenance Trap: Why You Cannot Postpone Forever',
  description: 'AWS DocumentDB maintenance can only be postponed a finite number of times before AWS force-applies it on a date you do not control. Here is why that matters, and the critical distinction between cluster and instance maintenance that nobody explains until you hit it in production.',
  category: 'software-engineer',
  date: '2026-05-11',
  updatedDate: '2026-05-11',
  tags: ['AWS', 'DocumentDB', 'MongoDB', 'Maintenance', 'Failover', 'SRE', 'Production Operations'],
  image: 'documentdb-cons.webp',
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
          <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">AWS DocumentDB Maintenance Trap</span>
        </li>
      </ol>
    </nav>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">The AWS DocumentDB Maintenance Trap: Why You Cannot Postpone Forever</h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Part 1 of the <em>DocDB Maintenance Survival Guide</em>. AWS will eventually pick the date for you. Here is why that matters, and the critical distinction between cluster and instance maintenance that nobody explains until you hit it in production.
      </p>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          If you run a production workload on AWS DocumentDB, you already know the dreaded email: <strong>"Required maintenance update for your DocumentDB cluster."</strong>
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          You can postpone it. Once. Twice. Maybe three times if you are lucky.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Then AWS forces it on you, on a date <em>they</em> picked, at a time <em>they</em> picked.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Until recently, my team genuinely believed the worst we had to worry about was a few seconds of read-write blocking. We were wrong, and the kind of wrong that only shows up in production logs.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          This is the first post in a three-part series about what we learned running through <strong>two production DocumentDB maintenances in five days</strong> &mdash; one cluster maintenance, one instance maintenance &mdash; and the very different things they break.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. TL;DR</h2>
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mt-4 shadow-sm">
          <ol class="list-decimal pl-5 space-y-3 text-indigo-900 dark:text-indigo-200 marker:font-bold">
            <li>AWS DocumentDB maintenance can be postponed only a finite number of times before AWS force-applies it on a date you do not control.</li>
            <li>There are <strong>two distinct maintenance types</strong> &mdash; <em>cluster</em> and <em>instance</em> &mdash; and they fail in completely different ways.</li>
            <li>Cluster maintenance causes a roughly 30&ndash;50 second read/write block on the cluster endpoint, <strong>without</strong> primary failover.</li>
            <li>Instance maintenance causes <strong>primary&harr;replica failover</strong>, which is a different (and worse) failure mode for your application.</li>
            <li>Plan your downtime window for <em>instance</em> maintenance. Plan your fallback logic for <em>cluster</em> maintenance. They are not the same problem.</li>
          </ol>
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. The Forced Maintenance Problem</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          AWS Managed services are wonderful right up until they are not.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          DocumentDB pushes engine patches and infrastructure updates on a schedule that AWS controls. You receive notifications, you get a "preferred maintenance window" you can configure, and you can postpone individual maintenance events through the AWS console.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          What the documentation does not put in bold is this: <strong>postponement has a hard limit.</strong>
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          After a finite number of deferrals (typically 2&ndash;3, depending on the severity of the patch), the maintenance moves into a <em>force-apply</em> state. AWS will execute it on a specific date, regardless of what your business is doing that week.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          A typical timeline looks like this:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>Original window: a workday afternoon.</li>
          <li>Postponed once &rarr; pushed by one week.</li>
          <li>Postponed again &rarr; pushed by another week.</li>
          <li>AWS notice: <strong>"Will be applied on YYYY-MM-DD, HH:00 UTC"</strong> &mdash; non-negotiable.</li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          If the forced window lands on peak traffic hours, you have two choices:
        </p>
        <ol class="list-decimal pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>Let it happen and hope your application survives the failover under load.</li>
          <li>Pre-empt AWS by executing the maintenance manually through your DBA team during a low-traffic window, before the force-apply date.</li>
        </ol>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Option 2 is almost always the right call. It is the difference between a <em>clean</em> tens-of-seconds outage during off-hours and an unbounded incident in the middle of business hours.
        </p>

        <div class="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-lg border border-amber-200 dark:border-amber-800 my-6">
          <p class="text-amber-900 dark:text-amber-200 mb-0">
            <strong>Key takeaway:</strong> Treat the AWS maintenance notification as a deadline, not a suggestion. Coordinate with your DBA team to <strong>execute the maintenance manually before the forced window</strong>. You get to pick the time. AWS picks the date.
          </p>
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. Cluster vs Instance Maintenance: The Distinction Nobody Explains</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Here is what the AWS console will not clearly tell you. DocumentDB maintenance comes in two flavors, and they have completely different failure characteristics.
        </p>

        <div class="overflow-x-auto my-6">
          <table class="w-full text-sm text-left border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">Aspect</th>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">Cluster Maintenance</th>
                <th scope="col" class="px-6 py-3 border-b border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">Instance Maintenance</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">What it patches</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Cluster-wide engine update</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10">Individual instance OS / hardware</td>
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Failover</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">❌ No failover</td>
                <td class="px-6 py-4 font-bold text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/10">✅ Primary&harr;replica failover</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Cluster endpoint</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Blocked for ~30&ndash;50s</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10">Blocked briefly per instance</td>
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Driver impact</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Read/write timeout on existing connections</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10">Topology change, new primary discovery</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Application symptoms</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300"><code>MongoSocketReadException</code> bursts</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10"><code>DataAccessResourceFailureException</code>, then recovery on new primary</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Recovery time</td>
                <td class="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">30&ndash;50 seconds</td>
                <td class="px-6 py-4 font-bold text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/10">2&ndash;4 minutes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">🟢 Cluster Maintenance: The Simpler Beast</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The cluster endpoint stops responding for 30&ndash;50 seconds while AWS rolls the engine version. Your driver sees connection failures, your application sees timeouts, and then everything comes back. <strong>No primary changes</strong>. No replica set topology mutation. Existing connections die, new connections succeed once the engine is back up.
        </p>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">🔴 Instance Maintenance: Where It Gets Interesting</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          AWS rolls instances one at a time. Each instance going down triggers a topology change in the replica set. If the instance being patched is the <strong>primary</strong>, the cluster elects a new primary &mdash; that is the failover. Your driver has to:
        </p>
        <ol class="list-decimal pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>Detect the old primary is gone.</li>
          <li>Wait for the cluster to elect a new primary (this takes seconds).</li>
          <li>Re-establish connections to the new primary.</li>
          <li>Resume routing writes there.</li>
        </ol>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Until step 3 completes, every write request fails. Reads against <code>secondaryPreferred</code> may also fail if the secondary itself is the one being patched.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">4. How We Verified This in Production</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          We ran both maintenance types back to back on the same production cluster within a single week. The logs are unambiguous. Cluster names and exact timestamps below are anonymized; the error signatures and counts are exactly what we observed.
        </p>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">📊 Cluster Maintenance (~47 second window)</h3>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>Driver-level signal: <code>MongoSocketReadException: Prematurely reached end of stream</code> on the cluster endpoint.</li>
          <li><strong>Zero</strong> "no longer a member of the replica set" messages from the driver.</li>
          <li>105 application-level errors during the window, all <code>DataAccessResourceFailureException</code>.</li>
          <li>Recovery: driver reconnects to the same primary once the engine is back online.</li>
        </ul>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">📊 Instance Maintenance (~4 minute window, two phases)</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Instance maintenance unfolds in two distinct phases as AWS rolls each instance.
        </p>
        <p class="mb-2 text-gray-900 dark:text-gray-100">
          <strong>Reader phase</strong> (a non-primary instance patched, call it <code>db-replica-a</code>):
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>~3 minutes of socket exceptions.</li>
          <li>Then: <code>Server db-replica-a is no longer a member of the replica set</code>.</li>
          <li>No application errors. Writes continued flowing to the unaffected primary.</li>
        </ul>
        <p class="mb-2 text-gray-900 dark:text-gray-100">
          <strong>Writer phase</strong> (the primary patched, call it <code>db-primary-1</code>):
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>~4 minutes of socket exceptions.</li>
          <li>Then: <code>Server db-primary-1 is no longer a member of the replica set</code>.</li>
          <li>Then: <code>Discovered replica set primary db-primary-2</code> (the previous secondary, promoted).</li>
          <li><strong>5 application errors during the window</strong>, all on the consumer side. Read paths were quiet because we ran the maintenance during a maintenance window with traffic gated upstream.</li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The same MongoDB Java driver, the same Spring Boot application, the same cluster &mdash; but the <em>failure modes</em> were completely different.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">5. Why This Matters for Capacity Planning</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          If you only ever experienced cluster maintenance, you probably built your runbook around "wait 60 seconds, everything comes back."
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          That runbook breaks the first time you hit instance maintenance during normal traffic.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Here is what changes:
        </p>
        <ul class="list-none pl-0 space-y-4 mb-6">
          <li class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <span class="font-bold text-blue-700 dark:text-blue-400 flex items-center mb-2">🟢 Cluster maintenance</span>
            <span class="text-gray-800 dark:text-gray-200">Your fallback logic gets exercised. Whatever your driver, circuit-breaker and retry behavior is during a 30-second outage, that is your blast radius. Mostly survivable with reasonable timeouts.</span>
          </li>
          <li class="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
            <span class="font-bold text-red-700 dark:text-red-400 flex items-center mb-2">🔴 Instance maintenance</span>
            <span class="text-gray-800 dark:text-gray-200">Your <strong>write path</strong> gets exercised. Specifically, the period where the primary is gone but a new primary has not been elected yet. Anything that requires a write &mdash; Kafka consumers persisting messages, REST endpoints inserting data, audit logs &mdash; will fail.</span>
          </li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          If your application uses <code>@Transactional</code> writes against MongoDB, those transactions will roll back. If those writes were triggered by Kafka messages and you are using Spring's default <code>RecordMessageListener</code>, you are about to learn whether your error handling sends them to a Dead Letter Topic, retries with backoff, or &mdash; if you wrote a <code>@CircuitBreaker</code> fallback that returns <code>null</code> &mdash; silently drops them.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          (Spoiler for Part 2: silently dropping them is the default if you are not careful. We learned this the hard way and shipped a 5-line <code>throw</code> change to fix it.)
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">6. What Most Teams Get Wrong</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Three patterns I have seen repeatedly:
        </p>
        <ol class="list-decimal pl-5 space-y-3 mb-6 text-gray-900 dark:text-gray-100">
          <li><strong>Treating "preferred maintenance window" as a guarantee.</strong> It is a <em>preference</em>. AWS will respect it for normal patches, but security and critical patches can be applied outside that window with limited notice.</li>
          <li><strong>Running maintenance during business hours because postponement felt safe.</strong> Postponement just shifts the problem and removes your ability to pick the timing. Run it manually, off-hours, before AWS forces your hand.</li>
          <li><strong>Testing only against cluster maintenance.</strong> Most engineering teams only see cluster maintenance for years before hitting their first instance maintenance, so they never validate their write-path failure handling. Instance maintenance is the real test.</li>
        </ol>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">7. Action Items for This Week</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          If you run DocumentDB in production, do this before your next AWS maintenance email:
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mt-4 shadow-sm">
          <ol class="list-decimal pl-5 space-y-4 text-indigo-900 dark:text-indigo-200 marker:font-bold">
            <li><strong>Audit your DBA process.</strong> Confirm your team can manually execute DocumentDB maintenance ahead of the force-apply window. Test the runbook end-to-end at least once a year.</li>
            <li><strong>Identify which of your writes are recoverable.</strong> For every write path that hits MongoDB, ask: if this fails for 4 minutes during failover, what happens? (Lost? Retried? DLT? Returned 5xx to the user?)</li>
            <li><strong>Read your driver and Spring Data MongoDB defaults.</strong> The MongoDB Java driver defaults to a 30-second <code>serverSelectionTimeout</code>. That is the maximum time a request will wait for a primary to be elected before failing. We will dig into why that matters in Part 3.</li>
            <li><strong>Schedule a quarterly chaos drill.</strong> Force a manual failover on a non-prod cluster (<code>db.adminCommand({failover:1})</code>) and verify that your application &mdash; including consumers, schedulers, and APIs &mdash; recovers cleanly.</li>
          </ol>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">8. Coming in Part 2</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Now that we know <em>why</em> maintenance is unavoidable and <em>what</em> the two failure modes look like, the next post tackles the harder question:
        </p>
        <blockquote class="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 italic text-gray-700 dark:text-gray-300 my-6">
          When the failover lands during peak traffic, what does it take for <strong>zero messages to be lost</strong> between Kafka and MongoDB?
        </blockquote>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Spoiler: the difference between "all your push notifications silently disappear" and "all your push notifications get retried by Kafka" is exactly <strong>one line of Kotlin</strong>.
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-8 italic">
          This series is based on real production incidents. All cluster names, instance identifiers, internal ticket references, and organization-specific details have been anonymized or generalized. Error signatures, log messages, error counts, and outage durations are real and unmodified.
        </p>
      </section>
    </article>
  `
};
