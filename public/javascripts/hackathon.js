$(document).ready(function() {
	$('#register-button').click(function(event) {
		event.preventDefault();
		$('#register-form').show();
	});

	var source = $("#new-team-member-template").html();
	var template = Handlebars.compile(source);

	$('#add-team-member').click(function(event) {
		event.preventDefault();
		$('#form-team').append(template());
	});
});