// Rejected Requests JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // Sample rejected requests data
  let requestsData = [
    {
      id: 'REQ-101',
      memberName: 'Ricardo Fernandez',
      requestType: 'Wedding',
      submittedDate: '2025-01-05',
      rejectedDate: '2025-01-08',
      rejectedBy: 'Admin',
      reason: 'Incomplete documents. Missing marriage license.'
    },
    {
      id: 'REQ-102',
      memberName: 'Sofia Martinez',
      requestType: 'Baptism',
      submittedDate: '2025-01-12',
      rejectedDate: '2025-01-14',
      rejectedBy: 'Admin',
      reason: 'Godparents not confirmed. Need baptismal certificates.'
    },
    {
      id: 'REQ-103',
      memberName: 'Miguel Cruz',
      requestType: 'Confirmation',
      submittedDate: '2024-12-20',
      rejectedDate: '2024-12-22',
      rejectedBy: 'Admin',
      reason: 'Did not complete required confirmation classes.'
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
          return new Date(b.rejectedDate) - new Date(a.rejectedDate);
        } else if (sortBy === 'oldest') {
          return new Date(a.rejectedDate) - new Date(b.rejectedDate);
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
      alert('Exporting rejected requests to CSV...');
      // In production: generate and download CSV
    });
  }

  // Modal controls
  const viewModal = document.getElementById('viewModal');
  const closeModal = document.getElementById('closeModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const deleteBtn = document.getElementById('deleteBtn');

  if (closeModal) closeModal.addEventListener('click', hideModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (currentRequest && confirm(`Delete this rejected request permanently?`)) {
        requestsData = requestsData.filter(r => r.id !== currentRequest.id);
        filteredData = [...requestsData];
        populateTable(filteredData);
        updateStats();
        hideModal();
        alert('Request deleted successfully');
      }
    });
  }

  // Functions
  function updateStats() {
    const total = requestsData.length;
    const baptismCount = requestsData.filter(r => r.requestType === 'Baptism').length;
    const weddingCount = requestsData.filter(r => r.requestType === 'Wedding').length;
    const confirmationCount = requestsData.filter(r => r.requestType === 'Confirmation').length;

    document.getElementById('totalRejected').textContent = total;
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
              <div class="empty-state-icon">✓</div>
              <div class="empty-state-title">No Rejected Requests</div>
              <div class="empty-state-text">No rejected requests found</div>
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
        <td>${formatDate(req.rejectedDate)}</td>
        <td>${req.reason.substring(0, 50)}...</td>
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
    document.getElementById('modalRejectedDate').textContent = formatDate(request.rejectedDate);
    document.getElementById('modalRejectedBy').textContent = request.rejectedBy;
    document.getElementById('modalReason').textContent = request.reason;

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
