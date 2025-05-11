// Məlumatları JavaScript dəyişənlərində saxladım
const cvData = {
  name: "Elvin Kərimzadə",
  phone: "Telefon: +994 99 307 12 04",
  email: "Email: elvin.karimzade@gmail.com",
  address: "Ünvan: Bakı, Azərbaycan",
  about: "Məsuliyyətli və yaradıcı bir şəxsəm. Komandada işləməyi, CTF-lərlə işləməyi və yeni texnologiyalar öyrənməyi sevirəm.",
  education: [
    "Azərbaycan Texniki Universiteti – İnformasiya Təhlükəsizliyi (2024 - 2028)"
  ],
  experience: [
    "Web Developer – Azərbaycan Texniki Universiteti (2024 - Hal-hazırda)"
  ],
  skills: [
    "HTML / CSS",
    "JavaScript",
    "Python əsasları",
    "Git və GitHub"
  ]
};


window.onload = function () {
  document.getElementById("name").textContent = cvData.name;
  document.getElementById("phone").textContent = cvData.phone;
  document.getElementById("email").textContent = cvData.email;
  document.getElementById("address").textContent = cvData.address;
  document.getElementById("about").innerHTML = `<p>${cvData.about}</p>`;

  loadList("education-list", cvData.education);
  loadList("experience-list", cvData.experience);
  loadList("skills-list", cvData.skills);
};

// Siyahı yükləmə funksiyası
function loadList(elementId, data) {
  const ul = document.getElementById(elementId);
  ul.innerHTML = "";
  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

function addEducation() {
  const input = prompt("Yeni təhsil məlumatını daxil edin:");
  if (input) {
    cvData.education.push(input);
    loadList("education-list", cvData.education);
  }
}

function addExperience() {
  const input = prompt("Yeni təcrübəni daxil edin:");
  if (input) {
    cvData.experience.push(input);
    loadList("experience-list", cvData.experience);
  }
}

function addSkill() {
  const input = prompt("Yeni bacarığı daxil edin:");
  if (input) {
    cvData.skills.push(input);
    loadList("skills-list", cvData.skills);
  }
}

function downloadFile(url, message) {
  alert(message);
  const link = document.createElement('a');
  link.href = url;
  link.download = '';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}