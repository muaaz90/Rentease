// Admin users management functionality

let users = [];
let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in and is an admin
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const userEmail = sessionStorage.getItem('userEmail');
  
  if (!isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }
  
  // Check if user is an admin
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  if (userData.userType !== 'admin') {
    alert('Access denied. This page is for administrators only.');
    window.location.href = 'dashboard.html';
    return;
  }
  
  // Load users data
  loadUsersData();
  
  // Load users
  loadUsers();
  
  // Setup filters
  setupFilters();
  
  // Setup modals
  setupModals();
});

function loadUsersData() {
  users = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      phone: "+91 98765 43210",
      userType: "landlord",
      status: "active",
      registeredAt: "2025-01-01T10:00:00Z",
      lastLogin: "2025-01-20T15:30:00Z",
      propertiesCount: 2,
      bookingsCount: 5
    },
    {
      id: 2,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice@example.com",
      phone: "+91 87654 32109",
      userType: "tenant",
      status: "active",
      registeredAt: "2025-01-05T14:20:00Z",
      lastLogin: "2025-01-19T09:15:00Z",
      propertiesCount: 0,
      bookingsCount: 3
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Wilson",
      email: "bob@example.com",
      phone: "+91 76543 21098",
      userType: "both",
      status: "active",
      registeredAt: "2025-01-08T16:45:00Z",
      lastLogin: "2025-01-18T12:00:00Z",
      propertiesCount: 1,
      bookingsCount: 2
    },
    {
      id: 4,
      firstName: "Admin",
      lastName: "User",
      email: "admin@rentease.com",
      phone: "+91 99999 99999",
      userType: "admin",
      status: "active",
      registeredAt: "2025-01-01T00:00:00Z",
      lastLogin: "2025-01-20T16:00:00Z",
      propertiesCount: 0,
      bookingsCount: 0
    },
    {
      id: 5,
      firstName: "Sarah",
      lastName: "Davis",
      email: "sarah@example.com",
      phone: "+91 65432 10987",
      userType: "tenant",
      status: "suspended",
      registeredAt: "2025-01-10T11:30:00Z",
      lastLogin: "2025-01-15T14:20:00Z",
      propertiesCount: 0,
      bookingsCount: 1,
      suspendedAt: "2025-01-16T10:00:00Z",
      suspensionReason: "Policy Violation"
    }
  ];
}

function loadUsers() {
  const userEmail = sessionStorage.getItem('userEmail');
  document.getElementById('userEmail').textContent = userEmail;
  
  displayUsers(users);
  updateStats();
}

function displayUsers(usersToShow) {
  const usersList = document.getElementById('usersList');
  
  if (usersToShow.length === 0) {
    usersList.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-people fs-1 text-muted"></i>
        <p class="text-muted mt-2">No users found</p>
      </div>
    `;
    return;
  }
  
  usersList.innerHTML = '';
  usersToShow.forEach(user => {
    const userCard = document.createElement('div');
    userCard.className = 'card mb-3';
    
    const statusBadge = getStatusBadge(user.status);
    const typeBadge = getTypeBadge(user.userType);
    
    userCard.innerHTML = `
      <div class="card-body">
        <div class="row">
          <div class="col-md-8">
            <h6 class="card-title">${user.firstName} ${user.lastName}</h6>
            <p class="card-text text-muted">
              <i class="bi bi-envelope"></i> ${user.email}
            </p>
            <p class="card-text">
              <i class="bi bi-telephone"></i> ${user.phone}
            </p>
            <p class="card-text">
              <strong>Type:</strong> ${typeBadge}
              <span class="ms-3"><strong>Status:</strong> ${statusBadge}</span>
            </p>
            <p class="card-text">
              <strong>Properties:</strong> ${user.propertiesCount} • 
              <strong>Bookings:</strong> ${user.bookingsCount}
            </p>
            <small class="text-muted">
              Registered: ${formatDate(user.registeredAt)} • 
              Last Login: ${formatDate(user.lastLogin)}
            </small>
          </div>
          <div class="col-md-4 text-end">
            <div class="btn-group-vertical w-100">
              <button class="btn btn-outline-primary btn-sm mb-1" onclick="viewUser(${user.id})">
                <i class="bi bi-eye"></i> View Details
              </button>
              ${user.status === 'active' ? `
                <button class="btn btn-warning btn-sm mb-1" onclick="suspendUser(${user.id})">
                  <i class="bi bi-pause"></i> Suspend
                </button>
              ` : ''}
              ${user.status === 'suspended' ? `
                <button class="btn btn-success btn-sm mb-1" onclick="activateUser(${user.id})">
                  <i class="bi bi-play"></i> Activate
                </button>
              ` : ''}
              <button class="btn btn-outline-info btn-sm" onclick="contactUser('${user.email}')">
                <i class="bi bi-envelope"></i> Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    usersList.appendChild(userCard);
  });
}

function setupFilters() {
  const statusFilter = document.getElementById('statusFilter');
  const typeFilter = document.getElementById('typeFilter');
  const searchFilter = document.getElementById('searchFilter');
  
  statusFilter.addEventListener('change', filterUsers);
  typeFilter.addEventListener('change', filterUsers);
  searchFilter.addEventListener('input', filterUsers);
}

function filterUsers() {
  const statusFilter = document.getElementById('statusFilter').value;
  const typeFilter = document.getElementById('typeFilter').value;
  const searchFilter = document.getElementById('searchFilter').value.toLowerCase();
  
  let filteredUsers = users.filter(user => {
    const matchesStatus = !statusFilter || user.status === statusFilter;
    const matchesType = !typeFilter || user.userType === typeFilter;
    const matchesSearch = !searchFilter || 
      user.firstName.toLowerCase().includes(searchFilter) ||
      user.lastName.toLowerCase().includes(searchFilter) ||
      user.email.toLowerCase().includes(searchFilter);
    
    return matchesStatus && matchesType && matchesSearch;
  });
  
  displayUsers(filteredUsers);
}

function clearFilters() {
  document.getElementById('statusFilter').value = '';
  document.getElementById('typeFilter').value = '';
  document.getElementById('searchFilter').value = '';
  displayUsers(users);
}

function viewUser(userId) {
  currentUser = users.find(u => u.id === userId);
  if (currentUser) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    
    const statusBadge = getStatusBadge(currentUser.status);
    const typeBadge = getTypeBadge(currentUser.userType);
    
    modalBody.innerHTML = `
      <div class="row">
        <div class="col-md-6">
          <h6>Personal Information</h6>
          <p><strong>Name:</strong> ${currentUser.firstName} ${currentUser.lastName}</p>
          <p><strong>Email:</strong> ${currentUser.email}</p>
          <p><strong>Phone:</strong> ${currentUser.phone}</p>
          <p><strong>User Type:</strong> ${typeBadge}</p>
          <p><strong>Status:</strong> ${statusBadge}</p>
        </div>
        <div class="col-md-6">
          <h6>Account Information</h6>
          <p><strong>Registered:</strong> ${formatDate(currentUser.registeredAt)}</p>
          <p><strong>Last Login:</strong> ${formatDate(currentUser.lastLogin)}</p>
          <p><strong>Properties Listed:</strong> ${currentUser.propertiesCount}</p>
          <p><strong>Total Bookings:</strong> ${currentUser.bookingsCount}</p>
          ${currentUser.status === 'suspended' ? `
            <p><strong>Suspended:</strong> ${formatDate(currentUser.suspendedAt)}</p>
            <p><strong>Reason:</strong> ${currentUser.suspensionReason}</p>
          ` : ''}
        </div>
      </div>
    `;
    
    // Update modal buttons based on status
    const suspendBtn = document.getElementById('suspendBtn');
    const activateBtn = document.getElementById('activateBtn');
    
    if (currentUser.status === 'active') {
      suspendBtn.style.display = 'inline-block';
      activateBtn.style.display = 'none';
      suspendBtn.onclick = () => suspendUser(userId);
    } else if (currentUser.status === 'suspended') {
      suspendBtn.style.display = 'none';
      activateBtn.style.display = 'inline-block';
      activateBtn.onclick = () => activateUser(userId);
    } else {
      suspendBtn.style.display = 'none';
      activateBtn.style.display = 'none';
    }
    
    const modal = new bootstrap.Modal(document.getElementById('userModal'));
    modal.show();
  }
}

function suspendUser(userId) {
  currentUser = users.find(u => u.id === userId);
  if (currentUser) {
    const modal = new bootstrap.Modal(document.getElementById('suspendModal'));
    modal.show();
  }
}

function activateUser(userId) {
  if (confirm('Are you sure you want to activate this user?')) {
    const user = users.find(u => u.id === userId);
    if (user) {
      user.status = 'active';
      user.activatedAt = new Date().toISOString();
      user.activatedBy = sessionStorage.getItem('userEmail');
      delete user.suspendedAt;
      delete user.suspensionReason;
      
      // Update in localStorage (in a real app, this would be sent to backend)
      localStorage.setItem('users', JSON.stringify(users));
      
      // Reload users
      loadUsers();
      
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
      modal.hide();
      
      alert('User activated successfully!');
    }
  }
}

function setupModals() {
  document.getElementById('confirmSuspendBtn').addEventListener('click', function() {
    const reason = document.getElementById('suspendReason').value;
    const message = document.getElementById('suspendMessage').value;
    
    if (!reason) {
      alert('Please select a reason for suspension');
      return;
    }
    
    if (currentUser) {
      currentUser.status = 'suspended';
      currentUser.suspendedAt = new Date().toISOString();
      currentUser.suspendedBy = sessionStorage.getItem('userEmail');
      currentUser.suspensionReason = reason;
      currentUser.suspensionMessage = message;
      
      // Update in localStorage (in a real app, this would be sent to backend)
      localStorage.setItem('users', JSON.stringify(users));
      
      // Reload users
      loadUsers();
      
      // Close modals
      const suspendModal = bootstrap.Modal.getInstance(document.getElementById('suspendModal'));
      suspendModal.hide();
      
      const userModal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
      if (userModal) userModal.hide();
      
      alert('User suspended successfully!');
    }
  });
}

function contactUser(userEmail) {
  window.location.href = `mailto:${userEmail}`;
}

function updateStats() {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const landlords = users.filter(u => u.userType === 'landlord' || u.userType === 'both').length;
  const tenants = users.filter(u => u.userType === 'tenant' || u.userType === 'both').length;
  
  document.getElementById('totalUsers').textContent = totalUsers;
  document.getElementById('activeUsers').textContent = activeUsers;
  document.getElementById('landlords').textContent = landlords;
  document.getElementById('tenants').textContent = tenants;
}

function getStatusBadge(status) {
  const badges = {
    'active': '<span class="badge bg-success">Active</span>',
    'inactive': '<span class="badge bg-secondary">Inactive</span>',
    'suspended': '<span class="badge bg-danger">Suspended</span>'
  };
  return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
}

function getTypeBadge(type) {
  const badges = {
    'tenant': '<span class="badge bg-info">Tenant</span>',
    'landlord': '<span class="badge bg-warning">Landlord</span>',
    'both': '<span class="badge bg-primary">Both</span>',
    'admin': '<span class="badge bg-danger">Admin</span>'
  };
  return badges[type] || '<span class="badge bg-secondary">Unknown</span>';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
