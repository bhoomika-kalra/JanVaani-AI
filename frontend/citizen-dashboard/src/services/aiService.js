import apiClient from './apiClient';

// Helper to provide a fallback response
const withFallback = async (apiCall, fallbackData) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.warn("AI Backend failed, using fallback.", error);
    return fallbackData;
  }
};

export const aiService = {
  analyzeComplaintText: async (data) => {
    return withFallback(
      () => apiClient.post('/ai/analyze-complaint', data),
      {
        category: "Other",
        urgency: "Medium",
        priority: 50,
        department: "General Administration",
        confidence: 0.8,
        summary: "This is a fallback summary of the complaint.",
        suggestedTitle: "Fallback Suggested Title"
      }
    );
  },

  analyzeVoiceTranscript: async (data) => {
    return withFallback(
      () => apiClient.post('/ai/analyze-voice', data),
      { summary: "Fallback voice transcript summary." }
    );
  },

  analyzeImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return withFallback(
      () => apiClient.post('/ai/analyze-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),
      {
        primaryIssue: "Detected Issue (Fallback)",
        secondaryIssues: ["Potential hazard"],
        overallSeverity: "Medium",
        overallPriority: 50,
        departments: ["General"],
        detectedObjects: ["Object1"],
        aiSummary: "Fallback image analysis summary.",
        confidenceScores: { primaryIssue: 0.8 }
      }
    );
  },

  checkDuplicateComplaint: async (data) => {
    return withFallback(
      () => apiClient.post('/ai/check-duplicate', data),
      {
        isDuplicate: false,
        probability: 0.1,
        similarComplaints: []
      }
    );
  },

  calculatePriorityScore: async (data) => {
    return withFallback(
      () => apiClient.post('/ai/priority-score', data),
      {
        priority_score: 55,
        priority_label: "Medium",
        reasoning: "Fallback reasoning based on default metrics."
      }
    );
  },

  generateRecommendation: async (data) => {
    return withFallback(
      () => apiClient.post('/ai/recommend-project', data),
      {
        recommendedProject: "Fallback Recommendation",
        department: "General",
        estimatedImpact: "Moderate",
        estimatedTimeline: "3-6 months",
        budgetPriority: "Medium",
        reasoning: "Fallback recommendation reasoning."
      }
    );
  },

  generateExplainability: async (data) => {
    return withFallback(
      () => apiClient.post('/ai/explain', data),
      {
        priorityScore: 50,
        priorityLabel: "Medium",
        aiConfidence: "80%",
        mainReason: "Fallback main reason.",
        explanationBullets: ["Point 1", "Point 2"],
        supportingMetrics: { "Reports": 1 },
        recommendedAction: "Investigate further.",
        responsibleDepartment: "General Administration",
        riskLevel: "Low"
      }
    );
  },

  analyzeFeedback: async (data) => {
    return withFallback(
      () => apiClient.post('/ai/analyze-feedback', data),
      {
        sentiment: "Neutral",
        urgency: "Low",
        summary: "Fallback feedback summary.",
        should_reopen: false
      }
    );
  },

  getMPMorningBrief: async () => {
    return withFallback(
      () => apiClient.get('/ai/mp/morning-brief'),
      {
        mpName: "MP",
        constituency: "Constituency",
        bullets: ["Fallback brief 1", "Fallback brief 2"],
        estimatedImpact: "Medium",
        generatedTime: new Date().toISOString()
      }
    );
  },

  sendMPChatMessage: async (message, constituency) => {
    return withFallback(
      () => apiClient.post('/ai/mp/chat', { message, constituency }),
      { reply: "Fallback AI assistant response." }
    );
  }
};
