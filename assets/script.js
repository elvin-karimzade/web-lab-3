// script.js
function downloadFile(url, message) {
    alert(message);
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

function addEducation() {
  const input = prompt("Yeni təhsil məlumatını daxil edin:");
  if (input) {
    const li = document.createElement('li');
    li.textContent = input;
    document.getElementById('education-list').appendChild(li);
  }
}

function addExperience() {
  const input = prompt("Yeni təcrübəni daxil edin:");
  if (input) {
    const li = document.createElement('li');
    li.textContent = input;
    document.getElementById('experience-list').appendChild(li);
  }
}