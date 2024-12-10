let totalWaste = 0; // Toplam atık sayacı

// Form geçişi için fonksiyon
function toggleForm(formId) {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        form.style.display = 'none';
    });

    document.getElementById(formId).style.display = 'block';
}

// Okul Kaydı
document.getElementById('okulKayitForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const schoolProvince = document.getElementById('schoolProvince').value;
    const schoolDistrict = document.getElementById('schoolDistrict').value;
    const schoolName = document.getElementById('schoolName').value;
    const schoolPassword = document.getElementById('schoolPassword').value;

    // Okul verisini localStorage'a kaydet
    localStorage.setItem('schoolName', schoolName);
    localStorage.setItem('schoolPassword', schoolPassword);
    localStorage.setItem('schoolProvince', schoolProvince);
    localStorage.setItem('schoolDistrict', schoolDistrict);

    alert("Okul kaydınız başarıyla yapılmıştır.");
    toggleForm('okulKayitFormContainer'); // Formu gizle
});

// Öğrenci Kaydı
document.getElementById('ogrenciKayitForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const studentSurname = document.getElementById('studentSurname').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const studentNumber = document.getElementById('studentNumber').value;
    const studentPhone = document.getElementById('studentPhone').value;
    const studentClass = document.getElementById('studentClass').value;

    // Öğrenci verisini localStorage'a kaydet
    localStorage.setItem('studentName', studentName);
    localStorage.setItem('studentSurname', studentSurname);
    localStorage.setItem('studentEmail', studentEmail);
    localStorage.setItem('studentNumber', studentNumber);
    localStorage.setItem('studentPhone', studentPhone);
    localStorage.setItem('studentClass', studentClass);

    alert("Öğrenci kaydınız başarıyla yapılmıştır.");
    toggleForm('ogrenciKayitFormContainer'); // Formu gizle
});

// Veri Girişi
document.getElementById('dataEntryForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const studentNumberEntry = document.getElementById('studentNumberEntry').value;
    const wasteWeight = document.getElementById('wasteWeight').value;
    const wasteType = document.getElementById('wasteType').value;
    const enteredBy = document.getElementById('enteredBy').value;

    // Öğrenci numarasını doğrulama
    const storedStudentNumber = localStorage.getItem('studentNumber');
    if (studentNumberEntry !== storedStudentNumber) {
        alert("Öğrenci numaranız yanlış.");
        return;
    }

    // Atık verisini localStorage'a kaydet
    const wasteData = {
        wasteWeight: wasteWeight,
        wasteType: wasteType,
        enteredBy: enteredBy,
        date: new Date().toLocaleString()
    };

    let wasteHistory = JSON.parse(localStorage.getItem('wasteHistory')) || [];
    wasteHistory.push(wasteData);
    localStorage.setItem('wasteHistory', JSON.stringify(wasteHistory));

    // Toplam atığı güncelle
    totalWaste += parseFloat(wasteWeight);
    localStorage.setItem('totalWaste', totalWaste);

    alert("Veri girişi başarıyla tamamlandı.");
    toggleForm('dataEntryFormContainer'); // Formu gizle
});

// Veri Görüntüleme
document.getElementById('viewDataForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const viewStudentEmail = document.getElementById('viewStudentEmail').value;
    const viewStudentNumber = document.getElementById('viewStudentNumber').value;

    const storedEmail = localStorage.getItem('studentEmail');
    const storedNumber = localStorage.getItem('studentNumber');

    if (viewStudentEmail !== storedEmail || viewStudentNumber !== storedNumber) {
        alert("Öğrenci bilgileri hatalı.");
        return;
    }

    const wasteHistory = JSON.parse(localStorage.getItem('wasteHistory')) || [];
    const totalWaste = localStorage.getItem('totalWaste') || 0;
    const resultDiv = document.getElementById('viewResult');

    let resultHTML = `<p>Toplam Atık: ${totalWaste} kg</p>`;
    resultHTML += `<h3>Geçmiş Veri Girişleri:</h3>`;

    if (wasteHistory.length > 0) {
        resultHTML += `<ul>`;
        wasteHistory.forEach(entry => {
            resultHTML += `
                <li>
                    Atık Türü: ${entry.wasteType}, Miktar: ${entry.wasteWeight} kg, 
                    Giriş Yapan: ${entry.enteredBy}, Tarih: ${entry.date}
                </li>
            `;
        });
        resultHTML += `</ul>`;
    } else {
        resultHTML += `<p>Henüz veri girişi yapılmamış.</p>`;
    }

    resultDiv.innerHTML = resultHTML;
    toggleForm('viewDataFormContainer'); // Formu gizle
});
