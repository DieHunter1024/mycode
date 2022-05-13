"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var event_message_center_1 = require("event-message-center");
// import { messageCenter } from "event-message-center"
var TaskQueue = /** @class */ (function () {
    function TaskQueue(_a) {
        var maxLen = _a.maxLen;
        var _this = this;
        this.push = function (queue) {
            _this.checkHandler(queue);
            if (queue instanceof Array) {
                queue = queue.map(function (i) {
                    i.count = ++_this.count;
                    return i;
                });
                _this.queues = _this.queues.concat(queue);
            }
            else if (typeof queue === "object") {
                _this.queues.push(__assign({ count: ++_this.count }, queue));
            }
        };
        this.unshift = function (length) {
            return _this.queues.splice(0, length);
        };
        this.run = function () { return __awaiter(_this, void 0, void 0, function () {
            var queues, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queues = this.queues.length > this.maxLen ? this.unshift(this.maxLen - 1) : this.queues;
                        console.log(this.queues.length, queues);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all(queues.map(function (i) { return i.fn; }))];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.remove = function (count) {
            count && (_this.queues = _this.queues.filter(function (i) { return i.count !== count; }));
            !count && _this.clear();
        };
        this.clear = function () {
            _this.count = 0;
            _this.queues = [];
            _this.state = "fulfilled";
        };
        this.maxLen = maxLen;
        this.clear();
        console.log(this.messageCenter);
    }
    TaskQueue.prototype.defer = function () {
        var resolve, reject;
        return {
            promise: new Promise(function (_resolve, _reject) {
                resolve = _resolve;
                reject = _reject;
            }),
            resolve: resolve,
            reject: reject
        };
    };
    /**
     * 检查参数是否符合标准
     * @param queue 队列或队列集合
     */
    TaskQueue.prototype.checkHandler = function (queue) {
        if (!queue) {
            throw new ReferenceError('queue is not defined');
        }
        if (!(queue instanceof Array) || typeof queue !== "object") {
            throw new TypeError("queue should be an object or an array");
        }
        var noFn = function (i) { return !i.fn || typeof i.fn !== "function"; };
        if (queue instanceof Array) {
            if ((queue === null || queue === void 0 ? void 0 : queue.length) === 0)
                throw new Error('queue.length can not be 0');
            if (queue.find(function (i) { return noFn(i); }))
                throw new Error('queueList should have fn');
        }
        else if (typeof queue === "object") {
            if (noFn(queue))
                throw new Error('queue should have fn');
        }
    };
    TaskQueue = __decorate([
        event_message_center_1.decoratorMessageCenter
    ], TaskQueue);
    return TaskQueue;
}());
var syncFn = function () {
    return new Promise(function (res) {
        setTimeout(res, 1000);
    });
};
var createFnList = function (length) {
    var arr = [];
    while (length--) {
        arr.push({ fn: syncFn });
    }
    return arr;
};
var taskQueue = new TaskQueue({ maxLen: 3 });
var list = taskQueue.push(createFnList(10));
taskQueue.run().then(console.log);
// console.log(list)
