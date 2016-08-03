/**
 * Created by Vladimir on 8/3/2016.
 */

(function () {
	'use strict';

	function ratingDirective() {
		return {
			restrict: 'E',
			templateUrl: '/templates/rating.html',
			controller: 'RatingCtrl',
			scope: {
				rating: '=rating',
				ratingFixed: '=ratingFixed',
				rate: '&rate'
			}
			// link: function (scope, element, attributes) {
			// 	scope.rating = attributes.rating;
			// }
		}
	}

	angular.module('videoPortal').directive('vpRating', ratingDirective);
})();