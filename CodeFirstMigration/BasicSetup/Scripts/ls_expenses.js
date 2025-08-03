

$("#ls_add_expenses_btn").on("click", function () {
    $("#ModalAdd").modal("show");
    $("#ModalAdd_form").trigger("reset");
    $("#ModalAdd_form").removeClass('was-validated');
});



$("#ModalAdd_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#ModalAdd_form')[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        json = {
            ExpensesCategory: $("#ls_add_expenses_name").val(),
            ExpensesActiveStatus: $("#ls_add_expenses_status").val(),
        };
        $.ajax({
            url: '/Expenses/AddExpenses',
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

                    load_expenses_table(1);

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


load_expenses_table(1);

function load_expenses_table() {

    //alert();

    $.ajax({
        type: "POST",
        url: "/Expenses/ShowExpenses",
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
                show_expenses_list(resp);
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



function show_expenses_list(resp) {
    // alert('ok1');
    $("#ls_expenses_table_tbody").empty();
    $("#ls_expenses_table").DataTable().clear().destroy();

    if (resp.data.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
    }

    $.each(resp.data, function (index, value) {
        var slnocell = $("<td>").append(index + 1);

        var ExpensesCategory = $("<td>").append(value.ExpensesCategory);
        var ExpensesActiveStatus = $("<td>");

        if (value.ExpensesActiveStatus == 1) {
            $("<div>").attr("class", "badge bg-success").append("Active").appendTo(ExpensesActiveStatus);
        }
        else if (value.ExpensesActiveStatus == 0) {
            $("<div>").attr("class", "badge bg-danger").append("Inactive").appendTo(ExpensesActiveStatus);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(ExpensesActiveStatus);
        }

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        //var editicon = $("<i>").attr({
        //    "class": "e-btn bi-pen-fill text-white bg-warning rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Edit expenses"
        //}).appendTo(icondiv);
        //var deleteicon = $("<i>").attr({
        //    "class": "e-btn bi-trash-fill text-white bg-danger rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Delete expenses"
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

        $("<tr>").attr("class", "text-center").append(slnocell, ExpensesCategory, ExpensesActiveStatus, iconcell).appendTo("#ls_expenses_table_tbody");

        (function ($) {
            editicon.on("click", function (e) {
                e.preventDefault();
                //console.log(value);
                $("#ModalEdit").modal("show");
                $("#ls_edit_expenses_name").data("Id", value.Id);
                $("#ls_edit_expenses_name").val(value.ExpensesCategory);
                $("#ls_edit_expenses_Id").val(value.Id);
                $("#ls_edit_expenses_status").val(value.ExpensesActiveStatus);
            });
            deleteicon.on("click", function (e) {
                e.preventDefault();

                $("#ModalDelete").modal("show");
                $("#ls_delete_expenses_id_hidden").data("Id", value.Id);
            });
        })(jQuery);
    });

    let jquery_datatable = $("#ls_expenses_table").DataTable();
}



$("#ModalEdit_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ModalEdit_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        // alert('ok1');
        json = {
            Id: $("#ls_edit_expenses_Id").val(),
            ExpensesCategory: $("#ls_edit_expenses_name").val(),
            ExpensesActiveStatus: $("#ls_edit_expenses_status").val(),
        };

        //console.log(json);

        $.ajax({
            type: "POST",
            url: "/expenses/EditExpenses",
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

                    load_expenses_table();
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




$("#ModalDelete_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ModalDelete_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        //alert('ok1');
        json = {
            id: $("#ls_delete_expenses_id_hidden").data("Id"),
        };

        $.ajax({
            type: "POST",
            url: "/expenses/Deleteexpenses",
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

                    load_expenses_table();
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