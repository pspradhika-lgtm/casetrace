let cases = JSON.parse(localStorage.getItem("cases")) || [];

function addCase() {
    let newCase = {
        id: caseId.value,
        crime: crimeType.value,
        location: location.value,
        evidence: evidence.value,
        time: new Date().toLocaleString()
    };

    cases.push(newCase);
    localStorage.setItem("cases", JSON.stringify(cases));
    displayCases();
    clearInputs();
}

function displayCases() {
    caseList.innerHTML = "";
    cases.forEach(c => {
        caseList.innerHTML += `
            <div class="case">
                <strong>Case:</strong> ${c.id}<br>
                <strong>Crime:</strong> ${c.crime}<br>
                <strong>Location:</strong> ${c.location}<br>
                <strong>Evidence:</strong> ${c.evidence}<br>
                <small>${c.time}</small>
            </div>
        `;
    });
}

function clearInputs() {
    caseId.value = "";
    crimeType.value = "";
    location.value = "";
    evidence.value = "";
}

displayCases();
