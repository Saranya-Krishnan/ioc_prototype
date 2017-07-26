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
/******/ 	return __webpack_require__(__webpack_require__.s = 99);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sw = __webpack_require__(156);
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(20).config();

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
/* 7 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _randomstring = __webpack_require__(57);

var _randomstring2 = _interopRequireDefault(_randomstring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// neo4j_models cypher helper module
var nconf = __webpack_require__(26);

var neo4j = __webpack_require__(153).v1;
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _response = __webpack_require__(3);

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
/* 10 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signOut = exports.setLoggedIn = exports.updateUserInfo = exports.clickMenuItem = undefined;

var _nav = __webpack_require__(40);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickFooterItem = undefined;

var _footer = __webpack_require__(36);

var FooterActionTypes = _interopRequireWildcard(_footer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var clickFooterItem = exports.clickFooterItem = function clickFooterItem() {
    return {
        type: FooterActionTypes.FOOTER_ITEM_CLICKED
    };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(16);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(16);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _nav_actions = __webpack_require__(12);

var NavActions = _interopRequireWildcard(_nav_actions);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _reactFontawesome = __webpack_require__(17);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var token = __webpack_require__(19);

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
                { className: 'nav-container' },
                _react2.default.createElement(
                    _semanticUiReact.Menu,
                    { pointing: true, secondary: true, fluid: true },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/', className: this.state.activeItem === 'home' ? 'active item' : 'item', onClick: function onClick() {
                                return _this3.props.clickMenuItem('home');
                            } },
                        'Home'
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/journey', className: this.state.activeItem === 'journey' ? 'active item' : 'item', onClick: function onClick() {
                                return _this3.props.clickMenuItem('journey');
                            } },
                        'Start a Journey'
                    ),
                    !this.state.isLoggedIn ? null : _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/upload', className: this.state.activeItem === 'upload' ? 'active item' : 'item', onClick: function onClick() {
                                return _this3.props.clickMenuItem('upload');
                            } },
                        'Capture My Notebook'
                    ),
                    !this.state.isLoggedIn ? _react2.default.createElement(
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
                    ) : _react2.default.createElement(
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
                            _react2.default.createElement(_reactFontawesome2.default, { name: 'user', className: 'icon profile-icon' }),
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
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("react-fontawesome");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 19 */
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
/* 20 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var suggestionData = {
    person: {
        actions: [{
            actionKey: 'draw',
            prompt: 'Draw a portrait of %^person^%',
            schema: 'person',
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
                qualifier: ' as %&a&% %^species^%.'
            }, {
                schema: 'species',
                qualifier: ' with %&a&% %^species^%.'
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
                qualifier: ' as %&a&% %^device^%.'
            }]
        }]
    },
    place: {
        actions: [{
            actionKey: 'draw',
            prompt: 'Draw a picture of %&a&% %^place^%',
            schema: 'place',
            qualifiers: [{
                schema: 'person',
                qualifier: ' in the style or from the perspective of %^person^%.'
            }]
        }]
    },
    species: {
        actions: [{
            actionKey: 'draw',
            prompt: 'Draw a picture of %&a&% %^species^%',
            schema: 'species',
            qualifiers: [{
                schema: 'person',
                qualifier: ' in the style or from the perspective of %^person^%.'
            }]
        }]
    },
    work: {
        actions: [{
            actionKey: 'draw',
            prompt: 'Draw your interpretation of %^work^%',
            schema: 'work',
            qualifiers: [{
                schema: 'person',
                qualifier: ' in the style or from the perspective of %^person^%.'
            }]
        }]
    },
    topicalConcept: {
        actions: [{
            actionKey: 'draw',
            prompt: 'What would %^topicalConcept^% look like if it were a person? Draw it!',
            schema: 'topicalConcept',
            qualifiers: [{
                schema: 'person',
                qualifier: ' in the style or from the perspective of %^person^%.'
            }]
        }]
    },
    timePeriod: {
        actions: [{
            actionKey: 'draw',
            prompt: 'Imagine your self in the  %&a&% %^timePeriod^%. Write what your breakfast would be like if you lived then.',
            schema: 'timePeriod',
            qualifiers: [{
                schema: 'person',
                qualifier: ' in the style or from the perspective of %^person^%.'
            }]
        }]
    },
    colour: {
        actions: [{
            actionKey: 'draw',
            prompt: 'Draw a picture using a lot of %^colour^%',
            schema: 'colour',
            qualifiers: [{
                schema: 'person',
                qualifier: ' in the style or from the perspective of %^person^%.'
            }]
        }]
    },
    device: {
        actions: [{
            actionKey: 'draw',
            prompt: 'Draw a picture of %&a&% %^device^%',
            schema: 'device',
            qualifiers: [{
                schema: 'person',
                qualifier: ' in the style or from the perspective of %^person^%.'
            }]
        }]
    },
    event: {
        actions: [{
            actionKey: 'draw',
            prompt: 'Draw a picture of %&a& %^event^%',
            schema: 'event',
            qualifiers: [{
                schema: 'person',
                qualifier: ' in the style or from the perspective of %^person^%.'
            }]
        }]
    },
    food: {
        actions: [{
            actionKey: 'draw',
            prompt: 'Draw a picture of %&a&% %^food^%',
            schema: 'food',
            qualifiers: [{
                schema: 'person',
                qualifier: ' in the style or from the perspective of %^person^%.'
            }]
        }]
    }
};

module.exports = {
    suggestionData: suggestionData
};

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

var Tag = module.exports = function (_node) {
    _lodash2.default.extend(this, {
        'id': _node.properties['id'],
        'word': _node.properties['word'],
        'ontology': _node.properties['ontology']
    });
};

exports.default = Tag;

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


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNewNotebook = undefined;

var _notebook = __webpack_require__(41);

var notebookActionTypes = _interopRequireWildcard(_notebook);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var createNewNotebook = exports.createNewNotebook = function createNewNotebook(userId) {
    return {
        type: notebookActionTypes.CREATE_NEW_NOTEBOOK,
        userId: userId
    };
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _nconf = __webpack_require__(152);

var _nconf2 = _interopRequireDefault(_nconf);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(20).config();

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
    'USERNAME': 'neo4j',
    'PASSWORD': 'neo4j',
    'neo4j': 'local',
    'neo4j-local': 'bolt://localhost:7687',
    'neo4j-remote': 'bolt:http://162.243.100.222:7474',
    'base_url': 'http://localhost:3030',
    'api_path': '/api/v0'
});

module.exports = _nconf2.default;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 28 */
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
/* 29 */
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
        'schemaName': _node.properties['schemaName'],
        'lastUpdate': _node.properties['lastUpdate']
    });
};

exports.default = Meaning;

/***/ }),
/* 30 */
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
        'id': _node.properties['id'],
        'when': _node.properties['when'],
        'how': _node.properties['how'],
        'what': _node.properties['what'],
        'name1': _node.properties['name1'],
        'name2': _node.properties['name2'],
        'name3': _node.properties['name3'],
        'userId': _node.properties['userId']
    });
};

exports.default = Notebook;

/***/ }),
/* 31 */
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
        'id': _node.properties['id'],
        'meaningId': _node.properties['meaningId'],
        'prompt': _node.properties['prompt']
    });
};

exports.default = Suggestion;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _randomstring = __webpack_require__(57);

var _randomstring2 = _interopRequireDefault(_randomstring);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _user = __webpack_require__(23);

var _user2 = _interopRequireDefault(_user);

var _notebook = __webpack_require__(30);

var _notebook2 = _interopRequireDefault(_notebook);

var _crypto = __webpack_require__(151);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var register = function register(session, email, password, firstName, lastName) {
    return session.run('MATCH (user:User {email: {email}}) RETURN user', { email: email }).then(function (results) {
        if (!_lodash2.default.isEmpty(results.records)) {
            throw { err: 'username already in use', status: 400 };
        } else {
            return session.run('CREATE (user:User {id: {id}, email: {email}, password: {password}, firstName: {firstName}, lastName:{lastName}, api_key: {api_key}, preferences:{preferences}}) RETURN user', {
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
            if (dbUser.password !== hashPassword(email, password)) {
                throw { password: 'wrong password', status: 400 };
            }
            return { token: _lodash2.default.get(dbUser, 'api_key') };
        }
    });
};

var updateCurrentNotebook = function updateCurrentNotebook(session, userId, notebookId) {
    return session.run('MATCH(n:Notebook {id:{notebookId}}) MATCH (u:User {id:{userId}}) CREATE (n)<-[:CURRENT_NOTEBOOK_OF]-(u) RETURN n', { notebookId: notebookId, userId: userId }).then(function (results) {
        return new _notebook2.default(results.records[0].get('n'));
    });
};

var getCurrentNotebook = function getCurrentNotebook(session, userId) {
    return session.run('MATCH (u:User {id:{userId}})-[:CURRENT_NOTEBOOK_OF]->(n:Notebook) RETURN n', { userId: userId }).then(function (results) {
        if (results.records[0]) {
            return new _notebook2.default(results.records[0].get('n'));
        } else {
            return { body: [] };
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
    login: login,
    updateCurrentNotebook: updateCurrentNotebook,
    getCurrentNotebook: getCurrentNotebook
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GO_TO_ARTWORK_PAGE = exports.GO_TO_ARTWORK_PAGE = 'GO_TO_ARTWORK_PAGE';

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOAD_ARTWORK = exports.LOAD_ARTWORK = 'LOAD_ARTWORK';
var GET_SUGGESTIONS = exports.GET_SUGGESTIONS = 'GET_SUGGESTIONS';
var USER_NAME_CLICKED = exports.USER_NAME_CLICKED = 'USER_NAME_CLICKED';
var MORE_LIKE_THIS = exports.MORE_LIKE_THIS = ' MORE_LIKE_THIS';
var BROWSE_BASED_ON_THIS = exports.BROWSE_BASED_ON_THIS = 'BROWSE_BASED_ON_THIS';
var RELATED_TO_ME = exports.RELATED_TO_ME = 'RELATED_TO_ME';

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DO_CREATION = exports.DO_CREATION = 'DO_CREATION';
var NEXT_STEP = exports.NEXT_STEP = 'NEXT_STEP';
var UPDATE_USER_ID = exports.UPDATE_USER_ID = 'UPDATE_USER_ID';

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FOOTER_ITEM_CLICKED = exports.FOOTER_ITEM_CLICKED = 'FOOTER_ITEM_CLICKED';

/***/ }),
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOAD_MY_ARTWORK = exports.LOAD_MY_ARTWORK = 'LOAD_MY_ARTWORK';

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SHOW_MY_NOTEBOOKS = exports.SHOW_MY_NOTEBOOKS = 'SHOW_MY_NOTEBOOKS';
var GET_PAGES_FROM_CURRENT_NOTEBOOK = exports.GET_PAGES_FROM_CURRENT_NOTEBOOK = 'GET_PAGES_FROM_CURRENT_NOTEBOOK';
var SET_CURRENT_NOTEBOOK = exports.SET_CURRENT_NOTEBOOK = 'SET_CURRENT_NOTEBOOK';

/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CREATE_NEW_NOTEBOOK = exports.CREATE_NEW_NOTEBOOK = 'CREATE_NEW_NOTEBOOK';

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_GOAL_DATE = exports.SET_GOAL_DATE = 'SET_GOAL_DATE';
var ADD_NOTE = exports.ADD_NOTE = 'ADD_NOTE';
var JOIN_QUEST = exports.JOIN_QUEST = 'JOIN_QUEST';
var ABANDON_QUEST = exports.ABANDON_QUEST = 'ABANDON_QUEST';
var SEE_ALL_MY_QUESTS = exports.SEE_ALL_MY_QUESTS = 'SEE_ALL_MY_QUESTS';
var GO_TO_QUEST_PAGE = exports.GO_TO_QUEST_PAGE = 'GO_TO_QUEST_PAGE';

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOAD_MY_QUESTS = exports.LOAD_MY_QUESTS = 'LOAD_MY_QUESTS';

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SIGN_IN_FORM_SUBMITTED = exports.SIGN_IN_FORM_SUBMITTED = 'SIGN_IN_FORM_SUBMITTED';

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SIGN_UP_FORM_SUBMITTED = exports.SIGN_UP_FORM_SUBMITTED = 'SIGN_UP_FORM_SUBMITTED';

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TAKE_SUGGESTION = exports.TAKE_SUGGESTION = 'TAKE_SUGGESTION';
var UNDO_TAKE_SUGGESTION = exports.UNDO_TAKE_SUGGESTION = 'UNDO_TAKE_SUGGESTION';
var MORE_SUGGESTIONS_LIKE_THIS = exports.MORE_SUGGESTIONS_LIKE_THIS = 'MORE_SUGGESTIONS_LIKE_THIS';
var SHOW_SUGGESTION = exports.SHOW_SUGGESTION = 'SHOW_SUGGESTION';
var HIDE_SUGGESTION = exports.HIDE_SUGGESTION = 'HIDE_SUGGESTION';
var SHOW_QUEST = exports.SHOW_QUEST = 'SHOW_QUEST';

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var UPLOAD_AVATAR = exports.UPLOAD_AVATAR = 'UPLOAD_AVATAR';
var EDIT_BIO = exports.EDIT_BIO = 'EDIT_BIO';

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userNameClicked = exports.moreLikeThis = exports.relatedToMe = exports.browseBasedOnThis = exports.getSuggestions = exports.loadArtwork = undefined;

var _artwork = __webpack_require__(34);

var ArtworkActionTypes = _interopRequireWildcard(_artwork);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var loadArtwork = exports.loadArtwork = function loadArtwork(data) {
    return {
        type: ArtworkActionTypes.LOAD_ARTWORK,
        data: data
    };
};

var getSuggestions = exports.getSuggestions = function getSuggestions(data) {
    return {
        type: ArtworkActionTypes.GET_SUGGESTIONS,
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateUserId = exports.doCreation = exports.nextStep = undefined;

var _createNotebookForm = __webpack_require__(35);

var CreateNotebookFormActionTypes = _interopRequireWildcard(_createNotebookForm);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var nextStep = exports.nextStep = function nextStep(step) {
    return {
        type: CreateNotebookFormActionTypes.NEXT_STEP,
        step: step
    };
};

var doCreation = exports.doCreation = function doCreation(data) {
    return {
        type: CreateNotebookFormActionTypes.DO_CREATION,
        data: data
    };
};

var updateUserId = exports.updateUserId = function updateUserId(id) {
    return {
        type: CreateNotebookFormActionTypes.UPDATE_USER_ID,
        id: id
    };
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeMeaning = exports.getNewTagOntology = exports.enrichNewTag = exports.visualRecognition = exports.classificationToTags = exports.exploreBasedOnThisArtwork = exports.createTag = exports.classifyImage = exports.createArtwork = exports.createImage = exports.uploadImage = undefined;

var _imageUploder = __webpack_require__(37);

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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMyArtwork = undefined;

var _myArtwork = __webpack_require__(38);

var MyArtWorkActionTypes = _interopRequireWildcard(_myArtwork);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var loadMyArtwork = exports.loadMyArtwork = function loadMyArtwork(having, artwork) {
    return {
        type: MyArtWorkActionTypes.LOAD_MY_ARTWORK,
        having: having,
        artwork: artwork
    };
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showMyNotebooks = undefined;

var _myNotebooks = __webpack_require__(39);

var MyNotebooksActionTypes = _interopRequireWildcard(_myNotebooks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var showMyNotebooks = exports.showMyNotebooks = function showMyNotebooks(notebooks, notebooksFound) {
    return {
        type: MyNotebooksActionTypes.SHOW_MY_NOTEBOOKS,
        notebooks: notebooks,
        notebooksFound: notebooksFound
    };
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.goToQuestPage = exports.seeAllMyQuests = exports.adabdonQuest = exports.joinQuest = exports.addNote = exports.setGoalDate = undefined;

var _quest = __webpack_require__(42);

var QuestActionTypes = _interopRequireWildcard(_quest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var setGoalDate = exports.setGoalDate = function setGoalDate(data) {
    return {
        type: QuestActionTypes.SET_GOAL_DATE,
        data: data
    };
};

var addNote = exports.addNote = function addNote() {
    return {
        type: QuestActionTypes.ADD_NOTE
    };
};

var joinQuest = exports.joinQuest = function joinQuest() {
    return {
        type: QuestActionTypes.JOIN_QUEST
    };
};

var adabdonQuest = exports.adabdonQuest = function adabdonQuest() {
    return {
        type: QuestActionTypes.ABANDON_QUEST
    };
};

var seeAllMyQuests = exports.seeAllMyQuests = function seeAllMyQuests() {
    return {
        type: QuestActionTypes.SEE_ALL_MY_QUESTS
    };
};

var goToQuestPage = exports.goToQuestPage = function goToQuestPage(redirect) {
    return {
        type: QuestActionTypes.GO_TO_QUEST_PAGE, redirect: redirect
    };
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMyQuests = undefined;

var _quests = __webpack_require__(43);

var QuestsActionTypes = _interopRequireWildcard(_quests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var loadMyQuests = exports.loadMyQuests = function loadMyQuests(having, quests) {
    return {
        type: QuestsActionTypes.LOAD_MY_QUESTS,
        having: having,
        quests: quests
    };
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _notebook_actions = __webpack_require__(24);

var NotebookActions = _interopRequireWildcard(_notebook_actions);

var _semanticUiReact = __webpack_require__(2);

var _reactFontawesome = __webpack_require__(17);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _reactRouter = __webpack_require__(18);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notebook = function (_Component) {
    _inherits(Notebook, _Component);

    function Notebook(props) {
        _classCallCheck(this, Notebook);

        var _this = _possibleConstructorReturn(this, (Notebook.__proto__ || Object.getPrototypeOf(Notebook)).call(this, props));

        _this.state = props;
        return _this;
    }

    _createClass(Notebook, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(nextProps.state);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ doRedirect: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                _semanticUiReact.Container,
                null,
                this.props.isNewNotebook ? _react2.default.createElement(
                    _semanticUiReact.Container,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Header,
                        null,
                        'You don\'t have an active notebook. Please add one.'
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Grid,
                        { centered: true, columns: 4 },
                        _react2.default.createElement(
                            _semanticUiReact.Grid.Column,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Card,
                                { onClick: function onClick() {
                                        return _this2.state.createNewNotebook();
                                    } },
                                this.state.doRedirect ? _react2.default.createElement(_reactRouter.Redirect, { push: true, to: "/notebooks/new/" }) : null,
                                _react2.default.createElement(_reactFontawesome2.default, { name: 'plus', size: '4x', className: 'add-notebook-icon' }),
                                _react2.default.createElement(
                                    _semanticUiReact.Card.Content,
                                    null,
                                    _react2.default.createElement(
                                        _semanticUiReact.Card.Header,
                                        { className: 'add-notebook-header' },
                                        'Add Notebook'
                                    )
                                )
                            )
                        )
                    )
                ) : _react2.default.createElement(
                    _semanticUiReact.Container,
                    null,
                    'display'
                )
            );
        }
    }]);

    return Notebook;
}(_react.Component);

Notebook.propTypes = {
    isNewNotebook: _propTypes2.default.bool.isRequired,
    createNewNotebook: _propTypes2.default.func.isRequired,
    doRedirect: _propTypes2.default.bool.isRequired
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        createNewNotebook: function createNewNotebook() {
            dispatch(NotebookActions.createNewNotebook());
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['Notebook']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Notebook);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _semanticUiReact = __webpack_require__(2);

var _quest_actions = __webpack_require__(53);

var QuestActions = _interopRequireWildcard(_quest_actions);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _moment = __webpack_require__(25);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouter = __webpack_require__(18);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quest = function (_Component) {
    _inherits(Quest, _Component);

    function Quest(props) {
        _classCallCheck(this, Quest);

        var _this = _possibleConstructorReturn(this, (Quest.__proto__ || Object.getPrototypeOf(Quest)).call(this, props));

        _this.state = props;
        _this.setUser = _this.setUser.bind(_this);
        return _this;
    }

    _createClass(Quest, [{
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

            if (!this.props.promoMode) {
                this.state.goToQuestPage(false);
            }
            this.setUser(this.props.user['userInfo']);
            var data = {
                questId: this.props.id
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/quests/display').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    var responseData = {
                        quest: {
                            startDate: response.body.quest.startDate,
                            goalDate: response.body.quest.goalDate,
                            completed: response.body.quest.completed,
                            hidden: response.body.quest.hidden,
                            statement: response.body.quest.statement
                        },
                        suggestion: {
                            prompt: response.body.suggestion.prompt
                        },
                        user: {
                            id: response.body.user.id
                        },
                        meaning: {
                            label: response.body.meaning.label,
                            description: response.body.meaning.description,
                            schemaName: response.body.meaning.schemaName
                        }
                    };
                    _this2.setState({
                        startDate: responseData.quest.startDate,
                        goalDate: responseData.quest.goalDate,
                        completed: responseData.quest.completed,
                        hidden: responseData.quest.hidden,
                        statement: responseData.quest.statement,
                        label: responseData.meaning.label,
                        description: responseData.meaning.description,
                        prompt: responseData.suggestion.prompt
                    });
                } else {
                    _this2.setState({ errorText: error, hasError: true });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                _semanticUiReact.Container,
                null,
                this.props.promoMode ? _react2.default.createElement(
                    _semanticUiReact.Container,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Card,
                        { onClick: function onClick() {
                                return _this3.state.goToQuestPage(true);
                            } },
                        this.state.doRedirect ? _react2.default.createElement(_reactRouter.Redirect, { push: true, to: "/quest/" + this.props.id }) : null,
                        _react2.default.createElement(_semanticUiReact.Card.Content, { header: this.state.prompt }),
                        _react2.default.createElement(_semanticUiReact.Card.Content, { description: this.state.description }),
                        _react2.default.createElement(
                            _semanticUiReact.Card.Content,
                            { extra: true },
                            _react2.default.createElement(
                                _semanticUiReact.Statistic,
                                null,
                                _react2.default.createElement(
                                    _semanticUiReact.Statistic.Label,
                                    null,
                                    'Goal Date'
                                ),
                                _react2.default.createElement(
                                    _semanticUiReact.Statistic.Value,
                                    null,
                                    (0, _moment2.default)(this.state.goalDate).fromNow()
                                )
                            )
                        )
                    )
                ) : _react2.default.createElement(
                    _semanticUiReact.Container,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Segment,
                        null,
                        _react2.default.createElement(_semanticUiReact.Header, { content: this.state.prompt, subheader: "You started this quest on " + (0, _moment2.default)(this.state.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a") }),
                        _react2.default.createElement(_semanticUiReact.Divider, null),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'About ',
                            this.state.label
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            this.state.description
                        ),
                        this.state.completed ? _react2.default.createElement(
                            _semanticUiReact.Container,
                            null,
                            _react2.default.createElement(
                                'h3',
                                null,
                                'Completion Date'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'TK'
                            )
                        ) : _react2.default.createElement(
                            _semanticUiReact.Container,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Statistic,
                                null,
                                _react2.default.createElement(
                                    _semanticUiReact.Statistic.Label,
                                    null,
                                    'Goal Date'
                                ),
                                _react2.default.createElement(
                                    _semanticUiReact.Statistic.Value,
                                    null,
                                    (0, _moment2.default)(this.state.goalDate).fromNow()
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Container,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Button,
                                null,
                                'Abandon'
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Button,
                                null,
                                'Upload & Complete'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Quest;
}(_react.Component);

Quest.propTypes = {
    id: _propTypes2.default.string.isRequired,
    startDate: _propTypes2.default.instanceOf(Date),
    goalDate: _propTypes2.default.instanceOf(Date),
    completed: _propTypes2.default.bool,
    hidden: _propTypes2.default.bool,
    statement: _propTypes2.default.string,
    promoMode: _propTypes2.default.bool.isRequired,
    label: _propTypes2.default.string,
    description: _propTypes2.default.string,
    prompt: _propTypes2.default.string,
    hasError: _propTypes2.default.bool,
    errorText: _propTypes2.default.string,
    userInfo: _propTypes2.default.shape({
        id: _propTypes2.default.string,
        username: _propTypes2.default.string,
        firstName: _propTypes2.default.string,
        lastName: _propTypes2.default.string
    }),
    doRedirect: _propTypes2.default.bool
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        setGoalDate: function setGoalDate() {
            dispatch(QuestActions.setGoalDate());
        },
        addNote: function addNote() {
            dispatch(QuestActions.addNote());
        },
        joinQuest: function joinQuest() {
            dispatch(QuestActions.joinQuest());
        },
        adabdonQuest: function adabdonQuest() {
            dispatch(QuestActions.adabdonQuest());
        },
        seeAllMyQuests: function seeAllMyQuests() {
            dispatch(QuestActions.seeAllMyQuests());
        },
        goToQuestPage: function goToQuestPage(redirect) {
            dispatch(QuestActions.goToQuestPage(redirect));
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['Quest'],
        user: state['Nav']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Quest);

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("randomstring");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("react-datepicker");

/***/ }),
/* 59 */
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _response = __webpack_require__(3);

var _response2 = _interopRequireDefault(_response);

var _users = __webpack_require__(32);

var _users2 = _interopRequireDefault(_users);

var _dbUtils = __webpack_require__(8);

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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.images = __webpack_require__(87);
exports.journeys = __webpack_require__(88);
exports.locations = __webpack_require__(89);
exports.meanings = __webpack_require__(90);
exports.notebooks = __webpack_require__(91);
exports.pages = __webpack_require__(92);
exports.quests = __webpack_require__(93);
exports.schemata = __webpack_require__(94);
exports.suggestions = __webpack_require__(95);
exports.tags = __webpack_require__(96);
exports.users = __webpack_require__(97);
exports.works = __webpack_require__(98);

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(27);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(18);

var _server = __webpack_require__(154);

var _server2 = _interopRequireDefault(_server);

var _index = __webpack_require__(137);

var _index2 = _interopRequireDefault(_index);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _ioc = __webpack_require__(125);

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
    return '\n        <!doctype html>\n        <html lang="en">\n        <head>\n            <meta charset="utf-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n            <title>IoC Prototype</title>\n            <link rel="shortcut icon" href="favicon.ico">\n            <script src="https://use.typekit.net/ipx6imu.js"></script>\n            <script>try{Typekit.load({ async: true });}catch(e){}</script>\n            <base href="/" />\n        </head>\n        <body>\n        <div id="ioc-app"><div>' + html + '</div></div>\n        <script>\n            window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n        </script>\n        <script type=text/javascript src="../bin/app.bundle.js"></script>\n        </body>\n        </html>';
}
//ToDo: Webpack or API to serve favicon.

exports.default = router;

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("node-schedule");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("swagger-jsdoc");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _image = __webpack_require__(28);

var _image2 = _interopRequireDefault(_image);

var _tag = __webpack_require__(22);

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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _journey = __webpack_require__(74);

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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _location = __webpack_require__(75);

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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _meaning = __webpack_require__(29);

var _meaning2 = _interopRequireDefault(_meaning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoCSeed = __webpack_require__(21);

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
            schemaName: matchClassifications(ontology.results[i].classes),
            lastUpdate: 'new'
        };
        meanings.push(meaning);
    }
    return session.run('UNWIND {meanings} AS map MATCH(tag:Tag {id:{tagId}}) CREATE (m:Meaning)-[:DERIVED_FROM]->(tag) SET m=map RETURN map', { meanings: meanings, tagId: tagId }).then(function (results) {
        return results.records[0].get('map');
    });
};

var update = function update(session) {};

var deletion = function deletion(session) {};

var retrieve = function retrieve(session, meaningId) {
    return session.run('MATCH (meaning:Meaning {id:{meaningId}}) RETURN meaning', { meaningId: meaningId }).then(function (results) {
        return new _meaning2.default(results.records[0].get('meaning'));
    });
};

module.exports = {
    extractFromTag: extractFromTag,
    update: update,
    deletion: deletion,
    retrieve: retrieve
};

/***/ }),
/* 74 */
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
/* 75 */
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
/* 76 */
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
/* 77 */
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
        'id': _node.properties['id'],
        'startDate': _node.properties['startDate'],
        'goalDate': _node.properties['goalDate'],
        'completed': _node.properties['completed'],
        'hidden': _node.properties['hidden'],
        'statement': _node.properties['statement']
    });
};

exports.default = Quest;

/***/ }),
/* 78 */
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
/* 79 */
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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _notebook = __webpack_require__(30);

var _notebook2 = _interopRequireDefault(_notebook);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session, when, what, how, name1, name2, name3, userId) {
    var notebookId = _uuid2.default.v4();
    return session.run('MATCH (n:Notebook {id:{notebookId}}) RETURN n', { notebookId: notebookId }).then(function (results) {
        if (!_lodash2.default.isEmpty(results.records)) {
            throw { url: 'Notebook already in use', status: 400 };
        } else {
            return session.run('CREATE (notebook:Notebook {id:{notebookId}, when:{when}, how:{how}, name1:{name1}, name2:{name2}, name3:{name3}}) RETURN notebook', {
                notebookId: notebookId,
                when: when,
                what: what,
                how: how,
                name1: name1,
                name2: name2,
                name3: name3
            }).then(function (results) {
                var notebook = new _notebook2.default(results.records[0].get('notebook'));
                return session.run('MATCH (nb:Notebook {id:{notebookId}}) CREATE (u:User {id:{userId}})-[:OWNS_THIS_BOOK]->(nb) RETURN nb', {
                    notebookId: notebookId,
                    userId: userId
                }).then(function (Nresults) {
                    return notebook;
                });
            });
        }
    });
};

var update = function update(session3) {};

var deletion = function deletion(session) {};

var mine = function mine(session, userId) {
    //return session.run('MATCH ({id:{userId}})-[:OWNS_THIS_BOOK]->(n:Notebook) MATCH ({id:n.id})<-[:IS_BOUND_IN]-(pg) MATCH(p:Page {id:pg.id}) RETURN n,p',{userId:userId}

    return session.run('MATCH ({id:{userId}})-[:OWNS_THIS_BOOK]->(n) MATCH (notebook:Notebook {id:n.id}) RETURN notebook', { userId: userId }).then(function (results) {
        if (results.records.length === 0) {
            return { noteBooksFound: 0 };
        }
        var notebooks = [];
        var pages = [];
        for (var i = 0; i < results.records.length; i++) {
            var aNotebook = new _notebook2.default(results.records[i].get('notebook'));
            notebooks.push(aNotebook);
            // let aPage = new Image(results.records[i].get('p'));
            // pages.push(aPage);
        }
        return {
            notebooks: notebooks,
            //pages: pages,
            noteBooksFound: notebooks.length
        };
    });
};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    mine: mine
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _page = __webpack_require__(76);

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session) {};

var update = function update(session) {};

var deletion = function deletion(session) {};

var inNotebook = function inNotebook(session) {};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    inNotebook: inNotebook
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _quest = __webpack_require__(77);

var _quest2 = _interopRequireDefault(_quest);

var _suggestion = __webpack_require__(31);

var _suggestion2 = _interopRequireDefault(_suggestion);

var _user = __webpack_require__(23);

var _user2 = _interopRequireDefault(_user);

var _meaning = __webpack_require__(29);

var _meaning2 = _interopRequireDefault(_meaning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session, suggestionId, userId, startDate, goalDate, completed, hidden, statement) {
    var questId = _uuid2.default.v4();
    return session.run('CREATE (quest:Quest {id:{questId}, startDate:{startDate}, goalDate:{goalDate}, completed:{completed}, hidden:{hidden}, statement:{statement}}) RETURN quest', { questId: questId, startDate: startDate, goalDate: goalDate, completed: completed, hidden: hidden, statement: statement }).then(function (results) {
        var questResult = results;
        return session.run('MATCH (quest:Quest {id:{questId}}) MATCH (user:User {id:{userId}}) MATCH (suggestion:Suggestion {id:{suggestionId}}) CREATE (suggestion)<-[:SUGGESTED_BY]-(quest) CREATE (user)-[:IS_PARTICIPATING_IN]->(quest) CREATE (user)-[:IS_ON_A_QUEST_FROM]->(suggestion)', { questId: questId, suggestionId: suggestionId, userId: userId }).then(function (qResults) {
            return new _quest2.default(questResult.records[0].get('quest'));
        });
    });
};

var update = function update(session, questId, startDate, goalDate, completed, hidden, statement) {
    return session.run('MATCH (update:Quest {id:{questId}}) SET update.startDate = {startDate}, update.goalDate = {goalDate}, update.completed = {completed}, update.hidden = {hidden}, update.statement = {statement} RETURN update', { questId: questId, startDate: startDate, goalDate: goalDate, completed: completed, hidden: hidden, statement: statement }).then(function (results) {
        return new _quest2.default(results.records[0].get('update'));
    });
};

var deletion = function deletion(session, questId) {
    return session.run('MATCH (d:Quest {id:{questId}}) DETACH DELETE d', { questId: questId }).then(function (results) {
        return { error: 'Can not delete quest' };
    });
};

var display = function display(session, questId) {
    return session.run('MATCH (q:Quest {id:{questId}}) MATCH (q)-[:SUGGESTED_BY]->(s:Suggestion) MATCH (m:Meaning {id:s.meaningId}) MATCH(u:User)-[:IS_PARTICIPATING_IN]->(q) RETURN q, s, m, u', { questId: questId }).then(function (results) {
        var quest = new _quest2.default(results.records[0].get('q'));
        var suggestion = new _suggestion2.default(results.records[0].get('s'));
        var meaning = new _meaning2.default(results.records[0].get('m'));
        var user = new _user2.default(results.records[0].get('u'));
        return {
            user: user,
            quest: quest,
            suggestion: suggestion,
            meaning: meaning
        };
    });
};

var mine = function mine(session, userId) {
    return session.run('MATCH (u:User {id:{userId}}) MATCH (q:Quest)<-[:IS_PARTICIPATING_IN]-(u) RETURN q', { userId: userId }).then(function (results) {
        return new _quest2.default(results.records[0].get('q'));
    });
};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    display: display,
    mine: mine
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _schema = __webpack_require__(78);

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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _suggestion = __webpack_require__(31);

var _suggestion2 = _interopRequireDefault(_suggestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoCSeed = __webpack_require__(21);
var suggestionBox = [];

var create = function create(session) {};

var update = function update(session) {};

var getASuggestion = function getASuggestion(meaning) {
    var schemaName = meaning.properties.schemaName;
    if (schemaName !== undefined) {
        if (IoCSeed.suggestionData[schemaName] && schemaName !== 'none') {
            var schema = IoCSeed.suggestionData[schemaName];
            for (var x = 0; x < schema.actions.length; x++) {
                var pString = schema.actions[x].prompt;
                var spString = pString.split(' ');
                for (var y = 0; y < spString.length; y++) {
                    var article = null;
                    if (/\b[aeiou]\w*/ig.test(meaning.properties.label)) {
                        article = 'an';
                    } else {
                        article = 'a';
                    }
                    spString[y] = spString[y].replace(/%&.*&%/, article);
                    spString[y] = spString[y].replace(/%\^.*\^%/, meaning.properties.label);
                }
                var suggestion = {
                    id: _uuid2.default.v4(),
                    meaningId: meaning.properties.id,
                    prompt: spString.join(' ')
                };
                suggestionBox.push(suggestion);
            }
        }
    }
};

var batchCreateFromMeanings = function batchCreateFromMeanings(session) {
    return session.run('MATCH (n:Meaning {lastUpdate:{lastUpdate}}) SET n.lastUpdate={newUpdate} RETURN n LIMIT 100', { lastUpdate: 'new', newUpdate: 'updated' }).then(function (results) {
        for (var i = 0; i < results.records.length; i++) {
            var examined = results.records[i].get('n');
            getASuggestion(examined);
        }
        return session.run('UNWIND {suggestionBox} AS box CREATE (suggestion:Suggestion) SET suggestion=box', { suggestionBox: suggestionBox }).then(function (sResults) {});
    });
};

var getSuggestions = function getSuggestions(session, tagId) {
    return session.run('MATCH (t:Tag {id:{tagId}}) MATCH (meaning:Meaning)-[:DERIVED_FROM]->(t) MATCH(m:Meaning {id:m.id}) MATCH(s:Suggestion {meaningId:m.id}) RETURN s', { tagId: tagId }).then(function (results) {
        var suggestionGroup = [];
        var aSuggestion = null;
        for (var n = 0; n < results.records.length; n++) {
            aSuggestion = new _suggestion2.default(results.records[n].get('s'));
            suggestionGroup.push(aSuggestion);
        }
        return JSON.stringify(suggestionGroup);
    });
};

var deletion = function deletion(session) {};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    batchCreateFromMeanings: batchCreateFromMeanings,
    getSuggestions: getSuggestions
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _tag = __webpack_require__(22);

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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _work = __webpack_require__(79);

var _work2 = _interopRequireDefault(_work);

var _image = __webpack_require__(28);

var _image2 = _interopRequireDefault(_image);

var _user = __webpack_require__(23);

var _user2 = _interopRequireDefault(_user);

var _tag = __webpack_require__(22);

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(session, imageId, userId, notebookId) {
    var artworkId = _uuid2.default.v4();
    return session.run('CREATE (work:Work {id: {id}}) RETURN work', { id: artworkId }).then(function (results) {
        var artResults = results;
        return session.run('MATCH (work:Work {id:{artworkId}}) MATCH(notebook:Notebook {id:{notebookId}}) CREATE(user {id:{userId}})-[:CREATED]->(work) CREATE(image {id:{imageId}})<-[:DISPLAYS]-(work) CREATE((work)-[:IS_PART_OF_THIS_NOTEBOOK]->(notebook))', {
            artworkId: artworkId,
            userId: userId,
            imageId: imageId,
            notebookId: notebookId
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
    return session.run('MATCH (work:Work {id:{id}})-[:DISPLAYS]->(i) MATCH (work:Work {id:{id}})<-[:CREATED]-(u) MATCH (work:Work {id:{id}})-[:ASSOCIATED_WITH]->(t) MATCH(tag:Tag {id:t.id}) MATCH (user:User {id:u.id}) MATCH (image:Image {id:i.id}) RETURN work, image, user, tag', { id: workId }).then(function (results) {
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

var mine = function mine(session, userId) {
    return session.run('MATCH ({id:{userId}})-[:CREATED]->(w:Work) MATCH ({id:w.id})-[:DISPLAYS]->(im) MATCH(i:Image {id:im.id}) RETURN i,w', { userId: userId }).then(function (results) {
        var works = [];
        var images = [];
        for (var i = 0; i < results.records.length; i++) {
            var aWork = new _work2.default(results.records[i].get('w'));
            works.push(aWork);
            var anImage = new _image2.default(results.records[i].get('i'));
            images.push(anImage);
        }
        return {
            work: works,
            image: images
        };
    });
};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    display: display,
    mine: mine
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Images = __webpack_require__(70),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Journeys = __webpack_require__(71),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Locations = __webpack_require__(72),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Meanings = __webpack_require__(73),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
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

/**
 * @swagger
 * /api/v0/meanings/retrieve:
 *   post:
 *     tags:
 *     - meanings
 *     description: Gets a meaning
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

exports.retrieve = function (req, res, next) {
  var meaningId = _.get(req.body, 'meaningId');
  Meanings.retrieve(dbUtils.getSession(req), meaningId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Notebooks = __webpack_require__(80),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
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

exports.create = function (req, res, next) {
  var when = _.get(req.body, 'when');
  var what = _.get(req.body, 'what');
  var how = _.get(req.body, 'how');
  var name1 = _.get(req.body, 'name1');
  var name2 = _.get(req.body, 'name2');
  var name3 = _.get(req.body, 'name3');
  var userId = _.get(req.body, 'userId');
  Notebooks.create(dbUtils.getSession(req), when, what, how, name1, name2, name3, userId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

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

/**
 * @swagger
 * /api/v0/notebooks/mine:
 *   post:
 *     tags:
 *     - notebooks
 *     description: Displays the user's notebook
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

exports.mine = function (req, res, next) {
  var userId = _.get(req.body, 'userId');
  Notebooks.mine(dbUtils.getSession(req), userId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Pages = __webpack_require__(81),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
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

/**
 * @swagger
 * /api/v0/pages/in-notebook:
 *   post:
 *     tags:
 *     - pages
 *     description: Displays pages in a given notebook
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

exports.inNotebook = function (req, res, next) {
  var userId = _.get(req.body, 'userId');
  var notebookId = _.get(req.body, 'notebookId');
  Pages.inNotebook(dbUtils.getSession(req), userId, notebookId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Quests = __webpack_require__(82),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
    _ = __webpack_require__(0);

//ToDo: Update Swagger descriptions

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

exports.create = function (req, res, next) {
  var suggestionId = _.get(req.body, 'suggestionId');
  var userId = _.get(req.body, 'userId');
  var startDate = _.get(req.body, 'startDate');
  var goalDate = _.get(req.body, 'goalDate');
  var completed = _.get(req.body, 'completed');
  var hidden = _.get(req.body, 'hidden');
  var statement = _.get(req.body, 'statement');
  Quests.create(dbUtils.getSession(req), suggestionId, userId, startDate, goalDate, completed, hidden, statement).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/**
 * @swagger
 * /api/v0/quests/update:
 *   post:
 *     tags:
 *     - quests
 *     description: Updates a quest
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *              questId:
 *                  type: String
 *                  description: The uuid of the quest to update
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.update = function (req, res, next) {
  var questId = _.get(req.body, 'questId');
  var startDate = _.get(req.body, 'startDate');
  var goalDate = _.get(req.body, 'goalDate');
  var completed = _.get(req.body, 'completed');
  var hidden = _.get(req.body, 'hidden');
  var statement = _.get(req.body, 'statement');
  Quests.update(dbUtils.getSession(req), questId, startDate, goalDate, completed, hidden, statement).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/**
 * @swagger
 * /api/v0/quests/delete:
 *   post:
 *     tags:
 *     - quests
 *     description: Deletes a quest
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *              questId: String - The uuid of the quest to delete
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.deletion = function (req, res, next) {
  var questId = _.get(req.body, 'questId');
  Quests.deletion(dbUtils.getSession(req), questId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/**
 * @swagger
 * /api/v0/quests/display:
 *   post:
 *     tags:
 *     - quests
 *     description: Displays a quest
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *              questId: String - The uuid of the quest to delete
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.display = function (req, res, next) {
  var questId = _.get(req.body, 'questId');
  Quests.display(dbUtils.getSession(req), questId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/**
 * @swagger
 * /api/v0/quests/my-quests:
 *   post:
 *     tags:
 *     - quests
 *     description: Retrieves a user's quests
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.mine = function (req, res, next) {
  var userId = _.get(req.body, 'userId');
  Quests.mine(dbUtils.getSession(req), userId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schemata = __webpack_require__(83),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Suggestions = __webpack_require__(84),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
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

/**
 * @swagger
 * /api/v0/suggestions/batch-create-from-meanings:
 *   post:
 *     tags:
 *     - suggestions
 *     description: Creates suggestions from meanings
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

exports.batchCreateFromMeanings = function (req, res, next) {
  Suggestions.batchCreateFromMeanings(dbUtils.getSession(req)).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/**
 * @swagger
 * /api/v0/suggestions/get-suggestions:
 *   post:
 *     tags:
 *     - suggestions
 *     description: Creates suggestions from meanings
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

exports.getSuggestions = function (req, res, next) {
  var tagId = _.get(req.body, 'tagId');
  Suggestions.getSuggestions(dbUtils.getSession(req), tagId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Tags = __webpack_require__(85),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Users = __webpack_require__(32),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
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

/**
 * @swagger
 * /api/v0/user/update-current-notebook:
 *   post:
 *     tags:
 *     - tags
 *     description: Updates a user's current notebook
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

exports.updateCurrentNotebook = function (req, res, next) {
    var userId = _.get(req.body, 'userId');
    var notebookId = _.get(req.body, 'notebookId');
    console.log('user', userId, 'notebook', notebookId);
    Users.updateCurrentNotebook(dbUtils.getSession(req), userId, notebookId).then(function (response) {
        return writeResponse(res, response);
    }).catch(next);
};

/**
 * @swagger
 * /api/v0/user/get-current-notebook:
 *   post:
 *     tags:
 *     - tags
 *     description: Returns a user's current notebook id
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

exports.getCurrentNotebook = function (req, res, next) {
    var userId = _.get(req.body, 'userId');
    Users.getCurrentNotebook(dbUtils.getSession(req), userId).then(function (response) {
        return writeResponse(res, response);
    }).catch(next);
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Works = __webpack_require__(86),
    writeResponse = __webpack_require__(3).writeResponse,
    writeError = __webpack_require__(3).writeError,
    loginRequired = __webpack_require__(9),
    dbUtils = __webpack_require__(8),
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
  var notebookId = _.get(req.body, 'notebookId');
  Works.create(dbUtils.getSession(req), imageId, userId, notebookId).then(function (response) {
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

/**
 * @swagger
 * /api/v0/works/my-artwork:
 *   post:
 *     tags:
 *     - works
 *     description: Displays a given user's artwork
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

exports.mine = function (req, res, next) {
  var userId = _.get(req.body, 'userId');
  Works.mine(dbUtils.getSession(req), userId).then(function (response) {
    return writeResponse(res, response, 201);
  }).catch(next);
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(27);

var _express2 = _interopRequireDefault(_express);

var _index = __webpack_require__(62);

var _index2 = _interopRequireDefault(_index);

var _neo4j = __webpack_require__(26);

var _neo4j2 = _interopRequireDefault(_neo4j);

var _methodOverride = __webpack_require__(64);

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _swaggerJsdoc = __webpack_require__(69);

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _bodyParser = __webpack_require__(63);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _setAuthUser = __webpack_require__(60);

var _setAuthUser2 = _interopRequireDefault(_setAuthUser);

var _neo4jSessionCleanup = __webpack_require__(59);

var _neo4jSessionCleanup2 = _interopRequireDefault(_neo4jSessionCleanup);

var _response = __webpack_require__(3);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(20).config();
var PathHelper = __webpack_require__(6);

var request = __webpack_require__(67);
var path = __webpack_require__(66);

var routes = __webpack_require__(61);
var scheduler = __webpack_require__(65);
var favicon = __webpack_require__(68);

var app = (0, _express2.default)();
var api = (0, _express2.default)();

app.use(favicon('favicons/favicon.ico'));

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
api.post('/api/' + "v0" + '/users/update-current-notebook', routes.users.updateCurrentNotebook);
api.post('/api/' + "v0" + '/users/get-current-notebook', routes.users.getCurrentNotebook);

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
api.post('/api/' + "v0" + '/notebooks/mine', routes.notebooks.mine);
// ***************************
// * Pages
// ***************************
api.post('/api/' + "v0" + '/pages/create', routes.pages.create);
api.post('/api/' + "v0" + '/pages/update', routes.pages.update);
api.post('/api/' + "v0" + '/pages/delete', routes.pages.deletion);
api.post('/api/' + "v0" + '/pages/in-notebook', routes.pages.inNotebook);

// ***************************
// * Works
// ***************************
api.post('/api/' + "v0" + '/works/create', routes.works.create);
api.post('/api/' + "v0" + '/works/update', routes.works.update);
api.post('/api/' + "v0" + '/works/delete', routes.works.deletion);
api.post('/api/' + "v0" + '/works/display', routes.works.display);
api.post('/api/' + "v0" + '/works/my-work', routes.works.mine);

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
api.post('/api/' + "v0" + '/meanings/retrieve', routes.meanings.retrieve);
// ***************************
// * Journeys
// ***************************
api.post('/api/' + "v0" + '/journeys/create', routes.journeys.create);
api.post('/api/' + "v0" + '/journeys/update', routes.journeys.update);
api.post('/api/' + "v0" + '/journeys/delete', routes.journeys.deletion);
// ***************************
// * Suggestions
// ***************************
api.post('/api/' + "v0" + '/suggestions/batch-create-from-meanings', routes.suggestions.batchCreateFromMeanings);
api.post('/api/' + "v0" + '/suggestions/create-from-tag', routes.suggestions.createFromTag);
api.post('/api/' + "v0" + '/suggestions/get-suggestions', routes.suggestions.getSuggestions);
api.post('/api/' + "v0" + '/suggestions/update', routes.suggestions.update);
api.post('/api/' + "v0" + '/suggestions/delete', routes.suggestions.deletion);
// ***************************
// * Quests
// ***************************
api.post('/api/' + "v0" + '/quests/create', routes.quests.create);
api.post('/api/' + "v0" + '/quests/update', routes.quests.update);
api.post('/api/' + "v0" + '/quests/delete', routes.quests.deletion);
api.post('/api/' + "v0" + '/quests/display', routes.quests.display);
api.post('/api/' + "v0" + '/quests/my-quests', routes.quests.mine);

app.listen("3000", function () {
    console.log('Ioc Express Server started on ' + "3000");
});

api.listen("3030", function () {
    console.log('Neo4j server started on ' + "3030");
    console.log('Bolt server at ' + "bolt://127.0.0.1:7687");
});

var suggestionChron = scheduler.scheduleJob('30 * * * * *', function () {
    console.log('suggestionChron');
});

var schemaChron = scheduler.scheduleJob('15 * * * *', function () {
    console.log('Bind Schema to Meanings');
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var HIDE_MEANING_GROUP = exports.HIDE_MEANING_GROUP = 'HIDE_MEANING_GROUP';
var SHOW_MEANING_GROUP = exports.SHOW_MEANING_GROUP = 'SHOW_MEANING_GROUP';
var DISPLAY_MATCHING_QUEST = exports.DISPLAY_MATCHING_QUEST = 'DISPLAY_MATCHING_QUEST';
var DISMISS_MATCHING_QUEST = exports.DISMISS_MATCHING_QUEST = 'DISMISS_MATCHING_QUEST';
var CONFIRM_MATCHING_QUEST = exports.CONFIRM_MATCHING_QUEST = 'CONFIRM_MATCHING_QUEST';

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GO_TO_PROFILE = exports.GO_TO_PROFILE = 'GO_TO_PROFILE';

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.goToArtworkPage = undefined;

var _artworkCard = __webpack_require__(33);

var ArtworkCardActionTypes = _interopRequireWildcard(_artworkCard);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var goToArtworkPage = exports.goToArtworkPage = function goToArtworkPage(redirect) {
    return {
        type: ArtworkCardActionTypes.GO_TO_ARTWORK_PAGE, redirect: redirect
    };
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onClickSubmit = undefined;

var _signIn = __webpack_require__(44);

var SignInActionTypes = _interopRequireWildcard(_signIn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var onClickSubmit = exports.onClickSubmit = function onClickSubmit() {
    return {
        type: SignInActionTypes.SIGN_IN_FORM_SUBMITTED
    };
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onClickSubmit = undefined;

var _signUp = __webpack_require__(45);

var SignUpActionTypes = _interopRequireWildcard(_signUp);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var onClickSubmit = exports.onClickSubmit = function onClickSubmit() {
    return {
        type: SignUpActionTypes.SIGN_UP_FORM_SUBMITTED
    };
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showQuest = exports.hideSuggestion = exports.showSuggestion = exports.moreSuggestionsLikeThis = exports.undoTakeSuggestion = exports.takeSuggestion = undefined;

var _suggestion = __webpack_require__(46);

var SuggestionActionTypes = _interopRequireWildcard(_suggestion);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var takeSuggestion = exports.takeSuggestion = function takeSuggestion() {
    return {
        type: SuggestionActionTypes.TAKE_SUGGESTION
    };
};

var undoTakeSuggestion = exports.undoTakeSuggestion = function undoTakeSuggestion() {
    return {
        type: SuggestionActionTypes.UNDO_TAKE_SUGGESTION
    };
};

var moreSuggestionsLikeThis = exports.moreSuggestionsLikeThis = function moreSuggestionsLikeThis() {
    return {
        type: SuggestionActionTypes.MORE_SUGGESTIONS_LIKE_THIS
    };
};

var showSuggestion = exports.showSuggestion = function showSuggestion() {
    return {
        type: SuggestionActionTypes.SHOW_SUGGESTION
    };
};

var hideSuggestion = exports.hideSuggestion = function hideSuggestion() {
    return {
        type: SuggestionActionTypes.HIDE_SUGGESTION
    };
};

var showQuest = exports.showQuest = function showQuest(meaning) {
    return {
        type: SuggestionActionTypes.SHOW_QUEST,
        meaning: meaning
    };
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.editBio = exports.uploadAvatar = undefined;

var _userInfo = __webpack_require__(47);

var UserInfoActionTypes = _interopRequireWildcard(_userInfo);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var uploadAvatar = exports.uploadAvatar = function uploadAvatar() {
    return {
        type: UserInfoActionTypes.UPLOAD_AVATAR
    };
};

var editBio = exports.editBio = function editBio() {
    return {
        type: UserInfoActionTypes.EDIT_BIO
    };
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(2);

var _artworkCard_actions = __webpack_require__(102);

var ArtworkCardActions = _interopRequireWildcard(_artworkCard_actions);

var _reactRouter = __webpack_require__(18);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArtworkCard = function (_Component) {
    _inherits(ArtworkCard, _Component);

    function ArtworkCard(props) {
        _classCallCheck(this, ArtworkCard);

        var _this = _possibleConstructorReturn(this, (ArtworkCard.__proto__ || Object.getPrototypeOf(ArtworkCard)).call(this, props));

        _this.state = props;
        return _this;
    }

    _createClass(ArtworkCard, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(nextProps.state);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                _semanticUiReact.Card,
                { onClick: function onClick() {
                        return _this2.state.goToArtworkPage(true);
                    } },
                this.state.doRedirect ? _react2.default.createElement(_reactRouter.Redirect, { push: true, to: "/user/artwork/" + this.props.id }) : null,
                _react2.default.createElement(_semanticUiReact.Image, { src: this.props.image }),
                _react2.default.createElement(
                    _semanticUiReact.Card.Content,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Card.Header,
                        null,
                        this.props.id
                    )
                )
            );
        }
    }]);

    return ArtworkCard;
}(_react.Component);

ArtworkCard.propTypes = {
    id: _propTypes2.default.string.isRequired,
    image: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    doRedirect: _propTypes2.default.bool,
    goToArtworkPage: _propTypes2.default.func,
    height: _propTypes2.default.number,
    width: _propTypes2.default.number
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        goToArtworkPage: function goToArtworkPage(redirect) {
            dispatch(ArtworkCardActions.goToArtworkPage(redirect));
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['ArtworkCard']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ArtworkCard);

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _semanticUiReact = __webpack_require__(2);

var _artwork_actions = __webpack_require__(48);

var ArtworkActions = _interopRequireWildcard(_artwork_actions);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _tag = __webpack_require__(118);

var _tag2 = _interopRequireDefault(_tag);

var _suggestion = __webpack_require__(117);

var _suggestion2 = _interopRequireDefault(_suggestion);

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
        _this.temp = _this.temp.bind(_this);
        _this.loadSuggestions = _this.loadSuggestions.bind(_this);
        _this.updateSuggestions = _this.updateSuggestions.bind(_this);
        return _this;
    }
    // ToDo: Can Remove Tags #11


    _createClass(Artwork, [{
        key: 'temp',
        value: function temp() {
            console.log('temp');
        }
    }, {
        key: 'updateSuggestions',
        value: function updateSuggestions(suggestions) {
            this.props.getSuggestions(suggestions);
        }
    }, {
        key: 'loadSuggestions',
        value: function loadSuggestions(tags) {
            var _this2 = this;

            var suggestionHolder = [];
            var promptCheck = [];
            for (var t = 0; t < tags.length; t++) {
                var tagData = {
                    tagId: tags[t].id
                };
                _superagent2.default.post(_pathHelper2.default.apiPath + '/suggestions/get-suggestions').set('Content-Type', 'application/json').send(tagData).end(function (error, response) {
                    if (!error && response) {
                        var r = JSON.parse(response.body);
                        for (var s = 0; s < r.length; s++) {
                            if (promptCheck.indexOf(r[s].prompt) === -1) {
                                promptCheck.push(r[s].prompt);
                                suggestionHolder.push(r[s]);
                            }
                        }
                        _this2.updateSuggestions(suggestionHolder);
                    } else {
                        console.log('Error getting suggestions', error);
                    }
                });
            }
        }
    }, {
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
            var _this3 = this;

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
                    _this3.loadSuggestions(response.body.tags);
                    _this3.props.loadArtwork(_data);
                } else {
                    console.log('Error', error);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var tagOptions = null;
            var suggestionsOptions = null;
            if (this.state.work) {
                var t = this.state.work.tags;
                tagOptions = t.map(function (tag) {
                    return _react2.default.createElement(_tag2.default, {
                        word: tag.word,
                        key: tag.id,
                        ontology: tag.ontology,
                        id: tag.id,
                        isEditable: true,
                        clickActions: [{ label: 'reject', icon: 'remove', action: _this4.temp }]
                    });
                });
            }
            if (this.state.suggestions) {
                var s = this.state.suggestions;
                suggestionsOptions = s.map(function (suggestion) {
                    return _react2.default.createElement(_suggestion2.default, {
                        id: suggestion.id,
                        prompt: suggestion.prompt,
                        key: suggestion.prompt + suggestion.meaningId,
                        meaningId: suggestion.meaningId
                    });
                });
            }
            return _react2.default.createElement(
                _semanticUiReact.Segment,
                null,
                this.state.work ? _react2.default.createElement(
                    _semanticUiReact.Container,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Container,
                        { textAlign: 'center' },
                        _react2.default.createElement(_semanticUiReact.Image, {
                            src: this.state.work.image.url,
                            width: this.state.work.image.width,
                            height: this.state.work.image.height,
                            centered: true,
                            bordered: true
                        }),
                        _react2.default.createElement(
                            _semanticUiReact.Button.Group,
                            { className: 'art-bottom-controls' },
                            _react2.default.createElement(
                                _semanticUiReact.Button,
                                { basic: true, onClick: function onClick() {
                                        return _this4.state.browseBasedOnThis();
                                    } },
                                'Start Journey Based on this Work'
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Button,
                                { basic: true, onClick: function onClick() {
                                        return _this4.state.userNameClicked();
                                    } },
                                'User Name'
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Button,
                                { basic: true, onClick: function onClick() {
                                        return _this4.state.moreLikeThis();
                                    } },
                                'More Like This'
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Button,
                                { basic: true, onClick: function onClick() {
                                        return _this4.state.relatedToMe();
                                    } },
                                'Show My Work Related to This'
                            )
                        )
                    ),
                    _react2.default.createElement(_semanticUiReact.Divider, null),
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
                    ),
                    _react2.default.createElement(
                        'h2',
                        null,
                        'Suggestions from this image'
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Card.Group,
                        { itemsPerRow: 4 },
                        suggestionsOptions
                    )
                ) : null
            );
        }
    }]);

    return Artwork;
}(_react.Component);

Artwork.propTypes = {
    loadArtwork: _propTypes2.default.func.isRequired,
    getSuggestions: _propTypes2.default.func.isRequired,
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
    }),
    suggestions: _propTypes2.default.any
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
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(2);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = __webpack_require__(5);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _createNotebookForm_actions = __webpack_require__(49);

var CreateNotebookFormActions = _interopRequireWildcard(_createNotebookForm_actions);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _moment = __webpack_require__(25);

var _moment2 = _interopRequireDefault(_moment);

var _reactDatepicker = __webpack_require__(58);

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _reactRouter = __webpack_require__(18);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateNotebookForm = function (_Component) {
    _inherits(CreateNotebookForm, _Component);

    function CreateNotebookForm(props) {
        _classCallCheck(this, CreateNotebookForm);

        var _this = _possibleConstructorReturn(this, (CreateNotebookForm.__proto__ || Object.getPrototypeOf(CreateNotebookForm)).call(this, props));

        _this.state = props;
        _this.setUser = _this.setUser.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleNext = _this.handleNext.bind(_this);
        _this.handleTyping = _this.handleTyping.bind(_this);
        _this.handleDatePicker = _this.handleDatePicker.bind(_this);
        return _this;
    }

    _createClass(CreateNotebookForm, [{
        key: 'setUser',
        value: function setUser(data) {
            this.props.updateUserId(data.id);
        }
    }, {
        key: 'handleDatePicker',
        value: function handleDatePicker(date) {
            this.setState({ when: date });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(nextProps.state);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ when: (0, _moment2.default)() });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.parentPage['doRedirect'] = false;
        }
    }, {
        key: 'handleNext',
        value: function handleNext(e) {
            e.preventDefault();
            this.setUser(this.props.user['userInfo']);
            this.props.nextStep(1);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            _superagent2.default.post(_pathHelper2.default.apiPath + '/notebooks/create').set('Content-Type', 'application/json').send(JSON.stringify(this.state)).end(function (error, response) {
                if (!error && response) {
                    var nId = response.body.id;
                    _this2.setState({ noteBookId: nId, doRedirect: true });
                } else {
                    console.log('Error submitting your notebook', error);
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
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                null,
                this.state.step === 0 ? _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Form,
                        { onSubmit: this.handleNext },
                        _react2.default.createElement(
                            _semanticUiReact.Form.Field,
                            null,
                            _react2.default.createElement(
                                'label',
                                null,
                                'Name'
                            ),
                            _react2.default.createElement('input', { placeholder: '', name: 'name1', value: this.props.name1,
                                onChange: this.handleTyping }),
                            _react2.default.createElement('input', { placeholder: '', name: 'name2', value: this.props.name2,
                                onChange: this.handleTyping }),
                            _react2.default.createElement('input', { placeholder: '', name: 'name3', value: this.props.name3,
                                onChange: this.handleTyping })
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Button,
                            { type: 'submit', onClick: function onClick() {
                                    return _this3.handleNext;
                                } },
                            'Next'
                        )
                    )
                ) : _react2.default.createElement(
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
                                'When did receive this notebook?'
                            ),
                            _react2.default.createElement(_reactDatepicker2.default, {
                                selected: this.state.when,
                                onChange: this.handleDatePicker
                            })
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Form.Field,
                            null,
                            _react2.default.createElement(
                                'label',
                                null,
                                'How do you plan to use it?'
                            ),
                            _react2.default.createElement('input', { placeholder: '', name: 'how', value: this.props.how, onChange: this.handleTyping })
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Form.Field,
                            null,
                            _react2.default.createElement(
                                'label',
                                null,
                                'What do you wish to accomplish by the time you\'ve filled this notebook?'
                            ),
                            _react2.default.createElement('input', { placeholder: '', name: 'what', value: this.props.what, onChange: this.handleTyping }),
                            _react2.default.createElement('input', { type: 'hidden', name: 'userId', value: this.state.userId })
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Button,
                            { type: 'submit', onClick: function onClick() {
                                    return _this3.handleSubmit;
                                } },
                            'Submit'
                        )
                    )
                ),
                this.state.doRedirect ? _react2.default.createElement(_reactRouter.Redirect, { to: "/notebooks/" + this.state.noteBookId }) : null
            );
        }
    }]);

    return CreateNotebookForm;
}(_react.Component);

CreateNotebookForm.propTypes = {
    name1: _propTypes2.default.string,
    name2: _propTypes2.default.string,
    name3: _propTypes2.default.string,
    how: _propTypes2.default.string,
    when: _propTypes2.default.instanceOf(Date),
    what: _propTypes2.default.string,
    step: _propTypes2.default.number.isRequired,
    doRedirect: _propTypes2.default.bool.isRequired,
    noteBookId: _propTypes2.default.string,
    userId: _propTypes2.default.string
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        doCreation: function doCreation(data) {
            dispatch(CreateNotebookFormActions.doCreation(data));
        },
        nextStep: function nextStep(step) {
            dispatch(CreateNotebookFormActions.nextStep(step));
        },
        updateUserId: function updateUserId(id) {
            dispatch(CreateNotebookFormActions.updateUserId(id));
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['CreateNotebookForm'],
        parentPage: state['Notebook'],
        user: state['Nav']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CreateNotebookForm);

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDropzone = __webpack_require__(155);

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _reactRouterDom = __webpack_require__(16);

var _semanticUiReact = __webpack_require__(2);

var _imageUploader_actions = __webpack_require__(50);

var ImageUploaderActions = _interopRequireWildcard(_imageUploader_actions);

var _pathHelper = __webpack_require__(6);

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

            var userData = {
                userId: userId
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/users/get-current-notebook').set('Content-Type', 'application/json').send(userData).end(function (error, response) {
                if (!error && response) {
                    var res = response.body;
                    _this6.currentNotebook = res.id;

                    var createData = {
                        imageId: imageId,
                        userId: userId,
                        notebookId: _this6.currentNotebook
                    };
                    var data = JSON.stringify(createData);
                    _superagent2.default.post(_pathHelper2.default.apiPath + '/works/create').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                        if (!error && response) {
                            _this6.setState({ newArtWorkId: response.body.id });
                        } else {
                            console.log('Error saving your image', error);
                        }
                    });
                } else {
                    console.log('error retrieving your quests', error);
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
                //ToDo: Refactor to one unwind
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
                _semanticUiReact.Container,
                { className: 'image-uploader-hold' },
                this.state.hasUploaded === true ? null : _react2.default.createElement(
                    'h1',
                    null,
                    'Upload your artwork from this Moleskine notebook.'
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
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _semanticUiReact = __webpack_require__(2);

var _myArtwork_actions = __webpack_require__(51);

var MyArtworkActions = _interopRequireWildcard(_myArtwork_actions);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _artworkCard = __webpack_require__(107);

var _artworkCard2 = _interopRequireDefault(_artworkCard);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyArtwork = function (_Component) {
    _inherits(MyArtwork, _Component);

    function MyArtwork(props) {
        _classCallCheck(this, MyArtwork);

        var _this = _possibleConstructorReturn(this, (MyArtwork.__proto__ || Object.getPrototypeOf(MyArtwork)).call(this, props));

        _this.state = props;
        _this.setUser = _this.setUser.bind(_this);
        _this.getMyArtwork = _this.getMyArtwork.bind(_this);
        return _this;
    }

    _createClass(MyArtwork, [{
        key: 'getMyArtwork',
        value: function getMyArtwork() {
            var _this2 = this;

            if (!this.state.stopper) {
                var data = {
                    userId: this.userId
                };
                _superagent2.default.post(_pathHelper2.default.apiPath + '/works/my-work').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                    if (!error && response) {
                        console.log(response.body.work.length, response.body['work'].length);
                        var worksOfArt = [];
                        for (var i = 0; i < response.body.work.length; i++) {
                            var aWork = {
                                id: response.body.work[i].id,
                                image: response.body.image[i].url,
                                height: response.body.image[i].height,
                                width: response.body.image[i].width
                            };
                            worksOfArt.push(aWork);
                        }
                        _this2.props.loadMyArtwork(true, worksOfArt);
                    } else {
                        console.log('error retrieving your quests', error);
                    }
                });
            }
        }
    }, {
        key: 'setUser',
        value: function setUser(data) {
            this.userId = data.id;
            this.getMyArtwork();
            this.setState({ stopper: true });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(nextProps.state);
            if (nextProps.user.userInfo.id !== '' && nextProps.user.userInfo.id !== undefined) {
                this.setUser(nextProps.user.userInfo);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var ArtworkCardGroup = null;
            if (this.state.haveArtwork) {
                var artwork = this.state.myArtwork;
                ArtworkCardGroup = artwork.map(function (a, index) {
                    return _react2.default.createElement(_artworkCard2.default, { id: a.id, title: 'TK', image: a.image, key: index });
                });
            }
            return _react2.default.createElement(
                _semanticUiReact.Segment,
                null,
                _react2.default.createElement(_semanticUiReact.Header, { content: 'My Artwork' }),
                ArtworkCardGroup
            );
        }
    }]);

    return MyArtwork;
}(_react.Component);

MyArtwork.propTypes = {
    myArtwork: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        id: _propTypes2.default.string
    })),
    haveArtwork: _propTypes2.default.bool,
    stopper: _propTypes2.default.bool,
    loadMyArtwork: _propTypes2.default.func.isRequired
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        loadMyArtwork: function loadMyArtwork(having, artwork) {
            dispatch(MyArtworkActions.loadMyArtwork(having, artwork));
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['MyArtwork'],
        user: state['Nav']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MyArtwork);

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _semanticUiReact = __webpack_require__(2);

var _myNotebooks_actions = __webpack_require__(52);

var MyNotebooksActions = _interopRequireWildcard(_myNotebooks_actions);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _noteBookTout = __webpack_require__(113);

var _noteBookTout2 = _interopRequireDefault(_noteBookTout);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyNotebooks = function (_Component) {
    _inherits(MyNotebooks, _Component);

    function MyNotebooks(props) {
        _classCallCheck(this, MyNotebooks);

        var _this = _possibleConstructorReturn(this, (MyNotebooks.__proto__ || Object.getPrototypeOf(MyNotebooks)).call(this, props));

        _this.state = props;
        _this.setUser = _this.setUser.bind(_this);
        _this.getNotebooks = _this.getNotebooks.bind(_this);
        _this.setNotebook = _this.setNotebook.bind(_this);

        return _this;
    }

    _createClass(MyNotebooks, [{
        key: 'getNotebooks',
        value: function getNotebooks() {
            var _this2 = this;

            var data = {
                userId: this.userId
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/notebooks/mine').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    var res = response.body;
                    if (res.noteBooksFound <= 0) {
                        _this2.props.broadcastUp();
                    }
                    _this2.setState({ noteBooksFound: res.noteBooksFound, myNoteBooks: res.notebooks });
                } else {
                    console.log('error retrieving your quests', error);
                }
            });
        }
    }, {
        key: 'setUser',
        value: function setUser(data) {
            var _this3 = this;

            this.userId = data.id;
            this.getNotebooks();
            this.setState({ stopper: true, doRedirect: false });
            var userData = {
                userId: this.userId
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/users/get-current-notebook').set('Content-Type', 'application/json').send(userData).end(function (error, response) {
                if (!error && response) {
                    var res = response.body;
                    _this3.setState({ currentNotebook: res.id });
                } else {
                    console.log('error retrieving your quests', error);
                }
            });
        }
    }, {
        key: 'setNotebook',
        value: function setNotebook(id) {
            var _this4 = this;

            this.setState({ currentNotebook: id });
            var data = {
                userId: this.userId,
                notebookId: id
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/users/update-current-notebook').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    var res = response.body;
                    _this4.setState({ currentNotebook: res.id });
                } else {
                    console.log('error retrieving your quests', error);
                }
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(nextProps.state);
            if (nextProps.user.userInfo.id !== '' && nextProps.user.userInfo.id !== undefined) {
                this.setUser(nextProps.user.userInfo);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var notebookGroup = null;
            if (this.state.noteBooksFound > 0) {
                var notebooks = this.state.myNoteBooks;
                notebookGroup = notebooks.map(function (n, index) {
                    return _react2.default.createElement(_noteBookTout2.default, { name: n.name1 + '-' + n.name2 + '-' + n.name3, isActive: n.id === _this5.state.currentNotebook, id: n.id, linkToNotebook: function linkToNotebook() {
                            return _this5.setNotebook(n.id);
                        }, key: index });
                });
            }
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    null,
                    _react2.default.createElement(_semanticUiReact.Header, { content: 'My notebooks' }),
                    notebookGroup
                )
            );
        }
    }]);

    return MyNotebooks;
}(_react.Component);

MyNotebooks.propTypes = {
    myNoteBooks: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        id: _propTypes2.default.string
    })),
    currentNotebook: _propTypes2.default.string,
    noteBooksFound: _propTypes2.default.number,
    broadcastUp: _propTypes2.default.func
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        showMyNotebooks: function showMyNotebooks(notebooks, notebooksFound) {
            dispatch(MyNotebooksActions.showMyNotebooks(notebooks, notebooksFound));
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['MyNotebooks'],
        user: state['Nav']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MyNotebooks);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var img = __webpack_require__(157);

var NotebookTout = function NotebookTout(props) {
    var setMe = function setMe() {
        return props.linkToNotebook();
    };
    return _react2.default.createElement(
        'div',
        { className: 'notebook-tout-wrapper' },
        _react2.default.createElement(
            _semanticUiReact.Card,
            { onClick: function onClick() {
                    return setMe();
                }, className: props.isActive ? 'notebook-tout active-notebook' : 'notebook-tout' },
            _react2.default.createElement(_semanticUiReact.Image, { className: 'notebook-tout-image', src: img }),
            _react2.default.createElement(
                _semanticUiReact.Card.Content,
                null,
                _react2.default.createElement(
                    _semanticUiReact.Card.Header,
                    null,
                    props.name
                ),
                _react2.default.createElement(
                    _semanticUiReact.Card.Description,
                    null,
                    props.isActive ? 'Current Notebook' : null
                )
            )
        ),
        _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/notebooks/' + props.id, className: 'notebook-tout-link' },
            'View'
        )
    );
};

NotebookTout.propTypes = {
    name: _propTypes2.default.string.isRequired,
    linkToNotebook: _propTypes2.default.func.isRequired,
    id: _propTypes2.default.string.isRequired,
    isActive: _propTypes2.default.bool
};

exports.default = NotebookTout;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _semanticUiReact = __webpack_require__(2);

var _quests_actions = __webpack_require__(54);

var QuestsActions = _interopRequireWildcard(_quests_actions);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _quest = __webpack_require__(56);

var _quest2 = _interopRequireDefault(_quest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quests = function (_Component) {
    _inherits(Quests, _Component);

    function Quests(props) {
        _classCallCheck(this, Quests);

        var _this = _possibleConstructorReturn(this, (Quests.__proto__ || Object.getPrototypeOf(Quests)).call(this, props));

        _this.state = props;
        _this.setUser = _this.setUser.bind(_this);
        _this.getMyQuests = _this.getMyQuests.bind(_this);
        return _this;
    }

    _createClass(Quests, [{
        key: 'getMyQuests',
        value: function getMyQuests() {
            var _this2 = this;

            if (!this.state.stopper) {
                var data = {
                    userId: this.userId
                };
                _superagent2.default.post(_pathHelper2.default.apiPath + '/quests/my-quests').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                    if (!error && response) {
                        var res = response.body;
                        var questIds = [];
                        for (var v in res) {
                            if (res.hasOwnProperty(v)) {
                                if (v === 'id') {
                                    questIds.push({ id: res[v] });
                                }
                            }
                        }
                        _this2.props.loadMyQuests(true, questIds);
                    } else {
                        console.log('error retrieving your quests', error);
                    }
                });
            }
        }
    }, {
        key: 'setUser',
        value: function setUser(data) {
            this.userId = data.id;
            this.getMyQuests();
            this.setState({ stopper: true });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(nextProps.state);
            if (nextProps.user.userInfo.id !== '' && nextProps.user.userInfo.id !== undefined) {
                this.setUser(nextProps.user.userInfo);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var questGroup = null;
            if (this.state.haveQuests) {
                var quests = this.state.myQuests;
                questGroup = quests.map(function (q, index) {
                    return _react2.default.createElement(_quest2.default, { promoMode: true, id: q.id, key: index });
                });
            }
            return _react2.default.createElement(
                _semanticUiReact.Segment,
                null,
                _react2.default.createElement(_semanticUiReact.Header, { content: 'My quests' }),
                questGroup
            );
        }
    }]);

    return Quests;
}(_react.Component);

Quests.propTypes = {
    myQuests: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        id: _propTypes2.default.string
    })),
    haveQuests: _propTypes2.default.bool,
    stopper: _propTypes2.default.bool,
    loadMyQuests: _propTypes2.default.func.isRequired
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        loadMyQuests: function loadMyQuests(having, quests) {
            dispatch(QuestsActions.loadMyQuests(having, quests));
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['Quests'],
        user: state['Nav']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Quests);

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(2);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _reactRouterDom = __webpack_require__(16);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var token = __webpack_require__(19);

var SignIn = function (_Component) {
    _inherits(SignIn, _Component);

    function SignIn(props) {
        _classCallCheck(this, SignIn);

        var _this = _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call(this, props));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleTyping = _this.handleTyping.bind(_this);
        //ToDo convert to reducer
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
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(2);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _reactRouterDom = __webpack_require__(16);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var token = __webpack_require__(19);

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
            //ToDo convert to reducer
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
                this.state.redirect ? _react2.default.createElement(_reactRouterDom.Redirect, { to: '/profile' }) : null
            );
        }
    }]);

    return SignUp;
}(_react.Component);

exports.default = SignUp;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(2);

var _reactFontawesome = __webpack_require__(17);

var _suggestion_actions = __webpack_require__(105);

var SuggestionActions = _interopRequireWildcard(_suggestion_actions);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _reactDatepicker = __webpack_require__(58);

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _moment = __webpack_require__(25);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Suggestion = function (_Component) {
    _inherits(Suggestion, _Component);

    function Suggestion(props) {
        _classCallCheck(this, Suggestion);

        var _this = _possibleConstructorReturn(this, (Suggestion.__proto__ || Object.getPrototypeOf(Suggestion)).call(this, props));

        _this.state = props;
        _this.getMeaning = _this.getMeaning.bind(_this);
        _this.handleDatePicker = _this.handleDatePicker.bind(_this);
        _this.acceptSuggestion = _this.acceptSuggestion.bind(_this);
        _this.handleOpen = _this.handleOpen.bind(_this);
        return _this;
    }

    _createClass(Suggestion, [{
        key: 'handleOpen',
        value: function handleOpen() {
            this.setState({ modalOpen: true });
        }
    }, {
        key: 'setUser',
        value: function setUser(data) {
            this.userId = data.id;
        }
    }, {
        key: 'handleDatePicker',
        value: function handleDatePicker(date) {
            this.setState({ startDate: date });
        }
    }, {
        key: 'acceptSuggestion',
        value: function acceptSuggestion() {
            this.setUser(this.props.user['userInfo']);
            this.setState({ modalOpen: false });
            var data = {
                suggestionId: this.props.id,
                userId: this.userId,
                startDate: (0, _moment2.default)(),
                goalDate: this.state.startDate,
                completed: false,
                hidden: false,
                statement: ''
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/quests/create').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    console.log('ok');
                } else {
                    console.log('Error accepting suggestion', error);
                }
            });
        }
    }, {
        key: 'getMeaning',
        value: function getMeaning() {
            var _this2 = this;

            //ToDo: Work with passed Meaning if available then call
            var data = {
                meaningId: this.props.meaningId
            };
            _superagent2.default.post(_pathHelper2.default.apiPath + '/meanings/retrieve').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    _this2.props.showQuest(response.body);
                } else {
                    console.log('Error getting meaning', error);
                }
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(nextProps.state);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ startDate: (0, _moment2.default)() });
        }
        //ToDo: Respond to missing/present image for quest

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                _semanticUiReact.Card,
                null,
                _react2.default.createElement(
                    _semanticUiReact.Card.Content,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Card.Header,
                        null,
                        this.props.prompt
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Card.Meta,
                        null,
                        'Drawing Challenge'
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Card.Content,
                    { extra: true },
                    _react2.default.createElement(
                        _semanticUiReact.Modal,
                        { trigger: _react2.default.createElement(
                                _semanticUiReact.Button,
                                { basic: true, color: 'green', onClick: function onClick() {
                                        return _this3.handleOpen;
                                    } },
                                'Accept'
                            ), onOpen: function onOpen() {
                                return _this3.getMeaning;
                            }, closeIcon: true, open: this.state.modalOpen },
                        _react2.default.createElement(
                            _semanticUiReact.Modal.Header,
                            null,
                            'Accept this suggestion'
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Modal.Content,
                            { image: true },
                            _react2.default.createElement(_semanticUiReact.Image, { wrapped: true, size: 'medium', src: '' }),
                            _react2.default.createElement(
                                _semanticUiReact.Modal.Description,
                                null,
                                _react2.default.createElement(
                                    _semanticUiReact.Header,
                                    null,
                                    this.props.prompt
                                ),
                                this.state.meaning ? _react2.default.createElement(
                                    'h3',
                                    null,
                                    this.state.meaning.label
                                ) : null,
                                this.state.meaning ? _react2.default.createElement(
                                    'p',
                                    null,
                                    this.state.meaning.description
                                ) : null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'bottom-holder' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'ui form' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'field' },
                                            _react2.default.createElement(
                                                'label',
                                                null,
                                                'Set a completion goal date:'
                                            ),
                                            _react2.default.createElement(_reactDatepicker2.default, {
                                                selected: this.state.startDate,
                                                onChange: this.handleDatePicker
                                            })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        _semanticUiReact.Button,
                                        { color: 'green', onClick: this.acceptSuggestion },
                                        'Accept Suggestion'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Suggestion;
}(_react.Component);

Suggestion.propTypes = {
    prompt: _propTypes2.default.string,
    isHidden: _propTypes2.default.bool,
    isTaken: _propTypes2.default.bool,
    takeSuggestion: _propTypes2.default.func,
    undoTakeSuggestion: _propTypes2.default.func,
    showSuggestion: _propTypes2.default.func,
    moreSuggestionsLikeThis: _propTypes2.default.func,
    hideSuggestion: _propTypes2.default.func,
    showQuest: _propTypes2.default.func,
    startDate: _propTypes2.default.instanceOf(Date),
    meaning: _propTypes2.default.shape({
        id: _propTypes2.default.string,
        description: _propTypes2.default.string,
        label: _propTypes2.default.string,
        schemaName: _propTypes2.default.string,
        lastUpdate: _propTypes2.default.any
    })
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        showQuest: function showQuest(meaning) {
            dispatch(SuggestionActions.showQuest(meaning));
        },
        takeSuggestion: function takeSuggestion() {
            dispatch(SuggestionActions.takeSuggestion());
        },
        undoTakeSuggestion: function undoTakeSuggestion() {
            dispatch(SuggestionActions.undoTakeSuggestion());
        },
        moreSuggestionsLikeThis: function moreSuggestionsLikeThis() {
            dispatch(SuggestionActions.moreSuggestionsLikeThis());
        },
        showSuggestion: function showSuggestion() {
            dispatch(SuggestionActions.showSuggestion());
        },
        hideSuggestion: function hideSuggestion() {
            dispatch(SuggestionActions.hideSuggestion());
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        artwork: state['Artwork'],
        state: state['Suggestion'],
        user: state['Nav']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Suggestion);

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(2);

var _reactFontawesome = __webpack_require__(17);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tags = function Tags(props) {
    var buttons = null;

    if (props.clickActions) {
        var btns = props.clickActions;
        buttons = btns.map(function (b, index) {
            return _react2.default.createElement(_reactFontawesome2.default, { name: b.icon, icon: true, key: index, onClick: function onClick() {
                    return b.action;
                }, 'aria-label': b.label, className: 'remove-tag-icon' });
        });
    }
    return _react2.default.createElement(
        'div',
        { className: 'tag' },
        props.isEditable ? _react2.default.createElement(
            _semanticUiReact.Label,
            { className: 'tag-label' },
            props.word,
            buttons
        ) : _react2.default.createElement(
            _semanticUiReact.Label,
            { className: 'tag-label' },
            props.word
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
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = __webpack_require__(2);

var _reactFontawesome = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserCard = function UserCard(props) {
    return _react2.default.createElement(
        _semanticUiReact.Card,
        { onClick: function onClick() {} },
        _react2.default.createElement(_semanticUiReact.Image, { src: '' }),
        _react2.default.createElement(
            _semanticUiReact.Card.Content,
            null,
            _react2.default.createElement(
                _semanticUiReact.Card.Header,
                null,
                props.firstName,
                ' ',
                props.lastName
            ),
            _react2.default.createElement(_semanticUiReact.Card.Meta, null)
        )
    );
};

UserCard.propTypes = {
    avatar: _propTypes2.default.string,
    firstName: _propTypes2.default.string,
    lastName: _propTypes2.default.string,
    bio: _propTypes2.default.string,
    goToProfile: _propTypes2.default.func
};

exports.default = UserCard;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _userCard = __webpack_require__(119);

var _userCard2 = _interopRequireDefault(_userCard);

var _userInfo_actions = __webpack_require__(106);

var UserInfoActions = _interopRequireWildcard(_userInfo_actions);

var _semanticUiReact = __webpack_require__(2);

var _reactFontawesome = __webpack_require__(17);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserInfo = function (_Component) {
    _inherits(UserInfo, _Component);

    function UserInfo(props) {
        _classCallCheck(this, UserInfo);

        var _this = _possibleConstructorReturn(this, (UserInfo.__proto__ || Object.getPrototypeOf(UserInfo)).call(this, props));

        _this.state = props;
        return _this;
    }

    _createClass(UserInfo, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(nextProps.state);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _semanticUiReact.Segment,
                null,
                _react2.default.createElement(_userCard2.default, {
                    firstName: this.props.user['userInfo'].firstName,
                    lastName: this.props.user['userInfo'].lastName
                }),
                _react2.default.createElement(
                    _semanticUiReact.Button,
                    { onClick: this.props.uploadAvatar },
                    'Edit Avatar'
                ),
                _react2.default.createElement(
                    _semanticUiReact.Button,
                    { onClick: this.props.editBio },
                    'Edit Bio'
                )
            );
        }
    }]);

    return UserInfo;
}(_react.Component);

UserInfo.propTypes = {
    editBio: _propTypes2.default.func,
    uploadAvatar: _propTypes2.default.func,
    userInfo: _propTypes2.default.shape({
        id: _propTypes2.default.string,
        username: _propTypes2.default.string,
        firstName: _propTypes2.default.string,
        lastName: _propTypes2.default.string
    })
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        uploadAvatar: function uploadAvatar() {
            dispatch(UserInfoActions.uploadAvatar());
        },
        editBio: function editBio() {
            dispatch(UserInfoActions.editBio());
        }
    };
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        state: state['UserInfo'],
        user: state['Nav']
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserInfo);

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(12);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(13);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _artwork_actions = __webpack_require__(48);

var ArtworkActionCreators = _interopRequireWildcard(_artwork_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(2);

var _artwork = __webpack_require__(108);

var _artwork2 = _interopRequireDefault(_artwork);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArtPage = function (_Component) {
    _inherits(ArtPage, _Component);

    function ArtPage() {
        _classCallCheck(this, ArtPage);

        return _possibleConstructorReturn(this, (ArtPage.__proto__ || Object.getPrototypeOf(ArtPage)).apply(this, arguments));
    }

    _createClass(ArtPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var data = {};
            _superagent2.default.post(_pathHelper2.default.apiPath + '/suggestions/batch-create-from-meanings').set('Content-Type', 'application/json').send(data).end(function (error, response) {
                if (!error && response) {
                    console.log('Suggestions temp', response.body);
                } else {
                    console.log('Batch create error', error);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            var loadArtwork = (0, _redux.bindActionCreators)(ArtworkActionCreators.loadArtwork, dispatch);
            var getSuggestions = (0, _redux.bindActionCreators)(ArtworkActionCreators.getSuggestions, dispatch);
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
                    _react2.default.createElement(_artwork2.default, { loadArtwork: loadArtwork,
                        getSuggestions: getSuggestions,
                        workId: this.props.match.params.id,
                        browseBasedOnThis: browseBasedOnThis,
                        relatedToMe: relatedToMe,
                        moreLikeThis: moreLikeThis,
                        userNameClicked: userNameClicked })
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return ArtPage;
}(_react.Component);

ArtPage.propTypes = {
    art: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        art: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ArtPage);

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(12);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(13);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrowsePage = function (_Component) {
    _inherits(BrowsePage, _Component);

    function BrowsePage() {
        _classCallCheck(this, BrowsePage);

        return _possibleConstructorReturn(this, (BrowsePage.__proto__ || Object.getPrototypeOf(BrowsePage)).apply(this, arguments));
    }

    _createClass(BrowsePage, [{
        key: 'render',
        value: function render() {
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var clickFooterItem = (0, _redux.bindActionCreators)(FooterActionCreators.clickFooterItem, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
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
                            'Browse'
                        )
                    )
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return BrowsePage;
}(_react.Component);

BrowsePage.propTypes = {
    browse: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        browse: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(BrowsePage);

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(12);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _createNotebookForm_actions = __webpack_require__(49);

var CreateNotebookFormActionCreators = _interopRequireWildcard(_createNotebookForm_actions);

var _footer_actions = __webpack_require__(13);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(2);

var _createNotebookForm = __webpack_require__(109);

var _createNotebookForm2 = _interopRequireDefault(_createNotebookForm);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateNewNotebookPage = function (_Component) {
    _inherits(CreateNewNotebookPage, _Component);

    function CreateNewNotebookPage() {
        _classCallCheck(this, CreateNewNotebookPage);

        return _possibleConstructorReturn(this, (CreateNewNotebookPage.__proto__ || Object.getPrototypeOf(CreateNewNotebookPage)).apply(this, arguments));
    }

    _createClass(CreateNewNotebookPage, [{
        key: 'render',
        value: function render() {
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            var doCreation = (0, _redux.bindActionCreators)(CreateNotebookFormActionCreators.doCreation, dispatch);
            var nextStep = (0, _redux.bindActionCreators)(CreateNotebookFormActionCreators.nextStep, dispatch);
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
                        _semanticUiReact.Container,
                        null,
                        _react2.default.createElement(
                            'h1',
                            null,
                            'new'
                        ),
                        _react2.default.createElement(_createNotebookForm2.default, { step: 0, nextStep: nextStep, doCreation: doCreation, doRedirect: false })
                    )
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return CreateNewNotebookPage;
}(_react.Component);

CreateNewNotebookPage.propTypes = {
    createNewNotebook: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        createNewNotebook: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CreateNewNotebookPage);

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(12);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(13);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomePage = function (_Component) {
    _inherits(HomePage, _Component);

    function HomePage() {
        _classCallCheck(this, HomePage);

        return _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).apply(this, arguments));
    }

    _createClass(HomePage, [{
        key: 'render',
        value: function render() {
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
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
                    !this.props.home['Nav'].isLoggedIn ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _semanticUiReact.Segment,
                            null,
                            'Key visual'
                        ),
                        _react2.default.createElement(_semanticUiReact.Divider, null),
                        _react2.default.createElement(
                            _semanticUiReact.Grid,
                            { divided: true },
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Segment,
                                    null,
                                    'Intro Copy'
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 8 },
                                _react2.default.createElement(
                                    _semanticUiReact.Segment,
                                    null,
                                    'Featured'
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Segment,
                                    null,
                                    'CTA'
                                )
                            )
                        ),
                        _react2.default.createElement(_semanticUiReact.Divider, null),
                        _react2.default.createElement(
                            _semanticUiReact.Grid,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Segment,
                                    null,
                                    'Latest Img'
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Segment,
                                    null,
                                    'Latest Img'
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Segment,
                                    null,
                                    'Latest Img'
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Segment,
                                    null,
                                    'Latest Img'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Segment,
                            null,
                            'Large Offer'
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Grid,
                            null,
                            _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 2 }),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Segment,
                                    null,
                                    'How it works'
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Segment,
                                    null,
                                    'How it works'
                                )
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 4 },
                                _react2.default.createElement(
                                    _semanticUiReact.Segment,
                                    null,
                                    'How it works'
                                )
                            ),
                            _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 2 })
                        ),
                        _react2.default.createElement(_semanticUiReact.Divider, null)
                    ) : _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _semanticUiReact.Container,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Grid,
                                { divided: true },
                                _react2.default.createElement(
                                    _semanticUiReact.Grid.Column,
                                    { width: 3 },
                                    _react2.default.createElement(
                                        _semanticUiReact.Segment,
                                        null,
                                        'Controls/Notebooks'
                                    )
                                ),
                                _react2.default.createElement(
                                    _semanticUiReact.Grid.Column,
                                    { width: 10 },
                                    _react2.default.createElement(
                                        _semanticUiReact.Segment,
                                        null,
                                        'Wall'
                                    )
                                ),
                                _react2.default.createElement(
                                    _semanticUiReact.Grid.Column,
                                    { width: 3 },
                                    _react2.default.createElement(
                                        _semanticUiReact.Segment,
                                        null,
                                        'Social'
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(_semanticUiReact.Container, null)
                ),
                _react2.default.createElement(_footer2.default, {
                    clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return HomePage;
}(_react.Component);

HomePage.propTypes = {
    home: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        home: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(HomePage);

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _artPage = __webpack_require__(121);

var _artPage2 = _interopRequireDefault(_artPage);

var _homePage = __webpack_require__(124);

var _homePage2 = _interopRequireDefault(_homePage);

var _signUpPage = __webpack_require__(130);

var _signUpPage2 = _interopRequireDefault(_signUpPage);

var _signInPage = __webpack_require__(129);

var _signInPage2 = _interopRequireDefault(_signInPage);

var _profilePage = __webpack_require__(127);

var _profilePage2 = _interopRequireDefault(_profilePage);

var _questPage = __webpack_require__(128);

var _questPage2 = _interopRequireDefault(_questPage);

var _uploadPage = __webpack_require__(131);

var _uploadPage2 = _interopRequireDefault(_uploadPage);

var _createNewNotebookPage = __webpack_require__(123);

var _createNewNotebookPage2 = _interopRequireDefault(_createNewNotebookPage);

var _browsePage = __webpack_require__(122);

var _browsePage2 = _interopRequireDefault(_browsePage);

var _notebookPage = __webpack_require__(126);

var _notebookPage2 = _interopRequireDefault(_notebookPage);

var _reactRouterDom = __webpack_require__(16);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IoCSeed = __webpack_require__(21);

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
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _homePage2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/upload', component: _uploadPage2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/sign-up', component: _signUpPage2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/sign-in', component: _signInPage2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/journey', component: _browsePage2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/profile', component: _profilePage2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/art/:id', component: _artPage2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/user/artwork/:id', component: _artPage2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/quest/:id', component: _questPage2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/user/quest/:id', component: _questPage2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/notebooks/new', component: _createNewNotebookPage2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/notebooks/:id', component: _notebookPage2.default })
            );
        }
    }]);

    return Ioc;
}(_react.Component);

exports.default = Ioc;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(12);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(13);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _notebook_actions = __webpack_require__(24);

var NotebookActionCreators = _interopRequireWildcard(_notebook_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _notebook = __webpack_require__(55);

var _notebook2 = _interopRequireDefault(_notebook);

var _semanticUiReact = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotebookPage = function (_Component) {
    _inherits(NotebookPage, _Component);

    function NotebookPage() {
        _classCallCheck(this, NotebookPage);

        return _possibleConstructorReturn(this, (NotebookPage.__proto__ || Object.getPrototypeOf(NotebookPage)).apply(this, arguments));
    }

    _createClass(NotebookPage, [{
        key: 'render',
        value: function render() {
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            var createNewNotebook = (0, _redux.bindActionCreators)(NotebookActionCreators.createNewNotebook, dispatch);
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
                        _react2.default.createElement(_notebook2.default, {
                            isNewNotebook: false,
                            createNewNotebook: createNewNotebook,
                            doRedirect: false })
                    )
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return NotebookPage;
}(_react.Component);

NotebookPage.propTypes = {
    notebookPage: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        notebookPage: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(NotebookPage);

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(12);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(13);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _quests_actions = __webpack_require__(54);

var QuestsActionCreators = _interopRequireWildcard(_quests_actions);

var _myArtwork_actions = __webpack_require__(51);

var MyArtworkActionCreators = _interopRequireWildcard(_myArtwork_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(2);

var _userInfo = __webpack_require__(120);

var _userInfo2 = _interopRequireDefault(_userInfo);

var _quests = __webpack_require__(114);

var _quests2 = _interopRequireDefault(_quests);

var _myArtwork = __webpack_require__(111);

var _myArtwork2 = _interopRequireDefault(_myArtwork);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfilePage = function (_Component) {
    _inherits(ProfilePage, _Component);

    function ProfilePage() {
        _classCallCheck(this, ProfilePage);

        return _possibleConstructorReturn(this, (ProfilePage.__proto__ || Object.getPrototypeOf(ProfilePage)).apply(this, arguments));
    }

    _createClass(ProfilePage, [{
        key: 'render',
        value: function render() {
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            var loadMyQuests = (0, _redux.bindActionCreators)(QuestsActionCreators.loadMyQuests, dispatch);
            var loadMyArtwork = (0, _redux.bindActionCreators)(MyArtworkActionCreators.loadMyArtwork, dispatch);
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
                        _semanticUiReact.Container,
                        null,
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Profile'
                        ),
                        _react2.default.createElement(_userInfo2.default, null),
                        _react2.default.createElement(_quests2.default, { loadMyQuests: loadMyQuests }),
                        _react2.default.createElement(_myArtwork2.default, { loadMyArtwork: loadMyArtwork })
                    )
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return ProfilePage;
}(_react.Component);

ProfilePage.propTypes = {
    profile: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        profile: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ProfilePage);

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(12);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(13);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _quest_actions = __webpack_require__(53);

var QuestActionCreators = _interopRequireWildcard(_quest_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(2);

var _quest = __webpack_require__(56);

var _quest2 = _interopRequireDefault(_quest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuestPage = function (_Component) {
    _inherits(QuestPage, _Component);

    function QuestPage() {
        _classCallCheck(this, QuestPage);

        return _possibleConstructorReturn(this, (QuestPage.__proto__ || Object.getPrototypeOf(QuestPage)).apply(this, arguments));
    }

    _createClass(QuestPage, [{
        key: 'render',
        value: function render() {
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            var setGoalDate = (0, _redux.bindActionCreators)(QuestActionCreators.setGoalDate, dispatch);
            var addNote = (0, _redux.bindActionCreators)(QuestActionCreators.addNote, dispatch);
            var joinQuest = (0, _redux.bindActionCreators)(QuestActionCreators.joinQuest, dispatch);
            var adabdonQuest = (0, _redux.bindActionCreators)(QuestActionCreators.adabdonQuest, dispatch);
            var seeAllMyQuests = (0, _redux.bindActionCreators)(QuestActionCreators.seeAllMyQuests, dispatch);
            var goToQuestPage = (0, _redux.bindActionCreators)(QuestActionCreators.goToQuestPage, dispatch);
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
                    _react2.default.createElement(_quest2.default, {
                        id: this.props.match.params.id,
                        promoMode: false,
                        setGoalDate: setGoalDate,
                        addNote: addNote,
                        joinQuest: joinQuest,
                        adabdonQuest: adabdonQuest,
                        seeAllMyQuests: seeAllMyQuests,
                        goToQuestPage: goToQuestPage })
                ),
                _react2.default.createElement(_footer2.default, { clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return QuestPage;
}(_react.Component);

QuestPage.propTypes = {
    questPage: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        questPage: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(QuestPage);

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(12);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(13);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _signIn_actions = __webpack_require__(103);

var SignInActionCreators = _interopRequireWildcard(_signIn_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _signInForm = __webpack_require__(115);

var _signInForm2 = _interopRequireDefault(_signInForm);

var _semanticUiReact = __webpack_require__(2);

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
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(12);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(13);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _signUp_actions = __webpack_require__(104);

var SignUpActionCreators = _interopRequireWildcard(_signUp_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _signUpForm = __webpack_require__(116);

var _signUpForm2 = _interopRequireDefault(_signUpForm);

var _semanticUiReact = __webpack_require__(2);

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
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nav_actions = __webpack_require__(12);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _footer_actions = __webpack_require__(13);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _imageUploader_actions = __webpack_require__(50);

var ImageUploadCreators = _interopRequireWildcard(_imageUploader_actions);

var _myNotebooks_actions = __webpack_require__(52);

var MyNotebookCreators = _interopRequireWildcard(_myNotebooks_actions);

var _notebook_actions = __webpack_require__(24);

var NotebookCreators = _interopRequireWildcard(_notebook_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _imageUploader = __webpack_require__(110);

var _imageUploader2 = _interopRequireDefault(_imageUploader);

var _myNotebooks = __webpack_require__(112);

var _myNotebooks2 = _interopRequireDefault(_myNotebooks);

var _notebook = __webpack_require__(55);

var _notebook2 = _interopRequireDefault(_notebook);

var _semanticUiReact = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadPage = function (_Component) {
    _inherits(UploadPage, _Component);

    function UploadPage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, UploadPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UploadPage.__proto__ || Object.getPrototypeOf(UploadPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleNoNoteBooks = function () {
            this.noCards = true;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(UploadPage, [{
        key: 'render',
        value: function render() {
            var dispatch = this.props.dispatch;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            var updateUserInfo = (0, _redux.bindActionCreators)(NavActionCreators.updateUserInfo, dispatch);
            var setLoggedIn = (0, _redux.bindActionCreators)(NavActionCreators.setLoggedIn, dispatch);
            var signOut = (0, _redux.bindActionCreators)(NavActionCreators.signOut, dispatch);
            var showMyNotebooks = (0, _redux.bindActionCreators)(MyNotebookCreators.showMyNotebooks, dispatch);
            var createNewNotebook = (0, _redux.bindActionCreators)(NotebookCreators.createNewNotebook, dispatch);
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
                        _semanticUiReact.Segment,
                        null,
                        _react2.default.createElement(
                            _semanticUiReact.Grid,
                            { divided: true },
                            _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 10 },
                                this.noCards ? null : _react2.default.createElement(_myNotebooks2.default, {
                                    showMyNotebooks: showMyNotebooks,
                                    broadcastUp: this.handleNoNoteBooks
                                }),
                                this.noCards ? _react2.default.createElement(_notebook2.default, {
                                    isNewNotebook: true,
                                    createNewNotebook: createNewNotebook,
                                    doRedirect: false }) : null
                            ),
                            this.noCards ? null : _react2.default.createElement(
                                _semanticUiReact.Grid.Column,
                                { width: 6 },
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
                            )
                        )
                    )
                ),
                _react2.default.createElement(_footer2.default, {
                    clickFooterItem: clickFooterItem })
            );
        }
    }]);

    return UploadPage;
}(_react.Component);

UploadPage.propTypes = {
    upload: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        upload: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(UploadPage);

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Quest;

var _artworkCard = __webpack_require__(33);

var ArtworkCardActionTypes = _interopRequireWildcard(_artworkCard);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    id: '',
    image: '',
    doRedirect: false
};

function Quest() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case ArtworkCardActionTypes.GO_TO_ARTWORK_PAGE:
            return Object.assign({}, state, {
                doRedirect: action.redirect
            });
        default:
            return state;
    }
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Footer;

var _artwork = __webpack_require__(34);

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
    },
    suggestions: []
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
        case ArtworkActionTypes.GET_SUGGESTIONS:
            return Object.assign({}, state, {
                suggestions: action.data
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
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Notebook;

var _createNotebookForm = __webpack_require__(35);

var CreateNotebookFormTypes = _interopRequireWildcard(_createNotebookForm);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    name1: '',
    name2: '',
    name3: '',
    how: '',
    when: '',
    what: '',
    step: 0,
    doRedirect: false,
    noteBookId: '',
    userId: ''
};

function Notebook() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case CreateNotebookFormTypes.DO_CREATION:
            return state;
        case CreateNotebookFormTypes.NEXT_STEP:
            return Object.assign({}, state, {
                step: action.step
            });
        case CreateNotebookFormTypes.UPDATE_USER_ID:
            return Object.assign({}, state, {
                userId: action.id
            });
        default:
            return state;
    }
}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Footer;

var _footer = __webpack_require__(36);

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
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ImageUploader;

var _imageUploder = __webpack_require__(37);

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
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mainReducer = undefined;

var _redux = __webpack_require__(10);

var _footer = __webpack_require__(135);

var _footer2 = _interopRequireDefault(_footer);

var _nav = __webpack_require__(140);

var _nav2 = _interopRequireDefault(_nav);

var _signIn = __webpack_require__(144);

var _signIn2 = _interopRequireDefault(_signIn);

var _signUp = __webpack_require__(145);

var _signUp2 = _interopRequireDefault(_signUp);

var _imageUploader = __webpack_require__(136);

var _imageUploader2 = _interopRequireDefault(_imageUploader);

var _artwork = __webpack_require__(133);

var _artwork2 = _interopRequireDefault(_artwork);

var _userCard = __webpack_require__(148);

var _userCard2 = _interopRequireDefault(_userCard);

var _suggestion = __webpack_require__(146);

var _suggestion2 = _interopRequireDefault(_suggestion);

var _suggestions = __webpack_require__(147);

var _suggestions2 = _interopRequireDefault(_suggestions);

var _quest = __webpack_require__(142);

var _quest2 = _interopRequireDefault(_quest);

var _quests = __webpack_require__(143);

var _quests2 = _interopRequireDefault(_quests);

var _userInfo = __webpack_require__(149);

var _userInfo2 = _interopRequireDefault(_userInfo);

var _myArtwork = __webpack_require__(138);

var _myArtwork2 = _interopRequireDefault(_myArtwork);

var _artworkCard = __webpack_require__(132);

var _artworkCard2 = _interopRequireDefault(_artworkCard);

var _myNotebooks = __webpack_require__(139);

var _myNotebooks2 = _interopRequireDefault(_myNotebooks);

var _notebook = __webpack_require__(141);

var _notebook2 = _interopRequireDefault(_notebook);

var _createNotebookForm = __webpack_require__(134);

var _createNotebookForm2 = _interopRequireDefault(_createNotebookForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainReducer = exports.mainReducer = (0, _redux.combineReducers)({
    Footer: _footer2.default,
    Nav: _nav2.default,
    SignIn: _signIn2.default,
    SignUp: _signUp2.default,
    ImageUploader: _imageUploader2.default,
    Artwork: _artwork2.default,
    UserCard: _userCard2.default,
    UserInfo: _userInfo2.default,
    Suggestions: _suggestions2.default,
    Suggestion: _suggestion2.default,
    Quest: _quest2.default,
    Quests: _quests2.default,
    MyArtwork: _myArtwork2.default,
    ArtworkCard: _artworkCard2.default,
    MyNotebooks: _myNotebooks2.default,
    Notebook: _notebook2.default,
    CreateNotebookForm: _createNotebookForm2.default
});
exports.default = mainReducer;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = MyArtwork;

var _myArtwork = __webpack_require__(38);

var MyArtworkActionTypes = _interopRequireWildcard(_myArtwork);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    myArtwork: [{
        id: ''
    }],
    haveArtwork: false,
    stopper: false
};

function MyArtwork() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case MyArtworkActionTypes.LOAD_MY_ARTWORK:
            return Object.assign({}, state, {
                haveArtwork: action.having,
                myArtwork: action.artwork
            });
        default:
            return state;
    }
}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = YourNoteBook;

var _myNotebooks = __webpack_require__(39);

var UserInfoActionTypes = _interopRequireWildcard(_myNotebooks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    myNoteBooks: [{
        id: ''
    }],
    currentNotebook: '',
    noteBooksFound: 0
};

function YourNoteBook() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case UserInfoActionTypes.SHOW_MY_NOTEBOOKS:
            return Object.assign({}, state, {
                noteBooksFound: action.noteBooksFound,
                myNoteBooks: action.notebooks
            });
        default:
            return state;
    }
}

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Nav;

var _nav = __webpack_require__(40);

var NavActionTypes = _interopRequireWildcard(_nav);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Token = __webpack_require__(19);

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
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Notebook;

var _notebook = __webpack_require__(41);

var NotebookActionTypes = _interopRequireWildcard(_notebook);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    isNewNotebook: false,
    doRedirect: false
};

function Notebook() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case NotebookActionTypes.CREATE_NEW_NOTEBOOK:
            return Object.assign({}, state, {
                doRedirect: true
            });
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Quest;

var _quest = __webpack_require__(42);

var QuestActionTypes = _interopRequireWildcard(_quest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    id: '',
    startDate: '',
    goalDate: '',
    completed: false,
    hidden: false,
    statement: '',
    promoMode: true,
    label: '',
    prompt: '',
    description: '',
    hasError: false,
    errorText: '',
    doRedirect: false
};

function Quest() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case QuestActionTypes.SET_GOAL_DATE:
            return state;
        case QuestActionTypes.ADD_NOTE:
            return state;
        case QuestActionTypes.JOIN_QUEST:
            return state;
        case QuestActionTypes.ABANDON_QUEST:
            return state;
        case QuestActionTypes.SEE_ALL_MY_QUESTS:
            return state;
        case QuestActionTypes.GO_TO_QUEST_PAGE:
            return Object.assign({}, state, {
                doRedirect: action.redirect
            });
        default:
            return state;
    }
}

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Quests;

var _quests = __webpack_require__(43);

var QuestsActionTypes = _interopRequireWildcard(_quests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    myQuests: [{
        id: ''
    }],
    haveQuests: false,
    stopper: false
};

function Quests() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case QuestsActionTypes.LOAD_MY_QUESTS:
            return Object.assign({}, state, {
                haveQuests: action.having,
                myQuests: action.quests
            });
        default:
            return state;
    }
}

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SignIn;

var _signIn = __webpack_require__(44);

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
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SignUp;

var _signUp = __webpack_require__(45);

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
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Suggestion;

var _suggestion = __webpack_require__(46);

var SuggestionActionTypes = _interopRequireWildcard(_suggestion);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    id: '',
    prompt: '',
    isHidden: false,
    isTaken: false,
    meaning: {
        id: '',
        description: '',
        label: '',
        schemaName: '',
        lastUpdate: ''
    }
};

function Suggestion() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case SuggestionActionTypes.TAKE_SUGGESTION:
            return state;
        case SuggestionActionTypes.UNDO_TAKE_SUGGESTION:
            return state;
        case SuggestionActionTypes.MORE_SUGGESTIONS_LIKE_THIS:
            return state;
        case SuggestionActionTypes.SHOW_SUGGESTION:
            return state;
        case SuggestionActionTypes.HIDE_SUGGESTION:
            return state;
        case SuggestionActionTypes.SHOW_QUEST:
            return Object.assign({}, state, {
                meaning: action.meaning
            });
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Suggestions;

var _suggestions = __webpack_require__(100);

var SuggestionsActionTypes = _interopRequireWildcard(_suggestions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    questOpen: null,
    meaningGroups: []
};

function Suggestions() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case SuggestionsActionTypes.HIDE_MEANING_GROUP:
            return state;
        case SuggestionsActionTypes.SHOW_MEANING_GROUP:
            return state;
        case SuggestionsActionTypes.DISPLAY_MATCHING_QUEST:
            return state;
        case SuggestionsActionTypes.DISMISS_MATCHING_QUEST:
            return state;
        case SuggestionsActionTypes.CONFIRM_MATCHING_QUEST:
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = UserCard;

var _userCard = __webpack_require__(101);

var UserCardActionTypes = _interopRequireWildcard(_userCard);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    avatar: '',
    firstName: '',
    lastName: '',
    bio: ''
};

function UserCard() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case UserCardActionTypes.GO_TO_PROFILE:
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = UserInfo;

var _userInfo = __webpack_require__(47);

var UserInfoActionTypes = _interopRequireWildcard(_userInfo);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {};

function UserInfo() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case UserInfoActionTypes.UPLOAD_AVATAR:
            return state;
        case UserInfoActionTypes.EDIT_BIO:
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 150 */,
/* 151 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports = require("nconf");

/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = require("neo4j-driver");

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 155 */
/***/ (function(module, exports) {

module.exports = require("react-dropzone");

/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports = require("swagger-node-express");

/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCARMAvIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7LooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiijNABRRketGaACikzRmgBaKMj1oyPWgAoozRmgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACijNGaACikzRmgBaKTdRuoAWik3UbqAFopN1G6gBaKZuo30APopm+jfQA+imb6XeKAHUVHvo30ASUVHvo30ASUVH5gpN4oAloqLeKN4oAloqLzBSeZQBNRUPmUeYKAJqM1D5opPMoAnzRmq/mCl80UAT5ozVbzRS+aPWgCxmkzVbzh/eo84f3qALO6jdVXzl9aPOFFguWt1N3VAJG7BvwWk3Of4JP++TQFyxup26qu6T+5J/3y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"

/***/ })
/******/ ]);