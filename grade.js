// grade.js

function getGrade(score) {
  if (score === null || score === undefined) return null;
  if (score >= 90) return "A등급 - 우수";
  if (score >= 80) return "B등급 - 양호";
  if (score >= 70) return "C등급 - 보통";
  return "F등급 - 미달";
}

module.exports = { getGrade };