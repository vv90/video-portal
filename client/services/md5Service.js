/**
 * Created by Vladimir on 8/2/2016.
 */

(function (){
	'use strict';

	function md5Service () {
		return {
			hash: MD5
		}
	}

	angular.module('videoPortal').factory('md5Service', md5Service);
})();