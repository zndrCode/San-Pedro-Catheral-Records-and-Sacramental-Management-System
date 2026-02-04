document.addEventListener('DOMContentLoaded', () => {

  /* Current Date Display */
  const dateEl = document.getElementById('currentDate');
  if (dateEl) {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', options);
  }

  /* Profile Menu Toggle */
  const profileBtn = document.getElementById('profileBtn');
  const profileMenu = document.getElementById('profileMenu');

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

  /* Notification Icon Click Handler */
  const notificationBtn = document.getElementById('notificationBtn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      alert('Notifications:\n\n📅 Upcoming event: Sunday Mass (Feb 09)\n✅ Your baptism request has been approved');
    });

    notificationBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        notificationBtn.click();
      }
    });
  }

  /* Logout Button */
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      const confirmed = confirm('Are you sure you want to logout?');
      if (confirmed) {
        alert('Logged out successfully');
        window.location.href = 'index.html';
      }
    });
  }

  /* Quick Action Buttons */
  const requestSacramentBtn = document.getElementById('requestSacramentBtn');
  if (requestSacramentBtn) {
    requestSacramentBtn.addEventListener('click', () => {
      window.location.href = 'request-sacrament.html';
    });
  }

  const viewEventsBtn = document.getElementById('viewEventsBtn');
  if (viewEventsBtn) {
    viewEventsBtn.addEventListener('click', () => {
      window.location.href = 'events.html';
    });
  }

  const myRequestsBtn = document.getElementById('myRequestsBtn');
  if (myRequestsBtn) {
    myRequestsBtn.addEventListener('click', () => {
      window.location.href = 'my-requests.html';
    });
  }

  const updateProfileBtn = document.getElementById('updateProfileBtn');
  if (updateProfileBtn) {
    updateProfileBtn.addEventListener('click', () => {
      window.location.href = 'my-profile.html';
    });
  }


  /* ========================================
     POPULATE EVENTS LIST
     ======================================== */

  function populateEvents() {
    const eventsList = document.getElementById('eventsList');
    
    if (!eventsList) return;

    // Sample events data (replace with API call in production)
    const events = [
      {
        title: 'Sunday Mass',
        date: new Date('2025-02-09'),
        time: '9:00 AM - 10:30 AM',
        location: 'Main Church'
      },
      {
        title: 'Youth Fellowship Meeting',
        date: new Date('2025-02-11'),
        time: '6:00 PM - 8:00 PM',
        location: 'Parish Hall'
      },
      {
        title: 'Community Prayer Meeting',
        date: new Date('2025-02-13'),
        time: '7:00 PM - 8:30 PM',
        location: 'Chapel'
      },
      {
        title: 'Bible Study Session',
        date: new Date('2025-02-15'),
        time: '3:00 PM - 5:00 PM',
        location: 'Parish Hall'
      }
    ];

    // Clear existing content
    eventsList.innerHTML = '';

    if (events.length === 0) {
      eventsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📅</div>
          <div class="empty-state-text">No upcoming events</div>
        </div>
      `;
      return;
    }

    // Populate events (show only first 4)
    events.slice(0, 4).forEach(event => {
      const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const month = monthNames[event.date.getMonth()];
      const day = event.date.getDate();

      const eventItem = document.createElement('div');
      eventItem.className = 'event-item';
      
      eventItem.innerHTML = `
        <div class="event-date-box">
          <div class="event-month">${month}</div>
          <div class="event-day">${day}</div>
        </div>
        <div class="event-details">
          <div class="event-title">${event.title}</div>
          <div class="event-time">🕐 ${event.time}</div>
        </div>
      `;
      
      eventsList.appendChild(eventItem);
    });
  }

  populateEvents();


  /* ========================================
     POPULATE ANNOUNCEMENTS LIST
     ======================================== */

  function populateAnnouncements() {
    const announcementsList = document.getElementById('announcementsList');
    
    if (!announcementsList) return;

    // Sample announcements data (replace with API call in production)
    const announcements = [
      {
        title: 'Mass Schedule Change',
        text: 'Please note that this Sunday\'s evening mass will be moved to 6:00 PM instead of 5:00 PM.',
        date: '2 days ago'
      },
      {
        title: 'Parish Clean-Up Drive',
        text: 'Join us this Saturday for our monthly parish clean-up drive. Volunteers are welcome!',
        date: '3 days ago'
      },
      {
        title: 'Baptism Preparation Class',
        text: 'Next baptism preparation class will be held on Feb 20. Please register at the parish office.',
        date: '5 days ago'
      }
    ];

    // Clear existing content
    announcementsList.innerHTML = '';

    if (announcements.length === 0) {
      announcementsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📢</div>
          <div class="empty-state-text">No recent announcements</div>
        </div>
      `;
      return;
    }

    // Populate announcements (show only first 3)
    announcements.slice(0, 3).forEach(announcement => {
      const announcementItem = document.createElement('div');
      announcementItem.className = 'announcement-item';
      
      announcementItem.innerHTML = `
        <div class="announcement-title">${announcement.title}</div>
        <div class="announcement-text">${announcement.text}</div>
        <div class="announcement-date">Posted ${announcement.date}</div>
      `;
      
      announcementsList.appendChild(announcementItem);
    });
  }

  populateAnnouncements();


  /* ========================================
     POPULATE REQUEST STATUS
     ======================================== */

  function populateRequestStatus() {
    const requestsStatus = document.getElementById('requestsStatus');
    
    if (!requestsStatus) return;

    // Sample requests data (replace with API call in production)
    const requests = [
      {
        type: 'Baptism',
        status: 'approved',
        date: 'Submitted on Jan 28, 2025'
      },
      {
        type: 'Wedding',
        status: 'pending',
        date: 'Submitted on Feb 01, 2025'
      }
    ];

    // Clear existing content
    requestsStatus.innerHTML = '';

    if (requests.length === 0) {
      requestsStatus.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <div class="empty-state-text">No active requests</div>
        </div>
      `;
      return;
    }

    // Populate requests
    requests.forEach(request => {
      const statusClass = `status-${request.status}`;
      const statusText = request.status.charAt(0).toUpperCase() + request.status.slice(1);

      const requestItem = document.createElement('div');
      requestItem.className = 'request-item';
      
      requestItem.innerHTML = `
        <div class="request-header">
          <div class="request-type">${request.type}</div>
          <span class="request-status ${statusClass}">${statusText}</span>
        </div>
        <div class="request-date">${request.date}</div>
      `;
      
      requestsStatus.appendChild(requestItem);
    });
  }

  populateRequestStatus();


  /* ========================================
     POPULATE BIRTHDAYS LIST
     ======================================== */

  function populateBirthdays() {
    const birthdaysList = document.getElementById('birthdaysList');
    
    if (!birthdaysList) return;

    // Sample birthdays data (replace with API call in production)
    const birthdays = [
      {
        name: 'Maria Santos',
        date: 'Tomorrow'
      },
      {
        name: 'Pedro Reyes',
        date: 'Feb 10 (6 days)'
      },
      {
        name: 'Ana Lopez',
        date: 'Feb 15 (11 days)'
      }
    ];

    // Clear existing content
    birthdaysList.innerHTML = '';

    if (birthdays.length === 0) {
      birthdaysList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🎂</div>
          <div class="empty-state-text">No upcoming birthdays</div>
        </div>
      `;
      return;
    }

    // Populate birthdays
    birthdays.forEach(birthday => {
      const birthdayItem = document.createElement('div');
      birthdayItem.className = 'birthday-item';
      
      birthdayItem.innerHTML = `
        <div class="birthday-icon">🎂</div>
        <div class="birthday-details">
          <div class="birthday-name">${birthday.name}</div>
          <div class="birthday-date">${birthday.date}</div>
        </div>
      `;
      
      birthdaysList.appendChild(birthdayItem);
    });
  }

  populateBirthdays();


  /* ========================================
     ACTIVE MENU LINK HIGHLIGHTING
     ======================================== */

  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll('.sidebar a.menu-link');
  
  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath.endsWith(href) || currentPath.includes(href.replace('.html', '')))) {
      link.classList.add('active');
    }
  });


  /* ========================================
     AUTO-UPDATE DATE
     ======================================== */

  setInterval(() => {
    if (dateEl) {
      const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      };
      const today = new Date();
      dateEl.textContent = today.toLocaleDateString('en-US', options);
    }
  }, 60000); // Update every 60 seconds

});
