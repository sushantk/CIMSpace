define
(
    ["model/base", "model/Common", "model/Core"],
    /**
     * This package contains all core CIM Market Extensions required for market management systems.
     *
     */
    function (base, Common, Core)
    {

        /**
         * An identification of a set of values beeing adressed within a specific interval of time.
         *
         */
        class Point extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.Point;
                if (null == bucket)
                   cim_data.Point = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.Point[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "Point";
                base.parse_element (/<cim:Point.position>([\s\S]*?)<\/cim:Point.position>/g, obj, "position", base.to_string, sub, context);
                base.parse_element (/<cim:Point.quality>([\s\S]*?)<\/cim:Point.quality>/g, obj, "quality", base.to_string, sub, context);
                base.parse_element (/<cim:Point.quantity>([\s\S]*?)<\/cim:Point.quantity>/g, obj, "quantity", base.to_string, sub, context);
                base.parse_element (/<cim:Point.secondaryQuantity>([\s\S]*?)<\/cim:Point.secondaryQuantity>/g, obj, "secondaryQuantity", base.to_string, sub, context);
                base.parse_attributes (/<cim:Point.AceTariffType\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "AceTariffType", sub, context);
                base.parse_attributes (/<cim:Point.Reason\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Reason", sub, context);
                base.parse_attribute (/<cim:Point.Period\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Period", sub, context);
                base.parse_attributes (/<cim:Point.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                base.parse_attributes (/<cim:Point.Price\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Price", sub, context);
                var bucket = context.parsed.Point;
                if (null == bucket)
                   context.parsed.Point = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "Point", "position", "position",  base.from_string, fields);
                base.export_element (obj, "Point", "quality", "quality",  base.from_string, fields);
                base.export_element (obj, "Point", "quantity", "quantity",  base.from_string, fields);
                base.export_element (obj, "Point", "secondaryQuantity", "secondaryQuantity",  base.from_string, fields);
                base.export_attributes (obj, "Point", "AceTariffType", "AceTariffType", fields);
                base.export_attributes (obj, "Point", "Reason", "Reason", fields);
                base.export_attribute (obj, "Point", "Period", "Period", fields);
                base.export_attributes (obj, "Point", "TimeSeries", "TimeSeries", fields);
                base.export_attributes (obj, "Point", "Price", "Price", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Point_collapse" aria-expanded="true" aria-controls="Point_collapse" style="margin-left: 10px;">Point</a></legend>
                    <div id="Point_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#position}}<div><b>position</b>: {{position}}</div>{{/position}}
                    {{#quality}}<div><b>quality</b>: {{quality}}</div>{{/quality}}
                    {{#quantity}}<div><b>quantity</b>: {{quantity}}</div>{{/quantity}}
                    {{#secondaryQuantity}}<div><b>secondaryQuantity</b>: {{secondaryQuantity}}</div>{{/secondaryQuantity}}
                    {{#AceTariffType}}<div><b>AceTariffType</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/AceTariffType}}
                    {{#Reason}}<div><b>Reason</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Reason}}
                    {{#Period}}<div><b>Period</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Period}}&quot;);})'>{{Period}}</a></div>{{/Period}}
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    {{#Price}}<div><b>Price</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Price}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.AceTariffType) obj.AceTariffType_string = obj.AceTariffType.join ();
                if (obj.Reason) obj.Reason_string = obj.Reason.join ();
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
                if (obj.Price) obj.Price_string = obj.Price.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.AceTariffType_string;
                delete obj.Reason_string;
                delete obj.TimeSeries_string;
                delete obj.Price_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Point_collapse" aria-expanded="true" aria-controls="Point_collapse" style="margin-left: 10px;">Point</a></legend>
                    <div id="Point_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='position'>position: </label><div class='col-sm-8'><input id='position' class='form-control' type='text'{{#position}} value='{{position}}'{{/position}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='quality'>quality: </label><div class='col-sm-8'><input id='quality' class='form-control' type='text'{{#quality}} value='{{quality}}'{{/quality}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='quantity'>quantity: </label><div class='col-sm-8'><input id='quantity' class='form-control' type='text'{{#quantity}} value='{{quantity}}'{{/quantity}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='secondaryQuantity'>secondaryQuantity: </label><div class='col-sm-8'><input id='secondaryQuantity' class='form-control' type='text'{{#secondaryQuantity}} value='{{secondaryQuantity}}'{{/secondaryQuantity}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='AceTariffType'>AceTariffType: </label><div class='col-sm-8'><input id='AceTariffType' class='form-control' type='text'{{#AceTariffType}} value='{{AceTariffType}}_string'{{/AceTariffType}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Reason'>Reason: </label><div class='col-sm-8'><input id='Reason' class='form-control' type='text'{{#Reason}} value='{{Reason}}_string'{{/Reason}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Period'>Period: </label><div class='col-sm-8'><input id='Period' class='form-control' type='text'{{#Period}} value='{{Period}}'{{/Period}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "Point" };
                super.submit (obj);
                temp = document.getElementById ("position").value; if ("" != temp) obj.position = temp;
                temp = document.getElementById ("quality").value; if ("" != temp) obj.quality = temp;
                temp = document.getElementById ("quantity").value; if ("" != temp) obj.quantity = temp;
                temp = document.getElementById ("secondaryQuantity").value; if ("" != temp) obj.secondaryQuantity = temp;
                temp = document.getElementById ("AceTariffType").value; if ("" != temp) obj.AceTariffType = temp.split (",");
                temp = document.getElementById ("Reason").value; if ("" != temp) obj.Reason = temp.split (",");
                temp = document.getElementById ("Period").value; if ("" != temp) obj.Period = temp;
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["AceTariffType", "AceTariffType", "0..*", "0..*"],
                        ["Reason", "Reason", "0..*", "0..*"],
                        ["Period", "Period", "1", "0..*"],
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"],
                        ["Price", "Price", "0..*", "0..1"]
                    ]
                );
            }
        }

        /**
         * The motivation of an act.
         *
         */
        class Reason extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.Reason;
                if (null == bucket)
                   cim_data.Reason = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.Reason[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "Reason";
                base.parse_element (/<cim:Reason.code>([\s\S]*?)<\/cim:Reason.code>/g, obj, "code", base.to_string, sub, context);
                base.parse_element (/<cim:Reason.text>([\s\S]*?)<\/cim:Reason.text>/g, obj, "text", base.to_string, sub, context);
                base.parse_attributes (/<cim:Reason.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                base.parse_attributes (/<cim:Reason.Point\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Point", sub, context);
                base.parse_attributes (/<cim:Reason.Period\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Period", sub, context);
                base.parse_attributes (/<cim:Reason.MarketDocument\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketDocument", sub, context);
                var bucket = context.parsed.Reason;
                if (null == bucket)
                   context.parsed.Reason = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "Reason", "code", "code",  base.from_string, fields);
                base.export_element (obj, "Reason", "text", "text",  base.from_string, fields);
                base.export_attributes (obj, "Reason", "TimeSeries", "TimeSeries", fields);
                base.export_attributes (obj, "Reason", "Point", "Point", fields);
                base.export_attributes (obj, "Reason", "Period", "Period", fields);
                base.export_attributes (obj, "Reason", "MarketDocument", "MarketDocument", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Reason_collapse" aria-expanded="true" aria-controls="Reason_collapse" style="margin-left: 10px;">Reason</a></legend>
                    <div id="Reason_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#code}}<div><b>code</b>: {{code}}</div>{{/code}}
                    {{#text}}<div><b>text</b>: {{text}}</div>{{/text}}
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    {{#Point}}<div><b>Point</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Point}}
                    {{#Period}}<div><b>Period</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Period}}
                    {{#MarketDocument}}<div><b>MarketDocument</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketDocument}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
                if (obj.Point) obj.Point_string = obj.Point.join ();
                if (obj.Period) obj.Period_string = obj.Period.join ();
                if (obj.MarketDocument) obj.MarketDocument_string = obj.MarketDocument.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TimeSeries_string;
                delete obj.Point_string;
                delete obj.Period_string;
                delete obj.MarketDocument_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Reason_collapse" aria-expanded="true" aria-controls="Reason_collapse" style="margin-left: 10px;">Reason</a></legend>
                    <div id="Reason_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='code'>code: </label><div class='col-sm-8'><input id='code' class='form-control' type='text'{{#code}} value='{{code}}'{{/code}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='text'>text: </label><div class='col-sm-8'><input id='text' class='form-control' type='text'{{#text}} value='{{text}}'{{/text}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Point'>Point: </label><div class='col-sm-8'><input id='Point' class='form-control' type='text'{{#Point}} value='{{Point}}_string'{{/Point}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Period'>Period: </label><div class='col-sm-8'><input id='Period' class='form-control' type='text'{{#Period}} value='{{Period}}_string'{{/Period}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketDocument'>MarketDocument: </label><div class='col-sm-8'><input id='MarketDocument' class='form-control' type='text'{{#MarketDocument}} value='{{MarketDocument}}_string'{{/MarketDocument}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "Reason" };
                super.submit (obj);
                temp = document.getElementById ("code").value; if ("" != temp) obj.code = temp;
                temp = document.getElementById ("text").value; if ("" != temp) obj.text = temp;
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");
                temp = document.getElementById ("Point").value; if ("" != temp) obj.Point = temp.split (",");
                temp = document.getElementById ("Period").value; if ("" != temp) obj.Period = temp.split (",");
                temp = document.getElementById ("MarketDocument").value; if ("" != temp) obj.MarketDocument = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"],
                        ["Point", "Point", "0..*", "0..*"],
                        ["Period", "Period", "0..*", "0..*"],
                        ["MarketDocument", "MarketDocument", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * The identification of the unit name for the time series quantities.
         *
         */
        class Unit extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.Unit;
                if (null == bucket)
                   cim_data.Unit = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.Unit[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "Unit";
                base.parse_element (/<cim:Unit.name>([\s\S]*?)<\/cim:Unit.name>/g, obj, "name", base.to_string, sub, context);
                base.parse_attributes (/<cim:Unit.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                base.parse_attributes (/<cim:Unit.AceTariffType\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "AceTariffType", sub, context);
                var bucket = context.parsed.Unit;
                if (null == bucket)
                   context.parsed.Unit = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "Unit", "name", "name",  base.from_string, fields);
                base.export_attributes (obj, "Unit", "TimeSeries", "TimeSeries", fields);
                base.export_attributes (obj, "Unit", "AceTariffType", "AceTariffType", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Unit_collapse" aria-expanded="true" aria-controls="Unit_collapse" style="margin-left: 10px;">Unit</a></legend>
                    <div id="Unit_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#name}}<div><b>name</b>: {{name}}</div>{{/name}}
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    {{#AceTariffType}}<div><b>AceTariffType</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/AceTariffType}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
                if (obj.AceTariffType) obj.AceTariffType_string = obj.AceTariffType.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TimeSeries_string;
                delete obj.AceTariffType_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Unit_collapse" aria-expanded="true" aria-controls="Unit_collapse" style="margin-left: 10px;">Unit</a></legend>
                    <div id="Unit_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='name'>name: </label><div class='col-sm-8'><input id='name' class='form-control' type='text'{{#name}} value='{{name}}'{{/name}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='AceTariffType'>AceTariffType: </label><div class='col-sm-8'><input id='AceTariffType' class='form-control' type='text'{{#AceTariffType}} value='{{AceTariffType}}_string'{{/AceTariffType}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "Unit" };
                super.submit (obj);
                temp = document.getElementById ("name").value; if ("" != temp) obj.name = temp;
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");
                temp = document.getElementById ("AceTariffType").value; if ("" != temp) obj.AceTariffType = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"],
                        ["AceTariffType", "AceTariffType", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * The date and or the time.
         *
         */
        class DateAndOrTime extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.DateAndOrTime;
                if (null == bucket)
                   cim_data.DateAndOrTime = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.DateAndOrTime[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "DateAndOrTime";
                base.parse_element (/<cim:DateAndOrTime.date>([\s\S]*?)<\/cim:DateAndOrTime.date>/g, obj, "date", base.to_string, sub, context);
                base.parse_element (/<cim:DateAndOrTime.time>([\s\S]*?)<\/cim:DateAndOrTime.time>/g, obj, "time", base.to_string, sub, context);
                base.parse_attributes (/<cim:DateAndOrTime.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                var bucket = context.parsed.DateAndOrTime;
                if (null == bucket)
                   context.parsed.DateAndOrTime = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "DateAndOrTime", "date", "date",  base.from_string, fields);
                base.export_element (obj, "DateAndOrTime", "time", "time",  base.from_string, fields);
                base.export_attributes (obj, "DateAndOrTime", "TimeSeries", "TimeSeries", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#DateAndOrTime_collapse" aria-expanded="true" aria-controls="DateAndOrTime_collapse" style="margin-left: 10px;">DateAndOrTime</a></legend>
                    <div id="DateAndOrTime_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#date}}<div><b>date</b>: {{date}}</div>{{/date}}
                    {{#time}}<div><b>time</b>: {{time}}</div>{{/time}}
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TimeSeries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#DateAndOrTime_collapse" aria-expanded="true" aria-controls="DateAndOrTime_collapse" style="margin-left: 10px;">DateAndOrTime</a></legend>
                    <div id="DateAndOrTime_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='date'>date: </label><div class='col-sm-8'><input id='date' class='form-control' type='text'{{#date}} value='{{date}}'{{/date}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='time'>time: </label><div class='col-sm-8'><input id='time' class='form-control' type='text'{{#time}} value='{{time}}'{{/time}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "DateAndOrTime" };
                super.submit (obj);
                temp = document.getElementById ("date").value; if ("" != temp) obj.date = temp;
                temp = document.getElementById ("time").value; if ("" != temp) obj.time = temp;
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * The type of a power system resource.
         *
         */
        class MktPSRType extends Core.PSRType
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.MktPSRType;
                if (null == bucket)
                   cim_data.MktPSRType = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.MktPSRType[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.PSRType.prototype.parse.call (this, context, sub);
                obj.cls = "MktPSRType";
                base.parse_element (/<cim:MktPSRType.psrType>([\s\S]*?)<\/cim:MktPSRType.psrType>/g, obj, "psrType", base.to_string, sub, context);
                base.parse_attributes (/<cim:MktPSRType.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                var bucket = context.parsed.MktPSRType;
                if (null == bucket)
                   context.parsed.MktPSRType = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.PSRType.prototype.export.call (this, obj, false);

                base.export_element (obj, "MktPSRType", "psrType", "psrType",  base.from_string, fields);
                base.export_attributes (obj, "MktPSRType", "TimeSeries", "TimeSeries", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MktPSRType_collapse" aria-expanded="true" aria-controls="MktPSRType_collapse" style="margin-left: 10px;">MktPSRType</a></legend>
                    <div id="MktPSRType_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PSRType.prototype.template.call (this) +
                    `
                    {{#psrType}}<div><b>psrType</b>: {{psrType}}</div>{{/psrType}}
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TimeSeries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MktPSRType_collapse" aria-expanded="true" aria-controls="MktPSRType_collapse" style="margin-left: 10px;">MktPSRType</a></legend>
                    <div id="MktPSRType_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PSRType.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='psrType'>psrType: </label><div class='col-sm-8'><input id='psrType' class='form-control' type='text'{{#psrType}} value='{{psrType}}'{{/psrType}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "MktPSRType" };
                super.submit (obj);
                temp = document.getElementById ("psrType").value; if ("" != temp) obj.psrType = temp;
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * The Area Control Error tariff type that is applied or used.
         *
         */
        class AceTariffType extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.AceTariffType;
                if (null == bucket)
                   cim_data.AceTariffType = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.AceTariffType[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "AceTariffType";
                base.parse_element (/<cim:AceTariffType.type>([\s\S]*?)<\/cim:AceTariffType.type>/g, obj, "type", base.to_string, sub, context);
                base.parse_attributes (/<cim:AceTariffType.Point\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Point", sub, context);
                base.parse_attributes (/<cim:AceTariffType.Unit\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Unit", sub, context);
                base.parse_attributes (/<cim:AceTariffType.MarketDocument\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketDocument", sub, context);
                var bucket = context.parsed.AceTariffType;
                if (null == bucket)
                   context.parsed.AceTariffType = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "AceTariffType", "type", "type",  base.from_string, fields);
                base.export_attributes (obj, "AceTariffType", "Point", "Point", fields);
                base.export_attributes (obj, "AceTariffType", "Unit", "Unit", fields);
                base.export_attributes (obj, "AceTariffType", "MarketDocument", "MarketDocument", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#AceTariffType_collapse" aria-expanded="true" aria-controls="AceTariffType_collapse" style="margin-left: 10px;">AceTariffType</a></legend>
                    <div id="AceTariffType_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#type}}<div><b>type</b>: {{type}}</div>{{/type}}
                    {{#Point}}<div><b>Point</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Point}}
                    {{#Unit}}<div><b>Unit</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Unit}}
                    {{#MarketDocument}}<div><b>MarketDocument</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketDocument}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.Point) obj.Point_string = obj.Point.join ();
                if (obj.Unit) obj.Unit_string = obj.Unit.join ();
                if (obj.MarketDocument) obj.MarketDocument_string = obj.MarketDocument.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.Point_string;
                delete obj.Unit_string;
                delete obj.MarketDocument_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#AceTariffType_collapse" aria-expanded="true" aria-controls="AceTariffType_collapse" style="margin-left: 10px;">AceTariffType</a></legend>
                    <div id="AceTariffType_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='type'>type: </label><div class='col-sm-8'><input id='type' class='form-control' type='text'{{#type}} value='{{type}}'{{/type}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Point'>Point: </label><div class='col-sm-8'><input id='Point' class='form-control' type='text'{{#Point}} value='{{Point}}_string'{{/Point}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Unit'>Unit: </label><div class='col-sm-8'><input id='Unit' class='form-control' type='text'{{#Unit}} value='{{Unit}}_string'{{/Unit}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketDocument'>MarketDocument: </label><div class='col-sm-8'><input id='MarketDocument' class='form-control' type='text'{{#MarketDocument}} value='{{MarketDocument}}_string'{{/MarketDocument}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "AceTariffType" };
                super.submit (obj);
                temp = document.getElementById ("type").value; if ("" != temp) obj.type = temp;
                temp = document.getElementById ("Point").value; if ("" != temp) obj.Point = temp.split (",");
                temp = document.getElementById ("Unit").value; if ("" != temp) obj.Unit = temp.split (",");
                temp = document.getElementById ("MarketDocument").value; if ("" != temp) obj.MarketDocument = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["Point", "Point", "0..*", "0..*"],
                        ["Unit", "Unit", "0..*", "0..*"],
                        ["MarketDocument", "MarketDocument", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * Electronic document containing the information necessary to satisfy a given business process set of requirements.
         *
         */
        class MarketDocument extends Common.Document
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.MarketDocument;
                if (null == bucket)
                   cim_data.MarketDocument = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.MarketDocument[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Common.Document.prototype.parse.call (this, context, sub);
                obj.cls = "MarketDocument";
                base.parse_attributes (/<cim:MarketDocument.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                base.parse_attributes (/<cim:MarketDocument.Period\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Period", sub, context);
                base.parse_attributes (/<cim:MarketDocument.AttributeInstanceComponent\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "AttributeInstanceComponent", sub, context);
                base.parse_attributes (/<cim:MarketDocument.selfMarketDocument\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "selfMarketDocument", sub, context);
                base.parse_attributes (/<cim:MarketDocument.MarketDocument\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketDocument", sub, context);
                base.parse_attributes (/<cim:MarketDocument.Reason\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Reason", sub, context);
                base.parse_attributes (/<cim:MarketDocument.Process\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Process", sub, context);
                base.parse_attributes (/<cim:MarketDocument.AceTariffType\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "AceTariffType", sub, context);
                base.parse_attributes (/<cim:MarketDocument.Domain\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Domain", sub, context);
                base.parse_attributes (/<cim:MarketDocument.MarketParticipant\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketParticipant", sub, context);
                var bucket = context.parsed.MarketDocument;
                if (null == bucket)
                   context.parsed.MarketDocument = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Common.Document.prototype.export.call (this, obj, false);

                base.export_attributes (obj, "MarketDocument", "TimeSeries", "TimeSeries", fields);
                base.export_attributes (obj, "MarketDocument", "Period", "Period", fields);
                base.export_attributes (obj, "MarketDocument", "AttributeInstanceComponent", "AttributeInstanceComponent", fields);
                base.export_attributes (obj, "MarketDocument", "selfMarketDocument", "selfMarketDocument", fields);
                base.export_attributes (obj, "MarketDocument", "MarketDocument", "MarketDocument", fields);
                base.export_attributes (obj, "MarketDocument", "Reason", "Reason", fields);
                base.export_attributes (obj, "MarketDocument", "Process", "Process", fields);
                base.export_attributes (obj, "MarketDocument", "AceTariffType", "AceTariffType", fields);
                base.export_attributes (obj, "MarketDocument", "Domain", "Domain", fields);
                base.export_attributes (obj, "MarketDocument", "MarketParticipant", "MarketParticipant", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MarketDocument_collapse" aria-expanded="true" aria-controls="MarketDocument_collapse" style="margin-left: 10px;">MarketDocument</a></legend>
                    <div id="MarketDocument_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.template.call (this) +
                    `
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    {{#Period}}<div><b>Period</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Period}}
                    {{#AttributeInstanceComponent}}<div><b>AttributeInstanceComponent</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/AttributeInstanceComponent}}
                    {{#selfMarketDocument}}<div><b>selfMarketDocument</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/selfMarketDocument}}
                    {{#MarketDocument}}<div><b>MarketDocument</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketDocument}}
                    {{#Reason}}<div><b>Reason</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Reason}}
                    {{#Process}}<div><b>Process</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Process}}
                    {{#AceTariffType}}<div><b>AceTariffType</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/AceTariffType}}
                    {{#Domain}}<div><b>Domain</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Domain}}
                    {{#MarketParticipant}}<div><b>MarketParticipant</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketParticipant}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
                if (obj.Period) obj.Period_string = obj.Period.join ();
                if (obj.AttributeInstanceComponent) obj.AttributeInstanceComponent_string = obj.AttributeInstanceComponent.join ();
                if (obj.selfMarketDocument) obj.selfMarketDocument_string = obj.selfMarketDocument.join ();
                if (obj.MarketDocument) obj.MarketDocument_string = obj.MarketDocument.join ();
                if (obj.Reason) obj.Reason_string = obj.Reason.join ();
                if (obj.Process) obj.Process_string = obj.Process.join ();
                if (obj.AceTariffType) obj.AceTariffType_string = obj.AceTariffType.join ();
                if (obj.Domain) obj.Domain_string = obj.Domain.join ();
                if (obj.MarketParticipant) obj.MarketParticipant_string = obj.MarketParticipant.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TimeSeries_string;
                delete obj.Period_string;
                delete obj.AttributeInstanceComponent_string;
                delete obj.selfMarketDocument_string;
                delete obj.MarketDocument_string;
                delete obj.Reason_string;
                delete obj.Process_string;
                delete obj.AceTariffType_string;
                delete obj.Domain_string;
                delete obj.MarketParticipant_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MarketDocument_collapse" aria-expanded="true" aria-controls="MarketDocument_collapse" style="margin-left: 10px;">MarketDocument</a></legend>
                    <div id="MarketDocument_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Common.Document.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Period'>Period: </label><div class='col-sm-8'><input id='Period' class='form-control' type='text'{{#Period}} value='{{Period}}_string'{{/Period}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='AttributeInstanceComponent'>AttributeInstanceComponent: </label><div class='col-sm-8'><input id='AttributeInstanceComponent' class='form-control' type='text'{{#AttributeInstanceComponent}} value='{{AttributeInstanceComponent}}_string'{{/AttributeInstanceComponent}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='selfMarketDocument'>selfMarketDocument: </label><div class='col-sm-8'><input id='selfMarketDocument' class='form-control' type='text'{{#selfMarketDocument}} value='{{selfMarketDocument}}_string'{{/selfMarketDocument}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketDocument'>MarketDocument: </label><div class='col-sm-8'><input id='MarketDocument' class='form-control' type='text'{{#MarketDocument}} value='{{MarketDocument}}_string'{{/MarketDocument}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Reason'>Reason: </label><div class='col-sm-8'><input id='Reason' class='form-control' type='text'{{#Reason}} value='{{Reason}}_string'{{/Reason}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Process'>Process: </label><div class='col-sm-8'><input id='Process' class='form-control' type='text'{{#Process}} value='{{Process}}_string'{{/Process}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='AceTariffType'>AceTariffType: </label><div class='col-sm-8'><input id='AceTariffType' class='form-control' type='text'{{#AceTariffType}} value='{{AceTariffType}}_string'{{/AceTariffType}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Domain'>Domain: </label><div class='col-sm-8'><input id='Domain' class='form-control' type='text'{{#Domain}} value='{{Domain}}_string'{{/Domain}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketParticipant'>MarketParticipant: </label><div class='col-sm-8'><input id='MarketParticipant' class='form-control' type='text'{{#MarketParticipant}} value='{{MarketParticipant}}_string'{{/MarketParticipant}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "MarketDocument" };
                super.submit (obj);
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");
                temp = document.getElementById ("Period").value; if ("" != temp) obj.Period = temp.split (",");
                temp = document.getElementById ("AttributeInstanceComponent").value; if ("" != temp) obj.AttributeInstanceComponent = temp.split (",");
                temp = document.getElementById ("selfMarketDocument").value; if ("" != temp) obj.selfMarketDocument = temp.split (",");
                temp = document.getElementById ("MarketDocument").value; if ("" != temp) obj.MarketDocument = temp.split (",");
                temp = document.getElementById ("Reason").value; if ("" != temp) obj.Reason = temp.split (",");
                temp = document.getElementById ("Process").value; if ("" != temp) obj.Process = temp.split (",");
                temp = document.getElementById ("AceTariffType").value; if ("" != temp) obj.AceTariffType = temp.split (",");
                temp = document.getElementById ("Domain").value; if ("" != temp) obj.Domain = temp.split (",");
                temp = document.getElementById ("MarketParticipant").value; if ("" != temp) obj.MarketParticipant = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"],
                        ["Period", "Period", "0..*", "0..*"],
                        ["AttributeInstanceComponent", "AttributeInstanceComponent", "0..*", "0..*"],
                        ["selfMarketDocument", "MarketDocument", "0..*", "0..*"],
                        ["MarketDocument", "MarketDocument", "0..*", "0..*"],
                        ["Reason", "Reason", "0..*", "0..*"],
                        ["Process", "Process", "0..*", "0..*"],
                        ["AceTariffType", "AceTariffType", "0..*", "0..*"],
                        ["Domain", "Domain", "0..*", "0..*"],
                        ["MarketParticipant", "MarketParticipant", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * An area of activity defined within the energy market.
         *
         */
        class Domain extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.Domain;
                if (null == bucket)
                   cim_data.Domain = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.Domain[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "Domain";
                base.parse_attributes (/<cim:Domain.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                base.parse_attributes (/<cim:Domain.MarketDocument\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketDocument", sub, context);
                var bucket = context.parsed.Domain;
                if (null == bucket)
                   context.parsed.Domain = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_attributes (obj, "Domain", "TimeSeries", "TimeSeries", fields);
                base.export_attributes (obj, "Domain", "MarketDocument", "MarketDocument", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Domain_collapse" aria-expanded="true" aria-controls="Domain_collapse" style="margin-left: 10px;">Domain</a></legend>
                    <div id="Domain_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    {{#MarketDocument}}<div><b>MarketDocument</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketDocument}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
                if (obj.MarketDocument) obj.MarketDocument_string = obj.MarketDocument.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TimeSeries_string;
                delete obj.MarketDocument_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Domain_collapse" aria-expanded="true" aria-controls="Domain_collapse" style="margin-left: 10px;">Domain</a></legend>
                    <div id="Domain_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketDocument'>MarketDocument: </label><div class='col-sm-8'><input id='MarketDocument' class='form-control' type='text'{{#MarketDocument}} value='{{MarketDocument}}_string'{{/MarketDocument}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "Domain" };
                super.submit (obj);
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");
                temp = document.getElementById ("MarketDocument").value; if ("" != temp) obj.MarketDocument = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"],
                        ["MarketDocument", "MarketDocument", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * The identification of an entity where energy products are measured or computed.
         *
         */
        class MarketEvaluationPoint extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.MarketEvaluationPoint;
                if (null == bucket)
                   cim_data.MarketEvaluationPoint = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.MarketEvaluationPoint[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "MarketEvaluationPoint";
                base.parse_attributes (/<cim:MarketEvaluationPoint.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                var bucket = context.parsed.MarketEvaluationPoint;
                if (null == bucket)
                   context.parsed.MarketEvaluationPoint = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_attributes (obj, "MarketEvaluationPoint", "TimeSeries", "TimeSeries", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MarketEvaluationPoint_collapse" aria-expanded="true" aria-controls="MarketEvaluationPoint_collapse" style="margin-left: 10px;">MarketEvaluationPoint</a></legend>
                    <div id="MarketEvaluationPoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TimeSeries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MarketEvaluationPoint_collapse" aria-expanded="true" aria-controls="MarketEvaluationPoint_collapse" style="margin-left: 10px;">MarketEvaluationPoint</a></legend>
                    <div id="MarketEvaluationPoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "MarketEvaluationPoint" };
                super.submit (obj);
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * An identification of a time interval that may have a given resolution.
         *
         */
        class Period extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.Period;
                if (null == bucket)
                   cim_data.Period = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.Period[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "Period";
                base.parse_element (/<cim:Period.resolution>([\s\S]*?)<\/cim:Period.resolution>/g, obj, "resolution", base.to_string, sub, context);
                base.parse_element (/<cim:Period.timeInterval>([\s\S]*?)<\/cim:Period.timeInterval>/g, obj, "timeInterval", base.to_string, sub, context);
                base.parse_attributes (/<cim:Period.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                base.parse_attributes (/<cim:Period.MarketDocument\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketDocument", sub, context);
                base.parse_attributes (/<cim:Period.Reason\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Reason", sub, context);
                base.parse_attributes (/<cim:Period.Point\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Point", sub, context);
                var bucket = context.parsed.Period;
                if (null == bucket)
                   context.parsed.Period = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "Period", "resolution", "resolution",  base.from_string, fields);
                base.export_element (obj, "Period", "timeInterval", "timeInterval",  base.from_string, fields);
                base.export_attributes (obj, "Period", "TimeSeries", "TimeSeries", fields);
                base.export_attributes (obj, "Period", "MarketDocument", "MarketDocument", fields);
                base.export_attributes (obj, "Period", "Reason", "Reason", fields);
                base.export_attributes (obj, "Period", "Point", "Point", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Period_collapse" aria-expanded="true" aria-controls="Period_collapse" style="margin-left: 10px;">Period</a></legend>
                    <div id="Period_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#resolution}}<div><b>resolution</b>: {{resolution}}</div>{{/resolution}}
                    {{#timeInterval}}<div><b>timeInterval</b>: {{timeInterval}}</div>{{/timeInterval}}
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    {{#MarketDocument}}<div><b>MarketDocument</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketDocument}}
                    {{#Reason}}<div><b>Reason</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Reason}}
                    {{#Point}}<div><b>Point</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Point}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
                if (obj.MarketDocument) obj.MarketDocument_string = obj.MarketDocument.join ();
                if (obj.Reason) obj.Reason_string = obj.Reason.join ();
                if (obj.Point) obj.Point_string = obj.Point.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TimeSeries_string;
                delete obj.MarketDocument_string;
                delete obj.Reason_string;
                delete obj.Point_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Period_collapse" aria-expanded="true" aria-controls="Period_collapse" style="margin-left: 10px;">Period</a></legend>
                    <div id="Period_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='resolution'>resolution: </label><div class='col-sm-8'><input id='resolution' class='form-control' type='text'{{#resolution}} value='{{resolution}}'{{/resolution}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='timeInterval'>timeInterval: </label><div class='col-sm-8'><input id='timeInterval' class='form-control' type='text'{{#timeInterval}} value='{{timeInterval}}'{{/timeInterval}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketDocument'>MarketDocument: </label><div class='col-sm-8'><input id='MarketDocument' class='form-control' type='text'{{#MarketDocument}} value='{{MarketDocument}}_string'{{/MarketDocument}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Reason'>Reason: </label><div class='col-sm-8'><input id='Reason' class='form-control' type='text'{{#Reason}} value='{{Reason}}_string'{{/Reason}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "Period" };
                super.submit (obj);
                temp = document.getElementById ("resolution").value; if ("" != temp) obj.resolution = temp;
                temp = document.getElementById ("timeInterval").value; if ("" != temp) obj.timeInterval = temp;
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");
                temp = document.getElementById ("MarketDocument").value; if ("" != temp) obj.MarketDocument = temp.split (",");
                temp = document.getElementById ("Reason").value; if ("" != temp) obj.Reason = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"],
                        ["MarketDocument", "MarketDocument", "0..*", "0..*"],
                        ["Reason", "Reason", "0..*", "0..*"],
                        ["Point", "Point", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * The condition or position of an object with regard to its standing.
         *
         */
        class MarketObjectStatus extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.MarketObjectStatus;
                if (null == bucket)
                   cim_data.MarketObjectStatus = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.MarketObjectStatus[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "MarketObjectStatus";
                base.parse_element (/<cim:MarketObjectStatus.status>([\s\S]*?)<\/cim:MarketObjectStatus.status>/g, obj, "status", base.to_string, sub, context);
                base.parse_attributes (/<cim:MarketObjectStatus.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                var bucket = context.parsed.MarketObjectStatus;
                if (null == bucket)
                   context.parsed.MarketObjectStatus = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "MarketObjectStatus", "status", "status",  base.from_string, fields);
                base.export_attributes (obj, "MarketObjectStatus", "TimeSeries", "TimeSeries", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MarketObjectStatus_collapse" aria-expanded="true" aria-controls="MarketObjectStatus_collapse" style="margin-left: 10px;">MarketObjectStatus</a></legend>
                    <div id="MarketObjectStatus_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#status}}<div><b>status</b>: {{status}}</div>{{/status}}
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TimeSeries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MarketObjectStatus_collapse" aria-expanded="true" aria-controls="MarketObjectStatus_collapse" style="margin-left: 10px;">MarketObjectStatus</a></legend>
                    <div id="MarketObjectStatus_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='status'>status: </label><div class='col-sm-8'><input id='status' class='form-control' type='text'{{#status}} value='{{status}}'{{/status}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "MarketObjectStatus" };
                super.submit (obj);
                temp = document.getElementById ("status").value; if ("" != temp) obj.status = temp;
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * A class used to provide information about an attribute.
         *
         */
        class AttributeInstanceComponent extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.AttributeInstanceComponent;
                if (null == bucket)
                   cim_data.AttributeInstanceComponent = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.AttributeInstanceComponent[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "AttributeInstanceComponent";
                base.parse_element (/<cim:AttributeInstanceComponent.attribute>([\s\S]*?)<\/cim:AttributeInstanceComponent.attribute>/g, obj, "attribute", base.to_string, sub, context);
                base.parse_element (/<cim:AttributeInstanceComponent.attributeValue>([\s\S]*?)<\/cim:AttributeInstanceComponent.attributeValue>/g, obj, "attributeValue", base.to_string, sub, context);
                base.parse_element (/<cim:AttributeInstanceComponent.position>([\s\S]*?)<\/cim:AttributeInstanceComponent.position>/g, obj, "position", base.to_string, sub, context);
                base.parse_attributes (/<cim:AttributeInstanceComponent.MarketDocument\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketDocument", sub, context);
                base.parse_attributes (/<cim:AttributeInstanceComponent.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                var bucket = context.parsed.AttributeInstanceComponent;
                if (null == bucket)
                   context.parsed.AttributeInstanceComponent = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "AttributeInstanceComponent", "attribute", "attribute",  base.from_string, fields);
                base.export_element (obj, "AttributeInstanceComponent", "attributeValue", "attributeValue",  base.from_string, fields);
                base.export_element (obj, "AttributeInstanceComponent", "position", "position",  base.from_string, fields);
                base.export_attributes (obj, "AttributeInstanceComponent", "MarketDocument", "MarketDocument", fields);
                base.export_attributes (obj, "AttributeInstanceComponent", "TimeSeries", "TimeSeries", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#AttributeInstanceComponent_collapse" aria-expanded="true" aria-controls="AttributeInstanceComponent_collapse" style="margin-left: 10px;">AttributeInstanceComponent</a></legend>
                    <div id="AttributeInstanceComponent_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#attribute}}<div><b>attribute</b>: {{attribute}}</div>{{/attribute}}
                    {{#attributeValue}}<div><b>attributeValue</b>: {{attributeValue}}</div>{{/attributeValue}}
                    {{#position}}<div><b>position</b>: {{position}}</div>{{/position}}
                    {{#MarketDocument}}<div><b>MarketDocument</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketDocument}}
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.MarketDocument) obj.MarketDocument_string = obj.MarketDocument.join ();
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.MarketDocument_string;
                delete obj.TimeSeries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#AttributeInstanceComponent_collapse" aria-expanded="true" aria-controls="AttributeInstanceComponent_collapse" style="margin-left: 10px;">AttributeInstanceComponent</a></legend>
                    <div id="AttributeInstanceComponent_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='attribute'>attribute: </label><div class='col-sm-8'><input id='attribute' class='form-control' type='text'{{#attribute}} value='{{attribute}}'{{/attribute}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='attributeValue'>attributeValue: </label><div class='col-sm-8'><input id='attributeValue' class='form-control' type='text'{{#attributeValue}} value='{{attributeValue}}'{{/attributeValue}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='position'>position: </label><div class='col-sm-8'><input id='position' class='form-control' type='text'{{#position}} value='{{position}}'{{/position}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketDocument'>MarketDocument: </label><div class='col-sm-8'><input id='MarketDocument' class='form-control' type='text'{{#MarketDocument}} value='{{MarketDocument}}_string'{{/MarketDocument}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "AttributeInstanceComponent" };
                super.submit (obj);
                temp = document.getElementById ("attribute").value; if ("" != temp) obj.attribute = temp;
                temp = document.getElementById ("attributeValue").value; if ("" != temp) obj.attributeValue = temp;
                temp = document.getElementById ("position").value; if ("" != temp) obj.position = temp;
                temp = document.getElementById ("MarketDocument").value; if ("" != temp) obj.MarketDocument = temp.split (",");
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["MarketDocument", "MarketDocument", "0..*", "0..*"],
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * A class providing the identification and type of an auction.
         *
         */
        class Auction extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.Auction;
                if (null == bucket)
                   cim_data.Auction = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.Auction[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "Auction";
                base.parse_element (/<cim:Auction.allocationMode>([\s\S]*?)<\/cim:Auction.allocationMode>/g, obj, "allocationMode", base.to_string, sub, context);
                base.parse_element (/<cim:Auction.cancelled>([\s\S]*?)<\/cim:Auction.cancelled>/g, obj, "cancelled", base.to_string, sub, context);
                base.parse_element (/<cim:Auction.category>([\s\S]*?)<\/cim:Auction.category>/g, obj, "category", base.to_string, sub, context);
                base.parse_element (/<cim:Auction.paymentTerms>([\s\S]*?)<\/cim:Auction.paymentTerms>/g, obj, "paymentTerms", base.to_string, sub, context);
                base.parse_element (/<cim:Auction.rights>([\s\S]*?)<\/cim:Auction.rights>/g, obj, "rights", base.to_string, sub, context);
                base.parse_element (/<cim:Auction.type>([\s\S]*?)<\/cim:Auction.type>/g, obj, "type", base.to_string, sub, context);
                base.parse_attributes (/<cim:Auction.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                var bucket = context.parsed.Auction;
                if (null == bucket)
                   context.parsed.Auction = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "Auction", "allocationMode", "allocationMode",  base.from_string, fields);
                base.export_element (obj, "Auction", "cancelled", "cancelled",  base.from_string, fields);
                base.export_element (obj, "Auction", "category", "category",  base.from_string, fields);
                base.export_element (obj, "Auction", "paymentTerms", "paymentTerms",  base.from_string, fields);
                base.export_element (obj, "Auction", "rights", "rights",  base.from_string, fields);
                base.export_element (obj, "Auction", "type", "type",  base.from_string, fields);
                base.export_attributes (obj, "Auction", "TimeSeries", "TimeSeries", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Auction_collapse" aria-expanded="true" aria-controls="Auction_collapse" style="margin-left: 10px;">Auction</a></legend>
                    <div id="Auction_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#allocationMode}}<div><b>allocationMode</b>: {{allocationMode}}</div>{{/allocationMode}}
                    {{#cancelled}}<div><b>cancelled</b>: {{cancelled}}</div>{{/cancelled}}
                    {{#category}}<div><b>category</b>: {{category}}</div>{{/category}}
                    {{#paymentTerms}}<div><b>paymentTerms</b>: {{paymentTerms}}</div>{{/paymentTerms}}
                    {{#rights}}<div><b>rights</b>: {{rights}}</div>{{/rights}}
                    {{#type}}<div><b>type</b>: {{type}}</div>{{/type}}
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TimeSeries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Auction_collapse" aria-expanded="true" aria-controls="Auction_collapse" style="margin-left: 10px;">Auction</a></legend>
                    <div id="Auction_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='allocationMode'>allocationMode: </label><div class='col-sm-8'><input id='allocationMode' class='form-control' type='text'{{#allocationMode}} value='{{allocationMode}}'{{/allocationMode}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='cancelled'>cancelled: </label><div class='col-sm-8'><input id='cancelled' class='form-control' type='text'{{#cancelled}} value='{{cancelled}}'{{/cancelled}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='category'>category: </label><div class='col-sm-8'><input id='category' class='form-control' type='text'{{#category}} value='{{category}}'{{/category}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='paymentTerms'>paymentTerms: </label><div class='col-sm-8'><input id='paymentTerms' class='form-control' type='text'{{#paymentTerms}} value='{{paymentTerms}}'{{/paymentTerms}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='rights'>rights: </label><div class='col-sm-8'><input id='rights' class='form-control' type='text'{{#rights}} value='{{rights}}'{{/rights}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='type'>type: </label><div class='col-sm-8'><input id='type' class='form-control' type='text'{{#type}} value='{{type}}'{{/type}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "Auction" };
                super.submit (obj);
                temp = document.getElementById ("allocationMode").value; if ("" != temp) obj.allocationMode = temp;
                temp = document.getElementById ("cancelled").value; if ("" != temp) obj.cancelled = temp;
                temp = document.getElementById ("category").value; if ("" != temp) obj.category = temp;
                temp = document.getElementById ("paymentTerms").value; if ("" != temp) obj.paymentTerms = temp;
                temp = document.getElementById ("rights").value; if ("" != temp) obj.rights = temp;
                temp = document.getElementById ("type").value; if ("" != temp) obj.type = temp;
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * The cost corresponding to a specific measure and expressed in a currency.
         *
         */
        class Price extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.Price;
                if (null == bucket)
                   cim_data.Price = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.Price[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "Price";
                base.parse_element (/<cim:Price.amount>([\s\S]*?)<\/cim:Price.amount>/g, obj, "amount", base.to_string, sub, context);
                base.parse_element (/<cim:Price.category>([\s\S]*?)<\/cim:Price.category>/g, obj, "category", base.to_string, sub, context);
                base.parse_element (/<cim:Price.direction>([\s\S]*?)<\/cim:Price.direction>/g, obj, "direction", base.to_string, sub, context);
                base.parse_attribute (/<cim:Price.Point\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Point", sub, context);
                var bucket = context.parsed.Price;
                if (null == bucket)
                   context.parsed.Price = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "Price", "amount", "amount",  base.from_string, fields);
                base.export_element (obj, "Price", "category", "category",  base.from_string, fields);
                base.export_element (obj, "Price", "direction", "direction",  base.from_string, fields);
                base.export_attribute (obj, "Price", "Point", "Point", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Price_collapse" aria-expanded="true" aria-controls="Price_collapse" style="margin-left: 10px;">Price</a></legend>
                    <div id="Price_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#amount}}<div><b>amount</b>: {{amount}}</div>{{/amount}}
                    {{#category}}<div><b>category</b>: {{category}}</div>{{/category}}
                    {{#direction}}<div><b>direction</b>: {{direction}}</div>{{/direction}}
                    {{#Point}}<div><b>Point</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Point}}&quot;);})'>{{Point}}</a></div>{{/Point}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Price_collapse" aria-expanded="true" aria-controls="Price_collapse" style="margin-left: 10px;">Price</a></legend>
                    <div id="Price_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='amount'>amount: </label><div class='col-sm-8'><input id='amount' class='form-control' type='text'{{#amount}} value='{{amount}}'{{/amount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='category'>category: </label><div class='col-sm-8'><input id='category' class='form-control' type='text'{{#category}} value='{{category}}'{{/category}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='direction'>direction: </label><div class='col-sm-8'><input id='direction' class='form-control' type='text'{{#direction}} value='{{direction}}'{{/direction}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Point'>Point: </label><div class='col-sm-8'><input id='Point' class='form-control' type='text'{{#Point}} value='{{Point}}'{{/Point}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "Price" };
                super.submit (obj);
                temp = document.getElementById ("amount").value; if ("" != temp) obj.amount = temp;
                temp = document.getElementById ("category").value; if ("" != temp) obj.category = temp;
                temp = document.getElementById ("direction").value; if ("" != temp) obj.direction = temp;
                temp = document.getElementById ("Point").value; if ("" != temp) obj.Point = temp;

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["Point", "Point", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * The formal specification of a set of business transactions having the same business goal.
         *
         */
        class Process extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.Process;
                if (null == bucket)
                   cim_data.Process = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.Process[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "Process";
                base.parse_element (/<cim:Process.classificationType>([\s\S]*?)<\/cim:Process.classificationType>/g, obj, "classificationType", base.to_string, sub, context);
                base.parse_element (/<cim:Process.processType>([\s\S]*?)<\/cim:Process.processType>/g, obj, "processType", base.to_string, sub, context);
                base.parse_attributes (/<cim:Process.MarketDocument\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketDocument", sub, context);
                var bucket = context.parsed.Process;
                if (null == bucket)
                   context.parsed.Process = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "Process", "classificationType", "classificationType",  base.from_string, fields);
                base.export_element (obj, "Process", "processType", "processType",  base.from_string, fields);
                base.export_attributes (obj, "Process", "MarketDocument", "MarketDocument", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Process_collapse" aria-expanded="true" aria-controls="Process_collapse" style="margin-left: 10px;">Process</a></legend>
                    <div id="Process_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#classificationType}}<div><b>classificationType</b>: {{classificationType}}</div>{{/classificationType}}
                    {{#processType}}<div><b>processType</b>: {{processType}}</div>{{/processType}}
                    {{#MarketDocument}}<div><b>MarketDocument</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketDocument}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.MarketDocument) obj.MarketDocument_string = obj.MarketDocument.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.MarketDocument_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Process_collapse" aria-expanded="true" aria-controls="Process_collapse" style="margin-left: 10px;">Process</a></legend>
                    <div id="Process_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='classificationType'>classificationType: </label><div class='col-sm-8'><input id='classificationType' class='form-control' type='text'{{#classificationType}} value='{{classificationType}}'{{/classificationType}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='processType'>processType: </label><div class='col-sm-8'><input id='processType' class='form-control' type='text'{{#processType}} value='{{processType}}'{{/processType}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketDocument'>MarketDocument: </label><div class='col-sm-8'><input id='MarketDocument' class='form-control' type='text'{{#MarketDocument}} value='{{MarketDocument}}_string'{{/MarketDocument}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "Process" };
                super.submit (obj);
                temp = document.getElementById ("classificationType").value; if ("" != temp) obj.classificationType = temp;
                temp = document.getElementById ("processType").value; if ("" != temp) obj.processType = temp;
                temp = document.getElementById ("MarketDocument").value; if ("" != temp) obj.MarketDocument = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["MarketDocument", "MarketDocument", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * A set of regular time-ordered measurements or values of quantitative nature of an individual or collective phenomenon taken at successive, in most cases equidistant, periods / points of time.
         *
         */
        class TimeSeries extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.TimeSeries;
                if (null == bucket)
                   cim_data.TimeSeries = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.TimeSeries[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "TimeSeries";
                base.parse_element (/<cim:TimeSeries.businessType>([\s\S]*?)<\/cim:TimeSeries.businessType>/g, obj, "businessType", base.to_string, sub, context);
                base.parse_element (/<cim:TimeSeries.cancelledTS>([\s\S]*?)<\/cim:TimeSeries.cancelledTS>/g, obj, "cancelledTS", base.to_string, sub, context);
                base.parse_element (/<cim:TimeSeries.curveType>([\s\S]*?)<\/cim:TimeSeries.curveType>/g, obj, "curveType", base.to_string, sub, context);
                base.parse_element (/<cim:TimeSeries.objectAggregation>([\s\S]*?)<\/cim:TimeSeries.objectAggregation>/g, obj, "objectAggregation", base.to_string, sub, context);
                base.parse_element (/<cim:TimeSeries.product>([\s\S]*?)<\/cim:TimeSeries.product>/g, obj, "product", base.to_string, sub, context);
                base.parse_element (/<cim:TimeSeries.version>([\s\S]*?)<\/cim:TimeSeries.version>/g, obj, "version", base.to_string, sub, context);
                base.parse_attributes (/<cim:TimeSeries.MarketDocument\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketDocument", sub, context);
                base.parse_attributes (/<cim:TimeSeries.FlowDirection\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "FlowDirection", sub, context);
                base.parse_attributes (/<cim:TimeSeries.Period\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Period", sub, context);
                base.parse_attributes (/<cim:TimeSeries.Auction\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Auction", sub, context);
                base.parse_attributes (/<cim:TimeSeries.DateAndOrTime\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "DateAndOrTime", sub, context);
                base.parse_attributes (/<cim:TimeSeries.AttributeInstanceComponent\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "AttributeInstanceComponent", sub, context);
                base.parse_attributes (/<cim:TimeSeries.Domain\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Domain", sub, context);
                base.parse_attributes (/<cim:TimeSeries.Unit\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Unit", sub, context);
                base.parse_attributes (/<cim:TimeSeries.Reason\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Reason", sub, context);
                base.parse_attributes (/<cim:TimeSeries.MarketParticipant\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketParticipant", sub, context);
                base.parse_attributes (/<cim:TimeSeries.MarketEvaluationPoint\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketEvaluationPoint", sub, context);
                base.parse_attributes (/<cim:TimeSeries.MarketObjectStatus\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MarketObjectStatus", sub, context);
                base.parse_attributes (/<cim:TimeSeries.Point\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Point", sub, context);
                base.parse_attributes (/<cim:TimeSeries.MktPSRType\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MktPSRType", sub, context);
                base.parse_attributes (/<cim:TimeSeries.RegisteredResource\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RegisteredResource", sub, context);
                var bucket = context.parsed.TimeSeries;
                if (null == bucket)
                   context.parsed.TimeSeries = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "TimeSeries", "businessType", "businessType",  base.from_string, fields);
                base.export_element (obj, "TimeSeries", "cancelledTS", "cancelledTS",  base.from_string, fields);
                base.export_element (obj, "TimeSeries", "curveType", "curveType",  base.from_string, fields);
                base.export_element (obj, "TimeSeries", "objectAggregation", "objectAggregation",  base.from_string, fields);
                base.export_element (obj, "TimeSeries", "product", "product",  base.from_string, fields);
                base.export_element (obj, "TimeSeries", "version", "version",  base.from_string, fields);
                base.export_attributes (obj, "TimeSeries", "MarketDocument", "MarketDocument", fields);
                base.export_attributes (obj, "TimeSeries", "FlowDirection", "FlowDirection", fields);
                base.export_attributes (obj, "TimeSeries", "Period", "Period", fields);
                base.export_attributes (obj, "TimeSeries", "Auction", "Auction", fields);
                base.export_attributes (obj, "TimeSeries", "DateAndOrTime", "DateAndOrTime", fields);
                base.export_attributes (obj, "TimeSeries", "AttributeInstanceComponent", "AttributeInstanceComponent", fields);
                base.export_attributes (obj, "TimeSeries", "Domain", "Domain", fields);
                base.export_attributes (obj, "TimeSeries", "Unit", "Unit", fields);
                base.export_attributes (obj, "TimeSeries", "Reason", "Reason", fields);
                base.export_attributes (obj, "TimeSeries", "MarketParticipant", "MarketParticipant", fields);
                base.export_attributes (obj, "TimeSeries", "MarketEvaluationPoint", "MarketEvaluationPoint", fields);
                base.export_attributes (obj, "TimeSeries", "MarketObjectStatus", "MarketObjectStatus", fields);
                base.export_attributes (obj, "TimeSeries", "Point", "Point", fields);
                base.export_attributes (obj, "TimeSeries", "MktPSRType", "MktPSRType", fields);
                base.export_attributes (obj, "TimeSeries", "RegisteredResource", "RegisteredResource", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TimeSeries_collapse" aria-expanded="true" aria-controls="TimeSeries_collapse" style="margin-left: 10px;">TimeSeries</a></legend>
                    <div id="TimeSeries_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#businessType}}<div><b>businessType</b>: {{businessType}}</div>{{/businessType}}
                    {{#cancelledTS}}<div><b>cancelledTS</b>: {{cancelledTS}}</div>{{/cancelledTS}}
                    {{#curveType}}<div><b>curveType</b>: {{curveType}}</div>{{/curveType}}
                    {{#objectAggregation}}<div><b>objectAggregation</b>: {{objectAggregation}}</div>{{/objectAggregation}}
                    {{#product}}<div><b>product</b>: {{product}}</div>{{/product}}
                    {{#version}}<div><b>version</b>: {{version}}</div>{{/version}}
                    {{#MarketDocument}}<div><b>MarketDocument</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketDocument}}
                    {{#FlowDirection}}<div><b>FlowDirection</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/FlowDirection}}
                    {{#Period}}<div><b>Period</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Period}}
                    {{#Auction}}<div><b>Auction</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Auction}}
                    {{#DateAndOrTime}}<div><b>DateAndOrTime</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/DateAndOrTime}}
                    {{#AttributeInstanceComponent}}<div><b>AttributeInstanceComponent</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/AttributeInstanceComponent}}
                    {{#Domain}}<div><b>Domain</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Domain}}
                    {{#Unit}}<div><b>Unit</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Unit}}
                    {{#Reason}}<div><b>Reason</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Reason}}
                    {{#MarketParticipant}}<div><b>MarketParticipant</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketParticipant}}
                    {{#MarketEvaluationPoint}}<div><b>MarketEvaluationPoint</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketEvaluationPoint}}
                    {{#MarketObjectStatus}}<div><b>MarketObjectStatus</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MarketObjectStatus}}
                    {{#Point}}<div><b>Point</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Point}}
                    {{#MktPSRType}}<div><b>MktPSRType</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/MktPSRType}}
                    {{#RegisteredResource}}<div><b>RegisteredResource</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/RegisteredResource}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.MarketDocument) obj.MarketDocument_string = obj.MarketDocument.join ();
                if (obj.FlowDirection) obj.FlowDirection_string = obj.FlowDirection.join ();
                if (obj.Period) obj.Period_string = obj.Period.join ();
                if (obj.Auction) obj.Auction_string = obj.Auction.join ();
                if (obj.DateAndOrTime) obj.DateAndOrTime_string = obj.DateAndOrTime.join ();
                if (obj.AttributeInstanceComponent) obj.AttributeInstanceComponent_string = obj.AttributeInstanceComponent.join ();
                if (obj.Domain) obj.Domain_string = obj.Domain.join ();
                if (obj.Unit) obj.Unit_string = obj.Unit.join ();
                if (obj.Reason) obj.Reason_string = obj.Reason.join ();
                if (obj.MarketParticipant) obj.MarketParticipant_string = obj.MarketParticipant.join ();
                if (obj.MarketEvaluationPoint) obj.MarketEvaluationPoint_string = obj.MarketEvaluationPoint.join ();
                if (obj.MarketObjectStatus) obj.MarketObjectStatus_string = obj.MarketObjectStatus.join ();
                if (obj.Point) obj.Point_string = obj.Point.join ();
                if (obj.MktPSRType) obj.MktPSRType_string = obj.MktPSRType.join ();
                if (obj.RegisteredResource) obj.RegisteredResource_string = obj.RegisteredResource.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.MarketDocument_string;
                delete obj.FlowDirection_string;
                delete obj.Period_string;
                delete obj.Auction_string;
                delete obj.DateAndOrTime_string;
                delete obj.AttributeInstanceComponent_string;
                delete obj.Domain_string;
                delete obj.Unit_string;
                delete obj.Reason_string;
                delete obj.MarketParticipant_string;
                delete obj.MarketEvaluationPoint_string;
                delete obj.MarketObjectStatus_string;
                delete obj.Point_string;
                delete obj.MktPSRType_string;
                delete obj.RegisteredResource_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TimeSeries_collapse" aria-expanded="true" aria-controls="TimeSeries_collapse" style="margin-left: 10px;">TimeSeries</a></legend>
                    <div id="TimeSeries_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='businessType'>businessType: </label><div class='col-sm-8'><input id='businessType' class='form-control' type='text'{{#businessType}} value='{{businessType}}'{{/businessType}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='cancelledTS'>cancelledTS: </label><div class='col-sm-8'><input id='cancelledTS' class='form-control' type='text'{{#cancelledTS}} value='{{cancelledTS}}'{{/cancelledTS}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='curveType'>curveType: </label><div class='col-sm-8'><input id='curveType' class='form-control' type='text'{{#curveType}} value='{{curveType}}'{{/curveType}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='objectAggregation'>objectAggregation: </label><div class='col-sm-8'><input id='objectAggregation' class='form-control' type='text'{{#objectAggregation}} value='{{objectAggregation}}'{{/objectAggregation}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='product'>product: </label><div class='col-sm-8'><input id='product' class='form-control' type='text'{{#product}} value='{{product}}'{{/product}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='version'>version: </label><div class='col-sm-8'><input id='version' class='form-control' type='text'{{#version}} value='{{version}}'{{/version}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketDocument'>MarketDocument: </label><div class='col-sm-8'><input id='MarketDocument' class='form-control' type='text'{{#MarketDocument}} value='{{MarketDocument}}_string'{{/MarketDocument}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='FlowDirection'>FlowDirection: </label><div class='col-sm-8'><input id='FlowDirection' class='form-control' type='text'{{#FlowDirection}} value='{{FlowDirection}}_string'{{/FlowDirection}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Period'>Period: </label><div class='col-sm-8'><input id='Period' class='form-control' type='text'{{#Period}} value='{{Period}}_string'{{/Period}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Auction'>Auction: </label><div class='col-sm-8'><input id='Auction' class='form-control' type='text'{{#Auction}} value='{{Auction}}_string'{{/Auction}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='DateAndOrTime'>DateAndOrTime: </label><div class='col-sm-8'><input id='DateAndOrTime' class='form-control' type='text'{{#DateAndOrTime}} value='{{DateAndOrTime}}_string'{{/DateAndOrTime}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='AttributeInstanceComponent'>AttributeInstanceComponent: </label><div class='col-sm-8'><input id='AttributeInstanceComponent' class='form-control' type='text'{{#AttributeInstanceComponent}} value='{{AttributeInstanceComponent}}_string'{{/AttributeInstanceComponent}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Domain'>Domain: </label><div class='col-sm-8'><input id='Domain' class='form-control' type='text'{{#Domain}} value='{{Domain}}_string'{{/Domain}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Unit'>Unit: </label><div class='col-sm-8'><input id='Unit' class='form-control' type='text'{{#Unit}} value='{{Unit}}_string'{{/Unit}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Reason'>Reason: </label><div class='col-sm-8'><input id='Reason' class='form-control' type='text'{{#Reason}} value='{{Reason}}_string'{{/Reason}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketParticipant'>MarketParticipant: </label><div class='col-sm-8'><input id='MarketParticipant' class='form-control' type='text'{{#MarketParticipant}} value='{{MarketParticipant}}_string'{{/MarketParticipant}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketEvaluationPoint'>MarketEvaluationPoint: </label><div class='col-sm-8'><input id='MarketEvaluationPoint' class='form-control' type='text'{{#MarketEvaluationPoint}} value='{{MarketEvaluationPoint}}_string'{{/MarketEvaluationPoint}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MarketObjectStatus'>MarketObjectStatus: </label><div class='col-sm-8'><input id='MarketObjectStatus' class='form-control' type='text'{{#MarketObjectStatus}} value='{{MarketObjectStatus}}_string'{{/MarketObjectStatus}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Point'>Point: </label><div class='col-sm-8'><input id='Point' class='form-control' type='text'{{#Point}} value='{{Point}}_string'{{/Point}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MktPSRType'>MktPSRType: </label><div class='col-sm-8'><input id='MktPSRType' class='form-control' type='text'{{#MktPSRType}} value='{{MktPSRType}}_string'{{/MktPSRType}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='RegisteredResource'>RegisteredResource: </label><div class='col-sm-8'><input id='RegisteredResource' class='form-control' type='text'{{#RegisteredResource}} value='{{RegisteredResource}}_string'{{/RegisteredResource}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "TimeSeries" };
                super.submit (obj);
                temp = document.getElementById ("businessType").value; if ("" != temp) obj.businessType = temp;
                temp = document.getElementById ("cancelledTS").value; if ("" != temp) obj.cancelledTS = temp;
                temp = document.getElementById ("curveType").value; if ("" != temp) obj.curveType = temp;
                temp = document.getElementById ("objectAggregation").value; if ("" != temp) obj.objectAggregation = temp;
                temp = document.getElementById ("product").value; if ("" != temp) obj.product = temp;
                temp = document.getElementById ("version").value; if ("" != temp) obj.version = temp;
                temp = document.getElementById ("MarketDocument").value; if ("" != temp) obj.MarketDocument = temp.split (",");
                temp = document.getElementById ("FlowDirection").value; if ("" != temp) obj.FlowDirection = temp.split (",");
                temp = document.getElementById ("Period").value; if ("" != temp) obj.Period = temp.split (",");
                temp = document.getElementById ("Auction").value; if ("" != temp) obj.Auction = temp.split (",");
                temp = document.getElementById ("DateAndOrTime").value; if ("" != temp) obj.DateAndOrTime = temp.split (",");
                temp = document.getElementById ("AttributeInstanceComponent").value; if ("" != temp) obj.AttributeInstanceComponent = temp.split (",");
                temp = document.getElementById ("Domain").value; if ("" != temp) obj.Domain = temp.split (",");
                temp = document.getElementById ("Unit").value; if ("" != temp) obj.Unit = temp.split (",");
                temp = document.getElementById ("Reason").value; if ("" != temp) obj.Reason = temp.split (",");
                temp = document.getElementById ("MarketParticipant").value; if ("" != temp) obj.MarketParticipant = temp.split (",");
                temp = document.getElementById ("MarketEvaluationPoint").value; if ("" != temp) obj.MarketEvaluationPoint = temp.split (",");
                temp = document.getElementById ("MarketObjectStatus").value; if ("" != temp) obj.MarketObjectStatus = temp.split (",");
                temp = document.getElementById ("Point").value; if ("" != temp) obj.Point = temp.split (",");
                temp = document.getElementById ("MktPSRType").value; if ("" != temp) obj.MktPSRType = temp.split (",");
                temp = document.getElementById ("RegisteredResource").value; if ("" != temp) obj.RegisteredResource = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["MarketDocument", "MarketDocument", "0..*", "0..*"],
                        ["FlowDirection", "FlowDirection", "0..*", "0..*"],
                        ["Period", "Period", "0..*", "0..*"],
                        ["Auction", "Auction", "0..*", "0..*"],
                        ["DateAndOrTime", "DateAndOrTime", "0..*", "0..*"],
                        ["AttributeInstanceComponent", "AttributeInstanceComponent", "0..*", "0..*"],
                        ["Domain", "Domain", "0..*", "0..*"],
                        ["Unit", "Unit", "0..*", "0..*"],
                        ["Reason", "Reason", "0..*", "0..*"],
                        ["MarketParticipant", "MarketParticipant", "0..*", "0..*"],
                        ["MarketEvaluationPoint", "MarketEvaluationPoint", "0..*", "0..*"],
                        ["MarketObjectStatus", "MarketObjectStatus", "0..*", "0..*"],
                        ["Point", "Point", "0..*", "0..*"],
                        ["MktPSRType", "MktPSRType", "0..*", "0..*"],
                        ["RegisteredResource", "RegisteredResource", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * The coded identification of the direction of energy flow.
         *
         */
        class FlowDirection extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.FlowDirection;
                if (null == bucket)
                   cim_data.FlowDirection = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.FlowDirection[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "FlowDirection";
                base.parse_element (/<cim:FlowDirection.direction>([\s\S]*?)<\/cim:FlowDirection.direction>/g, obj, "direction", base.to_string, sub, context);
                base.parse_attributes (/<cim:FlowDirection.TimeSeries\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TimeSeries", sub, context);
                var bucket = context.parsed.FlowDirection;
                if (null == bucket)
                   context.parsed.FlowDirection = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "FlowDirection", "direction", "direction",  base.from_string, fields);
                base.export_attributes (obj, "FlowDirection", "TimeSeries", "TimeSeries", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#FlowDirection_collapse" aria-expanded="true" aria-controls="FlowDirection_collapse" style="margin-left: 10px;">FlowDirection</a></legend>
                    <div id="FlowDirection_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#direction}}<div><b>direction</b>: {{direction}}</div>{{/direction}}
                    {{#TimeSeries}}<div><b>TimeSeries</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TimeSeries}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TimeSeries) obj.TimeSeries_string = obj.TimeSeries.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TimeSeries_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#FlowDirection_collapse" aria-expanded="true" aria-controls="FlowDirection_collapse" style="margin-left: 10px;">FlowDirection</a></legend>
                    <div id="FlowDirection_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='direction'>direction: </label><div class='col-sm-8'><input id='direction' class='form-control' type='text'{{#direction}} value='{{direction}}'{{/direction}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TimeSeries'>TimeSeries: </label><div class='col-sm-8'><input id='TimeSeries' class='form-control' type='text'{{#TimeSeries}} value='{{TimeSeries}}_string'{{/TimeSeries}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "FlowDirection" };
                super.submit (obj);
                temp = document.getElementById ("direction").value; if ("" != temp) obj.direction = temp;
                temp = document.getElementById ("TimeSeries").value; if ("" != temp) obj.TimeSeries = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["TimeSeries", "TimeSeries", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * An identification  or eventually the contents of an agreement between two or more parties.
         *
         */
        class MarketAgreement extends MarketDocument
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.MarketAgreement;
                if (null == bucket)
                   cim_data.MarketAgreement = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.MarketAgreement[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = MarketDocument.prototype.parse.call (this, context, sub);
                obj.cls = "MarketAgreement";
                var bucket = context.parsed.MarketAgreement;
                if (null == bucket)
                   context.parsed.MarketAgreement = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = MarketDocument.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MarketAgreement_collapse" aria-expanded="true" aria-controls="MarketAgreement_collapse" style="margin-left: 10px;">MarketAgreement</a></legend>
                    <div id="MarketAgreement_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + MarketDocument.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MarketAgreement_collapse" aria-expanded="true" aria-controls="MarketAgreement_collapse" style="margin-left: 10px;">MarketAgreement</a></legend>
                    <div id="MarketAgreement_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + MarketDocument.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var obj = obj || { cls: "MarketAgreement" };
                super.submit (obj);

                return (obj);
            }
        }

        /**
         * The formal specification of specific characteristics related to a bid.
         *
         */
        class BidTimeSeries extends TimeSeries
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                var bucket = cim_data.BidTimeSeries;
                if (null == bucket)
                   cim_data.BidTimeSeries = bucket = {};
                bucket[template.id] = template;
            }

            remove (obj, cim_data)
            {
               super.remove (obj, cim_data);
               delete cim_data.BidTimeSeries[obj.id];
            }

            parse (context, sub)
            {
                var obj;

                obj = TimeSeries.prototype.parse.call (this, context, sub);
                obj.cls = "BidTimeSeries";
                base.parse_element (/<cim:BidTimeSeries.blockBid>([\s\S]*?)<\/cim:BidTimeSeries.blockBid>/g, obj, "blockBid", base.to_string, sub, context);
                base.parse_element (/<cim:BidTimeSeries.direction>([\s\S]*?)<\/cim:BidTimeSeries.direction>/g, obj, "direction", base.to_string, sub, context);
                base.parse_element (/<cim:BidTimeSeries.divisible>([\s\S]*?)<\/cim:BidTimeSeries.divisible>/g, obj, "divisible", base.to_string, sub, context);
                base.parse_element (/<cim:BidTimeSeries.linkedBidsIdentification>([\s\S]*?)<\/cim:BidTimeSeries.linkedBidsIdentification>/g, obj, "linkedBidsIdentification", base.to_string, sub, context);
                base.parse_element (/<cim:BidTimeSeries.minimumActivationQuantity>([\s\S]*?)<\/cim:BidTimeSeries.minimumActivationQuantity>/g, obj, "minimumActivationQuantity", base.to_string, sub, context);
                base.parse_element (/<cim:BidTimeSeries.stepIncrementQuantity>([\s\S]*?)<\/cim:BidTimeSeries.stepIncrementQuantity>/g, obj, "stepIncrementQuantity", base.to_string, sub, context);
                var bucket = context.parsed.BidTimeSeries;
                if (null == bucket)
                   context.parsed.BidTimeSeries = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = TimeSeries.prototype.export.call (this, obj, false);

                base.export_element (obj, "BidTimeSeries", "blockBid", "blockBid",  base.from_string, fields);
                base.export_element (obj, "BidTimeSeries", "direction", "direction",  base.from_string, fields);
                base.export_element (obj, "BidTimeSeries", "divisible", "divisible",  base.from_string, fields);
                base.export_element (obj, "BidTimeSeries", "linkedBidsIdentification", "linkedBidsIdentification",  base.from_string, fields);
                base.export_element (obj, "BidTimeSeries", "minimumActivationQuantity", "minimumActivationQuantity",  base.from_string, fields);
                base.export_element (obj, "BidTimeSeries", "stepIncrementQuantity", "stepIncrementQuantity",  base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#BidTimeSeries_collapse" aria-expanded="true" aria-controls="BidTimeSeries_collapse" style="margin-left: 10px;">BidTimeSeries</a></legend>
                    <div id="BidTimeSeries_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TimeSeries.prototype.template.call (this) +
                    `
                    {{#blockBid}}<div><b>blockBid</b>: {{blockBid}}</div>{{/blockBid}}
                    {{#direction}}<div><b>direction</b>: {{direction}}</div>{{/direction}}
                    {{#divisible}}<div><b>divisible</b>: {{divisible}}</div>{{/divisible}}
                    {{#linkedBidsIdentification}}<div><b>linkedBidsIdentification</b>: {{linkedBidsIdentification}}</div>{{/linkedBidsIdentification}}
                    {{#minimumActivationQuantity}}<div><b>minimumActivationQuantity</b>: {{minimumActivationQuantity}}</div>{{/minimumActivationQuantity}}
                    {{#stepIncrementQuantity}}<div><b>stepIncrementQuantity</b>: {{stepIncrementQuantity}}</div>{{/stepIncrementQuantity}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#BidTimeSeries_collapse" aria-expanded="true" aria-controls="BidTimeSeries_collapse" style="margin-left: 10px;">BidTimeSeries</a></legend>
                    <div id="BidTimeSeries_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TimeSeries.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='blockBid'>blockBid: </label><div class='col-sm-8'><input id='blockBid' class='form-control' type='text'{{#blockBid}} value='{{blockBid}}'{{/blockBid}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='direction'>direction: </label><div class='col-sm-8'><input id='direction' class='form-control' type='text'{{#direction}} value='{{direction}}'{{/direction}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='divisible'>divisible: </label><div class='col-sm-8'><input id='divisible' class='form-control' type='text'{{#divisible}} value='{{divisible}}'{{/divisible}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='linkedBidsIdentification'>linkedBidsIdentification: </label><div class='col-sm-8'><input id='linkedBidsIdentification' class='form-control' type='text'{{#linkedBidsIdentification}} value='{{linkedBidsIdentification}}'{{/linkedBidsIdentification}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='minimumActivationQuantity'>minimumActivationQuantity: </label><div class='col-sm-8'><input id='minimumActivationQuantity' class='form-control' type='text'{{#minimumActivationQuantity}} value='{{minimumActivationQuantity}}'{{/minimumActivationQuantity}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='stepIncrementQuantity'>stepIncrementQuantity: </label><div class='col-sm-8'><input id='stepIncrementQuantity' class='form-control' type='text'{{#stepIncrementQuantity}} value='{{stepIncrementQuantity}}'{{/stepIncrementQuantity}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "BidTimeSeries" };
                super.submit (obj);
                temp = document.getElementById ("blockBid").value; if ("" != temp) obj.blockBid = temp;
                temp = document.getElementById ("direction").value; if ("" != temp) obj.direction = temp;
                temp = document.getElementById ("divisible").value; if ("" != temp) obj.divisible = temp;
                temp = document.getElementById ("linkedBidsIdentification").value; if ("" != temp) obj.linkedBidsIdentification = temp;
                temp = document.getElementById ("minimumActivationQuantity").value; if ("" != temp) obj.minimumActivationQuantity = temp;
                temp = document.getElementById ("stepIncrementQuantity").value; if ("" != temp) obj.stepIncrementQuantity = temp;

                return (obj);
            }
        }

        return (
            {
                AttributeInstanceComponent: AttributeInstanceComponent,
                FlowDirection: FlowDirection,
                Reason: Reason,
                TimeSeries: TimeSeries,
                MarketObjectStatus: MarketObjectStatus,
                MarketAgreement: MarketAgreement,
                AceTariffType: AceTariffType,
                Domain: Domain,
                MarketEvaluationPoint: MarketEvaluationPoint,
                MktPSRType: MktPSRType,
                Unit: Unit,
                Point: Point,
                Process: Process,
                Price: Price,
                Auction: Auction,
                BidTimeSeries: BidTimeSeries,
                Period: Period,
                DateAndOrTime: DateAndOrTime,
                MarketDocument: MarketDocument
            }
        );
    }
);