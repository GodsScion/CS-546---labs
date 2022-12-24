(function ($) {
	var requestConfig = {
		method: 'GET',
		url: 'http://api.tvmaze.com/shows',
	};

	$.ajax(requestConfig).then(function (responseMessage) {
		$('#showList').empty();
		$('#showList').hide();
		$('#show').hide();
		$('#homeLink').hide();
		$.each(responseMessage, function () { $('#showList').append(`<li><a class="shownLink" href='${this._links.self.href}'>${this.name}</a></li>`); });
		$('#showList').show();

		$('a.shownLink').on('click', function (event) {
			event.preventDefault();
			$('#showList').hide();
			$('#show').empty();
			linkClicked(event.target.href);
			$('#show').show();
			$('#homeLink').show();
		});
	});


	$('#searchForm').submit(function (event) {
		event.preventDefault();
		if (!$('#search_term').val() || $('#search_term').val().trim() == "") {
			alert("Please enter a valid Show Name");
		}
		else {
			var requestConfig2 = {
				method: 'GET',
				url: 'http://api.tvmaze.com/search/shows?q=' + $('#search_term').val()
			};
			$.ajax(requestConfig2).then(function (responseMessage) {
				$('#homeLink').hide();
				$('#showList').empty();
				$('#showList').hide();
				$('#show').hide();
				$.each(responseMessage, function () { $('#showList').append(`<li><a class="shownLink" href='${this.show._links.self.href}'>${this.show.name}</a></li>`); });
				$('#showList').show();
				$('#homeLink').show();
				$('a.shownLink').on('click', function (event) {
					event.preventDefault();
					console.log("hello");
					$('#showList').hide();
					$('#show').empty();
					console.log(event.target.href);
					linkClicked(event.target.href); 
					$('#show').show();
					$('#homeLink').show();
				});
			});
		}
	});

	function linkClicked(link) {
		var requestConfig3 = {
			method: 'GET',
			url: link
		};
		$.ajax(requestConfig3).then(function (responseMessage) {
			if (responseMessage.image && !responseMessage.image.medium) responseMessage.image.medium = "/public/img.jpeg";
			if (!responseMessage.name || responseMessage.name.trim() == "") responseMessage.name = "N/A";			
			if (!responseMessage.language || responseMessage.language.trim() == "") responseMessage.language = "N/A";
			if (responseMessage.rating && !responseMessage.rating.average) responseMessage.rating.average = "N/A";
			if (responseMessage.network && (!responseMessage.network.name || responseMessage.network.name.trim() == "")) responseMessage.network.name = "N/A";
			if (!responseMessage.summary || responseMessage.summary.trim() == "") responseMessage.summary = "N/A";
			let list = "";
			if (responseMessage.genres.length == 0) {
				responseMessage.genres = ["N/A"];
				list = 'N/A'
			}else{
				for(let i=0; i<responseMessage.genres.length; i++){
					list += `<li>${responseMessage.genres[i]}</li>`;
				}
			}
			
			
			$('#show').append(`<h1>${responseMessage.name}<h1>
				<img src="${responseMessage.image && responseMessage.image.medium? responseMessage.image.medium: "/public/img.jpeg"}"/>
				<dl>
					<br><dt>Language</dt>
					<dd>${responseMessage.language? responseMessage.language: "N/A"}</dd>
					<br><dt>Genres</dt>
					<ul>${list}</ul>
					<br><dt>Average Rating</dt>
					<dd>${responseMessage.rating && responseMessage.rating.average? responseMessage.rating.average: "N/A"}</dd>
					<br><dt>Network</dt>
					<dd>${responseMessage.network && responseMessage.network.name? responseMessage.network.name: "N/A"}</dd>
					<br><dt>Summary</dt>
					<dd>${responseMessage.summary? responseMessage.summary: "N/A"}</dd>
				</dl>`);
		});
	}
})(window.jQuery);