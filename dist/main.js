import '../node_modules/flowbite/dist/flowbite.min.js';

const copyEmailButton = document.getElementById('copyEmail');
const emailToCopy = 'dinni.business@gmail.com';

copyEmailButton.addEventListener('click', function () {
    const tempInput = document.createElement('input');
    tempInput.value = emailToCopy;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand('copy');

    document.body.removeChild(tempInput);
    alert('Email berhasil disalin ke clipboard!');
});

// Pre-loader fade in/out logic (runs on all pages)
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("pre-loader");
  if (loader && window.$) {
    $("#pre-loader").fadeIn(0);
    setTimeout(() => {
      $("#pre-loader").fadeOut(300);
    }, 600);
  }
});

// Redirect logic (only for index.html)
if (window.location.pathname.endsWith("index.html")) {
  window.location.replace("https://www.dinnirahmawati.com/index.html#home");
}
