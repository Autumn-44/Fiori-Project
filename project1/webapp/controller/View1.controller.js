sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.View1", {

        onSubmit: function () {

            MessageBox.success("Employee Saved Successfully");

        },

        onClear: function () {

            var oView = this.getView();

            oView.byId("empId").setValue("");
            oView.byId("nameInput").setValue("");
            oView.byId("emailInput").setValue("");

            MessageBox.information("Form Cleared");
        }

    });
});