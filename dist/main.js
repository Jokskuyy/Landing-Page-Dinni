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

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            let offset = 0;

            if (targetId === '#aboutme') offset = -40;
            if (targetId === '#pricing') offset = -20;
            if (targetId === '#artikel') offset = -30;
            if (targetId === '#contact') offset = 400;

            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
