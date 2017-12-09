define
(
    ["model/base", "model/Common", "model/Core"],
    /**
     * The package is used to define detailed customer models.
     *
     */
    function (base, Common, Core)
    {

        /**
         * Kind of customer billing.
         *
         */
        var CustomerBillingKind =
        {
            consolidatedEss: "consolidatedEss",
            consolidatedUdc: "consolidatedUdc",
            separateEssUdc: "separateEssUdc",
            other: "other"
        };
        Object.freeze (CustomerBillingKind);

        /**
         * The Standard Industrial Classification (SIC) are the codes that identify the type of products/service an industry is involved in, and used for statutory reporting purposes.
         *
         * For example, in the USA these codes are located by the federal government, and then published in a book entitled "The Standard Industrial Classification Manual". The codes are arranged in a hierarchical structure.
         *
         */
        class StandardIndustryCode extends Common.Document
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.StandardIndustryCode;
                if (null == bucket)
                   cim_data.StandardIndustryCode = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.StandardIndustryCode[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Common.Document.prototype.parse.call (this, context, sub);
                obj.cls = "StandardIndustryCode";
                base.parse_element (/<cim:StandardIndustryCode.code>([\s\S]*?)<\/cim:StandardIndustryCode.code>/g, obj, "code", base.to_string, sub, context);
                base.parse_attributes (/<cim:StandardIndustryCode.CustomerAgreements\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "CustomerAgreements", sub, context);
                var bucket = context.parsed.StandardIndustryCode;
                if (null == bucket)
                   context.parsed.StandardIndustryCode = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Common.Document.prototype.export.call (this, obj, false);

                base.export_element (obj, "StandardIndustryCode", "code", "code",  base.from_string, fields);
                base.export_attributes (obj, "StandardIndustryCode", "CustomerAgreements", "CustomerAgreements", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#StandardIndustryCode_collapse" aria-expanded="true" aria-controls="StandardIndustryCode_collapse" style="margin-left: 10px;">StandardIndustryCode</a></legend>
                    <div id="StandardIndustryCode_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.template.call (this) +
                    `
                    {{#code}}<div><b>code</b>: {{code}}</div>{{/code}}
                    {{#CustomerAgreements}}<div><b>CustomerAgreements</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/CustomerAgreements}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.CustomerAgreements) obj.CustomerAgreements_string = obj.CustomerAgreements.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.CustomerAgreements_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#StandardIndustryCode_collapse" aria-expanded="true" aria-controls="StandardIndustryCode_collapse" style="margin-left: 10px;">StandardIndustryCode</a></legend>
                    <div id="StandardIndustryCode_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='code'>code: </label><div class='col-sm-8'><input id='code' class='form-control' type='text'{{#code}} value='{{code}}'{{/code}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "StandardIndustryCode" };
                super.submit (obj);
                temp = document.getElementById ("code").value; if ("" != temp) obj.code = temp;

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["CustomerAgreements", "CustomerAgreement", "0..*", "0..1"]
                    ]
                );
            }
        }

        /**
         * A service guarantee, often imposed by a regulator, defines conditions that, if not satisfied, will result in the utility making a monetary payment to the customer.
         *
         * Note that guarantee's identifier is in the 'name' attribute and the status of the guarantee is in the 'Status.status' attribute.
         *
         */
        class ServiceGuarantee extends Common.Document
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ServiceGuarantee;
                if (null == bucket)
                   cim_data.ServiceGuarantee = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ServiceGuarantee[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Common.Document.prototype.parse.call (this, context, sub);
                obj.cls = "ServiceGuarantee";
                base.parse_element (/<cim:ServiceGuarantee.applicationPeriod>([\s\S]*?)<\/cim:ServiceGuarantee.applicationPeriod>/g, obj, "applicationPeriod", base.to_string, sub, context);
                base.parse_element (/<cim:ServiceGuarantee.automaticPay>([\s\S]*?)<\/cim:ServiceGuarantee.automaticPay>/g, obj, "automaticPay", base.to_boolean, sub, context);
                base.parse_element (/<cim:ServiceGuarantee.payAmount>([\s\S]*?)<\/cim:ServiceGuarantee.payAmount>/g, obj, "payAmount", base.to_string, sub, context);
                base.parse_element (/<cim:ServiceGuarantee.serviceRequirement>([\s\S]*?)<\/cim:ServiceGuarantee.serviceRequirement>/g, obj, "serviceRequirement", base.to_string, sub, context);
                var bucket = context.parsed.ServiceGuarantee;
                if (null == bucket)
                   context.parsed.ServiceGuarantee = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Common.Document.prototype.export.call (this, obj, false);

                base.export_element (obj, "ServiceGuarantee", "applicationPeriod", "applicationPeriod",  base.from_string, fields);
                base.export_element (obj, "ServiceGuarantee", "automaticPay", "automaticPay",  base.from_boolean, fields);
                base.export_element (obj, "ServiceGuarantee", "payAmount", "payAmount",  base.from_string, fields);
                base.export_element (obj, "ServiceGuarantee", "serviceRequirement", "serviceRequirement",  base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ServiceGuarantee_collapse" aria-expanded="true" aria-controls="ServiceGuarantee_collapse" style="margin-left: 10px;">ServiceGuarantee</a></legend>
                    <div id="ServiceGuarantee_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.template.call (this) +
                    `
                    {{#applicationPeriod}}<div><b>applicationPeriod</b>: {{applicationPeriod}}</div>{{/applicationPeriod}}
                    {{#automaticPay}}<div><b>automaticPay</b>: {{automaticPay}}</div>{{/automaticPay}}
                    {{#payAmount}}<div><b>payAmount</b>: {{payAmount}}</div>{{/payAmount}}
                    {{#serviceRequirement}}<div><b>serviceRequirement</b>: {{serviceRequirement}}</div>{{/serviceRequirement}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ServiceGuarantee_collapse" aria-expanded="true" aria-controls="ServiceGuarantee_collapse" style="margin-left: 10px;">ServiceGuarantee</a></legend>
                    <div id="ServiceGuarantee_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='applicationPeriod'>applicationPeriod: </label><div class='col-sm-8'><input id='applicationPeriod' class='form-control' type='text'{{#applicationPeriod}} value='{{applicationPeriod}}'{{/applicationPeriod}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='automaticPay'>automaticPay: </label><div class='col-sm-8'><input id='automaticPay' class='form-check-input' type='checkbox'{{#automaticPay}} checked{{/automaticPay}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='payAmount'>payAmount: </label><div class='col-sm-8'><input id='payAmount' class='form-control' type='text'{{#payAmount}} value='{{payAmount}}'{{/payAmount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='serviceRequirement'>serviceRequirement: </label><div class='col-sm-8'><input id='serviceRequirement' class='form-control' type='text'{{#serviceRequirement}} value='{{serviceRequirement}}'{{/serviceRequirement}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "ServiceGuarantee" };
                super.submit (obj);
                temp = document.getElementById ("applicationPeriod").value; if ("" != temp) obj.applicationPeriod = temp;
                temp = document.getElementById ("automaticPay").checked; if (temp) obj.automaticPay = true;
                temp = document.getElementById ("payAmount").value; if ("" != temp) obj.payAmount = temp;
                temp = document.getElementById ("serviceRequirement").value; if ("" != temp) obj.serviceRequirement = temp;

                return (obj);
            }
        }

        /**
         * Compliance events are used for reporting regulatory or contract compliance issues and/or variances.
         *
         * These might be created as a consequence of local business processes and associated rules. It is anticipated that this class will be customised extensively to meet local implementation needs.
         *
         */
        class ComplianceEvent extends Common.ActivityRecord
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ComplianceEvent;
                if (null == bucket)
                   cim_data.ComplianceEvent = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ComplianceEvent[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Common.ActivityRecord.prototype.parse.call (this, context, sub);
                obj.cls = "ComplianceEvent";
                base.parse_element (/<cim:ComplianceEvent.deadline>([\s\S]*?)<\/cim:ComplianceEvent.deadline>/g, obj, "deadline", base.to_datetime, sub, context);
                var bucket = context.parsed.ComplianceEvent;
                if (null == bucket)
                   context.parsed.ComplianceEvent = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Common.ActivityRecord.prototype.export.call (this, obj, false);

                base.export_element (obj, "ComplianceEvent", "deadline", "deadline",  base.from_datetime, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ComplianceEvent_collapse" aria-expanded="true" aria-controls="ComplianceEvent_collapse" style="margin-left: 10px;">ComplianceEvent</a></legend>
                    <div id="ComplianceEvent_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.ActivityRecord.prototype.template.call (this) +
                    `
                    {{#deadline}}<div><b>deadline</b>: {{deadline}}</div>{{/deadline}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ComplianceEvent_collapse" aria-expanded="true" aria-controls="ComplianceEvent_collapse" style="margin-left: 10px;">ComplianceEvent</a></legend>
                    <div id="ComplianceEvent_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.ActivityRecord.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='deadline'>deadline: </label><div class='col-sm-8'><input id='deadline' class='form-control' type='text'{{#deadline}} value='{{deadline}}'{{/deadline}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "ComplianceEvent" };
                super.submit (obj);
                temp = document.getElementById ("deadline").value; if ("" != temp) obj.deadline = temp;

                return (obj);
            }
        }

        /**
         * Billing information for work performed for the customer.
         *
         * The history of Work Billing Info, Invoices, and Payments is to be maintained in associated ActivityRecords.
         *
         */
        class WorkBillingInfo extends Common.Document
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.WorkBillingInfo;
                if (null == bucket)
                   cim_data.WorkBillingInfo = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.WorkBillingInfo[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Common.Document.prototype.parse.call (this, context, sub);
                obj.cls = "WorkBillingInfo";
                base.parse_element (/<cim:WorkBillingInfo.costEstimate>([\s\S]*?)<\/cim:WorkBillingInfo.costEstimate>/g, obj, "costEstimate", base.to_string, sub, context);
                base.parse_element (/<cim:WorkBillingInfo.deposit>([\s\S]*?)<\/cim:WorkBillingInfo.deposit>/g, obj, "deposit", base.to_string, sub, context);
                base.parse_element (/<cim:WorkBillingInfo.discount>([\s\S]*?)<\/cim:WorkBillingInfo.discount>/g, obj, "discount", base.to_float, sub, context);
                base.parse_element (/<cim:WorkBillingInfo.dueDateTime>([\s\S]*?)<\/cim:WorkBillingInfo.dueDateTime>/g, obj, "dueDateTime", base.to_datetime, sub, context);
                base.parse_element (/<cim:WorkBillingInfo.issueDateTime>([\s\S]*?)<\/cim:WorkBillingInfo.issueDateTime>/g, obj, "issueDateTime", base.to_datetime, sub, context);
                base.parse_element (/<cim:WorkBillingInfo.receivedDateTime>([\s\S]*?)<\/cim:WorkBillingInfo.receivedDateTime>/g, obj, "receivedDateTime", base.to_datetime, sub, context);
                base.parse_element (/<cim:WorkBillingInfo.workPrice>([\s\S]*?)<\/cim:WorkBillingInfo.workPrice>/g, obj, "workPrice", base.to_string, sub, context);
                base.parse_attributes (/<cim:WorkBillingInfo.Works\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Works", sub, context);
                base.parse_attributes (/<cim:WorkBillingInfo.ErpLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpLineItems", sub, context);
                base.parse_attribute (/<cim:WorkBillingInfo.CustomerAccount\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "CustomerAccount", sub, context);
                var bucket = context.parsed.WorkBillingInfo;
                if (null == bucket)
                   context.parsed.WorkBillingInfo = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Common.Document.prototype.export.call (this, obj, false);

                base.export_element (obj, "WorkBillingInfo", "costEstimate", "costEstimate",  base.from_string, fields);
                base.export_element (obj, "WorkBillingInfo", "deposit", "deposit",  base.from_string, fields);
                base.export_element (obj, "WorkBillingInfo", "discount", "discount",  base.from_float, fields);
                base.export_element (obj, "WorkBillingInfo", "dueDateTime", "dueDateTime",  base.from_datetime, fields);
                base.export_element (obj, "WorkBillingInfo", "issueDateTime", "issueDateTime",  base.from_datetime, fields);
                base.export_element (obj, "WorkBillingInfo", "receivedDateTime", "receivedDateTime",  base.from_datetime, fields);
                base.export_element (obj, "WorkBillingInfo", "workPrice", "workPrice",  base.from_string, fields);
                base.export_attributes (obj, "WorkBillingInfo", "Works", "Works", fields);
                base.export_attributes (obj, "WorkBillingInfo", "ErpLineItems", "ErpLineItems", fields);
                base.export_attribute (obj, "WorkBillingInfo", "CustomerAccount", "CustomerAccount", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#WorkBillingInfo_collapse" aria-expanded="true" aria-controls="WorkBillingInfo_collapse" style="margin-left: 10px;">WorkBillingInfo</a></legend>
                    <div id="WorkBillingInfo_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.template.call (this) +
                    `
                    {{#costEstimate}}<div><b>costEstimate</b>: {{costEstimate}}</div>{{/costEstimate}}
                    {{#deposit}}<div><b>deposit</b>: {{deposit}}</div>{{/deposit}}
                    {{#discount}}<div><b>discount</b>: {{discount}}</div>{{/discount}}
                    {{#dueDateTime}}<div><b>dueDateTime</b>: {{dueDateTime}}</div>{{/dueDateTime}}
                    {{#issueDateTime}}<div><b>issueDateTime</b>: {{issueDateTime}}</div>{{/issueDateTime}}
                    {{#receivedDateTime}}<div><b>receivedDateTime</b>: {{receivedDateTime}}</div>{{/receivedDateTime}}
                    {{#workPrice}}<div><b>workPrice</b>: {{workPrice}}</div>{{/workPrice}}
                    {{#Works}}<div><b>Works</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Works}}
                    {{#ErpLineItems}}<div><b>ErpLineItems</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ErpLineItems}}
                    {{#CustomerAccount}}<div><b>CustomerAccount</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{CustomerAccount}}&quot;);})'>{{CustomerAccount}}</a></div>{{/CustomerAccount}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.Works) obj.Works_string = obj.Works.join ();
                if (obj.ErpLineItems) obj.ErpLineItems_string = obj.ErpLineItems.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.Works_string;
                delete obj.ErpLineItems_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#WorkBillingInfo_collapse" aria-expanded="true" aria-controls="WorkBillingInfo_collapse" style="margin-left: 10px;">WorkBillingInfo</a></legend>
                    <div id="WorkBillingInfo_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='costEstimate'>costEstimate: </label><div class='col-sm-8'><input id='costEstimate' class='form-control' type='text'{{#costEstimate}} value='{{costEstimate}}'{{/costEstimate}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='deposit'>deposit: </label><div class='col-sm-8'><input id='deposit' class='form-control' type='text'{{#deposit}} value='{{deposit}}'{{/deposit}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='discount'>discount: </label><div class='col-sm-8'><input id='discount' class='form-control' type='text'{{#discount}} value='{{discount}}'{{/discount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='dueDateTime'>dueDateTime: </label><div class='col-sm-8'><input id='dueDateTime' class='form-control' type='text'{{#dueDateTime}} value='{{dueDateTime}}'{{/dueDateTime}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='issueDateTime'>issueDateTime: </label><div class='col-sm-8'><input id='issueDateTime' class='form-control' type='text'{{#issueDateTime}} value='{{issueDateTime}}'{{/issueDateTime}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='receivedDateTime'>receivedDateTime: </label><div class='col-sm-8'><input id='receivedDateTime' class='form-control' type='text'{{#receivedDateTime}} value='{{receivedDateTime}}'{{/receivedDateTime}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='workPrice'>workPrice: </label><div class='col-sm-8'><input id='workPrice' class='form-control' type='text'{{#workPrice}} value='{{workPrice}}'{{/workPrice}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpLineItems'>ErpLineItems: </label><div class='col-sm-8'><input id='ErpLineItems' class='form-control' type='text'{{#ErpLineItems}} value='{{ErpLineItems}}_string'{{/ErpLineItems}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='CustomerAccount'>CustomerAccount: </label><div class='col-sm-8'><input id='CustomerAccount' class='form-control' type='text'{{#CustomerAccount}} value='{{CustomerAccount}}'{{/CustomerAccount}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "WorkBillingInfo" };
                super.submit (obj);
                temp = document.getElementById ("costEstimate").value; if ("" != temp) obj.costEstimate = temp;
                temp = document.getElementById ("deposit").value; if ("" != temp) obj.deposit = temp;
                temp = document.getElementById ("discount").value; if ("" != temp) obj.discount = temp;
                temp = document.getElementById ("dueDateTime").value; if ("" != temp) obj.dueDateTime = temp;
                temp = document.getElementById ("issueDateTime").value; if ("" != temp) obj.issueDateTime = temp;
                temp = document.getElementById ("receivedDateTime").value; if ("" != temp) obj.receivedDateTime = temp;
                temp = document.getElementById ("workPrice").value; if ("" != temp) obj.workPrice = temp;
                temp = document.getElementById ("ErpLineItems").value; if ("" != temp) obj.ErpLineItems = temp.split (",");
                temp = document.getElementById ("CustomerAccount").value; if ("" != temp) obj.CustomerAccount = temp;

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["Works", "Work", "0..*", "0..1"],
                        ["ErpLineItems", "ErpInvoiceLineItem", "0..*", "0..*"],
                        ["CustomerAccount", "CustomerAccount", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A type of customer agreement involving an external agency.
         *
         * For example, a customer may form a contracts with an Energy Service Supplier if Direct Access is permitted.
         *
         */
        class ExternalCustomerAgreement extends Common.Agreement
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ExternalCustomerAgreement;
                if (null == bucket)
                   cim_data.ExternalCustomerAgreement = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ExternalCustomerAgreement[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Common.Agreement.prototype.parse.call (this, context, sub);
                obj.cls = "ExternalCustomerAgreement";
                var bucket = context.parsed.ExternalCustomerAgreement;
                if (null == bucket)
                   context.parsed.ExternalCustomerAgreement = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Common.Agreement.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ExternalCustomerAgreement_collapse" aria-expanded="true" aria-controls="ExternalCustomerAgreement_collapse" style="margin-left: 10px;">ExternalCustomerAgreement</a></legend>
                    <div id="ExternalCustomerAgreement_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Agreement.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ExternalCustomerAgreement_collapse" aria-expanded="true" aria-controls="ExternalCustomerAgreement_collapse" style="margin-left: 10px;">ExternalCustomerAgreement</a></legend>
                    <div id="ExternalCustomerAgreement_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Agreement.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var obj = obj || { cls: "ExternalCustomerAgreement" };
                super.submit (obj);

                return (obj);
            }
        }

        /**
         * Pricing can be based on power quality.
         *
         */
        class PowerQualityPricing extends Common.Document
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PowerQualityPricing;
                if (null == bucket)
                   cim_data.PowerQualityPricing = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PowerQualityPricing[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Common.Document.prototype.parse.call (this, context, sub);
                obj.cls = "PowerQualityPricing";
                base.parse_element (/<cim:PowerQualityPricing.emergencyHighVoltLimit>([\s\S]*?)<\/cim:PowerQualityPricing.emergencyHighVoltLimit>/g, obj, "emergencyHighVoltLimit", base.to_string, sub, context);
                base.parse_element (/<cim:PowerQualityPricing.emergencyLowVoltLimit>([\s\S]*?)<\/cim:PowerQualityPricing.emergencyLowVoltLimit>/g, obj, "emergencyLowVoltLimit", base.to_string, sub, context);
                base.parse_element (/<cim:PowerQualityPricing.normalHighVoltLimit>([\s\S]*?)<\/cim:PowerQualityPricing.normalHighVoltLimit>/g, obj, "normalHighVoltLimit", base.to_string, sub, context);
                base.parse_element (/<cim:PowerQualityPricing.normalLowVoltLimit>([\s\S]*?)<\/cim:PowerQualityPricing.normalLowVoltLimit>/g, obj, "normalLowVoltLimit", base.to_string, sub, context);
                base.parse_element (/<cim:PowerQualityPricing.powerFactorMin>([\s\S]*?)<\/cim:PowerQualityPricing.powerFactorMin>/g, obj, "powerFactorMin", base.to_float, sub, context);
                base.parse_element (/<cim:PowerQualityPricing.valueUninterruptedServiceEnergy>([\s\S]*?)<\/cim:PowerQualityPricing.valueUninterruptedServiceEnergy>/g, obj, "valueUninterruptedServiceEnergy", base.to_string, sub, context);
                base.parse_element (/<cim:PowerQualityPricing.valueUninterruptedServiceP>([\s\S]*?)<\/cim:PowerQualityPricing.valueUninterruptedServiceP>/g, obj, "valueUninterruptedServiceP", base.to_float, sub, context);
                base.parse_element (/<cim:PowerQualityPricing.voltImbalanceViolCost>([\s\S]*?)<\/cim:PowerQualityPricing.voltImbalanceViolCost>/g, obj, "voltImbalanceViolCost", base.to_float, sub, context);
                base.parse_element (/<cim:PowerQualityPricing.voltLimitViolCost>([\s\S]*?)<\/cim:PowerQualityPricing.voltLimitViolCost>/g, obj, "voltLimitViolCost", base.to_float, sub, context);
                var bucket = context.parsed.PowerQualityPricing;
                if (null == bucket)
                   context.parsed.PowerQualityPricing = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Common.Document.prototype.export.call (this, obj, false);

                base.export_element (obj, "PowerQualityPricing", "emergencyHighVoltLimit", "emergencyHighVoltLimit",  base.from_string, fields);
                base.export_element (obj, "PowerQualityPricing", "emergencyLowVoltLimit", "emergencyLowVoltLimit",  base.from_string, fields);
                base.export_element (obj, "PowerQualityPricing", "normalHighVoltLimit", "normalHighVoltLimit",  base.from_string, fields);
                base.export_element (obj, "PowerQualityPricing", "normalLowVoltLimit", "normalLowVoltLimit",  base.from_string, fields);
                base.export_element (obj, "PowerQualityPricing", "powerFactorMin", "powerFactorMin",  base.from_float, fields);
                base.export_element (obj, "PowerQualityPricing", "valueUninterruptedServiceEnergy", "valueUninterruptedServiceEnergy",  base.from_string, fields);
                base.export_element (obj, "PowerQualityPricing", "valueUninterruptedServiceP", "valueUninterruptedServiceP",  base.from_float, fields);
                base.export_element (obj, "PowerQualityPricing", "voltImbalanceViolCost", "voltImbalanceViolCost",  base.from_float, fields);
                base.export_element (obj, "PowerQualityPricing", "voltLimitViolCost", "voltLimitViolCost",  base.from_float, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PowerQualityPricing_collapse" aria-expanded="true" aria-controls="PowerQualityPricing_collapse" style="margin-left: 10px;">PowerQualityPricing</a></legend>
                    <div id="PowerQualityPricing_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.template.call (this) +
                    `
                    {{#emergencyHighVoltLimit}}<div><b>emergencyHighVoltLimit</b>: {{emergencyHighVoltLimit}}</div>{{/emergencyHighVoltLimit}}
                    {{#emergencyLowVoltLimit}}<div><b>emergencyLowVoltLimit</b>: {{emergencyLowVoltLimit}}</div>{{/emergencyLowVoltLimit}}
                    {{#normalHighVoltLimit}}<div><b>normalHighVoltLimit</b>: {{normalHighVoltLimit}}</div>{{/normalHighVoltLimit}}
                    {{#normalLowVoltLimit}}<div><b>normalLowVoltLimit</b>: {{normalLowVoltLimit}}</div>{{/normalLowVoltLimit}}
                    {{#powerFactorMin}}<div><b>powerFactorMin</b>: {{powerFactorMin}}</div>{{/powerFactorMin}}
                    {{#valueUninterruptedServiceEnergy}}<div><b>valueUninterruptedServiceEnergy</b>: {{valueUninterruptedServiceEnergy}}</div>{{/valueUninterruptedServiceEnergy}}
                    {{#valueUninterruptedServiceP}}<div><b>valueUninterruptedServiceP</b>: {{valueUninterruptedServiceP}}</div>{{/valueUninterruptedServiceP}}
                    {{#voltImbalanceViolCost}}<div><b>voltImbalanceViolCost</b>: {{voltImbalanceViolCost}}</div>{{/voltImbalanceViolCost}}
                    {{#voltLimitViolCost}}<div><b>voltLimitViolCost</b>: {{voltLimitViolCost}}</div>{{/voltLimitViolCost}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PowerQualityPricing_collapse" aria-expanded="true" aria-controls="PowerQualityPricing_collapse" style="margin-left: 10px;">PowerQualityPricing</a></legend>
                    <div id="PowerQualityPricing_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='emergencyHighVoltLimit'>emergencyHighVoltLimit: </label><div class='col-sm-8'><input id='emergencyHighVoltLimit' class='form-control' type='text'{{#emergencyHighVoltLimit}} value='{{emergencyHighVoltLimit}}'{{/emergencyHighVoltLimit}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='emergencyLowVoltLimit'>emergencyLowVoltLimit: </label><div class='col-sm-8'><input id='emergencyLowVoltLimit' class='form-control' type='text'{{#emergencyLowVoltLimit}} value='{{emergencyLowVoltLimit}}'{{/emergencyLowVoltLimit}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='normalHighVoltLimit'>normalHighVoltLimit: </label><div class='col-sm-8'><input id='normalHighVoltLimit' class='form-control' type='text'{{#normalHighVoltLimit}} value='{{normalHighVoltLimit}}'{{/normalHighVoltLimit}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='normalLowVoltLimit'>normalLowVoltLimit: </label><div class='col-sm-8'><input id='normalLowVoltLimit' class='form-control' type='text'{{#normalLowVoltLimit}} value='{{normalLowVoltLimit}}'{{/normalLowVoltLimit}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='powerFactorMin'>powerFactorMin: </label><div class='col-sm-8'><input id='powerFactorMin' class='form-control' type='text'{{#powerFactorMin}} value='{{powerFactorMin}}'{{/powerFactorMin}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='valueUninterruptedServiceEnergy'>valueUninterruptedServiceEnergy: </label><div class='col-sm-8'><input id='valueUninterruptedServiceEnergy' class='form-control' type='text'{{#valueUninterruptedServiceEnergy}} value='{{valueUninterruptedServiceEnergy}}'{{/valueUninterruptedServiceEnergy}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='valueUninterruptedServiceP'>valueUninterruptedServiceP: </label><div class='col-sm-8'><input id='valueUninterruptedServiceP' class='form-control' type='text'{{#valueUninterruptedServiceP}} value='{{valueUninterruptedServiceP}}'{{/valueUninterruptedServiceP}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='voltImbalanceViolCost'>voltImbalanceViolCost: </label><div class='col-sm-8'><input id='voltImbalanceViolCost' class='form-control' type='text'{{#voltImbalanceViolCost}} value='{{voltImbalanceViolCost}}'{{/voltImbalanceViolCost}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='voltLimitViolCost'>voltLimitViolCost: </label><div class='col-sm-8'><input id='voltLimitViolCost' class='form-control' type='text'{{#voltLimitViolCost}} value='{{voltLimitViolCost}}'{{/voltLimitViolCost}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "PowerQualityPricing" };
                super.submit (obj);
                temp = document.getElementById ("emergencyHighVoltLimit").value; if ("" != temp) obj.emergencyHighVoltLimit = temp;
                temp = document.getElementById ("emergencyLowVoltLimit").value; if ("" != temp) obj.emergencyLowVoltLimit = temp;
                temp = document.getElementById ("normalHighVoltLimit").value; if ("" != temp) obj.normalHighVoltLimit = temp;
                temp = document.getElementById ("normalLowVoltLimit").value; if ("" != temp) obj.normalLowVoltLimit = temp;
                temp = document.getElementById ("powerFactorMin").value; if ("" != temp) obj.powerFactorMin = temp;
                temp = document.getElementById ("valueUninterruptedServiceEnergy").value; if ("" != temp) obj.valueUninterruptedServiceEnergy = temp;
                temp = document.getElementById ("valueUninterruptedServiceP").value; if ("" != temp) obj.valueUninterruptedServiceP = temp;
                temp = document.getElementById ("voltImbalanceViolCost").value; if ("" != temp) obj.voltImbalanceViolCost = temp;
                temp = document.getElementById ("voltLimitViolCost").value; if ("" != temp) obj.voltLimitViolCost = temp;

                return (obj);
            }
        }

        /**
         * Price curve for specifying the cost of energy (X) at points in time (y1) according to a prcing structure, which is based on a tariff.
         *
         */
        class SubscribePowerCurve extends Core.Curve
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.SubscribePowerCurve;
                if (null == bucket)
                   cim_data.SubscribePowerCurve = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.SubscribePowerCurve[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.Curve.prototype.parse.call (this, context, sub);
                obj.cls = "SubscribePowerCurve";
                var bucket = context.parsed.SubscribePowerCurve;
                if (null == bucket)
                   context.parsed.SubscribePowerCurve = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.Curve.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#SubscribePowerCurve_collapse" aria-expanded="true" aria-controls="SubscribePowerCurve_collapse" style="margin-left: 10px;">SubscribePowerCurve</a></legend>
                    <div id="SubscribePowerCurve_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.Curve.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#SubscribePowerCurve_collapse" aria-expanded="true" aria-controls="SubscribePowerCurve_collapse" style="margin-left: 10px;">SubscribePowerCurve</a></legend>
                    <div id="SubscribePowerCurve_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.Curve.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var obj = obj || { cls: "SubscribePowerCurve" };
                super.submit (obj);

                return (obj);
            }
        }

        /**
         * The creation of the monthly customer billing statements is the method employed to notify Customers of charges, adjustments and credits applied to their account for Services and Products.
         *
         * The actuall billing occurs through an ErpInvoice. The CustomerBillingInfo includes information from the payment, collection, meter reading, installed meter, service, site, customer, customer account, customer agreement, services and pricing subject areas. Each component price shows up as a separate line item on the ErpInvoice.
         *
         */
        class CustomerBillingInfo extends Common.Document
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.CustomerBillingInfo;
                if (null == bucket)
                   cim_data.CustomerBillingInfo = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.CustomerBillingInfo[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Common.Document.prototype.parse.call (this, context, sub);
                obj.cls = "CustomerBillingInfo";
                base.parse_element (/<cim:CustomerBillingInfo.billingDate>([\s\S]*?)<\/cim:CustomerBillingInfo.billingDate>/g, obj, "billingDate", base.to_string, sub, context);
                base.parse_element (/<cim:CustomerBillingInfo.dueDate>([\s\S]*?)<\/cim:CustomerBillingInfo.dueDate>/g, obj, "dueDate", base.to_string, sub, context);
                base.parse_attribute (/<cim:CustomerBillingInfo.kind\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "kind", sub, context);
                base.parse_element (/<cim:CustomerBillingInfo.lastPaymentAmt>([\s\S]*?)<\/cim:CustomerBillingInfo.lastPaymentAmt>/g, obj, "lastPaymentAmt", base.to_string, sub, context);
                base.parse_element (/<cim:CustomerBillingInfo.lastPaymentDate>([\s\S]*?)<\/cim:CustomerBillingInfo.lastPaymentDate>/g, obj, "lastPaymentDate", base.to_string, sub, context);
                base.parse_element (/<cim:CustomerBillingInfo.outBalance>([\s\S]*?)<\/cim:CustomerBillingInfo.outBalance>/g, obj, "outBalance", base.to_string, sub, context);
                base.parse_element (/<cim:CustomerBillingInfo.pymtPlanAmt>([\s\S]*?)<\/cim:CustomerBillingInfo.pymtPlanAmt>/g, obj, "pymtPlanAmt", base.to_string, sub, context);
                base.parse_element (/<cim:CustomerBillingInfo.pymtPlanType>([\s\S]*?)<\/cim:CustomerBillingInfo.pymtPlanType>/g, obj, "pymtPlanType", base.to_string, sub, context);
                base.parse_attributes (/<cim:CustomerBillingInfo.ErpInvoiceLineItems\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ErpInvoiceLineItems", sub, context);
                base.parse_attribute (/<cim:CustomerBillingInfo.CustomerAccount\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "CustomerAccount", sub, context);
                var bucket = context.parsed.CustomerBillingInfo;
                if (null == bucket)
                   context.parsed.CustomerBillingInfo = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Common.Document.prototype.export.call (this, obj, false);

                base.export_element (obj, "CustomerBillingInfo", "billingDate", "billingDate",  base.from_string, fields);
                base.export_element (obj, "CustomerBillingInfo", "dueDate", "dueDate",  base.from_string, fields);
                base.export_element (obj, "CustomerBillingInfo", "kind", "kind",  base.from_string, fields);
                base.export_element (obj, "CustomerBillingInfo", "lastPaymentAmt", "lastPaymentAmt",  base.from_string, fields);
                base.export_element (obj, "CustomerBillingInfo", "lastPaymentDate", "lastPaymentDate",  base.from_string, fields);
                base.export_element (obj, "CustomerBillingInfo", "outBalance", "outBalance",  base.from_string, fields);
                base.export_element (obj, "CustomerBillingInfo", "pymtPlanAmt", "pymtPlanAmt",  base.from_string, fields);
                base.export_element (obj, "CustomerBillingInfo", "pymtPlanType", "pymtPlanType",  base.from_string, fields);
                base.export_attributes (obj, "CustomerBillingInfo", "ErpInvoiceLineItems", "ErpInvoiceLineItems", fields);
                base.export_attribute (obj, "CustomerBillingInfo", "CustomerAccount", "CustomerAccount", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#CustomerBillingInfo_collapse" aria-expanded="true" aria-controls="CustomerBillingInfo_collapse" style="margin-left: 10px;">CustomerBillingInfo</a></legend>
                    <div id="CustomerBillingInfo_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.template.call (this) +
                    `
                    {{#billingDate}}<div><b>billingDate</b>: {{billingDate}}</div>{{/billingDate}}
                    {{#dueDate}}<div><b>dueDate</b>: {{dueDate}}</div>{{/dueDate}}
                    {{#kind}}<div><b>kind</b>: {{kind}}</div>{{/kind}}
                    {{#lastPaymentAmt}}<div><b>lastPaymentAmt</b>: {{lastPaymentAmt}}</div>{{/lastPaymentAmt}}
                    {{#lastPaymentDate}}<div><b>lastPaymentDate</b>: {{lastPaymentDate}}</div>{{/lastPaymentDate}}
                    {{#outBalance}}<div><b>outBalance</b>: {{outBalance}}</div>{{/outBalance}}
                    {{#pymtPlanAmt}}<div><b>pymtPlanAmt</b>: {{pymtPlanAmt}}</div>{{/pymtPlanAmt}}
                    {{#pymtPlanType}}<div><b>pymtPlanType</b>: {{pymtPlanType}}</div>{{/pymtPlanType}}
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
                obj.CustomerBillingKind = []; if (!obj.kind) obj.CustomerBillingKind.push ({ id: '', selected: true}); for (var property in CustomerBillingKind) obj.CustomerBillingKind.push ({ id: property, selected: obj.kind && obj.kind.endsWith ('.' + property)});
                if (obj.ErpInvoiceLineItems) obj.ErpInvoiceLineItems_string = obj.ErpInvoiceLineItems.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.CustomerBillingKind;
                delete obj.ErpInvoiceLineItems_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#CustomerBillingInfo_collapse" aria-expanded="true" aria-controls="CustomerBillingInfo_collapse" style="margin-left: 10px;">CustomerBillingInfo</a></legend>
                    <div id="CustomerBillingInfo_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='billingDate'>billingDate: </label><div class='col-sm-8'><input id='billingDate' class='form-control' type='text'{{#billingDate}} value='{{billingDate}}'{{/billingDate}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='dueDate'>dueDate: </label><div class='col-sm-8'><input id='dueDate' class='form-control' type='text'{{#dueDate}} value='{{dueDate}}'{{/dueDate}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='kind'>kind: </label><div class='col-sm-8'><select id='kind' class='form-control'>{{#CustomerBillingKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/CustomerBillingKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='lastPaymentAmt'>lastPaymentAmt: </label><div class='col-sm-8'><input id='lastPaymentAmt' class='form-control' type='text'{{#lastPaymentAmt}} value='{{lastPaymentAmt}}'{{/lastPaymentAmt}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='lastPaymentDate'>lastPaymentDate: </label><div class='col-sm-8'><input id='lastPaymentDate' class='form-control' type='text'{{#lastPaymentDate}} value='{{lastPaymentDate}}'{{/lastPaymentDate}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='outBalance'>outBalance: </label><div class='col-sm-8'><input id='outBalance' class='form-control' type='text'{{#outBalance}} value='{{outBalance}}'{{/outBalance}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='pymtPlanAmt'>pymtPlanAmt: </label><div class='col-sm-8'><input id='pymtPlanAmt' class='form-control' type='text'{{#pymtPlanAmt}} value='{{pymtPlanAmt}}'{{/pymtPlanAmt}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='pymtPlanType'>pymtPlanType: </label><div class='col-sm-8'><input id='pymtPlanType' class='form-control' type='text'{{#pymtPlanType}} value='{{pymtPlanType}}'{{/pymtPlanType}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ErpInvoiceLineItems'>ErpInvoiceLineItems: </label><div class='col-sm-8'><input id='ErpInvoiceLineItems' class='form-control' type='text'{{#ErpInvoiceLineItems}} value='{{ErpInvoiceLineItems}}_string'{{/ErpInvoiceLineItems}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='CustomerAccount'>CustomerAccount: </label><div class='col-sm-8'><input id='CustomerAccount' class='form-control' type='text'{{#CustomerAccount}} value='{{CustomerAccount}}'{{/CustomerAccount}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "CustomerBillingInfo" };
                super.submit (obj);
                temp = document.getElementById ("billingDate").value; if ("" != temp) obj.billingDate = temp;
                temp = document.getElementById ("dueDate").value; if ("" != temp) obj.dueDate = temp;
                temp = document.getElementById ("kind").value; if ("" != temp) { temp = CustomerBillingKind[temp]; if ("undefined" != typeof (temp)) obj.kind = "#http://iec.ch/TC57/2013/CIM-schema-cim16#CustomerBillingKind." + temp; }
                temp = document.getElementById ("lastPaymentAmt").value; if ("" != temp) obj.lastPaymentAmt = temp;
                temp = document.getElementById ("lastPaymentDate").value; if ("" != temp) obj.lastPaymentDate = temp;
                temp = document.getElementById ("outBalance").value; if ("" != temp) obj.outBalance = temp;
                temp = document.getElementById ("pymtPlanAmt").value; if ("" != temp) obj.pymtPlanAmt = temp;
                temp = document.getElementById ("pymtPlanType").value; if ("" != temp) obj.pymtPlanType = temp;
                temp = document.getElementById ("ErpInvoiceLineItems").value; if ("" != temp) obj.ErpInvoiceLineItems = temp.split (",");
                temp = document.getElementById ("CustomerAccount").value; if ("" != temp) obj.CustomerAccount = temp;

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["ErpInvoiceLineItems", "ErpInvoiceLineItem", "0..*", "0..*"],
                        ["CustomerAccount", "CustomerAccount", "0..1", "0..*"]
                    ]
                );
            }
        }

        return (
            {
                ExternalCustomerAgreement: ExternalCustomerAgreement,
                SubscribePowerCurve: SubscribePowerCurve,
                ComplianceEvent: ComplianceEvent,
                StandardIndustryCode: StandardIndustryCode,
                PowerQualityPricing: PowerQualityPricing,
                WorkBillingInfo: WorkBillingInfo,
                CustomerBillingInfo: CustomerBillingInfo,
                ServiceGuarantee: ServiceGuarantee
            }
        );
    }
);