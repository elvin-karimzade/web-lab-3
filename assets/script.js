const data = {
  contacts: [
    "📞 +994-99-307-12-04",
    "✉️ elvin.karimzade@gmail.com",
    "📍 Bakı, Azərbaycan"
  ],
  education: [
    "<strong>2024-2028</strong><br>İnformasiya təhlükəsizliyi ixtisası<br>Azərbaycan Texniki Universiteti"
  ],
  skills: [
    "Proqramlaşdırma dili: Bash, Python, VB.net, Arduino, C++",
    "İOT : Ağıllı Ev qurulması, BADUSB, Phishing on esp32",
    "IT : HelpDesk, Network, Linux, Windows, WEB Security, AD",
    "Əməliyyat Sistemləri : Windows, Linux",
    "Şəxsi bacarıqlar : Komanda ilə işləmə, CTF həll etmə, Ətraflı və Məntiqi düşünmə"
    ],
  languages: [
    "Azərbaycan (Ana dili)",
    "İngilis (B1)",
    "Rus (A1)",
    "Alman (A1)"
  ],
  certifications: [
    "TryHackMe : Hackfinity Battle CTF (08.04.2025)",
    "TryHackMe : Junior Penetration Tester (16.03.2025)",
    "TryHackMe : WEB Fundamentals (14.03.2025)",
    "TryHackMe : Complete Beginner (14.03.2025)",
    "TryHackMe : CyberSecurity 101 (28.02.2025)",
    "TryHackMe : Presecurity (02.11.2024)",
    "TryHackMe : Introduction to CyberSecurity (02.11.2024)"
  ],
  profileText: "Salam, hörmətli HR komandası, mən Kərimzadə Elvin bu məktubu sizin mərkəzdə işləmək üçün yazıram. İlk öncə özüm haqqında danışmaq istəyirəm. Mən 9 yaşımdan İT və IoT sahəsində özümü inkişaf etdirirəm. Hazırda özümü kibertəhlükəsizliyin qırmızı komanda sahəsində inkişaf etdirirəm. Bu sahədə əsas səviyyədə Network, Helpdesk, Web, Linux və Windows biliklərinə sahibim. Hazırda mən TryHackMe.I ilə işləyirəm. O vaxtkı məqsədim “Tryhackme-də Azərbaycanda ilk 50-liyə daxil olmaq” indi realdır. Hazırda TryHackMe-də CyberSecurity 101,Web Fundamentals,Jr.Penetration Tester Sertifikatları əldə etmişəm. Eyni zamanda Arduino,Vb.Net, Python və C++ proqramlaşdırma dillərini baza səviyyədə bilirəm. Universitetə ​​qəbul olandan sonra qardaşım Kərimzadə Möhlət sizinlə işləməyi məsləhət gördü. Və onun burada öyrəndiklərini və karyera həyatında nələrə nail olduğunu gördüm. Bu isə məndə böyük maraq doğurdu və başa düşdüm ki, karyerama böyük töhfə verəcək. CV-mi oxuduğunuz üçün təşəkkür edirəm.",
  thmLink: "https://tryhackme.com/p/elvin.2007"
};

function createListItem(text, dataKey, index, isHtml = false) {
  const li = document.createElement("li");

  const contentSpan = document.createElement("span");
  contentSpan.innerHTML = isHtml ? text : text;
  contentSpan.style.marginRight = "10px";
  li.appendChild(contentSpan);

  const modifyBtn = document.createElement("button");
  modifyBtn.textContent = "✏️";
  modifyBtn.title = "Modify";
  modifyBtn.style.marginRight = "5px";
  li.appendChild(modifyBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.title = "Delete";
  li.appendChild(deleteBtn);

  modifyBtn.addEventListener("click", () => {
    if (li.querySelector("input")) return;

    const current = isHtml ? contentSpan.innerHTML.replace(/<br>/g, " ") : contentSpan.textContent;
    contentSpan.style.display = "none";

    const input = document.createElement("input");
    input.type = "text";
    input.value = current;
    input.style.width = "70%";
    li.insertBefore(input, modifyBtn);
    input.focus();

    function finishEdit() {
      const val = input.value.trim();
      if (!val) return alert("Value cannot be empty!");
      if (isHtml) {
        contentSpan.innerHTML = val.replace(/\n/g, "<br>");
        data[dataKey][index] = val.replace(/\n/g, "<br>");
      } else {
        contentSpan.textContent = val;
        data[dataKey][index] = val;
      }
      li.removeChild(input);
      contentSpan.style.display = "";
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") finishEdit();
      else if (e.key === "Escape") {
        li.removeChild(input);
        contentSpan.style.display = "";
      }
    });

    input.addEventListener("blur", () => {
      if (li.contains(input)) finishEdit();
    });
  });

  deleteBtn.addEventListener("click", () => {
    if (confirm("Bu elementi silmək istədiyinizə əminsiniz?")) {
      data[dataKey].splice(index, 1);
      li.remove();
      refreshList(dataKey);
    }
  });

  return li;
}

function refreshList(dataKey) {
  const selectors = {
    contacts: ".contact-list",
    education: ".education-list",
    skills: ".skills-list",
    languages: ".languages-list",
    certifications: ".certification-list"
  };
  const isHtml = dataKey === "education";
  const ul = document.querySelector(selectors[dataKey]);
  if (!ul) return;
  ul.innerHTML = "";
  data[dataKey].forEach((item, index) => {
    ul.appendChild(createListItem(item, dataKey, index, isHtml));
  });
}

function handleEditableText({ elementId, dataKey, isLink = false }) {
  const wrapper = document.getElementById(elementId + "-wrapper");
  const display = document.getElementById(elementId);
  const editBtn = document.getElementById("edit-" + dataKey);
  const deleteBtn = document.getElementById("delete-" + dataKey);

  editBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = isLink ? data[dataKey] : display.textContent;
    input.style.width = "80%";
    wrapper.insertBefore(input, editBtn);
    display.style.display = "none";
    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = input.value.trim();
        if (!val) return alert("Dəyər boş ola bilməz!");
        data[dataKey] = val;
        if (isLink) {
          display.href = val;
          display.textContent = val.replace(/^https?:\/\//, "");
        } else {
          display.textContent = val;
        }
        wrapper.removeChild(input);
        display.style.display = "";
      } else if (e.key === "Escape") {
        wrapper.removeChild(input);
        display.style.display = "";
      }
    });

    input.addEventListener("blur", () => {
      if (wrapper.contains(input)) {
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      }
    });
  });

  deleteBtn.addEventListener("click", () => {
    if (confirm("Bunu silmək istədiyinizə əminsiniz?")) {
      data[dataKey] = isLink ? "" : "Deleted";
      display.textContent = isLink ? "" : "Deleted";
      if (isLink) display.href = "#";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  ["contacts", "education", "skills", "languages", "certifications"].forEach(refreshList);

  document.getElementById("profile-text").textContent = data.profileText;
  const thmLink = document.getElementById("thm-link");
  thmLink.href = data.thmLink;
  thmLink.textContent = data.thmLink.replace(/^https?:\/\//, "");

  handleEditableText({ elementId: "profile-text", dataKey: "profileText" });
  handleEditableText({ elementId: "thm-link", dataKey: "thmLink", isLink: true });

  const inputs = [
    { inputId: "addContact", dataKey: "contacts" },
    { inputId: "addEducation", dataKey: "education" },
    { inputId: "addSkill", dataKey: "skills" },
    { inputId: "addLang", dataKey: "languages" },
    { inputId: "addCertification", dataKey: "certifications" }
  ];

  inputs.forEach(({ inputId, dataKey }) => {
    const input = document.getElementById(inputId);
    input?.addEventListener("keydown", e => {
      if (e.key === "Enter" && input.value.trim()) {
        data[dataKey].push(input.value.trim());
        refreshList(dataKey);
        input.value = "";
      }
    });
  });

  document.querySelectorAll(".left-header").forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      if (content?.classList.contains("section-content")) {
        content.classList.toggle("active");
      }
    });
  });
});
