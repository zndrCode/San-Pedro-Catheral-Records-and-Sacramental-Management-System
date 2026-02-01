document.addEventListener('DOMContentLoaded', () => {

  /* Current Date Display */
  const dateEl = document.getElementById('currentDate');
  if (dateEl) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', options);
  }

  /* Profile Menu Toggle */
  const profileBtn = document.getElementById('profileBtn');
  const profileMenu = document.getElementById('profileMenu');

  /* Notification Icon Click Handler */
  const notificationBtn = document.getElementById('notificationBtn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Placeholder for notification panel
      alert('Notifications:\n\n• 3 new member registrations pending\n• Upcoming event: Sunday Mass\n• 2 service requests awaiting approval');
      
      // In a real application, you would open a notification panel/modal here
      // Example: openNotificationPanel();
    });

    // Add keyboard support
    notificationBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        notificationBtn.click();
      }
    });
  }

  if (profileBtn && profileMenu) {
    const toggleProfileMenu = (e) => {
      e.stopPropagation();
      const isExpanded = profileBtn.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        closeProfileMenu();
      } else {
        openProfileMenu();
      }
    };

    const openProfileMenu = () => {
      profileBtn.setAttribute('aria-expanded', 'true');
      profileMenu.hidden = false;
    };

    const closeProfileMenu = () => {
      profileBtn.setAttribute('aria-expanded', 'false');
      profileMenu.hidden = true;
    };

    // Toggle on click
    profileBtn.addEventListener('click', toggleProfileMenu);

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
        closeProfileMenu();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && profileBtn.getAttribute('aria-expanded') === 'true') {
        closeProfileMenu();
        profileBtn.focus();
      }
    });
  }

  /* Logout Button */
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Show confirmation dialog
      const confirmed = confirm('Are you sure you want to logout?');
      if (confirmed) {
        // In a real application, this would call a logout API
        alert('Logged out successfully');
        // Redirect to login page (update this path as needed)
        window.location.href = 'index.html';
      }
    });
  }

  /* Sidebar Collapsible Menu */
  const menuToggles = document.querySelectorAll('.menu-toggle');
  
  menuToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const submenu = toggle.nextElementSibling;

      if (submenu && submenu.classList.contains('submenu')) {
        // Toggle current menu
        toggle.setAttribute('aria-expanded', String(!isExpanded));
        submenu.hidden = isExpanded;

        // Optional: Close other open menus (uncomment if you want accordion behavior)
        // menuToggles.forEach(otherToggle => {
        //   if (otherToggle !== toggle) {
        //     otherToggle.setAttribute('aria-expanded', 'false');
        //     const otherSubmenu = otherToggle.nextElementSibling;
        //     if (otherSubmenu) otherSubmenu.hidden = true;
        //   }
        // });
      }
    });

    // Keyboard navigation
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  });

  /* View Details Buttons - Placeholder functionality */
  const viewDetailsBtns = document.querySelectorAll('.btn-mini');
  viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const cardTitle = card.querySelector('.card-title').textContent;
      
      // Placeholder alert - replace with actual navigation or modal
      alert(`Viewing details for: ${cardTitle}`);
      
      // In a real application, you might navigate to a details page:
      // window.location.href = `details.html?section=${cardTitle.toLowerCase().replace(/\s+/g, '-')}`;
    });
  });

  /* Quick Actions Button Handlers */
  // Approve Requests Button
  const approveRequestsBtn = document.getElementById('approveRequestsBtn');
  if (approveRequestsBtn) {
    approveRequestsBtn.addEventListener('click', () => {
      alert('Redirecting to Sacramental Requests approval page...');
      // In production: window.location.href = 'sacramental-requests.html';
    });
  }

  // Add Member Button
  const addMemberBtn = document.getElementById('addMemberBtn');
  if (addMemberBtn) {
    addMemberBtn.addEventListener('click', () => {
      alert('Opening Add New Member form...');
      // In production: window.location.href = 'add-member.html';
    });
  }

  // Create Event Button
  const createEventBtn = document.getElementById('createEventBtn');
  if (createEventBtn) {
    createEventBtn.addEventListener('click', () => {
      alert('Opening Create Event/Announcement form...');
      // In production: window.location.href = 'create-event.html';
    });
  }

  // Generate Report Button
  const generateReportBtn = document.getElementById('generateReportBtn');
  if (generateReportBtn) {
    generateReportBtn.addEventListener('click', () => {
      alert('Opening Report Generation tool...');
      // In production: window.location.href = 'reports.html';
    });
  }


  /* Smooth Scrolling for Internal Links */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  /* Active Menu Link Highlighting */
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll('.sidebar a');
  
  menuLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      
      // If it's a submenu item, expand its parent
      const submenu = link.closest('.submenu');
      if (submenu) {
        submenu.hidden = false;
        const parentToggle = submenu.previousElementSibling;
        if (parentToggle) {
          parentToggle.setAttribute('aria-expanded', 'true');
        }
      }
    }
  });

  /* Optional: Auto-update date every minute */
  setInterval(() => {
    if (dateEl) {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const today = new Date();
      dateEl.textContent = today.toLocaleDateString('en-US', options);
    }
  }, 60000); // Update every 60 seconds

});
