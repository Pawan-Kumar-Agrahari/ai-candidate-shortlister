exports.calculateMatchScore = (candidate, requirements) => {
  const { requiredSkills = [], preferredSkills = [], minExperience = 0 } = requirements;
  
  let score = 0;
  const matchedSkills = [];
  const missingSkills = [];

  // Required skills weight: 60%
  if (requiredSkills.length > 0) {
    let reqMatchCount = 0;
    requiredSkills.forEach(skill => {
      const isMatched = candidate.skills.some(cSkill => 
        cSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(cSkill.toLowerCase())
      );
      if (isMatched) {
        reqMatchCount++;
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });
    score += (reqMatchCount / requiredSkills.length) * 60;
  } else {
    score += 60; // If no required skills specified
  }

  // Preferred skills weight: 20%
  if (preferredSkills.length > 0) {
    let prefMatchCount = 0;
    preferredSkills.forEach(skill => {
      const isMatched = candidate.skills.some(cSkill => 
        cSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(cSkill.toLowerCase())
      );
      if (isMatched) {
        prefMatchCount++;
        matchedSkills.push(skill);
      }
    });
    score += (prefMatchCount / preferredSkills.length) * 20;
  } else {
    score += 20;
  }

  // Experience weight: 20%
  if (minExperience > 0) {
    if (candidate.experience >= minExperience) {
      score += 20;
    } else {
      score += (candidate.experience / minExperience) * 20;
    }
  } else {
    score += 20;
  }

  const finalScore = Math.round(score);
  
  let ranking = 'Low Match';
  if (finalScore >= 80) ranking = 'High Match';
  else if (finalScore >= 50) ranking = 'Medium Match';

  return {
    matchScore: finalScore,
    matchedSkills: [...new Set(matchedSkills)],
    missingSkills: [...new Set(missingSkills)],
    ranking
  };
};
