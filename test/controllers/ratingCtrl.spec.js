/**
 * Created by Vladimir on 8/5/2016.
 */
describe('Rating controller', function () {
	beforeEach(module('videoPortal'));

	var $controller;
	var $rootScope;
	var events;
	var $scope;

	beforeEach(inject(function (_$controller_, _$rootScope_, _events_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		events = _events_;
	}));

	it ('sets initial rating correctly', function () {


		$controller('RatingCtrl', {$scope: $scope});
		$scope.rating = 4;
		$scope.$apply();

		expect($scope.stars).toEqual([
			{ active: true },
			{ active: true },
			{ active: true },
			{ active: true },
			{ active: false }
		]);
	});

	it ('previews rating correctly', function () {
		$controller('RatingCtrl', {$scope: $scope});
		$scope.previewRating(4);

		expect($scope.stars).toEqual([
			{ active: true },
			{ active: true },
			{ active: true },
			{ active: true },
			{ active: false }
		]);
	});

	it ('does not allow previewing fixed rating', function () {
		$controller('RatingCtrl', {$scope: $scope});
		$scope.rating = 4;
		$scope.ratingFixed = true;
		$scope.$apply();

		$scope.previewRating(3);

		expect($scope.stars).toEqual([
			{ active: true },
			{ active: true },
			{ active: true },
			{ active: true },
			{ active: false }
		]);
	});

	it ('fixes the rating after its submitted', function () {
		$scope.rate = function () { return function (){}; };
		$scope.rating = 4;
		$controller('RatingCtrl', {$scope: $scope});

		$scope.setRating(5);

		expect($scope.rating).toBe(5);
		expect($scope.ratingFixed).toBe(true);
	});
});