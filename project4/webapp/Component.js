sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (
    UIComponent,
    JSONModel
) {

    "use strict";

    return UIComponent.extend(
        "project4.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {

            UIComponent.prototype.init.apply(
                this,
                arguments
            );

            // LOAD GLOBAL MODEL
            var oModel = new JSONModel();

            oModel.loadData(
                sap.ui.require.toUrl(
                    "project4/model/data.json"
                )
            );

            this.setModel(oModel);

            // INITIALIZE ROUTER
            this.getRouter().initialize();
        }

    });
});