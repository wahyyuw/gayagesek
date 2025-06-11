// Calculator
const surfaceSelect = document.getElementById("surface");
const modeSelect = document.getElementById("mode");
const inputsDiv = document.getElementById("inputs");

function updateForm() {
  const surface = surfaceSelect.value;
  const mode = modeSelect.value;
  let html = "";

  if (mode === "koefisien") {
    html +=
      '<div class="form-group"><label>Massa (kg):</label><input type="number" id="massa"></div>';
    html +=
      '<div class="form-group"><label>Gaya Gesek (N):</label><input type="number" id="gaya"></div>';
    if (surface === "miring") {
      html +=
        '<div class="form-group"><label>Sudut Kemiringan (derajat):</label><input type="number" id="sudut"></div>';
    }
  } else if (mode === "gaya") {
    html +=
      '<div class="form-group"><label>Massa (kg):</label><input type="number" id="massa"></div>';
    html +=
      '<div class="form-group"><label>Koefisien Gesek (μ):</label><input type="number" id="mu" step="any"></div>';
    if (surface === "miring") {
      html +=
        '<div class="form-group"><label>Sudut Kemiringan (derajat):</label><input type="number" id="sudut"></div>';
    }
  }

  inputsDiv.innerHTML = html;
}

function hitung() {
  const g = 9.8;
  const surface = surfaceSelect.value;
  const mode = modeSelect.value;
  const massa = parseFloat(document.getElementById("massa")?.value || 0);
  const sudut = parseFloat(document.getElementById("sudut")?.value || 0);

  let hasil = "";

  if (mode === "koefisien") {
    const gaya = parseFloat(document.getElementById("gaya")?.value || 0);
    let normal = 0;
    if (surface === "datar") {
      normal = massa * g;
    } else {
      const sudutRad = (sudut * Math.PI) / 180;
      normal = massa * g * Math.cos(sudutRad);
    }
    const mu = gaya / normal;
    hasil = `Koefisien gesek (μ) = ${mu.toFixed(4)}`;
  } else if (mode === "gaya") {
    const mu = parseFloat(document.getElementById("mu")?.value || 0);
    let normal = 0;
    if (surface === "datar") {
      normal = massa * g;
    } else {
      const sudutRad = (sudut * Math.PI) / 180;
      normal = massa * g * Math.cos(sudutRad);
    }
    const gaya = mu * normal;
    hasil = `Gaya gesek (F) = ${gaya.toFixed(2)} N`;
  }

  document.getElementById("hasil").innerText = hasil;
}

updateForm(); // initialize on load

// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
