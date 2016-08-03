/**
 * Created by Vladimir on 8/2/2016.
 */

describe('Video service', function (){
	beforeEach(module('videoPortal'));

	var $httpBackend;
	var $rootScope;
	//var $q;
	var Session;
	var videoService;

	beforeEach(inject(function (_$httpBackend_, _$rootScope_, _Session_, _videoService_) {
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
		//$q = _$q_;
		Session = _Session_;
		videoService = _videoService_;
	}));

	describe('get videos', function (){
		it ('forms the request correctly', function () {
			$httpBackend.whenGET('/videos?skip=1&limit=10&sessionId=2')
				.respond({status: 'success'});
			Session.sessionId = 2;

			videoService.getAll(1, 10);

			$httpBackend.expectGET('/videos?skip=1&limit=10&sessionId=2');
			$httpBackend.flush();
		});

		it ('rejects unauthorised calls', function () {
			Session.sessionId = null;
			var responseSpy = jasmine.createSpy('response');

			videoService.getAll(1, 10)
				.catch(function () {
					responseSpy();
				});

			$rootScope.$digest();
			expect(responseSpy).toHaveBeenCalled();
		});

		it ('forms a request without skip and limit values correctly', function (){
			$httpBackend.whenGET('/videos?sessionId=2')
				.respond({status: 'success'});
			Session.sessionId = 2;

			videoService.getAll();

			$httpBackend.expectGET('/videos?sessionId=2');
			$httpBackend.flush();
		});

		it ('returns data correctly', function () {
			$httpBackend.whenGET('/videos?skip=1&limit=10&sessionId=2')
				.respond({status: 'success', data: [1]});
			Session.sessionId = 2;
			var videos = null;

			videoService.getAll(1, 10)
				.then(function (data) {
					videos = data;
				});

			$httpBackend.expectGET('/videos?skip=1&limit=10&sessionId=2');
			$httpBackend.flush();
			expect(videos).toEqual([1]);
		});

		it ('handles error response correctly', function () {
			$httpBackend.whenGET('/videos?skip=1&limit=10&sessionId=2')
				.respond({data: {status: 'error', error: 'error'}});
			Session.sessionId = 2;
			var responseSpy = jasmine.createSpy('response');

			videoService.getAll(1, 10)
				.catch(responseSpy);

			$httpBackend.expectGET('/videos?skip=1&limit=10&sessionId=2');
			$httpBackend.flush();
			expect(responseSpy).toHaveBeenCalledWith({data: {status: 'error', error: 'error'}});
		});
	});

	describe('get single video', function () {
		it ('forms the request correctly', function (){
			$httpBackend.whenGET('/video?videoId=1&sessionId=2')
				.respond({status: 'success'});
			Session.sessionId = 2;

			videoService.get(1);

			$httpBackend.expectGET('/video?videoId=1&sessionId=2');
			$httpBackend.flush();
		});

		it('rejects unauthorised calls', function () {

			Session.sessionId = null;
			var responseSpy = jasmine.createSpy('response');

			videoService.get(1)
				.catch(function () {
					responseSpy();
				});

			$rootScope.$digest();
			expect(responseSpy).toHaveBeenCalled();
		});

		// it('rejects calls with missing video id', function () {
		//
		// 	Session.sessionId = 2;
		// 	var responseSpy = jasmine.createSpy('response');
		//
		// 	videoService.get()
		// 		.catch(function () {
		// 			responseSpy();
		// 		});
		//
		// 	$rootScope.$digest();
		// 	expect(responseSpy).toHaveBeenCalled();
		// });

		it ('returns data correctly', function () {
			$httpBackend.whenGET('/video?videoId=1&sessionId=2')
				.respond({status: 'success', data: {a: 1}});
			Session.sessionId = 2;
			var video = null;

			videoService.get(1)
				.then(function (data) {
					video = data;
				});

			$httpBackend.expectGET('/video?videoId=1&sessionId=2');
			$httpBackend.flush();
			expect(video).toEqual({a: 1});
		});

		it ('handles error response correctly', function () {
			$httpBackend.whenGET('/video?videoId=1&sessionId=2')
				.respond({data: {status: 'error', error: 'error'}});
			Session.sessionId = 2;
			var responseSpy = jasmine.createSpy('response');

			videoService.get(1)
				.catch(responseSpy);

			$httpBackend.expectGET('/video?videoId=1&sessionId=2');
			$httpBackend.flush();
			expect(responseSpy).toHaveBeenCalledWith({data: {status: 'error', error: 'error'}});
		});
	});

	describe('rate video', function () {
		it ('forms the request correctly', function (){
			$httpBackend.whenPOST('/video/ratings?sessionId=2')
				.respond({status: 'success'});
			Session.sessionId = 2;

			videoService.rate(1, 5);

			$httpBackend.expectPOST('/video/ratings?sessionId=2', {videoId: 1, rating: 5});
			$httpBackend.flush();
		});

		it('rejects unauthorised calls', function () {

			Session.sessionId = null;
			var responseSpy = jasmine.createSpy('response');

			videoService.rate(1, 5)
				.catch(function () {
					responseSpy();
				});

			$rootScope.$digest();
			expect(responseSpy).toHaveBeenCalled();
		});

		// it('rejects calls with missing video id', function () {
		//
		// 	Session.sessionId = 2;
		// 	var responseSpy = jasmine.createSpy('response');
		//
		// 	videoService.rate()
		// 		.catch(function () {
		// 			responseSpy();
		// 		});
		//
		// 	$rootScope.$digest();
		// 	expect(responseSpy).toHaveBeenCalled();
		// });

		// it('rejects calls with missing video rating', function () {
		//
		// 	Session.sessionId = 2;
		// 	var responseSpy = jasmine.createSpy('response');
		//
		// 	videoService.rate(1)
		// 		.catch(function () {
		// 			responseSpy();
		// 		});
		//
		// 	$rootScope.$digest();
		// 	expect(responseSpy).toHaveBeenCalled();
		// });

		it ('returns data correctly', function () {
			$httpBackend.whenPOST('/video/ratings?sessionId=2')
				.respond({status: 'success', data: {a: 1}});
			Session.sessionId = 2;
			var success = null;

			videoService.rate(1, 5)
				.then(function (data) {
					success = data;
				});

			$httpBackend.expectPOST('/video/ratings?sessionId=2');
			$httpBackend.flush();
			expect(success).toEqual({a: 1});
		});

		it ('handles error response correctly', function () {
			$httpBackend.whenPOST('/video/ratings?sessionId=2')
				.respond({data: {status: 'error', error: 'error'}});
			Session.sessionId = 2;
			var responseSpy = jasmine.createSpy('response');

			videoService.rate(1, 5)
				.catch(responseSpy);

			$httpBackend.expectPOST('/video/ratings?sessionId=2');
			$httpBackend.flush();
			expect(responseSpy).toHaveBeenCalledWith({data: {status: 'error', error: 'error'}});
		});
	});
});