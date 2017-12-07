define
(
    ["model/base", "model/Core", "model/LoadModel"],
    /**
     * An extension to the Core and Topology package that models information on the electrical characteristics of Transmission and Distribution networks.
     *
     * This package is used by network applications such as State Estimation, Load Flow and Optimal Power Flow.
     *
     */
    function (base, Core, LoadModel)
    {

        /**
         * The mode of operation for a Petersen coil.
         *
         */
        var PetersenCoilModeKind =
        {
            fixed: "fixed",
            manual: "manual",
            automaticPositioning: "automaticPositioning"
        };
        Object.freeze (PetersenCoilModeKind);

        /**
         * Control modes for a transformer.
         *
         */
        var TransformerControlMode =
        {
            volt: "volt",
            reactive: "reactive"
        };
        Object.freeze (TransformerControlMode);

        /**
         * Kind of Asynchronous Machine.
         *
         */
        var AsynchronousMachineKind =
        {
            generator: "generator",
            motor: "motor"
        };
        Object.freeze (AsynchronousMachineKind);

        /**
         * Type of rotor, used by short circuit applications.
         *
         */
        var ShortCircuitRotorKind =
        {
            salientPole1: "salientPole1",
            salientPole2: "salientPole2",
            turboSeries1: "turboSeries1",
            turboSeries2: "turboSeries2"
        };
        Object.freeze (ShortCircuitRotorKind);

        /**
         * Synchronous machine type.
         *
         */
        var SynchronousMachineKind =
        {
            generator: "generator",
            condenser: "condenser",
            generatorOrCondenser: "generatorOrCondenser",
            motor: "motor",
            generatorOrMotor: "generatorOrMotor",
            motorOrCondenser: "motorOrCondenser",
            generatorOrCondenserOrMotor: "generatorOrCondenserOrMotor"
        };
        Object.freeze (SynchronousMachineKind);

        /**
         * The configuration of phase connections for a single terminal device such as a load or capactitor.
         *
         */
        var PhaseShuntConnectionKind =
        {
            D: "D",
            Y: "Y",
            Yn: "Yn",
            I: "I"
        };
        Object.freeze (PhaseShuntConnectionKind);

        /**
         * Static VAr Compensator control mode.
         *
         */
        var SVCControlMode =
        {
            reactivePower: "reactivePower",
            voltage: "voltage"
        };
        Object.freeze (SVCControlMode);

        /**
         * Enumeration of single phase identifiers.
         *
         * Allows designation of single phases for both transmission and distribution equipment, circuits and loads.
         *
         */
        var SinglePhaseKind =
        {
            A: "A",
            B: "B",
            C: "C",
            N: "N",
            s1: "s1",
            s2: "s2"
        };
        Object.freeze (SinglePhaseKind);

        /**
         * Winding connection type.
         *
         */
        var WindingConnection =
        {
            D: "D",
            Y: "Y",
            Z: "Z",
            Yn: "Yn",
            Zn: "Zn",
            A: "A",
            I: "I"
        };
        Object.freeze (WindingConnection);

        /**
         * Method of cooling a machine.
         *
         */
        var CoolantType =
        {
            air: "air",
            hydrogenGas: "hydrogenGas",
            water: "water"
        };
        Object.freeze (CoolantType);

        /**
         * Synchronous machine operating mode.
         *
         */
        var SynchronousMachineOperatingMode =
        {
            generator: "generator",
            condenser: "condenser",
            motor: "motor"
        };
        Object.freeze (SynchronousMachineOperatingMode);

        /**
         * The kind of regulation model.
         *
         * For example regulating voltage, reactive power, active power, etc.
         *
         */
        var RegulatingControlModeKind =
        {
            voltage: "voltage",
            activePower: "activePower",
            reactivePower: "reactivePower",
            currentFlow: "currentFlow",
            admittance: "admittance",
            timeScheduled: "timeScheduled",
            temperature: "temperature",
            powerFactor: "powerFactor"
        };
        Object.freeze (RegulatingControlModeKind);

        /**
         * Transformer star impedance (Pi-model) that accurately reflects impedance for transformers with 2 or 3 windings.
         *
         * For transformers with 4 or more windings, you must use TransformerMeshImpedance class.
         *
         */
        class TransformerStarImpedance extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.TransformerStarImpedance;
                if (null == bucket)
                   cim_data.TransformerStarImpedance = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.TransformerStarImpedance[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "TransformerStarImpedance";
                base.parse_element (/<cim:TransformerStarImpedance.r>([\s\S]*?)<\/cim:TransformerStarImpedance.r>/g, obj, "r", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerStarImpedance.r0>([\s\S]*?)<\/cim:TransformerStarImpedance.r0>/g, obj, "r0", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerStarImpedance.x>([\s\S]*?)<\/cim:TransformerStarImpedance.x>/g, obj, "x", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerStarImpedance.x0>([\s\S]*?)<\/cim:TransformerStarImpedance.x0>/g, obj, "x0", base.to_string, sub, context);
                base.parse_attribute (/<cim:TransformerStarImpedance.TransformerEndInfo\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TransformerEndInfo", sub, context);
                base.parse_attributes (/<cim:TransformerStarImpedance.TransformerEnd\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TransformerEnd", sub, context);
                var bucket = context.parsed.TransformerStarImpedance;
                if (null == bucket)
                   context.parsed.TransformerStarImpedance = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "TransformerStarImpedance", "r", base.from_string, fields);
                base.export_element (obj, "TransformerStarImpedance", "r0", base.from_string, fields);
                base.export_element (obj, "TransformerStarImpedance", "x", base.from_string, fields);
                base.export_element (obj, "TransformerStarImpedance", "x0", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "TransformerStarImpedance", fields);
                base.export_attribute (obj, "export_attributes", "TransformerStarImpedance", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerStarImpedance_collapse" aria-expanded="true" aria-controls="TransformerStarImpedance_collapse" style="margin-left: 10px;">TransformerStarImpedance</a></legend>
                    <div id="TransformerStarImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#r}}<div><b>r</b>: {{r}}</div>{{/r}}
                    {{#r0}}<div><b>r0</b>: {{r0}}</div>{{/r0}}
                    {{#x}}<div><b>x</b>: {{x}}</div>{{/x}}
                    {{#x0}}<div><b>x0</b>: {{x0}}</div>{{/x0}}
                    {{#TransformerEndInfo}}<div><b>TransformerEndInfo</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TransformerEndInfo}}&quot;);})'>{{TransformerEndInfo}}</a></div>{{/TransformerEndInfo}}
                    {{#TransformerEnd}}<div><b>TransformerEnd</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TransformerEnd}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TransformerEnd) obj.TransformerEnd_string = obj.TransformerEnd.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TransformerEnd_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerStarImpedance_collapse" aria-expanded="true" aria-controls="TransformerStarImpedance_collapse" style="margin-left: 10px;">TransformerStarImpedance</a></legend>
                    <div id="TransformerStarImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r'>r: </label><div class='col-sm-8'><input id='r' class='form-control' type='text'{{#r}} value='{{r}}'{{/r}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r0'>r0: </label><div class='col-sm-8'><input id='r0' class='form-control' type='text'{{#r0}} value='{{r0}}'{{/r0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x'>x: </label><div class='col-sm-8'><input id='x' class='form-control' type='text'{{#x}} value='{{x}}'{{/x}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x0'>x0: </label><div class='col-sm-8'><input id='x0' class='form-control' type='text'{{#x0}} value='{{x0}}'{{/x0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TransformerEndInfo'>TransformerEndInfo: </label><div class='col-sm-8'><input id='TransformerEndInfo' class='form-control' type='text'{{#TransformerEndInfo}} value='{{TransformerEndInfo}}'{{/TransformerEndInfo}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["TransformerEndInfo", "TransformerEndInfo", "0..1", "0..1"],
                        ["TransformerEnd", "TransformerEnd", "0..*", "0..1"]
                    ]
                );
            }
        }

        /**
         * This class represents the zero sequence line mutual coupling.
         *
         */
        class MutualCoupling extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.MutualCoupling;
                if (null == bucket)
                   cim_data.MutualCoupling = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.MutualCoupling[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "MutualCoupling";
                base.parse_element (/<cim:MutualCoupling.b0ch>([\s\S]*?)<\/cim:MutualCoupling.b0ch>/g, obj, "b0ch", base.to_string, sub, context);
                base.parse_element (/<cim:MutualCoupling.distance11>([\s\S]*?)<\/cim:MutualCoupling.distance11>/g, obj, "distance11", base.to_string, sub, context);
                base.parse_element (/<cim:MutualCoupling.distance12>([\s\S]*?)<\/cim:MutualCoupling.distance12>/g, obj, "distance12", base.to_string, sub, context);
                base.parse_element (/<cim:MutualCoupling.distance21>([\s\S]*?)<\/cim:MutualCoupling.distance21>/g, obj, "distance21", base.to_string, sub, context);
                base.parse_element (/<cim:MutualCoupling.distance22>([\s\S]*?)<\/cim:MutualCoupling.distance22>/g, obj, "distance22", base.to_string, sub, context);
                base.parse_element (/<cim:MutualCoupling.g0ch>([\s\S]*?)<\/cim:MutualCoupling.g0ch>/g, obj, "g0ch", base.to_string, sub, context);
                base.parse_element (/<cim:MutualCoupling.r0>([\s\S]*?)<\/cim:MutualCoupling.r0>/g, obj, "r0", base.to_string, sub, context);
                base.parse_element (/<cim:MutualCoupling.x0>([\s\S]*?)<\/cim:MutualCoupling.x0>/g, obj, "x0", base.to_string, sub, context);
                base.parse_attribute (/<cim:MutualCoupling.Second_Terminal\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Second_Terminal", sub, context);
                base.parse_attribute (/<cim:MutualCoupling.First_Terminal\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "First_Terminal", sub, context);
                var bucket = context.parsed.MutualCoupling;
                if (null == bucket)
                   context.parsed.MutualCoupling = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "MutualCoupling", "b0ch", base.from_string, fields);
                base.export_element (obj, "MutualCoupling", "distance11", base.from_string, fields);
                base.export_element (obj, "MutualCoupling", "distance12", base.from_string, fields);
                base.export_element (obj, "MutualCoupling", "distance21", base.from_string, fields);
                base.export_element (obj, "MutualCoupling", "distance22", base.from_string, fields);
                base.export_element (obj, "MutualCoupling", "g0ch", base.from_string, fields);
                base.export_element (obj, "MutualCoupling", "r0", base.from_string, fields);
                base.export_element (obj, "MutualCoupling", "x0", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "MutualCoupling", fields);
                base.export_attribute (obj, "export_attribute", "MutualCoupling", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MutualCoupling_collapse" aria-expanded="true" aria-controls="MutualCoupling_collapse" style="margin-left: 10px;">MutualCoupling</a></legend>
                    <div id="MutualCoupling_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#b0ch}}<div><b>b0ch</b>: {{b0ch}}</div>{{/b0ch}}
                    {{#distance11}}<div><b>distance11</b>: {{distance11}}</div>{{/distance11}}
                    {{#distance12}}<div><b>distance12</b>: {{distance12}}</div>{{/distance12}}
                    {{#distance21}}<div><b>distance21</b>: {{distance21}}</div>{{/distance21}}
                    {{#distance22}}<div><b>distance22</b>: {{distance22}}</div>{{/distance22}}
                    {{#g0ch}}<div><b>g0ch</b>: {{g0ch}}</div>{{/g0ch}}
                    {{#r0}}<div><b>r0</b>: {{r0}}</div>{{/r0}}
                    {{#x0}}<div><b>x0</b>: {{x0}}</div>{{/x0}}
                    {{#Second_Terminal}}<div><b>Second_Terminal</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Second_Terminal}}&quot;);})'>{{Second_Terminal}}</a></div>{{/Second_Terminal}}
                    {{#First_Terminal}}<div><b>First_Terminal</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{First_Terminal}}&quot;);})'>{{First_Terminal}}</a></div>{{/First_Terminal}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#MutualCoupling_collapse" aria-expanded="true" aria-controls="MutualCoupling_collapse" style="margin-left: 10px;">MutualCoupling</a></legend>
                    <div id="MutualCoupling_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b0ch'>b0ch: </label><div class='col-sm-8'><input id='b0ch' class='form-control' type='text'{{#b0ch}} value='{{b0ch}}'{{/b0ch}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='distance11'>distance11: </label><div class='col-sm-8'><input id='distance11' class='form-control' type='text'{{#distance11}} value='{{distance11}}'{{/distance11}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='distance12'>distance12: </label><div class='col-sm-8'><input id='distance12' class='form-control' type='text'{{#distance12}} value='{{distance12}}'{{/distance12}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='distance21'>distance21: </label><div class='col-sm-8'><input id='distance21' class='form-control' type='text'{{#distance21}} value='{{distance21}}'{{/distance21}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='distance22'>distance22: </label><div class='col-sm-8'><input id='distance22' class='form-control' type='text'{{#distance22}} value='{{distance22}}'{{/distance22}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g0ch'>g0ch: </label><div class='col-sm-8'><input id='g0ch' class='form-control' type='text'{{#g0ch}} value='{{g0ch}}'{{/g0ch}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r0'>r0: </label><div class='col-sm-8'><input id='r0' class='form-control' type='text'{{#r0}} value='{{r0}}'{{/r0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x0'>x0: </label><div class='col-sm-8'><input id='x0' class='form-control' type='text'{{#x0}} value='{{x0}}'{{/x0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Second_Terminal'>Second_Terminal: </label><div class='col-sm-8'><input id='Second_Terminal' class='form-control' type='text'{{#Second_Terminal}} value='{{Second_Terminal}}'{{/Second_Terminal}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='First_Terminal'>First_Terminal: </label><div class='col-sm-8'><input id='First_Terminal' class='form-control' type='text'{{#First_Terminal}} value='{{First_Terminal}}'{{/First_Terminal}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["Second_Terminal", "Terminal", "1", "0..*"],
                        ["First_Terminal", "Terminal", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Generic user of energy - a  point of consumption on the power system model.
         *
         */
        class EnergyConsumer extends Core.ConductingEquipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.EnergyConsumer;
                if (null == bucket)
                   cim_data.EnergyConsumer = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.EnergyConsumer[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.ConductingEquipment.prototype.parse.call (this, context, sub);
                obj.cls = "EnergyConsumer";
                base.parse_element (/<cim:EnergyConsumer.customerCount>([\s\S]*?)<\/cim:EnergyConsumer.customerCount>/g, obj, "customerCount", base.to_string, sub, context);
                base.parse_element (/<cim:EnergyConsumer.grounded>([\s\S]*?)<\/cim:EnergyConsumer.grounded>/g, obj, "grounded", base.to_boolean, sub, context);
                base.parse_element (/<cim:EnergyConsumer.pfixed>([\s\S]*?)<\/cim:EnergyConsumer.pfixed>/g, obj, "pfixed", base.to_string, sub, context);
                base.parse_element (/<cim:EnergyConsumer.pfixedPct>([\s\S]*?)<\/cim:EnergyConsumer.pfixedPct>/g, obj, "pfixedPct", base.to_string, sub, context);
                base.parse_attribute (/<cim:EnergyConsumer.phaseConnection\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "phaseConnection", sub, context);
                base.parse_element (/<cim:EnergyConsumer.qfixed>([\s\S]*?)<\/cim:EnergyConsumer.qfixed>/g, obj, "qfixed", base.to_string, sub, context);
                base.parse_element (/<cim:EnergyConsumer.qfixedPct>([\s\S]*?)<\/cim:EnergyConsumer.qfixedPct>/g, obj, "qfixedPct", base.to_string, sub, context);
                base.parse_element (/<cim:EnergyConsumer.p>([\s\S]*?)<\/cim:EnergyConsumer.p>/g, obj, "p", base.to_string, sub, context);
                base.parse_element (/<cim:EnergyConsumer.q>([\s\S]*?)<\/cim:EnergyConsumer.q>/g, obj, "q", base.to_string, sub, context);
                base.parse_attribute (/<cim:EnergyConsumer.PowerCutZone\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PowerCutZone", sub, context);
                base.parse_attributes (/<cim:EnergyConsumer.EnergyConsumerPhase\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "EnergyConsumerPhase", sub, context);
                base.parse_attribute (/<cim:EnergyConsumer.LoadDynamics\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "LoadDynamics", sub, context);
                base.parse_attribute (/<cim:EnergyConsumer.LoadResponse\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "LoadResponse", sub, context);
                var bucket = context.parsed.EnergyConsumer;
                if (null == bucket)
                   context.parsed.EnergyConsumer = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.ConductingEquipment.prototype.export.call (this, obj, false);

                base.export_element (obj, "EnergyConsumer", "customerCount", base.from_string, fields);
                base.export_element (obj, "EnergyConsumer", "grounded", base.from_boolean, fields);
                base.export_element (obj, "EnergyConsumer", "pfixed", base.from_string, fields);
                base.export_element (obj, "EnergyConsumer", "pfixedPct", base.from_string, fields);
                base.export_element (obj, "EnergyConsumer", "phaseConnection", base.from_string, fields);
                base.export_element (obj, "EnergyConsumer", "qfixed", base.from_string, fields);
                base.export_element (obj, "EnergyConsumer", "qfixedPct", base.from_string, fields);
                base.export_element (obj, "EnergyConsumer", "p", base.from_string, fields);
                base.export_element (obj, "EnergyConsumer", "q", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "EnergyConsumer", fields);
                base.export_attribute (obj, "export_attributes", "EnergyConsumer", fields);
                base.export_attribute (obj, "export_attribute", "EnergyConsumer", fields);
                base.export_attribute (obj, "export_attribute", "EnergyConsumer", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#EnergyConsumer_collapse" aria-expanded="true" aria-controls="EnergyConsumer_collapse" style="margin-left: 10px;">EnergyConsumer</a></legend>
                    <div id="EnergyConsumer_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.template.call (this) +
                    `
                    {{#customerCount}}<div><b>customerCount</b>: {{customerCount}}</div>{{/customerCount}}
                    {{#grounded}}<div><b>grounded</b>: {{grounded}}</div>{{/grounded}}
                    {{#pfixed}}<div><b>pfixed</b>: {{pfixed}}</div>{{/pfixed}}
                    {{#pfixedPct}}<div><b>pfixedPct</b>: {{pfixedPct}}</div>{{/pfixedPct}}
                    {{#phaseConnection}}<div><b>phaseConnection</b>: {{phaseConnection}}</div>{{/phaseConnection}}
                    {{#qfixed}}<div><b>qfixed</b>: {{qfixed}}</div>{{/qfixed}}
                    {{#qfixedPct}}<div><b>qfixedPct</b>: {{qfixedPct}}</div>{{/qfixedPct}}
                    {{#p}}<div><b>p</b>: {{p}}</div>{{/p}}
                    {{#q}}<div><b>q</b>: {{q}}</div>{{/q}}
                    {{#PowerCutZone}}<div><b>PowerCutZone</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{PowerCutZone}}&quot;);})'>{{PowerCutZone}}</a></div>{{/PowerCutZone}}
                    {{#EnergyConsumerPhase}}<div><b>EnergyConsumerPhase</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/EnergyConsumerPhase}}
                    {{#LoadDynamics}}<div><b>LoadDynamics</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{LoadDynamics}}&quot;);})'>{{LoadDynamics}}</a></div>{{/LoadDynamics}}
                    {{#LoadResponse}}<div><b>LoadResponse</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{LoadResponse}}&quot;);})'>{{LoadResponse}}</a></div>{{/LoadResponse}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.PhaseShuntConnectionKind = []; if (!obj.phaseConnection) obj.PhaseShuntConnectionKind.push ({ id: '', selected: true}); for (var property in PhaseShuntConnectionKind) obj.PhaseShuntConnectionKind.push ({ id: property, selected: obj.phaseConnection && obj.phaseConnection.endsWith ('.' + property)});
                if (obj.EnergyConsumerPhase) obj.EnergyConsumerPhase_string = obj.EnergyConsumerPhase.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.PhaseShuntConnectionKind;
                delete obj.EnergyConsumerPhase_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#EnergyConsumer_collapse" aria-expanded="true" aria-controls="EnergyConsumer_collapse" style="margin-left: 10px;">EnergyConsumer</a></legend>
                    <div id="EnergyConsumer_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='customerCount'>customerCount: </label><div class='col-sm-8'><input id='customerCount' class='form-control' type='text'{{#customerCount}} value='{{customerCount}}'{{/customerCount}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='grounded'>grounded: </label><div class='col-sm-8'><input id='grounded' class='form-check-input' type='checkbox'{{#grounded}} checked{{/grounded}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='pfixed'>pfixed: </label><div class='col-sm-8'><input id='pfixed' class='form-control' type='text'{{#pfixed}} value='{{pfixed}}'{{/pfixed}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='pfixedPct'>pfixedPct: </label><div class='col-sm-8'><input id='pfixedPct' class='form-control' type='text'{{#pfixedPct}} value='{{pfixedPct}}'{{/pfixedPct}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='phaseConnection'>phaseConnection: </label><div class='col-sm-8'><select id='phaseConnection' class='form-control'>{{#PhaseShuntConnectionKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/PhaseShuntConnectionKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='qfixed'>qfixed: </label><div class='col-sm-8'><input id='qfixed' class='form-control' type='text'{{#qfixed}} value='{{qfixed}}'{{/qfixed}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='qfixedPct'>qfixedPct: </label><div class='col-sm-8'><input id='qfixedPct' class='form-control' type='text'{{#qfixedPct}} value='{{qfixedPct}}'{{/qfixedPct}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='p'>p: </label><div class='col-sm-8'><input id='p' class='form-control' type='text'{{#p}} value='{{p}}'{{/p}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='q'>q: </label><div class='col-sm-8'><input id='q' class='form-control' type='text'{{#q}} value='{{q}}'{{/q}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='PowerCutZone'>PowerCutZone: </label><div class='col-sm-8'><input id='PowerCutZone' class='form-control' type='text'{{#PowerCutZone}} value='{{PowerCutZone}}'{{/PowerCutZone}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='LoadDynamics'>LoadDynamics: </label><div class='col-sm-8'><input id='LoadDynamics' class='form-control' type='text'{{#LoadDynamics}} value='{{LoadDynamics}}'{{/LoadDynamics}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='LoadResponse'>LoadResponse: </label><div class='col-sm-8'><input id='LoadResponse' class='form-control' type='text'{{#LoadResponse}} value='{{LoadResponse}}'{{/LoadResponse}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["PowerCutZone", "PowerCutZone", "0..1", "1..*"],
                        ["EnergyConsumerPhase", "EnergyConsumerPhase", "0..*", "1"],
                        ["LoadDynamics", "LoadDynamics", "0..1", "0..*"],
                        ["LoadResponse", "LoadResponseCharacteristic", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A Series Compensator is a series capacitor or reactor or an AC transmission line without charging susceptance.
         *
         * It is a two terminal device.
         *
         */
        class SeriesCompensator extends Core.ConductingEquipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.SeriesCompensator;
                if (null == bucket)
                   cim_data.SeriesCompensator = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.SeriesCompensator[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.ConductingEquipment.prototype.parse.call (this, context, sub);
                obj.cls = "SeriesCompensator";
                base.parse_element (/<cim:SeriesCompensator.r>([\s\S]*?)<\/cim:SeriesCompensator.r>/g, obj, "r", base.to_string, sub, context);
                base.parse_element (/<cim:SeriesCompensator.r0>([\s\S]*?)<\/cim:SeriesCompensator.r0>/g, obj, "r0", base.to_string, sub, context);
                base.parse_element (/<cim:SeriesCompensator.x>([\s\S]*?)<\/cim:SeriesCompensator.x>/g, obj, "x", base.to_string, sub, context);
                base.parse_element (/<cim:SeriesCompensator.x0>([\s\S]*?)<\/cim:SeriesCompensator.x0>/g, obj, "x0", base.to_string, sub, context);
                base.parse_element (/<cim:SeriesCompensator.varistorPresent>([\s\S]*?)<\/cim:SeriesCompensator.varistorPresent>/g, obj, "varistorPresent", base.to_boolean, sub, context);
                base.parse_element (/<cim:SeriesCompensator.varistorRatedCurrent>([\s\S]*?)<\/cim:SeriesCompensator.varistorRatedCurrent>/g, obj, "varistorRatedCurrent", base.to_string, sub, context);
                base.parse_element (/<cim:SeriesCompensator.varistorVoltageThreshold>([\s\S]*?)<\/cim:SeriesCompensator.varistorVoltageThreshold>/g, obj, "varistorVoltageThreshold", base.to_string, sub, context);
                var bucket = context.parsed.SeriesCompensator;
                if (null == bucket)
                   context.parsed.SeriesCompensator = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.ConductingEquipment.prototype.export.call (this, obj, false);

                base.export_element (obj, "SeriesCompensator", "r", base.from_string, fields);
                base.export_element (obj, "SeriesCompensator", "r0", base.from_string, fields);
                base.export_element (obj, "SeriesCompensator", "x", base.from_string, fields);
                base.export_element (obj, "SeriesCompensator", "x0", base.from_string, fields);
                base.export_element (obj, "SeriesCompensator", "varistorPresent", base.from_boolean, fields);
                base.export_element (obj, "SeriesCompensator", "varistorRatedCurrent", base.from_string, fields);
                base.export_element (obj, "SeriesCompensator", "varistorVoltageThreshold", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#SeriesCompensator_collapse" aria-expanded="true" aria-controls="SeriesCompensator_collapse" style="margin-left: 10px;">SeriesCompensator</a></legend>
                    <div id="SeriesCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.template.call (this) +
                    `
                    {{#r}}<div><b>r</b>: {{r}}</div>{{/r}}
                    {{#r0}}<div><b>r0</b>: {{r0}}</div>{{/r0}}
                    {{#x}}<div><b>x</b>: {{x}}</div>{{/x}}
                    {{#x0}}<div><b>x0</b>: {{x0}}</div>{{/x0}}
                    {{#varistorPresent}}<div><b>varistorPresent</b>: {{varistorPresent}}</div>{{/varistorPresent}}
                    {{#varistorRatedCurrent}}<div><b>varistorRatedCurrent</b>: {{varistorRatedCurrent}}</div>{{/varistorRatedCurrent}}
                    {{#varistorVoltageThreshold}}<div><b>varistorVoltageThreshold</b>: {{varistorVoltageThreshold}}</div>{{/varistorVoltageThreshold}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#SeriesCompensator_collapse" aria-expanded="true" aria-controls="SeriesCompensator_collapse" style="margin-left: 10px;">SeriesCompensator</a></legend>
                    <div id="SeriesCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r'>r: </label><div class='col-sm-8'><input id='r' class='form-control' type='text'{{#r}} value='{{r}}'{{/r}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r0'>r0: </label><div class='col-sm-8'><input id='r0' class='form-control' type='text'{{#r0}} value='{{r0}}'{{/r0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x'>x: </label><div class='col-sm-8'><input id='x' class='form-control' type='text'{{#x}} value='{{x}}'{{/x}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x0'>x0: </label><div class='col-sm-8'><input id='x0' class='form-control' type='text'{{#x0}} value='{{x0}}'{{/x0}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='varistorPresent'>varistorPresent: </label><div class='col-sm-8'><input id='varistorPresent' class='form-check-input' type='checkbox'{{#varistorPresent}} checked{{/varistorPresent}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='varistorRatedCurrent'>varistorRatedCurrent: </label><div class='col-sm-8'><input id='varistorRatedCurrent' class='form-control' type='text'{{#varistorRatedCurrent}} value='{{varistorRatedCurrent}}'{{/varistorRatedCurrent}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='varistorVoltageThreshold'>varistorVoltageThreshold: </label><div class='col-sm-8'><input id='varistorVoltageThreshold' class='form-control' type='text'{{#varistorVoltageThreshold}} value='{{varistorVoltageThreshold}}'{{/varistorVoltageThreshold}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A generic device designed to close, or open, or both, one or more electric circuits.
         *
         * All switches are two terminal devices including grounding switches.
         *
         */
        class Switch extends Core.ConductingEquipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Switch;
                if (null == bucket)
                   cim_data.Switch = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Switch[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.ConductingEquipment.prototype.parse.call (this, context, sub);
                obj.cls = "Switch";
                base.parse_element (/<cim:Switch.normalOpen>([\s\S]*?)<\/cim:Switch.normalOpen>/g, obj, "normalOpen", base.to_boolean, sub, context);
                base.parse_element (/<cim:Switch.ratedCurrent>([\s\S]*?)<\/cim:Switch.ratedCurrent>/g, obj, "ratedCurrent", base.to_string, sub, context);
                base.parse_element (/<cim:Switch.retained>([\s\S]*?)<\/cim:Switch.retained>/g, obj, "retained", base.to_boolean, sub, context);
                base.parse_element (/<cim:Switch.switchOnCount>([\s\S]*?)<\/cim:Switch.switchOnCount>/g, obj, "switchOnCount", base.to_string, sub, context);
                base.parse_element (/<cim:Switch.switchOnDate>([\s\S]*?)<\/cim:Switch.switchOnDate>/g, obj, "switchOnDate", base.to_datetime, sub, context);
                base.parse_element (/<cim:Switch.open>([\s\S]*?)<\/cim:Switch.open>/g, obj, "open", base.to_boolean, sub, context);
                base.parse_attribute (/<cim:Switch.Outage\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Outage", sub, context);
                base.parse_attribute (/<cim:Switch.CompositeSwitch\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "CompositeSwitch", sub, context);
                base.parse_attributes (/<cim:Switch.ConnectDisconnectFunctions\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ConnectDisconnectFunctions", sub, context);
                base.parse_attribute (/<cim:Switch.SwitchAction\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "SwitchAction", sub, context);
                base.parse_attributes (/<cim:Switch.SwitchSchedules\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "SwitchSchedules", sub, context);
                base.parse_attributes (/<cim:Switch.SwitchPhase\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "SwitchPhase", sub, context);
                var bucket = context.parsed.Switch;
                if (null == bucket)
                   context.parsed.Switch = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.ConductingEquipment.prototype.export.call (this, obj, false);

                base.export_element (obj, "Switch", "normalOpen", base.from_boolean, fields);
                base.export_element (obj, "Switch", "ratedCurrent", base.from_string, fields);
                base.export_element (obj, "Switch", "retained", base.from_boolean, fields);
                base.export_element (obj, "Switch", "switchOnCount", base.from_string, fields);
                base.export_element (obj, "Switch", "switchOnDate", base.from_datetime, fields);
                base.export_element (obj, "Switch", "open", base.from_boolean, fields);
                base.export_attribute (obj, "export_attribute", "Switch", fields);
                base.export_attribute (obj, "export_attribute", "Switch", fields);
                base.export_attribute (obj, "export_attributes", "Switch", fields);
                base.export_attribute (obj, "export_attribute", "Switch", fields);
                base.export_attribute (obj, "export_attributes", "Switch", fields);
                base.export_attribute (obj, "export_attributes", "Switch", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Switch_collapse" aria-expanded="true" aria-controls="Switch_collapse" style="margin-left: 10px;">Switch</a></legend>
                    <div id="Switch_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.template.call (this) +
                    `
                    {{#normalOpen}}<div><b>normalOpen</b>: {{normalOpen}}</div>{{/normalOpen}}
                    {{#ratedCurrent}}<div><b>ratedCurrent</b>: {{ratedCurrent}}</div>{{/ratedCurrent}}
                    {{#retained}}<div><b>retained</b>: {{retained}}</div>{{/retained}}
                    {{#switchOnCount}}<div><b>switchOnCount</b>: {{switchOnCount}}</div>{{/switchOnCount}}
                    {{#switchOnDate}}<div><b>switchOnDate</b>: {{switchOnDate}}</div>{{/switchOnDate}}
                    {{#open}}<div><b>open</b>: {{open}}</div>{{/open}}
                    {{#Outage}}<div><b>Outage</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Outage}}&quot;);})'>{{Outage}}</a></div>{{/Outage}}
                    {{#CompositeSwitch}}<div><b>CompositeSwitch</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{CompositeSwitch}}&quot;);})'>{{CompositeSwitch}}</a></div>{{/CompositeSwitch}}
                    {{#ConnectDisconnectFunctions}}<div><b>ConnectDisconnectFunctions</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ConnectDisconnectFunctions}}
                    {{#SwitchAction}}<div><b>SwitchAction</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{SwitchAction}}&quot;);})'>{{SwitchAction}}</a></div>{{/SwitchAction}}
                    {{#SwitchSchedules}}<div><b>SwitchSchedules</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/SwitchSchedules}}
                    {{#SwitchPhase}}<div><b>SwitchPhase</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/SwitchPhase}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ConnectDisconnectFunctions) obj.ConnectDisconnectFunctions_string = obj.ConnectDisconnectFunctions.join ();
                if (obj.SwitchSchedules) obj.SwitchSchedules_string = obj.SwitchSchedules.join ();
                if (obj.SwitchPhase) obj.SwitchPhase_string = obj.SwitchPhase.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ConnectDisconnectFunctions_string;
                delete obj.SwitchSchedules_string;
                delete obj.SwitchPhase_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Switch_collapse" aria-expanded="true" aria-controls="Switch_collapse" style="margin-left: 10px;">Switch</a></legend>
                    <div id="Switch_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='normalOpen'>normalOpen: </label><div class='col-sm-8'><input id='normalOpen' class='form-check-input' type='checkbox'{{#normalOpen}} checked{{/normalOpen}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ratedCurrent'>ratedCurrent: </label><div class='col-sm-8'><input id='ratedCurrent' class='form-control' type='text'{{#ratedCurrent}} value='{{ratedCurrent}}'{{/ratedCurrent}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='retained'>retained: </label><div class='col-sm-8'><input id='retained' class='form-check-input' type='checkbox'{{#retained}} checked{{/retained}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='switchOnCount'>switchOnCount: </label><div class='col-sm-8'><input id='switchOnCount' class='form-control' type='text'{{#switchOnCount}} value='{{switchOnCount}}'{{/switchOnCount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='switchOnDate'>switchOnDate: </label><div class='col-sm-8'><input id='switchOnDate' class='form-control' type='text'{{#switchOnDate}} value='{{switchOnDate}}'{{/switchOnDate}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='open'>open: </label><div class='col-sm-8'><input id='open' class='form-check-input' type='checkbox'{{#open}} checked{{/open}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Outage'>Outage: </label><div class='col-sm-8'><input id='Outage' class='form-control' type='text'{{#Outage}} value='{{Outage}}'{{/Outage}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='CompositeSwitch'>CompositeSwitch: </label><div class='col-sm-8'><input id='CompositeSwitch' class='form-control' type='text'{{#CompositeSwitch}} value='{{CompositeSwitch}}'{{/CompositeSwitch}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ConnectDisconnectFunctions'>ConnectDisconnectFunctions: </label><div class='col-sm-8'><input id='ConnectDisconnectFunctions' class='form-control' type='text'{{#ConnectDisconnectFunctions}} value='{{ConnectDisconnectFunctions}}_string'{{/ConnectDisconnectFunctions}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='SwitchAction'>SwitchAction: </label><div class='col-sm-8'><input id='SwitchAction' class='form-control' type='text'{{#SwitchAction}} value='{{SwitchAction}}'{{/SwitchAction}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["Outage", "Outage", "0..1", "0..*"],
                        ["CompositeSwitch", "CompositeSwitch", "0..1", "0..*"],
                        ["ConnectDisconnectFunctions", "ConnectDisconnectFunction", "0..*", "0..*"],
                        ["SwitchAction", "SwitchAction", "0..1", "0..1"],
                        ["SwitchSchedules", "SwitchSchedule", "0..*", "1"],
                        ["SwitchPhase", "SwitchPhase", "0..*", "1"]
                    ]
                );
            }
        }

        /**
         * The transformer core admittance.
         *
         * Used to specify the core admittance of a transformer in a manner that can be shared among power transformers.
         *
         */
        class TransformerCoreAdmittance extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.TransformerCoreAdmittance;
                if (null == bucket)
                   cim_data.TransformerCoreAdmittance = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.TransformerCoreAdmittance[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "TransformerCoreAdmittance";
                base.parse_element (/<cim:TransformerCoreAdmittance.b>([\s\S]*?)<\/cim:TransformerCoreAdmittance.b>/g, obj, "b", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerCoreAdmittance.b0>([\s\S]*?)<\/cim:TransformerCoreAdmittance.b0>/g, obj, "b0", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerCoreAdmittance.g>([\s\S]*?)<\/cim:TransformerCoreAdmittance.g>/g, obj, "g", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerCoreAdmittance.g0>([\s\S]*?)<\/cim:TransformerCoreAdmittance.g0>/g, obj, "g0", base.to_string, sub, context);
                base.parse_attributes (/<cim:TransformerCoreAdmittance.TransformerEnd\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TransformerEnd", sub, context);
                base.parse_attribute (/<cim:TransformerCoreAdmittance.TransformerEndInfo\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TransformerEndInfo", sub, context);
                var bucket = context.parsed.TransformerCoreAdmittance;
                if (null == bucket)
                   context.parsed.TransformerCoreAdmittance = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "TransformerCoreAdmittance", "b", base.from_string, fields);
                base.export_element (obj, "TransformerCoreAdmittance", "b0", base.from_string, fields);
                base.export_element (obj, "TransformerCoreAdmittance", "g", base.from_string, fields);
                base.export_element (obj, "TransformerCoreAdmittance", "g0", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "TransformerCoreAdmittance", fields);
                base.export_attribute (obj, "export_attribute", "TransformerCoreAdmittance", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerCoreAdmittance_collapse" aria-expanded="true" aria-controls="TransformerCoreAdmittance_collapse" style="margin-left: 10px;">TransformerCoreAdmittance</a></legend>
                    <div id="TransformerCoreAdmittance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#b}}<div><b>b</b>: {{b}}</div>{{/b}}
                    {{#b0}}<div><b>b0</b>: {{b0}}</div>{{/b0}}
                    {{#g}}<div><b>g</b>: {{g}}</div>{{/g}}
                    {{#g0}}<div><b>g0</b>: {{g0}}</div>{{/g0}}
                    {{#TransformerEnd}}<div><b>TransformerEnd</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TransformerEnd}}
                    {{#TransformerEndInfo}}<div><b>TransformerEndInfo</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TransformerEndInfo}}&quot;);})'>{{TransformerEndInfo}}</a></div>{{/TransformerEndInfo}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TransformerEnd) obj.TransformerEnd_string = obj.TransformerEnd.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TransformerEnd_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerCoreAdmittance_collapse" aria-expanded="true" aria-controls="TransformerCoreAdmittance_collapse" style="margin-left: 10px;">TransformerCoreAdmittance</a></legend>
                    <div id="TransformerCoreAdmittance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b'>b: </label><div class='col-sm-8'><input id='b' class='form-control' type='text'{{#b}} value='{{b}}'{{/b}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b0'>b0: </label><div class='col-sm-8'><input id='b0' class='form-control' type='text'{{#b0}} value='{{b0}}'{{/b0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g'>g: </label><div class='col-sm-8'><input id='g' class='form-control' type='text'{{#g}} value='{{g}}'{{/g}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g0'>g0: </label><div class='col-sm-8'><input id='g0' class='form-control' type='text'{{#g0}} value='{{g0}}'{{/g0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TransformerEndInfo'>TransformerEndInfo: </label><div class='col-sm-8'><input id='TransformerEndInfo' class='form-control' type='text'{{#TransformerEndInfo}} value='{{TransformerEndInfo}}'{{/TransformerEndInfo}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["TransformerEnd", "TransformerEnd", "0..*", "0..1"],
                        ["TransformerEndInfo", "TransformerEndInfo", "0..1", "0..1"]
                    ]
                );
            }
        }

        /**
         * An area of the power system network which is defined for secondary voltage control purposes.
         *
         * A voltage control zone consists of a collection of substations with a designated bus bar section whose voltage will be controlled.
         *
         */
        class VoltageControlZone extends Core.PowerSystemResource
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.VoltageControlZone;
                if (null == bucket)
                   cim_data.VoltageControlZone = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.VoltageControlZone[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.PowerSystemResource.prototype.parse.call (this, context, sub);
                obj.cls = "VoltageControlZone";
                base.parse_attribute (/<cim:VoltageControlZone.RegulationSchedule\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RegulationSchedule", sub, context);
                base.parse_attribute (/<cim:VoltageControlZone.BusbarSection\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "BusbarSection", sub, context);
                var bucket = context.parsed.VoltageControlZone;
                if (null == bucket)
                   context.parsed.VoltageControlZone = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.PowerSystemResource.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "VoltageControlZone", fields);
                base.export_attribute (obj, "export_attribute", "VoltageControlZone", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#VoltageControlZone_collapse" aria-expanded="true" aria-controls="VoltageControlZone_collapse" style="margin-left: 10px;">VoltageControlZone</a></legend>
                    <div id="VoltageControlZone_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.template.call (this) +
                    `
                    {{#RegulationSchedule}}<div><b>RegulationSchedule</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{RegulationSchedule}}&quot;);})'>{{RegulationSchedule}}</a></div>{{/RegulationSchedule}}
                    {{#BusbarSection}}<div><b>BusbarSection</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{BusbarSection}}&quot;);})'>{{BusbarSection}}</a></div>{{/BusbarSection}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#VoltageControlZone_collapse" aria-expanded="true" aria-controls="VoltageControlZone_collapse" style="margin-left: 10px;">VoltageControlZone</a></legend>
                    <div id="VoltageControlZone_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='RegulationSchedule'>RegulationSchedule: </label><div class='col-sm-8'><input id='RegulationSchedule' class='form-control' type='text'{{#RegulationSchedule}} value='{{RegulationSchedule}}'{{/RegulationSchedule}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='BusbarSection'>BusbarSection: </label><div class='col-sm-8'><input id='BusbarSection' class='form-control' type='text'{{#BusbarSection}} value='{{BusbarSection}}'{{/BusbarSection}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["RegulationSchedule", "RegulationSchedule", "0..1", "0..*"],
                        ["BusbarSection", "BusbarSection", "1", "0..1"]
                    ]
                );
            }
        }

        /**
         * Transformer mesh impedance (Delta-model) between transformer ends.
         *
         * The typical case is that this class describes the impedance between two transformer ends pair-wise, i.e. the cardinalities at both tranformer end associations are 1. But in cases where two or more transformer ends are modeled the cardinalities are larger than 1.
         *
         */
        class TransformerMeshImpedance extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.TransformerMeshImpedance;
                if (null == bucket)
                   cim_data.TransformerMeshImpedance = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.TransformerMeshImpedance[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "TransformerMeshImpedance";
                base.parse_element (/<cim:TransformerMeshImpedance.r>([\s\S]*?)<\/cim:TransformerMeshImpedance.r>/g, obj, "r", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerMeshImpedance.r0>([\s\S]*?)<\/cim:TransformerMeshImpedance.r0>/g, obj, "r0", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerMeshImpedance.x>([\s\S]*?)<\/cim:TransformerMeshImpedance.x>/g, obj, "x", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerMeshImpedance.x0>([\s\S]*?)<\/cim:TransformerMeshImpedance.x0>/g, obj, "x0", base.to_string, sub, context);
                base.parse_attributes (/<cim:TransformerMeshImpedance.ToTransformerEnd\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ToTransformerEnd", sub, context);
                base.parse_attributes (/<cim:TransformerMeshImpedance.ToTransformerEndInfos\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ToTransformerEndInfos", sub, context);
                base.parse_attribute (/<cim:TransformerMeshImpedance.FromTransformerEndInfo\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "FromTransformerEndInfo", sub, context);
                base.parse_attribute (/<cim:TransformerMeshImpedance.FromTransformerEnd\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "FromTransformerEnd", sub, context);
                var bucket = context.parsed.TransformerMeshImpedance;
                if (null == bucket)
                   context.parsed.TransformerMeshImpedance = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "TransformerMeshImpedance", "r", base.from_string, fields);
                base.export_element (obj, "TransformerMeshImpedance", "r0", base.from_string, fields);
                base.export_element (obj, "TransformerMeshImpedance", "x", base.from_string, fields);
                base.export_element (obj, "TransformerMeshImpedance", "x0", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "TransformerMeshImpedance", fields);
                base.export_attribute (obj, "export_attributes", "TransformerMeshImpedance", fields);
                base.export_attribute (obj, "export_attribute", "TransformerMeshImpedance", fields);
                base.export_attribute (obj, "export_attribute", "TransformerMeshImpedance", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerMeshImpedance_collapse" aria-expanded="true" aria-controls="TransformerMeshImpedance_collapse" style="margin-left: 10px;">TransformerMeshImpedance</a></legend>
                    <div id="TransformerMeshImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#r}}<div><b>r</b>: {{r}}</div>{{/r}}
                    {{#r0}}<div><b>r0</b>: {{r0}}</div>{{/r0}}
                    {{#x}}<div><b>x</b>: {{x}}</div>{{/x}}
                    {{#x0}}<div><b>x0</b>: {{x0}}</div>{{/x0}}
                    {{#ToTransformerEnd}}<div><b>ToTransformerEnd</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ToTransformerEnd}}
                    {{#ToTransformerEndInfos}}<div><b>ToTransformerEndInfos</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ToTransformerEndInfos}}
                    {{#FromTransformerEndInfo}}<div><b>FromTransformerEndInfo</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{FromTransformerEndInfo}}&quot;);})'>{{FromTransformerEndInfo}}</a></div>{{/FromTransformerEndInfo}}
                    {{#FromTransformerEnd}}<div><b>FromTransformerEnd</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{FromTransformerEnd}}&quot;);})'>{{FromTransformerEnd}}</a></div>{{/FromTransformerEnd}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ToTransformerEnd) obj.ToTransformerEnd_string = obj.ToTransformerEnd.join ();
                if (obj.ToTransformerEndInfos) obj.ToTransformerEndInfos_string = obj.ToTransformerEndInfos.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ToTransformerEnd_string;
                delete obj.ToTransformerEndInfos_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerMeshImpedance_collapse" aria-expanded="true" aria-controls="TransformerMeshImpedance_collapse" style="margin-left: 10px;">TransformerMeshImpedance</a></legend>
                    <div id="TransformerMeshImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r'>r: </label><div class='col-sm-8'><input id='r' class='form-control' type='text'{{#r}} value='{{r}}'{{/r}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r0'>r0: </label><div class='col-sm-8'><input id='r0' class='form-control' type='text'{{#r0}} value='{{r0}}'{{/r0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x'>x: </label><div class='col-sm-8'><input id='x' class='form-control' type='text'{{#x}} value='{{x}}'{{/x}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x0'>x0: </label><div class='col-sm-8'><input id='x0' class='form-control' type='text'{{#x0}} value='{{x0}}'{{/x0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ToTransformerEnd'>ToTransformerEnd: </label><div class='col-sm-8'><input id='ToTransformerEnd' class='form-control' type='text'{{#ToTransformerEnd}} value='{{ToTransformerEnd}}_string'{{/ToTransformerEnd}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ToTransformerEndInfos'>ToTransformerEndInfos: </label><div class='col-sm-8'><input id='ToTransformerEndInfos' class='form-control' type='text'{{#ToTransformerEndInfos}} value='{{ToTransformerEndInfos}}_string'{{/ToTransformerEndInfos}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='FromTransformerEndInfo'>FromTransformerEndInfo: </label><div class='col-sm-8'><input id='FromTransformerEndInfo' class='form-control' type='text'{{#FromTransformerEndInfo}} value='{{FromTransformerEndInfo}}'{{/FromTransformerEndInfo}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='FromTransformerEnd'>FromTransformerEnd: </label><div class='col-sm-8'><input id='FromTransformerEnd' class='form-control' type='text'{{#FromTransformerEnd}} value='{{FromTransformerEnd}}'{{/FromTransformerEnd}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ToTransformerEnd", "TransformerEnd", "1..*", "0..*"],
                        ["ToTransformerEndInfos", "TransformerEndInfo", "0..*", "0..*"],
                        ["FromTransformerEndInfo", "TransformerEndInfo", "0..1", "0..*"],
                        ["FromTransformerEnd", "TransformerEnd", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A non linear shunt compensator bank or section admittance value.
         *
         */
        class NonlinearShuntCompensatorPoint extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.NonlinearShuntCompensatorPoint;
                if (null == bucket)
                   cim_data.NonlinearShuntCompensatorPoint = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.NonlinearShuntCompensatorPoint[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "NonlinearShuntCompensatorPoint";
                base.parse_element (/<cim:NonlinearShuntCompensatorPoint.g>([\s\S]*?)<\/cim:NonlinearShuntCompensatorPoint.g>/g, obj, "g", base.to_string, sub, context);
                base.parse_element (/<cim:NonlinearShuntCompensatorPoint.b0>([\s\S]*?)<\/cim:NonlinearShuntCompensatorPoint.b0>/g, obj, "b0", base.to_string, sub, context);
                base.parse_element (/<cim:NonlinearShuntCompensatorPoint.b>([\s\S]*?)<\/cim:NonlinearShuntCompensatorPoint.b>/g, obj, "b", base.to_string, sub, context);
                base.parse_element (/<cim:NonlinearShuntCompensatorPoint.g0>([\s\S]*?)<\/cim:NonlinearShuntCompensatorPoint.g0>/g, obj, "g0", base.to_string, sub, context);
                base.parse_element (/<cim:NonlinearShuntCompensatorPoint.sectionNumber>([\s\S]*?)<\/cim:NonlinearShuntCompensatorPoint.sectionNumber>/g, obj, "sectionNumber", base.to_string, sub, context);
                base.parse_attribute (/<cim:NonlinearShuntCompensatorPoint.NonlinearShuntCompensator\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "NonlinearShuntCompensator", sub, context);
                var bucket = context.parsed.NonlinearShuntCompensatorPoint;
                if (null == bucket)
                   context.parsed.NonlinearShuntCompensatorPoint = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "NonlinearShuntCompensatorPoint", "g", base.from_string, fields);
                base.export_element (obj, "NonlinearShuntCompensatorPoint", "b0", base.from_string, fields);
                base.export_element (obj, "NonlinearShuntCompensatorPoint", "b", base.from_string, fields);
                base.export_element (obj, "NonlinearShuntCompensatorPoint", "g0", base.from_string, fields);
                base.export_element (obj, "NonlinearShuntCompensatorPoint", "sectionNumber", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "NonlinearShuntCompensatorPoint", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#NonlinearShuntCompensatorPoint_collapse" aria-expanded="true" aria-controls="NonlinearShuntCompensatorPoint_collapse" style="margin-left: 10px;">NonlinearShuntCompensatorPoint</a></legend>
                    <div id="NonlinearShuntCompensatorPoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#g}}<div><b>g</b>: {{g}}</div>{{/g}}
                    {{#b0}}<div><b>b0</b>: {{b0}}</div>{{/b0}}
                    {{#b}}<div><b>b</b>: {{b}}</div>{{/b}}
                    {{#g0}}<div><b>g0</b>: {{g0}}</div>{{/g0}}
                    {{#sectionNumber}}<div><b>sectionNumber</b>: {{sectionNumber}}</div>{{/sectionNumber}}
                    {{#NonlinearShuntCompensator}}<div><b>NonlinearShuntCompensator</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{NonlinearShuntCompensator}}&quot;);})'>{{NonlinearShuntCompensator}}</a></div>{{/NonlinearShuntCompensator}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#NonlinearShuntCompensatorPoint_collapse" aria-expanded="true" aria-controls="NonlinearShuntCompensatorPoint_collapse" style="margin-left: 10px;">NonlinearShuntCompensatorPoint</a></legend>
                    <div id="NonlinearShuntCompensatorPoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g'>g: </label><div class='col-sm-8'><input id='g' class='form-control' type='text'{{#g}} value='{{g}}'{{/g}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b0'>b0: </label><div class='col-sm-8'><input id='b0' class='form-control' type='text'{{#b0}} value='{{b0}}'{{/b0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b'>b: </label><div class='col-sm-8'><input id='b' class='form-control' type='text'{{#b}} value='{{b}}'{{/b}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g0'>g0: </label><div class='col-sm-8'><input id='g0' class='form-control' type='text'{{#g0}} value='{{g0}}'{{/g0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='sectionNumber'>sectionNumber: </label><div class='col-sm-8'><input id='sectionNumber' class='form-control' type='text'{{#sectionNumber}} value='{{sectionNumber}}'{{/sectionNumber}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='NonlinearShuntCompensator'>NonlinearShuntCompensator: </label><div class='col-sm-8'><input id='NonlinearShuntCompensator' class='form-control' type='text'{{#NonlinearShuntCompensator}} value='{{NonlinearShuntCompensator}}'{{/NonlinearShuntCompensator}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["NonlinearShuntCompensator", "NonlinearShuntCompensator", "1", "1..*"]
                    ]
                );
            }
        }

        /**
         * A per phase non linear shunt compensator bank or section admittance value.
         *
         */
        class NonlinearShuntCompensatorPhasePoint extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.NonlinearShuntCompensatorPhasePoint;
                if (null == bucket)
                   cim_data.NonlinearShuntCompensatorPhasePoint = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.NonlinearShuntCompensatorPhasePoint[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "NonlinearShuntCompensatorPhasePoint";
                base.parse_element (/<cim:NonlinearShuntCompensatorPhasePoint.sectionNumber>([\s\S]*?)<\/cim:NonlinearShuntCompensatorPhasePoint.sectionNumber>/g, obj, "sectionNumber", base.to_string, sub, context);
                base.parse_element (/<cim:NonlinearShuntCompensatorPhasePoint.b>([\s\S]*?)<\/cim:NonlinearShuntCompensatorPhasePoint.b>/g, obj, "b", base.to_string, sub, context);
                base.parse_element (/<cim:NonlinearShuntCompensatorPhasePoint.g>([\s\S]*?)<\/cim:NonlinearShuntCompensatorPhasePoint.g>/g, obj, "g", base.to_string, sub, context);
                base.parse_attribute (/<cim:NonlinearShuntCompensatorPhasePoint.NonlinearShuntCompensatorPhase\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "NonlinearShuntCompensatorPhase", sub, context);
                var bucket = context.parsed.NonlinearShuntCompensatorPhasePoint;
                if (null == bucket)
                   context.parsed.NonlinearShuntCompensatorPhasePoint = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "NonlinearShuntCompensatorPhasePoint", "sectionNumber", base.from_string, fields);
                base.export_element (obj, "NonlinearShuntCompensatorPhasePoint", "b", base.from_string, fields);
                base.export_element (obj, "NonlinearShuntCompensatorPhasePoint", "g", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "NonlinearShuntCompensatorPhasePoint", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#NonlinearShuntCompensatorPhasePoint_collapse" aria-expanded="true" aria-controls="NonlinearShuntCompensatorPhasePoint_collapse" style="margin-left: 10px;">NonlinearShuntCompensatorPhasePoint</a></legend>
                    <div id="NonlinearShuntCompensatorPhasePoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#sectionNumber}}<div><b>sectionNumber</b>: {{sectionNumber}}</div>{{/sectionNumber}}
                    {{#b}}<div><b>b</b>: {{b}}</div>{{/b}}
                    {{#g}}<div><b>g</b>: {{g}}</div>{{/g}}
                    {{#NonlinearShuntCompensatorPhase}}<div><b>NonlinearShuntCompensatorPhase</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{NonlinearShuntCompensatorPhase}}&quot;);})'>{{NonlinearShuntCompensatorPhase}}</a></div>{{/NonlinearShuntCompensatorPhase}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#NonlinearShuntCompensatorPhasePoint_collapse" aria-expanded="true" aria-controls="NonlinearShuntCompensatorPhasePoint_collapse" style="margin-left: 10px;">NonlinearShuntCompensatorPhasePoint</a></legend>
                    <div id="NonlinearShuntCompensatorPhasePoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='sectionNumber'>sectionNumber: </label><div class='col-sm-8'><input id='sectionNumber' class='form-control' type='text'{{#sectionNumber}} value='{{sectionNumber}}'{{/sectionNumber}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b'>b: </label><div class='col-sm-8'><input id='b' class='form-control' type='text'{{#b}} value='{{b}}'{{/b}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g'>g: </label><div class='col-sm-8'><input id='g' class='form-control' type='text'{{#g}} value='{{g}}'{{/g}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='NonlinearShuntCompensatorPhase'>NonlinearShuntCompensatorPhase: </label><div class='col-sm-8'><input id='NonlinearShuntCompensatorPhase' class='form-control' type='text'{{#NonlinearShuntCompensatorPhase}} value='{{NonlinearShuntCompensatorPhase}}'{{/NonlinearShuntCompensatorPhase}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["NonlinearShuntCompensatorPhase", "NonlinearShuntCompensatorPhase", "1", "1..*"]
                    ]
                );
            }
        }

        class TapChangerTablePoint extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.TapChangerTablePoint;
                if (null == bucket)
                   cim_data.TapChangerTablePoint = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.TapChangerTablePoint[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "TapChangerTablePoint";
                base.parse_element (/<cim:TapChangerTablePoint.b>([\s\S]*?)<\/cim:TapChangerTablePoint.b>/g, obj, "b", base.to_string, sub, context);
                base.parse_element (/<cim:TapChangerTablePoint.g>([\s\S]*?)<\/cim:TapChangerTablePoint.g>/g, obj, "g", base.to_string, sub, context);
                base.parse_element (/<cim:TapChangerTablePoint.r>([\s\S]*?)<\/cim:TapChangerTablePoint.r>/g, obj, "r", base.to_string, sub, context);
                base.parse_element (/<cim:TapChangerTablePoint.ratio>([\s\S]*?)<\/cim:TapChangerTablePoint.ratio>/g, obj, "ratio", base.to_float, sub, context);
                base.parse_element (/<cim:TapChangerTablePoint.step>([\s\S]*?)<\/cim:TapChangerTablePoint.step>/g, obj, "step", base.to_string, sub, context);
                base.parse_element (/<cim:TapChangerTablePoint.x>([\s\S]*?)<\/cim:TapChangerTablePoint.x>/g, obj, "x", base.to_string, sub, context);
                var bucket = context.parsed.TapChangerTablePoint;
                if (null == bucket)
                   context.parsed.TapChangerTablePoint = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "TapChangerTablePoint", "b", base.from_string, fields);
                base.export_element (obj, "TapChangerTablePoint", "g", base.from_string, fields);
                base.export_element (obj, "TapChangerTablePoint", "r", base.from_string, fields);
                base.export_element (obj, "TapChangerTablePoint", "ratio", base.from_float, fields);
                base.export_element (obj, "TapChangerTablePoint", "step", base.from_string, fields);
                base.export_element (obj, "TapChangerTablePoint", "x", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TapChangerTablePoint_collapse" aria-expanded="true" aria-controls="TapChangerTablePoint_collapse" style="margin-left: 10px;">TapChangerTablePoint</a></legend>
                    <div id="TapChangerTablePoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#b}}<div><b>b</b>: {{b}}</div>{{/b}}
                    {{#g}}<div><b>g</b>: {{g}}</div>{{/g}}
                    {{#r}}<div><b>r</b>: {{r}}</div>{{/r}}
                    {{#ratio}}<div><b>ratio</b>: {{ratio}}</div>{{/ratio}}
                    {{#step}}<div><b>step</b>: {{step}}</div>{{/step}}
                    {{#x}}<div><b>x</b>: {{x}}</div>{{/x}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TapChangerTablePoint_collapse" aria-expanded="true" aria-controls="TapChangerTablePoint_collapse" style="margin-left: 10px;">TapChangerTablePoint</a></legend>
                    <div id="TapChangerTablePoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b'>b: </label><div class='col-sm-8'><input id='b' class='form-control' type='text'{{#b}} value='{{b}}'{{/b}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g'>g: </label><div class='col-sm-8'><input id='g' class='form-control' type='text'{{#g}} value='{{g}}'{{/g}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r'>r: </label><div class='col-sm-8'><input id='r' class='form-control' type='text'{{#r}} value='{{r}}'{{/r}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ratio'>ratio: </label><div class='col-sm-8'><input id='ratio' class='form-control' type='text'{{#ratio}} value='{{ratio}}'{{/ratio}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='step'>step: </label><div class='col-sm-8'><input id='step' class='form-control' type='text'{{#step}} value='{{step}}'{{/step}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x'>x: </label><div class='col-sm-8'><input id='x' class='form-control' type='text'{{#x}} value='{{x}}'{{/x}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * Reactive power rating envelope versus the synchronous machine's active power, in both the generating and motoring modes.
         *
         * For each active power value there is a corresponding high and low reactive power limit  value. Typically there will be a separate curve for each coolant condition, such as hydrogen pressure.  The Y1 axis values represent reactive minimum and the Y2 axis values represent reactive maximum.
         *
         */
        class ReactiveCapabilityCurve extends Core.Curve
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ReactiveCapabilityCurve;
                if (null == bucket)
                   cim_data.ReactiveCapabilityCurve = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ReactiveCapabilityCurve[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.Curve.prototype.parse.call (this, context, sub);
                obj.cls = "ReactiveCapabilityCurve";
                base.parse_element (/<cim:ReactiveCapabilityCurve.coolantTemperature>([\s\S]*?)<\/cim:ReactiveCapabilityCurve.coolantTemperature>/g, obj, "coolantTemperature", base.to_string, sub, context);
                base.parse_element (/<cim:ReactiveCapabilityCurve.hydrogenPressure>([\s\S]*?)<\/cim:ReactiveCapabilityCurve.hydrogenPressure>/g, obj, "hydrogenPressure", base.to_string, sub, context);
                base.parse_attributes (/<cim:ReactiveCapabilityCurve.EquivalentInjection\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "EquivalentInjection", sub, context);
                base.parse_attributes (/<cim:ReactiveCapabilityCurve.InitiallyUsedBySynchronousMachines\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "InitiallyUsedBySynchronousMachines", sub, context);
                base.parse_attributes (/<cim:ReactiveCapabilityCurve.SynchronousMachines\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "SynchronousMachines", sub, context);
                var bucket = context.parsed.ReactiveCapabilityCurve;
                if (null == bucket)
                   context.parsed.ReactiveCapabilityCurve = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.Curve.prototype.export.call (this, obj, false);

                base.export_element (obj, "ReactiveCapabilityCurve", "coolantTemperature", base.from_string, fields);
                base.export_element (obj, "ReactiveCapabilityCurve", "hydrogenPressure", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "ReactiveCapabilityCurve", fields);
                base.export_attribute (obj, "export_attributes", "ReactiveCapabilityCurve", fields);
                base.export_attribute (obj, "export_attributes", "ReactiveCapabilityCurve", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ReactiveCapabilityCurve_collapse" aria-expanded="true" aria-controls="ReactiveCapabilityCurve_collapse" style="margin-left: 10px;">ReactiveCapabilityCurve</a></legend>
                    <div id="ReactiveCapabilityCurve_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.Curve.prototype.template.call (this) +
                    `
                    {{#coolantTemperature}}<div><b>coolantTemperature</b>: {{coolantTemperature}}</div>{{/coolantTemperature}}
                    {{#hydrogenPressure}}<div><b>hydrogenPressure</b>: {{hydrogenPressure}}</div>{{/hydrogenPressure}}
                    {{#EquivalentInjection}}<div><b>EquivalentInjection</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/EquivalentInjection}}
                    {{#InitiallyUsedBySynchronousMachines}}<div><b>InitiallyUsedBySynchronousMachines</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/InitiallyUsedBySynchronousMachines}}
                    {{#SynchronousMachines}}<div><b>SynchronousMachines</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/SynchronousMachines}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.EquivalentInjection) obj.EquivalentInjection_string = obj.EquivalentInjection.join ();
                if (obj.InitiallyUsedBySynchronousMachines) obj.InitiallyUsedBySynchronousMachines_string = obj.InitiallyUsedBySynchronousMachines.join ();
                if (obj.SynchronousMachines) obj.SynchronousMachines_string = obj.SynchronousMachines.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.EquivalentInjection_string;
                delete obj.InitiallyUsedBySynchronousMachines_string;
                delete obj.SynchronousMachines_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ReactiveCapabilityCurve_collapse" aria-expanded="true" aria-controls="ReactiveCapabilityCurve_collapse" style="margin-left: 10px;">ReactiveCapabilityCurve</a></legend>
                    <div id="ReactiveCapabilityCurve_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.Curve.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='coolantTemperature'>coolantTemperature: </label><div class='col-sm-8'><input id='coolantTemperature' class='form-control' type='text'{{#coolantTemperature}} value='{{coolantTemperature}}'{{/coolantTemperature}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='hydrogenPressure'>hydrogenPressure: </label><div class='col-sm-8'><input id='hydrogenPressure' class='form-control' type='text'{{#hydrogenPressure}} value='{{hydrogenPressure}}'{{/hydrogenPressure}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='SynchronousMachines'>SynchronousMachines: </label><div class='col-sm-8'><input id='SynchronousMachines' class='form-control' type='text'{{#SynchronousMachines}} value='{{SynchronousMachines}}_string'{{/SynchronousMachines}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["EquivalentInjection", "EquivalentInjection", "0..*", "0..1"],
                        ["InitiallyUsedBySynchronousMachines", "SynchronousMachine", "1..*", "0..1"],
                        ["SynchronousMachines", "SynchronousMachine", "1..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * A conductor, or group of conductors, with negligible impedance, that serve to connect other conducting equipment within a single substation and are modelled with a single logical terminal.
         *
         */
        class Connector extends Core.ConductingEquipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Connector;
                if (null == bucket)
                   cim_data.Connector = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Connector[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.ConductingEquipment.prototype.parse.call (this, context, sub);
                obj.cls = "Connector";
                var bucket = context.parsed.Connector;
                if (null == bucket)
                   context.parsed.Connector = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.ConductingEquipment.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Connector_collapse" aria-expanded="true" aria-controls="Connector_collapse" style="margin-left: 10px;">Connector</a></legend>
                    <div id="Connector_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Connector_collapse" aria-expanded="true" aria-controls="Connector_collapse" style="margin-left: 10px;">Connector</a></legend>
                    <div id="Connector_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * Describes a curve for how the voltage magnitude and impedance varies with the tap step.
         *
         */
        class RatioTapChangerTable extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.RatioTapChangerTable;
                if (null == bucket)
                   cim_data.RatioTapChangerTable = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.RatioTapChangerTable[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "RatioTapChangerTable";
                base.parse_attributes (/<cim:RatioTapChangerTable.RatioTapChanger\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RatioTapChanger", sub, context);
                base.parse_attributes (/<cim:RatioTapChangerTable.RatioTapChangerTablePoint\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RatioTapChangerTablePoint", sub, context);
                var bucket = context.parsed.RatioTapChangerTable;
                if (null == bucket)
                   context.parsed.RatioTapChangerTable = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "RatioTapChangerTable", fields);
                base.export_attribute (obj, "export_attributes", "RatioTapChangerTable", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RatioTapChangerTable_collapse" aria-expanded="true" aria-controls="RatioTapChangerTable_collapse" style="margin-left: 10px;">RatioTapChangerTable</a></legend>
                    <div id="RatioTapChangerTable_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#RatioTapChanger}}<div><b>RatioTapChanger</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/RatioTapChanger}}
                    {{#RatioTapChangerTablePoint}}<div><b>RatioTapChangerTablePoint</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/RatioTapChangerTablePoint}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.RatioTapChanger) obj.RatioTapChanger_string = obj.RatioTapChanger.join ();
                if (obj.RatioTapChangerTablePoint) obj.RatioTapChangerTablePoint_string = obj.RatioTapChangerTablePoint.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.RatioTapChanger_string;
                delete obj.RatioTapChangerTablePoint_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RatioTapChangerTable_collapse" aria-expanded="true" aria-controls="RatioTapChangerTable_collapse" style="margin-left: 10px;">RatioTapChangerTable</a></legend>
                    <div id="RatioTapChangerTable_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
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
                        ["RatioTapChanger", "RatioTapChanger", "0..*", "0..1"],
                        ["RatioTapChangerTablePoint", "RatioTapChangerTablePoint", "1..*", "1"]
                    ]
                );
            }
        }

        /**
         * An electrical device consisting of  two or more coupled windings, with or without a magnetic core, for introducing mutual coupling between electric circuits.
         *
         * Transformers can be used to control voltage and phase shift (active power flow).
         *
         */
        class PowerTransformer extends Core.ConductingEquipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PowerTransformer;
                if (null == bucket)
                   cim_data.PowerTransformer = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PowerTransformer[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.ConductingEquipment.prototype.parse.call (this, context, sub);
                obj.cls = "PowerTransformer";
                base.parse_element (/<cim:PowerTransformer.beforeShCircuitHighestOperatingCurrent>([\s\S]*?)<\/cim:PowerTransformer.beforeShCircuitHighestOperatingCurrent>/g, obj, "beforeShCircuitHighestOperatingCurrent", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformer.beforeShCircuitHighestOperatingVoltage>([\s\S]*?)<\/cim:PowerTransformer.beforeShCircuitHighestOperatingVoltage>/g, obj, "beforeShCircuitHighestOperatingVoltage", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformer.beforeShortCircuitAnglePf>([\s\S]*?)<\/cim:PowerTransformer.beforeShortCircuitAnglePf>/g, obj, "beforeShortCircuitAnglePf", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformer.highSideMinOperatingU>([\s\S]*?)<\/cim:PowerTransformer.highSideMinOperatingU>/g, obj, "highSideMinOperatingU", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformer.isPartOfGeneratorUnit>([\s\S]*?)<\/cim:PowerTransformer.isPartOfGeneratorUnit>/g, obj, "isPartOfGeneratorUnit", base.to_boolean, sub, context);
                base.parse_element (/<cim:PowerTransformer.operationalValuesConsidered>([\s\S]*?)<\/cim:PowerTransformer.operationalValuesConsidered>/g, obj, "operationalValuesConsidered", base.to_boolean, sub, context);
                base.parse_element (/<cim:PowerTransformer.vectorGroup>([\s\S]*?)<\/cim:PowerTransformer.vectorGroup>/g, obj, "vectorGroup", base.to_string, sub, context);
                base.parse_attributes (/<cim:PowerTransformer.PowerTransformerEnd\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PowerTransformerEnd", sub, context);
                base.parse_attributes (/<cim:PowerTransformer.TransformerTanks\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TransformerTanks", sub, context);
                var bucket = context.parsed.PowerTransformer;
                if (null == bucket)
                   context.parsed.PowerTransformer = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.ConductingEquipment.prototype.export.call (this, obj, false);

                base.export_element (obj, "PowerTransformer", "beforeShCircuitHighestOperatingCurrent", base.from_string, fields);
                base.export_element (obj, "PowerTransformer", "beforeShCircuitHighestOperatingVoltage", base.from_string, fields);
                base.export_element (obj, "PowerTransformer", "beforeShortCircuitAnglePf", base.from_string, fields);
                base.export_element (obj, "PowerTransformer", "highSideMinOperatingU", base.from_string, fields);
                base.export_element (obj, "PowerTransformer", "isPartOfGeneratorUnit", base.from_boolean, fields);
                base.export_element (obj, "PowerTransformer", "operationalValuesConsidered", base.from_boolean, fields);
                base.export_element (obj, "PowerTransformer", "vectorGroup", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "PowerTransformer", fields);
                base.export_attribute (obj, "export_attributes", "PowerTransformer", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PowerTransformer_collapse" aria-expanded="true" aria-controls="PowerTransformer_collapse" style="margin-left: 10px;">PowerTransformer</a></legend>
                    <div id="PowerTransformer_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.template.call (this) +
                    `
                    {{#beforeShCircuitHighestOperatingCurrent}}<div><b>beforeShCircuitHighestOperatingCurrent</b>: {{beforeShCircuitHighestOperatingCurrent}}</div>{{/beforeShCircuitHighestOperatingCurrent}}
                    {{#beforeShCircuitHighestOperatingVoltage}}<div><b>beforeShCircuitHighestOperatingVoltage</b>: {{beforeShCircuitHighestOperatingVoltage}}</div>{{/beforeShCircuitHighestOperatingVoltage}}
                    {{#beforeShortCircuitAnglePf}}<div><b>beforeShortCircuitAnglePf</b>: {{beforeShortCircuitAnglePf}}</div>{{/beforeShortCircuitAnglePf}}
                    {{#highSideMinOperatingU}}<div><b>highSideMinOperatingU</b>: {{highSideMinOperatingU}}</div>{{/highSideMinOperatingU}}
                    {{#isPartOfGeneratorUnit}}<div><b>isPartOfGeneratorUnit</b>: {{isPartOfGeneratorUnit}}</div>{{/isPartOfGeneratorUnit}}
                    {{#operationalValuesConsidered}}<div><b>operationalValuesConsidered</b>: {{operationalValuesConsidered}}</div>{{/operationalValuesConsidered}}
                    {{#vectorGroup}}<div><b>vectorGroup</b>: {{vectorGroup}}</div>{{/vectorGroup}}
                    {{#PowerTransformerEnd}}<div><b>PowerTransformerEnd</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/PowerTransformerEnd}}
                    {{#TransformerTanks}}<div><b>TransformerTanks</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TransformerTanks}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.PowerTransformerEnd) obj.PowerTransformerEnd_string = obj.PowerTransformerEnd.join ();
                if (obj.TransformerTanks) obj.TransformerTanks_string = obj.TransformerTanks.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.PowerTransformerEnd_string;
                delete obj.TransformerTanks_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PowerTransformer_collapse" aria-expanded="true" aria-controls="PowerTransformer_collapse" style="margin-left: 10px;">PowerTransformer</a></legend>
                    <div id="PowerTransformer_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='beforeShCircuitHighestOperatingCurrent'>beforeShCircuitHighestOperatingCurrent: </label><div class='col-sm-8'><input id='beforeShCircuitHighestOperatingCurrent' class='form-control' type='text'{{#beforeShCircuitHighestOperatingCurrent}} value='{{beforeShCircuitHighestOperatingCurrent}}'{{/beforeShCircuitHighestOperatingCurrent}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='beforeShCircuitHighestOperatingVoltage'>beforeShCircuitHighestOperatingVoltage: </label><div class='col-sm-8'><input id='beforeShCircuitHighestOperatingVoltage' class='form-control' type='text'{{#beforeShCircuitHighestOperatingVoltage}} value='{{beforeShCircuitHighestOperatingVoltage}}'{{/beforeShCircuitHighestOperatingVoltage}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='beforeShortCircuitAnglePf'>beforeShortCircuitAnglePf: </label><div class='col-sm-8'><input id='beforeShortCircuitAnglePf' class='form-control' type='text'{{#beforeShortCircuitAnglePf}} value='{{beforeShortCircuitAnglePf}}'{{/beforeShortCircuitAnglePf}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='highSideMinOperatingU'>highSideMinOperatingU: </label><div class='col-sm-8'><input id='highSideMinOperatingU' class='form-control' type='text'{{#highSideMinOperatingU}} value='{{highSideMinOperatingU}}'{{/highSideMinOperatingU}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='isPartOfGeneratorUnit'>isPartOfGeneratorUnit: </label><div class='col-sm-8'><input id='isPartOfGeneratorUnit' class='form-check-input' type='checkbox'{{#isPartOfGeneratorUnit}} checked{{/isPartOfGeneratorUnit}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='operationalValuesConsidered'>operationalValuesConsidered: </label><div class='col-sm-8'><input id='operationalValuesConsidered' class='form-check-input' type='checkbox'{{#operationalValuesConsidered}} checked{{/operationalValuesConsidered}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='vectorGroup'>vectorGroup: </label><div class='col-sm-8'><input id='vectorGroup' class='form-control' type='text'{{#vectorGroup}} value='{{vectorGroup}}'{{/vectorGroup}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["PowerTransformerEnd", "PowerTransformerEnd", "0..*", "0..1"],
                        ["TransformerTanks", "TransformerTank", "0..*", "0..1"]
                    ]
                );
            }
        }

        /**
         * A single phase of an energy consumer.
         *
         */
        class EnergyConsumerPhase extends Core.PowerSystemResource
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.EnergyConsumerPhase;
                if (null == bucket)
                   cim_data.EnergyConsumerPhase = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.EnergyConsumerPhase[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.PowerSystemResource.prototype.parse.call (this, context, sub);
                obj.cls = "EnergyConsumerPhase";
                base.parse_element (/<cim:EnergyConsumerPhase.pfixed>([\s\S]*?)<\/cim:EnergyConsumerPhase.pfixed>/g, obj, "pfixed", base.to_string, sub, context);
                base.parse_element (/<cim:EnergyConsumerPhase.pfixedPct>([\s\S]*?)<\/cim:EnergyConsumerPhase.pfixedPct>/g, obj, "pfixedPct", base.to_string, sub, context);
                base.parse_attribute (/<cim:EnergyConsumerPhase.phase\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "phase", sub, context);
                base.parse_element (/<cim:EnergyConsumerPhase.qfixed>([\s\S]*?)<\/cim:EnergyConsumerPhase.qfixed>/g, obj, "qfixed", base.to_string, sub, context);
                base.parse_element (/<cim:EnergyConsumerPhase.qfixedPct>([\s\S]*?)<\/cim:EnergyConsumerPhase.qfixedPct>/g, obj, "qfixedPct", base.to_string, sub, context);
                base.parse_attribute (/<cim:EnergyConsumerPhase.EnergyConsumer\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "EnergyConsumer", sub, context);
                var bucket = context.parsed.EnergyConsumerPhase;
                if (null == bucket)
                   context.parsed.EnergyConsumerPhase = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.PowerSystemResource.prototype.export.call (this, obj, false);

                base.export_element (obj, "EnergyConsumerPhase", "pfixed", base.from_string, fields);
                base.export_element (obj, "EnergyConsumerPhase", "pfixedPct", base.from_string, fields);
                base.export_element (obj, "EnergyConsumerPhase", "phase", base.from_string, fields);
                base.export_element (obj, "EnergyConsumerPhase", "qfixed", base.from_string, fields);
                base.export_element (obj, "EnergyConsumerPhase", "qfixedPct", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "EnergyConsumerPhase", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#EnergyConsumerPhase_collapse" aria-expanded="true" aria-controls="EnergyConsumerPhase_collapse" style="margin-left: 10px;">EnergyConsumerPhase</a></legend>
                    <div id="EnergyConsumerPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.template.call (this) +
                    `
                    {{#pfixed}}<div><b>pfixed</b>: {{pfixed}}</div>{{/pfixed}}
                    {{#pfixedPct}}<div><b>pfixedPct</b>: {{pfixedPct}}</div>{{/pfixedPct}}
                    {{#phase}}<div><b>phase</b>: {{phase}}</div>{{/phase}}
                    {{#qfixed}}<div><b>qfixed</b>: {{qfixed}}</div>{{/qfixed}}
                    {{#qfixedPct}}<div><b>qfixedPct</b>: {{qfixedPct}}</div>{{/qfixedPct}}
                    {{#EnergyConsumer}}<div><b>EnergyConsumer</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{EnergyConsumer}}&quot;);})'>{{EnergyConsumer}}</a></div>{{/EnergyConsumer}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.SinglePhaseKind = []; if (!obj.phase) obj.SinglePhaseKind.push ({ id: '', selected: true}); for (var property in SinglePhaseKind) obj.SinglePhaseKind.push ({ id: property, selected: obj.phase && obj.phase.endsWith ('.' + property)});
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.SinglePhaseKind;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#EnergyConsumerPhase_collapse" aria-expanded="true" aria-controls="EnergyConsumerPhase_collapse" style="margin-left: 10px;">EnergyConsumerPhase</a></legend>
                    <div id="EnergyConsumerPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='pfixed'>pfixed: </label><div class='col-sm-8'><input id='pfixed' class='form-control' type='text'{{#pfixed}} value='{{pfixed}}'{{/pfixed}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='pfixedPct'>pfixedPct: </label><div class='col-sm-8'><input id='pfixedPct' class='form-control' type='text'{{#pfixedPct}} value='{{pfixedPct}}'{{/pfixedPct}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='phase'>phase: </label><div class='col-sm-8'><select id='phase' class='form-control'>{{#SinglePhaseKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/SinglePhaseKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='qfixed'>qfixed: </label><div class='col-sm-8'><input id='qfixed' class='form-control' type='text'{{#qfixed}} value='{{qfixed}}'{{/qfixed}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='qfixedPct'>qfixedPct: </label><div class='col-sm-8'><input id='qfixedPct' class='form-control' type='text'{{#qfixedPct}} value='{{qfixedPct}}'{{/qfixedPct}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='EnergyConsumer'>EnergyConsumer: </label><div class='col-sm-8'><input id='EnergyConsumer' class='form-control' type='text'{{#EnergyConsumer}} value='{{EnergyConsumer}}'{{/EnergyConsumer}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["EnergyConsumer", "EnergyConsumer", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Common type for per-length electrical catalogues describing line parameters.
         *
         */
        class PerLengthLineParameter extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PerLengthLineParameter;
                if (null == bucket)
                   cim_data.PerLengthLineParameter = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PerLengthLineParameter[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "PerLengthLineParameter";
                base.parse_attributes (/<cim:PerLengthLineParameter.WireInfos\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "WireInfos", sub, context);
                base.parse_attribute (/<cim:PerLengthLineParameter.WireSpacingInfo\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "WireSpacingInfo", sub, context);
                var bucket = context.parsed.PerLengthLineParameter;
                if (null == bucket)
                   context.parsed.PerLengthLineParameter = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "PerLengthLineParameter", fields);
                base.export_attribute (obj, "export_attribute", "PerLengthLineParameter", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PerLengthLineParameter_collapse" aria-expanded="true" aria-controls="PerLengthLineParameter_collapse" style="margin-left: 10px;">PerLengthLineParameter</a></legend>
                    <div id="PerLengthLineParameter_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#WireInfos}}<div><b>WireInfos</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/WireInfos}}
                    {{#WireSpacingInfo}}<div><b>WireSpacingInfo</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{WireSpacingInfo}}&quot;);})'>{{WireSpacingInfo}}</a></div>{{/WireSpacingInfo}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.WireInfos) obj.WireInfos_string = obj.WireInfos.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.WireInfos_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PerLengthLineParameter_collapse" aria-expanded="true" aria-controls="PerLengthLineParameter_collapse" style="margin-left: 10px;">PerLengthLineParameter</a></legend>
                    <div id="PerLengthLineParameter_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='WireInfos'>WireInfos: </label><div class='col-sm-8'><input id='WireInfos' class='form-control' type='text'{{#WireInfos}} value='{{WireInfos}}_string'{{/WireInfos}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='WireSpacingInfo'>WireSpacingInfo: </label><div class='col-sm-8'><input id='WireSpacingInfo' class='form-control' type='text'{{#WireSpacingInfo}} value='{{WireSpacingInfo}}'{{/WireSpacingInfo}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["WireInfos", "WireInfo", "0..*", "0..*"],
                        ["WireSpacingInfo", "WireSpacingInfo", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Triplet of resistance, reactance, and susceptance matrix element values.
         *
         */
        class PhaseImpedanceData extends base.Element
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PhaseImpedanceData;
                if (null == bucket)
                   cim_data.PhaseImpedanceData = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PhaseImpedanceData[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = base.Element.prototype.parse.call (this, context, sub);
                obj.cls = "PhaseImpedanceData";
                base.parse_element (/<cim:PhaseImpedanceData.b>([\s\S]*?)<\/cim:PhaseImpedanceData.b>/g, obj, "b", base.to_string, sub, context);
                base.parse_element (/<cim:PhaseImpedanceData.r>([\s\S]*?)<\/cim:PhaseImpedanceData.r>/g, obj, "r", base.to_string, sub, context);
                base.parse_element (/<cim:PhaseImpedanceData.sequenceNumber>([\s\S]*?)<\/cim:PhaseImpedanceData.sequenceNumber>/g, obj, "sequenceNumber", base.to_string, sub, context);
                base.parse_element (/<cim:PhaseImpedanceData.x>([\s\S]*?)<\/cim:PhaseImpedanceData.x>/g, obj, "x", base.to_string, sub, context);
                base.parse_attribute (/<cim:PhaseImpedanceData.PhaseImpedance\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PhaseImpedance", sub, context);
                var bucket = context.parsed.PhaseImpedanceData;
                if (null == bucket)
                   context.parsed.PhaseImpedanceData = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = [];

                base.export_element (obj, "PhaseImpedanceData", "b", base.from_string, fields);
                base.export_element (obj, "PhaseImpedanceData", "r", base.from_string, fields);
                base.export_element (obj, "PhaseImpedanceData", "sequenceNumber", base.from_string, fields);
                base.export_element (obj, "PhaseImpedanceData", "x", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "PhaseImpedanceData", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseImpedanceData_collapse" aria-expanded="true" aria-controls="PhaseImpedanceData_collapse" style="margin-left: 10px;">PhaseImpedanceData</a></legend>
                    <div id="PhaseImpedanceData_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.template.call (this) +
                    `
                    {{#b}}<div><b>b</b>: {{b}}</div>{{/b}}
                    {{#r}}<div><b>r</b>: {{r}}</div>{{/r}}
                    {{#sequenceNumber}}<div><b>sequenceNumber</b>: {{sequenceNumber}}</div>{{/sequenceNumber}}
                    {{#x}}<div><b>x</b>: {{x}}</div>{{/x}}
                    {{#PhaseImpedance}}<div><b>PhaseImpedance</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{PhaseImpedance}}&quot;);})'>{{PhaseImpedance}}</a></div>{{/PhaseImpedance}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseImpedanceData_collapse" aria-expanded="true" aria-controls="PhaseImpedanceData_collapse" style="margin-left: 10px;">PhaseImpedanceData</a></legend>
                    <div id="PhaseImpedanceData_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + base.Element.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b'>b: </label><div class='col-sm-8'><input id='b' class='form-control' type='text'{{#b}} value='{{b}}'{{/b}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r'>r: </label><div class='col-sm-8'><input id='r' class='form-control' type='text'{{#r}} value='{{r}}'{{/r}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='sequenceNumber'>sequenceNumber: </label><div class='col-sm-8'><input id='sequenceNumber' class='form-control' type='text'{{#sequenceNumber}} value='{{sequenceNumber}}'{{/sequenceNumber}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x'>x: </label><div class='col-sm-8'><input id='x' class='form-control' type='text'{{#x}} value='{{x}}'{{/x}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='PhaseImpedance'>PhaseImpedance: </label><div class='col-sm-8'><input id='PhaseImpedance' class='form-control' type='text'{{#PhaseImpedance}} value='{{PhaseImpedance}}'{{/PhaseImpedance}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["PhaseImpedance", "PerLengthPhaseImpedance", "1", "1..*"]
                    ]
                );
            }
        }

        /**
         * Describes a tabular curve for how the phase angle difference and impedance varies with the tap step.
         *
         */
        class PhaseTapChangerTable extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PhaseTapChangerTable;
                if (null == bucket)
                   cim_data.PhaseTapChangerTable = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PhaseTapChangerTable[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "PhaseTapChangerTable";
                base.parse_attributes (/<cim:PhaseTapChangerTable.PhaseTapChangerTabular\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PhaseTapChangerTabular", sub, context);
                base.parse_attributes (/<cim:PhaseTapChangerTable.PhaseTapChangerTablePoint\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PhaseTapChangerTablePoint", sub, context);
                var bucket = context.parsed.PhaseTapChangerTable;
                if (null == bucket)
                   context.parsed.PhaseTapChangerTable = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "PhaseTapChangerTable", fields);
                base.export_attribute (obj, "export_attributes", "PhaseTapChangerTable", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerTable_collapse" aria-expanded="true" aria-controls="PhaseTapChangerTable_collapse" style="margin-left: 10px;">PhaseTapChangerTable</a></legend>
                    <div id="PhaseTapChangerTable_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#PhaseTapChangerTabular}}<div><b>PhaseTapChangerTabular</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/PhaseTapChangerTabular}}
                    {{#PhaseTapChangerTablePoint}}<div><b>PhaseTapChangerTablePoint</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/PhaseTapChangerTablePoint}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.PhaseTapChangerTabular) obj.PhaseTapChangerTabular_string = obj.PhaseTapChangerTabular.join ();
                if (obj.PhaseTapChangerTablePoint) obj.PhaseTapChangerTablePoint_string = obj.PhaseTapChangerTablePoint.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.PhaseTapChangerTabular_string;
                delete obj.PhaseTapChangerTablePoint_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerTable_collapse" aria-expanded="true" aria-controls="PhaseTapChangerTable_collapse" style="margin-left: 10px;">PhaseTapChangerTable</a></legend>
                    <div id="PhaseTapChangerTable_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
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
                        ["PhaseTapChangerTabular", "PhaseTapChangerTabular", "0..*", "0..1"],
                        ["PhaseTapChangerTablePoint", "PhaseTapChangerTablePoint", "1..*", "1"]
                    ]
                );
            }
        }

        /**
         * Contains equipment beyond a substation belonging to a power transmission line.
         *
         */
        class Line extends Core.EquipmentContainer
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Line;
                if (null == bucket)
                   cim_data.Line = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Line[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.EquipmentContainer.prototype.parse.call (this, context, sub);
                obj.cls = "Line";
                base.parse_attribute (/<cim:Line.Region\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Region", sub, context);
                var bucket = context.parsed.Line;
                if (null == bucket)
                   context.parsed.Line = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.EquipmentContainer.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "Line", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Line_collapse" aria-expanded="true" aria-controls="Line_collapse" style="margin-left: 10px;">Line</a></legend>
                    <div id="Line_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.EquipmentContainer.prototype.template.call (this) +
                    `
                    {{#Region}}<div><b>Region</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Region}}&quot;);})'>{{Region}}</a></div>{{/Region}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Line_collapse" aria-expanded="true" aria-controls="Line_collapse" style="margin-left: 10px;">Line</a></legend>
                    <div id="Line_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.EquipmentContainer.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Region'>Region: </label><div class='col-sm-8'><input id='Region' class='form-control' type='text'{{#Region}} value='{{Region}}'{{/Region}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["Region", "SubGeographicalRegion", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * An assembly of two or more coupled windings that transform electrical power between voltage levels.
         *
         * These windings are bound on a common core and place in the same tank. Transformer tank can be used to model both single-phase and 3-phase transformers.
         *
         */
        class TransformerTank extends Core.Equipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.TransformerTank;
                if (null == bucket)
                   cim_data.TransformerTank = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.TransformerTank[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.Equipment.prototype.parse.call (this, context, sub);
                obj.cls = "TransformerTank";
                base.parse_attributes (/<cim:TransformerTank.TransformerTankEnds\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TransformerTankEnds", sub, context);
                base.parse_attributes (/<cim:TransformerTank.TransformerObservations\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TransformerObservations", sub, context);
                base.parse_attribute (/<cim:TransformerTank.PowerTransformer\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PowerTransformer", sub, context);
                var bucket = context.parsed.TransformerTank;
                if (null == bucket)
                   context.parsed.TransformerTank = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.Equipment.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "TransformerTank", fields);
                base.export_attribute (obj, "export_attributes", "TransformerTank", fields);
                base.export_attribute (obj, "export_attribute", "TransformerTank", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerTank_collapse" aria-expanded="true" aria-controls="TransformerTank_collapse" style="margin-left: 10px;">TransformerTank</a></legend>
                    <div id="TransformerTank_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.Equipment.prototype.template.call (this) +
                    `
                    {{#TransformerTankEnds}}<div><b>TransformerTankEnds</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TransformerTankEnds}}
                    {{#TransformerObservations}}<div><b>TransformerObservations</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TransformerObservations}}
                    {{#PowerTransformer}}<div><b>PowerTransformer</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{PowerTransformer}}&quot;);})'>{{PowerTransformer}}</a></div>{{/PowerTransformer}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TransformerTankEnds) obj.TransformerTankEnds_string = obj.TransformerTankEnds.join ();
                if (obj.TransformerObservations) obj.TransformerObservations_string = obj.TransformerObservations.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TransformerTankEnds_string;
                delete obj.TransformerObservations_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerTank_collapse" aria-expanded="true" aria-controls="TransformerTank_collapse" style="margin-left: 10px;">TransformerTank</a></legend>
                    <div id="TransformerTank_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.Equipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='PowerTransformer'>PowerTransformer: </label><div class='col-sm-8'><input id='PowerTransformer' class='form-control' type='text'{{#PowerTransformer}} value='{{PowerTransformer}}'{{/PowerTransformer}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["TransformerTankEnds", "TransformerTankEnd", "1..*", "0..1"],
                        ["TransformerObservations", "TransformerObservation", "0..*", "0..1"],
                        ["PowerTransformer", "PowerTransformer", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A pre-established pattern over time for a tap step.
         *
         */
        class TapSchedule extends LoadModel.SeasonDayTypeSchedule
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.TapSchedule;
                if (null == bucket)
                   cim_data.TapSchedule = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.TapSchedule[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = LoadModel.SeasonDayTypeSchedule.prototype.parse.call (this, context, sub);
                obj.cls = "TapSchedule";
                base.parse_attribute (/<cim:TapSchedule.TapChanger\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TapChanger", sub, context);
                var bucket = context.parsed.TapSchedule;
                if (null == bucket)
                   context.parsed.TapSchedule = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = LoadModel.SeasonDayTypeSchedule.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "TapSchedule", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TapSchedule_collapse" aria-expanded="true" aria-controls="TapSchedule_collapse" style="margin-left: 10px;">TapSchedule</a></legend>
                    <div id="TapSchedule_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + LoadModel.SeasonDayTypeSchedule.prototype.template.call (this) +
                    `
                    {{#TapChanger}}<div><b>TapChanger</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TapChanger}}&quot;);})'>{{TapChanger}}</a></div>{{/TapChanger}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TapSchedule_collapse" aria-expanded="true" aria-controls="TapSchedule_collapse" style="margin-left: 10px;">TapSchedule</a></legend>
                    <div id="TapSchedule_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + LoadModel.SeasonDayTypeSchedule.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TapChanger'>TapChanger: </label><div class='col-sm-8'><input id='TapChanger' class='form-control' type='text'{{#TapChanger}} value='{{TapChanger}}'{{/TapChanger}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["TapChanger", "TapChanger", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A conducting equipment used to represent a connection to ground which is typically used to compensate earth faults..
         *
         * An earth fault compensator device modeled with a single terminal implies a second terminal solidly connected to ground.  If two terminals are modeled, the ground is not assumed and normal connection rules apply.
         *
         */
        class EarthFaultCompensator extends Core.ConductingEquipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.EarthFaultCompensator;
                if (null == bucket)
                   cim_data.EarthFaultCompensator = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.EarthFaultCompensator[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.ConductingEquipment.prototype.parse.call (this, context, sub);
                obj.cls = "EarthFaultCompensator";
                base.parse_element (/<cim:EarthFaultCompensator.r>([\s\S]*?)<\/cim:EarthFaultCompensator.r>/g, obj, "r", base.to_string, sub, context);
                var bucket = context.parsed.EarthFaultCompensator;
                if (null == bucket)
                   context.parsed.EarthFaultCompensator = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.ConductingEquipment.prototype.export.call (this, obj, false);

                base.export_element (obj, "EarthFaultCompensator", "r", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#EarthFaultCompensator_collapse" aria-expanded="true" aria-controls="EarthFaultCompensator_collapse" style="margin-left: 10px;">EarthFaultCompensator</a></legend>
                    <div id="EarthFaultCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.template.call (this) +
                    `
                    {{#r}}<div><b>r</b>: {{r}}</div>{{/r}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#EarthFaultCompensator_collapse" aria-expanded="true" aria-controls="EarthFaultCompensator_collapse" style="margin-left: 10px;">EarthFaultCompensator</a></legend>
                    <div id="EarthFaultCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r'>r: </label><div class='col-sm-8'><input id='r' class='form-control' type='text'{{#r}} value='{{r}}'{{/r}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A Clamp is a galvanic connection at a line segment where other equipment is connected.
         *
         * A Clamp does not cut the line segment.
         *
         */
        class Clamp extends Core.ConductingEquipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Clamp;
                if (null == bucket)
                   cim_data.Clamp = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Clamp[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.ConductingEquipment.prototype.parse.call (this, context, sub);
                obj.cls = "Clamp";
                base.parse_element (/<cim:Clamp.lengthFromTerminal1>([\s\S]*?)<\/cim:Clamp.lengthFromTerminal1>/g, obj, "lengthFromTerminal1", base.to_string, sub, context);
                base.parse_attribute (/<cim:Clamp.ACLineSegment\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ACLineSegment", sub, context);
                var bucket = context.parsed.Clamp;
                if (null == bucket)
                   context.parsed.Clamp = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.ConductingEquipment.prototype.export.call (this, obj, false);

                base.export_element (obj, "Clamp", "lengthFromTerminal1", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "Clamp", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Clamp_collapse" aria-expanded="true" aria-controls="Clamp_collapse" style="margin-left: 10px;">Clamp</a></legend>
                    <div id="Clamp_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.template.call (this) +
                    `
                    {{#lengthFromTerminal1}}<div><b>lengthFromTerminal1</b>: {{lengthFromTerminal1}}</div>{{/lengthFromTerminal1}}
                    {{#ACLineSegment}}<div><b>ACLineSegment</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ACLineSegment}}&quot;);})'>{{ACLineSegment}}</a></div>{{/ACLineSegment}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Clamp_collapse" aria-expanded="true" aria-controls="Clamp_collapse" style="margin-left: 10px;">Clamp</a></legend>
                    <div id="Clamp_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='lengthFromTerminal1'>lengthFromTerminal1: </label><div class='col-sm-8'><input id='lengthFromTerminal1' class='form-control' type='text'{{#lengthFromTerminal1}} value='{{lengthFromTerminal1}}'{{/lengthFromTerminal1}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ACLineSegment'>ACLineSegment: </label><div class='col-sm-8'><input id='ACLineSegment' class='form-control' type='text'{{#ACLineSegment}} value='{{ACLineSegment}}'{{/ACLineSegment}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ACLineSegment", "ACLineSegment", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A pre-established pattern over time for a controlled variable, e.g., busbar voltage.
         *
         */
        class RegulationSchedule extends LoadModel.SeasonDayTypeSchedule
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.RegulationSchedule;
                if (null == bucket)
                   cim_data.RegulationSchedule = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.RegulationSchedule[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = LoadModel.SeasonDayTypeSchedule.prototype.parse.call (this, context, sub);
                obj.cls = "RegulationSchedule";
                base.parse_attributes (/<cim:RegulationSchedule.VoltageControlZones\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "VoltageControlZones", sub, context);
                base.parse_attribute (/<cim:RegulationSchedule.RegulatingControl\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RegulatingControl", sub, context);
                var bucket = context.parsed.RegulationSchedule;
                if (null == bucket)
                   context.parsed.RegulationSchedule = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = LoadModel.SeasonDayTypeSchedule.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "RegulationSchedule", fields);
                base.export_attribute (obj, "export_attribute", "RegulationSchedule", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RegulationSchedule_collapse" aria-expanded="true" aria-controls="RegulationSchedule_collapse" style="margin-left: 10px;">RegulationSchedule</a></legend>
                    <div id="RegulationSchedule_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + LoadModel.SeasonDayTypeSchedule.prototype.template.call (this) +
                    `
                    {{#VoltageControlZones}}<div><b>VoltageControlZones</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/VoltageControlZones}}
                    {{#RegulatingControl}}<div><b>RegulatingControl</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{RegulatingControl}}&quot;);})'>{{RegulatingControl}}</a></div>{{/RegulatingControl}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.VoltageControlZones) obj.VoltageControlZones_string = obj.VoltageControlZones.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.VoltageControlZones_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RegulationSchedule_collapse" aria-expanded="true" aria-controls="RegulationSchedule_collapse" style="margin-left: 10px;">RegulationSchedule</a></legend>
                    <div id="RegulationSchedule_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + LoadModel.SeasonDayTypeSchedule.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='RegulatingControl'>RegulatingControl: </label><div class='col-sm-8'><input id='RegulatingControl' class='form-control' type='text'{{#RegulatingControl}} value='{{RegulatingControl}}'{{/RegulatingControl}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["VoltageControlZones", "VoltageControlZone", "0..*", "0..1"],
                        ["RegulatingControl", "RegulatingControl", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Represents a single wire of an alternating current line segment.
         *
         */
        class ACLineSegmentPhase extends Core.PowerSystemResource
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ACLineSegmentPhase;
                if (null == bucket)
                   cim_data.ACLineSegmentPhase = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ACLineSegmentPhase[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.PowerSystemResource.prototype.parse.call (this, context, sub);
                obj.cls = "ACLineSegmentPhase";
                base.parse_attribute (/<cim:ACLineSegmentPhase.phase\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "phase", sub, context);
                base.parse_attribute (/<cim:ACLineSegmentPhase.ACLineSegment\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ACLineSegment", sub, context);
                var bucket = context.parsed.ACLineSegmentPhase;
                if (null == bucket)
                   context.parsed.ACLineSegmentPhase = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.PowerSystemResource.prototype.export.call (this, obj, false);

                base.export_element (obj, "ACLineSegmentPhase", "phase", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ACLineSegmentPhase", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ACLineSegmentPhase_collapse" aria-expanded="true" aria-controls="ACLineSegmentPhase_collapse" style="margin-left: 10px;">ACLineSegmentPhase</a></legend>
                    <div id="ACLineSegmentPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.template.call (this) +
                    `
                    {{#phase}}<div><b>phase</b>: {{phase}}</div>{{/phase}}
                    {{#ACLineSegment}}<div><b>ACLineSegment</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ACLineSegment}}&quot;);})'>{{ACLineSegment}}</a></div>{{/ACLineSegment}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.SinglePhaseKind = []; if (!obj.phase) obj.SinglePhaseKind.push ({ id: '', selected: true}); for (var property in SinglePhaseKind) obj.SinglePhaseKind.push ({ id: property, selected: obj.phase && obj.phase.endsWith ('.' + property)});
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.SinglePhaseKind;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ACLineSegmentPhase_collapse" aria-expanded="true" aria-controls="ACLineSegmentPhase_collapse" style="margin-left: 10px;">ACLineSegmentPhase</a></legend>
                    <div id="ACLineSegmentPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='phase'>phase: </label><div class='col-sm-8'><select id='phase' class='form-control'>{{#SinglePhaseKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/SinglePhaseKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ACLineSegment'>ACLineSegment: </label><div class='col-sm-8'><input id='ACLineSegment' class='form-control' type='text'{{#ACLineSegment}} value='{{ACLineSegment}}'{{/ACLineSegment}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ACLineSegment", "ACLineSegment", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A conducting connection point of a power transformer.
         *
         * It corresponds to a physical transformer winding terminal.  In earlier CIM versions, the TransformerWinding class served a similar purpose, but this class is more flexible because it associates to terminal but is not a specialization of ConductingEquipment.
         *
         */
        class TransformerEnd extends Core.IdentifiedObject
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.TransformerEnd;
                if (null == bucket)
                   cim_data.TransformerEnd = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.TransformerEnd[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.IdentifiedObject.prototype.parse.call (this, context, sub);
                obj.cls = "TransformerEnd";
                base.parse_element (/<cim:TransformerEnd.bmagSat>([\s\S]*?)<\/cim:TransformerEnd.bmagSat>/g, obj, "bmagSat", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerEnd.endNumber>([\s\S]*?)<\/cim:TransformerEnd.endNumber>/g, obj, "endNumber", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerEnd.grounded>([\s\S]*?)<\/cim:TransformerEnd.grounded>/g, obj, "grounded", base.to_boolean, sub, context);
                base.parse_element (/<cim:TransformerEnd.magBaseU>([\s\S]*?)<\/cim:TransformerEnd.magBaseU>/g, obj, "magBaseU", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerEnd.magSatFlux>([\s\S]*?)<\/cim:TransformerEnd.magSatFlux>/g, obj, "magSatFlux", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerEnd.rground>([\s\S]*?)<\/cim:TransformerEnd.rground>/g, obj, "rground", base.to_string, sub, context);
                base.parse_element (/<cim:TransformerEnd.xground>([\s\S]*?)<\/cim:TransformerEnd.xground>/g, obj, "xground", base.to_string, sub, context);
                base.parse_attributes (/<cim:TransformerEnd.ToMeshImpedance\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ToMeshImpedance", sub, context);
                base.parse_attributes (/<cim:TransformerEnd.ToWindingInsulations\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ToWindingInsulations", sub, context);
                base.parse_attribute (/<cim:TransformerEnd.CoreAdmittance\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "CoreAdmittance", sub, context);
                base.parse_attribute (/<cim:TransformerEnd.PhaseTapChanger\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PhaseTapChanger", sub, context);
                base.parse_attribute (/<cim:TransformerEnd.BaseVoltage\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "BaseVoltage", sub, context);
                base.parse_attributes (/<cim:TransformerEnd.FromWindingInsulations\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "FromWindingInsulations", sub, context);
                base.parse_attribute (/<cim:TransformerEnd.RatioTapChanger\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RatioTapChanger", sub, context);
                base.parse_attribute (/<cim:TransformerEnd.StarImpedance\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "StarImpedance", sub, context);
                base.parse_attributes (/<cim:TransformerEnd.FromMeshImpedance\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "FromMeshImpedance", sub, context);
                base.parse_attribute (/<cim:TransformerEnd.Terminal\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Terminal", sub, context);
                var bucket = context.parsed.TransformerEnd;
                if (null == bucket)
                   context.parsed.TransformerEnd = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.IdentifiedObject.prototype.export.call (this, obj, false);

                base.export_element (obj, "TransformerEnd", "bmagSat", base.from_string, fields);
                base.export_element (obj, "TransformerEnd", "endNumber", base.from_string, fields);
                base.export_element (obj, "TransformerEnd", "grounded", base.from_boolean, fields);
                base.export_element (obj, "TransformerEnd", "magBaseU", base.from_string, fields);
                base.export_element (obj, "TransformerEnd", "magSatFlux", base.from_string, fields);
                base.export_element (obj, "TransformerEnd", "rground", base.from_string, fields);
                base.export_element (obj, "TransformerEnd", "xground", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "TransformerEnd", fields);
                base.export_attribute (obj, "export_attributes", "TransformerEnd", fields);
                base.export_attribute (obj, "export_attribute", "TransformerEnd", fields);
                base.export_attribute (obj, "export_attribute", "TransformerEnd", fields);
                base.export_attribute (obj, "export_attribute", "TransformerEnd", fields);
                base.export_attribute (obj, "export_attributes", "TransformerEnd", fields);
                base.export_attribute (obj, "export_attribute", "TransformerEnd", fields);
                base.export_attribute (obj, "export_attribute", "TransformerEnd", fields);
                base.export_attribute (obj, "export_attributes", "TransformerEnd", fields);
                base.export_attribute (obj, "export_attribute", "TransformerEnd", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerEnd_collapse" aria-expanded="true" aria-controls="TransformerEnd_collapse" style="margin-left: 10px;">TransformerEnd</a></legend>
                    <div id="TransformerEnd_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.template.call (this) +
                    `
                    {{#bmagSat}}<div><b>bmagSat</b>: {{bmagSat}}</div>{{/bmagSat}}
                    {{#endNumber}}<div><b>endNumber</b>: {{endNumber}}</div>{{/endNumber}}
                    {{#grounded}}<div><b>grounded</b>: {{grounded}}</div>{{/grounded}}
                    {{#magBaseU}}<div><b>magBaseU</b>: {{magBaseU}}</div>{{/magBaseU}}
                    {{#magSatFlux}}<div><b>magSatFlux</b>: {{magSatFlux}}</div>{{/magSatFlux}}
                    {{#rground}}<div><b>rground</b>: {{rground}}</div>{{/rground}}
                    {{#xground}}<div><b>xground</b>: {{xground}}</div>{{/xground}}
                    {{#ToMeshImpedance}}<div><b>ToMeshImpedance</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ToMeshImpedance}}
                    {{#ToWindingInsulations}}<div><b>ToWindingInsulations</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ToWindingInsulations}}
                    {{#CoreAdmittance}}<div><b>CoreAdmittance</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{CoreAdmittance}}&quot;);})'>{{CoreAdmittance}}</a></div>{{/CoreAdmittance}}
                    {{#PhaseTapChanger}}<div><b>PhaseTapChanger</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{PhaseTapChanger}}&quot;);})'>{{PhaseTapChanger}}</a></div>{{/PhaseTapChanger}}
                    {{#BaseVoltage}}<div><b>BaseVoltage</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{BaseVoltage}}&quot;);})'>{{BaseVoltage}}</a></div>{{/BaseVoltage}}
                    {{#FromWindingInsulations}}<div><b>FromWindingInsulations</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/FromWindingInsulations}}
                    {{#RatioTapChanger}}<div><b>RatioTapChanger</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{RatioTapChanger}}&quot;);})'>{{RatioTapChanger}}</a></div>{{/RatioTapChanger}}
                    {{#StarImpedance}}<div><b>StarImpedance</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{StarImpedance}}&quot;);})'>{{StarImpedance}}</a></div>{{/StarImpedance}}
                    {{#FromMeshImpedance}}<div><b>FromMeshImpedance</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/FromMeshImpedance}}
                    {{#Terminal}}<div><b>Terminal</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Terminal}}&quot;);})'>{{Terminal}}</a></div>{{/Terminal}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ToMeshImpedance) obj.ToMeshImpedance_string = obj.ToMeshImpedance.join ();
                if (obj.ToWindingInsulations) obj.ToWindingInsulations_string = obj.ToWindingInsulations.join ();
                if (obj.FromWindingInsulations) obj.FromWindingInsulations_string = obj.FromWindingInsulations.join ();
                if (obj.FromMeshImpedance) obj.FromMeshImpedance_string = obj.FromMeshImpedance.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ToMeshImpedance_string;
                delete obj.ToWindingInsulations_string;
                delete obj.FromWindingInsulations_string;
                delete obj.FromMeshImpedance_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerEnd_collapse" aria-expanded="true" aria-controls="TransformerEnd_collapse" style="margin-left: 10px;">TransformerEnd</a></legend>
                    <div id="TransformerEnd_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.IdentifiedObject.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='bmagSat'>bmagSat: </label><div class='col-sm-8'><input id='bmagSat' class='form-control' type='text'{{#bmagSat}} value='{{bmagSat}}'{{/bmagSat}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='endNumber'>endNumber: </label><div class='col-sm-8'><input id='endNumber' class='form-control' type='text'{{#endNumber}} value='{{endNumber}}'{{/endNumber}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='grounded'>grounded: </label><div class='col-sm-8'><input id='grounded' class='form-check-input' type='checkbox'{{#grounded}} checked{{/grounded}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='magBaseU'>magBaseU: </label><div class='col-sm-8'><input id='magBaseU' class='form-control' type='text'{{#magBaseU}} value='{{magBaseU}}'{{/magBaseU}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='magSatFlux'>magSatFlux: </label><div class='col-sm-8'><input id='magSatFlux' class='form-control' type='text'{{#magSatFlux}} value='{{magSatFlux}}'{{/magSatFlux}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='rground'>rground: </label><div class='col-sm-8'><input id='rground' class='form-control' type='text'{{#rground}} value='{{rground}}'{{/rground}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xground'>xground: </label><div class='col-sm-8'><input id='xground' class='form-control' type='text'{{#xground}} value='{{xground}}'{{/xground}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ToMeshImpedance'>ToMeshImpedance: </label><div class='col-sm-8'><input id='ToMeshImpedance' class='form-control' type='text'{{#ToMeshImpedance}} value='{{ToMeshImpedance}}_string'{{/ToMeshImpedance}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='CoreAdmittance'>CoreAdmittance: </label><div class='col-sm-8'><input id='CoreAdmittance' class='form-control' type='text'{{#CoreAdmittance}} value='{{CoreAdmittance}}'{{/CoreAdmittance}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='PhaseTapChanger'>PhaseTapChanger: </label><div class='col-sm-8'><input id='PhaseTapChanger' class='form-control' type='text'{{#PhaseTapChanger}} value='{{PhaseTapChanger}}'{{/PhaseTapChanger}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='BaseVoltage'>BaseVoltage: </label><div class='col-sm-8'><input id='BaseVoltage' class='form-control' type='text'{{#BaseVoltage}} value='{{BaseVoltage}}'{{/BaseVoltage}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='RatioTapChanger'>RatioTapChanger: </label><div class='col-sm-8'><input id='RatioTapChanger' class='form-control' type='text'{{#RatioTapChanger}} value='{{RatioTapChanger}}'{{/RatioTapChanger}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='StarImpedance'>StarImpedance: </label><div class='col-sm-8'><input id='StarImpedance' class='form-control' type='text'{{#StarImpedance}} value='{{StarImpedance}}'{{/StarImpedance}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Terminal'>Terminal: </label><div class='col-sm-8'><input id='Terminal' class='form-control' type='text'{{#Terminal}} value='{{Terminal}}'{{/Terminal}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ToMeshImpedance", "TransformerMeshImpedance", "0..*", "1..*"],
                        ["ToWindingInsulations", "WindingInsulation", "0..*", "1"],
                        ["CoreAdmittance", "TransformerCoreAdmittance", "0..1", "0..*"],
                        ["PhaseTapChanger", "PhaseTapChanger", "0..1", "1"],
                        ["BaseVoltage", "BaseVoltage", "0..1", "0..*"],
                        ["FromWindingInsulations", "WindingInsulation", "0..*", "1"],
                        ["RatioTapChanger", "RatioTapChanger", "0..1", "1"],
                        ["StarImpedance", "TransformerStarImpedance", "0..1", "0..*"],
                        ["FromMeshImpedance", "TransformerMeshImpedance", "0..*", "1"],
                        ["Terminal", "Terminal", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A schedule of switch positions.
         *
         * If RegularTimePoint.value1 is 0, the switch is open.  If 1, the switch is closed.
         *
         */
        class SwitchSchedule extends LoadModel.SeasonDayTypeSchedule
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.SwitchSchedule;
                if (null == bucket)
                   cim_data.SwitchSchedule = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.SwitchSchedule[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = LoadModel.SeasonDayTypeSchedule.prototype.parse.call (this, context, sub);
                obj.cls = "SwitchSchedule";
                base.parse_attribute (/<cim:SwitchSchedule.Switch\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Switch", sub, context);
                var bucket = context.parsed.SwitchSchedule;
                if (null == bucket)
                   context.parsed.SwitchSchedule = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = LoadModel.SeasonDayTypeSchedule.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "SwitchSchedule", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#SwitchSchedule_collapse" aria-expanded="true" aria-controls="SwitchSchedule_collapse" style="margin-left: 10px;">SwitchSchedule</a></legend>
                    <div id="SwitchSchedule_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + LoadModel.SeasonDayTypeSchedule.prototype.template.call (this) +
                    `
                    {{#Switch}}<div><b>Switch</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Switch}}&quot;);})'>{{Switch}}</a></div>{{/Switch}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#SwitchSchedule_collapse" aria-expanded="true" aria-controls="SwitchSchedule_collapse" style="margin-left: 10px;">SwitchSchedule</a></legend>
                    <div id="SwitchSchedule_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + LoadModel.SeasonDayTypeSchedule.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Switch'>Switch: </label><div class='col-sm-8'><input id='Switch' class='form-control' type='text'{{#Switch}} value='{{Switch}}'{{/Switch}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["Switch", "Switch", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Specifies a set of equipment that works together to control a power system quantity such as voltage or flow.
         *
         * Remote bus voltage control is possible by specifying the controlled terminal located at some place remote from the controlling equipment.
         *
         */
        class RegulatingControl extends Core.PowerSystemResource
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.RegulatingControl;
                if (null == bucket)
                   cim_data.RegulatingControl = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.RegulatingControl[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.PowerSystemResource.prototype.parse.call (this, context, sub);
                obj.cls = "RegulatingControl";
                base.parse_element (/<cim:RegulatingControl.discrete>([\s\S]*?)<\/cim:RegulatingControl.discrete>/g, obj, "discrete", base.to_boolean, sub, context);
                base.parse_attribute (/<cim:RegulatingControl.mode\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "mode", sub, context);
                base.parse_element (/<cim:RegulatingControl.monitoredPhase>([\s\S]*?)<\/cim:RegulatingControl.monitoredPhase>/g, obj, "monitoredPhase", base.to_string, sub, context);
                base.parse_element (/<cim:RegulatingControl.targetDeadband>([\s\S]*?)<\/cim:RegulatingControl.targetDeadband>/g, obj, "targetDeadband", base.to_float, sub, context);
                base.parse_element (/<cim:RegulatingControl.targetValue>([\s\S]*?)<\/cim:RegulatingControl.targetValue>/g, obj, "targetValue", base.to_float, sub, context);
                base.parse_element (/<cim:RegulatingControl.targetValueUnitMultiplier>([\s\S]*?)<\/cim:RegulatingControl.targetValueUnitMultiplier>/g, obj, "targetValueUnitMultiplier", base.to_string, sub, context);
                base.parse_element (/<cim:RegulatingControl.enabled>([\s\S]*?)<\/cim:RegulatingControl.enabled>/g, obj, "enabled", base.to_boolean, sub, context);
                base.parse_attributes (/<cim:RegulatingControl.ProtectiveActionRegulation\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ProtectiveActionRegulation", sub, context);
                base.parse_attributes (/<cim:RegulatingControl.RegulationSchedule\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RegulationSchedule", sub, context);
                base.parse_attributes (/<cim:RegulatingControl.RegulatingCondEq\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RegulatingCondEq", sub, context);
                base.parse_attribute (/<cim:RegulatingControl.Terminal\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Terminal", sub, context);
                var bucket = context.parsed.RegulatingControl;
                if (null == bucket)
                   context.parsed.RegulatingControl = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.PowerSystemResource.prototype.export.call (this, obj, false);

                base.export_element (obj, "RegulatingControl", "discrete", base.from_boolean, fields);
                base.export_element (obj, "RegulatingControl", "mode", base.from_string, fields);
                base.export_element (obj, "RegulatingControl", "monitoredPhase", base.from_string, fields);
                base.export_element (obj, "RegulatingControl", "targetDeadband", base.from_float, fields);
                base.export_element (obj, "RegulatingControl", "targetValue", base.from_float, fields);
                base.export_element (obj, "RegulatingControl", "targetValueUnitMultiplier", base.from_string, fields);
                base.export_element (obj, "RegulatingControl", "enabled", base.from_boolean, fields);
                base.export_attribute (obj, "export_attributes", "RegulatingControl", fields);
                base.export_attribute (obj, "export_attributes", "RegulatingControl", fields);
                base.export_attribute (obj, "export_attributes", "RegulatingControl", fields);
                base.export_attribute (obj, "export_attribute", "RegulatingControl", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RegulatingControl_collapse" aria-expanded="true" aria-controls="RegulatingControl_collapse" style="margin-left: 10px;">RegulatingControl</a></legend>
                    <div id="RegulatingControl_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.template.call (this) +
                    `
                    {{#discrete}}<div><b>discrete</b>: {{discrete}}</div>{{/discrete}}
                    {{#mode}}<div><b>mode</b>: {{mode}}</div>{{/mode}}
                    {{#monitoredPhase}}<div><b>monitoredPhase</b>: {{monitoredPhase}}</div>{{/monitoredPhase}}
                    {{#targetDeadband}}<div><b>targetDeadband</b>: {{targetDeadband}}</div>{{/targetDeadband}}
                    {{#targetValue}}<div><b>targetValue</b>: {{targetValue}}</div>{{/targetValue}}
                    {{#targetValueUnitMultiplier}}<div><b>targetValueUnitMultiplier</b>: {{targetValueUnitMultiplier}}</div>{{/targetValueUnitMultiplier}}
                    {{#enabled}}<div><b>enabled</b>: {{enabled}}</div>{{/enabled}}
                    {{#ProtectiveActionRegulation}}<div><b>ProtectiveActionRegulation</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ProtectiveActionRegulation}}
                    {{#RegulationSchedule}}<div><b>RegulationSchedule</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/RegulationSchedule}}
                    {{#RegulatingCondEq}}<div><b>RegulatingCondEq</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/RegulatingCondEq}}
                    {{#Terminal}}<div><b>Terminal</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Terminal}}&quot;);})'>{{Terminal}}</a></div>{{/Terminal}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.RegulatingControlModeKind = []; if (!obj.mode) obj.RegulatingControlModeKind.push ({ id: '', selected: true}); for (var property in RegulatingControlModeKind) obj.RegulatingControlModeKind.push ({ id: property, selected: obj.mode && obj.mode.endsWith ('.' + property)});
                if (obj.ProtectiveActionRegulation) obj.ProtectiveActionRegulation_string = obj.ProtectiveActionRegulation.join ();
                if (obj.RegulationSchedule) obj.RegulationSchedule_string = obj.RegulationSchedule.join ();
                if (obj.RegulatingCondEq) obj.RegulatingCondEq_string = obj.RegulatingCondEq.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.RegulatingControlModeKind;
                delete obj.ProtectiveActionRegulation_string;
                delete obj.RegulationSchedule_string;
                delete obj.RegulatingCondEq_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RegulatingControl_collapse" aria-expanded="true" aria-controls="RegulatingControl_collapse" style="margin-left: 10px;">RegulatingControl</a></legend>
                    <div id="RegulatingControl_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.edit_template.call (this) +
                    `
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='discrete'>discrete: </label><div class='col-sm-8'><input id='discrete' class='form-check-input' type='checkbox'{{#discrete}} checked{{/discrete}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='mode'>mode: </label><div class='col-sm-8'><select id='mode' class='form-control'>{{#RegulatingControlModeKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/RegulatingControlModeKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='monitoredPhase'>monitoredPhase: </label><div class='col-sm-8'><input id='monitoredPhase' class='form-control' type='text'{{#monitoredPhase}} value='{{monitoredPhase}}'{{/monitoredPhase}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='targetDeadband'>targetDeadband: </label><div class='col-sm-8'><input id='targetDeadband' class='form-control' type='text'{{#targetDeadband}} value='{{targetDeadband}}'{{/targetDeadband}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='targetValue'>targetValue: </label><div class='col-sm-8'><input id='targetValue' class='form-control' type='text'{{#targetValue}} value='{{targetValue}}'{{/targetValue}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='targetValueUnitMultiplier'>targetValueUnitMultiplier: </label><div class='col-sm-8'><input id='targetValueUnitMultiplier' class='form-control' type='text'{{#targetValueUnitMultiplier}} value='{{targetValueUnitMultiplier}}'{{/targetValueUnitMultiplier}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='enabled'>enabled: </label><div class='col-sm-8'><input id='enabled' class='form-check-input' type='checkbox'{{#enabled}} checked{{/enabled}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Terminal'>Terminal: </label><div class='col-sm-8'><input id='Terminal' class='form-control' type='text'{{#Terminal}} value='{{Terminal}}'{{/Terminal}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ProtectiveActionRegulation", "ProtectiveActionRegulation", "0..*", "1"],
                        ["RegulationSchedule", "RegulationSchedule", "0..*", "1"],
                        ["RegulatingCondEq", "RegulatingCondEq", "0..*", "0..1"],
                        ["Terminal", "Terminal", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Mechanism for changing transformer winding tap positions.
         *
         */
        class TapChanger extends Core.PowerSystemResource
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.TapChanger;
                if (null == bucket)
                   cim_data.TapChanger = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.TapChanger[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.PowerSystemResource.prototype.parse.call (this, context, sub);
                obj.cls = "TapChanger";
                base.parse_element (/<cim:TapChanger.highStep>([\s\S]*?)<\/cim:TapChanger.highStep>/g, obj, "highStep", base.to_string, sub, context);
                base.parse_element (/<cim:TapChanger.initialDelay>([\s\S]*?)<\/cim:TapChanger.initialDelay>/g, obj, "initialDelay", base.to_string, sub, context);
                base.parse_element (/<cim:TapChanger.lowStep>([\s\S]*?)<\/cim:TapChanger.lowStep>/g, obj, "lowStep", base.to_string, sub, context);
                base.parse_element (/<cim:TapChanger.ltcFlag>([\s\S]*?)<\/cim:TapChanger.ltcFlag>/g, obj, "ltcFlag", base.to_boolean, sub, context);
                base.parse_element (/<cim:TapChanger.neutralStep>([\s\S]*?)<\/cim:TapChanger.neutralStep>/g, obj, "neutralStep", base.to_string, sub, context);
                base.parse_element (/<cim:TapChanger.neutralU>([\s\S]*?)<\/cim:TapChanger.neutralU>/g, obj, "neutralU", base.to_string, sub, context);
                base.parse_element (/<cim:TapChanger.normalStep>([\s\S]*?)<\/cim:TapChanger.normalStep>/g, obj, "normalStep", base.to_string, sub, context);
                base.parse_element (/<cim:TapChanger.subsequentDelay>([\s\S]*?)<\/cim:TapChanger.subsequentDelay>/g, obj, "subsequentDelay", base.to_string, sub, context);
                base.parse_element (/<cim:TapChanger.controlEnabled>([\s\S]*?)<\/cim:TapChanger.controlEnabled>/g, obj, "controlEnabled", base.to_boolean, sub, context);
                base.parse_element (/<cim:TapChanger.step>([\s\S]*?)<\/cim:TapChanger.step>/g, obj, "step", base.to_float, sub, context);
                base.parse_attributes (/<cim:TapChanger.TapSchedules\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TapSchedules", sub, context);
                base.parse_attribute (/<cim:TapChanger.TapChangerControl\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TapChangerControl", sub, context);
                base.parse_attribute (/<cim:TapChanger.SvTapStep\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "SvTapStep", sub, context);
                var bucket = context.parsed.TapChanger;
                if (null == bucket)
                   context.parsed.TapChanger = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.PowerSystemResource.prototype.export.call (this, obj, false);

                base.export_element (obj, "TapChanger", "highStep", base.from_string, fields);
                base.export_element (obj, "TapChanger", "initialDelay", base.from_string, fields);
                base.export_element (obj, "TapChanger", "lowStep", base.from_string, fields);
                base.export_element (obj, "TapChanger", "ltcFlag", base.from_boolean, fields);
                base.export_element (obj, "TapChanger", "neutralStep", base.from_string, fields);
                base.export_element (obj, "TapChanger", "neutralU", base.from_string, fields);
                base.export_element (obj, "TapChanger", "normalStep", base.from_string, fields);
                base.export_element (obj, "TapChanger", "subsequentDelay", base.from_string, fields);
                base.export_element (obj, "TapChanger", "controlEnabled", base.from_boolean, fields);
                base.export_element (obj, "TapChanger", "step", base.from_float, fields);
                base.export_attribute (obj, "export_attributes", "TapChanger", fields);
                base.export_attribute (obj, "export_attribute", "TapChanger", fields);
                base.export_attribute (obj, "export_attribute", "TapChanger", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TapChanger_collapse" aria-expanded="true" aria-controls="TapChanger_collapse" style="margin-left: 10px;">TapChanger</a></legend>
                    <div id="TapChanger_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.template.call (this) +
                    `
                    {{#highStep}}<div><b>highStep</b>: {{highStep}}</div>{{/highStep}}
                    {{#initialDelay}}<div><b>initialDelay</b>: {{initialDelay}}</div>{{/initialDelay}}
                    {{#lowStep}}<div><b>lowStep</b>: {{lowStep}}</div>{{/lowStep}}
                    {{#ltcFlag}}<div><b>ltcFlag</b>: {{ltcFlag}}</div>{{/ltcFlag}}
                    {{#neutralStep}}<div><b>neutralStep</b>: {{neutralStep}}</div>{{/neutralStep}}
                    {{#neutralU}}<div><b>neutralU</b>: {{neutralU}}</div>{{/neutralU}}
                    {{#normalStep}}<div><b>normalStep</b>: {{normalStep}}</div>{{/normalStep}}
                    {{#subsequentDelay}}<div><b>subsequentDelay</b>: {{subsequentDelay}}</div>{{/subsequentDelay}}
                    {{#controlEnabled}}<div><b>controlEnabled</b>: {{controlEnabled}}</div>{{/controlEnabled}}
                    {{#step}}<div><b>step</b>: {{step}}</div>{{/step}}
                    {{#TapSchedules}}<div><b>TapSchedules</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TapSchedules}}
                    {{#TapChangerControl}}<div><b>TapChangerControl</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TapChangerControl}}&quot;);})'>{{TapChangerControl}}</a></div>{{/TapChangerControl}}
                    {{#SvTapStep}}<div><b>SvTapStep</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{SvTapStep}}&quot;);})'>{{SvTapStep}}</a></div>{{/SvTapStep}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TapSchedules) obj.TapSchedules_string = obj.TapSchedules.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TapSchedules_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TapChanger_collapse" aria-expanded="true" aria-controls="TapChanger_collapse" style="margin-left: 10px;">TapChanger</a></legend>
                    <div id="TapChanger_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='highStep'>highStep: </label><div class='col-sm-8'><input id='highStep' class='form-control' type='text'{{#highStep}} value='{{highStep}}'{{/highStep}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='initialDelay'>initialDelay: </label><div class='col-sm-8'><input id='initialDelay' class='form-control' type='text'{{#initialDelay}} value='{{initialDelay}}'{{/initialDelay}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='lowStep'>lowStep: </label><div class='col-sm-8'><input id='lowStep' class='form-control' type='text'{{#lowStep}} value='{{lowStep}}'{{/lowStep}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='ltcFlag'>ltcFlag: </label><div class='col-sm-8'><input id='ltcFlag' class='form-check-input' type='checkbox'{{#ltcFlag}} checked{{/ltcFlag}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='neutralStep'>neutralStep: </label><div class='col-sm-8'><input id='neutralStep' class='form-control' type='text'{{#neutralStep}} value='{{neutralStep}}'{{/neutralStep}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='neutralU'>neutralU: </label><div class='col-sm-8'><input id='neutralU' class='form-control' type='text'{{#neutralU}} value='{{neutralU}}'{{/neutralU}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='normalStep'>normalStep: </label><div class='col-sm-8'><input id='normalStep' class='form-control' type='text'{{#normalStep}} value='{{normalStep}}'{{/normalStep}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='subsequentDelay'>subsequentDelay: </label><div class='col-sm-8'><input id='subsequentDelay' class='form-control' type='text'{{#subsequentDelay}} value='{{subsequentDelay}}'{{/subsequentDelay}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='controlEnabled'>controlEnabled: </label><div class='col-sm-8'><input id='controlEnabled' class='form-check-input' type='checkbox'{{#controlEnabled}} checked{{/controlEnabled}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='step'>step: </label><div class='col-sm-8'><input id='step' class='form-control' type='text'{{#step}} value='{{step}}'{{/step}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TapChangerControl'>TapChangerControl: </label><div class='col-sm-8'><input id='TapChangerControl' class='form-control' type='text'{{#TapChangerControl}} value='{{TapChangerControl}}'{{/TapChangerControl}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='SvTapStep'>SvTapStep: </label><div class='col-sm-8'><input id='SvTapStep' class='form-control' type='text'{{#SvTapStep}} value='{{SvTapStep}}'{{/SvTapStep}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["TapSchedules", "TapSchedule", "0..*", "1"],
                        ["TapChangerControl", "TapChangerControl", "0..1", "0..*"],
                        ["SvTapStep", "SvTapStep", "0..1", "1"]
                    ]
                );
            }
        }

        /**
         * A generic equivalent for an energy supplier on a transmission or distribution voltage level.
         *
         */
        class EnergySource extends Core.ConductingEquipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.EnergySource;
                if (null == bucket)
                   cim_data.EnergySource = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.EnergySource[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.ConductingEquipment.prototype.parse.call (this, context, sub);
                obj.cls = "EnergySource";
                base.parse_element (/<cim:EnergySource.activePower>([\s\S]*?)<\/cim:EnergySource.activePower>/g, obj, "activePower", base.to_string, sub, context);
                base.parse_element (/<cim:EnergySource.nominalVoltage>([\s\S]*?)<\/cim:EnergySource.nominalVoltage>/g, obj, "nominalVoltage", base.to_string, sub, context);
                base.parse_element (/<cim:EnergySource.r>([\s\S]*?)<\/cim:EnergySource.r>/g, obj, "r", base.to_string, sub, context);
                base.parse_element (/<cim:EnergySource.r0>([\s\S]*?)<\/cim:EnergySource.r0>/g, obj, "r0", base.to_string, sub, context);
                base.parse_element (/<cim:EnergySource.rn>([\s\S]*?)<\/cim:EnergySource.rn>/g, obj, "rn", base.to_string, sub, context);
                base.parse_element (/<cim:EnergySource.voltageAngle>([\s\S]*?)<\/cim:EnergySource.voltageAngle>/g, obj, "voltageAngle", base.to_string, sub, context);
                base.parse_element (/<cim:EnergySource.voltageMagnitude>([\s\S]*?)<\/cim:EnergySource.voltageMagnitude>/g, obj, "voltageMagnitude", base.to_string, sub, context);
                base.parse_element (/<cim:EnergySource.x>([\s\S]*?)<\/cim:EnergySource.x>/g, obj, "x", base.to_string, sub, context);
                base.parse_element (/<cim:EnergySource.x0>([\s\S]*?)<\/cim:EnergySource.x0>/g, obj, "x0", base.to_string, sub, context);
                base.parse_element (/<cim:EnergySource.xn>([\s\S]*?)<\/cim:EnergySource.xn>/g, obj, "xn", base.to_string, sub, context);
                base.parse_element (/<cim:EnergySource.reactivePower>([\s\S]*?)<\/cim:EnergySource.reactivePower>/g, obj, "reactivePower", base.to_string, sub, context);
                base.parse_attribute (/<cim:EnergySource.WindTurbineType3or4Dynamics\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "WindTurbineType3or4Dynamics", sub, context);
                base.parse_attribute (/<cim:EnergySource.EnergySourceAction\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "EnergySourceAction", sub, context);
                base.parse_attribute (/<cim:EnergySource.EnergySchedulingType\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "EnergySchedulingType", sub, context);
                var bucket = context.parsed.EnergySource;
                if (null == bucket)
                   context.parsed.EnergySource = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.ConductingEquipment.prototype.export.call (this, obj, false);

                base.export_element (obj, "EnergySource", "activePower", base.from_string, fields);
                base.export_element (obj, "EnergySource", "nominalVoltage", base.from_string, fields);
                base.export_element (obj, "EnergySource", "r", base.from_string, fields);
                base.export_element (obj, "EnergySource", "r0", base.from_string, fields);
                base.export_element (obj, "EnergySource", "rn", base.from_string, fields);
                base.export_element (obj, "EnergySource", "voltageAngle", base.from_string, fields);
                base.export_element (obj, "EnergySource", "voltageMagnitude", base.from_string, fields);
                base.export_element (obj, "EnergySource", "x", base.from_string, fields);
                base.export_element (obj, "EnergySource", "x0", base.from_string, fields);
                base.export_element (obj, "EnergySource", "xn", base.from_string, fields);
                base.export_element (obj, "EnergySource", "reactivePower", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "EnergySource", fields);
                base.export_attribute (obj, "export_attribute", "EnergySource", fields);
                base.export_attribute (obj, "export_attribute", "EnergySource", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#EnergySource_collapse" aria-expanded="true" aria-controls="EnergySource_collapse" style="margin-left: 10px;">EnergySource</a></legend>
                    <div id="EnergySource_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.template.call (this) +
                    `
                    {{#activePower}}<div><b>activePower</b>: {{activePower}}</div>{{/activePower}}
                    {{#nominalVoltage}}<div><b>nominalVoltage</b>: {{nominalVoltage}}</div>{{/nominalVoltage}}
                    {{#r}}<div><b>r</b>: {{r}}</div>{{/r}}
                    {{#r0}}<div><b>r0</b>: {{r0}}</div>{{/r0}}
                    {{#rn}}<div><b>rn</b>: {{rn}}</div>{{/rn}}
                    {{#voltageAngle}}<div><b>voltageAngle</b>: {{voltageAngle}}</div>{{/voltageAngle}}
                    {{#voltageMagnitude}}<div><b>voltageMagnitude</b>: {{voltageMagnitude}}</div>{{/voltageMagnitude}}
                    {{#x}}<div><b>x</b>: {{x}}</div>{{/x}}
                    {{#x0}}<div><b>x0</b>: {{x0}}</div>{{/x0}}
                    {{#xn}}<div><b>xn</b>: {{xn}}</div>{{/xn}}
                    {{#reactivePower}}<div><b>reactivePower</b>: {{reactivePower}}</div>{{/reactivePower}}
                    {{#WindTurbineType3or4Dynamics}}<div><b>WindTurbineType3or4Dynamics</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{WindTurbineType3or4Dynamics}}&quot;);})'>{{WindTurbineType3or4Dynamics}}</a></div>{{/WindTurbineType3or4Dynamics}}
                    {{#EnergySourceAction}}<div><b>EnergySourceAction</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{EnergySourceAction}}&quot;);})'>{{EnergySourceAction}}</a></div>{{/EnergySourceAction}}
                    {{#EnergySchedulingType}}<div><b>EnergySchedulingType</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{EnergySchedulingType}}&quot;);})'>{{EnergySchedulingType}}</a></div>{{/EnergySchedulingType}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#EnergySource_collapse" aria-expanded="true" aria-controls="EnergySource_collapse" style="margin-left: 10px;">EnergySource</a></legend>
                    <div id="EnergySource_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='activePower'>activePower: </label><div class='col-sm-8'><input id='activePower' class='form-control' type='text'{{#activePower}} value='{{activePower}}'{{/activePower}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='nominalVoltage'>nominalVoltage: </label><div class='col-sm-8'><input id='nominalVoltage' class='form-control' type='text'{{#nominalVoltage}} value='{{nominalVoltage}}'{{/nominalVoltage}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r'>r: </label><div class='col-sm-8'><input id='r' class='form-control' type='text'{{#r}} value='{{r}}'{{/r}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r0'>r0: </label><div class='col-sm-8'><input id='r0' class='form-control' type='text'{{#r0}} value='{{r0}}'{{/r0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='rn'>rn: </label><div class='col-sm-8'><input id='rn' class='form-control' type='text'{{#rn}} value='{{rn}}'{{/rn}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='voltageAngle'>voltageAngle: </label><div class='col-sm-8'><input id='voltageAngle' class='form-control' type='text'{{#voltageAngle}} value='{{voltageAngle}}'{{/voltageAngle}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='voltageMagnitude'>voltageMagnitude: </label><div class='col-sm-8'><input id='voltageMagnitude' class='form-control' type='text'{{#voltageMagnitude}} value='{{voltageMagnitude}}'{{/voltageMagnitude}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x'>x: </label><div class='col-sm-8'><input id='x' class='form-control' type='text'{{#x}} value='{{x}}'{{/x}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x0'>x0: </label><div class='col-sm-8'><input id='x0' class='form-control' type='text'{{#x0}} value='{{x0}}'{{/x0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xn'>xn: </label><div class='col-sm-8'><input id='xn' class='form-control' type='text'{{#xn}} value='{{xn}}'{{/xn}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='reactivePower'>reactivePower: </label><div class='col-sm-8'><input id='reactivePower' class='form-control' type='text'{{#reactivePower}} value='{{reactivePower}}'{{/reactivePower}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='WindTurbineType3or4Dynamics'>WindTurbineType3or4Dynamics: </label><div class='col-sm-8'><input id='WindTurbineType3or4Dynamics' class='form-control' type='text'{{#WindTurbineType3or4Dynamics}} value='{{WindTurbineType3or4Dynamics}}'{{/WindTurbineType3or4Dynamics}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='EnergySourceAction'>EnergySourceAction: </label><div class='col-sm-8'><input id='EnergySourceAction' class='form-control' type='text'{{#EnergySourceAction}} value='{{EnergySourceAction}}'{{/EnergySourceAction}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='EnergySchedulingType'>EnergySchedulingType: </label><div class='col-sm-8'><input id='EnergySchedulingType' class='form-control' type='text'{{#EnergySchedulingType}} value='{{EnergySchedulingType}}'{{/EnergySchedulingType}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["WindTurbineType3or4Dynamics", "WindTurbineType3or4Dynamics", "0..1", "1"],
                        ["EnergySourceAction", "EnergySourceAction", "0..1", "0..1"],
                        ["EnergySchedulingType", "EnergySchedulingType", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Single phase of a multi-phase shunt compensator when its attributes might be different per phase.
         *
         */
        class ShuntCompensatorPhase extends Core.PowerSystemResource
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ShuntCompensatorPhase;
                if (null == bucket)
                   cim_data.ShuntCompensatorPhase = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ShuntCompensatorPhase[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.PowerSystemResource.prototype.parse.call (this, context, sub);
                obj.cls = "ShuntCompensatorPhase";
                base.parse_element (/<cim:ShuntCompensatorPhase.maximumSections>([\s\S]*?)<\/cim:ShuntCompensatorPhase.maximumSections>/g, obj, "maximumSections", base.to_string, sub, context);
                base.parse_element (/<cim:ShuntCompensatorPhase.normalSections>([\s\S]*?)<\/cim:ShuntCompensatorPhase.normalSections>/g, obj, "normalSections", base.to_string, sub, context);
                base.parse_attribute (/<cim:ShuntCompensatorPhase.phase\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "phase", sub, context);
                base.parse_attribute (/<cim:ShuntCompensatorPhase.ShuntCompensator\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ShuntCompensator", sub, context);
                var bucket = context.parsed.ShuntCompensatorPhase;
                if (null == bucket)
                   context.parsed.ShuntCompensatorPhase = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.PowerSystemResource.prototype.export.call (this, obj, false);

                base.export_element (obj, "ShuntCompensatorPhase", "maximumSections", base.from_string, fields);
                base.export_element (obj, "ShuntCompensatorPhase", "normalSections", base.from_string, fields);
                base.export_element (obj, "ShuntCompensatorPhase", "phase", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ShuntCompensatorPhase", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ShuntCompensatorPhase_collapse" aria-expanded="true" aria-controls="ShuntCompensatorPhase_collapse" style="margin-left: 10px;">ShuntCompensatorPhase</a></legend>
                    <div id="ShuntCompensatorPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.template.call (this) +
                    `
                    {{#maximumSections}}<div><b>maximumSections</b>: {{maximumSections}}</div>{{/maximumSections}}
                    {{#normalSections}}<div><b>normalSections</b>: {{normalSections}}</div>{{/normalSections}}
                    {{#phase}}<div><b>phase</b>: {{phase}}</div>{{/phase}}
                    {{#ShuntCompensator}}<div><b>ShuntCompensator</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ShuntCompensator}}&quot;);})'>{{ShuntCompensator}}</a></div>{{/ShuntCompensator}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.SinglePhaseKind = []; if (!obj.phase) obj.SinglePhaseKind.push ({ id: '', selected: true}); for (var property in SinglePhaseKind) obj.SinglePhaseKind.push ({ id: property, selected: obj.phase && obj.phase.endsWith ('.' + property)});
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.SinglePhaseKind;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ShuntCompensatorPhase_collapse" aria-expanded="true" aria-controls="ShuntCompensatorPhase_collapse" style="margin-left: 10px;">ShuntCompensatorPhase</a></legend>
                    <div id="ShuntCompensatorPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maximumSections'>maximumSections: </label><div class='col-sm-8'><input id='maximumSections' class='form-control' type='text'{{#maximumSections}} value='{{maximumSections}}'{{/maximumSections}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='normalSections'>normalSections: </label><div class='col-sm-8'><input id='normalSections' class='form-control' type='text'{{#normalSections}} value='{{normalSections}}'{{/normalSections}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='phase'>phase: </label><div class='col-sm-8'><select id='phase' class='form-control'>{{#SinglePhaseKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/SinglePhaseKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ShuntCompensator'>ShuntCompensator: </label><div class='col-sm-8'><input id='ShuntCompensator' class='form-control' type='text'{{#ShuntCompensator}} value='{{ShuntCompensator}}'{{/ShuntCompensator}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ShuntCompensator", "ShuntCompensator", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Single phase of a multi-phase switch when its attributes might be different per phase.
         *
         */
        class SwitchPhase extends Core.PowerSystemResource
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.SwitchPhase;
                if (null == bucket)
                   cim_data.SwitchPhase = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.SwitchPhase[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.PowerSystemResource.prototype.parse.call (this, context, sub);
                obj.cls = "SwitchPhase";
                base.parse_element (/<cim:SwitchPhase.normalOpen>([\s\S]*?)<\/cim:SwitchPhase.normalOpen>/g, obj, "normalOpen", base.to_boolean, sub, context);
                base.parse_attribute (/<cim:SwitchPhase.phaseSide1\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "phaseSide1", sub, context);
                base.parse_attribute (/<cim:SwitchPhase.phaseSide2\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "phaseSide2", sub, context);
                base.parse_element (/<cim:SwitchPhase.closed>([\s\S]*?)<\/cim:SwitchPhase.closed>/g, obj, "closed", base.to_boolean, sub, context);
                base.parse_attribute (/<cim:SwitchPhase.Switch\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Switch", sub, context);
                var bucket = context.parsed.SwitchPhase;
                if (null == bucket)
                   context.parsed.SwitchPhase = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.PowerSystemResource.prototype.export.call (this, obj, false);

                base.export_element (obj, "SwitchPhase", "normalOpen", base.from_boolean, fields);
                base.export_element (obj, "SwitchPhase", "phaseSide1", base.from_string, fields);
                base.export_element (obj, "SwitchPhase", "phaseSide2", base.from_string, fields);
                base.export_element (obj, "SwitchPhase", "closed", base.from_boolean, fields);
                base.export_attribute (obj, "export_attribute", "SwitchPhase", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#SwitchPhase_collapse" aria-expanded="true" aria-controls="SwitchPhase_collapse" style="margin-left: 10px;">SwitchPhase</a></legend>
                    <div id="SwitchPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.template.call (this) +
                    `
                    {{#normalOpen}}<div><b>normalOpen</b>: {{normalOpen}}</div>{{/normalOpen}}
                    {{#phaseSide1}}<div><b>phaseSide1</b>: {{phaseSide1}}</div>{{/phaseSide1}}
                    {{#phaseSide2}}<div><b>phaseSide2</b>: {{phaseSide2}}</div>{{/phaseSide2}}
                    {{#closed}}<div><b>closed</b>: {{closed}}</div>{{/closed}}
                    {{#Switch}}<div><b>Switch</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{Switch}}&quot;);})'>{{Switch}}</a></div>{{/Switch}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.SinglePhaseKind = []; if (!obj.phaseSide1) obj.SinglePhaseKind.push ({ id: '', selected: true}); for (var property in SinglePhaseKind) obj.SinglePhaseKind.push ({ id: property, selected: obj.phaseSide1 && obj.phaseSide1.endsWith ('.' + property)});
                obj.SinglePhaseKind = []; if (!obj.phaseSide2) obj.SinglePhaseKind.push ({ id: '', selected: true}); for (var property in SinglePhaseKind) obj.SinglePhaseKind.push ({ id: property, selected: obj.phaseSide2 && obj.phaseSide2.endsWith ('.' + property)});
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.SinglePhaseKind;
                delete obj.SinglePhaseKind;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#SwitchPhase_collapse" aria-expanded="true" aria-controls="SwitchPhase_collapse" style="margin-left: 10px;">SwitchPhase</a></legend>
                    <div id="SwitchPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.PowerSystemResource.prototype.edit_template.call (this) +
                    `
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='normalOpen'>normalOpen: </label><div class='col-sm-8'><input id='normalOpen' class='form-check-input' type='checkbox'{{#normalOpen}} checked{{/normalOpen}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='phaseSide1'>phaseSide1: </label><div class='col-sm-8'><select id='phaseSide1' class='form-control'>{{#SinglePhaseKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/SinglePhaseKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='phaseSide2'>phaseSide2: </label><div class='col-sm-8'><select id='phaseSide2' class='form-control'>{{#SinglePhaseKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/SinglePhaseKind}}</select></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='closed'>closed: </label><div class='col-sm-8'><input id='closed' class='form-check-input' type='checkbox'{{#closed}} checked{{/closed}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='Switch'>Switch: </label><div class='col-sm-8'><input id='Switch' class='form-control' type='text'{{#Switch}} value='{{Switch}}'{{/Switch}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["Switch", "Switch", "1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A model of a set of individual Switches normally enclosed within the same cabinet and possibly with interlocks that restrict the combination of switch positions.
         *
         * These are typically found in medium voltage distribution networks.
         *
         */
        class CompositeSwitch extends Core.Equipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.CompositeSwitch;
                if (null == bucket)
                   cim_data.CompositeSwitch = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.CompositeSwitch[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.Equipment.prototype.parse.call (this, context, sub);
                obj.cls = "CompositeSwitch";
                base.parse_element (/<cim:CompositeSwitch.compositeSwitchType>([\s\S]*?)<\/cim:CompositeSwitch.compositeSwitchType>/g, obj, "compositeSwitchType", base.to_string, sub, context);
                base.parse_attributes (/<cim:CompositeSwitch.Switches\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Switches", sub, context);
                var bucket = context.parsed.CompositeSwitch;
                if (null == bucket)
                   context.parsed.CompositeSwitch = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.Equipment.prototype.export.call (this, obj, false);

                base.export_element (obj, "CompositeSwitch", "compositeSwitchType", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "CompositeSwitch", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#CompositeSwitch_collapse" aria-expanded="true" aria-controls="CompositeSwitch_collapse" style="margin-left: 10px;">CompositeSwitch</a></legend>
                    <div id="CompositeSwitch_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.Equipment.prototype.template.call (this) +
                    `
                    {{#compositeSwitchType}}<div><b>compositeSwitchType</b>: {{compositeSwitchType}}</div>{{/compositeSwitchType}}
                    {{#Switches}}<div><b>Switches</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Switches}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.Switches) obj.Switches_string = obj.Switches.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.Switches_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#CompositeSwitch_collapse" aria-expanded="true" aria-controls="CompositeSwitch_collapse" style="margin-left: 10px;">CompositeSwitch</a></legend>
                    <div id="CompositeSwitch_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.Equipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='compositeSwitchType'>compositeSwitchType: </label><div class='col-sm-8'><input id='compositeSwitchType' class='form-control' type='text'{{#compositeSwitchType}} value='{{compositeSwitchType}}'{{/compositeSwitchType}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["Switches", "Switch", "0..*", "0..1"]
                    ]
                );
            }
        }

        /**
         * A type of conducting equipment that can regulate a quantity (i.e. voltage or flow) at a specific point in the network.
         *
         */
        class RegulatingCondEq extends Core.ConductingEquipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.RegulatingCondEq;
                if (null == bucket)
                   cim_data.RegulatingCondEq = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.RegulatingCondEq[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.ConductingEquipment.prototype.parse.call (this, context, sub);
                obj.cls = "RegulatingCondEq";
                base.parse_element (/<cim:RegulatingCondEq.controlEnabled>([\s\S]*?)<\/cim:RegulatingCondEq.controlEnabled>/g, obj, "controlEnabled", base.to_boolean, sub, context);
                base.parse_attribute (/<cim:RegulatingCondEq.RegulatingControl\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RegulatingControl", sub, context);
                var bucket = context.parsed.RegulatingCondEq;
                if (null == bucket)
                   context.parsed.RegulatingCondEq = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.ConductingEquipment.prototype.export.call (this, obj, false);

                base.export_element (obj, "RegulatingCondEq", "controlEnabled", base.from_boolean, fields);
                base.export_attribute (obj, "export_attribute", "RegulatingCondEq", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RegulatingCondEq_collapse" aria-expanded="true" aria-controls="RegulatingCondEq_collapse" style="margin-left: 10px;">RegulatingCondEq</a></legend>
                    <div id="RegulatingCondEq_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.template.call (this) +
                    `
                    {{#controlEnabled}}<div><b>controlEnabled</b>: {{controlEnabled}}</div>{{/controlEnabled}}
                    {{#RegulatingControl}}<div><b>RegulatingControl</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{RegulatingControl}}&quot;);})'>{{RegulatingControl}}</a></div>{{/RegulatingControl}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RegulatingCondEq_collapse" aria-expanded="true" aria-controls="RegulatingCondEq_collapse" style="margin-left: 10px;">RegulatingCondEq</a></legend>
                    <div id="RegulatingCondEq_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='controlEnabled'>controlEnabled: </label><div class='col-sm-8'><input id='controlEnabled' class='form-check-input' type='checkbox'{{#controlEnabled}} checked{{/controlEnabled}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='RegulatingControl'>RegulatingControl: </label><div class='col-sm-8'><input id='RegulatingControl' class='form-control' type='text'{{#RegulatingControl}} value='{{RegulatingControl}}'{{/RegulatingControl}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["RegulatingControl", "RegulatingControl", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * A point where the system is grounded used for connecting conducting equipment to ground.
         *
         * The power system model can have any number of grounds.
         *
         */
        class Ground extends Core.ConductingEquipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Ground;
                if (null == bucket)
                   cim_data.Ground = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Ground[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.ConductingEquipment.prototype.parse.call (this, context, sub);
                obj.cls = "Ground";
                base.parse_attribute (/<cim:Ground.GroundAction\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "GroundAction", sub, context);
                var bucket = context.parsed.Ground;
                if (null == bucket)
                   context.parsed.Ground = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.ConductingEquipment.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "Ground", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Ground_collapse" aria-expanded="true" aria-controls="Ground_collapse" style="margin-left: 10px;">Ground</a></legend>
                    <div id="Ground_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.template.call (this) +
                    `
                    {{#GroundAction}}<div><b>GroundAction</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{GroundAction}}&quot;);})'>{{GroundAction}}</a></div>{{/GroundAction}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Ground_collapse" aria-expanded="true" aria-controls="Ground_collapse" style="margin-left: 10px;">Ground</a></legend>
                    <div id="Ground_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='GroundAction'>GroundAction: </label><div class='col-sm-8'><input id='GroundAction' class='form-control' type='text'{{#GroundAction}} value='{{GroundAction}}'{{/GroundAction}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["GroundAction", "GroundAction", "0..1", "0..1"]
                    ]
                );
            }
        }

        /**
         * Combination of conducting material with consistent electrical characteristics, building a single electrical system, used to carry current between points in the power system.
         *
         */
        class Conductor extends Core.ConductingEquipment
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Conductor;
                if (null == bucket)
                   cim_data.Conductor = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Conductor[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.ConductingEquipment.prototype.parse.call (this, context, sub);
                obj.cls = "Conductor";
                base.parse_element (/<cim:Conductor.length>([\s\S]*?)<\/cim:Conductor.length>/g, obj, "length", base.to_string, sub, context);
                var bucket = context.parsed.Conductor;
                if (null == bucket)
                   context.parsed.Conductor = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.ConductingEquipment.prototype.export.call (this, obj, false);

                base.export_element (obj, "Conductor", "length", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Conductor_collapse" aria-expanded="true" aria-controls="Conductor_collapse" style="margin-left: 10px;">Conductor</a></legend>
                    <div id="Conductor_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.template.call (this) +
                    `
                    {{#length}}<div><b>length</b>: {{length}}</div>{{/length}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Conductor_collapse" aria-expanded="true" aria-controls="Conductor_collapse" style="margin-left: 10px;">Conductor</a></legend>
                    <div id="Conductor_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.ConductingEquipment.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='length'>length: </label><div class='col-sm-8'><input id='length' class='form-control' type='text'{{#length}} value='{{length}}'{{/length}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A Plant is a collection of equipment for purposes of generation.
         *
         */
        class Plant extends Core.EquipmentContainer
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Plant;
                if (null == bucket)
                   cim_data.Plant = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Plant[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Core.EquipmentContainer.prototype.parse.call (this, context, sub);
                obj.cls = "Plant";
                var bucket = context.parsed.Plant;
                if (null == bucket)
                   context.parsed.Plant = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Core.EquipmentContainer.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Plant_collapse" aria-expanded="true" aria-controls="Plant_collapse" style="margin-left: 10px;">Plant</a></legend>
                    <div id="Plant_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.EquipmentContainer.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Plant_collapse" aria-expanded="true" aria-controls="Plant_collapse" style="margin-left: 10px;">Plant</a></legend>
                    <div id="Plant_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Core.EquipmentContainer.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * Automatic switch that will lock open to isolate a faulted section.
         *
         * It may, or may not, have load breaking capability. Its primary purpose is to provide fault sectionalising at locations where the fault current is either too high, or too low, for proper coordination of fuses.
         *
         */
        class Sectionaliser extends Switch
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Sectionaliser;
                if (null == bucket)
                   cim_data.Sectionaliser = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Sectionaliser[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Switch.prototype.parse.call (this, context, sub);
                obj.cls = "Sectionaliser";
                var bucket = context.parsed.Sectionaliser;
                if (null == bucket)
                   context.parsed.Sectionaliser = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Switch.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Sectionaliser_collapse" aria-expanded="true" aria-controls="Sectionaliser_collapse" style="margin-left: 10px;">Sectionaliser</a></legend>
                    <div id="Sectionaliser_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Sectionaliser_collapse" aria-expanded="true" aria-controls="Sectionaliser_collapse" style="margin-left: 10px;">Sectionaliser</a></legend>
                    <div id="Sectionaliser_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * An overcurrent protective device with a circuit opening fusible part that is heated and severed by the passage of overcurrent through it.
         *
         * A fuse is considered a switching device because it breaks current.
         *
         */
        class Fuse extends Switch
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Fuse;
                if (null == bucket)
                   cim_data.Fuse = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Fuse[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Switch.prototype.parse.call (this, context, sub);
                obj.cls = "Fuse";
                var bucket = context.parsed.Fuse;
                if (null == bucket)
                   context.parsed.Fuse = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Switch.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Fuse_collapse" aria-expanded="true" aria-controls="Fuse_collapse" style="margin-left: 10px;">Fuse</a></legend>
                    <div id="Fuse_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Fuse_collapse" aria-expanded="true" aria-controls="Fuse_collapse" style="margin-left: 10px;">Fuse</a></legend>
                    <div id="Fuse_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A manually operated or motor operated mechanical switching device used for isolating a circuit or equipment from ground.
         *
         */
        class GroundDisconnector extends Switch
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.GroundDisconnector;
                if (null == bucket)
                   cim_data.GroundDisconnector = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.GroundDisconnector[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Switch.prototype.parse.call (this, context, sub);
                obj.cls = "GroundDisconnector";
                var bucket = context.parsed.GroundDisconnector;
                if (null == bucket)
                   context.parsed.GroundDisconnector = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Switch.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#GroundDisconnector_collapse" aria-expanded="true" aria-controls="GroundDisconnector_collapse" style="margin-left: 10px;">GroundDisconnector</a></legend>
                    <div id="GroundDisconnector_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#GroundDisconnector_collapse" aria-expanded="true" aria-controls="GroundDisconnector_collapse" style="margin-left: 10px;">GroundDisconnector</a></legend>
                    <div id="GroundDisconnector_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A ProtectedSwitch is a switching device that can be operated by ProtectionEquipment.
         *
         */
        class ProtectedSwitch extends Switch
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ProtectedSwitch;
                if (null == bucket)
                   cim_data.ProtectedSwitch = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ProtectedSwitch[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Switch.prototype.parse.call (this, context, sub);
                obj.cls = "ProtectedSwitch";
                base.parse_element (/<cim:ProtectedSwitch.breakingCapacity>([\s\S]*?)<\/cim:ProtectedSwitch.breakingCapacity>/g, obj, "breakingCapacity", base.to_string, sub, context);
                base.parse_attributes (/<cim:ProtectedSwitch.RecloseSequences\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RecloseSequences", sub, context);
                base.parse_attributes (/<cim:ProtectedSwitch.OperatedByProtectionEquipment\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "OperatedByProtectionEquipment", sub, context);
                var bucket = context.parsed.ProtectedSwitch;
                if (null == bucket)
                   context.parsed.ProtectedSwitch = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Switch.prototype.export.call (this, obj, false);

                base.export_element (obj, "ProtectedSwitch", "breakingCapacity", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "ProtectedSwitch", fields);
                base.export_attribute (obj, "export_attributes", "ProtectedSwitch", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ProtectedSwitch_collapse" aria-expanded="true" aria-controls="ProtectedSwitch_collapse" style="margin-left: 10px;">ProtectedSwitch</a></legend>
                    <div id="ProtectedSwitch_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.template.call (this) +
                    `
                    {{#breakingCapacity}}<div><b>breakingCapacity</b>: {{breakingCapacity}}</div>{{/breakingCapacity}}
                    {{#RecloseSequences}}<div><b>RecloseSequences</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/RecloseSequences}}
                    {{#OperatedByProtectionEquipment}}<div><b>OperatedByProtectionEquipment</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/OperatedByProtectionEquipment}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.RecloseSequences) obj.RecloseSequences_string = obj.RecloseSequences.join ();
                if (obj.OperatedByProtectionEquipment) obj.OperatedByProtectionEquipment_string = obj.OperatedByProtectionEquipment.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.RecloseSequences_string;
                delete obj.OperatedByProtectionEquipment_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ProtectedSwitch_collapse" aria-expanded="true" aria-controls="ProtectedSwitch_collapse" style="margin-left: 10px;">ProtectedSwitch</a></legend>
                    <div id="ProtectedSwitch_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='breakingCapacity'>breakingCapacity: </label><div class='col-sm-8'><input id='breakingCapacity' class='form-control' type='text'{{#breakingCapacity}} value='{{breakingCapacity}}'{{/breakingCapacity}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='OperatedByProtectionEquipment'>OperatedByProtectionEquipment: </label><div class='col-sm-8'><input id='OperatedByProtectionEquipment' class='form-control' type='text'{{#OperatedByProtectionEquipment}} value='{{OperatedByProtectionEquipment}}_string'{{/OperatedByProtectionEquipment}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["RecloseSequences", "RecloseSequence", "0..*", "1"],
                        ["OperatedByProtectionEquipment", "ProtectionEquipment", "0..*", "0..*"]
                    ]
                );
            }
        }

        /**
         * A cut separates a line segment into two parts.
         *
         * The cut appears as a switch inserted between these two parts and connects them together. As the cut is normally open there is no galvanic connection between the two line segment parts. But it is possible to close the cut to get galvanic connection.
         *
         */
        class Cut extends Switch
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Cut;
                if (null == bucket)
                   cim_data.Cut = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Cut[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Switch.prototype.parse.call (this, context, sub);
                obj.cls = "Cut";
                base.parse_element (/<cim:Cut.lengthFromTerminal1>([\s\S]*?)<\/cim:Cut.lengthFromTerminal1>/g, obj, "lengthFromTerminal1", base.to_string, sub, context);
                base.parse_attribute (/<cim:Cut.ACLineSegment\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ACLineSegment", sub, context);
                base.parse_attribute (/<cim:Cut.CutAction\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "CutAction", sub, context);
                var bucket = context.parsed.Cut;
                if (null == bucket)
                   context.parsed.Cut = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Switch.prototype.export.call (this, obj, false);

                base.export_element (obj, "Cut", "lengthFromTerminal1", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "Cut", fields);
                base.export_attribute (obj, "export_attribute", "Cut", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Cut_collapse" aria-expanded="true" aria-controls="Cut_collapse" style="margin-left: 10px;">Cut</a></legend>
                    <div id="Cut_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.template.call (this) +
                    `
                    {{#lengthFromTerminal1}}<div><b>lengthFromTerminal1</b>: {{lengthFromTerminal1}}</div>{{/lengthFromTerminal1}}
                    {{#ACLineSegment}}<div><b>ACLineSegment</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{ACLineSegment}}&quot;);})'>{{ACLineSegment}}</a></div>{{/ACLineSegment}}
                    {{#CutAction}}<div><b>CutAction</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{CutAction}}&quot;);})'>{{CutAction}}</a></div>{{/CutAction}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Cut_collapse" aria-expanded="true" aria-controls="Cut_collapse" style="margin-left: 10px;">Cut</a></legend>
                    <div id="Cut_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='lengthFromTerminal1'>lengthFromTerminal1: </label><div class='col-sm-8'><input id='lengthFromTerminal1' class='form-control' type='text'{{#lengthFromTerminal1}} value='{{lengthFromTerminal1}}'{{/lengthFromTerminal1}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ACLineSegment'>ACLineSegment: </label><div class='col-sm-8'><input id='ACLineSegment' class='form-control' type='text'{{#ACLineSegment}} value='{{ACLineSegment}}'{{/ACLineSegment}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='CutAction'>CutAction: </label><div class='col-sm-8'><input id='CutAction' class='form-control' type='text'{{#CutAction}} value='{{CutAction}}'{{/CutAction}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ACLineSegment", "ACLineSegment", "1", "0..*"],
                        ["CutAction", "CutAction", "0..1", "0..1"]
                    ]
                );
            }
        }

        /**
         * A mechanical switching device capable of making, carrying, and breaking currents under normal circuit conditions and also making, carrying for a specified time, and breaking currents under specified abnormal circuit conditions e.g.  those of short circuit.
         *
         */
        class Breaker extends ProtectedSwitch
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Breaker;
                if (null == bucket)
                   cim_data.Breaker = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Breaker[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ProtectedSwitch.prototype.parse.call (this, context, sub);
                obj.cls = "Breaker";
                base.parse_element (/<cim:Breaker.inTransitTime>([\s\S]*?)<\/cim:Breaker.inTransitTime>/g, obj, "inTransitTime", base.to_string, sub, context);
                var bucket = context.parsed.Breaker;
                if (null == bucket)
                   context.parsed.Breaker = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ProtectedSwitch.prototype.export.call (this, obj, false);

                base.export_element (obj, "Breaker", "inTransitTime", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Breaker_collapse" aria-expanded="true" aria-controls="Breaker_collapse" style="margin-left: 10px;">Breaker</a></legend>
                    <div id="Breaker_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ProtectedSwitch.prototype.template.call (this) +
                    `
                    {{#inTransitTime}}<div><b>inTransitTime</b>: {{inTransitTime}}</div>{{/inTransitTime}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Breaker_collapse" aria-expanded="true" aria-controls="Breaker_collapse" style="margin-left: 10px;">Breaker</a></legend>
                    <div id="Breaker_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ProtectedSwitch.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='inTransitTime'>inTransitTime: </label><div class='col-sm-8'><input id='inTransitTime' class='form-control' type='text'{{#inTransitTime}} value='{{inTransitTime}}'{{/inTransitTime}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A short section of conductor with negligible impedance which can be manually removed and replaced if the circuit is de-energized.
         *
         * Note that zero-impedance branches can potentially be modeled by other equipment types.
         *
         */
        class Jumper extends Switch
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Jumper;
                if (null == bucket)
                   cim_data.Jumper = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Jumper[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Switch.prototype.parse.call (this, context, sub);
                obj.cls = "Jumper";
                base.parse_attribute (/<cim:Jumper.JumperAction\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "JumperAction", sub, context);
                var bucket = context.parsed.Jumper;
                if (null == bucket)
                   context.parsed.Jumper = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Switch.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "Jumper", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Jumper_collapse" aria-expanded="true" aria-controls="Jumper_collapse" style="margin-left: 10px;">Jumper</a></legend>
                    <div id="Jumper_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.template.call (this) +
                    `
                    {{#JumperAction}}<div><b>JumperAction</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{JumperAction}}&quot;);})'>{{JumperAction}}</a></div>{{/JumperAction}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Jumper_collapse" aria-expanded="true" aria-controls="Jumper_collapse" style="margin-left: 10px;">Jumper</a></legend>
                    <div id="Jumper_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='JumperAction'>JumperAction: </label><div class='col-sm-8'><input id='JumperAction' class='form-control' type='text'{{#JumperAction}} value='{{JumperAction}}'{{/JumperAction}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["JumperAction", "JumperAction", "0..1", "0..1"]
                    ]
                );
            }
        }

        /**
         * Pole-mounted fault interrupter with built-in phase and ground relays, current transformer (CT), and supplemental controls.
         *
         */
        class Recloser extends ProtectedSwitch
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Recloser;
                if (null == bucket)
                   cim_data.Recloser = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Recloser[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ProtectedSwitch.prototype.parse.call (this, context, sub);
                obj.cls = "Recloser";
                var bucket = context.parsed.Recloser;
                if (null == bucket)
                   context.parsed.Recloser = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ProtectedSwitch.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Recloser_collapse" aria-expanded="true" aria-controls="Recloser_collapse" style="margin-left: 10px;">Recloser</a></legend>
                    <div id="Recloser_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ProtectedSwitch.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Recloser_collapse" aria-expanded="true" aria-controls="Recloser_collapse" style="margin-left: 10px;">Recloser</a></legend>
                    <div id="Recloser_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ProtectedSwitch.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A manually operated or motor operated mechanical switching device used for changing the connections in a circuit, or for isolating a circuit or equipment from a source of power.
         *
         * It is required to open or close circuits when negligible current is broken or made.
         *
         */
        class Disconnector extends Switch
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Disconnector;
                if (null == bucket)
                   cim_data.Disconnector = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Disconnector[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Switch.prototype.parse.call (this, context, sub);
                obj.cls = "Disconnector";
                var bucket = context.parsed.Disconnector;
                if (null == bucket)
                   context.parsed.Disconnector = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Switch.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Disconnector_collapse" aria-expanded="true" aria-controls="Disconnector_collapse" style="margin-left: 10px;">Disconnector</a></legend>
                    <div id="Disconnector_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Disconnector_collapse" aria-expanded="true" aria-controls="Disconnector_collapse" style="margin-left: 10px;">Disconnector</a></legend>
                    <div id="Disconnector_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Switch.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A mechanical switching device capable of making, carrying, and breaking currents under normal operating conditions.
         *
         */
        class LoadBreakSwitch extends ProtectedSwitch
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.LoadBreakSwitch;
                if (null == bucket)
                   cim_data.LoadBreakSwitch = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.LoadBreakSwitch[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ProtectedSwitch.prototype.parse.call (this, context, sub);
                obj.cls = "LoadBreakSwitch";
                var bucket = context.parsed.LoadBreakSwitch;
                if (null == bucket)
                   context.parsed.LoadBreakSwitch = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ProtectedSwitch.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#LoadBreakSwitch_collapse" aria-expanded="true" aria-controls="LoadBreakSwitch_collapse" style="margin-left: 10px;">LoadBreakSwitch</a></legend>
                    <div id="LoadBreakSwitch_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ProtectedSwitch.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#LoadBreakSwitch_collapse" aria-expanded="true" aria-controls="LoadBreakSwitch_collapse" style="margin-left: 10px;">LoadBreakSwitch</a></legend>
                    <div id="LoadBreakSwitch_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ProtectedSwitch.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * Describes each tap step in the phase tap changer tabular curve.
         *
         */
        class PhaseTapChangerTablePoint extends TapChangerTablePoint
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PhaseTapChangerTablePoint;
                if (null == bucket)
                   cim_data.PhaseTapChangerTablePoint = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PhaseTapChangerTablePoint[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = TapChangerTablePoint.prototype.parse.call (this, context, sub);
                obj.cls = "PhaseTapChangerTablePoint";
                base.parse_element (/<cim:PhaseTapChangerTablePoint.angle>([\s\S]*?)<\/cim:PhaseTapChangerTablePoint.angle>/g, obj, "angle", base.to_string, sub, context);
                base.parse_attribute (/<cim:PhaseTapChangerTablePoint.PhaseTapChangerTable\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PhaseTapChangerTable", sub, context);
                var bucket = context.parsed.PhaseTapChangerTablePoint;
                if (null == bucket)
                   context.parsed.PhaseTapChangerTablePoint = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = TapChangerTablePoint.prototype.export.call (this, obj, false);

                base.export_element (obj, "PhaseTapChangerTablePoint", "angle", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "PhaseTapChangerTablePoint", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerTablePoint_collapse" aria-expanded="true" aria-controls="PhaseTapChangerTablePoint_collapse" style="margin-left: 10px;">PhaseTapChangerTablePoint</a></legend>
                    <div id="PhaseTapChangerTablePoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TapChangerTablePoint.prototype.template.call (this) +
                    `
                    {{#angle}}<div><b>angle</b>: {{angle}}</div>{{/angle}}
                    {{#PhaseTapChangerTable}}<div><b>PhaseTapChangerTable</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{PhaseTapChangerTable}}&quot;);})'>{{PhaseTapChangerTable}}</a></div>{{/PhaseTapChangerTable}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerTablePoint_collapse" aria-expanded="true" aria-controls="PhaseTapChangerTablePoint_collapse" style="margin-left: 10px;">PhaseTapChangerTablePoint</a></legend>
                    <div id="PhaseTapChangerTablePoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TapChangerTablePoint.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='angle'>angle: </label><div class='col-sm-8'><input id='angle' class='form-control' type='text'{{#angle}} value='{{angle}}'{{/angle}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='PhaseTapChangerTable'>PhaseTapChangerTable: </label><div class='col-sm-8'><input id='PhaseTapChangerTable' class='form-control' type='text'{{#PhaseTapChangerTable}} value='{{PhaseTapChangerTable}}'{{/PhaseTapChangerTable}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["PhaseTapChangerTable", "PhaseTapChangerTable", "1", "1..*"]
                    ]
                );
            }
        }

        /**
         * Describes each tap step in the ratio tap changer tabular curve.
         *
         */
        class RatioTapChangerTablePoint extends TapChangerTablePoint
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.RatioTapChangerTablePoint;
                if (null == bucket)
                   cim_data.RatioTapChangerTablePoint = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.RatioTapChangerTablePoint[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = TapChangerTablePoint.prototype.parse.call (this, context, sub);
                obj.cls = "RatioTapChangerTablePoint";
                base.parse_attribute (/<cim:RatioTapChangerTablePoint.RatioTapChangerTable\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RatioTapChangerTable", sub, context);
                var bucket = context.parsed.RatioTapChangerTablePoint;
                if (null == bucket)
                   context.parsed.RatioTapChangerTablePoint = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = TapChangerTablePoint.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "RatioTapChangerTablePoint", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RatioTapChangerTablePoint_collapse" aria-expanded="true" aria-controls="RatioTapChangerTablePoint_collapse" style="margin-left: 10px;">RatioTapChangerTablePoint</a></legend>
                    <div id="RatioTapChangerTablePoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TapChangerTablePoint.prototype.template.call (this) +
                    `
                    {{#RatioTapChangerTable}}<div><b>RatioTapChangerTable</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{RatioTapChangerTable}}&quot;);})'>{{RatioTapChangerTable}}</a></div>{{/RatioTapChangerTable}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RatioTapChangerTablePoint_collapse" aria-expanded="true" aria-controls="RatioTapChangerTablePoint_collapse" style="margin-left: 10px;">RatioTapChangerTablePoint</a></legend>
                    <div id="RatioTapChangerTablePoint_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TapChangerTablePoint.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='RatioTapChangerTable'>RatioTapChangerTable: </label><div class='col-sm-8'><input id='RatioTapChangerTable' class='form-control' type='text'{{#RatioTapChangerTable}} value='{{RatioTapChangerTable}}'{{/RatioTapChangerTable}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["RatioTapChangerTable", "RatioTapChangerTable", "1", "1..*"]
                    ]
                );
            }
        }

        /**
         * A point where one or more conducting equipments are connected with zero resistance.
         *
         */
        class Junction extends Connector
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.Junction;
                if (null == bucket)
                   cim_data.Junction = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.Junction[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Connector.prototype.parse.call (this, context, sub);
                obj.cls = "Junction";
                var bucket = context.parsed.Junction;
                if (null == bucket)
                   context.parsed.Junction = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Connector.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Junction_collapse" aria-expanded="true" aria-controls="Junction_collapse" style="margin-left: 10px;">Junction</a></legend>
                    <div id="Junction_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Connector.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#Junction_collapse" aria-expanded="true" aria-controls="Junction_collapse" style="margin-left: 10px;">Junction</a></legend>
                    <div id="Junction_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Connector.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A conductor, or group of conductors, with negligible impedance, that serve to connect other conducting equipment within a single substation.
         *
         * Voltage measurements are typically obtained from VoltageTransformers that are connected to busbar sections. A bus bar section may have many physical terminals but for analysis is modelled with exactly one logical terminal.
         *
         */
        class BusbarSection extends Connector
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.BusbarSection;
                if (null == bucket)
                   cim_data.BusbarSection = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.BusbarSection[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Connector.prototype.parse.call (this, context, sub);
                obj.cls = "BusbarSection";
                base.parse_element (/<cim:BusbarSection.ipMax>([\s\S]*?)<\/cim:BusbarSection.ipMax>/g, obj, "ipMax", base.to_string, sub, context);
                base.parse_attribute (/<cim:BusbarSection.VoltageControlZone\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "VoltageControlZone", sub, context);
                var bucket = context.parsed.BusbarSection;
                if (null == bucket)
                   context.parsed.BusbarSection = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Connector.prototype.export.call (this, obj, false);

                base.export_element (obj, "BusbarSection", "ipMax", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "BusbarSection", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#BusbarSection_collapse" aria-expanded="true" aria-controls="BusbarSection_collapse" style="margin-left: 10px;">BusbarSection</a></legend>
                    <div id="BusbarSection_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Connector.prototype.template.call (this) +
                    `
                    {{#ipMax}}<div><b>ipMax</b>: {{ipMax}}</div>{{/ipMax}}
                    {{#VoltageControlZone}}<div><b>VoltageControlZone</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{VoltageControlZone}}&quot;);})'>{{VoltageControlZone}}</a></div>{{/VoltageControlZone}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#BusbarSection_collapse" aria-expanded="true" aria-controls="BusbarSection_collapse" style="margin-left: 10px;">BusbarSection</a></legend>
                    <div id="BusbarSection_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Connector.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ipMax'>ipMax: </label><div class='col-sm-8'><input id='ipMax' class='form-control' type='text'{{#ipMax}} value='{{ipMax}}'{{/ipMax}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='VoltageControlZone'>VoltageControlZone: </label><div class='col-sm-8'><input id='VoltageControlZone' class='form-control' type='text'{{#VoltageControlZone}} value='{{VoltageControlZone}}'{{/VoltageControlZone}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["VoltageControlZone", "VoltageControlZone", "0..1", "1"]
                    ]
                );
            }
        }

        /**
         * Common type for per-length impedance electrical catalogues.
         *
         */
        class PerLengthImpedance extends PerLengthLineParameter
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PerLengthImpedance;
                if (null == bucket)
                   cim_data.PerLengthImpedance = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PerLengthImpedance[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = PerLengthLineParameter.prototype.parse.call (this, context, sub);
                obj.cls = "PerLengthImpedance";
                base.parse_attributes (/<cim:PerLengthImpedance.ACLineSegments\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ACLineSegments", sub, context);
                var bucket = context.parsed.PerLengthImpedance;
                if (null == bucket)
                   context.parsed.PerLengthImpedance = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = PerLengthLineParameter.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "PerLengthImpedance", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PerLengthImpedance_collapse" aria-expanded="true" aria-controls="PerLengthImpedance_collapse" style="margin-left: 10px;">PerLengthImpedance</a></legend>
                    <div id="PerLengthImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PerLengthLineParameter.prototype.template.call (this) +
                    `
                    {{#ACLineSegments}}<div><b>ACLineSegments</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ACLineSegments}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.ACLineSegments) obj.ACLineSegments_string = obj.ACLineSegments.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.ACLineSegments_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PerLengthImpedance_collapse" aria-expanded="true" aria-controls="PerLengthImpedance_collapse" style="margin-left: 10px;">PerLengthImpedance</a></legend>
                    <div id="PerLengthImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PerLengthLineParameter.prototype.edit_template.call (this) +
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
                        ["ACLineSegments", "ACLineSegment", "0..*", "0..1"]
                    ]
                );
            }
        }

        /**
         * Impedance and admittance parameters per unit length for n-wire unbalanced lines, in matrix form.
         *
         */
        class PerLengthPhaseImpedance extends PerLengthImpedance
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PerLengthPhaseImpedance;
                if (null == bucket)
                   cim_data.PerLengthPhaseImpedance = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PerLengthPhaseImpedance[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = PerLengthImpedance.prototype.parse.call (this, context, sub);
                obj.cls = "PerLengthPhaseImpedance";
                base.parse_element (/<cim:PerLengthPhaseImpedance.conductorCount>([\s\S]*?)<\/cim:PerLengthPhaseImpedance.conductorCount>/g, obj, "conductorCount", base.to_string, sub, context);
                base.parse_attributes (/<cim:PerLengthPhaseImpedance.PhaseImpedanceData\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PhaseImpedanceData", sub, context);
                var bucket = context.parsed.PerLengthPhaseImpedance;
                if (null == bucket)
                   context.parsed.PerLengthPhaseImpedance = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = PerLengthImpedance.prototype.export.call (this, obj, false);

                base.export_element (obj, "PerLengthPhaseImpedance", "conductorCount", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "PerLengthPhaseImpedance", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PerLengthPhaseImpedance_collapse" aria-expanded="true" aria-controls="PerLengthPhaseImpedance_collapse" style="margin-left: 10px;">PerLengthPhaseImpedance</a></legend>
                    <div id="PerLengthPhaseImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PerLengthImpedance.prototype.template.call (this) +
                    `
                    {{#conductorCount}}<div><b>conductorCount</b>: {{conductorCount}}</div>{{/conductorCount}}
                    {{#PhaseImpedanceData}}<div><b>PhaseImpedanceData</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/PhaseImpedanceData}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.PhaseImpedanceData) obj.PhaseImpedanceData_string = obj.PhaseImpedanceData.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.PhaseImpedanceData_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PerLengthPhaseImpedance_collapse" aria-expanded="true" aria-controls="PerLengthPhaseImpedance_collapse" style="margin-left: 10px;">PerLengthPhaseImpedance</a></legend>
                    <div id="PerLengthPhaseImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PerLengthImpedance.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='conductorCount'>conductorCount: </label><div class='col-sm-8'><input id='conductorCount' class='form-control' type='text'{{#conductorCount}} value='{{conductorCount}}'{{/conductorCount}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["PhaseImpedanceData", "PhaseImpedanceData", "1..*", "1"]
                    ]
                );
            }
        }

        /**
         * Sequence impedance and admittance parameters per unit length, for transposed lines of 1, 2, or 3 phases.
         *
         * For 1-phase lines, define x=x0=xself. For 2-phase lines, define x=xs-xm and x0=xs+xm.
         *
         */
        class PerLengthSequenceImpedance extends PerLengthImpedance
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PerLengthSequenceImpedance;
                if (null == bucket)
                   cim_data.PerLengthSequenceImpedance = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PerLengthSequenceImpedance[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = PerLengthImpedance.prototype.parse.call (this, context, sub);
                obj.cls = "PerLengthSequenceImpedance";
                base.parse_element (/<cim:PerLengthSequenceImpedance.b0ch>([\s\S]*?)<\/cim:PerLengthSequenceImpedance.b0ch>/g, obj, "b0ch", base.to_string, sub, context);
                base.parse_element (/<cim:PerLengthSequenceImpedance.bch>([\s\S]*?)<\/cim:PerLengthSequenceImpedance.bch>/g, obj, "bch", base.to_string, sub, context);
                base.parse_element (/<cim:PerLengthSequenceImpedance.g0ch>([\s\S]*?)<\/cim:PerLengthSequenceImpedance.g0ch>/g, obj, "g0ch", base.to_string, sub, context);
                base.parse_element (/<cim:PerLengthSequenceImpedance.gch>([\s\S]*?)<\/cim:PerLengthSequenceImpedance.gch>/g, obj, "gch", base.to_string, sub, context);
                base.parse_element (/<cim:PerLengthSequenceImpedance.r>([\s\S]*?)<\/cim:PerLengthSequenceImpedance.r>/g, obj, "r", base.to_string, sub, context);
                base.parse_element (/<cim:PerLengthSequenceImpedance.r0>([\s\S]*?)<\/cim:PerLengthSequenceImpedance.r0>/g, obj, "r0", base.to_string, sub, context);
                base.parse_element (/<cim:PerLengthSequenceImpedance.x>([\s\S]*?)<\/cim:PerLengthSequenceImpedance.x>/g, obj, "x", base.to_string, sub, context);
                base.parse_element (/<cim:PerLengthSequenceImpedance.x0>([\s\S]*?)<\/cim:PerLengthSequenceImpedance.x0>/g, obj, "x0", base.to_string, sub, context);
                var bucket = context.parsed.PerLengthSequenceImpedance;
                if (null == bucket)
                   context.parsed.PerLengthSequenceImpedance = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = PerLengthImpedance.prototype.export.call (this, obj, false);

                base.export_element (obj, "PerLengthSequenceImpedance", "b0ch", base.from_string, fields);
                base.export_element (obj, "PerLengthSequenceImpedance", "bch", base.from_string, fields);
                base.export_element (obj, "PerLengthSequenceImpedance", "g0ch", base.from_string, fields);
                base.export_element (obj, "PerLengthSequenceImpedance", "gch", base.from_string, fields);
                base.export_element (obj, "PerLengthSequenceImpedance", "r", base.from_string, fields);
                base.export_element (obj, "PerLengthSequenceImpedance", "r0", base.from_string, fields);
                base.export_element (obj, "PerLengthSequenceImpedance", "x", base.from_string, fields);
                base.export_element (obj, "PerLengthSequenceImpedance", "x0", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PerLengthSequenceImpedance_collapse" aria-expanded="true" aria-controls="PerLengthSequenceImpedance_collapse" style="margin-left: 10px;">PerLengthSequenceImpedance</a></legend>
                    <div id="PerLengthSequenceImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PerLengthImpedance.prototype.template.call (this) +
                    `
                    {{#b0ch}}<div><b>b0ch</b>: {{b0ch}}</div>{{/b0ch}}
                    {{#bch}}<div><b>bch</b>: {{bch}}</div>{{/bch}}
                    {{#g0ch}}<div><b>g0ch</b>: {{g0ch}}</div>{{/g0ch}}
                    {{#gch}}<div><b>gch</b>: {{gch}}</div>{{/gch}}
                    {{#r}}<div><b>r</b>: {{r}}</div>{{/r}}
                    {{#r0}}<div><b>r0</b>: {{r0}}</div>{{/r0}}
                    {{#x}}<div><b>x</b>: {{x}}</div>{{/x}}
                    {{#x0}}<div><b>x0</b>: {{x0}}</div>{{/x0}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PerLengthSequenceImpedance_collapse" aria-expanded="true" aria-controls="PerLengthSequenceImpedance_collapse" style="margin-left: 10px;">PerLengthSequenceImpedance</a></legend>
                    <div id="PerLengthSequenceImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PerLengthImpedance.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b0ch'>b0ch: </label><div class='col-sm-8'><input id='b0ch' class='form-control' type='text'{{#b0ch}} value='{{b0ch}}'{{/b0ch}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='bch'>bch: </label><div class='col-sm-8'><input id='bch' class='form-control' type='text'{{#bch}} value='{{bch}}'{{/bch}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g0ch'>g0ch: </label><div class='col-sm-8'><input id='g0ch' class='form-control' type='text'{{#g0ch}} value='{{g0ch}}'{{/g0ch}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='gch'>gch: </label><div class='col-sm-8'><input id='gch' class='form-control' type='text'{{#gch}} value='{{gch}}'{{/gch}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r'>r: </label><div class='col-sm-8'><input id='r' class='form-control' type='text'{{#r}} value='{{r}}'{{/r}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r0'>r0: </label><div class='col-sm-8'><input id='r0' class='form-control' type='text'{{#r0}} value='{{r0}}'{{/r0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x'>x: </label><div class='col-sm-8'><input id='x' class='form-control' type='text'{{#x}} value='{{x}}'{{/x}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x0'>x0: </label><div class='col-sm-8'><input id='x0' class='form-control' type='text'{{#x0}} value='{{x0}}'{{/x0}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A tunable impedance device normally used to offset line charging during single line faults in an ungrounded section of network.
         *
         */
        class PetersenCoil extends EarthFaultCompensator
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PetersenCoil;
                if (null == bucket)
                   cim_data.PetersenCoil = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PetersenCoil[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = EarthFaultCompensator.prototype.parse.call (this, context, sub);
                obj.cls = "PetersenCoil";
                base.parse_attribute (/<cim:PetersenCoil.mode\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "mode", sub, context);
                base.parse_element (/<cim:PetersenCoil.nominalU>([\s\S]*?)<\/cim:PetersenCoil.nominalU>/g, obj, "nominalU", base.to_string, sub, context);
                base.parse_element (/<cim:PetersenCoil.offsetCurrent>([\s\S]*?)<\/cim:PetersenCoil.offsetCurrent>/g, obj, "offsetCurrent", base.to_string, sub, context);
                base.parse_element (/<cim:PetersenCoil.positionCurrent>([\s\S]*?)<\/cim:PetersenCoil.positionCurrent>/g, obj, "positionCurrent", base.to_string, sub, context);
                base.parse_element (/<cim:PetersenCoil.xGroundMax>([\s\S]*?)<\/cim:PetersenCoil.xGroundMax>/g, obj, "xGroundMax", base.to_string, sub, context);
                base.parse_element (/<cim:PetersenCoil.xGroundMin>([\s\S]*?)<\/cim:PetersenCoil.xGroundMin>/g, obj, "xGroundMin", base.to_string, sub, context);
                base.parse_element (/<cim:PetersenCoil.xGroundNominal>([\s\S]*?)<\/cim:PetersenCoil.xGroundNominal>/g, obj, "xGroundNominal", base.to_string, sub, context);
                var bucket = context.parsed.PetersenCoil;
                if (null == bucket)
                   context.parsed.PetersenCoil = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = EarthFaultCompensator.prototype.export.call (this, obj, false);

                base.export_element (obj, "PetersenCoil", "mode", base.from_string, fields);
                base.export_element (obj, "PetersenCoil", "nominalU", base.from_string, fields);
                base.export_element (obj, "PetersenCoil", "offsetCurrent", base.from_string, fields);
                base.export_element (obj, "PetersenCoil", "positionCurrent", base.from_string, fields);
                base.export_element (obj, "PetersenCoil", "xGroundMax", base.from_string, fields);
                base.export_element (obj, "PetersenCoil", "xGroundMin", base.from_string, fields);
                base.export_element (obj, "PetersenCoil", "xGroundNominal", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PetersenCoil_collapse" aria-expanded="true" aria-controls="PetersenCoil_collapse" style="margin-left: 10px;">PetersenCoil</a></legend>
                    <div id="PetersenCoil_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + EarthFaultCompensator.prototype.template.call (this) +
                    `
                    {{#mode}}<div><b>mode</b>: {{mode}}</div>{{/mode}}
                    {{#nominalU}}<div><b>nominalU</b>: {{nominalU}}</div>{{/nominalU}}
                    {{#offsetCurrent}}<div><b>offsetCurrent</b>: {{offsetCurrent}}</div>{{/offsetCurrent}}
                    {{#positionCurrent}}<div><b>positionCurrent</b>: {{positionCurrent}}</div>{{/positionCurrent}}
                    {{#xGroundMax}}<div><b>xGroundMax</b>: {{xGroundMax}}</div>{{/xGroundMax}}
                    {{#xGroundMin}}<div><b>xGroundMin</b>: {{xGroundMin}}</div>{{/xGroundMin}}
                    {{#xGroundNominal}}<div><b>xGroundNominal</b>: {{xGroundNominal}}</div>{{/xGroundNominal}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.PetersenCoilModeKind = []; if (!obj.mode) obj.PetersenCoilModeKind.push ({ id: '', selected: true}); for (var property in PetersenCoilModeKind) obj.PetersenCoilModeKind.push ({ id: property, selected: obj.mode && obj.mode.endsWith ('.' + property)});
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.PetersenCoilModeKind;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PetersenCoil_collapse" aria-expanded="true" aria-controls="PetersenCoil_collapse" style="margin-left: 10px;">PetersenCoil</a></legend>
                    <div id="PetersenCoil_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + EarthFaultCompensator.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='mode'>mode: </label><div class='col-sm-8'><select id='mode' class='form-control'>{{#PetersenCoilModeKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/PetersenCoilModeKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='nominalU'>nominalU: </label><div class='col-sm-8'><input id='nominalU' class='form-control' type='text'{{#nominalU}} value='{{nominalU}}'{{/nominalU}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='offsetCurrent'>offsetCurrent: </label><div class='col-sm-8'><input id='offsetCurrent' class='form-control' type='text'{{#offsetCurrent}} value='{{offsetCurrent}}'{{/offsetCurrent}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='positionCurrent'>positionCurrent: </label><div class='col-sm-8'><input id='positionCurrent' class='form-control' type='text'{{#positionCurrent}} value='{{positionCurrent}}'{{/positionCurrent}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xGroundMax'>xGroundMax: </label><div class='col-sm-8'><input id='xGroundMax' class='form-control' type='text'{{#xGroundMax}} value='{{xGroundMax}}'{{/xGroundMax}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xGroundMin'>xGroundMin: </label><div class='col-sm-8'><input id='xGroundMin' class='form-control' type='text'{{#xGroundMin}} value='{{xGroundMin}}'{{/xGroundMin}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xGroundNominal'>xGroundNominal: </label><div class='col-sm-8'><input id='xGroundNominal' class='form-control' type='text'{{#xGroundNominal}} value='{{xGroundNominal}}'{{/xGroundNominal}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A fixed impedance device used for grounding.
         *
         */
        class GroundingImpedance extends EarthFaultCompensator
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.GroundingImpedance;
                if (null == bucket)
                   cim_data.GroundingImpedance = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.GroundingImpedance[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = EarthFaultCompensator.prototype.parse.call (this, context, sub);
                obj.cls = "GroundingImpedance";
                base.parse_element (/<cim:GroundingImpedance.x>([\s\S]*?)<\/cim:GroundingImpedance.x>/g, obj, "x", base.to_string, sub, context);
                var bucket = context.parsed.GroundingImpedance;
                if (null == bucket)
                   context.parsed.GroundingImpedance = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = EarthFaultCompensator.prototype.export.call (this, obj, false);

                base.export_element (obj, "GroundingImpedance", "x", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#GroundingImpedance_collapse" aria-expanded="true" aria-controls="GroundingImpedance_collapse" style="margin-left: 10px;">GroundingImpedance</a></legend>
                    <div id="GroundingImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + EarthFaultCompensator.prototype.template.call (this) +
                    `
                    {{#x}}<div><b>x</b>: {{x}}</div>{{/x}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#GroundingImpedance_collapse" aria-expanded="true" aria-controls="GroundingImpedance_collapse" style="margin-left: 10px;">GroundingImpedance</a></legend>
                    <div id="GroundingImpedance_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + EarthFaultCompensator.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x'>x: </label><div class='col-sm-8'><input id='x' class='form-control' type='text'{{#x}} value='{{x}}'{{/x}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A PowerTransformerEnd is associated with each Terminal of a PowerTransformer.
         *
         * The impedance values r, r0, x, and x0 of a PowerTransformerEnd represents a star equivalent as follows
         *
         */
        class PowerTransformerEnd extends TransformerEnd
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PowerTransformerEnd;
                if (null == bucket)
                   cim_data.PowerTransformerEnd = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PowerTransformerEnd[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = TransformerEnd.prototype.parse.call (this, context, sub);
                obj.cls = "PowerTransformerEnd";
                base.parse_element (/<cim:PowerTransformerEnd.b>([\s\S]*?)<\/cim:PowerTransformerEnd.b>/g, obj, "b", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformerEnd.b0>([\s\S]*?)<\/cim:PowerTransformerEnd.b0>/g, obj, "b0", base.to_string, sub, context);
                base.parse_attribute (/<cim:PowerTransformerEnd.connectionKind\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "connectionKind", sub, context);
                base.parse_element (/<cim:PowerTransformerEnd.g>([\s\S]*?)<\/cim:PowerTransformerEnd.g>/g, obj, "g", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformerEnd.g0>([\s\S]*?)<\/cim:PowerTransformerEnd.g0>/g, obj, "g0", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformerEnd.phaseAngleClock>([\s\S]*?)<\/cim:PowerTransformerEnd.phaseAngleClock>/g, obj, "phaseAngleClock", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformerEnd.r>([\s\S]*?)<\/cim:PowerTransformerEnd.r>/g, obj, "r", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformerEnd.r0>([\s\S]*?)<\/cim:PowerTransformerEnd.r0>/g, obj, "r0", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformerEnd.ratedS>([\s\S]*?)<\/cim:PowerTransformerEnd.ratedS>/g, obj, "ratedS", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformerEnd.ratedU>([\s\S]*?)<\/cim:PowerTransformerEnd.ratedU>/g, obj, "ratedU", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformerEnd.x>([\s\S]*?)<\/cim:PowerTransformerEnd.x>/g, obj, "x", base.to_string, sub, context);
                base.parse_element (/<cim:PowerTransformerEnd.x0>([\s\S]*?)<\/cim:PowerTransformerEnd.x0>/g, obj, "x0", base.to_string, sub, context);
                base.parse_attribute (/<cim:PowerTransformerEnd.PowerTransformer\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PowerTransformer", sub, context);
                var bucket = context.parsed.PowerTransformerEnd;
                if (null == bucket)
                   context.parsed.PowerTransformerEnd = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = TransformerEnd.prototype.export.call (this, obj, false);

                base.export_element (obj, "PowerTransformerEnd", "b", base.from_string, fields);
                base.export_element (obj, "PowerTransformerEnd", "b0", base.from_string, fields);
                base.export_element (obj, "PowerTransformerEnd", "connectionKind", base.from_string, fields);
                base.export_element (obj, "PowerTransformerEnd", "g", base.from_string, fields);
                base.export_element (obj, "PowerTransformerEnd", "g0", base.from_string, fields);
                base.export_element (obj, "PowerTransformerEnd", "phaseAngleClock", base.from_string, fields);
                base.export_element (obj, "PowerTransformerEnd", "r", base.from_string, fields);
                base.export_element (obj, "PowerTransformerEnd", "r0", base.from_string, fields);
                base.export_element (obj, "PowerTransformerEnd", "ratedS", base.from_string, fields);
                base.export_element (obj, "PowerTransformerEnd", "ratedU", base.from_string, fields);
                base.export_element (obj, "PowerTransformerEnd", "x", base.from_string, fields);
                base.export_element (obj, "PowerTransformerEnd", "x0", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "PowerTransformerEnd", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PowerTransformerEnd_collapse" aria-expanded="true" aria-controls="PowerTransformerEnd_collapse" style="margin-left: 10px;">PowerTransformerEnd</a></legend>
                    <div id="PowerTransformerEnd_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TransformerEnd.prototype.template.call (this) +
                    `
                    {{#b}}<div><b>b</b>: {{b}}</div>{{/b}}
                    {{#b0}}<div><b>b0</b>: {{b0}}</div>{{/b0}}
                    {{#connectionKind}}<div><b>connectionKind</b>: {{connectionKind}}</div>{{/connectionKind}}
                    {{#g}}<div><b>g</b>: {{g}}</div>{{/g}}
                    {{#g0}}<div><b>g0</b>: {{g0}}</div>{{/g0}}
                    {{#phaseAngleClock}}<div><b>phaseAngleClock</b>: {{phaseAngleClock}}</div>{{/phaseAngleClock}}
                    {{#r}}<div><b>r</b>: {{r}}</div>{{/r}}
                    {{#r0}}<div><b>r0</b>: {{r0}}</div>{{/r0}}
                    {{#ratedS}}<div><b>ratedS</b>: {{ratedS}}</div>{{/ratedS}}
                    {{#ratedU}}<div><b>ratedU</b>: {{ratedU}}</div>{{/ratedU}}
                    {{#x}}<div><b>x</b>: {{x}}</div>{{/x}}
                    {{#x0}}<div><b>x0</b>: {{x0}}</div>{{/x0}}
                    {{#PowerTransformer}}<div><b>PowerTransformer</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{PowerTransformer}}&quot;);})'>{{PowerTransformer}}</a></div>{{/PowerTransformer}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.WindingConnection = []; if (!obj.connectionKind) obj.WindingConnection.push ({ id: '', selected: true}); for (var property in WindingConnection) obj.WindingConnection.push ({ id: property, selected: obj.connectionKind && obj.connectionKind.endsWith ('.' + property)});
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.WindingConnection;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PowerTransformerEnd_collapse" aria-expanded="true" aria-controls="PowerTransformerEnd_collapse" style="margin-left: 10px;">PowerTransformerEnd</a></legend>
                    <div id="PowerTransformerEnd_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TransformerEnd.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b'>b: </label><div class='col-sm-8'><input id='b' class='form-control' type='text'{{#b}} value='{{b}}'{{/b}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b0'>b0: </label><div class='col-sm-8'><input id='b0' class='form-control' type='text'{{#b0}} value='{{b0}}'{{/b0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='connectionKind'>connectionKind: </label><div class='col-sm-8'><select id='connectionKind' class='form-control'>{{#WindingConnection}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/WindingConnection}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g'>g: </label><div class='col-sm-8'><input id='g' class='form-control' type='text'{{#g}} value='{{g}}'{{/g}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g0'>g0: </label><div class='col-sm-8'><input id='g0' class='form-control' type='text'{{#g0}} value='{{g0}}'{{/g0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='phaseAngleClock'>phaseAngleClock: </label><div class='col-sm-8'><input id='phaseAngleClock' class='form-control' type='text'{{#phaseAngleClock}} value='{{phaseAngleClock}}'{{/phaseAngleClock}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r'>r: </label><div class='col-sm-8'><input id='r' class='form-control' type='text'{{#r}} value='{{r}}'{{/r}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r0'>r0: </label><div class='col-sm-8'><input id='r0' class='form-control' type='text'{{#r0}} value='{{r0}}'{{/r0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ratedS'>ratedS: </label><div class='col-sm-8'><input id='ratedS' class='form-control' type='text'{{#ratedS}} value='{{ratedS}}'{{/ratedS}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ratedU'>ratedU: </label><div class='col-sm-8'><input id='ratedU' class='form-control' type='text'{{#ratedU}} value='{{ratedU}}'{{/ratedU}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x'>x: </label><div class='col-sm-8'><input id='x' class='form-control' type='text'{{#x}} value='{{x}}'{{/x}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x0'>x0: </label><div class='col-sm-8'><input id='x0' class='form-control' type='text'{{#x0}} value='{{x0}}'{{/x0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='PowerTransformer'>PowerTransformer: </label><div class='col-sm-8'><input id='PowerTransformer' class='form-control' type='text'{{#PowerTransformer}} value='{{PowerTransformer}}'{{/PowerTransformer}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["PowerTransformer", "PowerTransformer", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Transformer tank end represents an individual winding for unbalanced models or for transformer tanks connected into a bank (and bank is modelled with the PowerTransformer).
         *
         */
        class TransformerTankEnd extends TransformerEnd
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.TransformerTankEnd;
                if (null == bucket)
                   cim_data.TransformerTankEnd = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.TransformerTankEnd[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = TransformerEnd.prototype.parse.call (this, context, sub);
                obj.cls = "TransformerTankEnd";
                base.parse_element (/<cim:TransformerTankEnd.phases>([\s\S]*?)<\/cim:TransformerTankEnd.phases>/g, obj, "phases", base.to_string, sub, context);
                base.parse_attribute (/<cim:TransformerTankEnd.TransformerTank\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TransformerTank", sub, context);
                var bucket = context.parsed.TransformerTankEnd;
                if (null == bucket)
                   context.parsed.TransformerTankEnd = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = TransformerEnd.prototype.export.call (this, obj, false);

                base.export_element (obj, "TransformerTankEnd", "phases", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "TransformerTankEnd", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerTankEnd_collapse" aria-expanded="true" aria-controls="TransformerTankEnd_collapse" style="margin-left: 10px;">TransformerTankEnd</a></legend>
                    <div id="TransformerTankEnd_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TransformerEnd.prototype.template.call (this) +
                    `
                    {{#phases}}<div><b>phases</b>: {{phases}}</div>{{/phases}}
                    {{#TransformerTank}}<div><b>TransformerTank</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TransformerTank}}&quot;);})'>{{TransformerTank}}</a></div>{{/TransformerTank}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TransformerTankEnd_collapse" aria-expanded="true" aria-controls="TransformerTankEnd_collapse" style="margin-left: 10px;">TransformerTankEnd</a></legend>
                    <div id="TransformerTankEnd_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TransformerEnd.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='phases'>phases: </label><div class='col-sm-8'><input id='phases' class='form-control' type='text'{{#phases}} value='{{phases}}'{{/phases}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TransformerTank'>TransformerTank: </label><div class='col-sm-8'><input id='TransformerTank' class='form-control' type='text'{{#TransformerTank}} value='{{TransformerTank}}'{{/TransformerTank}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["TransformerTank", "TransformerTank", "0..1", "1..*"]
                    ]
                );
            }
        }

        /**
         * Describes behavior specific to tap changers, e.g. how the voltage at the end of a line varies with the load level and compensation of the voltage drop by tap adjustment.
         *
         */
        class TapChangerControl extends RegulatingControl
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.TapChangerControl;
                if (null == bucket)
                   cim_data.TapChangerControl = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.TapChangerControl[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = RegulatingControl.prototype.parse.call (this, context, sub);
                obj.cls = "TapChangerControl";
                base.parse_element (/<cim:TapChangerControl.limitVoltage>([\s\S]*?)<\/cim:TapChangerControl.limitVoltage>/g, obj, "limitVoltage", base.to_string, sub, context);
                base.parse_element (/<cim:TapChangerControl.lineDropCompensation>([\s\S]*?)<\/cim:TapChangerControl.lineDropCompensation>/g, obj, "lineDropCompensation", base.to_boolean, sub, context);
                base.parse_element (/<cim:TapChangerControl.lineDropR>([\s\S]*?)<\/cim:TapChangerControl.lineDropR>/g, obj, "lineDropR", base.to_string, sub, context);
                base.parse_element (/<cim:TapChangerControl.lineDropX>([\s\S]*?)<\/cim:TapChangerControl.lineDropX>/g, obj, "lineDropX", base.to_string, sub, context);
                base.parse_element (/<cim:TapChangerControl.reverseLineDropR>([\s\S]*?)<\/cim:TapChangerControl.reverseLineDropR>/g, obj, "reverseLineDropR", base.to_string, sub, context);
                base.parse_element (/<cim:TapChangerControl.reverseLineDropX>([\s\S]*?)<\/cim:TapChangerControl.reverseLineDropX>/g, obj, "reverseLineDropX", base.to_string, sub, context);
                base.parse_attributes (/<cim:TapChangerControl.TapChanger\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TapChanger", sub, context);
                var bucket = context.parsed.TapChangerControl;
                if (null == bucket)
                   context.parsed.TapChangerControl = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = RegulatingControl.prototype.export.call (this, obj, false);

                base.export_element (obj, "TapChangerControl", "limitVoltage", base.from_string, fields);
                base.export_element (obj, "TapChangerControl", "lineDropCompensation", base.from_boolean, fields);
                base.export_element (obj, "TapChangerControl", "lineDropR", base.from_string, fields);
                base.export_element (obj, "TapChangerControl", "lineDropX", base.from_string, fields);
                base.export_element (obj, "TapChangerControl", "reverseLineDropR", base.from_string, fields);
                base.export_element (obj, "TapChangerControl", "reverseLineDropX", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "TapChangerControl", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TapChangerControl_collapse" aria-expanded="true" aria-controls="TapChangerControl_collapse" style="margin-left: 10px;">TapChangerControl</a></legend>
                    <div id="TapChangerControl_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingControl.prototype.template.call (this) +
                    `
                    {{#limitVoltage}}<div><b>limitVoltage</b>: {{limitVoltage}}</div>{{/limitVoltage}}
                    {{#lineDropCompensation}}<div><b>lineDropCompensation</b>: {{lineDropCompensation}}</div>{{/lineDropCompensation}}
                    {{#lineDropR}}<div><b>lineDropR</b>: {{lineDropR}}</div>{{/lineDropR}}
                    {{#lineDropX}}<div><b>lineDropX</b>: {{lineDropX}}</div>{{/lineDropX}}
                    {{#reverseLineDropR}}<div><b>reverseLineDropR</b>: {{reverseLineDropR}}</div>{{/reverseLineDropR}}
                    {{#reverseLineDropX}}<div><b>reverseLineDropX</b>: {{reverseLineDropX}}</div>{{/reverseLineDropX}}
                    {{#TapChanger}}<div><b>TapChanger</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/TapChanger}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.TapChanger) obj.TapChanger_string = obj.TapChanger.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TapChanger_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#TapChangerControl_collapse" aria-expanded="true" aria-controls="TapChangerControl_collapse" style="margin-left: 10px;">TapChangerControl</a></legend>
                    <div id="TapChangerControl_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingControl.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='limitVoltage'>limitVoltage: </label><div class='col-sm-8'><input id='limitVoltage' class='form-control' type='text'{{#limitVoltage}} value='{{limitVoltage}}'{{/limitVoltage}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='lineDropCompensation'>lineDropCompensation: </label><div class='col-sm-8'><input id='lineDropCompensation' class='form-check-input' type='checkbox'{{#lineDropCompensation}} checked{{/lineDropCompensation}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='lineDropR'>lineDropR: </label><div class='col-sm-8'><input id='lineDropR' class='form-control' type='text'{{#lineDropR}} value='{{lineDropR}}'{{/lineDropR}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='lineDropX'>lineDropX: </label><div class='col-sm-8'><input id='lineDropX' class='form-control' type='text'{{#lineDropX}} value='{{lineDropX}}'{{/lineDropX}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='reverseLineDropR'>reverseLineDropR: </label><div class='col-sm-8'><input id='reverseLineDropR' class='form-control' type='text'{{#reverseLineDropR}} value='{{reverseLineDropR}}'{{/reverseLineDropR}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='reverseLineDropX'>reverseLineDropX: </label><div class='col-sm-8'><input id='reverseLineDropX' class='form-control' type='text'{{#reverseLineDropX}} value='{{reverseLineDropX}}'{{/reverseLineDropX}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["TapChanger", "TapChanger", "0..*", "0..1"]
                    ]
                );
            }
        }

        /**
         * A transformer phase shifting tap model that controls the phase angle difference across the power transformer and potentially the active power flow through the power transformer.
         *
         * This phase tap model may also impact the voltage magnitude.
         *
         */
        class PhaseTapChanger extends TapChanger
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PhaseTapChanger;
                if (null == bucket)
                   cim_data.PhaseTapChanger = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PhaseTapChanger[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = TapChanger.prototype.parse.call (this, context, sub);
                obj.cls = "PhaseTapChanger";
                base.parse_attribute (/<cim:PhaseTapChanger.TransformerEnd\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TransformerEnd", sub, context);
                var bucket = context.parsed.PhaseTapChanger;
                if (null == bucket)
                   context.parsed.PhaseTapChanger = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = TapChanger.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "PhaseTapChanger", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChanger_collapse" aria-expanded="true" aria-controls="PhaseTapChanger_collapse" style="margin-left: 10px;">PhaseTapChanger</a></legend>
                    <div id="PhaseTapChanger_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TapChanger.prototype.template.call (this) +
                    `
                    {{#TransformerEnd}}<div><b>TransformerEnd</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TransformerEnd}}&quot;);})'>{{TransformerEnd}}</a></div>{{/TransformerEnd}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChanger_collapse" aria-expanded="true" aria-controls="PhaseTapChanger_collapse" style="margin-left: 10px;">PhaseTapChanger</a></legend>
                    <div id="PhaseTapChanger_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TapChanger.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TransformerEnd'>TransformerEnd: </label><div class='col-sm-8'><input id='TransformerEnd' class='form-control' type='text'{{#TransformerEnd}} value='{{TransformerEnd}}'{{/TransformerEnd}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["TransformerEnd", "TransformerEnd", "1", "0..1"]
                    ]
                );
            }
        }

        /**
         * Describes a tap changer with a linear relation between the tap step and the phase angle difference across the transformer.
         *
         * This is a mathematical model that is an approximation of a real phase tap changer.
         *
         */
        class PhaseTapChangerLinear extends PhaseTapChanger
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PhaseTapChangerLinear;
                if (null == bucket)
                   cim_data.PhaseTapChangerLinear = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PhaseTapChangerLinear[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = PhaseTapChanger.prototype.parse.call (this, context, sub);
                obj.cls = "PhaseTapChangerLinear";
                base.parse_element (/<cim:PhaseTapChangerLinear.stepPhaseShiftIncrement>([\s\S]*?)<\/cim:PhaseTapChangerLinear.stepPhaseShiftIncrement>/g, obj, "stepPhaseShiftIncrement", base.to_string, sub, context);
                base.parse_element (/<cim:PhaseTapChangerLinear.xMax>([\s\S]*?)<\/cim:PhaseTapChangerLinear.xMax>/g, obj, "xMax", base.to_string, sub, context);
                base.parse_element (/<cim:PhaseTapChangerLinear.xMin>([\s\S]*?)<\/cim:PhaseTapChangerLinear.xMin>/g, obj, "xMin", base.to_string, sub, context);
                var bucket = context.parsed.PhaseTapChangerLinear;
                if (null == bucket)
                   context.parsed.PhaseTapChangerLinear = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = PhaseTapChanger.prototype.export.call (this, obj, false);

                base.export_element (obj, "PhaseTapChangerLinear", "stepPhaseShiftIncrement", base.from_string, fields);
                base.export_element (obj, "PhaseTapChangerLinear", "xMax", base.from_string, fields);
                base.export_element (obj, "PhaseTapChangerLinear", "xMin", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerLinear_collapse" aria-expanded="true" aria-controls="PhaseTapChangerLinear_collapse" style="margin-left: 10px;">PhaseTapChangerLinear</a></legend>
                    <div id="PhaseTapChangerLinear_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PhaseTapChanger.prototype.template.call (this) +
                    `
                    {{#stepPhaseShiftIncrement}}<div><b>stepPhaseShiftIncrement</b>: {{stepPhaseShiftIncrement}}</div>{{/stepPhaseShiftIncrement}}
                    {{#xMax}}<div><b>xMax</b>: {{xMax}}</div>{{/xMax}}
                    {{#xMin}}<div><b>xMin</b>: {{xMin}}</div>{{/xMin}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerLinear_collapse" aria-expanded="true" aria-controls="PhaseTapChangerLinear_collapse" style="margin-left: 10px;">PhaseTapChangerLinear</a></legend>
                    <div id="PhaseTapChangerLinear_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PhaseTapChanger.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='stepPhaseShiftIncrement'>stepPhaseShiftIncrement: </label><div class='col-sm-8'><input id='stepPhaseShiftIncrement' class='form-control' type='text'{{#stepPhaseShiftIncrement}} value='{{stepPhaseShiftIncrement}}'{{/stepPhaseShiftIncrement}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xMax'>xMax: </label><div class='col-sm-8'><input id='xMax' class='form-control' type='text'{{#xMax}} value='{{xMax}}'{{/xMax}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xMin'>xMin: </label><div class='col-sm-8'><input id='xMin' class='form-control' type='text'{{#xMin}} value='{{xMin}}'{{/xMin}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A tap changer that changes the voltage ratio impacting the voltage magnitude but not the phase angle across the transformer.
         *
         */
        class RatioTapChanger extends TapChanger
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.RatioTapChanger;
                if (null == bucket)
                   cim_data.RatioTapChanger = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.RatioTapChanger[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = TapChanger.prototype.parse.call (this, context, sub);
                obj.cls = "RatioTapChanger";
                base.parse_element (/<cim:RatioTapChanger.stepVoltageIncrement>([\s\S]*?)<\/cim:RatioTapChanger.stepVoltageIncrement>/g, obj, "stepVoltageIncrement", base.to_string, sub, context);
                base.parse_attribute (/<cim:RatioTapChanger.tculControlMode\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "tculControlMode", sub, context);
                base.parse_attribute (/<cim:RatioTapChanger.RatioTapChangerTable\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "RatioTapChangerTable", sub, context);
                base.parse_attribute (/<cim:RatioTapChanger.TransformerEnd\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "TransformerEnd", sub, context);
                var bucket = context.parsed.RatioTapChanger;
                if (null == bucket)
                   context.parsed.RatioTapChanger = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = TapChanger.prototype.export.call (this, obj, false);

                base.export_element (obj, "RatioTapChanger", "stepVoltageIncrement", base.from_string, fields);
                base.export_element (obj, "RatioTapChanger", "tculControlMode", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "RatioTapChanger", fields);
                base.export_attribute (obj, "export_attribute", "RatioTapChanger", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RatioTapChanger_collapse" aria-expanded="true" aria-controls="RatioTapChanger_collapse" style="margin-left: 10px;">RatioTapChanger</a></legend>
                    <div id="RatioTapChanger_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TapChanger.prototype.template.call (this) +
                    `
                    {{#stepVoltageIncrement}}<div><b>stepVoltageIncrement</b>: {{stepVoltageIncrement}}</div>{{/stepVoltageIncrement}}
                    {{#tculControlMode}}<div><b>tculControlMode</b>: {{tculControlMode}}</div>{{/tculControlMode}}
                    {{#RatioTapChangerTable}}<div><b>RatioTapChangerTable</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{RatioTapChangerTable}}&quot;);})'>{{RatioTapChangerTable}}</a></div>{{/RatioTapChangerTable}}
                    {{#TransformerEnd}}<div><b>TransformerEnd</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{TransformerEnd}}&quot;);})'>{{TransformerEnd}}</a></div>{{/TransformerEnd}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.TransformerControlMode = []; if (!obj.tculControlMode) obj.TransformerControlMode.push ({ id: '', selected: true}); for (var property in TransformerControlMode) obj.TransformerControlMode.push ({ id: property, selected: obj.tculControlMode && obj.tculControlMode.endsWith ('.' + property)});
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.TransformerControlMode;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RatioTapChanger_collapse" aria-expanded="true" aria-controls="RatioTapChanger_collapse" style="margin-left: 10px;">RatioTapChanger</a></legend>
                    <div id="RatioTapChanger_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + TapChanger.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='stepVoltageIncrement'>stepVoltageIncrement: </label><div class='col-sm-8'><input id='stepVoltageIncrement' class='form-control' type='text'{{#stepVoltageIncrement}} value='{{stepVoltageIncrement}}'{{/stepVoltageIncrement}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='tculControlMode'>tculControlMode: </label><div class='col-sm-8'><select id='tculControlMode' class='form-control'>{{#TransformerControlMode}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/TransformerControlMode}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='RatioTapChangerTable'>RatioTapChangerTable: </label><div class='col-sm-8'><input id='RatioTapChangerTable' class='form-control' type='text'{{#RatioTapChangerTable}} value='{{RatioTapChangerTable}}'{{/RatioTapChangerTable}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='TransformerEnd'>TransformerEnd: </label><div class='col-sm-8'><input id='TransformerEnd' class='form-control' type='text'{{#TransformerEnd}} value='{{TransformerEnd}}'{{/TransformerEnd}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["RatioTapChangerTable", "RatioTapChangerTable", "0..1", "0..*"],
                        ["TransformerEnd", "TransformerEnd", "1", "0..1"]
                    ]
                );
            }
        }

        /**
         * The non-linear phase tap changer describes the non-linear behavior of a phase tap changer.
         *
         * This is a base class for the symmetrical and asymmetrical phase tap changer models. The details of these models can be found in the IEC 61970-301 document.
         *
         */
        class PhaseTapChangerNonLinear extends PhaseTapChanger
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PhaseTapChangerNonLinear;
                if (null == bucket)
                   cim_data.PhaseTapChangerNonLinear = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PhaseTapChangerNonLinear[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = PhaseTapChanger.prototype.parse.call (this, context, sub);
                obj.cls = "PhaseTapChangerNonLinear";
                base.parse_element (/<cim:PhaseTapChangerNonLinear.voltageStepIncrement>([\s\S]*?)<\/cim:PhaseTapChangerNonLinear.voltageStepIncrement>/g, obj, "voltageStepIncrement", base.to_string, sub, context);
                base.parse_element (/<cim:PhaseTapChangerNonLinear.xMax>([\s\S]*?)<\/cim:PhaseTapChangerNonLinear.xMax>/g, obj, "xMax", base.to_string, sub, context);
                base.parse_element (/<cim:PhaseTapChangerNonLinear.xMin>([\s\S]*?)<\/cim:PhaseTapChangerNonLinear.xMin>/g, obj, "xMin", base.to_string, sub, context);
                var bucket = context.parsed.PhaseTapChangerNonLinear;
                if (null == bucket)
                   context.parsed.PhaseTapChangerNonLinear = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = PhaseTapChanger.prototype.export.call (this, obj, false);

                base.export_element (obj, "PhaseTapChangerNonLinear", "voltageStepIncrement", base.from_string, fields);
                base.export_element (obj, "PhaseTapChangerNonLinear", "xMax", base.from_string, fields);
                base.export_element (obj, "PhaseTapChangerNonLinear", "xMin", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerNonLinear_collapse" aria-expanded="true" aria-controls="PhaseTapChangerNonLinear_collapse" style="margin-left: 10px;">PhaseTapChangerNonLinear</a></legend>
                    <div id="PhaseTapChangerNonLinear_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PhaseTapChanger.prototype.template.call (this) +
                    `
                    {{#voltageStepIncrement}}<div><b>voltageStepIncrement</b>: {{voltageStepIncrement}}</div>{{/voltageStepIncrement}}
                    {{#xMax}}<div><b>xMax</b>: {{xMax}}</div>{{/xMax}}
                    {{#xMin}}<div><b>xMin</b>: {{xMin}}</div>{{/xMin}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerNonLinear_collapse" aria-expanded="true" aria-controls="PhaseTapChangerNonLinear_collapse" style="margin-left: 10px;">PhaseTapChangerNonLinear</a></legend>
                    <div id="PhaseTapChangerNonLinear_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PhaseTapChanger.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='voltageStepIncrement'>voltageStepIncrement: </label><div class='col-sm-8'><input id='voltageStepIncrement' class='form-control' type='text'{{#voltageStepIncrement}} value='{{voltageStepIncrement}}'{{/voltageStepIncrement}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xMax'>xMax: </label><div class='col-sm-8'><input id='xMax' class='form-control' type='text'{{#xMax}} value='{{xMax}}'{{/xMax}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xMin'>xMin: </label><div class='col-sm-8'><input id='xMin' class='form-control' type='text'{{#xMin}} value='{{xMin}}'{{/xMin}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        class PhaseTapChangerTabular extends PhaseTapChanger
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PhaseTapChangerTabular;
                if (null == bucket)
                   cim_data.PhaseTapChangerTabular = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PhaseTapChangerTabular[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = PhaseTapChanger.prototype.parse.call (this, context, sub);
                obj.cls = "PhaseTapChangerTabular";
                base.parse_attribute (/<cim:PhaseTapChangerTabular.PhaseTapChangerTable\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PhaseTapChangerTable", sub, context);
                var bucket = context.parsed.PhaseTapChangerTabular;
                if (null == bucket)
                   context.parsed.PhaseTapChangerTabular = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = PhaseTapChanger.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attribute", "PhaseTapChangerTabular", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerTabular_collapse" aria-expanded="true" aria-controls="PhaseTapChangerTabular_collapse" style="margin-left: 10px;">PhaseTapChangerTabular</a></legend>
                    <div id="PhaseTapChangerTabular_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PhaseTapChanger.prototype.template.call (this) +
                    `
                    {{#PhaseTapChangerTable}}<div><b>PhaseTapChangerTable</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{PhaseTapChangerTable}}&quot;);})'>{{PhaseTapChangerTable}}</a></div>{{/PhaseTapChangerTable}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerTabular_collapse" aria-expanded="true" aria-controls="PhaseTapChangerTabular_collapse" style="margin-left: 10px;">PhaseTapChangerTabular</a></legend>
                    <div id="PhaseTapChangerTabular_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PhaseTapChanger.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='PhaseTapChangerTable'>PhaseTapChangerTable: </label><div class='col-sm-8'><input id='PhaseTapChangerTable' class='form-control' type='text'{{#PhaseTapChangerTable}} value='{{PhaseTapChangerTable}}'{{/PhaseTapChangerTable}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["PhaseTapChangerTable", "PhaseTapChangerTable", "0..1", "0..*"]
                    ]
                );
            }
        }

        /**
         * Describes the tap model for an asymmetrical phase shifting transformer in which the difference voltage vector adds to the primary side voltage.
         *
         * The angle between the primary side voltage and the difference voltage is named the winding connection angle. The phase shift depends on both the difference voltage magnitude and the winding connection angle.
         *
         */
        class PhaseTapChangerAsymmetrical extends PhaseTapChangerNonLinear
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PhaseTapChangerAsymmetrical;
                if (null == bucket)
                   cim_data.PhaseTapChangerAsymmetrical = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PhaseTapChangerAsymmetrical[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = PhaseTapChangerNonLinear.prototype.parse.call (this, context, sub);
                obj.cls = "PhaseTapChangerAsymmetrical";
                base.parse_element (/<cim:PhaseTapChangerAsymmetrical.windingConnectionAngle>([\s\S]*?)<\/cim:PhaseTapChangerAsymmetrical.windingConnectionAngle>/g, obj, "windingConnectionAngle", base.to_string, sub, context);
                var bucket = context.parsed.PhaseTapChangerAsymmetrical;
                if (null == bucket)
                   context.parsed.PhaseTapChangerAsymmetrical = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = PhaseTapChangerNonLinear.prototype.export.call (this, obj, false);

                base.export_element (obj, "PhaseTapChangerAsymmetrical", "windingConnectionAngle", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerAsymmetrical_collapse" aria-expanded="true" aria-controls="PhaseTapChangerAsymmetrical_collapse" style="margin-left: 10px;">PhaseTapChangerAsymmetrical</a></legend>
                    <div id="PhaseTapChangerAsymmetrical_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PhaseTapChangerNonLinear.prototype.template.call (this) +
                    `
                    {{#windingConnectionAngle}}<div><b>windingConnectionAngle</b>: {{windingConnectionAngle}}</div>{{/windingConnectionAngle}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerAsymmetrical_collapse" aria-expanded="true" aria-controls="PhaseTapChangerAsymmetrical_collapse" style="margin-left: 10px;">PhaseTapChangerAsymmetrical</a></legend>
                    <div id="PhaseTapChangerAsymmetrical_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PhaseTapChangerNonLinear.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='windingConnectionAngle'>windingConnectionAngle: </label><div class='col-sm-8'><input id='windingConnectionAngle' class='form-control' type='text'{{#windingConnectionAngle}} value='{{windingConnectionAngle}}'{{/windingConnectionAngle}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * Describes a symmetrical phase shifting transformer tap model in which the secondary side voltage magnitude is the same as at the primary side.
         *
         * The difference voltage magnitude is the base in an equal-sided triangle where the sides corresponds to the primary and secondary voltages. The phase angle difference corresponds to the top angle and can be expressed as twice the arctangent of half the total difference voltage.
         *
         */
        class PhaseTapChangerSymmetrical extends PhaseTapChangerNonLinear
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.PhaseTapChangerSymmetrical;
                if (null == bucket)
                   cim_data.PhaseTapChangerSymmetrical = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.PhaseTapChangerSymmetrical[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = PhaseTapChangerNonLinear.prototype.parse.call (this, context, sub);
                obj.cls = "PhaseTapChangerSymmetrical";
                var bucket = context.parsed.PhaseTapChangerSymmetrical;
                if (null == bucket)
                   context.parsed.PhaseTapChangerSymmetrical = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = PhaseTapChangerNonLinear.prototype.export.call (this, obj, false);

                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerSymmetrical_collapse" aria-expanded="true" aria-controls="PhaseTapChangerSymmetrical_collapse" style="margin-left: 10px;">PhaseTapChangerSymmetrical</a></legend>
                    <div id="PhaseTapChangerSymmetrical_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PhaseTapChangerNonLinear.prototype.template.call (this) +
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#PhaseTapChangerSymmetrical_collapse" aria-expanded="true" aria-controls="PhaseTapChangerSymmetrical_collapse" style="margin-left: 10px;">PhaseTapChangerSymmetrical</a></legend>
                    <div id="PhaseTapChangerSymmetrical_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + PhaseTapChangerNonLinear.prototype.edit_template.call (this) +
                    `
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A per phase linear shunt compensator has banks or sections with equal admittance values.
         *
         */
        class LinearShuntCompensatorPhase extends ShuntCompensatorPhase
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.LinearShuntCompensatorPhase;
                if (null == bucket)
                   cim_data.LinearShuntCompensatorPhase = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.LinearShuntCompensatorPhase[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ShuntCompensatorPhase.prototype.parse.call (this, context, sub);
                obj.cls = "LinearShuntCompensatorPhase";
                base.parse_element (/<cim:LinearShuntCompensatorPhase.gPerSection>([\s\S]*?)<\/cim:LinearShuntCompensatorPhase.gPerSection>/g, obj, "gPerSection", base.to_string, sub, context);
                base.parse_element (/<cim:LinearShuntCompensatorPhase.bPerSection>([\s\S]*?)<\/cim:LinearShuntCompensatorPhase.bPerSection>/g, obj, "bPerSection", base.to_string, sub, context);
                var bucket = context.parsed.LinearShuntCompensatorPhase;
                if (null == bucket)
                   context.parsed.LinearShuntCompensatorPhase = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ShuntCompensatorPhase.prototype.export.call (this, obj, false);

                base.export_element (obj, "LinearShuntCompensatorPhase", "gPerSection", base.from_string, fields);
                base.export_element (obj, "LinearShuntCompensatorPhase", "bPerSection", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#LinearShuntCompensatorPhase_collapse" aria-expanded="true" aria-controls="LinearShuntCompensatorPhase_collapse" style="margin-left: 10px;">LinearShuntCompensatorPhase</a></legend>
                    <div id="LinearShuntCompensatorPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ShuntCompensatorPhase.prototype.template.call (this) +
                    `
                    {{#gPerSection}}<div><b>gPerSection</b>: {{gPerSection}}</div>{{/gPerSection}}
                    {{#bPerSection}}<div><b>bPerSection</b>: {{bPerSection}}</div>{{/bPerSection}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#LinearShuntCompensatorPhase_collapse" aria-expanded="true" aria-controls="LinearShuntCompensatorPhase_collapse" style="margin-left: 10px;">LinearShuntCompensatorPhase</a></legend>
                    <div id="LinearShuntCompensatorPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ShuntCompensatorPhase.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='gPerSection'>gPerSection: </label><div class='col-sm-8'><input id='gPerSection' class='form-control' type='text'{{#gPerSection}} value='{{gPerSection}}'{{/gPerSection}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='bPerSection'>bPerSection: </label><div class='col-sm-8'><input id='bPerSection' class='form-control' type='text'{{#bPerSection}} value='{{bPerSection}}'{{/bPerSection}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A per phase non linear shunt compensator has bank or section admittance values that differs.
         *
         */
        class NonlinearShuntCompensatorPhase extends ShuntCompensatorPhase
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.NonlinearShuntCompensatorPhase;
                if (null == bucket)
                   cim_data.NonlinearShuntCompensatorPhase = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.NonlinearShuntCompensatorPhase[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ShuntCompensatorPhase.prototype.parse.call (this, context, sub);
                obj.cls = "NonlinearShuntCompensatorPhase";
                base.parse_attributes (/<cim:NonlinearShuntCompensatorPhase.NonlinearShuntCompensatorPhasePoints\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "NonlinearShuntCompensatorPhasePoints", sub, context);
                var bucket = context.parsed.NonlinearShuntCompensatorPhase;
                if (null == bucket)
                   context.parsed.NonlinearShuntCompensatorPhase = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ShuntCompensatorPhase.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "NonlinearShuntCompensatorPhase", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#NonlinearShuntCompensatorPhase_collapse" aria-expanded="true" aria-controls="NonlinearShuntCompensatorPhase_collapse" style="margin-left: 10px;">NonlinearShuntCompensatorPhase</a></legend>
                    <div id="NonlinearShuntCompensatorPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ShuntCompensatorPhase.prototype.template.call (this) +
                    `
                    {{#NonlinearShuntCompensatorPhasePoints}}<div><b>NonlinearShuntCompensatorPhasePoints</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/NonlinearShuntCompensatorPhasePoints}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.NonlinearShuntCompensatorPhasePoints) obj.NonlinearShuntCompensatorPhasePoints_string = obj.NonlinearShuntCompensatorPhasePoints.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.NonlinearShuntCompensatorPhasePoints_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#NonlinearShuntCompensatorPhase_collapse" aria-expanded="true" aria-controls="NonlinearShuntCompensatorPhase_collapse" style="margin-left: 10px;">NonlinearShuntCompensatorPhase</a></legend>
                    <div id="NonlinearShuntCompensatorPhase_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ShuntCompensatorPhase.prototype.edit_template.call (this) +
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
                        ["NonlinearShuntCompensatorPhasePoints", "NonlinearShuntCompensatorPhasePoint", "1..*", "1"]
                    ]
                );
            }
        }

        /**
         * A shunt capacitor or reactor or switchable bank of shunt capacitors or reactors.
         *
         * A section of a shunt compensator is an individual capacitor or reactor.  A negative value for reactivePerSection indicates that the compensator is a reactor. ShuntCompensator is a single terminal device.  Ground is implied.
         *
         */
        class ShuntCompensator extends RegulatingCondEq
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ShuntCompensator;
                if (null == bucket)
                   cim_data.ShuntCompensator = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ShuntCompensator[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = RegulatingCondEq.prototype.parse.call (this, context, sub);
                obj.cls = "ShuntCompensator";
                base.parse_element (/<cim:ShuntCompensator.aVRDelay>([\s\S]*?)<\/cim:ShuntCompensator.aVRDelay>/g, obj, "aVRDelay", base.to_string, sub, context);
                base.parse_element (/<cim:ShuntCompensator.grounded>([\s\S]*?)<\/cim:ShuntCompensator.grounded>/g, obj, "grounded", base.to_boolean, sub, context);
                base.parse_element (/<cim:ShuntCompensator.maximumSections>([\s\S]*?)<\/cim:ShuntCompensator.maximumSections>/g, obj, "maximumSections", base.to_string, sub, context);
                base.parse_element (/<cim:ShuntCompensator.nomU>([\s\S]*?)<\/cim:ShuntCompensator.nomU>/g, obj, "nomU", base.to_string, sub, context);
                base.parse_element (/<cim:ShuntCompensator.normalSections>([\s\S]*?)<\/cim:ShuntCompensator.normalSections>/g, obj, "normalSections", base.to_string, sub, context);
                base.parse_attribute (/<cim:ShuntCompensator.phaseConnection\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "phaseConnection", sub, context);
                base.parse_element (/<cim:ShuntCompensator.switchOnCount>([\s\S]*?)<\/cim:ShuntCompensator.switchOnCount>/g, obj, "switchOnCount", base.to_string, sub, context);
                base.parse_element (/<cim:ShuntCompensator.switchOnDate>([\s\S]*?)<\/cim:ShuntCompensator.switchOnDate>/g, obj, "switchOnDate", base.to_datetime, sub, context);
                base.parse_element (/<cim:ShuntCompensator.voltageSensitivity>([\s\S]*?)<\/cim:ShuntCompensator.voltageSensitivity>/g, obj, "voltageSensitivity", base.to_string, sub, context);
                base.parse_element (/<cim:ShuntCompensator.sections>([\s\S]*?)<\/cim:ShuntCompensator.sections>/g, obj, "sections", base.to_float, sub, context);
                base.parse_attributes (/<cim:ShuntCompensator.ShuntCompensatorPhase\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ShuntCompensatorPhase", sub, context);
                base.parse_attribute (/<cim:ShuntCompensator.SvShuntCompensatorSections\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "SvShuntCompensatorSections", sub, context);
                var bucket = context.parsed.ShuntCompensator;
                if (null == bucket)
                   context.parsed.ShuntCompensator = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = RegulatingCondEq.prototype.export.call (this, obj, false);

                base.export_element (obj, "ShuntCompensator", "aVRDelay", base.from_string, fields);
                base.export_element (obj, "ShuntCompensator", "grounded", base.from_boolean, fields);
                base.export_element (obj, "ShuntCompensator", "maximumSections", base.from_string, fields);
                base.export_element (obj, "ShuntCompensator", "nomU", base.from_string, fields);
                base.export_element (obj, "ShuntCompensator", "normalSections", base.from_string, fields);
                base.export_element (obj, "ShuntCompensator", "phaseConnection", base.from_string, fields);
                base.export_element (obj, "ShuntCompensator", "switchOnCount", base.from_string, fields);
                base.export_element (obj, "ShuntCompensator", "switchOnDate", base.from_datetime, fields);
                base.export_element (obj, "ShuntCompensator", "voltageSensitivity", base.from_string, fields);
                base.export_element (obj, "ShuntCompensator", "sections", base.from_float, fields);
                base.export_attribute (obj, "export_attributes", "ShuntCompensator", fields);
                base.export_attribute (obj, "export_attribute", "ShuntCompensator", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ShuntCompensator_collapse" aria-expanded="true" aria-controls="ShuntCompensator_collapse" style="margin-left: 10px;">ShuntCompensator</a></legend>
                    <div id="ShuntCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingCondEq.prototype.template.call (this) +
                    `
                    {{#aVRDelay}}<div><b>aVRDelay</b>: {{aVRDelay}}</div>{{/aVRDelay}}
                    {{#grounded}}<div><b>grounded</b>: {{grounded}}</div>{{/grounded}}
                    {{#maximumSections}}<div><b>maximumSections</b>: {{maximumSections}}</div>{{/maximumSections}}
                    {{#nomU}}<div><b>nomU</b>: {{nomU}}</div>{{/nomU}}
                    {{#normalSections}}<div><b>normalSections</b>: {{normalSections}}</div>{{/normalSections}}
                    {{#phaseConnection}}<div><b>phaseConnection</b>: {{phaseConnection}}</div>{{/phaseConnection}}
                    {{#switchOnCount}}<div><b>switchOnCount</b>: {{switchOnCount}}</div>{{/switchOnCount}}
                    {{#switchOnDate}}<div><b>switchOnDate</b>: {{switchOnDate}}</div>{{/switchOnDate}}
                    {{#voltageSensitivity}}<div><b>voltageSensitivity</b>: {{voltageSensitivity}}</div>{{/voltageSensitivity}}
                    {{#sections}}<div><b>sections</b>: {{sections}}</div>{{/sections}}
                    {{#ShuntCompensatorPhase}}<div><b>ShuntCompensatorPhase</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ShuntCompensatorPhase}}
                    {{#SvShuntCompensatorSections}}<div><b>SvShuntCompensatorSections</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{SvShuntCompensatorSections}}&quot;);})'>{{SvShuntCompensatorSections}}</a></div>{{/SvShuntCompensatorSections}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.PhaseShuntConnectionKind = []; if (!obj.phaseConnection) obj.PhaseShuntConnectionKind.push ({ id: '', selected: true}); for (var property in PhaseShuntConnectionKind) obj.PhaseShuntConnectionKind.push ({ id: property, selected: obj.phaseConnection && obj.phaseConnection.endsWith ('.' + property)});
                if (obj.ShuntCompensatorPhase) obj.ShuntCompensatorPhase_string = obj.ShuntCompensatorPhase.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.PhaseShuntConnectionKind;
                delete obj.ShuntCompensatorPhase_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ShuntCompensator_collapse" aria-expanded="true" aria-controls="ShuntCompensator_collapse" style="margin-left: 10px;">ShuntCompensator</a></legend>
                    <div id="ShuntCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingCondEq.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='aVRDelay'>aVRDelay: </label><div class='col-sm-8'><input id='aVRDelay' class='form-control' type='text'{{#aVRDelay}} value='{{aVRDelay}}'{{/aVRDelay}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='grounded'>grounded: </label><div class='col-sm-8'><input id='grounded' class='form-check-input' type='checkbox'{{#grounded}} checked{{/grounded}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maximumSections'>maximumSections: </label><div class='col-sm-8'><input id='maximumSections' class='form-control' type='text'{{#maximumSections}} value='{{maximumSections}}'{{/maximumSections}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='nomU'>nomU: </label><div class='col-sm-8'><input id='nomU' class='form-control' type='text'{{#nomU}} value='{{nomU}}'{{/nomU}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='normalSections'>normalSections: </label><div class='col-sm-8'><input id='normalSections' class='form-control' type='text'{{#normalSections}} value='{{normalSections}}'{{/normalSections}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='phaseConnection'>phaseConnection: </label><div class='col-sm-8'><select id='phaseConnection' class='form-control'>{{#PhaseShuntConnectionKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/PhaseShuntConnectionKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='switchOnCount'>switchOnCount: </label><div class='col-sm-8'><input id='switchOnCount' class='form-control' type='text'{{#switchOnCount}} value='{{switchOnCount}}'{{/switchOnCount}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='switchOnDate'>switchOnDate: </label><div class='col-sm-8'><input id='switchOnDate' class='form-control' type='text'{{#switchOnDate}} value='{{switchOnDate}}'{{/switchOnDate}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='voltageSensitivity'>voltageSensitivity: </label><div class='col-sm-8'><input id='voltageSensitivity' class='form-control' type='text'{{#voltageSensitivity}} value='{{voltageSensitivity}}'{{/voltageSensitivity}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='sections'>sections: </label><div class='col-sm-8'><input id='sections' class='form-control' type='text'{{#sections}} value='{{sections}}'{{/sections}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='SvShuntCompensatorSections'>SvShuntCompensatorSections: </label><div class='col-sm-8'><input id='SvShuntCompensatorSections' class='form-control' type='text'{{#SvShuntCompensatorSections}} value='{{SvShuntCompensatorSections}}'{{/SvShuntCompensatorSections}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["ShuntCompensatorPhase", "ShuntCompensatorPhase", "0..*", "1"],
                        ["SvShuntCompensatorSections", "SvShuntCompensatorSections", "0..1", "1"]
                    ]
                );
            }
        }

        /**
         * A rotating machine which may be used as a generator or motor.
         *
         */
        class RotatingMachine extends RegulatingCondEq
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.RotatingMachine;
                if (null == bucket)
                   cim_data.RotatingMachine = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.RotatingMachine[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = RegulatingCondEq.prototype.parse.call (this, context, sub);
                obj.cls = "RotatingMachine";
                base.parse_element (/<cim:RotatingMachine.ratedPowerFactor>([\s\S]*?)<\/cim:RotatingMachine.ratedPowerFactor>/g, obj, "ratedPowerFactor", base.to_float, sub, context);
                base.parse_element (/<cim:RotatingMachine.ratedS>([\s\S]*?)<\/cim:RotatingMachine.ratedS>/g, obj, "ratedS", base.to_string, sub, context);
                base.parse_element (/<cim:RotatingMachine.ratedU>([\s\S]*?)<\/cim:RotatingMachine.ratedU>/g, obj, "ratedU", base.to_string, sub, context);
                base.parse_element (/<cim:RotatingMachine.p>([\s\S]*?)<\/cim:RotatingMachine.p>/g, obj, "p", base.to_string, sub, context);
                base.parse_element (/<cim:RotatingMachine.q>([\s\S]*?)<\/cim:RotatingMachine.q>/g, obj, "q", base.to_string, sub, context);
                base.parse_attribute (/<cim:RotatingMachine.GeneratingUnit\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "GeneratingUnit", sub, context);
                base.parse_attribute (/<cim:RotatingMachine.HydroPump\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "HydroPump", sub, context);
                var bucket = context.parsed.RotatingMachine;
                if (null == bucket)
                   context.parsed.RotatingMachine = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = RegulatingCondEq.prototype.export.call (this, obj, false);

                base.export_element (obj, "RotatingMachine", "ratedPowerFactor", base.from_float, fields);
                base.export_element (obj, "RotatingMachine", "ratedS", base.from_string, fields);
                base.export_element (obj, "RotatingMachine", "ratedU", base.from_string, fields);
                base.export_element (obj, "RotatingMachine", "p", base.from_string, fields);
                base.export_element (obj, "RotatingMachine", "q", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "RotatingMachine", fields);
                base.export_attribute (obj, "export_attribute", "RotatingMachine", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RotatingMachine_collapse" aria-expanded="true" aria-controls="RotatingMachine_collapse" style="margin-left: 10px;">RotatingMachine</a></legend>
                    <div id="RotatingMachine_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingCondEq.prototype.template.call (this) +
                    `
                    {{#ratedPowerFactor}}<div><b>ratedPowerFactor</b>: {{ratedPowerFactor}}</div>{{/ratedPowerFactor}}
                    {{#ratedS}}<div><b>ratedS</b>: {{ratedS}}</div>{{/ratedS}}
                    {{#ratedU}}<div><b>ratedU</b>: {{ratedU}}</div>{{/ratedU}}
                    {{#p}}<div><b>p</b>: {{p}}</div>{{/p}}
                    {{#q}}<div><b>q</b>: {{q}}</div>{{/q}}
                    {{#GeneratingUnit}}<div><b>GeneratingUnit</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{GeneratingUnit}}&quot;);})'>{{GeneratingUnit}}</a></div>{{/GeneratingUnit}}
                    {{#HydroPump}}<div><b>HydroPump</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{HydroPump}}&quot;);})'>{{HydroPump}}</a></div>{{/HydroPump}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#RotatingMachine_collapse" aria-expanded="true" aria-controls="RotatingMachine_collapse" style="margin-left: 10px;">RotatingMachine</a></legend>
                    <div id="RotatingMachine_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingCondEq.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ratedPowerFactor'>ratedPowerFactor: </label><div class='col-sm-8'><input id='ratedPowerFactor' class='form-control' type='text'{{#ratedPowerFactor}} value='{{ratedPowerFactor}}'{{/ratedPowerFactor}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ratedS'>ratedS: </label><div class='col-sm-8'><input id='ratedS' class='form-control' type='text'{{#ratedS}} value='{{ratedS}}'{{/ratedS}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ratedU'>ratedU: </label><div class='col-sm-8'><input id='ratedU' class='form-control' type='text'{{#ratedU}} value='{{ratedU}}'{{/ratedU}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='p'>p: </label><div class='col-sm-8'><input id='p' class='form-control' type='text'{{#p}} value='{{p}}'{{/p}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='q'>q: </label><div class='col-sm-8'><input id='q' class='form-control' type='text'{{#q}} value='{{q}}'{{/q}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='GeneratingUnit'>GeneratingUnit: </label><div class='col-sm-8'><input id='GeneratingUnit' class='form-control' type='text'{{#GeneratingUnit}} value='{{GeneratingUnit}}'{{/GeneratingUnit}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='HydroPump'>HydroPump: </label><div class='col-sm-8'><input id='HydroPump' class='form-control' type='text'{{#HydroPump}} value='{{HydroPump}}'{{/HydroPump}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["GeneratingUnit", "GeneratingUnit", "0..1", "1..*"],
                        ["HydroPump", "HydroPump", "0..1", "1"]
                    ]
                );
            }
        }

        /**
         * A device to convert from one frequency to another (e.g., frequency F1 to F2) comprises a pair of FrequencyConverter instances.
         *
         * One converts from F1 to DC, the other converts the DC to F2.
         *
         */
        class FrequencyConverter extends RegulatingCondEq
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.FrequencyConverter;
                if (null == bucket)
                   cim_data.FrequencyConverter = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.FrequencyConverter[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = RegulatingCondEq.prototype.parse.call (this, context, sub);
                obj.cls = "FrequencyConverter";
                base.parse_element (/<cim:FrequencyConverter.frequency>([\s\S]*?)<\/cim:FrequencyConverter.frequency>/g, obj, "frequency", base.to_string, sub, context);
                base.parse_element (/<cim:FrequencyConverter.maxP>([\s\S]*?)<\/cim:FrequencyConverter.maxP>/g, obj, "maxP", base.to_string, sub, context);
                base.parse_element (/<cim:FrequencyConverter.maxU>([\s\S]*?)<\/cim:FrequencyConverter.maxU>/g, obj, "maxU", base.to_string, sub, context);
                base.parse_element (/<cim:FrequencyConverter.minP>([\s\S]*?)<\/cim:FrequencyConverter.minP>/g, obj, "minP", base.to_string, sub, context);
                base.parse_element (/<cim:FrequencyConverter.minU>([\s\S]*?)<\/cim:FrequencyConverter.minU>/g, obj, "minU", base.to_string, sub, context);
                var bucket = context.parsed.FrequencyConverter;
                if (null == bucket)
                   context.parsed.FrequencyConverter = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = RegulatingCondEq.prototype.export.call (this, obj, false);

                base.export_element (obj, "FrequencyConverter", "frequency", base.from_string, fields);
                base.export_element (obj, "FrequencyConverter", "maxP", base.from_string, fields);
                base.export_element (obj, "FrequencyConverter", "maxU", base.from_string, fields);
                base.export_element (obj, "FrequencyConverter", "minP", base.from_string, fields);
                base.export_element (obj, "FrequencyConverter", "minU", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#FrequencyConverter_collapse" aria-expanded="true" aria-controls="FrequencyConverter_collapse" style="margin-left: 10px;">FrequencyConverter</a></legend>
                    <div id="FrequencyConverter_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingCondEq.prototype.template.call (this) +
                    `
                    {{#frequency}}<div><b>frequency</b>: {{frequency}}</div>{{/frequency}}
                    {{#maxP}}<div><b>maxP</b>: {{maxP}}</div>{{/maxP}}
                    {{#maxU}}<div><b>maxU</b>: {{maxU}}</div>{{/maxU}}
                    {{#minP}}<div><b>minP</b>: {{minP}}</div>{{/minP}}
                    {{#minU}}<div><b>minU</b>: {{minU}}</div>{{/minU}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#FrequencyConverter_collapse" aria-expanded="true" aria-controls="FrequencyConverter_collapse" style="margin-left: 10px;">FrequencyConverter</a></legend>
                    <div id="FrequencyConverter_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingCondEq.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='frequency'>frequency: </label><div class='col-sm-8'><input id='frequency' class='form-control' type='text'{{#frequency}} value='{{frequency}}'{{/frequency}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maxP'>maxP: </label><div class='col-sm-8'><input id='maxP' class='form-control' type='text'{{#maxP}} value='{{maxP}}'{{/maxP}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maxU'>maxU: </label><div class='col-sm-8'><input id='maxU' class='form-control' type='text'{{#maxU}} value='{{maxU}}'{{/maxU}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='minP'>minP: </label><div class='col-sm-8'><input id='minP' class='form-control' type='text'{{#minP}} value='{{minP}}'{{/minP}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='minU'>minU: </label><div class='col-sm-8'><input id='minU' class='form-control' type='text'{{#minU}} value='{{minU}}'{{/minU}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * An electromechanical device that operates with shaft rotating synchronously with the network.
         *
         * It is a single machine operating either as a generator or synchronous condenser or pump.
         *
         */
        class SynchronousMachine extends RotatingMachine
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.SynchronousMachine;
                if (null == bucket)
                   cim_data.SynchronousMachine = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.SynchronousMachine[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = RotatingMachine.prototype.parse.call (this, context, sub);
                obj.cls = "SynchronousMachine";
                base.parse_element (/<cim:SynchronousMachine.aVRToManualLag>([\s\S]*?)<\/cim:SynchronousMachine.aVRToManualLag>/g, obj, "aVRToManualLag", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.aVRToManualLead>([\s\S]*?)<\/cim:SynchronousMachine.aVRToManualLead>/g, obj, "aVRToManualLead", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.baseQ>([\s\S]*?)<\/cim:SynchronousMachine.baseQ>/g, obj, "baseQ", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.condenserP>([\s\S]*?)<\/cim:SynchronousMachine.condenserP>/g, obj, "condenserP", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.coolantCondition>([\s\S]*?)<\/cim:SynchronousMachine.coolantCondition>/g, obj, "coolantCondition", base.to_float, sub, context);
                base.parse_attribute (/<cim:SynchronousMachine.coolantType\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "coolantType", sub, context);
                base.parse_element (/<cim:SynchronousMachine.earthing>([\s\S]*?)<\/cim:SynchronousMachine.earthing>/g, obj, "earthing", base.to_boolean, sub, context);
                base.parse_element (/<cim:SynchronousMachine.earthingStarPointR>([\s\S]*?)<\/cim:SynchronousMachine.earthingStarPointR>/g, obj, "earthingStarPointR", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.earthingStarPointX>([\s\S]*?)<\/cim:SynchronousMachine.earthingStarPointX>/g, obj, "earthingStarPointX", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.ikk>([\s\S]*?)<\/cim:SynchronousMachine.ikk>/g, obj, "ikk", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.manualToAVR>([\s\S]*?)<\/cim:SynchronousMachine.manualToAVR>/g, obj, "manualToAVR", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.maxQ>([\s\S]*?)<\/cim:SynchronousMachine.maxQ>/g, obj, "maxQ", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.maxU>([\s\S]*?)<\/cim:SynchronousMachine.maxU>/g, obj, "maxU", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.minQ>([\s\S]*?)<\/cim:SynchronousMachine.minQ>/g, obj, "minQ", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.minU>([\s\S]*?)<\/cim:SynchronousMachine.minU>/g, obj, "minU", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.mu>([\s\S]*?)<\/cim:SynchronousMachine.mu>/g, obj, "mu", base.to_float, sub, context);
                base.parse_attribute (/<cim:SynchronousMachine.operatingMode\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "operatingMode", sub, context);
                base.parse_element (/<cim:SynchronousMachine.qPercent>([\s\S]*?)<\/cim:SynchronousMachine.qPercent>/g, obj, "qPercent", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.r>([\s\S]*?)<\/cim:SynchronousMachine.r>/g, obj, "r", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.r0>([\s\S]*?)<\/cim:SynchronousMachine.r0>/g, obj, "r0", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.r2>([\s\S]*?)<\/cim:SynchronousMachine.r2>/g, obj, "r2", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.referencePriority>([\s\S]*?)<\/cim:SynchronousMachine.referencePriority>/g, obj, "referencePriority", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.satDirectSubtransX>([\s\S]*?)<\/cim:SynchronousMachine.satDirectSubtransX>/g, obj, "satDirectSubtransX", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.satDirectSyncX>([\s\S]*?)<\/cim:SynchronousMachine.satDirectSyncX>/g, obj, "satDirectSyncX", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.satDirectTransX>([\s\S]*?)<\/cim:SynchronousMachine.satDirectTransX>/g, obj, "satDirectTransX", base.to_string, sub, context);
                base.parse_attribute (/<cim:SynchronousMachine.shortCircuitRotorType\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "shortCircuitRotorType", sub, context);
                base.parse_attribute (/<cim:SynchronousMachine.type\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "type", sub, context);
                base.parse_element (/<cim:SynchronousMachine.voltageRegulationRange>([\s\S]*?)<\/cim:SynchronousMachine.voltageRegulationRange>/g, obj, "voltageRegulationRange", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.x0>([\s\S]*?)<\/cim:SynchronousMachine.x0>/g, obj, "x0", base.to_string, sub, context);
                base.parse_element (/<cim:SynchronousMachine.x2>([\s\S]*?)<\/cim:SynchronousMachine.x2>/g, obj, "x2", base.to_string, sub, context);
                base.parse_attributes (/<cim:SynchronousMachine.PrimeMovers\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PrimeMovers", sub, context);
                base.parse_attribute (/<cim:SynchronousMachine.SynchronousMachineDynamics\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "SynchronousMachineDynamics", sub, context);
                base.parse_attribute (/<cim:SynchronousMachine.InitialReactiveCapabilityCurve\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "InitialReactiveCapabilityCurve", sub, context);
                base.parse_attributes (/<cim:SynchronousMachine.ReactiveCapabilityCurves\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ReactiveCapabilityCurves", sub, context);
                var bucket = context.parsed.SynchronousMachine;
                if (null == bucket)
                   context.parsed.SynchronousMachine = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = RotatingMachine.prototype.export.call (this, obj, false);

                base.export_element (obj, "SynchronousMachine", "aVRToManualLag", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "aVRToManualLead", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "baseQ", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "condenserP", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "coolantCondition", base.from_float, fields);
                base.export_element (obj, "SynchronousMachine", "coolantType", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "earthing", base.from_boolean, fields);
                base.export_element (obj, "SynchronousMachine", "earthingStarPointR", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "earthingStarPointX", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "ikk", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "manualToAVR", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "maxQ", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "maxU", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "minQ", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "minU", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "mu", base.from_float, fields);
                base.export_element (obj, "SynchronousMachine", "operatingMode", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "qPercent", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "r", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "r0", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "r2", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "referencePriority", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "satDirectSubtransX", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "satDirectSyncX", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "satDirectTransX", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "shortCircuitRotorType", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "type", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "voltageRegulationRange", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "x0", base.from_string, fields);
                base.export_element (obj, "SynchronousMachine", "x2", base.from_string, fields);
                base.export_attribute (obj, "export_attributes", "SynchronousMachine", fields);
                base.export_attribute (obj, "export_attribute", "SynchronousMachine", fields);
                base.export_attribute (obj, "export_attribute", "SynchronousMachine", fields);
                base.export_attribute (obj, "export_attributes", "SynchronousMachine", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#SynchronousMachine_collapse" aria-expanded="true" aria-controls="SynchronousMachine_collapse" style="margin-left: 10px;">SynchronousMachine</a></legend>
                    <div id="SynchronousMachine_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RotatingMachine.prototype.template.call (this) +
                    `
                    {{#aVRToManualLag}}<div><b>aVRToManualLag</b>: {{aVRToManualLag}}</div>{{/aVRToManualLag}}
                    {{#aVRToManualLead}}<div><b>aVRToManualLead</b>: {{aVRToManualLead}}</div>{{/aVRToManualLead}}
                    {{#baseQ}}<div><b>baseQ</b>: {{baseQ}}</div>{{/baseQ}}
                    {{#condenserP}}<div><b>condenserP</b>: {{condenserP}}</div>{{/condenserP}}
                    {{#coolantCondition}}<div><b>coolantCondition</b>: {{coolantCondition}}</div>{{/coolantCondition}}
                    {{#coolantType}}<div><b>coolantType</b>: {{coolantType}}</div>{{/coolantType}}
                    {{#earthing}}<div><b>earthing</b>: {{earthing}}</div>{{/earthing}}
                    {{#earthingStarPointR}}<div><b>earthingStarPointR</b>: {{earthingStarPointR}}</div>{{/earthingStarPointR}}
                    {{#earthingStarPointX}}<div><b>earthingStarPointX</b>: {{earthingStarPointX}}</div>{{/earthingStarPointX}}
                    {{#ikk}}<div><b>ikk</b>: {{ikk}}</div>{{/ikk}}
                    {{#manualToAVR}}<div><b>manualToAVR</b>: {{manualToAVR}}</div>{{/manualToAVR}}
                    {{#maxQ}}<div><b>maxQ</b>: {{maxQ}}</div>{{/maxQ}}
                    {{#maxU}}<div><b>maxU</b>: {{maxU}}</div>{{/maxU}}
                    {{#minQ}}<div><b>minQ</b>: {{minQ}}</div>{{/minQ}}
                    {{#minU}}<div><b>minU</b>: {{minU}}</div>{{/minU}}
                    {{#mu}}<div><b>mu</b>: {{mu}}</div>{{/mu}}
                    {{#operatingMode}}<div><b>operatingMode</b>: {{operatingMode}}</div>{{/operatingMode}}
                    {{#qPercent}}<div><b>qPercent</b>: {{qPercent}}</div>{{/qPercent}}
                    {{#r}}<div><b>r</b>: {{r}}</div>{{/r}}
                    {{#r0}}<div><b>r0</b>: {{r0}}</div>{{/r0}}
                    {{#r2}}<div><b>r2</b>: {{r2}}</div>{{/r2}}
                    {{#referencePriority}}<div><b>referencePriority</b>: {{referencePriority}}</div>{{/referencePriority}}
                    {{#satDirectSubtransX}}<div><b>satDirectSubtransX</b>: {{satDirectSubtransX}}</div>{{/satDirectSubtransX}}
                    {{#satDirectSyncX}}<div><b>satDirectSyncX</b>: {{satDirectSyncX}}</div>{{/satDirectSyncX}}
                    {{#satDirectTransX}}<div><b>satDirectTransX</b>: {{satDirectTransX}}</div>{{/satDirectTransX}}
                    {{#shortCircuitRotorType}}<div><b>shortCircuitRotorType</b>: {{shortCircuitRotorType}}</div>{{/shortCircuitRotorType}}
                    {{#type}}<div><b>type</b>: {{type}}</div>{{/type}}
                    {{#voltageRegulationRange}}<div><b>voltageRegulationRange</b>: {{voltageRegulationRange}}</div>{{/voltageRegulationRange}}
                    {{#x0}}<div><b>x0</b>: {{x0}}</div>{{/x0}}
                    {{#x2}}<div><b>x2</b>: {{x2}}</div>{{/x2}}
                    {{#PrimeMovers}}<div><b>PrimeMovers</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/PrimeMovers}}
                    {{#SynchronousMachineDynamics}}<div><b>SynchronousMachineDynamics</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{SynchronousMachineDynamics}}&quot;);})'>{{SynchronousMachineDynamics}}</a></div>{{/SynchronousMachineDynamics}}
                    {{#InitialReactiveCapabilityCurve}}<div><b>InitialReactiveCapabilityCurve</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{InitialReactiveCapabilityCurve}}&quot;);})'>{{InitialReactiveCapabilityCurve}}</a></div>{{/InitialReactiveCapabilityCurve}}
                    {{#ReactiveCapabilityCurves}}<div><b>ReactiveCapabilityCurves</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ReactiveCapabilityCurves}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.CoolantType = []; if (!obj.coolantType) obj.CoolantType.push ({ id: '', selected: true}); for (var property in CoolantType) obj.CoolantType.push ({ id: property, selected: obj.coolantType && obj.coolantType.endsWith ('.' + property)});
                obj.SynchronousMachineOperatingMode = []; if (!obj.operatingMode) obj.SynchronousMachineOperatingMode.push ({ id: '', selected: true}); for (var property in SynchronousMachineOperatingMode) obj.SynchronousMachineOperatingMode.push ({ id: property, selected: obj.operatingMode && obj.operatingMode.endsWith ('.' + property)});
                obj.ShortCircuitRotorKind = []; if (!obj.shortCircuitRotorType) obj.ShortCircuitRotorKind.push ({ id: '', selected: true}); for (var property in ShortCircuitRotorKind) obj.ShortCircuitRotorKind.push ({ id: property, selected: obj.shortCircuitRotorType && obj.shortCircuitRotorType.endsWith ('.' + property)});
                obj.SynchronousMachineKind = []; if (!obj.type) obj.SynchronousMachineKind.push ({ id: '', selected: true}); for (var property in SynchronousMachineKind) obj.SynchronousMachineKind.push ({ id: property, selected: obj.type && obj.type.endsWith ('.' + property)});
                if (obj.PrimeMovers) obj.PrimeMovers_string = obj.PrimeMovers.join ();
                if (obj.ReactiveCapabilityCurves) obj.ReactiveCapabilityCurves_string = obj.ReactiveCapabilityCurves.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.CoolantType;
                delete obj.SynchronousMachineOperatingMode;
                delete obj.ShortCircuitRotorKind;
                delete obj.SynchronousMachineKind;
                delete obj.PrimeMovers_string;
                delete obj.ReactiveCapabilityCurves_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#SynchronousMachine_collapse" aria-expanded="true" aria-controls="SynchronousMachine_collapse" style="margin-left: 10px;">SynchronousMachine</a></legend>
                    <div id="SynchronousMachine_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RotatingMachine.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='aVRToManualLag'>aVRToManualLag: </label><div class='col-sm-8'><input id='aVRToManualLag' class='form-control' type='text'{{#aVRToManualLag}} value='{{aVRToManualLag}}'{{/aVRToManualLag}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='aVRToManualLead'>aVRToManualLead: </label><div class='col-sm-8'><input id='aVRToManualLead' class='form-control' type='text'{{#aVRToManualLead}} value='{{aVRToManualLead}}'{{/aVRToManualLead}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='baseQ'>baseQ: </label><div class='col-sm-8'><input id='baseQ' class='form-control' type='text'{{#baseQ}} value='{{baseQ}}'{{/baseQ}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='condenserP'>condenserP: </label><div class='col-sm-8'><input id='condenserP' class='form-control' type='text'{{#condenserP}} value='{{condenserP}}'{{/condenserP}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='coolantCondition'>coolantCondition: </label><div class='col-sm-8'><input id='coolantCondition' class='form-control' type='text'{{#coolantCondition}} value='{{coolantCondition}}'{{/coolantCondition}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='coolantType'>coolantType: </label><div class='col-sm-8'><select id='coolantType' class='form-control'>{{#CoolantType}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/CoolantType}}</select></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='earthing'>earthing: </label><div class='col-sm-8'><input id='earthing' class='form-check-input' type='checkbox'{{#earthing}} checked{{/earthing}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='earthingStarPointR'>earthingStarPointR: </label><div class='col-sm-8'><input id='earthingStarPointR' class='form-control' type='text'{{#earthingStarPointR}} value='{{earthingStarPointR}}'{{/earthingStarPointR}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='earthingStarPointX'>earthingStarPointX: </label><div class='col-sm-8'><input id='earthingStarPointX' class='form-control' type='text'{{#earthingStarPointX}} value='{{earthingStarPointX}}'{{/earthingStarPointX}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ikk'>ikk: </label><div class='col-sm-8'><input id='ikk' class='form-control' type='text'{{#ikk}} value='{{ikk}}'{{/ikk}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='manualToAVR'>manualToAVR: </label><div class='col-sm-8'><input id='manualToAVR' class='form-control' type='text'{{#manualToAVR}} value='{{manualToAVR}}'{{/manualToAVR}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maxQ'>maxQ: </label><div class='col-sm-8'><input id='maxQ' class='form-control' type='text'{{#maxQ}} value='{{maxQ}}'{{/maxQ}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maxU'>maxU: </label><div class='col-sm-8'><input id='maxU' class='form-control' type='text'{{#maxU}} value='{{maxU}}'{{/maxU}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='minQ'>minQ: </label><div class='col-sm-8'><input id='minQ' class='form-control' type='text'{{#minQ}} value='{{minQ}}'{{/minQ}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='minU'>minU: </label><div class='col-sm-8'><input id='minU' class='form-control' type='text'{{#minU}} value='{{minU}}'{{/minU}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='mu'>mu: </label><div class='col-sm-8'><input id='mu' class='form-control' type='text'{{#mu}} value='{{mu}}'{{/mu}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='operatingMode'>operatingMode: </label><div class='col-sm-8'><select id='operatingMode' class='form-control'>{{#SynchronousMachineOperatingMode}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/SynchronousMachineOperatingMode}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='qPercent'>qPercent: </label><div class='col-sm-8'><input id='qPercent' class='form-control' type='text'{{#qPercent}} value='{{qPercent}}'{{/qPercent}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r'>r: </label><div class='col-sm-8'><input id='r' class='form-control' type='text'{{#r}} value='{{r}}'{{/r}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r0'>r0: </label><div class='col-sm-8'><input id='r0' class='form-control' type='text'{{#r0}} value='{{r0}}'{{/r0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r2'>r2: </label><div class='col-sm-8'><input id='r2' class='form-control' type='text'{{#r2}} value='{{r2}}'{{/r2}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='referencePriority'>referencePriority: </label><div class='col-sm-8'><input id='referencePriority' class='form-control' type='text'{{#referencePriority}} value='{{referencePriority}}'{{/referencePriority}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='satDirectSubtransX'>satDirectSubtransX: </label><div class='col-sm-8'><input id='satDirectSubtransX' class='form-control' type='text'{{#satDirectSubtransX}} value='{{satDirectSubtransX}}'{{/satDirectSubtransX}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='satDirectSyncX'>satDirectSyncX: </label><div class='col-sm-8'><input id='satDirectSyncX' class='form-control' type='text'{{#satDirectSyncX}} value='{{satDirectSyncX}}'{{/satDirectSyncX}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='satDirectTransX'>satDirectTransX: </label><div class='col-sm-8'><input id='satDirectTransX' class='form-control' type='text'{{#satDirectTransX}} value='{{satDirectTransX}}'{{/satDirectTransX}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='shortCircuitRotorType'>shortCircuitRotorType: </label><div class='col-sm-8'><select id='shortCircuitRotorType' class='form-control'>{{#ShortCircuitRotorKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/ShortCircuitRotorKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='type'>type: </label><div class='col-sm-8'><select id='type' class='form-control'>{{#SynchronousMachineKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/SynchronousMachineKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='voltageRegulationRange'>voltageRegulationRange: </label><div class='col-sm-8'><input id='voltageRegulationRange' class='form-control' type='text'{{#voltageRegulationRange}} value='{{voltageRegulationRange}}'{{/voltageRegulationRange}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x0'>x0: </label><div class='col-sm-8'><input id='x0' class='form-control' type='text'{{#x0}} value='{{x0}}'{{/x0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x2'>x2: </label><div class='col-sm-8'><input id='x2' class='form-control' type='text'{{#x2}} value='{{x2}}'{{/x2}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='PrimeMovers'>PrimeMovers: </label><div class='col-sm-8'><input id='PrimeMovers' class='form-control' type='text'{{#PrimeMovers}} value='{{PrimeMovers}}_string'{{/PrimeMovers}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='SynchronousMachineDynamics'>SynchronousMachineDynamics: </label><div class='col-sm-8'><input id='SynchronousMachineDynamics' class='form-control' type='text'{{#SynchronousMachineDynamics}} value='{{SynchronousMachineDynamics}}'{{/SynchronousMachineDynamics}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='InitialReactiveCapabilityCurve'>InitialReactiveCapabilityCurve: </label><div class='col-sm-8'><input id='InitialReactiveCapabilityCurve' class='form-control' type='text'{{#InitialReactiveCapabilityCurve}} value='{{InitialReactiveCapabilityCurve}}'{{/InitialReactiveCapabilityCurve}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ReactiveCapabilityCurves'>ReactiveCapabilityCurves: </label><div class='col-sm-8'><input id='ReactiveCapabilityCurves' class='form-control' type='text'{{#ReactiveCapabilityCurves}} value='{{ReactiveCapabilityCurves}}_string'{{/ReactiveCapabilityCurves}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["PrimeMovers", "PrimeMover", "0..*", "0..*"],
                        ["SynchronousMachineDynamics", "SynchronousMachineDynamics", "0..1", "1"],
                        ["InitialReactiveCapabilityCurve", "ReactiveCapabilityCurve", "0..1", "1..*"],
                        ["ReactiveCapabilityCurves", "ReactiveCapabilityCurve", "0..*", "1..*"]
                    ]
                );
            }
        }

        /**
         * A facility for providing variable and controllable shunt reactive power.
         *
         * The SVC typically consists of a stepdown transformer, filter, thyristor-controlled reactor, and thyristor-switched capacitor arms.
         *
         */
        class StaticVarCompensator extends RegulatingCondEq
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.StaticVarCompensator;
                if (null == bucket)
                   cim_data.StaticVarCompensator = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.StaticVarCompensator[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = RegulatingCondEq.prototype.parse.call (this, context, sub);
                obj.cls = "StaticVarCompensator";
                base.parse_element (/<cim:StaticVarCompensator.capacitiveRating>([\s\S]*?)<\/cim:StaticVarCompensator.capacitiveRating>/g, obj, "capacitiveRating", base.to_string, sub, context);
                base.parse_element (/<cim:StaticVarCompensator.inductiveRating>([\s\S]*?)<\/cim:StaticVarCompensator.inductiveRating>/g, obj, "inductiveRating", base.to_string, sub, context);
                base.parse_element (/<cim:StaticVarCompensator.slope>([\s\S]*?)<\/cim:StaticVarCompensator.slope>/g, obj, "slope", base.to_string, sub, context);
                base.parse_attribute (/<cim:StaticVarCompensator.sVCControlMode\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "sVCControlMode", sub, context);
                base.parse_element (/<cim:StaticVarCompensator.voltageSetPoint>([\s\S]*?)<\/cim:StaticVarCompensator.voltageSetPoint>/g, obj, "voltageSetPoint", base.to_string, sub, context);
                base.parse_element (/<cim:StaticVarCompensator.q>([\s\S]*?)<\/cim:StaticVarCompensator.q>/g, obj, "q", base.to_string, sub, context);
                var bucket = context.parsed.StaticVarCompensator;
                if (null == bucket)
                   context.parsed.StaticVarCompensator = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = RegulatingCondEq.prototype.export.call (this, obj, false);

                base.export_element (obj, "StaticVarCompensator", "capacitiveRating", base.from_string, fields);
                base.export_element (obj, "StaticVarCompensator", "inductiveRating", base.from_string, fields);
                base.export_element (obj, "StaticVarCompensator", "slope", base.from_string, fields);
                base.export_element (obj, "StaticVarCompensator", "sVCControlMode", base.from_string, fields);
                base.export_element (obj, "StaticVarCompensator", "voltageSetPoint", base.from_string, fields);
                base.export_element (obj, "StaticVarCompensator", "q", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#StaticVarCompensator_collapse" aria-expanded="true" aria-controls="StaticVarCompensator_collapse" style="margin-left: 10px;">StaticVarCompensator</a></legend>
                    <div id="StaticVarCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingCondEq.prototype.template.call (this) +
                    `
                    {{#capacitiveRating}}<div><b>capacitiveRating</b>: {{capacitiveRating}}</div>{{/capacitiveRating}}
                    {{#inductiveRating}}<div><b>inductiveRating</b>: {{inductiveRating}}</div>{{/inductiveRating}}
                    {{#slope}}<div><b>slope</b>: {{slope}}</div>{{/slope}}
                    {{#sVCControlMode}}<div><b>sVCControlMode</b>: {{sVCControlMode}}</div>{{/sVCControlMode}}
                    {{#voltageSetPoint}}<div><b>voltageSetPoint</b>: {{voltageSetPoint}}</div>{{/voltageSetPoint}}
                    {{#q}}<div><b>q</b>: {{q}}</div>{{/q}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.SVCControlMode = []; if (!obj.sVCControlMode) obj.SVCControlMode.push ({ id: '', selected: true}); for (var property in SVCControlMode) obj.SVCControlMode.push ({ id: property, selected: obj.sVCControlMode && obj.sVCControlMode.endsWith ('.' + property)});
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.SVCControlMode;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#StaticVarCompensator_collapse" aria-expanded="true" aria-controls="StaticVarCompensator_collapse" style="margin-left: 10px;">StaticVarCompensator</a></legend>
                    <div id="StaticVarCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingCondEq.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='capacitiveRating'>capacitiveRating: </label><div class='col-sm-8'><input id='capacitiveRating' class='form-control' type='text'{{#capacitiveRating}} value='{{capacitiveRating}}'{{/capacitiveRating}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='inductiveRating'>inductiveRating: </label><div class='col-sm-8'><input id='inductiveRating' class='form-control' type='text'{{#inductiveRating}} value='{{inductiveRating}}'{{/inductiveRating}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='slope'>slope: </label><div class='col-sm-8'><input id='slope' class='form-control' type='text'{{#slope}} value='{{slope}}'{{/slope}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='sVCControlMode'>sVCControlMode: </label><div class='col-sm-8'><select id='sVCControlMode' class='form-control'>{{#SVCControlMode}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/SVCControlMode}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='voltageSetPoint'>voltageSetPoint: </label><div class='col-sm-8'><input id='voltageSetPoint' class='form-control' type='text'{{#voltageSetPoint}} value='{{voltageSetPoint}}'{{/voltageSetPoint}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='q'>q: </label><div class='col-sm-8'><input id='q' class='form-control' type='text'{{#q}} value='{{q}}'{{/q}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A non linear shunt compensator has bank or section admittance values that differs.
         *
         */
        class NonlinearShuntCompensator extends ShuntCompensator
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.NonlinearShuntCompensator;
                if (null == bucket)
                   cim_data.NonlinearShuntCompensator = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.NonlinearShuntCompensator[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ShuntCompensator.prototype.parse.call (this, context, sub);
                obj.cls = "NonlinearShuntCompensator";
                base.parse_attributes (/<cim:NonlinearShuntCompensator.NonlinearShuntCompensatorPoints\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "NonlinearShuntCompensatorPoints", sub, context);
                var bucket = context.parsed.NonlinearShuntCompensator;
                if (null == bucket)
                   context.parsed.NonlinearShuntCompensator = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ShuntCompensator.prototype.export.call (this, obj, false);

                base.export_attribute (obj, "export_attributes", "NonlinearShuntCompensator", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#NonlinearShuntCompensator_collapse" aria-expanded="true" aria-controls="NonlinearShuntCompensator_collapse" style="margin-left: 10px;">NonlinearShuntCompensator</a></legend>
                    <div id="NonlinearShuntCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ShuntCompensator.prototype.template.call (this) +
                    `
                    {{#NonlinearShuntCompensatorPoints}}<div><b>NonlinearShuntCompensatorPoints</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/NonlinearShuntCompensatorPoints}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.NonlinearShuntCompensatorPoints) obj.NonlinearShuntCompensatorPoints_string = obj.NonlinearShuntCompensatorPoints.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.NonlinearShuntCompensatorPoints_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#NonlinearShuntCompensator_collapse" aria-expanded="true" aria-controls="NonlinearShuntCompensator_collapse" style="margin-left: 10px;">NonlinearShuntCompensator</a></legend>
                    <div id="NonlinearShuntCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ShuntCompensator.prototype.edit_template.call (this) +
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
                        ["NonlinearShuntCompensatorPoints", "NonlinearShuntCompensatorPoint", "1..*", "1"]
                    ]
                );
            }
        }

        /**
         * This class represents external network and it is used for IEC 60909 calculations.
         *
         */
        class ExternalNetworkInjection extends RegulatingCondEq
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ExternalNetworkInjection;
                if (null == bucket)
                   cim_data.ExternalNetworkInjection = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ExternalNetworkInjection[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = RegulatingCondEq.prototype.parse.call (this, context, sub);
                obj.cls = "ExternalNetworkInjection";
                base.parse_element (/<cim:ExternalNetworkInjection.governorSCD>([\s\S]*?)<\/cim:ExternalNetworkInjection.governorSCD>/g, obj, "governorSCD", base.to_string, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.ikSecond>([\s\S]*?)<\/cim:ExternalNetworkInjection.ikSecond>/g, obj, "ikSecond", base.to_boolean, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.maxInitialSymShCCurrent>([\s\S]*?)<\/cim:ExternalNetworkInjection.maxInitialSymShCCurrent>/g, obj, "maxInitialSymShCCurrent", base.to_string, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.maxP>([\s\S]*?)<\/cim:ExternalNetworkInjection.maxP>/g, obj, "maxP", base.to_string, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.maxQ>([\s\S]*?)<\/cim:ExternalNetworkInjection.maxQ>/g, obj, "maxQ", base.to_string, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.maxR0ToX0Ratio>([\s\S]*?)<\/cim:ExternalNetworkInjection.maxR0ToX0Ratio>/g, obj, "maxR0ToX0Ratio", base.to_float, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.maxR1ToX1Ratio>([\s\S]*?)<\/cim:ExternalNetworkInjection.maxR1ToX1Ratio>/g, obj, "maxR1ToX1Ratio", base.to_float, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.maxZ0ToZ1Ratio>([\s\S]*?)<\/cim:ExternalNetworkInjection.maxZ0ToZ1Ratio>/g, obj, "maxZ0ToZ1Ratio", base.to_float, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.minInitialSymShCCurrent>([\s\S]*?)<\/cim:ExternalNetworkInjection.minInitialSymShCCurrent>/g, obj, "minInitialSymShCCurrent", base.to_string, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.minP>([\s\S]*?)<\/cim:ExternalNetworkInjection.minP>/g, obj, "minP", base.to_string, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.minQ>([\s\S]*?)<\/cim:ExternalNetworkInjection.minQ>/g, obj, "minQ", base.to_string, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.minR0ToX0Ratio>([\s\S]*?)<\/cim:ExternalNetworkInjection.minR0ToX0Ratio>/g, obj, "minR0ToX0Ratio", base.to_float, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.minR1ToX1Ratio>([\s\S]*?)<\/cim:ExternalNetworkInjection.minR1ToX1Ratio>/g, obj, "minR1ToX1Ratio", base.to_float, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.minZ0ToZ1Ratio>([\s\S]*?)<\/cim:ExternalNetworkInjection.minZ0ToZ1Ratio>/g, obj, "minZ0ToZ1Ratio", base.to_float, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.referencePriority>([\s\S]*?)<\/cim:ExternalNetworkInjection.referencePriority>/g, obj, "referencePriority", base.to_string, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.voltageFactor>([\s\S]*?)<\/cim:ExternalNetworkInjection.voltageFactor>/g, obj, "voltageFactor", base.to_string, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.p>([\s\S]*?)<\/cim:ExternalNetworkInjection.p>/g, obj, "p", base.to_string, sub, context);
                base.parse_element (/<cim:ExternalNetworkInjection.q>([\s\S]*?)<\/cim:ExternalNetworkInjection.q>/g, obj, "q", base.to_string, sub, context);
                var bucket = context.parsed.ExternalNetworkInjection;
                if (null == bucket)
                   context.parsed.ExternalNetworkInjection = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = RegulatingCondEq.prototype.export.call (this, obj, false);

                base.export_element (obj, "ExternalNetworkInjection", "governorSCD", base.from_string, fields);
                base.export_element (obj, "ExternalNetworkInjection", "ikSecond", base.from_boolean, fields);
                base.export_element (obj, "ExternalNetworkInjection", "maxInitialSymShCCurrent", base.from_string, fields);
                base.export_element (obj, "ExternalNetworkInjection", "maxP", base.from_string, fields);
                base.export_element (obj, "ExternalNetworkInjection", "maxQ", base.from_string, fields);
                base.export_element (obj, "ExternalNetworkInjection", "maxR0ToX0Ratio", base.from_float, fields);
                base.export_element (obj, "ExternalNetworkInjection", "maxR1ToX1Ratio", base.from_float, fields);
                base.export_element (obj, "ExternalNetworkInjection", "maxZ0ToZ1Ratio", base.from_float, fields);
                base.export_element (obj, "ExternalNetworkInjection", "minInitialSymShCCurrent", base.from_string, fields);
                base.export_element (obj, "ExternalNetworkInjection", "minP", base.from_string, fields);
                base.export_element (obj, "ExternalNetworkInjection", "minQ", base.from_string, fields);
                base.export_element (obj, "ExternalNetworkInjection", "minR0ToX0Ratio", base.from_float, fields);
                base.export_element (obj, "ExternalNetworkInjection", "minR1ToX1Ratio", base.from_float, fields);
                base.export_element (obj, "ExternalNetworkInjection", "minZ0ToZ1Ratio", base.from_float, fields);
                base.export_element (obj, "ExternalNetworkInjection", "referencePriority", base.from_string, fields);
                base.export_element (obj, "ExternalNetworkInjection", "voltageFactor", base.from_string, fields);
                base.export_element (obj, "ExternalNetworkInjection", "p", base.from_string, fields);
                base.export_element (obj, "ExternalNetworkInjection", "q", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ExternalNetworkInjection_collapse" aria-expanded="true" aria-controls="ExternalNetworkInjection_collapse" style="margin-left: 10px;">ExternalNetworkInjection</a></legend>
                    <div id="ExternalNetworkInjection_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingCondEq.prototype.template.call (this) +
                    `
                    {{#governorSCD}}<div><b>governorSCD</b>: {{governorSCD}}</div>{{/governorSCD}}
                    {{#ikSecond}}<div><b>ikSecond</b>: {{ikSecond}}</div>{{/ikSecond}}
                    {{#maxInitialSymShCCurrent}}<div><b>maxInitialSymShCCurrent</b>: {{maxInitialSymShCCurrent}}</div>{{/maxInitialSymShCCurrent}}
                    {{#maxP}}<div><b>maxP</b>: {{maxP}}</div>{{/maxP}}
                    {{#maxQ}}<div><b>maxQ</b>: {{maxQ}}</div>{{/maxQ}}
                    {{#maxR0ToX0Ratio}}<div><b>maxR0ToX0Ratio</b>: {{maxR0ToX0Ratio}}</div>{{/maxR0ToX0Ratio}}
                    {{#maxR1ToX1Ratio}}<div><b>maxR1ToX1Ratio</b>: {{maxR1ToX1Ratio}}</div>{{/maxR1ToX1Ratio}}
                    {{#maxZ0ToZ1Ratio}}<div><b>maxZ0ToZ1Ratio</b>: {{maxZ0ToZ1Ratio}}</div>{{/maxZ0ToZ1Ratio}}
                    {{#minInitialSymShCCurrent}}<div><b>minInitialSymShCCurrent</b>: {{minInitialSymShCCurrent}}</div>{{/minInitialSymShCCurrent}}
                    {{#minP}}<div><b>minP</b>: {{minP}}</div>{{/minP}}
                    {{#minQ}}<div><b>minQ</b>: {{minQ}}</div>{{/minQ}}
                    {{#minR0ToX0Ratio}}<div><b>minR0ToX0Ratio</b>: {{minR0ToX0Ratio}}</div>{{/minR0ToX0Ratio}}
                    {{#minR1ToX1Ratio}}<div><b>minR1ToX1Ratio</b>: {{minR1ToX1Ratio}}</div>{{/minR1ToX1Ratio}}
                    {{#minZ0ToZ1Ratio}}<div><b>minZ0ToZ1Ratio</b>: {{minZ0ToZ1Ratio}}</div>{{/minZ0ToZ1Ratio}}
                    {{#referencePriority}}<div><b>referencePriority</b>: {{referencePriority}}</div>{{/referencePriority}}
                    {{#voltageFactor}}<div><b>voltageFactor</b>: {{voltageFactor}}</div>{{/voltageFactor}}
                    {{#p}}<div><b>p</b>: {{p}}</div>{{/p}}
                    {{#q}}<div><b>q</b>: {{q}}</div>{{/q}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ExternalNetworkInjection_collapse" aria-expanded="true" aria-controls="ExternalNetworkInjection_collapse" style="margin-left: 10px;">ExternalNetworkInjection</a></legend>
                    <div id="ExternalNetworkInjection_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RegulatingCondEq.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='governorSCD'>governorSCD: </label><div class='col-sm-8'><input id='governorSCD' class='form-control' type='text'{{#governorSCD}} value='{{governorSCD}}'{{/governorSCD}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='ikSecond'>ikSecond: </label><div class='col-sm-8'><input id='ikSecond' class='form-check-input' type='checkbox'{{#ikSecond}} checked{{/ikSecond}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maxInitialSymShCCurrent'>maxInitialSymShCCurrent: </label><div class='col-sm-8'><input id='maxInitialSymShCCurrent' class='form-control' type='text'{{#maxInitialSymShCCurrent}} value='{{maxInitialSymShCCurrent}}'{{/maxInitialSymShCCurrent}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maxP'>maxP: </label><div class='col-sm-8'><input id='maxP' class='form-control' type='text'{{#maxP}} value='{{maxP}}'{{/maxP}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maxQ'>maxQ: </label><div class='col-sm-8'><input id='maxQ' class='form-control' type='text'{{#maxQ}} value='{{maxQ}}'{{/maxQ}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maxR0ToX0Ratio'>maxR0ToX0Ratio: </label><div class='col-sm-8'><input id='maxR0ToX0Ratio' class='form-control' type='text'{{#maxR0ToX0Ratio}} value='{{maxR0ToX0Ratio}}'{{/maxR0ToX0Ratio}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maxR1ToX1Ratio'>maxR1ToX1Ratio: </label><div class='col-sm-8'><input id='maxR1ToX1Ratio' class='form-control' type='text'{{#maxR1ToX1Ratio}} value='{{maxR1ToX1Ratio}}'{{/maxR1ToX1Ratio}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='maxZ0ToZ1Ratio'>maxZ0ToZ1Ratio: </label><div class='col-sm-8'><input id='maxZ0ToZ1Ratio' class='form-control' type='text'{{#maxZ0ToZ1Ratio}} value='{{maxZ0ToZ1Ratio}}'{{/maxZ0ToZ1Ratio}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='minInitialSymShCCurrent'>minInitialSymShCCurrent: </label><div class='col-sm-8'><input id='minInitialSymShCCurrent' class='form-control' type='text'{{#minInitialSymShCCurrent}} value='{{minInitialSymShCCurrent}}'{{/minInitialSymShCCurrent}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='minP'>minP: </label><div class='col-sm-8'><input id='minP' class='form-control' type='text'{{#minP}} value='{{minP}}'{{/minP}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='minQ'>minQ: </label><div class='col-sm-8'><input id='minQ' class='form-control' type='text'{{#minQ}} value='{{minQ}}'{{/minQ}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='minR0ToX0Ratio'>minR0ToX0Ratio: </label><div class='col-sm-8'><input id='minR0ToX0Ratio' class='form-control' type='text'{{#minR0ToX0Ratio}} value='{{minR0ToX0Ratio}}'{{/minR0ToX0Ratio}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='minR1ToX1Ratio'>minR1ToX1Ratio: </label><div class='col-sm-8'><input id='minR1ToX1Ratio' class='form-control' type='text'{{#minR1ToX1Ratio}} value='{{minR1ToX1Ratio}}'{{/minR1ToX1Ratio}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='minZ0ToZ1Ratio'>minZ0ToZ1Ratio: </label><div class='col-sm-8'><input id='minZ0ToZ1Ratio' class='form-control' type='text'{{#minZ0ToZ1Ratio}} value='{{minZ0ToZ1Ratio}}'{{/minZ0ToZ1Ratio}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='referencePriority'>referencePriority: </label><div class='col-sm-8'><input id='referencePriority' class='form-control' type='text'{{#referencePriority}} value='{{referencePriority}}'{{/referencePriority}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='voltageFactor'>voltageFactor: </label><div class='col-sm-8'><input id='voltageFactor' class='form-control' type='text'{{#voltageFactor}} value='{{voltageFactor}}'{{/voltageFactor}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='p'>p: </label><div class='col-sm-8'><input id='p' class='form-control' type='text'{{#p}} value='{{p}}'{{/p}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='q'>q: </label><div class='col-sm-8'><input id='q' class='form-control' type='text'{{#q}} value='{{q}}'{{/q}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A linear shunt compensator has banks or sections with equal admittance values.
         *
         */
        class LinearShuntCompensator extends ShuntCompensator
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.LinearShuntCompensator;
                if (null == bucket)
                   cim_data.LinearShuntCompensator = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.LinearShuntCompensator[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = ShuntCompensator.prototype.parse.call (this, context, sub);
                obj.cls = "LinearShuntCompensator";
                base.parse_element (/<cim:LinearShuntCompensator.b0PerSection>([\s\S]*?)<\/cim:LinearShuntCompensator.b0PerSection>/g, obj, "b0PerSection", base.to_string, sub, context);
                base.parse_element (/<cim:LinearShuntCompensator.bPerSection>([\s\S]*?)<\/cim:LinearShuntCompensator.bPerSection>/g, obj, "bPerSection", base.to_string, sub, context);
                base.parse_element (/<cim:LinearShuntCompensator.g0PerSection>([\s\S]*?)<\/cim:LinearShuntCompensator.g0PerSection>/g, obj, "g0PerSection", base.to_string, sub, context);
                base.parse_element (/<cim:LinearShuntCompensator.gPerSection>([\s\S]*?)<\/cim:LinearShuntCompensator.gPerSection>/g, obj, "gPerSection", base.to_string, sub, context);
                var bucket = context.parsed.LinearShuntCompensator;
                if (null == bucket)
                   context.parsed.LinearShuntCompensator = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = ShuntCompensator.prototype.export.call (this, obj, false);

                base.export_element (obj, "LinearShuntCompensator", "b0PerSection", base.from_string, fields);
                base.export_element (obj, "LinearShuntCompensator", "bPerSection", base.from_string, fields);
                base.export_element (obj, "LinearShuntCompensator", "g0PerSection", base.from_string, fields);
                base.export_element (obj, "LinearShuntCompensator", "gPerSection", base.from_string, fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#LinearShuntCompensator_collapse" aria-expanded="true" aria-controls="LinearShuntCompensator_collapse" style="margin-left: 10px;">LinearShuntCompensator</a></legend>
                    <div id="LinearShuntCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ShuntCompensator.prototype.template.call (this) +
                    `
                    {{#b0PerSection}}<div><b>b0PerSection</b>: {{b0PerSection}}</div>{{/b0PerSection}}
                    {{#bPerSection}}<div><b>bPerSection</b>: {{bPerSection}}</div>{{/bPerSection}}
                    {{#g0PerSection}}<div><b>g0PerSection</b>: {{g0PerSection}}</div>{{/g0PerSection}}
                    {{#gPerSection}}<div><b>gPerSection</b>: {{gPerSection}}</div>{{/gPerSection}}
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
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#LinearShuntCompensator_collapse" aria-expanded="true" aria-controls="LinearShuntCompensator_collapse" style="margin-left: 10px;">LinearShuntCompensator</a></legend>
                    <div id="LinearShuntCompensator_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + ShuntCompensator.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b0PerSection'>b0PerSection: </label><div class='col-sm-8'><input id='b0PerSection' class='form-control' type='text'{{#b0PerSection}} value='{{b0PerSection}}'{{/b0PerSection}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='bPerSection'>bPerSection: </label><div class='col-sm-8'><input id='bPerSection' class='form-control' type='text'{{#bPerSection}} value='{{bPerSection}}'{{/bPerSection}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g0PerSection'>g0PerSection: </label><div class='col-sm-8'><input id='g0PerSection' class='form-control' type='text'{{#g0PerSection}} value='{{g0PerSection}}'{{/g0PerSection}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='gPerSection'>gPerSection: </label><div class='col-sm-8'><input id='gPerSection' class='form-control' type='text'{{#gPerSection}} value='{{gPerSection}}'{{/gPerSection}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }
        }

        /**
         * A rotating machine whose shaft rotates asynchronously with the electrical field.
         *
         * Also known as an induction machine with no external connection to the rotor windings, e.g squirrel-cage induction machine.
         *
         */
        class AsynchronousMachine extends RotatingMachine
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.AsynchronousMachine;
                if (null == bucket)
                   cim_data.AsynchronousMachine = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.AsynchronousMachine[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = RotatingMachine.prototype.parse.call (this, context, sub);
                obj.cls = "AsynchronousMachine";
                base.parse_element (/<cim:AsynchronousMachine.converterFedDrive>([\s\S]*?)<\/cim:AsynchronousMachine.converterFedDrive>/g, obj, "converterFedDrive", base.to_boolean, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.efficiency>([\s\S]*?)<\/cim:AsynchronousMachine.efficiency>/g, obj, "efficiency", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.iaIrRatio>([\s\S]*?)<\/cim:AsynchronousMachine.iaIrRatio>/g, obj, "iaIrRatio", base.to_float, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.nominalFrequency>([\s\S]*?)<\/cim:AsynchronousMachine.nominalFrequency>/g, obj, "nominalFrequency", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.nominalSpeed>([\s\S]*?)<\/cim:AsynchronousMachine.nominalSpeed>/g, obj, "nominalSpeed", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.polePairNumber>([\s\S]*?)<\/cim:AsynchronousMachine.polePairNumber>/g, obj, "polePairNumber", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.ratedMechanicalPower>([\s\S]*?)<\/cim:AsynchronousMachine.ratedMechanicalPower>/g, obj, "ratedMechanicalPower", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.reversible>([\s\S]*?)<\/cim:AsynchronousMachine.reversible>/g, obj, "reversible", base.to_boolean, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.rr1>([\s\S]*?)<\/cim:AsynchronousMachine.rr1>/g, obj, "rr1", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.rr2>([\s\S]*?)<\/cim:AsynchronousMachine.rr2>/g, obj, "rr2", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.rxLockedRotorRatio>([\s\S]*?)<\/cim:AsynchronousMachine.rxLockedRotorRatio>/g, obj, "rxLockedRotorRatio", base.to_float, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.tpo>([\s\S]*?)<\/cim:AsynchronousMachine.tpo>/g, obj, "tpo", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.tppo>([\s\S]*?)<\/cim:AsynchronousMachine.tppo>/g, obj, "tppo", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.xlr1>([\s\S]*?)<\/cim:AsynchronousMachine.xlr1>/g, obj, "xlr1", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.xlr2>([\s\S]*?)<\/cim:AsynchronousMachine.xlr2>/g, obj, "xlr2", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.xm>([\s\S]*?)<\/cim:AsynchronousMachine.xm>/g, obj, "xm", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.xp>([\s\S]*?)<\/cim:AsynchronousMachine.xp>/g, obj, "xp", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.xpp>([\s\S]*?)<\/cim:AsynchronousMachine.xpp>/g, obj, "xpp", base.to_string, sub, context);
                base.parse_element (/<cim:AsynchronousMachine.xs>([\s\S]*?)<\/cim:AsynchronousMachine.xs>/g, obj, "xs", base.to_string, sub, context);
                base.parse_attribute (/<cim:AsynchronousMachine.asynchronousMachineType\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "asynchronousMachineType", sub, context);
                base.parse_attribute (/<cim:AsynchronousMachine.AsynchronousMachineDynamics\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "AsynchronousMachineDynamics", sub, context);
                var bucket = context.parsed.AsynchronousMachine;
                if (null == bucket)
                   context.parsed.AsynchronousMachine = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = RotatingMachine.prototype.export.call (this, obj, false);

                base.export_element (obj, "AsynchronousMachine", "converterFedDrive", base.from_boolean, fields);
                base.export_element (obj, "AsynchronousMachine", "efficiency", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "iaIrRatio", base.from_float, fields);
                base.export_element (obj, "AsynchronousMachine", "nominalFrequency", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "nominalSpeed", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "polePairNumber", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "ratedMechanicalPower", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "reversible", base.from_boolean, fields);
                base.export_element (obj, "AsynchronousMachine", "rr1", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "rr2", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "rxLockedRotorRatio", base.from_float, fields);
                base.export_element (obj, "AsynchronousMachine", "tpo", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "tppo", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "xlr1", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "xlr2", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "xm", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "xp", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "xpp", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "xs", base.from_string, fields);
                base.export_element (obj, "AsynchronousMachine", "asynchronousMachineType", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "AsynchronousMachine", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#AsynchronousMachine_collapse" aria-expanded="true" aria-controls="AsynchronousMachine_collapse" style="margin-left: 10px;">AsynchronousMachine</a></legend>
                    <div id="AsynchronousMachine_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RotatingMachine.prototype.template.call (this) +
                    `
                    {{#converterFedDrive}}<div><b>converterFedDrive</b>: {{converterFedDrive}}</div>{{/converterFedDrive}}
                    {{#efficiency}}<div><b>efficiency</b>: {{efficiency}}</div>{{/efficiency}}
                    {{#iaIrRatio}}<div><b>iaIrRatio</b>: {{iaIrRatio}}</div>{{/iaIrRatio}}
                    {{#nominalFrequency}}<div><b>nominalFrequency</b>: {{nominalFrequency}}</div>{{/nominalFrequency}}
                    {{#nominalSpeed}}<div><b>nominalSpeed</b>: {{nominalSpeed}}</div>{{/nominalSpeed}}
                    {{#polePairNumber}}<div><b>polePairNumber</b>: {{polePairNumber}}</div>{{/polePairNumber}}
                    {{#ratedMechanicalPower}}<div><b>ratedMechanicalPower</b>: {{ratedMechanicalPower}}</div>{{/ratedMechanicalPower}}
                    {{#reversible}}<div><b>reversible</b>: {{reversible}}</div>{{/reversible}}
                    {{#rr1}}<div><b>rr1</b>: {{rr1}}</div>{{/rr1}}
                    {{#rr2}}<div><b>rr2</b>: {{rr2}}</div>{{/rr2}}
                    {{#rxLockedRotorRatio}}<div><b>rxLockedRotorRatio</b>: {{rxLockedRotorRatio}}</div>{{/rxLockedRotorRatio}}
                    {{#tpo}}<div><b>tpo</b>: {{tpo}}</div>{{/tpo}}
                    {{#tppo}}<div><b>tppo</b>: {{tppo}}</div>{{/tppo}}
                    {{#xlr1}}<div><b>xlr1</b>: {{xlr1}}</div>{{/xlr1}}
                    {{#xlr2}}<div><b>xlr2</b>: {{xlr2}}</div>{{/xlr2}}
                    {{#xm}}<div><b>xm</b>: {{xm}}</div>{{/xm}}
                    {{#xp}}<div><b>xp</b>: {{xp}}</div>{{/xp}}
                    {{#xpp}}<div><b>xpp</b>: {{xpp}}</div>{{/xpp}}
                    {{#xs}}<div><b>xs</b>: {{xs}}</div>{{/xs}}
                    {{#asynchronousMachineType}}<div><b>asynchronousMachineType</b>: {{asynchronousMachineType}}</div>{{/asynchronousMachineType}}
                    {{#AsynchronousMachineDynamics}}<div><b>AsynchronousMachineDynamics</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{AsynchronousMachineDynamics}}&quot;);})'>{{AsynchronousMachineDynamics}}</a></div>{{/AsynchronousMachineDynamics}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                obj.AsynchronousMachineKind = []; if (!obj.asynchronousMachineType) obj.AsynchronousMachineKind.push ({ id: '', selected: true}); for (var property in AsynchronousMachineKind) obj.AsynchronousMachineKind.push ({ id: property, selected: obj.asynchronousMachineType && obj.asynchronousMachineType.endsWith ('.' + property)});
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.AsynchronousMachineKind;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#AsynchronousMachine_collapse" aria-expanded="true" aria-controls="AsynchronousMachine_collapse" style="margin-left: 10px;">AsynchronousMachine</a></legend>
                    <div id="AsynchronousMachine_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + RotatingMachine.prototype.edit_template.call (this) +
                    `
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='converterFedDrive'>converterFedDrive: </label><div class='col-sm-8'><input id='converterFedDrive' class='form-check-input' type='checkbox'{{#converterFedDrive}} checked{{/converterFedDrive}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='efficiency'>efficiency: </label><div class='col-sm-8'><input id='efficiency' class='form-control' type='text'{{#efficiency}} value='{{efficiency}}'{{/efficiency}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='iaIrRatio'>iaIrRatio: </label><div class='col-sm-8'><input id='iaIrRatio' class='form-control' type='text'{{#iaIrRatio}} value='{{iaIrRatio}}'{{/iaIrRatio}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='nominalFrequency'>nominalFrequency: </label><div class='col-sm-8'><input id='nominalFrequency' class='form-control' type='text'{{#nominalFrequency}} value='{{nominalFrequency}}'{{/nominalFrequency}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='nominalSpeed'>nominalSpeed: </label><div class='col-sm-8'><input id='nominalSpeed' class='form-control' type='text'{{#nominalSpeed}} value='{{nominalSpeed}}'{{/nominalSpeed}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='polePairNumber'>polePairNumber: </label><div class='col-sm-8'><input id='polePairNumber' class='form-control' type='text'{{#polePairNumber}} value='{{polePairNumber}}'{{/polePairNumber}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='ratedMechanicalPower'>ratedMechanicalPower: </label><div class='col-sm-8'><input id='ratedMechanicalPower' class='form-control' type='text'{{#ratedMechanicalPower}} value='{{ratedMechanicalPower}}'{{/ratedMechanicalPower}}></div></div>
                    <div class='form-check row'><label class='form-check-label col-sm-4 col-form-label' for='reversible'>reversible: </label><div class='col-sm-8'><input id='reversible' class='form-check-input' type='checkbox'{{#reversible}} checked{{/reversible}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='rr1'>rr1: </label><div class='col-sm-8'><input id='rr1' class='form-control' type='text'{{#rr1}} value='{{rr1}}'{{/rr1}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='rr2'>rr2: </label><div class='col-sm-8'><input id='rr2' class='form-control' type='text'{{#rr2}} value='{{rr2}}'{{/rr2}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='rxLockedRotorRatio'>rxLockedRotorRatio: </label><div class='col-sm-8'><input id='rxLockedRotorRatio' class='form-control' type='text'{{#rxLockedRotorRatio}} value='{{rxLockedRotorRatio}}'{{/rxLockedRotorRatio}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='tpo'>tpo: </label><div class='col-sm-8'><input id='tpo' class='form-control' type='text'{{#tpo}} value='{{tpo}}'{{/tpo}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='tppo'>tppo: </label><div class='col-sm-8'><input id='tppo' class='form-control' type='text'{{#tppo}} value='{{tppo}}'{{/tppo}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xlr1'>xlr1: </label><div class='col-sm-8'><input id='xlr1' class='form-control' type='text'{{#xlr1}} value='{{xlr1}}'{{/xlr1}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xlr2'>xlr2: </label><div class='col-sm-8'><input id='xlr2' class='form-control' type='text'{{#xlr2}} value='{{xlr2}}'{{/xlr2}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xm'>xm: </label><div class='col-sm-8'><input id='xm' class='form-control' type='text'{{#xm}} value='{{xm}}'{{/xm}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xp'>xp: </label><div class='col-sm-8'><input id='xp' class='form-control' type='text'{{#xp}} value='{{xp}}'{{/xp}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xpp'>xpp: </label><div class='col-sm-8'><input id='xpp' class='form-control' type='text'{{#xpp}} value='{{xpp}}'{{/xpp}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='xs'>xs: </label><div class='col-sm-8'><input id='xs' class='form-control' type='text'{{#xs}} value='{{xs}}'{{/xs}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='asynchronousMachineType'>asynchronousMachineType: </label><div class='col-sm-8'><select id='asynchronousMachineType' class='form-control'>{{#AsynchronousMachineKind}}<option value='{{id}}'{{#selected}} selected{{/selected}}>{{id}}</option>{{/AsynchronousMachineKind}}</select></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='AsynchronousMachineDynamics'>AsynchronousMachineDynamics: </label><div class='col-sm-8'><input id='AsynchronousMachineDynamics' class='form-control' type='text'{{#AsynchronousMachineDynamics}} value='{{AsynchronousMachineDynamics}}'{{/AsynchronousMachineDynamics}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["AsynchronousMachineDynamics", "AsynchronousMachineDynamics", "0..1", "1"]
                    ]
                );
            }
        }

        /**
         * A wire or combination of wires, with consistent electrical characteristics, building a single electrical system, used to carry alternating current between points in the power system.
         *
         * For symmetrical, transposed 3ph lines, it is sufficient to use  attributes of the line segment, which describe impedances and admittances for the entire length of the segment.  Additionally impedances can be computed by using length and associated per length impedances.
         *
         */
        class ACLineSegment extends Conductor
        {
            constructor (template, cim_data)
            {
                super (template, cim_data);
                this._id = template.id;
                var bucket = cim_data.ACLineSegment;
                if (null == bucket)
                   cim_data.ACLineSegment = bucket = {};
                bucket[this._id] = template;
            }

            remove (cim_data)
            {
               super.remove (cim_data);
               delete cim_data.ACLineSegment[this._id];
            }

            parse (context, sub)
            {
                var obj;

                obj = Conductor.prototype.parse.call (this, context, sub);
                obj.cls = "ACLineSegment";
                base.parse_element (/<cim:ACLineSegment.b0ch>([\s\S]*?)<\/cim:ACLineSegment.b0ch>/g, obj, "b0ch", base.to_string, sub, context);
                base.parse_element (/<cim:ACLineSegment.bch>([\s\S]*?)<\/cim:ACLineSegment.bch>/g, obj, "bch", base.to_string, sub, context);
                base.parse_element (/<cim:ACLineSegment.g0ch>([\s\S]*?)<\/cim:ACLineSegment.g0ch>/g, obj, "g0ch", base.to_string, sub, context);
                base.parse_element (/<cim:ACLineSegment.gch>([\s\S]*?)<\/cim:ACLineSegment.gch>/g, obj, "gch", base.to_string, sub, context);
                base.parse_element (/<cim:ACLineSegment.r>([\s\S]*?)<\/cim:ACLineSegment.r>/g, obj, "r", base.to_string, sub, context);
                base.parse_element (/<cim:ACLineSegment.r0>([\s\S]*?)<\/cim:ACLineSegment.r0>/g, obj, "r0", base.to_string, sub, context);
                base.parse_element (/<cim:ACLineSegment.shortCircuitEndTemperature>([\s\S]*?)<\/cim:ACLineSegment.shortCircuitEndTemperature>/g, obj, "shortCircuitEndTemperature", base.to_string, sub, context);
                base.parse_element (/<cim:ACLineSegment.x>([\s\S]*?)<\/cim:ACLineSegment.x>/g, obj, "x", base.to_string, sub, context);
                base.parse_element (/<cim:ACLineSegment.x0>([\s\S]*?)<\/cim:ACLineSegment.x0>/g, obj, "x0", base.to_string, sub, context);
                base.parse_attribute (/<cim:ACLineSegment.LineGroundingAction\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "LineGroundingAction", sub, context);
                base.parse_attributes (/<cim:ACLineSegment.Cut\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Cut", sub, context);
                base.parse_attributes (/<cim:ACLineSegment.LineFaults\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "LineFaults", sub, context);
                base.parse_attribute (/<cim:ACLineSegment.LineJumpingAction\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "LineJumpingAction", sub, context);
                base.parse_attributes (/<cim:ACLineSegment.ACLineSegmentPhases\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "ACLineSegmentPhases", sub, context);
                base.parse_attributes (/<cim:ACLineSegment.Clamp\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "Clamp", sub, context);
                base.parse_attribute (/<cim:ACLineSegment.PerLengthImpedance\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, obj, "PerLengthImpedance", sub, context);
                var bucket = context.parsed.ACLineSegment;
                if (null == bucket)
                   context.parsed.ACLineSegment = bucket = {};
                bucket[obj.id] = obj;

                return (obj);
            }

            export (obj, full)
            {
                var fields = Conductor.prototype.export.call (this, obj, false);

                base.export_element (obj, "ACLineSegment", "b0ch", base.from_string, fields);
                base.export_element (obj, "ACLineSegment", "bch", base.from_string, fields);
                base.export_element (obj, "ACLineSegment", "g0ch", base.from_string, fields);
                base.export_element (obj, "ACLineSegment", "gch", base.from_string, fields);
                base.export_element (obj, "ACLineSegment", "r", base.from_string, fields);
                base.export_element (obj, "ACLineSegment", "r0", base.from_string, fields);
                base.export_element (obj, "ACLineSegment", "shortCircuitEndTemperature", base.from_string, fields);
                base.export_element (obj, "ACLineSegment", "x", base.from_string, fields);
                base.export_element (obj, "ACLineSegment", "x0", base.from_string, fields);
                base.export_attribute (obj, "export_attribute", "ACLineSegment", fields);
                base.export_attribute (obj, "export_attributes", "ACLineSegment", fields);
                base.export_attribute (obj, "export_attributes", "ACLineSegment", fields);
                base.export_attribute (obj, "export_attribute", "ACLineSegment", fields);
                base.export_attribute (obj, "export_attributes", "ACLineSegment", fields);
                base.export_attribute (obj, "export_attributes", "ACLineSegment", fields);
                base.export_attribute (obj, "export_attribute", "ACLineSegment", fields);
                if (full)
                    base.Element.prototype.export.call (this, obj, fields)

                return (fields);
            }


            template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ACLineSegment_collapse" aria-expanded="true" aria-controls="ACLineSegment_collapse" style="margin-left: 10px;">ACLineSegment</a></legend>
                    <div id="ACLineSegment_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Conductor.prototype.template.call (this) +
                    `
                    {{#b0ch}}<div><b>b0ch</b>: {{b0ch}}</div>{{/b0ch}}
                    {{#bch}}<div><b>bch</b>: {{bch}}</div>{{/bch}}
                    {{#g0ch}}<div><b>g0ch</b>: {{g0ch}}</div>{{/g0ch}}
                    {{#gch}}<div><b>gch</b>: {{gch}}</div>{{/gch}}
                    {{#r}}<div><b>r</b>: {{r}}</div>{{/r}}
                    {{#r0}}<div><b>r0</b>: {{r0}}</div>{{/r0}}
                    {{#shortCircuitEndTemperature}}<div><b>shortCircuitEndTemperature</b>: {{shortCircuitEndTemperature}}</div>{{/shortCircuitEndTemperature}}
                    {{#x}}<div><b>x</b>: {{x}}</div>{{/x}}
                    {{#x0}}<div><b>x0</b>: {{x0}}</div>{{/x0}}
                    {{#LineGroundingAction}}<div><b>LineGroundingAction</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{LineGroundingAction}}&quot;);})'>{{LineGroundingAction}}</a></div>{{/LineGroundingAction}}
                    {{#Cut}}<div><b>Cut</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Cut}}
                    {{#LineFaults}}<div><b>LineFaults</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/LineFaults}}
                    {{#LineJumpingAction}}<div><b>LineJumpingAction</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{LineJumpingAction}}&quot;);})'>{{LineJumpingAction}}</a></div>{{/LineJumpingAction}}
                    {{#ACLineSegmentPhases}}<div><b>ACLineSegmentPhases</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/ACLineSegmentPhases}}
                    {{#Clamp}}<div><b>Clamp</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{.}}&quot;);})'>{{.}}</a></div>{{/Clamp}}
                    {{#PerLengthImpedance}}<div><b>PerLengthImpedance</b>: <a href='#' onclick='require([&quot;cimmap&quot;], function(cimmap) {cimmap.select (&quot;{{PerLengthImpedance}}&quot;);})'>{{PerLengthImpedance}}</a></div>{{/PerLengthImpedance}}
                    </div>
                    <fieldset>

                    `
                );
            }

            condition (obj)
            {
                super.condition (obj);
                if (obj.Cut) obj.Cut_string = obj.Cut.join ();
                if (obj.LineFaults) obj.LineFaults_string = obj.LineFaults.join ();
                if (obj.ACLineSegmentPhases) obj.ACLineSegmentPhases_string = obj.ACLineSegmentPhases.join ();
                if (obj.Clamp) obj.Clamp_string = obj.Clamp.join ();
            }

            uncondition (obj)
            {
                super.uncondition (obj);
                delete obj.Cut_string;
                delete obj.LineFaults_string;
                delete obj.ACLineSegmentPhases_string;
                delete obj.Clamp_string;
            }

            edit_template ()
            {
                return (
                    `
                    <fieldset>
                    <legend class='col-form-legend'><a data-toggle="collapse" href="#ACLineSegment_collapse" aria-expanded="true" aria-controls="ACLineSegment_collapse" style="margin-left: 10px;">ACLineSegment</a></legend>
                    <div id="ACLineSegment_collapse" class="collapse in" style="margin-left: 10px;">
                    `
                    + Conductor.prototype.edit_template.call (this) +
                    `
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='b0ch'>b0ch: </label><div class='col-sm-8'><input id='b0ch' class='form-control' type='text'{{#b0ch}} value='{{b0ch}}'{{/b0ch}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='bch'>bch: </label><div class='col-sm-8'><input id='bch' class='form-control' type='text'{{#bch}} value='{{bch}}'{{/bch}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='g0ch'>g0ch: </label><div class='col-sm-8'><input id='g0ch' class='form-control' type='text'{{#g0ch}} value='{{g0ch}}'{{/g0ch}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='gch'>gch: </label><div class='col-sm-8'><input id='gch' class='form-control' type='text'{{#gch}} value='{{gch}}'{{/gch}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r'>r: </label><div class='col-sm-8'><input id='r' class='form-control' type='text'{{#r}} value='{{r}}'{{/r}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='r0'>r0: </label><div class='col-sm-8'><input id='r0' class='form-control' type='text'{{#r0}} value='{{r0}}'{{/r0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='shortCircuitEndTemperature'>shortCircuitEndTemperature: </label><div class='col-sm-8'><input id='shortCircuitEndTemperature' class='form-control' type='text'{{#shortCircuitEndTemperature}} value='{{shortCircuitEndTemperature}}'{{/shortCircuitEndTemperature}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x'>x: </label><div class='col-sm-8'><input id='x' class='form-control' type='text'{{#x}} value='{{x}}'{{/x}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='x0'>x0: </label><div class='col-sm-8'><input id='x0' class='form-control' type='text'{{#x0}} value='{{x0}}'{{/x0}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='LineGroundingAction'>LineGroundingAction: </label><div class='col-sm-8'><input id='LineGroundingAction' class='form-control' type='text'{{#LineGroundingAction}} value='{{LineGroundingAction}}'{{/LineGroundingAction}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='LineJumpingAction'>LineJumpingAction: </label><div class='col-sm-8'><input id='LineJumpingAction' class='form-control' type='text'{{#LineJumpingAction}} value='{{LineJumpingAction}}'{{/LineJumpingAction}}></div></div>
                    <div class='form-group row'><label class='col-sm-4 col-form-label' for='PerLengthImpedance'>PerLengthImpedance: </label><div class='col-sm-8'><input id='PerLengthImpedance' class='form-control' type='text'{{#PerLengthImpedance}} value='{{PerLengthImpedance}}'{{/PerLengthImpedance}}></div></div>
                    </div>
                    <fieldset>
                    `
                );
            }

            relations ()
            {
                return (
                    [
                        ["LineGroundingAction", "GroundAction", "0..1", "0..1"],
                        ["Cut", "Cut", "0..*", "1"],
                        ["LineFaults", "LineFault", "0..*", "0..1"],
                        ["LineJumpingAction", "JumperAction", "0..1", "0..*"],
                        ["ACLineSegmentPhases", "ACLineSegmentPhase", "0..*", "1"],
                        ["Clamp", "Clamp", "0..*", "1"],
                        ["PerLengthImpedance", "PerLengthImpedance", "0..1", "0..*"]
                    ]
                );
            }
        }

        return (
            {
                NonlinearShuntCompensatorPoint: NonlinearShuntCompensatorPoint,
                ShuntCompensatorPhase: ShuntCompensatorPhase,
                ACLineSegment: ACLineSegment,
                RatioTapChangerTablePoint: RatioTapChangerTablePoint,
                ProtectedSwitch: ProtectedSwitch,
                BusbarSection: BusbarSection,
                NonlinearShuntCompensator: NonlinearShuntCompensator,
                RegulatingCondEq: RegulatingCondEq,
                PerLengthImpedance: PerLengthImpedance,
                RatioTapChanger: RatioTapChanger,
                LinearShuntCompensator: LinearShuntCompensator,
                PhaseTapChanger: PhaseTapChanger,
                Fuse: Fuse,
                Switch: Switch,
                Breaker: Breaker,
                TransformerTankEnd: TransformerTankEnd,
                Conductor: Conductor,
                RegulationSchedule: RegulationSchedule,
                PhaseTapChangerTablePoint: PhaseTapChangerTablePoint,
                SwitchPhase: SwitchPhase,
                Jumper: Jumper,
                PowerTransformerEnd: PowerTransformerEnd,
                GroundDisconnector: GroundDisconnector,
                EnergyConsumerPhase: EnergyConsumerPhase,
                TransformerEnd: TransformerEnd,
                PowerTransformer: PowerTransformer,
                LinearShuntCompensatorPhase: LinearShuntCompensatorPhase,
                Cut: Cut,
                Plant: Plant,
                TransformerMeshImpedance: TransformerMeshImpedance,
                ACLineSegmentPhase: ACLineSegmentPhase,
                Junction: Junction,
                TapChangerControl: TapChangerControl,
                PhaseTapChangerLinear: PhaseTapChangerLinear,
                NonlinearShuntCompensatorPhasePoint: NonlinearShuntCompensatorPhasePoint,
                PerLengthPhaseImpedance: PerLengthPhaseImpedance,
                RotatingMachine: RotatingMachine,
                TapChanger: TapChanger,
                Clamp: Clamp,
                Ground: Ground,
                SeriesCompensator: SeriesCompensator,
                Disconnector: Disconnector,
                PhaseTapChangerAsymmetrical: PhaseTapChangerAsymmetrical,
                AsynchronousMachine: AsynchronousMachine,
                ReactiveCapabilityCurve: ReactiveCapabilityCurve,
                MutualCoupling: MutualCoupling,
                PhaseImpedanceData: PhaseImpedanceData,
                ExternalNetworkInjection: ExternalNetworkInjection,
                Recloser: Recloser,
                SwitchSchedule: SwitchSchedule,
                TransformerCoreAdmittance: TransformerCoreAdmittance,
                RatioTapChangerTable: RatioTapChangerTable,
                TransformerTank: TransformerTank,
                TapSchedule: TapSchedule,
                VoltageControlZone: VoltageControlZone,
                PhaseTapChangerTabular: PhaseTapChangerTabular,
                PerLengthLineParameter: PerLengthLineParameter,
                GroundingImpedance: GroundingImpedance,
                RegulatingControl: RegulatingControl,
                FrequencyConverter: FrequencyConverter,
                PetersenCoil: PetersenCoil,
                ShuntCompensator: ShuntCompensator,
                NonlinearShuntCompensatorPhase: NonlinearShuntCompensatorPhase,
                Line: Line,
                TapChangerTablePoint: TapChangerTablePoint,
                PhaseTapChangerSymmetrical: PhaseTapChangerSymmetrical,
                PhaseTapChangerNonLinear: PhaseTapChangerNonLinear,
                PhaseTapChangerTable: PhaseTapChangerTable,
                EarthFaultCompensator: EarthFaultCompensator,
                Connector: Connector,
                StaticVarCompensator: StaticVarCompensator,
                TransformerStarImpedance: TransformerStarImpedance,
                CompositeSwitch: CompositeSwitch,
                EnergyConsumer: EnergyConsumer,
                EnergySource: EnergySource,
                Sectionaliser: Sectionaliser,
                SynchronousMachine: SynchronousMachine,
                LoadBreakSwitch: LoadBreakSwitch,
                PerLengthSequenceImpedance: PerLengthSequenceImpedance
            }
        );
    }
);