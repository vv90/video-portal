/**
 * Created by Vladimir on 8/3/2016.
 */

(function () {
	'use strict';

	function watchScrollDirective($window) {
		return {
			restrict: 'A',
			scope: {
				scrolledToBottom: '&vpWatchScroll'
			},
			link: function (scope) {
				angular.element($window).bind('scroll', function () {
					var windowHeight = "innerHeight" in window
						? window.innerHeight
						: document.documentElement.offsetHeight;

					var body = document.body, html = document.documentElement;
					var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
					var windowBottom = windowHeight + window.pageYOffset;
					if (windowBottom >= docHeight) {
						scope.scrolledToBottom()();
					}
				});
			}
		}
	}
	watchScrollDirective.$inject = ['$window'];

	angular.module('videoPortal').directive('vpWatchScroll', watchScrollDirective);
})();