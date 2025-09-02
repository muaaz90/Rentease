// Admin reports and analytics functionality

let properties = [];
let users = [];
let bookings = [];

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
  
  // Load data
  loadPropertiesData();
  loadUsersData();
  loadBookingsData();
  
  // Load reports
  loadReports();
  
  // Initialize charts
  initializeCharts();
  
  // Set default date range (last 30 days)
  setDefaultDateRange();
});

function loadPropertiesData() {
  properties = [
    { 
      id: 1,
      title: "2BHK Apartment", 
      location: "Bangalore", 
      price: 15000, 
      priceDisplay: "₹15,000",
      image: "https://via.placeholder.com/400x200",
      photos: [
        "https://via.placeholder.com/400x200",
        "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Living+Room",
        "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Bedroom+1",
        "https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Kitchen"
      ],
      type: "apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: "1200 sq ft",
      description: "Beautiful 2BHK apartment in prime location with modern amenities. Perfect for families or working professionals.",
      amenities: ["Parking", "Security", "Gym", "Swimming Pool", "Garden"],
      available: true,
      owner: "John Smith",
      contact: "+91 98765 43210",
      address: "123 MG Road, Bangalore, Karnataka 560001",
      ownerEmail: "john@example.com",
      status: "approved",
      submittedAt: "2025-01-15T10:30:00Z",
      views: 45,
      enquiries: 8
    },
    { 
      id: 2,
      title: "PG for Boys", 
      location: "Hyderabad", 
      price: 6000, 
      priceDisplay: "₹6,000",
      image: "https://via.placeholder.com/400x200",
      photos: [
        "https://via.placeholder.com/400x200",
        "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Room+1",
        "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Common+Area"
      ],
      type: "pg",
      bedrooms: 1,
      bathrooms: 1,
      area: "200 sq ft",
      description: "Clean and comfortable PG accommodation for boys. Includes meals and basic amenities.",
      amenities: ["Meals", "WiFi", "Laundry", "Security", "Common Area"],
      available: true,
      owner: "Mrs. Rajesh Kumar",
      contact: "+91 87654 32109",
      address: "456 Hitech City, Hyderabad, Telangana 500081",
      ownerEmail: "rajesh@example.com",
      status: "pending",
      submittedAt: "2025-01-20T14:15:00Z",
      views: 23,
      enquiries: 3
    },
    { 
      id: 3,
      title: "Commercial Store", 
      location: "Chennai", 
      price: 25000, 
      priceDisplay: "₹25,000",
      image: "https://via.placeholder.com/400x200",
      photos: [
        "https://via.placeholder.com/400x200",
        "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Store+Front",
        "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Interior+1",
        "https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Interior+2"
      ],
      type: "commercial",
      bedrooms: 0,
      bathrooms: 1,
      area: "800 sq ft",
      description: "Prime commercial space in busy market area. Ideal for retail business or office setup.",
      amenities: ["Parking", "Security", "Power Backup", "Water Supply", "Main Road Access"],
      available: true,
      owner: "ABC Properties",
      contact: "+91 76543 21098",
      address: "789 Anna Salai, Chennai, Tamil Nadu 600002",
      ownerEmail: "abc@example.com",
      status: "approved",
      submittedAt: "2025-01-10T09:45:00Z",
      views: 67,
      enquiries: 12
    },
    { 
      id: 4,
      title: "1BHK Studio", 
      location: "Mumbai", 
      price: 18000, 
      priceDisplay: "₹18,000",
      image: "https://via.placeholder.com/400x200",
      photos: [
        "https://via.placeholder.com/400x200",
        "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Studio+View",
        "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Kitchen+Area"
      ],
      type: "apartment",
      bedrooms: 1,
      bathrooms: 1,
      area: "600 sq ft",
      description: "Compact studio apartment in heart of Mumbai. Perfect for young professionals.",
      amenities: ["Parking", "Security", "Lift", "Balcony", "Near Metro"],
      available: true,
      owner: "Mumbai Realty",
      contact: "+91 65432 10987",
      address: "321 Bandra West, Mumbai, Maharashtra 400050",
      ownerEmail: "mumbai@example.com",
      status: "rejected",
      submittedAt: "2025-01-18T16:20:00Z",
      views: 12,
      enquiries: 1
    },
    { 
      id: 5,
      title: "3BHK Villa", 
      location: "Pune", 
      price: 35000, 
      priceDisplay: "₹35,000",
      image: "https://via.placeholder.com/400x200",
      photos: [
        "https://via.placeholder.com/400x200",
        "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Villa+Exterior",
        "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Living+Room",
        "https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Garden+Area",
        "https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=Master+Bedroom"
      ],
      type: "villa",
      bedrooms: 3,
      bathrooms: 3,
      area: "2000 sq ft",
      description: "Spacious villa with garden and modern amenities. Perfect for large families.",
      amenities: ["Garden", "Parking", "Security", "Swimming Pool", "Gym", "Club House"],
      available: false,
      owner: "Pune Properties",
      contact: "+91 54321 09876",
      address: "654 Koregaon Park, Pune, Maharashtra 411001",
      ownerEmail: "pune@example.com",
      status: "approved",
      submittedAt: "2025-01-12T11:30:00Z",
      views: 89,
      enquiries: 15
    }
  ];
}

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
    }
  ];
}

function loadBookingsData() {
  bookings = [
    {
      id: 1,
      propertyId: 1,
      propertyTitle: "2BHK Apartment",
      userEmail: "alice@example.com",
      type: "visit",
      status: "confirmed",
      visitDate: "2025-01-25",
      visitTime: "10:00 AM",
      message: "Interested in viewing the property",
      createdAt: "2025-01-20T10:00:00Z"
    },
    {
      id: 2,
      propertyId: 2,
      propertyTitle: "PG for Boys",
      userEmail: "bob@example.com",
      type: "enquiry",
      status: "pending",
      message: "Is the PG available for immediate move-in?",
      createdAt: "2025-01-19T15:30:00Z"
    },
    {
      id: 3,
      propertyId: 3,
      propertyTitle: "Commercial Store",
      userEmail: "alice@example.com",
      type: "booking",
      status: "confirmed",
      visitDate: "2025-01-22",
      visitTime: "2:00 PM",
      message: "Looking for commercial space for my business",
      createdAt: "2025-01-18T11:20:00Z"
    }
  ];
}

function loadReports() {
  const userEmail = sessionStorage.getItem('userEmail');
  document.getElementById('userEmail').textContent = userEmail;
  
  // Update key metrics
  updateKeyMetrics();
  
  // Load detailed analytics
  loadDetailedAnalytics();
}

function setDefaultDateRange() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
  
  document.getElementById('dateFrom').value = thirtyDaysAgo.toISOString().split('T')[0];
  document.getElementById('dateTo').value = today.toISOString().split('T')[0];
}

function updateKeyMetrics() {
  // Calculate total revenue (sum of all property prices)
  const totalRevenue = properties.reduce((sum, property) => sum + property.price, 0);
  
  // Calculate average property price
  const avgPropertyPrice = totalRevenue / properties.length;
  
  // Calculate conversion rate (enquiries / views)
  const totalViews = properties.reduce((sum, property) => sum + property.views, 0);
  const totalEnquiries = properties.reduce((sum, property) => sum + property.enquiries, 0);
  const conversionRate = totalViews > 0 ? (totalEnquiries / totalViews) * 100 : 0;
  
  // Calculate average response time (mock data)
  const avgResponseTime = 2.5; // hours
  
  document.getElementById('totalRevenue').textContent = `₹${totalRevenue.toLocaleString()}`;
  document.getElementById('avgPropertyPrice').textContent = `₹${Math.round(avgPropertyPrice).toLocaleString()}`;
  document.getElementById('conversionRate').textContent = `${conversionRate.toFixed(1)}%`;
  document.getElementById('avgResponseTime').textContent = `${avgResponseTime}h`;
}

function loadDetailedAnalytics() {
  // Top performing properties
  const topProperties = properties
    .sort((a, b) => b.enquiries - a.enquiries)
    .slice(0, 5);
  
  const topPropertiesContainer = document.getElementById('topProperties');
  topPropertiesContainer.innerHTML = '';
  
  topProperties.forEach((property, index) => {
    const propertyItem = document.createElement('div');
    propertyItem.className = 'd-flex justify-content-between align-items-center mb-2 p-2 border rounded';
    propertyItem.innerHTML = `
      <div>
        <strong>${index + 1}. ${property.title}</strong>
        <br>
        <small class="text-muted">${property.location} • ${property.enquiries} enquiries</small>
      </div>
      <span class="badge bg-primary">${property.priceDisplay}</span>
    `;
    topPropertiesContainer.appendChild(propertyItem);
  });
  
  // Most active users
  const activeUsers = users
    .filter(user => user.userType !== 'admin')
    .sort((a, b) => (b.propertiesCount + b.bookingsCount) - (a.propertiesCount + a.bookingsCount))
    .slice(0, 5);
  
  const activeUsersContainer = document.getElementById('activeUsers');
  activeUsersContainer.innerHTML = '';
  
  activeUsers.forEach((user, index) => {
    const userItem = document.createElement('div');
    userItem.className = 'd-flex justify-content-between align-items-center mb-2 p-2 border rounded';
    userItem.innerHTML = `
      <div>
        <strong>${index + 1}. ${user.firstName} ${user.lastName}</strong>
        <br>
        <small class="text-muted">${user.propertiesCount} properties • ${user.bookingsCount} bookings</small>
      </div>
      <span class="badge bg-success">${user.userType}</span>
    `;
    activeUsersContainer.appendChild(userItem);
  });
}

function initializeCharts() {
  // User Growth Chart
  const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
  new Chart(userGrowthCtx, {
    type: 'line',
    data: {
      labels: ['Jan 1', 'Jan 5', 'Jan 8', 'Jan 12', 'Jan 15', 'Jan 18', 'Jan 20'],
      datasets: [{
        label: 'New Users',
        data: [1, 2, 3, 3, 4, 4, 4],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Property Status Chart
  const propertyStatusCtx = document.getElementById('propertyStatusChart').getContext('2d');
  const statusCounts = {
    'approved': properties.filter(p => p.status === 'approved').length,
    'pending': properties.filter(p => p.status === 'pending').length,
    'rejected': properties.filter(p => p.status === 'rejected').length
  };
  
  new Chart(propertyStatusCtx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        data: Object.values(statusCounts),
        backgroundColor: [
          '#28a745',
          '#ffc107',
          '#dc3545'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
  
  // Booking Trends Chart
  const bookingTrendsCtx = document.getElementById('bookingTrendsChart').getContext('2d');
  new Chart(bookingTrendsCtx, {
    type: 'bar',
    data: {
      labels: ['Enquiries', 'Visits', 'Bookings'],
      datasets: [{
        label: 'Count',
        data: [12, 8, 3],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Revenue by Property Type Chart
  const revenueCtx = document.getElementById('revenueChart').getContext('2d');
  const revenueByType = {};
  properties.forEach(property => {
    if (!revenueByType[property.type]) {
      revenueByType[property.type] = 0;
    }
    revenueByType[property.type] += property.price;
  });
  
  new Chart(revenueCtx, {
    type: 'bar',
    data: {
      labels: Object.keys(revenueByType),
      datasets: [{
        label: 'Revenue (₹)',
        data: Object.values(revenueByType),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '₹' + value.toLocaleString();
            }
          }
        }
      }
    }
  });
}

function generateReport() {
  const dateFrom = document.getElementById('dateFrom').value;
  const dateTo = document.getElementById('dateTo').value;
  const reportType = document.getElementById('reportType').value;
  
  if (!dateFrom || !dateTo) {
    alert('Please select both from and to dates');
    return;
  }
  
  // Filter data based on date range and report type
  const filteredData = filterDataByDateRange(dateFrom, dateTo, reportType);
  
  // Update charts with filtered data
  updateChartsWithFilteredData(filteredData);
  
  alert('Report generated successfully!');
}

function filterDataByDateRange(dateFrom, dateTo, reportType) {
  const fromDate = new Date(dateFrom);
  const toDate = new Date(dateTo);
  
  let filteredData = {
    properties: properties.filter(p => {
      const propertyDate = new Date(p.submittedAt);
      return propertyDate >= fromDate && propertyDate <= toDate;
    }),
    users: users.filter(u => {
      const userDate = new Date(u.registeredAt);
      return userDate >= fromDate && userDate <= toDate;
    }),
    bookings: bookings.filter(b => {
      const bookingDate = new Date(b.createdAt);
      return bookingDate >= fromDate && bookingDate <= toDate;
    })
  };
  
  return filteredData;
}

function updateChartsWithFilteredData(filteredData) {
  // This would update the charts with the filtered data
  // For now, we'll just show an alert
  console.log('Filtered data:', filteredData);
}
