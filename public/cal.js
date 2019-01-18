let cal = (gradeNum, result) => {
	let totalCredits = 0;
	let marks = 0;
	for(sub in result){
		totalCredits = totalCredits + Number(result[sub][4]);
		marks = marks + (gradeNum[result[sub][3]] * result[sub][4])
	}
	return (marks/totalCredits).toFixed(2);
}

module.exports = cal;