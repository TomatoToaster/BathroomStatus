// Bathroom status
// Amal Nazeem
// A Google Cloud HTTP function to figure out bathroom status
// Documentation found on https://cloud.google.com/functions/docs/writing/http

var request = require('request');

const formulate_response = require('./src/formulate-response');
const log_error = require('./src/log-error');

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
		let this_response = base_action_response;

		if (error || response.statusCode != 200) {
			this_response.final_response.speech_response.text_to_speech = CONFIG.ERROR_MESSAGE;
			log_error(error, response);
		}
		else {
			this_response.final_response.speech_response.text_to_speech = formulate_response(JSON.parse(body));
		}

		res.json(this_response)
		res.status(200).end()
  });
}
