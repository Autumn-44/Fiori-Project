sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (
    Controller,
    JSONModel,
    Filter,
    FilterOperator
) {

    "use strict";

    return Controller.extend(
        "project4.controller.View1", {


        // SEARCH EMPLOYEE
        onSearchEmployee: function () {

            var sValue = this.byId(
                "employeeSearchField01"
            ).getValue();

            var oList = this.byId(
                "employeeList01"
            );

            var oBinding = oList.getBinding(
                "items"
            );

            var oFilter = new Filter({

                filters: [

                    new Filter(
                        "empId",
                        FilterOperator.Contains,
                        sValue
                    ),

                    new Filter(
                        "name",
                        FilterOperator.Contains,
                        sValue
                    ),

                    new Filter(
                        "department",
                        FilterOperator.Contains,
                        sValue
                    )

                ],

                and: false
            });

            oBinding.filter([oFilter]);
        },

        // ROUTING
        onItemPress: function (oEvent) {

            var oItem = oEvent.getParameter(
                "listItem"
            );

            var oContext = oItem.getBindingContext();

            var sEmpId = oContext.getProperty(
                "empId"
            );

            var oRouter = this.getOwnerComponent()
                .getRouter();

            oRouter.navTo("RouteView2", {

                empId: sEmpId
            });
        }

    });
});