/**
 * Created by Vladimir on 8/3/2016.
 */

(function () {
	'use strict';

	function ratingCtrl($scope) {

		$scope.stars = [
			{ active: false },
			{ active: false },
			{ active: false },
			{ active: false },
			{ active: false }
		];

		function displayRating(rating) {
			for (var i = 0; i < $scope.stars.length; i++) {
				$scope.stars[i].active = (i < rating);
			}
		}

		$scope.$watch('rating', function (newValue) {
			displayRating(newValue);
		});

		$scope.previewRating = function (rating) {
			if (!$scope.ratingFixed)
				displayRating(rating);
		};
		$scope.resetRating = function () {
			displayRating($scope.rating);
		};
		$scope.setRating = function (rating) {
			if (!$scope.ratingFixed)
				$scope.rate()(rating);
		}
	}
	ratingCtrl.$inject = ['$scope'];

	angular.module('videoPortal').controller('RatingCtrl', ratingCtrl);
})();