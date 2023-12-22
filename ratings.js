import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import OptionsComponent, { highestScores } from './options';
import { actions } from './options';

function Rating() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [maxPossibleScore, setMaxPossibleScore] = useState(0);
  const [letterGrade, setLetterGrade] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [showExportButton, setShowExportButton] = useState(false);
  const [showUserInputs, setShowUserInputs] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleOptionChange = (category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: parseInt(value, 10),
    }));
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setUserEmail(email);

    // Email format validation using a simple regular expression
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsValidEmail(emailPattern.test(email));
  };

  const calculateTotalScore = () => {
    let score = 0;
    let maxScore = 0;

    for (let key in highestScores) {
      const selectedValue = selectedOptions[key];
      if (selectedValue !== 0) {
        maxScore += highestScores[key];
      }
      if (selectedValue !== undefined) {
        score += selectedValue;
      }
    }

    const gradePercentage = (score / maxScore) * 100;
    let grade = 'N';
    if (gradePercentage >= 90) {
      grade = 'S';
    } else if (gradePercentage >= 80) {
      grade = 'C';
    } else if (gradePercentage >= 70) {
      grade = 'O';
    } else if (gradePercentage >= 60) {
      grade = 'R';
    }

    setTotalScore(score);
    setMaxPossibleScore(maxScore);
    setLetterGrade(grade);
    setShowExportButton(true);
    setShowUserInputs(true);
  };

  const exportToExcel = () => {
    // Check if both Name and Email are valid and not blank
    if (userName.trim() === '' || userEmail.trim() === '' || !isValidEmail) {
      // Display a system pop-up window alert
      window.alert('Please enter a valid email address and provide your name.');
      return; // Do not proceed with exporting
    }

    // Generate data for each selected option
    const optionRows = Object.entries(selectedOptions)
      .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
      .map(([category, points]) => {
        const actionDetail =
          actions[category]?.find((a) => a.points === points)?.text || 'Not Applicable';
        return [category, actionDetail, points];
      });

    // Sort rows by the category (PD number)
    optionRows.sort((a, b) => a[0].localeCompare(b[0]));

    const totalScoreRow = ['Total Score', totalScore, ''];
    const maxPossibleScoreRow = ['Max Possible Score', maxPossibleScore, ''];
    const gradeRow = ['Letter Grade', letterGrade, ''];

    // Prepare user details rows
    const userDetailsRows = [['Name', userName, ''], ['Email', userEmail, '']];
    
    const ws_data = [
      ...userDetailsRows,
      [],
      ['Category', 'Detail', 'Points'],
      ...optionRows,
      [],
      totalScoreRow,
      maxPossibleScoreRow,
      gradeRow,
    ];

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Results');

    XLSX.writeFile(wb, 'SCORN_Results.xlsx');
  };

  const resetApplication = () => {
    setSelectedOptions({});
    setTotalScore(0);
    setMaxPossibleScore(0);
    setLetterGrade('');
    setResetKey((prev) => prev + 1);
    window.scrollTo(0, 0);
    setShowExportButton(false);
    setShowUserInputs(false);
  };

  return (
    <div>
      <form id="calcForm" onSubmit={(event) => event.preventDefault()}>
        <h1>Project Development Scorecards</h1>
        <OptionsComponent key={resetKey} onOptionChange={handleOptionChange} />
      </form>
      <hr></hr>
      <button onClick={calculateTotalScore}>Calculate Score</button>
      <button onClick={resetApplication}>Start Again</button>
      <p>Total Score: {totalScore} / {maxPossibleScore}</p>
      <p>Letter Grade: {letterGrade}</p>

      {/* User Input Fields */}
      {showUserInputs && (
        <div className="user-input-row">
          <div className="user-input">
            <label>Name: </label>
            <input type="text" value={userName} onChange={handleNameChange} />
          </div>
          <div className="user-input">
            <label>Email: </label>
            <input type="text" value={userEmail} onChange={handleEmailChange} />
          </div>
        </div>
      )}

      {/* Export Button */}
      {showExportButton && (
        <button onClick={exportToExcel}>Export Result</button>
      )}
    </div>
  );
}

export default Rating;
