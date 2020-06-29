
window.onload = function() {
    ajaxGet("/loadAjax", function(data) { loadSuccess(data); });
}

function loadSuccess(dataArray) {

    for (let index = 0; index < dataArray.length; index++) {
        const data = dataArray[index];
        var $tr = $("<tr></tr>")
        $tr.append(createTdTag("id", data.id, data.id));
        $tr.append(createTdTag("userName", data.id, data.userName));
        $tr.append(createTdTag("password", data.id, data.password));
        $tr.append(createDeleteBtn("deleteBtn", data.id));
        $("#result_data").append($tr);
    }
}

function createTdTag(name, id, text) {
    return $("<td></td>", {
        id: name + id,
        text: text
    })
}

function createDeleteBtn(name, id) {
    var $btn = $("<button></button>", {
        id: name + id,
        text: "削除"
    });

    $btn.click(function() {
        var $tr = $(this).parents("tr");
        var deleteId = $tr.children("#id" + id).text();
        var data = {id: "1"};
        let json = JSON.stringify(data);
        //console.log(data);
        console.log(json);
        ajaxPost("/deleteAjax", json, function() {
            $("#result_data").remove($tr);
         });
    });

    return $("<td></td>").append($btn);
}

$(function() {
    $("#ajax_btn").click(function() {
        $("#output_data").text("");
        ajaxGet("/test", function(data) { successTest(data); });
    });
});

function successTest(data) {
    console.log("success" + data.id);
    console.log("success" + data.userName);
    console.log("success" + data.password);

    $("#output_data").text("");
    for (let cnt = 0; cnt < data.length; cnt++) {
    	var text = "id[" + data[cnt].id + "] : " + "userName[" + data[cnt].userName + "] : " + "password[" + data[cnt].password + "] ; ";
    	var child = $("#list").append("<li>" + text + "</li>");
    }
}

$(function() {
    $("#addBtn").click(function() {
        ajaxPost("/addAjax", function(data) { successTest(data); });
    });
});

function addSuccess(data) {
    $("#result_data").append("");
}

function error(XMLHttpRequest, textStatus, errorThrown) {
    console.log("error" + XMLHttpRequest);
    console.log("status" + textStatus);
    console.log("thrown" + errorThrown);
}

function ajaxGet(url, successFuction) {
    $.ajax({
        type     : "GET",
        url      : url,
        dataType : "json",
        success  : successFuction,
        error    : function(XMLHttpRequest, textStatus, errorThrown) { error(XMLHttpRequest, textStatus, errorThrown); }
    });
}

function ajaxPost(url, data, successFuction) {
    $.ajax({
        type     : "POST",
        url      : url,
        dataType : "json",
        data     : {parameter1 : 1, parameter2 : 2 },
        success  : successFuction,
        error    : function(XMLHttpRequest, textStatus, errorThrown) { error(XMLHttpRequest, textStatus, errorThrown); }
    });
}