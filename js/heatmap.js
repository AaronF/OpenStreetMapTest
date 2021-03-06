$(document).ready(function(){
	//Create a new map
	map = new OpenLayers.Map ("map", {
		controls: [
			new OpenLayers.Control.Attribution(),
		    new OpenLayers.Control.Navigation()
		],
		maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,
		                                 20037508.34,20037508.34),
		numZoomLevels: 12,
		maxResolution: 156543.0339,
		displayProjection: new OpenLayers.Projection("EPSG:4326"),
		units: 'm',
		projection: new OpenLayers.Projection("EPSG:4326")
	});

	var mapnik = new OpenLayers.Layer.OSM.Mapnik("Mapnik", {
		displayOutsideMaxExtent: true,
		wrapDateLine: true
	});
	map.addLayer(mapnik);
	map.setBaseLayer(mapnik);

	//Set the center of the map
	map.setCenter(new OpenLayers.LonLat(-0.692404, 52.301846).transform(map.displayProjection, map.getProjectionObject()), 16);

	var epsg4326 = new OpenLayers.Projection("EPSG:4326");
	var projectTo = map.getProjectionObject();

	//Heatcanvas settings
	var heatmap = new OpenLayers.Layer.HeatCanvas("HeatCanvas", map, {},
	    {'step':0.03, 'degree':HeatCanvas.QUAD, 'opacity':0.6});
	var vectorLayer = new OpenLayers.Layer.Vector("Overlay");


	// Define markers as "features" of the vector layer:
	var feature = new OpenLayers.Feature.Vector(
	        new OpenLayers.Geometry.Point( -0.692404, 52.301846).transform(epsg4326, projectTo),
	        {description:'Nationwide'} ,
	        {externalGraphic: 'img/marker_green.png', graphicHeight: 28, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	    );    
	vectorLayer.addFeatures(feature);
	heatmap.pushData(52.301846, -0.692404, 50);


	var feature = new OpenLayers.Feature.Vector(
	        new OpenLayers.Geometry.Point( -0.692015,52.301772).transform(epsg4326, projectTo),
	        {description:'Costa Coffee'} ,
	        {externalGraphic: 'img/marker_green.png', graphicHeight: 28, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	    );    
	vectorLayer.addFeatures(feature);
	heatmap.pushData(52.301772, -0.692015, 40);


	var feature = new OpenLayers.Feature.Vector(
	        new OpenLayers.Geometry.Point( -0.692046,52.300633 ).transform(epsg4326, projectTo),
	        {description:'Argos'} ,
	        {externalGraphic: 'img/marker_green.png', graphicHeight: 28, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	    );    
	vectorLayer.addFeatures(feature);
	heatmap.pushData(52.300633, -0.692046, 60);

	var feature = new OpenLayers.Feature.Vector(
	        new OpenLayers.Geometry.Point(-0.691316,52.300920).transform(epsg4326, projectTo),
	        {description:'Wilko'} ,
	        {externalGraphic: 'img/marker_green.png', graphicHeight: 28, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	    );    
	vectorLayer.addFeatures(feature);
	heatmap.pushData(52.300920, -0.691316, 95);

	var feature = new OpenLayers.Feature.Vector(
	        new OpenLayers.Geometry.Point( -0.692119, 52.301401 ).transform(epsg4326, projectTo),
	        {description:'Game'} ,
	        {externalGraphic: 'img/marker_green.png', graphicHeight: 28, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	    );    
	vectorLayer.addFeatures(feature);
	heatmap.pushData(52.301401, -0.692119, 60);

	var feature = new OpenLayers.Feature.Vector(
	        new OpenLayers.Geometry.Point( -0.691748, 52.301532 ).transform(epsg4326, projectTo),
	        {description:'Iceland'} ,
	        {externalGraphic: 'img/marker_green.png', graphicHeight: 28, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	    );    
	vectorLayer.addFeatures(feature);
	heatmap.pushData(52.301532, -0.691748, 100);

	var feature = new OpenLayers.Feature.Vector(
	        new OpenLayers.Geometry.Point( -0.689164, 52.301538 ).transform(epsg4326, projectTo),
	        {description:'Shop 1'} ,
	        {externalGraphic: 'img/marker_green.png', graphicHeight: 28, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	    );    
	vectorLayer.addFeatures(feature);
	heatmap.pushData(52.301538, -0.689164, 50);

	var feature = new OpenLayers.Feature.Vector(
	        new OpenLayers.Geometry.Point( -0.688890, 52.301515 ).transform(epsg4326, projectTo),
	        {description:'Shop 2'} ,
	        {externalGraphic: 'img/marker_green.png', graphicHeight: 28, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	    );    
	vectorLayer.addFeatures(feature);
	heatmap.pushData(52.301515, -0.688890, 40);

	var feature = new OpenLayers.Feature.Vector(
	        new OpenLayers.Geometry.Point(  -0.693471, 52.301233 ).transform(epsg4326, projectTo),
	        {description:'McDonalds'} ,
	        {externalGraphic: 'img/marker_green.png', graphicHeight: 28, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	    );    
	vectorLayer.addFeatures(feature);
	heatmap.pushData(52.301233, -0.693471, 85);

	var feature = new OpenLayers.Feature.Vector(
	        new OpenLayers.Geometry.Point( -0.695762, 52.301098 ).transform(epsg4326, projectTo),
	        {description:'Morrisons'} ,
	        {externalGraphic: 'img/marker_green.png', graphicHeight: 28, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
	    );    
	vectorLayer.addFeatures(feature);
	heatmap.pushData(52.301098, -0.695762, 180);

	map.addLayer(vectorLayer);
	map.addLayer(heatmap);

	map.addControl(new OpenLayers.Control.PanZoomBar());

	//Add a selector control to the vectorLayer with popup functions
	var controls = {
	  selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
	};


	/**
	 * Pin pop ups
	 * Used to add and remove the shop name (etc) pop ups above pins
	 */
	function createPopup(feature) {
	  feature.popup = new OpenLayers.Popup.FramedCloud("pop",
	      feature.geometry.getBounds().getCenterLonLat(),
	      null,
	      '<div class="markerContent">'+feature.attributes.description+'</div>',
	      null,
	      true,
	      function() { controls['selector'].unselectAll(); }
	  );
	  //feature.popup.closeOnMove = true;
	  map.addPopup(feature.popup);
	}

	function destroyPopup(feature) {
	  feature.popup.destroy();
	  feature.popup = null;
	}

	map.addControl(controls['selector']);
	controls['selector'].activate();
});