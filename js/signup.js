document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('signupForm');
  const msg = document.getElementById('formMsg');

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.textContent = '';
    msg.style.color = '#b71c1c';

    const surname = document.getElementById('surname').value.trim();
    const firstname = document.getElementById('firstname').value.trim();
    const middlename = document.getElementById('middlename').value.trim();
    const birthdate = document.getElementById('birthdate').value;
    const contact = document.getElementById('contact').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm_password').value;

    if (!surname || !firstname) {
      msg.textContent = 'Please enter your full name.';
      return;
    }

    if (!middlename) {
      msg.textContent = 'Please enter your middle name.';
      return;
    }

    if (!birthdate) {
      msg.textContent = 'Please enter your birthdate.';
      return;
    }

    if (!/^\+?\d{7,15}$/.test(contact)) {
      msg.textContent = 'Enter a valid contact number.';
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
    console.log('Signing up:', { surname, firstname, middlename, birthdate, contact, email });

    msg.style.color = '#0b845e';
    msg.textContent = 'Account created successfully. Redirecting...';

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1200);
  });

});
