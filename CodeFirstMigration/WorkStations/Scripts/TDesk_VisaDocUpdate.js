

$("#ls_add_btn").on("click", function () {
    $("#ls_add_EmpInfo_modal").modal("show");
    $("#ls_add_EmpInfo_modal_form").trigger("reset");
    $("#ls_add_EmpInfo_modal_form").removeClass('was-validated');


    //$("#ls_add_visareq_other_prevvisited_issuedate").val(getCurrDate());
    //$("#ls_add_EmpInfo_dob").val(getCurrDate());

});