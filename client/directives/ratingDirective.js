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
				parentRating: '&rating',
				parentRatingFixed: '&ratingFixed',
				rate: '&rate'
			},

			link: function (scope, element, attributes) {
				// initialize the local scope for the controller with the initial values
				scope.rating = scope.parentRating();
				scope.ratingFixed = scope.parentRatingFixed();
			}
		}
	}

	angular.module('videoPortal').directive('vpRating', ratingDirective);
})();