/**
 * Created by Vladimir on 7/31/2016.
 */

(function() {
	'use strict';

	function videosCtrl($scope, $location, videoService) {
		videoService.getAll().then(function (videos) {
			$scope.videos = videos;
		});

		$scope.open = function (video) {
			$location.path('/video/' + video._id);
		}
	}
	videosCtrl.$inject = ['$scope', '$location', 'videoService'];

	angular.module('videoPortal').controller('VideosCtrl', videosCtrl)
})();