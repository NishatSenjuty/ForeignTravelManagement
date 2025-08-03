

//Function For Companies Page - Add Company Button - Show Add Company Modal Page *
$("#ls_add_company_btn").on("click", function () {
    $("#ls_add_company_modal").modal("show");
    $("#ModalAdd").trigger("reset");
    $("#ModalAdd").removeClass('was-validated');
});

// Function For Companies Page - Saving New Company in database *
$("#ModalAdd").on("submit", function (e) {
    e.preventDefault();

    if ($('#ModalAdd')[0].checkValidity() == false)
    {
        e.stopPropagation();
    }

    else {
        json = {
            CompanyShortName: $("#ls_add_company_short_name").val(),       //ShortName
            CompanyName: $("#ls_add_company_name").val(),
            CompanyActiveStatus: $("#ls_add_company_status").val()
        };

        $.ajax({
            url: '/Companies/AddCompany',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(json),
            beforeSend: function () {
                $("#spinner").show();
            },
            success: function (resp) {
             //  alert('ok');
                if (resp.error) {
                    iziToast.error({
                        title: 'error!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }

                else {
                    $("#ls_add_company_modal").modal("hide");
                    iziToast.success({
                        title: 'Saved Successfully!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_company_table(1);

                    $("#ModalAdd").removeClass('was-validated');
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
                $("#spinner").hide();
            }

        });

    }

});

///-----------------------------------------------------------
async function sendRequest(url, method, data) {
    try {

        // Show the spinner
        spinner.style.display = 'inline-block';

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        const response = await fetch(url, options);
        // Hide the spinner
        spinner.style.display = 'none';

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

let companyArr = [];
async function getCompanyUnitList() {
    const apiUrl = '/Companies/ShowCompanies';
    const response = await sendRequest(apiUrl, 'POST');
    console.log(response);
    if (response.isValid) {
        companyArr = response.data;
    }
}
getCompanyUnitList();
///-----------------------------------------------------------


//Function For Companies Page - Showing Company Table View     *

load_company_table(1);

function load_company_table()
{
    //alert();
    //console.log("test json", json);
    $.ajax({
        type: "POST",
        url: "/Companies/ShowCompanies",
        contentType: "application/json; charset-utf-8",

        beforeSend: function () {
            $("#spinner").show();
        },
        success: function (resp) {
             // alert('ok');
            if (resp.error) {
                iziToast.error({
                    title: 'ERROR!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
               // console.log("test", resp);
                show_company_list(resp);
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
            $("#spinner").hide();
        }
    });
}

//Function For Companies Page - Showing Data in Company Table Grid   *

function show_company_list(resp) {
    $("#ls_company_table_tbody").empty();
    $("#ls_company_table").DataTable().clear().destroy();

    if (resp.data.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
    }

    $.each(resp.data, function (index, value) {
        var slnocell = $("<td>").append(index + 1);
        var companyShortName = $("<td>").append(value.CompanyShortName);
        var companyName = $("<td>").append(value.CompanyName);
        var companyStatus = $("<td>");

        if (value.CompanyActiveStatus == 1) {
            $("<div>").attr("class", "badge bg-success").append("Active").appendTo(companyStatus);
        }
        else if (value.CompanyActiveStatus == 0) {
            $("<div>").attr("class", "badge bg-danger").append("Inactive").appendTo(companyStatus);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(companyStatus);
        }

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        //var editicon = $("<i>").attr({
        //    "class": "e-btn bi-pen-fill text-white bg-warning rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Edit Company"
        //}).appendTo(icondiv);

        var editicon = $("<img>").attr({
            "src": "/_Assets/Icons/Edit_2.png",
            "alt": "Edit Icon",
            "title": "Edit",
            "style": "cursor: pointer; border: 2px solid white; width: 40px; height: 40px;"
        });

        icondiv.append(editicon);

        //var deleteicon = $("<i>").attr({
        //    "class": "e-btn bi-trash-fill text-white bg-danger rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Delete Company"
        //}).appendTo(icondiv);

        var deleteicon = $("<img>").attr({
            "src": "/_Assets/Icons/Delete2.png",
            "alt": "Delete Icon",
            "title": "Delete",
            "style": "cursor: pointer; border: 2px solid white; width: 40px; height: 40px;"
        });

        icondiv.append(deleteicon);

        $("<tr>").attr("class", "text-center").append(slnocell, companyShortName, companyName, companyStatus, iconcell).appendTo("#ls_company_table_tbody");

        (function ($) {
            editicon.on("click", function (e) {
                e.preventDefault();

                $("#ModalEdit").modal("show");
                $("#ls_edit_company_short_name").data("Id", value.Id);
                $("#ls_edit_company_short_name").val(value.CompanyShortName);
                $("#ls_edit_company_name").val(value.CompanyName);
                $("#ls_edit_company_status").val(value.CompanyActiveStatus);
            });
            deleteicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_delete_company_modal").modal("show");
                $("#ls_delete_company_id_hidden").data("Id", value.Id);
            });
        }) (jQuery);
    });

    let jquery_datatable = $("#ls_company_table").DataTable();
}


// Function for Companies Page - Edit Company by Edit Button Icon in Action on Company List Table *
$("#ModalEdit_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ModalEdit_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
       // alert('ok1');
        json = {
            id: $("#ls_edit_company_short_name").data("Id"),
            CompanyName: $("#ls_edit_company_name").val(),
            CompanyShortName: $("#ls_edit_company_short_name").val(), 
            CompanyActiveStatus: $("#ls_edit_company_status").val()
        };

        $.ajax({
            type: "POST",
            url: "/Companies/EditCompany",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),


            success: function (resp) {
                //alert('ok2');
                if (resp.error) {
                    iziToast.error({
                        title: 'ERROR!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }

                else {
                    $("#ModalEdit").modal("hide");
                    iziToast.success({
                        title: 'Updated Successfully!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                    load_company_table();
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

            beforeSend: function () {
                $("#spinner").show();
            },

            complete: function () {
                $("#spinner").hide();
            }
        });
    }
});

//Function for Companies Page - Delete Company by Delete Button Icon in Action on Company List Table *

$("#ls_delete_company_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ls_delete_company_modal_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        // alert('ok1');
        json = {
            id: $("#ls_delete_company_id_hidden").data("Id"),
        };

        $.ajax({
            type: "POST",
            url: "/Companies/DeleteCompany",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),

            success: function (resp) {
                //alert('ok2');
                if (resp.error) {
                    iziToast.error({
                        title: 'ERROR!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }

                else {
                    $("#ls_delete_company_modal").modal("hide");
                    iziToast.success({
                        title: 'Deleted!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                    load_company_table();
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
            beforeSend: function () {
                $("#spinner").show();
            },

            complete: function () {
                $("#spinner").hide();
            }

        });
    }
});

