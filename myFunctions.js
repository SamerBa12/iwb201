$(document).ready(function () {

    $(".toggle-btn").click(function () {
        var target = $(this).data("target");
        $("#" + target).toggle();
    });

    $("#continue-btn").click(function () {
        if ($(".select-checkbox:checked").length === 0) {
            alert("الرجاء اختيار وجبة واحدة على الأقل.");
            return;
        }
        $("#order-form-section").show();
        $("html, body").animate({ scrollTop: $("#order-form-section").offset().top - 20 }, 400);
    });

    $("#order-form").submit(function (e) {
        e.preventDefault();
        if (validateForm()) {
            showSummary();
        }
    });

    $("#close-modal").click(function () {
        $(".modal-bg").removeClass("show");
    });

});

function validateForm() {
    var ok = true;

    var name = $("#fullname").val().trim();
    if (name !== "" && !/^[A-Za-z]+ [A-Za-z]+$/.test(name)) {
        $("#fullname").addClass("error");
        $("#fullname-err").show();
        ok = false;
    } else {
        $("#fullname").removeClass("error");
        $("#fullname-err").hide();
    }

    var bank = $("#bank").val().trim();
    if (!/^\d{6}$/.test(bank)) {
        $("#bank").addClass("error");
        $("#bank-err").show();
        ok = false;
    } else {
        $("#bank").removeClass("error");
        $("#bank-err").hide();
    }

    var date = $("#bdate").val().trim();
    if (date !== "") {
        var valid = false;
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            var p = date.split("-");
            var d = new Date(p[0], p[1] - 1, p[2]);
            if (d.getFullYear() == p[0] && d.getMonth() == p[1] - 1 && d.getDate() == p[2]) {
                valid = true;
            }
        }
        if (!valid) {
            $("#bdate").addClass("error");
            $("#bdate-err").show();
            ok = false;
        } else {
            $("#bdate").removeClass("error");
            $("#bdate-err").hide();
        }
    } else {
        $("#bdate").removeClass("error");
        $("#bdate-err").hide();
    }

    var mobile = $("#mobile").val().trim();
    if (mobile !== "" && !/^09[1-9]\d{7}$/.test(mobile)) {
        $("#mobile").addClass("error");
        $("#mobile-err").show();
        ok = false;
    } else {
        $("#mobile").removeClass("error");
        $("#mobile-err").hide();
    }

    return ok;
}

function showSummary() {
    var rows = "";
    var total = 0;

    $(".select-checkbox:checked").each(function () {
        var tr = $(this).closest("tr");
        var code = tr.find(".code").text();
        var name = tr.find(".mname").text();
        var priceText = tr.find(".price").text();
        var price = parseInt(priceText.replace(/[^0-9]/g, ""));
        total += price;
        rows += "<tr><td>" + code + "</td><td>" + name + "</td><td>" + priceText + "</td></tr>";
    });

    var tax = Math.round(total * 0.1);
    var net = total - tax;

    $("#summary-rows").html(rows);
    $("#sum-total").text(total.toLocaleString() + " ل.س");
    $("#sum-tax").text(tax.toLocaleString() + " ل.س");
    $("#sum-net").text(net.toLocaleString() + " ل.س");

    $(".modal-bg").addClass("show");
}
