/**
 * Created by Vladimir on 7/31/2016.
 */

(function() {
	'use strict';

	function videosCtrl($scope, videoService) {
		videoService.getAll().then(function (videos) {
			$scope.videos = videos;
		});
	}
	videosCtrl.$inject = ['$scope', 'videoService'];

	angular.module('videoPortal').controller('VideosCtrl', videosCtrl)
})();