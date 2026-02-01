let cases = JSON.parse(localStorage.getItem("cases")) || [];

function addCase() {
    let newCase = {
        id: caseId.value,
        crime: crimeType.value.toLowerCase(),
        location: location.value.toLowerCase(),
        evidence: evidence.value,
        time: new Date().toLocaleString()
    };

    cases.push(newCase);
    localStorage.setItem("cases", JSON.stringify(cases));
    displayCases(cases);
    updateStats();
    clearInputs();
}

function displayCases(data) {
    caseList.innerHTML = "";
    data.forEach((c, index) => {
        caseList.innerHTML += `
        <div class="case">
            <b>Case:</b> ${c.id}<br>
            <b>Crime:</b> ${c.crime}<br>
            <b>Location:</b> ${c.location}<br>
            <b>Evidence:</b> ${c.evidence}<br>
            <small>${c.time}</small>
            <button onclick="deleteCase(${index})">Delete</button>
        </div>`;
    });
}

function deleteCase(index) {
    cases.splice(index, 1);
    localStorage.setItem("cases", JSON.stringify(cases));
    displayCases(cases);
    updateStats();
}

function searchCases() {
    let query = search.value.toLowerCase();
    let filtered = cases.filter(c =>
        c.crime.includes(query) || c.location.includes(query)
    );
    displayCases(filtered);
}

function updateStats() {
    let crimeCount = {};
    cases.forEach(c => {
        crimeCount[c.crime] = (crimeCount[c.crime] || 0) + 1;
    });

    let pattern = Object.entries(crimeCount)
        .filter(c => c[1] > 1)
        .map(c => `${c[0]} (${c[1]})`)
        .join(", ");

    stats.innerText = pattern
        ? `⚠️ Repeated Crimes Detected: ${pattern}`
        : "✅ No crime patterns detected";
}

function clearInputs() {
    caseId.value = "";
    crimeType.value = "";
    location.value = "";
    evidence.value = "";
}

displayCases(cases);
updateStats();
