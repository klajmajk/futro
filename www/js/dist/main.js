/**
 * dirPagination - AngularJS module for paginating (almost) anything.
 *
 *
 * Credits
 * =======
 *
 * Daniel Tabuenca: https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ
 * for the idea on how to dynamically invoke the ng-repeat directive.
 *
 * I borrowed a couple of lines and a few attribute names from the AngularUI Bootstrap project:
 * https://github.com/angular-ui/bootstrap/blob/master/src/pagination/pagination.js
 *
 * Copyright 2014 Michael Bromley <michael@michaelbromley.co.uk>
 */

(function() {

    /**
     * Config
     */
    var moduleName = 'angularUtils.directives.dirPagination';
    var DEFAULT_ID = '__default';

    /**
     * Module
     */
    var module;
    try {
        module = angular.module(moduleName);
    } catch(err) {
        // named module does not exist, so create one
        module = angular.module(moduleName, []);
    }

    module.directive('dirPaginate', ['$compile', '$parse', 'paginationService', function($compile, $parse, paginationService) {

        return  {
            terminal: true,
            multiElement: true,
            priority: 5000, // This setting is used in conjunction with the later call to $compile() to prevent infinite recursion of compilation
            compile: function dirPaginationCompileFn(tElement, tAttrs){

                var expression = tAttrs.dirPaginate;
                // regex taken directly from https://github.com/angular/angular.js/blob/master/src/ng/directive/ngRepeat.js#L211
                var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

                var filterPattern = /\|\s*itemsPerPage\s*:[^|]*/;
                if (match[2].match(filterPattern) === null) {
                    throw 'pagination directive: the \'itemsPerPage\' filter must be set.';
                }
                var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');
                var collectionGetter = $parse(itemsPerPageFilterRemoved);

                // If any value is specified for paginationId, we register the un-evaluated expression at this stage for the benefit of any
                // dir-pagination-controls directives that may be looking for this ID.
                var rawId = tAttrs.paginationId || DEFAULT_ID;
                paginationService.registerInstance(rawId);

                return function dirPaginationLinkFn(scope, element, attrs){

                    // Now that we have access to the `scope` we can interpolate any expression given in the paginationId attribute and
                    // potentially register a new ID if it evaluates to a different value than the rawId.
                    var paginationId = $parse(attrs.paginationId)(scope) || attrs.paginationId || DEFAULT_ID;
                    paginationService.registerInstance(paginationId);

                    var repeatExpression;
                    var idDefinedInFilter = !!expression.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);
                    if (paginationId !== DEFAULT_ID && !idDefinedInFilter) {
                        repeatExpression = expression.replace(/(\|\s*itemsPerPage\s*:[^|]*)/, "$1 : '" + paginationId + "'");
                    } else {
                        repeatExpression = expression;
                    }

                    // Add ng-repeat to the dom element
                    if (element[0].hasAttribute('dir-paginate-start') || element[0].hasAttribute('data-dir-paginate-start')) {
                        // using multiElement mode (dir-paginate-start, dir-paginate-end)
                        attrs.$set('ngRepeatStart', repeatExpression);
                        element.eq(element.length - 1).attr('ng-repeat-end', true);
                    } else {
                        attrs.$set('ngRepeat', repeatExpression);
                    }

                    var compiled =  $compile(element, false, 5000); // we manually compile the element again, as we have now added ng-repeat. Priority less than 5000 prevents infinite recursion of compiling dirPaginate

                    var currentPageGetter;
                    if (attrs.currentPage) {
                        currentPageGetter = $parse(attrs.currentPage);
                    } else {
                        // if the current-page attribute was not set, we'll make our own
                        var defaultCurrentPage = paginationId + '__currentPage';
                        scope[defaultCurrentPage] = 1;
                        currentPageGetter = $parse(defaultCurrentPage);
                    }
                    paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);

                    if (typeof attrs.totalItems !== 'undefined') {
                        paginationService.setAsyncModeTrue(paginationId);
                        scope.$watch(function() {
                            return $parse(attrs.totalItems)(scope);
                        }, function (result) {
                            if (0 <= result) {
                                paginationService.setCollectionLength(paginationId, result);
                            }
                        });
                    } else {
                        scope.$watchCollection(function() {
                            return collectionGetter(scope);
                        }, function(collection) {
                            if (collection) {
                                paginationService.setCollectionLength(paginationId, collection.length);
                            }
                        });
                    }

                    // Delegate to the link function returned by the new compilation of the ng-repeat
                    compiled(scope);
                };
            }
        }; 
    }]);

    module.directive('dirPaginationControls', ['paginationService', 'paginationTemplate', function(paginationService, paginationTemplate) {

        var numberRegex = /^\d+$/;

        /**
         * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the
         * links used in pagination
         *
         * @param currentPage
         * @param rowsPerPage
         * @param paginationRange
         * @param collectionLength
         * @returns {Array}
         */
        function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i ++;
            }
            return pages;
        }

        /**
         * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
         *
         * @param i
         * @param currentPage
         * @param paginationRange
         * @param totalPages
         * @returns {*}
         */
        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
            var halfWay = Math.ceil(paginationRange/2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }

        return {
            restrict: 'AE',
            templateUrl: function(elem, attrs) {
                return attrs.templateUrl || paginationTemplate.getPath();
            },
            scope: {
                maxSize: '=?',
                onPageChange: '&?',
                paginationId: '=?'
            },
            link: function dirPaginationControlsLinkFn(scope, element, attrs) {

                // rawId is the un-interpolated value of the pagination-id attribute. This is only important when the corresponding dir-paginate directive has
                // not yet been linked (e.g. if it is inside an ng-if block), and in that case it prevents this controls directive from assuming that there is
                // no corresponding dir-paginate directive and wrongly throwing an exception.
                var rawId = attrs.paginationId ||  DEFAULT_ID;
                var paginationId = scope.paginationId || attrs.paginationId ||  DEFAULT_ID;

                if (!paginationService.isRegistered(paginationId) && !paginationService.isRegistered(rawId)) {
                    var idMessage = (paginationId !== DEFAULT_ID) ? ' (id: ' + paginationId + ') ' : ' ';
                    throw 'pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive.';
                }

                if (!scope.maxSize) { scope.maxSize = 9; }
                scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
                scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;

                var paginationRange = Math.max(scope.maxSize, 5);
                scope.pages = [];
                scope.pagination = {
                    last: 1,
                    current: 1
                };
                scope.range = {
                    lower: 1,
                    upper: 1,
                    total: 1
                };

                scope.$watch(function() {
                    return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
                }, function(length) {
                    if (0 < length) {
                        generatePagination();
                    }
                });
                
                scope.$watch(function() {
                    return (paginationService.getItemsPerPage(paginationId));
                }, function(current, previous) {
                    if (current != previous) {
                        goToPage(scope.pagination.current);
                    }
                });

                scope.$watch(function() {
                    return paginationService.getCurrentPage(paginationId);
                }, function(currentPage, previousPage) {
                    if (currentPage != previousPage) {
                        goToPage(currentPage);
                    }
                });

                scope.setCurrent = function(num) {
                    if (isValidPageNumber(num)) {
                        paginationService.setCurrentPage(paginationId, num);
                    }
                };

                function goToPage(num) {
                    if (isValidPageNumber(num)) {
                        scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                        scope.pagination.current = num;
                        updateRangeValues();

                        // if a callback has been set, then call it with the page number as an argument
                        if (scope.onPageChange) {
                            scope.onPageChange({ newPageNumber : num });
                        }
                    }
                }

                function generatePagination() {
                    var page = parseInt(paginationService.getCurrentPage(paginationId)) || 1;

                    scope.pages = generatePagesArray(page, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = page;
                    scope.pagination.last = scope.pages[scope.pages.length - 1];
                    if (scope.pagination.last < scope.pagination.current) {
                        scope.setCurrent(scope.pagination.last);
                    } else {
                        updateRangeValues();
                    }
                }

                /**
                 * This function updates the values (lower, upper, total) of the `scope.range` object, which can be used in the pagination
                 * template to display the current page range, e.g. "showing 21 - 40 of 144 results";
                 */
                function updateRangeValues() {
                    var currentPage = paginationService.getCurrentPage(paginationId),
                        itemsPerPage = paginationService.getItemsPerPage(paginationId),
                        totalItems = paginationService.getCollectionLength(paginationId);

                    scope.range.lower = (currentPage - 1) * itemsPerPage + 1;
                    scope.range.upper = Math.min(currentPage * itemsPerPage, totalItems);
                    scope.range.total = totalItems;
                }

                function isValidPageNumber(num) {
                    return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));
                }
            }
        };
    }]);

    module.filter('itemsPerPage', ['paginationService', function(paginationService) {

        return function(collection, itemsPerPage, paginationId) {
            if (typeof (paginationId) === 'undefined') {
                paginationId = DEFAULT_ID;
            }
            if (!paginationService.isRegistered(paginationId)) {
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }
            var end;
            var start;
            if (collection instanceof Array) {
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;
                if (paginationService.isAsyncMode(paginationId)) {
                    start = 0;
                } else {
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
                }
                end = start + itemsPerPage;
                paginationService.setItemsPerPage(paginationId, itemsPerPage);

                return collection.slice(start, end);
            } else {
                return collection;
            }
        };
    }]);

    module.service('paginationService', function() {

        var instances = {};
        var lastRegisteredInstance;

        this.registerInstance = function(instanceId) {
            if (typeof instances[instanceId] === 'undefined') {
                instances[instanceId] = {
                    asyncMode: false
                };
                lastRegisteredInstance = instanceId;
            }
        };

        this.isRegistered = function(instanceId) {
            return (typeof instances[instanceId] !== 'undefined');
        };

        this.getLastInstanceId = function() {
            return lastRegisteredInstance;
        };

        this.setCurrentPageParser = function(instanceId, val, scope) {
            instances[instanceId].currentPageParser = val;
            instances[instanceId].context = scope;
        };
        this.setCurrentPage = function(instanceId, val) {
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
        };
        this.getCurrentPage = function(instanceId) {
            var parser = instances[instanceId].currentPageParser;
            return parser ? parser(instances[instanceId].context) : 1;
        };

        this.setItemsPerPage = function(instanceId, val) {
            instances[instanceId].itemsPerPage = val;
        };
        this.getItemsPerPage = function(instanceId) {
            return instances[instanceId].itemsPerPage;
        };

        this.setCollectionLength = function(instanceId, val) {
            instances[instanceId].collectionLength = val;
        };
        this.getCollectionLength = function(instanceId) {
            return instances[instanceId].collectionLength;
        };

        this.setAsyncModeTrue = function(instanceId) {
            instances[instanceId].asyncMode = true;
        };

        this.isAsyncMode = function(instanceId) {
            return instances[instanceId].asyncMode;
        };
    });
    
    module.provider('paginationTemplate', function() {

        var templatePath = 'directives/pagination/dirPagination.tpl.html';
        
        this.setPath = function(path) {
            templatePath = path;
        };
        
        this.$get = function() {
            return {
                getPath: function() {
                    return templatePath;
                }
            };
        };
    });
})();
'use strict';
angular.module("ngLocale", [], ["$provide", function ($provide) {
		var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
		function getDecimals(n) {
			n = n + '';
			var i = n.indexOf('.');
			return (i == -1) ? 0 : n.length - i - 1;
		}

		function getVF(n, opt_precision) {
			var v = opt_precision;

			if (undefined === v) {
				v = Math.min(getDecimals(n), 3);
			}

			var base = Math.pow(10, v);
			var f = ((n * base) | 0) % base;
			return {v: v, f: f};
		}

		$provide.value("$locale", {
			"DATETIME_FORMATS": {
				"AMPMS": [
					"AM",
					"PM"
				],
				"DAY": [
					"ned\u011ble",
					"pond\u011bl\u00ed",
					"\u00fater\u00fd",
					"st\u0159eda",
					"\u010dtvrtek",
					"p\u00e1tek",
					"sobota"
				],
				"MONTH": [
					"ledna",
					"\u00fanora",
					"b\u0159ezna",
					"dubna",
					"kv\u011btna",
					"\u010dervna",
					"\u010dervence",
					"srpna",
					"z\u00e1\u0159\u00ed",
					"\u0159\u00edjna",
					"listopadu",
					"prosince"
				],
				"SHORTDAY": [
					"ne",
					"po",
					"\u00fat",
					"st",
					"\u010dt",
					"p\u00e1",
					"so"
				],
				"SHORTMONTH": [
					"led",
					"\u00fano",
					"b\u0159e",
					"dub",
					"kv\u011b",
					"\u010dvn",
					"\u010dvc",
					"srp",
					"z\u00e1\u0159",
					"\u0159\u00edj",
					"lis",
					"pro"
				],
				"fullDate": "EEEE d. MMMM y",
				"longDate": "d. MMMM y",
				"medium": "d. M. y H:mm:ss",
				"mediumDate": "d. M. y",
				"mediumTime": "H:mm:ss",
				"short": "dd.MM.yy H:mm",
				"shortDate": "dd.MM.yy",
				"shortTime": "H:mm"
			},
			"NUMBER_FORMATS": {
				"CURRENCY_SYM": "K\u010d",
				"DECIMAL_SEP": ",",
				"GROUP_SEP": "\u00a0",
				"PATTERNS": [
					{
						"gSize": 3,
						"lgSize": 3,
						"maxFrac": 3,
						"minFrac": 0,
						"minInt": 1,
						"negPre": "-",
						"negSuf": "",
						"posPre": "",
						"posSuf": ""
					},
					{
						"gSize": 3,
						"lgSize": 3,
						"maxFrac": 2,
						"minFrac": 2,
						"minInt": 1,
						"negPre": "-",
						"negSuf": "\u00a0\u00a4",
						"posPre": "",
						"posSuf": "\u00a0\u00a4"
					}
				]
			},
			"id": "cs-cz",
			"pluralCat": function (n, opt_precision) {
				var i = n | 0;
				var vf = getVF(n, opt_precision);
				if (i == 1 && vf.v == 0) {
					return PLURAL_CATEGORY.ONE;
				}
				if (i >= 2 && i <= 4 && vf.v == 0) {
					return PLURAL_CATEGORY.FEW;
				}
				if (vf.v != 0) {
					return PLURAL_CATEGORY.MANY;
				}
				return PLURAL_CATEGORY.OTHER;
			}
		});
	}]);
angular.module('kumpanium')
		.config(['$modalProvider', function ($modalProvider) {
				angular.extend($modalProvider.defaults, {
					html: true,
					animation: 'am-fade-and-scale',
					placement: 'top'
				});
			}])

		.config(['$popoverProvider', function ($popoverProvider) {
				angular.extend($popoverProvider.defaults, {
					placement: 'top',
					animation: 'am-fade-and-scale'
				});
			}])


		.config(['$timepickerProvider', function ($timepickerProvider) {
				angular.extend($timepickerProvider.defaults, {
					timeFormat: 'HH:mm',
					timeType: 'number'
				});
			}])

		.config(['$datepickerProvider', function ($datepickerProvider) {
				angular.extend($datepickerProvider.defaults, {
					dateFormat: 'dd.MM.yyyy',
					startWeek: 1
				});
			}])

		.config(['paginationTemplateProvider', function (paginationTemplateProvider) {
			paginationTemplateProvider.setPath('js/bower_components/angular-utils-pagination/dirPagination.tpl.html');
		}]);
angular.module('kumpaniumDirectives')

		.directive('cacheTemplate', [
			'$templateCache',
			function ($templateCache) {
				return {
					restrict: 'A',
					priority: 100,
					terminal: true,
					link: function (scope, element, attrs) {
						var cacheKey = attrs.cacheTemplate;
						var content = $templateCache.get(cacheKey);
						if (!content || content !== element[0].innerHTML)
							$templateCache.put(cacheKey, element[0].innerHTML);

						element.remove();
					}
				};
			}])

		.directive('compile', [
			'$compile',
			function ($compile) {
				return {
					restrict: 'A',
					link: function (scope, element, attrs) {
						var ensureCompileRunsOnce = scope.$watch(
								function (scope) {
									return scope.$eval(attrs.compile);
								},
								function (value) {
									element.html(value);
									$compile(element.contents())(scope);
									ensureCompileRunsOnce();
								}
						);
					}
				};
			}])

		.directive('showErrors', function () {
			return {
				restrict: 'A',
				require: 'form',
				link: function (scope, el, attrs, ctrl) {
					var formGroups = el[0].getElementsByClassName('form-group'),
							i = formGroups.length,
							fields = {};

					if (i === 0)
						return;

					while (i--) {
						var input = formGroups[i].querySelector('[name]');
						if (!input)
							continue;
						var inputElem = angular.element(input);
						fields[inputElem.attr('name')] = angular.element(formGroups[i]);
						inputElem.bind('change', function () {
							checkValidity(this.getAttribute('name'));
						});
					}

					scope.$on('show-errors-check-validity', function (event, form) {
						for (var field in form)
							if (form.hasOwnProperty(field) && fields.hasOwnProperty(field))
								checkValidity(field);
					});

					function checkValidity(name) {
						fields[name].toggleClass('has-error', ctrl[name].$invalid);
					}
				}
			};
		})

		.directive('validPhone', function () {
			return {
				require: 'ngModel',
				link: function (scope, el, attrs, ctrl) {
					ctrl.$validators.phone = function (modelValue, viewValue) {
						if (ctrl.$isEmpty(modelValue))
							return true;
						if (isNaN(modelValue))
							return false;
						var numberLength = modelValue.replace(/(^00)|\D/g, '').length;
						if (numberLength > 12 || numberLength < 9)
							return false;
						return true;
					};
				}
			};
		})

		// TODO: not used, just copied from https://docs.angularjs.org/guide/forms
		.directive('usernameExists', function () {
			return {
				require: 'ngModel',
				link: function (scope, el, attrs, ctrl) {
					var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

					ctrl.$asyncValidators.username = function (modelValue, viewValue) {

						if (ctrl.$isEmpty(modelValue)) {
							// consider empty model valid
							return $q.when();
						}

						var def = $q.defer();

						$timeout(function () {
							// Mock a delayed response
							if (usernames.indexOf(modelValue) === -1) {
								// The username is available
								def.resolve();
							} else {
								def.reject();
							}

						}, 2000);

						return def.promise;
					};
				}
			};
		});



    
angular.module('kumpaniumFilters')

		.filter('label', function () {
			return function (input, context) {
				return '<span class="label label-' + (context || 'default') +
						'">' + input + '</span>';
			};
		})

		.filter('liters', ['$filter', function ($filter) {
			return function (milliliters, fractionSize) {
				var liters = milliliters / 1000;
				return (fractionSize ? $filter('number')(liters, fractionSize) :
						~~liters) + ' L';
			};
		}])

		.filter('percent', function () {
			return function (fraction) {
				return ~~(fraction * 100) + '%';
			};
		})

		.filter('total', ['Utils', function (Utils) {
			return function (input) {
				var i = input instanceof Array ? input.length : 0;
				var a = arguments.length;
				if (a === 1 || i === 0)
					return i;

				var keys = [];
				while (a-- > 1) {
					var key = arguments[a].split('.');
					var property = Utils.getNestedPropertyByKey(input[0], key);
					if (isNaN(property))
						throw 'filter "total" is able count only numeric values';
					keys.push(key);
				}

				var total = 0;
				while (i--) {
					var product = 1;
					for (var k = 0; k < keys.length; k++)
						product *= Utils.getNestedPropertyByKey(input[i], keys[k]);
					total += product;
				}
				return total;
			};
		}])

		.filter('max', ['$filter', function ($filter) {
			return function (array, property) {
				var ordered = $filter('orderBy')(array, property, true);
				return ordered[0][property];
			};
		}])

		.filter('min', ['$filter', function ($filter) {
			return function (array, property) {
				var ordered = $filter('orderBy')(array, property);
				return ordered[0][property];
			};
		}])

		.filter('groupBy', ['Utils', function (Utils) {
			if (typeof memory === 'undefined')
				var memory = {};
			return function (array, property, special) {
				if (!(array instanceof Array) || array.length === 0 || !property)
					return array;

				var trace = angular.toJson(array[0]).substr(0, 25) +
						array.length + property;
				if (typeof memory[trace] === 'undefined') {
					var grouped = {},
							i = array.length,
							key;
					while (i--) {
						key = Utils.getNestedPropertyByKey(array[i], property);
						switch (special) {
							case 'date':
								key = key.substr(0, 10);
						}

						if (typeof grouped[key] === 'undefined')
							grouped[key] = [];
						grouped[key].push(array[i]);
					}
					memory[trace] = grouped;
				}

				return memory[trace];
			};
		}])

		.filter('beerTranslate', function () {
			return function (input) {
				if (typeof input === 'string')
					return input.replace(/piv|mal/gi, function (match) {
						return '*' + (match === 'mal' ? 300 : 500) + '+';
					});
			};
		})

		.filter('calculate', function () {
			return function (input) {
				if (!isNaN(+input)) {
					return +input;
				} else if (typeof input === 'string') {
					var simpleMath = input.replace(/(,\d+)|(?:[^\s\d\+\-\*\/])/g,
							function (match, comaSeparated) {
								return comaSeparated ? comaSeparated.replace(',', '.') : '';
							});
					simpleMath = simpleMath.replace(/(?:[\s\+\-\*\/]*$)|(?:^[\s\+\-\*\/]*)/g, '');
					return eval(simpleMath);
				}
			};
		})

		.filter('capitalize', function () {
			return function (string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			};
		})

		.filter('charcount', function () {
			return function (string) {
				if (typeof string !== 'undefined')
					string = string.replace(/(<[^>]+?>)/ig, '').replace(/(\&.+?\;)/g, ' ');
				return string && string.length || 0;
			};
		})

		.filter('wordcount', function () {
			return function (string) {
				if (typeof string !== 'undefined')
					string = string.replace(/(<[^>]*?>)/ig, ' ').match(/\S+/g);
				return string && string.length || 0;
			};
		});

angular.module('kumpanium')
		.config([
			'$routeProvider',
			function ($routeProvider) {
				'use strict';
				
				var path = '/partials';

				$routeProvider.
						when('/novinky', {
							title: 'Novinky',
							templateUrl: path + '/news',
							controller: 'NewsController'
						}).
						when('/konzumenti', {
							title: 'Konzumenti',
							templateUrl: path + '/users',
							controller: 'UsersController'
						}).
						when('/statistiky', {
							title: 'Statistiky',
							templateUrl: path + '/stats',
							controller: 'StatsController'
						}).
						when('/zasoby', {
							title: 'Zásoby',
							templateUrl: path + '/stock',
							controller: 'StockController'
						}).
						otherwise({
							redirectTo: '/novinky'
						});
			}])

		.run(['$rootScope', function ($rootScope) {
				$rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
					document.title = currentRoute.title + ' | ' + 'Kumpanium';
				});
			}]);

angular.module('kumpaniumControllers').controller('NewsController', [
	'$scope', 'API', '$q', '$rootScope',
	function ($scope, API, $q, $rootScope) {
		'use strict';
		
		var News = API('news');

		$scope.activeTab = 1;

		$q.all([News.query().$promise, $rootScope.users.$promise]).then(function (data) {
			var news = data[0];
			var i = news.length;
			while (i--)
				addAuthor(news[i]);

			$scope.news = news;
		});

		$scope.newsAdd = {
			init: function () {
				this.news = new News();
				this.original = this.index = {};
			},
			save: function () {
				var news = this.news,
						original = this.original;

				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				if (!(news.setTerm && news.dateEnd)) {
					news.dateEnd = null;
				} else if (news.timeEnd) {
					var minutes = news.timeEnd / 1000 / 60;
					news.dateEnd.setUTCHours(~~(minutes / 60));
					news.dateEnd.setUTCMinutes(minutes % 60);
				}
				delete(news.setTerm);

				news.$save(
						function () {
							addAuthor(news);
							if (original) {
								angular.copy(news, original);
								$scope.activeTab = this.index;
							} else {
								$scope.news.push(news);
								$scope.activeTab = 1;
							}

							$scope.newsAdd.init();
							$scope.newsAdd.form.$setPristine();
						},
						function (error) {

						});
			},
			load: function (news, index) {
				this.index = index + 1;
				this.original = news;
				this.news = angular.copy(news);
				if (news.dateEnd) {
					this.news.setTerm = true;
					var date = new Date(news.dateEnd);
					this.news.dateEnd = date;
					this.news.timeEnd = $scope.isFullDay(date) ? null : date.getTime() % (24 * 60 * 60 * 1000);
				}
				$scope.activeTab = 0;
			}
		};
		$scope.newsAdd.init();

		$scope.isFullDay = function (date) {
			return /00:00:00/.test(date);
		};

		function addAuthor(news) {
			var user = $rootScope.usersById[news.user];
			news.user = {
				id: user.id,
				name: user.name,
				context: user.getRole().context
			};
		}
	}]);
angular.module('kumpaniumControllers').run([
	'$rootScope', '$window', 'User',
	function ($rootScope, $window, User) {
		'use strict';

		$rootScope.isManager = $window.isManager;
		$rootScope.currentUser = $window.currentUser;
		$rootScope.usersById = {};
		$rootScope.users = User.query(function (users) {
			var i = users.length;
			while (i--)
				$rootScope.usersById[users[i].id] = users[i];
		});
	}]);
angular.module('kumpaniumControllers').controller('StatsController', [
	'$scope', '$http', 'Utils',
	function ($scope, $http, Utils) {
		'use strict';
		
		// http://jtblin.github.io/angular-chart.js/
		var chartTypes = ['Bar', 'Doughnut', 'Line', 'Pie', 'PolarArea', 'Radar'];

		$scope.chart = {
			labels: [],
			data: [],
			series: [],
			type: chartTypes[0],
			clear: function () {
				this.labels = [];
				this.series = [];
				this.data = [];
			}
		};

		$scope.chartControl = {
			chart: {},
			form: {},
			type: [
				{value: 'Bar', label: 'stav'},
				{value: 'Line', label: 'vývoj'},
				{value: 'Pie', label: 'podíl'}
			],
			series: [
				{value: 'user', label: 'lidí'},
				{value: 'beer', label: 'piva'}
			],
			data: [
				{value: 'consumption', label: 'výtoč [L]'},
				{value: 'credit', label: 'útratu [Kč]'}
			],
			response: {},
			load: function () {
				var my = this,
						chart = this.chart;

				var query = '/futro/stat?data=' + chart.data + '&series=' + chart.series;
				if (chart.dateBegin)
					query += '&dateBegin=' + Utils.dateToISO(chart.dateBegin);
				if (chart.dateEnd)
					query += '&dateEnd=' + Utils.dateToISO(chart.dateEnd);


				$http.get(query)
						.success(function (data) {
							my.response = data;
							my.plot();
						})
						.error(function (data) {

						});
			},
			plot: function () {
				var chart = $scope.chart,
						length = this.response.length;
				if (length === 0)
					return;

				chart.clear();
				var data = chart.data,
						item, temp = {};
				switch (chart.type = this.chart.type) {
					case 'Bar':
						chart.data.push([]);
						data = chart.data[0];
					case 'Pie':
						for (var i = 0; i < length; i++) {
							item = this.response[i];
							if (typeof temp[item.series] === 'undefined')
								temp[item.series] = 0;
							temp[item.series] += item.data;
						}

						for (var label in temp) {
							chart.labels.push(label);
							data.push(temp[label]);
						}

						for (var i = 0, l = data.length; i < l; i++)
							data[i] = +data[i].toFixed(2);
						break;
					case 'Line':
						var series = {}, previous;
						for (var i = 0; i < length; i++) {
							item = this.response[i];
							if (typeof temp[item.date] === 'undefined')
								temp[item.date] = {};
							temp[item.date][item.series] = item.data;
							series[item.series] = true;
						}

						for (var serie in series)
							chart.series.push(serie);

						for (var date in temp) {
							chart.labels.push(date);
							for (var i = 0, l = chart.series.length; i < l; i++) {
								serie = chart.series[i];
								if (typeof data[i] === 'undefined')
									data.push([]);
								previous = data[i][data[i].length - 1] || 0;
								data[i].push(+(previous + (temp[date][serie] || 0)).toFixed(2));
							}
						}
						break;
				}

			},
			init: function () {
				var date = new Date();
				date.setMonth(0);
				date.setDate(1);
				date.setHours(0);
				date.setMinutes(0);

				this.chart = {
					type: 'Bar',
					series: 'user',
					data: 'consumption',
					dateBegin: date
				};
				this.load();
			}
		};
		$scope.chartControl.init();
	}]);
angular.module('kumpaniumControllers').controller('StockController', [
	'$scope', 'API', 'Utils', 'Keg', '$modal',
	function ($scope, API, Utils, Keg, $modal) {
		'use strict';
		
		var Brewery = API('brewery');
		var Beer = API('beer');

		Keg.query(function (data) {
			$scope.kegs = data;
		});

		Brewery.query(function (data) {
			$scope.breweries = data;
		});

		$scope.finished = {
			itemsPerPage: 9,
			getPage: function (page) {
				var my = this,
					limit = this.itemsPerPage + ',' + (~~page - 1) * this.itemsPerPage;
				Keg.query({state: Keg.prototype.states[2], limit: limit}, function (data) {
					my.kegs = data;
					my.count = data.length > 0 ? data[0].metadata.count : 0;
				});
			},
			loss: {
				good: 0.06,
				warn: 0.10,
				critic: 0.13
			}
		};
		$scope.finished.getPage(1);

		$scope.kegAdd = {
			init: function () {
				this.keg = new Keg();
				this.keg.quantity = 1;
				this.beers = null;
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				var quantity = this.keg.quantity;
				this.keg.dateAdd = this.keg.currentDateTime();
				this.keg.$save(
						function (keg) {
							var message = 'Skladové zásoby obohaceny o ' +
									quantity + 'x ' + keg.volume / 1000 + ' L ' +
									keg.beer.brewery.name + ' ' + keg.beer.name;
							Utils.alertMessage('Dobrý!', message, 'success', '#new_stock_alert_container');

							while (quantity--) {
								var newKeg = angular.copy(keg);
								newKeg.id -= quantity;
								$scope.kegs.push(newKeg);
							}
							$scope.kegAdd.init();
						},
						function (error) {
							var message = 'Něco se pokazilo: <br /><br /><pre><strong>' +
									error.data.status + ' ' + error.data.code +
									':</strong><br />' + error.data.message + '</pre>';
							Utils.alertMessage('Špatný!', message, 'danger', '#new_stock_alert_container');
						}
				);
			},
			eventBrewerySelected: function () {
				this.beers = Brewery.query({id: this.keg.brewery, relation: 'beer'});
			},
			eventBeerSelected: function () {
				var my = this;
				if (typeof this.keg.price === 'undefined' &&
						this.keg.volumes.indexOf(this.keg.volume) !== -1)
					$scope.kegs.$promise.then(function (kegs) {
						var pricePerVolume;
						var i = kegs.length;
						while (i--)
							if (my.keg.beer === kegs[i].beer.id) {
								if (my.keg.volume === kegs[i].volume)
									return my.keg.price = kegs[i].price;
								else if (typeof pricePerVolume === 'undefined')
									pricePerVolume = kegs[i].price / kegs[i].volume;
							}

						if (typeof pricePerVolume !== 'undefined')
							my.keg.price = ~~(pricePerVolume * my.keg.volume);
					});
			}
		};
		$scope.kegAdd.init();


		$scope.beerAdd = $modal({
			scope: $scope,
			template: 'modals/beeradd',
			show: false
		});
		angular.extend($scope.beerAdd, {
			init: function () {
				this.beer = new Beer();
				this.beer.brewery = $scope.kegAdd.keg.brewery;
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				this.beer.$save(
						function (beer) {
							$scope.kegAdd.beers.push(beer);
							$scope.kegAdd.keg.beer = beer.id;
							$scope.beerAdd.hide();
						},
						function (error) {

						});
			}
		});

		$scope.breweryAdd = $modal({
			scope: $scope,
			template: 'modals/breweryadd',
			show: false
		});
		angular.extend($scope.breweryAdd, {
			init: function () {
				this.brewery = new Brewery();
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				this.brewery.$save(
						function (brewery) {
							$scope.breweries.push(brewery);
							$scope.kegAdd.keg.brewery = brewery.id;
							$scope.kegAdd.eventBrewerySelected();
							$scope.breweryAdd.hide();
							$scope.beerAdd.show();
						},
						function (error) {

						});
			}
		});

	}]);
angular.module('kumpaniumControllers').controller('UsersController', [
	'$scope', 'API',
	function ($scope, API) {
		'use strict';
		
		$scope.userEdit = {
			user: {},
			model: {},
			edit: {},
			password: {},
			init: function (user) {
				this.user = user;
				this.model = {
					name: user.name,
					email: user.email,
					phone: user.phone
				};
				this.edit = this.password = {};
			},
			save: function () {
				var changes = false;
				for (var item in this.model)
					if (this.model.hasOwnProperty(item) &&
							this.edit[item] && this.model[item] &&
							this.user[item] !== this.model[item])
						changes = this.user[item] = this.model[item];

				if (this.password.new1)
					changes = this.user.password = this.password;

				if (changes !== false) {
					this.user.$save();
					return true;
				} else {
					return false;
				}
			}
		};

		$scope.creditAdd = {
			init: function (user) {
				var Credit = new API('user', user.id, 'credit');
				this.user = user;
				this.credit = new Credit;
			},
			save: function () {
				this.form.$setSubmitted();
				if (this.form.$invalid)
					return;

				this.credit.dateAdd = this.credit.currentDateTime();
				return this.credit.$save(
						function (credit) {
							$scope.creditAdd.user.credit.push(credit);
							$scope.creditAdd.user.balance += credit.amount;
							return true;
						},
						function (error) {
							return false;
						});
			}
		};

	}]);
angular.module('kumpaniumServices').factory('API', [
	'$resource', 'Utils',
	function ($resource, Utils) {
		'use strict';

		var apiPath = '/futro/';

		return function (presenter, id, relation) {
			var paramDefaults = apiPath +
					(presenter || ':presenter') + '/' +
					(id || ':id') + '/' +
					(relation || ':relation') +
					'/:relationId';

			var api = $resource(paramDefaults, {id: '@id'}, {
				update: {method: 'PUT'},
				get: {method: 'GET', cache: true, params: {outputAssoc: 1}},
				query: {method: 'GET', cache: true, isArray: true}
			});

			api.prototype.currentDateTime = function () {
				return Utils.dateToISO();
			};

			api.prototype.confirmDelete = function (message, successCallback, errorCallback) {
				message = message || 'Opravdu smazat položku ID: ' + this.id;
				if (confirm(message))
					this.$delete(successCallback, errorCallback);
			};


			return api;
		};
	}]);

angular.module('kumpaniumServices').factory('Keg', [
	'API', '$filter', '$q',
	function (API, $filter, $q) {
		'use strict';
		
		var Keg = API('keg');

		angular.extend(Keg.prototype, {
			states: ['STOCKED', 'TAPPED', 'FINISHED'],
			stateLabels: [
				{text: 'Skladem', context: 'success'},
				{text: 'Na čepu', context: 'warning'},
				{text: 'Vypito', context: 'default'}
			],
			volumes: [5000, 10000, 15000, 20000, 25000, 30000, 50000],
			getConsumption: function () {
				var my = this;
				this.consumption = Keg.query({id: this.id, relation: 'consumption'},
				function () {
					my.rest = my.volume - $filter('total')(my.consumption, 'volume');
				});
			},
			saveConsumption: function (additional) {
				var consumption = this.consumption,
						data = {
							volume: $filter('calculate')(
									$filter('beerTranslate')(additional.volume)),
							user: additional.user,
							keg: this.id,
							dateAdd: Keg.currentDateTime()
						};

				return API('consumption').save(data, function (success) {
					consumption.push(success);
				});
			},
			removeConsumptions: function () {
				var consumption = this.consumption,
						api = API('consumption'),
						i = consumption.length,
						defered = [],
						checked = {};

				while (i--)
					if (consumption[i].checked) {
						var id = consumption[i].id;
						checked[id] = i;
						defered.push(api.delete({id: id}).$promise);
					}

				$q.all(defered).then(function (ids) {
					for (var i = 0; i < ids.length; i++)
						consumption.splice(checked[ids[i].id], 1);
				});
			},
			getStateLabel: function (state) {
				state = state || this.state;
				if (state === 'remove')
					return createLabel({text: 'Smazat', context: 'danger'});

				var index = this.states.indexOf(state);
				if (index !== -1)
					return createLabel(this.stateLabels[index]);

				function createLabel(label) {
					return '<span class="label label-' +
							(label.context || 'default') +
							'">' + label.text + '</span>';
				}
			}
		});

		return Keg;
	}]);

angular.module('kumpaniumServices').factory('User', [
	'API',
	function (API) {
		'use strict';
		
		var HONZA_DVORAK_ID = 4,
			User = API('user'),
			roles = {
				super_admin: {name: 'Administrátor', context: 'primary'},
				beer_manager: {name: 'Pivní manager', context: 'success'},
				kumpan: {name: 'Kumpán', context: 'danger'},
				guest: {name: 'Spřízněná duše', context: 'default'}
			};

		angular.extend(User.prototype, {
			getRole: function () {
				var dvorak = {
					name: '<i class="glyphicon glyphicon-star"></i> Mecenáš ' +
							'<i class="glyphicon glyphicon-star"></i>',
					context: 'warning'
				};

				return this.id === HONZA_DVORAK_ID ? dvorak : roles[this.role];
			},
			getRoleLabel: function () {
				var role = this.getRole();
				return '<span class="label label-' + role.context + '">' +
						role.name + '</span>';
			},
			consumptionPerPage: 15,
			getConsumption: function (page) {
				page = page || 1;
				var limit = this.consumptionPerPage + ',' + (~~page - 1) * this.consumptionPerPage;
				this.consumption = User.query({
					id: this.id,
					relation: 'consumption',
					limit: limit
				});
			},
			creditPerPage: 20,
			getCredit: function (page) {
				page = page || 1;
				var limit = this.creditPerPage + ',' + (~~page - 1) * this.creditPerPage;
				this.credit = User.query({
					id: this.id,
					relation: 'credit',
					limit: limit
				});
			}
		});

		return User;
	}]);

angular.module('kumpaniumServices').service('Utils', [
	'$alert',
	function ($alert) {
		'use strict';
		
		return {
			getNestedPropertyByKey: function (data, key) {
				if (!(key instanceof Array))
					key = key.split('.');
				for (var j = 0; j < key.length; j++)
					data = data[key[j]];
				return data;
			},
			alertMessage: function (title, content, context, querySelector) {
				var message = {
					title: title,
					content: content,
					type: context || 'info',
					container: querySelector
				};
				$alert(message);
			},
			validateForm: function ($scope, form) {
				$scope.$broadcast('show-errors-check-validity', form);
			},
			dateToISO: function (date) {
				if (!(date instanceof Date))
					date = new Date(date || null);

				if (!Date.prototype.toISOString) {
					(function () {
						function pad(number) {
							if (number < 10) {
								return '0' + number;
							}
							return number;
						}

						Date.prototype.toISOString = function () {
							return this.getUTCFullYear() +
									'-' + pad(this.getUTCMonth() + 1) +
									'-' + pad(this.getUTCDate()) +
									'T' + pad(this.getUTCHours()) +
									':' + pad(this.getUTCMinutes()) +
									':' + pad(this.getUTCSeconds()) +
									'.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
									'Z';
						};

					}());
				}

				return date.toISOString();
			}
		};
	}]);
