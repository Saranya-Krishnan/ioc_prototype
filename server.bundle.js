/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickFooterItem = undefined;

var _footer = __webpack_require__(31);

var FooterActionTypes = _interopRequireWildcard(_footer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var clickFooterItem = exports.clickFooterItem = function clickFooterItem() {
    return {
        type: FooterActionTypes.FOOTER_ITEM_CLICKED
    };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickMenuItem = undefined;

var _nav = __webpack_require__(16);

var NavActionTypes = _interopRequireWildcard(_nav);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var clickMenuItem = exports.clickMenuItem = function clickMenuItem(name) {
    return {
        type: NavActionTypes.NAV_ITEM_CLICKED,
        name: name
    };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer(props) {
    return _react2.default.createElement(
        _semanticUiReact.Segment,
        { vertical: true, className: "ioc-footer", inverted: true },
        _react2.default.createElement(
            _semanticUiReact.Container,
            { className: "center aligned" },
            _react2.default.createElement(_semanticUiReact.Image, { centered: true }),
            _react2.default.createElement(
                _semanticUiReact.List,
                { size: "small", link: true, divided: true, inverted: true },
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/profile', onClick: function onClick() {
                            return props.clickFooterItem('profile');
                        } },
                    'profile'
                )
            )
        )
    );
};

Footer.propTypes = {
    clickFooterItem: _propTypes2.default.func.isRequired
};

exports.default = Footer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nav = function Nav(props) {
    return _react2.default.createElement(
        _semanticUiReact.Container,
        { text: true },
        _react2.default.createElement(
            _semanticUiReact.Menu,
            { pointing: true, secondary: true },
            _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/', className: props.activeItem === 'home' ? 'active item' : 'item', onClick: function onClick() {
                        return props.clickMenuItem('home');
                    } },
                'home'
            ),
            !props.isLoggedIn && _react2.default.createElement(
                _semanticUiReact.Menu.Menu,
                { position: 'right' },
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/sign-in', className: props.activeItem === 'sign-in' ? 'active item' : 'item', onClick: function onClick() {
                            return props.clickMenuItem('sign-in');
                        } },
                    'sign in'
                ),
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/sign-up', className: props.activeItem === 'sign-up' ? 'active item' : 'item', onClick: function onClick() {
                            return props.clickMenuItem('sign-up');
                        } },
                    'sign up'
                )
            ),
            props.isLoggedIn && _react2.default.createElement(
                _semanticUiReact.Menu.Menu,
                { position: 'right' },
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/profile', className: props.activeItem === 'profile' ? 'active item' : 'item', onClick: function onClick() {
                            return props.clickMenuItem('profile');
                        } },
                    'profile'
                )
            )
        )
    );
};

Nav.propTypes = {
    clickMenuItem: _propTypes2.default.func.isRequired,
    activeItem: _propTypes2.default.string.isRequired,
    isLoggedIn: _propTypes2.default.bool
};

exports.default = Nav;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sw = __webpack_require__(53);
var _ = __webpack_require__(10);

exports.writeResponse = function writeResponse(res, response, status) {
  sw.setHeaders(res);
  res.status(status || 200).send(JSON.stringify(response));
};

exports.writeError = function writeError(res, error, status) {
  sw.setHeaders(res);
  res.status(error.status || status || 400).send(JSON.stringify(_.omit(error, ['status'])));
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _nconf = __webpack_require__(48);

var _nconf2 = _interopRequireDefault(_nconf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nconf2.default.env(['PORT', 'NODE_ENV']).argv({
    'e': {
        alias: 'NODE_ENV',
        describe: 'Set production or development mode.',
        demand: false,
        default: 'development'
    },
    'p': {
        alias: 'PORT',
        describe: 'Port to run on.',
        demand: false,
        default: 3030
    },
    'n': {
        alias: "neo4j",
        describe: "Use local or remote neo4j_models instance",
        demand: false,
        default: "local"
    }
}).defaults({
    'USERNAME': 'ioc_neoj4',
    'PASSWORD': 'moleskine',
    'neo4j': 'local',
    'neo4j-local': 'bolt://localhost:7687',
    'neo4j-remote': 'bolt:http://162.243.100.222:7474',
    'base_url': 'http://localhost:3030',
    'api_path': '/api/v0'
});

module.exports = _nconf2.default;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(54);

var _uuid2 = _interopRequireDefault(_uuid);

var _randomstring = __webpack_require__(17);

var _randomstring2 = _interopRequireDefault(_randomstring);

var _lodash = __webpack_require__(10);

var _lodash2 = _interopRequireDefault(_lodash);

var _user = __webpack_require__(28);

var _user2 = _interopRequireDefault(_user);

var _crypto = __webpack_require__(47);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var register = function register(session, email, password, firstName, lastName) {
    return session.run('MATCH (user:User {email: {email}}) RETURN user', { email: email }).then(function (results) {
        if (!_lodash2.default.isEmpty(results.records)) {
            throw { email: 'username already in use', status: 400 };
        } else {
            return session.run('CREATE (user:User {id: {id}, email: {email}, password: {password}, firstName: {firstName}, lastName:{lastName}, api_key: {api_key}}) RETURN user', {
                id: _uuid2.default.v4(),
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashPassword(email, password),
                api_key: _randomstring2.default.generate({
                    length: 20,
                    charset: 'hex'
                })
            }).then(function (results) {
                return new _user2.default(results.records[0].get('user'));
            });
        }
    });
};
//curl -H "Content-Type: application/json" -X POST -d '{"email":"testing@test.com","password":"xyz","firstName":"Gary","lastName":"Glitter"}' http://localhost:3030/api/v0/register


var me = function me(session, apiKey) {
    return session.run('MATCH (user:User {api_key: {api_key}}) RETURN user', { api_key: apiKey }).then(function (results) {
        if (_lodash2.default.isEmpty(results.records)) {
            throw { message: 'invalid authorization key', status: 401 };
        }
        return new _user2.default(results.records[0].get('user'));
    });
};

var login = function login(session, username, password) {
    return session.run('MATCH (user:User {username: {username}}) RETURN user', { username: username }).then(function (results) {
        if (_lodash2.default.isEmpty(results.records)) {
            throw { username: 'username does not exist', status: 400 };
        } else {
            var dbUser = _lodash2.default.get(results.records[0].get('user'), 'properties');
            if (dbUser.password != hashPassword(username, password)) {
                throw { password: 'wrong password', status: 400 };
            }
            return { token: _lodash2.default.get(dbUser, 'api_key') };
        }
    });
};

function hashPassword(username, password) {
    var s = username + ':' + password;
    return _crypto2.default.createHash('sha256').update(s).digest('hex');
}

module.exports = {
    register: register,
    me: me,
    login: login
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _randomstring = __webpack_require__(17);

var _randomstring2 = _interopRequireDefault(_randomstring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// neo4j_models cypher helper module
var nconf = __webpack_require__(12);

var neo4j = __webpack_require__(49).v1;
var driver = neo4j.driver(nconf.get('neo4j-local'), neo4j.auth.basic(nconf.get('USERNAME'), nconf.get('PASSWORD')));

if (nconf.get('neo4j') === 'remote') {
  driver = neo4j.driver(nconf.get('neo4j-remote'), neo4j.auth.basic(nconf.get('USERNAME'), nconf.get('PASSWORD')));
}

exports.getSession = function (context) {
  if (context.neo4jSession) {
    return context.neo4jSession;
  } else {
    context.neo4jSession = driver.session();
    return context.neo4jSession;
  }
};

exports.dbWhere = function (name, keys) {
  if (_.isArray(name)) {
    _.map(name, function (obj) {
      return _whereTemplate(obj.name, obj.key, obj.paramKey);
    });
  } else if (keys && keys.length) {
    return 'WHERE ' + _.map(keys, function (key) {
      return _whereTemplate(name, key);
    }).join(' AND ');
  }
};

function whereTemplate(name, key, paramKey) {
  return name + '.' + key + '={' + (paramKey || key) + '}';
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NAV_ITEM_CLICKED = exports.NAV_ITEM_CLICKED = 'NAV_ITEM_CLICKED';

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("randomstring");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function neo4jSessionCleanup(req, res, next) {
  res.on('finish', function () {
    if (req.neo4jSession) {
      req.neo4jSession.close();
      delete req.neo4jSession;
    }
  });
  next();
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _response = __webpack_require__(9);

var _response2 = _interopRequireDefault(_response);

var _users = __webpack_require__(14);

var _users2 = _interopRequireDefault(_users);

var _dbUtils = __webpack_require__(15);

var _dbUtils2 = _interopRequireDefault(_dbUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function setAuthUser(req, res, next) {
  var authHeader = req.headers['authorization'];
  if (!authHeader) {
    req.user = { id: null };
    next();
  } else {
    var match = authHeader.match(/^Token (\S+)/);
    if (!match || !match[1]) {
      return (0, _response2.default)(res, { detail: 'invalid authorization format. Follow `Token <token>`' }, 401);
    }
    var token = match[1];

    _users2.default.me(dbUtils.getSession(req), token).then(function (user) {
      req.user = user;
      next();
    }).catch(next);
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.users = __webpack_require__(29);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(13);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(52);

var _server = __webpack_require__(50);

var _server2 = _interopRequireDefault(_server);

var _nav = __webpack_require__(46);

var _nav2 = _interopRequireDefault(_nav);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(3);

var _ioc = __webpack_require__(42);

var _ioc2 = _interopRequireDefault(_ioc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('*', function (req, res) {
    var context = {};
    var store = (0, _redux.createStore)(_nav2.default);
    var html = _server2.default.renderToString(_react2.default.createElement(
        _reactRouter.StaticRouter,
        { location: req.url, context: context },
        _react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(_ioc2.default, null)
        )
    ));
    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        res.end();
    } else {
        var finalState = store.getState();
        res.status(200).send(renderFullPage(html, finalState));
    }
});

function renderFullPage(html, initialState) {
    return '\n        <!doctype html>\n        <html lang="en">\n        <head>\n            <meta charset="utf-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n            <title>IoC Prototype</title>\n            <link href="./img/favicon.ico" rel="Shortcut Icon" />\n            <script src="https://use.typekit.net/ipx6imu.js"></script>\n            <script>try{Typekit.load({ async: true });}catch(e){}</script>\n        </head>\n        <body>\n        <div id="ioc-app"><div>' + html + '</div></div>\n        <script>\n            window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n        </script>\n        <script type=text/javascript src="../bin/app.bundle.js"></script>\n        </body>\n        </html>';
}

exports.default = router;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("swagger-jsdoc");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _response = __webpack_require__(9);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function loginRequired(req, res, next) {
  var authHeader = req.headers['authorization'];
  if (!authHeader) {
    return (0, _response2.default)(res, { detail: 'no authorization provided' }, 401);
  }
  next();
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(10);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id'],
        'username': _node.properties['email'],
        'firstName': _node.properties['firstName'],
        'lastName': _node.properties['lastName']
    });
};

exports.default = User;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Users = __webpack_require__(14),
    writeResponse = __webpack_require__(9).writeResponse,
    writeError = __webpack_require__(9).writeError,
    loginRequired = __webpack_require__(27),
    dbUtils = __webpack_require__(15),
    _ = __webpack_require__(10);
/**
 * @swagger
 * definition:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       username:
 *         type: string
 *       avatar:
 *         type: object
 */

/**
 * @swagger
 * /api/v0/register:
 *   post:
 *     tags:
 *     - users
 *     description: Register a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             email:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: Your new user
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: Error message(s)
 */
exports.register = function (req, res, next) {
    var email = _.get(req.body, 'email');
    var password = _.get(req.body, 'password');
    var firstName = _.get(req.body, 'firstName');
    var lastName = _.get(req.body, 'lastName');

    if (!email) {
        throw { username: 'This field is required.', status: 400 };
    }
    if (!password) {
        throw { password: 'This field is required.', status: 400 };
    }

    Users.register(dbUtils.getSession(req), email, password, firstName, lastName).then(function (response) {
        return writeResponse(res, response, 201);
    }).catch(next);
};

/**
 * @swagger
 * /api/v0/login:
 *   post:
 *     tags:
 *     - users
 *     description: Login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: succesful login
 *         schema:
 *           properties:
 *             token:
 *               type: string
 *       400:
 *         description: invalid credentials
 */
exports.login = function (req, res, next) {
    var username = _.get(req.body, 'username');
    var password = _.get(req.body, 'password');

    if (!username) {
        throw { username: 'This field is required.', status: 400 };
    }
    if (!password) {
        throw { password: 'This field is required.', status: 400 };
    }

    Users.login(dbUtils.getSession(req), username, password).then(function (response) {
        return writeResponse(res, response);
    }).catch(next);
};

/**
 * @swagger
 * /api/v0/users/me:
 *   get:
 *     tags:
 *     - users
 *     description: Get your user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         type: string
 *         required: true
 *         description: Token (token goes here)
 *     responses:
 *       200:
 *         description: the user
 *         schema:
 *           $ref: '#/definitions/User'
 *       401:
 *         description: invalid / missing authentication
 */
exports.me = function (req, res, next) {
    loginRequired(req, res, function () {
        var authHeader = req.headers['authorization'];
        var match = authHeader.match(/^Token (\S+)/);
        if (!match || !match[1]) {
            throw { message: 'invalid authorization format. Follow `Token <token>`', status: 401 };
        }

        var token = match[1];
        Users.me(dbUtils.getSession(req), token).then(function (response) {
            return writeResponse(res, response);
        }).catch(next);
    });
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(13);

var _express2 = _interopRequireDefault(_express);

var _index = __webpack_require__(22);

var _index2 = _interopRequireDefault(_index);

var _neo4j = __webpack_require__(12);

var _neo4j2 = _interopRequireDefault(_neo4j);

var _methodOverride = __webpack_require__(24);

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _swaggerJsdoc = __webpack_require__(26);

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _bodyParser = __webpack_require__(23);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _setAuthUser = __webpack_require__(20);

var _setAuthUser2 = _interopRequireDefault(_setAuthUser);

var _neo4jSessionCleanup = __webpack_require__(19);

var _neo4jSessionCleanup2 = _interopRequireDefault(_neo4jSessionCleanup);

var _response = __webpack_require__(9);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = __webpack_require__(25);

var routes = __webpack_require__(21);
var apiPath = _neo4j2.default.get('api_path');

var app = (0, _express2.default)();
var api = (0, _express2.default)();

var swaggerDefinition = {
    info: {
        title: 'Neo4j Movie Demo API (Node/Express)',
        version: '1.0.0',
        description: ''
    },
    host: 'localhost:3000',
    basePath: '/'
};

// options for the swagger docs
var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js']
};

var swaggerSpec = (0, _swaggerJsdoc2.default)(options);

app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/docs', _express2.default.static(path.join(__dirname, 'swaggerui')));
api.set('port', _neo4j2.default.get('PORT'));

app.use('/bin', _express2.default.static('./bin'));
app.use('/', _index2.default);
app.use('/view/*', _index2.default);

api.use(_bodyParser2.default.json());
api.use((0, _methodOverride2.default)());

//enable CORS
api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//api error handler
api.use(function (err, req, res, next) {
    if (err && err.status) {
        (0, _response2.default)(res, err);
    } else next(err);
});

api.use(_setAuthUser2.default);
api.use(_neo4jSessionCleanup2.default);

api.post(apiPath + '/register', routes.users.register);
api.post(apiPath + '/login', routes.users.login);
api.get(apiPath + '/users/me', routes.users.me);

app.listen(3000, function () {
    console.log('Ioc Express Server started');
});

api.listen(3030, function () {
    console.log('Neo4j server started');
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FOOTER_ITEM_CLICKED = exports.FOOTER_ITEM_CLICKED = 'FOOTER_ITEM_CLICKED';

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SIGN_IN_FORM_SUBMITTED = exports.SIGN_IN_FORM_SUBMITTED = 'SIGN_IN_FORM_SUBMITTED';

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SIGN_UP_FORM_SUBMITTED = exports.SIGN_UP_FORM_SUBMITTED = 'SIGN_UP_FORM_SUBMITTED';

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onClickSubmit = undefined;

var _signIn = __webpack_require__(32);

var SignInActionTypes = _interopRequireWildcard(_signIn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var onClickSubmit = exports.onClickSubmit = function onClickSubmit() {
    return {
        type: SignInActionTypes.SIGN_IN_FORM_SUBMITTED
    };
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onClickSubmit = undefined;

var _signUp = __webpack_require__(33);

var SignUpActionTypes = _interopRequireWildcard(_signUp);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var onClickSubmit = exports.onClickSubmit = function onClickSubmit() {
    return {
        type: SignUpActionTypes.SIGN_UP_FORM_SUBMITTED
    };
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = __webpack_require__(51);

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _superagent = __webpack_require__(18);

var _superagent2 = _interopRequireDefault(_superagent);

var _semanticUiReact = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CLOUDINARY_UPLOAD_PRESET = 'iylswkmx';
var CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/hpvmvlpcu/image/upload';

var ImageUploader = function (_React$Component) {
    _inherits(ImageUploader, _React$Component);

    function ImageUploader(props) {
        _classCallCheck(this, ImageUploader);

        var _this = _possibleConstructorReturn(this, (ImageUploader.__proto__ || Object.getPrototypeOf(ImageUploader)).call(this, props));

        _this.state = {
            uploadedFileCloudinaryUrl: ''
        };
        return _this;
    }

    _createClass(ImageUploader, [{
        key: 'onImageDrop',
        value: function onImageDrop(files) {
            this.setState({
                uploadedFile: files[0]
            });
            this.handleImageUpload(files[0]);
        }
    }, {
        key: 'handleImageUpload',
        value: function handleImageUpload(file) {
            var _this2 = this;

            var upload = _superagent2.default.post(CLOUDINARY_UPLOAD_URL).field('upload_preset', CLOUDINARY_UPLOAD_PRESET).field('file', file);
            upload.end(function (err, response) {
                if (err) {
                    console.error(err);
                }
                if (response.body.secure_url !== '') {
                    _this2.setState({
                        uploadedFileCloudinaryUrl: response.body.secure_url
                    });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _semanticUiReact.Segment,
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    'Upload your Moleskine artwork.'
                ),
                _react2.default.createElement(
                    'form',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'FileUpload' },
                        _react2.default.createElement(
                            _reactDropzone2.default,
                            {
                                onDrop: this.onImageDrop.bind(this),
                                multiple: false,
                                accept: 'image/*',
                                className: 'uploader-zone',
                                activeClassName: 'uploader-zone-active',
                                rejectClassName: 'uploader-zone-rejected' },
                            _react2.default.createElement(
                                'div',
                                null,
                                'Drop an image or click to select a file to upload.'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        this.state.uploadedFileCloudinaryUrl === '' ? null : _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'p',
                                null,
                                this.state.uploadedFile.name
                            ),
                            _react2.default.createElement('img', { src: this.state.uploadedFileCloudinaryUrl })
                        )
                    )
                )
            );
        }
    }]);

    return ImageUploader;
}(_react2.default.Component);

// {"public_id":"jz6h0ldxnvay65oqihra",
// "version":1498127607,
// "signature":"8c658775bd5e2d837ba7d76a0ef0b23be0b7b51f",
// "width":686,
// "height":800,
// "format":"jpg",
// "resource_type":"image",
// "created_at":"2017-06-22T10:33:27Z",
// "tags":[],"pages":1,"bytes":74855,
// "type":"upload",
// "etag":"3ad1a573b6f4326e0524c3fac3f0e071",
// "url":"http://res.cloudinary.com/hpvmvlpcu/image/upload/v1498127607/jz6h0ldxnvay65oqihra.jpg",
// "secure_url":"https://res.cloudinary.com/hpvmvlpcu/image/upload/v1498127607/jz6h0ldxnvay65oqihra.jpg",
// "image_metadata":{
// "JFIFVersion":"1.01",
// "ResolutionUnit":"inches",
// "XResolution":"72",
// "YResolution":"72",
// "Colorspace":"GRAY"},
// "colors":[[
// "#030303",69.4],
// ["#F8F8F8",27.8]],
// "predominant":{"google":[["black",69.4],["white",27.8]]},
// "phash":"d393644e93af2b90",
// "coordinates":{"faces":[]},"illustration_score":1.0,"semi_transparent":false,"grayscale":true,"original_filename":"3998295_orig"}


exports.default = ImageUploader;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SignIn = function SignIn(props) {
    return _react2.default.createElement(
        _semanticUiReact.Form,
        null,
        _react2.default.createElement(
            _semanticUiReact.Form.Field,
            null,
            _react2.default.createElement(
                'label',
                null,
                'Email'
            ),
            _react2.default.createElement('input', { placeholder: 'Email' })
        ),
        _react2.default.createElement(
            _semanticUiReact.Form.Field,
            null,
            _react2.default.createElement(
                'label',
                null,
                'Password'
            ),
            _react2.default.createElement('input', { placeholder: 'Password' })
        ),
        _react2.default.createElement(
            _semanticUiReact.Button,
            { type: 'submit', onClick: function onClick() {
                    return props.onClickSubmit();
                } },
            'Sign In'
        )
    );
};

SignIn.propTypes = {
    onClickSubmit: _propTypes2.default.func.isRequired
};

exports.default = SignIn;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(1);

var _superagent = __webpack_require__(18);

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignUp = function (_Component) {
    _inherits(SignUp, _Component);

    function SignUp(props) {
        _classCallCheck(this, SignUp);

        var _this = _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).call(this, props));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleTyping = _this.handleTyping.bind(_this);
        _this.handleValidation = _this.handleValidation.bind(_this);
        _this.handleValidationNoPassword = _this.handleValidation.bind(_this, false);
        _this.handleValidationWithPassword = _this.handleValidation.bind(_this, true);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.state = {
            nameValid: true,
            emailValid: true,
            passwordsValid: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password_confirm: '',
            doAgree: false
        };
        return _this;
    }

    _createClass(SignUp, [{
        key: 'handleClick',
        value: function handleClick() {
            this.state.doAgree = !this.state.doAgree;
            this.handleValidation(false);
        }
    }, {
        key: 'handleValidation',
        value: function handleValidation(chkpasswords) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.setState({ nameValid: Boolean(this.state.firstName && this.state.firstName.length !== 0), emailValid: re.test(this.state.email) });
            if (chkpasswords) {
                this.setState({ passwordsValid: Boolean(this.state.password === this.state.password_confirm) });
            }
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            this.handleValidation(true);
            if (this.state.passwordsValid && this.state.emailValid && this.state.nameValid) {
                _superagent2.default.post('http://localhost:3030/api/v0/register').set('Content-Type', 'application/json').send(JSON.stringify(this.state)).end(function (error, response) {
                    if (!error && response) {
                        _this2.setState({ commits: response.body });
                    } else {
                        console.log('Error submitting your credentials', error);
                    }
                });
            }
        }
    }, {
        key: 'handleTyping',
        value: function handleTyping(e) {
            e.preventDefault();
            var target = e.target;
            var value = target.type === 'checkbox' ? target.checked : target.value;
            var name = target.name;
            this.setState(_defineProperty({}, name, value));
            this.handleValidation(false);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _semanticUiReact.Form,
                { onSubmit: this.handleSubmit },
                _react2.default.createElement(
                    _semanticUiReact.Form.Field,
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        '* First Name'
                    ),
                    _react2.default.createElement('input', { placeholder: 'First Name', name: 'firstName', value: this.state.firstName, onChange: this.handleTyping, onBlur: this.handleValidationNoPassword })
                ),
                _react2.default.createElement(
                    _semanticUiReact.Message,
                    { negative: true, hidden: this.state.passwordsValid },
                    _react2.default.createElement(
                        'p',
                        null,
                        'First Name is Required'
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Form.Field,
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Last Name'
                    ),
                    _react2.default.createElement('input', { placeholder: 'Last Name', name: 'lastName', value: this.state.lastName, onChange: this.handleTyping })
                ),
                _react2.default.createElement(
                    _semanticUiReact.Form.Field,
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        '* Email'
                    ),
                    _react2.default.createElement('input', { placeholder: 'Email', name: 'email', value: this.state.email, onChange: this.handleTyping, onBlur: this.handleValidationNoPassword })
                ),
                _react2.default.createElement(
                    _semanticUiReact.Message,
                    { negative: true, hidden: this.state.emailValid },
                    _react2.default.createElement(
                        'p',
                        null,
                        'Invaild email format'
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Form.Field,
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        '* Password'
                    ),
                    _react2.default.createElement('input', { placeholder: 'Password', name: 'password', value: this.state.password, type: 'password', onChange: this.handleTyping, onBlur: this.handleValidationWithPassword })
                ),
                _react2.default.createElement(
                    _semanticUiReact.Form.Field,
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        '* Confirm Password'
                    ),
                    _react2.default.createElement('input', { placeholder: 'Confirm Password', name: 'password_confirm', value: this.state.password_confirm, type: 'password', onChange: this.handleTyping, onBlur: this.handleValidationWithPassword })
                ),
                _react2.default.createElement(
                    _semanticUiReact.Message,
                    { negative: true, hidden: this.state.passwordsValid },
                    _react2.default.createElement(
                        'p',
                        null,
                        'Passwords do not match.'
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Form.Field,
                    null,
                    _react2.default.createElement(_semanticUiReact.Checkbox, { label: '* I agree to the Terms and Conditions', onClick: this.handleClick, onChange: this.handleTyping, checked: this.state.doAgree, ref: 'doAgree', name: 'doAgree' })
                ),
                _react2.default.createElement(
                    _semanticUiReact.Button,
                    { type: 'submit', disabled: !this.state.doAgree },
                    'Submit'
                )
            );
        }
    }]);

    return SignUp;
}(_react.Component);

exports.default = SignUp;
//ToDo: Redux Dispatch
//ToDo: Display Error
//ToDo: Redirect on Success

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(3);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(6);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(5);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(8);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(7);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Art = function (_Component) {
    _inherits(Art, _Component);

    function Art() {
        _classCallCheck(this, Art);

        return _possibleConstructorReturn(this, (Art.__proto__ || Object.getPrototypeOf(Art)).apply(this, arguments));
    }

    _createClass(Art, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dispatch = _props.dispatch,
                menu = _props.menu;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { activeItem: 'none', clickMenuItem: clickMenuItem }),
                    _react2.default.createElement(
                        _semanticUiReact.Segment,
                        null,
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Art'
                        )
                    )
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return Art;
}(_react.Component);

Art.propTypes = {
    menu: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        menu: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Art);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(3);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(6);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(5);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(8);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(7);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Browse = function (_Component) {
    _inherits(Browse, _Component);

    function Browse() {
        _classCallCheck(this, Browse);

        return _possibleConstructorReturn(this, (Browse.__proto__ || Object.getPrototypeOf(Browse)).apply(this, arguments));
    }

    _createClass(Browse, [{
        key: 'render',
        value: function render() {
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { activeItem: 'browse', clickMenuItem: clickMenuItem }),
                    _react2.default.createElement(
                        _semanticUiReact.Segment,
                        null,
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Browse'
                        )
                    )
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return Browse;
}(_react.Component);

Browse.propTypes = {
    menu: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        menu: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Browse);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(3);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(6);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(5);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(8);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(7);

var _footer2 = _interopRequireDefault(_footer);

var _imageUploader = __webpack_require__(36);

var _imageUploader2 = _interopRequireDefault(_imageUploader);

var _semanticUiReact = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dispatch = _props.dispatch,
                menu = _props.menu;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { activeItem: 'home', clickMenuItem: clickMenuItem }),
                    _react2.default.createElement(_imageUploader2.default, null)
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return Home;
}(_react.Component);

Home.propTypes = {
    menu: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        menu: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Home);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _art = __webpack_require__(39);

var _art2 = _interopRequireDefault(_art);

var _browse = __webpack_require__(40);

var _browse2 = _interopRequireDefault(_browse);

var _home = __webpack_require__(41);

var _home2 = _interopRequireDefault(_home);

var _signUp = __webpack_require__(45);

var _signUp2 = _interopRequireDefault(_signUp);

var _signIn = __webpack_require__(44);

var _signIn2 = _interopRequireDefault(_signIn);

var _profile = __webpack_require__(43);

var _profile2 = _interopRequireDefault(_profile);

var _reactRouterDom = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ioc = function (_Component) {
    _inherits(Ioc, _Component);

    function Ioc() {
        _classCallCheck(this, Ioc);

        return _possibleConstructorReturn(this, (Ioc.__proto__ || Object.getPrototypeOf(Ioc)).apply(this, arguments));
    }

    _createClass(Ioc, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _home2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/sign-up', component: _signUp2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/sign-in', component: _signIn2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/profile', component: _profile2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/art', component: _art2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/browse', component: _browse2.default })
            );
        }
    }]);

    return Ioc;
}(_react.Component);

exports.default = Ioc;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(3);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(6);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(5);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(8);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(7);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Profile = function (_Component) {
    _inherits(Profile, _Component);

    function Profile() {
        _classCallCheck(this, Profile);

        return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
    }

    _createClass(Profile, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dispatch = _props.dispatch,
                menu = _props.menu;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { activeItem: 'profile', clickMenuItem: clickMenuItem }),
                    _react2.default.createElement(
                        _semanticUiReact.Segment,
                        null,
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Profile'
                        )
                    )
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return Profile;
}(_react.Component);

Profile.propTypes = {
    menu: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        menu: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Profile);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(3);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(6);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(5);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _signIn_actions = __webpack_require__(34);

var SignInActionCreators = _interopRequireWildcard(_signIn_actions);

var _nav = __webpack_require__(8);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(7);

var _footer2 = _interopRequireDefault(_footer);

var _signInForm = __webpack_require__(37);

var _signInForm2 = _interopRequireDefault(_signInForm);

var _semanticUiReact = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignInPage = function (_Component) {
    _inherits(SignInPage, _Component);

    function SignInPage() {
        _classCallCheck(this, SignInPage);

        return _possibleConstructorReturn(this, (SignInPage.__proto__ || Object.getPrototypeOf(SignInPage)).apply(this, arguments));
    }

    _createClass(SignInPage, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dispatch = _props.dispatch,
                menu = _props.menu;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            var onClickSubmit = (0, _redux.bindActionCreators)(SignInActionCreators.onClickSubmit, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { activeItem: 'sign-in', clickMenuItem: clickMenuItem }),
                    _react2.default.createElement(_signInForm2.default, { onClickSubmit: onClickSubmit })
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return SignInPage;
}(_react.Component);

SignInPage.propTypes = {
    menu: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        menu: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SignInPage);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(3);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(6);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(5);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _signUp_actions = __webpack_require__(35);

var SignUpActionCreators = _interopRequireWildcard(_signUp_actions);

var _nav = __webpack_require__(8);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(7);

var _footer2 = _interopRequireDefault(_footer);

var _signUpForm = __webpack_require__(38);

var _signUpForm2 = _interopRequireDefault(_signUpForm);

var _semanticUiReact = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignUpPage = function (_Component) {
    _inherits(SignUpPage, _Component);

    function SignUpPage() {
        _classCallCheck(this, SignUpPage);

        return _possibleConstructorReturn(this, (SignUpPage.__proto__ || Object.getPrototypeOf(SignUpPage)).apply(this, arguments));
    }

    _createClass(SignUpPage, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dispatch = _props.dispatch,
                menu = _props.menu;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            var onClickSubmit = (0, _redux.bindActionCreators)(SignUpActionCreators.onClickSubmit, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { activeItem: 'sign-up', clickMenuItem: clickMenuItem }),
                    _react2.default.createElement(_signUpForm2.default, { onClickSubmit: onClickSubmit })
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return SignUpPage;
}(_react.Component);

SignUpPage.propTypes = {
    menu: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        menu: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SignUpPage);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Nav;

var _nav = __webpack_require__(16);

var NavActionTypes = _interopRequireWildcard(_nav);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    activeItem: 'home',
    isLoggedIn: false
};

function Nav() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case NavActionTypes.NAV_ITEM_CLICKED:
            return Object.assign({}, state, {
                activeItem: action.name
            });
        default:
            return state;
    }
}

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("nconf");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("neo4j-driver");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("react-dropzone");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("swagger-node-express");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })
/******/ ]);