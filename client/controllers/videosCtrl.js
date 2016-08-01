/**
 * Created by Vladimir on 7/31/2016.
 */

(function() {
	'use strict';

	function videosCtrl($scope) {
		$scope.videos = [1, 2, 4];
	}
	videosCtrl.$inject = ['$scope'];

	angular.module('videoPortal').controller('VideosCtrl', videosCtrl)
})();