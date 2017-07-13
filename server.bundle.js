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
/******/ 	return __webpack_require__(__webpack_require__.s = 76);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sw = __webpack_require__(103);
var _ = __webpack_require__(0);

exports.writeResponse = function writeResponse(res, response, status) {
  sw.setHeaders(res);
  res.status(status || 200).send(JSON.stringify(response));
};

exports.writeError = function writeError(res, error, status) {
  sw.setHeaders(res);
  res.status(error.status || status || 400).send(JSON.stringify(_.omit(error, ['status'])));
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _randomstring = __webpack_require__(33);

var _randomstring2 = _interopRequireDefault(_randomstring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// neo4j_models cypher helper module
var nconf = __webpack_require__(20);

var neo4j = __webpack_require__(99).v1;
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


var _response = __webpack_require__(1);

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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(18).config();

var PathHelper = function () {
    function PathHelper() {
        _classCallCheck(this, PathHelper);

        this.baseUrl = "http://localhost";
        this.clientPort = "3000";
        this.apiPort = "3030";
        this.apiVersion = "v0";
    }

    _createClass(PathHelper, [{
        key: 'getAPIPath',
        value: function getAPIPath() {
            return this.baseUrl + ':' + this.apiPort + '/api/' + this.apiVersion;
        }
    }, {
        key: 'getClientPath',
        value: function getClientPath() {
            return this.baseUrl + ':' + this.clientPort;
        }
    }]);

    return PathHelper;
}();

var ph = new PathHelper();
module.exports = {
    apiPath: ph.getAPIPath(),
    clientPath: ph.getClientPath()
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
exports.signOut = exports.setLoggedIn = exports.updateUserInfo = exports.clickMenuItem = undefined;

var _nav = __webpack_require__(28);

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

var signOut = exports.signOut = function signOut() {
    return {
        type: NavActionTypes.SIGN_OUT
    };
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickFooterItem = undefined;

var _footer = __webpack_require__(26);

var FooterActionTypes = _interopRequireWildcard(_footer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var clickFooterItem = exports.clickFooterItem = function clickFooterItem() {
    return {
        type: FooterActionTypes.FOOTER_ITEM_CLICKED
    };
};

/***/ }),
/* 15 */
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

var _reactRouterDom = __webpack_require__(12);

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
/* 16 */
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

var _reactRouterDom = __webpack_require__(12);

var _superagent = __webpack_require__(13);

var _superagent2 = _interopRequireDefault(_superagent);

var _nav_actions = __webpack_require__(11);

var NavActions = _interopRequireWildcard(_nav_actions);

var _pathHelper = __webpack_require__(9);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var token = __webpack_require__(17);

//ToDo: Add Icon to signed in nav

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
            _superagent2.default.get(_pathHelper2.default.apiPath + '/users/me').set({ Accept: 'application/json', Authorization: 'Token ' + this.sessionToken }).end(function (error, response) {
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
                        'Home'
                    ),
                    !this.state.isLoggedIn && _react2.default.createElement(
                        _semanticUiReact.Menu.Menu,
                        { position: 'right' },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '/sign-in', className: this.state.activeItem === 'sign-in' ? 'active item' : 'item', onClick: function onClick() {
                                    return _this3.props.clickMenuItem('sign-in');
                                } },
                            'Sign In'
                        ),
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '/sign-up', className: this.state.activeItem === 'sign-up' ? 'active item' : 'item', onClick: function onClick() {
                                    return _this3.props.clickMenuItem('sign-up');
                                } },
                            'Sign Up'
                        )
                    ),
                    this.state.isLoggedIn && _react2.default.createElement(
                        _semanticUiReact.Menu.Menu,
                        { position: 'right' },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '/', className: 'item', onClick: function onClick() {
                                    return _this3.props.signOut();
                                } },
                            'Sign Out'
                        ),
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
    signOut: _propTypes2.default.func.isRequired,
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
        },
        signOut: function signOut() {
            dispatch(NavActions.signOut());
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setToken = function setToken(token) {
    if (token) {
        window.localStorage.setItem('token', token);
    }
};

var getToken = function getToken() {
    return window.localStorage.getItem('token');
};

var removeToken = function removeToken() {
    return window.localStorage.removeItem('token');
};

module.exports = {
    setToken: setToken,
    getToken: getToken,
    removeToken: removeToken
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id'],
        'word': _node.properties['word'],
        'ontology': _node.properties['ontology']
    });
};

exports.default = Tag;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _nconf = __webpack_require__(98);

var _nconf2 = _interopRequireDefault(_nconf);

var _pathHelper = __webpack_require__(9);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(18).config();

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
        default: "3030"
    },
    'n': {
        alias: "neo4j",
        describe: "Use local or remote neo4j_models instance",
        demand: false,
        default: "local"
    }
}).defaults({
    'USERNAME': "app70733835-lB9UI5",
    'PASSWORD': "b.hJ6pRhoGj54M.Hk1e0BX319d0kqWk",
    'neo4j': 'remote',
    'neo4j-local': 'bolt://localhost:7687',
    'neo4j-remote': "bolt://hobby-cbbfmanbjildgbkejbmdblpl.dbs.graphenedb.com:24786",
    'base_url': _pathHelper2.default.apiPath,
    'api_path': '/api/' + "v0"
});

module.exports = _nconf2.default;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id'],
        'signature': _node.properties['signature'],
        'width': _node.properties['width'],
        'height': _node.properties['height'],
        'format': _node.properties['format'],
        'url': _node.properties['url'],
        'secure_url': _node.properties['secure_url'],
        'JFIFVersion': _node.properties['JFIFVersion'],
        'colors': _node.properties['colors'],
        'predominant': _node.properties['predominant'],
        'phash': _node.properties['phash'],
        'illustration_score': _node.properties['illustration_score'],
        'grayscale': _node.properties['grayscale'],
        'original_filename': _node.properties['original_filename'],
        'classification': _node.properties['classification']
    });
};

exports.default = Image;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _randomstring = __webpack_require__(33);

var _randomstring2 = _interopRequireDefault(_randomstring);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _user = __webpack_require__(23);

var _user2 = _interopRequireDefault(_user);

var _crypto = __webpack_require__(97);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var register = function register(session, email, password, firstName, lastName) {
    return session.run('MATCH (user:User {email: {email}}) RETURN user', { email: email }).then(function (results) {
        if (!_lodash2.default.isEmpty(results.records)) {
            throw { err: 'username already in use', status: 400 };
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOAD_ARTWORK = exports.LOAD_ARTWORK = 'LOAD_ARTWORK';
var USER_NAME_CLICKED = exports.USER_NAME_CLICKED = 'USER_NAME_CLICKED';
var MORE_LIKE_THIS = exports.MORE_LIKE_THIS = ' MORE_LIKE_THIS';
var BROWSE_BASED_ON_THIS = exports.BROWSE_BASED_ON_THIS = 'BROWSE_BASED_ON_THIS';
var RELATED_TO_ME = exports.RELATED_TO_ME = 'RELATED_TO_ME';

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FOOTER_ITEM_CLICKED = exports.FOOTER_ITEM_CLICKED = 'FOOTER_ITEM_CLICKED';

/***/ }),
/* 27 */
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
var CLASSIFICATION_TO_TAGS = exports.CLASSIFICATION_TO_TAGS = 'CLASSIFICATION_TO_TAGS';
var VISUAL_RECOGNITION = exports.VISUAL_RECOGNITION = 'VISUAL_RECOGNITION';
var ENRICH_NEW_TAG = exports.ENRICH_NEW_TAG = 'ENRICH_NEW_TAG';
var GET_NEW_TAG_ONTOLOGY = exports.GET_NEW_TAG_ONTOLOGY = 'GET_NEW_TAG_ONTOLOGY';
var MAKE_MEANING = exports.MAKE_MEANING = 'MAKE_MEANING';

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NAV_ITEM_CLICKED = exports.NAV_ITEM_CLICKED = 'NAV_ITEM_CLICKED';
var UPDATE_USER_INFO = exports.UPDATE_USER_INFO = 'UPDATE_USER_INFO';
var CHECK_LOGGED_IN = exports.CHECK_LOGGED_IN = 'CHECK_LOGGED_IN';
var SIGN_OUT = exports.SIGN_OUT = 'SIGN_OUT';

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SIGN_IN_FORM_SUBMITTED = exports.SIGN_IN_FORM_SUBMITTED = 'SIGN_IN_FORM_SUBMITTED';

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SIGN_UP_FORM_SUBMITTED = exports.SIGN_UP_FORM_SUBMITTED = 'SIGN_UP_FORM_SUBMITTED';

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userNameClicked = exports.moreLikeThis = exports.relatedToMe = exports.browseBasedOnThis = exports.loadArtwork = undefined;

var _artwork = __webpack_require__(25);

var ArtworkActionTypes = _interopRequireWildcard(_artwork);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var loadArtwork = exports.loadArtwork = function loadArtwork(data) {
    return {
        type: ArtworkActionTypes.LOAD_ARTWORK,
        data: data
    };
};

var browseBasedOnThis = exports.browseBasedOnThis = function browseBasedOnThis() {
    return {
        type: ArtworkActionTypes.BROWSE_BASED_ON_THIS
    };
};

var relatedToMe = exports.relatedToMe = function relatedToMe() {
    return {
        type: ArtworkActionTypes.RELATED_TO_ME
    };
};

var moreLikeThis = exports.moreLikeThis = function moreLikeThis() {
    return {
        type: ArtworkActionTypes.MORE_LIKE_THIS
    };
};

var userNameClicked = exports.userNameClicked = function userNameClicked() {
    return {
        type: ArtworkActionTypes.USER_NAME_CLICKED
    };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeMeaning = exports.getNewTagOntology = exports.enrichNewTag = exports.visualRecognition = exports.classificationToTags = exports.exploreBasedOnThisArtwork = exports.createTag = exports.classifyImage = exports.createArtwork = exports.createImage = exports.uploadImage = undefined;

var _imageUploder = __webpack_require__(27);

var ImageUploaderActionTypes = _interopRequireWildcard(_imageUploder);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var uploadImage = exports.uploadImage = function uploadImage(image) {
    return {
        type: ImageUploaderActionTypes.UPLOAD_IMAGE,
        image: image
    };
};

var createImage = exports.createImage = function createImage(image) {
    return {
        type: ImageUploaderActionTypes.CREATE_IMAGE,
        image: image
    };
};

var createArtwork = exports.createArtwork = function createArtwork(imageId, userId) {
    return {
        type: ImageUploaderActionTypes.CREATE_ARTWORK,
        imageId: imageId,
        userId: userId
    };
};

var classifyImage = exports.classifyImage = function classifyImage(recognition, imageId) {
    return {
        type: ImageUploaderActionTypes.CLASSIFY_IMAGE,
        recognition: recognition,
        imageId: imageId
    };
};

var createTag = exports.createTag = function createTag(word) {
    return {
        type: ImageUploaderActionTypes.CREATE_TAGS,
        word: word
    };
};

var exploreBasedOnThisArtwork = exports.exploreBasedOnThisArtwork = function exploreBasedOnThisArtwork(artwork) {
    return {
        type: ImageUploaderActionTypes.EXPLORE_BASED_ON_THIS_ARTWORK,
        artwork: artwork
    };
};

var classificationToTags = exports.classificationToTags = function classificationToTags(classification) {
    return {
        type: ImageUploaderActionTypes.CLASSIFICATION_TO_TAGS,
        classification: classification
    };
};

var visualRecognition = exports.visualRecognition = function visualRecognition(url) {
    return {
        type: ImageUploaderActionTypes.VISUAL_RECOGNITION,
        url: url
    };
};

var enrichNewTag = exports.enrichNewTag = function enrichNewTag(tag) {
    return {
        type: ImageUploaderActionTypes.ENRICH_NEW_TAG,
        tag: tag
    };
};

var getNewTagOntology = exports.getNewTagOntology = function getNewTagOntology(tag) {
    return {
        type: ImageUploaderActionTypes.ENRICH_NEW_TAG,
        tag: tag
    };
};

var makeMeaning = exports.makeMeaning = function makeMeaning(tag) {
    return {
        type: ImageUploaderActionTypes.MAKE_MEANING,
        tag: tag
    };
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("randomstring");

/***/ }),
/* 34 */
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _response = __webpack_require__(1);

var _response2 = _interopRequireDefault(_response);

var _users = __webpack_require__(24);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.images = __webpack_require__(64);
exports.journeys = __webpack_require__(65);
exports.locations = __webpack_require__(66);
exports.meanings = __webpack_require__(67);
exports.notebooks = __webpack_require__(68);
exports.pages = __webpack_require__(69);
exports.quests = __webpack_require__(70);
exports.schemata = __webpack_require__(71);
exports.suggestions = __webpack_require__(72);
exports.tags = __webpack_require__(73);
exports.users = __webpack_require__(74);
exports.works = __webpack_require__(75);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(21);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(102);

var _server = __webpack_require__(100);

var _server2 = _interopRequireDefault(_server);

var _index = __webpack_require__(93);

var _index2 = _interopRequireDefault(_index);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(8);

var _ioc = __webpack_require__(86);

var _ioc2 = _interopRequireDefault(_ioc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('*', function (req, res) {
    var context = {};
    var store = (0, _redux.createStore)(_index2.default);
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
    return '\n        <!doctype html>\n        <html lang="en">\n        <head>\n            <meta charset="utf-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n            <title>IoC Prototype</title>\n            <script src="https://use.typekit.net/ipx6imu.js"></script>\n            <script>try{Typekit.load({ async: true });}catch(e){}</script>\n            <base href="/" />\n        </head>\n        <body>\n        <div id="ioc-app"><div>' + html + '</div></div>\n        <script>\n            window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n        </script>\n        <script type=text/javascript src="../bin/app.bundle.js"></script>\n        </body>\n        </html>';
}
//ToDo: Webpack or API to serve favicon.

exports.default = router;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("swagger-jsdoc");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var suggestionData = {
    person: {
        actions: [{
            actionKey: 'draw',
            prompt: 'Draw a portrait of %^person^%',
            qualifiers: [{
                schema: 'person',
                qualifier: ' in the style or from the perspective of %^person^%.'
            }, {
                schema: 'person',
                qualifier: ' and %^person^%.'
            }, {
                schema: 'place',
                qualifier: ' in %^place^%.'
            }, {
                schema: 'species',
                qualifier: ' as a %^species^%.'
            }, {
                schema: 'species',
                qualifier: ' with a %^species^%.'
            }, {
                schema: 'work',
                qualifier: ' in the style of %^work^%.'
            }, {
                schema: 'timePeriod',
                qualifier: ' in the %^timePeriod^%.'
            }, {
                schema: 'colour',
                qualifier: ' using lots of %^colour^%.'
            }, {
                schema: 'colour',
                qualifier: ' using only %^colour^% and %^colour^%.'
            }, {
                schema: 'colour',
                qualifier: ' using only %^colour^%, %^colour^% and %^colour^%.'
            }, {
                schema: 'colour',
                qualifier: ' using only %^colour^%, %^colour^%, %^colour^% and %^colour^%.'
            }, {
                schema: 'device',
                qualifier: ' holding %&a&% %^device^%.'
            }, {
                schema: 'device',
                qualifier: ' using %&a&% %^device^%.'
            }, {
                schema: 'device',
                qualifier: ' as a %&a&% %^device^%.'
            }]
        }, {
            actionKey: 'write',
            prompt: 'In the style of %person^'
        }]
    },
    place: {},
    species: {},
    work: {},
    topicalConcept: {},
    timePeriod: {},
    colour: {},
    device: {},
    event: {},
    food: {}
};

module.exports = {
    suggestionData: suggestionData
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _image = __webpack_require__(22);

var _image2 = _interopRequireDefault(_image);

var _tag = __webpack_require__(19);

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locate = function locate(session) {};

var classify = function classify(session, imageId, recognition) {
    return session.run('MATCH (i { id: {imageId}}) SET i.classification = {recognition} RETURN i', { imageId: imageId, recognition: recognition }).then(function (results) {
        return new _image2.default(results.records[0].get('i'));
    });
};

var create = function create(session, signature, userId, width, height, format, url, secure_url, JFIFVersion, colors, predominant, phash, illustration_score, grayscale, original_filename) {
    var imageId = _uuid2.default.v4();
    return session.run('MATCH (image:Image {url:{url}}) RETURN image', { url: url }).then(function (results) {
        if (!_lodash2.default.isEmpty(results.records)) {
            throw { url: 'Image already in use', status: 400 };
        } else {
            return session.run('CREATE (image:Image {id: {id}, ' + ' signature:{signature},' + ' width:{width},' + ' height:{height},' + ' format:{format},' + ' url:{url},' + ' secure_url:{secure_url},' + ' JFIFVersion:{JFIFVersion},' + ' colors:{colors},' + ' predominant:{predominant},' + ' phash:{phash},' + ' illustration_score:{illustration_score}, ' + ' grayscale:{grayscale}, ' + ' original_filename:{original_filename}, ' + ' classification:{classification} } ) ' + ' RETURN image ', {
                id: imageId,
                signature: signature,
                width: width,
                height: height,
                format: format,
                url: url,
                secure_url: secure_url,
                JFIFVersion: JFIFVersion,
                colors: colors,
                predominant: predominant,
                phash: phash,
                illustration_score: illustration_score,
                grayscale: grayscale,
                original_filename: original_filename,
                classification: ''
            });
        }
    }).then(function (results) {
        var imgResults = results;
        return session.run('MATCH (image:Image {id:{imageId}}) CREATE(user {id:{userId}})-[:UPLOADED]->(image)', { imageId: imageId, userId: userId }).then(function (mResults) {
            return new _image2.default(imgResults.records[0].get('image'));
        });
    });
};

var update = function update(session) {};

var deletion = function deletion(session, imageId, userId) {
    //ToDo: Ensure user id is the creator amd then delete
    //MATCH (i:Image {id:'e420d9e7-0ba9-4b49-bc86-7e509307c753'}) OPTIONAL MATCH (i)-[r]-() DELETE i,r
};

var getTags = function getTags(session, imageId) {
    return session.run('MATCH (image:Image {id:{imageId}})-[:ASSOCIATED_WITH]->(t) MATCH (tag:Tag {id:t.id}) RETURN tag', { imageId: imageId }).then(function (results) {
        var imageTags = [];
        for (var i = 0; i < results.records.length; i++) {
            var aTag = new _tag2.default(results.records[i].get('tag'));
            imageTags.push(aTag);
        }
        return imageTags;
    });
};

module.exports = {
    locate: locate,
    classify: classify,
    create: create,
    update: update,
    deletion: deletion,
    getTags: getTags
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _journey = __webpack_require__(48);

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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _location = __webpack_require__(49);

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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _meaning = __webpack_require__(50);

var _meaning2 = _interopRequireDefault(_meaning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoCSeed = __webpack_require__(43);

var matchClassifications = function matchClassifications(classes) {
    if (!classes || !classes.length) {
        return 'none';
    } else {
        var schemas = [];
        for (var i in IoCSeed.suggestionData) {
            if (IoCSeed.suggestionData.hasOwnProperty(i)) {
                schemas.push(i.toString().toLowerCase());
            }
        }
        for (var c = 0; c < classes.length; c++) {
            var l = classes[c].label;
            if (schemas.indexOf(l) !== -1) {
                return l;
            }
        }
    }
};

var extractFromTag = function extractFromTag(session, tagId, ontology) {
    var meanings = [];
    for (var i = 0; i < ontology.results.length; i++) {
        var meaning = {
            id: _uuid2.default.v4(),
            label: ontology.results[i].label,
            description: ontology.results[i].description,
            sourceURI: ontology.results[i].sourceURI,
            schemaName: matchClassifications(ontology.results[i].classes)
        };
        meanings.push(meaning);
    }
    return session.run('UNWIND {meanings} AS map MATCH(tag:Tag {id:{tagId}}) CREATE (m:Meaning)-[:DERIVED_FROM]->(tag) SET m=map RETURN map', { meanings: meanings, tagId: tagId }).then(function (results) {
        return results.records[0].get('map');
    });
};

var update = function update(session) {};

var deletion = function deletion(session) {};

module.exports = {
    extractFromTag: extractFromTag,
    update: update,
    deletion: deletion
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Journey = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Journey;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Location = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Location;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Meaning = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id'],
        'label': _node.properties['label'],
        'description': _node.properties['description'],
        'sourceURI': _node.properties['sourceURI'],
        'schemaName': _node.properties['schemaName']
    });
};

exports.default = Meaning;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notebook = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Notebook;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Page;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quest = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Quest;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id'],
        'schemaName': _node.properties['schemaName']
    });
};

exports.default = Schema;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Suggestion = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Suggestion;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Work = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id']
    });
};

exports.default = Work;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _notebook = __webpack_require__(51);

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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _page = __webpack_require__(52);

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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _quest = __webpack_require__(53);

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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _schema = __webpack_require__(54);

var _schema2 = _interopRequireDefault(_schema);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session, schemaName) {
    var schemaId = _uuid2.default.v4();
    return session.run('MATCH (schema:Schema {schemaName:{schemaName}}) RETURN schema', { schemaName: schemaName }).then(function (results) {
        if (!_lodash2.default.isEmpty(results.records)) {
            return new _schema2.default(results.records[0].get('schema'));
        } else {
            return session.run('CREATE (schema:Schema {id: {id}, schemaName:{schemaName}) RETURN schema', { id: schemaId, schemaName: schemaName }).then(function (results) {
                return new _schema2.default(results.records[0].get('schema'));
            });
        }
    });
};

var update = function update(session) {};

var deletion = function deletion(session) {};

var bindTag = function bindTag(session) {};

var bindMeaning = function bindMeaning(session) {};

var seed = function seed(session, schemata) {
    for (var i = 0; i < schemata.length; i++) {
        schemata[i].id = _uuid2.default.v4();
    }
    return session.run('MATCH (schema:Schema {schemaName:{schemaName}}) RETURN schema', { schemaName: schemata[0].schemaName }).then(function (results) {
        if (!_lodash2.default.isEmpty(results.records)) {
            console.log('schema present. checked ', schemata[0].schemaName);
        } else {
            return session.run('UNWIND {schemata} AS map CREATE (s:Schema) SET s=map', { schemata: schemata }).then(function (results) {
                console.log('schema initialized', results);
            });
        }
    });
};

module.exports = {
    bindTag: bindTag,
    bindMeaning: bindMeaning,
    create: create,
    update: update,
    deletion: deletion,
    seed: seed
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _suggestion = __webpack_require__(55);

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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _tag = __webpack_require__(19);

var _tag2 = _interopRequireDefault(_tag);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session, word) {
    var tagId = _uuid2.default.v4();
    return session.run('MATCH (tag:Tag {word:{word}}) RETURN tag', { word: word }).then(function (results) {
        if (!_lodash2.default.isEmpty(results.records)) {
            return new _tag2.default(results.records[0].get('tag'));
        } else {
            return session.run('CREATE (tag:Tag {id: {id}, word:{word}, ontology:{ontology}}) RETURN tag', { id: tagId, word: word, ontology: "{}" }).then(function (results) {
                return new _tag2.default(results.records[0].get('tag'));
            });
        }
    });
};

var createFromImage = function createFromImage(session, word, imageId) {
    var tagId = _uuid2.default.v4();
    return session.run('MATCH (tag:Tag {word:{word}}) RETURN tag', { word: word }).then(function (results) {
        if (!_lodash2.default.isEmpty(results.records)) {
            return session.run('MATCH (tag:Tag {id:{tagId}}) MATCH (image:Image {id:{imageId}}) CREATE(image)-[:ASSOCIATED_WITH]->(tag) RETURN tag', { imageId: imageId, tagId: tagId }).then(function (tResults) {
                return new _tag2.default(results.records[0].get('tag'));
            });
        } else {
            return session.run('CREATE (tag:Tag {id: {id}, word:{word}, ontology:{ontology}}) RETURN tag', { id: tagId, word: word, ontology: "{}" }).then(function (results) {
                var tagResults = results;
                return session.run('MATCH (tag:Tag {id:{tagId}}) MATCH (image:Image {id:{imageId}}) CREATE(image)-[:ASSOCIATED_WITH]->(tag) RETURN tag', { imageId: imageId, tagId: tagId }).then(function (tResults) {
                    return new _tag2.default(tagResults.records[0].get('tag'));
                });
            });
        }
    });
};

var tagItem = function tagItem(session) {};

var enrich = function enrich(session, info, word, id) {
    return session.run('MATCH (tag:Tag {id:{id},word:{word}}) SET tag.ontology = {info} RETURN tag', { word: word, id: id, info: info }).then(function (results) {
        return new _tag2.default(results.records[0].get('tag'));
    });
};

var update = function update(session) {};

var deletion = function deletion(session) {};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    enrich: enrich,
    tagItem: tagItem,
    createFromImage: createFromImage
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _work = __webpack_require__(56);

var _work2 = _interopRequireDefault(_work);

var _image = __webpack_require__(22);

var _image2 = _interopRequireDefault(_image);

var _user = __webpack_require__(23);

var _user2 = _interopRequireDefault(_user);

var _tag = __webpack_require__(19);

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session, imageId, userId) {
    var artworkId = _uuid2.default.v4();
    return session.run('CREATE (work:Work {id: {id}}) RETURN work', { id: artworkId }).then(function (results) {
        var artResults = results;
        return session.run('MATCH (work:Work {id:{artworkId}}) CREATE(user {id:{userId}})-[:CREATED]->(work) CREATE(image {id:{imageId}})-[:DISPLAYS]->(work)', {
            artworkId: artworkId,
            userId: userId,
            imageId: imageId
        }).then(function (thirdResults) {
            return session.run('MATCH (w:Work {id:{artworkId}}) MATCH (i:Image {id:{imageId}}) MATCH (i)-[:ASSOCIATED_WITH]->(t) WITH collect(t) as endNodes,w FOREACH(x in endNodes | CREATE (w)-[:ASSOCIATED_WITH]->(x))', { artworkId: artworkId, imageId: imageId }).then(function (fourthResults) {
                return new _work2.default(artResults.records[0].get('work'));
            });
        });
    });
};

var update = function update(session) {};

var deletion = function deletion(session) {};
var display = function display(session, workId) {
    return session.run('MATCH (work:Work {id:{id}})<-[:DISPLAYS]-(i) MATCH (work:Work {id:{id}})<-[:CREATED]-(u) MATCH (work:Work {id:{id}})-[:ASSOCIATED_WITH]->(t) MATCH(tag:Tag {id:t.id}) MATCH (user:User {id:u.id}) MATCH (image:Image {id:i.id}) RETURN work, image, user, tag', { id: workId }).then(function (results) {
        var workTags = [];
        for (var i = 0; i < results.records.length; i++) {
            var aTag = new _tag2.default(results.records[i].get('tag'));
            workTags.push(aTag);
        }
        return {
            work: new _work2.default(results.records[0].get('work')),
            image: new _image2.default(results.records[0].get('image')),
            user: new _user2.default(results.records[0].get('user')),
            tags: workTags
        };
    });
};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    display: display
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Images = __webpack_require__(44),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);

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
 *     description: Applies the Classification Data to an image.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *              imageId: Image being classified
 *              recognition: object returned by Watson
 *     responses:
 *       201:
 *         description: Classification Data
 *       400:
 *         description: Error message(s)
 */

exports.classify = function (req, res, next) {
  var imageId = _.get(req.body, 'imageId');
  var recognition = _.get(req.body, 'recognition');
  Images.classify(dbUtils.getSession(req), imageId, recognition).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

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
 *             signature:
 *               type: string
 *             width:
 *               type: int
 *             height:
 *               type: int
 *             format:
 *               type: string
 *             url:
 *               type: string
 *             secure_url:
 *               type: string
 *             JFIFVersion:
 *               type: string
 *             colors:
 *               type:string
 *             predominat:
 *               type: string
 *             phash:
 *               type: string
 *             illustration_score:
 *               type: float
 *             grayscale:
 *               type: object
 *             original_filename:
 *               type: string
 *             userId:
 *               type: string
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.create = function (req, res, next) {
  var signature = _.get(req.body, 'signature');
  var userId = _.get(req.body, 'userId');
  var width = _.get(req.body, 'width');
  var height = _.get(req.body, 'height');
  var format = _.get(req.body, 'format');
  var url = _.get(req.body, 'url');
  var secure_url = _.get(req.body, 'secure_url');
  var JFIFVersion = _.get(req.body, 'JFIFVersion');
  var colors = _.get(req.body, 'colors');
  var predominant = _.get(req.body, 'predominant');
  var phash = _.get(req.body, 'phash');
  var illustration_score = _.get(req.body, 'illustration_score');
  var grayscale = _.get(req.body, 'grayscale');
  var original_filename = _.get(req.body, 'original_filename');
  Images.create(dbUtils.getSession(req), signature, userId, width, height, format, url, secure_url, JFIFVersion, colors, predominant, phash, illustration_score, grayscale, original_filename).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

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

exports.deletion = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/images/getTags:
 *   post:
 *     tags:
 *     - images
 *     description: Returns the tags for a given image
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

exports.getTags = function (req, res, next) {
  var imageId = _.get(req.body, 'imageId');
  Images.getTags(dbUtils.getSession(req), imageId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Journeys = __webpack_require__(45),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);

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

exports.deletion = function (req, res, next) {};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Locations = __webpack_require__(46),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);

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

exports.deletion = function (req, res, next) {};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Meanings = __webpack_require__(47),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);

/**
 * @swagger
 * definition:
 *   Meaning:
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
 * /api/v0/meanings/extract-from-tag:
 *   post:
 *     tags:
 *     - meanings
 *     description: Creates a new meaning from a tag's ontology
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

exports.extractFromTag = function (req, res, next) {
  var tagId = _.get(req.body, 'tagId');
  var ontology = _.get(req.body, 'ontology');
  Meanings.extractFromTag(dbUtils.getSession(req), tagId, ontology).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/**
 * @swagger
 * /api/v0/meanings/update:
 *   post:
 *     tags:
 *     - meanings
 *     description: Updates an meaning
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
 * /api/v0/meanings/delete:
 *   post:
 *     tags:
 *     - meanings
 *     description: Deletes an meaning
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

exports.deletion = function (req, res, next) {};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Notebooks = __webpack_require__(57),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);

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

exports.deletion = function (req, res, next) {};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Pages = __webpack_require__(58),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);

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

exports.deletion = function (req, res, next) {};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Quests = __webpack_require__(59),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);

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

exports.deletion = function (req, res, next) {};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schemata = __webpack_require__(60),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);

/**
 * @swagger
 * definition:
 *   Schema:
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
 * /api/v0/schemata/create:
 *   post:
 *     tags:
 *     - schemata
 *     description: Creates a new schema
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
 * /api/v0/schemata/update:
 *   post:
 *     tags:
 *     - schemata
 *     description: Updates an schema
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
 * /api/v0/schemata/delete:
 *   post:
 *     tags:
 *     - schemata
 *     description: Deletes an schema
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

exports.deletion = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/schemata/bind-tag:
 *   post:
 *     tags:
 *     - schemata
 *     description: Associates a schema to a tag
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

exports.bindTag = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/schemata/bind-meaning:
 *   post:
 *     tags:
 *     - schemata
 *     description: Associates a schema to a meaning
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

exports.bindMeaning = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/schemata/seed:
 *   post:
 *     tags:
 *     - schemata
 *     description: Checks to see if schemata are in db if not seed them from config
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

exports.seed = function (req, res, next) {
  var schemata = _.get(req.body, 'schemata');
  Schemata.seed(dbUtils.getSession(req), schemata).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Suggestions = __webpack_require__(61),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);

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
 * /api/v0/suggestions/create-from-tag:
 *   post:
 *     tags:
 *     - suggestions
 *     description: Creates a new suggestion from a tag
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

exports.createFromTag = function (req, res, next) {};

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

exports.deletion = function (req, res, next) {};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Tags = __webpack_require__(62),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);

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
 *              word:
 *                  type:string
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */
exports.create = function (req, res, next) {
  var word = _.get(req.body, 'word');
  Tags.create(dbUtils.getSession(req), word).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};
/**
 * @swagger
 * /api/v0/tags/createFromImage:
 *   post:
 *     tags:
 *     - tags
 *     description: Creates a new tag in association with a newly uploaded image
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *              word:
 *                  type:string
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */
exports.createFromImage = function (req, res, next) {
  var word = _.get(req.body, 'word');
  var imageId = _.get(req.body, 'imageId');
  Tags.createFromImage(dbUtils.getSession(req), word, imageId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};
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

exports.deletion = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/tags/enrich:
 *   post:
 *     tags:
 *     - tags
 *     description: Applies semantic data to tag.
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
exports.enrich = function (req, res, next) {
  var data = JSON.parse(req.body.text);
  var info = data.info;
  var word = data.word;
  var id = data.id;
  Tags.enrich(dbUtils.getSession(req), info, word, id).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};
/**
 * @swagger
 * /api/v0/tags/tagItem:
 *   post:
 *     tags:
 *     - tags
 *     description: Relates a tag to the provided content
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
exports.tagItem = function (req, res, next) {};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Users = __webpack_require__(24),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);
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

/**
 * @swagger
 * /api/v0/user/delete:
 *   post:
 *     tags:
 *     - tags
 *     description: Deletes a user
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

exports.deletion = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/user/update:
 *   post:
 *     tags:
 *     - tags
 *     description: Updates a user
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

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Works = __webpack_require__(63),
    writeResponse = __webpack_require__(1).writeResponse,
    writeError = __webpack_require__(1).writeError,
    loginRequired = __webpack_require__(4),
    dbUtils = __webpack_require__(3),
    _ = __webpack_require__(0);

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

exports.create = function (req, res, next) {
  var imageId = _.get(req.body, 'imageId');
  var userId = _.get(req.body, 'userId');
  Works.create(dbUtils.getSession(req), imageId, userId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};
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

exports.deletion = function (req, res, next) {};

/**
 * @swagger
 * /api/v0/works/display:
 *   post:
 *     tags:
 *     - works
 *     description: Displays a work for the creator of that work with editing capabilities.
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

exports.display = function (req, res, next) {
  var workId = _.get(req.body, 'workId');
  Works.display(dbUtils.getSession(req), workId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(21);

var _express2 = _interopRequireDefault(_express);

var _index = __webpack_require__(37);

var _index2 = _interopRequireDefault(_index);

var _neo4j = __webpack_require__(20);

var _neo4j2 = _interopRequireDefault(_neo4j);

var _methodOverride = __webpack_require__(39);

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _swaggerJsdoc = __webpack_require__(42);

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _bodyParser = __webpack_require__(38);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _setAuthUser = __webpack_require__(35);

var _setAuthUser2 = _interopRequireDefault(_setAuthUser);

var _neo4jSessionCleanup = __webpack_require__(34);

var _neo4jSessionCleanup2 = _interopRequireDefault(_neo4jSessionCleanup);

var _response = __webpack_require__(1);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(18).config();
var PathHelper = __webpack_require__(9);

var request = __webpack_require__(41);
var path = __webpack_require__(40);

var routes = __webpack_require__(36);

var app = (0, _express2.default)();
var api = (0, _express2.default)();

var swaggerDefinition = {
    info: {
        title: 'Ioc Prototype',
        version: '0.0.1',
        description: 'MSK AI assisted creativity enhancer.'
    },
    host: PathHelper.clientPath,
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
app.use(_bodyParser2.default.urlencoded({ extended: true }));

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
// ***************************
// * Users
// ***************************
api.post('/api/' + "v0" + '/register', routes.users.register);
api.post('/api/' + "v0" + '/login', routes.users.login);
api.get('/api/' + "v0" + '/users/me', routes.users.me);
api.post('/api/' + "v0" + '/users/update', routes.users.update);
api.post('/api/' + "v0" + '/users/delete', routes.users.deletion);

// ***************************
// * Images
// ***************************
api.post('/api/' + "v0" + '/images/create', routes.images.create);
api.post('/api/' + "v0" + '/images/classify', routes.images.classify);

//ToDo: Make Classifers db object to add dynamically

api.post('/api/' + "v0" + '/watson/visual-recognition', function (req, res) {
    request.get("https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify" + '?api_key=' + "740e730146842a65b4fd1403a6d953fe581da7da" + '&url=' + req.body.url + '&owners=me&classifier_ids=default,moleskine_71136762&version=2016-05-20', function (err, r) {
        res.send(r.body);
    });
});
api.post('/api/' + "v0" + '/images/update', routes.images.update);
api.post('/api/' + "v0" + '/images/delete', routes.images.deletion);
api.post('/api/' + "v0" + '/images/locate', routes.images.locate);
api.post('/api/' + "v0" + '/images/get-tags', routes.images.getTags);
// ***************************
// * Notebooks
// ***************************
api.post('/api/' + "v0" + '/notebooks/create', routes.notebooks.create);
api.post('/api/' + "v0" + '/notebooks/update', routes.notebooks.update);
api.post('/api/' + "v0" + '/notebooks/delete', routes.notebooks.deletion);
// ***************************
// * Pages
// ***************************
api.post('/api/' + "v0" + '/pages/create', routes.pages.create);
api.post('/api/' + "v0" + '/pages/update', routes.pages.update);
api.post('/api/' + "v0" + '/pages/delete', routes.pages.deletion);
// ***************************
// * Works
// ***************************
api.post('/api/' + "v0" + '/works/create', routes.works.create);
api.post('/api/' + "v0" + '/works/update', routes.works.update);
api.post('/api/' + "v0" + '/works/delete', routes.works.deletion);
api.post('/api/' + "v0" + '/works/display', routes.works.display);
// ***************************
// * Locations
// ***************************
api.post('/api/' + "v0" + '/locations/create', routes.locations.create);
api.post('/api/' + "v0" + '/locations/update', routes.locations.update);
api.post('/api/' + "v0" + '/locations/delete', routes.locations.deletion);
// ***************************
// * Tags
// ***************************
api.post('/api/' + "v0" + '/tags/create', routes.tags.create);
api.post('/api/' + "v0" + '/tags/create-from-image', routes.tags.createFromImage);
api.post('/api/' + "v0" + '/tags/update', routes.tags.update);
api.post('/api/' + "v0" + '/tags/delete', routes.tags.deletion);
api.post('/api/' + "v0" + '/tags/enrich', routes.tags.enrich);
api.post('/api/' + "v0" + '/tags/tag-content', routes.tags.tagItem);
api.post('/api/' + "v0" + '/tags/ontology', function (req, res) {
    var word = req.body.body.word;
    var id = req.body.body.id;
    var options = {
        url: 'http://lookup.dbpedia.org/api/search/KeywordSearch?QueryString=' + word,
        headers: {
            'Accept': 'application/json'
        }
    };
    function cb(error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = {
                word: word,
                id: id,
                info: body
            };
            res.send(data);
        } else {
            console.log('error getting ontology for ' + word);
        }
    }
    request(options, cb);
});
// ***************************
// * Schemata
// ***************************
api.post('/api/' + "v0" + '/schemata/bind-tag', routes.schemata.bindTag);
api.post('/api/' + "v0" + '/schemata/bind-meaning', routes.schemata.bindMeaning);
api.post('/api/' + "v0" + '/schemata/create', routes.schemata.create);
api.post('/api/' + "v0" + '/schemata/update', routes.schemata.update);
api.post('/api/' + "v0" + '/schemata/delete', routes.schemata.deletion);
api.post('/api/' + "v0" + '/schemata/seed', routes.schemata.seed);
// ***************************
// * Meanings
// ***************************
api.post('/api/' + "v0" + '/meanings/extract-from-tag', routes.meanings.extractFromTag);
api.post('/api/' + "v0" + '/meanings/update', routes.meanings.update);
api.post('/api/' + "v0" + '/meanings/delete', routes.meanings.deletion);
// ***************************
// * Journeys
// ***************************
api.post('/api/' + "v0" + '/journeys/create', routes.journeys.create);
api.post('/api/' + "v0" + '/journeys/update', routes.journeys.update);
api.post('/api/' + "v0" + '/journeys/delete', routes.journeys.deletion);
// ***************************
// * Suggestions
// ***************************
api.post('/api/' + "v0" + '/suggestions/create-from-tag', routes.suggestions.createFromTag);
api.post('/api/' + "v0" + '/suggestions/update', routes.suggestions.update);
api.post('/api/' + "v0" + '/suggestions/delete', routes.suggestions.deletion);
// ***************************
// * Quests
// ***************************
api.post('/api/' + "v0" + '/quests/create', routes.quests.create);
api.post('/api/' + "v0" + '/quests/update', routes.quests.update);
api.post('/api/' + "v0" + '/quests/delete', routes.quests.deletion);

app.listen("3000", function () {
    console.log('Ioc Express Server started on ' + "3000");
});

api.listen("3030", function () {
    console.log('Neo4j server started on ' + "3030");
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onClickSubmit = undefined;

var _signIn = __webpack_require__(29);

var SignInActionTypes = _interopRequireWildcard(_signIn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var onClickSubmit = exports.onClickSubmit = function onClickSubmit() {
    return {
        type: SignInActionTypes.SIGN_IN_FORM_SUBMITTED
    };
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onClickSubmit = undefined;

var _signUp = __webpack_require__(30);

var SignUpActionTypes = _interopRequireWildcard(_signUp);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var onClickSubmit = exports.onClickSubmit = function onClickSubmit() {
    return {
        type: SignUpActionTypes.SIGN_UP_FORM_SUBMITTED
    };
};

/***/ }),
/* 79 */
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

var _superagent = __webpack_require__(13);

var _superagent2 = _interopRequireDefault(_superagent);

var _semanticUiReact = __webpack_require__(5);

var _artwork_actions = __webpack_require__(31);

var ArtworkActions = _interopRequireWildcard(_artwork_actions);

var _pathHelper = __webpack_require__(9);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _tag = __webpack_require__(83);

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Artwork = function (_Component) {
    _inherits(Artwork, _Component);

    function Artwork(props) {
        _classCallCheck(this, Artwork);

        var _this = _possibleConstructorReturn(this, (Artwork.__proto__ || Object.getPrototypeOf(Artwork)).call(this, props));

        _this.state = props;
        _this.setUser = _this.setUser.bind(_this);
        return _this;
    }

    _createClass(Artwork, [{
        key: 'setUser',
        value: function setUser(data) {
            this.userId = data.id;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(nextProps.state);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.setUser(this.props.user['userInfo']);
            var data = {
                workId: this.state.workId
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/works/display').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    var _data = {
                        id: response.body.work.id,
                        image: {
                            colors: JSON.parse(response.body.image.colors),
                            format: response.body.image.format,
                            grayscale: response.body.image.grayscale,
                            height: response.body.image.height,
                            id: response.body.image.id,
                            url: response.body.image.url,
                            width: response.body.image.width
                        },
                        tags: response.body.tags
                    };
                    _this2.props.loadArtwork(_data);
                } else {
                    console.log('Error', error);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var tagOptions = null;
            if (this.state.work) {
                var t = this.state.work.tags;
                tagOptions = t.map(function (tag) {
                    return _react2.default.createElement(_tag2.default, {
                        word: tag.word,
                        key: tag.id,
                        ontology: tag.ontology,
                        id: tag.id,
                        isEditable: true,
                        clickActions: [{ label: 'accept', icon: 'test', action: function action() {} }, { label: 'reject', icon: 'test', action: function action() {} }]
                    });
                });
            }
            return _react2.default.createElement(
                _semanticUiReact.Segment,
                null,
                this.state.work ? _react2.default.createElement(
                    _semanticUiReact.Container,
                    null,
                    _react2.default.createElement(_semanticUiReact.Image, { src: this.state.work.image.url, width: this.state.work.image.width, height: this.state.work.image.height }),
                    _react2.default.createElement(
                        'h2',
                        null,
                        'Detected in this image:'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'Click the add or reject buttons to label your work.'
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        tagOptions
                    )
                ) : null
            );
        }
    }]);

    return Artwork;
}(_react.Component);

Artwork.propTypes = {
    loadArtwork: _propTypes2.default.func.isRequired,
    browseBasedOnThis: _propTypes2.default.func.isRequired,
    relatedToMe: _propTypes2.default.func.isRequired,
    moreLikeThis: _propTypes2.default.func.isRequired,
    userNameClicked: _propTypes2.default.func.isRequired,
    workId: _propTypes2.default.string.isRequired,
    userInfo: _propTypes2.default.shape({
        id: _propTypes2.default.string,
        username: _propTypes2.default.string,
        firstName: _propTypes2.default.string,
        lastName: _propTypes2.default.string
    }),
    work: _propTypes2.default.shape({
        id: _propTypes2.default.string,
        image: _propTypes2.default.shape({
            colors: _propTypes2.default.any,
            format: _propTypes2.default.string,
            grayscale: _propTypes2.default.bool,
            height: _propTypes2.default.number,
            id: _propTypes2.default.string,
            url: _propTypes2.default.string,
            width: _propTypes2.default.number
        }),
        tags: _propTypes2.default.any
    })
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        browseBasedOnThis: function browseBasedOnThis() {
            dispatch(ArtworkActions.browseBasedOnThis());
        },
        relatedToMe: function relatedToMe() {
            dispatch(ArtworkActions.relatedToMe());
        },
        moreLikeThis: function moreLikeThis() {
            dispatch(ArtworkActions.moreLikeThis());
        },
        userNameClicked: function userNameClicked() {
            dispatch(ArtworkActions.userNameClicked());
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['Artwork'],
        user: state['Nav']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Artwork);

/***/ }),
/* 80 */
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

var _reactDropzone = __webpack_require__(101);

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _superagent = __webpack_require__(13);

var _superagent2 = _interopRequireDefault(_superagent);

var _reactRouterDom = __webpack_require__(12);

var _semanticUiReact = __webpack_require__(5);

var _imageUploader_actions = __webpack_require__(32);

var ImageUploaderActions = _interopRequireWildcard(_imageUploader_actions);

var _pathHelper = __webpack_require__(9);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageUploader = function (_Component) {
    _inherits(ImageUploader, _Component);

    function ImageUploader(props) {
        _classCallCheck(this, ImageUploader);

        var _this = _possibleConstructorReturn(this, (ImageUploader.__proto__ || Object.getPrototypeOf(ImageUploader)).call(this, props));

        _this.state = props;
        _this.onImageDrop = _this.onImageDrop.bind(_this);
        _this.checkTagsCompleted = _this.checkTagsCompleted.bind(_this);
        _this.handleImageUpload = _this.handleImageUpload.bind(_this);
        _this.setUser = _this.setUser.bind(_this);
        _this.isJSON = _this.isJSON.bind(_this);
        _this.tagCreationCount = 0;
        return _this;
    }

    _createClass(ImageUploader, [{
        key: 'setUser',
        value: function setUser(data) {
            this.userId = data.id;
        }
    }, {
        key: 'onImageDrop',
        value: function onImageDrop(files) {
            this.setUser(this.props.user['userInfo']);
            this.setState({
                uploadedFile: files[0], hasUploaded: true
            });
            this.handleImageUpload(files[0]);
        }
    }, {
        key: 'handleImageUpload',
        value: function handleImageUpload(file) {
            var _this2 = this;

            this.setState({ isLoading: true });
            var upload = _superagent2.default.post("https://api.cloudinary.com/v1_1/hpvmvlpcu/image/upload").field('upload_preset', "iylswkmx").field('file', file);
            upload.end(function (err, response) {
                if (err) {
                    _this2.setState({ isLoading: false, hasUploaded: false });
                    console.error(err);
                }
                if (response) {
                    var imageResponse = response.body;
                    var newImage = {
                        url: imageResponse.url,
                        format: imageResponse.format,
                        signature: imageResponse.signature,
                        width: imageResponse.width,
                        height: imageResponse.height,
                        secure_url: imageResponse.secure_url,
                        JFIFVersion: imageResponse.JFIFVersion ? JSON.stringify(imageResponse.JFIFVersion) : "{}",
                        colors: JSON.stringify(imageResponse.colors),
                        predominant: JSON.stringify(imageResponse.predominant),
                        phash: imageResponse.phash ? JSON.stringify(imageResponse.phash) : "{}",
                        illustration_score: imageResponse.illustration_score,
                        grayscale: imageResponse.grayscale,
                        original_filename: imageResponse.original_filename
                    };
                    _this2.createImage(JSON.stringify(newImage), _this2.userId);
                    if (response.body.secure_url !== '') {
                        _this2.setState({
                            uploadedFileCloudinaryUrl: response.body.secure_url, isLoading: false
                        });
                    }
                }
            });
        }
    }, {
        key: 'createImage',
        value: function createImage(image, userId) {
            var _this3 = this;

            var d = JSON.parse(image);
            d.userId = userId;
            var imageData = JSON.stringify(d);
            _superagent2.default.post(_pathHelper2.default.apiPath + '/images/create').set('Content-Type', 'application/json').send(imageData).end(function (error, response) {
                if (!error && response) {
                    _this3.currentImageID = response.body.id;
                    _this3.visualRecognition(response.body.url);
                } else {
                    console.log('Error saving your image', error);
                }
            });
        }
    }, {
        key: 'visualRecognition',
        value: function visualRecognition(url) {
            var _this4 = this;

            this.setState({ isProcessing: true });
            var data = {
                url: url
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/watson/visual-recognition').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    _this4.classifyImage(response.text, _this4.currentImageID);
                } else {
                    console.log('Error saving your image', error);
                }
            });
        }
    }, {
        key: 'classifyImage',
        value: function classifyImage(recognition, imageId) {
            var _this5 = this;

            var data = {
                recognition: JSON.stringify(recognition),
                imageId: imageId
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/images/classify').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    _this5.classificationToTags(response.body.classification);
                } else {
                    console.log('Error saving your image', error);
                }
            });
        }
    }, {
        key: 'createArtWork',
        value: function createArtWork(imageId, userId) {
            var _this6 = this;

            var createData = {
                imageId: imageId,
                userId: userId
            };
            var data = JSON.stringify(createData);
            _superagent2.default.post(_pathHelper2.default.apiPath + '/works/create').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    _this6.setState({ newArtWorkId: response.body.id });
                } else {
                    console.log('Error saving your image', error);
                }
            });
        }
    }, {
        key: 'isJSON',
        value: function isJSON(d) {
            try {
                return JSON.parse(d);
            } catch (e) {
                return d;
            }
        }
    }, {
        key: 'classificationToTags',
        value: function classificationToTags(classifications) {
            var classificationData = this.isJSON(classifications);
            classificationData = this.isJSON(classificationData);
            if (classificationData.images) {
                this.classifiers = classificationData.images[0].classifiers[0].classes;
                for (var i = 0; i < this.classifiers.length; i++) {
                    var w = this.classifiers[i].class;
                    this.createTag(w, this.currentImageID);
                }
            } else {
                this.checkTagsCompleted(true);
                console.log('there\'s a problem with the visual recognition service.');
            }
        }
    }, {
        key: 'checkTagsCompleted',
        value: function checkTagsCompleted(checksOut) {
            this.checksOut = checksOut;
            if (!this.checksOut) {
                if (this.tagCreationCount >= this.classifiers.length * 2) {
                    this.checksOut = true;
                }
            }
            if (this.checksOut) {
                this.setState({ isProcessing: false });
                this.setState({ isProcessed: true });
                this.createArtWork(this.currentImageID, this.userId);
            }
        }
    }, {
        key: 'createTag',
        value: function createTag(word, imageId) {
            var _this7 = this;

            var createTagData = {
                word: word,
                imageId: imageId
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/tags/create-from-image/').set('Content-Type', 'application/json').send(createTagData).end(function (error, response) {
                if (!error && response) {
                    _this7.tagCreationCount++;
                    _this7.getNewTagOntology(response);
                    _this7.checkTagsCompleted(false);
                } else {
                    _this7.tagCreationCount++;
                    console.log('Error saving your Tag', error);
                    _this7.checkTagsCompleted(false);
                }
            });
        }
    }, {
        key: 'getNewTagOntology',
        value: function getNewTagOntology(data) {
            var _this8 = this;

            _superagent2.default.post(_pathHelper2.default.apiPath + '/tags/ontology/').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    _this8.enrichNewTag(response);
                } else {
                    console.log('Error saving your Tag', error);
                }
            });
        }
    }, {
        key: 'enrichNewTag',
        value: function enrichNewTag(data) {
            var _this9 = this;

            _superagent2.default.post(_pathHelper2.default.apiPath + '/tags/enrich/').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    _this9.makeMeaning(response);
                } else {
                    console.log('Error saving your Tag', error);
                }
            });
        }
    }, {
        key: 'makeMeaning',
        value: function makeMeaning(tag) {
            var _this10 = this;

            var data = {
                ontology: this.isJSON(tag.body.ontology),
                tagId: tag.body.id
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/meanings/extract-from-tag/').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    _this10.tagCreationCount++;
                    _this10.checkTagsCompleted(false);
                } else {
                    console.log('Error extracting meaning from your Tag', error);
                    _this10.tagCreationCount++;
                    _this10.checkTagsCompleted(false);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _semanticUiReact.Segment,
                { className: 'image-uploader-hold' },
                this.state.hasUploaded === true ? null : _react2.default.createElement(
                    'h1',
                    null,
                    'Upload your Moleskine artwork.'
                ),
                _react2.default.createElement(
                    'form',
                    null,
                    this.state.hasUploaded === true ? null : _react2.default.createElement(
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
                    this.state.isLoading === true ? _react2.default.createElement(
                        _semanticUiReact.Dimmer,
                        { active: true },
                        _react2.default.createElement(
                            _semanticUiReact.Loader,
                            { indeterminate: true },
                            'Uploading Image'
                        )
                    ) : null,
                    this.state.isProcessing === true && this.state.hasUploaded === true ? _react2.default.createElement(
                        _semanticUiReact.Dimmer,
                        { active: true },
                        _react2.default.createElement(
                            _semanticUiReact.Loader,
                            { indeterminate: true },
                            'Processing Image'
                        )
                    ) : null,
                    this.state.uploadedFileCloudinaryUrl === '' ? null : _react2.default.createElement(
                        'div',
                        { className: 'uploaded-image-holder' },
                        _react2.default.createElement(_semanticUiReact.Image, { src: this.state.uploadedFileCloudinaryUrl, className: 'uploaded-image' })
                    ),
                    this.state.isProcessed === true ? _react2.default.createElement(
                        _reactRouterDom.Link,
                        { className: 'view-artwork-button', to: "/user/artwork/" + this.state.newArtWorkId },
                        'View My New Artwork'
                    ) : null
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
    createTag: _propTypes2.default.func.isRequired,
    getNewTagOntology: _propTypes2.default.func.isRequired,
    enrichNewTag: _propTypes2.default.func.isRequired,
    makeMeaning: _propTypes2.default.func.isRequired,
    exploreBasedOnThisArtwork: _propTypes2.default.func.isRequired,
    classificationToTags: _propTypes2.default.func.isRequired,
    visualRecognition: _propTypes2.default.func.isRequired,
    isLoading: _propTypes2.default.bool,
    hasUploaded: _propTypes2.default.bool,
    isProcessing: _propTypes2.default.bool,
    isProcessed: _propTypes2.default.bool,
    newArtWorkId: _propTypes2.default.string,
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
        createImage: function createImage(image) {
            dispatch(ImageUploaderActions.createImage(image));
        },
        createArtwork: function createArtwork(imageId, userId) {
            dispatch(ImageUploaderActions.createArtwork(imageId, userId));
        },
        classifyImage: function classifyImage(recognition, imageId) {
            dispatch(ImageUploaderActions.classifyImage(recognition, imageId));
        },
        createTag: function createTag(word) {
            dispatch(ImageUploaderActions.createTag(word));
        },
        enrichNewTag: function enrichNewTag(tag) {
            dispatch(ImageUploaderActions.enrichNewTag(tag));
        },
        makeMeaning: function makeMeaning(tag) {
            dispatch(ImageUploaderActions.makeMeaning(tag));
        },
        getNewTagOntology: function getNewTagOntology(tag) {
            dispatch(ImageUploaderActions.getNewTagOntology(tag));
        },
        exploreBasedOnThisArtwork: function exploreBasedOnThisArtwork(artwork) {
            dispatch(ImageUploaderActions.exploreBasedOnThisArtwork(artwork));
        },
        classificationToTags: function classificationToTags(classification) {
            dispatch(ImageUploaderActions.classificationToTags(classification));
        },
        visualRecognition: function visualRecognition(url) {
            dispatch(ImageUploaderActions.visualRecognition(url));
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['ImageUploader'],
        user: state['Nav']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImageUploader);

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(5);

var _superagent = __webpack_require__(13);

var _superagent2 = _interopRequireDefault(_superagent);

var _reactRouterDom = __webpack_require__(12);

var _pathHelper = __webpack_require__(9);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var token = __webpack_require__(17);

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
            _superagent2.default.post(_pathHelper2.default.apiPath + '/login').set('Content-Type', 'application/json').send(JSON.stringify(this.state)).end(function (error, response) {
                if (!error && response) {
                    console.log('from sign in', response);
                    token.setToken(response.body.token);
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(5);

var _superagent = __webpack_require__(13);

var _superagent2 = _interopRequireDefault(_superagent);

var _reactRouterDom = __webpack_require__(12);

var _pathHelper = __webpack_require__(9);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var token = __webpack_require__(17);

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
                _superagent2.default.post(_pathHelper2.default.apiPath + '/register').set('Content-Type', 'application/json').send(JSON.stringify(this.state)).end(function (error, response) {
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
/* 83 */
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tags = function Tags(props) {
    var buttons = null;
    var definitions = null;

    if (props.ontology) {
        var descriptions = [];
        var possibile = JSON.parse(props.ontology);
        for (var i = 0; i < possibile.results.length; i++) {
            if (possibile.results[i].description) {
                descriptions.push({ description: possibile.results[i].description });
            }
        }
        definitions = descriptions.map(function (d, index) {
            return _react2.default.createElement(
                'div',
                { key: index },
                _react2.default.createElement(
                    'em',
                    null,
                    _react2.default.createElement(
                        'strong',
                        null,
                        'Perhaps it is'
                    )
                ),
                ': ',
                d.description
            );
        });
    }

    if (props.clickActions) {
        var btns = props.clickActions;
        buttons = btns.map(function (b, index) {
            return _react2.default.createElement(
                'button',
                { key: index, onClick: b.action },
                _react2.default.createElement('i', { role: 'presentation', className: "tag-icon " + b.icon }),
                b.label
            );
        });
    }
    return _react2.default.createElement(
        _semanticUiReact.Container,
        { className: 'tag' },
        props.isEditable ? _react2.default.createElement(
            'span',
            { className: 'tag-label' },
            props.word,
            buttons
        ) : _react2.default.createElement(
            'span',
            { className: 'tag-label' },
            props.word
        ),
        _react2.default.createElement(
            _semanticUiReact.Container,
            null,
            definitions
        )
    );
};

Tags.propTypes = {
    word: _propTypes2.default.string.isRequired,
    ontology: _propTypes2.default.string,
    id: _propTypes2.default.string.isRequired,
    isEditable: _propTypes2.default.bool.isRequired,
    clickActions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        label: _propTypes2.default.string,
        icon: _propTypes2.default.string,
        action: _propTypes2.default.func
    }))
};

exports.default = Tags;

/***/ }),
/* 84 */
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

var _nav_actions = __webpack_require__(11);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(14);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _artwork_actions = __webpack_require__(31);

var ArtworkActionCreators = _interopRequireWildcard(_artwork_actions);

var _nav = __webpack_require__(16);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(15);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(5);

var _artwork = __webpack_require__(79);

var _artwork2 = _interopRequireDefault(_artwork);

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
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            var loadArtwork = (0, _redux.bindActionCreators)(ArtworkActionCreators.loadArtwork, dispatch);
            var browseBasedOnThis = (0, _redux.bindActionCreators)(ArtworkActionCreators.browseBasedOnThis, dispatch);
            var relatedToMe = (0, _redux.bindActionCreators)(ArtworkActionCreators.relatedToMe, dispatch);
            var moreLikeThis = (0, _redux.bindActionCreators)(ArtworkActionCreators.moreLikeThis, dispatch);
            var userNameClicked = (0, _redux.bindActionCreators)(ArtworkActionCreators.userNameClicked, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, {
                        signOut: signOut,
                        clickMenuItem: clickMenuItem,
                        updateUserInfo: updateUserInfo,
                        setLoggedIn: setLoggedIn }),
                    _react2.default.createElement(
                        _semanticUiReact.Segment,
                        null,
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Art'
                        )
                    ),
                    _react2.default.createElement(_artwork2.default, { loadArtwork: loadArtwork, workId: this.props.match.params.id, browseBasedOnThis: browseBasedOnThis, relatedToMe: relatedToMe, moreLikeThis: moreLikeThis, userNameClicked: userNameClicked })
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
/* 85 */
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

var _nav_actions = __webpack_require__(11);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(14);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _imageUploader_actions = __webpack_require__(32);

var ImageUploadCreators = _interopRequireWildcard(_imageUploader_actions);

var _nav = __webpack_require__(16);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(15);

var _footer2 = _interopRequireDefault(_footer);

var _imageUploader = __webpack_require__(80);

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
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            var uploadImage = (0, _redux.bindActionCreators)(ImageUploadCreators.uploadImage, dispatch);
            var createImage = (0, _redux.bindActionCreators)(ImageUploadCreators.createImage, dispatch);
            var createArtwork = (0, _redux.bindActionCreators)(ImageUploadCreators.createArtwork, dispatch);
            var classifyImage = (0, _redux.bindActionCreators)(ImageUploadCreators.classifyImage, dispatch);
            var createTag = (0, _redux.bindActionCreators)(ImageUploadCreators.createTag, dispatch);
            var getNewTagOntology = (0, _redux.bindActionCreators)(ImageUploadCreators.getNewTagOntology, dispatch);
            var enrichNewTag = (0, _redux.bindActionCreators)(ImageUploadCreators.enrichNewTag, dispatch);
            var makeMeaning = (0, _redux.bindActionCreators)(ImageUploadCreators.makeMeaning, dispatch);
            var exploreBasedOnThisArtwork = (0, _redux.bindActionCreators)(ImageUploadCreators.exploreBasedOnThisArtwork, dispatch);
            var classificationToTags = (0, _redux.bindActionCreators)(ImageUploadCreators.classificationToTags, dispatch);
            var visualRecognition = (0, _redux.bindActionCreators)(ImageUploadCreators.visualRecognition, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, {
                        signOut: signOut,
                        clickMenuItem: clickMenuItem,
                        updateUserInfo: updateUserInfo,
                        setLoggedIn: setLoggedIn }),
                    _react2.default.createElement(
                        'div',
                        null,
                        'select notebook'
                    ),
                    _react2.default.createElement(_imageUploader2.default, {
                        makeMeaning: makeMeaning,
                        uploadImage: uploadImage,
                        getNewTagOntology: getNewTagOntology,
                        enrichNewTag: enrichNewTag,
                        createImage: createImage,
                        createArtwork: createArtwork,
                        classifyImage: classifyImage,
                        createTag: createTag,
                        exploreBasedOnThisArtwork: exploreBasedOnThisArtwork,
                        classificationToTags: classificationToTags,
                        visualRecognition: visualRecognition })
                ),
                _react2.default.createElement(_footer2.default, {
                    clickFooterItem: clickFooterItem })
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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _art = __webpack_require__(84);

var _art2 = _interopRequireDefault(_art);

var _home = __webpack_require__(85);

var _home2 = _interopRequireDefault(_home);

var _signUp = __webpack_require__(89);

var _signUp2 = _interopRequireDefault(_signUp);

var _signIn = __webpack_require__(88);

var _signIn2 = _interopRequireDefault(_signIn);

var _profile = __webpack_require__(87);

var _profile2 = _interopRequireDefault(_profile);

var _reactRouterDom = __webpack_require__(12);

var _pathHelper = __webpack_require__(9);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _superagent = __webpack_require__(13);

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IoCSeed = __webpack_require__(43);

var Ioc = function (_Component) {
    _inherits(Ioc, _Component);

    function Ioc() {
        _classCallCheck(this, Ioc);

        return _possibleConstructorReturn(this, (Ioc.__proto__ || Object.getPrototypeOf(Ioc)).apply(this, arguments));
    }

    _createClass(Ioc, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var s = [];
            for (var i in IoCSeed.suggestionData) {
                if (IoCSeed.suggestionData.hasOwnProperty(i)) {
                    s.push({ schemaName: i.toString() });
                }
            }
            var data = {
                schemata: s
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/schemata/seed').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    console.log('Schema initialized');
                } else {
                    console.log('Initializing schema', error);
                }
            });
        }
    }, {
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
                _react2.default.createElement(_reactRouterDom.Route, { path: '/user/artwork/:id', component: _art2.default })
            );
        }
    }]);

    return Ioc;
}(_react.Component);

exports.default = Ioc;

/***/ }),
/* 87 */
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

var _nav_actions = __webpack_require__(11);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(14);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(16);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(15);

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
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, {
                        signOut: signOut,
                        clickMenuItem: clickMenuItem,
                        updateUserInfo: updateUserInfo,
                        setLoggedIn: setLoggedIn }),
                    _react2.default.createElement(
                        _semanticUiReact.Segment,
                        null,
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Profile'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            'Basic Info/Avatar'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            'My Notebooks'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            'My "Quests"'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            'My Suggestions'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            'My Uploads'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            'Feed'
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

//MATCH (user)-[:UPLOADED]->(upload) WHERE user.id = 177 MATCH(u{id:upload.id}) RETURN user.id, u.url

/***/ }),
/* 88 */
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

var _nav_actions = __webpack_require__(11);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(14);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _signIn_actions = __webpack_require__(77);

var SignInActionCreators = _interopRequireWildcard(_signIn_actions);

var _nav = __webpack_require__(16);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(15);

var _footer2 = _interopRequireDefault(_footer);

var _signInForm = __webpack_require__(81);

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
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, {
                        signOut: signOut,
                        clickMenuItem: clickMenuItem,
                        updateUserInfo: updateUserInfo,
                        setLoggedIn: setLoggedIn }),
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
/* 89 */
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

var _nav_actions = __webpack_require__(11);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(14);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _signUp_actions = __webpack_require__(78);

var SignUpActionCreators = _interopRequireWildcard(_signUp_actions);

var _nav = __webpack_require__(16);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(15);

var _footer2 = _interopRequireDefault(_footer);

var _signUpForm = __webpack_require__(82);

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
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'main-content' },
                    _react2.default.createElement(_nav2.default, {
                        signOut: signOut,
                        clickMenuItem: clickMenuItem,
                        updateUserInfo: updateUserInfo,
                        setLoggedIn: setLoggedIn }),
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Footer;

var _artwork = __webpack_require__(25);

var ArtworkActionTypes = _interopRequireWildcard(_artwork);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    work: {
        id: '',
        image: {
            colors: '',
            format: '',
            grayscale: false,
            height: 0,
            id: '',
            url: '',
            width: 0
        },
        tags: []
    }

};

function Footer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case ArtworkActionTypes.LOAD_ARTWORK:
            return Object.assign({}, state, {
                work: action.data
            });
            return state;
        case ArtworkActionTypes.USER_NAME_CLICKED:
            console.log('user name clicked');
            return state;
        case ArtworkActionTypes.BROWSE_BASED_ON_THIS:
            console.log('browse based on this');
            return state;
        case ArtworkActionTypes.MORE_LIKE_THIS:
            console.log('more like this');
            return state;
        case ArtworkActionTypes.RELATED_TO_ME:
            console.log('related to me');
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Footer;

var _footer = __webpack_require__(26);

var FooterActionTypes = _interopRequireWildcard(_footer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {};

function Footer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case FooterActionTypes.FOOTER_ITEM_CLICKED:
            console.log('footer item clicked');
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ImageUploader;

var _imageUploder = __webpack_require__(27);

var ImageUploaderActionTypes = _interopRequireWildcard(_imageUploder);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    uploadedFileCloudinaryUrl: null,
    uploadedFile: null,
    isProcessing: false,
    isProcessed: false,
    hasUploaded: false,
    isLoading: false
};

function ImageUploader() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case ImageUploaderActionTypes.UPLOAD_IMAGE:
            return Object.assign({}, state, {
                uploadedFileCloudinaryUrl: action.image
            });
        case ImageUploaderActionTypes.CREATE_IMAGE:
            return Object.assign({}, state, _extends({}, state));
        case ImageUploaderActionTypes.CREATE_ARTWORK:
            return Object.assign({}, state, _extends({}, state));
        case ImageUploaderActionTypes.CLASSIFY_IMAGE:
            return Object.assign({}, state, _extends({}, state));
        case ImageUploaderActionTypes.CREATE_TAGS:
            return Object.assign({}, state, _extends({}, state));
        case ImageUploaderActionTypes.CLASSIFICATION_TO_TAGS:
            return Object.assign({}, state, _extends({}, state));
        case ImageUploaderActionTypes.ENRICH_NEW_TAG:
            return Object.assign({}, state, _extends({}, state));
        case ImageUploaderActionTypes.VISUAL_RECOGNITION:
            return Object.assign({}, state, _extends({}, state));
        case ImageUploaderActionTypes.REJECT_TAG:
            return Object.assign({}, state, _extends({}, state));
        case ImageUploaderActionTypes.EXPLORE_BASED_ON_THIS_ARTWORK:
            return Object.assign({}, state, _extends({}, state));
        case ImageUploaderActionTypes.GET_NEW_TAG_ONTOLOGY:
            return Object.assign({}, state, _extends({}, state));
        case ImageUploaderActionTypes.MAKE_MEANING:
            return Object.assign({}, state, _extends({}, state));
        default:
            return state;
    }
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mainReducer = undefined;

var _redux = __webpack_require__(10);

var _footer = __webpack_require__(91);

var _footer2 = _interopRequireDefault(_footer);

var _nav = __webpack_require__(94);

var _nav2 = _interopRequireDefault(_nav);

var _signIn = __webpack_require__(95);

var _signIn2 = _interopRequireDefault(_signIn);

var _signUp = __webpack_require__(96);

var _signUp2 = _interopRequireDefault(_signUp);

var _imageUploader = __webpack_require__(92);

var _imageUploader2 = _interopRequireDefault(_imageUploader);

var _artwork = __webpack_require__(90);

var _artwork2 = _interopRequireDefault(_artwork);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainReducer = exports.mainReducer = (0, _redux.combineReducers)({
    Footer: _footer2.default,
    Nav: _nav2.default,
    SignIn: _signIn2.default,
    SignUp: _signUp2.default,
    ImageUploader: _imageUploader2.default,
    Artwork: _artwork2.default
});
exports.default = mainReducer;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Nav;

var _nav = __webpack_require__(28);

var NavActionTypes = _interopRequireWildcard(_nav);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Token = __webpack_require__(17);

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
        case NavActionTypes.SIGN_OUT:
            Token.removeToken();
            return Object.assign({}, state, {
                isLoggedIn: false
            });
        default:
            return state;
    }
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SignIn;

var _signIn = __webpack_require__(29);

var SignInActionTypes = _interopRequireWildcard(_signIn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    email: '',
    password: '',
    redirect: false
};

function SignIn() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case SignInActionTypes.SIGN_IN_FORM_SUBMITTED:
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SignUp;

var _signUp = __webpack_require__(30);

var SignUpActionTypes = _interopRequireWildcard(_signUp);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
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

function SignUp() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case SignUpActionTypes.SIGN_UP_FORM_SUBMITTED:
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = require("nconf");

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = require("neo4j-driver");

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = require("react-dropzone");

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = require("swagger-node-express");

/***/ })
/******/ ]);