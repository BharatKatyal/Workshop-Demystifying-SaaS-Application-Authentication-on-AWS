{"changed":true,"filter":false,"title":"index.js","tooltip":"/amazon-cognito-example-for-external-idp/authorizer/index.js","value":"const jwt_decode = require(\"jwt-decode\");\n\nexports.handler = function (event, context, callback) {\n  var token = event.authorizationToken;\n  var parsed = jwt_decode(token);\n\n  // Check if the user is a pet-app-admin\n  if (parsed[\"cognito:groups\"] && parsed[\"cognito:groups\"].includes(\"pet-app-admins\")) {\n    console.log(\"Authorized as a pet-app-admin\");\n    callback(null, generatePolicy(\"user\", \"Allow\", event.methodArn, true, parsed[\"custom:tenant_id\"]));\n  }\n  // Check if the user is a pet-app-user for tenant1\n  else if (\n    parsed[\"cognito:groups\"] &&\n    parsed[\"cognito:groups\"].includes(\"pet-app-users\") &&\n    parsed[\"custom:tenant_id\"] === \"tenant1\"\n  ) {\n    var tenantId = parsed[\"custom:tenant_id\"];\n    console.log(\"Authorized as a pet-app-user for tenant1\");\n    callback(null, generatePolicy(\"user\", \"Allow\", event.methodArn, true, tenantId));\n  }\n  // Unauthorized user - not a member of \"pet-app-users\"\n  else if (!(parsed[\"cognito:groups\"] && parsed[\"cognito:groups\"].includes(\"pet-app-users\"))) {\n    var unauthorizedReason = \"Unauthorized: User is not a member of pet-app-users group.\";\n    console.log(unauthorizedReason);\n    callback(\"Unauthorized\"); // Return a 401 Unauthorized response\n  }\n  // Unauthorized user - not a member of \"tenant1\"\n  else if (parsed[\"cognito:groups\"].includes(\"pet-app-users\") && parsed[\"custom:tenant_id\"] !== \"tenant1\") {\n    var unauthorizedReason = \"Unauthorized: User does not belong to tenant1.\";\n    console.log(unauthorizedReason);\n    callback(\"Unauthorized\"); // Return a 401 Unauthorized response\n  }\n};\n\n\n// Help function to generate an IAM policy\nvar generatePolicy = function (principalId, effect, resource, authorized, tenantId) {\n  var authResponse = {};\n\n  authResponse.principalId = principalId;\n  if (effect && resource) {\n    var policyDocument = {};\n    policyDocument.Version = \"2012-10-17\";\n    policyDocument.Statement = [];\n    var statementOne = {};\n    statementOne.Action = \"execute-api:Invoke\";\n    statementOne.Effect = effect;\n    statementOne.Resource = resource;\n    policyDocument.Statement[0] = statementOne;\n    authResponse.policyDocument = policyDocument;\n  }\n\n  // Include authorization status and tenant ID in the context\n  authResponse.context = {\n    authorizationStatus: authorized ? \"Authorized\" : \"Unauthorized\",\n    tenantId: tenantId\n  };\n  return authResponse;\n};\n\n\n","undoManager":{"mark":0,"position":4,"stack":[[{"start":{"row":0,"column":0},"end":{"row":61,"column":0},"action":"insert","lines":["const jwt_decode = require(\"jwt-decode\");","","exports.handler = function (event, context, callback) {","  var token = event.authorizationToken;","  var parsed = jwt_decode(token);","","  // Check if the user is a pet-app-admin","  if (parsed[\"cognito:groups\"] && parsed[\"cognito:groups\"].includes(\"pet-app-admins\")) {","    console.log(\"Authorized as a pet-app-admin\");","    callback(null, generatePolicy(\"user\", \"Allow\", event.methodArn, true, parsed[\"custom:tenant_id\"]));","  }","  // Check if the user is a pet-app-user for tenant1","  else if (","    parsed[\"cognito:groups\"] &&","    parsed[\"cognito:groups\"].includes(\"pet-app-users\") &&","    parsed[\"custom:tenant_id\"] === \"tenant1\"","  ) {","    var tenantId = parsed[\"custom:tenant_id\"];","    console.log(\"Authorized as a pet-app-user for tenant1\");","    callback(null, generatePolicy(\"user\", \"Allow\", event.methodArn, true, tenantId));","  }","  // Unauthorized user - not a member of \"pet-app-users\"","  else if (!(parsed[\"cognito:groups\"] && parsed[\"cognito:groups\"].includes(\"pet-app-users\"))) {","    var unauthorizedReason = \"Unauthorized: User is not a member of pet-app-users group.\";","    console.log(unauthorizedReason);","    callback(\"Unauthorized\"); // Return a 401 Unauthorized response","  }","  // Unauthorized user - not a member of \"tenant1\"","  else if (parsed[\"cognito:groups\"].includes(\"pet-app-users\") && parsed[\"custom:tenant_id\"] !== \"tenant1\") {","    var unauthorizedReason = \"Unauthorized: User does not belong to tenant1.\";","    console.log(unauthorizedReason);","    callback(\"Unauthorized\"); // Return a 401 Unauthorized response","  }","};","","","// Help function to generate an IAM policy","var generatePolicy = function (principalId, effect, resource, authorized, tenantId) {","  var authResponse = {};","","  authResponse.principalId = principalId;","  if (effect && resource) {","    var policyDocument = {};","    policyDocument.Version = \"2012-10-17\";","    policyDocument.Statement = [];","    var statementOne = {};","    statementOne.Action = \"execute-api:Invoke\";","    statementOne.Effect = effect;","    statementOne.Resource = resource;","    policyDocument.Statement[0] = statementOne;","    authResponse.policyDocument = policyDocument;","  }","","  // Include authorization status and tenant ID in the context","  authResponse.context = {","    authorizationStatus: authorized ? \"Authorized\" : \"Unauthorized\",","    tenantId: tenantId","  };","  return authResponse;","};","",""],"id":1}],[{"start":{"row":61,"column":0},"end":{"row":63,"column":0},"action":"insert","lines":["aws lambda create-function --role \"arn:aws:iam::123456789:role/my-iam-role\" --zip-file fileb://auth.zip --function-name LambdaAuthorizer --runtime nodejs14.x --handler index.handler","",""],"id":3}],[{"start":{"row":61,"column":38},"end":{"row":61,"column":74},"action":"remove","lines":[":aws:iam::123456789:role/my-iam-role"],"id":4},{"start":{"row":61,"column":37},"end":{"row":61,"column":38},"action":"remove","lines":["n"]},{"start":{"row":61,"column":36},"end":{"row":61,"column":37},"action":"remove","lines":["r"]},{"start":{"row":61,"column":35},"end":{"row":61,"column":36},"action":"remove","lines":["a"]}],[{"start":{"row":61,"column":35},"end":{"row":61,"column":108},"action":"insert","lines":["arn:aws:iam::959328062626:role/AuthenticationAWS-TenantRole-15HGCP61PHXXC"],"id":5}],[{"start":{"row":61,"column":0},"end":{"row":62,"column":0},"action":"remove","lines":["aws lambda create-function --role \"arn:aws:iam::959328062626:role/AuthenticationAWS-TenantRole-15HGCP61PHXXC\" --zip-file fileb://auth.zip --function-name LambdaAuthorizer --runtime nodejs14.x --handler index.handler",""],"id":6}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":61,"column":0},"end":{"row":61,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":28,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1696060855335}