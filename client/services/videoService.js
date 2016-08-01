/**
 * Created by Vladimir on 7/31/2016.
 */

(function () {
	'use strict';

	function videoService($http) {
		return {
			getAll: function (skip, limit) {
				return $http.get('/videos?skip=' + skip + '&limit=' + limit);
			},
			get: function (id) {
				return $http.get('/video?videoId' + id);
			},
			rate: function (id, rating) {
				return $http.post('/video/ratings?videoId' + id + '&rating=' + rating);
			}
		};
	}
})();