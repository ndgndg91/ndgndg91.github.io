import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'
import { analyzeString } from './string-tools-func.js';

document.addEventListener('DOMContentLoaded', () => {
  // String Analyzer
  document.getElementById('analyze-string')?.addEventListener('click', analyzeString);
});
