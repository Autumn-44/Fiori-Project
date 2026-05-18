sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {

    "use strict";

    return Controller.extend(
        "project4.controller.View2", {

        onInit: function () {

            var oRouter = this.getOwnerComponent()
                .getRouter();

            oRouter.getRoute("RouteView2")
                .attachPatternMatched(
                    this.onObjectMatched,
                    this
                );
        },

        onObjectMatched: function (oEvent) {

            var sEmpId = oEvent.getParameter(
                "arguments"
            ).empId;

            var oModel = this.getView()
                .getModel();

            var aEmployees = oModel.getProperty(
                "/employees"
            );

            for (var i = 0; i < aEmployees.length; i++) {

                if (aEmployees[i].empId === sEmpId) {

                    var sPath = "/employees/" + i;

                    this.getView().bindElement(
                        sPath
                    );

                    break;
                }
            }
        },

        onBack: function () {

            history.go(-1);
        }

    });
});