/**
 * Main javascript file for CIMSpace application
 * Performs application initialization as the first step in the RequireJS load sequence.
 * @see http://requirejs.org/docs/api.html#data-main
 */
"use strict";
requirejs
(
    ["cimspace", "cimmap", "cimdetails", "cimedit", "cimconnectivity", "cimdiagram",
     "themes/cimthemes", "themes/default_theme", "themes/voltage", "themes/island", "themes/inservice", "themes/diagram",
     "nav/cimnav", "nav/zoominnav", "nav/zoomoutnav", "nav/rotationnav", "nav/zoomnav", "nav/infonav", "nav/themenav", "nav/legendnav", "nav/editnav", "nav/connectivitynav", "nav/diagramnav"],
    function (cimspace, cimmap, CIMDetails, CIMEdit, CIMConnectivity, CIMDiagram,
              ThemeControl, DefaultTheme, VoltageTheme, IslandTheme, InServiceTheme, DiagramTheme,
              NavigationControl, ZoomInNav, ZoomOutNav, RotationNav, ZoomNav, InfoNav, ThemeNav, LegendNav, EditNav, ConnectivityNav, DiagramNav)
    {
        // initialize widgets
        document.getElementById ("file_button").onchange = cimspace.file_change;
        document.getElementById ("connect").onclick = cimspace.process_url;
        document.getElementById ("save_name").onchange = cimspace.save_name_change;
        document.getElementById ("rdf_about").onchange = cimspace.about_change;
        document.getElementById ("md_description").onchange = cimspace.description_change;
        document.getElementById ("full_model").onchange = cimspace.save_mode_change;
        document.getElementById ("difference_model").onchange = cimspace.save_mode_change;
        document.getElementById ("only_new").onchange = cimspace.save_mode_change;
        document.getElementById ("save_file").onclick = cimspace.generate_rdf;
        document.getElementById ("internal_features").onchange = cimmap.redraw;
        document.getElementById ("buildings_3d").onchange = cimmap.buildings_3d;
        document.getElementById ("scale_bar").onchange = cimmap.scale_bar;
        document.getElementById ("coordinate").onchange = cimmap.coordinates;

        // drag and drop listeners
        document.getElementById ("files_drop_zone").ondragover = cimspace.file_drag;
        document.getElementById ("files_drop_zone").ondrop = cimspace.file_drop;

        // javascript functions
        document.getElementById ("trace").onclick = cimmap.trace;
        document.getElementById ("unhighlight").onclick = function () { cimmap.select (null); };
        document.getElementById ("search").onsubmit = cimmap.search;
        document.getElementById ("search_button").onclick = cimmap.search;

        /**
         * The detail view control object.
         */
        var TheDetails = new CIMDetails (cimmap);

        /**
         * The editor control object.
         */
        var TheEditor = new CIMEdit (cimmap);

        /**
         * The connectivity control object.
         */
        var TheConnectivity = new CIMConnectivity (cimmap, TheEditor);

        /**
         * The diagram control object.
         */
        var TheDiagram = new CIMDiagram (cimmap);

        /**
         * The theme setting control object.
         */
        var TheThemer = new ThemeControl ();
        TheThemer.addTheme (new DefaultTheme ());
        TheThemer.addTheme (new VoltageTheme ());
        TheThemer.addTheme (new IslandTheme ());
        TheThemer.addTheme (new InServiceTheme ());
        TheThemer.addTheme (new DiagramTheme ());

        function toggle (control_or_function)
        {
            return (
                function (event)
                {
                    var control = ("function" == typeof (control_or_function)) ? control_or_function () : control_or_function;
                    if (control.visible ())
                        cimmap.get_map ().removeControl (control);
                    else
                    {
                        cimmap.get_map ().addControl (control);
                        control.initialize ();
                    }
                }
            );
        }

        var zoom = document.createElement ("button", { is: "zoom-nav-button" });
        var info = document.createElement ("button", { is: "info-nav-button" });
        var theme = document.createElement ("button", { is: "theme-nav-button" });
        var legend = document.createElement ("button", { is: "legend-nav-button" });
        var edit = document.createElement ("button", { is: "edit-nav-button" });
        var connectivity = document.createElement ("button", { is: "connectivity-nav-button" });
        var diagram = document.createElement ("button", { is: "diagram-nav-button" });

        var TheNavigator =  new NavigationControl ();
        TheNavigator.addButton (document.createElement ("button", { is: "zoomin-nav-button" }));
        TheNavigator.addButton (document.createElement ("button", { is: "zoomout-nav-button" }));
        TheNavigator.addButton (document.createElement ("button", { is: "rotation-nav-button" }));
        TheNavigator.addButton (zoom);
        TheNavigator.addButton (info);
        TheNavigator.addButton (theme);
        TheNavigator.addButton (legend);
        TheNavigator.addButton (edit);
        TheNavigator.addButton (connectivity);
        TheNavigator.addButton (diagram);

        cimmap.initialize (TheNavigator, TheThemer, TheEditor);

        zoom.addEventListener ("click", cimmap.zoom_extents);
        info.addEventListener ("click", toggle (TheDetails));
        theme.addEventListener ("click", toggle (TheThemer));
        legend.addEventListener ("click", toggle (function () { return (TheThemer.getTheme ().getLegend ()); }));
        edit.addEventListener ("click", toggle (TheEditor));
        connectivity.addEventListener ("click", toggle (TheConnectivity));
        diagram.addEventListener ("click", toggle (TheDiagram));
    }
);
