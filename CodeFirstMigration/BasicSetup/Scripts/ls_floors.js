
//Function For Floor Page - Add Floor Button - Show Add Floor Modal Page *

$("#ls_add_floor_btn").on("click", function () {
    $("#ModalAdd").modal("show");
    $("#ModalAdd_form").trigger("reset");
    $("#ModalAdd_form").removeClass('was-validated');

});

// Function For Floors Page - Saving New Floor in database *

$("#ModalAdd_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#ModalAdd_form')[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        json = {
            FloorName: $("#ls_add_floor_name").val(),
            FloorActiveStatus: $("#ls_add_floor_status").val(),
            CompanyId: $("#ls_add_floor_company").val(),
            LocationId: $("#ls_add_floor_location").val()
        };

        $.ajax({
            url: '/Floors/AddFloor',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(json),
            beforeSend: function () {
                $("#spinner").show();
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
                    $("#ModalAdd").modal("hide");
                    iziToast.success({
                        title: 'Saved Successfully!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                    load_floor_table(1);

                    $("#ModalAdd_form").removeClass('was-validated');
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


// Function For Floor Page - Load company, location in dropdown *
load_companies_for_dropdown_for_floor_arr();

function load_companies_for_dropdown_for_floor_arr() {
    $.ajax({
        url: '/Companies/ShowCompaniesForDropDownLocation',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                //console.log(resp.data);
                $("#ls_add_floor_company").empty();
                $("#ls_add_floor_location").empty();
                $("#ls_add_floor_company").append('<option value="-1">Select Company</option>');
                $("#ls_add_floor_location").append('<option value="-1">Select Location</option>');

                //filter
                var companySelect = document.getElementById("ls_add_floor_company");
                var locationSelect = document.getElementById("ls_add_floor_location");
                show_companies_location_floor_select_items(companySelect, locationSelect, resp.data);

                var companySelect = document.getElementById("ls_edit_floor_company");
                var locationSelect = document.getElementById("ls_edit_location_name");

                show_companies_location_floor_select_items(companySelect, locationSelect, resp.data);

            }

        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            iziToast.error({
                title: 'Ajax Error!',
                message: msg,
                position: 'bottomRight'
            });
        },
        beforeSend: function () {
            $("#ls_add_floor_company").attr("disabled", true);
            $("#ls_add_floor_location").attr("disabled", true);
        },
        complete: function () {
            $("#ls_add_floor_company").attr("disabled", false);
            $("#ls_add_floor_location").attr("disabled", false);
        }
    });

    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 50);
    });
}

// show_companies_location_select_items
function show_companies_location_floor_select_items(companySelect, locationSelect, data) {
    //console.error(data);
    $.each(data, function (index, value) {
        companySelect.options[companySelect.options.length] = new Option(value.CompanyName, value.Id);
    });


    //this method directly executes
    //let companyId = companySelect.options[companySelect.selectedIndex].value;

    //if (companyId <= 0) {
    //    locationSelect.length = 1;
    //    return;
    //}
    //locationSelect.length = 1;
    //$.each(data.find(e => e.Id === parseInt(companyId)).Locations, function (index, value) {

    //    locationSelect.options[locationSelect.options.length] = new Option(value.Address, value.Id);

    //});

    //this method executes on onchange
    companySelect.onchange = function () {

        let companyId = companySelect.options[companySelect.selectedIndex].value;

        if (companyId <= 0) {
            locationSelect.length = 1;
            return;
        }
        locationSelect.length = 1;

        $.each(data.find(e => e.Id === parseInt(companyId)).Locations, function (index, value) {

            locationSelect.options[locationSelect.options.length] = new Option(value.LocationName, value.Id);

        });

    }
}



//Function For Floors Page - Showing floor Table View *

load_floor_table(1);

function load_floor_table() {
    //alert();

    $.ajax({
        type: "POST",
        url: "/Floors/ShowFloors",
        contentType: "application/json; charset-utf-8",


        beforeSend: function () {
            $("#spinner").show();
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
                //console.log("test", resp);
                show_floor_list(resp);
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

//Function For Floors Page - Shows data on floor table *
function show_floor_list(resp) {
    $("#ls_floor_table_tbody").empty();
    $("#ls_floor_table").DataTable().clear().destroy();

    if (resp.data.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
    }

    $.each(resp.data, function (index, value) {
        var slnocell = $("<td>").append(index + 1);
        //var slnocell = $("<td>").attr("scope", "row").append(sl += 1);
        var companyName = $("<td>").append(value.CompanyName);
        var Address = $("<td>").append(value.LocationName);
        var FloorName = $("<td>").append(value.FloorName);
        var FloorActiveStatus = $("<td>");

        if (value.FloorActiveStatus == 1) {
            $("<div>").attr("class", "badge bg-success").append("Active").appendTo(FloorActiveStatus);
        }
        else if (value.FloorActiveStatus == 0) {
            $("<div>").attr("class", "badge bg-danger").append("Inactive").appendTo(FloorActiveStatus);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(FloorActiveStatus);
        }

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        //var editicon = $("<i>").attr({
        //    "class": "e-btn bi-pen-fill text-white bg-warning rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Edit Floor"
        //}).appendTo(icondiv);
        //var deleteicon = $("<i>").attr({
        //    "class": "e-btn bi-trash-fill text-white bg-danger rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Delete Floor"
        //}).appendTo(icondiv);

        var editicon = $("<img>").attr({
            "src": "/_Assets/Icons/Edit_2.png",
            "alt": "Edit Icon",
            "title": "Edit",
            "style": "cursor: pointer; border: 2px solid white; width: 38px; height: 38px;"
        });

        icondiv.append(editicon);

        var deleteicon = $("<img>").attr({
            "src": "/_Assets/Icons/Delete2.png",
            "alt": "Delete Icon",
            "title": "Delete",
            "style": "cursor: pointer; border: 2px solid white; width: 40px; height: 40px;"
        });

        icondiv.append(deleteicon);

        $("<tr>").attr("class", "text-center").append(slnocell, companyName, Address, FloorName, FloorActiveStatus, iconcell).appendTo("#ls_floor_table_tbody");

        (function ($) {
            editicon.on("click", function (e) {
                e.preventDefault();
               // alert(value.LocationId);
                $("#ModalEdit").modal("show");

                $("#ls_edit_floor_name").data("Id", value.Id);
                $("#ls_edit_floor_name").val(value.FloorName);

                $("#ls_edit_floor_Id").val(value.Id);

                $("#ls_edit_floor_company").val(value.CompanyId).trigger('change');

                $("#ls_edit_location_name").val(value.LocationId);
                $("#ls_edit_floor_status").val(value.FloorActiveStatus);
            });
            deleteicon.on("click", function (e) {
                e.preventDefault();

                $("#ModalDelete").modal("show");
                $("#ls_delete_floor_id_hidden").data("Id", value.Id);
            });
        })(jQuery);
    });

    let jquery_datatable = $("#ls_floor_table").DataTable();
}


//Function for Floors Page - Delete Floor by Delete Button Icon in Action on Floor List Table *

$("#ModalDelete_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ModalDelete_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        json = {
            id: $("#ls_delete_floor_id_hidden").data("Id"),
        };

        $.ajax({
            type: "POST",
            url: "/Floors/DeleteFloor",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),

            success: function (resp) {
                if (resp.error) {
                    iziToast.error({
                        title: 'ERROR!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }

                else {
                    $("#ModalDelete").modal("hide");
                    iziToast.success({
                        title: 'Deleted!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                    load_floor_table();
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

//Function for Floors Page - Edit Floor by Edit Button Icon in Action on Floor List Table *

$("#ModalEdit_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ModalEdit_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        json = {


            Id: $("#ls_edit_floor_Id").val(),
            FloorName: $("#ls_edit_floor_name").val(), 
            FloorActiveStatus: $("#ls_edit_floor_status").val(), 
            CompanyId: $('#ls_edit_floor_company').find(":selected").val(),
            LocationId: $('#ls_edit_location_name').find(":selected").val()
        };

        //console.log(json);

        $.ajax({
            type: "POST",
            url: "/Floors/EditFloor",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),


            success: function (resp) {
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

                    load_floor_table();
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