import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import '../../navigation';
import '../../utils'
import { analyzeString } from './string-tools-func.js';

document.addEventListener('DOMContentLoaded', () => {
  // String Analyzer
  document.getElementById('analyze-string')?.addEventListener('click', analyzeString);
});
