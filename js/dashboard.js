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
      // In production: window.location.href = 'pending-requests.html';
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
      // In production: window.location.href = 'generate-report.html';
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


  /* ========================================
     CHART.JS INITIALIZATION
     ======================================== */

  /**
   * Initialize all dashboard charts
   */
  function initializeCharts() {
    // Common chart options for consistent styling
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            size: 13,
            family: 'Poppins'
          },
          bodyFont: {
            size: 12,
            family: 'Poppins'
          }
        }
      }
    };

    // 1. Members Growth Chart (Line Chart)
    const membersCtx = document.getElementById('membersChart');
    if (membersCtx) {
      new Chart(membersCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Members',
            data: [120, 145, 160, 180, 195, 210],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#3b82f6',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2
          }]
        },
        options: {
          ...commonOptions,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { 
                display: false
              },
              grid: { 
                display: false,
                drawBorder: false
              },
              border: { 
                display: false 
              }
            },
            x: {
              ticks: { 
                font: { 
                  size: 10,
                  family: 'Poppins'
                },
                color: '#6b7280'
              },
              grid: { 
                display: false,
                drawBorder: false
              },
              border: { 
                display: false 
              }
            }
          }
        }
      });
    }

    // 2. Sacramental Requests Chart (Bar Chart)
    const requestsCtx = document.getElementById('requestsChart');
    if (requestsCtx) {
      new Chart(requestsCtx, {
        type: 'bar',
        data: {
          labels: ['Baptism', 'Wedding', 'Confirmation', 'Funeral', 'Other'],
          datasets: [{
            label: 'Requests',
            data: [12, 8, 15, 5, 10],
            backgroundColor: [
              'rgba(245, 158, 11, 0.9)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(245, 158, 11, 0.7)',
              'rgba(245, 158, 11, 0.6)',
              'rgba(245, 158, 11, 0.5)'
            ],
            borderRadius: 6,
            borderSkipped: false
          }]
        },
        options: {
          ...commonOptions,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { 
                display: false
              },
              grid: { 
                display: false,
                drawBorder: false
              },
              border: { 
                display: false 
              }
            },
            x: {
              ticks: { 
                font: { 
                  size: 9,
                  family: 'Poppins'
                },
                color: '#6b7280'
              },
              grid: { 
                display: false,
                drawBorder: false
              },
              border: { 
                display: false 
              }
            }
          }
        }
      });
    }

    // 3. Announcements Chart (Doughnut Chart)
    const announcementsCtx = document.getElementById('announcementsChart');
    if (announcementsCtx) {
      new Chart(announcementsCtx, {
        type: 'doughnut',
        data: {
          labels: ['Events', 'Mass Schedule', 'General'],
          datasets: [{
            data: [15, 10, 8],
            backgroundColor: [
              'rgba(16, 185, 129, 0.9)',
              'rgba(16, 185, 129, 0.6)',
              'rgba(16, 185, 129, 0.3)'
            ],
            borderWidth: 0,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                font: { 
                  size: 10,
                  family: 'Poppins'
                },
                color: '#6b7280',
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle',
                boxWidth: 6,
                boxHeight: 6
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              cornerRadius: 8,
              titleFont: {
                size: 13,
                family: 'Poppins'
              },
              bodyFont: {
                size: 12,
                family: 'Poppins'
              },
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
  }

  // Initialize charts after DOM is loaded
  initializeCharts();


  /* ========================================
     RECENT ACTIVITY FEED
     ======================================== */

  /**
   * Populate Recent Activity Feed with sample data
   */
  function populateActivityFeed() {
    const activityList = document.getElementById('activityList');
    
    if (!activityList) return;

    // Sample activity data (replace with API call in production)
    const activities = [
      {
        icon: '👤',
        iconClass: 'icon-user',
        title: 'New registration: Maria Santos',
        time: '2 minutes ago'
      },
      {
        icon: '✅',
        iconClass: 'icon-check',
        title: 'Baptism request approved for Juan Cruz',
        time: '15 minutes ago'
      },
      {
        icon: '📅',
        iconClass: 'icon-event',
        title: 'New event created: Prayer Meeting',
        time: '1 hour ago'
      },
      {
        icon: '🎂',
        iconClass: 'icon-birthday',
        title: 'Upcoming birthday: Ana Lopez (Tomorrow)',
        time: '2 hours ago'
      },
      {
        icon: '👤',
        iconClass: 'icon-user',
        title: 'Member profile updated: Pedro Reyes',
        time: '3 hours ago'
      }
    ];

    // Clear existing content
    activityList.innerHTML = '';

    // Populate activity items
    activities.forEach(activity => {
      const activityItem = document.createElement('div');
      activityItem.className = 'activity-item';
      
      activityItem.innerHTML = `
        <div class="activity-icon ${activity.iconClass}">
          ${activity.icon}
        </div>
        <div class="activity-content">
          <div class="activity-title">${activity.title}</div>
          <div class="activity-time">${activity.time}</div>
        </div>
      `;
      
      activityList.appendChild(activityItem);
    });
  }

  // Populate activity feed
  populateActivityFeed();


  /* ========================================
     PENDING REGISTRATIONS TABLE
     ======================================== */

  /**
   * Populate Pending Registrations Table with sample data
   */
  function populatePendingTable() {
    const tableBody = document.querySelector('#pendingTable tbody');
    
    if (!tableBody) return;

    // Sample pending registrations data (replace with API call in production)
    const pendingRegistrations = [
      {
        id: 1,
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        date: 'Feb 04, 2025'
      },
      {
        id: 2,
        name: 'Juan dela Cruz',
        email: 'juan.delacruz@email.com',
        date: 'Feb 03, 2025'
      },
      {
        id: 3,
        name: 'Ana Reyes',
        email: 'ana.reyes@email.com',
        date: 'Feb 03, 2025'
      }
    ];

    // Clear existing content
    tableBody.innerHTML = '';

    // Check if there are pending registrations
    if (pendingRegistrations.length === 0) {
      // Show empty state
      tableBody.innerHTML = `
        <tr>
          <td colspan="4">
            <div class="empty-state">
              <div class="empty-state-icon">📋</div>
              <div class="empty-state-text">No pending registrations</div>
              <div class="empty-state-subtext">All registrations have been processed</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    // Populate table rows
    pendingRegistrations.forEach(registration => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${registration.name}</td>
        <td>${registration.email}</td>
        <td>${registration.date}</td>
        <td>
          <div class="table-actions">
            <button class="btn-approve" data-id="${registration.id}" data-name="${registration.name}">
              Approve
            </button>
            <button class="btn-reject" data-id="${registration.id}" data-name="${registration.name}">
              Reject
            </button>
          </div>
        </td>
      `;
      
      tableBody.appendChild(row);
    });

    // Add event listeners for approve/reject buttons
    document.querySelectorAll('.btn-approve').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        handleApprove(id, name);
      });
    });

    document.querySelectorAll('.btn-reject').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        handleReject(id, name);
      });
    });
  }

  /**
   * Handle approve action
   */
  function handleApprove(id, name) {
    const confirmed = confirm(`Are you sure you want to approve the registration for ${name}?`);
    
    if (confirmed) {
      // In production, this would call an API endpoint
      alert(`Registration approved for ${name}`);
      
      // Refresh the table
      populatePendingTable();
      
      // Update dashboard stats (in production, fetch from API)
      // updateDashboardStats();
    }
  }

  /**
   * Handle reject action
   */
  function handleReject(id, name) {
    const confirmed = confirm(`Are you sure you want to reject the registration for ${name}?`);
    
    if (confirmed) {
      // In production, this would call an API endpoint
      alert(`Registration rejected for ${name}`);
      
      // Refresh the table
      populatePendingTable();
      
      // Update dashboard stats (in production, fetch from API)
      // updateDashboardStats();
    }
  }

  // Populate pending registrations table
  populatePendingTable();


  /* ========================================
     UTILITY FUNCTIONS
     ======================================== */

  /**
   * Optional: Function to update chart data dynamically
   * This can be called when you fetch data from PHP/API
   */
  window.updateDashboardData = function(data) {
    // Update card values
    if (data.totalMembers !== undefined) {
      document.querySelector('.card-blue .card-value').textContent = data.totalMembers;
    }
    if (data.pendingRequests !== undefined) {
      document.querySelector('.card-orange .card-value').textContent = data.pendingRequests;
    }
    if (data.activeAnnouncements !== undefined) {
      document.querySelector('.card-green .card-value').textContent = data.activeAnnouncements;
    }
    
    // Reinitialize charts with new data if needed
    // You would need to destroy old charts first and create new ones
    // Example: Chart.getChart('membersChart')?.destroy();
    // Then call initializeCharts() again with new data
  };

});
