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
/******/ 	return __webpack_require__(__webpack_require__.s = 98);
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


var sw = __webpack_require__(154);
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

var neo4j = __webpack_require__(151).v1;
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


var _nconf = __webpack_require__(150);

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

var _crypto = __webpack_require__(149);

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


exports.images = __webpack_require__(86);
exports.journeys = __webpack_require__(87);
exports.locations = __webpack_require__(88);
exports.meanings = __webpack_require__(89);
exports.notebooks = __webpack_require__(90);
exports.pages = __webpack_require__(91);
exports.quests = __webpack_require__(92);
exports.schemata = __webpack_require__(93);
exports.suggestions = __webpack_require__(94);
exports.tags = __webpack_require__(95);
exports.users = __webpack_require__(96);
exports.works = __webpack_require__(97);

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

var _server = __webpack_require__(152);

var _server2 = _interopRequireDefault(_server);

var _index = __webpack_require__(136);

var _index2 = _interopRequireDefault(_index);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(5);

var _ioc = __webpack_require__(124);

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

module.exports = require("swagger-jsdoc");

/***/ }),
/* 69 */
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _journey = __webpack_require__(73);

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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _location = __webpack_require__(74);

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
/* 72 */
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
/* 73 */
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
/* 74 */
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
/* 75 */
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
/* 76 */
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
/* 77 */
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
/* 78 */
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
/* 79 */
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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _page = __webpack_require__(75);

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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _quest = __webpack_require__(76);

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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _schema = __webpack_require__(77);

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
/* 83 */
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
/* 84 */
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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(11);

var _uuid2 = _interopRequireDefault(_uuid);

var _work = __webpack_require__(78);

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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Images = __webpack_require__(69),
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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Journeys = __webpack_require__(70),
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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Locations = __webpack_require__(71),
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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Meanings = __webpack_require__(72),
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Notebooks = __webpack_require__(79),
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Pages = __webpack_require__(80),
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Quests = __webpack_require__(81),
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
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schemata = __webpack_require__(82),
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
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Suggestions = __webpack_require__(83),
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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Tags = __webpack_require__(84),
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
/* 96 */
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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Works = __webpack_require__(85),
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
/* 98 */
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

var _swaggerJsdoc = __webpack_require__(68);

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
var favicon = __webpack_require__(155);

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
/* 99 */
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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GO_TO_PROFILE = exports.GO_TO_PROFILE = 'GO_TO_PROFILE';

/***/ }),
/* 101 */
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
/* 102 */
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
/* 103 */
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
/* 104 */
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
/* 105 */
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
/* 106 */
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

var _artworkCard_actions = __webpack_require__(101);

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

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _semanticUiReact = __webpack_require__(2);

var _artwork_actions = __webpack_require__(48);

var ArtworkActions = _interopRequireWildcard(_artwork_actions);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _tag = __webpack_require__(117);

var _tag2 = _interopRequireDefault(_tag);

var _suggestion = __webpack_require__(116);

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
/* 108 */
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
/* 109 */
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

var _reactDropzone = __webpack_require__(153);

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

var _superagent = __webpack_require__(7);

var _superagent2 = _interopRequireDefault(_superagent);

var _semanticUiReact = __webpack_require__(2);

var _myArtwork_actions = __webpack_require__(51);

var MyArtworkActions = _interopRequireWildcard(_myArtwork_actions);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _artworkCard = __webpack_require__(106);

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

var _myNotebooks_actions = __webpack_require__(52);

var MyNotebooksActions = _interopRequireWildcard(_myNotebooks_actions);

var _pathHelper = __webpack_require__(6);

var _pathHelper2 = _interopRequireDefault(_pathHelper);

var _noteBookTout = __webpack_require__(112);

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
/* 112 */
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
/* 113 */
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
/* 114 */
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
/* 116 */
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

var _suggestion_actions = __webpack_require__(104);

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
/* 117 */
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
/* 119 */
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

var _userCard = __webpack_require__(118);

var _userCard2 = _interopRequireDefault(_userCard);

var _userInfo_actions = __webpack_require__(105);

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
/* 120 */
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

var _artwork = __webpack_require__(107);

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

var _createNotebookForm_actions = __webpack_require__(49);

var CreateNotebookFormActionCreators = _interopRequireWildcard(_createNotebookForm_actions);

var _footer_actions = __webpack_require__(13);

var FooterActionCreators = _interopRequireWildcard(_footer_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(2);

var _createNotebookForm = __webpack_require__(108);

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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _artPage = __webpack_require__(120);

var _artPage2 = _interopRequireDefault(_artPage);

var _homePage = __webpack_require__(123);

var _homePage2 = _interopRequireDefault(_homePage);

var _signUpPage = __webpack_require__(129);

var _signUpPage2 = _interopRequireDefault(_signUpPage);

var _signInPage = __webpack_require__(128);

var _signInPage2 = _interopRequireDefault(_signInPage);

var _profilePage = __webpack_require__(126);

var _profilePage2 = _interopRequireDefault(_profilePage);

var _questPage = __webpack_require__(127);

var _questPage2 = _interopRequireDefault(_questPage);

var _uploadPage = __webpack_require__(130);

var _uploadPage2 = _interopRequireDefault(_uploadPage);

var _createNewNotebookPage = __webpack_require__(122);

var _createNewNotebookPage2 = _interopRequireDefault(_createNewNotebookPage);

var _browsePage = __webpack_require__(121);

var _browsePage2 = _interopRequireDefault(_browsePage);

var _notebookPage = __webpack_require__(125);

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
/* 125 */
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

var _quests_actions = __webpack_require__(54);

var QuestsActionCreators = _interopRequireWildcard(_quests_actions);

var _myArtwork_actions = __webpack_require__(51);

var MyArtworkActionCreators = _interopRequireWildcard(_myArtwork_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _semanticUiReact = __webpack_require__(2);

var _userInfo = __webpack_require__(119);

var _userInfo2 = _interopRequireDefault(_userInfo);

var _quests = __webpack_require__(113);

var _quests2 = _interopRequireDefault(_quests);

var _myArtwork = __webpack_require__(110);

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

var _signIn_actions = __webpack_require__(102);

var SignInActionCreators = _interopRequireWildcard(_signIn_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _signInForm = __webpack_require__(114);

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

var _signUp_actions = __webpack_require__(103);

var SignUpActionCreators = _interopRequireWildcard(_signUp_actions);

var _nav = __webpack_require__(15);

var _nav2 = _interopRequireDefault(_nav);

var _footer = __webpack_require__(14);

var _footer2 = _interopRequireDefault(_footer);

var _signUpForm = __webpack_require__(115);

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

var _imageUploader = __webpack_require__(109);

var _imageUploader2 = _interopRequireDefault(_imageUploader);

var _myNotebooks = __webpack_require__(111);

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
/* 131 */
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
/* 132 */
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
/* 133 */
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
/* 134 */
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
/* 135 */
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
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mainReducer = undefined;

var _redux = __webpack_require__(10);

var _footer = __webpack_require__(134);

var _footer2 = _interopRequireDefault(_footer);

var _nav = __webpack_require__(139);

var _nav2 = _interopRequireDefault(_nav);

var _signIn = __webpack_require__(143);

var _signIn2 = _interopRequireDefault(_signIn);

var _signUp = __webpack_require__(144);

var _signUp2 = _interopRequireDefault(_signUp);

var _imageUploader = __webpack_require__(135);

var _imageUploader2 = _interopRequireDefault(_imageUploader);

var _artwork = __webpack_require__(132);

var _artwork2 = _interopRequireDefault(_artwork);

var _userCard = __webpack_require__(147);

var _userCard2 = _interopRequireDefault(_userCard);

var _suggestion = __webpack_require__(145);

var _suggestion2 = _interopRequireDefault(_suggestion);

var _suggestions = __webpack_require__(146);

var _suggestions2 = _interopRequireDefault(_suggestions);

var _quest = __webpack_require__(141);

var _quest2 = _interopRequireDefault(_quest);

var _quests = __webpack_require__(142);

var _quests2 = _interopRequireDefault(_quests);

var _userInfo = __webpack_require__(148);

var _userInfo2 = _interopRequireDefault(_userInfo);

var _myArtwork = __webpack_require__(137);

var _myArtwork2 = _interopRequireDefault(_myArtwork);

var _artworkCard = __webpack_require__(131);

var _artworkCard2 = _interopRequireDefault(_artworkCard);

var _myNotebooks = __webpack_require__(138);

var _myNotebooks2 = _interopRequireDefault(_myNotebooks);

var _notebook = __webpack_require__(140);

var _notebook2 = _interopRequireDefault(_notebook);

var _createNotebookForm = __webpack_require__(133);

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
/* 137 */
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
/* 138 */
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
/* 139 */
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
/* 140 */
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
/* 141 */
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
/* 142 */
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
/* 143 */
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
/* 144 */
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
/* 145 */
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
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Suggestions;

var _suggestions = __webpack_require__(99);

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
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = UserCard;

var _userCard = __webpack_require__(100);

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
/* 148 */
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
/* 149 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 150 */
/***/ (function(module, exports) {

module.exports = require("nconf");

/***/ }),
/* 151 */
/***/ (function(module, exports) {

module.exports = require("neo4j-driver");

/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = require("react-dropzone");

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = require("swagger-node-express");

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * serve-favicon
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var Buffer = __webpack_require__(161).Buffer
var etag = __webpack_require__(156)
var fresh = __webpack_require__(157)
var fs = __webpack_require__(158)
var ms = __webpack_require__(159)
var parseUrl = __webpack_require__(160)
var path = __webpack_require__(66)
var resolve = path.resolve

/**
 * Module exports.
 * @favicons
 */

module.exports = favicon

/**
 * Module variables.
 * @private
 */

var ONE_YEAR_MS = 60 * 60 * 24 * 365 * 1000 // 1 year

/**
 * Serves the favicon located by the given `path`.
 *
 * @favicons
 * @param {String|Buffer} path
 * @param {Object} [options]
 * @return {Function} middleware
 */

function favicon (path, options) {
  var opts = options || {}

  var icon // favicon cache
  var maxAge = calcMaxAge(opts.maxAge)

  if (!path) {
    throw new TypeError('path to favicon.ico is required')
  }

  if (Buffer.isBuffer(path)) {
    icon = createIcon(Buffer.from(path), maxAge)
  } else if (typeof path === 'string') {
    path = resolveSync(path)
  } else {
    throw new TypeError('path to favicon.ico must be string or buffer')
  }

  return function favicon (req, res, next) {
    if (parseUrl(req).pathname !== '/favicon.ico') {
      next()
      return
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = req.method === 'OPTIONS' ? 200 : 405
      res.setHeader('Allow', 'GET, HEAD, OPTIONS')
      res.setHeader('Content-Length', '0')
      res.end()
      return
    }

    if (icon) {
      send(req, res, icon)
      return
    }

    fs.readFile(path, function (err, buf) {
      if (err) return next(err)
      icon = createIcon(buf, maxAge)
      send(req, res, icon)
    })
  }
}

/**
 * Calculate the max-age from a configured value.
 *
 * @private
 * @param {string|number} val
 * @return {number}
 */

function calcMaxAge (val) {
  var num = typeof val === 'string'
    ? ms(val)
    : val

  return num != null
    ? Math.min(Math.max(0, num), ONE_YEAR_MS)
    : ONE_YEAR_MS
}

/**
 * Create icon data from Buffer and max-age.
 *
 * @private
 * @param {Buffer} buf
 * @param {number} maxAge
 * @return {object}
 */

function createIcon (buf, maxAge) {
  return {
    body: buf,
    headers: {
      'Cache-Control': 'favicons, max-age=' + Math.floor(maxAge / 1000),
      'ETag': etag(buf)
    }
  }
}

/**
 * Create EISDIR error.
 *
 * @private
 * @param {string} path
 * @return {Error}
 */

function createIsDirError (path) {
  var error = new Error('EISDIR, illegal operation on directory \'' + path + '\'')
  error.code = 'EISDIR'
  error.errno = 28
  error.path = path
  error.syscall = 'open'
  return error
}

/**
 * Determine if the cached representation is fresh.
 *
 * @param {object} req
 * @param {object} res
 * @return {boolean}
 * @private
 */

function isFresh (req, res) {
  return fresh(req.headers, {
    'etag': res.getHeader('ETag'),
    'last-modified': res.getHeader('Last-Modified')
  })
}

/**
 * Resolve the path to icon.
 *
 * @param {string} iconPath
 * @private
 */

function resolveSync (iconPath) {
  var path = resolve(iconPath)
  var stat = fs.statSync(path)

  if (stat.isDirectory()) {
    throw createIsDirError(path)
  }

  return path
}

/**
 * Send icon data in response to a request.
 *
 * @private
 * @param {IncomingMessage} req
 * @param {OutgoingMessage} res
 * @param {object} icon
 */

function send (req, res, icon) {
  // Set headers
  var headers = icon.headers
  var keys = Object.keys(headers)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    res.setHeader(key, headers[key])
  }

  // Validate freshness
  if (isFresh(req, res)) {
    res.statusCode = 304
    res.end()
    return
  }

  // Send icon
  res.statusCode = 200
  res.setHeader('Content-Length', icon.body.length)
  res.setHeader('Content-Type', 'image/x-icon')
  res.end(icon.body)
}


/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports = require("etag");

/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = require("fresh");

/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports = require("ms");

/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports = require("parseurl");

/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = require("safe-buffer");

/***/ })
/******/ ]);