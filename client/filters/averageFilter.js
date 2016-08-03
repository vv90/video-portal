/**
 * Created by Vladimir on 8/3/2016.
 */

(function () {
	'use strict';

	angular.module('videoPortal').filter('average', function () {
		return function (input) {
			if (!input || !input.length)
				return 0;

			var sum = input.reduce(function (item, sum) { return parseInt(item) + sum; }, 0);
			var average = sum / input.length;
			return Math.round(average);
		}
	});
})();