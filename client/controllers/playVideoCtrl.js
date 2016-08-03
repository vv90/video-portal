/**
 * Created by Vladimir on 8/3/2016.
 */

(function() {
	'use strict';

	function playVideoCtrl($scope, $routeParams, $location, videoService) {
		$scope.video = null;
		videoService.get($routeParams.id).then(function (video) {
			$scope.video = video;
		});
		$scope.rate = function (rating) {
			videoService.rate($scope.video._id, rating).then(function (video) {
				$scope.video = video;
			});
		}
	}
	playVideoCtrl.$inject = ['$scope', '$routeParams', '$location', 'videoService'];

	angular.module('videoPortal').controller('PlayVideoCtrl', playVideoCtrl);
})();