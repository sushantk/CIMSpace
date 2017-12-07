define
(
    ["model/base", "model/Common", "model/Core", "model/InfCommon"],
    /**
     * The package contains portions of the model defined byEnterprise Resource Planning (ERP) standards like those proposed by the Open Applications Group (OAG).
     *
     * It is provided to facilitate integration among electric utility applications (CIM) and enterprise resource planning (ERP) applications (as defined by OAG). Rather than inventing new CIM classes that accomplish similar functionality as in existing ERP models, the preferred approach is to use and extend ERP classes as appropriate in other packages.
     *
     */
    function (base, Common, Core, InfCommon)
    {

        /**
         * Kind of ERP account.
         *
         */
        var ErpAccountKind =
        {
            normal: "normal",
            reversal: "reversal",
            statistical: "statistical",
            estimate: "estimate"
        };
        Object.freeze (ErpAccountKind);

        /**
         * Kind of ERP invoice.
         *
         */
        var ErpInvoiceKind =
        {
            sale: "sale",
            purchase: "purchase"
        };
        Object.freeze (ErpInvoiceKind);

        /**
         * Kind of invoice line item.
         *
         */
        var ErpInvoiceLineItemKind =
        {
            initial: "initial",
            recalculation: "recalculation",
            other: "other"
        };
        Object.freeze (ErpInvoiceLineItemKind);

        /**
         * Kind of bill media.
         *
         */
        var BillMediaKind =
        {
            paper: "paper",
            electronic: "electronic",
            other: "other"
        };
        Object.freeze (BillMediaKind);

        /**
         * Shadow class for Document, to isolate subclassing from this package.
         *
         * If any subclass gets normative and needs inheritance, it will inherit directly from Document.
         *
         */
        class ErpDocument extends Common.Document
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpDocument;
                if (null == bucket)
                   cim_data.ErpDocument = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpDocument[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Common.Document.prototype.parse.call (this, context, sub);
                obj.cls = "ErpDocument";
                var bucket = context.parsed.ErpDocument;
                if (null == bucket)
                   context.parsed.ErpDocument = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Common.Document.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpDocument_collapse" aria-expanded="true" aria-controls="ErpDocument_collapse" style="margin-left: 10px;">ErpDocument</a></legend>
                    <div id="ErpDocument_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.template.call (this) +
                    `
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpDocument_collapse" aria-expanded="true" aria-controls="ErpDocument_collapse" style="margin-left: 10px;">ErpDocument</a></legend>
                    <div id="ErpDocument_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * Shadow class for IdentifiedObject, to isolate subclassing from this package.
         *
         * If any subclass gets normative and needs inheritance, it will inherit directly from IdentifiedObject.
         *
         */
        class ErpIdentifiedObject extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpIdentifiedObject;
                if (null == bucket)
                   cim_data.ErpIdentifiedObject = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpIdentifiedObject[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpIdentifiedObject";
                var bucket = context.parsed.ErpIdentifiedObject;
                if (null == bucket)
                   context.parsed.ErpIdentifiedObject = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpIdentifiedObject_collapse" aria-expanded="true" aria-controls="ErpIdentifiedObject_collapse" style="margin-left: 10px;">ErpIdentifiedObject</a></legend>
                    <div id="ErpIdentifiedObject_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpIdentifiedObject_collapse" aria-expanded="true" aria-controls="ErpIdentifiedObject_collapse" style="margin-left: 10px;">ErpIdentifiedObject</a></legend>
                    <div id="ErpIdentifiedObject_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * Relationship under a particular name, usually evidenced by a deposit against which withdrawals can be made.
         *
         * Types of bank accounts include: demand, time, custodial, joint, trustee, corporate, special, and regular accounts.
         *
         */
        class ErpBankAccount extends InfCommon.BankAccount
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpBankAccount;
                if (null == bucket)
                   cim_data.ErpBankAccount = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpBankAccount[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = InfCommon.BankAccount.prototype.parse.call (this, context, sub);
                obj.cls = "ErpBankAccount";
                base.parse_element (/<cim:ErpBankAccount.bankABA>([\s\S]*?)<\/cim:ErpBankAccount.bankABA>/g, obj, "bankABA", base.to_string, sub, context);
                var bucket = context.parsed.ErpBankAccount;
                if (null == bucket)
                   context.parsed.ErpBankAccount = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = InfCommon.BankAccount.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpBankAccount", "bankABA", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpBankAccount_collapse" aria-expanded="true" aria-controls="ErpBankAccount_collapse" style="margin-left: 10px;">ErpBankAccount</a></legend>
                    <div id="ErpBankAccount_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + InfCommon.BankAccount.prototype.template.call (this) +
                    `
                    {{#bankABA}}<div><b>bankABA</b>: {{bankABA}}</div>{{/bankABA}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpBankAccount_collapse" aria-expanded="true" aria-controls="ErpBankAccount_collapse" style="margin-left: 10px;">ErpBankAccount</a></legend>
                    <div id="ErpBankAccount_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + InfCommon.BankAccount.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='bankABA'>bankABA: </label><div class='col-sm-8'><input id='bankABA' class='form-control' type='text'{{#bankABA}} value='{{bankABA}}'{{/bankABA}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * General purpose Sales Order is used for utility service orders, etc.
         *
         * As used by the OAG, the SalesOrder is a step beyond a PurchaseOrder in that the receiving entity of the order also communicates SalesInformoration about the Order along with the Order itself.
         *
         */
        class ErpSalesOrder extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpSalesOrder;
                if (null == bucket)
                   cim_data.ErpSalesOrder = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpSalesOrder[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpSalesOrder";
                var bucket = context.parsed.ErpSalesOrder;
                if (null == bucket)
                   context.parsed.ErpSalesOrder = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpSalesOrder_collapse" aria-expanded="true" aria-controls="ErpSalesOrder_collapse" style="margin-left: 10px;">ErpSalesOrder</a></legend>
                    <div id="ErpSalesOrder_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpSalesOrder_collapse" aria-expanded="true" aria-controls="ErpSalesOrder_collapse" style="margin-left: 10px;">ErpSalesOrder</a></legend>
                    <div id="ErpSalesOrder_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * Time sheet for employees and contractors.
         *
         * Note that ErpTimeSheet inherits the relationship to ErpPerson from Document.
         *
         */
        class ErpTimeSheet extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpTimeSheet;
                if (null == bucket)
                   cim_data.ErpTimeSheet = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpTimeSheet[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpTimeSheet";
                base.parse_attributes (/<cim:ErpTimeSheet.ErpTimeEntries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpTimeEntries", sub, context);
                var bucket = context.parsed.ErpTimeSheet;
                if (null == bucket)
                   context.parsed.ErpTimeSheet = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpTimeSheet", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpTimeSheet_collapse" aria-expanded="true" aria-controls="ErpTimeSheet_collapse" style="margin-left: 10px;">ErpTimeSheet</a></legend>
                    <div id="ErpTimeSheet_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpTimeEntries}}<div><b>ErpTimeEntries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpTimeEntries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpTimeEntries) obj.ErpTimeEntries_string = obj.ErpTimeEntries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpTimeEntries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpTimeSheet_collapse" aria-expanded="true" aria-controls="ErpTimeSheet_collapse" style="margin-left: 10px;">ErpTimeSheet</a></legend>
                    <div id="ErpTimeSheet_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpTimeEntries", "ErpTimeEntry", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * Of an ErpPurchaseOrder, this is an individually ordered item or product along with the quantity, price and other descriptive information.
         *
         */
        class ErpPOLineItem extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpPOLineItem;
                if (null == bucket)
                   cim_data.ErpPOLineItem = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpPOLineItem[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpPOLineItem";
                base.parse_attribute (/<cim:ErpPOLineItem.ErpRecDelLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpRecDelLineItem", sub, context);
                base.parse_attribute (/<cim:ErpPOLineItem.ErpReqLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpReqLineItem", sub, context);
                base.parse_attribute (/<cim:ErpPOLineItem.AssetModelCatalogueItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "AssetModelCatalogueItem", sub, context);
                base.parse_attribute (/<cim:ErpPOLineItem.ErpPurchaseOrder\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPurchaseOrder", sub, context);
                var bucket = context.parsed.ErpPOLineItem;
                if (null == bucket)
                   context.parsed.ErpPOLineItem = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "ErpPOLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpPOLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpPOLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpPOLineItem", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPOLineItem_collapse" aria-expanded="true" aria-controls="ErpPOLineItem_collapse" style="margin-left: 10px;">ErpPOLineItem</a></legend>
                    <div id="ErpPOLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpRecDelLineItem}}<div><b>ErpRecDelLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpRecDelLineItem}}&quot;);})'>{{ErpRecDelLineItem}}</a></div>{{/ErpRecDelLineItem}}
                    {{#ErpReqLineItem}}<div><b>ErpReqLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpReqLineItem}}&quot;);})'>{{ErpReqLineItem}}</a></div>{{/ErpReqLineItem}}
                    {{#AssetModelCatalogueItem}}<div><b>AssetModelCatalogueItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{AssetModelCatalogueItem}}&quot;);})'>{{AssetModelCatalogueItem}}</a></div>{{/AssetModelCatalogueItem}}
                    {{#ErpPurchaseOrder}}<div><b>ErpPurchaseOrder</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpPurchaseOrder}}&quot;);})'>{{ErpPurchaseOrder}}</a></div>{{/ErpPurchaseOrder}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPOLineItem_collapse" aria-expanded="true" aria-controls="ErpPOLineItem_collapse" style="margin-left: 10px;">ErpPOLineItem</a></legend>
                    <div id="ErpPOLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpRecDelLineItem'>ErpRecDelLineItem: </label><div class='col-sm-8'><input id='ErpRecDelLineItem' class='form-control' type='text'{{#ErpRecDelLineItem}} value='{{ErpRecDelLineItem}}'{{/ErpRecDelLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpReqLineItem'>ErpReqLineItem: </label><div class='col-sm-8'><input id='ErpReqLineItem' class='form-control' type='text'{{#ErpReqLineItem}} value='{{ErpReqLineItem}}'{{/ErpReqLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='AssetModelCatalogueItem'>AssetModelCatalogueItem: </label><div class='col-sm-8'><input id='AssetModelCatalogueItem' class='form-control' type='text'{{#AssetModelCatalogueItem}} value='{{AssetModelCatalogueItem}}'{{/AssetModelCatalogueItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpPurchaseOrder'>ErpPurchaseOrder: </label><div class='col-sm-8'><input id='ErpPurchaseOrder' class='form-control' type='text'{{#ErpPurchaseOrder}} value='{{ErpPurchaseOrder}}'{{/ErpPurchaseOrder}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpRecDelLineItem", "ErpRecDelvLineItem", "0..1", "0..1"],
                        ["ErpReqLineItem", "ErpReqLineItem", "0..1", "0..1"],
                        ["AssetModelCatalogueItem", "AssetModelCatalogueItem", "0..1", "0..*"],
                        ["ErpPurchaseOrder", "ErpPurchaseOrder", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Transaction for an Organisation receiving goods or services that may be used to indicate receipt of goods in conjunction with a purchase order.
         *
         * A receivable is an open (unpaid) item in the Accounts Receivable ledger.
         *
         */
        class ErpReceiveDelivery extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpReceiveDelivery;
                if (null == bucket)
                   cim_data.ErpReceiveDelivery = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpReceiveDelivery[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpReceiveDelivery";
                base.parse_attributes (/<cim:ErpReceiveDelivery.ErpRecDelvLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpRecDelvLineItems", sub, context);
                var bucket = context.parsed.ErpReceiveDelivery;
                if (null == bucket)
                   context.parsed.ErpReceiveDelivery = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpReceiveDelivery", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpReceiveDelivery_collapse" aria-expanded="true" aria-controls="ErpReceiveDelivery_collapse" style="margin-left: 10px;">ErpReceiveDelivery</a></legend>
                    <div id="ErpReceiveDelivery_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpRecDelvLineItems}}<div><b>ErpRecDelvLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpRecDelvLineItems}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpRecDelvLineItems) obj.ErpRecDelvLineItems_string = obj.ErpRecDelvLineItems.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpRecDelvLineItems_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpReceiveDelivery_collapse" aria-expanded="true" aria-controls="ErpReceiveDelivery_collapse" style="margin-left: 10px;">ErpReceiveDelivery</a></legend>
                    <div id="ErpReceiveDelivery_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpRecDelvLineItems", "ErpRecDelvLineItem", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * Payment infromation and status for any individual line item of an ErpInvoice (e.g., when payment is from a customer).
         *
         * ErpPayable is also updated when payment is to a supplier and ErpReceivable is updated when payment is from a customer. Multiple payments can be made against a single line item and an individual payment can apply to more that one line item.
         *
         */
        class ErpPayment extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpPayment;
                if (null == bucket)
                   cim_data.ErpPayment = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpPayment[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpPayment";
                base.parse_element (/<cim:ErpPayment.termsPayment>([\s\S]*?)<\/cim:ErpPayment.termsPayment>/g, obj, "termsPayment", base.to_string, sub, context);
                base.parse_attributes (/<cim:ErpPayment.ErpPayableLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPayableLineItems", sub, context);
                base.parse_attributes (/<cim:ErpPayment.ErpRecLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpRecLineItems", sub, context);
                base.parse_attributes (/<cim:ErpPayment.ErpInvoiceLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpInvoiceLineItems", sub, context);
                var bucket = context.parsed.ErpPayment;
                if (null == bucket)
                   context.parsed.ErpPayment = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpPayment", "termsPayment", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "ErpPayment", fields);
                base.export_attribute (obj, "export_attributes", "ErpPayment", fields);
                base.export_attribute (obj, "export_attributes", "ErpPayment", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPayment_collapse" aria-expanded="true" aria-controls="ErpPayment_collapse" style="margin-left: 10px;">ErpPayment</a></legend>
                    <div id="ErpPayment_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#termsPayment}}<div><b>termsPayment</b>: {{termsPayment}}</div>{{/termsPayment}}
                    {{#ErpPayableLineItems}}<div><b>ErpPayableLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpPayableLineItems}}
                    {{#ErpRecLineItems}}<div><b>ErpRecLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpRecLineItems}}
                    {{#ErpInvoiceLineItems}}<div><b>ErpInvoiceLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpInvoiceLineItems}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpPayableLineItems) obj.ErpPayableLineItems_string = obj.ErpPayableLineItems.join ();
                if (obj.ErpRecLineItems) obj.ErpRecLineItems_string = obj.ErpRecLineItems.join ();
                if (obj.ErpInvoiceLineItems) obj.ErpInvoiceLineItems_string = obj.ErpInvoiceLineItems.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpPayableLineItems_string;
                delete obj.ErpRecLineItems_string;
                delete obj.ErpInvoiceLineItems_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPayment_collapse" aria-expanded="true" aria-controls="ErpPayment_collapse" style="margin-left: 10px;">ErpPayment</a></legend>
                    <div id="ErpPayment_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='termsPayment'>termsPayment: </label><div class='col-sm-8'><input id='termsPayment' class='form-control' type='text'{{#termsPayment}} value='{{termsPayment}}'{{/termsPayment}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpPayableLineItems'>ErpPayableLineItems: </label><div class='col-sm-8'><input id='ErpPayableLineItems' class='form-control' type='text'{{#ErpPayableLineItems}} value='{{ErpPayableLineItems}}_string'{{/ErpPayableLineItems}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpRecLineItems'>ErpRecLineItems: </label><div class='col-sm-8'><input id='ErpRecLineItems' class='form-control' type='text'{{#ErpRecLineItems}} value='{{ErpRecLineItems}}_string'{{/ErpRecLineItems}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpInvoiceLineItems'>ErpInvoiceLineItems: </label><div class='col-sm-8'><input id='ErpInvoiceLineItems' class='form-control' type='text'{{#ErpInvoiceLineItems}} value='{{ErpInvoiceLineItems}}_string'{{/ErpInvoiceLineItems}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpPayableLineItems", "ErpPayableLineItem", "0..*", "0..*"],
                        ["ErpRecLineItems", "ErpRecLineItem", "0..*", "0..*"],
                        ["ErpInvoiceLineItems", "ErpInvoiceLineItem", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * Book for recording accounting transactions as they occur.
         *
         * Transactions and adjustments are first recorded in a journal, which is like a diary of instructions, advising which account to be charged and by how much.
         *
         */
        class ErpJournal extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpJournal;
                if (null == bucket)
                   cim_data.ErpJournal = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpJournal[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpJournal";
                base.parse_attributes (/<cim:ErpJournal.ErpJournalEntries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpJournalEntries", sub, context);
                var bucket = context.parsed.ErpJournal;
                if (null == bucket)
                   context.parsed.ErpJournal = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpJournal", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpJournal_collapse" aria-expanded="true" aria-controls="ErpJournal_collapse" style="margin-left: 10px;">ErpJournal</a></legend>
                    <div id="ErpJournal_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpJournalEntries}}<div><b>ErpJournalEntries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpJournalEntries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpJournalEntries) obj.ErpJournalEntries_string = obj.ErpJournalEntries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpJournalEntries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpJournal_collapse" aria-expanded="true" aria-controls="ErpJournal_collapse" style="margin-left: 10px;">ErpJournal</a></legend>
                    <div id="ErpJournal_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpJournalEntries", "ErpJournalEntry", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * A roll up of invoice line items.
         *
         * The whole invoice has a due date and amount to be paid, with information such as customer, banks etc. being obtained through associations. The invoice roll up is based on individual line items that each contain amounts and descriptions for specific services or products.
         *
         */
        class ErpInvoice extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpInvoice;
                if (null == bucket)
                   cim_data.ErpInvoice = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpInvoice[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpInvoice";
                base.parse_element (/<cim:ErpInvoice.amount>([\s\S]*?)<\/cim:ErpInvoice.amount>/g, obj, "amount", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpInvoice.billMediaKind\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "billMediaKind", sub, context);
                base.parse_element (/<cim:ErpInvoice.dueDate>([\s\S]*?)<\/cim:ErpInvoice.dueDate>/g, obj, "dueDate", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpInvoice.kind\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "kind", sub, context);
                base.parse_element (/<cim:ErpInvoice.mailedDate>([\s\S]*?)<\/cim:ErpInvoice.mailedDate>/g, obj, "mailedDate", base.to_string, sub, context);
                base.parse_element (/<cim:ErpInvoice.proForma>([\s\S]*?)<\/cim:ErpInvoice.proForma>/g, obj, "proForma", base.to_boolean, sub, context);
                base.parse_element (/<cim:ErpInvoice.referenceNumber>([\s\S]*?)<\/cim:ErpInvoice.referenceNumber>/g, obj, "referenceNumber", base.to_string, sub, context);
                base.parse_element (/<cim:ErpInvoice.transactionDateTime>([\s\S]*?)<\/cim:ErpInvoice.transactionDateTime>/g, obj, "transactionDateTime", base.to_datetime, sub, context);
                base.parse_element (/<cim:ErpInvoice.transferType>([\s\S]*?)<\/cim:ErpInvoice.transferType>/g, obj, "transferType", base.to_string, sub, context);
                base.parse_attributes (/<cim:ErpInvoice.ErpInvoiceLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpInvoiceLineItems", sub, context);
                base.parse_attribute (/<cim:ErpInvoice.CustomerAccount\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "CustomerAccount", sub, context);
                var bucket = context.parsed.ErpInvoice;
                if (null == bucket)
                   context.parsed.ErpInvoice = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpInvoice", "amount", base.from_string, fields);
                base.export_element (obj, "ErpInvoice", "billMediaKind", base.from_string, fields);
                base.export_element (obj, "ErpInvoice", "dueDate", base.from_string, fields);
                base.export_element (obj, "ErpInvoice", "kind", base.from_string, fields);
                base.export_element (obj, "ErpInvoice", "mailedDate", base.from_string, fields);
                base.export_element (obj, "ErpInvoice", "proForma", base.from_boolean, fields);
                base.export_element (obj, "ErpInvoice", "referenceNumber", base.from_string, fields);
                base.export_element (obj, "ErpInvoice", "transactionDateTime", base.from_datetime, fields);
                base.export_element (obj, "ErpInvoice", "transferType", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "ErpInvoice", fields);
                base.export_attribute (obj, "export_attribute", "ErpInvoice", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpInvoice_collapse" aria-expanded="true" aria-controls="ErpInvoice_collapse" style="margin-left: 10px;">ErpInvoice</a></legend>
                    <div id="ErpInvoice_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#amount}}<div><b>amount</b>: {{amount}}</div>{{/amount}}
                    {{#billMediaKind}}<div><b>billMediaKind</b>: {{billMediaKind}}</div>{{/billMediaKind}}
                    {{#dueDate}}<div><b>dueDate</b>: {{dueDate}}</div>{{/dueDate}}
                    {{#kind}}<div><b>kind</b>: {{kind}}</div>{{/kind}}
                    {{#mailedDate}}<div><b>mailedDate</b>: {{mailedDate}}</div>{{/mailedDate}}
                    {{#proForma}}<div><b>proForma</b>: {{proForma}}</div>{{/proForma}}
                    {{#referenceNumber}}<div><b>referenceNumber</b>: {{referenceNumber}}</div>{{/referenceNumber}}
                    {{#transactionDateTime}}<div><b>transactionDateTime</b>: {{transactionDateTime}}</div>{{/transactionDateTime}}
                    {{#transferType}}<div><b>transferType</b>: {{transferType}}</div>{{/transferType}}
                    {{#ErpInvoiceLineItems}}<div><b>ErpInvoiceLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpInvoiceLineItems}}
                    {{#CustomerAccount}}<div><b>CustomerAccount</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{CustomerAccount}}&quot;);})'>{{CustomerAccount}}</a></div>{{/CustomerAccount}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.BillMediaKind = []; if (!obj.billMediaKind) obj.BillMediaKind.push ({ id: '', selected: true}); for (var property in BillMediaKind) obj.BillMediaKind.push ({ id: property, selected: obj.billMediaKind && obj.billMediaKind.endsWith ('.' + property)});
                obj.ErpInvoiceKind = []; if (!obj.kind) obj.ErpInvoiceKind.push ({ id: '', selected: true}); for (var property in ErpInvoiceKind) obj.ErpInvoiceKind.push ({ id: property, selected: obj.kind && obj.kind.endsWith ('.' + property)});
                if (obj.ErpInvoiceLineItems) obj.ErpInvoiceLineItems_string = obj.ErpInvoiceLineItems.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.BillMediaKind;
                delete obj.ErpInvoiceKind;
                delete obj.ErpInvoiceLineItems_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpInvoice_collapse" aria-expanded="true" aria-controls="ErpInvoice_collapse" style="margin-left: 10px;">ErpInvoice</a></legend>
                    <div id="ErpInvoice_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='amount'>amount: </label><div class='col-sm-8'><input id='amount' class='form-control' type='text'{{#amount}} value='{{amount}}'{{/amount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='billMediaKind'>billMediaKind: </label><div class='col-sm-8'><select id='billMediaKind' class='form-control'>{{#BillMediaKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/BillMediaKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='dueDate'>dueDate: </label><div class='col-sm-8'><input id='dueDate' class='form-control' type='text'{{#dueDate}} value='{{dueDate}}'{{/dueDate}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='kind'>kind: </label><div class='col-sm-8'><select id='kind' class='form-control'>{{#ErpInvoiceKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/ErpInvoiceKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='mailedDate'>mailedDate: </label><div class='col-sm-8'><input id='mailedDate' class='form-control' type='text'{{#mailedDate}} value='{{mailedDate}}'{{/mailedDate}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='proForma'>proForma: </label><div class='col-sm-8'><input id='proForma' class='form-check-input' type='checkbox'{{#proForma}} checked{{/proForma}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='referenceNumber'>referenceNumber: </label><div class='col-sm-8'><input id='referenceNumber' class='form-control' type='text'{{#referenceNumber}} value='{{referenceNumber}}'{{/referenceNumber}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='transactionDateTime'>transactionDateTime: </label><div class='col-sm-8'><input id='transactionDateTime' class='form-control' type='text'{{#transactionDateTime}} value='{{transactionDateTime}}'{{/transactionDateTime}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='transferType'>transferType: </label><div class='col-sm-8'><input id='transferType' class='form-control' type='text'{{#transferType}} value='{{transferType}}'{{/transferType}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='CustomerAccount'>CustomerAccount: </label><div class='col-sm-8'><input id='CustomerAccount' class='form-control' type='text'{{#CustomerAccount}} value='{{CustomerAccount}}'{{/CustomerAccount}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpInvoiceLineItems", "ErpInvoiceLineItem", "0..*", "1"],
                        ["CustomerAccount", "CustomerAccount", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A document that communicates an order to purchase goods from a buyer to a supplier.
         *
         * The PurchaseOrder carries information to and from the buyer and supplier. It is a legally binding document once both Parties agree to the contents and the specified terms and conditions of the order.
         *
         */
        class ErpPurchaseOrder extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpPurchaseOrder;
                if (null == bucket)
                   cim_data.ErpPurchaseOrder = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpPurchaseOrder[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpPurchaseOrder";
                base.parse_attributes (/<cim:ErpPurchaseOrder.ErpPOLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPOLineItems", sub, context);
                var bucket = context.parsed.ErpPurchaseOrder;
                if (null == bucket)
                   context.parsed.ErpPurchaseOrder = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpPurchaseOrder", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPurchaseOrder_collapse" aria-expanded="true" aria-controls="ErpPurchaseOrder_collapse" style="margin-left: 10px;">ErpPurchaseOrder</a></legend>
                    <div id="ErpPurchaseOrder_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpPOLineItems}}<div><b>ErpPOLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpPOLineItems}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpPOLineItems) obj.ErpPOLineItems_string = obj.ErpPOLineItems.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpPOLineItems_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPurchaseOrder_collapse" aria-expanded="true" aria-controls="ErpPurchaseOrder_collapse" style="margin-left: 10px;">ErpPurchaseOrder</a></legend>
                    <div id="ErpPurchaseOrder_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpPOLineItems", "ErpPOLineItem", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * In accounting transactions, a ledger is a book containing accounts to which debits and credits are posted from journals, where transactions are initially recorded.
         *
         * Journal entries are periodically posted to the ledger. Ledger Actual represents actual amounts by account within ledger within company or business area. Actual amounts may be generated in a source application and then loaded to a specific ledger within the enterprise general ledger or budget application.
         *
         */
        class ErpLedger extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpLedger;
                if (null == bucket)
                   cim_data.ErpLedger = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpLedger[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpLedger";
                base.parse_attributes (/<cim:ErpLedger.ErpLedgerEntries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpLedgerEntries", sub, context);
                var bucket = context.parsed.ErpLedger;
                if (null == bucket)
                   context.parsed.ErpLedger = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpLedger", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpLedger_collapse" aria-expanded="true" aria-controls="ErpLedger_collapse" style="margin-left: 10px;">ErpLedger</a></legend>
                    <div id="ErpLedger_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpLedgerEntries}}<div><b>ErpLedgerEntries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpLedgerEntries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpLedgerEntries) obj.ErpLedgerEntries_string = obj.ErpLedgerEntries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpLedgerEntries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpLedger_collapse" aria-expanded="true" aria-controls="ErpLedger_collapse" style="margin-left: 10px;">ErpLedger</a></legend>
                    <div id="ErpLedger_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpLedgerEntries", "ErpLedgerEntry", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * General information that applies to a utility requisition that is a request for the purchase of goods or services.
         *
         * Typically, a requisition leads to the creation of a purchase order to a specific supplier.
         *
         */
        class ErpRequisition extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpRequisition;
                if (null == bucket)
                   cim_data.ErpRequisition = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpRequisition[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpRequisition";
                base.parse_attributes (/<cim:ErpRequisition.ErpReqLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpReqLineItems", sub, context);
                var bucket = context.parsed.ErpRequisition;
                if (null == bucket)
                   context.parsed.ErpRequisition = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpRequisition", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpRequisition_collapse" aria-expanded="true" aria-controls="ErpRequisition_collapse" style="margin-left: 10px;">ErpRequisition</a></legend>
                    <div id="ErpRequisition_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpReqLineItems}}<div><b>ErpReqLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpReqLineItems}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpReqLineItems) obj.ErpReqLineItems_string = obj.ErpReqLineItems.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpReqLineItems_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpRequisition_collapse" aria-expanded="true" aria-controls="ErpRequisition_collapse" style="margin-left: 10px;">ErpRequisition</a></legend>
                    <div id="ErpRequisition_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpReqLineItems", "ErpReqLineItem", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * Information that generally describes the Bill of Material Structure and its contents for a utility.
         *
         * This is used by ERP systems to transfer Bill of Material information between two business applications.
         *
         */
        class ErpBOM extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpBOM;
                if (null == bucket)
                   cim_data.ErpBOM = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpBOM[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpBOM";
                base.parse_attribute (/<cim:ErpBOM.Design\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Design", sub, context);
                base.parse_attributes (/<cim:ErpBOM.ErpBomItemDatas\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpBomItemDatas", sub, context);
                var bucket = context.parsed.ErpBOM;
                if (null == bucket)
                   context.parsed.ErpBOM = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "ErpBOM", fields);
                base.export_attribute (obj, "export_attributes", "ErpBOM", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpBOM_collapse" aria-expanded="true" aria-controls="ErpBOM_collapse" style="margin-left: 10px;">ErpBOM</a></legend>
                    <div id="ErpBOM_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#Design}}<div><b>Design</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Design}}&quot;);})'>{{Design}}</a></div>{{/Design}}
                    {{#ErpBomItemDatas}}<div><b>ErpBomItemDatas</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpBomItemDatas}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpBomItemDatas) obj.ErpBomItemDatas_string = obj.ErpBomItemDatas.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpBomItemDatas_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpBOM_collapse" aria-expanded="true" aria-controls="ErpBOM_collapse" style="margin-left: 10px;">ErpBOM</a></legend>
                    <div id="ErpBOM_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Design'>Design: </label><div class='col-sm-8'><input id='Design' class='form-control' type='text'{{#Design}} value='{{Design}}'{{/Design}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["Design", "Design", "0..1", "0..*"],
                        ["ErpBomItemDatas", "ErpBomItemData", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * Utility Project Accounting information, used by ERP applications to enable all relevant sub-systems that submit single sided transactions to transfer information with a Project Accounting Application.
         *
         * This would include, but not necessarily be limited to: Accounts Payable, Accounts Receivable, Budget, Order Management, Purchasing, Time and Labor, Travel and Expense.
         *
         */
        class ErpProjectAccounting extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpProjectAccounting;
                if (null == bucket)
                   cim_data.ErpProjectAccounting = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpProjectAccounting[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpProjectAccounting";
                base.parse_attributes (/<cim:ErpProjectAccounting.ErpTimeEntries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpTimeEntries", sub, context);
                base.parse_attributes (/<cim:ErpProjectAccounting.WorkCostDetails\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "WorkCostDetails", sub, context);
                base.parse_attributes (/<cim:ErpProjectAccounting.Projects\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Projects", sub, context);
                base.parse_attributes (/<cim:ErpProjectAccounting.Works\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Works", sub, context);
                var bucket = context.parsed.ErpProjectAccounting;
                if (null == bucket)
                   context.parsed.ErpProjectAccounting = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpProjectAccounting", fields);
                base.export_attribute (obj, "export_attributes", "ErpProjectAccounting", fields);
                base.export_attribute (obj, "export_attributes", "ErpProjectAccounting", fields);
                base.export_attribute (obj, "export_attributes", "ErpProjectAccounting", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpProjectAccounting_collapse" aria-expanded="true" aria-controls="ErpProjectAccounting_collapse" style="margin-left: 10px;">ErpProjectAccounting</a></legend>
                    <div id="ErpProjectAccounting_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpTimeEntries}}<div><b>ErpTimeEntries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpTimeEntries}}
                    {{#WorkCostDetails}}<div><b>WorkCostDetails</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/WorkCostDetails}}
                    {{#Projects}}<div><b>Projects</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Projects}}
                    {{#Works}}<div><b>Works</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Works}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpTimeEntries) obj.ErpTimeEntries_string = obj.ErpTimeEntries.join ();
                if (obj.WorkCostDetails) obj.WorkCostDetails_string = obj.WorkCostDetails.join ();
                if (obj.Projects) obj.Projects_string = obj.Projects.join ();
                if (obj.Works) obj.Works_string = obj.Works.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpTimeEntries_string;
                delete obj.WorkCostDetails_string;
                delete obj.Projects_string;
                delete obj.Works_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpProjectAccounting_collapse" aria-expanded="true" aria-controls="ErpProjectAccounting_collapse" style="margin-left: 10px;">ErpProjectAccounting</a></legend>
                    <div id="ErpProjectAccounting_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpTimeEntries", "ErpTimeEntry", "0..*", "0..1"],
                        ["WorkCostDetails", "WorkCostDetail", "0..*", "1"],
                        ["Projects", "Project", "0..*", "1"],
                        ["Works", "Work", "0..*", "0..1"]
                    ]
                );
            }
        }

        /**
         * An individual line item on an invoice.
         *
         */
        class ErpInvoiceLineItem extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpInvoiceLineItem;
                if (null == bucket)
                   cim_data.ErpInvoiceLineItem = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpInvoiceLineItem[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpInvoiceLineItem";
                base.parse_element (/<cim:ErpInvoiceLineItem.billPeriod>([\s\S]*?)<\/cim:ErpInvoiceLineItem.billPeriod>/g, obj, "billPeriod", base.to_string, sub, context);
                base.parse_element (/<cim:ErpInvoiceLineItem.glAccount>([\s\S]*?)<\/cim:ErpInvoiceLineItem.glAccount>/g, obj, "glAccount", base.to_string, sub, context);
                base.parse_element (/<cim:ErpInvoiceLineItem.glDateTime>([\s\S]*?)<\/cim:ErpInvoiceLineItem.glDateTime>/g, obj, "glDateTime", base.to_datetime, sub, context);
                base.parse_attribute (/<cim:ErpInvoiceLineItem.kind\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "kind", sub, context);
                base.parse_element (/<cim:ErpInvoiceLineItem.lineAmount>([\s\S]*?)<\/cim:ErpInvoiceLineItem.lineAmount>/g, obj, "lineAmount", base.to_float, sub, context);
                base.parse_element (/<cim:ErpInvoiceLineItem.lineNumber>([\s\S]*?)<\/cim:ErpInvoiceLineItem.lineNumber>/g, obj, "lineNumber", base.to_string, sub, context);
                base.parse_element (/<cim:ErpInvoiceLineItem.lineVersion>([\s\S]*?)<\/cim:ErpInvoiceLineItem.lineVersion>/g, obj, "lineVersion", base.to_string, sub, context);
                base.parse_element (/<cim:ErpInvoiceLineItem.netAmount>([\s\S]*?)<\/cim:ErpInvoiceLineItem.netAmount>/g, obj, "netAmount", base.to_float, sub, context);
                base.parse_element (/<cim:ErpInvoiceLineItem.previousAmount>([\s\S]*?)<\/cim:ErpInvoiceLineItem.previousAmount>/g, obj, "previousAmount", base.to_float, sub, context);
                base.parse_attribute (/<cim:ErpInvoiceLineItem.ContainerErpInvoiceLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ContainerErpInvoiceLineItem", sub, context);
                base.parse_attributes (/<cim:ErpInvoiceLineItem.ComponentErpInvoiceLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ComponentErpInvoiceLineItems", sub, context);
                base.parse_attribute (/<cim:ErpInvoiceLineItem.ErpPayableLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPayableLineItem", sub, context);
                base.parse_attribute (/<cim:ErpInvoiceLineItem.ErpInvoice\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpInvoice", sub, context);
                base.parse_attributes (/<cim:ErpInvoiceLineItem.CustomerBillingInfos\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "CustomerBillingInfos", sub, context);
                base.parse_attribute (/<cim:ErpInvoiceLineItem.ErpRecLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpRecLineItem", sub, context);
                base.parse_attributes (/<cim:ErpInvoiceLineItem.UserAttributes\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "UserAttributes", sub, context);
                base.parse_attribute (/<cim:ErpInvoiceLineItem.ErpRecDelvLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpRecDelvLineItem", sub, context);
                base.parse_attributes (/<cim:ErpInvoiceLineItem.ErpPayments\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPayments", sub, context);
                base.parse_attribute (/<cim:ErpInvoiceLineItem.ErpQuoteLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpQuoteLineItem", sub, context);
                base.parse_attributes (/<cim:ErpInvoiceLineItem.WorkBillingInfos\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "WorkBillingInfos", sub, context);
                base.parse_attributes (/<cim:ErpInvoiceLineItem.ErpJournalEntries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpJournalEntries", sub, context);
                var bucket = context.parsed.ErpInvoiceLineItem;
                if (null == bucket)
                   context.parsed.ErpInvoiceLineItem = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpInvoiceLineItem", "billPeriod", base.from_string, fields);
                base.export_element (obj, "ErpInvoiceLineItem", "glAccount", base.from_string, fields);
                base.export_element (obj, "ErpInvoiceLineItem", "glDateTime", base.from_datetime, fields);
                base.export_element (obj, "ErpInvoiceLineItem", "kind", base.from_string, fields);
                base.export_element (obj, "ErpInvoiceLineItem", "lineAmount", base.from_float, fields);
                base.export_element (obj, "ErpInvoiceLineItem", "lineNumber", base.from_string, fields);
                base.export_element (obj, "ErpInvoiceLineItem", "lineVersion", base.from_string, fields);
                base.export_element (obj, "ErpInvoiceLineItem", "netAmount", base.from_float, fields);
                base.export_element (obj, "ErpInvoiceLineItem", "previousAmount", base.from_float, fields);
                base.export_attribute (obj, "export_attribute", "ErpInvoiceLineItem", fields);
                base.export_attribute (obj, "export_attributes", "ErpInvoiceLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpInvoiceLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpInvoiceLineItem", fields);
                base.export_attribute (obj, "export_attributes", "ErpInvoiceLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpInvoiceLineItem", fields);
                base.export_attribute (obj, "export_attributes", "ErpInvoiceLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpInvoiceLineItem", fields);
                base.export_attribute (obj, "export_attributes", "ErpInvoiceLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpInvoiceLineItem", fields);
                base.export_attribute (obj, "export_attributes", "ErpInvoiceLineItem", fields);
                base.export_attribute (obj, "export_attributes", "ErpInvoiceLineItem", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpInvoiceLineItem_collapse" aria-expanded="true" aria-controls="ErpInvoiceLineItem_collapse" style="margin-left: 10px;">ErpInvoiceLineItem</a></legend>
                    <div id="ErpInvoiceLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#billPeriod}}<div><b>billPeriod</b>: {{billPeriod}}</div>{{/billPeriod}}
                    {{#glAccount}}<div><b>glAccount</b>: {{glAccount}}</div>{{/glAccount}}
                    {{#glDateTime}}<div><b>glDateTime</b>: {{glDateTime}}</div>{{/glDateTime}}
                    {{#kind}}<div><b>kind</b>: {{kind}}</div>{{/kind}}
                    {{#lineAmount}}<div><b>lineAmount</b>: {{lineAmount}}</div>{{/lineAmount}}
                    {{#lineNumber}}<div><b>lineNumber</b>: {{lineNumber}}</div>{{/lineNumber}}
                    {{#lineVersion}}<div><b>lineVersion</b>: {{lineVersion}}</div>{{/lineVersion}}
                    {{#netAmount}}<div><b>netAmount</b>: {{netAmount}}</div>{{/netAmount}}
                    {{#previousAmount}}<div><b>previousAmount</b>: {{previousAmount}}</div>{{/previousAmount}}
                    {{#ContainerErpInvoiceLineItem}}<div><b>ContainerErpInvoiceLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ContainerErpInvoiceLineItem}}&quot;);})'>{{ContainerErpInvoiceLineItem}}</a></div>{{/ContainerErpInvoiceLineItem}}
                    {{#ComponentErpInvoiceLineItems}}<div><b>ComponentErpInvoiceLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ComponentErpInvoiceLineItems}}
                    {{#ErpPayableLineItem}}<div><b>ErpPayableLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpPayableLineItem}}&quot;);})'>{{ErpPayableLineItem}}</a></div>{{/ErpPayableLineItem}}
                    {{#ErpInvoice}}<div><b>ErpInvoice</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpInvoice}}&quot;);})'>{{ErpInvoice}}</a></div>{{/ErpInvoice}}
                    {{#CustomerBillingInfos}}<div><b>CustomerBillingInfos</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/CustomerBillingInfos}}
                    {{#ErpRecLineItem}}<div><b>ErpRecLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpRecLineItem}}&quot;);})'>{{ErpRecLineItem}}</a></div>{{/ErpRecLineItem}}
                    {{#UserAttributes}}<div><b>UserAttributes</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/UserAttributes}}
                    {{#ErpRecDelvLineItem}}<div><b>ErpRecDelvLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpRecDelvLineItem}}&quot;);})'>{{ErpRecDelvLineItem}}</a></div>{{/ErpRecDelvLineItem}}
                    {{#ErpPayments}}<div><b>ErpPayments</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpPayments}}
                    {{#ErpQuoteLineItem}}<div><b>ErpQuoteLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpQuoteLineItem}}&quot;);})'>{{ErpQuoteLineItem}}</a></div>{{/ErpQuoteLineItem}}
                    {{#WorkBillingInfos}}<div><b>WorkBillingInfos</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/WorkBillingInfos}}
                    {{#ErpJournalEntries}}<div><b>ErpJournalEntries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpJournalEntries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.ErpInvoiceLineItemKind = []; if (!obj.kind) obj.ErpInvoiceLineItemKind.push ({ id: '', selected: true}); for (var property in ErpInvoiceLineItemKind) obj.ErpInvoiceLineItemKind.push ({ id: property, selected: obj.kind && obj.kind.endsWith ('.' + property)});
                if (obj.ComponentErpInvoiceLineItems) obj.ComponentErpInvoiceLineItems_string = obj.ComponentErpInvoiceLineItems.join ();
                if (obj.CustomerBillingInfos) obj.CustomerBillingInfos_string = obj.CustomerBillingInfos.join ();
                if (obj.UserAttributes) obj.UserAttributes_string = obj.UserAttributes.join ();
                if (obj.ErpPayments) obj.ErpPayments_string = obj.ErpPayments.join ();
                if (obj.WorkBillingInfos) obj.WorkBillingInfos_string = obj.WorkBillingInfos.join ();
                if (obj.ErpJournalEntries) obj.ErpJournalEntries_string = obj.ErpJournalEntries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpInvoiceLineItemKind;
                delete obj.ComponentErpInvoiceLineItems_string;
                delete obj.CustomerBillingInfos_string;
                delete obj.UserAttributes_string;
                delete obj.ErpPayments_string;
                delete obj.WorkBillingInfos_string;
                delete obj.ErpJournalEntries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpInvoiceLineItem_collapse" aria-expanded="true" aria-controls="ErpInvoiceLineItem_collapse" style="margin-left: 10px;">ErpInvoiceLineItem</a></legend>
                    <div id="ErpInvoiceLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='billPeriod'>billPeriod: </label><div class='col-sm-8'><input id='billPeriod' class='form-control' type='text'{{#billPeriod}} value='{{billPeriod}}'{{/billPeriod}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='glAccount'>glAccount: </label><div class='col-sm-8'><input id='glAccount' class='form-control' type='text'{{#glAccount}} value='{{glAccount}}'{{/glAccount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='glDateTime'>glDateTime: </label><div class='col-sm-8'><input id='glDateTime' class='form-control' type='text'{{#glDateTime}} value='{{glDateTime}}'{{/glDateTime}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='kind'>kind: </label><div class='col-sm-8'><select id='kind' class='form-control'>{{#ErpInvoiceLineItemKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/ErpInvoiceLineItemKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='lineAmount'>lineAmount: </label><div class='col-sm-8'><input id='lineAmount' class='form-control' type='text'{{#lineAmount}} value='{{lineAmount}}'{{/lineAmount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='lineNumber'>lineNumber: </label><div class='col-sm-8'><input id='lineNumber' class='form-control' type='text'{{#lineNumber}} value='{{lineNumber}}'{{/lineNumber}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='lineVersion'>lineVersion: </label><div class='col-sm-8'><input id='lineVersion' class='form-control' type='text'{{#lineVersion}} value='{{lineVersion}}'{{/lineVersion}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='netAmount'>netAmount: </label><div class='col-sm-8'><input id='netAmount' class='form-control' type='text'{{#netAmount}} value='{{netAmount}}'{{/netAmount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='previousAmount'>previousAmount: </label><div class='col-sm-8'><input id='previousAmount' class='form-control' type='text'{{#previousAmount}} value='{{previousAmount}}'{{/previousAmount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ContainerErpInvoiceLineItem'>ContainerErpInvoiceLineItem: </label><div class='col-sm-8'><input id='ContainerErpInvoiceLineItem' class='form-control' type='text'{{#ContainerErpInvoiceLineItem}} value='{{ContainerErpInvoiceLineItem}}'{{/ContainerErpInvoiceLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpPayableLineItem'>ErpPayableLineItem: </label><div class='col-sm-8'><input id='ErpPayableLineItem' class='form-control' type='text'{{#ErpPayableLineItem}} value='{{ErpPayableLineItem}}'{{/ErpPayableLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpInvoice'>ErpInvoice: </label><div class='col-sm-8'><input id='ErpInvoice' class='form-control' type='text'{{#ErpInvoice}} value='{{ErpInvoice}}'{{/ErpInvoice}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='CustomerBillingInfos'>CustomerBillingInfos: </label><div class='col-sm-8'><input id='CustomerBillingInfos' class='form-control' type='text'{{#CustomerBillingInfos}} value='{{CustomerBillingInfos}}_string'{{/CustomerBillingInfos}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpRecLineItem'>ErpRecLineItem: </label><div class='col-sm-8'><input id='ErpRecLineItem' class='form-control' type='text'{{#ErpRecLineItem}} value='{{ErpRecLineItem}}'{{/ErpRecLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='UserAttributes'>UserAttributes: </label><div class='col-sm-8'><input id='UserAttributes' class='form-control' type='text'{{#UserAttributes}} value='{{UserAttributes}}_string'{{/UserAttributes}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpRecDelvLineItem'>ErpRecDelvLineItem: </label><div class='col-sm-8'><input id='ErpRecDelvLineItem' class='form-control' type='text'{{#ErpRecDelvLineItem}} value='{{ErpRecDelvLineItem}}'{{/ErpRecDelvLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpPayments'>ErpPayments: </label><div class='col-sm-8'><input id='ErpPayments' class='form-control' type='text'{{#ErpPayments}} value='{{ErpPayments}}_string'{{/ErpPayments}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpQuoteLineItem'>ErpQuoteLineItem: </label><div class='col-sm-8'><input id='ErpQuoteLineItem' class='form-control' type='text'{{#ErpQuoteLineItem}} value='{{ErpQuoteLineItem}}'{{/ErpQuoteLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='WorkBillingInfos'>WorkBillingInfos: </label><div class='col-sm-8'><input id='WorkBillingInfos' class='form-control' type='text'{{#WorkBillingInfos}} value='{{WorkBillingInfos}}_string'{{/WorkBillingInfos}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ContainerErpInvoiceLineItem", "ErpInvoiceLineItem", "0..1", "0..*"],
                        ["ComponentErpInvoiceLineItems", "ErpInvoiceLineItem", "0..*", "0..1"],
                        ["ErpPayableLineItem", "ErpPayableLineItem", "0..1", "0..1"],
                        ["ErpInvoice", "ErpInvoice", "1", "0..*"],
                        ["CustomerBillingInfos", "CustomerBillingInfo", "0..*", "0..*"],
                        ["ErpRecLineItem", "ErpRecLineItem", "0..1", "0..1"],
                        ["UserAttributes", "UserAttribute", "0..*", "0..*"],
                        ["ErpRecDelvLineItem", "ErpRecDelvLineItem", "0..1", "0..1"],
                        ["ErpPayments", "ErpPayment", "0..*", "0..*"],
                        ["ErpQuoteLineItem", "ErpQuoteLineItem", "0..1", "0..1"],
                        ["WorkBillingInfos", "WorkBillingInfo", "0..*", "0..*"],
                        ["ErpJournalEntries", "ErpJournalEntry", "0..*", "0..1"]
                    ]
                );
            }
        }

        /**
         * Accounting structure of a business.
         *
         * Each account represents a financial aspect of a business, such as its Accounts Payable, or the value of its inventory, or its office supply expenses.
         *
         */
        class ErpChartOfAccounts extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpChartOfAccounts;
                if (null == bucket)
                   cim_data.ErpChartOfAccounts = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpChartOfAccounts[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpChartOfAccounts";
                var bucket = context.parsed.ErpChartOfAccounts;
                if (null == bucket)
                   context.parsed.ErpChartOfAccounts = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpChartOfAccounts_collapse" aria-expanded="true" aria-controls="ErpChartOfAccounts_collapse" style="margin-left: 10px;">ErpChartOfAccounts</a></legend>
                    <div id="ErpChartOfAccounts_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpChartOfAccounts_collapse" aria-expanded="true" aria-controls="ErpChartOfAccounts_collapse" style="margin-left: 10px;">ErpChartOfAccounts</a></legend>
                    <div id="ErpChartOfAccounts_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * Transaction representing an invoice, credit memo or debit memo to a customer.
         *
         * It is an open (unpaid) item in the Accounts Receivable ledger.
         *
         */
        class ErpReceivable extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpReceivable;
                if (null == bucket)
                   cim_data.ErpReceivable = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpReceivable[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpReceivable";
                base.parse_attributes (/<cim:ErpReceivable.ErpRecLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpRecLineItems", sub, context);
                var bucket = context.parsed.ErpReceivable;
                if (null == bucket)
                   context.parsed.ErpReceivable = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpReceivable", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpReceivable_collapse" aria-expanded="true" aria-controls="ErpReceivable_collapse" style="margin-left: 10px;">ErpReceivable</a></legend>
                    <div id="ErpReceivable_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpRecLineItems}}<div><b>ErpRecLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpRecLineItems}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpRecLineItems) obj.ErpRecLineItems_string = obj.ErpRecLineItems.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpRecLineItems_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpReceivable_collapse" aria-expanded="true" aria-controls="ErpReceivable_collapse" style="margin-left: 10px;">ErpReceivable</a></legend>
                    <div id="ErpReceivable_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpRecLineItems", "ErpRecLineItem", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * General Utility Engineering Change Order information.
         *
         */
        class ErpEngChangeOrder extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpEngChangeOrder;
                if (null == bucket)
                   cim_data.ErpEngChangeOrder = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpEngChangeOrder[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpEngChangeOrder";
                var bucket = context.parsed.ErpEngChangeOrder;
                if (null == bucket)
                   context.parsed.ErpEngChangeOrder = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpEngChangeOrder_collapse" aria-expanded="true" aria-controls="ErpEngChangeOrder_collapse" style="margin-left: 10px;">ErpEngChangeOrder</a></legend>
                    <div id="ErpEngChangeOrder_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpEngChangeOrder_collapse" aria-expanded="true" aria-controls="ErpEngChangeOrder_collapse" style="margin-left: 10px;">ErpEngChangeOrder</a></legend>
                    <div id="ErpEngChangeOrder_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A transaction that represents an invoice from a supplier.
         *
         * A payable (or voucher) is an open item, approved and ready for payment, in the Accounts Payable ledger.
         *
         */
        class ErpPayable extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpPayable;
                if (null == bucket)
                   cim_data.ErpPayable = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpPayable[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpPayable";
                base.parse_attributes (/<cim:ErpPayable.ErpPayableLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPayableLineItems", sub, context);
                base.parse_attributes (/<cim:ErpPayable.ContractorItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ContractorItems", sub, context);
                var bucket = context.parsed.ErpPayable;
                if (null == bucket)
                   context.parsed.ErpPayable = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpPayable", fields);
                base.export_attribute (obj, "export_attributes", "ErpPayable", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPayable_collapse" aria-expanded="true" aria-controls="ErpPayable_collapse" style="margin-left: 10px;">ErpPayable</a></legend>
                    <div id="ErpPayable_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpPayableLineItems}}<div><b>ErpPayableLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpPayableLineItems}}
                    {{#ContractorItems}}<div><b>ContractorItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ContractorItems}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpPayableLineItems) obj.ErpPayableLineItems_string = obj.ErpPayableLineItems.join ();
                if (obj.ContractorItems) obj.ContractorItems_string = obj.ContractorItems.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpPayableLineItems_string;
                delete obj.ContractorItems_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPayable_collapse" aria-expanded="true" aria-controls="ErpPayable_collapse" style="margin-left: 10px;">ErpPayable</a></legend>
                    <div id="ErpPayable_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ContractorItems'>ContractorItems: </label><div class='col-sm-8'><input id='ContractorItems' class='form-control' type='text'{{#ContractorItems}} value='{{ContractorItems}}_string'{{/ContractorItems}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpPayableLineItems", "ErpPayableLineItem", "0..*", "1"],
                        ["ContractorItems", "ContractorItem", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * Information for utility Ledger Budgets.
         *
         * They support the transfer budget amounts between all possible source applications throughout an enterprise and a general ledger or budget application.
         *
         */
        class ErpLedgerBudget extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpLedgerBudget;
                if (null == bucket)
                   cim_data.ErpLedgerBudget = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpLedgerBudget[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpLedgerBudget";
                base.parse_attributes (/<cim:ErpLedgerBudget.ErpLedBudLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpLedBudLineItems", sub, context);
                var bucket = context.parsed.ErpLedgerBudget;
                if (null == bucket)
                   context.parsed.ErpLedgerBudget = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpLedgerBudget", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpLedgerBudget_collapse" aria-expanded="true" aria-controls="ErpLedgerBudget_collapse" style="margin-left: 10px;">ErpLedgerBudget</a></legend>
                    <div id="ErpLedgerBudget_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpLedBudLineItems}}<div><b>ErpLedBudLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpLedBudLineItems}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpLedBudLineItems) obj.ErpLedBudLineItems_string = obj.ErpLedBudLineItems.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpLedBudLineItems_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpLedgerBudget_collapse" aria-expanded="true" aria-controls="ErpLedgerBudget_collapse" style="margin-left: 10px;">ErpLedgerBudget</a></legend>
                    <div id="ErpLedgerBudget_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpLedBudLineItems", "ErpLedBudLineItem", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * Document describing the prices of goods or services provided by a supplier.
         *
         * It includes the terms of the purchase, delivery proposals, identification of goods or services ordered, as well as their quantities.
         *
         */
        class ErpQuote extends ErpDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpQuote;
                if (null == bucket)
                   cim_data.ErpQuote = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpQuote[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpDocument.prototype.parse.call (this, context, sub);
                obj.cls = "ErpQuote";
                base.parse_attributes (/<cim:ErpQuote.ErpQuoteLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpQuoteLineItems", sub, context);
                var bucket = context.parsed.ErpQuote;
                if (null == bucket)
                   context.parsed.ErpQuote = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpDocument.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpQuote", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpQuote_collapse" aria-expanded="true" aria-controls="ErpQuote_collapse" style="margin-left: 10px;">ErpQuote</a></legend>
                    <div id="ErpQuote_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.template.call (this) +
                    `
                    {{#ErpQuoteLineItems}}<div><b>ErpQuoteLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpQuoteLineItems}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpQuoteLineItems) obj.ErpQuoteLineItems_string = obj.ErpQuoteLineItems.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpQuoteLineItems_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpQuote_collapse" aria-expanded="true" aria-controls="ErpQuote_collapse" style="margin-left: 10px;">ErpQuote</a></legend>
                    <div id="ErpQuote_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpQuoteLineItems", "ErpQuoteLineItem", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * Individual entry of a given Ledger Budget, typically containing information such as amount, accounting date, accounting period, and is associated with the applicable general ledger account.
         *
         */
        class ErpLedBudLineItem extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpLedBudLineItem;
                if (null == bucket)
                   cim_data.ErpLedBudLineItem = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpLedBudLineItem[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpLedBudLineItem";
                base.parse_element (/<cim:ErpLedBudLineItem.status>([\s\S]*?)<\/cim:ErpLedBudLineItem.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpLedBudLineItem.ErpLedgerBudget\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpLedgerBudget", sub, context);
                base.parse_attribute (/<cim:ErpLedBudLineItem.ErpLedBudLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpLedBudLineItem", sub, context);
                var bucket = context.parsed.ErpLedBudLineItem;
                if (null == bucket)
                   context.parsed.ErpLedBudLineItem = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpLedBudLineItem", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ErpLedBudLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpLedBudLineItem", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpLedBudLineItem_collapse" aria-expanded="true" aria-controls="ErpLedBudLineItem_collapse" style="margin-left: 10px;">ErpLedBudLineItem</a></legend>
                    <div id="ErpLedBudLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#ErpLedgerBudget}}<div><b>ErpLedgerBudget</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpLedgerBudget}}&quot;);})'>{{ErpLedgerBudget}}</a></div>{{/ErpLedgerBudget}}
                    {{#ErpLedBudLineItem}}<div><b>ErpLedBudLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpLedBudLineItem}}&quot;);})'>{{ErpLedBudLineItem}}</a></div>{{/ErpLedBudLineItem}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpLedBudLineItem_collapse" aria-expanded="true" aria-controls="ErpLedBudLineItem_collapse" style="margin-left: 10px;">ErpLedBudLineItem</a></legend>
                    <div id="ErpLedBudLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpLedgerBudget'>ErpLedgerBudget: </label><div class='col-sm-8'><input id='ErpLedgerBudget' class='form-control' type='text'{{#ErpLedgerBudget}} value='{{ErpLedgerBudget}}'{{/ErpLedgerBudget}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpLedBudLineItem'>ErpLedBudLineItem: </label><div class='col-sm-8'><input id='ErpLedBudLineItem' class='form-control' type='text'{{#ErpLedBudLineItem}} value='{{ErpLedBudLineItem}}'{{/ErpLedBudLineItem}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpLedgerBudget", "ErpLedgerBudget", "1", "0..*"],
                        ["ErpLedBudLineItem", "ErpLedgerEntry", "0..1", "0..1"]
                    ]
                );
            }
        }

        /**
         * This is related to Inventory physical counts organized by AssetModel.
         *
         * Note that a count of a type of asset can be accomplished by the association inherited by AssetModel (from Document) to Asset.
         *
         */
        class ErpInventoryCount extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpInventoryCount;
                if (null == bucket)
                   cim_data.ErpInventoryCount = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpInventoryCount[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpInventoryCount";
                base.parse_element (/<cim:ErpInventoryCount.status>([\s\S]*?)<\/cim:ErpInventoryCount.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpInventoryCount.AssetModel\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "AssetModel", sub, context);
                var bucket = context.parsed.ErpInventoryCount;
                if (null == bucket)
                   context.parsed.ErpInventoryCount = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpInventoryCount", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ErpInventoryCount", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpInventoryCount_collapse" aria-expanded="true" aria-controls="ErpInventoryCount_collapse" style="margin-left: 10px;">ErpInventoryCount</a></legend>
                    <div id="ErpInventoryCount_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#AssetModel}}<div><b>AssetModel</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{AssetModel}}&quot;);})'>{{AssetModel}}</a></div>{{/AssetModel}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpInventoryCount_collapse" aria-expanded="true" aria-controls="ErpInventoryCount_collapse" style="margin-left: 10px;">ErpInventoryCount</a></legend>
                    <div id="ErpInventoryCount_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='AssetModel'>AssetModel: </label><div class='col-sm-8'><input id='AssetModel' class='form-control' type='text'{{#AssetModel}} value='{{AssetModel}}'{{/AssetModel}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["AssetModel", "AssetModel", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * An individual entry on an ErpTimeSheet.
         *
         */
        class ErpTimeEntry extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpTimeEntry;
                if (null == bucket)
                   cim_data.ErpTimeEntry = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpTimeEntry[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpTimeEntry";
                base.parse_element (/<cim:ErpTimeEntry.status>([\s\S]*?)<\/cim:ErpTimeEntry.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpTimeEntry.ErpTimeSheet\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpTimeSheet", sub, context);
                base.parse_attribute (/<cim:ErpTimeEntry.ErpProjectAccounting\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpProjectAccounting", sub, context);
                var bucket = context.parsed.ErpTimeEntry;
                if (null == bucket)
                   context.parsed.ErpTimeEntry = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpTimeEntry", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ErpTimeEntry", fields);
                base.export_attribute (obj, "export_attribute", "ErpTimeEntry", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpTimeEntry_collapse" aria-expanded="true" aria-controls="ErpTimeEntry_collapse" style="margin-left: 10px;">ErpTimeEntry</a></legend>
                    <div id="ErpTimeEntry_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#ErpTimeSheet}}<div><b>ErpTimeSheet</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpTimeSheet}}&quot;);})'>{{ErpTimeSheet}}</a></div>{{/ErpTimeSheet}}
                    {{#ErpProjectAccounting}}<div><b>ErpProjectAccounting</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpProjectAccounting}}&quot;);})'>{{ErpProjectAccounting}}</a></div>{{/ErpProjectAccounting}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpTimeEntry_collapse" aria-expanded="true" aria-controls="ErpTimeEntry_collapse" style="margin-left: 10px;">ErpTimeEntry</a></legend>
                    <div id="ErpTimeEntry_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpTimeSheet'>ErpTimeSheet: </label><div class='col-sm-8'><input id='ErpTimeSheet' class='form-control' type='text'{{#ErpTimeSheet}} value='{{ErpTimeSheet}}'{{/ErpTimeSheet}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpProjectAccounting'>ErpProjectAccounting: </label><div class='col-sm-8'><input id='ErpProjectAccounting' class='form-control' type='text'{{#ErpProjectAccounting}} value='{{ErpProjectAccounting}}'{{/ErpProjectAccounting}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpTimeSheet", "ErpTimeSheet", "1", "0..*"],
                        ["ErpProjectAccounting", "ErpProjectAccounting", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Of an ErpQuote, the item or product quoted along with quantity, price and other descriptive information.
         *
         */
        class ErpQuoteLineItem extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpQuoteLineItem;
                if (null == bucket)
                   cim_data.ErpQuoteLineItem = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpQuoteLineItem[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpQuoteLineItem";
                base.parse_element (/<cim:ErpQuoteLineItem.status>([\s\S]*?)<\/cim:ErpQuoteLineItem.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpQuoteLineItem.Design\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Design", sub, context);
                base.parse_attribute (/<cim:ErpQuoteLineItem.ErpQuote\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpQuote", sub, context);
                base.parse_attribute (/<cim:ErpQuoteLineItem.ErpInvoiceLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpInvoiceLineItem", sub, context);
                base.parse_attribute (/<cim:ErpQuoteLineItem.ErpReqLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpReqLineItem", sub, context);
                base.parse_attribute (/<cim:ErpQuoteLineItem.AssetModelCatalogueItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "AssetModelCatalogueItem", sub, context);
                var bucket = context.parsed.ErpQuoteLineItem;
                if (null == bucket)
                   context.parsed.ErpQuoteLineItem = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpQuoteLineItem", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ErpQuoteLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpQuoteLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpQuoteLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpQuoteLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpQuoteLineItem", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpQuoteLineItem_collapse" aria-expanded="true" aria-controls="ErpQuoteLineItem_collapse" style="margin-left: 10px;">ErpQuoteLineItem</a></legend>
                    <div id="ErpQuoteLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#Design}}<div><b>Design</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Design}}&quot;);})'>{{Design}}</a></div>{{/Design}}
                    {{#ErpQuote}}<div><b>ErpQuote</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpQuote}}&quot;);})'>{{ErpQuote}}</a></div>{{/ErpQuote}}
                    {{#ErpInvoiceLineItem}}<div><b>ErpInvoiceLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpInvoiceLineItem}}&quot;);})'>{{ErpInvoiceLineItem}}</a></div>{{/ErpInvoiceLineItem}}
                    {{#ErpReqLineItem}}<div><b>ErpReqLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpReqLineItem}}&quot;);})'>{{ErpReqLineItem}}</a></div>{{/ErpReqLineItem}}
                    {{#AssetModelCatalogueItem}}<div><b>AssetModelCatalogueItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{AssetModelCatalogueItem}}&quot;);})'>{{AssetModelCatalogueItem}}</a></div>{{/AssetModelCatalogueItem}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpQuoteLineItem_collapse" aria-expanded="true" aria-controls="ErpQuoteLineItem_collapse" style="margin-left: 10px;">ErpQuoteLineItem</a></legend>
                    <div id="ErpQuoteLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Design'>Design: </label><div class='col-sm-8'><input id='Design' class='form-control' type='text'{{#Design}} value='{{Design}}'{{/Design}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpQuote'>ErpQuote: </label><div class='col-sm-8'><input id='ErpQuote' class='form-control' type='text'{{#ErpQuote}} value='{{ErpQuote}}'{{/ErpQuote}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpInvoiceLineItem'>ErpInvoiceLineItem: </label><div class='col-sm-8'><input id='ErpInvoiceLineItem' class='form-control' type='text'{{#ErpInvoiceLineItem}} value='{{ErpInvoiceLineItem}}'{{/ErpInvoiceLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpReqLineItem'>ErpReqLineItem: </label><div class='col-sm-8'><input id='ErpReqLineItem' class='form-control' type='text'{{#ErpReqLineItem}} value='{{ErpReqLineItem}}'{{/ErpReqLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='AssetModelCatalogueItem'>AssetModelCatalogueItem: </label><div class='col-sm-8'><input id='AssetModelCatalogueItem' class='form-control' type='text'{{#AssetModelCatalogueItem}} value='{{AssetModelCatalogueItem}}'{{/AssetModelCatalogueItem}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["Design", "Design", "0..1", "0..1"],
                        ["ErpQuote", "ErpQuote", "1", "0..*"],
                        ["ErpInvoiceLineItem", "ErpInvoiceLineItem", "0..1", "0..1"],
                        ["ErpReqLineItem", "ErpReqLineItem", "0..1", "0..1"],
                        ["AssetModelCatalogueItem", "AssetModelCatalogueItem", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Details of an individual entry in a ledger, which was posted from a journal on the posted date.
         *
         */
        class ErpLedgerEntry extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpLedgerEntry;
                if (null == bucket)
                   cim_data.ErpLedgerEntry = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpLedgerEntry[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpLedgerEntry";
                base.parse_element (/<cim:ErpLedgerEntry.accountID>([\s\S]*?)<\/cim:ErpLedgerEntry.accountID>/g, obj, "accountID", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpLedgerEntry.accountKind\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "accountKind", sub, context);
                base.parse_element (/<cim:ErpLedgerEntry.amount>([\s\S]*?)<\/cim:ErpLedgerEntry.amount>/g, obj, "amount", base.to_string, sub, context);
                base.parse_element (/<cim:ErpLedgerEntry.postedDateTime>([\s\S]*?)<\/cim:ErpLedgerEntry.postedDateTime>/g, obj, "postedDateTime", base.to_datetime, sub, context);
                base.parse_element (/<cim:ErpLedgerEntry.status>([\s\S]*?)<\/cim:ErpLedgerEntry.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_element (/<cim:ErpLedgerEntry.transactionDateTime>([\s\S]*?)<\/cim:ErpLedgerEntry.transactionDateTime>/g, obj, "transactionDateTime", base.to_datetime, sub, context);
                base.parse_attribute (/<cim:ErpLedgerEntry.ErpJounalEntry\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpJounalEntry", sub, context);
                base.parse_attribute (/<cim:ErpLedgerEntry.ErpLedgerEntry\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpLedgerEntry", sub, context);
                base.parse_attributes (/<cim:ErpLedgerEntry.UserAttributes\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "UserAttributes", sub, context);
                base.parse_attribute (/<cim:ErpLedgerEntry.ErpLedger\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpLedger", sub, context);
                var bucket = context.parsed.ErpLedgerEntry;
                if (null == bucket)
                   context.parsed.ErpLedgerEntry = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpLedgerEntry", "accountID", base.from_string, fields);
                base.export_element (obj, "ErpLedgerEntry", "accountKind", base.from_string, fields);
                base.export_element (obj, "ErpLedgerEntry", "amount", base.from_string, fields);
                base.export_element (obj, "ErpLedgerEntry", "postedDateTime", base.from_datetime, fields);
                base.export_element (obj, "ErpLedgerEntry", "status", base.from_string, fields);
                base.export_element (obj, "ErpLedgerEntry", "transactionDateTime", base.from_datetime, fields);
                base.export_attribute (obj, "export_attribute", "ErpLedgerEntry", fields);
                base.export_attribute (obj, "export_attribute", "ErpLedgerEntry", fields);
                base.export_attribute (obj, "export_attributes", "ErpLedgerEntry", fields);
                base.export_attribute (obj, "export_attribute", "ErpLedgerEntry", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpLedgerEntry_collapse" aria-expanded="true" aria-controls="ErpLedgerEntry_collapse" style="margin-left: 10px;">ErpLedgerEntry</a></legend>
                    <div id="ErpLedgerEntry_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#accountID}}<div><b>accountID</b>: {{accountID}}</div>{{/accountID}}
                    {{#accountKind}}<div><b>accountKind</b>: {{accountKind}}</div>{{/accountKind}}
                    {{#amount}}<div><b>amount</b>: {{amount}}</div>{{/amount}}
                    {{#postedDateTime}}<div><b>postedDateTime</b>: {{postedDateTime}}</div>{{/postedDateTime}}
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#transactionDateTime}}<div><b>transactionDateTime</b>: {{transactionDateTime}}</div>{{/transactionDateTime}}
                    {{#ErpJounalEntry}}<div><b>ErpJounalEntry</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpJounalEntry}}&quot;);})'>{{ErpJounalEntry}}</a></div>{{/ErpJounalEntry}}
                    {{#ErpLedgerEntry}}<div><b>ErpLedgerEntry</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpLedgerEntry}}&quot;);})'>{{ErpLedgerEntry}}</a></div>{{/ErpLedgerEntry}}
                    {{#UserAttributes}}<div><b>UserAttributes</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/UserAttributes}}
                    {{#ErpLedger}}<div><b>ErpLedger</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpLedger}}&quot;);})'>{{ErpLedger}}</a></div>{{/ErpLedger}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.ErpAccountKind = []; if (!obj.accountKind) obj.ErpAccountKind.push ({ id: '', selected: true}); for (var property in ErpAccountKind) obj.ErpAccountKind.push ({ id: property, selected: obj.accountKind && obj.accountKind.endsWith ('.' + property)});
                if (obj.UserAttributes) obj.UserAttributes_string = obj.UserAttributes.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpAccountKind;
                delete obj.UserAttributes_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpLedgerEntry_collapse" aria-expanded="true" aria-controls="ErpLedgerEntry_collapse" style="margin-left: 10px;">ErpLedgerEntry</a></legend>
                    <div id="ErpLedgerEntry_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='accountID'>accountID: </label><div class='col-sm-8'><input id='accountID' class='form-control' type='text'{{#accountID}} value='{{accountID}}'{{/accountID}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='accountKind'>accountKind: </label><div class='col-sm-8'><select id='accountKind' class='form-control'>{{#ErpAccountKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/ErpAccountKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='amount'>amount: </label><div class='col-sm-8'><input id='amount' class='form-control' type='text'{{#amount}} value='{{amount}}'{{/amount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='postedDateTime'>postedDateTime: </label><div class='col-sm-8'><input id='postedDateTime' class='form-control' type='text'{{#postedDateTime}} value='{{postedDateTime}}'{{/postedDateTime}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='transactionDateTime'>transactionDateTime: </label><div class='col-sm-8'><input id='transactionDateTime' class='form-control' type='text'{{#transactionDateTime}} value='{{transactionDateTime}}'{{/transactionDateTime}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpJounalEntry'>ErpJounalEntry: </label><div class='col-sm-8'><input id='ErpJounalEntry' class='form-control' type='text'{{#ErpJounalEntry}} value='{{ErpJounalEntry}}'{{/ErpJounalEntry}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpLedgerEntry'>ErpLedgerEntry: </label><div class='col-sm-8'><input id='ErpLedgerEntry' class='form-control' type='text'{{#ErpLedgerEntry}} value='{{ErpLedgerEntry}}'{{/ErpLedgerEntry}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='UserAttributes'>UserAttributes: </label><div class='col-sm-8'><input id='UserAttributes' class='form-control' type='text'{{#UserAttributes}} value='{{UserAttributes}}_string'{{/UserAttributes}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpLedger'>ErpLedger: </label><div class='col-sm-8'><input id='ErpLedger' class='form-control' type='text'{{#ErpLedger}} value='{{ErpLedger}}'{{/ErpLedger}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpJounalEntry", "ErpJournalEntry", "0..1", "0..1"],
                        ["ErpLedgerEntry", "ErpLedBudLineItem", "0..1", "0..1"],
                        ["UserAttributes", "UserAttribute", "0..*", "0..*"],
                        ["ErpLedger", "ErpLedger", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Any unique purchased part for manufactured product tracked by ERP systems for a utility.
         *
         * Item, as used by the OAG, refers to the basic information about an item, including its attributes, cost, and locations. It does not include item quantities. Compare to the Inventory, which includes all quantities and other location-specific information.
         *
         */
        class ErpItemMaster extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpItemMaster;
                if (null == bucket)
                   cim_data.ErpItemMaster = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpItemMaster[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpItemMaster";
                base.parse_element (/<cim:ErpItemMaster.status>([\s\S]*?)<\/cim:ErpItemMaster.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpItemMaster.Asset\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Asset", sub, context);
                var bucket = context.parsed.ErpItemMaster;
                if (null == bucket)
                   context.parsed.ErpItemMaster = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpItemMaster", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ErpItemMaster", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpItemMaster_collapse" aria-expanded="true" aria-controls="ErpItemMaster_collapse" style="margin-left: 10px;">ErpItemMaster</a></legend>
                    <div id="ErpItemMaster_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#Asset}}<div><b>Asset</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Asset}}&quot;);})'>{{Asset}}</a></div>{{/Asset}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpItemMaster_collapse" aria-expanded="true" aria-controls="ErpItemMaster_collapse" style="margin-left: 10px;">ErpItemMaster</a></legend>
                    <div id="ErpItemMaster_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Asset'>Asset: </label><div class='col-sm-8'><input id='Asset' class='form-control' type='text'{{#Asset}} value='{{Asset}}'{{/Asset}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["Asset", "Asset", "0..1", "0..1"]
                    ]
                );
            }
        }

        /**
         * Of an ErpPayable, a line item references an ErpInvoiceLineitem or other source such as credit memos.
         *
         */
        class ErpPayableLineItem extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpPayableLineItem;
                if (null == bucket)
                   cim_data.ErpPayableLineItem = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpPayableLineItem[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpPayableLineItem";
                base.parse_element (/<cim:ErpPayableLineItem.status>([\s\S]*?)<\/cim:ErpPayableLineItem.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attributes (/<cim:ErpPayableLineItem.ErpPayments\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPayments", sub, context);
                base.parse_attribute (/<cim:ErpPayableLineItem.ErpPayable\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPayable", sub, context);
                base.parse_attribute (/<cim:ErpPayableLineItem.ErpInvoiceLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpInvoiceLineItem", sub, context);
                base.parse_attributes (/<cim:ErpPayableLineItem.ErpJournalEntries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpJournalEntries", sub, context);
                var bucket = context.parsed.ErpPayableLineItem;
                if (null == bucket)
                   context.parsed.ErpPayableLineItem = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpPayableLineItem", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "ErpPayableLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpPayableLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpPayableLineItem", fields);
                base.export_attribute (obj, "export_attributes", "ErpPayableLineItem", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPayableLineItem_collapse" aria-expanded="true" aria-controls="ErpPayableLineItem_collapse" style="margin-left: 10px;">ErpPayableLineItem</a></legend>
                    <div id="ErpPayableLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#ErpPayments}}<div><b>ErpPayments</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpPayments}}
                    {{#ErpPayable}}<div><b>ErpPayable</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpPayable}}&quot;);})'>{{ErpPayable}}</a></div>{{/ErpPayable}}
                    {{#ErpInvoiceLineItem}}<div><b>ErpInvoiceLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpInvoiceLineItem}}&quot;);})'>{{ErpInvoiceLineItem}}</a></div>{{/ErpInvoiceLineItem}}
                    {{#ErpJournalEntries}}<div><b>ErpJournalEntries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpJournalEntries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpPayments) obj.ErpPayments_string = obj.ErpPayments.join ();
                if (obj.ErpJournalEntries) obj.ErpJournalEntries_string = obj.ErpJournalEntries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpPayments_string;
                delete obj.ErpJournalEntries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPayableLineItem_collapse" aria-expanded="true" aria-controls="ErpPayableLineItem_collapse" style="margin-left: 10px;">ErpPayableLineItem</a></legend>
                    <div id="ErpPayableLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpPayments'>ErpPayments: </label><div class='col-sm-8'><input id='ErpPayments' class='form-control' type='text'{{#ErpPayments}} value='{{ErpPayments}}_string'{{/ErpPayments}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpPayable'>ErpPayable: </label><div class='col-sm-8'><input id='ErpPayable' class='form-control' type='text'{{#ErpPayable}} value='{{ErpPayable}}'{{/ErpPayable}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpInvoiceLineItem'>ErpInvoiceLineItem: </label><div class='col-sm-8'><input id='ErpInvoiceLineItem' class='form-control' type='text'{{#ErpInvoiceLineItem}} value='{{ErpInvoiceLineItem}}'{{/ErpInvoiceLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpJournalEntries'>ErpJournalEntries: </label><div class='col-sm-8'><input id='ErpJournalEntries' class='form-control' type='text'{{#ErpJournalEntries}} value='{{ErpJournalEntries}}_string'{{/ErpJournalEntries}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpPayments", "ErpPayment", "0..*", "0..*"],
                        ["ErpPayable", "ErpPayable", "1", "0..*"],
                        ["ErpInvoiceLineItem", "ErpInvoiceLineItem", "0..1", "0..1"],
                        ["ErpJournalEntries", "ErpJournalEntry", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * Individual entry of an ErpReceivable, it is a particular transaction representing an invoice, credit memo or debit memo to a customer.
         *
         */
        class ErpRecLineItem extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpRecLineItem;
                if (null == bucket)
                   cim_data.ErpRecLineItem = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpRecLineItem[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpRecLineItem";
                base.parse_element (/<cim:ErpRecLineItem.status>([\s\S]*?)<\/cim:ErpRecLineItem.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpRecLineItem.ErpInvoiceLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpInvoiceLineItem", sub, context);
                base.parse_attributes (/<cim:ErpRecLineItem.ErpPayments\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPayments", sub, context);
                base.parse_attributes (/<cim:ErpRecLineItem.ErpJournalEntries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpJournalEntries", sub, context);
                base.parse_attribute (/<cim:ErpRecLineItem.ErpReceivable\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpReceivable", sub, context);
                var bucket = context.parsed.ErpRecLineItem;
                if (null == bucket)
                   context.parsed.ErpRecLineItem = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpRecLineItem", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ErpRecLineItem", fields);
                base.export_attribute (obj, "export_attributes", "ErpRecLineItem", fields);
                base.export_attribute (obj, "export_attributes", "ErpRecLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpRecLineItem", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpRecLineItem_collapse" aria-expanded="true" aria-controls="ErpRecLineItem_collapse" style="margin-left: 10px;">ErpRecLineItem</a></legend>
                    <div id="ErpRecLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#ErpInvoiceLineItem}}<div><b>ErpInvoiceLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpInvoiceLineItem}}&quot;);})'>{{ErpInvoiceLineItem}}</a></div>{{/ErpInvoiceLineItem}}
                    {{#ErpPayments}}<div><b>ErpPayments</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpPayments}}
                    {{#ErpJournalEntries}}<div><b>ErpJournalEntries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpJournalEntries}}
                    {{#ErpReceivable}}<div><b>ErpReceivable</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpReceivable}}&quot;);})'>{{ErpReceivable}}</a></div>{{/ErpReceivable}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpPayments) obj.ErpPayments_string = obj.ErpPayments.join ();
                if (obj.ErpJournalEntries) obj.ErpJournalEntries_string = obj.ErpJournalEntries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpPayments_string;
                delete obj.ErpJournalEntries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpRecLineItem_collapse" aria-expanded="true" aria-controls="ErpRecLineItem_collapse" style="margin-left: 10px;">ErpRecLineItem</a></legend>
                    <div id="ErpRecLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpInvoiceLineItem'>ErpInvoiceLineItem: </label><div class='col-sm-8'><input id='ErpInvoiceLineItem' class='form-control' type='text'{{#ErpInvoiceLineItem}} value='{{ErpInvoiceLineItem}}'{{/ErpInvoiceLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpPayments'>ErpPayments: </label><div class='col-sm-8'><input id='ErpPayments' class='form-control' type='text'{{#ErpPayments}} value='{{ErpPayments}}_string'{{/ErpPayments}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpJournalEntries'>ErpJournalEntries: </label><div class='col-sm-8'><input id='ErpJournalEntries' class='form-control' type='text'{{#ErpJournalEntries}} value='{{ErpJournalEntries}}_string'{{/ErpJournalEntries}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpReceivable'>ErpReceivable: </label><div class='col-sm-8'><input id='ErpReceivable' class='form-control' type='text'{{#ErpReceivable}} value='{{ErpReceivable}}'{{/ErpReceivable}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpInvoiceLineItem", "ErpInvoiceLineItem", "0..1", "0..1"],
                        ["ErpPayments", "ErpPayment", "0..*", "0..*"],
                        ["ErpJournalEntries", "ErpJournalEntry", "0..*", "0..*"],
                        ["ErpReceivable", "ErpReceivable", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Can be used to request an application to process an issue or request information about an issue.
         *
         */
        class ErpIssueInventory extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpIssueInventory;
                if (null == bucket)
                   cim_data.ErpIssueInventory = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpIssueInventory[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpIssueInventory";
                base.parse_element (/<cim:ErpIssueInventory.status>([\s\S]*?)<\/cim:ErpIssueInventory.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpIssueInventory.TypeMaterial\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TypeMaterial", sub, context);
                base.parse_attribute (/<cim:ErpIssueInventory.TypeAsset\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TypeAsset", sub, context);
                var bucket = context.parsed.ErpIssueInventory;
                if (null == bucket)
                   context.parsed.ErpIssueInventory = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpIssueInventory", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ErpIssueInventory", fields);
                base.export_attribute (obj, "export_attribute", "ErpIssueInventory", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpIssueInventory_collapse" aria-expanded="true" aria-controls="ErpIssueInventory_collapse" style="margin-left: 10px;">ErpIssueInventory</a></legend>
                    <div id="ErpIssueInventory_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#TypeMaterial}}<div><b>TypeMaterial</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TypeMaterial}}&quot;);})'>{{TypeMaterial}}</a></div>{{/TypeMaterial}}
                    {{#TypeAsset}}<div><b>TypeAsset</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TypeAsset}}&quot;);})'>{{TypeAsset}}</a></div>{{/TypeAsset}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpIssueInventory_collapse" aria-expanded="true" aria-controls="ErpIssueInventory_collapse" style="margin-left: 10px;">ErpIssueInventory</a></legend>
                    <div id="ErpIssueInventory_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TypeMaterial'>TypeMaterial: </label><div class='col-sm-8'><input id='TypeMaterial' class='form-control' type='text'{{#TypeMaterial}} value='{{TypeMaterial}}'{{/TypeMaterial}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TypeAsset'>TypeAsset: </label><div class='col-sm-8'><input id='TypeAsset' class='form-control' type='text'{{#TypeAsset}} value='{{TypeAsset}}'{{/TypeAsset}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["TypeMaterial", "TypeMaterial", "0..1", "0..*"],
                        ["TypeAsset", "GenericAssetModelOrMaterial", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Utility inventory-related information about an item or part (and not for description of the item and its attributes).
         *
         * It is used by ERP applications to enable the synchronization of Inventory data that exists on separate Item Master databases. This data is not the master data that describes the attributes of the item such as dimensions, weight, or unit of measure - it describes the item as it exists at a specific location.
         *
         */
        class ErpInventory extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpInventory;
                if (null == bucket)
                   cim_data.ErpInventory = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpInventory[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpInventory";
                base.parse_element (/<cim:ErpInventory.status>([\s\S]*?)<\/cim:ErpInventory.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpInventory.Asset\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Asset", sub, context);
                var bucket = context.parsed.ErpInventory;
                if (null == bucket)
                   context.parsed.ErpInventory = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpInventory", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ErpInventory", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpInventory_collapse" aria-expanded="true" aria-controls="ErpInventory_collapse" style="margin-left: 10px;">ErpInventory</a></legend>
                    <div id="ErpInventory_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#Asset}}<div><b>Asset</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Asset}}&quot;);})'>{{Asset}}</a></div>{{/Asset}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpInventory_collapse" aria-expanded="true" aria-controls="ErpInventory_collapse" style="margin-left: 10px;">ErpInventory</a></legend>
                    <div id="ErpInventory_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Asset'>Asset: </label><div class='col-sm-8'><input id='Asset' class='form-control' type='text'{{#Asset}} value='{{Asset}}'{{/Asset}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["Asset", "Asset", "0..1", "0..1"]
                    ]
                );
            }
        }

        /**
         * Information that describes a requested item and its attributes.
         *
         */
        class ErpReqLineItem extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpReqLineItem;
                if (null == bucket)
                   cim_data.ErpReqLineItem = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpReqLineItem[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpReqLineItem";
                base.parse_element (/<cim:ErpReqLineItem.code>([\s\S]*?)<\/cim:ErpReqLineItem.code>/g, obj, "code", base.to_string, sub, context);
                base.parse_element (/<cim:ErpReqLineItem.cost>([\s\S]*?)<\/cim:ErpReqLineItem.cost>/g, obj, "cost", base.to_string, sub, context);
                base.parse_element (/<cim:ErpReqLineItem.deliveryDate>([\s\S]*?)<\/cim:ErpReqLineItem.deliveryDate>/g, obj, "deliveryDate", base.to_string, sub, context);
                base.parse_element (/<cim:ErpReqLineItem.quantity>([\s\S]*?)<\/cim:ErpReqLineItem.quantity>/g, obj, "quantity", base.to_string, sub, context);
                base.parse_element (/<cim:ErpReqLineItem.status>([\s\S]*?)<\/cim:ErpReqLineItem.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpReqLineItem.ErpPOLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPOLineItem", sub, context);
                base.parse_attribute (/<cim:ErpReqLineItem.TypeMaterial\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TypeMaterial", sub, context);
                base.parse_attribute (/<cim:ErpReqLineItem.ErpRequisition\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpRequisition", sub, context);
                base.parse_attribute (/<cim:ErpReqLineItem.TypeAsset\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TypeAsset", sub, context);
                base.parse_attribute (/<cim:ErpReqLineItem.ErpQuoteLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpQuoteLineItem", sub, context);
                var bucket = context.parsed.ErpReqLineItem;
                if (null == bucket)
                   context.parsed.ErpReqLineItem = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpReqLineItem", "code", base.from_string, fields);
                base.export_element (obj, "ErpReqLineItem", "cost", base.from_string, fields);
                base.export_element (obj, "ErpReqLineItem", "deliveryDate", base.from_string, fields);
                base.export_element (obj, "ErpReqLineItem", "quantity", base.from_string, fields);
                base.export_element (obj, "ErpReqLineItem", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ErpReqLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpReqLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpReqLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpReqLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpReqLineItem", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpReqLineItem_collapse" aria-expanded="true" aria-controls="ErpReqLineItem_collapse" style="margin-left: 10px;">ErpReqLineItem</a></legend>
                    <div id="ErpReqLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#code}}<div><b>code</b>: {{code}}</div>{{/code}}
                    {{#cost}}<div><b>cost</b>: {{cost}}</div>{{/cost}}
                    {{#deliveryDate}}<div><b>deliveryDate</b>: {{deliveryDate}}</div>{{/deliveryDate}}
                    {{#quantity}}<div><b>quantity</b>: {{quantity}}</div>{{/quantity}}
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#ErpPOLineItem}}<div><b>ErpPOLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpPOLineItem}}&quot;);})'>{{ErpPOLineItem}}</a></div>{{/ErpPOLineItem}}
                    {{#TypeMaterial}}<div><b>TypeMaterial</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TypeMaterial}}&quot;);})'>{{TypeMaterial}}</a></div>{{/TypeMaterial}}
                    {{#ErpRequisition}}<div><b>ErpRequisition</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpRequisition}}&quot;);})'>{{ErpRequisition}}</a></div>{{/ErpRequisition}}
                    {{#TypeAsset}}<div><b>TypeAsset</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TypeAsset}}&quot;);})'>{{TypeAsset}}</a></div>{{/TypeAsset}}
                    {{#ErpQuoteLineItem}}<div><b>ErpQuoteLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpQuoteLineItem}}&quot;);})'>{{ErpQuoteLineItem}}</a></div>{{/ErpQuoteLineItem}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpReqLineItem_collapse" aria-expanded="true" aria-controls="ErpReqLineItem_collapse" style="margin-left: 10px;">ErpReqLineItem</a></legend>
                    <div id="ErpReqLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='code'>code: </label><div class='col-sm-8'><input id='code' class='form-control' type='text'{{#code}} value='{{code}}'{{/code}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='cost'>cost: </label><div class='col-sm-8'><input id='cost' class='form-control' type='text'{{#cost}} value='{{cost}}'{{/cost}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='deliveryDate'>deliveryDate: </label><div class='col-sm-8'><input id='deliveryDate' class='form-control' type='text'{{#deliveryDate}} value='{{deliveryDate}}'{{/deliveryDate}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='quantity'>quantity: </label><div class='col-sm-8'><input id='quantity' class='form-control' type='text'{{#quantity}} value='{{quantity}}'{{/quantity}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpPOLineItem'>ErpPOLineItem: </label><div class='col-sm-8'><input id='ErpPOLineItem' class='form-control' type='text'{{#ErpPOLineItem}} value='{{ErpPOLineItem}}'{{/ErpPOLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TypeMaterial'>TypeMaterial: </label><div class='col-sm-8'><input id='TypeMaterial' class='form-control' type='text'{{#TypeMaterial}} value='{{TypeMaterial}}'{{/TypeMaterial}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpRequisition'>ErpRequisition: </label><div class='col-sm-8'><input id='ErpRequisition' class='form-control' type='text'{{#ErpRequisition}} value='{{ErpRequisition}}'{{/ErpRequisition}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TypeAsset'>TypeAsset: </label><div class='col-sm-8'><input id='TypeAsset' class='form-control' type='text'{{#TypeAsset}} value='{{TypeAsset}}'{{/TypeAsset}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpQuoteLineItem'>ErpQuoteLineItem: </label><div class='col-sm-8'><input id='ErpQuoteLineItem' class='form-control' type='text'{{#ErpQuoteLineItem}} value='{{ErpQuoteLineItem}}'{{/ErpQuoteLineItem}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpPOLineItem", "ErpPOLineItem", "0..1", "0..1"],
                        ["TypeMaterial", "TypeMaterial", "0..1", "0..*"],
                        ["ErpRequisition", "ErpRequisition", "1", "0..*"],
                        ["TypeAsset", "GenericAssetModelOrMaterial", "0..1", "0..*"],
                        ["ErpQuoteLineItem", "ErpQuoteLineItem", "0..1", "0..1"]
                    ]
                );
            }
        }

        /**
         * Information that applies to the basic data about a utility person, used by ERP applications to transfer Personnel data for a worker.
         *
         */
        class ErpPersonnel extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpPersonnel;
                if (null == bucket)
                   cim_data.ErpPersonnel = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpPersonnel[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpPersonnel";
                base.parse_element (/<cim:ErpPersonnel.status>([\s\S]*?)<\/cim:ErpPersonnel.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attributes (/<cim:ErpPersonnel.ErpPersons\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPersons", sub, context);
                var bucket = context.parsed.ErpPersonnel;
                if (null == bucket)
                   context.parsed.ErpPersonnel = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpPersonnel", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "ErpPersonnel", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPersonnel_collapse" aria-expanded="true" aria-controls="ErpPersonnel_collapse" style="margin-left: 10px;">ErpPersonnel</a></legend>
                    <div id="ErpPersonnel_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#ErpPersons}}<div><b>ErpPersons</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpPersons}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpPersons) obj.ErpPersons_string = obj.ErpPersons.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpPersons_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpPersonnel_collapse" aria-expanded="true" aria-controls="ErpPersonnel_collapse" style="margin-left: 10px;">ErpPersonnel</a></legend>
                    <div id="ErpPersonnel_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpPersons", "OldPerson", "0..*", "0..1"]
                    ]
                );
            }
        }

        /**
         * Details of an individual entry in a journal, which is to be posted to a ledger on the posting date.
         *
         */
        class ErpJournalEntry extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpJournalEntry;
                if (null == bucket)
                   cim_data.ErpJournalEntry = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpJournalEntry[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpJournalEntry";
                base.parse_element (/<cim:ErpJournalEntry.accountID>([\s\S]*?)<\/cim:ErpJournalEntry.accountID>/g, obj, "accountID", base.to_string, sub, context);
                base.parse_element (/<cim:ErpJournalEntry.amount>([\s\S]*?)<\/cim:ErpJournalEntry.amount>/g, obj, "amount", base.to_string, sub, context);
                base.parse_element (/<cim:ErpJournalEntry.postingDateTime>([\s\S]*?)<\/cim:ErpJournalEntry.postingDateTime>/g, obj, "postingDateTime", base.to_datetime, sub, context);
                base.parse_element (/<cim:ErpJournalEntry.sourceID>([\s\S]*?)<\/cim:ErpJournalEntry.sourceID>/g, obj, "sourceID", base.to_string, sub, context);
                base.parse_element (/<cim:ErpJournalEntry.status>([\s\S]*?)<\/cim:ErpJournalEntry.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_element (/<cim:ErpJournalEntry.transactionDateTime>([\s\S]*?)<\/cim:ErpJournalEntry.transactionDateTime>/g, obj, "transactionDateTime", base.to_datetime, sub, context);
                base.parse_attribute (/<cim:ErpJournalEntry.ErpLedgerEntry\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpLedgerEntry", sub, context);
                base.parse_attributes (/<cim:ErpJournalEntry.ErpPayableLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPayableLineItems", sub, context);
                base.parse_attribute (/<cim:ErpJournalEntry.ErpJournal\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpJournal", sub, context);
                base.parse_attributes (/<cim:ErpJournalEntry.ErpRecLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpRecLineItems", sub, context);
                base.parse_attributes (/<cim:ErpJournalEntry.CostTypes\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "CostTypes", sub, context);
                base.parse_attribute (/<cim:ErpJournalEntry.ErpInvoiceLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpInvoiceLineItem", sub, context);
                var bucket = context.parsed.ErpJournalEntry;
                if (null == bucket)
                   context.parsed.ErpJournalEntry = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpJournalEntry", "accountID", base.from_string, fields);
                base.export_element (obj, "ErpJournalEntry", "amount", base.from_string, fields);
                base.export_element (obj, "ErpJournalEntry", "postingDateTime", base.from_datetime, fields);
                base.export_element (obj, "ErpJournalEntry", "sourceID", base.from_string, fields);
                base.export_element (obj, "ErpJournalEntry", "status", base.from_string, fields);
                base.export_element (obj, "ErpJournalEntry", "transactionDateTime", base.from_datetime, fields);
                base.export_attribute (obj, "export_attribute", "ErpJournalEntry", fields);
                base.export_attribute (obj, "export_attributes", "ErpJournalEntry", fields);
                base.export_attribute (obj, "export_attribute", "ErpJournalEntry", fields);
                base.export_attribute (obj, "export_attributes", "ErpJournalEntry", fields);
                base.export_attribute (obj, "export_attributes", "ErpJournalEntry", fields);
                base.export_attribute (obj, "export_attribute", "ErpJournalEntry", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpJournalEntry_collapse" aria-expanded="true" aria-controls="ErpJournalEntry_collapse" style="margin-left: 10px;">ErpJournalEntry</a></legend>
                    <div id="ErpJournalEntry_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#accountID}}<div><b>accountID</b>: {{accountID}}</div>{{/accountID}}
                    {{#amount}}<div><b>amount</b>: {{amount}}</div>{{/amount}}
                    {{#postingDateTime}}<div><b>postingDateTime</b>: {{postingDateTime}}</div>{{/postingDateTime}}
                    {{#sourceID}}<div><b>sourceID</b>: {{sourceID}}</div>{{/sourceID}}
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#transactionDateTime}}<div><b>transactionDateTime</b>: {{transactionDateTime}}</div>{{/transactionDateTime}}
                    {{#ErpLedgerEntry}}<div><b>ErpLedgerEntry</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpLedgerEntry}}&quot;);})'>{{ErpLedgerEntry}}</a></div>{{/ErpLedgerEntry}}
                    {{#ErpPayableLineItems}}<div><b>ErpPayableLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpPayableLineItems}}
                    {{#ErpJournal}}<div><b>ErpJournal</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpJournal}}&quot;);})'>{{ErpJournal}}</a></div>{{/ErpJournal}}
                    {{#ErpRecLineItems}}<div><b>ErpRecLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpRecLineItems}}
                    {{#CostTypes}}<div><b>CostTypes</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/CostTypes}}
                    {{#ErpInvoiceLineItem}}<div><b>ErpInvoiceLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpInvoiceLineItem}}&quot;);})'>{{ErpInvoiceLineItem}}</a></div>{{/ErpInvoiceLineItem}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpPayableLineItems) obj.ErpPayableLineItems_string = obj.ErpPayableLineItems.join ();
                if (obj.ErpRecLineItems) obj.ErpRecLineItems_string = obj.ErpRecLineItems.join ();
                if (obj.CostTypes) obj.CostTypes_string = obj.CostTypes.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpPayableLineItems_string;
                delete obj.ErpRecLineItems_string;
                delete obj.CostTypes_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpJournalEntry_collapse" aria-expanded="true" aria-controls="ErpJournalEntry_collapse" style="margin-left: 10px;">ErpJournalEntry</a></legend>
                    <div id="ErpJournalEntry_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='accountID'>accountID: </label><div class='col-sm-8'><input id='accountID' class='form-control' type='text'{{#accountID}} value='{{accountID}}'{{/accountID}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='amount'>amount: </label><div class='col-sm-8'><input id='amount' class='form-control' type='text'{{#amount}} value='{{amount}}'{{/amount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='postingDateTime'>postingDateTime: </label><div class='col-sm-8'><input id='postingDateTime' class='form-control' type='text'{{#postingDateTime}} value='{{postingDateTime}}'{{/postingDateTime}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='sourceID'>sourceID: </label><div class='col-sm-8'><input id='sourceID' class='form-control' type='text'{{#sourceID}} value='{{sourceID}}'{{/sourceID}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='transactionDateTime'>transactionDateTime: </label><div class='col-sm-8'><input id='transactionDateTime' class='form-control' type='text'{{#transactionDateTime}} value='{{transactionDateTime}}'{{/transactionDateTime}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpLedgerEntry'>ErpLedgerEntry: </label><div class='col-sm-8'><input id='ErpLedgerEntry' class='form-control' type='text'{{#ErpLedgerEntry}} value='{{ErpLedgerEntry}}'{{/ErpLedgerEntry}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpPayableLineItems'>ErpPayableLineItems: </label><div class='col-sm-8'><input id='ErpPayableLineItems' class='form-control' type='text'{{#ErpPayableLineItems}} value='{{ErpPayableLineItems}}_string'{{/ErpPayableLineItems}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpJournal'>ErpJournal: </label><div class='col-sm-8'><input id='ErpJournal' class='form-control' type='text'{{#ErpJournal}} value='{{ErpJournal}}'{{/ErpJournal}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpRecLineItems'>ErpRecLineItems: </label><div class='col-sm-8'><input id='ErpRecLineItems' class='form-control' type='text'{{#ErpRecLineItems}} value='{{ErpRecLineItems}}_string'{{/ErpRecLineItems}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='CostTypes'>CostTypes: </label><div class='col-sm-8'><input id='CostTypes' class='form-control' type='text'{{#CostTypes}} value='{{CostTypes}}_string'{{/CostTypes}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpInvoiceLineItem'>ErpInvoiceLineItem: </label><div class='col-sm-8'><input id='ErpInvoiceLineItem' class='form-control' type='text'{{#ErpInvoiceLineItem}} value='{{ErpInvoiceLineItem}}'{{/ErpInvoiceLineItem}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpLedgerEntry", "ErpLedgerEntry", "0..1", "0..1"],
                        ["ErpPayableLineItems", "ErpPayableLineItem", "0..*", "0..*"],
                        ["ErpJournal", "ErpJournal", "1", "0..*"],
                        ["ErpRecLineItems", "ErpRecLineItem", "0..*", "0..*"],
                        ["CostTypes", "CostType", "0..*", "0..*"],
                        ["ErpInvoiceLineItem", "ErpInvoiceLineItem", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * An individual item on a bill of materials.
         *
         */
        class ErpBomItemData extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpBomItemData;
                if (null == bucket)
                   cim_data.ErpBomItemData = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpBomItemData[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpBomItemData";
                base.parse_attribute (/<cim:ErpBomItemData.TypeAsset\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TypeAsset", sub, context);
                base.parse_attribute (/<cim:ErpBomItemData.DesignLocation\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "DesignLocation", sub, context);
                base.parse_attribute (/<cim:ErpBomItemData.ErpBOM\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpBOM", sub, context);
                var bucket = context.parsed.ErpBomItemData;
                if (null == bucket)
                   context.parsed.ErpBomItemData = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "ErpBomItemData", fields);
                base.export_attribute (obj, "export_attribute", "ErpBomItemData", fields);
                base.export_attribute (obj, "export_attribute", "ErpBomItemData", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpBomItemData_collapse" aria-expanded="true" aria-controls="ErpBomItemData_collapse" style="margin-left: 10px;">ErpBomItemData</a></legend>
                    <div id="ErpBomItemData_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#TypeAsset}}<div><b>TypeAsset</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TypeAsset}}&quot;);})'>{{TypeAsset}}</a></div>{{/TypeAsset}}
                    {{#DesignLocation}}<div><b>DesignLocation</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{DesignLocation}}&quot;);})'>{{DesignLocation}}</a></div>{{/DesignLocation}}
                    {{#ErpBOM}}<div><b>ErpBOM</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpBOM}}&quot;);})'>{{ErpBOM}}</a></div>{{/ErpBOM}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpBomItemData_collapse" aria-expanded="true" aria-controls="ErpBomItemData_collapse" style="margin-left: 10px;">ErpBomItemData</a></legend>
                    <div id="ErpBomItemData_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TypeAsset'>TypeAsset: </label><div class='col-sm-8'><input id='TypeAsset' class='form-control' type='text'{{#TypeAsset}} value='{{TypeAsset}}'{{/TypeAsset}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='DesignLocation'>DesignLocation: </label><div class='col-sm-8'><input id='DesignLocation' class='form-control' type='text'{{#DesignLocation}} value='{{DesignLocation}}'{{/DesignLocation}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpBOM'>ErpBOM: </label><div class='col-sm-8'><input id='ErpBOM' class='form-control' type='text'{{#ErpBOM}} value='{{ErpBOM}}'{{/ErpBOM}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["TypeAsset", "GenericAssetModelOrMaterial", "0..1", "0..*"],
                        ["DesignLocation", "DesignLocation", "0..1", "0..*"],
                        ["ErpBOM", "ErpBOM", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * For a utility, general information that describes physical locations of organizations or the location codes and their meanings.
         *
         * This enables ERP applications to ensure that the physical location identifiers are synchronized between the business applications.
         *
         */
        class ErpSiteLevelData extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpSiteLevelData;
                if (null == bucket)
                   cim_data.ErpSiteLevelData = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpSiteLevelData[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpSiteLevelData";
                base.parse_element (/<cim:ErpSiteLevelData.status>([\s\S]*?)<\/cim:ErpSiteLevelData.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpSiteLevelData.LandProperty\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "LandProperty", sub, context);
                var bucket = context.parsed.ErpSiteLevelData;
                if (null == bucket)
                   context.parsed.ErpSiteLevelData = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpSiteLevelData", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ErpSiteLevelData", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpSiteLevelData_collapse" aria-expanded="true" aria-controls="ErpSiteLevelData_collapse" style="margin-left: 10px;">ErpSiteLevelData</a></legend>
                    <div id="ErpSiteLevelData_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#LandProperty}}<div><b>LandProperty</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{LandProperty}}&quot;);})'>{{LandProperty}}</a></div>{{/LandProperty}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
            }

            uncondition (obj)
            {
                super.uncondition (obj);
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpSiteLevelData_collapse" aria-expanded="true" aria-controls="ErpSiteLevelData_collapse" style="margin-left: 10px;">ErpSiteLevelData</a></legend>
                    <div id="ErpSiteLevelData_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='LandProperty'>LandProperty: </label><div class='col-sm-8'><input id='LandProperty' class='form-control' type='text'{{#LandProperty}} value='{{LandProperty}}'{{/LandProperty}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["LandProperty", "LandProperty", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Of an ErpReceiveDelivery, this is an individually received good or service by the Organisation receiving goods or services.
         *
         * It may be used to indicate receipt of goods in conjunction with a purchase order line item.
         *
         */
        class ErpRecDelvLineItem extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpRecDelvLineItem;
                if (null == bucket)
                   cim_data.ErpRecDelvLineItem = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpRecDelvLineItem[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpRecDelvLineItem";
                base.parse_element (/<cim:ErpRecDelvLineItem.status>([\s\S]*?)<\/cim:ErpRecDelvLineItem.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attribute (/<cim:ErpRecDelvLineItem.ErpPOLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPOLineItem", sub, context);
                base.parse_attribute (/<cim:ErpRecDelvLineItem.ErpInvoiceLineItem\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpInvoiceLineItem", sub, context);
                base.parse_attributes (/<cim:ErpRecDelvLineItem.Assets\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Assets", sub, context);
                base.parse_attribute (/<cim:ErpRecDelvLineItem.ErpReceiveDelivery\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpReceiveDelivery", sub, context);
                var bucket = context.parsed.ErpRecDelvLineItem;
                if (null == bucket)
                   context.parsed.ErpRecDelvLineItem = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "ErpRecDelvLineItem", "status", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ErpRecDelvLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpRecDelvLineItem", fields);
                base.export_attribute (obj, "export_attributes", "ErpRecDelvLineItem", fields);
                base.export_attribute (obj, "export_attribute", "ErpRecDelvLineItem", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpRecDelvLineItem_collapse" aria-expanded="true" aria-controls="ErpRecDelvLineItem_collapse" style="margin-left: 10px;">ErpRecDelvLineItem</a></legend>
                    <div id="ErpRecDelvLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#ErpPOLineItem}}<div><b>ErpPOLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpPOLineItem}}&quot;);})'>{{ErpPOLineItem}}</a></div>{{/ErpPOLineItem}}
                    {{#ErpInvoiceLineItem}}<div><b>ErpInvoiceLineItem</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpInvoiceLineItem}}&quot;);})'>{{ErpInvoiceLineItem}}</a></div>{{/ErpInvoiceLineItem}}
                    {{#Assets}}<div><b>Assets</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Assets}}
                    {{#ErpReceiveDelivery}}<div><b>ErpReceiveDelivery</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ErpReceiveDelivery}}&quot;);})'>{{ErpReceiveDelivery}}</a></div>{{/ErpReceiveDelivery}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.Assets) obj.Assets_string = obj.Assets.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.Assets_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpRecDelvLineItem_collapse" aria-expanded="true" aria-controls="ErpRecDelvLineItem_collapse" style="margin-left: 10px;">ErpRecDelvLineItem</a></legend>
                    <div id="ErpRecDelvLineItem_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpPOLineItem'>ErpPOLineItem: </label><div class='col-sm-8'><input id='ErpPOLineItem' class='form-control' type='text'{{#ErpPOLineItem}} value='{{ErpPOLineItem}}'{{/ErpPOLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpInvoiceLineItem'>ErpInvoiceLineItem: </label><div class='col-sm-8'><input id='ErpInvoiceLineItem' class='form-control' type='text'{{#ErpInvoiceLineItem}} value='{{ErpInvoiceLineItem}}'{{/ErpInvoiceLineItem}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Assets'>Assets: </label><div class='col-sm-8'><input id='Assets' class='form-control' type='text'{{#Assets}} value='{{Assets}}_string'{{/Assets}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpReceiveDelivery'>ErpReceiveDelivery: </label><div class='col-sm-8'><input id='ErpReceiveDelivery' class='form-control' type='text'{{#ErpReceiveDelivery}} value='{{ErpReceiveDelivery}}'{{/ErpReceiveDelivery}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpPOLineItem", "ErpPOLineItem", "0..1", "0..1"],
                        ["ErpInvoiceLineItem", "ErpInvoiceLineItem", "0..1", "0..1"],
                        ["Assets", "Asset", "0..*", "0..*"],
                        ["ErpReceiveDelivery", "ErpReceiveDelivery", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Information that describes aptitudes of a utility employee.
         *
         * Unlike Skills that an ErpPerson must be certified to perform before undertaking certain type of assignments (to be able to perfrom a Craft), ErpCompetency has more to do with typical Human Resource (HR) matters such as schooling, training, etc.
         *
         */
        class ErpCompetency extends ErpIdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ErpCompetency;
                if (null == bucket)
                   cim_data.ErpCompetency = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ErpCompetency[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ErpIdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "ErpCompetency";
                base.parse_attributes (/<cim:ErpCompetency.ErpPersons\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpPersons", sub, context);
                var bucket = context.parsed.ErpCompetency;
                if (null == bucket)
                   context.parsed.ErpCompetency = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ErpIdentifiedObject.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "ErpCompetency", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpCompetency_collapse" aria-expanded="true" aria-controls="ErpCompetency_collapse" style="margin-left: 10px;">ErpCompetency</a></legend>
                    <div id="ErpCompetency_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.template.call (this) +
                    `
                    {{#ErpPersons}}<div><b>ErpPersons</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpPersons}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ErpPersons) obj.ErpPersons_string = obj.ErpPersons.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ErpPersons_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ErpCompetency_collapse" aria-expanded="true" aria-controls="ErpCompetency_collapse" style="margin-left: 10px;">ErpCompetency</a></legend>
                    <div id="ErpCompetency_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ErpIdentifiedObject.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ErpPersons", "OldPerson", "0..*", "0..1"]
                    ]
                );
            }
        }

        return (
            {
                ErpRecLineItem: ErpRecLineItem,
                ErpPOLineItem: ErpPOLineItem,
                ErpPayable: ErpPayable,
                ErpBOM: ErpBOM,
                ErpBankAccount: ErpBankAccount,
                ErpSiteLevelData: ErpSiteLevelData,
                ErpQuote: ErpQuote,
                ErpPurchaseOrder: ErpPurchaseOrder,
                ErpTimeEntry: ErpTimeEntry,
                ErpJournal: ErpJournal,
                ErpProjectAccounting: ErpProjectAccounting,
                ErpRecDelvLineItem: ErpRecDelvLineItem,
                ErpEngChangeOrder: ErpEngChangeOrder,
                ErpReceiveDelivery: ErpReceiveDelivery,
                ErpQuoteLineItem: ErpQuoteLineItem,
                ErpPersonnel: ErpPersonnel,
                ErpRequisition: ErpRequisition,
                ErpPayableLineItem: ErpPayableLineItem,
                ErpIdentifiedObject: ErpIdentifiedObject,
                ErpBomItemData: ErpBomItemData,
                ErpItemMaster: ErpItemMaster,
                ErpReqLineItem: ErpReqLineItem,
                ErpSalesOrder: ErpSalesOrder,
                ErpInvoice: ErpInvoice,
                ErpIssueInventory: ErpIssueInventory,
                ErpDocument: ErpDocument,
                ErpLedger: ErpLedger,
                ErpLedgerEntry: ErpLedgerEntry,
                ErpInventory: ErpInventory,
                ErpCompetency: ErpCompetency,
                ErpPayment: ErpPayment,
                ErpInvoiceLineItem: ErpInvoiceLineItem,
                ErpLedBudLineItem: ErpLedBudLineItem,
                ErpTimeSheet: ErpTimeSheet,
                ErpChartOfAccounts: ErpChartOfAccounts,
                ErpReceivable: ErpReceivable,
                ErpInventoryCount: ErpInventoryCount,
                ErpJournalEntry: ErpJournalEntry,
                ErpLedgerBudget: ErpLedgerBudget
            }
        );
    }
);