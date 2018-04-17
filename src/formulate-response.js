var moment = require('moment-timezone');

/**
 * Formualtes a response based on a bathroom_obj. If the bathroom is opened,
 * the user will be informed of when it was last closed. Vice versa also true.
 * @param  {[JSON]} bathroom_obj JSON (look at sample-bathroom.json for reference)
 * @return {[String]}            Returns a string of the response that the Google device shoudld say to the user
 */
module.exports = function(bathroom_obj) {
  if (bathroom_obj.is_bathroom_door_closed) {
    var last_open =  moment(bathroom_obj.last_time_door_was_open, "YYYY-MM-DD HH:mm:ss").tz('America/New_York').fromNow();
    return "Sorry, it's been closed since " + last_open +".";
  } else {
    var last_closed =  moment(bathroom_obj.last_time_door_was_closed, "YYYY-MM-DD HH:mm:ss").tz('America/New_York').fromNow();
    return "It's open! And it's been open since " +last_closed  +".";
  }
}
