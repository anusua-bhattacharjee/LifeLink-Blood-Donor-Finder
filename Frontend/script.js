const API_URL = 'http://localhost:8080/api/donors';

let adminCredentials = null;

// Open the Admin Login page
function adminLogin() {
    showTab('adminLogin');
}

// Verify admin credentials with Spring Boot
async function submitAdminLogin() {
    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value;
    const errorMessage = document.getElementById("adminLoginError");

    errorMessage.style.display = "none";

    if (!username || !password) {
        errorMessage.textContent = "Please enter both username and password.";
        errorMessage.style.display = "block";
        return;
    }

    try {
        const auth = btoa(`${username}:${password}`);

        const response = await fetch(`${API_URL}/../auth/login`, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${auth}`
            }
        });

        if (!response.ok) {
            throw new Error("Invalid username or password.");
        }

        adminCredentials = { username, password };
        document.getElementById("adminLoginBtn").style.display = "none";
        document.getElementById("adminLogoutBtn").style.display = "inline-block";

        document.getElementById("adminPassword").value = "";

        alert("Admin login successful!");
        showTab('all');

    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = "block";
    }
}

// Admin logout
function adminLogout() {
    adminCredentials = null;
    document.getElementById("adminLoginBtn").style.display = "inline-block";
    document.getElementById("adminLogoutBtn").style.display = "none";

    showTab('find');
    alert("Admin logged out successfully!");
}

// Switch between website tabs
function showTab(tab) {
    document.getElementById('tab-find').style.display =
        tab === 'find' ? 'block' : 'none';

    document.getElementById('tab-register').style.display =
        tab === 'register' ? 'block' : 'none';

    document.getElementById('tab-all').style.display =
        tab === 'all' ? 'block' : 'none';

    document.getElementById('adminLoginSection').style.display =
        tab === 'adminLogin' ? 'block' : 'none';

    document.querySelectorAll('.tab').forEach((t, i) => {
        t.classList.toggle(
            'active',
            (tab === 'find' && i === 0) ||
            (tab === 'register' && i === 1) ||
            (tab === 'all' && i === 2)
        );
    });

    if (tab === 'all') {
        renderAllDonors();
    }

    if (tab === 'find') {
        searchDonors();
    }
}


// Register a new donor in MySQL
async function registerDonor() {
  const name = document.getElementById('dname').value.trim();
  const age = document.getElementById('dage').value.trim();
  const bloodGroup = document.getElementById('dblood').value;
  const city = document.getElementById('dcity').value.trim();
  const phone = document.getElementById('dphone').value.trim();
  // Validate Indian mobile number
const phonePattern = /^[6-9]\d{9}$/;

if (!phonePattern.test(phone)) {
  alert('Please enter a valid 10-digit mobile number!');
  return;
}
  const gender = document.getElementById('dgender').value;
  const lastDonation =
    document.getElementById('dlastdonation').value;

  if (!name || !age || !bloodGroup || !city || !phone) {
    alert('Please fill all required fields!');
    return;
  }

  if (Number(age) < 18 || Number(age) > 65) {
    alert('Donor age must be between 18 and 65!');
    return;
  }

  const donor = {
    name,
    age: Number(age),
    bloodGroup,
    city,
    phone,
    gender,
    lastDonation
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(donor)
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    alert('Donor registered successfully!');

    document.getElementById('dname').value = '';
    document.getElementById('dage').value = '';
    document.getElementById('dblood').value = '';
    document.getElementById('dcity').value = '';
    document.getElementById('dphone').value = '';
    document.getElementById('dgender').value = '';
    document.getElementById('dlastdonation').value = '';

    document.getElementById('regSuccess').style.display = 'block';

    setTimeout(() => {
      document.getElementById('regSuccess').style.display = 'none';
    }, 3000);

  } catch (error) {
    console.error(error);
    alert('Could not register donor. Check whether the backend is running.');
  }
}


// Search donors from MySQL
async function searchDonors() {
  const bloodGroup = document.getElementById('sblood')
    .value.trim();

  const city = document.getElementById('scity')
    .value.trim();

  const params = new URLSearchParams();

  if (bloodGroup) {
    params.append('bloodGroup', bloodGroup);
  }

  if (city) {
    params.append('city', city);
  }

  try {
    const response = await fetch(
      `${API_URL}/search?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error('Search failed');
    }

    donors = await response.json();
    renderSearchResults(donors);

  } catch (error) {
    console.error(error);
    document.getElementById('searchResults').innerHTML =
      '<div class="empty">Unable to load donors. Please try again.</div>';
  }
}


// Display search results
function renderSearchResults(results) {
  const container = document.getElementById('searchResults');

  if (results.length === 0) {
    container.innerHTML = `
      <div class="empty">
        No donors found. Try different search criteria.
      </div>`;
    return;
  }

  container.innerHTML = results.map(d => `
    <div class="donor-card">
      <div class="blood-badge">${d.bloodGroup}</div>

      <div class="donor-info">
        <div class="donor-name">
          ${d.name}
          <span class="donor-age">
            ${d.age} yrs ${d.gender ? '| ' + d.gender : ''}
          </span>
        </div>

        <div class="donor-meta">📍 ${d.city}</div>

        ${d.lastDonation ? `
          <div class="donor-meta">
            🩸 Last Donation: ${d.lastDonation}
          </div>
        ` : ''}
      </div>

      <a href="tel:${d.phone}" class="btn-contact">
        📞 ${d.phone}
      </a>
    </div>
  `).join('');
}


// Fetch and display all donors from MySQL
async function renderAllDonors() {
  const list = document.getElementById('allDonorsList');

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Could not fetch donors');
    }

    donors = await response.json();

    document.getElementById('totalDonors').textContent =
      donors.length;

    document.getElementById('citiesCovered').textContent =
      new Set(donors.map(d => d.city.toLowerCase())).size;

    document.getElementById('bloodGroups').textContent =
      new Set(donors.map(d => d.bloodGroup)).size;

    if (donors.length === 0) {
      list.innerHTML = `
        <div class="empty">
          No donors registered yet. Be the first to register!
        </div>`;
      return;
    }

    list.innerHTML = donors.map(d => `
      <div class="donor-card">
        <div class="blood-badge">${d.bloodGroup}</div>

        <div class="donor-info">
          <div class="donor-name">
            ${d.name}
            <span class="donor-age">
              ${d.age} yrs ${d.gender ? '| ' + d.gender : ''}
            </span>
          </div>

          <div class="donor-meta">📍 ${d.city}</div>
          <div class="donor-meta">📞 ${d.phone}</div>
        </div>

        <button
          class="btn-delete"
          onclick="deleteDonor(${d.id})"
        >
          🗑️ Remove
        </button>
      </div>
    `).join('');

  } catch (error) {
    console.error(error);
    list.innerHTML = `
      <div class="empty">
        Unable to load donors. Please try again.
      </div>`;
  }
}


// Delete donor from MySQL
async function deleteDonor(id) {

    if (!adminCredentials) {
        alert("Please login as admin before deleting a donor.");
        return;
    }

    if (!confirm('Are you sure you want to remove this donor?')) return;

    try {
        const auth = btoa(
            `${adminCredentials.username}:${adminCredentials.password}`
        );

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        if (response.status === 401 || response.status === 403) {
            adminCredentials = null;
            alert("Invalid admin credentials. Please login again.");
            return;
        }

        if (!response.ok) {
            throw new Error('Delete failed');
        }

        alert('Donor removed successfully!');
        renderAllDonors();

    } catch (error) {
        console.error(error);
        alert('Could not delete donor. Please try again.');
    }
}

// Show Find Donor tab when page opens
showTab('find');


