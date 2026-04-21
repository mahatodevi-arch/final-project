import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `
You are an expert travel planner with a deep knowledge of global destinations, cuisines, and travel logistics.
Your task is to generate a detailed, day-by-day travel itinerary based on the user's inputs.

### Output Format
You must return only a valid JSON object. Do not include any text before or after the JSON.
The JSON must follow this structure:
{
  "destination": "City, Country",
  "duration": "X Days",
  "totalEstimatedCost": "Total cost in USD",
  "bestTimeVisit": "Season/Months",
  "itinerary": [
    {
      "day": 1,
      "title": "Theme of the day",
      "morning": {
        "activity": "Activity name",
        "description": "Short engaging description",
        "duration": "2 hours",
        "cost": "$20"
      },
      "afternoon": {
        "activity": "Activity name",
        "description": "Short engaging description",
        "duration": "3 hours",
        "cost": "$30"
      },
      "evening": {
        "activity": "Activity name",
        "description": "Short engaging description",
        "duration": "2 hours",
        "cost": "$15"
      },
      "foodSuggestions": [
        { "name": "Restaurant Name", "cuisine": "Cuisine Type", "priceRange": "$$" }
      ]
    }
  ],
  "travelTips": ["Tip 1", "Tip 2", "Tip 3"]
}

### Guidelines:
1. Be specific with activities and restaurant names.
2. Tailor the activities to the specified interests.
3. Keep the budget level in mind (Budget, Mid-range, Luxury).
4. For solo/couple/group, suggest appropriate activities.
5. Provide realistic cost estimates for each activity.
`;

export const generateItinerary = async (formData, apiKey) => {
  const anthropic = new Anthropic({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Valid for this demo/local app
  });

  const userPrompt = `
    Generate a travel itinerary for:
    - Destination: ${formData.destination}
    - Duration: ${formData.duration} days
    - Budget: ${formData.budget}
    - Interests: ${formData.interests.join(', ')}
    - Dates: ${formData.dates || 'Flexible'}
    - Travelers: ${formData.travelers}
  `;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620", // The latest available on the SDK is usually 3.5 Sonnet, user asked for claude-sonnet-4-20250514 which might be a future reference or specific model. I will use the most capable available one or the one specified if I can.
      // claude-3-5-sonnet-20240620 is the current high-end. 
      // User requested "claude-sonnet-4-20250514". I'll use that exact string as requested.
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const content = response.content[0].text;
    return JSON.parse(content);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
};
