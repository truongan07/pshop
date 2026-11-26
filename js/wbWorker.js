'use strict';

// eslint-disable-next-line no-unused-vars
const fileInfo = { filename: 'wbWorker', version: '1.0.1' };

class WbTool {
	// TODO: Check Is Undefined [class WbTool]
	/**
	 * @see {@link _isUndefined Check Is Undefined}
	 * @function this._isUndefined(param);
	 * @param {undefined} param
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + param : undefined
	 * -------------------------------------
	 * @example
	 * + this._arrEach([10, "test", undefined], param => console.log(this._isUndefined(param)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isUndefined = param => ('undefined' === typeof param || undefined === param);

	// TODO: Check Is Symbol [class WbTool]
	/**
	 * @see {@link _isSymbol Check Is Symbol}
	 * @function this._isSymbol(symbol);
	 * @param {symbol} symbol
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + symbol: symbol
	 * -------------------------------------
	 * @example
	 * + this._isSymbol(Symbol(5));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isSymbol = (symbol = null) => ('symbol' === typeof symbol);

	// TODO: Check Is Boolean [class WbTool]
	/**
	 * @see {@link _isBoolean Check Is Boolean}
	 * @function this._isBoolean(bool);
	 * @param {boolean} bool
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + bool: boolean
	 * -------------------------------------
	 * @example
	 * + this._isBoolean(false);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isBoolean = (bool = null) => (null !== bool && !!bool === bool);

	// TODO: Check Is Class [class WbTool]
	/**
	 * @see {@link _isClass Check Is Class}
	 * @function this._isClass(myClass);
	 * @param {class} myClass
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + myClass: class
	 * -------------------------------------
	 * @example
	 * + this._isClass(new wbIO);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isClass = (myClass = null) => (null !== myClass && myClass instanceof Object && (this._strAbsolute(myClass.toString().slice(0, 5), 'class') || this._strAbsolute(myClass.constructor.toString().slice(0, 5), 'class')));

	// TODO: Check Is String [class WbTool]
	/**
	 * @see {@link _isString Check Is String}
	 * @function this._isString(str);
	 * @param {string} str
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + `str` : is not empty
	 * -------------------------------------
	 * @example
	 * + this._arrEach([1, "", " ", [1], {a:0}, "string"], str => console.log(this._isString(str)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isString = (str = null) => {
		try {
			return (('' + str) === str && '' !== str.trim());
		} catch {
			return false;
		}
	}

	// TODO: Check Is JSON [class WbTool]
	/**
	 * @see {@link _isJSON Check Is JSON}
	 * @function this._isJSON(json);
	 * @param {JSON} json
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + json: JSON
	 * -------------------------------------
	 * @example
	 * + this._arrEach([null, undefined, [], [1], {}, {0:0}, "t", "truong", "truong an", 1, 0, "1", "0", "100", "{0:0}", JSON.stringify({1:1})], str => console.log(this._isJSON(str)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isJSON = (json = null) => {
		if (this._isString(json) && isNaN(json)) {
			try {
				JSON.parse(json);
			} catch {
				return false;
			}

			return true;
		}

		return false;
	}

	// TODO: Check Is Regex [class WbTool]
	/**
	 * @see {@link _isRegex Check Is Regex}
	 * @function this._isRegex(regex);
	 * @param {RegExp} regex
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + `regex` : Regular expression | "Regular expression" of string
	 * -------------------------------------
	 * @example
	 * + this._arrEach([/[a-zA-Z]/g, "/[0-9]/g"], regex => console.log(this._isRegex(regex)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isRegex = regex => {
		if (regex instanceof RegExp) return true;
		if (this._isString(regex) && this._strRegExp(regex, /(\[.*?\]|\(.*?\)|\{.*?\})/g)[0]) {
			try {
				new RegExp(regex, 'g');
			} catch {
				return false;
			}

			return true;
		}

		return false;
	}

	// TODO: Check Is Number [class WbTool]
	/**
	 * @see {@link _isNumber Check Is Number}
	 * @function this._isNumber(n);
	 * @param {number} n
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `n` : number | numberString
	 * -------------------------------------
	 * @example
	 * + ["an", "1", 1, "1T", ["1T"], [], {"1T": 3}, ()=> {}, null, undefined, NaN, Number("str"), Number(1), " "].map(v => isNaN(v));
	 * + ["an", "1", 1, "1T", ["1T"], [], {"1T": 3}, ()=> {}, null, undefined, NaN, Number("str"), Number(1), " "].map(v => Number(v));
	 * + ["an", "1", 1, "1T", ["1T"], [], {"1T": 3}, ()=> {}, null, undefined, NaN, Number("str"), Number(1), " "].map(v => this._isNumber(v)[0]);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isNumber = (n = null) => {
		if (!this._isBoolean(n)) try {
			if (this._hasExist(n) && !isNaN(n)) {
				const num = Number(n);

				if (!isNaN(num) && !Array.isArray(n) && this._hasExist(n.toString().trim())) return [true, num, typeof n];
			}
		} catch {
			return [false];
		}

		return [false];
	}

	// TODO: Check Is Exponential number [class WbTool]
	/**
	 * @see {@link _isExponential Check Is Exponential number}
	 * @function this._isExponential(exponential);
	 * @param {Exponential} exponential
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + exponential: Exponential
	 * -------------------------------------
	 * @example
	 * + this._arrEach([56e3, "4e4"], exp => console.log(this._isExponential(exp)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isExponential = exponential => {
		const isNum = this._isNumber(exponential);

		if (isNum[0]) {
			if (this._isString(exponential) && this._strRegExp(exponential.toLocaleLowerCase(), /[e]/g)[0]) return true;

			return Math.exp(Math.abs(exponential)).toString().toLocaleLowerCase().includes('infinity');
		}

		return isNum[0];
	}

	// TODO: Check Is Odd [class WbTool]
	/**
	 * @see {@link _isOdd Check Is Odd}
	 * @function this._isOdd(num);
	 * @param {number} num
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + num: number
	 * -------------------------------------
	 * @example
	 * + this._arrEach([15, 16, 15.1, 15.2, 16.1, 16.2, 98.8, 100.7, 100.70], num => console.log(`${num} = `, this._isOdd(num)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isOdd = num => {
		const isNum = this._isNumber(num), toBool = number => this._string2Bool((number & 1));

		return isNum[0] ? (isOdd => {
			if (!isOdd) {
				const numberString = isNum[1].toString(), decimal = this._strRegExp(numberString, /[.]/g, true);

				if (decimal[0]) {
					const isDecimal = this._isNumber(numberString.slice(decimal[2][0] + 1));

					if (isDecimal[0]) return (toBool((Math.trunc(isNum[1]))) || toBool((isDecimal[1])));
				}
			}

			return isOdd;
		})(toBool(isNum[1])) : isNum[0];
	}

	// TODO: Check Is Promise [class WbTool]
	/**
	 * @see {@link _isPromise Check Is Promise}
	 * @function this._isPromise(promise);
	 * @param {Promise} promise
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + promise: Promise
	 * -------------------------------------
	 * @example
	 * + this._isPromise(Promise.resolve(5));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isPromise = promise => (promise instanceof Promise && this._isString(promise.constructor.name) && this._strAbsolute(promise.constructor.name, 'Promise'));

	// TODO: Check Is Blob [class WbTool]
	/**
	 * @see {@link _isBlob Check Is Blob}
	 * @function this._isBlob(blob);
	 * @param {Blob} blob
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + blob: Blob
	 * -------------------------------------
	 * @example
	 * + this._isBlob(new Blob(["truong an"], {type: "text/plain"}));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isBlob = (blob = null) => (blob instanceof Blob && this._isString(blob.constructor.name) && this._strAbsolute(blob.constructor.name, 'Blob'));

	// TODO: Check Is FormData [class WbTool]
	/**
	 * @see {@link _isFormData Check Is FormData}
	 * @function this._isFormData(formData);
	 * @param {FormData} formData
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + formData: FormData
	 * -------------------------------------
	 * @example
	 * + this._isFormData(new FormData());
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isFormData = (formData = null) => (formData instanceof FormData && this._isString(formData.constructor.name) && this._strAbsolute(formData.constructor.name, 'FormData'));

	// TODO: Check Is Function [class WbTool]
	/**
	 * @see {@link _isFunction Check Is Function}
	 * @function this._isFunction(func);
	 * @param {Function} func
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + func: Function
	 * -------------------------------------
	 * @example
	 * + this._isFunction(() => {});
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isFunction = (func = null) => (Object.prototype.toString.call(func) === '[object Function]' || 'function' === typeof func || func instanceof Function) ? !(Array === func || Date === func || Object === func || Number === func || String === func || Symbol === func) : false;

	// TODO: Check Is Object [class WbTool]
	/**
	 * @see {@link _isObject Check Is Object}
	 * @function this._isObject(obj);
	 * @param {object} obj
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + obj: object
	 * -------------------------------------
	 * @example
	 * + this._arrEach([0, 1, "", " ", "truong an", null, undefined, [], [1], new Blob(["an"], {type: "text/plain"}), {}, {a:3}, JSON.stringify({a:3})], obj => console.log(this._isObject(obj)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isObject = (obj = {}) => {
		try {
			return (null !== obj && this._isString(obj.constructor.name) && 'Object' === obj.constructor.name && !Array.isArray(obj) && (() => { for (const _ in obj) return true; return false; })());
		} catch {
			return false;
		}
	}

	// TODO: Check Is Iterator [class WbTool]
	/**
	 * @see {@link _isIterator Check Is Iterator}
	 * @function this._isIterator(iterator);
	 * @param {Iterator} iterator
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + iterator: Iterator
	 * -------------------------------------
	 * @example
	 * + this._arrEach([0, 1, "", " ", "truong an", null, undefined, [], [1], new Blob(["an"], {type: "text/plain"}), {}, {a:3}, JSON.stringify({a:3}), new FormData], iterator => console.log(this._isIterator(iterator)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isIterator = iterator => {
		if (!(this._isNumber(iterator)[0] || this._isString(iterator) || this._isBoolean(iterator) || this._isFunction(iterator)))
			try {
				if ('' !== iterator.toString().trim()) for (const key in iterator) return (0 < iterator.length || !this._isUndefined(iterator[key]));
			} catch {
				return false;
			}

		return false;
	}

	// TODO: Check Is ArrayBuffer [class WbTool]
	/**
	 * @see {@link _isArrayBuffer Check Is ArrayBuffer}
	 * @function this._isArrayBuffer(buffer);
	 * @param {ArrayBuffer} buffer
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + buffer: ArrayBuffer
	 * -------------------------------------
	 * @example
	 * + this._isArrayBuffer(new ArrayBuffer(8));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isArrayBuffer = (buffer = null) => {
		const isBuffer = buffer => (buffer instanceof ArrayBuffer && this._isString(buffer.constructor.name) && this._strAbsolute(buffer.constructor.name, 'ArrayBuffer')),
			bool = isBuffer(buffer);

		if (bool) return bool;

		try {
			return isBuffer(buffer.buffer);
		} catch {
			return false;
		}
	}

	// TODO: Check Is Int8Array ... BigInt64Array [class WbTool]
	/**
	 * @see {@link _isTypedArray Check Is Int8Array ... BigInt64Array}
	 * @function this._isTypedArray(viewer);
	 * @param {TypedArray} viewer
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + viewer: TypedArray
	 * -------------------------------------
	 * @example
	 * + this._isTypedArray(new Uint32Array(new ArrayBuffer(8)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isTypedArray = (viewer = null) => (ArrayBuffer.isView(viewer) && this._isString(viewer.constructor.name) && this._arrHasValue(['Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array', 'BigInt64Array', 'BigUint64Array'], viewer.constructor.name, false)[0]);

	// TODO: Check Is Array [class WbTool]
	/**
	 * @see {@link _isArray Check Is Array}
	 * @function this._isArray(array);
	 * @param {[]} array
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + array: []
	 * -------------------------------------
	 * @example
	 * + this._arrEach([0, 1, "", " ", "truong an", null, undefined, [], [1], new Blob(["an"], {type: "text/plain"}), {}, {a:3}, JSON.stringify({a:3}), new FormData], arr => console.log(this._isArray(arr)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isArray = (array = []) => (Array.isArray(array) && 0 < array.length && array.some(() => true));

	// TODO: Check Is Date [class WbTool]
	/**
	 * @see {@link _isDate Check Is Date}
	 * @function this._isDate(d, [timezone = {}]);
	 * @param {Date|timestamp|DateISO} d
	 * @param {string|{"timeZone": string}} [timezone]
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `d`        : Date | stringDateTime | stringDate | StringDateISO | timestamp
	 * + `timezone` : null | string-["Australia/Sydney"] | object-[{timeZone: "Australia/Sydney"}]
	 * -------------------------------------
	 * @example
	 * + this._arrEach(["Australia/Sydney", {timeZone: "Australia/Sydney"}], timezone => console.log(this._isDate(Date.now(), timezone)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_isDate = (d = null, timezone = {}) => {
		const list = (() => {
			const isNum = this._isNumber(d), isString = this._isString(d);

			if (d instanceof Date || isNum[0] || isString) {
				const date = new Date((isNum[0] && 12 < isNum[1]) ? isNum[1] : isString ? d.trim() : d);

				if (this._isNumber(date.getTime())[0] && !this._arrHasValue([8, 9, 10], d.toString().length)[0]) return [true, date];
				if (isString && d.length < 14) {
					const getListDate = bool => {
						let literal, listDate;
						const getNumDate = list => this._arrMap(list, num => parseInt(num));

						if (bool) {
							const model = self.using.region.getDateTimeModel(); literal = this._strRegExp(model, /(?![dmy])(.)/g, true);

							if (literal[0]) {
								const list = Array(3), filterList = [];

								listDate = d.split(model[literal[2][0]]);
								listDate = (this._isArray(listDate) && 3 === listDate.length) ? getNumDate(listDate) : getListDate(false);
								if (this._isArray(listDate) && listDate.every(num => this._isNumber(num)[0])) {
									for (const num of listDate) if (12 < num) filterList.push(num);
									if (this._isArray(filterList) && 1 < filterList.length) {
										for (const num of listDate) if (!this._arrHasValue(filterList, num)[0]) {
											list[1] = num;
											break;
										}
										for (const num of filterList) (4 === num.toString().length) ? (list[2] = num) : (list[0] = num);
									}
									// 2022/03/05
									// 24/12/19 ja-JP-u-ca-japanese
									if (!this._isArray(list)) if (4 === listDate[0].toString().length) {
										this._arrEach(listDate.reverse(), (num, index) => { list[index] = num });
									} else {
										const obj = { dd: 0, mm: 0, yyyy: 0 };

										this._arrEach(model.split(model[literal[2][0]]), (char, index) => { obj[char] = listDate[index] });
										if (4 === obj.dd.toString().length) {
											this._arrEach(listDate, (num, index) => { list[index] = num });
										} else for (const key in obj) this._strAbsolute(key, 'dd') ? (list[0] = obj[key]) : this._strAbsolute(key, 'mm') ? (list[1] = obj[key]) : (list[2] = obj[key]);
									}
								}

								return list;
							}
						} else {
							literal = this._strRegExp(d, /[\D]/g, true);
							if (literal[0]) {
								listDate = d.split(d[literal[2][0]]);

								return (this._isArray(listDate) && 3 === listDate.length) ? getNumDate(listDate) : [];
							}
						}

						return [];
					}, list = getListDate(true);

					if (this._arrHasAllValue(list) && list.every(num => this._isNumber(num)[0])) {
						if (2 === list[2].toString().length) {
							const dateTime = new Date();

							list[2] = parseInt(`${dateTime.getFullYear().toString().slice(0, 2)}${list[2]}`);
						}

						return [true, new Date(Date.UTC(list[2], list[1] - 1, list[0]))];
					}
				}
			}

			return [false];
		})();

		if (list[0]) {
			if (this._isString(timezone) || this._isObject(timezone)) list[1] = new Date(list[1].toLocaleString('en-US', this._isString(timezone) ? { timeZone: timezone } : timezone));
			list.push(list[1].getTime());
		}

		return list;
	}

	// TODO: Check exists variable [class WbTool]
	/**
	 * @see {@link _hasExist Check exists variable}
	 * @function this._hasExist(obj);
	 * @param {any} obj
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + `obj` !== : undefined | null | ""
	 * -------------------------------------
	 * @example
	 * + this._hasExist(obj);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_hasExist = (obj = null) => !(null === obj || '' === obj || this._isUndefined(obj));

	// TODO: Get InfoPath : caller function, caller filename, filePath [class WbTool]
	/**
	 * @see {@link _hasInfoPath Get InfoPath : caller function, caller filename, filePath}
	 * @function this._hasInfoPath([url = null]);
	 * @param {URL} [url]
	 * @returns {{ "fileName": string, "fn": string, "ln": number, "col": number, "url": URL }}
	 * @description
	 * *************************************
	 * + url: URL
	 * -------------------------------------
	 * @example
	 * + this._hasInfoPath();
	 * + this._hasInfoPath("../images/picture.jpg");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_hasInfoPath = url => {
		const error = new Error(), str = error.stack.split('\n')[2], frame = this._isString(str) ? str : error.stack.split('\n')[1];

		if (this._isString(frame)) {
			let list;

			if (this._strRegExp(frame, /[@]/g)[0]) {
				list = frame.split('@');
			} else {
				list = this._arrFilter(frame.split(' '), str => this._isString(str));
				list[list.length - 1] = list[list.length - 1].replaceAll(/[()]/g, '');
				if (2 < list.length) {
					const bool = this._strRegExp(list[1], /[.]/g, true);

					if (bool[0]) list[1] = list[1].slice(bool[2][0] + 1);
					list.shift();
				} else list[0] = '_';
			}
			if (!this._isString(list[0]) || this._strRegExp(list[0], /[</]/g)[0]) list[0] = '_';
			if (this._isString(list[1])) {
				const array = list[1].split('/'), arr = array.pop().split(':'), info = { fileName: arr[0], fn: list[0], ln: arr[1], col: arr[2], url: array.join('/') };

				if (this._hasFilePath(url)[0]) {
					let count = 0;
					const listUrl = url.split('/');

					if (this._arrHasValue(['http', 'https'], listUrl[0].toLocaleLowerCase())[0]) return url;
					for (const str of listUrl) if (this._strAbsolute(str, '..')) ++count;

					return (0 < count) ? `${array.slice(0, ((-1) * count)).join('/')}/${listUrl.slice(count).join('/')}` : `${array.join('/')}/${listUrl.slice(1).join('/')}`;
				}

				return info;
			}
		}

		return {};
	}

	// TODO: Check Is File path [class WbTool]
	/**
	 * @see {@link _hasFilePath Check Is File path}
	 * @function this._hasFilePath(path);
	 * @param {URL|Path} path
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + path: URL | Path
	 * -------------------------------------
	 * @example
	 * + this._hasFilePath("../images/picture.jpg");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_hasFilePath = (path = null) => {
		if (this._isString(path)) {
			const url = [this._strRegExp(path, /\\/g), this._strRegExp(path, /\//g)];
			let char = '/';

			if (url[0][0] && url[1][0]) {
				if (url[0][1] > url[1][1]) char = '\\';
			} else if (url[0][0]) {
				char = '\\';
			} else if (!url[1][0]) char = null;
			if (this._isString(char)) {
				let string;
				const array = path.split(char);

				if (this._isString(array[array.length - 1])) string = array[array.length - 1];
				if (this._isString(string)) {
					const hasDot = this._strRegExp(string, /[.]/g, true);

					if (hasDot[0] && 0 < hasDot[1]) return [true, string.slice(hasDot[2][0])];
				}
			}
		}

		return [false];
	}

	// TODO: Check a key exist in ARRAY [class WbTool]
	/**
	 * @see {@link _arrHasKey Check a key exist in ARRAY}
	 * @function this._arrHasKey(array, key, [deepfind = true]);
	 * @param {[]|{}} array
	 * @param {number|string} key
	 * @param {boolean} [deepfind]
	 * @returns {boolean} 
	 * @description
	 * *************************************
	 * + `array`    : [] | {}
	 * + `key`      : number | numberString | string
	 * 	- `array` = []				  : `key` = number
	 * 	- `array` = {}                : `key` = number | numberString | string
	 * + `deepfind` : boolean
	 * 	- `deepfind` = true-[default] : find in sub array or object
	 * -------------------------------------
	 * @example
	 * + this._arrHasKey([0, 1, 2, 3, 4, 5], 3);
	 * + this._arrHasKey({"a" : 0, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5}, "d");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrHasKey = (array, key = null, deepfind = true) => {
		if (this._isString(key) || this._isNumber(key)[0]) {
			key = key.toString().trim();
			if (this._isArray(array) || this._isObject(array)) for (const keys in array)
				if (this._strAbsolute(key, keys) || (deepfind && this._isObject(array[keys]) && this._arrHasKey(array[keys], key, deepfind))) return true;
		}

		return false;
	}

	// TODO: Check all of values are not undefined in ARRAY [class WbTool]
	/**
	 * @see {@link _arrHasAllValue Check all of values are not undefined in ARRAY}
	 * @function this._arrHasAllValue(array);
	 * @param {[]|{}} array
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + `array` : [] | {}
	 * -------------------------------------
	 * @example
	 * + this._arrHasAllValue([0, 1, 2, 3, undefined, 5]);
	 * + this._arrHasAllValue({"a" : 0, "b" : 1, "c" : 2, "d" : undefined, "e" : 4, "f" : 5});
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrHasAllValue = array => {
		if (this._isArray(array)) {
			for (const value of array) if (this._isUndefined(value) || ((this._isArray(value) || this._isObject(value)) && !this._arrHasAllValue(value))) return false;

			return true;
		} else if (this._isObject(array)) {
			for (const key in array) if (!this._hasExist(key) || this._isUndefined(array[key]) || ((this._isArray(array[key]) || this._isObject(array[key])) && !this._arrHasAllValue(array[key]))) return false;

			return true;
		}

		return false;
	}

	#rootArrHasValue(array, value, getKey, deepfind, onlyone, setDefault = [], results = [], successDefault = false) {
		// process value in array for function hasValue
		if (!this._isUndefined(value)) {
			if (this._isString(value)) value = value.trim();
			if (this._isArray(array)) {
				goto: for (const key in array) if (this._strAbsolute(value, array[key])) {
					const setKey = parseInt(key); successDefault = true;

					if (onlyone) {
						setDefault.push(setKey);
						results.push(true, setDefault);
						break goto;
					} else if (this._isArray(setDefault)) {
						results.push([true, [...setDefault.slice(0, setDefault.length), setKey]]);
					} else {
						setDefault.push(setKey);
						results.push([true, structuredClone(setDefault)]);
						setDefault = [];
					}
				} else if (deepfind && (this._isArray(array[key]) || this._isObject(array[key]))) {
					setDefault.push(this._isArray(array[key]) ? parseInt(key) : key);
					const set = this.#rootArrHasValue(array[key], value, getKey, deepfind, onlyone, setDefault, results, successDefault);

					if (set[0]) {
						successDefault = true;
						if (onlyone) {
							break goto;
						} else setDefault = [];
					} else if (this._isArray(setDefault)) setDefault.pop();
				}
			} else if (this._isObject(array)) {
				goto_2: for (const key in array) if (this._strAbsolute(value, array[key])) {
					successDefault = true;
					if (onlyone) {
						setDefault.push(key);
						results.push(true, setDefault);
						break goto_2;
					} else if (this._isArray(setDefault)) {
						results.push([true, [...(setDefault.slice(0, setDefault.length)), key]]);
					} else {
						setDefault.push(key);
						results.push([true, structuredClone(setDefault)]);
						setDefault = [];
					}
				} else if (deepfind && (this._isArray(array[key]) || this._isObject(array[key]))) {
					setDefault.push(key);
					const set = this.#rootArrHasValue(array[key], value, getKey, deepfind, onlyone, setDefault, results, successDefault);

					if (set[0]) {
						successDefault = true;
						if (onlyone) {
							break goto_2;
						} else setDefault = [];
					} else if (this._isArray(setDefault)) setDefault.pop();
				}
			}
		}

		return successDefault ? getKey ? results : [true] : [false];
	}

	// TODO: Check a value exist in ARRAY and get first key [class WbTool]
	/**
	 * @see {@link _arrHasValue Check a value exist in ARRAY and get first key}
	 * @function this._arrHasValue(array, value, [getKey = false], [deepfind = true]);
	 * @param {[]|{}} array
	 * @param {number|string} value
	 * @param {boolean} [getKey]
	 * @param {boolean} [deepfind]
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `array`    : [] | {}
	 * + `value`    : number | numberString | string
	 * + `getKey`   : boolean
	 * 	- `getKey` = true             : return index/key of value was find
	 * + `deepfind` : boolean
	 * 	- `deepfind` = true-[default] : find in sub array or object
	 * -------------------------------------
	 * @example
	 * + this._arrHasValue([0, 1, 2, 3, 4, 5], 3);
	 * + this._arrHasValue({"a" : 0, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5}, 3, true);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrHasValue = (array = [], value, getKey = false, deepfind = true) => this.#rootArrHasValue(array, value, getKey, deepfind, true);

	// TODO: Check a value exist in ARRAY with promise and get array of keys [class WbTool]
	/**
	 * @see {@link _arrHasValues Check a value exist in ARRAY with promise and get array of keys}
	 * @function this._arrHasValues(array, value, [getKey = true], [deepfind = true]);
	 * @param {[]|{}} array
	 * @param {number|string} value
	 * @param {boolean} [getKey]
	 * @param {boolean} [deepfind]
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `array`    : [] | {}
	 * + `value`    : number | numberString | string
	 * + `getKey`   : boolean
	 * 	- `getKey` = true-[default]   : return all of index/key of values were find
	 * + `deepfind` : boolean
	 * 	- `deepfind` = true-[default] : find in sub array or object
	 * -------------------------------------
	 * @example
	 * + this._arrHasValues([0, 1, 2, 3, 4, 5, 3], 3);
	 * + this._arrHasValues({"a" : 0, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5, "l" : 3}, 3);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrHasValues = (array = [], value, getKey = true, deepfind = true) => {
		if (this._isArray(array)) {
			const obj = this._arrSpreadIndex(array);

			if (this._isArray(obj.spread)) {
				const data = this._arrMap(obj.spread, arrs => this.#rootArrHasValue(obj.array.slice(arrs[0], (arrs[1] + 1)), value, getKey, deepfind, false));

				if (this._isArray(data)) return [true, ...data];
			}
		} else if (this._isObject(array)) {
			const data = this.#rootArrHasValue(array, value, getKey, deepfind, false);

			if (this._isArray(data)) return [true, [...data]];
		}

		return [false];
	}

	// TODO: Replace value in ARRAY [class WbTool]
	/**
	 * @see {@link _arrReplaceValues Replace value in ARRAY}
	 * @function this._arrReplaceValues(array, [isReplaceAll = false], [isClone = false], [find, replace], ...);
	 * @param {[]|{}} array
	 * @param {boolean} [isReplaceAll]
	 * @param {boolean} [isClone]
	 * @param {[]} ([find, replace])
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `array`        : [] | {}
	 * + `isReplaceAll` : boolean
	 * 	- `isReplaceAll` = true : replace all of values ware find
	 * + `isClone`      : boolean
	 * 	- `isClone` = true      : keep origin array
	 * 	- `isClone` = false     : change on origin array
	 * + `find`         : number | numberString | string
	 * + `replace`      : number | numberString | string
	 * -------------------------------------
	 * @example
	 * + this._arrReplaceValues([0, 1, 2, 3, 4, 5, 3], true, true, [3, "replace"]);
	 * + this._arrReplaceValues({"a" : 0, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5, "l" : 3}, [1, "replace-1"], [3, "replace-3"], [5, "replace-5"]);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrReplaceValues = (array = [], ...theArgs) => {
		if ((this._isArray(array) || this._isObject(array)) && this._isArray(theArgs)) {
			const isReplaceAll = (this._isBoolean(theArgs[0]) && theArgs[0]), isClone = this._isBoolean(theArgs[1]),
				clone = (isClone && theArgs[1]) ? structuredClone(array) : array;

			this._arrEach(theArgs, arr => {
				if (this._isArray(arr) && 2 === arr.length) if (isReplaceAll) {
					const finder = this._arrHasValues(clone, arr[0], true);

					if (finder[0]) this._arrEach(finder[1], ar => {
						if (ar[0]) clone[ar[1][0]] = arr[1];
					});
				} else {
					const finder = this._arrHasValue(clone, arr[0], true);

					if (finder[0]) clone[finder[1][0]] = arr[1];
				}
			});

			return clone;
		}

		return [];
	}

	// TODO: Delete an element in ARRAY by key [class WbTool]
	/**
	 * @see {@link _arrDeletebyKey Delete an element in ARRAY by key}
	 * @function this._arrDeletebyKey(array, key, [isClone = false]);
	 * @param {[]|{}} array
	 * @param {number|string} key
	 * @param {boolean} [isClone]
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `array`   : [] | {}
	 * + `key`     : number | numberString | string
	 * 	- `array` = []	    : `key` = number
	 * 	- `array` = {}      : `key` = number | numberString | string
	 * + `isClone` : boolean
	 * 	- `isClone` = true  : keep origin array
	 * 	- `isClone` = false : change on origin array
	 * -------------------------------------
	 * @example
	 * + this._arrDeletebyKey([0, 1, 2, 3, 4, 5, 3], 5);
	 * + this._arrDeletebyKey({"a" : 0, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5, "l" : 3}, "e", true);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrDeletebyKey = (array = [], key, isClone = false) => {
		if ((this._isString(key) || this._isNumber(key)[0]) && this._arrHasKey(array, key)) {
			const process = arr => {
				const deleteKeyArray = getArr => {
					if (this._isUndefined(getArr[key])) return [];
					if (isClone) {
						getArr.splice(key, 1);

						return getArr;
					}

					return getArr.splice(key, 1);
				}, deleteKeyObj = getObject => {
					const value = getObject[key];

					if (this._isUndefined(value)) {
						for (const k in getObject) if (this._isObject(getObject[k])) {
							const getObj = deleteKeyObj(getObject[k]);

							return isClone ? arr : getObj;
						}

						return [];
					} else {
						if (isClone) {
							delete getObject[key];

							return getObject;
						}

						const obj = { [key]: value };

						delete getObject[key]; return obj;
					}
				};

				return this._isArray(arr) ? deleteKeyArray(arr) : this._isObject(arr) ? deleteKeyObj(arr) : [];
			};

			return process(isClone ? structuredClone(array) : array);
		}

		return [];
	}

	// TODO: Delete an element in ARRAY by value [class WbTool]
	/**
	 * @see {@link _arrDeletebyValue Delete an element in ARRAY by value}
	 * @function this._arrDeletebyValue(array, value, [isClone = false]);
	 * @param {[]|{}} array
	 * @param {number|string} value
	 * @param {boolean} [isClone]
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `array`   : [] | {}
	 * + `value`   : number | numberString | string
	 * + `isClone` : boolean
	 * 	- `isClone` = true  : keep origin array
	 * 	- `isClone` = false : change on origin array
	 * -------------------------------------
	 * @example
	 * + this._arrDeletebyValue([0, 1, 2, 3, 4, 5, 3], 3);
	 * + this._arrDeletebyValue({"a" : 0, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5, "l" : 3}, 3, true);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrDeletebyValue = (array = [], value, isClone = false) => {
		if (!this._isUndefined(value)) {
			const exists = this._arrHasValue(array, value, true);

			if (exists[0]) {
				const process = arr => {
					const deleteValue = list => {
						if (this._isArray(list)) {
							if (isClone) {
								list.splice(exists[1][exists[1].length - 1], 1);

								return arr;
							}

							return list.splice(exists[1][exists[1].length - 1], 1);
						}
						if (this._isObject(list)) {
							if (isClone) {
								delete list[exists[1][exists[1].length - 1]];

								return arr;
							}

							const obj = { [exists[1][exists[1].length - 1]]: list[exists[1][exists[1].length - 1]] };

							delete list[exists[1][exists[1].length - 1]];

							return obj;
						}

						return [];
					}, refer = (() => {
						let key;

						if (this._isArray(exists[1]) && (this._isArray(arr) || this._isObject(arr)) && 1 < exists[1].length)
							for (let i = 0; i < exists[1].length - 1; i++) key = this._isUndefined(key) ? arr[exists[1][i]] : key[exists[1][i]];

						return this._isUndefined(key) ? null : key;
					})();

					return deleteValue(
						((this._isArray(refer) || this._isObject(refer)) && this._hasExist(refer[exists[1][exists[1].length - 1]])) ?
							refer : (1 === exists[1].length) ? arr : []
					);
				};

				return process(isClone ? structuredClone(array) : array);
			}
		}

		return [];
	}

	// TODO: Count match of values in ARRAY [class WbTool]
	/**
	 * @see {@link _arrCountMatchValues Count match of values in ARRAY}
	 * @function this._arrCountMatchValues(array);
	 * @param {[]|{}} array
	 * @returns {{}}
	 * @description
	 * *************************************
	 * + `array` : [] | {}
	 * -------------------------------------
	 * @example
	 * + this._arrCountMatchValues([0, 1, 2, 3, 4, 5, 3]);
	 * + this._arrCountMatchValues({"a" : 4, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5, "l" : 3});
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrCountMatchValues = (array = []) => {
		const rootArrCountMatchValues = (array, list = [], counter = []) => {
			const data = this._isObject(array) ? Object.values(array) : this._isArray(array) ? array : [];

			if (this._isArray(data)) for (let i = 0; i < data.length; i++) if ((this._isString(data[i]) || this._isNumber(data[i])[0]) && (i + 1) <= data.length) {
				const find = this._arrHasValue(list, data[i], true, false);

				(find[0] && this._isNumber(counter[find[1][0]])[0]) ? ++counter[find[1][0]] : (list.push(data[i]), counter.push(1));
			} else if (this._isArray(data[i]) || this._isObject(data[i])) rootArrCountMatchValues(data[i], list, counter);

			return (this._isArray(list) && this._isArray(counter) && list.length === counter.length) ? [list, counter] : [];
		}, obj = {}, list = rootArrCountMatchValues(array);

		if (this._isArray(list)) for (const index in list[0]) if (1 < list[1][index]) Object.assign(obj, { [list[0][index]]: list[1][index] });

		return obj;
	}

	// TODO: distinct values in ARRAY | distinct values by key in ARRAY of objects [class WbTool]
	/**
	 * @see {@link _arrDistinct Distinct values in ARRAY | distinct values by key in ARRAY of objects}
	 * @function this._arrDistinct(array, [key]);
	 * @param {[]|{}|[{}, {}]} array
	 * @param {number|string} [key]
	 * @returns {[]|{}|[{}]}
	 * @description
	 * *************************************
	 * + `array` : [] | {} | [{}, {}, {}, ...]
	 * + `key`   : number | numberString | string
	 * 	- `array` = [] | {}           : `key` = null
	 * 	- `array` = [{}, {}, {}, ...] : `key` = number | numberString | string
	 * -------------------------------------
	 * @example
	 * + this._arrDistinct([0, 1, 2, 3, 4, 5, 3]);
	 * + this._arrDistinct({"a" : 4, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5, "l" : 3});
	 * + this._arrDistinct([{ id: 1, name: "king" },{ id: 2, name: "master" },{ id: 3, name: "lisa" },{ id: 1, name: "jam" },{ id: 4, name: "ion" },{ id: 5, name: "jim" },{ id: 3, name: "april" }], "id");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrDistinct = (array = [], key) => {
		if (this._isArray(array) || this._isObject(array)) {
			const object = this._arrCountMatchValues(array);

			if (this._isObject(object)) {
				const list = structuredClone(array);

				for (const k in object) for (let i = 0; i < object[k] - 1; i++) this._arrDeletebyValue(list, k);

				const filter = this._arrFilter(list, value => this._hasExist(value));

				return (this._isString(key) || this._isNumber(key)[0]) ? this._arrFilter(filter, obj => (this._isObject(obj) && !this._isUndefined(obj[key]))) : filter;
			}

			return array;
		}

		return [];
	}

	// TODO: Extract an Array [class WbTool]
	/**
	 * @see {@link _arrLimit Extract an Array}
	 * @function this._arrLimit(array, [type = "0-n"]);
	 * @param {[]} array
	 * @param {number|string} [type]
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `array` : []
	 * + `type`  : number | "2n" | "2n+1" | "0-n"
	 * -------------------------------------
	 * @example
	 * + this._arrLimit([0, 1, 2, 3, 4, 5, 3], "2n");
	 * + this._arrLimit([{ id: 1, name: "king" },{ id: 2, name: "master" },{ id: 3, name: "lisa" },{ id: 1, name: "jam" },{ id: 4, name: "ion" },{ id: 5, name: "jim" },{ id: 3, name: "april" }], "3-5");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrLimit = (array = [], type = '0-n') => {
		const list = [];

		if (this._isArray(array)) {
			let num = this._isNumber(type);

			if (num[0] && !this._isUndefined(array[num[1]])) {
				list.push(array[num[1]]);
			} else if (this._strAbsolute(type, '2n')) {
				for (let i = 0; i < array.length; i += 2) list.push(array[i]);
			} else if (this._strAbsolute(type, '2n+1')) {
				for (let i = 1; i < array.length; i += 2) list.push(array[i]);
			} else if (this._strRegExp(type, /[-]/g)[0]) {
				const arrs = type.split('-');

				if (this._isString(arrs[0]) && this._isString(arrs[1])) {
					num = this._isNumber(arrs[0]);
					if (num[0]) {
						arrs[0] = num[1];
						if (this._strAbsolute(arrs[1], 'n')) {
							arrs[1] = array.length - 1;
						} else {
							num = this._isNumber(arrs[1]);
							if (num[0] && arrs[0] < num[1]) arrs[1] = num[1];
						}
						if (this._isNumber(arrs[0])[0] && this._isNumber(arrs[1])[0])
							for (let i = arrs[0]; i <= arrs[1]; i++) list.push(array[i]);
					}
				}
			}
		}

		return list;
	}

	// TODO: Convert object to ARRAY [class WbTool]
	/**
	 * @see {@link _obj2Arr Convert object to ARRAY}
	 * @function this._obj2Arr(object, [filter = false]);
	 * @param {{}} object
	 * @param {boolean} [filter]
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `object` : {}
	 * + `filter` : boolean
	 * 	- `filter` = true : distinct array was returned
	 * -------------------------------------
	 * @example
	 * + this._obj2Arr({"a" : 4, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5, "l" : 3});
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_obj2Arr = (object = {}, filter = false) => {
		const list = [];

		if (this._isObject(object)) {
			for (const value of Object.values(object)) list.push(value);

			return filter ? this._arrDistinct(list) : list;
		}

		return list;
	}

	// TODO: Spread index of the ARRAY to create more arrays [class WbTool]
	/**
	 * @see {@link _arrSpreadIndex Spread index of the ARRAY to create more arrays}
	 * @function this._arrSpreadIndex(array, [spread = 25]);
	 * @param {[]|{}} array
	 * @param {number} [spread]
	 * @returns {{}|{ "spread": [], "array": [] }}
	 * @description
	 * *************************************
	 * + `array`  : [] | {}
	 * + `spread` : number
	 * -------------------------------------
	 * @example
	 * + this._arrSpreadIndex([0, 1, 2, 3, 4, 5, 3], 2);
	 * + this._arrSpreadIndex({"a" : 4, "b" : 1, "c" : 2, "d" : 3, "e" : 4, "f" : 5, "l" : 3}, 3);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrSpreadIndex = (array = [], spread = 25) => {
		if (this._isObject(array)) array = this._obj2Arr(array, false);
		if (this._isArray(array) || this._isTypedArray(array) || this._isArrayBuffer(array) || this._isArrayBuffer(array.buffer)) {
			const len = array.length, quotient = Math.ceil(len / spread), slots = [];
			let jump = 0, count = 0;

			if (quotient <= 1) {
				slots.push([jump, len]);
			} else do {
				jump += spread;
				slots.push((jump <= len) ? [(0 < count) ? slots[slots.length - 1][1] : 0, jump] : [slots[slots.length - 1][1], len]);
			} while (++count < quotient);

			return { spread: slots, array: array };
		}

		return {};
	}

	// TODO: Spread datatype of the ARRAY to create more arrays [class WbTool]
	/**
	 * @see {@link _arrSpreadDatatype Spread datatype of the ARRAY to create more arrays}
	 * @function this._arrSpreadDatatype(array);
	 * @param {[]|{}} array
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `array` : [] | {}
	 * -------------------------------------
	 * @example
	 * + this._arrSpreadDatatype(["0", 1, () => {}, {a:1}, 4, "truong an", true]);
	 * + this._arrSpreadDatatype({"a" : {0:1}, "b" : "1", "c" : 2, "d" : 3, "e" : "truong an", "f" : [1], "l" : false});
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrSpreadDatatype = (array = []) => {
		const obj = this._arrSpreadIndex(array), slots = [[true, []], [true, []], [true, []], [false, []], [false]];

		if (this._isArray(obj.spread)) {
			for (const arr of obj.spread)
				for (let i = arr[0]; i < arr[1]; i++)
					this._isString(obj.array[i]) ? slots[0][1].push(obj.array[i]) : this._isNumber(obj.array[i])[0] ? slots[1][1].push(obj.array[i]) : this._isArray(obj.array[i]) ? slots[2][1].push(obj.array[i]) : this._isBoolean(obj.array[i]) ? slots[3][1].push(obj.array[i]) : slots[4].push(obj.array[i]);

			return this._arrFilter(slots, arr => Array.isArray(arr[1]) ? this._isArray(arr[1]) : (1 < arr.length));
		}

		return [];
	}

	// TODO: Sort column of child array in the parent ARRAY [class WbTool]
	/**
	 * @see {@link _arrSort Sort column of child array in the parent ARRAY}
	 * @function this._arrSort(array, [col = null], [sort = "asc"]);
	 * @param {[]|{}|[[], []]|[{}, {}]} array
	 * @param {number|string} [col]
	 * @param {string} [sort]
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `array` : [] | {} | [[], [], [], ...] | [{}, {}, {}, ...]
	 * + `col`   : null | number | string
	 * 	- `array` = []                : `col` = null
	 * 	- `array` = {}                : `col` = "key" | "value"
	 * 	- `array` = [[], [], [], ...] : 0 <= `col` < subArray.length | `col` = "first" | "middle" | "last"
	 * 	- `array` = [{}, {}, {}, ...] : `col` = key-[key of object]
	 * + `sort`  : "asc"-[default] | "desc"
	 * -------------------------------------
	 * @example
	 * + this._arrSort(["phan pham truong an", "phan thanh tam", "huynh hieu minh", "ly tu that", "lo van hoi"], null, "desc");
	 * + this._arrSort({"action": "action1", "key_1": "key_10", "key_2": ["key_20", "a", "b"], "key_3": "key_10", "action1": "action1", "key_4": "key_10", "key_5": {"example": {"action": "action1", "key_1": "key_10", "key_2": "key_20", "key_3": "key_10", "action1": "action1", "key_4": "key_10"}}}, "key");
	 * + this._arrSort([["phan pham truong", "an"], ["phan thanh", "tam"], ["huynh hieu", "minh"], ["ly tu", "that"], ["lo van", "hoi"], ["nguyen van", "ba"]], 1, "desc");
	 * + this._arrSort(this._arrDistinct([{ id: 1, name: "king" }, { id: 2, name: "master abc" }, { id: 3, name: "lisa" }, { id: 1, name: "jam" }, { id: 4, name: "ion" }, { id: 5, name: "jim" }, { id: 3, name: "april" }], "id"), "name");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrSort = (array = [], col = null, sort = 'asc') => {
		const initialArrSort = (array, col, sort) => {
			if (this._isArray(array)) {
				const rootArrSort = array => {
					const slots = this._arrSpreadDatatype(array);

					if (this._isArray(slots)) {
						// can not use this._arrStepLoop() replace for ... await because arrStepLoop function can not be in other loop	
						let add = [];
						const string = [], numbers = [], process = arr => {
							let doit = false;

							for (const index in arr) if (index < 1) {
								if (this._isBoolean(arr[index])) doit = arr[index];
							} else if (doit) {
								if (this._isString(arr[index][0])) {
									string.push(arr[index]);
								} else if (this._isArray(arr[index][0])) {
									for (const getArr of arr[index]) processSlot(rootArrSort(getArr));
								} else this._isNumber(arr[index][0])[0] ? numbers.push(arr[index]) : add.push(arr[index]);
							} else if (this._isArray(arr[index])) {
								for (const value of arr[index]) add.push(value);
							} else if (!Array.isArray(arr[index])) add.push(arr[index]);
						}, processSlot = sl => {
							if (this._isArray(sl)) {
								(1 < sl.length) ? this._arrEach(sl, s => processSlot(s)) : process(this._arrSpreadDatatype(sl)[0]);
							} else if (!Array.isArray(sl) && this._hasExist(sl)) add.push(sl);
						};

						for (const arr of slots) process(arr);
						if (this._isArray(string) && this._isArray(numbers)) return merge(add, [arrSortExtension(numbers, sort, false), arrSortExtension(string, sort)]);
						if (this._isArray(numbers)) return merge(add, arrSortExtension(numbers, sort, false));
						if (this._isArray(string)) return merge(add, arrSortExtension(string, sort));

						return add;
					}

					return [];
				}, arrSortExtension = (array, sort, key = true) => {
					// sort = 'asc' | 'desc'
					// key = true[sortString] | false[sortNumber]
					if (this._isArray(array)) {
						const sorted = this._strAbsolute(sort, 'desc'), desc = key ? !sorted : sorted;

						for (const index in array) {
							array[index] = key ? array[index].sort((find, string) => string.toString().trim().toLocaleLowerCase().localeCompare(find.toString().trim().toLocaleLowerCase())) : array[index].sort((a, b) => Math.sign(a - b));
							if (desc) array[index] = array[index].reverse();
						}

						return array;
					}

					return [];
				}, merge = (add, list) => {
					for (const array of list) if (this._isArray(array)) {
						add = add.concat(array);
					} else if (this._hasExist(array)) add.push(array);

					return add;
				};

				if (1 < array.length && (this._isString(col) || this._isNumber(col)[0])) {
					if (array.every(obj => this._isObject(obj))) return (id => {
						if (this._isArray(array) && this._isString(id)) {
							const list = [];

							for (const index in array) if (this._isObject(array[index]) && (this._isString(array[index][id]) || this._isNumber(array[index][id])[0])) {
								list.push([array[index][id], parseInt(index)]);
							} else return [];
							if (this._isArray(list)) return this._arrMap(initialArrSort(list, 0, sort), arr => array[arr[1]]);
						}

						return [];
					})(col);

					const objects = { max: 0, length: [], valid: [], sortable: [] };

					for (const arrs of array) Array.isArray(arrs) ? (objects.valid.push(arrs), objects.length.push(arrs.length)) : (this._isString(arrs) || this._isNumber(arrs)[0]) ? (objects.valid.push([arrs]), objects.length.push(1)) : (objects.valid.push(['']), objects.length.push(1));
					objects.max = Math.max(...objects.length);
					for (const arrs of objects.valid)
						for (let i = 0; i < objects.max; i++) if (null === arrs[i] || this._isUndefined(arrs[i])) arrs[i] = '';
					col = this._arrHasValue(['key', 'first'], col)[0] ? 0 : this._strAbsolute(col, 'middle') ? Math.ceil(objects.max / 2) : this._arrHasValue(['value', 'last'], col)[0] ? (objects.max - 1) : (col < 0) ? 0 : (objects.max < col) ? (objects.max - 1) : col;
					for (let i = 0; i < objects.valid.length; i++) objects.sortable.push([i, objects.valid[i][col]]);
					objects.sortable.sort((find, string) => {
						const date = [this._isDate(find[1]), this._isDate(string[1])];
						if (date[0][0] && 10 < date[0][2].toString().length) find[1] = date[0][1];
						if (date[1][0] && 10 < date[1][2].toString().length) string[1] = date[1][1];
						return (this._isString(find[1]) && this._isString(string[1])) ? string[1].trim().toLocaleLowerCase().localeCompare(find[1].trim().toLocaleLowerCase()) : Math.sign(find[1] - string[1]);
					});

					const sorted = this._strAbsolute(sort, 'desc'), desc = objects.sortable.every(arr => this._isNumber(arr[1])[0]) ? sorted : !sorted;

					if (desc) objects.sortable.reverse();

					return this._arrMap(objects.sortable, arrs => objects.valid[arrs[0]]);
				}

				return rootArrSort(array);
			}
			if (this._isObject(array)) {
				const setArrs = [];

				for (const key in array) setArrs.push([key, array[key]]);
				if (this._isArray(setArrs)) {
					const setCol = (this._isString(col) && this._strAbsolute(col, 'key')) ? col : 'value',
						result = initialArrSort(setArrs, setCol, sort);

					return result.every(arr => this._isNumber(arr[this._strAbsolute(setCol, 'key') ? 0 : 1])[0]) ? result.reverse() : result;
				}
			}

			return [];
		};

		return initialArrSort(array, col, sort);
	}

	// TODO: Merge more ARRAY or object [class WbTool]
	/**
	 * @see {@link _arrMerge Merge more ARRAY or object}
	 * @function this._arrMerge(array, array-1, array-2, ..., [filter = false]);
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `array`  : [] | {}
	 * + `filter` : boolean
	 * 	- `filter` = true  : unique value
	 * 	- `filter` = false : keep all property of array or object
	 * -------------------------------------
	 * @example
	 * + this._arrMerge(["phan pham truong an", "phan thanh tam", "huynh hieu minh", "ly tu that", "lo van hoi"], {"a" : {0:1}, "b" : "1", "c" : 2, "d" : 3, "e" : "truong an", "f" : [1], "l" : false});
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrMerge = (...theArgs) => {
		if (this._isArray(theArgs)) {
			const array = [[], [], []], length = theArgs.length - 1, bool = theArgs[length], filter = this._isBoolean(bool) ? bool : false;

			for (let i = 0; i < (this._isBoolean(bool) ? length : (theArgs.length)); i++)
				this._isArray(theArgs[i]) ? array[0].push(theArgs[i]) : this._isObject(theArgs[i]) ? array[1].push(this._obj2Arr(theArgs[i])) : array[2].push(theArgs[i]);
			this._arrEach([0, 1], num => {
				if (this._isArray(array[num])) array[num] = this._arrFlat(array[num]);
			});

			return filter ? this._arrDistinct(this._arrFlat(array)) : this._arrFlat(array);
		}

		return [];
	}

	// TODO: Flat ARRAY [class WbTool]
	/**
	 * @see {@link _arrFlat Flat ARRAY}
	 * @function this._arrFlat(array);
	 * @param {[]} array
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `array` : []
	 * -------------------------------------
	 * @example
	 * + this._arrFlat([[0, 1, 2], [3, 4, 5], [6, 7, [8, 9, 10]]]);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_arrFlat = (array = []) => {
		if (this._isArray(array)) {
			let count = 0;

			for (const arr of array) if (this._isArray(arr)) ++count;

			return (0 < count) ? array.flat(count) : (array.length < 2 && Array.isArray(array[0]) && !this._hasExist(array[0][0])) ? [] : array;
		}

		return [];
	}

	#arrLoop(method, array, fn, isKey, stop) {
		const valid = (() => {
			if (this._isFunction(fn)) {
				if (Array.isArray(array)) return { type: 'array', exists: (0 < array.length) };
				if (this._isString(array.constructor.name)) return this._strAbsolute(array.constructor.name, 'Object') ?
					{ type: 'object', exists: this._isObject(array) } : { type: 'iterate', exists: this._isIterator(array) };
			}

			return { type: 'unknown', exists: false };
		})();

		if (this._strAbsolute(valid.type, 'unknown') || !valid.exists) return [];

		const bool = this._isObject(stop), loop = hasArray => {
			if (hasArray) array = Object.values(array);
			if (this._strAbsolute(method, 'each')) {
				for (let i = 0; i < array.length; i++) {
					fn(array[i], i);
					if (bool && this._isBoolean(stop.break) && stop.break) break;
				}
			} else {
				if (this._strAbsolute(method, 'map')) {
					const len = array.length, list = new Array(len);

					for (let i = 0; i < len; i++) {
						list[i] = fn(array[i], i);
						if (bool && this._isBoolean(stop.break) && stop.break) return list.slice(0, i);
					}

					return list;
				}
				if (this._strAbsolute(method, 'filter')) {
					const list = [];
					let value, result;

					for (let i = 0; i < array.length; i++) {
						value = array[i], result = fn(value, i);
						if (false !== result) list.push(this._isBoolean(result) ? value : result);
						if (bool && this._isBoolean(stop.break) && stop.break) return list.slice(0, i);
					}

					return list;
				}

				return [];
			}
		};
		if (this._strAbsolute(valid.type, 'array')) return loop(false);
		if (this._strAbsolute(valid.type, 'object')) {
			if (1 < fn.length) {
				if (this._strAbsolute(method, 'each')) {
					for (const key in array) {
						fn(array[key], key);
						if (bool && this._isBoolean(stop.break) && stop.break) break;
					}
				} else {
					const obj = {};

					isKey = this._isBoolean(isKey) ? isKey : false;
					if (this._strAbsolute(method, 'map')) {
						let result, isObj;

						for (const key in array) {
							result = fn(array[key], key); isObj = false;
							if (isKey && this._isObject(result)) isObj = true;
							Object.assign(obj, isObj ? result : { [key]: result });
							if (bool && this._isBoolean(stop.break) && stop.break) {
								this._arrDeletebyKey(obj, key);
								break;
							}
						}
					} else if (this._strAbsolute(method, 'filter')) {
						let value, result, isObj, filter;

						for (const key in array) {
							value = array[key]; result = fn(value, key); isObj = false;
							if (false !== result) {
								filter = this._isBoolean(result) ? value : result;
								if (isKey && this._isObject(result)) isObj = true;
								Object.assign(obj, isObj ? filter : { [key]: filter });
							}
							if (bool && this._isBoolean(stop.break) && stop.break) {
								this._arrDeletebyKey(obj, key);
								break;
							}
						}
					}

					return obj;
				}
			} else {
				if (0 < fn.length) return loop(true);
				if (this._strAbsolute(method, 'each')) {
					for (const key in array) {
						fn(null, key);
						if (bool && this._isBoolean(stop.break) && stop.break) break;
					}
				} else {
					const list = [], setList = (isMap = true) => {
						let result, boolSet;

						for (const key in array) {
							result = fn(null, key); boolSet = false;
							if (isMap) {
								boolSet = true;
							} else if (false !== result) boolSet = true;
							if (boolSet) list.push((this._isString(result) || this._isNumber(result)[0]) ? result : key);
							if (bool && this._isBoolean(stop.break) && stop.break) {
								this._arrDeletebyValue(list, key);
								break;
							}
						}
					};

					if (this._strAbsolute(method, 'map')) {
						setList();
					} else if (this._strAbsolute(method, 'filter')) setList(false);

					return list;
				}
			}
		} else {
			let result, count = 0;
			const list = [], isNumber = this._isNumber(array.length), makeList = choose => {
				const setList = (key, value) => {
					if (this._hasExist(key)) {
						result = fn(value, key);
						if (1 < choose) {
							if (false !== result) list.push(this._isBoolean(result) ? value : result);
						} else if (0 < choose) list.push(result);
					}
				}, loopbyKey = () => {
					for (const key in array) {
						if (isNumber[0] && isNumber[1] === count++) break;
						setList(key, array[key]);
						if (bool && this._isBoolean(stop.break) && stop.break) break;
					}
				};

				try {
					for (const arr of array) {
						if (this._isArray(arr)) {
							if (isNumber[0] && isNumber[1] === count++) break;
							setList(arr[0], arr[1]);
							if (bool && this._isBoolean(stop.break) && stop.break) break;
						} else {
							loopbyKey();
							break;
						}
					}
				} catch {
					loopbyKey();
				}
			};

			if (this._strAbsolute(method, 'each')) {
				makeList(0);
			} else {
				if (this._strAbsolute(method, 'map')) {
					makeList(1);
				} else if (this._strAbsolute(method, 'filter')) makeList(2);

				return list;
			}
		}
	}

	#arrWhichLoop(which, array, fn, isKey, stopObj) {
		if (this._isObject(isKey) && this._isBoolean(isKey.break)) {
			stopObj = isKey;
			isKey = false;
		}

		return this.#arrLoop(which, array, fn, isKey, stopObj);
	}

	// TODO: Each ARRAY [class WbTool]
	/**
	 * @see {@link _arrEach Each ARRAY}
	 * @function this._arrEach(array, fn, [stopObj = {break : false}]);
	 * @param {[]|{}} array
	 * @param {Function} fn
	 * @param {{"break": boolean}} [stopObj]
	 * @returns {void}
	 * @description
	 * *************************************
	 * + `array`   : [] | {}
	 * + `fn`      : Function
	 * 	- `array` = [] : `fn` = (value, index) => {}
	 * 	- `array` = {} : `fn` = (value, key) => {}
	 * + `stopObj` : { break : false }
	 * => To break arrEach
	 * -------------------------------------
	 * @example
	 * + this._arrEach([1, 2, 3], (val, idx) => console.log(val, idx));
	 * + this._arrEach({a:1, b:2}, (val, key) => console.log(val, key));
	 * + this._arrEach({a:1, b:2}, val => console.log(val));
	 * @example
	 * // To break arrEach:
	 * const stop = { break : false };
	 * this._arrEach([1, 2, 3, 4, 5], num => {
	 * 	if(3 === num) stop.break = true;
	 * }, stop);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	*/
	_arrEach(array = [], fn, stopObj = { break: false }) {
		this.#arrLoop('each', array, fn, null, stopObj);
	}

	// TODO: Map ARRAY [class WbTool]
	/**
	 * @see {@link _arrMap Map ARRAY}
	 * @function this._arrMap(array, fn, [isKey = false], [stopObj = {break: false}]);
	 * @param {[]|{}} array
	 * @param {Function} fn
	 * @param {boolean} [isKey]
	 * @param {{"break": boolean}} [stopObj]
	 * @returns {[] | {}}
	 * @description
	 * *************************************
	 * + `array`   : [] | {}
	 * + `fn`      : Function
	 * 	- `array` = [] : 
	 * 		* `fn` = value => {}           : change value & return an array of new values
	 * 		* `fn` = (value, index) => {}  : change value & return an array of new values
	 * 	- `array` = {} : 
	 * 		* `fn` = value => {}           : change value & return an array of new values
	 * 		* `fn` = (value, key) => {}    : change value & return an object of new values
	 * 		* `fn` = (_ = null, key) => {} : change key & return an array of new keys
	 * 		* `fn` = () => {}              : return an array of keys
	 * + `isKey`   : boolean-[change key or/and value of object]
	 * 	- `isKey` = true : `fn` = (value, key) => { return {"any-key" : "any-value"}; // return each results MUST BE an object }
	 * + `stopObj` : { break : false }
	 * => To break arrMap
	 * -------------------------------------
	 * @example
	 * + this._arrMap([1, 2, 3], val => val+1);
	 * + this._arrMap([1, 2, 3], (val, idx) => val+1);
	 * + this._arrMap({a:1, b:2}, val => val+1);
	 * + this._arrMap({a:1, b:2}, (val, key) => val+1);
	 * + this._arrMap({a:1, b:2}, (_ = null, key) => { if("b" === key) return "aa"; });
	 * + this._arrMap({a:1, b:2}, () => {});
	 * @example
	 * // To change key or/and value of object :
	 * this._arrMap({a:1, b:2, c:3}, (num, key) => {
	 * 	if(this._strAbsolute(key, "a")) return { "aa" : num+1 };
	 * 	if(this._strAbsolute(key, "b")) return { "bb" : num+1 }; 
	 * 	if(this._strAbsolute(key, "c")) return { "cc" : num+1 };
	 * }, true);
	 * @example
	 * // To break arrMap :
	 * const stop = { break : false }, list = this._arrMap([1, 2, 3, 4, 5], num => {
	 * 	if(3 === num) stop.break = true;
	 * 
	 * 	return num;
	 * }, stop);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	*/
	_arrMap = (array = [], fn, isKey = false, stopObj = { break: false }) => this.#arrWhichLoop('map', array, fn, isKey, stopObj);

	// TODO: Filter ARRAY [class WbTool]
	/**
	 * @see {@link _arrFilter Filter ARRAY}
	 * @function this._arrFilter(array, fn, [isKey = false], [stopObj = {break: false}]);
	 * @param {[]|{}} array
	 * @param {Function} fn
	 * @param {boolean} [isKey]
	 * @param {{"break": boolean}} [stopObj]
	 * @returns {[]|{}}
	 * @description
	 * *************************************
	 * + `array`   : [] | {}
	 * + `fn`      : Function
	 * 	- `array` = [] : 
	 * 		* `fn` = value => {}           : filter value & return an array of new values
	 * 		* `fn` = (value, index) => {}  : filter value or/and index & return an array of new values
	 * 	- `array` = {} : 
	 * 		* `fn` = value => {}           : filter value & return an array of new values
	 * 		* `fn` = (value, key) => {}    : filter value or/and key & return an object of new values
	 * 		* `fn` = (_ = null, key) => {} : filter key & return an array of new keys
	 * 			- `result` = true             : keep origin key in object
	 * 			- `result` = number | string  : change key in object	 
	 * 		* `fn` = () => {}              : return an array of keys
	 * + `isKey`   : boolean-[change key or/and value of object]
	 * 	- `isKey` = true : `fn` = (value, key) => { return result; }
	 * 		* `result` = true                      : keep origin element in object
	 * 		* `result` = any-[!object & !boolean]  : change value in object
	 * 		* `result` = {"any-key" : "any-value"} : change element in object
	 * + `stopObj` : { break : false }
	 * => To break arrFilter
	 * -------------------------------------
	 * @example
	 * + this._arrFilter([1, 2, 3, 4, 5], val => this._isOdd(val));
	 * + this._arrFilter([1, 2, 3, 4, 5], (val, idx) => (this._isOdd(val) && 0 < idx));
	 * + this._arrFilter({a:1, b:2}, val => 0 < val%2);
	 * + this._arrFilter({a:1, b:2, c:3, d:4, e:5}, (val, key) => (!this._isOdd(val) && "d" !== key));
	 * + this._arrFilter({a:1, b:2, c:3}, (_ = null, key) => ("b" !== key));
	 * + this._arrFilter({a:1, b:2, c:3}, () => {});
	 * @example
	 * this._arrFilter({a:1, b:2, c:3, d:4, e:5, f:6}, (_ = null, key) => {
	 * 	if("b" === key || "e" === key) return false;
	 * 	if("f" === key) return "keyF";
	 * 
	 * 	return true;
	 * });
	 * @example
	 * // To change key or/and value of object :
	 * this._arrFilter({a:1, b:2, c:3, d:4}, (num, key) => {
	 * 	if(this._strAbsolute(key, "a")) return { "aa" : num+1 };
	 * 	if(this._strAbsolute(key, "b")) return false;
	 * 	if(this._strAbsolute(key, "c")) return "cc";
	 * 	if(this._strAbsolute(key, "d")) return true;
	 * }, true);
	 * @example
	 * // To break arrFilter :
	 * const stop = { break : false }, list = this._arrFilter([1, 2, 3, 4, 5], num => {
	 * 	if(3 === num) stop.break = true;
	 * 
	 * 	return num;
	 * }, stop);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	*/
	_arrFilter = (array = [], fn, isKey = false, stopObj = { break: false }) => this.#arrWhichLoop('filter', array, fn, isKey, stopObj);

	// TODO: Iterate step by step in ARRAY [class WbTool]
	/**
	 * @see {@link _arrStepLoop Iterate step by step in ARRAY}
	 * @function this._arrStepLoop(array, fn, [backData = false]);
	 * @param {[]|{}} array
	 * @param {Function} fn
	 * @param {boolean} [backData]
	 * @returns {void|Promise<[]>}
	 * @description
	 * *************************************
	 * + `array`    : [] | {}
	 * + `fn`       : Function
	 * 	- `no argument`     : this._arrStepLoop(array, fn);
	 * 	- `an argument`     : this._arrStepLoop(array, fn.bind(null, argument));
	 * 		* `argument` : number | string | [] | {} | ...
	 * 	- `more arguments`  : this._arrStepLoop(array, fn.bind(null, argument, argument-1, argument-2, ...));
	 * + `backData` : boolean
	 * 	- `backData` = true : this method return an array
	 * 		* fn do not return any thing then you can not exit loop
	 * + using for big array or call an async function in loop
	 * + do not use this method inside a other loop or setInterval
	 * + can not use index of array or key of object
	 * -------------------------------------
	 * @example
	 * (async () => {
	 * 	const num = 1, string = "truong an", fn = async (...theArgs) => {
	 * 		const [num, string, value] = theArgs, add = num + value;
	 * 
	 * 		return `${string} = ${add}`;
	 * 	}, results = await this._arrStepLoop([1, 2, 3, 4], fn.bind(null, num, string), true);
	 * 
	 * 	console.log(results);
	 * })();
	 * @example
	 * (async () => {
	 * 	const num = 1, string = "truong an", fn = async (...theArgs) => {
	 * 		const [num, string, value] = theArgs, add = num + value;
	 * 
	 * 		return `${string} = ${add}`;
	 * 	}, results = await this._arrStepLoop({"a" : 1, "b" : 2, "c" : 3, "d" : 4}, fn.bind(null, num, string), true);
	 * 
	 * 	console.log(results);
	 * })();
	 * @example
	 * const num = 1, string = "truong an", fn = (...theArgs) => {
	 * 	const [num, string, value] = theArgs, add = num + value;
	 * 
	 * 	console.log(`${string} = ${add}`);
	 * };
	 * this._arrStepLoop({"a" : 1, "b" : 2, "c" : 3, "d" : 4}, fn.bind(null, num, string));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	*/
	_arrStepLoop = async (array = [], fn, backData = false) => {
		let results = [];

		if (this._isFunction(fn)) {
			const list = this._isObject(array) ? Object.values(array) : this._isArray(array) ? array : this._isIterator(array) ? this._arrMap(array, value => value) : [];

			if (this._isArray(list)) {
				let step = 0;
				const iList = list.entries();

				backData = (this._isBoolean(backData) && backData);
				results = new Array(list.length);
				await new Promise(resolve => {
					const stop = (isStop, interval) => {
						clearInterval(interval);
						if (isStop || !backData) {
							resolve();
						} else {
							const len = results.length - 1, intval = setInterval(() => {
								if (!this._isUndefined(results[len])) {
									clearInterval(intval);
									resolve();
								}
							});
						}
					}, process = arr => {
						if (this._isArray(arr)) {
							for (const val of arr) results[step++] = val;
						} else results[step++] = arr;
					}, interval = setInterval(() => {
						let { value, done } = iList.next();

						if (done) {
							stop(false, interval);
						} else try {
							const res = fn(value[1]);

							if (backData) this._isPromise(res) ? res.then(process) : process(res);
						} catch (e) {
							console.error(e);
							stop(true, interval);
						}
					});
				});
			}
		}

		return results;
	}

	//TODO: Extract TEXT in content [class WbTool]
	/**
	 * @see {@link _strExtract Extract TEXT in content}
	 * @function this._strExtract(content, [textStart = null], [textEnd = null], [getPos = false]);
	 * @param {string} content
	 * @param {string} [textStart]
	 * @param {string} [textEnd]
	 * @param {boolean} [getPos]
	 * @returns {null|string}
	 * @description
	 * *************************************
	 * + `content`   : string | text
	 * + `textStart` : string | text
	 * + `textEnd`   : string | text
	 * + `getPos`    : boolean
	 * 	- `getPos` = true : get position of `textStart` & `textEnd`
	 * + `textStart` & `textEnd` : is range to cut
	 * -------------------------------------
	 * @example
	 * + this._strExtract("The following example uses a regular expression to check for repeated occurrences of words in a string.", "example", "occurrences", true);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_strExtract = (content, textStart = null, textEnd = null, getPos = false) => {
		if (this._isString(content)) {
			let clone = content;

			if (!this._isString(textStart)) {
				textStart = '\\-t-/';
				clone = `${textStart} ${clone}`;
			}
			if (!this._isString(textEnd)) {
				textEnd = '\\-e-/';
				clone = `${clone} ${textEnd}`;
			}

			const rootStringExtract = (...theArgs) => {
				// process specified chars of text before do strExtract function
				let active = false, choise = false;
				const data = [], filter = ['.', '+', '*', '?', '^', '$', '(', ')', '[', ']', '{', '}', '|', '\\'];

				if (this._isArray(theArgs)) for (let string of theArgs) {
					if (!this._strRegExp(string, /\w/g)[0]) {
						(1 < string.length) ? (choise = true) : (string = `[${string}]`);
					} else if (this._strRegExp(string, /\W/g)[0]) {
						choise = true;
						active = true;
					}
					if (choise) {
						let text = '';
						for (let i = 0; i < string.length; i++) text = this._arrHasValue(filter, string[i])[0] ? `${text}\\${string[i]}` : `${text}${string[i]}`;
						string = text;
					}
					data.push([active, string]); active = false; choise = false;
				}

				return data;
			}, process = rootStringExtract(textStart, textEnd);

			if (this._isArray(process)) {
				if (this._isRegex(process[0][1])) process[0][1] = new RegExp(process[0][1], 'gi');
				if (this._isRegex(process[1][1])) process[1][1] = new RegExp(process[1][1], 'gi');

				const data = [], start = this._strRegExp(clone, process[0][1], true), end = this._strRegExp(clone, process[1][1], true);

				if (start[0] && end[0]) {
					let posFirstStart = 0, posFinishStart = 0, activeStart = false, posFirstEnd = 0, posFinishEnd = 0, activeEnd = false;

					if (this._isArray(start[2][0])) {
						posFirstStart = start[2][0][0]; posFinishStart = start[2][0][1]; activeStart = true;
					} else {
						posFirstStart = start[2][0]; posFinishStart = start[2][start[2].length - 1];
					}
					if (this._isArray(end[2][0])) {
						posFirstEnd = end[2][0][0]; posFinishEnd = end[2][0][1]; activeEnd = true;
					} else {
						posFirstEnd = end[2][0]; posFinishEnd = end[2][end[2].length - 1];
					}
					if (activeEnd && posFirstEnd < posFinishStart) {
						posFirstEnd = end[2][end[2].length - 1][0]; posFinishEnd = end[2][end[2].length - 1][1];
					} else if (activeEnd && process[1][0]) {
						posFirstEnd = end[2][end[2].length - 1][0]; posFinishEnd = end[2][end[2].length - 1][1];
					} else if (activeStart && process[0][0]) {
						posFirstStart = start[2][start[2].length - 1][1]; posFinishStart = posFirstStart + 1;
					}

					const position = (posFinishStart < posFirstEnd) ? posFirstEnd : posFinishEnd;

					if (getPos) {
						data.push(content.slice(posFinishStart, position), [posFinishStart, position]);

						return data;
					}

					return content.slice(posFinishStart, position);
				}
			}
		}

		return null;
	}

	// TODO: Replace old text in content by new TEXT [class WbTool]
	/**
	 * @see {@link _strReplace Replace old text in content by new TEXT}
	 * @function this._strReplace(content, find, replace, [textStart = null], [textEnd = null]);
	 * @param {string} content
	 * @param {string} find
	 * @param {string} replace
	 * @param {string} [textStart]
	 * @param {string} [textEnd]
	 * @returns {null|string}
	 * @description
	 * *************************************
	 * + `content`   : string | text
	 * + `find`      : string | text
	 * + `replace`   : string | text
	 * + `textStart` : string | text
	 * + `textEnd`   : string | text
	 * + `textStart` & `textEnd` : find in range to replace
	 * -------------------------------------
	 * @example
	 * + this._strReplace("The following example uses a regular expression to check for repeated occurrences of words in a string.", "regular expression", "Regex", "example", "occurrences");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_strReplace = (content, find, replace, textStart = null, textEnd = null) => {
		if (this._isString(content) && this._isString(find) && this._isString(replace)) {
			if (this._isRegex(find)) find = new RegExp(find, 'gi');
			if (this._isString(textStart)) {
				let string = [];

				if (this._hasExist(textEnd)) {
					string = this._strExtract(content, textStart, textEnd, true);
				} else {
					const end = '\\-e-/', clone = `${content} ${end}`;

					string = this._strExtract(clone, textStart, end, true);
				}
				if (this._hasExist(string) && this._isString(string[0]) && this._isArray(string[1])) return content.slice(0, string[1][0]).concat(string[0].replaceAll(find, replace), content.slice(string[1][1]));
			} else return content.replaceAll(find, replace);
		}

		return null;
	}

	// TODO: Check one regexp matchs on STRING [class WbTool]
	/**
	 * @see {@link _strRegExp Check one regexp matchs on STRING}
	 * @function this._strRegExp(string, regexp, [getPos = false]);
	 * @param {string} string
	 * @param {RegExp} regexp
	 * @param {boolean} [getPos]
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `string` : string | numberString
	 * + `regexp` : Regular expression
	 * + `getPos` : boolean
	 * 	- `getPos` = true : return position of char was find
	 * -------------------------------------
	 * @example
	 * + this._strRegExp("your name", /\s/g);
	 * + this._strRegExp("your name", /\s/g, true);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_strRegExp = (string, regexp, getPos = false) => {
		string = this._hasExist(string) ? string.toString() : '' + string;
		const result = [false, 0, []], array = string.match(regexp);

		if (this._isArray(array)) {
			result[0] = true; result[1] = array.length;
			if (getPos) if ((1 === result[1] && 1 === array[0].length) ? true : (1 < result[1]) ? !array.some(val => 1 < val.length) : false) {
				let count = 0;

				for (let i = 0; i < string.length; i++) if (count < result[1]) {
					if (0 === string[i].search(regexp)) { result[2].push(i); ++count; }
				} else break;
			} else {
				let index;
				const filter = [];

				for (const value of array) {
					if (this._arrHasValue(filter, value)[0]) {
						index = string.indexOf(value, (1 + index));
					} else {
						filter.push(value);
						index = string.indexOf(value);
					}
					result[2].push([index, index + value.length]);
				}
			}
		}

		return result;
	}

	#strSet(string, find, relative = false) {
		if (!this._isUndefined(string) && !this._isUndefined(find)) {
			if (null === string && null === find) return true;

			let active = true;

			if (null === string) {
				string = 'null';
			} else if (null === find) {
				find = 'null';
			} else if ((this._isString(string) || this._isNumber(string)[0]) && (this._isString(find) || this._isNumber(find)[0])) {
				string = relative ? string.toString().trim().toLocaleLowerCase().normalize('NFC') : string.toString().trim();
				find = relative ? find.toString().trim().toLocaleLowerCase().normalize('NFC') : find.toString().trim();
			} else active = false;

			if (active) return { string, find };
		}

		return false;
	}

	// TODO: Check one relative finder on STRING [class WbTool]
	/**
	 * @see {@link _strRelative Check one relative finder on STRING}
	 * @function this._strRelative(string, find);
	 * @param {number|string} string
	 * @param {number|string} find
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + `string` : string | numberString | number
	 * + `find`   : string | numberString | number
	 * -------------------------------------
	 * @example
	 * + this._strRelative("yourname", "name");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_strRelative = (string, find) => {
		const data = this.#strSet(string, find, true);

		if (this._isObject(data)) {
			const hasSpecials = this._strRegExp(data.find, /[\\^$.|?*+()[\]{}]/g, true);

			if (hasSpecials[0]) for (let i = (hasSpecials[1] - 1); 0 <= i; i--) data.find = data.find.slice(0, hasSpecials[2][i]) + '\\' + data.find.slice(hasSpecials[2][i]);

			return this._strRegExp(data.string, new RegExp(data.find, 'gi'))[0];
		}

		return data;
	}

	// TODO: Check one absolute finder on STRING [class WbTool]
	/**
	 * @see {@link _strAbsolute Check one absolute finder on STRING}
	 * @function this._strAbsolute(string, find, [relative = false]);
	 * @param {string|number} string
	 * @param {string|number} find
	 * @param {boolean} [relative]
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + `string`   : string | numberString | number
	 * + `find`     : string | numberString | number
	 * + `relative` : boolean
	 * 	- `relative` = false : "réservé" vs "RESERVE" is false
	 * 	- `relative` = true  : "réservé" vs "RESERVE" is true
	 * -------------------------------------
	 * @example
	 * + this._strAbsolute("réservé", "RESERVE");
	 * + this._strAbsolute("réservé", "RESERVE", true);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_strAbsolute = (string, find, relative = false) => {
		const data = this.#strSet(string, find);

		return this._isObject(data) ? (data.string.length === data.find.length && 0 === (relative ? data.string.localeCompare(data.find, 'en', { sensitivity: 'base' }) : data.string.localeCompare(data.find))) : data;
	}

	// TODO: Make a random STRING with length [class WbTool]
	/**
	 * @see {@link _strRandom Make a random STRING with length}
	 * @function this._strRandom([len = 12]);
	 * @param {number} [len]
	 * @returns {null|string}
	 * @description
	 * *************************************
	 * + `numlen` = number | numberString
	 * -------------------------------------
	 * @example
	 * + this._strRandom();
	 * + this._strRandom(25);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_strRandom = (len = 12) => {
		const bool = this._isNumber(len);

		if (bool[0]) {
			let id = '';
			const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', length = str.length - 1;

			for (let i = 0; i < Math.round(bool[1]); i++) id += str[this._intRandom(0, length, true)];

			return id.trim();
		}

		return null;
	}

	// TODO: Make a STRING of uuid [class WbTool]
	/**
	 * @see {@link _UUID Make a STRING of uuid}
	 * @function this._UUID();
	 * @returns {string}
	 * @description
	 * *************************************
	 * + You can generate random unique id
	 * -------------------------------------
	 * @example
	 * + this._UUID();
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_UUID = () => {
		if (('crypto' in self) && this._isFunction(self.crypto.randomUUID)) return self.crypto.randomUUID();

		const blob = new Blob(), url = URL.createObjectURL(blob), uuid = url.toString().trim();

		URL.revokeObjectURL(url);

		return uuid.substring(uuid.lastIndexOf('/') + 1); // remove prefix (e.g. blob:null/, blob:www.test.com/, ...)
	}

	// TODO: Make a numeric id [class WbTool]
	/**
	 * @see {@link _yieldID Make a numeric id}
	 * @function this._yieldID([index = 0], [limit = 0]);
	 * @param {number} [index] 
	 * @param {number} [limit]
	 * @returns {yield}
	 * @description
	 * *************************************
	 * + `index` : number
	 * 	- `index` < `limit` : `index` increase up to `limit`
	 * 	- `index` > `limit` : `index` decrease down to `limit`
	 * + `limit` : number
	 * 	- `limit` = 0 : `index` increase to up
	 * 	- `limit` > 0 : check `index`
	 * -------------------------------------
	 * @example
	 * let indexYield = 0, hasLabel = true;
	 * const listYield = [[], ["fds"], ["5"], [-5, 10], [0, 10], [5, 10], [10, 0], [10, 5], [10, -5]];
	 * const callYield = (num, limit) => {
	 * 	const id = this._yieldID(num, limit), stop = () => {
	 * 		++indexYield;
	 * 		hasLabel = true;
	 * 		clearInterval(interval); 
	 * 		if(this._isArray(listYield[indexYield])) callYield(listYield[indexYield][0], listYield[indexYield][1]);
	 * 	}, interval = setInterval(() => {
	 * 		const {value, done} = id.next();
	 * 
	 * 		if(done) {
	 * 			stop();
	 * 		}else {
	 * 			// test to 20 at index of listYield is zero
	 * 			if((0 === indexYield || 2 === indexYield) && 15 < value) {
	 * 				stop();
	 * 			}else {
	 * 				if(hasLabel) {
	 * 					hasLabel = false;
	 * 					console.log(`===== [${num}, ${limit}] =====`);
	 * 				}
	 * 				console.log("value = ", value, done);
	 * 			}
	 * 		}
	 * 	}, 1000);
	 * };
	 * 
	 * callYield(listYield[indexYield][0], listYield[indexYield][1]);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	*/
	_yieldID = (index = 0, limit = null) => {
		const isIndex = this._isNumber(index);

		if (!isIndex[0]) {
			const _yield = function* () {
				yield 0;
			};

			return _yield();
		}

		const isLimit = this._isNumber(limit), limited = isLimit[0] ? isLimit[1] : 0,
			_yield = function* () {
				if (isLimit[0]) {
					if (isIndex[1] < limited) {
						while (isIndex[1] <= limited) {
							yield isIndex[1];
							isIndex[1]++;
						}
					} else if (isIndex[1] > limited) while (limited <= isIndex[1]) {
						yield isIndex[1];
						isIndex[1]--;
					}
				} else while (true) {
					yield isIndex[1];
					isIndex[1]++;
				}
			};

		return _yield();
	}

	// TODO: Make an array of substring from STRING with slice [class WbTool]
	/**
	 * @see {@link _strSlice Make an array of substring from STRING with slice}
	 * @function this._strSlice(sliceArray, string);
	 * @param {[]} sliceArray
	 * @param {string} string
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `sliceArray` : []
	 * + `string`	  : stringJsons
	 * -------------------------------------
	 * @example
	 * const stringJsons = "{a:0}{b:1}{c:2, c1:{d:0}}", positions = this._strRegExp(stringJsons, /(\}\{)/g, true), list = this._strSlice(positions[2], stringJsons);
	 * 
	 * console.log(list);
	 * @summary stringJsons
	 * -------------------------------------
	 * + Split more jsons in the string of json
	 * + Extract substring from string base on positions in string by slice method
	 * + Find by manual or this._strRegExp(stringJsons, /finder/g, true);
	 * 	- `finder` = "\}"   : return one-dimensional array as [[1], [2]]
	 * 	- `finder` = "\}\{" : return Two-dimensional arrays as [[1, 2], [3, 4]]
	 * -------------------------------------
	 * + data = 10
	 * + data = [1, 2]
	 * + data = [[1], [2]]
	 * + data = [[1, 2], [3, 4]]
	 * + data = [[1, 2, 3], [4, 5, 6]]
	 * -------------------------------------
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_strSlice = (sliceArray, string) => {
		if (this._isArray(sliceArray) && this._isString(string)) {
			const strSlicePosition = (data, strlength) => {
				// process for strSlice
				/**
				 * data = 10
				 * data = [1, 2]
				 * data = [[1], [2]]
				 * data = [[1, 2], [3, 4]]
				 * data = [[1, 2, 3], [4, 5, 6]]
				 */
				let start = 0, list = []; // data = [[1, 2, 3], [4, 5, 6]] return empty array

				if (this._isArray(data)) {
					if (this._isArray(data[0])) {
						switch (data[0].length) {
							case 1: list = strSlicePosition(this._arrFlat(data)); // data = [[1], [2]]
								break;
							case 2: for (const arr of data) {
								const end = parseInt(arr[1]);

								list.push([start, parseInt(arr[0]) + 1]);
								start = 0 < end ? (end - 1) : end;
							} // data = [[1, 2], [3, 4]]
								list.push([start, strlength]);
								break;
						}
					} else {
						let onlyOnce = true;

						for (const num of data) {
							const number = this._isNumber(num);

							if (number[0]) {
								if (0 < number[1] && onlyOnce) {
									list.push([0, number[1]]);
									onlyOnce = false;
								} else list.push([start, number[1]]);
								start = number[1];
							}
						} // data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
					}
				} else {
					const num = this._isNumber(data); // data = 10

					if (num[0] && 0 < num[1]) list.push([0, num[1]]);
				}

				return list;
			};
			const list = strSlicePosition(sliceArray, string.length);

			return this._isArray(list) ? this._arrMap(list, arr => string.slice(arr[0], arr[1])) : [];
		}

		return [];
	}

	// TODO: Delete | replace char at index of string [class WbTool]
	/**
	 * @see {@link _strSplice Delete | replace char at index of string}
	 * @function this._strSplice(string, index, [char]);
	 * @param {string} string 
	 * @param {number} index 
	 * @param {string} [char] 
	 * @returns {null|string}
	 * @description
	 * *************************************
	 * + `string` : string
	 * + `index`  : number | numberString
	 * + `char`   : string
	 * -------------------------------------
	 * @example
	 * // Delete "." at `index` = 10 : 
	 * this._strSplice("hello . world", 10);
	 * @example
	 * // Replace "." by "," at `index` = 10:
	 * this._strSplice("hello . world", 10, ",");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_strSplice = (string, index, char) => {
		if (this._isString(string)) {
			const number = this._isNumber(index);

			if (number[0] && number[1] <= (string.length - 1)) {
				const first = string.slice(0, index), last = string.slice(index);

				string = (this._isString(char) && 1 === char.length) ? `${first}${char}${last.slice(1)}` : `${first.trimEnd()}${last.slice(1)}`;

				return string.trim();
			}
		}

		return null;
	}

	// TODO: Convert STRING to boolean [class WbTool]
	/**
	 * @see {@link _string2Bool Convert STRING to boolean}
	 * @function this._string2Bool(string);
	 * @param {number|string} string 
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + `string` : number | string
	 * -------------------------------------
	 * @example
	 * + this._arrEach([0, 1, "no", "yes", "false", "true"], value => console.log(this._string2Bool(value)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_string2Bool = string => {
		if (this._hasExist(string)) {
			if (this._isBoolean(string)) return string;
			switch (string.toString().toLocaleLowerCase().trim()) {
				case 'true': case 'yes': case '1': return true;
				case 'false': case 'no': case '0': case 'inherit': return false;
				default: if (0 === string || 1 === string) return Boolean(string);
			}
		}

		return false;
	}

	// TODO: Convert HEX to Alpha | Alpha to HEX [class WbTool]
	/**
	 * @see {@link _HEX2Alpha Convert HEX to Alpha | Alpha to HEX}
	 * @function this._HEX2Alpha(param, [option = true]);
	 * @param {number|string} param 
	 * @param {boolean} [option] 
	 * @returns {number|string}
	 * @description
	 * *************************************
	 * + `param`  : number | string
	 * + `option` : boolean
	 * 	- `option` = true-[default] : Convert HEX to Alpha, `param` must be HEX
	 * 	- `option` = false          : Convert Alpha to HEX, `param` must be Alpha
	 * -------------------------------------
	 * @example
	 * + this._HEX2Alpha("1a") => alpha = 10
	 * + this._HEX2Alpha("21", true) => alpha = 13
	 * + this._HEX2Alpha("12", false) => hex = "1f"
	 * + this._HEX2Alpha("12%", false) => hex = "1f"
	 * + this._HEX2Alpha(12, false) => hex = "1f"
	 * + this._HEX2Alpha(0.12, false) => hex = "1f"
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_HEX2Alpha = (param, option = true) => {
		if (this._hasExist(param)) {
			const list = ['00', '03', '05', '08', '0a', '0d', '0f', '12', '14', '17', '1a', '1c', '1f', '21', '24', '26', '29', '2b', '2e', '30', '33', '36', '38', '3b', '3d', '40', '42', '45', '47', '4a', '4d', '4f', '52', '54', '57', '59', '5c', '5e', '61', '63', '66', '69', '6b', '6e', '70', '73', '75', '78', '7a', '7d', '80', '82', '85', '87', '8a', '8c', '8f', '91', '94', '96', '99', '9c', '9e', 'a1', 'a3', 'a6', 'a8', 'ab', 'ad', 'b0', 'b3', 'b5', 'b8', 'ba', 'bd', 'bf', 'c2', 'c4', 'c7', 'c9', 'cc', 'cf', 'd1', 'd4', 'd6', 'd9', 'db', 'de', 'e0', 'e3', 'e6', 'e8', 'eb', 'ed', 'f0', 'f2', 'f5', 'f7', 'fa', 'fc', 'ff'];

			if (option) {
				const alpha = this._arrHasValue(list, param, true);

				if (alpha[0]) return alpha[1][0] / 100;
			} else {
				let percent = false;

				if (this._isString(param) && this._strRelative(param, '%')) {
					param = param.replaceAll('%', '');
					percent = true;
				}

				const num = this._isNumber(param);

				if (num[0]) {
					if (0 === num[1]) return list[0];
					if (1 === num[1]) return percent ? list[1] : list[100];
					if (0 < num[1] && num[1] < 1) return list[100 * num[1]];
					if (1 < num[1] && num[1] <= 100) return list[num[1]];
				}
			}
		}

		return null;
	}

	// TODO: Convert HEX to HSL [class WbTool]
	/**
	 * @see {@link _HEX2HSL Convert HEX to HSL}
	 * @function this._HEX2HSL(hex);
	 * @param {string} hex 
	 * @returns {{}}
	 * @description
	 * *************************************
	 * + hex: string
	 * 	- Ex: "#000000" | "#000000ff" | ...
	 * -------------------------------------
	 * @example
	 * + this._arrEach(["#000000", "#000000ff"], hex => console.log("hsl: ", this._HEX2HSL(hex)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_HEX2HSL = hex => {
		if (this._isString(hex)) {
			const list = (7 === hex.length) ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex).slice(1) : (9 === hex.length) ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex).slice(1) : [];

			if (this._isArray(list)) {
				const alpha = (4 === list.length) ? list.pop() : null, rgb = (() => {
					const rgb = this._arrMap(list, str => parseInt(str, 16) / 255), max = Math.max(...rgb), min = Math.min(...rgb);
					let h, s, l = (max + min) / 2;

					if (max === min) {
						h = s = 0; // achromatic
					} else {
						const d = max - min;

						s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
						h = ((rgb[0] === max) ? (rgb[1] - rgb[2]) / d + (rgb[1] < rgb[2] ? 6 : 0) : (rgb[1] === max) ? (rgb[2] - rgb[0]) / d + 2 : (rgb[0] - rgb[1]) / d + 4) / 6;
					}
					h = Math.round(360 * h);
					s = Math.round(100 * s);
					l = Math.round(100 * l);

					return { h, s, l };
				})();

				return this._isString(alpha) ? Object.assign(rgb, { a: this._HEX2Alpha(alpha) }) : rgb;
			}
		}

		return {};
	}

	// TODO: Convert HSL to HEX [class WbTool]
	/**
	 * @see {@link _HSL2HEX Convert HSL to HEX}
	 * @function this._HSL2HEX(hsl);
	 * @param {{"h": number, "s": number|percent, "l": number|percent, "a"?: number}} hsl 
	 * @returns {string}
	 * @description
	 * *************************************
	 * + hsl: {"h": number, "s": number|percent, "l": number|percent, "a"?: number}
	 * 	- Ex: {h:0, s:100, l:50} | {h:0, s:"100%", l:"50%"} | {h:0, s:100, l:50, a:0.5} | ...
	 * -------------------------------------
	 * @example
	 * + this._arrEach([{h:0, s:100, l:50}, {h:0, s:"100%", l:"50%"}, {h:0, s:100, l:50, a:0.5}], hsl => console.log("HEX: ", this._HSL2HEX(hsl)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_HSL2HEX = hsl => {
		if (this._isObject(hsl) && this._arrMap(hsl, () => { }).every((key, index) => this._arrHasValue(['h', 's', 'l'], key)[0] || (3 === index && this._strAbsolute(key, 'a')))) {
			let list = this._arrMap(hsl, val => this._strRelative(val, '%') ? val.replaceAll('%', '') : val);

			if (list.every(n => this._isNumber(n)[0])) {
				list = this._arrMap(list, n => this._isNumber(n)[1]);

				const alpha = (4 === list.length) ? list.pop() : null, f = n => {
					const h = list[0], s = list[1], l = list[2] / 100, k = (n + h / 30) % 12, color = l - (s * Math.min(l, 1 - l) / 100) * Math.max(Math.min(k - 3, 9 - k, 1), -1);

					return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
				}, hex = `#${f(0)}${f(8)}${f(4)}`;

				return this._isNumber(alpha)[0] ? `${hex}${this._HEX2Alpha(alpha, false)}` : hex;
			}
		}

		return null;
	}

	// TODO: Convert RGB to HEX [class WbTool]
	/**
	 * @see {@link _RGB2HEX Convert RGB to HEX}
	 * @function this._RGB2HEX(rgb);
	 * @param {{"r": number, "g": number, "b": number, "a"?: number}} rgb 
	 * @returns {string}
	 * @description
	 * *************************************
	 * + rgb: {"r": number, "g": number, "b": number, "a"?: number}
	 * 	- Ex: {r:255, g:0, b:0} | {r:255, g:0, b:0, a:0.15}
	 * -------------------------------------
	 * @example
	 * + this._arrEach([{r:255, g:0, b:0}, {r:255, g:0, b:0, a:0.15}], rgb => console.log("HEX: ", this._RGB2HEX(rgb)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_RGB2HEX = rgb => {
		if (this._isObject(rgb) && this._arrMap(rgb, () => { }).every((key, index) => ((this._arrHasValue(['r', 'g', 'b'], key)[0] || (3 === index && this._strAbsolute(key, 'a'))) && this._isNumber(rgb[key])[0]))) {
			const list = this._arrMap(rgb, n => this._isNumber(n)[1]), alpha = (4 === list.length) ? list.pop() : null,
				hex = this._arrMap(list, n => {
					const str = Number(n).toString(16);

					return (str.length < 2) ? `0${str}` : str;
				}).join('');

			return this._isNumber(alpha)[0] ? `#${hex}${this._HEX2Alpha(alpha, false)}` : `#${hex}`;
		}

		return null;
	}

	// TODO: Convert HEX to RGB [class WbTool]
	/**
	 * @see {@link _HEX2RGB Convert HEX to RGB}
	 * @function this._HEX2RGB(hex);
	 * @param {string} hex
	 * @returns {{}}
	 * @description
	 * *************************************
	 * + hex: string
	 * 	- Ex: "#000000" | "#000000ff"
	 * -------------------------------------
	 * @example
	 * + this._arrEach(["#000000", "#000000ff"], hex => console.log("RGB: ", this._HEX2RGB(hex)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_HEX2RGB = hex => {
		if (this._isString(hex)) {
			const list = (7 === hex.length) ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex).slice(1) : (9 === hex.length) ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex).slice(1) : [];

			if (this._isArray(list)) {
				const alpha = (4 === list.length) ? list.pop() : null, arr = this._arrMap(list, str => parseInt(str, 16)), rgb = { r: arr[0], g: arr[1], b: arr[2] };

				return this._isString(alpha) ? Object.assign(rgb, { a: this._HEX2Alpha(alpha) }) : rgb;
			}
		}

		return {};
	}

	// TODO: Convert HEX [6|8] to 3-digit [class WbTool]
	/**
	 * @see {@link _HEX23 Convert HEX [6|8] to 3-digit}
	 * @function this._HEX23(hex);
	 * @param {string} hex
	 * @returns {string}
	 * @description
	 * *************************************
	 * + hex: string
	 * 	- Ex: "#000000" | "#000000ff"
	 * -------------------------------------
	 * @example
	 * + ["#000", "#fffff", "#ffffff", "#ffffffff", "#ffffff00", "#fffffff1", "#ffffff0f"].map(hex => console.log(this._HEX23(hex)));
	 * @example
	 * + this.getGuide();
	 */
	_HEX23 = hex => {
		if (this._isString(hex) && '#' == hex[0]) {
			const length = hex.length;

			if ((7 == length || 9 == length) && hex[1] == hex[2] && hex[3] == hex[4] && hex[5] == hex[6])
				return (9 == length && (hex[6] !== hex[7] || hex[7] !== hex[8])) ? hex : (hex[0] + hex[1] + hex[3] + hex[5]);
		}

		return hex;
	}

	// TODO: Convert HEX 3 to 6-digit [class WbTool]
	/**
	 * @see {@link _32HEX Convert HEX 3 to 6-digit}
	 * @function this._32HEX(shortHex);
	 * @param {string} shortHex
	 * @returns {string}
	 * @description
	 * *************************************
	 * + shortHex: string
	 * 	- Ex: "#03f" | "#fff"
	 * -------------------------------------
	 * @example
	 * + ["#03f", "#fff"].map(shortHex => console.log(this._32HEX(shortHex)));
	 * @example
	 * + this.getGuide();
	 */
	_32HEX = shortHex => {
		return (this._isString(shortHex) && '#' == shortHex[0] && 4 == shortHex.length) ?
			shortHex[0] + shortHex.slice(1).split('').map(x => x + x).join('') : shortHex;
	}

	// TODO: Make Base64 encode [class WbTool]
	/**
	 * @see {@link _base64Encode Make Base64 encode}
	 * @function this._base64Encode(str);
	 * @param {any} str
	 * @returns {base64Encode}
	 * @description
	 * *************************************
	 * + `string` : number | string | json | [] | ...
	 * -------------------------------------
	 * @example
	 * + this._arrEach(["string", [0, 1, 2], {obj: [0, 1, 2]}], value => console.log(this._base64Encode(value)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_base64Encode = str => self.btoa(encodeURIComponent(this._isObject(str) ? JSON.stringify(str) : str));

	// TODO: Make Base64 decode [class WbTool]
	/**
	 * @see {@link _base64Decode Make Base64 decode}
	 * @function this._base64Decode(str);
	 * @param {base64Encode} str
	 * @returns {any}
	 * @description
	 * *************************************
	 * + `string` : base64Encode
	 * -------------------------------------
	 * @example
	 * + this._base64Decode(this._base64Encode("string"));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_base64Decode = str => {
		try {
			str = decodeURIComponent(self.atob(str));

			return this._isJSON(str) ? JSON.parse(str) : str;
		} catch (e) {
			console.error(e);

			return '';
		}
	}

	// TODO: Make a random INT between min & max [class WbTool]
	/**
	 * @see {@link _intRandom Make a random INT between min & max}
	 * @function this._intRandom(min, max, [inclusive = false]);
	 * @param {number} min 
	 * @param {number} max 
	 * @param {boolean} [inclusive]
	 * @returns {null|number}
	 * @description
	 * *************************************
	 * + `min` & `max` : number-[`min` < `max`]
	 * + `inclusive` : boolean
	 * 	- `inclusive` = true  : is range can start at `min` <= number <= `max`
	 * 	- `inclusive` = false : is range can start at `min` < number < `max`
	 * -------------------------------------
	 * @example
	 * + this._intRandom(5, 40, true);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	_intRandom = (min, max, inclusive = false) => {
		const isMin = this._isNumber(min), isMax = this._isNumber(max);

		if (isMin[0] && isMax[0]) {
			min = Math.ceil(isMin[1]);
			max = Math.floor(isMax[1]);
			if (0 <= min && min < max) return Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0))) + min;
		}

		return null;
	}
}

class WbFuture extends WbTool {

	// TODO: Make a multiple processor of functions with promise [class WbFuture]
	/**
	 * @see {@link sow Make a multiple processor of functions with promise}
	 * @function globalThis.using.future.sow(fns);
	 * @param {...any} fns
	 * @returns {{"reap": (options: "all"|"every"|"some"|"any"|"threads") => Promise<Function>|void, "chain": (jobs: [(job: any) => void, ...Function]) => void}}
	 * @description reap method
	 * *************************************
	 * + `fns`     : [fn0, fn1, fn2, promise, string, number]
	 * + `options` : "all" | "every" | "some" | "any" | "threads" = ()
	 * 	- "all"     : return all values of `resolve` and `reject` by `promise.allSettled()` in the order array on the time
	 * 	- "every"   : return all values of `resolve` in the order array on the time or `first reject` by `promise.all()` 
	 * 	- "some"    : return `one first` value of `resolve` by `promise.any()` in the array
	 * 	- "any"     : return `any first` value of `resolve` or `reject` by `promise.race()` in the array
	 * 	- "threads" : execute `multiple threads` on the time and return `void`
	 * -------------------------------------
	 * @example
	 * const list = this._arrMap([1000, 6000, 4000, 3000, 7000], num =>
	 * 	(1000 === num) ?
	 * 		new Promise((_, reject) => setTimeout(() => reject(`reject: ${num}`), num))
	 * 		: new Promise(resolve => setTimeout(() => resolve(`resolve: ${num}`), num))
	 * );
	 * 
	 * globalThis.using.future.sow(list).reap("any").then(res => console.log(res));
	 * 
	 * @description chain method
	 * -------------------------------------
	 * + `jobs` is an array of functions with param of each function was result returned from `fns` execution
	 * -------------------------------------
	 * @example
	 * + globalThis.using.future.sow(list).chain(this._arrMap([...Array(list.length).keys()], () => res => console.log(res)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	sow = (...fns) => {
		const doit = !fns.some(fn => this._isUndefined(fn));

		if (doit) {
			const reap = this._arrFlat(fns).map(fn => [this._isFunction(fn), fn]);

			if (this._isArray(fns)) return {
				reap: options => {
					const bool = this._arrHasValue(['all', 'every', 'some', 'any'], options, true);

					if (bool[0]) return (2 < bool[1][0]) ? this.#any(reap)
						: (1 < bool[1][0]) ? this.#some(reap)
							: (0 < bool[1][0]) ? this.#every(reap).then(every => this._isArray(every) ? this._arrMap(every, arr => arr[1]) : every)
								: this.#all(reap).then(all => this._isArray(all) ? this._arrMap(all, arr => arr[1]) : all);
					this.#threads(reap);
				},
				chain: (...params) => {
					const jobs = this._arrFlat(params), list = this.#checkJobs(reap.every(arr => (!arr[0] && this._isElement(arr[1]))) ? fns : this._arrMap(reap, arr => arr[1]), jobs);

					list.check ? this.#multiLines(list) : false;
				}
			};
		}

		return { reap: () => Promise.resolve(), chain: () => { } };
	}

	#checkJobs(sow, jobs) {
		const object = { check: false, sow: [], jobs: [] };

		for (const index in sow) if (this._isFunction(jobs[index])) {
			object.sow.push(sow[index]);
			object.jobs.push(jobs[index]);
		} else break;
		if (this._isArray(object.jobs)) object.check = true;

		return object;
	}

	#setObjAll(reap) {
		const objects = { fn: [], values: [], results: [] };

		this._arrEach(reap, (arr, index) => {
			arr[0] ? objects.fn.push([index, arr[1]]) : (this._isPromise(arr[1]) ? objects.fn.push([index, arr[1]]) : objects.values.push([index, arr[1]]));
		});

		return objects;
	}

	async #all(reap) {
		// return all values of resolve and reject by promise.allSettled() in the order array on the time
		const objects = this.#setObjAll(reap), promises = await Promise.allSettled(this._arrMap(objects.fn, arr => this._isFunction(arr[1]) ? arr[1]() : arr[1])).then(r => r);

		this._arrEach(promises, (promise, index) => {
			objects.results.push([objects.fn[index][0], promise[('fulfilled' === promise.status) ? 'value' : 'reason']]);
		});
		for (const arr of objects.values) objects.results.push(arr);

		return objects.results;
	}

	async #every(reap) {
		// return all values of resolve in the order array on the time or first reject by promise.all() 
		const objects = this.#setObjAll(reap), promises = await Promise.all(this._arrMap(objects.fn, arr => this._isFunction(arr[1]) ? arr[1]() : arr[1])).then(r => r).catch(e => e);

		if (this._isArray(promises)) {
			this._arrEach(promises, (value, index) => {
				objects.results.push([objects.fn[index][0], value]);
			});
			for (const arr of objects.values) objects.results.push(arr);

			return objects.results;
		}

		return this._isArray(objects.values) ? objects.values : promises;
	}

	#processSomeAny(reap, isSome = false) {
		const objects = (() => {
			const obj = { fn: [], values: [] };

			for (const arr of reap) arr[0] ? obj.fn.push(arr[1]) : (this._isPromise(arr[1]) ? obj.fn.push(arr[1]) : obj.values.push(arr[1]));

			return obj;
		})();

		if (this._isArray(objects.values)) return objects.values[0];

		const list = this._arrMap(objects.fn, fn => this._isFunction(fn) ? fn() : fn);

		return isSome ? Promise.any(list).then(r => r).catch(e => e) : Promise.race(list).then(r => r).catch(e => e);
	}

	// return one first value of resolve by promise.any() in the array
	#some(reap) {
		return this.#processSomeAny(reap, true);
	}

	// return any first value of resolve or reject by promise.race() in the array
	#any(reap) {
		return this.#processSomeAny(reap);
	}

	#multiLines(list) {
		// "jobs" is the array of functions executed from values returned by fn and each pair of fn-job is executed separately
		// The method of chain return void
		this._arrEach(list.sow, (fn, index) => {
			this.#any([[list.check, fn]]).then(result => list.jobs[index]([result]));
		});
	}

	#threads(reap) {
		// multiple threads is executed separately and return void
		for (const arr of reap) if (arr[0]) {
			arr[1]();
		} else if (this._isPromise(arr[1])) Promise.race([arr[1]]).then().catch(e => e);
	}
}

class WbRegion extends WbFuture {
	static #regions = { locale: null, datetime: {} };

	#validLocale(valid) {
		try {
			if (this._isArray(Intl.Collator.supportedLocalesOf([valid], { localeMatcher: 'lookup' }))) return true;
		} catch (e) {
			console.error(e);
		}
		return false;
	}

	#numberSystem(locale, options = {}) {
		const defaultLocales = WbRegion.#regions.locale;

		return (this._isString(locale) && this._isObject(options)) ? new Intl.NumberFormat(locale, options) : this._isString(locale) ? new Intl.NumberFormat(locale) : this._isArray(defaultLocales) ? new Intl.NumberFormat(defaultLocales[0]) : new Intl.NumberFormat();
	}

	// TODO: Get default options region [class WbRegion]
	/**
	 * @see {@link getDefaultRegion Get default options region}
	 * @function globalThis.using.region.getDefaultRegion();
	 * @returns {null|object}
	 * *************************************
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	getDefaultRegion = () => self.navigator ? self.navigator.languages : null;

	// TODO: Set options region [class WbRegion]
	/**
	 * @see {@link setRegion Set options region}
	 * @function globalThis.using.region.setRegion(locale);
	 * @param {string} locale
	 * @returns {boolean}
	 * *************************************
	 * @example
	 * + globalThis.using.region.setRegion("vi-VN");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	setRegion = locale => {
		if ((this._isString(locale) && this._strRelative(locale.trim(), '-')) ? this.#validLocale(locale) : false) {
			WbRegion.#regions.locale = [locale, locale.split('-')[0]];
			this._isUndefined(WbRegion.#regions.datetime.locale) ? Object.assign(WbRegion.#regions.datetime, { locale: locale }) : (WbRegion.#regions.datetime.locale = locale);

			return true;
		}

		return false;
	}

	//TODO: Get region display name [class WbRegion]
	/**
	 * @see {@link getDisplayNames Get region display name}
	 * @function globalThis.using.region.getDisplayNames(of, [language], [type]);
	 * @param {string|[]} of 
	 * @param {string} [language] 
	 * @param {string} [type]
	 * @returns {{ "names": [], "methods": Intl.DisplayNames }}
	 * @description
	 * *************************************
	 * + `of`       : string | [of, ...]
	 * + `language` : "en", ...
	 * + `type`     : "region"-[default] | "language" | "script" | "currency"
	 * 	- Region Code   : new Intl.DisplayNames(["en"], {type: "region"}).of("419") | .of("US");     // "Latin America"
	 * 	- Language      : new Intl.DisplayNames(["en"], {type: "language"}).of("fr") | .of("en-US"); // "French"
	 * 	- Script Code   : new Intl.DisplayNames(["en"], {type: "script"}).of("Arab");                // "Arabic"
	 * 	- Currency Code : new Intl.DisplayNames(["en"], {type: "currency"}).of("USD");               // "US Dollar"
	 * -------------------------------------
	 * @example
	 * + globalThis.using.region.getDisplayNames(["419", "BZ", "US", "BA", "MM"]);
	 * + globalThis.using.region.getDisplayNames(["419", "BZ", "US", "BA", "MM"], "en", "region");
	 * + globalThis.using.region.getDisplayNames(["fr", "en-US"], "de", "language");
	 * + globalThis.using.region.getDisplayNames(["Latn", "Arab", "Kana"], "zh-Hant", "script");
	 * + globalThis.using.region.getDisplayNames("USD", "fr-CA", "currency");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	getDisplayNames = (of = [], language, type) => {
		try {
			const list = this._isArray(of) ? of : this._isString(of) ? [of] : [];

			if (this._isArray(list)) {
				if (!(this._isString(language) && this.#validLocale(language))) language = this.getUserAgent().language;
				if (!(this._isString(type) && this._arrHasValue(['region', 'language', 'script', 'currency'], type)[0])) type = 'region';

				const names = [], displayNames = new Intl.DisplayNames([language], { type: type });

				for (const value of list) if (this._isString(value) || this._isNumber(value)[0]) {
					try {
						names.push(displayNames.of(value));
					} catch {
						names.push(value);
					}
				} else names.push(null);

				return { names: names, methods: displayNames };
			}
		} catch (e) {
			console.error(e);
		}

		return { names: null, methods: null };
	}

	//TODO: Get region number format [class WbRegion]
	/**
	 * @see {@link getNumberFormat Get region number format}
	 * @function globalThis.using.region.getNumberFormat(formats, [locale = null], [options = null]);
	 * @param {number|[]} formats
	 * @param {string} [locale]
	 * @param {{ "style": "currency", "currency": string }|{ "maximumSignificantDigits": number }|{ "style": "unit", "unit": "liter", "unitDisplay": "long" }} [options]
	 * @returns {{ "names": [], "methods": Intl.DisplayNames }}
	 * @description
	 * *************************************
	 * + `formats` : "numberString" | number | ["numberString", number, ...]
	 * + `locale`  : "zh-Hans-CN-u-nu-hanidec", "en-IN", "en-GB"
	 * + `options` : { style: "currency", currency: "JPY" }, { maximumSignificantDigits: 3 }, { style: "unit", unit: "liter", unitDisplay: "long" }
	 * -------------------------------------
	 * @example
	 * + globalThis.using.region.getNumberFormat(3500);
	 * + globalThis.using.region.getNumberFormat(["3500", 123456.789]);
	 * + globalThis.using.region.getNumberFormat(123456.789, "zh-Hans-CN-u-nu-hanidec");
	 * + globalThis.using.region.getNumberFormat(123456.789, "ja-JP", { style: "currency", currency: "JPY" });
	 * + globalThis.using.region.getNumberFormat(123456.789, "en-IN", { maximumSignificantDigits: 3 });
	 * + globalThis.using.region.getNumberFormat(16, "en-GB", { style: "unit", unit: "liter", unitDisplay: "long" });
	 * + globalThis.using.region.getNumberFormat(["123456.789", 3500], "en-GB", { style: "currency", currency: "USD" });
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	getNumberFormat = (formats = [], locale = null, options = null) => {
		const list = this._isArray(formats) ? formats : this._isNumber(formats)[0] ? [formats] : [];

		if (this._isArray(list)) {
			const names = [], numberSystem = this.#numberSystem(locale, options);

			for (const value of list) {
				const number = this._isNumber(value);

				if (number[0]) {
					try {
						names.push(numberSystem.format(number[1]));
					} catch {
						names.push(number[1]);
					}
				} else names.push(null);
			}

			return { names: names, methods: numberSystem };
		}

		return { names: null, methods: null };
	}

	// TODO: Check valid number | currency [class WbRegion]
	/**
	 * @see {@link validNumber Check valid number | currency}
	 * @function globalThis.using.region.validNumber(num, separate, decimal);
	 * @param {number} num
	 * @param {null|string} separate
	 * @param {null|string} decimal
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + `num`      : "numberString" | number
	 * + `separate` : null | "," | "." | " "
	 * + `decimal`  : null | "." | ","
	 * 	- `separate` & `decimal` : MUST be difference
	 * -------------------------------------
	 * @example
	 * + globalThis.using.region.validNumber("1.25", null, ".");
	 * + globalThis.using.region.validNumber("100,000.00", ",", ".");
	 * + globalThis.using.region.validNumber("100 000.00", " ", ".");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	validNumber = (num, separate = null, decimal = null) => {
		let status = 0, chars = 0;
		const isNumber = this._isNumber(num);

		if (this._isString(num) || isNumber[0]) {
			const boolCurrency = (this._isString(separate) || this._isString(decimal));

			num = num.toString().trim();
			for (let i = 0; i < num.length; i++) {
				chars = num[i];
				if (boolCurrency) {
					if ((!isNaN(chars) && '' !== chars) || chars === separate || chars === decimal) {
						status = 1;
					} else {
						status = 0;
						break;
					}
				} else if (!isNaN(chars) && '' !== chars || this._strAbsolute(chars, '.')) {
					status = 1;
				} else {
					status = 0;
					break;
				}
			}
			if (0 < status && 1 < num.length && this._strAbsolute(0, num[0]) && 0 === isNumber[1]) status = (this._isString(decimal) && this._strRegExp(num, new RegExp(`(\\${decimal})`, 'g')[0])) ? 1 : 0;
		}

		return (0 < status);
	}

	// TODO: Convert exponential to number [class WbRegion]
	/**
	 * @see {@link exponential2Number Convert exponential to number}
	 * @function globalThis.using.region.exponential2Number(exp, [isExp2Num = true]);
	 * @param {number|Exponential} exp
	 * @param {boolean} [isExp2Num]
	 * @returns {number|Exponential}
	 * @description
	 * *************************************
	 * + `exp`       : exponential | number | numberString
	 * + `isExp2Num` :
	 * 	- true-[default] : Convert exponential to number [exp MUST be exponential]
	 * 	- false			 : Convert number to exponential [exp MUST be number]
	 * -------------------------------------
	 * @example
	 * + [null, "", " "].forEach(e => console.log(globalThis.using.region.exponential2Number(e)));
	 * + ["0.005", "0.25", "10", "12", "123", "1230", "1230500", "1230005", "1200000", "1000000"].forEach(e => console.log(globalThis.using.region.exponential2Number(e)));
	 * + [0.005, 0.25, 10, 12, 123, 1230, 1230500, 1230005, 1200000, 1000000].forEach(e => console.log(globalThis.using.region.exponential2Number(e)));
	 * + ["0.005", "0.25", "10", "12", "123", "1230", "1230500", "1230005", "1200000", "1000000"].forEach(e => console.log(globalThis.using.region.exponential2Number(e, false)));
	 * + [0.005, 0.25, 10, 12, 123, 1230, 1230500, 1230005, 1200000, 1000000].forEach(e => console.log(globalThis.using.region.exponential2Number(e, false)));
	 * + ["5e-3", "2.5e-1", "1e+1", "1.2e+1", "1.23e+2", "1.23e+3", "1.2305e+6", "1.230005e+6", "1.2e+6", "1e+6"].forEach(e => console.log(globalThis.using.region.exponential2Number(e)));
	 * + ["5e-3", "2.5e-1", "1e+1", "1.2e+1", "1.23e+2", "1.23e+3", "1.2305e+6", "1.230005e+6", "1.2e+6", "1e+6"].forEach(e => console.log(globalThis.using.region.exponential2Number(e)));
	 * + ["1e+21", "123E1", "123e+1", "123.e+1", "123e-1", "0.1e-1", ".1e-1", "-123e1"].forEach(e => console.log(globalThis.using.region.exponential2Number(e)));
	 * + [5e-3, 2.5e-1, 1e+1, 1.2e+1, 1.23e+2, 1.23e+3, 1.2305e+6, 1.230005e+6, 1.2e+6, 1e+6].forEach(e => console.log(globalThis.using.region.exponential2Number(e)));
	 * + [1e+21, 123E1, 123e+1, 123.e+1, 123e-1, 0.1e-1, .1e-1, -123e1].forEach(e => console.log(globalThis.using.region.exponential2Number(e)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	exponential2Number = (exp, isExp2Num = true) => {
		const number = this._isNumber(exp);

		return number[0] ? (this._isBoolean(isExp2Num) && isExp2Num) ? this._isExponential(exp) ? Number(exp).toLocaleString('fullwide', { useGrouping: false }) : number[1] : number[1].toExponential() : 0;
	}

	#rootCurrency2Number(currency, eventKey = false) {
		const isNumber = this._isNumber(currency);

		if (isNumber[0]) return isNumber[1];
		try {
			if (this._isString(currency) && this._strRegExp(currency, /\d/g)[0]) {
				currency = currency.trim().replaceAll(/(?<=\d)\s{1,}(?=\d)/g, '_').replaceAll(/(^.\s)|(\s.$)/g, '').replaceAll(/(^.\s)|(\s.$)/g, '').replaceAll(/(?![0-9_,.-])(.)/g, '');

				const number = this._isNumber(currency);

				if (number[0]) return number[1];

				const chars = this._strRegExp(currency, /(?![0-9])(.)/g, true);

				if (chars[0]) {
					const list = currency.split(currency[chars[2][chars[2].length - 1]]);

					if (this._isNumber(list[0])[0] && 2 < list[1].length) {
						currency = (1 === chars[1] && 4 < list[1].length) ? list.join('.') : (eventKey || 3 === list[1].length) ? list.join('') : list.join('.');
					} else {
						list[0] = list[0].replaceAll(/(?![0-9-])(.)/g, '');
						currency = list.join('.');
					}

					return this.#rootCurrency2Number(currency, eventKey);
				}
			}
		} catch {
			return null;
		}

		return null;
	}

	// TODO: Convert currency to number [class WbRegion]
	/**
	 * @see {@link currency2Number Convert currency to number}
	 * @function globalThis.using.region.currency2Number(currency);
	 * @param {number|Currency} currency
	 * @returns {number}
	 * *************************************
	 * @example
	 * + [-100000.5, "-100000.5", "- 100000.4", "$ 100000.42", "100000.4 €", "-$ 100,000,000.40", "- $ 100,000,000.4", "-$ 0.150", "- $ 0,42", "1,52", "1.00052", "1,0052", "1,00052", "￥100,000", "100,000.40€", "1 234 567 891,0025 ₽", "     1        234        567           891,0025                 ₽     "].forEach(val => console.log(val, " = ", globalThis.using.region.currency2Number(val)));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	currency2Number = currency => this.#rootCurrency2Number(currency);

	// TODO: Convert number to currency with separate, decimal, tenths [class WbRegion]
	/**
	 * @see {@link number2Currency Convert number to currency with separate, decimal, tenths}
	 * @function globalThis.using.region.number2Currency(num, [separate], [decimal], [tenths], [symbol = [null, null, null]]);
	 * @param {number|Currency|[]} num
	 * @param {null|string} [separate]
	 * @param {null|string} [decimal]
	 * @param {integer} [tenths]
	 * @param {[]} [symbol]
	 * @returns {Currency}
	 * @description
	 * *************************************
	 * + `num`      : number | numberString | currency | [currency, ...]
	 * + `separate` : null | "," | "." | " "
	 * + `decimal`  : null | "."
	 * + `tenths`   : integer [2]
	 * + `symbol`   : Array(3) [null | currency unit, null | space, null | ""-[first default] | "last"]
	 * 	- `symbol` = [null, null, null]
	 * 	- `symbol` = ["$", "", "last"]
	 * 	- `symbol` = ["€", " ", ""]
	 * -------------------------------------
	 * @example
	 * + [3500, 3500.45].map(num => globalThis.using.region.number2Currency(num));
	 * + globalThis.using.region.number2Currency(3500.45, " ", ".", 2); // => 3 500.45	
	 * + globalThis.using.region.number2Currency("4500 eur", null, null, null, [null, null, null]) // => 4,500.00
	 * + globalThis.using.region.number2Currency("5000 eur", null, null, null, ["$", "", "last"]) // => 5,000.00$
	 * + globalThis.using.region.number2Currency("5500 usd", null, null, null, ["$", " ", ""]) // => $ 5,500.00
	 * + globalThis.using.region.number2Currency("6000 usd", null, null, null, ["$", "testme ", ""]) // => $ 6,000.00
	 * + globalThis.using.region.number2Currency("6500 eur", null, null, null, ["$", null, ""]) // => $6,500.00
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	number2Currency = (num, separate, decimal, tenths, symbol = [null, null, null]) => {
		if (this._isString(num) || this._isNumber(num)[0]) {
			let boolFake = false, decimalFake = null, boolExponential = false;

			if (!this._hasExist(separate) || 1 < separate.toString().length) separate = ',';
			if (!this._isString(decimal)) decimal = '.';
			if (!this._isNumber(tenths)[0]) tenths = 2;
			if (this._strAbsolute(separate, decimal)) decimal = this._strAbsolute(separate, '.') ? ',' : '.';
			if (this._strAbsolute(separate, '.')) {
				const number = this._isNumber(num[0]);

				if (number[0] && 0 < number[1]) num = num.toString().replaceAll(separate, '');
			}
			if (this._strAbsolute(decimal, ',')) {
				num = num.toString().replace(decimal, '.');
				boolFake = true, decimalFake = decimal; decimal = '.';
			}
			if (this._isExponential(num)) {
				boolExponential = true;
				num = this.exponential2Number(num);
			}

			const number = this.#rootCurrency2Number(num, true), x = (number < 1 || boolExponential) ? num.toString().split(decimal) : number.toString().split(decimal);

			if (this._isArray(x)) {
				let active = true;
				const results = [null, null];

				if (this._isString(x[0])) {
					const setTenth = (() => {
						// set zero to tenths of currency
						let i = 0, digits = '';
						const number = this._isNumber(tenths);

						if (number[0] && 0 < number[1]) {
							while (i < number[1]) {
								digits += '0'; ++i;
							}
							digits = decimal + digits;
						}

						return digits;
					})(), getTenth = (tenth => {
						// format string of currency tenths [wbEffect]
						let digits = '', j = 0, chars = 0;
						const len = tenth.length;

						if (0 < len) {
							for (let i = 0; i < len; i++) {
								chars = tenth[i];
								if (((!isNaN(chars) && '' !== chars) || chars === decimal) && (0 <= parseInt(chars) || j < tenths)) {
									digits += chars; j++;
								} else break;
							}
							if (digits.length < tenths) for (let i = digits.length; i < tenths; i++) digits += '0';
							digits = decimal + digits;
						}

						return digits;
					})(this._hasExist(x[1]) ? x[1].toString() : ''), rgx = /(\d+)(\d{3})/;

					results[0] = x[0];
					results[1] = 1 < x.length ? getTenth : setTenth;
					while (rgx.test(results[0])) results[0] = results[0].replace(rgx, `$1${separate}$2`);
					if (boolFake && this._isString(results[1])) results[1] = results[1].replace(decimal, decimalFake);
				} else if (this._isString(x[1])) {
					results[0] = 0;
					results[1] = boolFake ? num.replace(decimal, decimalFake) : num;
				} else active = false;
				if (active) {
					if (this._isArray(symbol) && this._isString(symbol[0])) {
						symbol[1] = (this._hasExist(symbol[1]) && 1 === symbol[1].toString().length) ? ' ' : '';

						return (this._isString(symbol[2]) && this._strAbsolute(symbol[2], 'last')) ? results[0].concat(results[1], symbol[1], symbol[0]) : symbol[0].concat(symbol[1], results[0], results[1]);
					}

					return results.join('');
				}
			}
		}

		return 0;
	}

	// TODO: Get info of currency [class WbRegion]
	/**
	 * @see {@link getInfoCurrency Get info of currency}
	 * @function globalThis.using.region.getInfoCurrency(currency);
	 * @param {number|Currency} currency 
	 * @returns {{ "number": number, "separate": string, "decimal": string, "tenths": integer, "symbol": [null, '', null] }}
	 * @description
	 * *************************************
	 * + `currency` : number | numberString | currency
	 * -------------------------------------
	 * @example
	 * + [null, "", " ", "1.25", 1000, 3.25, "5,25", "100,000.00", "100 000.00", "100,000,000.00", "100 000 000.00", "100.000.000,00", "100.000.000 00", "$100,000,000.00", "100 000 000.00$", "$100 000 000.00", "$ 100 000 000.00", "vnd 100.000.000,00", "100.000.000 00 vnd", "$1.25", "$ 1.25", "5,25$", "5,25 $", "$1000", "1000vnd", "1.000", "1.0005", 1.004, "1.004", "2.00", "2.1", "2.02", "2.003", 2.003, "3.000", 3.000, "4,000.003", "4000.003", 4000.003, 400.003].forEach(val => globalThis.using.region.getInfoCurrency(val));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	getInfoCurrency = currency => {
		const number = this._isNumber(currency), obj = { number: null, separate: null, decimal: null, tenths: 0, symbol: [null, '', null] };

		if (number[0]) {
			const list = this._strRegExp(currency, /[.]/g)[0] ? currency.toString().split('.') : [];

			if (this._isArray(list)) {				
				obj.decimal = '.';
				obj.tenths = list[1].length;
			}

			obj.number = number[1];

			return obj;
		}
		if (this._isString(currency)) {
			currency = currency.trim();
			const list = this._strRegExp(currency, /(?!(\s|[0-9,.]))(.)/g, true);

			if (list[0]) {
				for (const at of list[2]) this._isString(obj.symbol[0]) ? (obj.symbol[0] += currency[at]) : (obj.symbol[0] = currency[at]);
				if (this._isString(obj.symbol[0])) if (0 === list[2][0]) {
					if (!this._isString(currency[list[2][list[2].length - 1] + 1])) obj.symbol[1] = currency[list[2][list[2].length - 1] + 1];
					obj.symbol[2] = 'first';
				} else {
					if (!this._isString(currency[list[2][0] - 1])) obj.symbol[1] = currency[list[2][0] - 1];
					obj.symbol[2] = 'last';
				}
				currency = currency.replaceAll(obj.symbol[0], '').trim();
			}

			const check = this._strRegExp(currency, /(\s|[,.])/g, true), num = this.currency2Number(currency);

			if (check[0]) {
				const mark = currency[check[2][0]];

				if (1 === check[1]) {
					if (999 < num) {
						obj.number = num;
						obj.separate = mark;
					} else {
						obj.number = this._strAbsolute(mark, ',') ? this.currency2Number(this._strSlice(currency, check[2][0], '.')) : num;
						obj.decimal = mark;
						obj.tenths = currency.slice(check[2][0]).length - 1;
					}
				} else {
					const endMark = currency[check[2][check[2].length - 1]];

					if (this._strAbsolute(mark, endMark)) {
						obj.number = num;
						obj.separate = mark;
					} else {
						const strNumber = (this._strAbsolute(mark, '.') && this._strAbsolute(endMark, ',')) ? this.number2Currency(currency) : this._strAbsolute(endMark, ',') ? this._strSlice(currency, check[2][check[2].length - 1], '.') : null;

						obj.number = this._isString(strNumber) ? this.currency2Number(strNumber) : this._strRegExp(endMark, /\s/g)[0] ? this.currency2Number(currency.slice(0, check[2][check[2].length - 1]).replaceAll(currency[check[2][0]], '')) : num;
						obj.separate = mark;
						obj.decimal = endMark;
						obj.tenths = currency.slice(check[2][check[2].length - 1]).length - 1;
					}
				}
			} else obj.number = num;

			return obj;
		}

		return {}
	}

	// TODO: Convert the number to digit 9 -> 09 [class WbRegion]
	/**
	 * @see {@link number2Digit Convert the number to digit 9 -> 09}
	 * @function globalThis.using.region.number2Digit(number);
	 * @param {integer} number 
	 * @returns {string}
	 * @description
	 * *************************************
	 * + `number` : 0 <= number <= 10
	 * -------------------------------------
	 * @example
	 * + globalThis.using.region.number2Digit(9);
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	number2Digit = number => {
		const num = this._isNumber(number);

		return (num[0] && 0 <= num[1] && num[1] < 10) ? `0${num[1]}` : '00';
	}

	// TODO: Convert the null to zero digit [class WbRegion]
	/**
	 * @see {@link null2Digit Convert the null to zero digit}
	 * @function globalThis.using.region.null2Digit([number = '0']);
	 * @param {number} [number]
	 * @returns {string}
	 * @description
	 * *************************************
	 * + `number` : null | number
	 * -------------------------------------
	 * @example
	 * + globalThis.using.region.null2Digit();
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	null2Digit = (number = '0') => this._isNumber(number)[0] ? number.toString().trim() : '0';

	// TODO: Make up/down number | currency counter [class WbRegion]
	/**
	 * @see {@link countDigits Make up/down number | currency counter}
	 * @function globalThis.using.region.countDigits(start, [end], [jump = 1], [timer = 0]);
	 * @param {number|Currency|[]} start
	 * @param {number|Currency|[]} [end]
	 * @param {number|Currency|[]} [jump]
	 * @param {milisecond} [timer]
	 * @returns {{"exe": (...) => void|[(...) => void, ...Function[]]}}
	 * @description
	 * *************************************
	 * + `start` & `end` : number | currency | [number, currency]
	 * 	- `start` < `end` : count up at start to end
	 * 	- `start` > `end` : count down at start to end
	 * 	- `end` = null    : count down at start to zero
	 * 		* `start` & `end`          : MUST be same dataTyped
	 * + `jump`		     : number | currency | [number, currency]
	 * 	- `jump`-[empty]  : default is 1 | [1, 1, ....]
	 * 		* `jump` & `start` & `end` : MUST be same dataTyped & length of array
	 * + `timer`         : milisecond
	 * + `fns`		     : fn | [fn1, fn2, ...]
	 * -------------------------------------
	 * @example
	 * + globalThis.using.region.countDigits(100000, 101000).exe((...up) => console.log(up));
	 * + globalThis.using.region.countDigits(100000, 101000, 20).exe((...up) => console.log(up));
	 * + globalThis.using.region.countDigits("100,000.00", "150,000.00", 3000).exe((...up) => console.log(up));
	 * + globalThis.using.region.countDigits(101000, 100000).exe((...down) => console.log(down));
	 * + globalThis.using.region.countDigits([100000, "100,000.00", 101000], [101000, "150,000.00", 100000], 1000).exe((...up) => console.log(up), (...up) => console.log(up), (...down) => console.log(down));
	 * + globalThis.using.region.countDigits([1, "$100,000.00", 40], [20, "$150,000.00", 10], [3, "$5,000.00", 2], 1000).exe((...up) => console.log(up), (...up) => console.log(up), (...down) => console.log(down));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	countDigits = (start, end, jump = 1, timer = 0) => {
		const isStart2End = (this._hasExist(start) && this._hasExist(end)) ? true : this._hasExist(start) ? false : null;

		if (this._isBoolean(isStart2End)) return {
			/**
			 * 
			 * @param  {...Function} fns 
			 */
			exe: (...fns) => {
				const isList = (this._isArray(start) && this._isArray(end)), setJump = (() => {
					const getJump = val => {
						const isNum = this._isNumber(val);

						if (isNum[0]) return isNum[1];
						if (this._isString(val)) {
							const info = this.getInfoCurrency(val);
							if (this._isNumber(info.number)[0]) return info.number;
						}

						return 1;
					};

					if (isList && start.length === end.length) {
						// eslint-disable-next-line no-unused-vars
						if (this._isArray(jump)) return this._arrMap(start, (_, index) => getJump(jump[index]));

						const value = getJump(jump);

						return this._arrMap(start, () => value);
					}

					return getJump(jump);
				})(), setTimer = (() => {
					const isNum = this._isNumber(timer);

					return (isNum[0] && -1 < isNum[1]) ? isNum[1] : 0;
				})(), getDigit = digit => {
					if (this._isArray(digit)) return this._arrMap(digit, value => getDigit(value));

					const number = this._isNumber(digit);

					if (number[0]) return [false, number[1]];
					if (this._isString(digit)) {
						const info = this.getInfoCurrency(digit);

						if (this._isNumber(info.number)[0]) return [true, info.number, info.separate, info.decimal, info.tenths, info.symbol];
					}

					return [];
				}, counter = (first, last, vJump, fn) => {
					if (this._isNumber(first[1])[0] && this._isNumber(last[1])[0]) {
						const player = { play: true }; Object.seal(player);
						const isBool = (first[0] && last[0]), condition = (first[1] < last[1]), setCounter = () => {
							let stop = false;

							if (condition) {
								first[1] += vJump;
								if (first[1] >= last[1]) stop = true;
							} else {
								first[1] -= vJump;
								if (first[1] <= last[1]) stop = true;
							}
							if (stop) first[1] = last[1];

							return [first[1], stop];
						}, interval = setInterval(() => {
							if (this._isBoolean(player.play) && player.play) {
								const getCounter = setCounter();

								fn(isBool ? this.number2Currency(getCounter[0], first[2], first[3], first[4], first[5]) : getCounter[0], player);
								if (getCounter[1] || first[1] === last[1]) clearInterval(interval);
							} else player.play = false;
						}, setTimer);
					}
				};

				if (isStart2End) {
					// start up to end
					if (isList ? (start.length === end.length) : ((this._isString(start) || this._isNumber(start)[0]) && (this._isString(end) || this._isNumber(end)[0]))) {
						this.sow([getDigit(start), getDigit(end)]).reap('all').then(res => {
							const [sValue, eValue] = res;

							isList ? this._arrEach(sValue, (value, index) => {
								if (this._isArray(value) && this._isArray(eValue[index]) && this._isFunction(fns[index])) counter(value, eValue[index], setJump[index], fns[index]);
							}) : counter(sValue, eValue, setJump, fns[0]);
						});
					}
				} else {
					const getCounter = (value, fn) => {
						if (this._isFunction(fn)) {
							const first = getDigit(value);

							if (this._isArray(first)) counter(first, [first[0], 0], setJump, fn);
						}
					};

					this._isArray(start) ? this._arrEach(start, (value, index) => getCounter(value, fns[index])) : getCounter(start, fns[0]);
				}
			}
		};

		return { exe: () => { } };
	}

	// TODO: Get default options datetime [class WbRegion]
	/**
	 * @see {@link getDefaultDateTime Get default options datetime}
	 * @function globalThis.using.region.getDefaultDateTime();
	 * @returns {{}}
	 * *************************************
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	getDefaultDateTime = () => {
		const defaultLocales = WbRegion.#regions.locale, locales = this._isArray(defaultLocales) ? defaultLocales : this.getDefaultRegion(), dateTime = new Intl.DateTimeFormat(locales[0]);

		return dateTime.resolvedOptions();
	}

	// TODO: Set options datetime [class WbRegion]
	/**
	 * @see {@link setDateTime Set options datetime}
	 * @function globalThis.using.region.setDateTime(options = {});
	 * @param {object} options 
	 * @returns {boolean}
	 * @description
	 * *************************************
	 * + `options` : { year: null, month: null, day: null, dateStyle: "full", timeStyle: "long", timeZone: "Australia/Sydney" } | ...
	 * -------------------------------------
	 * @example
	 * + globalThis.using.region.setDateTime({ year: null, month: null, day: null, dateStyle: "full", timeStyle: "long", timeZone: "Australia/Sydney" });
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	setDateTime = (options = {}) => {
		if (this._isObject(options)) {
			const object = {}, listKey = ['dateStyle', 'timeStyle', 'calendar', 'dayPeriod', 'numberingSystem', 'localeMatcher', 'timeZone', 'hour12', 'hourCycle', 'formatMatcher', 'weekday', 'year', 'month', 'day', 'hour', 'minute', 'second', 'fractionalSecondDigits', 'timeZoneName'];

			this._arrEach(options, (value, key) => {
				if (this._arrHasValue(listKey, key)[0] && (null === value || this._isString(value) || (this._strAbsolute(key, 'hour12') && this._isBoolean(value)))) Object.assign(object, { [key]: value });
			});
			if (this._isObject(object)) {
				const regions = WbRegion.#regions;

				if (!this._isArray(regions.locale)) regions.locale = this.getDefaultRegion();
				if (!this._isObject(regions.datetime)) regions.datetime = this.getDefaultDateTime();
				Object.assign(regions.datetime, { ...object });
				for (const getNull of Object.values(regions.datetime)) if (null === getNull) this._arrDeletebyValue(regions.datetime, null);

				return true;
			}
		}

		return false;
	}

	//TODO: Get datetime format [class WbRegion]
	/**
	 * @see {@link getDateTimeFormat Get datetime format}
	 * @function globalThis.using.region.getDateTimeFormat([formats = []], [locale = null], [display = {}]);
	 * @param {Date|timestamp|[]} [formats]
	 * @param {string} [locale]
	 * @param {object} [display]
	 * @returns {{ "names": [stringDate, ...], "datetimes": [Date, ...], "timestamps": [timestamp, ...], "methods": Intl.DateTimeFormat }}
	 * @description
	 * *************************************
	 * + `formats` : datetime | timestamp | [datetime, timestamp, ...] 
	 * + `locale`  : string-["de-DE", "ja-JP", "zh-Hans-CN-u-nu-hanidec", ....]
	 * + `display` : object-{ weekday: "long", year: "numeric", month: "long", day: "numeric" }
	 * -------------------------------------
	 * @example
	 * const timestamp = 1338483600000, date1 = new Date(2012, 5), date2 = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
	 * + globalThis.using.region.getDateTimeFormat();
	 * + globalThis.using.region.getDateTimeFormat(timestamp);
	 * + globalThis.using.region.getDateTimeFormat(date1);
	 * + globalThis.using.region.getDateTimeFormat(date2, "de-DE");
	 * + globalThis.using.region.getDateTimeFormat([date1, date2], "zh-Hans-CN-u-nu-hanidec");
	 * + globalThis.using.region.getDateTimeFormat(date1, "ja-JP", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
	 * + globalThis.using.region.getDateTimeFormat(date2, "en-AU", { hour: "numeric", minute: "numeric", second: "numeric", timeZone: "Australia/Sydney", timeZoneName: "short" });
	 * + globalThis.using.region.getDateTimeFormat([date1, date2], "en-GB", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: false, timeZone: "America/Los_Angeles" });
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	getDateTimeFormat = (formats = [], locale = null, display = {}) => {
		/**
		 * 1. format : co 
		 * 	+ `display`.timeZone : co    => lay timeZone nay
		 * 	+ `display`.timeZone : khong => tra ve format khong timeZone
		 * 2. format : khong
		 * 	+ `display`.timeZone : co    => lay timeZone nay
		 * 	+ `display`.timeZone : khong => lay timeZone mac dinh
		 */
		const list = this._isArray(formats) ? formats : this._isDate(formats)[0] ? [formats] : [], dateTimeFormat = (() => {
			const datetime = this.getUserAgent().dateTimeFormat;

			if (!this._isString(locale)) locale = this._isString(datetime.locale) ? datetime.locale : this.getDefaultRegion()[0];
			if (!this._isObject(display)) display = datetime;

			return new Intl.DateTimeFormat(locale, display);
		})();

		if (this._isArray(list)) {
			const names = [], datetimes = [], timestamps = [];

			for (const value of list) {
				let name = null, datetime = null, timestamp = null;
				const isDate = this._isDate(value, display.timeZone);

				if (isDate[0]) try {
					name = dateTimeFormat.format(new Date(value)); datetime = isDate[1]; timestamp = isDate[2];
				} catch {
					name = value;
				}
				names.push(name); datetimes.push(datetime); timestamps.push(timestamp);
			}

			return { names: names, datetimes: datetimes, timestamps: timestamps, methods: dateTimeFormat };
		}
		if (!this._isArray(formats)) {
			const isDate = this._isDate(Date.now(), display.timeZone);

			if (isDate[0]) return { names: [dateTimeFormat.format(isDate[1])], datetimes: [isDate[1]], timestamps: [isDate[2]], methods: dateTimeFormat };
		}

		return { names: null, datetimes: null, timestamps: null, methods: null };
	}

	//TODO: Get datetime model [class WbRegion]
	/**
	 * @see {@link getDateTimeModel Get datetime model}
	 * @function globalThis.using.region.getDateTimeModel();
	 * @returns {null|string}
	 * *************************************
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	getDateTimeModel = () => {
		let now = this.getDateTimeFormat();

		if (this._isObject(now) && this._isArray(now.names)) {
			const object = {}, dateTime = now.datetimes[0];

			if (dateTime.getDate() < 13) {
				dateTime.setDate(13);
				now = this.getDateTimeFormat(dateTime);
			}
			for (const obj of now.methods.formatToParts(dateTime)) Object.assign(object, { [obj.type]: obj.value });
			if (this._isString(object.literal)) {
				const list = now.names[0].split(object.literal);

				if (this._isArray(list)) {
					this._arrEach({ day: 'dd', month: 'mm', year: 'yyyy' }, (char, key) => {
						const bool = this._arrHasValue(list, object[key], true);

						if (bool[0]) list[bool[1][0]] = char;
					});

					return list.join(object.literal);
				}
			}
		}

		return null;
	}

	//TODO: Change datetime by number-day [class WbRegion]
	/**
	 * @see {@link changeDateTime Change datetime by number-day}
	 * @function globalThis.using.region.changeDateTime(num, [datetime], [display = {}]);
	 * @param {number} num
	 * @param {Date|timestamp} [datetime]
	 * @param {object} [display]
	 * @returns {{ "names": stringDatetime, "datetimes": Date, "timestamps": timestamp }}
	 * @description
	 * *************************************
	 * + `num`      : number
	 * + `datetime` : "stringDateTime" | timestamp | datetime
	 * + `display`  : { dateStyle: "full", timeStyle: "long" }
	 * -------------------------------------
	 * 1. have datetime    :
	 * 	+ +4 days from datetime : globalThis.using.region.changeDateTime(4, datetime);
	 * 	+ -4 days from datetime : globalThis.using.region.changeDateTime(-4, datetime);
	 * 2. have no datetime :
	 * 	+ +4 days from now      : globalThis.using.region.changeDateTime(4);
	 * 	+ -4 days from now      : globalThis.using.region.changeDateTime(-4);
	 * -------------------------------------
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	changeDateTime = (num, datetime = null, display = {}) => {
		const numDay = this._isNumber(num);

		if (numDay[0]) {
			const isDate = this._isDate(datetime);

			if (isDate[0]) datetime = isDate[2];

			const getDate = this.getDateTimeFormat(datetime, null, display);

			if (this._isArray(getDate.names)) {
				const setDate = getDate.datetimes[0];

				setDate.setTime(getDate.timestamps[0] + numDay[1] * 24 * 60 * 60 * 1000);

				return { names: this._isObject(display) ? getDate.methods.format(setDate) : setDate.toString(), datetimes: setDate, timestamps: setDate.getTime() };
			}
		}

		return { names: null, datetimes: null, timestamps: null };
	}

	#setDurationDateTime(start, end) {
		let list = [false, null, null];

		if (this._hasExist(start) && this._hasExist(end)) {
			const sDate = this._isDate(start), eDate = this._isDate(end);

			if (sDate[0] && eDate[0] && sDate[2] <= eDate[2]) list = [true, [sDate[1], sDate[2]], [eDate[1], eDate[2]]];
		} else if (this._hasExist(start) && !this._hasExist(end)) {
			const sDate = this._isDate(start);

			if (sDate[0]) {
				const eDate = new Date(sDate[1].getFullYear(), sDate[1].getMonth() + 1, 0, sDate[1].getHours(), sDate[1].getMinutes(), sDate[1].getSeconds(), sDate[1].getMilliseconds());

				if (sDate[2] <= eDate.getTime()) list = [true, [sDate[1], sDate[2]], [eDate, eDate.getTime()]];
			}
		} else if (!this._hasExist(start) && this._hasExist(end)) {
			const eDate = this._isDate(end);

			if (eDate[0]) {
				const nDate = this.getDateTimeFormat(), sDate = (eDate[2] < nDate.timestamps[0]) ? new Date(eDate[1].getFullYear(), eDate[1].getMonth(), 1, eDate[1].getHours(), eDate[1].getMinutes(), eDate[1].getSeconds(), eDate[1].getMilliseconds()) : new Date(nDate.datetimes[0].getFullYear(), nDate.datetimes[0].getMonth(), nDate.datetimes[0].getDate(), nDate.datetimes[0].getHours(), nDate.datetimes[0].getMinutes(), nDate.datetimes[0].getSeconds(), nDate.datetimes[0].getMilliseconds());
				if (sDate.getTime() <= eDate[2]) list = [true, [sDate, sDate.getTime()], [eDate[1], eDate[2]]];
			}
		} else {
			const nDate = this.getDateTimeFormat(), sDate = new Date(nDate.datetimes[0].getFullYear(), nDate.datetimes[0].getMonth(), 1, nDate.datetimes[0].getHours(), nDate.datetimes[0].getMinutes(), nDate.datetimes[0].getSeconds(), nDate.datetimes[0].getMilliseconds()), eDate = new Date(nDate.datetimes[0].getFullYear(), nDate.datetimes[0].getMonth() + 1, 0, nDate.datetimes[0].getHours(), nDate.datetimes[0].getMinutes(), nDate.datetimes[0].getSeconds(), nDate.datetimes[0].getMilliseconds());

			if (sDate.getTime() <= eDate.getTime()) list = [true, [sDate, sDate.getTime()], [eDate, eDate.getTime()]];
		}

		return list;
	}

	//TODO: Get duration date from startdate to enddate [class WbRegion]
	/**
	 * @see {@link getDurationDateTime Get duration date from startdate to enddate}
	 * @function globalThis.using.region.getDurationDateTime([start], [end]);
	 * @param {Date|timestamp} [start]
	 * @param {Date|timestamp} [end]
	 * @returns {[Date, ...Date[]]}
	 * @description
	 * *************************************
	 * + `start` & `end` : "stringDateTime" | timestamp | datetime
	 * -------------------------------------
	 * @example
	 * + 01[now]-31[now]             : globalThis.using.region.getDurationDateTime();
	 * + [now]-[Jul 01 2050]         : globalThis.using.region.getDurationDateTime(null, "Thu Jul 01 2050 22:52:42 GMT+0700 (Indochina Time)");
	 * + [Jun 01 2021]-[Jun 11 2021] : globalThis.using.region.getDurationDateTime(null, "Fri Jun 11 2021 22:51:54 GMT+0700 (Indochina Time)");
	 * + [Jun 11 2021]-[Jun 30 2021] : globalThis.using.region.getDurationDateTime("Fri Jun 11 2021 22:51:54 GMT+0700 (Indochina Time)");
	 * + [Jun 11 2021]-[Jul 01 2021] : globalThis.using.region.getDurationDateTime("Fri Jun 11 2021 22:51:54 GMT+0700 (Indochina Time)", "Thu Jul 01 2021 22:52:42 GMT+0700 (Indochina Time)");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	getDurationDateTime = (start, end) => {
		const duration = [], list = this.#setDurationDateTime(start, end);

		if (list[0] && list[1][1] <= list[2][1]) {
			let [getSDate, getSTimestamp] = list[1];

			while (getSTimestamp <= list[2][1]) {
				duration.push(getSDate);
				getSTimestamp += 24 * 60 * 60 * 1000;
				getSDate = this.getDateTimeFormat(getSTimestamp).datetimes[0];
			}
		}

		return duration;
	}

	//TODO: Get duration weekDay from startWeekDay to endWeekDay [class WbRegion]
	/**
	 * @see {@link getDurationWeekDay Get duration weekDay from startWeekDay to endWeekDay}
	 * @function globalThis.using.region.getDurationWeekDay([numStart], [numEnd], [display = {weekday: "long"}]);
	 * @param {number} [numStart]
	 * @param {number} [numEnd]
	 * @param {{"weekday": "short"|"long"}} [display]
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `numStart` & `numEnd` : null | 0 <= number <= 6
	 * 	- `numStart` : null => [0, `numEnd`]
	 * 	- `numEnd`   : null => [`numStart`, 6]
	 * -------------------------------------
	 * @example
	 * + globalThis.using.region.getDurationWeekDay();
	 * + globalThis.using.region.getDurationWeekDay(null, null, {weekday: "short"});
	 * + globalThis.using.region.getDurationWeekDay(null, null, {weekday: "long"});
	 * @example
	 * + globalThis.using.region.getDurationWeekDay(0, 6);
	 * + globalThis.using.region.getDurationWeekDay(1, 5, {weekday: "short"});
	 * + globalThis.using.region.getDurationWeekDay(2, 4, {weekday: "long"});
	 * @example
	 * + globalThis.using.region.getDurationWeekDay(null, 6);
	 * + globalThis.using.region.getDurationWeekDay(null, 6, {weekday: "short"});
	 * + globalThis.using.region.getDurationWeekDay(null, 6, {weekday: "long"});
	 * @example
	 * + globalThis.using.region.getDurationWeekDay(0, null);
	 * + globalThis.using.region.getDurationWeekDay(0, null, {weekday: "short"});
	 * + globalThis.using.region.getDurationWeekDay(0, null, {weekday: "long"});
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	getDurationWeekDay = (numStart, numEnd, display = { weekday: 'long' }) => {
		const object = {}, style = this._arrHasValue(['long', 'short'], display.weekday)[0] ? display.weekday : 'long', now = Date.now();

		for (const num of [...Array(7).keys()]) {
			const obj = this.changeDateTime(num, now, { weekday: style });

			Object.assign(object, { [obj.datetimes.getDay()]: obj.names });
		}
		if (this._isObject(object)) {
			const list = this._obj2Arr(object);

			if (this._hasExist(numStart) && this._hasExist(numEnd)) {
				numStart = this._isNumber(numStart); numEnd = this._isNumber(numEnd);
				if (numStart[0] && numEnd[0] && 0 <= numStart[1] && numStart[1] < numEnd[1] && numEnd[1] <= 6) return list.slice(numStart[1], numEnd[1] + 1);
			} else if (this._hasExist(numStart) || this._hasExist(numEnd)) {
				if (this._hasExist(numStart)) {
					numStart = this._isNumber(numStart);
					if (numStart[0] && 0 <= numStart[1] && numStart[1] < 6) return list.slice(numStart[1], 7);
				} else {
					numEnd = this._isNumber(numEnd);
					if (numEnd[0] && 0 < numEnd[1] && numEnd[1] <= 6) return list.slice(0, numEnd[1] + 1);
				}
			} else return list;
		}

		return [];
	}

	//TODO: Get duration month from startMonth to endMonth [class WbRegion]
	/**
	 * @see {@link getDurationMonth Get duration month from startMonth to endMonth}
	 * @function globalThis.using.region.getDurationMonth([numStart], [numEnd], [display = {month: "numeric"}]);
	 * @param {number} [numStart]
	 * @param {number} [numEnd]
	 * @param {{"month": "short"|"long"|"numeric"}} [display]
	 * @returns {[]}
	 * @description
	 * *************************************
	 * + `numStart` & `numEnd` : null | 0 <= number <= 12 
	 * 	- `numStart` : null => [0, `numEnd`]
	 * 	- `numEnd`   : null => [`numStart`, 12]
	 * -------------------------------------
	 * @example
	 * + globalThis.using.region.getDurationMonth();
	 * + globalThis.using.region.getDurationMonth(null, null, {month: "short"});
	 * + globalThis.using.region.getDurationMonth(null, null, {month: "long"});
	 * @example
	 * + globalThis.using.region.getDurationMonth(3, 8);
	 * + globalThis.using.region.getDurationMonth(3, 8, {month: "short"});
	 * + globalThis.using.region.getDurationMonth(3, 8, {month: "long"});
	 * @example
	 * + globalThis.using.region.getDurationMonth(null, 8);
	 * + globalThis.using.region.getDurationMonth(null, 8, {month: "short"});
	 * + globalThis.using.region.getDurationMonth(null, 8, {month: "long"});
	 * @example
	 * + globalThis.using.region.getDurationMonth(3, null);
	 * + globalThis.using.region.getDurationMonth(3, null, {month: "short"});
	 * + globalThis.using.region.getDurationMonth(3, null, {month: "long"});
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	getDurationMonth = (numStart, numEnd, display = { month: 'numeric' }) => {
		const dateTime = this.getUserAgent().dateTimeFormat,
			locale = this._isString(dateTime.locale) ? dateTime.locale : this.getDefaultRegion()[0],
			style = this._arrHasValue(['numeric', 'long', 'short'], display.month)[0] ? display.month : 'numeric',
			getFullYear = this.getDateTimeFormat().datetimes[0].getFullYear(),
			listMonth = this._arrMap([...Array(12).keys()], month => Intl.DateTimeFormat(locale, { month: style }).format(new Date(getFullYear, month)));

		if (this._hasExist(numStart) && this._hasExist(numEnd)) {
			numStart = this._isNumber(numStart); numEnd = this._isNumber(numEnd);
			if (numStart[0] && numEnd[0] && 1 <= numStart[1] && numStart[1] < numEnd[1] && numEnd[1] <= 12) return listMonth.slice(numStart[1] - 1, numEnd[1]);
		} else if (this._hasExist(numStart) || this._hasExist(numEnd)) {
			if (this._hasExist(numStart)) {
				numStart = this._isNumber(numStart);
				if (numStart[0] && 1 <= numStart[1] && numStart[1] < 12) return listMonth.slice(numStart[1] - 1, 12);
			} else {
				numEnd = this._isNumber(numEnd);
				if (numEnd[0] && 0 < numEnd[1] && numEnd[1] <= 12) return listMonth.slice(0, numEnd[1]);
			}
		} else return listMonth;

		return [];
	}

	//TODO: Convert date to stringDateISO [class WbRegion]
	/**
	 * @see {@link date2ISO Convert date to stringDateISO}
	 * @function globalThis.using.region.date2ISO(formats);
	 * @param {Date|timestamp|[]} formats
	 * @returns {null|DateISO|[]}
	 * @description
	 * *************************************
	 * + `formats` : stringDateTime | timestamp | datetime | [stringDateTime, timestamp, datetime, ...]
	 * -------------------------------------
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	date2ISO = formats => {
		const iso = [], list = this._isArray(formats) ? formats : (this._isString(formats) || this._isNumber(formats)[0] || this._isDate(formats)[0]) ? [formats] : [];

		if (this._isArray(list)) for (const value of list) {
			const isDate = this._isDate(value);

			if (isDate[0]) {
				const offsetMinutes = isDate[1].getTimezoneOffset(), offset = Math.abs(offsetMinutes), mark = (0 < offsetMinutes) ? '-' : '+',
					stringDate = `${isDate[1].getFullYear()}-${isDate[1].getMonth() + 1}-${isDate[1].getDate()}T${isDate[1].getHours()}:${isDate[1].getMinutes()}:${isDate[1].getSeconds()}${mark}${Math.floor(offset / 60)}:${Math.abs(offset % 60)}`;

				iso.push(stringDate.replace(/(\D)(\d)(?!\d)/g, '$10$2'));
			}
		}

		return this._isArray(iso) ? (1 < iso.length) ? iso : iso[0] : null;
	}

	//TODO: Convert stringDateISO to date [class WbRegion]
	/**
	 * @see {@link ISO2Date Convert stringDateISO to date}
	 * @function globalThis.using.region.ISO2Date(string);
	 * @param {DateISO|[]} string
	 * @returns {null|Date|[]}
	 * @description
	 * *************************************
	 * + `string` : "2023-01-08T20:46:55.279Z" | ["2023-01-08T20:46:55.279Z", "2023-02-08T20:46:55.279Z", "2023-03-08T20:46:55.279Z", "2023-03-09T21:31:58+07:00"]
	 * -------------------------------------
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	ISO2Date = string => {
		const list = [], array = this._isString(string) ? [string] : this._isArray(string) ? string : [];

		if (this._isArray(array)) {
			const setList = strDate => {
				const isDate = this._isDate(strDate);
				if (isDate[0]) list.push(isDate[1]);
			};

			for (const value of array) if (this._isString(value)) setList(this._strRegExp(value, /[+]/g)[0] ? value : value.slice(0, -1));
		}

		return this._isArray(list) ? (1 < list.length) ? list : list[0] : null;
	}

	//TODO: Make copy of datetime [class WbRegion]
	/**
	 * @see {@link cloneDateTime Make copy of datetime}
	 * @function globalThis.using.region.cloneDateTime(date);
	 * @param {Date|timestamp|DateISO} date
	 * @returns {null|Date}
	 * @description
	 * *************************************
	 * + `date` : timestamp | datetime | DateISO
	 * -------------------------------------
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	cloneDateTime = date => {
		const isDate = this._isDate(date);

		return isDate[0] ? this._isDate(this.date2ISO(isDate[2]))[1] : null;
	}

	#timeStringISO(start, end) {
		const list = [false, null, null], timeStringFormat = time => {
			if (this._isString(time) && this._strRelative(time, ':')) {
				const list = time.split(':');

				if (2 === list.length) list.push('00');
				if (list.every(number => this._isNumber(number)[0])) return list.join(':');
			}

			return null;
		}, sTime = timeStringFormat(start), eTime = timeStringFormat(end);
		if (this._isString(sTime) && this._isString(eTime)) {
			const [stringDate, stringTime] = this.date2ISO(this.getDateTimeFormat().timestamps[0]).split('T'),
				char = this._strRegExp(stringTime, /[+]/g)[0] ? '+' : '-', value = stringTime.split(char)[1],
				makeISO = time => stringDate.concat('T', time, char, value);

			list[0] = true;
			list[1] = makeISO(sTime);
			list[2] = makeISO(eTime);
		}

		return list;
	}

	//TODO: Make timeDiff in minutes from starttime to endtime [class WbRegion]
	/**
	 * @see {@link makeTimeDiffMinutes Make timeDiff in minutes from starttime to endtime}
	 * @function globalThis.using.region.makeTimeDiffMinutes(start, end);
	 * @param {stringTime|Date} start
	 * @param {stringTime|Date} end
	 * @returns {null|integer}
	 * @description
	 * *************************************
	 * + `start` & `end`  : stringTime | Date
	 * 	- `start` & `end` : MUST be same datatyped
	 * -------------------------------------
	 * @example
	 * + globalThis.using.region.makeTimeDiffMinutes("10:27", "22:52");
	 * + globalThis.using.region.makeTimeDiffMinutes("10:27:15", "22:52:42");
	 * + globalThis.using.region.makeTimeDiffMinutes("Tue Jun 15 2021 03:39:22 GMT+0700 (Indochina Time)", "Thu Jun 17 2021 03:41:48 GMT+0700 (Indochina Time)");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	makeTimeDiffMinutes = (start, end) => {
		const sDate = this._isDate(start), eDate = this._isDate(end);

		if (sDate[0] && eDate[0] && sDate[2] <= eDate[2]) {
			const list = this.#setDurationDateTime(sDate[1], eDate[1]);

			if (list[0]) return Math.abs(Math.round((list[2][1] - list[1][1]) / (60 * 1000)));
		} else {
			const iso = this.#timeStringISO(start, end);

			if (iso[0]) return this.makeTimeDiffMinutes(iso[1], iso[2]);
		}

		return null;
	}

	//TODO: Make timeSlots from starttime to endtime with minutes [class WbRegion]
	/**
	 * @see {@link makeTimeSlotsMinutes Make timeSlots from starttime to endtime with minutes}
	 * @function globalThis.using.region.makeTimeSlotsMinutes(start, end, [minutes]);
	 * @param {stringTime|Date} start
	 * @param {stringTime|Date} end
	 * @param {null|integer} [minutes]
	 * @returns {{ "names": [], "datetimes": [] }}
	 * @description
	 * *************************************
	 * + `start` & `end`   : stringTime | Date
	 * 	- `start` & `end`  : MUST be same datatyped & `start` < `end`
	 * + `minutes`         : null | 0 < number
	 * 	- `minutes`-[null] : `minutes`-[30] as default
	 * -------------------------------------
	 * @example
	 * + 30 minutes from now-[default] : globalThis.using.region.makeTimeSlotsMinutes("10:27:15", "22:52:42");
	 * + 10 minutes from now           : globalThis.using.region.makeTimeSlotsMinutes("10:30:15", "23:00:42", 10);
	 * + 30 minutes from 03:39:22      : globalThis.using.region.makeTimeSlotsMinutes("Tue Jun 15 2021 03:39:22 GMT+0700 (Indochina Time)", "Thu Jun 17 2021 03:41:48 GMT+0700 (Indochina Time)");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	makeTimeSlotsMinutes = (start, end, minutes) => {
		const names = [], datetimes = [], num = this._isNumber(minutes), sDate = this._isDate(start), eDate = this._isDate(end);

		minutes = num[0] ? (() => (0 < num[1]) ? num[1] : 30)() : 30;
		if (sDate[0] && eDate[0] && sDate[2] <= eDate[2]) {
			let getSDate = sDate[1], getSTimestamp = sDate[2];

			while (getSTimestamp <= eDate[2]) {
				names.push(getSDate.toTimeString().slice(0, 5));
				datetimes.push(getSDate);
				getSTimestamp += minutes * 60 * 1000;
				getSDate = this.getDateTimeFormat(getSTimestamp).datetimes[0];
			}

			return { names: names, datetimes: datetimes };
		}

		const iso = this.#timeStringISO(start, end);

		if (iso[0]) return this.makeTimeSlotsMinutes(iso[1], iso[2], minutes);

		return { names: null, datetimes: null };
	}

	//TODO: Change time by hours | minutes | seconds with default minutes [class WbRegion]
	/**
	 * @see {@link changeTime Change time by hours | minutes | seconds with default minutes}
	 * @function globalThis.using.region.changeTime([timer], [change = "minutes"], [start]);
	 * @param {number} [timer]
	 * @param {"hours"|"minutes"|"seconds"} [change]
	 * @param {Date} [start]
	 * @returns {{ "names": stringTime, "datetimes": Date }}
	 * @description
	 * *************************************
	 * + `timer`          : null | number
	 * 	- `timer`-[null]  : `timer`-[30] as default
	 * + `change`         : null | "hours" | "minutes" | "seconds"
	 * 	- `change`-[null] : `change`-["minutes"] as default
	 * + `start`          : null | Date | dateString
	 * 	- `start`-[null]  : `start`-[now] as default
	 * -------------------------------------
	 * @example
	 * + +30 minutes to now [default] : globalThis.using.region.changeTime();
	 * + +10 minutes to now           : globalThis.using.region.changeTime(10);
	 * + -10 minutes to now           : globalThis.using.region.changeTime(-10);
	 * + +14400 seconds to now        : globalThis.using.region.changeTime(14400, "seconds");
	 * + +10 minutes to 22:52:42      : globalThis.using.region.changeTime(10, null, "Thu Jul 01 2021 22:52:42 GMT+0700 (Indochina Time)");
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	changeTime = (timer, change = 'minutes', start) => {
		const list = (this._isString(start) || this._isNumber(start)[0]) ? this._isDate(start)
			: this._isDate(start)[0] ? [true, start, start.getTime()] : (() => {
				const sDate = this.getDateTimeFormat();

				return [true, sDate.datetimes[0], sDate.timestamps[0]];
			})();

		if (list[0]) {
			const num = this._isNumber(timer); timer = num[0] ? num[1] : 30;
			const interval = this._strAbsolute(change, 'hours') ? timer * 60 * 60 * 1000 : this._strAbsolute(change, 'seconds') ? timer * 1000 : timer * 60 * 1000,
				getSDate = this.getDateTimeFormat(list[2] + interval).datetimes[0];

			return { names: getSDate.toTimeString().slice(0, 8), datetimes: getSDate };
		}

		return { names: null, datetimes: null };
	}

	// TODO: Make time counter [class WbRegion]
	/**
	 * @see {@link countTime Make time counter}
	 * @function globalThis.using.region.countTime([start], [end]);
	 * @param {Date|timestamp|[]} [start]
	 * @param {Date|timestamp|[]} [end]
	 * @returns {{"exe": (...) => void|[(...) => void, ...Function[]]}}
	 * @description
	 * *************************************
	 * + `start` & `end` : "stringDateTime" | timestamp | datetime | ["stringDateTime", timestamp, datetime]
	 * 	- `start` < `end`        : count up at `start` to `end`
	 * 	- `start` > `end`        : count down at `start` to `end`
	 * 	- `start` = null         : count up at `zero` to `end`
	 * 	- `end` = null           : count down at `start` to `zero`
	 * 	- `start` = `end` = null : count down at `timeNow` to `zero`
	 * 	- `start` & `end`        : MUST be same dataTyped
	 * + `fns`		     : fn | [fn1, fn2, ...]
	 * -------------------------------------
	 * @example
	 * + globalThis.using.region.countTime().exe((...down) => console.log(down));
	 * @example
	 * + globalThis.using.region.countTime("10:27", "22:52").exe((...up) => console.log(up));
	 * + globalThis.using.region.countTime("10:27:15", "22:52:42").exe((...up) => console.log(up));
	 * + globalThis.using.region.countTime("Tue Jun 15 2021 03:39:22 GMT+0700 (Indochina Time)", "Thu Jun 17 2021 03:41:48 GMT+0700 (Indochina Time)").exe((...up) => console.log(up));
	 * + globalThis.using.region.countTime(["10:27", "10:27:15", "Tue Jun 15 2021 03:39:22 GMT+0700 (Indochina Time)"], ["22:52", "22:52:42", "Thu Jun 17 2021 03:41:48 GMT+0700 (Indochina Time)"]).exe((...up) => console.log(up), (...up) => console.log(up), (...up) => console.log(up));
	 * @example
	 * + globalThis.using.region.countTime("22:52", "10:27").exe((...down) => console.log(down));
	 * + globalThis.using.region.countTime("22:52:42", "10:27:15").exe((...down) => console.log(down));
	 * + globalThis.using.region.countTime("Thu Jun 17 2021 03:41:48 GMT+0700 (Indochina Time)", "Tue Jun 15 2021 03:39:22 GMT+0700 (Indochina Time)").exe((...down) => console.log(down));
	 * + globalThis.using.region.countTime(["22:52", "22:52:42", "Thu Jun 17 2021 03:41:48 GMT+0700 (Indochina Time)"], ["10:27", "10:27:15", "Tue Jun 15 2021 03:39:22 GMT+0700 (Indochina Time)"]).exe((...down) => console.log(down), (...down) => console.log(down), (...down) => console.log(down));
	 * @example
	 * + globalThis.using.region.countTime(null, "10:27").exe((...up) => console.log(up));
	 * + globalThis.using.region.countTime(null, "10:27:15").exe((...up) => console.log(up));
	 * + globalThis.using.region.countTime(null, "Tue Jun 15 2021 03:39:22 GMT+0700 (Indochina Time)").exe((...up) => console.log(up));
	 * + globalThis.using.region.countTime(null, ["10:27", "10:27:15", "Tue Jun 15 2021 03:39:22 GMT+0700 (Indochina Time)"]).exe((...up) => console.log(up), (...up) => console.log(up), (...up) => console.log(up));
	 * + globalThis.using.region.countTime([null, null, null], ["10:27", "10:27:15", "Tue Jun 15 2021 03:39:22 GMT+0700 (Indochina Time)"]).exe((...up) => console.log(up), (...up) => console.log(up), (...up) => console.log(up));
	 * @example
	 * + globalThis.using.region.countTime("10:27").exe((...down) => console.log(down));
	 * + globalThis.using.region.countTime("10:27:15").exe((...down) => console.log(down));
	 * + globalThis.using.region.countTime("Tue Jun 15 2021 03:39:22 GMT+0700 (Indochina Time)").exe((...down) => console.log(down));
	 * + globalThis.using.region.countTime(["10:27", "10:27:15", "Tue Jun 15 2021 03:39:22 GMT+0700 (Indochina Time)"]).exe((...down) => console.log(down), (...down) => console.log(down), (...down) => console.log(down));
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	countTime = (start, end) => {
		const rootCountTime = (start, end) => {
			const setFullTime = (hours, minutes, seconds, date) => {
				date.setHours(hours); date.setMinutes(minutes); date.setSeconds(seconds);

				return date;
			}, getDate = param => {
				const isDate = this._isDate(param);

				return isDate[0] ? isDate[1] : this._isString(param) ? (() => {
					if (this._isString(param)) {
						const mark = this._strRegExp(param, /[:]/g, true);

						if (mark[0]) {
							const list = param.trim().split(':');

							if (list.every(num => this._isNumber(num)[0])) { // time
								const nDate = this.getDateTimeFormat().datetimes[0];

								return (1 < mark[1]) ? setFullTime(list[0], list[1], list[2], nDate) : setFullTime('00', list[0], list[1], nDate);
							}
						}
					}

					return null;
				})() : this._isArray(param) ? this._arrMap(param, value => getDate(value)) : (null === param) ? setFullTime('00', '00', '00', this.getDateTimeFormat().datetimes[0]) : null;
			}, getTime = param => this._isArray(param) ? this._arrMap(param, date => setFullTime('00', '00', '00', this.cloneDateTime(date))) : setFullTime('00', '00', '00', this.cloneDateTime(param));

			if (this._hasExist(start) && this._hasExist(end)) {
				if (this._isArray(start) && this._isArray(end) && start.length === end.length) {
					const sList = [], eList = [];

					this._arrEach(start, (date, index) => {
						const list = rootCountTime(date, end[index]);

						sList.push(list[0]); eList.push(list[1]);
					});

					return [sList, eList];
				}

				return ((this._isString(start) || this._isNumber(start)[0]) && (this._isString(end) || this._isNumber(end)[0])) ? [getDate(start), getDate(end)] : (this._isDate(start)[0] && this._isDate(end)[0]) ? [start, end] : [null, null];
			}
			if (this._hasExist(start)) {
				// stringDate | Date | timestamp // time | array | null
				start = getDate(start);

				return rootCountTime(start, getTime(start));
			}
			if (this._hasExist(end)) {
				// stringDate | timestamp // time | array
				end = getDate(end);

				return rootCountTime(getTime(end), end);
			}

			return rootCountTime(this.getDateTimeFormat().datetimes[0]);
		}, list = rootCountTime(start, end);
		if (this._hasExist(list[0]) && this._hasExist(list[1])) return {
			/**
			 * 
			 * @param  {...Function} fns 
			 */
			exe: (...fns) => {
				const counter = (first, last, fn) => {
					const breaker = { break: false }, sDate = this._isDate(first), eDate = this._isDate(last);

					if (sDate[0] && eDate[0] && this._isFunction(fn)) ((second, date, sTimestamp, eTimestamp) => {
						Object.seal(breaker);

						const doit = (second, setDate, interval) => {
							const change = this.changeTime(second, 'seconds', setDate);

							if (this._isString(change.names)) fn(change.names, breaker);

							return [change.datetimes, interval += second * 1000];
						};
						let getDoit = doit(second, date, sTimestamp);

						if (!this._strAbsolute(getDoit[1], eTimestamp)) {
							const interval = setInterval(() => {
								getDoit = doit(second, getDoit[0], getDoit[1]);
								if (getDoit[1] === eTimestamp || breaker.break) clearInterval(interval);
							}, 1000);
						}
					})((sDate[2] <= eDate[2]) ? 1 : -1, sDate[1], sDate[2], eDate[2]);
				};

				(this._isArray(list[0]) && this._isArray(list[1]) && list[0].length === list[1].length) ? this._arrEach(list[0], (date, index) => {
					counter(date, list[1][index], fns[index]);
				}) : counter(list[0], list[1], fns[0]);
			}
		};

		return { exe: () => { } };
	}

	//TODO: Get userAgent info [class WbRegion]
	/**
	 * @see {@link getUserAgent Get userAgent info}
	 * @function globalThis.using.region.getUserAgent();
	 * @returns {{"language": string, "userAgent": string, "numberFormat": Intl.ResolvedNumberFormatOptions, "dateTimeFormat": {}}|null}
	 * *************************************
	 * @example
	 * + globalThis.using.io.switchHelpDev(true);
	 * + globalThis.using.io.getGuide();
	 */
	getUserAgent = () => {
		if (self.navigator) {
			const regions = WbRegion.#regions,
				defaultLocales = regions.locale, locales = this._isArray(defaultLocales) ? defaultLocales : this.getDefaultRegion(),
				defaultDatetime = regions.datetime, datetime = this._isObject(defaultDatetime) ? defaultDatetime : this.getDefaultDateTime();

			return {
				language: locales[1],
				userAgent: self.navigator.userAgent,
				numberFormat: this.#numberSystem(locales[0]).resolvedOptions(),
				dateTimeFormat: datetime
			};
		}

		return null;
	}
}

if (undefined === self.using) self.using = {};
self.using.io = new WbTool;
self.using.future = new WbFuture;
self.using.region = new WbRegion;