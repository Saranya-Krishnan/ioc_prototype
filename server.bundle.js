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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(11);

var _server = __webpack_require__(9);

var _server2 = _interopRequireDefault(_server);

var _index = __webpack_require__(7);

var _index2 = _interopRequireDefault(_index);

var _redux = __webpack_require__(2);

var _reactRedux = __webpack_require__(10);

var _ioc = __webpack_require__(6);

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
    return '\n        <!doctype html>\n        <html lang="en">\n        <head>\n            <meta charset="utf-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n            <title>IoC Prototype</title>\n            <link href="./img/favicon.ico" rel="Shortcut Icon" />\n            <script src="https://use.typekit.net/ipx6imu.js"></script>\n            <script>try{Typekit.load({ async: true });}catch(e){}</script>\n        </head>\n        <body>\n        <div id="ioc-app"><div>' + html + '</div></div>\n        <script>\n            window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n        </script>\n        <script type=text/javascript src="../bin/app.bundle.js"></script>\n        </body>\n        </html>';
}

exports.default = router;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/bin', _express2.default.static('./bin'));
app.use('/', _index2.default);
app.use('/view/*', _index2.default);

app.listen(3000, function () {
    console.log('Ioc Express Server started');
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectItem = selectItem;
var ITEM_CLICKED = exports.ITEM_CLICKED = 'ITEM_CLICKED';

function selectItem(listItem) {
    return {
        type: ITEM_CLICKED,
        payload: listItem
    };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(12);

var _nav = __webpack_require__(13);

var _nav2 = _interopRequireDefault(_nav);

var _signUp = __webpack_require__(16);

var _signUp2 = _interopRequireDefault(_signUp);

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
                    { text: true },
                    _react2.default.createElement(_nav2.default, null)
                ),
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    null,
                    _react2.default.createElement(_signUp2.default, null)
                )
            );
        }
    }]);

    return Ioc;
}(_react.Component);

exports.default = Ioc;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(2);

var _nav = __webpack_require__(8);

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
    navItems: _nav2.default
});

exports.default = rootReducer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
    var action = arguments[1];

    switch (action.type) {
        case _nav_actions.ITEM_CLICKED:
            return { state: state, item: action.payload };
        default:
            return state;
    }
};

var _nav_actions = __webpack_require__(5);

var navItems = [{ name: 'a page' }];

var INITIAL_STATE = { all: navItems, currentItem: null };

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = function (_Component) {
    _inherits(Nav, _Component);

    function Nav() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Nav);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Nav.__proto__ || Object.getPrototypeOf(Nav)).call.apply(_ref, [this].concat(args))), _this), _this.state = { activeItem: 'home' }, _this.handleItemClick = function (e, _ref2) {
            var name = _ref2.name;
            return _this.setState({ activeItem: name });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Nav, [{
        key: 'render',
        value: function render() {
            var activeItem = this.state.activeItem;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Menu,
                    { pointing: true, secondary: true },
                    _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'home', active: activeItem === 'home', onClick: this.handleItemClick }),
                    _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'messages', active: activeItem === 'messages', onClick: this.handleItemClick }),
                    _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'friends', active: activeItem === 'friends', onClick: this.handleItemClick }),
                    _react2.default.createElement(
                        _semanticUiReact.Menu.Menu,
                        { position: 'right' },
                        _react2.default.createElement(_semanticUiReact.Menu.Item, { name: 'logout', active: activeItem === 'logout', onClick: this.handleItemClick })
                    )
                )
            );
        }
    }]);

    return Nav;
}(_react.Component);

exports.default = Nav;

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = [{ key: 'm', text: 'Male', value: 'male' }, { key: 'f', text: 'Female', value: 'female' }];

var SignUp = function (_Component) {
    _inherits(SignUp, _Component);

    function SignUp() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SignUp);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SignUp.__proto__ || Object.getPrototypeOf(SignUp)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.handleChange = function (e, _ref2) {
            var value = _ref2.value;
            return _this.setState({ value: value });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SignUp, [{
        key: 'render',
        value: function render() {
            var value = this.state.value;

            return _react2.default.createElement(
                _semanticUiReact.Container,
                { className: 'sign-up page-holder' },
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { className: 'large-visual' },
                    _react2.default.createElement(_semanticUiReact.Image, { src: 'http://via.placeholder.com/1250x550', fluid: true })
                ),
                _react2.default.createElement(
                    _semanticUiReact.Container,
                    { text: true, className: 'sign-up-form' },
                    _react2.default.createElement(
                        _semanticUiReact.Segment,
                        null,
                        _react2.default.createElement(
                            _semanticUiReact.Form,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Form.Group,
                                { widths: 'equal' },
                                _react2.default.createElement(_semanticUiReact.Form.Input, { label: 'First name', placeholder: 'First name' }),
                                _react2.default.createElement(_semanticUiReact.Form.Input, { label: 'Last name', placeholder: 'Last name' }),
                                _react2.default.createElement(_semanticUiReact.Form.Select, { label: 'Gender', options: options, placeholder: 'Gender' })
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Form.Group,
                                { inline: true },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Size'
                                ),
                                _react2.default.createElement(_semanticUiReact.Form.Radio, { label: 'Small', value: 'sm', checked: value === 'sm', onChange: this.handleChange }),
                                _react2.default.createElement(_semanticUiReact.Form.Radio, { label: 'Medium', value: 'md', checked: value === 'md', onChange: this.handleChange }),
                                _react2.default.createElement(_semanticUiReact.Form.Radio, { label: 'Large', value: 'lg', checked: value === 'lg', onChange: this.handleChange })
                            ),
                            _react2.default.createElement(_semanticUiReact.Form.TextArea, { label: 'About', placeholder: 'Tell us more about you...' }),
                            _react2.default.createElement(_semanticUiReact.Form.Checkbox, { label: 'I agree to the Terms and Conditions' }),
                            _react2.default.createElement(
                                _semanticUiReact.Form.Button,
                                null,
                                'Submit'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SignUp;
}(_react.Component);

exports.default = SignUp;
;

/***/ })
/******/ ]);