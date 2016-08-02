/**
 * Created by Vladimir on 7/31/2016.
 */

(function () {
	'use strict';

	function videoService($http, $q, Session, BaseDataService) {

		// inherit from the base service
		var VideoService = function () {
			BaseDataService.apply(this, arguments);
		};
		VideoService.prototype = new BaseDataService();

		VideoService.prototype.getAll = function (skip, limit) {
			return this.makeRequest({
				url: '/videos',
				method: 'GET',
				params: {skip: skip, limit: limit, sessionId: Session.sessionId}
			}, function (response) {
				// return only the videos array
				return response.data.data;
			});
		};

		VideoService.prototype.get = function (id) {
			return this.makeRequest({
				url: '/video',
				method: 'GET',
				params: {videoId: id, sessionId: Session.sessionId}
			}, function (response) {
				// return only the video
				return response.data.data;
			});
		};

		VideoService.prototype.rate = function (id, rating) {
			return this.makeRequest({
				url: '/video/ratings',
				method: 'POST',
				params: {sessionId: Session.sessionId},
				data: {videoId: id, rating: rating}
			});
		};

		return new VideoService();
	}
	videoService.$inject = ['$http', '$q', 'Session', 'BaseDataService'];

	angular.module('videoPortal').factory('videoService', videoService);
})();