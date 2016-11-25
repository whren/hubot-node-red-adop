/**
 * Description:
 *  List ec2 instances info
 *  Show detail about an instance if specified an instance id
 *  Filter ec2 instances info if specified an instance name
 *
 * Commands:
 *  hubot ec2 ls - Displays Instances
 *
 * Notes:
 *  --instance_id=***     : [optional] The id of an instance. If omit it, returns info about all instances.
 *  --instance_filter=*** : [optional] The name to be used for filtering return values by an instance name.
 */
//var moment = require('moments
//var tsv = require('tsv');

var cmd_char = process.env.HUBOT_COMMAND_CHAR || "\!";
var get_arg_params;
var base_id = "hubot-node-red-adop.node-red-adop-";
var command_name = "adop";

var actions = {
  generate: {
    name: "generate",
    regexp: "( \-\-[^ ]+)*( [^\- ]+)?( [^\- ]+)?$",
//
// Use function to allow use of this.properties
//
//    help: function() {
//      return this.name + " [options] <parent_project_name> <project_name_to_generate>";
//    },
    help: "[options] <parent_project_name> <project_name_to_generate>",
    method: "POST",
    arg_params: "msg.match[1]",
    required_params: [
      "msg.match[2]",
      "msg.match[3]"
    ],
//    api_url: "\"/job/\" + msg.match[2].trim() + \"/job/Project_Management/job/Generate_Project/buildWithParameters?PROJECT_NAME=\" + msg.match[3].trim()",
    api_url: "\"/job/\" + msg.match[2].trim() + \"/job/trigger-project-jhipster/buildWithParameters?PROJECT_NAME=\" + msg.match[3].trim()",
    request_message: "\"Requesting project \" + msg.match[3].trim() + \" generation for \" + msg.match[2].trim() + \"...\"",
    response_callback: function(err, res, body, msg, arg_params) {
      var msg_txt = "";
      var output = arg_params.output;

      if (output) {
        msg_txt += "Returned code : " + res.statusCode + ", body : " + body;
      } else {
        msg_txt += "Done";
      }

      msg.send(msg_txt);
    }
  },
  destroy: {
    name: "destroy",
    regexp: "( \-\-[^ ]+)*( [^\- ]+)?( [^\- ]+)?$",
    help: "[options] <parent_project_name> <project_name_to_destroy>",
    method: "POST",
    arg_params: "msg.match[1]",
    required_params: [
      "msg.match[2]",
      "msg.match[3]"
    ],
    api_url: "\"/job/\" + msg.match[2].trim() + \"/job/trigger-project-destroy/buildWithParameters?PROJECT_NAME=\" + msg.match[3].trim()",
    request_message: "\"Requesting project \" + msg.match[3].trim() + \" destruction for \" + msg.match[2].trim() + \"...\"",
    response_callback: function(err, res, body, msg, arg_params) {
      var msg_txt = "";
      var output = arg_params.output;

      if (output) {
        msg_txt += "Returned code : " + res.statusCode + ", body : " + body;
      } else {
        msg_txt += "Done";
      }

      msg.send(msg_txt);
    }
  },
  list: {
    name: "list",
    regexp: "( \-\-[^ ]+)*( [^\-].+)?$",
    help: "[options] <parent_project_name>",
    method: "POST",
    api_url: "\"/job/\" + msg.match[2].trim() + \"/api/json?pretty=true\"",
    arg_params: "msg.match[1]",
    required_params: [
      "msg.match[2]"
    ],
    request_message: "\"Requesting projects list for \" + msg.match[2].trim() + \"...\"",
    response_callback: function(err, res, body, msg, arg_params) {
      var msg_txt = "";

      try {
        var json_parsed_body = JSON.parse(body);
      
        msg_txt += json_parsed_body.url + "\n";
      
        for (var i = 0; i < json_parsed_body.jobs.length; i++) {
          msg_txt += (i+1) + " - " + json_parsed_body.jobs[i].name + " - " + json_parsed_body.jobs[i].url + "\n";
        }
      } catch(error) {
        robot.logger.error("Error parsing request response body as JSON : " + error);
        msg_txt += "Error during parsing of response body...";
      }
      
      msg.send(msg_txt);
    }
  },
  delete: {
    name: "delete",
    regexp: "( \-\-[^ ]+)*( [^\- ]+)?( [^\- ]+)?$",
    help: "[options] <parent_project_name> <project_name>",
    method: "POST",
    api_url: "\"/job/\" + msg.match[2].trim() + \"/job/\" + msg.match[3].trim() + \"/doDelete\"",
    arg_params: "msg.match[1]",
    required_params: [
      "msg.match[2]",
      "msg.match[3]"
    ],
    request_message: "\"Requesting project deletion of \" + msg.match[3].trim() + \" for \" + msg.match[2].trim() + \"...\"",
    response_callback: function(err, res, body, msg, arg_params) {
      var msg_txt = "";
      var output = arg_params.output;

      if (output) {
        msg_txt += "Returned code : " + res.statusCode + ", body : " + body;
      } else {
        msg_txt += "Done";
      }

      msg.send(msg_txt);
    }
  },
  enable: {
    name: "enable",
    regexp: "( \-\-[^ ]+)*( [^\- ]+)?( [^\- ]+)?$",
    help: "[options] <parent_project_name> <project_name>",
    method: "POST",
    api_url: "\"/job/\" + msg.match[2].trim() + \"/job/\" + msg.match[3].trim() + \"/enable\"",
    arg_params: "msg.match[1]",
    required_params: [
      "msg.match[2]",
      "msg.match[3]"
    ],
    request_message: "\"Requesting project activation of \" + msg.match[3].trim() + \" for \" + msg.match[2].trim() + \"...\"",
    response_callback: function(err, res, body, msg, arg_params) {
      var msg_txt = "";
      var output = arg_params.output;

      if (output) {
        msg_txt += "Returned code : " + res.statusCode + ", body : " + body;
      } else {
        msg_txt += "Done";
      }

      msg.send(msg_txt);
    }
  },
  disable: {
    name: "disable",
    regexp: "( \-\-[^ ]+)*( [^\- ]+)?( [^\- ]+)?$",
    help: "[options] <parent_project_name> <project_name>",
    method: "POST",
    api_url: "\"/job/\" + msg.match[2].trim() + \"/job/\" + msg.match[3].trim() + \"/disable\"",
    arg_params: "msg.match[1]",
    required_params: [
      "msg.match[2]",
      "msg.match[3]"
    ],
    request_message: "\"Requesting project deactivation of \" + msg.match[3].trim() + \" for \" + msg.match[2].trim() + \"...\"",
    response_callback: function(err, res, body, msg, arg_params) {
      var msg_txt = "";
      var output = arg_params.output;

      if (output) {
        msg_txt += "Returned code : " + res.statusCode + ", body : " + body;
      } else {
        msg_txt += "Done";
      }

      msg.send(msg_txt);
    }
  }
};

function get_arg_params(arg) {
  var headers_capture, output_capture, headers, output;

  headers_capture = /--headers=(.*?)( |$)/.exec(arg);
  headers = headers_capture ? headers_capture[1] : '';

  output_capture = /--output( |$)/.exec(arg);
  output = output_capture ? true : false;

  return {
    headers: headers,
    output: output
  };
};


/*
prepare_request = function(robot, args, url_param) {
  var arg_params, url, adop_host, adop_username, adop_password, payload, headers, output;
  url = process.env.HUBOT_NODE_RED_ENDPOINT_URL;
  adop_url = process.env.HUBOT_ADOP_URL;
  adop_username = process.env.HUBOT_ADOP_USERNAME;
  adop_password = process.env.HUBOT_ADOP_PASSWORD;

  if (!url) {
    // Error url is required
    robot.logger.error("HUBOT_NODE_RED_ENDPOINT_URL parameter is not defined at environment level");
  }

  if (!adop_url) {
    robot.logger.error("HUBOT_ADOP_URL parameter is not defined at environment level");
  }

  if (!adop_username) {
    robot.logger.error("HUBOT_ADOP_USERNAME parameter is not defined at environment level");
  }

  if (!adop_password) {
    robot.logger.error("HUBOT_ADOP_PASSWORD parameter is not defined at environment level");
  }

  if (!url || !adop_url || !adop_username || !adop_password) {
    return;
  }

  payload = {
    action:"jenkins.init",
    method:"POST",
    url: adop_url + (url_param ? "/job/" + url_param + "/api/json?pretty=true" : "/api/json?pretty=true"),
    credential: adop_username + ":" + adop_password,
    headers: {
      "Content-Type":"application/json"
    }
  };

  arg_params = get_arg_params(args);
  
  return {
    url: url,
    payload: payload,
    arg_params: arg_params
  };
};
*/
function prepare_request(robot, msg, action) {
  var arg_params, url, adop_host, adop_username, adop_password, payload, headers, output;
  url = process.env.HUBOT_NODE_RED_ENDPOINT_URL;
  adop_url = process.env.HUBOT_ADOP_URL;
  adop_username = process.env.HUBOT_ADOP_USERNAME;
  adop_password = process.env.HUBOT_ADOP_PASSWORD;

  if (!url) {
    // Error url is required
    robot.logger.error("HUBOT_NODE_RED_ENDPOINT_URL parameter is not defined at environment level");
  }

  if (!adop_url) {
    robot.logger.error("HUBOT_ADOP_URL parameter is not defined at environment level");
  }

  if (!adop_username) {
    robot.logger.error("HUBOT_ADOP_USERNAME parameter is not defined at environment level");
  }

  if (!adop_password) {
    robot.logger.error("HUBOT_ADOP_PASSWORD parameter is not defined at environment level");
  }

  if (!url || !adop_url || !adop_username || !adop_password) {
    return;
  }

  for (var i =0; i < action.required_params.length; i++) {
    var required_param = action.required_params[i];
    
    if (!eval(required_param)) {
      msg.send(show_help(action) + "\n[options] can be :\n--headers : array of headers, in the form [key:value,...,key:value]\n--output : use verbose output");
      return;
    }
  }

  payload = {
    method:action.method,
    url: adop_url + eval(action.api_url),
    credential: adop_username + ":" + adop_password,
    headers: {
      "Content-Type":"application/json"
    }
  };

  arg_params = get_arg_params(eval(action.arg_params));
  
  return {
    url: url,
    payload: payload,
    arg_params: arg_params
  };
};

function show_help(action) {
  return "Usage : " + cmd_char + command_name + " " + action.name + " " + action.help;
}

//do_request = function(robot, action, method, url, username, password, payload, headers, callback) {
function do_request(robot, url, payload, headers, callback) {
  var results = {
    messages: []
  };

  
  var data = {};
  var http = robot.http(url);
  http.header('Accept', 'application/json');
  http.header('Content-Type', 'application/json');
  if (process.env.HUBOT_NODE_RED_USERNAME && process.env.HUBOT_NODE_RED_PASSWORD) {
    var auth = 'Basic ' + new Buffer(process.env.HUBOT_NODE_RED_USERNAME + ':' + process.env.HUBOT_NODE_RED_PASSWORD).toString('base64');
    http.header('Authorization', auth);
  }
  if (headers) {
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i].split(':');
      if (header.length === 2) {
        http = http.header(header[0], header[1]);
      }
    }
  }
//  if (action) {
//    data.action = action;
//  }
//  if (payload) {
//    data.payload = payload;
//  }
  if (process.env.HUBOT_NODE_RED_ENDPOINT_METHOD === 'POST') {
    http.post(payload)(callback);
  } else {
    results.messages.push("Only POST method supported at the moment !");
  }
};

function process_response(err, res, body, msg, arg_params) {
  var body_return;
  var output = arg_params.output;

  if (err) {
    msg.send("Encountered an error during request :( " + err);
  } else {
    var msg_txt = "";
    switch (res.statusCode) {
      case 200:
      case 201:
        if (output) {
          msg_txt += "Returned code : " + res.statusCode + ", body : " + body;
        }
        if (body) {
          body_return = body;
//          var json_parsed_body = JSON.parse(body);
//          msg_txt += json_parsed_body.url + "\n";
//          for (var i = 0; i < json_parsed_body.jobs.length; i++) {
//            msg_txt += (i+1) + " - " + json_parsed_body.jobs[i].name + " - " + json_parsed_body.jobs[i].url + "\n";
//          }
        }
        break;
      default:
        msg_txt += "Encountered an error (http status code : " + res.statusCode + ")";
        if (output) {
          msg_txt += ", body : " + body;
        }
    }
    msg.send(msg_txt);
  }

  return body_return;
};

function process_request(robot, action, msg) {
  var request, url, arg_params, payload, headers;

  request = prepare_request(robot, msg, action);

  if (request) {
    url = request.url;
    arg_params = request.arg_params;
    payload = JSON.stringify(request.payload);
    headers = arg_params.headers;

    if (action.request_message) {
      msg_txt = eval(action.request_message);
      msg.send(msg_txt);
    }

    do_request(robot, url, payload, headers, function(err, res, body) {
      var body = process_response(err, res, body, msg, arg_params);

      if (body) {
        action.response_callback(err, res, body, msg, arg_params);
      }
    });
  } else {
    // Error preparing request
  }
};


module.exports = function(robot) {
  var regx;
  var help_msg = "- ADOP commands -\n";
//  var negative_regx;

  for (var key in actions) {
    if (actions.hasOwnProperty(key)) {
      var action = actions[key];
      // Keep information for gobal help
      help_msg += action.name + "\n\t" + show_help(action) + "\n";
      regx = new RegExp("^@?(?:" + robot.name + "\\s+)?" + cmd_char + command_name + " " + action.name + action.regexp, "i");
//      negative_regx = (negative_regx ? negative_regx + "|" : "") + "(?!" + key + ")";

      robot.hear(regx, {
        id: base_id + action.name
      }, process_request.bind(this, robot, action));

      robot.logger.info(">>> ADOP command added : " + action.name);
      //robot.logger.debug(">>> " + key + " command composed of [regx : " + regx + ", id : " + action.id() + "]");
    }
  }

//  robot.logger.debug(">> Negative regx : " + negative_regx);

//  regx = new RegExp("^@?(?:" + robot.name + "\\s+)?" + cmd_char + "adop " + negative_regx + "$", 'i');
  regx = new RegExp("^@?(?:" + robot.name + "\\s+)?" + cmd_char + command_name + "( \-\-.+)*$", 'i');
  robot.hear(regx, {
    id: base_id + 'help'
  }, function(msg) {
    var msg_txt = help_msg;

    msg_txt += "\n[options] can be :\n--headers : array of headers, in the form [key:value,...,key:value]\n--output : use verbose output";
    msg.send(msg_txt);
  });

  robot.on('help:get', function(msg, command, action_id) {
    // a message is passed
    if (msg) {
      // there is a command specified
      if (command) {
        // command is this command name
        if (command.toUpperCase() == command_name.toUpperCase()) {
          if (action_id) {
            // for each actions
            for (var key in actions) {
              if (actions.hasOwnProperty(key)) {
                // action is is equal to current iteration key
                if (action_id.toUpperCase() === key.toUpperCase()) {
                // send help message
                msg.send(show_help(actions[key]) + "\n[options] can be :\n--output : use verbose output");
                  // stop
                  break;
                }
              }
            }
          } else {
            // output full current command help
            var msg_txt = help_msg;

            msg_txt += "\n[options] can be :\n--output : use verbose output";
            msg.send(msg_txt);            
          }
        }
      } else {
        // output full current command help
        var msg_txt = help_msg;

        msg_txt += "\n[options] can be :\n--output : use verbose output";
        msg.send(msg_txt);
      }
    }
  });

  robot.on('adop:query', function(msg, url, headers, payload, callback) {
//    var data = {};
    var http = robot.http(url);
    http.header('Accept', 'application/json');
    http.header('Content-Type', 'application/json');
    if (process.env.HUBOT_NODE_RED_USERNAME && process.env.HUBOT_NODE_RED_PASSWORD) {
      var auth = 'Basic ' + new Buffer(process.env.HUBOT_NODE_RED_USERNAME + ':' + process.env.HUBOT_NODE_RED_PASSWORD).toString('base64');
      http.header('Authorization', auth);
    }
    if (headers) {
      for (var i = 0; i < headers.length; i++) {
        var header = headers[i].split(':');
        if (header.length === 2) {
          http = http.header(header[0], header[1]);
        }
      }
    }
  //  if (action) {
  //    data.action = action;
  //  }
  //  if (payload) {
  //    data.payload = payload;
  //  }
    if (process.env.HUBOT_NODE_RED_ENDPOINT_METHOD === 'POST') {
      http.post(payload)(callback);
    } else {
      results.messages.push("Only POST method supported at the moment !");
    }
  });

/*
  var regx = new RegExp("^@?(?:" + robot.name + "\\s+)?" + cmd_char + "adop " + actions.list.regexp, "i");
  robot.hear(regx, {
    id: actions.list.id
  }, function(msg) {
    process_request(robot, msg, actions.list);
*/
/*
    var request, url, arg_params, payload;

    request = prepare_request(robot, msg, actions.list);
    url = request.url;
    arg_params = request.arg_params;
    payload = JSON.stringify(request.payload);

    if (actions.list.request_message) {
      msg_txt = eval(actions.list.request_message);
      msg.send(msg_txt);
    }

    do_request(robot, url, payload, headers, function(err, res, body) {
      var body = process_response(err, res, body, msg, arg_params);

      if (body) {
        var msg_txt;
        try {
          var json_parsed_body = JSON.parse(body);
          msg_txt += json_parsed_body.url + "\n";
          for (var i = 0; i < json_parsed_body.jobs.length; i++) {
            msg_txt += (i+1) + " - " + json_parsed_body.jobs[i].name + " - " + json_parsed_body.jobs[i].url + "\n";
          }
        catch(error) {
          robot.logger.error("Error parsing request response body as JSON : " + error);
          msg_txt += "Error during parsing of response body...";
        }
        msg.send(msg_txt);
      }
    });
*/
/*
  });
*/

/*
  var regx = new RegExp("^@?(?:" + robot.name + "\\s+)?" + cmd_char + "adop list_projects( \-\-.+)* ([^\-].+)$", 'i');
  robot.hear(regx, {
    id: 'hubot-node-red-adop.node-red-adop-list-projects'
  }, function(msg) {
    var arg_params, url, adop_host, adop_username, adop_password, payload, headers, output, request, msg_txt;
    request = prepare_request(robot, msg.match[1], msg.match[2]);

    url = request.url;
    arg_params = request.arg_params;
    payload = request.payload;
*/

/*
    url = process.env.HUBOT_NODE_RED_ENDPOINT_URL;
    adop_url = process.env.HUBOT_ADOP_URL;
    adop_username = process.env.HUBOT_ADOP_USERNAME;
    adop_password = process.env.HUBOT_ADOP_PASSWORD;

    if (!url) {
      // Error url is required
      robot.logger.error("HUBOT_NODE_RED_ENDPOINT_URL parameter is not defined at environment level");
    }

    if (!adop_url) {
      robot.logger.error("HUBOT_ADOP_URL parameter is not defined at environment level");
    }

    if (!adop_username) {
      robot.logger.error("HUBOT_ADOP_USERNAME parameter is not defined at environment level");
    }

    if (!adop_password) {
      robot.logger.error("HUBOT_ADOP_PASSWORD parameter is not defined at environment level");
    }

    if (!url || !adop_url || !adop_username || !adop_password) {
      return;
    }

    arg_params = get_arg_params(msg.match[1]);
    payload = {
      "action":"jenkins.init",
      "method":"POST",
      "url": adop_url + "/job/" + msg.match[2] + "/api/json?pretty=true",
      "credential": adop_username + ":" + adop_password,
      "headers": {
        "Content-Type":"application/json"
      }
    };
*/

/*
    payload = JSON.stringify(payload);

    msg_txt = "Requesting projects list for " + msg.match[2] + "...";
    msg.send(msg_txt);

    do_request(robot, url, payload, headers, function(err, res, body) {
      var body = process_response(err, res, body, msg, arg_params);

      if (body) {
        var json_parsed_body = JSON.parse(body);
        msg_txt += json_parsed_body.url + "\n";
        for (var i = 0; i < json_parsed_body.jobs.length; i++) {
          msg_txt += (i+1) + " - " + json_parsed_body.jobs[i].name + " - " + json_parsed_body.jobs[i].url + "\n";
        }
      }
    });
  });
*/
};
