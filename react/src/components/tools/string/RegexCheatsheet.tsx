import { Box, Typography } from '@mui/material';
import SEOHead from '../../SEOHead';
import { seoData } from '../../../data/seoData';
import AdSection from '../../ads/AdSection';

const RegexCheatsheet: React.FC = () => {
  // @ts-ignore
  return (
    <Box sx={{ p: 3 }}>
      <SEOHead
        title={seoData.regexCheatsheet.title}
        description={seoData.regexCheatsheet.description}
        keywords={seoData.regexCheatsheet.keywords}
        canonical="https://developer-playground.com/tools/string/regex-cheatsheet.html"
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Regex Cheatsheet
      </Typography>
      <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400"
         data-section="true">
        Developer Playground
      </p>
      <p data-description="true" className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
        Common regex patterns for different programming languages
      </p>

      <div className="mt-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Language-specific Regex Cheatsheet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">JavaScript/TypeScript</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <p className="font-medium">Email:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^[\w.-]+@[\w.-]+\.[\w.-]+$</code>
              </li>
              <li>
                <p className="font-medium">URL:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^https?://[\w.-]+\.[\w.-]+(/[\w.-]*)*$</code>
              </li>
              <li>
                <p className="font-medium">Phone Number:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^\d{'{2,3}'}-\d{'{3,4}'}-\d{4}$</code>
              </li>
              <li>
                <p className="font-medium">IPv4 Address:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^(\d{'{1,3}'}\.){3}\d{'{1,3}'}$</code>
              </li>
              <li>
                <p className="font-medium">IPv6 Address:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^([0-9a-fA-F]{'{1,4}'}:){7}[0-9a-fA-F]{'{1,4}'}$</code>
              </li>
              <li>
                <p className="font-medium">Date (YYYY-MM-DD):</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$</code>
              </li>
              <li>
                <p className="font-medium">Credit Card:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$</code>
              </li>
              <li>
                <p className="font-medium">ZIP Code (US):</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^\d{5}(-\d{4})?$</code>
              </li>
              <li>
                <p className="font-medium">Hexadecimal Color:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$</code>
              </li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Python</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <p className="font-medium">Email:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r'^[\w.-]+@[\w.-]+\.[\w.-]+$'</code>
              </li>
              <li>
                <p className="font-medium">URL:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r'^https?://[\w.-]+\.[\w.-]+(/[\w.-]*)*$'</code>
              </li>
              <li>
                <p className="font-medium">Phone Number:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r'^\d{'{2,3}'}-\d{'{3,4}'}-\d{4}$'</code>
              </li>
              <li>
                <p className="font-medium">IPv4 Address:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r'^(\d{'{1,3}'}\.){3}\d{'{1,3}'}$'</code>
              </li>
              <li>
                <p className="font-medium">IPv6 Address:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r'^([0-9a-fA-F]{'{1,4}'}:){7}[0-9a-fA-F]{'{1,4}'}$'</code>
              </li>
              <li>
                <p className="font-medium">Date (YYYY-MM-DD):</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r'^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'</code>
              </li>
              <li>
                <p className="font-medium">Credit Card:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r'^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$'</code>
              </li>
              <li>
                <p className="font-medium">ZIP Code (US):</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r'^\d{5}(-\d{4})?$'</code>
              </li>
              <li>
                <p className="font-medium">Hexadecimal Color:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'</code>
              </li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Java/Kotlin</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <p className="font-medium">Email:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^[\\w.-]+@[\\w.-]+\\.[\\w.-]+$</code>
              </li>
              <li>
                <p className="font-medium">URL:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^https?://[\\w.-]+\\.[\\w.-]+(/[\\w.-]*)*$</code>
              </li>
              <li>
                <p className="font-medium">Phone Number:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^\\d{'{2,3}'}-\\d{'{3,4}'}-\\d{4}$</code>
              </li>
              <li>
                <p className="font-medium">IPv4 Address:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^(\\d{'{1,3}'}\\.){3}\\d{'{1,3}'}$</code>
              </li>
              <li>
                <p className="font-medium">IPv6 Address:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^([0-9a-fA-F]{'{1,4}'}:){7}[0-9a-fA-F]{'{1,4}'}$</code>
              </li>
              <li>
                <p className="font-medium">Date (YYYY-MM-DD):</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$</code>
              </li>
              <li>
                <p className="font-medium">Credit Card:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$</code>
              </li>
              <li>
                <p className="font-medium">ZIP Code (US):</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^\\d{5}(-\\d{4})?$</code>
              </li>
              <li>
                <p className="font-medium">Hexadecimal Color:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$</code>
              </li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Go</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <p className="font-medium">Email:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">`^[\w.-]+@[\w.-]+\.[\w.-]+$`</code>
              </li>
              <li>
                <p className="font-medium">URL:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">`^https?://[\w.-]+\.[\w.-]+(/[\w.-]*)*$`</code>
              </li>
              <li>
                <p className="font-medium">Phone Number:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">`^\d{'{2,3}'}-\d{'{3,4}'}-\d{4}$`</code>
              </li>
              <li>
                <p className="font-medium">IPv4 Address:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">`^(\d{'{1,3}'}\.){3}\d{'{1,3}'}$`</code>
              </li>
              <li>
                <p className="font-medium">IPv6 Address:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">`^([0-9a-fA-F]{'{1,4}'}:){7}[0-9a-fA-F]{'{1,4}'}$`</code>
              </li>
              <li>
                <p className="font-medium">Date (YYYY-MM-DD):</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">`^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$`</code>
              </li>
              <li>
                <p className="font-medium">Credit Card:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$</code>
              </li>
              <li>
                <p className="font-medium">ZIP Code (US):</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^\d{5}(-\d{4})?$</code>
              </li>
              <li>
                <p className="font-medium">Hexadecimal Color:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$</code>
              </li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Rust</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <p className="font-medium">Email:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r"^[\w.-]+@[\w.-]+\.[\w.-]+$"</code>
              </li>
              <li>
                <p className="font-medium">URL:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r"^https?://[\w.-]+\.[\w.-]+(/[\w.-]*)*$"</code>
              </li>
              <li>
                <p className="font-medium">Phone Number:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r"^\d{'{2,3}'}-\d{'{3,4}'}-\d{4}$"</code>
              </li>
              <li>
                <p className="font-medium">IPv4 Address:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r"^(\d{'{1,3}'}\.){3}\d{'{1,3}'}$"</code>
              </li>
              <li>
                <p className="font-medium">IPv6 Address:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r"^([0-9a-fA-F]{'{1,4}'}:){7}[0-9a-fA-F]{'{1,4}'}$"</code>
              </li>
              <li>
                <p className="font-medium">Date (YYYY-MM-DD):</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r"^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$"</code>
              </li>
              <li>
                <p className="font-medium">Credit Card:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r"^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$"</code>
              </li>
              <li>
                <p className="font-medium">ZIP Code (US):</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r"^\d{5}(-\d{4})?$"</code>
              </li>
              <li>
                <p className="font-medium">Hexadecimal Color:</p>
                <code className="block bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mt-1">r"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"</code>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Regular Expression Guide
        </h3>
        
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">What is Regular Expression?</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Regular expressions (regex) are powerful tools for finding or matching specific patterns in strings. 
              They are used for text search, validation, string replacement, and many other purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Basic Metacharacters</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">.</code>
                  <span className="text-gray-600 dark:text-gray-300">Any single character</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">*</code>
                  <span className="text-gray-600 dark:text-gray-300">Zero or more times</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">+</code>
                  <span className="text-gray-600 dark:text-gray-300">One or more times</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">?</code>
                  <span className="text-gray-600 dark:text-gray-300">Zero or one time</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">^</code>
                  <span className="text-gray-600 dark:text-gray-300">Start of string</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">$</code>
                  <span className="text-gray-600 dark:text-gray-300">End of string</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Character Classes</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">\d</code>
                  <span className="text-gray-600 dark:text-gray-300">Digits [0-9]</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">\w</code>
                  <span className="text-gray-600 dark:text-gray-300">Word chars [a-zA-Z0-9_]</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">\s</code>
                  <span className="text-gray-600 dark:text-gray-300">Whitespace</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">[a-z]</code>
                  <span className="text-gray-600 dark:text-gray-300">Lowercase a-z</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">[A-Z]</code>
                  <span className="text-gray-600 dark:text-gray-300">Uppercase A-Z</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">[^abc]</code>
                  <span className="text-gray-600 dark:text-gray-300">Not a, b, or c</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quantifiers</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">{'{n}'}</code>
                  <span className="text-gray-600 dark:text-gray-300">Exactly n times</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">{'{n,}'}</code>
                  <span className="text-gray-600 dark:text-gray-300">n or more times</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">{'{n,m}'}</code>
                  <span className="text-gray-600 dark:text-gray-300">Between n and m times</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">*?</code>
                  <span className="text-gray-600 dark:text-gray-300">Non-greedy zero or more</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">+?</code>
                  <span className="text-gray-600 dark:text-gray-300">Non-greedy one or more</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Groups and Capture</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">()</code>
                  <span className="text-gray-600 dark:text-gray-300">Capture group</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">(?:)</code>
                  <span className="text-gray-600 dark:text-gray-300">Non-capture group</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">|</code>
                  <span className="text-gray-600 dark:text-gray-300">OR operator</span>
                </div>
                <div className="flex justify-between">
                  <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-800 dark:text-gray-200">\1</code>
                  <span className="text-gray-600 dark:text-gray-300">First group reference</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">Practical Examples</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-green-800 dark:text-green-200 mb-1">Email validation:</p>
                <code className="block bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs break-all text-green-900 dark:text-green-100">^[\w.-]+@[\w.-]+\.[a-zA-Z]{'{2,}'}$</code>
              </div>
              <div>
                <p className="font-medium text-green-800 dark:text-green-200 mb-1">Phone number (Korea):</p>
                <code className="block bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs break-all text-green-900 dark:text-green-100">^01[016789]-\d{'{3,4}'}-\d{'{4}'}$</code>
              </div>
              <div>
                <p className="font-medium text-green-800 dark:text-green-200 mb-1">URL validation:</p>
                <code className="block bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs break-all text-green-900 dark:text-green-100">^https?://[\w.-]+\.[a-zA-Z]{'{2,}'}.*$</code>
              </div>
              <div>
                <p className="font-medium text-green-800 dark:text-green-200 mb-1">Extract numbers only:</p>
                <code className="block bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs break-all text-green-900 dark:text-green-100">\d+</code>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">💡 Tips and Best Practices</h4>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• Each language has different backslash (\) escaping methods</li>
              <li>• Use raw strings to avoid backslash issues</li>
              <li>• Add comments for complex regex patterns to improve readability</li>
              <li>• String methods might be faster than regex for performance-critical cases</li>
              <li>• Use online regex testers to validate your patterns</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Ad */}
      <AdSection 
        position="bottom" 
        size="rectangle" 
        showAd={true}
        className="mt-8"
      />
    </Box>
  );
};

export default RegexCheatsheet;