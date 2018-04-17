// Bathroom status
// Amal Nazeem
// A Google Cloud HTTP function to figure out bathroom status through
// Documentation found on https://cloud.google.com/functions/docs/writing/http

var request = require('request');
const formulate_response = require('./src/formulate-response');

const base_action_response = require('./src/base-action-response.json')
const CONFIG = require('./config.json')
/**
 * Responds to HTTP requests for the bathroom_status apps
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.bathroom_status = (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.append("Google-Assistant-API-Version", "v1")

	request(CONFIG.bathroom_door_status_url, function(error, response, body) {
		var this_response = base_action_response;
		base_action_response.final_response.speech_response.text_to_speech = this_response;
    res.status(200).end()
  })

	if (req.body.conversation.type == '1') {
		var this_response = action_response
		this_response.expected_inputs[0].input_prompt.initial_prompts[0].text_to_speech = _.sample(greetings) + ' ' + _.sample(doors) + ' ' + _.sample(rooms) + ' ' + _.sample(objects) + '. ' + _.sample(pickDoor)
		res.json(this_response)

	} else if (userInput.match(/stop/i)) {
		res.json(action_final_response)

	} else if (userInput.match(/((first|second|third)\s*(door|one)?|((door|door number|number)\s)?([123]|one|two|three))/i)) {
		var this_response = action_response
		this_response.expected_inputs[0].input_prompt.initial_prompts[0].text_to_speech = _.sample(doors) + ' ' + _.sample(rooms) + ' ' + _.sample(objects) + '. ' + _.sample(pickDoor)
		res.json(this_response)

	} else {
		var this_response = action_response
		this_response.expected_inputs[0].input_prompt.initial_prompts[0].text_to_speech = _.sample(nomatch)
		res.json(this_response)
	}

}
