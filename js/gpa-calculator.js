document.getElementById('calc-btn').addEventListener('click', () => {
    const credits = document.querySelectorAll('.credit');
    const grades = document.querySelectorAll('.grade');
    
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < credits.length; i++) {
        let creditVal = parseFloat(credits[i].value);
        let gradeVal = parseFloat(grades[i].value);
        
        if (!isNaN(creditVal) && !isNaN(gradeVal)) {
            totalCredits += creditVal;
            totalPoints += (creditVal * gradeVal);
        }
    }

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0.00;
    document.getElementById('gpa-result').innerText = `Your GPA: ${gpa}`;
});
