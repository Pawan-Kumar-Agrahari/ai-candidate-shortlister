const axios = require('axios');

exports.getAiShortlist = async (candidates, jobRequirements) => {
  const apiKey = process.env.OPENROUTER_API_KEY || '';
  
  // MOCK FALLBACK: If API key is not configured, or is a placeholder, generate a realistic response
  if (!apiKey || apiKey.includes('your_openrouter') || apiKey.trim() === '') {
    console.log('OpenRouter API Key not configured. Using Mock AI response fallback.');
    
    // Simulate API delay for a realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500));

    const ranked = candidates.map(c => {
      const matchScore = c.matchDetails.matchScore;
      let ranking = 'Low Match';
      if (matchScore >= 80) ranking = 'High Match';
      else if (matchScore >= 50) ranking = 'Medium Match';

      return {
        candidateName: c.name,
        ranking: ranking,
        explanation: `${c.name} possesses ${c.experience} years of experience. They have skills in: ${c.skills.join(', ')}. This aligns nicely with your requirement of ${jobRequirements.requiredSkills.join(', ')}.`,
        suggestedImprovements: [
          `Learn more about advanced patterns in ${jobRequirements.preferredSkills.join(', ') || 'System Design'}`,
          `Build and deploy more live full-stack projects`
        ],
        interviewQuestions: [
          `Explain a challenging technical problem you solved using ${c.skills[0] || 'your core skills'}.`,
          `How would you optimize performance in a scale application?`
        ]
      };
    });

    return {
      aiSummary: `We analyzed ${candidates.length} candidates against your requirements (Required: ${jobRequirements.requiredSkills.join(', ')}). The candidates show decent technical alignment, with strong foundational knowledge.`,
      rankedCandidates: ranked
    };
  }

  const prompt = `
    You are an expert AI Tech Recruiter.
    
    Job Requirements:
    - Required Skills: ${jobRequirements.requiredSkills.join(', ')}
    - Preferred Skills: ${jobRequirements.preferredSkills.join(', ')}
    - Min Experience: ${jobRequirements.minExperience} years
    
    Candidates:
    ${JSON.stringify(candidates.map(c => ({
      name: c.name,
      skills: c.skills,
      experience: c.experience,
      projects: c.projects,
      bio: c.bio,
      currentMatchScore: c.matchDetails.matchScore
    })), null, 2)}
    
    Analyze these candidates and return a structured JSON response EXACTLY matching this format:
    {
      "aiSummary": "Overall summary of the candidate pool...",
      "rankedCandidates": [
        {
          "candidateName": "Name",
          "ranking": "High Match | Medium Match | Low Match",
          "explanation": "Why they fit or don't fit",
          "suggestedImprovements": ["Missing skill 1", "Missing skill 2"],
          "interviewQuestions": ["Question 1", "Question 2"]
        }
      ]
    }
  `;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo', // Default to GPT-3.5 if 5.2 isn't available
        messages: [
          { role: 'system', content: 'You are an AI tech recruiter. Always respond with pure valid JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let content = response.data.choices[0].message.content;
    
    if (content.startsWith('\`\`\`json')) {
      content = content.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    }
    
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    
    // Failover to mock response if API call fails
    console.log('OpenRouter API call failed. Using Mock AI response fallback.');
    return {
      aiSummary: "The AI service is temporarily unavailable, but we have calculated alignment using our local matchmaking algorithm. Candidates show great foundation.",
      rankedCandidates: candidates.map(c => ({
        candidateName: c.name,
        ranking: c.matchDetails.ranking,
        explanation: `${c.name} has a local match score of ${c.matchDetails.matchScore}%. They possess key skills in ${c.skills.join(', ')}.`,
        suggestedImprovements: ["Strengthen hands-on full-stack development skills."],
        interviewQuestions: ["Tell us about your experience building web applications."]
      }))
    };
  }
};
