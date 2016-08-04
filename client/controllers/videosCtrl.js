/**
 * Created by Vladimir on 7/31/2016.
 */

(function() {
	'use strict';

	function videosCtrl($scope, $location, videoService) {
		var videosPerPage = 10;
		var loaded = 0;
		$scope.videos = [];
		function loadMore() {
			videoService.getAll(loaded, loaded + videosPerPage).then(function (videos) {
				$scope.videos = $scope.videos.concat(videos);
				loaded += videosPerPage;
			})
		}

		$scope.open = function (video) {
			$location.path('/video/' + video._id);
		};

		// lazy scrolling
		// we use vp-watch-scroll directive to notify the controller about the scrolling event
		$scope.scrolledToBottom = function () {
			loadMore();
		};

		loadMore();
	}
	videosCtrl.$inject = ['$scope', '$location', 'videoService'];

	angular.module('videoPortal').controller('VideosCtrl', videosCtrl)
})();