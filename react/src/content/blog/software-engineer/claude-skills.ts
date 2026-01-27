import type { BlogPost } from '../../../types/blog';

export const claudeSkills: BlogPost = {
    id: 'claude-skills-guide',
    category: 'software-engineer',
    title: 'Claude Skills: Modular Prompt Engineering for Backend Engineers',
    description: 'Learn how Claude Skills work as reusable prompt modules, how they differ from MCP, and practical use cases for backend development workflows.',
    date: '2026-01-27',
    updatedDate: '2026-01-27',
    tags: ['Claude', 'AI', 'Prompt Engineering', 'MCP', 'Developer Tools', 'Productivity'],
    image: 'claude-skills.webp',
    content: `
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500">
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
          <span class="ml-2 text-gray-400">Claude Skills</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Claude Skills: Modular Prompt Engineering for Backend Engineers
      </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: January 27, 2026</div>
    </header>

    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800">
      <h3 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="#what-are-skills" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What are Claude Skills?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#core-concepts" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Core Concepts</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#skills-vs-mcp" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Skills vs MCP: Key Differences</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#practical-examples" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Practical Examples for Backend Engineers</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#skill-structure" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Skill File Structure</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#best-practices" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Best Practices for Writing Skills</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#how-to-use" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">How to Use Skills</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#conclusion" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Conclusion</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none">
      <div class="mt-6" id="what-are-skills">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What are Claude Skills?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          <strong>Claude Skills</strong> are an extension feature that injects specific work procedures or expert knowledge into Claude as a "package" format, allowing it to be loaded dynamically only when needed.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Unlike general prompt engineering where you write everything in a single prompt, Skills exist as <strong>independent modules</strong>. Claude loads the skill definition (SKILL.md) and scripts into context only when it determines that a user's request is related to a specific skill.
        </p>
        <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 mt-4">
          <h3 class="font-bold text-lg text-blue-800 dark:text-blue-300">Think of it like...</h3>
          <p class="text-blue-700 dark:text-blue-400 mt-2">
            Skills are like <strong>work manuals</strong> for Claude. Instead of explaining every procedure each time, you give Claude a reference manual it can consult when needed.
          </p>
        </div>
      </div>

      <div class="mt-6" id="core-concepts">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Core Concepts</h2>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Skill Structure Components</h3>
          <ul class="space-y-3 text-gray-700 dark:text-gray-400 mt-3">
            <li class="flex items-start">
              <span class="text-purple-500 mr-2 font-bold">1.</span>
              <div>
                <strong>Metadata:</strong> Name, description, trigger conditions
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-purple-500 mr-2 font-bold">2.</span>
              <div>
                <strong>Instructions:</strong> Acts as System Prompt - defines how Claude should behave
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-purple-500 mr-2 font-bold">3.</span>
              <div>
                <strong>Executable Code:</strong> Python, Bash, or other scripts that can be run
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-purple-500 mr-2 font-bold">4.</span>
              <div>
                <strong>Reference Files:</strong> Documentation, templates, examples
              </div>
            </li>
          </ul>
        </div>

        <div class="grid md:grid-cols-3 gap-4 mt-6">
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h3 class="font-bold text-lg text-green-800 dark:text-green-300 mb-2">Token Efficiency</h3>
            <p class="text-green-700 dark:text-green-400 text-sm">
              Skills are loaded only when needed, not all at once. This saves tokens and reduces hallucinations.
            </p>
          </div>
          <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
            <h3 class="font-bold text-lg text-yellow-800 dark:text-yellow-300 mb-2">Reusability</h3>
            <p class="text-yellow-700 dark:text-yellow-400 text-sm">
              Managed as SKILL.md files, making them easy to version control with Git and share with team members.
            </p>
          </div>
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h3 class="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">Dynamic Loading</h3>
            <p class="text-blue-700 dark:text-blue-400 text-sm">
              Claude automatically determines when to load a skill based on conversation context.
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6" id="skills-vs-mcp">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Skills vs MCP: Key Differences</h2>
        <p class="text-gray-700 dark:text-gray-400">
          As a backend developer, you might confuse Skills with <strong>MCP (Model Context Protocol)</strong>. These two features are <strong>complementary</strong>, not competing.
        </p>

        <div class="overflow-x-auto mt-4">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aspect</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Skills</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">MCP</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">Purpose</td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"><strong>"How"</strong> - Methods & Procedures</td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"><strong>"What"</strong> - Connections & Data</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">Role</td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Define specific task workflows</td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Real-time connection to external systems</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">Analogy</td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Work Manual (Task Guidelines)</td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">USB Port (Tool & Equipment Connection)</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">Example</td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">"Follow this checklist for PR review"</td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">"Query my local DB", "Fetch GitHub issues"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">When to Use Each</h3>
          <div class="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h4 class="font-semibold text-purple-600 dark:text-purple-400">Use Skills when...</h4>
              <ul class="list-disc list-inside text-sm text-gray-700 dark:text-gray-400 mt-2 space-y-1">
                <li>Defining team coding conventions</li>
                <li>Creating deployment procedure guides</li>
                <li>Standardizing code review checklists</li>
                <li>Documenting troubleshooting workflows</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-blue-600 dark:text-blue-400">Use MCP when...</h4>
              <ul class="list-disc list-inside text-sm text-gray-700 dark:text-gray-400 mt-2 space-y-1">
                <li>Querying EKS cluster status</li>
                <li>Searching internal Wiki</li>
                <li>Accessing GitHub/GitLab APIs</li>
                <li>Reading local files or databases</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6" id="practical-examples">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Practical Examples for Backend Engineers</h2>

        <div class="space-y-6 mt-4">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200 flex items-center">
              <span class="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
              Code Review Skill
            </h3>
            <p class="text-gray-700 dark:text-gray-400 mt-2">
              Register a skill containing your team's Kotlin style guide and architecture principles. When you say "Review this code", Claude automatically loads the guide and reviews according to your standards.
            </p>
            <div class="mt-4 rounded-lg overflow-hidden">
              <div class="bg-gray-800 text-white p-3">
                <span class="text-sm font-mono">code-review-skill/SKILL.md</span>
              </div>
              <div class="bg-gray-900 p-4 overflow-x-auto">
                <pre class="text-sm text-gray-300"><code># Code Review Skill

## When to Use
- User asks for code review
- User shares code snippets for feedback

## Instructions
1. Check for SOLID principles violations
2. Verify naming conventions (camelCase for variables)
3. Look for potential null pointer issues
4. Suggest Kotlin idiomatic improvements
5. Check for proper error handling

## Checklist
- [ ] No magic numbers
- [ ] Functions are single-responsibility
- [ ] Proper logging implemented
- [ ] Unit tests exist for business logic</code></pre>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200 flex items-center">
              <span class="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
              Troubleshooting Skill
            </h3>
            <p class="text-gray-700 dark:text-gray-400 mt-2">
              Define a checklist for analyzing error logs (DB connection check → Network check → etc.). During incident response, Claude follows that procedure to help analyze issues.
            </p>
            <div class="mt-4 rounded-lg overflow-hidden">
              <div class="bg-gray-800 text-white p-3">
                <span class="text-sm font-mono">troubleshooting-skill/SKILL.md</span>
              </div>
              <div class="bg-gray-900 p-4 overflow-x-auto">
                <pre class="text-sm text-gray-300"><code># Troubleshooting Skill

## When to Use
- User reports an error or exception
- User shares error logs

## Diagnostic Procedure
1. **Identify Error Type**
   - Is it a timeout? Connection error? Business logic error?

2. **Check Infrastructure Layer**
   - Database connection pool status
   - Network connectivity (DNS, firewall)
   - Resource limits (CPU, memory)

3. **Check Application Layer**
   - Recent deployments
   - Configuration changes
   - Dependency updates

4. **Suggest Solutions**
   - Immediate mitigation
   - Root cause fix
   - Prevention measures</code></pre>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200 flex items-center">
              <span class="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
              API Design Skill
            </h3>
            <p class="text-gray-700 dark:text-gray-400 mt-2">
              Encode your team's REST API design guidelines. When designing new endpoints, Claude follows your conventions automatically.
            </p>
            <div class="mt-4 rounded-lg overflow-hidden">
              <div class="bg-gray-800 text-white p-3">
                <span class="text-sm font-mono">api-design-skill/SKILL.md</span>
              </div>
              <div class="bg-gray-900 p-4 overflow-x-auto">
                <pre class="text-sm text-gray-300"><code># API Design Skill

## URL Conventions
- Use plural nouns: /users, /orders
- Use kebab-case: /order-items
- Version in path: /api/v1/...

## Response Format
{
  "success": true,
  "data": { ... },
  "error": null,
  "pagination": { "page": 1, "size": 20, "total": 100 }
}

## HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6" id="skill-structure">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Skill File Structure</h2>
        <p class="text-gray-700 dark:text-gray-400">
          A typical skill is organized as a folder containing related files:
        </p>
        <div class="mt-4 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-3">
            <span class="text-sm font-mono">Skill Directory Structure</span>
          </div>
          <div class="bg-gray-900 p-4 overflow-x-auto">
            <pre class="text-sm text-gray-300"><code>my-custom-skill/
├── SKILL.md           # Main skill definition (required)
├── instructions.md    # Detailed instructions
├── examples/          # Example files
│   ├── good-example.kt
│   └── bad-example.kt
├── templates/         # Reusable templates
│   └── pr-template.md
└── scripts/           # Executable scripts
    └── validate.sh</code></pre>
          </div>
        </div>

        <div class="mt-6 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-3">
            <span class="text-sm font-mono">SKILL.md Template</span>
          </div>
          <div class="bg-gray-900 p-4 overflow-x-auto">
            <pre class="text-sm text-gray-300"><code># Skill Name

## Description
Brief description of what this skill does.

## When to Activate
- Trigger condition 1
- Trigger condition 2

## Instructions
Step-by-step instructions for Claude to follow.

## Reference Files
- @examples/good-example.kt
- @templates/pr-template.md

## Output Format
Define expected output format here.</code></pre>
          </div>
        </div>
      </div>

      <div class="mt-6" id="best-practices">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Best Practices for Writing Skills</h2>

        <div class="space-y-4 mt-4">
          <div class="flex items-start">
            <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">✓</span>
            <div>
              <strong class="text-gray-800 dark:text-gray-200">Be Specific with Triggers</strong>
              <p class="text-gray-700 dark:text-gray-400 text-sm mt-1">
                Clearly define when the skill should activate. Vague triggers lead to unexpected behavior.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">✓</span>
            <div>
              <strong class="text-gray-800 dark:text-gray-200">Include Examples</strong>
              <p class="text-gray-700 dark:text-gray-400 text-sm mt-1">
                Good and bad examples help Claude understand your expectations better than abstract rules.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">✓</span>
            <div>
              <strong class="text-gray-800 dark:text-gray-200">Keep It Focused</strong>
              <p class="text-gray-700 dark:text-gray-400 text-sm mt-1">
                One skill = one responsibility. Don't create a "mega skill" that does everything.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">✓</span>
            <div>
              <strong class="text-gray-800 dark:text-gray-200">Version Control</strong>
              <p class="text-gray-700 dark:text-gray-400 text-sm mt-1">
                Store skills in Git. Track changes, review updates, and share with your team.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <span class="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">✗</span>
            <div>
              <strong class="text-gray-800 dark:text-gray-200">Avoid Sensitive Data</strong>
              <p class="text-gray-700 dark:text-gray-400 text-sm mt-1">
                Never include API keys, passwords, or sensitive credentials in skill files.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6" id="how-to-use">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">How to Use Skills</h2>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">In Claude Desktop App</h3>
          <ol class="list-decimal list-inside text-gray-700 dark:text-gray-400 mt-3 space-y-2">
            <li>Go to <strong>Settings → Capabilities → Skills</strong></li>
            <li>Enable the Skills feature</li>
            <li>Choose from Built-in Skills or upload Custom Skills</li>
          </ol>
        </div>

        <div class="grid md:grid-cols-2 gap-4 mt-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h3 class="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">Built-in Skills</h3>
            <ul class="text-blue-700 dark:text-blue-400 text-sm space-y-1">
              <li>• Excel/PDF generation</li>
              <li>• Data analysis</li>
              <li>• Code formatting</li>
              <li>• And more...</li>
            </ul>
          </div>
          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <h3 class="font-bold text-lg text-purple-800 dark:text-purple-300 mb-2">Custom Skills</h3>
            <ul class="text-purple-700 dark:text-purple-400 text-sm space-y-1">
              <li>• Upload your skill folder</li>
              <li>• Team-specific workflows</li>
              <li>• Domain expertise encoding</li>
              <li>• Company conventions</li>
            </ul>
          </div>
        </div>

        <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mt-4">
          <h3 class="font-bold text-lg text-yellow-800 dark:text-yellow-300">Pro Tip</h3>
          <p class="text-yellow-700 dark:text-yellow-400 mt-2">
            Combine Skills with MCP for maximum productivity. Use Skills to define <em>how</em> to work, and MCP to provide <em>what</em> to work with (data, tools, connections).
          </p>
        </div>
      </div>

      <div class="mt-6" id="conclusion">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Key Takeaways</h3>
          <ul class="space-y-2 text-gray-700 dark:text-gray-400 mt-3">
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              <span><strong>Skills = Work Manuals:</strong> Reusable prompt modules loaded on-demand</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              <span><strong>Skills vs MCP:</strong> Skills define "how", MCP provides "what"</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              <span><strong>Token Efficient:</strong> Only loaded when needed</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              <span><strong>Team Friendly:</strong> Version control and share via Git</span>
            </li>
          </ul>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-4">
          For backend engineers, Skills provide a powerful way to encode team knowledge, standardize workflows, and ensure consistent quality across code reviews, troubleshooting, and development practices. Start with one or two simple skills and expand as you discover more use cases.
        </p>
      </div>
    </div>
    <br>
  `
};
