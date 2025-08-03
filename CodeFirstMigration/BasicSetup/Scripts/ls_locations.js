


//Function For Locations Page - Add Location Button - Show Add Location Modal Page *

$("#ls_add_location_btn").on("click", function () {
    $("#ModalAdd").modal("show");
    $("#ModalAdd_form").trigger("reset");
    $("#ModalAdd_form").removeClass('was-validated');

});

// Function For Locations Page - Saving New Location in database *
$("#ModalAdd_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#ModalAdd_form')[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else
    {
        json = {
            LocationName: $("#ls_add_location_name").val(),
            LocationActiveStatus: $("#ls_add_location_status").val(),
            CompanyId: $("#ls_add_location_company").val()

        };
        $.ajax({
            url: '/Locations/AddLocation',
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

                    load_location_table(1);

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

//Function for Locations Page - Delete Location by Delete Button Icon in Action on Location List Table *
$("#ModalDelete_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ModalDelete_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        json = {
            id: $("#ls_delete_location_id_hidden").data("Id"),
        };

        $.ajax({
            type: "POST",
            url: "/locations/Deletelocation",
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

                    load_location_table();
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

//Function for Locations Page - Edit Location by Edit Button Icon in Action on Location List Table *
$("#ModalEdit_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ModalEdit_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        json = {

            Id: $("#ls_edit_location_Id").val(),
            LocationName: $("#ls_edit_location_name").val(),
            LocationActiveStatus: $("#ls_edit_location_status").val(), 
            CompanyId: $('#ls_edit_location_company').find(":selected").val() 

        };

        //console.log(json);

        $.ajax({
            type: "POST",
            url: "/Locations/EditLocation",
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

                    load_location_table();
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

//Function for Locations Page - Showing Location Table View *

load_location_table(1);
function load_location_table() {
    

    $.ajax({
        type: "POST",
        url: "/Locations/ShowLocations",
        contentType: "application/json; charset-utf-8",

        beforeSend: function () {
            $("#spinner").show()
        },

        success: function (resp) {
            //alert('ok1');
            if (resp.error) {
                iziToast.error({
                    title: 'ERROR!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
               // console.log("test", resp);
                show_location_list(resp);
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

//Function for Locations Page - Shows data on location table *

function show_location_list(resp)
{
    //alert('ok1');
    $("#ls_location_table_tbody").empty();
    $("#ls_location_table").DataTable().clear().destroy();

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
        var companyName = $("<td>").append(value.CompanyName /* + "-" + value.Name*/);
        var Address = $("<td>").append(value.LocationName);
        var ActiveStatus = $("<td>");

        if (value.LocationActiveStatus == 1)
        {
            $("<div>").attr("class", "badge bg-success").append("Active").appendTo(ActiveStatus);
        }
        else if (value.LocationActiveStatus == 0)
        {
            $("<div>").attr("class", "badge bg-danger").append("Inactive").appendTo(ActiveStatus);
        }
        else
        {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(ActiveStatus);
        }

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        //var editicon = $("<i>").attr({
        //    "class": "e-btn bi-pen-fill text-white bg-warning rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Edit Location"
        //}).appendTo(icondiv);
        //var deleteicon = $("<i>").attr({
        //    "class": "e-btn bi-trash-fill text-white bg-danger rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Delete Location"
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

        $("<tr>").attr("class", "text-center").append(slnocell, companyName, Address, ActiveStatus, iconcell).appendTo("#ls_location_table_tbody");

        (function ($)
        {
            editicon.on("click", function (e) {
                e.preventDefault();
                //console.log(value);
                $("#ModalEdit").modal("show");
                $("#ls_edit_location_name").data("Id", value.Id); 
                $("#ls_edit_location_name").val(value.LocationName);  
                $("#ls_edit_location_Id").val(value.Id);  
                $("#ls_edit_location_company").val(value.CompanyId);   
                $("#ls_edit_location_status").val(value.LocationActiveStatus);
            });
            deleteicon.on("click", function (e) {
                e.preventDefault();

                $("#ModalDelete").modal("show");
                $("#ls_delete_location_id_hidden").data("Id", value.Id);
            });
        })(jQuery);
    });

    let jquery_datatable = $("#ls_location_table").DataTable();
}


//Function for Locations Page - Showing list of companies in DropDown *

load_company_for_dropdown();

function load_company_for_dropdown() {
    $.ajax({
        type: "POST",
        url: "/Companies/ShowCompaniesForDropDownLocation",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'ERROR!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                $("#ls_add_location_company").empty();
                $("#ls_edit_location_company").empty();

                $("#ls_add_location_company").append('<option value="">Select Company</option>');
                $("#ls_edit_location_company").append('<option value="">Select Company</option>')

                $.each(resp.data, function (index, value) {
                    $("#ls_add_location_company").append('<option value="' + value.Id + '">' + value.CompanyName + '</option>');
                    $("#ls_edit_location_company").append('<option value="' + value.Id + '">' + value.CompanyName + '</option>');
                });
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
            else if (exception == 'timeout')
            {
                msg = 'Time Out Error.';
            }
            else if (exception == 'abort')
            {
                msg = 'Ajax request aborted.';
            }
            else
            {
                msg = 'Uncaught Error.\n + jqXHR.responseText';
            }

            iziToast.error({
                title: 'error!',
                message: msg,
                position: 'bottomRight'
            });
        },

        beforeSend: function () {
            //$("#spinner").show()

            $("#ls_add_location_company").attr("disabled", true);
            $("#ls_edit_location_company").attr("disabled", true);

        },

        complete: function () {
           // $("#spinner").hide();

            $("#ls_add_location_company").attr("disabled", false);
            $("#ls_edit_location_company").attr("disabled", false);

        }

    });
}

