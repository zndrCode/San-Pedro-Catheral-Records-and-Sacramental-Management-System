// Pending Registrations JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // Sample pending registrations data
  let registrationsData = [
    {
      id: 1,
      name: 'Ana Reyes',
      email: 'ana.reyes@email.com',
      phone: '+63 934 567 8901',
      dob: '1995-03-10',
      gender: 'Female',
      address: '789 Oak St, Davao City',
      regDate: '2025-02-03'
    },
    {
      id: 2,
      name: 'Pedro Garcia',
      email: 'pedro.garcia@email.com',
      phone: '+63 945 678 9012',
      dob: '1988-12-05',
      gender: 'Male',
      address: '321 Pine St, Davao City',
      regDate: '2025-02-04'
    },
    {
      id: 3,
      name: 'Carmen Lopez',
      email: 'carmen.lopez@email.com',
      phone: '+63 956 789 0123',
      dob: '1992-07-18',
      gender: 'Female',
      address: '654 Maple Ave, Davao City',
      regDate: '2025-02-05'
    }
  ];

  let currentRegistration = null;

  // Update pending count
  updatePendingCount();

  // Populate table
  populateTable(registrationsData);

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filtered = registrationsData.filter(reg => 
        reg.name.toLowerCase().includes(searchTerm) ||
        reg.email.toLowerCase().includes(searchTerm)
      );
      populateTable(filtered);
    });
  }

  // Sort functionality
  const sortFilter = document.getElementById('sortFilter');
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      const sortBy = e.target.value;
      const sorted = [...registrationsData];
      
      if (sortBy === 'newest') {
        sorted.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
      } else if (sortBy === 'oldest') {
        sorted.sort((a, b) => new Date(a.regDate) - new Date(b.regDate));
      } else if (sortBy === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      }
      
      populateTable(sorted);
    });
  }

  // Modal controls
  const viewModal = document.getElementById('viewModal');
  const closeModal = document.getElementById('closeModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (closeModal) {
    closeModal.addEventListener('click', hideModal);
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', hideModal);
  }

  // Modal approve/reject buttons
  const modalApproveBtn = document.getElementById('modalApproveBtn');
  const modalRejectBtn = document.getElementById('modalRejectBtn');

  if (modalApproveBtn) {
    modalApproveBtn.addEventListener('click', () => {
      if (currentRegistration) {
        approveRegistration(currentRegistration.id);
      }
    });
  }

  if (modalRejectBtn) {
    modalRejectBtn.addEventListener('click', () => {
      if (currentRegistration) {
        rejectRegistration(currentRegistration.id);
      }
    });
  }

  // Functions
  function populateTable(data) {
    const tableBody = document.getElementById('registrationsTableBody');
    tableBody.innerHTML = '';

    if (data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6">
            <div class="empty-state">
              <div class="empty-state-icon">✅</div>
              <div class="empty-state-title">No Pending Registrations</div>
              <div class="empty-state-text">All registrations have been processed</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    data.forEach(reg => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${reg.name}</strong></td>
        <td>${reg.email}</td>
        <td>${reg.phone}</td>
        <td>${reg.address}</td>
        <td>${formatDate(reg.regDate)}</td>
        <td>
          <div class="action-buttons">
            <button class="action-btn action-btn-view" onclick="viewDetails(${reg.id})">View</button>
            <button class="btn btn-success" style="padding: 8px 12px; font-size: 13px;" onclick="approveRegistration(${reg.id})">Approve</button>
            <button class="btn btn-danger" style="padding: 8px 12px; font-size: 13px;" onclick="rejectRegistration(${reg.id})">Reject</button>
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  function updatePendingCount() {
    const count = registrationsData.length;
    document.getElementById('pendingCount').textContent = count;
  }

  function showModal(registration) {
    currentRegistration = registration;
    
    // Populate modal
    document.getElementById('modalName').textContent = registration.name;
    document.getElementById('modalEmail').textContent = registration.email;
    document.getElementById('modalPhone').textContent = registration.phone;
    document.getElementById('modalDob').textContent = formatDate(registration.dob);
    document.getElementById('modalGender').textContent = registration.gender;
    document.getElementById('modalAddress').textContent = registration.address;
    document.getElementById('modalRegDate').textContent = formatDate(registration.regDate);

    viewModal.classList.add('active');
  }

  function hideModal() {
    viewModal.classList.remove('active');
    currentRegistration = null;
  }

  // Global functions
  window.viewDetails = function(id) {
    const registration = registrationsData.find(reg => reg.id === id);
    if (registration) {
      showModal(registration);
    }
  };

  window.approveRegistration = function(id) {
    const registration = registrationsData.find(reg => reg.id === id);
    if (registration) {
      if (confirm(`Approve registration for ${registration.name}?`)) {
        // Remove from list
        registrationsData = registrationsData.filter(reg => reg.id !== id);
        populateTable(registrationsData);
        updatePendingCount();
        hideModal();
        alert(`Registration approved for ${registration.name}`);
        // In production: API call to approve
      }
    }
  };

  window.rejectRegistration = function(id) {
    const registration = registrationsData.find(reg => reg.id === id);
    if (registration) {
      if (confirm(`Reject registration for ${registration.name}?`)) {
        // Remove from list
        registrationsData = registrationsData.filter(reg => reg.id !== id);
        populateTable(registrationsData);
        updatePendingCount();
        hideModal();
        alert(`Registration rejected for ${registration.name}`);
        // In production: API call to reject
      }
    }
  };

});
