
$("#ls_company_loading_spinner").hide();

load_Email_table();

function load_Email_table() {

    $.ajax({
        type: "POST",
        url: "/EmailListSupv/ShowEmails",
        contentType: "application/json; charset-utf-8",

        beforeSend: function () {
            $("#ls_company_loading_spinner").show();
        },

        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'ERROR!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                console.log("test", resp);
                show_Email_list(resp);
            }
        },

        error: function (jqXHR, exception) {

            var msg = '';

            if (jqXHR.status == 0) {
                msg = 'Not Connected.\nVerify Network.';
            }

            else if (jqXHR.status == 404) {
                msg = 'Requested Page not FOUND. [ERROR:404]';
            }

            else if (jqXHR.status == 500) {
                msg = 'Internal Server Error. [ERROR:500]';
            }

            else if (exception == 'parseerror') {
                msg = 'Requested JSON parse failed.';
            }

            else if (exception == 'timeout') {
                msg = 'Time Out Error.';
            }

            else if (exception == 'abort') {
                msg = 'Ajax request aborted.';
            }

            else {
                msg = 'Uncaught Error.\n + jqXHR.responseText';
            }

            iziToast.error({
                title: 'error!',
                message: msg,
                position: 'bottomRight'
            });
        },

        complete: function () {
            $("#ls_company_loading_spinner").hide();
        }
    });
}


function show_Email_list(resp) {
    $("#emailList").empty();

    if (resp.data.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
    }

    $.each(resp.data, function (index, value) {

        var emailList = $("<td>").append(value.EmailList);
        $("#emailList").data("Id", value.Id);

       

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        

        $("<tr>").attr("class", "text-center").append(emailList, iconcell).appendTo("#emailList");

    });
}


$("#ls_add_company_btn").on("click", function (e){
    e.preventDefault();

    json = {
        Id: $("#emailList").data("Id"),
        EmailList: $("#emailList").text()
    }

    //console.log("test", json);

    $.ajax({
        url: '/EmailListSupv/AddEmail',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(json),
        beforeSend: function () {
            $("#ls_company_loading_spinner").show();
        },
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }

            else {

                //alert('ghumaboooooooooo');
                iziToast.success({
                    title: 'Saved Successfully!',
                    message: resp.message,
                    position: 'bottomRight'
                });

                load_Email_table(1);
            }
        },

        error: function (jqXHR, exception) {
            var msg = '';

            if (jqXHR.status == 0) {
                msg = 'Not Connected.\nVerify Network.';
            }

            else if (jqXHR.status == 404) {
                msg = 'Requested Page not FOUND. [ERROR:404]';
            }

            else if (jqXHR.status == 500) {
                msg = 'Internal Server Error. [ERROR:500]';
            }

            else if (exception == 'parseerror') {
                msg = 'Requested JSON parse failed.';
            }

            else if (exception == 'timeout') {
                msg = 'Time Out Error.';
            }

            else if (exception == 'abort') {
                msg = 'Ajax request aborted.';
            }

            else {
                msg = 'Uncaught Error.\n + jqXHR.responseText';
            }

            iziToast.error({
                title: 'error!',
                message: msg,
                position: 'bottomRight'
            });

        },

        complete: function () {
            $("#ls_company_loading_spinner").hide();
        }

    });
});