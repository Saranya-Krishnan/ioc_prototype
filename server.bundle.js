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

//Example Image
var img = __webpack_require__(150);

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
            _react2.default.createElement('div', { className: 'notebook-tout-image' }),
            _react2.default.createElement(_semanticUiReact.Image, { src: img }),
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
/* 150 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
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

/***/ })
/******/ ]);