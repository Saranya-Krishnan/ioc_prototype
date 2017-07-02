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
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sw = __webpack_require__(83);
var _ = __webpack_require__(1);

exports.writeResponse = function writeResponse(res, response, status) {
  sw.setHeaders(res);
  res.status(status || 200).send(JSON.stringify(response));
};

exports.writeError = function writeError(res, error, status) {
  sw.setHeaders(res);
  res.status(error.status || status || 400).send(JSON.stringify(_.omit(error, ['status'])));
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _randomstring = __webpack_require__(21);

var _randomstring2 = _interopRequireDefault(_randomstring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// neo4j_models cypher helper module
var nconf = __webpack_require__(16);

var neo4j = __webpack_require__(80).v1;
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _response = __webpack_require__(0);

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
/* 5 */
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setLoggedIn = exports.updateUserInfo = exports.clickMenuItem = undefined;

var _nav = __webpack_require__(20);

var NavActionTypes = _interopRequireWildcard(_nav);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var clickMenuItem = exports.clickMenuItem = function clickMenuItem(name) {
    return {
        type: NavActionTypes.NAV_ITEM_CLICKED,
        name: name
    };
};

var updateUserInfo = exports.updateUserInfo = function updateUserInfo(data) {
    return {
        type: NavActionTypes.UPDATE_USER_INFO, data: data
    };
};

var setLoggedIn = exports.setLoggedIn = function setLoggedIn(status) {
    return {
        type: NavActionTypes.CHECK_LOGGED_IN, status: status
    };
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickFooterItem = undefined;

var _footer = __webpack_require__(60);

var FooterActionTypes = _interopRequireWildcard(_footer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var clickFooterItem = exports.clickFooterItem = function clickFooterItem() {
    return {
        type: FooterActionTypes.FOOTER_ITEM_CLICKED
    };
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(14);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(14);

var _superagent = __webpack_require__(15);

var _superagent2 = _interopRequireDefault(_superagent);

var _nav_actions = __webpack_require__(9);

var NavActions = _interopRequireWildcard(_nav_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var token = __webpack_require__(18);

var Nav = function (_Component) {
    _inherits(Nav, _Component);

    function Nav(props) {
        _classCallCheck(this, Nav);

        var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

        _this.state = props;
        _this.getUserInfo = _this.getUserInfo.bind(_this);
        return _this;
    }

    _createClass(Nav, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getUserInfo();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(nextProps.state);
        }
    }, {
        key: 'getUserInfo',
        value: function getUserInfo() {
            var _this2 = this;

            this.sessionToken = token.getToken();
            //ToDo: Env path
            _superagent2.default.get('http://localhost:3030/api/v0/users/me').set({ Accept: 'application/json', Authorization: 'Token ' + this.sessionToken }).end(function (error, response) {
                if (!error && response) {
                    _this2.props.setLoggedIn(true);
                    _this2.props.updateUserInfo(JSON.parse(response.text));
                } else {
                    _this2.props.setLoggedIn(false);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                _semanticUiReact.Container,
                { text: true },
                _react2.default.createElement(
                    _semanticUiReact.Menu,
                    { pointing: true, secondary: true },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/', className: this.state.activeItem === 'home' ? 'active item' : 'item', onClick: function onClick() {
                                return _this3.props.clickMenuItem('home');
                            } },
                        'home'
                    ),
                    !this.state.isLoggedIn && _react2.default.createElement(
                        _semanticUiReact.Menu.Menu,
                        { position: 'right' },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '#', className: this.state.activeItem === 'sign-in' ? 'active item' : 'item', onClick: function onClick() {
                                    return _this3.props.clickMenuItem('sign-in');
                                } },
                            'sign in'
                        ),
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '#', className: this.state.activeItem === 'sign-up' ? 'active item' : 'item', onClick: function onClick() {
                                    return _this3.props.clickMenuItem('sign-up');
                                } },
                            'sign up'
                        )
                    ),
                    this.state.isLoggedIn && _react2.default.createElement(
                        _semanticUiReact.Menu.Menu,
                        { position: 'right' },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '/profile', className: this.state.activeItem === 'profile' ? 'active item' : 'item', onClick: function onClick() {
                                    return _this3.props.clickMenuItem('profile');
                                } },
                            this.state.userInfo.firstName
                        )
                    )
                )
            );
        }
    }]);

    return Nav;
}(_react.Component);

Nav.propTypes = {
    clickMenuItem: _propTypes2.default.func.isRequired,
    activeItem: _propTypes2.default.string,
    sessionToken: _propTypes2.default.string,
    isLoggedIn: _propTypes2.default.bool,
    setLoggedIn: _propTypes2.default.func.isRequired,
    updateUserInfo: _propTypes2.default.func.isRequired,
    userInfo: _propTypes2.default.shape({
        id: _propTypes2.default.string,
        username: _propTypes2.default.string,
        firstName: _propTypes2.default.string,
        lastName: _propTypes2.default.string
    })
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        setLoggedIn: function setLoggedIn(status) {
            dispatch(NavActions.setLoggedIn(status));
        },
        clickMenuItem: function clickMenuItem(name) {
            dispatch(NavActions.clickMenuItem(name));
        }

    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['Nav']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Nav);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _nconf = __webpack_require__(79);

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
/* 17 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setToken = function setToken(token) {
    if (token) {
        window.localStorage.setItem('token', token);
    }

    //ToDo:remove
    console.log('window from helper', window.localStorage.token);
};

var getToken = function getToken() {
    return window.localStorage.getItem('token');
};

module.exports = {
    setToken: setToken,
    getToken: getToken
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _randomstring = __webpack_require__(21);

var _randomstring2 = _interopRequireDefault(_randomstring);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _user = __webpack_require__(41);

var _user2 = _interopRequireDefault(_user);

var _crypto = __webpack_require__(78);

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
var me = function me(session, apiKey) {
    return session.run('MATCH (user:User {api_key: {api_key}}) RETURN user', { api_key: apiKey }).then(function (results) {
        if (_lodash2.default.isEmpty(results.records)) {
            throw { message: 'invalid authorization key', status: 401 };
        }
        return new _user2.default(results.records[0].get('user'));
    });
};

var login = function login(session, email, password) {
    return session.run('MATCH (user:User {email: {email}}) RETURN user', { email: email }).then(function (results) {
        if (_lodash2.default.isEmpty(results.records)) {
            throw { email: 'username does not exist', status: 400 };
        } else {
            var dbUser = _lodash2.default.get(results.records[0].get('user'), 'properties');
            if (dbUser.password != hashPassword(email, password)) {
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NAV_ITEM_CLICKED = exports.NAV_ITEM_CLICKED = 'NAV_ITEM_CLICKED';
var UPDATE_USER_INFO = exports.UPDATE_USER_INFO = 'UPDATE_USER_INFO';
var CHECK_LOGGED_IN = exports.CHECK_LOGGED_IN = 'CHECK_LOGGED_IN';

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("randomstring");

/***/ }),
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _response = __webpack_require__(0);

var _response2 = _interopRequireDefault(_response);

var _users = __webpack_require__(19);

var _users2 = _interopRequireDefault(_users);

var _dbUtils = __webpack_require__(3);

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

    _users2.default.me(_dbUtils2.default.getSession(req), token).then(function (user) {
      req.user = user;
      next();
    }).catch(next);
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.images = __webpack_require__(49);
exports.journeys = __webpack_require__(50);
exports.locations = __webpack_require__(51);
exports.notebooks = __webpack_require__(52);
exports.pages = __webpack_require__(53);
exports.quests = __webpack_require__(54);
exports.suggests = __webpack_require__(55);
exports.tags = __webpack_require__(56);
exports.users = __webpack_require__(57);
exports.works = __webpack_require__(58);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(17);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(82);

var _server = __webpack_require__(81);

var _server2 = _interopRequireDefault(_server);

var _nav = __webpack_require__(77);

var _nav2 = _interopRequireDefault(_nav);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(8);

var _ioc = __webpack_require__(73);

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
/* 26 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("swagger-jsdoc");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _image = __webpack_require__(33);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locate = function locate(session) {};

var classify = function classify(session) {};

var create = function create(session) {};

var update = function update(session) {};

var deletion = function deletion(session) {};

module.exports = {
    locate: locate,
    classify: classify,
    create: create,
    update: update,
    deletion: deletion
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _journey = __webpack_require__(34);

var _journey2 = _interopRequireDefault(_journey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session) {};

var update = function update(session) {};

var deletion = function deletion(session) {};

module.exports = {
    create: create,
    update: update,
    deletion: deletion
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _location = __webpack_require__(35);

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session) {};

var update = function update(session) {};

var deletion = function deletion(session) {};

module.exports = {
    create: create,
    update: update,
    deletion: deletion
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id'],
        'url': _node.properties['url']
    });
};

exports.default = Image;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Journey = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Journey;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Location = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Location;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notebook = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Notebook;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Page;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quest = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Quest;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Suggestion = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Suggestion;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Tag;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(1);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Work = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Work;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _notebook = __webpack_require__(36);

var _notebook2 = _interopRequireDefault(_notebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session) {};

var update = function update(session) {};

var deletion = function deletion(session) {};

module.exports = {
    create: create,
    update: update,
    deletion: deletion
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _page = __webpack_require__(37);

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session) {};

var update = function update(session) {};

var deletion = function deletion(session) {};

module.exports = {
    create: create,
    update: update,
    deletion: deletion
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _quest = __webpack_require__(38);

var _quest2 = _interopRequireDefault(_quest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session) {};

var update = function update(session) {};

var deletion = function deletion(session) {};

module.exports = {
    create: create,
    update: update,
    deletion: deletion
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _suggestion = __webpack_require__(39);

var _suggestion2 = _interopRequireDefault(_suggestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session) {};

var update = function update(session) {};

var deletion = function deletion(session) {};

module.exports = {
    create: create,
    update: update,
    deletion: deletion
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _tag = __webpack_require__(40);

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session) {};

var update = function update(session) {};

var deletion = function deletion(session) {};

module.exports = {
    create: create,
    update: update,
    deletion: deletion
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _work = __webpack_require__(42);

var _work2 = _interopRequireDefault(_work);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session) {};

var update = function update(session) {};

var deletion = function deletion(session) {};

module.exports = {
    create: create,
    update: update,
    deletion: deletion
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Images = __webpack_require__(30),
    writeResponse = __webpack_require__(0).writeResponse,
    writeError = __webpack_require__(0).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(1);

/**
 * @swagger
 * definition:
 *   Image:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       classificationData:
 *          type: string
 */

/**
 * @swagger
 * /api/v0/classify:
 *   post:
 *     tags:
 *     - images
 *     description: Sends an image for classification
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Classification Data
 *       400:
 *         description: Error message(s)
 */

exports.classify = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/images/locate:
 *   post:
 *     tags:
 *     - images
 *     description: Enriches images with location data based on Exif
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Location Data
 *       400:
 *         description: Error message(s)
 */

exports.locate = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/images/create:
 *   post:
 *     tags:
 *     - images
 *     description: Creates a new image
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.create = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/images/update:
 *   post:
 *     tags:
 *     - images
 *     description: Updates an image
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.update = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/images/delete:
 *   post:
 *     tags:
 *     - images
 *     description: Deletes an image
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.delete = function (req, res, next) {};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Journeys = __webpack_require__(31),
    writeResponse = __webpack_require__(0).writeResponse,
    writeError = __webpack_require__(0).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(1);

/**
 * @swagger
 * definition:
 *   Journey:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       classificationData:
 *          type: string
 */
/**
 * @swagger
 * /api/v0/journeys/create:
 *   post:
 *     tags:
 *     - journeys
 *     description: Creates a new journey
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.create = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/journeys/update:
 *   post:
 *     tags:
 *     - journeys
 *     description: Updates an journey
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.update = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/journeys/delete:
 *   post:
 *     tags:
 *     - journeys
 *     description: Deletes an journey
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.delete = function (req, res, next) {};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Locations = __webpack_require__(32),
    writeResponse = __webpack_require__(0).writeResponse,
    writeError = __webpack_require__(0).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(1);

/**
 * @swagger
 * definition:
 *   Location:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       classificationData:
 *          type: string
 */
/**
 * @swagger
 * /api/v0/locations/create:
 *   post:
 *     tags:
 *     - locations
 *     description: Creates a new location
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.create = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/locations/update:
 *   post:
 *     tags:
 *     - locations
 *     description: Updates an location
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.update = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/locations/delete:
 *   post:
 *     tags:
 *     - locations
 *     description: Deletes an location
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.delete = function (req, res, next) {};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Notebooks = __webpack_require__(43),
    writeResponse = __webpack_require__(0).writeResponse,
    writeError = __webpack_require__(0).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(1);

/**
 * @swagger
 * definition:
 *   Notebook:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       classificationData:
 *          type: string
 */
/**
 * @swagger
 * /api/v0/notebooks/create:
 *   post:
 *     tags:
 *     - notebooks
 *     description: Creates a new notebook
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.create = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/notebooks/update:
 *   post:
 *     tags:
 *     - notebooks
 *     description: Updates an notebook
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.update = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/notebooks/delete:
 *   post:
 *     tags:
 *     - notebooks
 *     description: Deletes an notebook
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.delete = function (req, res, next) {};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Pages = __webpack_require__(44),
    writeResponse = __webpack_require__(0).writeResponse,
    writeError = __webpack_require__(0).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(1);

/**
 * @swagger
 * definition:
 *   Page:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       classificationData:
 *          type: string
 */
/**
 * @swagger
 * /api/v0/pages/create:
 *   post:
 *     tags:
 *     - pages
 *     description: Creates a new page
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.create = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/pages/update:
 *   post:
 *     tags:
 *     - pages
 *     description: Updates an page
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.update = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/pages/delete:
 *   post:
 *     tags:
 *     - pages
 *     description: Deletes an page
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.delete = function (req, res, next) {};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Quests = __webpack_require__(45),
    writeResponse = __webpack_require__(0).writeResponse,
    writeError = __webpack_require__(0).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(1);

/**
 * @swagger
 * definition:
 *   Quest:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       classificationData:
 *          type: string
 */
/**
 * @swagger
 * /api/v0/quests/create:
 *   post:
 *     tags:
 *     - quests
 *     description: Creates a new quest
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.create = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/quests/update:
 *   post:
 *     tags:
 *     - quests
 *     description: Updates an quest
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.update = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/quests/delete:
 *   post:
 *     tags:
 *     - quests
 *     description: Deletes an quest
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.delete = function (req, res, next) {};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Suggestions = __webpack_require__(46),
    writeResponse = __webpack_require__(0).writeResponse,
    writeError = __webpack_require__(0).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(1);

/**
 * @swagger
 * definition:
 *   Suggestion:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       classificationData:
 *          type: string
 */
/**
 * @swagger
 * /api/v0/suggestions/create:
 *   post:
 *     tags:
 *     - suggestions
 *     description: Creates a new suggestion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.create = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/suggestions/update:
 *   post:
 *     tags:
 *     - suggestions
 *     description: Updates an suggestion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.update = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/suggestions/delete:
 *   post:
 *     tags:
 *     - suggestions
 *     description: Deletes an suggestion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.delete = function (req, res, next) {};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Tags = __webpack_require__(47),
    writeResponse = __webpack_require__(0).writeResponse,
    writeError = __webpack_require__(0).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(1);

/**
 * @swagger
 * definition:
 *   Tag:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       classificationData:
 *          type: string
 */
/**
 * @swagger
 * /api/v0/tags/create:
 *   post:
 *     tags:
 *     - tags
 *     description: Creates a new tag
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.create = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/tags/update:
 *   post:
 *     tags:
 *     - tags
 *     description: Updates an tag
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.update = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/tags/delete:
 *   post:
 *     tags:
 *     - tags
 *     description: Deletes an tag
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.delete = function (req, res, next) {};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Users = __webpack_require__(19),
    writeResponse = __webpack_require__(0).writeResponse,
    writeError = __webpack_require__(0).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(1);
/**
 * @swagger
 * definition:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       email:
 *         type: string
 *       firstName:
 *          type: string
 *       lastName:
 *          type: string
 *       password:
 *          type: string
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
    var email = _.get(req.body, 'email');
    var password = _.get(req.body, 'password');

    if (!email) {
        throw { username: 'This field is required.', status: 400 };
    }
    if (!password) {
        throw { password: 'This field is required.', status: 400 };
    }
    Users.login(dbUtils.getSession(req), email, password).then(function (response) {
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Works = __webpack_require__(48),
    writeResponse = __webpack_require__(0).writeResponse,
    writeError = __webpack_require__(0).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(1);

/**
 * @swagger
 * definition:
 *   Work:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       classificationData:
 *          type: string
 */
/**
 * @swagger
 * /api/v0/works/create:
 *   post:
 *     tags:
 *     - works
 *     description: Creates a new work
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.create = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/works/update:
 *   post:
 *     tags:
 *     - works
 *     description: Updates an work
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.update = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/works/delete:
 *   post:
 *     tags:
 *     - works
 *     description: Deletes an work
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.delete = function (req, res, next) {};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(17);

var _express2 = _interopRequireDefault(_express);

var _index = __webpack_require__(25);

var _index2 = _interopRequireDefault(_index);

var _neo4j = __webpack_require__(16);

var _neo4j2 = _interopRequireDefault(_neo4j);

var _methodOverride = __webpack_require__(27);

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _swaggerJsdoc = __webpack_require__(29);

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _bodyParser = __webpack_require__(26);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _setAuthUser = __webpack_require__(23);

var _setAuthUser2 = _interopRequireDefault(_setAuthUser);

var _neo4jSessionCleanup = __webpack_require__(22);

var _neo4jSessionCleanup2 = _interopRequireDefault(_neo4jSessionCleanup);

var _response = __webpack_require__(0);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = __webpack_require__(28);

var routes = __webpack_require__(24);
var apiPath = _neo4j2.default.get('api_path');

var app = (0, _express2.default)();
var api = (0, _express2.default)();

var swaggerDefinition = {
    info: {
        title: 'Ioc Prototype',
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

api.post(apiPath + '/images/create', routes.images.create);
// api.post(apiPath+'/images/update', routes.images.update);
// api.post(apiPath+'/images/delete', routes.images.deletion);
// api.post(apiPath+'/images/classify', routes.images.classify);
// api.post(apiPath+'/images/locate', routes.images.locate);
//
// api.post(apiPath+'/notebooks/create', routes.notebooks.create);
// api.post(apiPath+'/notebooks/update', routes.notebooks.update);
// api.post(apiPath+'/notebooks/delete', routes.notebooks.deletion);
//
// api.post(apiPath+'/pages/create', routes.pages.create);
// api.post(apiPath+'/pages/update', routes.pages.update);
// api.post(apiPath+'/pages/delete', routes.pages.deletion);
//
// api.post(apiPath+'/works/create', routes.works.create);
// api.post(apiPath+'/works/update', routes.works.update);
// api.post(apiPath+'/works/delete', routes.works.deletion);
//
// api.post(apiPath+'/locations/create', routes.locations.create);
// api.post(apiPath+'/locations/update', routes.locations.update);
// api.post(apiPath+'/locations/delete', routes.locations.deletion);
//
// api.post(apiPath+'/tags/create', routes.tags.create);
// api.post(apiPath+'/tags/update', routes.tags.update);
// api.post(apiPath+'/tags/delete', routes.tags.deletion);
//
// api.post(apiPath+'/journeys/create', routes.journeys.create);
// api.post(apiPath+'/journeys/update', routes.journeys.update);
// api.post(apiPath+'/journeys/delete', routes.journeys.deletion);
//
// api.post(apiPath+'/suggestions/create', routes.suggestions.create);
// api.post(apiPath+'/suggestions/update', routes.suggestions.update);
// api.post(apiPath+'/suggestions/delete', routes.suggestions.deletion);
//
// api.post(apiPath+'/quests/create', routes.quests.create);
// api.post(apiPath+'/quests/update', routes.quests.update);
// api.post(apiPath+'/quests/delete', routes.quests.deletion);


//api.get(apiPath+'classify', function(req, res){
//'https://gateway-a.watsonplatform.net/visual-recognition/api/v3'

//    response = watson_connect.get 'classify', {:api_key => ENV['WATSON_KEY'], :url => ao.url, :version => '2016-05-20', :classifier_ids =>'default,moleskine_71136762'}

//});


app.listen(3000, function () {
    console.log('Ioc Express Server started');
});

api.listen(3030, function () {
    console.log('Neo4j server started');
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FOOTER_ITEM_CLICKED = exports.FOOTER_ITEM_CLICKED = 'FOOTER_ITEM_CLICKED';

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var UPLOAD_IMAGE = exports.UPLOAD_IMAGE = 'UPLOAD_IMAGE';
var CREATE_IMAGE = exports.CREATE_IMAGE = 'CREATE_IMAGE';
var CREATE_ARTWORK = exports.CREATE_ARTWORK = 'CREATE_ARTWORK';
var CLASSIFY_IMAGE = exports.CLASSIFY_IMAGE = 'CLASSIFY_IMAGE';
var CREATE_TAGS = exports.CREATE_TAGS = 'CREATE_TAGS';
var REJECT_TAG = exports.REJECT_TAG = 'REJECT_TAG';
var EXPLORE_BASED_ON_THIS_ARTWORK = exports.EXPLORE_BASED_ON_THIS_ARTWORK = 'EXPLORE_BASED_ON_THIS_ARTWORK';

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SIGN_IN_FORM_SUBMITTED = exports.SIGN_IN_FORM_SUBMITTED = 'SIGN_IN_FORM_SUBMITTED';

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SIGN_UP_FORM_SUBMITTED = exports.SIGN_UP_FORM_SUBMITTED = 'SIGN_UP_FORM_SUBMITTED';

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exploreBasedOnThisArtwork = exports.rejectTag = exports.createTags = exports.classifyImage = exports.createArtwork = exports.createImage = exports.uploadImage = undefined;

var _imageUploder = __webpack_require__(61);

var ImageUploaderActionTypes = _interopRequireWildcard(_imageUploder);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var uploadImage = exports.uploadImage = function uploadImage(image) {
    return {
        type: ImageUploaderActionTypes.UPLOAD_IMAGE,
        image: image
    };
};

var createImage = exports.createImage = function createImage(image, user) {
    return {
        type: ImageUploaderActionTypes.CREATE_IMAGE,
        image: image,
        user: user
    };
};

var createArtwork = exports.createArtwork = function createArtwork(image, user) {
    return {
        type: ImageUploaderActionTypes.CREATE_ARTWORK,
        image: image,
        user: user
    };
};

var classifyImage = exports.classifyImage = function classifyImage(image) {
    return {
        type: ImageUploaderActionTypes.CLASSIFY_IMAGE,
        image: image
    };
};

var createTags = exports.createTags = function createTags(artwork) {
    return {
        type: ImageUploaderActionTypes.CREATE_TAGS,
        artwork: artwork
    };
};

var rejectTag = exports.rejectTag = function rejectTag(tag) {
    return {
        type: ImageUploaderActionTypes.REJECT_TAG,
        tag: tag
    };
};

var exploreBasedOnThisArtwork = exports.exploreBasedOnThisArtwork = function exploreBasedOnThisArtwork(artwork) {
    return {
        type: ImageUploaderActionTypes.EXPLORE_BASED_ON_THIS_ARTWORK,
        artwork: artwork
    };
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onClickSubmit = undefined;

var _signIn = __webpack_require__(62);

var SignInActionTypes = _interopRequireWildcard(_signIn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var onClickSubmit = exports.onClickSubmit = function onClickSubmit() {
    return {
        type: SignInActionTypes.SIGN_IN_FORM_SUBMITTED
    };
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onClickSubmit = undefined;

var _signUp = __webpack_require__(63);

var SignUpActionTypes = _interopRequireWildcard(_signUp);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var onClickSubmit = exports.onClickSubmit = function onClickSubmit() {
    return {
        type: SignUpActionTypes.SIGN_UP_FORM_SUBMITTED
    };
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDropzone = __webpack_require__(84);

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _superagent = __webpack_require__(15);

var _superagent2 = _interopRequireDefault(_superagent);

var _semanticUiReact = __webpack_require__(5);

var _imageUploader_actions = __webpack_require__(64);

var ImageUploaderActions = _interopRequireWildcard(_imageUploader_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//ToDo: move to env var
var CLOUDINARY_UPLOAD_PRESET = 'iylswkmx';
var CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/hpvmvlpcu/image/upload';

var ImageUploader = function (_Component) {
    _inherits(ImageUploader, _Component);

    function ImageUploader(props) {
        _classCallCheck(this, ImageUploader);

        var _this = _possibleConstructorReturn(this, (ImageUploader.__proto__ || Object.getPrototypeOf(ImageUploader)).call(this, props));

        _this.state = props;
        _this.onImageDrop = _this.onImageDrop.bind(_this);
        _this.handleImageUpload = _this.handleImageUpload.bind(_this);
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
                if (response) {
                    _this2.saveImage(response);
                    if (response.body.secure_url !== '') {
                        _this2.setState({
                            uploadedFileCloudinaryUrl: response.body.secure_url
                        });
                    }
                }
            });
        }
    }, {
        key: 'saveImage',
        value: function saveImage(data) {
            var test = { "public_id": "jz6h0ldxnvay65oqihra",
                "version": 1498127607,
                "signature": "8c658775bd5e2d837ba7d76a0ef0b23be0b7b51f",
                "width": 686,
                "height": 800,
                "format": "jpg",
                "resource_type": "image",
                "created_at": "2017-06-22T10:33:27Z",
                "tags": [],
                "pages": 1,
                "bytes": 74855,
                "type": "upload",
                "etag": "3ad1a573b6f4326e0524c3fac3f0e071",
                "url": "http://res.cloudinary.com/hpvmvlpcu/image/upload/v1498127607/jz6h0ldxnvay65oqihra.jpg",
                "secure_url": "https://res.cloudinary.com/hpvmvlpcu/image/upload/v1498127607/jz6h0ldxnvay65oqihra.jpg",
                "image_metadata": {
                    "JFIFVersion": "1.01",
                    "ResolutionUnit": "inches",
                    "XResolution": "72",
                    "YResolution": "72",
                    "Colorspace": "GRAY"
                },
                "colors": [["#030303", 69.4], ["#F8F8F8", 27.8]],
                "predominant": {
                    "google": [["black", 69.4], ["white", 27.8]]
                },
                "phash": "d393644e93af2b90",
                "coordinates": {
                    "faces": []
                },
                "illustration_score": 1.0,
                "semi_transparent": false,
                "grayscale": true,
                "original_filename": "3998295_orig"
            };
            _superagent2.default.post('http://localhost:3030/api/images/create').set('Content-Type', 'application/json').send(JSON.stringify(data)).end(function (error, response) {
                if (!error && response) {
                    //Todo: Create ArtWork

                } else {
                    console.log('Error submitting your credentials', error);
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
                    this.state.uploadedFileCloudinaryUrl === '' ? null : _react2.default.createElement(
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
                            _react2.default.createElement('img', { src: this.state.uploadedFileCloudinaryUrl })
                        )
                    )
                )
            );
        }
    }]);

    return ImageUploader;
}(_react.Component);

ImageUploader.propTypes = {
    uploadImage: _propTypes2.default.func.isRequired,
    uploadedFileCloudinaryUrl: _propTypes2.default.any,
    uploadedFile: _propTypes2.default.any,
    createImage: _propTypes2.default.func.isRequired,
    createArtwork: _propTypes2.default.func.isRequired,
    classifyImage: _propTypes2.default.func.isRequired,
    createTags: _propTypes2.default.func.isRequired,
    rejectTag: _propTypes2.default.func.isRequired,
    exploreBasedOnThisArtwork: _propTypes2.default.func.isRequired,
    userInfo: _propTypes2.default.shape({
        id: _propTypes2.default.string,
        username: _propTypes2.default.string,
        firstName: _propTypes2.default.string,
        lastName: _propTypes2.default.string
    })
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        uploadImage: function uploadImage(image) {
            dispatch(ImageUploaderActions.uploadImage(image));
        },
        createImage: function createImage(image, user) {
            dispatch(ImageUploaderActions.createImage(image, user));
        },
        createArtwork: function createArtwork(image, user) {
            dispatch(ImageUploaderActions.createArtwork(image, user));
        },
        classifyImage: function classifyImage(image) {
            dispatch(ImageUploaderActions.classifyImage(image));
        },
        createTags: function createTags(artwork) {
            dispatch(ImageUploaderActions.createTags(artwork));
        },
        rejectTag: function rejectTag(tag) {
            dispatch(ImageUploaderActions.rejectTag(tag));
        },
        exploreBasedOnThisArtwork: function exploreBasedOnThisArtwork(artwork) {
            dispatch(ImageUploaderActions.exploreBasedOnThisArtwork(artwork));
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['ImageUploader']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImageUploader);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(5);

var _superagent = __webpack_require__(15);

var _superagent2 = _interopRequireDefault(_superagent);

var _reactRouterDom = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var token = __webpack_require__(18);

var SignIn = function (_Component) {
    _inherits(SignIn, _Component);

    function SignIn(props) {
        _classCallCheck(this, SignIn);

        var _this = _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call(this, props));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleTyping = _this.handleTyping.bind(_this);
        _this.state = {
            email: '',
            password: '',
            redirect: false
        };
        return _this;
    }

    _createClass(SignIn, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            //ToDo: ENV Path
            _superagent2.default.post('http://localhost:3030/api/v0/login').set('Content-Type', 'application/json').send(JSON.stringify(this.state)).end(function (error, response) {
                if (!error && response) {
                    _this2.setState({ redirect: true });
                } else {
                    console.log('Error submitting your credentials', error);
                }
            });
        }
    }, {
        key: 'handleTyping',
        value: function handleTyping(e) {
            e.preventDefault();
            var target = e.target;
            var value = target.value;
            var name = target.name;
            this.setState(_defineProperty({}, name, value));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Form,
                    { onSubmit: this.handleSubmit },
                    _react2.default.createElement(
                        _semanticUiReact.Form.Field,
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'Email'
                        ),
                        _react2.default.createElement('input', { placeholder: 'Email', name: 'email', value: this.state.email, onChange: this.handleTyping })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Form.Field,
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'Password'
                        ),
                        _react2.default.createElement('input', { placeholder: 'Password', name: 'password', value: this.state.password, type: 'password', onChange: this.handleTyping })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Button,
                        { type: 'submit' },
                        'Submit'
                    )
                ),
                this.state.redirect ? _react2.default.createElement(_reactRouterDom.Redirect, { to: '/profile' }) : ''
            );
        }
    }]);

    return SignIn;
}(_react.Component);

exports.default = SignIn;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(5);

var _superagent = __webpack_require__(15);

var _superagent2 = _interopRequireDefault(_superagent);

var _reactRouterDom = __webpack_require__(14);

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
        _this.handleAgree = _this.handleAgree.bind(_this);
        _this.state = {
            nameValid: true,
            emailValid: true,
            passwordsValid: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password_confirm: '',
            doAgree: false,
            redirect: false
        };
        return _this;
    }

    _createClass(SignUp, [{
        key: 'handleAgree',
        value: function handleAgree() {
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
                //ToDo: ENV Path
                _superagent2.default.post('http://localhost:3030/api/v0/register').set('Content-Type', 'application/json').send(JSON.stringify(this.state)).end(function (error, response) {
                    if (!error && response) {
                        _this2.setState({ redirect: true });
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
                'div',
                null,
                _react2.default.createElement(
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
                            'Invalid email format'
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
                        _react2.default.createElement(_semanticUiReact.Checkbox, { label: '* I agree to the Terms and Conditions', onClick: this.handleAgree, onChange: this.handleTyping, checked: this.state.doAgree, ref: 'doAgree', name: 'doAgree' })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Button,
                        { type: 'submit', disabled: !this.state.doAgree },
                        'Submit'
                    )
                ),
                this.state.redirect ? _react2.default.createElement(_reactRouterDom.Redirect, { to: '/profile' }) : ''
            );
        }
    }]);

    return SignUp;
}(_react.Component);

exports.default = SignUp;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(8);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(9);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(11);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(13);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(12);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(5);

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
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { clickMenuItem: clickMenuItem, updateUserInfo: updateUserInfo, setLoggedIn: setLoggedIn }),
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
    art: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        art: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Art);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(8);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(9);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(11);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(13);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(12);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(5);

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
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { clickMenuItem: clickMenuItem, updateUserInfo: updateUserInfo, setLoggedIn: setLoggedIn }),
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
    browse: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        browse: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Browse);

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(8);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(9);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(11);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _imageUploader_actions = __webpack_require__(64);

var ImageUploadCreators = _interopRequireWildcard(_imageUploader_actions);

var _nav = __webpack_require__(13);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(12);

var _footer2 = _interopRequireDefault(_footer);

var _imageUploader = __webpack_require__(67);

var _imageUploader2 = _interopRequireDefault(_imageUploader);

var _semanticUiReact = __webpack_require__(5);

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
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            var uploadImage = (0, _redux.bindActionCreators)(ImageUploadCreators.uploadImage, dispatch);
            var createImage = (0, _redux.bindActionCreators)(ImageUploadCreators.createImage, dispatch);
            var createArtwork = (0, _redux.bindActionCreators)(ImageUploadCreators.createArtwork, dispatch);
            var classifyImage = (0, _redux.bindActionCreators)(ImageUploadCreators.classifyImage, dispatch);
            var createTags = (0, _redux.bindActionCreators)(ImageUploadCreators.createTags, dispatch);
            var rejectTag = (0, _redux.bindActionCreators)(ImageUploadCreators.rejectTag, dispatch);
            var exploreBasedOnThisArtwork = (0, _redux.bindActionCreators)(ImageUploadCreators.exploreBasedOnThisArtwork, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { clickMenuItem: clickMenuItem, updateUserInfo: updateUserInfo, setLoggedIn: setLoggedIn }),
                    _react2.default.createElement(_imageUploader2.default, { uploadImage: uploadImage, createImage: createImage, createArtwork: createArtwork, classifyImage: classifyImage, createTags: createTags, rejectTag: rejectTag, exploreBasedOnThisArtwork: exploreBasedOnThisArtwork })
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return Home;
}(_react.Component);

Home.propTypes = {
    home: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        home: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Home);

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _art = __webpack_require__(70);

var _art2 = _interopRequireDefault(_art);

var _browse = __webpack_require__(71);

var _browse2 = _interopRequireDefault(_browse);

var _home = __webpack_require__(72);

var _home2 = _interopRequireDefault(_home);

var _signUp = __webpack_require__(76);

var _signUp2 = _interopRequireDefault(_signUp);

var _signIn = __webpack_require__(75);

var _signIn2 = _interopRequireDefault(_signIn);

var _profile = __webpack_require__(74);

var _profile2 = _interopRequireDefault(_profile);

var _reactRouterDom = __webpack_require__(14);

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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(8);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(9);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(11);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(13);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(12);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(5);

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
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { clickMenuItem: clickMenuItem, updateUserInfo: updateUserInfo, setLoggedIn: setLoggedIn }),
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
    profile: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        profile: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Profile);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(8);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(9);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(11);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _signIn_actions = __webpack_require__(65);

var SignInActionCreators = _interopRequireWildcard(_signIn_actions);

var _nav = __webpack_require__(13);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(12);

var _footer2 = _interopRequireDefault(_footer);

var _signInForm = __webpack_require__(68);

var _signInForm2 = _interopRequireDefault(_signInForm);

var _semanticUiReact = __webpack_require__(5);

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
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            var onClickSubmit = (0, _redux.bindActionCreators)(SignInActionCreators.onClickSubmit, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { clickMenuItem: clickMenuItem, updateUserInfo: updateUserInfo, setLoggedIn: setLoggedIn }),
                    _react2.default.createElement(_signInForm2.default, { onClickSubmit: onClickSubmit })
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return SignInPage;
}(_react.Component);

SignInPage.propTypes = {
    signIn: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        signIn: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SignInPage);

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(8);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(9);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(11);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _signUp_actions = __webpack_require__(66);

var SignUpActionCreators = _interopRequireWildcard(_signUp_actions);

var _nav = __webpack_require__(13);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(12);

var _footer2 = _interopRequireDefault(_footer);

var _signUpForm = __webpack_require__(69);

var _signUpForm2 = _interopRequireDefault(_signUpForm);

var _semanticUiReact = __webpack_require__(5);

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
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            var onClickSubmit = (0, _redux.bindActionCreators)(SignUpActionCreators.onClickSubmit, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, { clickMenuItem: clickMenuItem, updateUserInfo: updateUserInfo, setLoggedIn: setLoggedIn }),
                    _react2.default.createElement(_signUpForm2.default, { onClickSubmit: onClickSubmit })
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return SignUpPage;
}(_react.Component);

SignUpPage.propTypes = {
    signUp: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        signUp: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SignUpPage);

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Nav;

var _nav = __webpack_require__(20);

var NavActionTypes = _interopRequireWildcard(_nav);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    activeItem: 'home',
    isLoggedIn: false,
    sessionToken: '',
    userInfo: {
        id: '',
        username: '',
        firstName: '',
        lastName: ''
    }
};

function Nav() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case NavActionTypes.NAV_ITEM_CLICKED:
            return Object.assign({}, state, {
                activeItem: action.name
            });
        case NavActionTypes.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.data
            });
        case NavActionTypes.CHECK_LOGGED_IN:
            return Object.assign({}, state, {
                isLoggedIn: action.status
            });
        default:
            return state;
    }
}

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = require("nconf");

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("neo4j-driver");

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("swagger-node-express");

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("react-dropzone");

/***/ })
/******/ ]);