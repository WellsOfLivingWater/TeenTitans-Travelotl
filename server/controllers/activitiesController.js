const OpenAI = require('openai');

const createErr = require('../utils/createErr');

const activitiesController = {};

const ai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
const aiSystem = {
  role: 'system',
  content: 'You are a helpful travel planning assistant.',
};
const prompt = `Generate an array of 20 random categories of activities for a trip itinerary. Output the response in json format following this schema:
// [
//   activity<string>
// ]`;
const aiUser = {
  role: 'user',
  content: prompt
};
const messages = [aiSystem, aiUser];

const model = 'gpt-3.5-turbo-0125';
const response_format = { type: 'json_object' };
const aiConfig = { messages, model, response_format };

activitiesController.getActivities = async (req, res, next) => {
  try {
    console.log('activitiesController.getActivities invoked')
    const response = await ai.chat.completions.create(aiConfig);
    res.locals.activities = JSON.parse(response.choices[0].message.content);
    return next();
  } catch (err) {
    return next(createErr({
      method: 'activitiesController.getActivities',
      type: 'activities generation',
      err
    }))
  }
};

activitiesController.getMoreActivities = async (req, res, next) => {
  try {
    console.log('req.body ===>', req.body)
    const rePrompt = `Generate an array of 20 random categories of activities for a trip itinerary. Don't include any of these: ${req.body.activities.join(', ')}. Output the response in json format following this schema:
// [
//   activity<string>
// ]`;
    const auUser2 = {
      role: 'user',
      content: rePrompt
    };
    const messages2 = [aiSystem, auUser2];
    const aiConfig2 = { messages: messages2, model, response_format };
    console.log('activitiesController.getMoreActivities invoked')
    const response = await ai.chat.completions.create(aiConfig2);
    res.locals.activities = JSON.parse(response.choices[0].message.content);
    return next();
  } catch (err) {
    return next(createErr({
      method: 'activitiesController.getMoreActivities',
      type: 'activities generation',
      err
    }))
  }
}

module.exports = activitiesController;