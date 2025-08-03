
var find_ip = ""; //ip variable

//ip method
$.getJSON('https://api.ipify.org?format=json', function (data) {
    console.log(data.ip);
    find_ip = data.ip; //receive ip in variable
});


$("#admin_sign_in_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#admin_sign_in_form')[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        json = {
            username: $("#username").val(),
            password: $("#password").val(),
            browser: platform.name + " " + platform.version,
            operatingSystem: platform.os.toString(),
            ipAddress: find_ip  //find_ip  send ip to backend
        };

        $.ajax({
            url: "/Accounts/AddSignIn",
            type: "POST",
            data: json,
            dataType: "json",
            traditional: true,
            
            success: function (resp) {
                if (resp.error) {
                    iziToast.error({
                        title: 'error!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }

                else {
                    location.href = resp.url;
                }
            },

            error: function (a, b, err) {

                iziToast.error({
                    title: 'error!',
                    message: msg,
                    position: 'bottomRight'
                });

            },

            beforeSend: function () {
                $("#login_btn").empty();
                $("#login_btn").append('<img src="/Content/assets/vendors/svg-loaders/circles.svg" class="text text-white" style="width: 2rem; height: 2rem" alt="audio">');
            },

            complete: function () {
                $("#login_btn").empty();
                $("#login_btn").append('Login');
            }

        });

    } $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
        find_ip = data.ip;
    })

});


