

//Function For Designations Page - Add Designation Button - Show Add Designation Modal Page *

$("#ls_add_designation_btn").on("click", function () {
    $("#ModalAdd").modal("show");
    $("#ModalAdd_form").trigger("reset");
    $("#ModalAdd_form").removeClass('was-validated');
});


// Function For Designations Page - Saving New Designation in database *

$("#ModalAdd_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#ModalAdd_form')[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        json = {
            DesignationName: $("#ls_add_designation_name").val(),
            DesignationActiveStatus: $("#ls_add_designation_status").val(),
        };
        $.ajax({
            url: '/Designations/AddDesignation',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(json),
            beforeSend: function () {
                $("#spinner").show();
            },
            success: function (resp) {
                //alert('ok1');
                if (resp.error) {
                    iziToast.error({
                        title: 'error!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }

                else {
                    //console.log("test", resp);

                    $("#ModalAdd").modal("hide");
                    iziToast.success({
                        title: 'Saved Successfully!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                    load_designation_table(1);

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

//Function For Designations Page - Showing designation Table View

load_designation_table(1);

function load_designation_table() {
    //alert();

    $.ajax({
        type: "POST",
        url: "/Designations/ShowDesignations",
        contentType: "application/json; charset-utf-8",

        beforeSend: function () {
            $("#spinner").show()
        },

        success: function (resp) {
            //alert('ok');
            if (resp.error) {
                iziToast.error({
                    title: 'ERROR!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                //console.log("test", resp);
                show_designation_list(resp);
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


//Function For Designations Page - Shows data on designation table

function show_designation_list(resp) {
   // alert('ok1');
    $("#ls_designation_table_tbody").empty();
    $("#ls_designation_table").DataTable().clear().destroy();

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
        var DesignationName = $("<td>").append(value.DesignationName);
        var DesignationActiveStatus = $("<td>");

        if (value.DesignationActiveStatus == 1) {
            $("<div>").attr("class", "badge bg-success").append("Active").appendTo(DesignationActiveStatus);
        }
        else if (value.DesignationActiveStatus == 0) {
            $("<div>").attr("class", "badge bg-danger").append("Inactive").appendTo(DesignationActiveStatus);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(DesignationActiveStatus);
        }

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        //var editicon = $("<i>").attr({
        //    "class": "e-btn bi-pen-fill text-white bg-warning rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Edit Designation"
        //}).appendTo(icondiv);
        //var deleteicon = $("<i>").attr({
        //    "class": "e-btn bi-trash-fill text-white bg-danger rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Delete Designation"
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

        $("<tr>").attr("class", "text-center").append(slnocell, DesignationName, DesignationActiveStatus, iconcell).appendTo("#ls_designation_table_tbody");

        (function ($) {
            editicon.on("click", function (e) {
                e.preventDefault();
                //console.log(value);
                $("#ModalEdit").modal("show");
                $("#ls_edit_designation_name").data("Id", value.Id);
                $("#ls_edit_designation_name").val(value.DesignationName);
                $("#ls_edit_designation_Id").val(value.Id);
                $("#ls_edit_designation_status").val(value.DesignationActiveStatus);
            });
            deleteicon.on("click", function (e) {
                e.preventDefault();

                $("#ModalDelete").modal("show");
                $("#ls_delete_designation_id_hidden").data("Id", value.Id);
            });
        })(jQuery);
    });

    let jquery_datatable = $("#ls_designation_table").DataTable();
}


//Function for Designations Page - Delete Designation by Delete Button Icon in Action on Designation List Table *

$("#ModalDelete_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ModalDelete_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        //alert('ok1');
        json = {
            id: $("#ls_delete_designation_id_hidden").data("Id"),
        };

        $.ajax({
            type: "POST",
            url: "/Designations/DeleteDesignation",
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
                    //alert('ok3');
                    $("#ModalDelete").modal("hide");
                    iziToast.success({
                        title: 'Deleted!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                    load_designation_table();
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



 //Function for Designations Page - Edit Designation by Edit Button Icon in Action on Designation List Table *

$("#ModalEdit_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ModalEdit_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
       // alert('ok1');
        json = {
            Id: $("#ls_edit_designation_Id").val(),
            DesignationName: $("#ls_edit_designation_name").val(),
            DesignationActiveStatus: $("#ls_edit_designation_status").val(),
        };

        //console.log(json);

        $.ajax({
            type: "POST",
            url: "/Designations/EditDesignation",
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

                    load_designation_table();
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
