jQuery(function($) {

	/**
	 * Toggles loading indicator in score widget
	 * @param loading
	 */
	function setLoading(loading) {
		if (loading) {
			$(".defiant-fab-counter p").hide();
			$(".defiant-fab-counter i").show();
		} else {
			$(".defiant-fab-counter p").show();
			$(".defiant-fab-counter i").hide();
		}
	}

	/**
	 * Makes a AJAX request to the server
	 * @param endPoint WordPress ajax endpoint
	 * @param doneFn Result callback
	 * @param data data to POST
	 */
	function request(endPoint, doneFn, data) {

		setLoading(true);

		$.post(def.ajaxurl + '?action=' + endPoint, data)
			.done(doneFn)
			.error(function (e) {
				console.log(e);
			})
			.always(function () {
				setLoading(false);
			});
	}

	/**
	 * Updates a users score for the current post
	 * @param obj
	 */
	function updateScore(obj) {
		request('update_score', function(res) {
			var datum = JSON.parse(res);
			$(".defiant-fab-counter p").html(datum.total_score);
		}, obj);
	}

	/**
	 * Click event for the "up" arrow, changes users score to +1
	 */
	$("#defiant-icon-up").click(function (e) {
		$(e.target).addClass('defiant-icon-selected');
		$("#defiant-icon-down").removeClass('defiant-icon-selected');

		updateScore({
			score: 1,
			post_id: def.post_id
		});
	});

	/**
	 * Click event for the "down" arrow, changes users score to -1
	 */
	$("#defiant-icon-down").click(function (e) {
		$(e.target).addClass('defiant-icon-selected');
		$("#defiant-icon-up").removeClass('defiant-icon-selected');

		updateScore({
			score: -1,
			post_id: def.post_id
		});
	});

	/**
	 * Fetches initial state of score widget
	 */
	$(document).ready(function () {
		request('fetch_scores', function(res) {
			var datum = JSON.parse(res);
			console.log(datum);
			$(".defiant-fab-counter p").html(datum.total_score);
			if (datum.user_score === -1) {
				$("#defiant-icon-down").addClass('defiant-icon-selected');
			} else if (datum.user_score === 1) {
				$("#defiant-icon-up").addClass('defiant-icon-selected');
			}
		}, {post_id: def.post_id});
	})
});
