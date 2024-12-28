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

window.onload = function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.display = "none";
    }
};
