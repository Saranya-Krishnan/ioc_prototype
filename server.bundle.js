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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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
exports.clickMenuItem = undefined;

var _nav = __webpack_require__(8);

var NavActionTypes = _interopRequireWildcard(_nav);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var clickMenuItem = exports.clickMenuItem = function clickMenuItem(name) {
    return {
        type: NavActionTypes.NAV_ITEM_CLICKED,
        name: name
    };
};

/***/ }),
/* 6 */
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

var _reactRouterDom = __webpack_require__(9);

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
    isLoggedIn: _propTypes2.default.bool,
    redirect: _propTypes2.default.bool
};

exports.default = Nav;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NAV_ITEM_CLICKED = exports.NAV_ITEM_CLICKED = 'NAV_ITEM_CLICKED';

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sw = __webpack_require__(28);
var _ = __webpack_require__(24);

exports.writeResponse = function writeResponse(res, response, status) {
  sw.setHeaders(res);
  res.status(status || 200).send(JSON.stringify(response));
};

exports.writeError = function writeError(res, error, status) {
  sw.setHeaders(res);
  res.status(error.status || status || 400).send(JSON.stringify(_.omit(error, ['status'])));
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _nconf = __webpack_require__(25);

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
        describe: "Use local or remote neo4j instance",
        demand: false,
        default: "local"
    }
}).defaults({
    'USERNAME': process.env.MOVIE_DATABASE_USERNAME,
    'PASSWORD': process.env.MOVIE_DATABASE_PASSWORD,
    'neo4j': 'local',
    'neo4j-local': 'bolt://localhost:7687',
    'neo4j-remote': 'bolt:http://162.243.100.222:7687',
    'base_url': 'http://localhost:3030',
    'api_path': '/api/v0'
});

module.exports = _nconf2.default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(7);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(27);

var _server = __webpack_require__(26);

var _server2 = _interopRequireDefault(_server);

var _nav = __webpack_require__(23);

var _nav2 = _interopRequireDefault(_nav);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(3);

var _ioc = __webpack_require__(19);

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
/* 13 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("swagger-jsdoc");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(7);

var _express2 = _interopRequireDefault(_express);

var _index = __webpack_require__(12);

var _index2 = _interopRequireDefault(_index);

var _neo4j = __webpack_require__(11);

var _neo4j2 = _interopRequireDefault(_neo4j);

var _methodOverride = __webpack_require__(14);

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _swaggerJsdoc = __webpack_require__(16);

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _bodyParser = __webpack_require__(13);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _response = __webpack_require__(10);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = __webpack_require__(15);
//import setAuthUser from './middlewares/setAuthUser';
//import neo4jSessionCleanup from './middlewares/neo4jSessionCleanup';


var app = (0, _express2.default)();
var api = (0, _express2.default)();

app.use(_neo4j2.default.get('api_path'), api);

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
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js']
};

var swaggerSpec = (0, _swaggerJsdoc2.default)(options);

api.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/docs', _express2.default.static(path.join(__dirname, 'swaggerui')));
app.set('port', _neo4j2.default.get('PORT'));

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

//api.use(setAuthUser);
//api.use(neo4jSessionCleanup);

app.listen(3000, function () {
    console.log('Ioc Express Server started');
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 18 */
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

var _nav_actions = __webpack_require__(5);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _nav = __webpack_require__(6);

var _nav2 = _interopRequireDefault(_nav);

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
            return _react2.default.createElement(
                _semanticUiReact.Container,
                null,
                _react2.default.createElement(_nav2.default, { activeItem: menu.activeItem, clickMenuItem: clickMenuItem })
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(1);

var _home = __webpack_require__(18);

var _home2 = _interopRequireDefault(_home);

var _signUp = __webpack_require__(22);

var _signUp2 = _interopRequireDefault(_signUp);

var _signIn = __webpack_require__(21);

var _signIn2 = _interopRequireDefault(_signIn);

var _profile = __webpack_require__(20);

var _profile2 = _interopRequireDefault(_profile);

var _reactRouterDom = __webpack_require__(9);

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
                _semanticUiReact.Container,
                null,
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    null,
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _home2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/sign-up', component: _signUp2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/sign-in', component: _signIn2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/profile', component: _profile2.default })
                )
            );
        }
    }]);

    return Ioc;
}(_react.Component);

exports.default = Ioc;

/***/ }),
/* 20 */
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

var _nav_actions = __webpack_require__(5);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _nav = __webpack_require__(6);

var _nav2 = _interopRequireDefault(_nav);

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
            return _react2.default.createElement(
                _semanticUiReact.Container,
                null,
                _react2.default.createElement(_nav2.default, { activeItem: menu.activeItem, clickMenuItem: clickMenuItem }),
                _react2.default.createElement(
                    _semanticUiReact.Segment,
                    null,
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Profile'
                    )
                )
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
/* 21 */
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

var _nav_actions = __webpack_require__(5);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _nav = __webpack_require__(6);

var _nav2 = _interopRequireDefault(_nav);

var _semanticUiReact = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignIn = function (_Component) {
    _inherits(SignIn, _Component);

    function SignIn() {
        _classCallCheck(this, SignIn);

        return _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).apply(this, arguments));
    }

    _createClass(SignIn, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dispatch = _props.dispatch,
                menu = _props.menu;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            return _react2.default.createElement(
                _semanticUiReact.Container,
                null,
                _react2.default.createElement(_nav2.default, { activeItem: menu.activeItem, clickMenuItem: clickMenuItem }),
                _react2.default.createElement(
                    _semanticUiReact.Segment,
                    null,
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Sign In'
                    )
                )
            );
        }
    }]);

    return SignIn;
}(_react.Component);

SignIn.propTypes = {
    menu: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        menu: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SignIn);

/***/ }),
/* 22 */
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

var _nav_actions = __webpack_require__(5);

var NavActionCreators = _interopRequireWildcard(_nav_actions);

var _nav = __webpack_require__(6);

var _nav2 = _interopRequireDefault(_nav);

var _semanticUiReact = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignUp = function (_Component) {
    _inherits(SignUp, _Component);

    function SignUp() {
        _classCallCheck(this, SignUp);

        return _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).apply(this, arguments));
    }

    _createClass(SignUp, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dispatch = _props.dispatch,
                menu = _props.menu;

            var clickMenuItem = (0, _redux.bindActionCreators)(NavActionCreators.clickMenuItem, dispatch);
            return _react2.default.createElement(
                _semanticUiReact.Container,
                null,
                _react2.default.createElement(_nav2.default, { activeItem: menu.activeItem, clickMenuItem: clickMenuItem }),
                _react2.default.createElement(
                    _semanticUiReact.Segment,
                    null,
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Sign Up'
                    )
                )
            );
        }
    }]);

    return SignUp;
}(_react.Component);

SignUp.propTypes = {
    menu: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
    return {
        menu: state
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SignUp);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Nav;

var _nav = __webpack_require__(8);

var NavActionTypes = _interopRequireWildcard(_nav);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    activeItem: 'home',
    isLoggedIn: false,
    isRedirect: false
};

function Nav() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case NavActionTypes.NAV_ITEM_CLICKED:
            state.activeItem = action.name;
            return state;
        default:
            return state;
    }
}

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("nconf");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("swagger-node-express");

/***/ })
/******/ ]);