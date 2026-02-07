// Approved Requests JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // Sample approved requests data
  let requestsData = [
    {
      id: 'REQ-001',
      memberName: 'Maria Santos',
      requestType: 'Baptism',
      submittedDate: '2025-01-15',
      approvedDate: '2025-01-18',
      scheduledDate: '2025-02-10',
      notes: 'All documents verified. Scheduled for Sunday morning service.'
    },
    {
      id: 'REQ-002',
      memberName: 'Juan Dela Cruz',
      requestType: 'Wedding',
      submittedDate: '2025-01-20',
      approvedDate: '2025-01-22',
      scheduledDate: '2025-03-15',
      notes: 'Pre-marital counseling completed. Marriage license verified.'
    },
    {
      id: 'REQ-003',
      memberName: 'Ana Reyes',
      requestType: 'Confirmation',
      submittedDate: '2024-12-10',
      approvedDate: '2024-12-12',
      scheduledDate: '2025-02-08',
      notes: 'Completed confirmation classes. Ready for sacrament.'
    },
    {
      id: 'REQ-004',
      memberName: 'Pedro Garcia',
      requestType: 'Baptism',
      submittedDate: '2025-01-25',
      approvedDate: '2025-01-28',
      scheduledDate: '2025-02-17',
      notes: 'Infant baptism. Godparents verified.'
    },
    {
      id: 'REQ-005',
      memberName: 'Carmen Lopez',
      requestType: 'Wedding',
      submittedDate: '2025-01-10',
      approvedDate: '2025-01-12',
      scheduledDate: '2025-04-20',
      notes: 'Garden ceremony approved. All requirements met.'
    }
  ];

  let filteredData = [...requestsData];
  let currentRequest = null;

  // Initialize
  updateStats();
  populateTable(filteredData);

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filteredData = requestsData.filter(req => 
        req.id.toLowerCase().includes(searchTerm) ||
        req.memberName.toLowerCase().includes(searchTerm)
      );
      populateTable(filteredData);
    });
  }

  // Type filter
  const typeFilter = document.getElementById('typeFilter');
  if (typeFilter) {
    typeFilter.addEventListener('change', (e) => {
      const type = e.target.value;
      if (type === '') {
        filteredData = [...requestsData];
      } else {
        filteredData = requestsData.filter(req => 
          req.requestType.toLowerCase() === type
        );
      }
      populateTable(filteredData);
    });
  }

  // Sort functionality
  const sortFilter = document.getElementById('sortFilter');
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      const sortBy = e.target.value;
      filteredData.sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.approvedDate) - new Date(a.approvedDate);
        } else if (sortBy === 'oldest') {
          return new Date(a.approvedDate) - new Date(b.approvedDate);
        } else if (sortBy === 'name') {
          return a.memberName.localeCompare(b.memberName);
        }
        return 0;
      });
      populateTable(filteredData);
    });
  }

  // Export button
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      alert('Exporting approved requests to CSV...');
      // In production: generate and download CSV
    });
  }

  // Modal controls
  const viewModal = document.getElementById('viewModal');
  const closeModal = document.getElementById('closeModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const printBtn = document.getElementById('printBtn');

  if (closeModal) closeModal.addEventListener('click', hideModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      alert('Printing certificate...');
      // In production: generate and print certificate
    });
  }

  // Functions
  function updateStats() {
    const total = requestsData.length;
    const baptismCount = requestsData.filter(r => r.requestType === 'Baptism').length;
    const weddingCount = requestsData.filter(r => r.requestType === 'Wedding').length;
    const confirmationCount = requestsData.filter(r => r.requestType === 'Confirmation').length;

    document.getElementById('totalApproved').textContent = total;
    document.getElementById('baptismCount').textContent = baptismCount;
    document.getElementById('weddingCount').textContent = weddingCount;
    document.getElementById('confirmationCount').textContent = confirmationCount;
    document.getElementById('totalCount').textContent = total;
  }

  function populateTable(data) {
    const tableBody = document.getElementById('requestsTableBody');
    tableBody.innerHTML = '';

    if (data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <div class="empty-state-icon">📋</div>
              <div class="empty-state-title">No Approved Requests</div>
              <div class="empty-state-text">No approved requests found</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    data.forEach(req => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${req.id}</strong></td>
        <td>${req.memberName}</td>
        <td>${req.requestType}</td>
        <td>${formatDate(req.submittedDate)}</td>
        <td>${formatDate(req.approvedDate)}</td>
        <td>${formatDate(req.scheduledDate)}</td>
        <td>
          <div class="action-buttons">
            <button class="action-btn action-btn-view" onclick="viewDetails('${req.id}')">View</button>
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function showModal(request) {
    currentRequest = request;
    
    document.getElementById('modalRequestId').textContent = request.id;
    document.getElementById('modalMemberName').textContent = request.memberName;
    document.getElementById('modalRequestType').textContent = request.requestType;
    document.getElementById('modalSubmittedDate').textContent = formatDate(request.submittedDate);
    document.getElementById('modalApprovedDate').textContent = formatDate(request.approvedDate);
    document.getElementById('modalScheduledDate').textContent = formatDate(request.scheduledDate);
    document.getElementById('modalNotes').textContent = request.notes;

    viewModal.classList.add('active');
  }

  function hideModal() {
    viewModal.classList.remove('active');
    currentRequest = null;
  }

  // Global function
  window.viewDetails = function(id) {
    const request = requestsData.find(req => req.id === id);
    if (request) {
      showModal(request);
    }
  };

});
