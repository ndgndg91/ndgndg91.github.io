function encodeBase64() {
  const input = document.getElementById("base64-input").value;
  document.getElementById("base64-output").value = btoa(input);
}

function decodeBase64() {
  const input = document.getElementById("base64-input").value;
  try {
    document.getElementById("base64-output").value = atob(input);
  } catch (e) {
    document.getElementById("base64-output").value = "Error: Invalid Base64 string";
  }
}

function encodeURL() {
  const input = document.getElementById("url-input").value;
  try {
    const url = new URL(input);
    const encodedParams = Array.from(url.searchParams.entries()).map(
      ([key, value]) => `${key}=${encodeURIComponent(value)}`
    ).join('&');
    document.getElementById("url-output").value = `${url.origin}${url.pathname}${encodedParams ? '?' + encodedParams : ''}`;
  } catch (e) {
    document.getElementById("url-output").value = encodeURIComponent(input);
  }
}

function decodeURL() {
  const input = document.getElementById("url-input").value;
  try {
    document.getElementById("url-output").value = decodeURIComponent(input);
  } catch (e) {
    document.getElementById("url-output").value = "Error: Invalid URL-encoded string";
  }
}
