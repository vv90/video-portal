/**
 * Created by Vladimir on 8/3/2016.
 */

(function() {
	'use strict';

	function playVideoCtrl($scope, $routeParams, $location, videoService) {
		var currentlyPlaying = [];

		$scope.video = null;
		videoService.get($routeParams.id).then(function (video) {
			$scope.video = video;
		});
		$scope.rate = function (rating) {
			videoService.rate($scope.video._id, rating).then(function (video) {
				$scope.video = video;
			});
		};
		// $scope.videoControl = {};
		// $scope.play = function () {
		// 	if ($scope.videoControl.play)
		// 		$scope.videoControl.play();
		// };
		// $scope.pause = function () {
		// 	if ($scope.videoControl.pause)
		// 		$scope.videoControl.pause();
		// };
		// $scope.onplay = function (params) {
		// 	currentlyPlaying.push(params);
		// 	console.log(currentlyPlaying);
		// }
	}
	playVideoCtrl.$inject = ['$scope', '$routeParams', '$location', 'videoService'];

	angular.module('videoPortal').controller('PlayVideoCtrl', playVideoCtrl);
})();