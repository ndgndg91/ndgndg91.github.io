import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'
import {counteByte} from "./string-tools-func";

document.addEventListener('DOMContentLoaded', () => {
  // Byte Counter
  document.getElementById('count-byte')?.addEventListener('click', counteByte);
});
