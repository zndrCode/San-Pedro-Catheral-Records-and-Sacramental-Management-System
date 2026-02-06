// Members List Page JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // Sample members data (replace with API call in production)
  const membersData = [
    { id: 1, name: 'Maria Santos', email: 'maria.santos@email.com', phone: '+63 912 345 6789', dateJoined: '2024-01-15', status: 'active' },
    { id: 2, name: 'Juan Dela Cruz', email: 'juan.delacruz@email.com', phone: '+63 923 456 7890', dateJoined: '2024-02-20', status: 'active' },
    { id: 3, name: 'Ana Reyes', email: 'ana.reyes@email.com', phone: '+63 934 567 8901', dateJoined: '2024-03-10', status: 'active' },
    { id: 4, name: 'Pedro Garcia', email: 'pedro.garcia@email.com', phone: '+63 945 678 9012', dateJoined: '2023-12-05', status: 'inactive' },
    { id: 5, name: 'Carmen Lopez', email: 'carmen.lopez@email.com', phone: '+63 956 789 0123', dateJoined: '2024-04-12', status: 'active' },
    { id: 6, name: 'Ricardo Fernandez', email: 'ricardo.f@email.com', phone: '+63 967 890 1234', dateJoined: '2023-11-20', status: 'active' },
    { id: 7, name: 'Sofia Martinez', email: 'sofia.martinez@email.com', phone: '+63 978 901 2345', dateJoined: '2024-05-08', status: 'active' },
    { id: 8, name: 'Miguel Cruz', email: 'miguel.cruz@email.com', phone: '+63 989 012 3456', dateJoined: '2023-10-15', status: 'inactive' },
    { id: 9, name: 'Isabel Ramos', email: 'isabel.ramos@email.com', phone: '+63 990 123 4567', dateJoined: '2024-06-22', status: 'active' },
    { id: 10, name: 'Luis Torres', email: 'luis.torres@email.com', phone: '+63 901 234 5678', dateJoined: '2024-01-30', status: 'active' }
  ];

  let filteredMembers = [...membersData];

  /**
   * Populate the members table
   */
  function populateMembersTable(members) {
    const tableBody = document.getElementById('membersTableBody');
    
    if (!tableBody) return;

    // Clear existing rows
    tableBody.innerHTML = '';

    if (members.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <div class="empty-state-icon">👥</div>
              <div class="empty-state-title">No members found</div>
              <div class="empty-state-text">Try adjusting your search or filter criteria</div>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    // Populate table rows
    members.forEach(member => {
      const row = document.createElement('tr');
      
      const statusClass = member.status === 'active' ? 'status-active' : 'status-inactive';
      const statusText = member.status.charAt(0).toUpperCase() + member.status.slice(1);

      row.innerHTML = `
        <td>
          <input type="checkbox" class="member-checkbox" data-id="${member.id}">
        </td>
        <td><strong>${member.name}</strong></td>
        <td>${member.email}</td>
        <td>${member.phone}</td>
        <td>${formatDate(member.dateJoined)}</td>
        <td>
          <span class="status-badge ${statusClass}">${statusText}</span>
        </td>
        <td>
          <div class="action-buttons">
            <button class="action-btn action-btn-view" onclick="viewMember(${member.id})">View</button>
            <button class="action-btn action-btn-edit" onclick="editMember(${member.id})">Edit</button>
            <button class="action-btn action-btn-delete" onclick="deleteMember(${member.id})">Delete</button>
          </div>
        </td>
      `;
      
      tableBody.appendChild(row);
    });
  }

  /**
   * Format date string
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  /**
   * Search functionality
   */
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      filteredMembers = membersData.filter(member => 
        member.name.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm) ||
        member.phone.includes(searchTerm)
      );
      
      populateMembersTable(filteredMembers);
    });
  }

  /**
   * Status filter
   */
  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      const status = e.target.value;
      
      if (status === '') {
        filteredMembers = [...membersData];
      } else {
        filteredMembers = membersData.filter(member => member.status === status);
      }
      
      populateMembersTable(filteredMembers);
    });
  }

  /**
   * Sort functionality
   */
  const sortFilter = document.getElementById('sortFilter');
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      const sortBy = e.target.value;
      
      filteredMembers.sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'date') {
          return new Date(b.dateJoined) - new Date(a.dateJoined);
        } else if (sortBy === 'email') {
          return a.email.localeCompare(b.email);
        }
        return 0;
      });
      
      populateMembersTable(filteredMembers);
    });
  }

  /**
   * Select all checkboxes
   */
  const selectAllCheckbox = document.getElementById('selectAll');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', (e) => {
      const checkboxes = document.querySelectorAll('.member-checkbox');
      checkboxes.forEach(checkbox => {
        checkbox.checked = e.target.checked;
      });
    });
  }

  /**
   * Add member button
   */
  const addMemberBtn = document.getElementById('addMemberBtn');
  if (addMemberBtn) {
    addMemberBtn.addEventListener('click', () => {
      // In production, open add member form/modal
      alert('Opening Add Member form...');
      // window.location.href = 'add-member.html';
    });
  }

  /**
   * Export button
   */
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      alert('Exporting members list to CSV...');
      // In production, generate and download CSV file
    });
  }

  // Initialize table
  populateMembersTable(filteredMembers);

});

/**
 * Global functions for action buttons
 */
function viewMember(id) {
  alert(`Viewing member details for ID: ${id}`);
  // In production: window.location.href = `member-details.html?id=${id}`;
}

function editMember(id) {
  alert(`Editing member with ID: ${id}`);
  // In production: window.location.href = `edit-member.html?id=${id}`;
}

function deleteMember(id) {
  if (confirm('Are you sure you want to delete this member?')) {
    alert(`Deleting member with ID: ${id}`);
    // In production: call API to delete member
  }
}
