document.addEventListener('DOMContentLoaded', () => {

  const roleButtons = document.querySelectorAll('.role-btn');
  const loginForm = document.getElementById('loginForm');

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

  // Login submit
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const role = document.querySelector('.role-btn.active').dataset.role;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Attempt login:', { role, email });

    alert(`Logging in as ${role}\nEmail: ${email}`);

    // TODO:
    // fetch('/login.php', {
    //   method: 'POST',
    //   body: JSON.stringify({ role, email, password })
    // });
  });

});
