$(document).ready(function ($) {
    "use strict";

    var mapId = "ts-map-hero";

    //==================================================================================================================
    // VARIABLES
    // =================================================================================================================

    var newMarkers = [];
    var loadedMarkersData = [];
    var allMarkersData;
    var lastMarker;
    var map;
    var markerCluster;

    if ($("#" + mapId).length) {

        //==============================================================================================================
        // MAP SETTINGS
        // =============================================================================================================
        var mapElement = $(document.getElementById(mapId));
        var mapDefaultZoom = parseInt(mapElement.attr("data-ts-map-zoom"), 10);
        var centerLatitude = mapElement.attr("data-ts-map-center-latitude");
        var centerLongitude = mapElement.attr("data-ts-map-center-longitude");
        var locale = mapElement.attr("data-ts-locale");
        var currency = mapElement.attr("data-ts-currency");
        var unit = mapElement.attr("data-ts-unit");
        var controls = parseInt(mapElement.attr("data-ts-map-controls"), 10);
        var scrollWheel = parseInt(mapElement.attr("data-ts-map-scroll-wheel"), 10);
        var leafletMapProvider = mapElement.attr("data-ts-map-leaflet-provider");
        var leafletAttribution = mapElement.attr("data-ts-map-leaflet-attribution");
        var zoomPosition = mapElement.attr("data-ts-map-zoom-position");
        var mapBoxAccessToken = mapElement.attr("data-ts-map-mapbox-access-token");
        var mapBoxId = mapElement.attr("data-ts-map-mapbox-id");

        if (mapElement.attr("data-ts-display-additional-info")) {
            var displayAdditionalInfoTemp = mapElement.attr("data-ts-display-additional-info").split(";");
            var displayAdditionalInfo = [];
            for (var i = 0; i < displayAdditionalInfoTemp.length; i++) {
                displayAdditionalInfo.push(displayAdditionalInfoTemp[i].split("_"));
            }
        }

        // Default map zoom
        if (!mapDefaultZoom) {
            mapDefaultZoom = 14;
        }

        //==================================================================================================================
        // MAP ELEMENT
        // =================================================================================================================
        map = L.map(mapId, {
            zoomControl: false,
            scrollWheelZoom: scrollWheel
        });
        map.setView([centerLatitude, centerLongitude], mapDefaultZoom);

        L.tileLayer(leafletMapProvider, {
            attribution: leafletAttribution,
            id: mapBoxId,
            accessToken: mapBoxAccessToken
        }).addTo(map);


        if (controls !== 0 && zoomPosition) {
            L.control.zoom({ position: zoomPosition }).addTo(map);
        }
        else if (controls !== 0) {
            L.control.zoom({ position: "topright" }).addTo(map);
        }

        //==================================================================================================================
        // LOAD DATA
        // =================================================================================================================

        loadData();
    }

    function loadData(parameters) {
        //$.ajax({
        //    url: "http://themestarz.net/html/myhouse/assets/db/items.json",
        //    dataType: "json",
        //    method: "GET",
        //    cache: false,
        //    success: function (results) {

        //        if (typeof parameters !== "undefined" && parameters["formData"]) {
        //            //loadFormData(parameters);
        //        }
        //        else {
        //            allMarkersData = results;
        //            loadedMarkersData = allMarkersData;
        //        }

        //        createMarkers(); // call function to create markers
        //    },
        //    error: function (e) {
        //        console.log(e);
        //    }
        //});

        allMarkersData = getDataItem();
        loadedMarkersData = allMarkersData;
        createMarkers(); // call function to create markers
    }

    //==================================================================================================================
    // Create DIV with the markers data
    // =================================================================================================================
    function createMarkers() {

        markerCluster = L.markerClusterGroup({
            showCoverageOnHover: false
        });

        for (var i = 0; i < loadedMarkersData.length; i++) {

            var markerContent = document.createElement('div');

            markerContent.innerHTML =
                '<div class="ts-marker-wrapper">' +
                '<a href="#" class="ts-marker" data-ts-id="' + loadedMarkersData[i]["id"] + '" data-ts-ln="' + i + '">' +
                ((loadedMarkersData[i]["ribbon"] !== undefined) ? '<div class="ts-marker__feature">' + loadedMarkersData[i]["ribbon"] + '</div>' : "") +
                ((loadedMarkersData[i]["title"] !== undefined) ? '<div class="ts-marker__title">' + loadedMarkersData[i]["title"] + '</div>' : "") +
                ((loadedMarkersData[i]["price"] !== undefined && loadedMarkersData[i]["price"] > 0) ? '<div class="ts-marker__info">' + formatPrice(loadedMarkersData[i]["price"]) + '</div>' : "") +
                ((loadedMarkersData[i]["marker_image"] !== undefined) ? '<div class="ts-marker__image ts-black-gradient" style="background-image: url(' + loadedMarkersData[i]["marker_image"] + ')"></div>' : '<div class="ts-marker__image ts-black-gradient" style="background-image: url( image/marker-default-img.png)"></div>') +
                '</a>' +
                '</div>';

            placeLeafletMarker({ "i": i, "markerContent": markerContent, "method": "latitudeLongitude" });

        }

        // After the markers are created, do the rest

        markersDone();
    }

    //==================================================================================================================
    // When markers are placed, do the rest
    // =================================================================================================================
    function markersDone() {

        //==================================================================================================================
        // MARKER CLUSTERER
        // =============================================================================================================
        map.addLayer(markerCluster);
        map.on("moveend", createSideBarResult);
        createSideBarResult();
    }

    //==================================================================================================================
    // Google Rich Marker plugin
    // =================================================================================================================

    function placeLeafletMarker(parameters) {

        var i = parameters["i"];

        // Define marker HTML

        var markerIcon = L.divIcon({
            html: parameters["markerContent"].innerHTML,
            iconSize: [42, 47],
            iconAnchor: [0, 47]
        });

        // Attach marker to map
        var marker = L.marker([loadedMarkersData[i]["latitude"], loadedMarkersData[i]["longitude"]], {
            icon: markerIcon
        });

        marker.loopNumber = i;

        markerCluster.addLayer(marker);

        // Open Popup on click

        marker.on('click', function () {
            debugger;
            if (lastMarker && lastMarker._icon) {
                $(lastMarker._icon.firstChild).removeClass("ts-hide-marker");
            }
            openInfobox({
                "id": $(this._icon).find(".ts-marker").attr("data-ts-id"),
                "parentMarker": marker,
                "i": i,
                "url": getDataItem()
            });
            debugger;
        });

        newMarkers.push(marker);
    }


    //==================================================================================================================
    // Open InfoBox on marker click
    // =================================================================================================================
    function openInfobox(parameters) {
        debugger;
        var i = parameters["i"];
        var parentMarker = parameters["parentMarker"];
        var id = parameters["id"];
        var infoboxHtml = document.createElement('div');

        // First create and HTML for infobox
        createInfoBoxHTML({ "i": i, "infoboxHtml": infoboxHtml });

        //==============================================================================================================
        // Set InfoBox options
        //==============================================================================================================

        var popup = L.popup({ closeButton: false, offset: [120, 0], closeOnClick: false })
            .setLatLng([parentMarker._latlng.lat, parentMarker._latlng.lng])
            .setContent(infoboxHtml)
            .openOn(map);

        // Set the new "Last" opened marker
        lastMarker = parentMarker;

        // Hide the current marker, so only InfoBox is visible
        parentMarker._markerIcon = parentMarker._icon.firstChild;
        $(parentMarker._icon.firstChild).addClass("ts-hide-marker");

        setTimeout(function () {
            $(".ts-infobox[data-ts-id='" + id + "']").closest(".infobox-wrapper").addClass("ts-show");

            $(".ts-infobox[data-ts-id='" + id + "'] .ts-close").on("click", function () {
                $(".ts-infobox[data-ts-id='" + id + "']").closest(".infobox-wrapper").removeClass("ts-show");
                $(parentMarker._markerIcon).removeClass("ts-hide-marker");
                map.closePopup();
            });
        }, 50);

    }

    //==================================================================================================================
    // Create Infobox HTML element
    //==================================================================================================================

    function createInfoBoxHTML(parameters) {

        var i = parameters["i"];
        var infoboxHtml = parameters["infoboxHtml"];

        infoboxHtml.innerHTML =
            '<div class="infobox-wrapper">' +
            '<div class="ts-infobox" data-ts-id="' + loadedMarkersData[i]["id"] + '">' +
            '<img src=" image/infobox-close.svg" class="ts-close">' +

            ((loadedMarkersData[i]["ribbon"] !== undefined) ? '<div class="ts-ribbon">' + loadedMarkersData[i]["ribbon"] + '</div>' : "") +
            ((loadedMarkersData[i]["ribbon_corner"] !== undefined) ? '<div class="ts-ribbon-corner"><span>' + loadedMarkersData[i]["ribbon_corner"] + '</span></div>' : "") +

            '<a href="' + loadedMarkersData[i]["url"] + '" class="ts-infobox__wrapper ts-black-gradient">' +
            ((loadedMarkersData[i]["badge"] !== undefined && loadedMarkersData[i]["badge"].length > 0) ? '<div class="badge badge-dark">' + loadedMarkersData[i]["badge"] + '</div>' : "") +
            '<div class="ts-infobox__content">' +
            '<figure class="ts-item__info">' +
            ((loadedMarkersData[i]["price"] !== undefined && loadedMarkersData[i]["price"] > 0) ? '<div class="ts-item__info-badge">' + formatPrice(loadedMarkersData[i]["price"]) + '</div>' : "") +
            ((loadedMarkersData[i]["title"] !== undefined && loadedMarkersData[i]["title"].length > 0) ? '<h4>' + loadedMarkersData[i]["title"] + '</h4>' : "") +
            ((loadedMarkersData[i]["address"] !== undefined && loadedMarkersData[i]["address"].length > 0) ? '<aside><i class="fa fa-map-marker mr-2"></i>' + loadedMarkersData[i]["address"] + '</aside>' : "") +
            '</figure>' +
            additionalInfoHTML({ display: displayAdditionalInfo, i: i }) +
            '</div>' +
            '<div class="ts-infobox_image" style="background-image: url(' + loadedMarkersData[i]["marker_image"] + ')"></div>' +
            '</a>' +
            '</div>' +
            '</div>';
    }

    //==================================================================================================================
    // Create Additional Info HTML element
    //==================================================================================================================

    function additionalInfoHTML(parameters) {
        var i = parameters["i"];
        var displayParameter;

        var additionalInfoHtml = "";
        for (var a = 0; a < parameters["display"].length; a++) {
            displayParameter = parameters["display"][a];
            if (loadedMarkersData[i][displayParameter[0]] !== undefined) {
                additionalInfoHtml +=
                    '<dl>' +
                    '<dt>' + displayParameter[1] + '</dt>' +
                    '<dd>' + loadedMarkersData[i][displayParameter[0]] + ((displayParameter[a] === "area") ? unit : "") + '</dd>' +
                    '</dl>';
            }
        }
        if (additionalInfoHtml) {
            return '<div class="ts-description-lists">' + additionalInfoHtml + '</div>';
        }
        else {
            return "";
        }
    }

    //==================================================================================================================
    // Create SideBar HTML Results
    //==================================================================================================================
    function createSideBarResult() {

        //var visibleMarkersId = [];
        var visibleMarkersOnMap = [];
        var resultsHtml = [];

        for (var i = 0; i < loadedMarkersData.length; i++) {
            //visibleMarkersOnMap.push( newMarkers[i] );

            if (map.getBounds().contains(newMarkers[i].getLatLng())) {
                visibleMarkersOnMap.push(newMarkers[i]);
                //newMarkers[i].addTo(map);
            }
            else {
                //newMarkers[i].setVisible(false);
                //newMarkers[i].remove();
            }

        }

        //markerCluster.refreshClusters();

        for (i = 0; i < visibleMarkersOnMap.length; i++) {
            var id = visibleMarkersOnMap[i].loopNumber;
            var additionalInfoHtml = "";

            if (loadedMarkersData[id]["additional_info"]) {
                for (var a = 0; a < loadedMarkersData[id]["additional_info"].length; a++) {
                    additionalInfoHtml +=
                        '<dl>' +
                        '<dt>' + loadedMarkersData[id]["additional_info"][a]["title"] + '</dt>' +
                        '<dd>' + loadedMarkersData[id]["additional_info"][a]["value"] + '</dd>' +
                        '</dl>';
                }
            }

            resultsHtml.push(
                '<div class="ts-result-link" data-ts-id="' + loadedMarkersData[id]["id"] + '" data-ts-ln="' + newMarkers[id].loopNumber + '">' +
                '<span class="ts-center-marker"><img src=" image/result-center.svg"></span>' +
                '<a href="' + loadedMarkersData[id]["url"] + '" class="card ts-item ts-card ts-result">' +
                ((loadedMarkersData[id]["ribbon"] !== undefined) ? '<div class="ts-ribbon">' + loadedMarkersData[id]["ribbon"] + '</div>' : "") +
                ((loadedMarkersData[id]["ribbon_corner"] !== undefined) ? '<div class="ts-ribbon-corner"><span>' + loadedMarkersData[id]["ribbon_corner"] + '</span></div>' : "") +
                '<div href="detail-01.html" class="card-img ts-item__image" style="background-image: url(' + loadedMarkersData[id]["marker_image"] + ')"></div>' +
                '<div class="card-body">' +
                '<div class="ts-item__info-badge">' + formatPrice(loadedMarkersData[id]["price"]) + '</div>' +
                '<figure class="ts-item__info">' +
                '<h4>' + loadedMarkersData[id]["title"] + '</h4>' +
                '<aside>' +
                '<i class="fa fa-map-marker mr-2"></i>' + loadedMarkersData[id]["address"] + '</aside>' +
                '</figure>' +
                additionalInfoHTML({ display: displayAdditionalInfo, i: id }) +
                '</div>' +
                '<div class="card-footer">' +
                '<span class="ts-btn-arrow">Detail</span>' +
                '</div>' +
                '</a>' +
                '</div>'
            );

        }


        $(".ts-results-wrapper").html(resultsHtml);

        var $results = $("#ts-results").find(".ts-sly-frame");
        if ($results.hasClass("ts-loaded")) {
            $results.sly("reload");
        }
        else {
            initializeSly();
        }

        var resultsBar = $(".scroll-wrapper.ts-results__vertical-list, .scroll-wrapper.ts-results__grid");
        if ($(window).width() < 575) {
            resultsBar.find(".ts-results__vertical").css("pointer-events", "none");
            resultsBar.on("click", function () {
                $(this).addClass("ts-expanded");
                $(this).find(".ts-results__vertical").css("pointer-events", "auto");
                $("#ts-map-hero").addClass("ts-dim-map");
            });

            $("#ts-map-hero").on("click", function () {
                if (resultsBar.hasClass("ts-expanded")) {
                    resultsBar.removeClass("ts-expanded");
                    $("#ts-map-hero").removeClass("ts-dim-map");
                    resultsBar.find(".ts-results__vertical").css("pointer-events", "none");
                }
            });
        }
        else {
            resultsBar.removeClass("ts-expanded");
            resultsBar.find(".ts-results__vertical").css("pointer-events", "auto");
            $("#ts-map-hero").removeClass("ts-dim-map");
        }

    }

    // Center map on result click (Disabled)
    //==============================================================================================================

    $(document).on("click", ".ts-center-marker", function () {
        $(".ts-marker").parent().removeClass("ts-active-marker");
        map.setView(newMarkers[$(this).parent().attr("data-ts-ln")].getLatLng());
        var id = $(this).parent().attr("data-ts-id");
        $(".ts-marker[data-ts-id='" + id + "']").parent().addClass("ts-active-marker");
    });

    // Highlight marker on result hover
    //==============================================================================================================

    var timer;
    $(document).on({
        mouseenter: function () {
            var id = $(this).parent().attr("data-ts-id");
            timer = setTimeout(function () {
                $(".ts-marker").parent().addClass("ts-marker-hide");
                $(".ts-marker[data-ts-id='" + id + "']").parent().addClass("ts-active-marker");
            }, 500);
        },
        mouseleave: function () {
            clearTimeout(timer);
            $(".ts-marker").parent().removeClass("ts-active-marker").removeClass("ts-marker-hide");
        }
    }, ".ts-result");

    function formatPrice(price) {
        return Number(price).toLocaleString(locale, { style: 'currency', currency: currency }).replace(/\D\d\d$/, '');
    }


    var simpleMapId = "ts-map-simple";
    if ($("#" + simpleMapId).length) {

        mapElement = $(document.getElementById(simpleMapId));
        mapDefaultZoom = parseInt(mapElement.attr("data-ts-map-zoom"), 10);
        centerLatitude = mapElement.attr("data-ts-map-center-latitude");
        centerLongitude = mapElement.attr("data-ts-map-center-longitude");
        controls = parseInt(mapElement.attr("data-ts-map-controls"), 10);
        scrollWheel = parseInt(mapElement.attr("data-ts-map-scroll-wheel"), 10);
        leafletMapProvider = mapElement.attr("data-ts-map-leaflet-provider");
        var markerDrag = parseInt(mapElement.attr("data-ts-map-marker-drag"), 10);


        if (!mapDefaultZoom) {
            mapDefaultZoom = 14;
        }

        map = L.map(simpleMapId, {
            zoomControl: false,
            scrollWheelZoom: scrollWheel
        });
        map.setView([centerLatitude, centerLongitude], mapDefaultZoom);

        L.tileLayer(leafletMapProvider, {
            attribution: leafletAttribution,
            id: mapBoxId,
            accessToken: mapBoxAccessToken
        }).addTo(map);

        (controls === 1) ? L.control.zoom({ position: "topright" }).addTo(map) : "";

        var icon = L.icon({
            iconUrl: "image/marker-small.png",
            iconSize: [22, 29],
            iconAnchor: [11, 29]
        });

        var marker = L.marker([centerLatitude, centerLongitude], {
            icon: icon,
            draggable: markerDrag
        }).addTo(map);

    }


    function getDataItem() {
        return [
            {
                "id": 1,
                "title": "Big Luxury Apartment",
                "price": 83000,
                "category": 1,
                "marker_image": " image/img-item-thumb-01.jpg",
                "url": "detail-01.html",
                "address": "859 Stuart Street",
                "latitude": "40.70915937949638",
                "longitude": "-73.62215915393068",
                "ribbon": "<i class='fa fa-thumbs-up'></i>",
                "area": 356,
                "bedrooms": 2,
                "bathrooms": 1,
                "rooms": 1,
                "f__air_condition": 1,
                "f__microwave": 1
            },
            {
                "id": 2,
                "title": "Cozy Design Studio",
                "price": 125000,
                "category": 1,
                "marker_image": " image/img-item-thumb-02.jpg",
                "url": "detail-01.html",
                "address": "838 Keap Street",
                "latitude": "40.73934141720079",
                "longitude": "-73.68309894274904",
                "area": 720,
                "bedrooms": 1,
                "bathrooms": 3,
                "rooms": 5,
                "f__microwave": 1
            },
            {
                "id": 3,
                "title": "Family Villa",
                "price": 45900,
                "category": 2,
                "marker_image": " image/img-item-thumb-03.jpg",
                "url": "detail-01.html",
                "address": "593 Grove Place, Crawfordsville",
                "latitude": "40.69315214412725",
                "longitude": "-73.65288654040529",
                "area": 1500,
                "bedrooms": 2,
                "bathrooms": 3,
                "rooms": 8,
                "f__terrace": 1
            },
            {
                "id": 4,
                "title": "Traditional Restaurant",
                "price": 860000,
                "category": "",
                "marker_image": " image/img-item-thumb-04.jpg",
                "url": "detail-01.html",
                "address": "635 Green Street, Somerset",
                "latitude": "40.66112613393322",
                "longitude": "-73.54010501574709",
                "area": 288,
                "bedrooms": 2,
                "bathrooms": 1,
                "rooms": 1,
                "ribbon": "<i class='far fa-smile' title='Great Offer'></i>"
            },
            {
                "id": 5,
                "title": "White Cubes Resort",
                "price": 435000,
                "category": 2,
                "status": 1,
                "marker_image": " image/img-item-thumb-05.jpg",
                "url": "detail-01.html",
                "address": "189 Cumberland Walk, Fontanelle, Utah, 6343",
                "area": 600,
                "bedrooms": 3,
                "bathrooms": 2,
                "rooms": 1,
                "latitude": "40.75650784637493",
                "longitude": "-73.59074512194826"
            },
            {
                "id": 6,
                "title": "Bristol Tower Complex",
                "price": 85900,
                "additional_info": "",
                "marker_image": " image/img-item-thumb-06.jpg",
                "url": "detail-01.html",
                "address": "180 Grant Avenue, Onton",
                "ribbon": "<i class='fa fa-thumbs-up'></i>",
                "area": 1850,
                "bedrooms": 5,
                "bathrooms": 3,
                "rooms": 10,
                "latitude": "40.735049117519694",
                "longitude": "-73.5298053331299"
            },
            {
                "id": 7,
                "title": "River Apartments",
                "price": 127000,
                "marker_image": " image/img-item-thumb-07.jpg",
                "url": "detail-01.html",
                "address": "228 Hinckley Place",
                "area": 580,
                "bedrooms": 4,
                "bathrooms": 2,
                "rooms": 8,
                "latitude": "40.72217055684573",
                "longitude": "-73.44139972399904"
            },
            {
                "id": 8,
                "title": "Apartment For Rent",
                "price": 125,
                "category": 1,
                "status": 2,
                "marker_image": " image/img-item-thumb-08.jpg",
                "url": "detail-01.html",
                "address": "871 Central Avenue, Freelandville",
                "latitude": "40.690288655835346",
                "longitude": "-73.7107364244385",
                "badge": "Rent",
                "area": 368,
                "bedrooms": 4,
                "bathrooms": 2,
                "rooms": 2,
                "additional_info": [
                    {
                        "title": "Area",
                        "value": "87m<sup>2</sup>"
                    },
                    {
                        "title": "Rooms",
                        "value": "3"
                    },
                    {
                        "title": "Pets",
                        "value": "Allowed"
                    }
                ]
            },
            {
                "id": 9,
                "title": "White Scapes Complex",
                "price": 168500,
                "marker_image": " image/img-item-thumb-09.jpg",
                "url": "detail-02.html",
                "address": "326 Mill Lane, Montura",
                "ribbon_corner": "New Listing",
                "area": 310,
                "bedrooms": 4,
                "bathrooms": 2,
                "rooms": 3,
                "latitude": "40.682348340127156",
                "longitude": "-73.584393651001"
            },
            {
                "id": 10,
                "title": "New Studio for Rent",
                "status": 2,
                "price": 240,
                "marker_image": " image/img-item-thumb-10.jpg",
                "url": "detail-03.html",
                "address": "230 High Street, Cumminsville",
                "latitude": "40.70148159217449",
                "longitude": "-73.448654666613771",
                "area": 190,
                "bedrooms": 4,
                "bathrooms": 2,
                "rooms": 3,
                "badge": "Rent"
            },
            {
                "id": 11,
                "title": "High Side Resort",
                "price": 250200,
                "marker_image": " image/img-item-thumb-11.jpg",
                "url": "detail-01.html",
                "address": "558 Ellery Street, Bellamy",
                "latitude": "40.666595078439435",
                "longitude": "-73.69442859362795"
            },
            {
                "id": 12,
                "title": "Coworking Offices",
                "price": 30,
                "status": 2,
                "marker_image": " image/img-item-thumb-12.jpg",
                "url": "detail-02.html",
                "address": "373 Erskine Loop, Soham, Montana",
                "latitude": "40.65096833301533",
                "longitude": "-73.61100116442873",
                "badge": "Rent",
                "area": 980,
                "bedrooms": 4,
                "bathrooms": 2,
                "rooms": 10,
                "ribbon": "<i class='fa fa-thumbs-up'></i>"
            },
            {
                "id": 13,
                "title": "Apartments Center Complex",
                "price": 89000,
                "marker_image": " image/img-item-thumb-13.jpg",
                "url": "detail-02.html",
                "address": "674 Wyona Street, Otranto",
                "area": 301,
                "bedrooms": 4,
                "bathrooms": 2,
                "rooms": 3,
                "latitude": "40.65241954519077",
                "longitude": "-73.27795745324536"
            },
            {
                "id": 14,
                "title": "Shared Office",
                "price": 180,
                "marker_image": " image/img-item-thumb-14.jpg",
                "url": "detail-01.html",
                "address": "827 Jodie Court, Osmond",
                "ribbon": 1,
                "area": 870,
                "bedrooms": 4,
                "bathrooms": 2,
                "rooms": 12,
                "latitude": "40.67818255029871",
                "longitude": "-73.44946780871584"
            },
            {
                "id": 15,
                "title": "Newly Redesigned Studio",
                "price": 45900,
                "marker_image": " image/img-item-thumb-15.jpg",
                "url": "detail-01.html",
                "address": "398 McKibbin Street, Oneida",
                "ribbon": "<i class='fa fa-thumbs-up'></i>",
                "latitude": "40.68104655877173",
                "longitude": "-73.45513263415529"
            },
            {
                "id": 16,
                "title": "Residental House on Quite Place",
                "price": 185900,
                "ribbon_corner": "50% Off",
                "marker_image": " image/img-item-thumb-16.jpg",
                "url": "detail-01.html",
                "address": "605 Dennett Place, Tooleville",
                "area": 405,
                "bedrooms": 4,
                "bathrooms": 2,
                "rooms": 10,
                "latitude": "40.70739786733858",
                "longitude": "-73.53767378821803"
            },
            {
                "id": 17,
                "title": "Spacey Apartment In Town Center",
                "price": 153000,
                "marker_image": " image/img-item-thumb-17.jpg",
                "url": "detail-02.html",
                "address": "569 Harrison Place, Lafferty",
                "area": 210,
                "bedrooms": 3,
                "bathrooms": 2,
                "rooms": 3,
                "latitude": "40.70707735514919",
                "longitude": "-73.54302325915529"
            },
            {
                "id": 18,
                "title": "Centuria Luxury Villa",
                "price": 48000,
                "marker_image": " image/img-item-thumb-18.jpg",
                "url": "detail-03.html",
                "address": "745 Louis Place, Staples, California",
                "area": 678,
                "bedrooms": 3,
                "bathrooms": 2,
                "rooms": 3,
                "latitude": "40.70499526570847",
                "longitude": "-73.53667178820803"
            },
            {
                "id": 19,
                "title": "House in the Forest",
                "price": 249000,
                "marker_image": " image/img-item-thumb-19.jpg",
                "url": "detail-01.html",
                "address": "393 Hooper Street, Rote",
                "area": 150,
                "bedrooms": 1,
                "bathrooms": 1,
                "rooms": 3,
                "latitude": "40.71670617207652",
                "longitude": "-73.51229587268068"
            },
            {
                "id": 20,
                "title": "Forest Cabin",
                "price": 119000,
                "marker_image": " image/img-item-thumb-20.jpg",
                "url": "detail-03.html",
                "address": "714 Fairview Place, Allentown",
                "area": 210,
                "bedrooms": 3,
                "bathrooms": 2,
                "rooms": 3,
                "latitude": "40.77288984931648",
                "longitude": "-73.39745441149904"
            },
            {
                "id": 21,
                "title": "Great Stone Residence",
                "price": 800000,
                "marker_image": " image/img-item-thumb-21.jpg",
                "url": "detail-03.html",
                "address": "Philadelphia, PA 19108",
                "area": 800,
                "bedrooms": 3,
                "bathrooms": 2,
                "rooms": 8,
                "latitude": "40.706817097528884",
                "longitude": "-73.58370700549318"
            },
            {
                "id": 22,
                "title": "Grocery Store",
                "price": 183000,
                "marker_image": " image/img-item-thumb-22.jpg",
                "url": "detail-03.html",
                "address": "Hanover, MD 21076",
                "area": 210,
                "bedrooms": 3,
                "bathrooms": 2,
                "rooms": 3,
                "latitude": "40.72321134118185",
                "longitude": "-73.64447513293459"
            },
            {
                "id": 23,
                "title": "Wood House",
                "price": 202000,
                "marker_image": " image/img-item-thumb-23.jpg",
                "url": "detail-01.html",
                "address": "Fayetteville, NC 28306",
                "area": 210,
                "bedrooms": 3,
                "bathrooms": 2,
                "rooms": 3,
                "latitude": "40.74181261562849",
                "longitude": "-73.562420994751"
            },
            {
                "id": 24,
                "title": "Modern Apartment",
                "price": 79800,
                "marker_image": " image/img-item-thumb-24.jpg",
                "url": "detail-02.html",
                "address": "Aitkin, MN 56431",
                "area": 210,
                "bedrooms": 3,
                "bathrooms": 2,
                "rooms": 3,
                "latitude": "40.75234669471232",
                "longitude": "-73.50594440173342"
            },
            {
                "id": 25,
                "title": "New Town Complex",
                "price": 356000,
                "marker_image": " image/img-item-thumb-25.jpg",
                "url": "detail-01.html",
                "address": "Los Alamos, NM 87544",
                "area": 740,
                "bedrooms": 3,
                "bathrooms": 2,
                "rooms": 12,
                "latitude": "40.6857328526672",
                "longitude": "-73.51675906848146"
            },
            {
                "id": 26,
                "title": "Industrial Building",
                "price": 356000,
                "url": "detail-01.html",
                "address": "Los Alamos, NM 87544",
                "area": 740,
                "bedrooms": 3,
                "bathrooms": 2,
                "rooms": 12,
                "latitude": "40.79667556663265",
                "longitude": "-73.47985187243654"
            }
        ];
    }
});