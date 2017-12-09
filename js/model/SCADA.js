define
(
    ["model/base", "model/Core"],
    /**
     * Contains entities to model information used by Supervisory Control and Data Acquisition (SCADA) applications.
     *
     * Supervisory control supports operator control of equipment, such as opening or closing a breaker. Data acquisition gathers telemetered data from various sources.  The subtypes of the Telemetry entity deliberately match the UCA and IEC 61850 definitions.
     *
     */
    function (base, Core)
    {

        /**
         * Type of remote unit.
         *
         */
        var RemoteUnitType =
        {
            RTU: "RTU",
            SubstationControlSystem: "SubstationControlSystem",
            ControlCenter: "ControlCenter",
            IED: "IED"
        };
        Object.freeze (RemoteUnitType);

        /**
         * Source gives information related to the origin of a value.
         *
         */
        var Source =
        {
            PROCESS: "PROCESS",
            DEFAULTED: "DEFAULTED",
            SUBSTITUTED: "SUBSTITUTED"
        };
        Object.freeze (Source);

        /**
         * For a RTU remote points correspond to telemetered values or control outputs.
         *
         * Other units (e.g. control centers) usually also contain calculated values.
         *
         */
        class RemotePoint extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.RemotePoint;
                if (null == bucket)
                   cim_data.RemotePoint = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.RemotePoint[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "RemotePoint";
                base.parse_attribute (/<cim:RemotePoint.RemoteUnit\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RemoteUnit", sub, context);
                var bucket = context.parsed.RemotePoint;
                if (null == bucket)
                   context.parsed.RemotePoint = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "RemotePoint", "RemoteUnit", "RemoteUnit", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RemotePoint_collapse" aria-expanded="true" aria-controls="RemotePoint_collapse" style="margin-left: 10px;">RemotePoint</a></legend>
                    <div id="RemotePoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#RemoteUnit}}<div><b>RemoteUnit</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{RemoteUnit}}&quot;);})'>{{RemoteUnit}}</a></div>{{/RemoteUnit}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RemotePoint_collapse" aria-expanded="true" aria-controls="RemotePoint_collapse" style="margin-left: 10px;">RemotePoint</a></legend>
                    <div id="RemotePoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='RemoteUnit'>RemoteUnit: </label><div class='col-sm-8'><input id='RemoteUnit' class='form-control' type='text'{{#RemoteUnit}} value='{{RemoteUnit}}'{{/RemoteUnit}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "RemotePoint" };
                super.submit (obj);
                temp = document.getElementById ("RemoteUnit").value; if ("" != temp) obj.RemoteUnit = temp;

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["RemoteUnit", "RemoteUnit", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A remote unit can be a RTU, IED, substation control system, control center etc.
         *
         * The communication with the remote unit can be through various standard protocols (e.g. IEC 61870, IEC 61850) or non standard protocols (e.g. DNP, RP570 etc.). A remote unit contain remote data points that might be telemetered, collected or calculated. The RemoteUnit class inherit PowerSystemResource. The intention is to allow RemotUnits to have Measurements. These Measurements can be used to model unit status as operational, out of service, unit failure etc.
         *
         */
        class RemoteUnit extends Core.PowerSystemResource
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.RemoteUnit;
                if (null == bucket)
                   cim_data.RemoteUnit = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.RemoteUnit[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.PowerSystemResource.prototype.parse.call (this, context, sub);
                obj.cls = "RemoteUnit";
                base.parse_attribute (/<cim:RemoteUnit.remoteUnitType\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "remoteUnitType", sub, context);
                base.parse_attributes (/<cim:RemoteUnit.CommunicationLinks\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "CommunicationLinks", sub, context);
                base.parse_attributes (/<cim:RemoteUnit.RemotePoints\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RemotePoints", sub, context);
                var bucket = context.parsed.RemoteUnit;
                if (null == bucket)
                   context.parsed.RemoteUnit = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.PowerSystemResource.prototype.export.call (this, obj, false);

                base.export_element (obj, "RemoteUnit", "remoteUnitType", "remoteUnitType",  base.from_string, fields);
                base.export_attributes (obj, "RemoteUnit", "CommunicationLinks", "CommunicationLinks", fields);
                base.export_attributes (obj, "RemoteUnit", "RemotePoints", "RemotePoints", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RemoteUnit_collapse" aria-expanded="true" aria-controls="RemoteUnit_collapse" style="margin-left: 10px;">RemoteUnit</a></legend>
                    <div id="RemoteUnit_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.template.call (this) +
                    `
                    {{#remoteUnitType}}<div><b>remoteUnitType</b>: {{remoteUnitType}}</div>{{/remoteUnitType}}
                    {{#CommunicationLinks}}<div><b>CommunicationLinks</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/CommunicationLinks}}
                    {{#RemotePoints}}<div><b>RemotePoints</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/RemotePoints}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.RemoteUnitType = []; if (!obj.remoteUnitType) obj.RemoteUnitType.push ({ id: '', selected: true}); for (var property in RemoteUnitType) obj.RemoteUnitType.push ({ id: property, selected: obj.remoteUnitType && obj.remoteUnitType.endsWith ('.' + property)});
                if (obj.CommunicationLinks) obj.CommunicationLinks_string = obj.CommunicationLinks.join ();
                if (obj.RemotePoints) obj.RemotePoints_string = obj.RemotePoints.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.RemoteUnitType;
                delete obj.CommunicationLinks_string;
                delete obj.RemotePoints_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RemoteUnit_collapse" aria-expanded="true" aria-controls="RemoteUnit_collapse" style="margin-left: 10px;">RemoteUnit</a></legend>
                    <div id="RemoteUnit_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='remoteUnitType'>remoteUnitType: </label><div class='col-sm-8'><select id='remoteUnitType' class='form-control'>{{#RemoteUnitType}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/RemoteUnitType}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='CommunicationLinks'>CommunicationLinks: </label><div class='col-sm-8'><input id='CommunicationLinks' class='form-control' type='text'{{#CommunicationLinks}} value='{{CommunicationLinks}}_string'{{/CommunicationLinks}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "RemoteUnit" };
                super.submit (obj);
                temp = document.getElementById ("remoteUnitType").value; if ("" != temp) { temp = RemoteUnitType[temp]; if ("undefined" != typeof (temp)) obj.remoteUnitType = "#http://iec.ch/TC57/2013/CIM-schema-cim16#RemoteUnitType." + temp; }
                temp = document.getElementById ("CommunicationLinks").value; if ("" != temp) obj.CommunicationLinks = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["CommunicationLinks", "CommunicationLink", "1..*", "0..*"],
                        ["RemotePoints", "RemotePoint", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * The connection to remote units is through one or more communication links.
         *
         * Reduntant links may exist. The CommunicationLink class inherit PowerSystemResource. The intention is to allow CommunicationLinks to have Measurements. These Measurements can be used to model link status as operational, out of service, unit failure etc.
         *
         */
        class CommunicationLink extends Core.PowerSystemResource
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.CommunicationLink;
                if (null == bucket)
                   cim_data.CommunicationLink = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.CommunicationLink[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.PowerSystemResource.prototype.parse.call (this, context, sub);
                obj.cls = "CommunicationLink";
                base.parse_attributes (/<cim:CommunicationLink.RemoteUnits\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RemoteUnits", sub, context);
                var bucket = context.parsed.CommunicationLink;
                if (null == bucket)
                   context.parsed.CommunicationLink = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.PowerSystemResource.prototype.export.call (this, obj, false);

                base.export_attributes (obj, "CommunicationLink", "RemoteUnits", "RemoteUnits", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#CommunicationLink_collapse" aria-expanded="true" aria-controls="CommunicationLink_collapse" style="margin-left: 10px;">CommunicationLink</a></legend>
                    <div id="CommunicationLink_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.template.call (this) +
                    `
                    {{#RemoteUnits}}<div><b>RemoteUnits</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/RemoteUnits}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.RemoteUnits) obj.RemoteUnits_string = obj.RemoteUnits.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.RemoteUnits_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#CommunicationLink_collapse" aria-expanded="true" aria-controls="CommunicationLink_collapse" style="margin-left: 10px;">CommunicationLink</a></legend>
                    <div id="CommunicationLink_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='RemoteUnits'>RemoteUnits: </label><div class='col-sm-8'><input id='RemoteUnits' class='form-control' type='text'{{#RemoteUnits}} value='{{RemoteUnits}}_string'{{/RemoteUnits}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "CommunicationLink" };
                super.submit (obj);
                temp = document.getElementById ("RemoteUnits").value; if ("" != temp) obj.RemoteUnits = temp.split (",");

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["RemoteUnits", "RemoteUnit", "0..*", "1..*"]
                    ]
                );
            }
        }

        /**
         * Remote sources are state variables that are telemetered or calculated within the remote unit.
         *
         */
        class RemoteSource extends RemotePoint
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.RemoteSource;
                if (null == bucket)
                   cim_data.RemoteSource = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.RemoteSource[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = RemotePoint.prototype.parse.call (this, context, sub);
                obj.cls = "RemoteSource";
                base.parse_element (/<cim:RemoteSource.deadband>([\s\S]*?)<\/cim:RemoteSource.deadband>/g, obj, "deadband", base.to_float, sub, context);
                base.parse_element (/<cim:RemoteSource.scanInterval>([\s\S]*?)<\/cim:RemoteSource.scanInterval>/g, obj, "scanInterval", base.to_string, sub, context);
                base.parse_element (/<cim:RemoteSource.sensorMaximum>([\s\S]*?)<\/cim:RemoteSource.sensorMaximum>/g, obj, "sensorMaximum", base.to_float, sub, context);
                base.parse_element (/<cim:RemoteSource.sensorMinimum>([\s\S]*?)<\/cim:RemoteSource.sensorMinimum>/g, obj, "sensorMinimum", base.to_float, sub, context);
                base.parse_attribute (/<cim:RemoteSource.MeasurementValue\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "MeasurementValue", sub, context);
                var bucket = context.parsed.RemoteSource;
                if (null == bucket)
                   context.parsed.RemoteSource = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = RemotePoint.prototype.export.call (this, obj, false);

                base.export_element (obj, "RemoteSource", "deadband", "deadband",  base.from_float, fields);
                base.export_element (obj, "RemoteSource", "scanInterval", "scanInterval",  base.from_string, fields);
                base.export_element (obj, "RemoteSource", "sensorMaximum", "sensorMaximum",  base.from_float, fields);
                base.export_element (obj, "RemoteSource", "sensorMinimum", "sensorMinimum",  base.from_float, fields);
                base.export_attribute (obj, "RemoteSource", "MeasurementValue", "MeasurementValue", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RemoteSource_collapse" aria-expanded="true" aria-controls="RemoteSource_collapse" style="margin-left: 10px;">RemoteSource</a></legend>
                    <div id="RemoteSource_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RemotePoint.prototype.template.call (this) +
                    `
                    {{#deadband}}<div><b>deadband</b>: {{deadband}}</div>{{/deadband}}
                    {{#scanInterval}}<div><b>scanInterval</b>: {{scanInterval}}</div>{{/scanInterval}}
                    {{#sensorMaximum}}<div><b>sensorMaximum</b>: {{sensorMaximum}}</div>{{/sensorMaximum}}
                    {{#sensorMinimum}}<div><b>sensorMinimum</b>: {{sensorMinimum}}</div>{{/sensorMinimum}}
                    {{#MeasurementValue}}<div><b>MeasurementValue</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{MeasurementValue}}&quot;);})'>{{MeasurementValue}}</a></div>{{/MeasurementValue}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RemoteSource_collapse" aria-expanded="true" aria-controls="RemoteSource_collapse" style="margin-left: 10px;">RemoteSource</a></legend>
                    <div id="RemoteSource_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RemotePoint.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='deadband'>deadband: </label><div class='col-sm-8'><input id='deadband' class='form-control' type='text'{{#deadband}} value='{{deadband}}'{{/deadband}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='scanInterval'>scanInterval: </label><div class='col-sm-8'><input id='scanInterval' class='form-control' type='text'{{#scanInterval}} value='{{scanInterval}}'{{/scanInterval}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='sensorMaximum'>sensorMaximum: </label><div class='col-sm-8'><input id='sensorMaximum' class='form-control' type='text'{{#sensorMaximum}} value='{{sensorMaximum}}'{{/sensorMaximum}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='sensorMinimum'>sensorMinimum: </label><div class='col-sm-8'><input id='sensorMinimum' class='form-control' type='text'{{#sensorMinimum}} value='{{sensorMinimum}}'{{/sensorMinimum}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='MeasurementValue'>MeasurementValue: </label><div class='col-sm-8'><input id='MeasurementValue' class='form-control' type='text'{{#MeasurementValue}} value='{{MeasurementValue}}'{{/MeasurementValue}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "RemoteSource" };
                super.submit (obj);
                temp = document.getElementById ("deadband").value; if ("" != temp) obj.deadband = temp;
                temp = document.getElementById ("scanInterval").value; if ("" != temp) obj.scanInterval = temp;
                temp = document.getElementById ("sensorMaximum").value; if ("" != temp) obj.sensorMaximum = temp;
                temp = document.getElementById ("sensorMinimum").value; if ("" != temp) obj.sensorMinimum = temp;
                temp = document.getElementById ("MeasurementValue").value; if ("" != temp) obj.MeasurementValue = temp;

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["MeasurementValue", "MeasurementValue", "1", "0..1"]
                    ]
                );
            }
        }

        /**
         * Remote controls are ouputs that are sent by the remote unit to actuators in the process.
         *
         */
        class RemoteControl extends RemotePoint
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.RemoteControl;
                if (null == bucket)
                   cim_data.RemoteControl = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.RemoteControl[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = RemotePoint.prototype.parse.call (this, context, sub);
                obj.cls = "RemoteControl";
                base.parse_element (/<cim:RemoteControl.actuatorMaximum>([\s\S]*?)<\/cim:RemoteControl.actuatorMaximum>/g, obj, "actuatorMaximum", base.to_float, sub, context);
                base.parse_element (/<cim:RemoteControl.actuatorMinimum>([\s\S]*?)<\/cim:RemoteControl.actuatorMinimum>/g, obj, "actuatorMinimum", base.to_float, sub, context);
                base.parse_element (/<cim:RemoteControl.remoteControlled>([\s\S]*?)<\/cim:RemoteControl.remoteControlled>/g, obj, "remoteControlled", base.to_boolean, sub, context);
                base.parse_attribute (/<cim:RemoteControl.Control\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Control", sub, context);
                var bucket = context.parsed.RemoteControl;
                if (null == bucket)
                   context.parsed.RemoteControl = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = RemotePoint.prototype.export.call (this, obj, false);

                base.export_element (obj, "RemoteControl", "actuatorMaximum", "actuatorMaximum",  base.from_float, fields);
                base.export_element (obj, "RemoteControl", "actuatorMinimum", "actuatorMinimum",  base.from_float, fields);
                base.export_element (obj, "RemoteControl", "remoteControlled", "remoteControlled",  base.from_boolean, fields);
                base.export_attribute (obj, "RemoteControl", "Control", "Control", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }

            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RemoteControl_collapse" aria-expanded="true" aria-controls="RemoteControl_collapse" style="margin-left: 10px;">RemoteControl</a></legend>
                    <div id="RemoteControl_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RemotePoint.prototype.template.call (this) +
                    `
                    {{#actuatorMaximum}}<div><b>actuatorMaximum</b>: {{actuatorMaximum}}</div>{{/actuatorMaximum}}
                    {{#actuatorMinimum}}<div><b>actuatorMinimum</b>: {{actuatorMinimum}}</div>{{/actuatorMinimum}}
                    {{#remoteControlled}}<div><b>remoteControlled</b>: {{remoteControlled}}</div>{{/remoteControlled}}
                    {{#Control}}<div><b>Control</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Control}}&quot;);})'>{{Control}}</a></div>{{/Control}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RemoteControl_collapse" aria-expanded="true" aria-controls="RemoteControl_collapse" style="margin-left: 10px;">RemoteControl</a></legend>
                    <div id="RemoteControl_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RemotePoint.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='actuatorMaximum'>actuatorMaximum: </label><div class='col-sm-8'><input id='actuatorMaximum' class='form-control' type='text'{{#actuatorMaximum}} value='{{actuatorMaximum}}'{{/actuatorMaximum}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='actuatorMinimum'>actuatorMinimum: </label><div class='col-sm-8'><input id='actuatorMinimum' class='form-control' type='text'{{#actuatorMinimum}} value='{{actuatorMinimum}}'{{/actuatorMinimum}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='remoteControlled'>remoteControlled: </label><div class='col-sm-8'><input id='remoteControlled' class='form-check-input' type='checkbox'{{#remoteControlled}} checked{{/remoteControlled}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Control'>Control: </label><div class='col-sm-8'><input id='Control' class='form-control' type='text'{{#Control}} value='{{Control}}'{{/Control}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            submit (obj)
            {
                var temp;

                var obj = obj || { cls: "RemoteControl" };
                super.submit (obj);
                temp = document.getElementById ("actuatorMaximum").value; if ("" != temp) obj.actuatorMaximum = temp;
                temp = document.getElementById ("actuatorMinimum").value; if ("" != temp) obj.actuatorMinimum = temp;
                temp = document.getElementById ("remoteControlled").checked; if (temp) obj.remoteControlled = true;
                temp = document.getElementById ("Control").value; if ("" != temp) obj.Control = temp;

                return (obj);
            }

            relations ()
            {
                return (
                    [
                        ["Control", "Control", "1", "0..1"]
                    ]
                );
            }
        }

        return (
            {
                CommunicationLink: CommunicationLink,
                RemoteSource: RemoteSource,
                RemoteUnit: RemoteUnit,
                RemotePoint: RemotePoint,
                RemoteControl: RemoteControl
            }
        );
    }
);