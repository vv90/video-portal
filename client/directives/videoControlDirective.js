/**
 * Created by Vladimir on 8/3/2016.
 */

(function () {
	'use strict';

	function videoControlDirective($window, Session, localStorageService) {
		return {
			restrict: 'A',
			scope: {},
			link: function (scope, element) {

				// this directive ensures that only one video can be played at any time across all tabs
				var video = element[0];

				// comunicate play event through local storage
				// Math.random for is good enough for id
				video.onplay = function () {
					localStorageService.setItem('videoPlaying', { user: Session.username, id: Math.random() });
				};
				video.onpause = function () {
					localStorageService.removeItem('videoPlaying');
				};

				// subscribe to local storage changes
				angular.element($window).on('storage', function (event) {
					var videoPlaybackToken;
					if (event.key === 'videoPlaying' &&
						(videoPlaybackToken = localStorageService.getItem('videoPlaying')) &&
						videoPlaybackToken.user === Session.username) {


						video.pause();
					}
				});

				// clean up the event subscription
				scope.$on('$destroy', function () {
					angular.element($window).off('storage');
				});
			}
		}
	}
	videoControlDirective.$inject = ['$window', 'Session', 'localStorageService'];
	angular.module('videoPortal').directive('vpVideoControl', videoControlDirective);
})();