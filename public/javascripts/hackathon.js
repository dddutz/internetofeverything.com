
// DOM Ready =============================================================
$(document).ready(function() {
    var source = $("#NewTeamMemberTemplate").html();
    var template = Handlebars.compile(source);

    $('#register-button').click(function(event) {
        event.preventDefault();
        $('#register-form').show();
    });

    var teamMemberId = 0;
    $('#btnAddTeamMember').click(function(event) {
        event.preventDefault();
        teamMemberId++;
        $('#inputTeamMembers').append(template({id: teamMemberId}));
    });

    $('#inputTeamMembers').on('click', '.removeTeamMember', removeTeamMember);

    $('#btnRegisterUser').on('click', registerUser);
});

// Functions =============================================================

function registerUser(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#registerUser input').each(function(index, val) {
        if ($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still 0.
    if (errorCount === 0) {
        // Compile all user info into one object
        var newUser = {
            'email': $('#registerUser fieldset input#inputFirstName').val(),
            'first_name': $('#registerUser fieldset input#inputLastName').val(),
            'last_name': $('#registerUser fieldset input#inputEmail').val(),
            'status': "registered"
        }

        // Use AJAX to post the object to adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function(res) {
            // Check for successful (blank) response
            if (res.msg === '') {
                // Clear the form inputs
                $('#registerUser fieldset input').val('');
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + res.msg);
            }
        });
    } else {
        alert('Please fill in all fields');
        return false;
    }
}

function removeTeamMember(event) {
    event.preventDefault();
    event.target.parentElement.remove();
}