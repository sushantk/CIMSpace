define
(
    ["model/base", "model/StandardModels"],
    /**
     * The power system stabilizer (PSS) model provides an input (Vs) to the excitation system model to improve damping of system oscillations.
     * A variety of input signals may be used depending on the particular design.
     */
    function (base, StandardModels)
    {

        /**
         * Single input power system stabilizer.
         * It is a modified version in order to allow representation of various vendors' implementations on PSS type 1A.
         */
        function parse_Pss1A (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "Pss1A";
            /**
             * Notch filter parameter (A1).
             */
            obj["a1"] = base.parse_element (/<cim:Pss1A.a1>([\s\S]*?)<\/cim:Pss1A.a1>/g, sub, context, true);
            /**
             * Notch filter parameter (A2).
             */
            obj["a2"] = base.parse_element (/<cim:Pss1A.a2>([\s\S]*?)<\/cim:Pss1A.a2>/g, sub, context, true);
            /**
             * Notch filter parameter (A3).
             */
            obj["a3"] = base.parse_element (/<cim:Pss1A.a3>([\s\S]*?)<\/cim:Pss1A.a3>/g, sub, context, true);
            /**
             * Notch filter parameter (A4).
             */
            obj["a4"] = base.parse_element (/<cim:Pss1A.a4>([\s\S]*?)<\/cim:Pss1A.a4>/g, sub, context, true);
            /**
             * Notch filter parameter (A5).
             */
            obj["a5"] = base.parse_element (/<cim:Pss1A.a5>([\s\S]*?)<\/cim:Pss1A.a5>/g, sub, context, true);
            /**
             * Notch filter parameter (A6).
             */
            obj["a6"] = base.parse_element (/<cim:Pss1A.a6>([\s\S]*?)<\/cim:Pss1A.a6>/g, sub, context, true);
            /**
             * Notch filter parameter (A7).
             */
            obj["a7"] = base.parse_element (/<cim:Pss1A.a7>([\s\S]*?)<\/cim:Pss1A.a7>/g, sub, context, true);
            /**
             * Notch filter parameter (A8).
             */
            obj["a8"] = base.parse_element (/<cim:Pss1A.a8>([\s\S]*?)<\/cim:Pss1A.a8>/g, sub, context, true);
            /**
             * Type of input signal.
             */
            obj["inputSignalType"] = base.parse_element (/<cim:Pss1A.inputSignalType>([\s\S]*?)<\/cim:Pss1A.inputSignalType>/g, sub, context, true);
            /**
             * Selector (Kd). 
            true = e<sup>-sTdelay</sup> used
             * false = e<sup>-sTdelay</sup> not used.
             */
            obj["kd"] = base.to_boolean (base.parse_element (/<cim:Pss1A.kd>([\s\S]*?)<\/cim:Pss1A.kd>/g, sub, context, true));
            /**
             * Stabilizer gain (Ks).
             */
            obj["ks"] = base.parse_element (/<cim:Pss1A.ks>([\s\S]*?)<\/cim:Pss1A.ks>/g, sub, context, true);
            /**
             * Lead/lag time constant (T1).
             */
            obj["t1"] = base.parse_element (/<cim:Pss1A.t1>([\s\S]*?)<\/cim:Pss1A.t1>/g, sub, context, true);
            /**
             * Lead/lag time constant (T2).
             */
            obj["t2"] = base.parse_element (/<cim:Pss1A.t2>([\s\S]*?)<\/cim:Pss1A.t2>/g, sub, context, true);
            /**
             * Lead/lag time constant (T3).
             */
            obj["t3"] = base.parse_element (/<cim:Pss1A.t3>([\s\S]*?)<\/cim:Pss1A.t3>/g, sub, context, true);
            /**
             * Lead/lag time constant (T4).
             */
            obj["t4"] = base.parse_element (/<cim:Pss1A.t4>([\s\S]*?)<\/cim:Pss1A.t4>/g, sub, context, true);
            /**
             * Washout time constant (T5).
             */
            obj["t5"] = base.parse_element (/<cim:Pss1A.t5>([\s\S]*?)<\/cim:Pss1A.t5>/g, sub, context, true);
            /**
             * Transducer time constant (T6).
             */
            obj["t6"] = base.parse_element (/<cim:Pss1A.t6>([\s\S]*?)<\/cim:Pss1A.t6>/g, sub, context, true);
            /**
             * Time constant (Tdelay).
             */
            obj["tdelay"] = base.parse_element (/<cim:Pss1A.tdelay>([\s\S]*?)<\/cim:Pss1A.tdelay>/g, sub, context, true);
            /**
             * Stabilizer input cutoff threshold (Vcl).
             */
            obj["vcl"] = base.parse_element (/<cim:Pss1A.vcl>([\s\S]*?)<\/cim:Pss1A.vcl>/g, sub, context, true);
            /**
             * Stabilizer input cutoff threshold (Vcu).
             */
            obj["vcu"] = base.parse_element (/<cim:Pss1A.vcu>([\s\S]*?)<\/cim:Pss1A.vcu>/g, sub, context, true);
            /**
             * Maximum stabilizer output (Vrmax).
             */
            obj["vrmax"] = base.parse_element (/<cim:Pss1A.vrmax>([\s\S]*?)<\/cim:Pss1A.vrmax>/g, sub, context, true);
            /**
             * Minimum stabilizer output (Vrmin).
             */
            obj["vrmin"] = base.parse_element (/<cim:Pss1A.vrmin>([\s\S]*?)<\/cim:Pss1A.vrmin>/g, sub, context, true);
            bucket = context.parsed.Pss1A;
            if (null == bucket)
                context.parsed.Pss1A = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * PSS Slovakian type � three inputs.
         */
        function parse_PssSK (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "PssSK";
            /**
             * Gain P (K1).
             * Typical Value = -0.3.
             */
            obj["k1"] = base.parse_element (/<cim:PssSK.k1>([\s\S]*?)<\/cim:PssSK.k1>/g, sub, context, true);
            /**
             * Gain fe (K2).
             * Typical Value = -0.15.
             */
            obj["k2"] = base.parse_element (/<cim:PssSK.k2>([\s\S]*?)<\/cim:PssSK.k2>/g, sub, context, true);
            /**
             * Gain If (K3).
             * Typical Value = 10.
             */
            obj["k3"] = base.parse_element (/<cim:PssSK.k3>([\s\S]*?)<\/cim:PssSK.k3>/g, sub, context, true);
            /**
             * Denominator time constant (T1).
             * Typical Value = 0.3.
             */
            obj["t1"] = base.parse_element (/<cim:PssSK.t1>([\s\S]*?)<\/cim:PssSK.t1>/g, sub, context, true);
            /**
             * Filter time constant (T2).
             * Typical Value = 0.35.
             */
            obj["t2"] = base.parse_element (/<cim:PssSK.t2>([\s\S]*?)<\/cim:PssSK.t2>/g, sub, context, true);
            /**
             * Denominator time constant (T3).
             * Typical Value = 0.22.
             */
            obj["t3"] = base.parse_element (/<cim:PssSK.t3>([\s\S]*?)<\/cim:PssSK.t3>/g, sub, context, true);
            /**
             * Filter time constant (T4).
             * Typical Value = 0.02.
             */
            obj["t4"] = base.parse_element (/<cim:PssSK.t4>([\s\S]*?)<\/cim:PssSK.t4>/g, sub, context, true);
            /**
             * Denominator time constant (T5).
             * Typical Value = 0.02.
             */
            obj["t5"] = base.parse_element (/<cim:PssSK.t5>([\s\S]*?)<\/cim:PssSK.t5>/g, sub, context, true);
            /**
             * Filter time constant (T6).
             * Typical Value = 0.02.
             */
            obj["t6"] = base.parse_element (/<cim:PssSK.t6>([\s\S]*?)<\/cim:PssSK.t6>/g, sub, context, true);
            /**
             * Stabilizer output max limit (Vsmax).
             * Typical Value = 0.4.
             */
            obj["vsmax"] = base.parse_element (/<cim:PssSK.vsmax>([\s\S]*?)<\/cim:PssSK.vsmax>/g, sub, context, true);
            /**
             * Stabilizer output min limit (Vsmin).
             * Typical Value = -0.4.
             */
            obj["vsmin"] = base.parse_element (/<cim:PssSK.vsmin>([\s\S]*?)<\/cim:PssSK.vsmin>/g, sub, context, true);
            bucket = context.parsed.PssSK;
            if (null == bucket)
                context.parsed.PssSK = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * The class represents IEEE Std 421.5-2005 type PSS1A power system stabilizer model.
         * PSS1A is the generalized form of a PSS with a single input. Some common stabilizer input signals are speed, frequency, and power.
         */
        function parse_PssIEEE1A (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "PssIEEE1A";
            /**
             * PSS signal conditioning frequency filter constant (A1).
             * Typical Value = 0.061.
             */
            obj["a1"] = base.parse_element (/<cim:PssIEEE1A.a1>([\s\S]*?)<\/cim:PssIEEE1A.a1>/g, sub, context, true);
            /**
             * PSS signal conditioning frequency filter constant (A2).
             * Typical Value = 0.0017.
             */
            obj["a2"] = base.parse_element (/<cim:PssIEEE1A.a2>([\s\S]*?)<\/cim:PssIEEE1A.a2>/g, sub, context, true);
            /**
             * Type of input signal.
             * Typical Value = rotorAngularFrequencyDeviation.
             */
            obj["inputSignalType"] = base.parse_element (/<cim:PssIEEE1A.inputSignalType>([\s\S]*?)<\/cim:PssIEEE1A.inputSignalType>/g, sub, context, true);
            /**
             * Stabilizer gain (Ks).
             * Typical Value = 5.
             */
            obj["ks"] = base.parse_element (/<cim:PssIEEE1A.ks>([\s\S]*?)<\/cim:PssIEEE1A.ks>/g, sub, context, true);
            /**
             * Lead/lag time constant (T1).
             * Typical Value = 0.3.
             */
            obj["t1"] = base.parse_element (/<cim:PssIEEE1A.t1>([\s\S]*?)<\/cim:PssIEEE1A.t1>/g, sub, context, true);
            /**
             * Lead/lag time constant (T2).
             * Typical Value = 0.03.
             */
            obj["t2"] = base.parse_element (/<cim:PssIEEE1A.t2>([\s\S]*?)<\/cim:PssIEEE1A.t2>/g, sub, context, true);
            /**
             * Lead/lag time constant (T3).
             * Typical Value = 0.3.
             */
            obj["t3"] = base.parse_element (/<cim:PssIEEE1A.t3>([\s\S]*?)<\/cim:PssIEEE1A.t3>/g, sub, context, true);
            /**
             * Lead/lag time constant (T4).
             * Typical Value = 0.03.
             */
            obj["t4"] = base.parse_element (/<cim:PssIEEE1A.t4>([\s\S]*?)<\/cim:PssIEEE1A.t4>/g, sub, context, true);
            /**
             * Washout time constant (T5).
             * Typical Value = 10.
             */
            obj["t5"] = base.parse_element (/<cim:PssIEEE1A.t5>([\s\S]*?)<\/cim:PssIEEE1A.t5>/g, sub, context, true);
            /**
             * Transducer time constant (T6).
             * Typical Value = 0.01.
             */
            obj["t6"] = base.parse_element (/<cim:PssIEEE1A.t6>([\s\S]*?)<\/cim:PssIEEE1A.t6>/g, sub, context, true);
            /**
             * Maximum stabilizer output (Vrmax).
             * Typical Value = 0.05.
             */
            obj["vrmax"] = base.parse_element (/<cim:PssIEEE1A.vrmax>([\s\S]*?)<\/cim:PssIEEE1A.vrmax>/g, sub, context, true);
            /**
             * Minimum stabilizer output (Vrmin).
             * Typical Value = -0.05.
             */
            obj["vrmin"] = base.parse_element (/<cim:PssIEEE1A.vrmin>([\s\S]*?)<\/cim:PssIEEE1A.vrmin>/g, sub, context, true);
            bucket = context.parsed.PssIEEE1A;
            if (null == bucket)
                context.parsed.PssIEEE1A = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * PTI Microprocessor-Based Stabilizer type 3.
         */
        function parse_PssPTIST3 (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "PssPTIST3";
            /**
             * Filter coefficient (A0).
             */
            obj["a0"] = base.parse_element (/<cim:PssPTIST3.a0>([\s\S]*?)<\/cim:PssPTIST3.a0>/g, sub, context, true);
            /**
             * Limiter (Al).
             */
            obj["a1"] = base.parse_element (/<cim:PssPTIST3.a1>([\s\S]*?)<\/cim:PssPTIST3.a1>/g, sub, context, true);
            /**
             * Filter coefficient (A2).
             */
            obj["a2"] = base.parse_element (/<cim:PssPTIST3.a2>([\s\S]*?)<\/cim:PssPTIST3.a2>/g, sub, context, true);
            /**
             * Filter coefficient (A3).
             */
            obj["a3"] = base.parse_element (/<cim:PssPTIST3.a3>([\s\S]*?)<\/cim:PssPTIST3.a3>/g, sub, context, true);
            /**
             * Filter coefficient (A4).
             */
            obj["a4"] = base.parse_element (/<cim:PssPTIST3.a4>([\s\S]*?)<\/cim:PssPTIST3.a4>/g, sub, context, true);
            /**
             * Filter coefficient (A5).
             */
            obj["a5"] = base.parse_element (/<cim:PssPTIST3.a5>([\s\S]*?)<\/cim:PssPTIST3.a5>/g, sub, context, true);
            /**
             * Limiter (Al).
             */
            obj["al"] = base.parse_element (/<cim:PssPTIST3.al>([\s\S]*?)<\/cim:PssPTIST3.al>/g, sub, context, true);
            /**
             * Threshold value above which output averaging will be bypassed (Athres).
             * Typical Value = 0.005.
             */
            obj["athres"] = base.parse_element (/<cim:PssPTIST3.athres>([\s\S]*?)<\/cim:PssPTIST3.athres>/g, sub, context, true);
            /**
             * Filter coefficient (B0).
             */
            obj["b0"] = base.parse_element (/<cim:PssPTIST3.b0>([\s\S]*?)<\/cim:PssPTIST3.b0>/g, sub, context, true);
            /**
             * Filter coefficient (B1).
             */
            obj["b1"] = base.parse_element (/<cim:PssPTIST3.b1>([\s\S]*?)<\/cim:PssPTIST3.b1>/g, sub, context, true);
            /**
             * Filter coefficient (B2).
             */
            obj["b2"] = base.parse_element (/<cim:PssPTIST3.b2>([\s\S]*?)<\/cim:PssPTIST3.b2>/g, sub, context, true);
            /**
             * Filter coefficient (B3).
             */
            obj["b3"] = base.parse_element (/<cim:PssPTIST3.b3>([\s\S]*?)<\/cim:PssPTIST3.b3>/g, sub, context, true);
            /**
             * Filter coefficient (B4).
             */
            obj["b4"] = base.parse_element (/<cim:PssPTIST3.b4>([\s\S]*?)<\/cim:PssPTIST3.b4>/g, sub, context, true);
            /**
             * Filter coefficient (B5).
             */
            obj["b5"] = base.parse_element (/<cim:PssPTIST3.b5>([\s\S]*?)<\/cim:PssPTIST3.b5>/g, sub, context, true);
            /**
             * Limiter (Dl).
             */
            obj["dl"] = base.parse_element (/<cim:PssPTIST3.dl>([\s\S]*?)<\/cim:PssPTIST3.dl>/g, sub, context, true);
            /**
             * Time step related to activation of controls (0.03 for 50 Hz) (Dtc).
             * Typical Value = 0.025.
             */
            obj["dtc"] = base.parse_element (/<cim:PssPTIST3.dtc>([\s\S]*?)<\/cim:PssPTIST3.dtc>/g, sub, context, true);
            /**
             * Time step frequency calculation (0.03 for 50 Hz) (Dtf).
             * Typical Value = 0.025.
             */
            obj["dtf"] = base.parse_element (/<cim:PssPTIST3.dtf>([\s\S]*?)<\/cim:PssPTIST3.dtf>/g, sub, context, true);
            /**
             * Time step active power calculation (0.015 for 50 Hz) (Dtp).
             * Typical Value = 0.0125.
             */
            obj["dtp"] = base.parse_element (/<cim:PssPTIST3.dtp>([\s\S]*?)<\/cim:PssPTIST3.dtp>/g, sub, context, true);
            /**
             * Digital/analog output switch (Isw).
            true = produce analog output
             * false = convert to digital output, using tap selection table.
             */
            obj["isw"] = base.to_boolean (base.parse_element (/<cim:PssPTIST3.isw>([\s\S]*?)<\/cim:PssPTIST3.isw>/g, sub, context, true));
            /**
             * Gain (K).
             * Typical Value = 9.
             */
            obj["k"] = base.parse_element (/<cim:PssPTIST3.k>([\s\S]*?)<\/cim:PssPTIST3.k>/g, sub, context, true);
            /**
             * Threshold value (Lthres).
             */
            obj["lthres"] = base.parse_element (/<cim:PssPTIST3.lthres>([\s\S]*?)<\/cim:PssPTIST3.lthres>/g, sub, context, true);
            /**
             * (M).
             * M=2*H.  Typical Value = 5.
             */
            obj["m"] = base.parse_element (/<cim:PssPTIST3.m>([\s\S]*?)<\/cim:PssPTIST3.m>/g, sub, context, true);
            /**
             * Number of control outputs to average (Nav) (1 &lt;= Nav &lt;= 16).
             * Typical Value = 4.
             */
            obj["nav"] = base.to_float (base.parse_element (/<cim:PssPTIST3.nav>([\s\S]*?)<\/cim:PssPTIST3.nav>/g, sub, context, true));
            /**
             * Number of counts at limit to active limit function (Ncl) (&gt;0).
             */
            obj["ncl"] = base.to_float (base.parse_element (/<cim:PssPTIST3.ncl>([\s\S]*?)<\/cim:PssPTIST3.ncl>/g, sub, context, true));
            /**
             * Number of counts until reset after limit function is triggered (Ncr).
             */
            obj["ncr"] = base.to_float (base.parse_element (/<cim:PssPTIST3.ncr>([\s\S]*?)<\/cim:PssPTIST3.ncr>/g, sub, context, true));
            /**
             * (Pmin).
             */
            obj["pmin"] = base.parse_element (/<cim:PssPTIST3.pmin>([\s\S]*?)<\/cim:PssPTIST3.pmin>/g, sub, context, true);
            /**
             * Time constant (T1).
             * Typical Value = 0.3.
             */
            obj["t1"] = base.parse_element (/<cim:PssPTIST3.t1>([\s\S]*?)<\/cim:PssPTIST3.t1>/g, sub, context, true);
            /**
             * Time constant (T2).
             * Typical Value = 1.
             */
            obj["t2"] = base.parse_element (/<cim:PssPTIST3.t2>([\s\S]*?)<\/cim:PssPTIST3.t2>/g, sub, context, true);
            /**
             * Time constant (T3).
             * Typical Value = 0.2.
             */
            obj["t3"] = base.parse_element (/<cim:PssPTIST3.t3>([\s\S]*?)<\/cim:PssPTIST3.t3>/g, sub, context, true);
            /**
             * Time constant (T4).
             * Typical Value = 0.05.
             */
            obj["t4"] = base.parse_element (/<cim:PssPTIST3.t4>([\s\S]*?)<\/cim:PssPTIST3.t4>/g, sub, context, true);
            /**
             * Time constant (T5).
             */
            obj["t5"] = base.parse_element (/<cim:PssPTIST3.t5>([\s\S]*?)<\/cim:PssPTIST3.t5>/g, sub, context, true);
            /**
             * Time constant (T6).
             */
            obj["t6"] = base.parse_element (/<cim:PssPTIST3.t6>([\s\S]*?)<\/cim:PssPTIST3.t6>/g, sub, context, true);
            /**
             * Time constant (Tf).
             * Typical Value = 0.2.
             */
            obj["tf"] = base.parse_element (/<cim:PssPTIST3.tf>([\s\S]*?)<\/cim:PssPTIST3.tf>/g, sub, context, true);
            /**
             * Time constant (Tp).
             * Typical Value = 0.2.
             */
            obj["tp"] = base.parse_element (/<cim:PssPTIST3.tp>([\s\S]*?)<\/cim:PssPTIST3.tp>/g, sub, context, true);
            bucket = context.parsed.PssPTIST3;
            if (null == bucket)
                context.parsed.PssPTIST3 = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * The class represents IEEE Std 421.5-2005 type PSS2B power system stabilizer model.
         * The PSS4B model represents a structure based on multiple working frequency bands. Three separate bands, respectively dedicated to the low-, intermediate- and high-frequency modes of oscillations, are used in this delta-omega (speed input) PSS.
         */
        function parse_PssIEEE4B (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "PssIEEE4B";
            /**
             * Notch filter 1 (high-frequency band): Three dB bandwidth (B<sub>wi</sub>).
             */
            obj["bwh1"] = base.to_float (base.parse_element (/<cim:PssIEEE4B.bwh1>([\s\S]*?)<\/cim:PssIEEE4B.bwh1>/g, sub, context, true));
            /**
             * Notch filter 2 (high-frequency band): Three dB bandwidth (B<sub>wi</sub>).
             */
            obj["bwh2"] = base.to_float (base.parse_element (/<cim:PssIEEE4B.bwh2>([\s\S]*?)<\/cim:PssIEEE4B.bwh2>/g, sub, context, true));
            /**
             * Notch filter 1 (low-frequency band): Three dB bandwidth (B<sub>wi</sub>).
             */
            obj["bwl1"] = base.to_float (base.parse_element (/<cim:PssIEEE4B.bwl1>([\s\S]*?)<\/cim:PssIEEE4B.bwl1>/g, sub, context, true));
            /**
             * Notch filter 2 (low-frequency band): Three dB bandwidth (B<sub>wi</sub>).
             */
            obj["bwl2"] = base.to_float (base.parse_element (/<cim:PssIEEE4B.bwl2>([\s\S]*?)<\/cim:PssIEEE4B.bwl2>/g, sub, context, true));
            /**
             * High band gain (K<sub>H</sub>).
             * Typical Value = 120.
             */
            obj["kh"] = base.parse_element (/<cim:PssIEEE4B.kh>([\s\S]*?)<\/cim:PssIEEE4B.kh>/g, sub, context, true);
            /**
             * High band differential filter gain (K<sub>H1</sub>).
             * Typical Value = 66.
             */
            obj["kh1"] = base.parse_element (/<cim:PssIEEE4B.kh1>([\s\S]*?)<\/cim:PssIEEE4B.kh1>/g, sub, context, true);
            /**
             * High band first lead-lag blocks coefficient (K<sub>H11</sub>).
             * Typical Value = 1.
             */
            obj["kh11"] = base.parse_element (/<cim:PssIEEE4B.kh11>([\s\S]*?)<\/cim:PssIEEE4B.kh11>/g, sub, context, true);
            /**
             * High band first lead-lag blocks coefficient (K<sub>H17</sub>).
             * Typical Value = 1.
             */
            obj["kh17"] = base.parse_element (/<cim:PssIEEE4B.kh17>([\s\S]*?)<\/cim:PssIEEE4B.kh17>/g, sub, context, true);
            /**
             * High band differential filter gain (K<sub>H2</sub>).
             * Typical Value = 66.
             */
            obj["kh2"] = base.parse_element (/<cim:PssIEEE4B.kh2>([\s\S]*?)<\/cim:PssIEEE4B.kh2>/g, sub, context, true);
            /**
             * Intermediate band gain (K<sub>I</sub>).
             * Typical Value = 30.
             */
            obj["ki"] = base.parse_element (/<cim:PssIEEE4B.ki>([\s\S]*?)<\/cim:PssIEEE4B.ki>/g, sub, context, true);
            /**
             * Intermediate band differential filter gain (K<sub>I1</sub>).
             * Typical Value = 66.
             */
            obj["ki1"] = base.parse_element (/<cim:PssIEEE4B.ki1>([\s\S]*?)<\/cim:PssIEEE4B.ki1>/g, sub, context, true);
            /**
             * Intermediate band first lead-lag blocks coefficient (K<sub>I11</sub>).
             * Typical Value = 1.
             */
            obj["ki11"] = base.parse_element (/<cim:PssIEEE4B.ki11>([\s\S]*?)<\/cim:PssIEEE4B.ki11>/g, sub, context, true);
            /**
             * Intermediate band first lead-lag blocks coefficient (K<sub>I17</sub>).
             * Typical Value = 1.
             */
            obj["ki17"] = base.parse_element (/<cim:PssIEEE4B.ki17>([\s\S]*?)<\/cim:PssIEEE4B.ki17>/g, sub, context, true);
            /**
             * Intermediate band differential filter gain (K<sub>I2</sub>).
             * Typical Value = 66.
             */
            obj["ki2"] = base.parse_element (/<cim:PssIEEE4B.ki2>([\s\S]*?)<\/cim:PssIEEE4B.ki2>/g, sub, context, true);
            /**
             * Low band gain (K<sub>L</sub>).
             * Typical Value = 7.5.
             */
            obj["kl"] = base.parse_element (/<cim:PssIEEE4B.kl>([\s\S]*?)<\/cim:PssIEEE4B.kl>/g, sub, context, true);
            /**
             * Low band differential filter gain (K<sub>L1</sub>).
             * Typical Value = 66.
             */
            obj["kl1"] = base.parse_element (/<cim:PssIEEE4B.kl1>([\s\S]*?)<\/cim:PssIEEE4B.kl1>/g, sub, context, true);
            /**
             * Low band first lead-lag blocks coefficient (K<sub>L11</sub>).
             * Typical Value = 1.
             */
            obj["kl11"] = base.parse_element (/<cim:PssIEEE4B.kl11>([\s\S]*?)<\/cim:PssIEEE4B.kl11>/g, sub, context, true);
            /**
             * Low band first lead-lag blocks coefficient (K<sub>L17</sub>).
             * Typical Value = 1.
             */
            obj["kl17"] = base.parse_element (/<cim:PssIEEE4B.kl17>([\s\S]*?)<\/cim:PssIEEE4B.kl17>/g, sub, context, true);
            /**
             * Low band differential filter gain (K<sub>L2</sub>).
             * Typical Value = 66.
             */
            obj["kl2"] = base.parse_element (/<cim:PssIEEE4B.kl2>([\s\S]*?)<\/cim:PssIEEE4B.kl2>/g, sub, context, true);
            /**
             * Notch filter 1 (high-frequency band): filter frequency (omega<sub>ni</sub>).
             */
            obj["omeganh1"] = base.to_float (base.parse_element (/<cim:PssIEEE4B.omeganh1>([\s\S]*?)<\/cim:PssIEEE4B.omeganh1>/g, sub, context, true));
            /**
             * Notch filter 2 (high-frequency band): filter frequency (omega<sub>ni</sub>).
             */
            obj["omeganh2"] = base.to_float (base.parse_element (/<cim:PssIEEE4B.omeganh2>([\s\S]*?)<\/cim:PssIEEE4B.omeganh2>/g, sub, context, true));
            /**
             * Notch filter 1 (low-frequency band): filter frequency (omega<sub>ni</sub>).
             */
            obj["omeganl1"] = base.to_float (base.parse_element (/<cim:PssIEEE4B.omeganl1>([\s\S]*?)<\/cim:PssIEEE4B.omeganl1>/g, sub, context, true));
            /**
             * Notch filter 2 (low-frequency band): filter frequency (omega<sub>ni</sub>).
             */
            obj["omeganl2"] = base.to_float (base.parse_element (/<cim:PssIEEE4B.omeganl2>([\s\S]*?)<\/cim:PssIEEE4B.omeganl2>/g, sub, context, true));
            /**
             * High band time constant (T<sub>H1</sub>).
             * Typical Value = 0.01513.
             */
            obj["th1"] = base.parse_element (/<cim:PssIEEE4B.th1>([\s\S]*?)<\/cim:PssIEEE4B.th1>/g, sub, context, true);
            /**
             * High band time constant (T<sub>H10</sub>).
             * Typical Value = 0.
             */
            obj["th10"] = base.parse_element (/<cim:PssIEEE4B.th10>([\s\S]*?)<\/cim:PssIEEE4B.th10>/g, sub, context, true);
            /**
             * High band time constant (T<sub>H11</sub>).
             * Typical Value = 0.
             */
            obj["th11"] = base.parse_element (/<cim:PssIEEE4B.th11>([\s\S]*?)<\/cim:PssIEEE4B.th11>/g, sub, context, true);
            /**
             * High band time constant (T<sub>H12</sub>).
             * Typical Value = 0.
             */
            obj["th12"] = base.parse_element (/<cim:PssIEEE4B.th12>([\s\S]*?)<\/cim:PssIEEE4B.th12>/g, sub, context, true);
            /**
             * High band time constant (T<sub>H2</sub>).
             * Typical Value = 0.01816.
             */
            obj["th2"] = base.parse_element (/<cim:PssIEEE4B.th2>([\s\S]*?)<\/cim:PssIEEE4B.th2>/g, sub, context, true);
            /**
             * High band time constant (T<sub>H3</sub>).
             * Typical Value = 0.
             */
            obj["th3"] = base.parse_element (/<cim:PssIEEE4B.th3>([\s\S]*?)<\/cim:PssIEEE4B.th3>/g, sub, context, true);
            /**
             * High band time constant (T<sub>H4</sub>).
             * Typical Value = 0.
             */
            obj["th4"] = base.parse_element (/<cim:PssIEEE4B.th4>([\s\S]*?)<\/cim:PssIEEE4B.th4>/g, sub, context, true);
            /**
             * High band time constant (T<sub>H5</sub>).
             * Typical Value = 0.
             */
            obj["th5"] = base.parse_element (/<cim:PssIEEE4B.th5>([\s\S]*?)<\/cim:PssIEEE4B.th5>/g, sub, context, true);
            /**
             * High band time constant (T<sub>H6</sub>).
             * Typical Value = 0.
             */
            obj["th6"] = base.parse_element (/<cim:PssIEEE4B.th6>([\s\S]*?)<\/cim:PssIEEE4B.th6>/g, sub, context, true);
            /**
             * High band time constant (T<sub>H7</sub>).
             * Typical Value = 0.01816.
             */
            obj["th7"] = base.parse_element (/<cim:PssIEEE4B.th7>([\s\S]*?)<\/cim:PssIEEE4B.th7>/g, sub, context, true);
            /**
             * High band time constant (T<sub>H8</sub>).
             * Typical Value = 0.02179.
             */
            obj["th8"] = base.parse_element (/<cim:PssIEEE4B.th8>([\s\S]*?)<\/cim:PssIEEE4B.th8>/g, sub, context, true);
            /**
             * High band time constant (T<sub>H9</sub>).
             * Typical Value = 0.
             */
            obj["th9"] = base.parse_element (/<cim:PssIEEE4B.th9>([\s\S]*?)<\/cim:PssIEEE4B.th9>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I1</sub>).
             * Typical Value = 0.173.
             */
            obj["ti1"] = base.parse_element (/<cim:PssIEEE4B.ti1>([\s\S]*?)<\/cim:PssIEEE4B.ti1>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I11</sub>).
             * Typical Value = 0.
             */
            obj["ti10"] = base.parse_element (/<cim:PssIEEE4B.ti10>([\s\S]*?)<\/cim:PssIEEE4B.ti10>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I11</sub>).
             * Typical Value = 0.
             */
            obj["ti11"] = base.parse_element (/<cim:PssIEEE4B.ti11>([\s\S]*?)<\/cim:PssIEEE4B.ti11>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I2</sub>).
             * Typical Value = 0.
             */
            obj["ti12"] = base.parse_element (/<cim:PssIEEE4B.ti12>([\s\S]*?)<\/cim:PssIEEE4B.ti12>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I2</sub>).
             * Typical Value = 0.2075.
             */
            obj["ti2"] = base.parse_element (/<cim:PssIEEE4B.ti2>([\s\S]*?)<\/cim:PssIEEE4B.ti2>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I3</sub>).
             * Typical Value = 0.
             */
            obj["ti3"] = base.parse_element (/<cim:PssIEEE4B.ti3>([\s\S]*?)<\/cim:PssIEEE4B.ti3>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I4</sub>).
             * Typical Value = 0.
             */
            obj["ti4"] = base.parse_element (/<cim:PssIEEE4B.ti4>([\s\S]*?)<\/cim:PssIEEE4B.ti4>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I5</sub>).
             * Typical Value = 0.
             */
            obj["ti5"] = base.parse_element (/<cim:PssIEEE4B.ti5>([\s\S]*?)<\/cim:PssIEEE4B.ti5>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I6</sub>).
             * Typical Value = 0.
             */
            obj["ti6"] = base.parse_element (/<cim:PssIEEE4B.ti6>([\s\S]*?)<\/cim:PssIEEE4B.ti6>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I7</sub>).
             * Typical Value = 0.2075.
             */
            obj["ti7"] = base.parse_element (/<cim:PssIEEE4B.ti7>([\s\S]*?)<\/cim:PssIEEE4B.ti7>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I8</sub>).
             * Typical Value = 0.2491.
             */
            obj["ti8"] = base.parse_element (/<cim:PssIEEE4B.ti8>([\s\S]*?)<\/cim:PssIEEE4B.ti8>/g, sub, context, true);
            /**
             * Intermediate band time constant (T<sub>I9</sub>).
             * Typical Value = 0.
             */
            obj["ti9"] = base.parse_element (/<cim:PssIEEE4B.ti9>([\s\S]*?)<\/cim:PssIEEE4B.ti9>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L1</sub>).
             * Typical Value = 1.73.
             */
            obj["tl1"] = base.parse_element (/<cim:PssIEEE4B.tl1>([\s\S]*?)<\/cim:PssIEEE4B.tl1>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L10</sub>).
             * Typical Value = 0.
             */
            obj["tl10"] = base.parse_element (/<cim:PssIEEE4B.tl10>([\s\S]*?)<\/cim:PssIEEE4B.tl10>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L11</sub>).
             * Typical Value = 0.
             */
            obj["tl11"] = base.parse_element (/<cim:PssIEEE4B.tl11>([\s\S]*?)<\/cim:PssIEEE4B.tl11>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L12</sub>).
             * Typical Value = 0.
             */
            obj["tl12"] = base.parse_element (/<cim:PssIEEE4B.tl12>([\s\S]*?)<\/cim:PssIEEE4B.tl12>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L2</sub>).
             * Typical Value = 2.075.
             */
            obj["tl2"] = base.parse_element (/<cim:PssIEEE4B.tl2>([\s\S]*?)<\/cim:PssIEEE4B.tl2>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L3</sub>).
             * Typical Value = 0.
             */
            obj["tl3"] = base.parse_element (/<cim:PssIEEE4B.tl3>([\s\S]*?)<\/cim:PssIEEE4B.tl3>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L4</sub>).
             * Typical Value = 0.
             */
            obj["tl4"] = base.parse_element (/<cim:PssIEEE4B.tl4>([\s\S]*?)<\/cim:PssIEEE4B.tl4>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L5</sub>).
             * Typical Value = 0.
             */
            obj["tl5"] = base.parse_element (/<cim:PssIEEE4B.tl5>([\s\S]*?)<\/cim:PssIEEE4B.tl5>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L6</sub>).
             * Typical Value = 0.
             */
            obj["tl6"] = base.parse_element (/<cim:PssIEEE4B.tl6>([\s\S]*?)<\/cim:PssIEEE4B.tl6>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L7</sub>).
             * Typical Value = 2.075.
             */
            obj["tl7"] = base.parse_element (/<cim:PssIEEE4B.tl7>([\s\S]*?)<\/cim:PssIEEE4B.tl7>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L8</sub>).
             * Typical Value = 2.491.
             */
            obj["tl8"] = base.parse_element (/<cim:PssIEEE4B.tl8>([\s\S]*?)<\/cim:PssIEEE4B.tl8>/g, sub, context, true);
            /**
             * Low band time constant (T<sub>L9</sub>).
             * Typical Value = 0.
             */
            obj["tl9"] = base.parse_element (/<cim:PssIEEE4B.tl9>([\s\S]*?)<\/cim:PssIEEE4B.tl9>/g, sub, context, true);
            /**
             * High band output maximum limit (V<sub>Hmax</sub>).
             * Typical Value = 0.6.
             */
            obj["vhmax"] = base.parse_element (/<cim:PssIEEE4B.vhmax>([\s\S]*?)<\/cim:PssIEEE4B.vhmax>/g, sub, context, true);
            /**
             * High band output minimum limit (V<sub>Hmin</sub>).
             * Typical Value = -0.6.
             */
            obj["vhmin"] = base.parse_element (/<cim:PssIEEE4B.vhmin>([\s\S]*?)<\/cim:PssIEEE4B.vhmin>/g, sub, context, true);
            /**
             * Intermediate band output maximum limit (V<sub>Imax</sub>).
             * Typical Value = 0.6.
             */
            obj["vimax"] = base.parse_element (/<cim:PssIEEE4B.vimax>([\s\S]*?)<\/cim:PssIEEE4B.vimax>/g, sub, context, true);
            /**
             * Intermediate band output minimum limit (V<sub>Imin</sub>).
             * Typical Value = -0.6.
             */
            obj["vimin"] = base.parse_element (/<cim:PssIEEE4B.vimin>([\s\S]*?)<\/cim:PssIEEE4B.vimin>/g, sub, context, true);
            /**
             * Low band output maximum limit (V<sub>Lmax</sub>).
             * Typical Value = 0.075.
             */
            obj["vlmax"] = base.parse_element (/<cim:PssIEEE4B.vlmax>([\s\S]*?)<\/cim:PssIEEE4B.vlmax>/g, sub, context, true);
            /**
             * Low band output minimum limit (V<sub>Lmin</sub>).
             * Typical Value = -0.075.
             */
            obj["vlmin"] = base.parse_element (/<cim:PssIEEE4B.vlmin>([\s\S]*?)<\/cim:PssIEEE4B.vlmin>/g, sub, context, true);
            /**
             * PSS output maximum limit (V<sub>STmax</sub>).
             * Typical Value = 0.15.
             */
            obj["vstmax"] = base.parse_element (/<cim:PssIEEE4B.vstmax>([\s\S]*?)<\/cim:PssIEEE4B.vstmax>/g, sub, context, true);
            /**
             * PSS output minimum limit (V<sub>STmin</sub>).
             * Typical Value = -0.15.
             */
            obj["vstmin"] = base.parse_element (/<cim:PssIEEE4B.vstmin>([\s\S]*?)<\/cim:PssIEEE4B.vstmin>/g, sub, context, true);
            bucket = context.parsed.PssIEEE4B;
            if (null == bucket)
                context.parsed.PssIEEE4B = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * Italian PSS - Detailed PSS.
         */
        function parse_Pss5 (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "Pss5";
            /**
             * Selector for Second washout enabling (C<sub>TW2</sub>).
            true = second washout filter is bypassed
            false = second washout filter in use.
             * Typical Value = true.
             */
            obj["ctw2"] = base.to_boolean (base.parse_element (/<cim:Pss5.ctw2>([\s\S]*?)<\/cim:Pss5.ctw2>/g, sub, context, true));
            /**
             * Stabilizer output dead band (DeadBand).
             * Typical Value = 0.
             */
            obj["deadband"] = base.parse_element (/<cim:Pss5.deadband>([\s\S]*?)<\/cim:Pss5.deadband>/g, sub, context, true);
            /**
             * Selector for Frequency/shaft speed input (IsFreq).
            true = speed
            false = frequency.
             * Typical Value = true.
             */
            obj["isfreq"] = base.to_boolean (base.parse_element (/<cim:Pss5.isfreq>([\s\S]*?)<\/cim:Pss5.isfreq>/g, sub, context, true));
            /**
             * Frequency/shaft speed input gain (K<sub>F</sub>).
             * Typical Value = 5.
             */
            obj["kf"] = base.to_float (base.parse_element (/<cim:Pss5.kf>([\s\S]*?)<\/cim:Pss5.kf>/g, sub, context, true));
            /**
             * Electric power input gain (K<sub>PE</sub>).
             * Typical Value = 0.3.
             */
            obj["kpe"] = base.to_float (base.parse_element (/<cim:Pss5.kpe>([\s\S]*?)<\/cim:Pss5.kpe>/g, sub, context, true));
            /**
             * PSS gain (K<sub>PSS</sub>).
             * Typical Value = 1.
             */
            obj["kpss"] = base.to_float (base.parse_element (/<cim:Pss5.kpss>([\s\S]*?)<\/cim:Pss5.kpss>/g, sub, context, true));
            /**
             * Minimum power PSS enabling (P<sub>mn</sub>).
             * Typical Value = 0.25.
             */
            obj["pmm"] = base.parse_element (/<cim:Pss5.pmm>([\s\S]*?)<\/cim:Pss5.pmm>/g, sub, context, true);
            /**
             * Lead/lag time constant (T<sub>L1</sub>).
             * Typical Value = 0.
             */
            obj["tl1"] = base.parse_element (/<cim:Pss5.tl1>([\s\S]*?)<\/cim:Pss5.tl1>/g, sub, context, true);
            /**
             * Lead/lag time constant (T<sub>L2</sub>).
             * Typical Value = 0.
             */
            obj["tl2"] = base.parse_element (/<cim:Pss5.tl2>([\s\S]*?)<\/cim:Pss5.tl2>/g, sub, context, true);
            /**
             * Lead/lag time constant (T<sub>L3</sub>).
             * Typical Value = 0.
             */
            obj["tl3"] = base.parse_element (/<cim:Pss5.tl3>([\s\S]*?)<\/cim:Pss5.tl3>/g, sub, context, true);
            /**
             * Lead/lag time constant (T<sub>L4</sub>).
             * Typical Value = 0.
             */
            obj["tl4"] = base.parse_element (/<cim:Pss5.tl4>([\s\S]*?)<\/cim:Pss5.tl4>/g, sub, context, true);
            /**
             * Electric power filter time constant (T<sub>PE</sub>).
             * Typical Value = 0.05.
             */
            obj["tpe"] = base.parse_element (/<cim:Pss5.tpe>([\s\S]*?)<\/cim:Pss5.tpe>/g, sub, context, true);
            /**
             * First WashOut (T<sub>w1</sub>).
             * Typical Value = 3.5.
             */
            obj["tw1"] = base.parse_element (/<cim:Pss5.tw1>([\s\S]*?)<\/cim:Pss5.tw1>/g, sub, context, true);
            /**
             * Second WashOut (T<sub>w2</sub>).
             * Typical Value = 0.
             */
            obj["tw2"] = base.parse_element (/<cim:Pss5.tw2>([\s\S]*?)<\/cim:Pss5.tw2>/g, sub, context, true);
            /**
             * <font color="#0f0f0f">Signal selector (V<sub>adAtt</sub>).</font>
            <font color="#0f0f0f">true = closed (Generator Power is greater than Pmin)</font>
            <font color="#0f0f0f">false = open (Pe is smaller than Pmin).</font>
             * <font color="#0f0f0f">Typical Value = true.</font>
             */
            obj["vadat"] = base.to_boolean (base.parse_element (/<cim:Pss5.vadat>([\s\S]*?)<\/cim:Pss5.vadat>/g, sub, context, true));
            /**
             * Stabilizer output max limit (V<sub>SMN</sub>).
             * Typical Value = -0.1.
             */
            obj["vsmn"] = base.parse_element (/<cim:Pss5.vsmn>([\s\S]*?)<\/cim:Pss5.vsmn>/g, sub, context, true);
            /**
             * Stabilizer output min limit (V<sub>SMX</sub>).
             * Typical Value = 0.1.
             */
            obj["vsmx"] = base.parse_element (/<cim:Pss5.vsmx>([\s\S]*?)<\/cim:Pss5.vsmx>/g, sub, context, true);
            bucket = context.parsed.Pss5;
            if (null == bucket)
                context.parsed.Pss5 = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * Power sensitive stabilizer model.
         */
        function parse_PssSB4 (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "PssSB4";
            /**
             * Gain (Kx).
             */
            obj["kx"] = base.parse_element (/<cim:PssSB4.kx>([\s\S]*?)<\/cim:PssSB4.kx>/g, sub, context, true);
            /**
             * Time constant (Ta).
             */
            obj["ta"] = base.parse_element (/<cim:PssSB4.ta>([\s\S]*?)<\/cim:PssSB4.ta>/g, sub, context, true);
            /**
             * Time constant (Tb).
             */
            obj["tb"] = base.parse_element (/<cim:PssSB4.tb>([\s\S]*?)<\/cim:PssSB4.tb>/g, sub, context, true);
            /**
             * Time constant (Tc).
             */
            obj["tc"] = base.parse_element (/<cim:PssSB4.tc>([\s\S]*?)<\/cim:PssSB4.tc>/g, sub, context, true);
            /**
             * Time constant (Td).
             */
            obj["td"] = base.parse_element (/<cim:PssSB4.td>([\s\S]*?)<\/cim:PssSB4.td>/g, sub, context, true);
            /**
             * Time constant (Te).
             */
            obj["te"] = base.parse_element (/<cim:PssSB4.te>([\s\S]*?)<\/cim:PssSB4.te>/g, sub, context, true);
            /**
             * Time constant (Tt).
             */
            obj["tt"] = base.parse_element (/<cim:PssSB4.tt>([\s\S]*?)<\/cim:PssSB4.tt>/g, sub, context, true);
            /**
             * Reset time constant (Tx1).
             */
            obj["tx1"] = base.parse_element (/<cim:PssSB4.tx1>([\s\S]*?)<\/cim:PssSB4.tx1>/g, sub, context, true);
            /**
             * Time constant (Tx2).
             */
            obj["tx2"] = base.parse_element (/<cim:PssSB4.tx2>([\s\S]*?)<\/cim:PssSB4.tx2>/g, sub, context, true);
            /**
             * Limiter (Vsmax).
             */
            obj["vsmax"] = base.parse_element (/<cim:PssSB4.vsmax>([\s\S]*?)<\/cim:PssSB4.vsmax>/g, sub, context, true);
            /**
             * Limiter (Vsmin).
             */
            obj["vsmin"] = base.parse_element (/<cim:PssSB4.vsmin>([\s\S]*?)<\/cim:PssSB4.vsmin>/g, sub, context, true);
            bucket = context.parsed.PssSB4;
            if (null == bucket)
                context.parsed.PssSB4 = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * The class represents IEEE Std 421.5-2005 type PSS3B power system stabilizer model.
         * The PSS model PSS3B has dual inputs of electrical power and rotor angular frequency deviation. The signals are used to derive an equivalent mechanical power signal.
         */
        function parse_PssIEEE3B (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "PssIEEE3B";
            /**
             * Notch filter parameter (A1).
             * Typical Value = 0.359.
             */
            obj["a1"] = base.parse_element (/<cim:PssIEEE3B.a1>([\s\S]*?)<\/cim:PssIEEE3B.a1>/g, sub, context, true);
            /**
             * Notch filter parameter (A2).
             * Typical Value = 0.586.
             */
            obj["a2"] = base.parse_element (/<cim:PssIEEE3B.a2>([\s\S]*?)<\/cim:PssIEEE3B.a2>/g, sub, context, true);
            /**
             * Notch filter parameter (A3).
             * Typical Value = 0.429.
             */
            obj["a3"] = base.parse_element (/<cim:PssIEEE3B.a3>([\s\S]*?)<\/cim:PssIEEE3B.a3>/g, sub, context, true);
            /**
             * Notch filter parameter (A4).
             * Typical Value = 0.564.
             */
            obj["a4"] = base.parse_element (/<cim:PssIEEE3B.a4>([\s\S]*?)<\/cim:PssIEEE3B.a4>/g, sub, context, true);
            /**
             * Notch filter parameter (A5).
             * Typical Value = 0.001.
             */
            obj["a5"] = base.parse_element (/<cim:PssIEEE3B.a5>([\s\S]*?)<\/cim:PssIEEE3B.a5>/g, sub, context, true);
            /**
             * Notch filter parameter (A6).
             * Typical Value = 0.
             */
            obj["a6"] = base.parse_element (/<cim:PssIEEE3B.a6>([\s\S]*?)<\/cim:PssIEEE3B.a6>/g, sub, context, true);
            /**
             * Notch filter parameter (A7).
             * Typical Value = 0.031.
             */
            obj["a7"] = base.parse_element (/<cim:PssIEEE3B.a7>([\s\S]*?)<\/cim:PssIEEE3B.a7>/g, sub, context, true);
            /**
             * Notch filter parameter (A8).
             * Typical Value = 0.
             */
            obj["a8"] = base.parse_element (/<cim:PssIEEE3B.a8>([\s\S]*?)<\/cim:PssIEEE3B.a8>/g, sub, context, true);
            /**
             * Type of input signal #1.
             * Typical Value = generatorElectricalPower.
             */
            obj["inputSignal1Type"] = base.parse_element (/<cim:PssIEEE3B.inputSignal1Type>([\s\S]*?)<\/cim:PssIEEE3B.inputSignal1Type>/g, sub, context, true);
            /**
             * Type of input signal #2.
             * Typical Value = rotorSpeed.
             */
            obj["inputSignal2Type"] = base.parse_element (/<cim:PssIEEE3B.inputSignal2Type>([\s\S]*?)<\/cim:PssIEEE3B.inputSignal2Type>/g, sub, context, true);
            /**
             * Gain on signal # 1 (Ks1).
             * Typical Value = -0.602.
             */
            obj["ks1"] = base.parse_element (/<cim:PssIEEE3B.ks1>([\s\S]*?)<\/cim:PssIEEE3B.ks1>/g, sub, context, true);
            /**
             * Gain on signal # 2 (Ks2).
             * Typical Value = 30.12.
             */
            obj["ks2"] = base.parse_element (/<cim:PssIEEE3B.ks2>([\s\S]*?)<\/cim:PssIEEE3B.ks2>/g, sub, context, true);
            /**
             * Transducer time constant (T1).
             * Typical Value = 0.012.
             */
            obj["t1"] = base.parse_element (/<cim:PssIEEE3B.t1>([\s\S]*?)<\/cim:PssIEEE3B.t1>/g, sub, context, true);
            /**
             * Transducer time constant (T2).
             * Typical Value = 0.012.
             */
            obj["t2"] = base.parse_element (/<cim:PssIEEE3B.t2>([\s\S]*?)<\/cim:PssIEEE3B.t2>/g, sub, context, true);
            /**
             * Washout time constant (Tw1).
             * Typical Value = 0.3.
             */
            obj["tw1"] = base.parse_element (/<cim:PssIEEE3B.tw1>([\s\S]*?)<\/cim:PssIEEE3B.tw1>/g, sub, context, true);
            /**
             * Washout time constant (Tw2).
             * Typical Value = 0.3.
             */
            obj["tw2"] = base.parse_element (/<cim:PssIEEE3B.tw2>([\s\S]*?)<\/cim:PssIEEE3B.tw2>/g, sub, context, true);
            /**
             * Washout time constant (Tw3).
             * Typical Value = 0.6.
             */
            obj["tw3"] = base.parse_element (/<cim:PssIEEE3B.tw3>([\s\S]*?)<\/cim:PssIEEE3B.tw3>/g, sub, context, true);
            /**
             * Stabilizer output max limit (Vstmax).
             * Typical Value = 0.1.
             */
            obj["vstmax"] = base.parse_element (/<cim:PssIEEE3B.vstmax>([\s\S]*?)<\/cim:PssIEEE3B.vstmax>/g, sub, context, true);
            /**
             * Stabilizer output min limit (Vstmin).
             * Typical Value = -0.1.
             */
            obj["vstmin"] = base.parse_element (/<cim:PssIEEE3B.vstmin>([\s\S]*?)<\/cim:PssIEEE3B.vstmin>/g, sub, context, true);
            bucket = context.parsed.PssIEEE3B;
            if (null == bucket)
                context.parsed.PssIEEE3B = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * Power system stabilizer typically associated with ExcELIN2 (though PssIEEE2B or Pss2B can also be used).
         */
        function parse_PssELIN2 (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "PssELIN2";
            /**
             * Coefficient (a_PSS).
             * Typical Value = 0.1.
             */
            obj["apss"] = base.parse_element (/<cim:PssELIN2.apss>([\s\S]*?)<\/cim:PssELIN2.apss>/g, sub, context, true);
            /**
             * Gain (Ks1).
             * Typical Value = 1.
             */
            obj["ks1"] = base.parse_element (/<cim:PssELIN2.ks1>([\s\S]*?)<\/cim:PssELIN2.ks1>/g, sub, context, true);
            /**
             * Gain (Ks2).
             * Typical Value = 0.1.
             */
            obj["ks2"] = base.parse_element (/<cim:PssELIN2.ks2>([\s\S]*?)<\/cim:PssELIN2.ks2>/g, sub, context, true);
            /**
             * Coefficient (p_PSS) (&gt;=0 and &lt;=4).
             * Typical Value = 0.1.
             */
            obj["ppss"] = base.parse_element (/<cim:PssELIN2.ppss>([\s\S]*?)<\/cim:PssELIN2.ppss>/g, sub, context, true);
            /**
             * PSS limiter (psslim).
             * Typical Value = 0.1.
             */
            obj["psslim"] = base.parse_element (/<cim:PssELIN2.psslim>([\s\S]*?)<\/cim:PssELIN2.psslim>/g, sub, context, true);
            /**
             * Time constant (Ts1).
             * Typical Value = 0.
             */
            obj["ts1"] = base.parse_element (/<cim:PssELIN2.ts1>([\s\S]*?)<\/cim:PssELIN2.ts1>/g, sub, context, true);
            /**
             * Time constant (Ts2).
             * Typical Value = 1.
             */
            obj["ts2"] = base.parse_element (/<cim:PssELIN2.ts2>([\s\S]*?)<\/cim:PssELIN2.ts2>/g, sub, context, true);
            /**
             * Time constant (Ts3).
             * Typical Value = 1.
             */
            obj["ts3"] = base.parse_element (/<cim:PssELIN2.ts3>([\s\S]*?)<\/cim:PssELIN2.ts3>/g, sub, context, true);
            /**
             * Time constant (Ts4).
             * Typical Value = 0.1.
             */
            obj["ts4"] = base.parse_element (/<cim:PssELIN2.ts4>([\s\S]*?)<\/cim:PssELIN2.ts4>/g, sub, context, true);
            /**
             * Time constant (Ts5).
             * Typical Value = 0.
             */
            obj["ts5"] = base.parse_element (/<cim:PssELIN2.ts5>([\s\S]*?)<\/cim:PssELIN2.ts5>/g, sub, context, true);
            /**
             * Time constant (Ts6).
             * Typical Value = 1.
             */
            obj["ts6"] = base.parse_element (/<cim:PssELIN2.ts6>([\s\S]*?)<\/cim:PssELIN2.ts6>/g, sub, context, true);
            bucket = context.parsed.PssELIN2;
            if (null == bucket)
                context.parsed.PssELIN2 = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * Modified IEEE PSS2B Model.
         * Extra lead/lag (or rate) block added at end (up to 4 lead/lags total).
         */
        function parse_Pss2B (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "Pss2B";
            /**
             * Numerator constant (a).
             * Typical Value = 1.
             */
            obj["a"] = base.to_float (base.parse_element (/<cim:Pss2B.a>([\s\S]*?)<\/cim:Pss2B.a>/g, sub, context, true));
            /**
             * Type of input signal #1.
             * Typical Value = rotorSpeed.
             */
            obj["inputSignal1Type"] = base.parse_element (/<cim:Pss2B.inputSignal1Type>([\s\S]*?)<\/cim:Pss2B.inputSignal1Type>/g, sub, context, true);
            /**
             * Type of input signal #2.
             * Typical Value = generatorElectricalPower.
             */
            obj["inputSignal2Type"] = base.parse_element (/<cim:Pss2B.inputSignal2Type>([\s\S]*?)<\/cim:Pss2B.inputSignal2Type>/g, sub, context, true);
            /**
             * Stabilizer gain (Ks1).
             * Typical Value = 12.
             */
            obj["ks1"] = base.parse_element (/<cim:Pss2B.ks1>([\s\S]*?)<\/cim:Pss2B.ks1>/g, sub, context, true);
            /**
             * Gain on signal #2 (Ks2).
             * Typical Value = 0.2.
             */
            obj["ks2"] = base.parse_element (/<cim:Pss2B.ks2>([\s\S]*?)<\/cim:Pss2B.ks2>/g, sub, context, true);
            /**
             * Gain on signal #2 input before ramp-tracking filter (Ks3).
             * Typical Value = 1.
             */
            obj["ks3"] = base.parse_element (/<cim:Pss2B.ks3>([\s\S]*?)<\/cim:Pss2B.ks3>/g, sub, context, true);
            /**
             * Gain on signal #2 input after ramp-tracking filter (Ks4).
             * Typical Value = 1.
             */
            obj["ks4"] = base.parse_element (/<cim:Pss2B.ks4>([\s\S]*?)<\/cim:Pss2B.ks4>/g, sub, context, true);
            /**
             * Denominator order of ramp tracking filter (M).
             * Typical Value = 5.
             */
            obj["m"] = base.parse_element (/<cim:Pss2B.m>([\s\S]*?)<\/cim:Pss2B.m>/g, sub, context, true);
            /**
             * Order of ramp tracking filter (N).
             * Typical Value = 1.
             */
            obj["n"] = base.parse_element (/<cim:Pss2B.n>([\s\S]*?)<\/cim:Pss2B.n>/g, sub, context, true);
            /**
             * Lead/lag time constant (T1).
             * Typical Value = 0.12.
             */
            obj["t1"] = base.parse_element (/<cim:Pss2B.t1>([\s\S]*?)<\/cim:Pss2B.t1>/g, sub, context, true);
            /**
             * Lead/lag time constant (T10).
             * Typical Value = 0.
             */
            obj["t10"] = base.parse_element (/<cim:Pss2B.t10>([\s\S]*?)<\/cim:Pss2B.t10>/g, sub, context, true);
            /**
             * Lead/lag time constant (T11).
             * Typical Value = 0.
             */
            obj["t11"] = base.parse_element (/<cim:Pss2B.t11>([\s\S]*?)<\/cim:Pss2B.t11>/g, sub, context, true);
            /**
             * Lead/lag time constant (T2).
             * Typical Value = 0.02.
             */
            obj["t2"] = base.parse_element (/<cim:Pss2B.t2>([\s\S]*?)<\/cim:Pss2B.t2>/g, sub, context, true);
            /**
             * Lead/lag time constant (T3).
             * Typical Value = 0.3.
             */
            obj["t3"] = base.parse_element (/<cim:Pss2B.t3>([\s\S]*?)<\/cim:Pss2B.t3>/g, sub, context, true);
            /**
             * Lead/lag time constant (T4).
             * Typical Value = 0.02.
             */
            obj["t4"] = base.parse_element (/<cim:Pss2B.t4>([\s\S]*?)<\/cim:Pss2B.t4>/g, sub, context, true);
            /**
             * Time constant on signal #1 (T6).
             * Typical Value = 0.
             */
            obj["t6"] = base.parse_element (/<cim:Pss2B.t6>([\s\S]*?)<\/cim:Pss2B.t6>/g, sub, context, true);
            /**
             * Time constant on signal #2 (T7).
             * Typical Value = 2.
             */
            obj["t7"] = base.parse_element (/<cim:Pss2B.t7>([\s\S]*?)<\/cim:Pss2B.t7>/g, sub, context, true);
            /**
             * Lead of ramp tracking filter (T8).
             * Typical Value = 0.2.
             */
            obj["t8"] = base.parse_element (/<cim:Pss2B.t8>([\s\S]*?)<\/cim:Pss2B.t8>/g, sub, context, true);
            /**
             * Lag of ramp tracking filter (T9).
             * Typical Value = 0.1.
             */
            obj["t9"] = base.parse_element (/<cim:Pss2B.t9>([\s\S]*?)<\/cim:Pss2B.t9>/g, sub, context, true);
            /**
             * Lead constant (Ta).
             * Typical Value = 0.
             */
            obj["ta"] = base.parse_element (/<cim:Pss2B.ta>([\s\S]*?)<\/cim:Pss2B.ta>/g, sub, context, true);
            /**
             * Lag time constant (Tb).
             * Typical Value = 0.
             */
            obj["tb"] = base.parse_element (/<cim:Pss2B.tb>([\s\S]*?)<\/cim:Pss2B.tb>/g, sub, context, true);
            /**
             * First washout on signal #1 (Tw1).
             * Typical Value = 2.
             */
            obj["tw1"] = base.parse_element (/<cim:Pss2B.tw1>([\s\S]*?)<\/cim:Pss2B.tw1>/g, sub, context, true);
            /**
             * Second washout on signal #1 (Tw2).
             * Typical Value = 2.
             */
            obj["tw2"] = base.parse_element (/<cim:Pss2B.tw2>([\s\S]*?)<\/cim:Pss2B.tw2>/g, sub, context, true);
            /**
             * First washout on signal #2 (Tw3).
             * Typical Value = 2.
             */
            obj["tw3"] = base.parse_element (/<cim:Pss2B.tw3>([\s\S]*?)<\/cim:Pss2B.tw3>/g, sub, context, true);
            /**
             * Second washout on signal #2 (Tw4).
             * Typical Value = 0.
             */
            obj["tw4"] = base.parse_element (/<cim:Pss2B.tw4>([\s\S]*?)<\/cim:Pss2B.tw4>/g, sub, context, true);
            /**
             * Input signal #1 max limit (Vsi1max).
             * Typical Value = 2.
             */
            obj["vsi1max"] = base.parse_element (/<cim:Pss2B.vsi1max>([\s\S]*?)<\/cim:Pss2B.vsi1max>/g, sub, context, true);
            /**
             * Input signal #1 min limit (Vsi1min).
             * Typical Value = -2.
             */
            obj["vsi1min"] = base.parse_element (/<cim:Pss2B.vsi1min>([\s\S]*?)<\/cim:Pss2B.vsi1min>/g, sub, context, true);
            /**
             * Input signal #2 max limit (Vsi2max).
             * Typical Value = 2.
             */
            obj["vsi2max"] = base.parse_element (/<cim:Pss2B.vsi2max>([\s\S]*?)<\/cim:Pss2B.vsi2max>/g, sub, context, true);
            /**
             * Input signal #2 min limit (Vsi2min).
             * Typical Value = -2.
             */
            obj["vsi2min"] = base.parse_element (/<cim:Pss2B.vsi2min>([\s\S]*?)<\/cim:Pss2B.vsi2min>/g, sub, context, true);
            /**
             * Stabilizer output max limit (Vstmax).
             * Typical Value = 0.1.
             */
            obj["vstmax"] = base.parse_element (/<cim:Pss2B.vstmax>([\s\S]*?)<\/cim:Pss2B.vstmax>/g, sub, context, true);
            /**
             * Stabilizer output min limit (Vstmin).
             * Typical Value = -0.1.
             */
            obj["vstmin"] = base.parse_element (/<cim:Pss2B.vstmin>([\s\S]*?)<\/cim:Pss2B.vstmin>/g, sub, context, true);
            bucket = context.parsed.Pss2B;
            if (null == bucket)
                context.parsed.Pss2B = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * Dual input Power System Stabilizer, based on IEEE type 2, with modified output limiter defined by WECC (Western Electricity Coordinating Council, USA).
         */
        function parse_PssWECC (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "PssWECC";
            /**
             * Type of input signal #1.
             */
            obj["inputSignal1Type"] = base.parse_element (/<cim:PssWECC.inputSignal1Type>([\s\S]*?)<\/cim:PssWECC.inputSignal1Type>/g, sub, context, true);
            /**
             * Type of input signal #2.
             */
            obj["inputSignal2Type"] = base.parse_element (/<cim:PssWECC.inputSignal2Type>([\s\S]*?)<\/cim:PssWECC.inputSignal2Type>/g, sub, context, true);
            /**
             * Input signal 1 gain  (K<sub>1</sub>).
             */
            obj["k1"] = base.parse_element (/<cim:PssWECC.k1>([\s\S]*?)<\/cim:PssWECC.k1>/g, sub, context, true);
            /**
             * Input signal 2 gain (K<sub>2</sub>).
             */
            obj["k2"] = base.parse_element (/<cim:PssWECC.k2>([\s\S]*?)<\/cim:PssWECC.k2>/g, sub, context, true);
            /**
             * Input signal 1 transducer time constant (T<sub>1</sub>).
             */
            obj["t1"] = base.parse_element (/<cim:PssWECC.t1>([\s\S]*?)<\/cim:PssWECC.t1>/g, sub, context, true);
            /**
             * Lag time constant (T<sub>10</sub>).
             */
            obj["t10"] = base.parse_element (/<cim:PssWECC.t10>([\s\S]*?)<\/cim:PssWECC.t10>/g, sub, context, true);
            /**
             * Input signal 2 transducer time constant (T<sub>2</sub>).
             */
            obj["t2"] = base.parse_element (/<cim:PssWECC.t2>([\s\S]*?)<\/cim:PssWECC.t2>/g, sub, context, true);
            /**
             * Stabilizer washout time constant (T<sub>3</sub>).
             */
            obj["t3"] = base.parse_element (/<cim:PssWECC.t3>([\s\S]*?)<\/cim:PssWECC.t3>/g, sub, context, true);
            /**
             * Stabilizer washout time lag constant (T<sub>4</sub>) (&gt;0).
             */
            obj["t4"] = base.parse_element (/<cim:PssWECC.t4>([\s\S]*?)<\/cim:PssWECC.t4>/g, sub, context, true);
            /**
             * Lead time constant (T<sub>5</sub>).
             */
            obj["t5"] = base.parse_element (/<cim:PssWECC.t5>([\s\S]*?)<\/cim:PssWECC.t5>/g, sub, context, true);
            /**
             * Lag time constant (T<sub>6</sub>).
             */
            obj["t6"] = base.parse_element (/<cim:PssWECC.t6>([\s\S]*?)<\/cim:PssWECC.t6>/g, sub, context, true);
            /**
             * Lead time constant (T<sub>7</sub>).
             */
            obj["t7"] = base.parse_element (/<cim:PssWECC.t7>([\s\S]*?)<\/cim:PssWECC.t7>/g, sub, context, true);
            /**
             * Lag time constant (T<sub>8</sub>).
             */
            obj["t8"] = base.parse_element (/<cim:PssWECC.t8>([\s\S]*?)<\/cim:PssWECC.t8>/g, sub, context, true);
            /**
             * Lead time constant (T<sub>9</sub>).
             */
            obj["t9"] = base.parse_element (/<cim:PssWECC.t9>([\s\S]*?)<\/cim:PssWECC.t9>/g, sub, context, true);
            /**
             * Minimum value for voltage compensator output (V<sub>CL</sub>).
             */
            obj["vcl"] = base.parse_element (/<cim:PssWECC.vcl>([\s\S]*?)<\/cim:PssWECC.vcl>/g, sub, context, true);
            /**
             * Maximum value for voltage compensator output (V<sub>CU</sub>).
             */
            obj["vcu"] = base.parse_element (/<cim:PssWECC.vcu>([\s\S]*?)<\/cim:PssWECC.vcu>/g, sub, context, true);
            /**
             * Maximum output signal (Vsmax).
             */
            obj["vsmax"] = base.parse_element (/<cim:PssWECC.vsmax>([\s\S]*?)<\/cim:PssWECC.vsmax>/g, sub, context, true);
            /**
             * Minimum output signal (Vsmin).
             */
            obj["vsmin"] = base.parse_element (/<cim:PssWECC.vsmin>([\s\S]*?)<\/cim:PssWECC.vsmin>/g, sub, context, true);
            bucket = context.parsed.PssWECC;
            if (null == bucket)
                context.parsed.PssWECC = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * Power system stabilizer function block whose behaviour is described by reference to a standard model <font color="#0f0f0f">or by definition of a user-defined model.</font>
         */
        function parse_PowerSystemStabilizerDynamics (context, sub)
        {
            var obj;
            var bucket;

            obj = StandardModels.parse_DynamicsFunctionBlock (context, sub);
            obj.cls = "PowerSystemStabilizerDynamics";
            /**
             * Excitation system model with which this power system stabilizer model is associated.
             */
            obj["ExcitationSystemDynamics"] = base.parse_attribute (/<cim:PowerSystemStabilizerDynamics.ExcitationSystemDynamics\s+rdf:resource\s*?=\s*?("|')([\s\S]*?)\1\s*?\/>/g, sub, context, true);
            bucket = context.parsed.PowerSystemStabilizerDynamics;
            if (null == bucket)
                context.parsed.PowerSystemStabilizerDynamics = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * PTI Microprocessor-Based Stabilizer type 1.
         */
        function parse_PssPTIST1 (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "PssPTIST1";
            /**
             * Time step related to activation of controls (Dtc).
             * Typical Value = 0.025.
             */
            obj["dtc"] = base.parse_element (/<cim:PssPTIST1.dtc>([\s\S]*?)<\/cim:PssPTIST1.dtc>/g, sub, context, true);
            /**
             * Time step frequency calculation (Dtf).
             * Typical Value = 0.025.
             */
            obj["dtf"] = base.parse_element (/<cim:PssPTIST1.dtf>([\s\S]*?)<\/cim:PssPTIST1.dtf>/g, sub, context, true);
            /**
             * Time step active power calculation (Dtp).
             * Typical Value = 0.0125.
             */
            obj["dtp"] = base.parse_element (/<cim:PssPTIST1.dtp>([\s\S]*?)<\/cim:PssPTIST1.dtp>/g, sub, context, true);
            /**
             * Gain (K).
             * Typical Value = 9.
             */
            obj["k"] = base.parse_element (/<cim:PssPTIST1.k>([\s\S]*?)<\/cim:PssPTIST1.k>/g, sub, context, true);
            /**
             * (M).
             * M=2*H.  Typical Value = 5.
             */
            obj["m"] = base.parse_element (/<cim:PssPTIST1.m>([\s\S]*?)<\/cim:PssPTIST1.m>/g, sub, context, true);
            /**
             * Time constant (T1).
             * Typical Value = 0.3.
             */
            obj["t1"] = base.parse_element (/<cim:PssPTIST1.t1>([\s\S]*?)<\/cim:PssPTIST1.t1>/g, sub, context, true);
            /**
             * Time constant (T2).
             * Typical Value = 1.
             */
            obj["t2"] = base.parse_element (/<cim:PssPTIST1.t2>([\s\S]*?)<\/cim:PssPTIST1.t2>/g, sub, context, true);
            /**
             * Time constant (T3).
             * Typical Value = 0.2.
             */
            obj["t3"] = base.parse_element (/<cim:PssPTIST1.t3>([\s\S]*?)<\/cim:PssPTIST1.t3>/g, sub, context, true);
            /**
             * Time constant (T4).
             * Typical Value = 0.05.
             */
            obj["t4"] = base.parse_element (/<cim:PssPTIST1.t4>([\s\S]*?)<\/cim:PssPTIST1.t4>/g, sub, context, true);
            /**
             * Time constant (Tf).
             * Typical Value = 0.2.
             */
            obj["tf"] = base.parse_element (/<cim:PssPTIST1.tf>([\s\S]*?)<\/cim:PssPTIST1.tf>/g, sub, context, true);
            /**
             * Time constant (Tp).
             * Typical Value = 0.2.
             */
            obj["tp"] = base.parse_element (/<cim:PssPTIST1.tp>([\s\S]*?)<\/cim:PssPTIST1.tp>/g, sub, context, true);
            bucket = context.parsed.PssPTIST1;
            if (null == bucket)
                context.parsed.PssPTIST1 = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * The class represents IEEE Std 421.5-2005 type PSS2B power system stabilizer model.
         * This stabilizer model is designed to represent a variety of dual-input stabilizers, which normally use combinations of power and speed or frequency to derive the stabilizing signal.
         */
        function parse_PssIEEE2B (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "PssIEEE2B";
            /**
             * Type of input signal #1.
             * Typical Value = rotorSpeed.
             */
            obj["inputSignal1Type"] = base.parse_element (/<cim:PssIEEE2B.inputSignal1Type>([\s\S]*?)<\/cim:PssIEEE2B.inputSignal1Type>/g, sub, context, true);
            /**
             * Type of input signal #2.
             * Typical Value = generatorElectricalPower.
             */
            obj["inputSignal2Type"] = base.parse_element (/<cim:PssIEEE2B.inputSignal2Type>([\s\S]*?)<\/cim:PssIEEE2B.inputSignal2Type>/g, sub, context, true);
            /**
             * Stabilizer gain (Ks1).
             * Typical Value = 12.
             */
            obj["ks1"] = base.parse_element (/<cim:PssIEEE2B.ks1>([\s\S]*?)<\/cim:PssIEEE2B.ks1>/g, sub, context, true);
            /**
             * Gain on signal #2 (Ks2).
             * Typical Value = 0.2.
             */
            obj["ks2"] = base.parse_element (/<cim:PssIEEE2B.ks2>([\s\S]*?)<\/cim:PssIEEE2B.ks2>/g, sub, context, true);
            /**
             * Gain on signal #2 input before ramp-tracking filter (Ks3).
             * Typical Value = 1.
             */
            obj["ks3"] = base.parse_element (/<cim:PssIEEE2B.ks3>([\s\S]*?)<\/cim:PssIEEE2B.ks3>/g, sub, context, true);
            /**
             * Denominator order of ramp tracking filter (M).
             * Typical Value = 5.
             */
            obj["m"] = base.parse_element (/<cim:PssIEEE2B.m>([\s\S]*?)<\/cim:PssIEEE2B.m>/g, sub, context, true);
            /**
             * Order of ramp tracking filter (N).
             * Typical Value = 1.
             */
            obj["n"] = base.parse_element (/<cim:PssIEEE2B.n>([\s\S]*?)<\/cim:PssIEEE2B.n>/g, sub, context, true);
            /**
             * Lead/lag time constant (T1).
             * Typical Value = 0.12.
             */
            obj["t1"] = base.parse_element (/<cim:PssIEEE2B.t1>([\s\S]*?)<\/cim:PssIEEE2B.t1>/g, sub, context, true);
            /**
             * Lead/lag time constant (T10).
             * Typical Value = 0.
             */
            obj["t10"] = base.parse_element (/<cim:PssIEEE2B.t10>([\s\S]*?)<\/cim:PssIEEE2B.t10>/g, sub, context, true);
            /**
             * Lead/lag time constant (T11).
             * Typical Value = 0.
             */
            obj["t11"] = base.parse_element (/<cim:PssIEEE2B.t11>([\s\S]*?)<\/cim:PssIEEE2B.t11>/g, sub, context, true);
            /**
             * Lead/lag time constant (T2).
             * Typical Value = 0.02.
             */
            obj["t2"] = base.parse_element (/<cim:PssIEEE2B.t2>([\s\S]*?)<\/cim:PssIEEE2B.t2>/g, sub, context, true);
            /**
             * Lead/lag time constant (T3).
             * Typical Value = 0.3.
             */
            obj["t3"] = base.parse_element (/<cim:PssIEEE2B.t3>([\s\S]*?)<\/cim:PssIEEE2B.t3>/g, sub, context, true);
            /**
             * Lead/lag time constant (T4).
             * Typical Value = 0.02.
             */
            obj["t4"] = base.parse_element (/<cim:PssIEEE2B.t4>([\s\S]*?)<\/cim:PssIEEE2B.t4>/g, sub, context, true);
            /**
             * Time constant on signal #1 (T6).
             * Typical Value = 0.
             */
            obj["t6"] = base.parse_element (/<cim:PssIEEE2B.t6>([\s\S]*?)<\/cim:PssIEEE2B.t6>/g, sub, context, true);
            /**
             * Time constant on signal #2 (T7).
             * Typical Value = 2.
             */
            obj["t7"] = base.parse_element (/<cim:PssIEEE2B.t7>([\s\S]*?)<\/cim:PssIEEE2B.t7>/g, sub, context, true);
            /**
             * Lead of ramp tracking filter (T8).
             * Typical Value = 0.2.
             */
            obj["t8"] = base.parse_element (/<cim:PssIEEE2B.t8>([\s\S]*?)<\/cim:PssIEEE2B.t8>/g, sub, context, true);
            /**
             * Lag of ramp tracking filter (T9).
             * Typical Value = 0.1.
             */
            obj["t9"] = base.parse_element (/<cim:PssIEEE2B.t9>([\s\S]*?)<\/cim:PssIEEE2B.t9>/g, sub, context, true);
            /**
             * First washout on signal #1 (Tw1).
             * Typical Value = 2.
             */
            obj["tw1"] = base.parse_element (/<cim:PssIEEE2B.tw1>([\s\S]*?)<\/cim:PssIEEE2B.tw1>/g, sub, context, true);
            /**
             * Second washout on signal #1 (Tw2).
             * Typical Value = 2.
             */
            obj["tw2"] = base.parse_element (/<cim:PssIEEE2B.tw2>([\s\S]*?)<\/cim:PssIEEE2B.tw2>/g, sub, context, true);
            /**
             * First washout on signal #2 (Tw3).
             * Typical Value = 2.
             */
            obj["tw3"] = base.parse_element (/<cim:PssIEEE2B.tw3>([\s\S]*?)<\/cim:PssIEEE2B.tw3>/g, sub, context, true);
            /**
             * Second washout on signal #2 (Tw4).
             * Typical Value = 0.
             */
            obj["tw4"] = base.parse_element (/<cim:PssIEEE2B.tw4>([\s\S]*?)<\/cim:PssIEEE2B.tw4>/g, sub, context, true);
            /**
             * Input signal #1 max limit (Vsi1max).
             * Typical Value = 2.
             */
            obj["vsi1max"] = base.parse_element (/<cim:PssIEEE2B.vsi1max>([\s\S]*?)<\/cim:PssIEEE2B.vsi1max>/g, sub, context, true);
            /**
             * Input signal #1 min limit (Vsi1min).
             * Typical Value = -2.
             */
            obj["vsi1min"] = base.parse_element (/<cim:PssIEEE2B.vsi1min>([\s\S]*?)<\/cim:PssIEEE2B.vsi1min>/g, sub, context, true);
            /**
             * Input signal #2 max limit (Vsi2max).
             * Typical Value = 2.
             */
            obj["vsi2max"] = base.parse_element (/<cim:PssIEEE2B.vsi2max>([\s\S]*?)<\/cim:PssIEEE2B.vsi2max>/g, sub, context, true);
            /**
             * Input signal #2 min limit (Vsi2min).
             * Typical Value = -2.
             */
            obj["vsi2min"] = base.parse_element (/<cim:PssIEEE2B.vsi2min>([\s\S]*?)<\/cim:PssIEEE2B.vsi2min>/g, sub, context, true);
            /**
             * Stabilizer output max limit (Vstmax).
             * Typical Value = 0.1.
             */
            obj["vstmax"] = base.parse_element (/<cim:PssIEEE2B.vstmax>([\s\S]*?)<\/cim:PssIEEE2B.vstmax>/g, sub, context, true);
            /**
             * Stabilizer output min limit (Vstmin).
             * Typical Value = -0.1.
             */
            obj["vstmin"] = base.parse_element (/<cim:PssIEEE2B.vstmin>([\s\S]*?)<\/cim:PssIEEE2B.vstmin>/g, sub, context, true);
            bucket = context.parsed.PssIEEE2B;
            if (null == bucket)
                context.parsed.PssIEEE2B = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * PTI Microprocessor-Based Stabilizer type 1.
         */
        function parse_Pss2ST (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "Pss2ST";
            /**
             * Type of input signal #1.
             * Typical Value = rotorAngularFrequencyDeviation.
             */
            obj["inputSignal1Type"] = base.parse_element (/<cim:Pss2ST.inputSignal1Type>([\s\S]*?)<\/cim:Pss2ST.inputSignal1Type>/g, sub, context, true);
            /**
             * Type of input signal #2.
             * Typical Value = generatorElectricalPower.
             */
            obj["inputSignal2Type"] = base.parse_element (/<cim:Pss2ST.inputSignal2Type>([\s\S]*?)<\/cim:Pss2ST.inputSignal2Type>/g, sub, context, true);
            /**
             * Gain (K1).
             */
            obj["k1"] = base.parse_element (/<cim:Pss2ST.k1>([\s\S]*?)<\/cim:Pss2ST.k1>/g, sub, context, true);
            /**
             * Gain (K2).
             */
            obj["k2"] = base.parse_element (/<cim:Pss2ST.k2>([\s\S]*?)<\/cim:Pss2ST.k2>/g, sub, context, true);
            /**
             * Limiter (Lsmax).
             */
            obj["lsmax"] = base.parse_element (/<cim:Pss2ST.lsmax>([\s\S]*?)<\/cim:Pss2ST.lsmax>/g, sub, context, true);
            /**
             * Limiter (Lsmin).
             */
            obj["lsmin"] = base.parse_element (/<cim:Pss2ST.lsmin>([\s\S]*?)<\/cim:Pss2ST.lsmin>/g, sub, context, true);
            /**
             * Time constant (T1).
             */
            obj["t1"] = base.parse_element (/<cim:Pss2ST.t1>([\s\S]*?)<\/cim:Pss2ST.t1>/g, sub, context, true);
            /**
             * Time constant (T10).
             */
            obj["t10"] = base.parse_element (/<cim:Pss2ST.t10>([\s\S]*?)<\/cim:Pss2ST.t10>/g, sub, context, true);
            /**
             * Time constant (T2).
             */
            obj["t2"] = base.parse_element (/<cim:Pss2ST.t2>([\s\S]*?)<\/cim:Pss2ST.t2>/g, sub, context, true);
            /**
             * Time constant (T3).
             */
            obj["t3"] = base.parse_element (/<cim:Pss2ST.t3>([\s\S]*?)<\/cim:Pss2ST.t3>/g, sub, context, true);
            /**
             * Time constant (T4).
             */
            obj["t4"] = base.parse_element (/<cim:Pss2ST.t4>([\s\S]*?)<\/cim:Pss2ST.t4>/g, sub, context, true);
            /**
             * Time constant (T5).
             */
            obj["t5"] = base.parse_element (/<cim:Pss2ST.t5>([\s\S]*?)<\/cim:Pss2ST.t5>/g, sub, context, true);
            /**
             * Time constant (T6).
             */
            obj["t6"] = base.parse_element (/<cim:Pss2ST.t6>([\s\S]*?)<\/cim:Pss2ST.t6>/g, sub, context, true);
            /**
             * Time constant (T7).
             */
            obj["t7"] = base.parse_element (/<cim:Pss2ST.t7>([\s\S]*?)<\/cim:Pss2ST.t7>/g, sub, context, true);
            /**
             * Time constant (T8).
             */
            obj["t8"] = base.parse_element (/<cim:Pss2ST.t8>([\s\S]*?)<\/cim:Pss2ST.t8>/g, sub, context, true);
            /**
             * Time constant (T9).
             */
            obj["t9"] = base.parse_element (/<cim:Pss2ST.t9>([\s\S]*?)<\/cim:Pss2ST.t9>/g, sub, context, true);
            /**
             * Cutoff limiter (Vcl).
             */
            obj["vcl"] = base.parse_element (/<cim:Pss2ST.vcl>([\s\S]*?)<\/cim:Pss2ST.vcl>/g, sub, context, true);
            /**
             * Cutoff limiter (Vcu).
             */
            obj["vcu"] = base.parse_element (/<cim:Pss2ST.vcu>([\s\S]*?)<\/cim:Pss2ST.vcu>/g, sub, context, true);
            bucket = context.parsed.Pss2ST;
            if (null == bucket)
                context.parsed.Pss2ST = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * Input signal type.
         * In Dynamics modelling, commonly represented by j parameter.
         */
        function parse_InputSignalKind (context, sub)
        {
            var obj;
            var bucket;

            obj = base.parse_Element (context, sub);
            obj.cls = "InputSignalKind";
            /**
             * Input signal is rotor or shaft speed (angular frequency).
             */
            obj["rotorSpeed"] = base.parse_element (/<cim:InputSignalKind.rotorSpeed>([\s\S]*?)<\/cim:InputSignalKind.rotorSpeed>/g, sub, context, true);
            /**
             * Input signal is rotor or shaft angular frequency deviation.
             */
            obj["rotorAngularFrequencyDeviation"] = base.parse_element (/<cim:InputSignalKind.rotorAngularFrequencyDeviation>([\s\S]*?)<\/cim:InputSignalKind.rotorAngularFrequencyDeviation>/g, sub, context, true);
            /**
             * Input signal is bus voltage fr<font color="#0f0f0f">equency.
             * This could be a terminal frequency or remote frequency.</font>
             */
            obj["busFrequency"] = base.parse_element (/<cim:InputSignalKind.busFrequency>([\s\S]*?)<\/cim:InputSignalKind.busFrequency>/g, sub, context, true);
            /**
             * Input signal is deviation of bus voltage frequ<font color="#0f0f0f">ency.
             * This could be a terminal frequency deviation or remote frequency deviation.</font>
             */
            obj["busFrequencyDeviation"] = base.parse_element (/<cim:InputSignalKind.busFrequencyDeviation>([\s\S]*?)<\/cim:InputSignalKind.busFrequencyDeviation>/g, sub, context, true);
            /**
             * Input signal is generator electrical power on rated S.
             */
            obj["generatorElectricalPower"] = base.parse_element (/<cim:InputSignalKind.generatorElectricalPower>([\s\S]*?)<\/cim:InputSignalKind.generatorElectricalPower>/g, sub, context, true);
            /**
             * Input signal is generating accelerating power.
             */
            obj["generatorAcceleratingPower"] = base.parse_element (/<cim:InputSignalKind.generatorAcceleratingPower>([\s\S]*?)<\/cim:InputSignalKind.generatorAcceleratingPower>/g, sub, context, true);
            /**
             * Input signal <font color="#0f0f0f">is bus voltage.
             * This could be a terminal voltage or remote voltage.</font>
             */
            obj["busVoltage"] = base.parse_element (/<cim:InputSignalKind.busVoltage>([\s\S]*?)<\/cim:InputSignalKind.busVoltage>/g, sub, context, true);
            /**
             * Input signal is derivative of bus voltag<font color="#0f0f0f">e.
             * This could be a terminal voltage derivative or remote voltage derivative.</font>
             */
            obj["busVoltageDerivative"] = base.parse_element (/<cim:InputSignalKind.busVoltageDerivative>([\s\S]*?)<\/cim:InputSignalKind.busVoltageDerivative>/g, sub, context, true);
            /**
             * Input signal is amplitude of remote branch current.
             */
            obj["branchCurrent"] = base.parse_element (/<cim:InputSignalKind.branchCurrent>([\s\S]*?)<\/cim:InputSignalKind.branchCurrent>/g, sub, context, true);
            /**
             * Input signal is generator field current.
             */
            obj["fieldCurrent"] = base.parse_element (/<cim:InputSignalKind.fieldCurrent>([\s\S]*?)<\/cim:InputSignalKind.fieldCurrent>/g, sub, context, true);
            bucket = context.parsed.InputSignalKind;
            if (null == bucket)
                context.parsed.InputSignalKind = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * Italian PSS - three input PSS (speed, frequency, power).
         */
        function parse_Pss1 (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "Pss1";
            /**
             * Frequency power input gain (K<sub>F</sub>).
             * Typical Value = 5.
             */
            obj["kf"] = base.to_float (base.parse_element (/<cim:Pss1.kf>([\s\S]*?)<\/cim:Pss1.kf>/g, sub, context, true));
            /**
             * Electric power input gain (K<sub>PE</sub>).
             * Typical Value = 0.3.
             */
            obj["kpe"] = base.to_float (base.parse_element (/<cim:Pss1.kpe>([\s\S]*?)<\/cim:Pss1.kpe>/g, sub, context, true));
            /**
             * PSS gain (K<sub>S</sub>).
             * Typical Value = 1.
             */
            obj["ks"] = base.to_float (base.parse_element (/<cim:Pss1.ks>([\s\S]*?)<\/cim:Pss1.ks>/g, sub, context, true));
            /**
             * Shaft speed power input gain (K<sub>W</sub>).
             * Typical Value = 0.
             */
            obj["kw"] = base.to_float (base.parse_element (/<cim:Pss1.kw>([\s\S]*?)<\/cim:Pss1.kw>/g, sub, context, true));
            /**
             * Minimum power PSS enabling (P<sub>MIN</sub>).
             * Typical Value = 0.25.
             */
            obj["pmin"] = base.parse_element (/<cim:Pss1.pmin>([\s\S]*?)<\/cim:Pss1.pmin>/g, sub, context, true);
            /**
             * Lead/lag time constant (T<sub>10</sub>).
             * Typical Value = 0.
             */
            obj["t10"] = base.parse_element (/<cim:Pss1.t10>([\s\S]*?)<\/cim:Pss1.t10>/g, sub, context, true);
            /**
             * Washout (T<sub>5</sub>).
             * Typical Value = 3.5.
             */
            obj["t5"] = base.parse_element (/<cim:Pss1.t5>([\s\S]*?)<\/cim:Pss1.t5>/g, sub, context, true);
            /**
             * Filter time constant (T<sub>6</sub>).
             * Typical Value = 0.
             */
            obj["t6"] = base.parse_element (/<cim:Pss1.t6>([\s\S]*?)<\/cim:Pss1.t6>/g, sub, context, true);
            /**
             * Lead/lag time constant (T<sub>7</sub>).
             * Typical Value = 0.
             */
            obj["t7"] = base.parse_element (/<cim:Pss1.t7>([\s\S]*?)<\/cim:Pss1.t7>/g, sub, context, true);
            /**
             * Lead/lag time constant (T<sub>8</sub>).
             * Typical Value = 0.
             */
            obj["t8"] = base.parse_element (/<cim:Pss1.t8>([\s\S]*?)<\/cim:Pss1.t8>/g, sub, context, true);
            /**
             * Lead/lag time constant (T<sub>9</sub>).
             * Typical Value = 0.
             */
            obj["t9"] = base.parse_element (/<cim:Pss1.t9>([\s\S]*?)<\/cim:Pss1.t9>/g, sub, context, true);
            /**
             * Electric power filter time constant (T<sub>PE</sub>).
             * Typical Value = 0.05.
             */
            obj["tpe"] = base.parse_element (/<cim:Pss1.tpe>([\s\S]*?)<\/cim:Pss1.tpe>/g, sub, context, true);
            /**
             * <font color="#0f0f0f">Signal selector (V<sub>adAt</sub>).</font>
            <font color="#0f0f0f">true = closed (Generator Power is greater than Pmin)</font>
            <font color="#0f0f0f">false = open (Pe is smaller than Pmin).</font>
             * <font color="#0f0f0f">Typical Value = true.</font>
             */
            obj["vadat"] = base.to_boolean (base.parse_element (/<cim:Pss1.vadat>([\s\S]*?)<\/cim:Pss1.vadat>/g, sub, context, true));
            /**
             * Stabilizer output max limit (V<sub>SMN</sub>).
             * Typical Value = -0.06.
             */
            obj["vsmn"] = base.parse_element (/<cim:Pss1.vsmn>([\s\S]*?)<\/cim:Pss1.vsmn>/g, sub, context, true);
            /**
             * Stabilizer output min limit (V<sub>SMX</sub>).
             * Typical Value = 0.06.
             */
            obj["vsmx"] = base.parse_element (/<cim:Pss1.vsmx>([\s\S]*?)<\/cim:Pss1.vsmx>/g, sub, context, true);
            bucket = context.parsed.Pss1;
            if (null == bucket)
                context.parsed.Pss1 = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        /**
         * Model for Siemens �H infinity� power system stabilizer with generator electrical power input.
         */
        function parse_PssSH (context, sub)
        {
            var obj;
            var bucket;

            obj = parse_PowerSystemStabilizerDynamics (context, sub);
            obj.cls = "PssSH";
            /**
             * Main gain (K).
             * Typical Value = 1.
             */
            obj["k"] = base.parse_element (/<cim:PssSH.k>([\s\S]*?)<\/cim:PssSH.k>/g, sub, context, true);
            /**
             * Gain 0 (K0).
             * Typical Value = 0.012.
             */
            obj["k0"] = base.parse_element (/<cim:PssSH.k0>([\s\S]*?)<\/cim:PssSH.k0>/g, sub, context, true);
            /**
             * Gain 1 (K1).
             * Typical Value = 0.488.
             */
            obj["k1"] = base.parse_element (/<cim:PssSH.k1>([\s\S]*?)<\/cim:PssSH.k1>/g, sub, context, true);
            /**
             * Gain 2 (K2).
             * Typical Value = 0.064.
             */
            obj["k2"] = base.parse_element (/<cim:PssSH.k2>([\s\S]*?)<\/cim:PssSH.k2>/g, sub, context, true);
            /**
             * Gain 3 (K3).
             * Typical Value = 0.224.
             */
            obj["k3"] = base.parse_element (/<cim:PssSH.k3>([\s\S]*?)<\/cim:PssSH.k3>/g, sub, context, true);
            /**
             * Gain 4 (K4).
             * Typical Value = 0.1.
             */
            obj["k4"] = base.parse_element (/<cim:PssSH.k4>([\s\S]*?)<\/cim:PssSH.k4>/g, sub, context, true);
            /**
             * Time constant 1 (T1).
             * Typical Value = 0.076.
             */
            obj["t1"] = base.parse_element (/<cim:PssSH.t1>([\s\S]*?)<\/cim:PssSH.t1>/g, sub, context, true);
            /**
             * Time constant 2 (T2).
             * Typical Value = 0.086.
             */
            obj["t2"] = base.parse_element (/<cim:PssSH.t2>([\s\S]*?)<\/cim:PssSH.t2>/g, sub, context, true);
            /**
             * Time constant 3 (T3).
             * Typical Value = 1.068.
             */
            obj["t3"] = base.parse_element (/<cim:PssSH.t3>([\s\S]*?)<\/cim:PssSH.t3>/g, sub, context, true);
            /**
             * Time constant 4 (T4).
             * Typical Value = 1.913.
             */
            obj["t4"] = base.parse_element (/<cim:PssSH.t4>([\s\S]*?)<\/cim:PssSH.t4>/g, sub, context, true);
            /**
             * Input time constant (Td).
             * Typical Value = 10.
             */
            obj["td"] = base.parse_element (/<cim:PssSH.td>([\s\S]*?)<\/cim:PssSH.td>/g, sub, context, true);
            /**
             * Output maximum limit (Vsmax).
             * Typical Value = 0.1.
             */
            obj["vsmax"] = base.parse_element (/<cim:PssSH.vsmax>([\s\S]*?)<\/cim:PssSH.vsmax>/g, sub, context, true);
            /**
             * Output minimum limit (Vsmin).
             * Typical Value = -0.1.
             */
            obj["vsmin"] = base.parse_element (/<cim:PssSH.vsmin>([\s\S]*?)<\/cim:PssSH.vsmin>/g, sub, context, true);
            bucket = context.parsed.PssSH;
            if (null == bucket)
                context.parsed.PssSH = bucket = {};
            bucket[obj.id] = obj;

            return (obj);
        }

        return (
            {
                parse_PssSK: parse_PssSK,
                parse_PssSH: parse_PssSH,
                parse_Pss5: parse_Pss5,
                parse_PssWECC: parse_PssWECC,
                parse_Pss2B: parse_Pss2B,
                parse_PssPTIST1: parse_PssPTIST1,
                parse_PssIEEE4B: parse_PssIEEE4B,
                parse_PssPTIST3: parse_PssPTIST3,
                parse_PssIEEE1A: parse_PssIEEE1A,
                parse_PssIEEE3B: parse_PssIEEE3B,
                parse_Pss2ST: parse_Pss2ST,
                parse_PssELIN2: parse_PssELIN2,
                parse_PssIEEE2B: parse_PssIEEE2B,
                parse_PssSB4: parse_PssSB4,
                parse_InputSignalKind: parse_InputSignalKind,
                parse_Pss1: parse_Pss1,
                parse_PowerSystemStabilizerDynamics: parse_PowerSystemStabilizerDynamics,
                parse_Pss1A: parse_Pss1A
            }
        );
    }
);