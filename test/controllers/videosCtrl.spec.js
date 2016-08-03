/**
 * Created by Vladimir on 8/3/2016.
 */

describe('Videos controller', function (){
	beforeEach(module('videoPortal'));

	var $controller;
	var $rootScope;
	var $scope;
	var $q;
	var videoService;

	beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _videoService_){
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$q = _$q_;
		$scope = $rootScope.$new();
		videoService = _videoService_;
	}));

	it ('loads 10 videos initially', function () {
		var getAllSpy = spyOn(videoService, 'getAll').and.callFake(function () {
			return $q.when({});
		});
		$controller('VideosCtrl', {$scope: $scope});



		expect(getAllSpy).toHaveBeenCalledWith(0, 10);
	});

	it ('loads 10 more videos when scrolled to the bottom', function () {
		var getAllSpy = spyOn(videoService, 'getAll').and.callFake(function () {
			return $q.when([{}]);
		});
		$controller('VideosCtrl', {$scope: $scope});
		$scope.$apply();

		$scope.scrolledToBottom();


		expect(getAllSpy).toHaveBeenCalledWith(10, 20);
	});

	it ('20 videos displayed after scrolling once', function () {
		spyOn(videoService, 'getAll').and.callFake(function () {
			return $q.when([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
		});
		$controller('VideosCtrl', {$scope: $scope});
		$scope.$apply();

		$scope.scrolledToBottom();
		$scope.$apply();


		expect($scope.videos.length).toBe(20);
	});
});