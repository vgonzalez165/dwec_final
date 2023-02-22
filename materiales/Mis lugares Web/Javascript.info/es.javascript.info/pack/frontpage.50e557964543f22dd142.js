var frontpage = function(e) {
var t = {};
function n(r) {
if (t[r]) return t[r].exports;
var o = t[r] = {
i: r,
l: !1,
exports: {}
};
return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
}
return n.m = e, n.c = t, n.d = function(e, t, r) {
n.o(e, t) || Object.defineProperty(e, t, {
enumerable: !0,
get: r
});
}, n.r = function(e) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
value: "Module"
}), Object.defineProperty(e, "__esModule", {
value: !0
});
}, n.t = function(e, t) {
if (1 & t && (e = n(e)), 8 & t) return e;
if (4 & t && "object" == typeof e && e && e.__esModule) return e;
var r = Object.create(null);
if (n.r(r), Object.defineProperty(r, "default", {
enumerable: !0,
value: e
}), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function(t) {
return e[t];
}.bind(null, o));
return r;
}, n.n = function(e) {
var t = e && e.__esModule ? function() {
return e.default;
} : function() {
return e;
};
return n.d(t, "a", t), t;
}, n.o = function(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}, n.p = "/pack/", n(n.s = 5);
}([ function(e, t) {
e.exports = {
lang: "es",
localCurrency: "EUR",
shopCurrency: "EUR",
env: "production",
rateShopTo: void 0,
countryCode,
ordersMail: "orders@javascript.info",
providers: [ {
name: "Github",
id: "github"
}, {
name: "Discord",
id: "discord"
}, {
name: "Facebook",
id: "facebook"
}, {
name: "Google",
id: "google"
} ],
stripeKey: "pk_live_51HXm0nFjeNqw1p5a3mjFxSeNHh8OL94IyGcp3PHbZVoNuYUYjlM57YtZMIAM1zrEd1F6WIKfFs67KbTemRdNIySo00KfWS1yhr",
paypalClientId: "Ac86EanyVr7jcO5a_EwTK2vg1MGguuNX27jI4oC120g8xLMuAKmayooEcpc-mODQd4Gsmm7yqA1C7NM-",
lookatCodeUrlBase: "https://lookatcode.com"
};
}, function(e, t, n) {
"use strict";
const r = new (n(12))("en");
let o = console.error;
function s(e) {
return r.hasPhrase(i, e) || o("No such phrase", e), r.t(i, ...arguments);
}
e.exports = s;
const i = n(0).lang;
"en" !== i && r.setFallback(i, "en"), r.add = (...e) => r.addPhrase(i, ...e), s.i18n = r;
}, function(e, t, n) {
"use strict";
n.r(t), n.d(t, "init", (function() {
return s;
})), n.d(t, "Info", (function() {
return a;
})), n.d(t, "Warning", (function() {
return c;
})), n.d(t, "Success", (function() {
return l;
})), n.d(t, "Error", (function() {
return u;
}));
let r = n(10);
class o {
constructor(e = {}) {
this.notifications = [], this.verticalSpace = e.verticalSpace || 8;
}
register(e) {
this.notifications.unshift(e), setTimeout((() => this.recalculate()), 20);
}
unregister(e) {
let t = this.notifications.indexOf(e);
this.notifications.splice(t, 1), this.recalculate();
}
recalculate() {
let e = this.verticalSpace;
this.notifications.forEach((t => {
t.top = e, e += t.height + this.verticalSpace;
}));
}
}
function s(e) {
window.notificationManager || (window.notificationManager = new o(e));
}
class i {
constructor(e, t, n) {
let r = '<div class="notification notification_popup notification_'.concat(t, '">\n    <div class="notification__content">').concat(e, '</div>\n    <button title="Закрыть" class="notification__close"></button></div>');
switch (document.body.insertAdjacentHTML("beforeEnd", r), this.elem = document.body.lastElementChild, 
n) {
case void 0:
this.timeout = this.TIMEOUT_DEFAULT;
break;

case "slow":
this.timeout = this.TIMEOUT_SLOW;
break;

case "fast":
this.timeout = this.TIMEOUT_FAST;
break;

default:
this.timeout = n;
}
window.notificationManager.register(this), this.setupCloseHandler(), this.setupCloseTimeout();
}
get TIMEOUT_DEFAULT() {
return 3e3;
}
get TIMEOUT_SLOW() {
return 5e3;
}
get TIMEOUT_FAST() {
return 1500;
}
close() {
this.elem.parentNode && (this.elem.remove(), window.notificationManager.unregister(this));
}
setupCloseHandler() {
this.delegate(".notification__close", "click", (() => this.close()));
}
setupCloseTimeout() {
this.timeout && setTimeout((() => this.close()), this.timeout);
}
get height() {
return this.elem.offsetHeight;
}
set top(e) {
this.elem.style.transform = "translateY(" + e + "px)";
}
}
r.delegateMixin(i.prototype);
class a extends i {
constructor(e, t) {
super(e, "info", t);
}
}
class c extends i {
constructor(e, t) {
super(e, "warning", t);
}
}
class l extends i {
constructor(e, t) {
super(e, "success", t);
}
}
class u extends i {
constructor(e, t) {
super(e, "error", t);
}
get TIMEOUT_DEFAULT() {
return 5e3;
}
}
}, function(e, t, n) {
let r = n(4);
e.exports = class {
constructor(e) {
this.elem = e, this.renderPromise = new Promise(((e, t) => {
this.renderPromiseResolve = e, this.renderPromiseReject = t;
})), this.render();
}
async render() {
if (!window.RECAPTCHA_ID) return;
if (void 0 !== this.widgetId) return;
await r();
let e = document.createElement("div");
this.elem.append(e), this.widgetId = grecaptcha.render(e, {
sitekey: window.RECAPTCHA_ID,
size: "invisible",
callback: this.renderPromiseResolve
});
}
async execute() {
if (!window.RECAPTCHA_ID) return "";
await this.render();
let e = grecaptcha.getResponse(this.widgetId);
return e || (grecaptcha.execute(this.widgetId), this.renderPromise);
}
async validateForm(e) {
if (!window.RECAPTCHA_ID) return;
let t = await this.execute(), n = e.elements["g-recaptcha-response"];
n || (n = document.createElement("input"), n.name = "g-recaptcha-response", n.type = "hidden", 
e.append(n)), n.value = t;
}
};
}, function(e, t) {
let n;
e.exports = async function() {
if (window.RECAPTCHA_ID) return n || (n = new Promise(((e, t) => {
window.recaptchaCallback = e;
let n = document.createElement("script");
n.src = "https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit", 
n.onerror = t, document.head.appendChild(n);
})), n);
};
}, function(e, t, n) {
n(6), e.exports = n(26);
}, function(e, t, n) {
n(7).initNewsletterForm(), function() {
function e(e, t, n) {
let r = e.length;
for (;--r && window.scrollY + n < e[r].offsetTop; ) ;
t.forEach((e => e.classList.remove("active"))), t[r].classList.add("active");
}
document.addEventListener("click", (e => {
if (e.target.closest(".frontpage-content")) {
let t, n = e.target.closest(".tabs__menu-button");
if (!n) return;
e.preventDefault(), t = document.getElementsByClassName("tabs__menu-button"), document.querySelector(n.getAttribute("href")).scrollIntoView({
behavior: "smooth"
});
}
})), document.addEventListener("DOMContentLoaded", (() => {
const t = document.querySelectorAll(".tabs__content"), n = document.querySelector(".tabs__menu"), r = n.querySelectorAll(".tabs__menu-button");
new IntersectionObserver((e => {
e[0].target.classList.toggle("sticky", !e[0].isIntersecting);
}), {
rootMargin: "-".concat(n.offsetHeight + 1, "px"),
threshold: 0
}).observe(n), e(t, r, n.offsetHeight), window.addEventListener("scroll", (() => e(t, r, n.offsetHeight)));
}));
}();
}, function(e, t, n) {
const r = n(8), o = n(9), s = n(2), i = n(20), {Recaptcha: a} = n(22), c = n(1), l = n(0).lang;
function u(e, t) {
if (!e.elements.email.value) return;
const n = e.elements.slug;
let i, a = [ ...n.querySelectorAll("option:checked") ].map((e => e.value));
if (a.length || (a = n.value), e.elements["subscribe-email"] && (i = !0), !i && !a.length) return void new s.Error(c("newsletter.client.choose_newsletter"));
const l = {
email: e.elements.email.value,
slug: a
};
e.elements["g-recaptcha-response"] && (l["g-recaptcha-response"] = e.elements["g-recaptcha-response"].value), 
i && (l.replace = !0);
const u = o({
method: "POST",
url: e.action,
body: l
}), d = e.querySelector('[type="submit"]'), f = new r({
elem: d,
size: "small",
elemClass: "button_loading"
});
f.start(), d.disabled = !0, u.addEventListener("loadend", (() => {
f.stop(), d.disabled = !1;
})), u.addEventListener("success", (function(n) {
if (200 == this.status) {
new s.Success(n.result.message, "slow");
let r = e.elements.gaEvent && JSON.parse(e.elements.gaEvent.value);
r && window.ga("send", "event", r), t && t();
} else new s.Error(n.result.message);
}));
}
c.i18n.add("newsletter.client", n(24)("./" + l + ".yml")), t.initNewsletterForm = function() {
let e = document.querySelectorAll("[data-newsletter-subscribe-form]");
for (let t of e) {
const e = "hidden" === t.elements.email.type, n = t.querySelector(".multiselect");
if (n) {
const r = new i({
elem: n
}), o = t.querySelector('button[type="submit"]'), s = o.querySelector("span");
t.elements.slug && t.elements.slug.addEventListener("change", (() => {
o.disabled = !r.getValues().length && !e, !r.getValues().length && e ? s.textContent = c("site.subscribe.button_unsubscribe") : s.textContent = c("site.subscribe.button");
}));
}
let r = new a(t);
t.onsubmit = async function(e) {
e.preventDefault(), await r.validateForm(t), u(t);
};
}
}, t.submitSubscribeForm = u;
}, function(e, t) {
function n(e) {
if (e = e || {}, this.elem = e.elem, this.size = e.size || "medium", this.class = e.class ? " " + e.class : "", 
this.elemClass = e.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw new Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
n.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, n.prototype.stop = function() {
let e = this.elem.querySelector(".spinner");
e && (e.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, window.Spinner = n, e.exports = n;
}, function(e, t, n) {
let r = n(2), o = n(11);
const s = n(0).lang, i = n(1);
i.i18n.add("", n(16)("./" + s + ".yml")), i.i18n.add("error.network", n(18)("./" + s + ".yml")), 
document.addEventListener("xhrfail", (function(e) {
new r.Error(e.reason);
})), e.exports = function(e) {
let t = new XMLHttpRequest, n = e.method || "GET", r = e.body, s = e.url;
t.open(n, s, !e.sync), t.method = n;
let a = o();
a && !e.skipCsrf && t.setRequestHeader("X-XSRF-TOKEN", a), e.responseType && (t.responseType = e.responseType), 
"[object Object]" == {}.toString.call(r) && (t.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
r = JSON.stringify(r)), e.noDocumentEvents || (t.addEventListener("loadstart", (e => {
t.timeStart = Date.now();
let n = l("xhrstart", e);
document.dispatchEvent(n);
})), t.addEventListener("loadend", (e => {
let t = l("xhrend", e);
document.dispatchEvent(t);
})), t.addEventListener("success", (e => {
let t = l("xhrsuccess", e);
t.result = e.result, document.dispatchEvent(t);
})), t.addEventListener("fail", (e => {
let t = l("xhrfail", e);
t.reason = e.reason, document.dispatchEvent(t);
}))), e.raw || t.setRequestHeader("Accept", "application/json"), t.setRequestHeader("X-Requested-With", "XMLHttpRequest");
let c = e.normalStatuses || [ 200 ];
function l(e, t) {
let n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function u(e, n) {
let r = l("fail", n);
r.reason = e, t.dispatchEvent(r);
}
return t.addEventListener("error", (e => {
u(i("error.network.server_connection_error"), e);
})), t.addEventListener("timeout", (e => {
u(i("error.network.server_request_timeout"), e);
})), t.addEventListener("abort", (e => {
u(i("error.network.request_aborted"), e);
})), t.addEventListener("load", (n => {
if (!t.status) return void u(i("error.network.no_response"), n);
let r = e.responseType && "text" !== e.responseType ? t.response : t.responseText;
if ((t.getResponseHeader("Content-Type") || "").match(/^application\/json/) || e.json) try {
r = JSON.parse(r);
} catch (n) {
return void u(i("error.network.invalid_format"), n);
}
if (c.includes(t.status)) !function(e, n) {
let r = l("success", n);
r.result = e, t.dispatchEvent(r);
}(r, n); else {
u(r.info ? i("error.network.server_error_info", {
status: t.status,
info: r.info
}) : i("error.network.server_error", {
status: t.status
}), n);
}
})), setTimeout((function() {
t.send(r);
})), t;
};
}, function(e, t) {
function n(e, t, n, r, o) {
e.addEventListener(n, (function(e) {
let n = function(e, t) {
let n = e.target;
for (;n; ) {
if (n.matches(t)) return n;
if (n == e.currentTarget) break;
n = n.parentElement;
}
return null;
}(e, t);
e.delegateTarget = n, n && r.call(o || this, e);
}));
}
n.delegateMixin = function(e) {
e.delegate = function(e, t, r) {
n(this.elem, e, t, r, this);
};
}, e.exports = n;
}, function(e, t) {
e.exports = function() {
let e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
}, function(e, t, n) {
e.exports = n(13);
}, function(e, t, n) {
"use strict";
var r = n(14), o = n(15);
function s(e) {
return Object.prototype.toString.call(e);
}
function i(e) {
return "[object String]" === s(e);
}
function a(e) {
return !isNaN(e) && isFinite(e);
}
function c(e) {
return !0 === e || !1 === e;
}
function l(e) {
return "[object Object]" === s(e);
}
var u = Array.isArray || function(e) {
return "[object Array]" === s(e);
}, d = Array.prototype.forEach;
function f(e, t, n) {
if (null !== e) if (d && e.forEach === d) e.forEach(t, n); else if (e.length === +e.length) for (var r = 0, o = e.length; r < o; r += 1) t.call(n, e[r], r, e); else for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.call(n, e[s], s, e);
}
var p = /%[sdj%]/g;
function h(e) {
var t = 1, n = arguments, r = n.length, o = String(e).replace(p, (function(e) {
if ("%%" === e) return "%";
if (t >= r) return e;
switch (e) {
case "%s":
return String(n[t++]);

case "%d":
return Number(n[t++]);

case "%j":
return JSON.stringify(n[t++]);

default:
return e;
}
}));
return o;
}
function m(e) {
var t = {};
return f(e || {}, (function(e, n) {
e && "object" == typeof e ? f(m(e), (function(e, r) {
t[n + "." + r] = e;
})) : t[n] = e;
})), t;
}
var v = "#@$";
function g(e, t) {
return e + v + t;
}
function _(e, t, n) {
var r = g(t, n), o = e._storage;
if (o.hasOwnProperty(r)) return r;
if (t === e._defaultLocale) return null;
var s = e._fallbacks_cache;
if (s.hasOwnProperty(r)) return s[r];
for (var i, a = e._fallbacks[t] || [ e._defaultLocale ], c = 0, l = a.length; c < l; c++) if (i = g(a[c], n), 
o.hasOwnProperty(i)) return s[r] = i, s[r];
return s[r] = null, null;
}
function b(e, t, n) {
var r = o.indexOf(e, t);
return -1 === r ? h('[pluralizer for "%s" locale not found]', e) : void 0 === n[r] ? h('[plural form %d ("%s") not found in translation]', r, o.forms(e)[r]) : n[r];
}
function y(e) {
if (!(this instanceof y)) return new y(e);
this._defaultLocale = e ? String(e) : "en", this._fallbacks = {}, this._fallbacks_cache = {}, 
this._storage = {}, this._plurals_cache = {};
}
y.prototype.addPhrase = function(e, t, n, r) {
var o, s = this;
if (c(r)) o = r ? 1 / 0 : 0; else if (a(r)) {
if ((o = Math.floor(r)) < 0) throw new TypeError("Invalid flatten level (should be >= 0).");
} else o = 1 / 0;
if (l(n) && o > 0) return f(n, (function(n, r) {
s.addPhrase(e, (t ? t + "." : "") + r, n, o - 1);
})), this;
if (i(n)) this._storage[g(e, t)] = {
translation: n,
locale: e,
raw: !1
}; else {
if (!(u(n) || a(n) || c(n) || 0 === o && l(n))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[g(e, t)] = {
translation: n,
locale: e,
raw: !0
};
}
return s._fallbacks_cache = {}, this;
}, y.prototype.setFallback = function(e, t) {
var n = this._defaultLocale;
if (n === e) throw new Error("Default locale can't have fallbacks");
var r = u(t) ? t.slice() : [ t ];
return r[r.length - 1] !== n && r.push(n), this._fallbacks[e] = r, this._fallbacks_cache = {}, 
this;
};
var w = /#\{|\(\(|\\\\/;
y.prototype.translate = function(e, t, n) {
var o, c = _(this, e, t);
return c ? (o = this._storage[c]).raw ? o.translation : (o.hasOwnProperty("compiled") || (o.compiled = function(e, t, n) {
var o, s, i, a, c, l;
return w.test(t) ? 1 === (o = r.parse(t)).length && "literal" === o[0].type ? o[0].text : (e._plurals_cache[n] || (e._plurals_cache[n] = new y(n)), 
l = e._plurals_cache[n], (s = []).push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
s.push("params = flatten(params);"), f(o, (function(e) {
if ("literal" !== e.type) {
if ("variable" === e.type) return i = e.anchor, void s.push(h('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', i, i, i));
if ("plural" !== e.type) throw new Error("Unknown node type");
i = e.anchor, a = {}, f(e.strict, (function(t, o) {
var s = r.parse(t);
if (1 === s.length && "literal" === s[0].type) return a[o] = !1, void (e.strict[o] = s[0].text);
a[o] = !0, l.hasPhrase(n, t, !0) || l.addPhrase(n, t, t);
})), c = {}, f(e.forms, (function(t, o) {
var s, i = r.parse(t);
if (1 === i.length && "literal" === i[0].type) return s = i[0].text, e.forms[o] = s, 
void (c[s] = !1);
c[t] = !0, l.hasPhrase(n, t, !0) || l.addPhrase(n, t, t);
})), s.push(h("loc = %j;", n)), s.push(h("loc_plzr = %j;", n.split(/[-_]/)[0])), 
s.push(h("anchor = params[%j];", i)), s.push(h("cache = this._plurals_cache[loc];")), 
s.push(h("strict = %j;", e.strict)), s.push(h("strict_exec = %j;", a)), s.push(h("forms = %j;", e.forms)), 
s.push(h("forms_exec = %j;", c)), s.push("if (+(anchor) != anchor) {"), s.push(h('  str += "[invalid plurals amount: %s(" + anchor + ")]";', i)), 
s.push("} else {"), s.push("  if (strict[anchor] !== undefined) {"), s.push("    plrl = strict[anchor];"), 
s.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), s.push("  } else {"), 
s.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), s.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
s.push("  }"), s.push("}");
} else s.push(h("str += %j;", e.text));
})), s.push("return str;"), new Function("params", "flatten", "pluralizer", s.join("\n"))) : t;
}(this, o.translation, o.locale)), "[object Function]" !== s(o.compiled) ? o.compiled : ((a(n) || i(n)) && (n = {
count: n,
value: n
}), o.compiled.call(this, n, m, b))) : e + ": No translation for [" + t + "]";
}, y.prototype.hasPhrase = function(e, t, n) {
return n ? this._storage.hasOwnProperty(g(e, t)) : !!_(this, e, t);
}, y.prototype.getLocale = function(e, t, n) {
if (n) return this._storage.hasOwnProperty(g(e, t)) ? e : null;
var r = _(this, e, t);
return r ? r.split(v, 2)[0] : null;
}, y.prototype.t = y.prototype.translate, y.prototype.stringify = function(e) {
var t = this, n = {};
f(this._storage, (function(e, t) {
n[t.split(v)[1]] = !0;
}));
var r = {};
f(n, (function(n, o) {
var s = _(t, e, o);
if (s) {
var i = t._storage[s].locale;
r[i] || (r[i] = {}), r[i][o] = t._storage[s].translation;
}
}));
var o = {
fallback: {},
locales: r
}, s = (t._fallbacks[e] || []).slice(0, -1);
return s.length && (o.fallback[e] = s), JSON.stringify(o);
}, y.prototype.load = function(e) {
var t = this;
return i(e) && (e = JSON.parse(e)), f(e.locales, (function(e, n) {
f(e, (function(e, r) {
t.addPhrase(n, r, e, 0);
}));
})), f(e.fallback, (function(e, n) {
t.setFallback(n, e);
})), this;
}, e.exports = y;
}, function(e, t) {
e.exports = function() {
function e(e, t, n, r, o, s) {
this.message = e, this.expected = t, this.found = n, this.offset = r, this.line = o, 
this.column = s, this.name = "SyntaxError";
}
return function(e, t) {
function n() {
this.constructor = e;
}
n.prototype = t.prototype, e.prototype = new n;
}(e, Error), {
SyntaxError: e,
parse: function(t) {
var n, r = arguments.length > 1 ? arguments[1] : {}, o = {}, s = {
start: ue
}, i = ue, a = o, c = "((", l = {
type: "literal",
value: "((",
description: '"(("'
}, u = "))", d = {
type: "literal",
value: "))",
description: '"))"'
}, f = null, p = function(e, t) {
return {
type: "plural",
forms: we(e),
strict: xe(e),
anchor: t || "count"
};
}, h = "|", m = {
type: "literal",
value: "|",
description: '"|"'
}, v = function(e, t) {
return [ e ].concat(t);
}, g = function(e) {
return [ e ];
}, _ = "=", b = {
type: "literal",
value: "=",
description: '"="'
}, y = /^[0-9]/, w = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, x = " ", F = {
type: "literal",
value: " ",
description: '" "'
}, E = function(e, t) {
return {
strict: e.join(""),
text: t.join("")
};
}, k = function() {
return {
text: ie()
};
}, C = "\\", A = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, j = /^[\\|)(]/, S = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, T = function(e) {
return e;
}, O = void 0, L = {
type: "any",
description: "any character"
}, q = function() {
return ie();
}, P = ":", D = {
type: "literal",
value: ":",
description: '":"'
}, M = function(e) {
return e;
}, z = "#{", N = {
type: "literal",
value: "#{",
description: '"#{"'
}, R = "}", I = {
type: "literal",
value: "}",
description: '"}"'
}, U = function(e) {
return {
type: "variable",
anchor: e
};
}, H = ".", B = {
type: "literal",
value: ".",
description: '"."'
}, V = function() {
return ie();
}, G = /^[a-zA-Z_$]/, K = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, $ = /^[a-zA-Z0-9_$]/, J = {
type: "class",
value: "[a-zA-Z0-9_$]",
description: "[a-zA-Z0-9_$]"
}, X = function(e) {
return e;
}, Z = function(e) {
return {
type: "literal",
text: e.join("")
};
}, W = /^[\\#()|]/, Y = {
type: "class",
value: "[\\\\#()|]",
description: "[\\\\#()|]"
}, Q = 0, ee = 0, te = 0, ne = {
line: 1,
column: 1,
seenCR: !1
}, re = 0, oe = [], se = 0;
if ("startRule" in r) {
if (!(r.startRule in s)) throw new Error("Can't start parsing from rule \"" + r.startRule + '".');
i = s[r.startRule];
}
function ie() {
return t.substring(ee, Q);
}
function ae(e) {
return te !== e && (te > e && (te = 0, ne = {
line: 1,
column: 1,
seenCR: !1
}), function(e, n, r) {
var o, s;
for (o = n; o < r; o++) "\n" === (s = t.charAt(o)) ? (e.seenCR || e.line++, e.column = 1, 
e.seenCR = !1) : "\r" === s || "\u2028" === s || "\u2029" === s ? (e.line++, e.column = 1, 
e.seenCR = !0) : (e.column++, e.seenCR = !1);
}(ne, te, e), te = e), ne;
}
function ce(e) {
Q < re || (Q > re && (re = Q, oe = []), oe.push(e));
}
function le(n, r, o) {
var s = ae(o), i = o < t.length ? t.charAt(o) : null;
return null !== r && function(e) {
var t = 1;
for (e.sort((function(e, t) {
return e.description < t.description ? -1 : e.description > t.description ? 1 : 0;
})); t < e.length; ) e[t - 1] === e[t] ? e.splice(t, 1) : t++;
}(r), new e(null !== n ? n : function(e, t) {
var n, r = new Array(e.length);
for (n = 0; n < e.length; n++) r[n] = e[n].description;
return "Expected " + (e.length > 1 ? r.slice(0, -1).join(", ") + " or " + r[e.length - 1] : r[0]) + " but " + (t ? '"' + function(e) {
function t(e) {
return e.charCodeAt(0).toString(16).toUpperCase();
}
return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, (function(e) {
return "\\x0" + t(e);
})).replace(/[\x10-\x1F\x80-\xFF]/g, (function(e) {
return "\\x" + t(e);
})).replace(/[\u0180-\u0FFF]/g, (function(e) {
return "\\u0" + t(e);
})).replace(/[\u1080-\uFFFF]/g, (function(e) {
return "\\u" + t(e);
}));
}(t) + '"' : "end of input") + " found.";
}(r, i), r, i, o, s.line, s.column);
}
function ue() {
var e, t;
for (e = [], (t = be()) === o && (t = de()) === o && (t = ve()); t !== o; ) e.push(t), 
(t = be()) === o && (t = de()) === o && (t = ve());
return e;
}
function de() {
var e, n, r, s, i;
return e = Q, t.substr(Q, 2) === c ? (n = c, Q += 2) : (n = o, 0 === se && ce(l)), 
n !== o && (r = fe()) !== o ? (t.substr(Q, 2) === u ? (s = u, Q += 2) : (s = o, 
0 === se && ce(d)), s !== o ? ((i = me()) === o && (i = f), i !== o ? (ee = e, e = n = p(r, i)) : (Q = e, 
e = a)) : (Q = e, e = a)) : (Q = e, e = a), e;
}
function fe() {
var e, n, r, s;
return e = Q, (n = pe()) !== o ? (124 === t.charCodeAt(Q) ? (r = h, Q++) : (r = o, 
0 === se && ce(m)), r !== o && (s = fe()) !== o ? (ee = e, e = n = v(n, s)) : (Q = e, 
e = a)) : (Q = e, e = a), e === o && (e = Q, (n = pe()) !== o && (ee = e, n = g(n)), 
e = n), e;
}
function pe() {
var e, n, r, s, i, c;
if (e = Q, 61 === t.charCodeAt(Q) ? (n = _, Q++) : (n = o, 0 === se && ce(b)), n !== o) {
if (r = [], y.test(t.charAt(Q)) ? (s = t.charAt(Q), Q++) : (s = o, 0 === se && ce(w)), 
s !== o) for (;s !== o; ) r.push(s), y.test(t.charAt(Q)) ? (s = t.charAt(Q), Q++) : (s = o, 
0 === se && ce(w)); else r = a;
if (r !== o) if (32 === t.charCodeAt(Q) ? (s = x, Q++) : (s = o, 0 === se && ce(F)), 
s === o && (s = f), s !== o) {
if (i = [], (c = he()) !== o) for (;c !== o; ) i.push(c), c = he(); else i = a;
i !== o ? (ee = e, e = n = E(r, i)) : (Q = e, e = a);
} else Q = e, e = a; else Q = e, e = a;
} else Q = e, e = a;
if (e === o) {
if (e = Q, n = [], (r = he()) !== o) for (;r !== o; ) n.push(r), r = he(); else n = a;
n !== o && (ee = e, n = k()), e = n;
}
return e;
}
function he() {
var e, n, r;
return e = Q, 92 === t.charCodeAt(Q) ? (n = C, Q++) : (n = o, 0 === se && ce(A)), 
n !== o ? (j.test(t.charAt(Q)) ? (r = t.charAt(Q), Q++) : (r = o, 0 === se && ce(S)), 
r !== o ? (ee = e, e = n = T(r)) : (Q = e, e = a)) : (Q = e, e = a), e === o && (e = Q, 
n = Q, se++, 124 === t.charCodeAt(Q) ? (r = h, Q++) : (r = o, 0 === se && ce(m)), 
r === o && (t.substr(Q, 2) === u ? (r = u, Q += 2) : (r = o, 0 === se && ce(d))), 
se--, r === o ? n = O : (Q = n, n = a), n !== o ? (t.length > Q ? (r = t.charAt(Q), 
Q++) : (r = o, 0 === se && ce(L)), r !== o ? (ee = e, e = n = q()) : (Q = e, e = a)) : (Q = e, 
e = a)), e;
}
function me() {
var e, n, r;
return e = Q, 58 === t.charCodeAt(Q) ? (n = P, Q++) : (n = o, 0 === se && ce(D)), 
n !== o && (r = ge()) !== o ? (ee = e, e = n = M(r)) : (Q = e, e = a), e;
}
function ve() {
var e, n, r, s;
return e = Q, t.substr(Q, 2) === z ? (n = z, Q += 2) : (n = o, 0 === se && ce(N)), 
n !== o && (r = ge()) !== o ? (125 === t.charCodeAt(Q) ? (s = R, Q++) : (s = o, 
0 === se && ce(I)), s !== o ? (ee = e, e = n = U(r)) : (Q = e, e = a)) : (Q = e, 
e = a), e;
}
function ge() {
var e, n, r, s;
if (e = Q, _e() !== o) if (46 === t.charCodeAt(Q) ? (n = H, Q++) : (n = o, 0 === se && ce(B)), 
n !== o) {
if (r = [], (s = ge()) !== o) for (;s !== o; ) r.push(s), s = ge(); else r = a;
r !== o ? (ee = e, e = V()) : (Q = e, e = a);
} else Q = e, e = a; else Q = e, e = a;
return e === o && (e = _e()), e;
}
function _e() {
var e, n, r, s;
if (e = Q, G.test(t.charAt(Q)) ? (n = t.charAt(Q), Q++) : (n = o, 0 === se && ce(K)), 
n !== o) {
for (r = [], $.test(t.charAt(Q)) ? (s = t.charAt(Q), Q++) : (s = o, 0 === se && ce(J)); s !== o; ) r.push(s), 
$.test(t.charAt(Q)) ? (s = t.charAt(Q), Q++) : (s = o, 0 === se && ce(J));
r !== o ? (ee = e, e = n = q()) : (Q = e, e = a);
} else Q = e, e = a;
return e;
}
function be() {
var e, t, n, r, s;
if (e = Q, t = [], n = Q, r = Q, se++, (s = de()) === o && (s = ve()), se--, s === o ? r = O : (Q = r, 
r = a), r !== o && (s = ye()) !== o ? (ee = n, n = r = X(s)) : (Q = n, n = a), n !== o) for (;n !== o; ) t.push(n), 
n = Q, r = Q, se++, (s = de()) === o && (s = ve()), se--, s === o ? r = O : (Q = r, 
r = a), r !== o && (s = ye()) !== o ? (ee = n, n = r = X(s)) : (Q = n, n = a); else t = a;
return t !== o && (ee = e, t = Z(t)), e = t;
}
function ye() {
var e, n, r;
return e = Q, 92 === t.charCodeAt(Q) ? (n = C, Q++) : (n = o, 0 === se && ce(A)), 
n !== o ? (W.test(t.charAt(Q)) ? (r = t.charAt(Q), Q++) : (r = o, 0 === se && ce(Y)), 
r !== o ? (ee = e, e = n = T(r)) : (Q = e, e = a)) : (Q = e, e = a), e === o && (t.length > Q ? (e = t.charAt(Q), 
Q++) : (e = o, 0 === se && ce(L))), e;
}
function we(e) {
for (var t = [], n = 0; n < e.length; n++) void 0 === e[n].strict && t.push(e[n].text);
return t;
}
function xe(e) {
for (var t = {}, n = 0; n < e.length; n++) void 0 !== e[n].strict && (t[e[n].strict] = e[n].text);
return t;
}
if ((n = i()) !== o && Q === t.length) return n;
throw n !== o && Q < t.length && ce({
type: "end",
description: "end of input"
}), le(null, oe, re);
}
};
}();
}, function(e, t, n) {
"use strict";
var r = {};
function o(e) {
var t;
return r[e] ? e : (t = e.toLowerCase().replace("_", "-"), r[t] ? t : (t = t.split("-")[0], 
r[t] ? t : null));
}
function s(e, t) {
var n = o(e);
if (!n) return -1;
if (!r[n].cFn) return 0;
var s = String(t), i = s.indexOf(".") < 0 ? "" : s.split(".")[1], a = i.length, c = +t, l = +s.split(".")[0], u = 0 === i.length ? 0 : +i.replace(/0+$/, "");
return r[n].cFn(c, l, a, +i, u);
}
function i(e, t) {
var n = o(e);
if (!n) return -1;
if (!r[n].oFn) return 0;
var s = String(t), i = s.indexOf(".") < 0 ? "" : s.split(".")[1], a = i.length, c = +t, l = +s.split(".")[0], u = 0 === i.length ? 0 : +i.replace(/0+$/, "");
return r[n].oFn(c, l, a, +i, u);
}
e.exports = function(e, t) {
var n = o(e);
return n ? r[n].c[s(n, t)] : null;
}, e.exports.indexOf = s, e.exports.forms = function(e) {
var t = o(e);
return r[t] ? r[t].c : null;
}, e.exports.ordinal = function(e, t) {
var n = o(e);
return r[n] ? r[n].o[i(n, t)] : null;
}, e.exports.ordinal.indexOf = i, e.exports.ordinal.forms = function(e) {
var t = o(e);
return r[t] ? r[t].o : null;
};
var a = [ "zero", "one", "two", "few", "many", "other" ];
function c(e) {
return a[e];
}
function l(e, t) {
var n;
for (t.c = t.c ? t.c.map(c) : [ "other" ], t.o = t.o ? t.o.map(c) : [ "other" ], 
n = 0; n < e.length; n++) r[e[n]] = t;
}
function u(e, t, n) {
return e <= n && n <= t && n % 1 == 0;
}
function d(e, t) {
return e.indexOf(t) >= 0;
}
l([ "af", "asa", "bem", "bez", "bg", "brx", "ce", "cgg", "chr", "ckb", "dv", "ee", "el", "eo", "es", "eu", "fo", "fur", "gsw", "ha", "haw", "jgo", "jmc", "kaj", "kcg", "kkj", "kl", "ks", "ksb", "ku", "ky", "lb", "lg", "mas", "mgo", "ml", "mn", "nah", "nb", "nd", "nn", "nnh", "no", "nr", "ny", "nyn", "om", "or", "os", "pap", "ps", "rm", "rof", "rwk", "saq", "sdh", "seh", "sn", "so", "ss", "ssy", "st", "syr", "ta", "te", "teo", "tig", "tk", "tn", "tr", "ts", "ug", "uz", "ve", "vo", "vun", "wae", "xh", "xog" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
}
}), l([ "ak", "bh", "guw", "ln", "mg", "nso", "pa", "ti", "wa" ], {
c: [ 1, 5 ],
cFn: function(e) {
return u(0, 1, e) ? 0 : 1;
}
}), l([ "am", "fa", "kn", "zu" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
}
}), l([ "ar", "ars" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 100;
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : u(3, 10, t) ? 3 : u(11, 99, t) ? 4 : 5;
}
}), l([ "as", "bn" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return d([ 1, 5, 7, 8, 9, 10 ], e) ? 0 : d([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), l([ "ast", "de", "et", "fi", "fy", "gl", "ji", "nl", "sw", "ur", "yi" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
}
}), l([ "az" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 3, 4, 5 ],
oFn: function(e, t) {
var n = t % 10, r = t % 100, o = t % 1e3;
return d([ 1, 2, 5, 7, 8 ], n) || d([ 20, 50, 70, 80 ], r) ? 0 : d([ 3, 4 ], n) || d([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], o) ? 1 : 0 === t || 6 === n || d([ 40, 60, 90 ], r) ? 2 : 3;
}
}), l([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, n = e % 100;
return 1 === t && 11 !== n ? 0 : u(2, 4, t) && !u(12, 14, n) ? 1 : 0 === t || u(5, 9, t) || u(11, 14, n) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
var t = e % 100;
return d([ 2, 3 ], e % 10) && !d([ 12, 13 ], t) ? 0 : 1;
}
}), l([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "yue", "zh" ], {}), 
l([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, n = e % 100, r = e % 1e6;
return 1 !== t || d([ 11, 71, 91 ], n) ? 2 !== t || d([ 12, 72, 92 ], n) ? !u(3, 4, t) && 9 !== t || u(10, 19, n) || u(70, 79, n) || u(90, 99, n) ? 0 !== e && 0 === r ? 3 : 4 : 2 : 1 : 0;
}
}), l([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, n, r) {
var o = t % 10, s = t % 100, i = r % 10, a = r % 100;
return 0 === n && 1 === o && 11 !== s || 1 === i && 11 !== a ? 0 : 0 === n && u(2, 4, o) && !u(12, 14, s) || u(2, 4, i) && !u(12, 14, a) ? 1 : 2;
}
}), l([ "ca" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return d([ 1, 3 ], e) ? 0 : 2 === e ? 1 : 4 === e ? 2 : 3;
}
}), l([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : u(2, 4, t) && 0 === n ? 1 : 0 !== n ? 2 : 3;
}
}), l([ "cy" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : 3 === e ? 3 : 6 === e ? 4 : 5;
},
o: [ 0, 1, 2, 3, 4, 5 ],
oFn: function(e) {
return d([ 0, 7, 8, 9 ], e) ? 0 : 1 === e ? 1 : 2 === e ? 2 : d([ 3, 4 ], e) ? 3 : d([ 5, 6 ], e) ? 4 : 5;
}
}), l([ "da" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r, o) {
return 1 === e || 0 !== o && d([ 0, 1 ], t) ? 0 : 1;
}
}), l([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, n, r) {
var o = t % 100, s = r % 100;
return 0 === n && 1 === o || 1 === s ? 0 : 0 === n && 2 === o || 2 === s ? 1 : 0 === n && u(3, 4, o) || u(3, 4, s) ? 2 : 3;
}
}), l([ "en" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
var t = e % 10, n = e % 100;
return 1 === t && 11 !== n ? 0 : 2 === t && 12 !== n ? 1 : 3 === t && 13 !== n ? 2 : 3;
}
}), l([ "ff", "kab" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return d([ 0, 1 ], t) ? 0 : 1;
}
}), l([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
var o = t % 10, s = r % 10;
return 0 === n && d([ 1, 2, 3 ], t) || 0 === n && !d([ 4, 6, 9 ], o) || 0 !== n && !d([ 4, 6, 9 ], s) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), l([ "fr", "hy" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return d([ 0, 1 ], t) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), l([ "ga" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 2 === e ? 1 : u(3, 6, e) ? 2 : u(7, 10, e) ? 3 : 4;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), l([ "gd" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e) {
return d([ 1, 11 ], e) ? 0 : d([ 2, 12 ], e) ? 1 : u(3, 10, e) || u(13, 19, e) ? 2 : 3;
}
}), l([ "gu", "hi" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return 1 === e ? 0 : d([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), l([ "gv" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && d([ 0, 20, 40, 60, 80 ], t % 100) ? 2 : 0 !== n ? 3 : 4;
}
}), l([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(e, t, n) {
var r = e % 10;
return 1 === t && 0 === n ? 0 : 2 === t && 0 === n ? 1 : 0 !== n || u(0, 10, e) || 0 !== r ? 3 : 2;
}
}), l([ "hu" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return d([ 1, 5 ], e) ? 0 : 1;
}
}), l([ "is" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r, o) {
return 0 === o && 1 === t % 10 && 11 !== t % 100 || 0 !== o ? 0 : 1;
}
}), l([ "it" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(e) {
return d([ 11, 8, 80, 800 ], e) ? 0 : 1;
}
}), l([ "iu", "kw", "naq", "se", "sma", "smi", "smj", "smn", "sms" ], {
c: [ 1, 2, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 2 === e ? 1 : 2;
}
}), l([ "ka" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(e, t) {
var n = t % 100;
return 1 === t ? 0 : 0 === t || u(2, 20, n) || 40 === n || 60 === n || 80 === n ? 1 : 2;
}
}), l([ "kk" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(e) {
var t = e % 10;
return 6 === t || 9 === t || 0 === t && 0 !== e ? 0 : 1;
}
}), l([ "ksh" ], {
c: [ 0, 1, 5 ],
cFn: function(e) {
return 0 === e ? 0 : 1 === e ? 1 : 2;
}
}), l([ "lag" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t) {
return 0 === e ? 0 : d([ 0, 1 ], t) && 0 !== e ? 1 : 2;
}
}), l([ "lo", "ms", "vi" ], {
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), l([ "lt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n, r) {
var o = e % 10, s = e % 100;
return 1 !== o || u(11, 19, s) ? u(2, 9, o) && !u(11, 19, s) ? 1 : 0 !== r ? 2 : 3 : 0;
}
}), l([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t, n, r) {
var o = e % 10, s = e % 100, i = r % 100, a = r % 10;
return 0 === o || u(11, 19, s) || 2 === n && u(11, 19, i) ? 0 : 1 === o && 11 !== s || 2 === n && 1 === a && 11 !== i || 2 !== n && 1 === a ? 1 : 2;
}
}), l([ "mk" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
return 0 === n && 1 === t % 10 || 1 === r % 10 ? 0 : 1;
},
o: [ 1, 2, 4, 5 ],
oFn: function(e, t) {
var n = t % 10, r = t % 100;
return 1 === n && 11 !== r ? 0 : 2 === n && 12 !== r ? 1 : d([ 7, 8 ], n) && !d([ 17, 18 ], r) ? 2 : 3;
}
}), l([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 0 !== n || 0 === e || 1 !== e && u(1, 19, e % 100) ? 1 : 2;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), l([ "mr" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return 1 === e ? 0 : d([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 3;
}
}), l([ "mt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 100;
return 1 === e ? 0 : 0 === e || u(2, 10, t) ? 1 : u(11, 19, t) ? 2 : 3;
}
}), l([ "ne" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return u(1, 4, e) ? 0 : 1;
}
}), l([ "pl" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, o = t % 100;
return 1 === t && 0 === n ? 0 : 0 === n && u(2, 4, r) && !u(12, 14, o) ? 1 : 0 === n && 1 !== t && u(0, 1, r) || 0 === n && u(5, 9, r) || 0 === n && u(12, 14, o) ? 2 : 3;
}
}), l([ "pt" ], {
c: [ 1, 5 ],
cFn: function(e) {
return u(0, 2, e) && 2 !== e ? 0 : 1;
}
}), l([ "pt-pt" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === e && 0 === n ? 0 : 1;
}
}), l([ "ru" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, o = t % 100;
return 0 === n && 1 === r && 11 !== o ? 0 : 0 === n && u(2, 4, r) && !u(12, 14, o) ? 1 : 0 === n && 0 === r || 0 === n && u(5, 9, r) || 0 === n && u(11, 14, o) ? 2 : 3;
}
}), l([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : u(2, 10, e) ? 1 : 2;
}
}), l([ "si" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
return d([ 0, 1 ], e) || 0 === t && 1 === r ? 0 : 1;
}
}), l([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, n) {
var r = t % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && u(3, 4, r) || 0 !== n ? 2 : 3;
}
}), l([ "sq" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 4 === e % 10 && 14 !== e % 100 ? 1 : 2;
}
}), l([ "sv" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
var t = e % 100;
return d([ 1, 2 ], e % 10) && !d([ 11, 12 ], t) ? 0 : 1;
}
}), l([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(e) {
return u(0, 1, e) || u(11, 99, e) ? 0 : 1;
}
}), l([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, o = t % 100;
return 0 === n && 1 === r && 11 !== o ? 0 : 0 === n && u(2, 4, r) && !u(12, 14, o) ? 1 : 0 === n && 0 === r || 0 === n && u(5, 9, r) || 0 === n && u(11, 14, o) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
return 3 === e % 10 && 13 !== e % 100 ? 0 : 1;
}
});
}, function(e, t, n) {
var r = {
"./es.yml": 17
};
function o(e) {
var t = s(e);
return n(t);
}
function s(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
o.keys = function() {
return Object.keys(r);
}, o.resolve = s, e.exports = o, o.id = 16;
}, function(e, t) {
e.exports = {
site: {
privacy_policy: "política de privacidad",
terms: "condiciones de uso",
gdpr_dialog: {
title: "Este sitio web utiliza cookies",
text: 'Usamos tecnologías de navegador como cookies y almacenamiento local para almacenar sus preferencias. Debes aceptar nuestras <a href="/privacy">Políticas de Privacidad</a> y <a href="/terms">Condiciones de Uso</a> para que podamos hacerlo.',
accept: "Aceptar",
cancel: "Cancelar"
},
theme: {
light: "Light theme",
dark: "Dark theme",
change: "Change theme"
},
toolbar: {
lang_switcher: {
cta_text: '<p>Queremos que este proyecto de código abierto esté disponible para personas de todo el mundo.</p> <p><a href="https://javascript.info/translate">Ayuda a traducir</a> el contenido de este tutorial a tu idioma!</p>\n',
footer_text: "cuánto contenido está traducido al idioma correspondiente",
old_version: "Antigua versión está publicada, necesita backporting."
},
logo: {
normal: {
svg: "sitetoolbar__logo_en.svg",
width: 200
},
"normal-white": {
svg: "sitetoolbar__logo_en-white.svg"
},
small: {
svg: "sitetoolbar__logo_small_en.svg",
width: 70
},
"small-white": {
svg: "sitetoolbar__logo_small_en-white.svg"
}
},
sections: null,
buy_ebook_extra: "Comprar",
buy_ebook: "EPUB/PDF",
search_placeholder: "Buscar en Javascript.info",
search_button: "Buscar",
public_profile: "Perfil público",
account: "Cuenta",
notifications: "Notificaciones",
admin: "Admin",
logout: "Cerrar sesión"
},
sorry_old_browser: "Lo sentimos, Internet Explorer no es compatible. Utilice un navegador más nuevo.",
contact_us: "contáctenos",
about_the_project: "acerca del proyecto",
ilya_kantor: "Ilya Kantor",
comments: "Comentarios",
loading: "Cargando...",
search: "Buscar",
share: "Compartir",
read_before_commenting: "lea esto antes de comentar…",
last_updated_at: "Última actualización el #{date}",
meta: {
description: "Tutorial de JavaScript moderno: explicaciones simples pero detalladas con ejemplos y tareas, que incluyen: closures, documentos y eventos, programación orientada a objetos y más."
},
"tablet-menu": {
choose_section: "Elija una sección",
search_placeholder: "Buscar en el tutorial",
search_button: "Buscar"
},
comment: {
help: [ 'Si tiene sugerencias sobre qué mejorar, por favor <a href="https://github.com/javascript-tutorial/en.javascript.info/issues/new">enviar una propuesta de GitHub</a> o una solicitud de extracción en lugar de comentar.', "Si no puede entender algo en el artículo, por favor explique.", "Para insertar algunas palabras de código, use la etiqueta <code>&lt;code&gt;</code>, para varias líneas – envolverlas en la etiqueta <code>&lt;pre&gt;</code>, para más de 10 líneas – utilice una entorno controlado (sandbox) (<a href='https://plnkr.co/edit/?p=preview'>plnkr</a>, <a href='https://jsbin.com'>jsbin</a>, <a href='http://codepen.io'>codepen</a>…)" ]
},
edit_on_github: "Editar en GitHub",
error: "error",
close: "cerrar",
hide_forever: "ocultar de manera permanente",
hidden_forever: "Esta información no volverá a aparecer.",
subscribe: {
title: "Esté atento a las actualizaciones de javascript.info",
text: "No enviamos publicidad, solo material relevante. Tu eliges que recibir:",
agreement: 'Al suscribirse a los boletines informativos, acepta las <a href="#{link}" target="_blank">condiciones de uso</a>.',
button: "Suscríbete",
button_unsubscribe: "Darse de baja de todos",
common_updates: "Actualizaciones comúnes",
common_updates_text: "nuevos cursos, clases magistrales, lanzamientos de artículos y screencast",
your_email: "tu@email.aqui",
newsletters: "boletín informativo,boletines informativos,boletines informativos",
no_selected: "Nada seleccionado"
},
form: {
value_must_not_be_empty: "El valor no debe estar vacío.",
value_is_too_long: "El valor es demasiado largo.",
value_is_too_short: "El valor es demasiado corto.",
invalid_email: "Dirección de email no válida.",
invalid_value: "Valor no válido.",
invalid_autocomplete: "Por favor elija de la lista",
invalid_date: "Fecha no válida, formato: dd.mm.yyyyy.",
invalid_range: "Esta fecha no es válida aquí.",
save: "Guardar",
upload_file: "Subir Archivo",
cancel: "Cancelar",
server_error: "Error de solicitud, código de estado"
}
}
};
}, function(e, t, n) {
var r = {
"./es.yml": 19
};
function o(e) {
var t = s(e);
return n(t);
}
function s(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
o.keys = function() {
return Object.keys(r);
}, o.resolve = s, e.exports = o, o.id = 18;
}, function(e, t) {
e.exports = {
server_connection_error: "Error de conexión al servidor.",
server_request_timeout: "Tiempo de espera de la solicitud del servidor.",
request_aborted: "La solicitud fue cancelada.",
no_response: "No hay respuesta del servidor.",
server_error: "Error de servidor (código #{status}), intente nuevamente más tarde.",
invalid_format: "Formato de respuesta no válido."
};
}, function(e, t, n) {
const r = n(1), o = n(21);
e.exports = class {
constructor(e) {
this.elem = e.elem, this.select = this.elem.querySelector("select"), this.textContainer = this.elem.querySelector(".multiselect__active-button"), 
this.options = [ ...this.select.querySelectorAll("option") ], this.defaultValue = this.textContainer.textContent, 
this.status = "closed", this.elem.querySelector(".multiselect__container").insertAdjacentHTML("beforeend", this.createDropdown()), 
this.setButtonTitle(), this.bindHandlers();
}
createDropdown() {
return "\n      <div class='multiselect__dropdown-container'>\n        <div class='multiselect__dropdown'>\n          ".concat(this.options.map((e => "<div class='multiselect__item".concat(e.selected ? " multiselect__item_checked" : "", "' data-value='").concat(e.value, "'>\n                <span class='multiselect__item-title'>").concat(e.textContent + ("advanced" === e.value ? "<span class='multiselect__greyed-text'>".concat(r("site.subscribe.common_updates_text"), "</span>") : ""), "</span>\n              </div>"))).join(""), "\n        </div>\n      </div>\n    ");
}
bindHandlers() {
this.textContainer.addEventListener("click", this.toggleDropdown.bind(this));
for (let e of this.elem.querySelectorAll(".multiselect__item")) e.addEventListener("click", this.onChange.bind(this));
this.select.addEventListener("change", this.setButtonTitle.bind(this));
}
toggleDropdown(e) {
e.stopPropagation(), this.elem.classList.toggle("multiselect_opened"), this.toggleStatus(), 
"opened" === this.status && (this.boundCloseDropdown = this.closeDropdown.bind(this), 
document.addEventListener("click", this.boundCloseDropdown));
}
toggleStatus() {
"closed" === this.status ? this.status = "opened" : this.status = "closed";
}
closeDropdown(e) {
e.target.closest(".multiselect__dropdown-container") || (this.status = "closed", 
this.elem.classList.remove("multiselect_opened"), document.removeEventListener("click", this.boundCloseDropdown));
}
onChange(e) {
const t = e.target.closest(".multiselect__item");
t.classList.toggle("multiselect__item_checked");
this.options.filter((e => e.value === t.getAttribute("data-value"))).pop().selected = t.classList.contains("multiselect__item_checked"), 
this.select.dispatchEvent(new Event("change"));
}
setButtonTitle() {
const e = this.getValues();
1 === e.length && e.includes("advanced") ? this.textContainer.textContent = this.defaultValue : e.length ? this.textContainer.textContent = e.length + " " + o(e.length, r("site.subscribe.newsletters")) : this.textContainer.textContent = r("site.subscribe.no_selected");
}
getValues() {
return this.options.filter((e => e.selected)).map((e => e.value));
}
};
}, function(e, t) {
e.exports = function(e, t) {
var n, r = (n = e) % 10 == 1 && n % 100 != 11 ? "one" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) && n == Math.floor(n) ? "few" : n % 10 == 0 || n % 10 >= 5 && n % 10 <= 9 || n % 100 >= 11 && n % 100 <= 14 && n == Math.floor(n) ? "many" : "other", o = t.split(",");
switch (r) {
case "one":
return o[0];

case "few":
return o[1];

case "many":
return o[2];

default:
throw new Error("Unsupported count: " + e);
}
};
}, function(e, t, n) {
t.Recaptcha = n(3), t.initForms = n(23);
}, function(e, t, n) {
let r = n(4), o = n(3);
e.exports = async function() {
let e = document.querySelectorAll("[data-recaptcha-submit]");
if (e.length) {
for (let t of e) t.disabled = !0;
await r();
for (let t of e) {
let e = t.form, n = new o(e);
e.onsubmit = async t => {
t.preventDefault(), await n.validateForm(e), e.checkValidity() ? e.submit() : e.reportValidity();
}, t.disabled = !1;
}
}
};
}, function(e, t, n) {
var r = {
"./es.yml": 25
};
function o(e) {
var t = s(e);
return n(t);
}
function s(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
o.keys = function() {
return Object.keys(r);
}, o.resolve = s, e.exports = o, o.id = 24;
}, function(e, t) {
e.exports = {
choose_newsletter: "Elija boletines en la lista.",
email_please: "¿Tu email?"
};
}, function(e, t, n) {} ]);
//# sourceMappingURL=frontpage.50e557964543f22dd142.js.map