document.addEventListener('DOMContentLoaded', () => {

  const roleButtons = document.querySelectorAll('.role-btn');
  const form = document.getElementById('signupForm');
  const msg = document.getElementById('formMsg');

  // Role toggle
  roleButtons.forEach(button => {
    button.addEventListener('click', () => {
      roleButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
    });
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.textContent = '';
    msg.style.color = '#b71c1c';

    const surname = document.getElementById('surname').value.trim();
    const firstname = document.getElementById('firstname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm_password').value;
    const role = document.querySelector('.role-btn.active').dataset.role;

    if (!surname || !firstname) {
      msg.textContent = 'Please enter your full name.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Enter a valid email address.';
      return;
    }

    if (password.length < 6) {
      msg.textContent = 'Password must be at least 6 characters.';
      return;
    }

    if (password !== confirm) {
      msg.textContent = 'Passwords do not match.';
      return;
    }

    // Demo success
    console.log('Signing up:', { role, surname, firstname, email });

    msg.style.color = '#0b845e';
    msg.textContent = 'Account created successfully. Redirecting...';

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1200);
  });

});
