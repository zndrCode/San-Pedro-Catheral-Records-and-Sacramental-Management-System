// Member Profiles JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // Sample member data
  const membersData = {
    1: {
      id: 'M001',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '+63 912 345 6789',
      dob: '1990-05-15',
      gender: 'Female',
      address: '123 Main St, Davao City',
      status: 'Active',
      dateJoined: '2024-01-15',
      memberType: 'Regular Member',
      sacraments: [
        { type: 'Baptism', date: '1990-06-10', location: 'San Pedro Cathedral', certificate: 'CERT-001' },
        { type: 'Confirmation', date: '2003-05-20', location: 'San Pedro Cathedral', certificate: 'CERT-002' }
      ],
      requests: [
        { type: 'Wedding', dateSubmitted: '2024-11-20', status: 'Approved' }
      ]
    },
    2: {
      id: 'M002',
      name: 'Juan Dela Cruz',
      email: 'juan.delacruz@email.com',
      phone: '+63 923 456 7890',
      dob: '1985-08-22',
      gender: 'Male',
      address: '456 Elm St, Davao City',
      status: 'Active',
      dateJoined: '2024-02-20',
      memberType: 'Regular Member',
      sacraments: [
        { type: 'Baptism', date: '1985-09-15', location: 'San Pedro Cathedral', certificate: 'CERT-003' }
      ],
      requests: [
        { type: 'Baptism', dateSubmitted: '2025-01-10', status: 'Pending' }
      ]
    }
  };

  const searchInput = document.getElementById('searchMember');
  const profileCard = document.getElementById('profileCard');
  const emptyState = document.getElementById('emptyState');
  const editBtn = document.getElementById('editBtn');

  let currentMemberId = null;

  // Search member
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      // Simple search - find first matching member
      const foundMember = Object.values(membersData).find(member => 
        member.name.toLowerCase().includes(searchTerm) ||
        member.id.toLowerCase().includes(searchTerm)
      );

      if (foundMember && searchTerm.length > 2) {
        displayMemberProfile(foundMember);
      } else if (searchTerm.length === 0) {
        hideProfile();
      }
    });
  }

  // Display member profile
  function displayMemberProfile(member) {
    currentMemberId = member.id;

    // Show profile card, hide empty state
    profileCard.style.display = 'block';
    emptyState.style.display = 'none';

    // Populate personal information
    document.getElementById('memberName').textContent = member.name;
    document.getElementById('memberId').textContent = member.id;
    document.getElementById('memberEmail').textContent = member.email;
    document.getElementById('memberPhone').textContent = member.phone;
    document.getElementById('memberDob').textContent = formatDate(member.dob);
    document.getElementById('memberGender').textContent = member.gender;
    document.getElementById('memberAddress').textContent = member.address;
    document.getElementById('memberStatus').innerHTML = `<span class="status-badge status-active">${member.status}</span>`;

    // Populate membership information
    document.getElementById('memberJoined').textContent = formatDate(member.dateJoined);
    document.getElementById('memberType').textContent = member.memberType;

    // Populate sacramental records
    const sacramentRecords = document.getElementById('sacramentRecords');
    sacramentRecords.innerHTML = '';
    
    if (member.sacraments && member.sacraments.length > 0) {
      member.sacraments.forEach(sacrament => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${sacrament.type}</td>
          <td>${formatDate(sacrament.date)}</td>
          <td>${sacrament.location}</td>
          <td>${sacrament.certificate}</td>
        `;
        sacramentRecords.appendChild(row);
      });
    } else {
      sacramentRecords.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--muted);">No sacramental records found</td></tr>';
    }

    // Populate request history
    const requestHistory = document.getElementById('requestHistory');
    requestHistory.innerHTML = '';
    
    if (member.requests && member.requests.length > 0) {
      member.requests.forEach(request => {
        const statusClass = request.status === 'Approved' ? 'status-approved' : 
                           request.status === 'Pending' ? 'status-pending' : 'status-rejected';
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${request.type}</td>
          <td>${formatDate(request.dateSubmitted)}</td>
          <td><span class="status-badge ${statusClass}">${request.status}</span></td>
          <td><button class="action-btn action-btn-view" onclick="viewRequest('${request.type}')">View</button></td>
        `;
        requestHistory.appendChild(row);
      });
    } else {
      requestHistory.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--muted);">No request history found</td></tr>';
    }
  }

  // Hide profile
  function hideProfile() {
    profileCard.style.display = 'none';
    emptyState.style.display = 'block';
    currentMemberId = null;
  }

  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Edit button
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      if (currentMemberId) {
        alert(`Editing member: ${currentMemberId}`);
        // In production: window.location.href = `edit-member.html?id=${currentMemberId}`;
      }
    });
  }

});

// Global function for viewing request
function viewRequest(type) {
  alert(`Viewing ${type} request details`);
  // In production: window.location.href = `request-details.html?type=${type}`;
}
