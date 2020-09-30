window.onload = init;

const attributionControl = new ol.control.Attribution({
    collapsible: true
})

function init(){


//EPSG Code: for Italy
proj4.defs("EPSG:3003","+proj=tmerc +lat_0=0 +lon_0=9 +k=0.9996 +x_0=1500000 +y_0=0 +ellps=intl +towgs84=-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68 +units=m +no_defs");
ol.proj.proj4.register(proj4);

    const map = new ol.Map({
        view: new ol.View({
            center: [1613326.4816979854, 4818379.7166935075],
            zoom: 11,
            extent: [1603254.394, 4804178.414, 1623254.394, 4828928.414],
            projection: 'EPSG:3003'
        }),
        target:'js-map',
        controls: ol.control.defaults({attribution: false}).extend([attributionControl])
    })

     //Start&Stop Style
     const StartStyle = new ol.style.Style({
      image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color:[47, 204, 8, 1]
      }),
      radius: 4,
      stroke: new ol.style.Stroke({
        color: [0, 0, 0, 1],
        width: 0.6
      })
    })
  })

    const StopStyle = new ol.style.Style({
      image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color:[255, 42, 0, 1]
      }),
      radius: 4,
      stroke: new ol.style.Stroke({
        color: [0, 0, 0, 1],
        width: 0.6
      })
    })
  })

    const StartStopStyle = function(feature){
      let StartStoptipo = feature.get('tipo');
      if(StartStoptipo === 'S'){
        feature.setStyle([StartStyle])
      }
      if(StartStoptipo === 'P'){
        feature.setStyle([StopStyle])
      }
    }

    const StartStop = new ol.layer.VectorImage({
      source: new ol.source.Vector({
        url: './data/vector/StartStop3003.geojson',
        format: new ol.format.GeoJSON({
          dataProjection: 'EPSG:3003'
        })
      }),
      visible: true,
      title: 'StartStop',
      minZoom: 14,
      zIndex: 5,
      style: StartStopStyle
    })

      // MTB track style

        // Viola
        const ViolaStyle = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [209, 0, 181, 0.8],
            width: 6,
            lineCap: 'round',
            lineJoint: 'round'
          })
        })

        // Verde
        const VerdeStyle = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [42, 168, 25, 0.8],
            width: 6,
            lineCap: 'round',
            lineJoint: 'round'
          })
        })

        //Blu
        const BluStyle = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [28, 208, 232, 0.8],
            width: 6,
            lineCap: 'round',
            lineJoint: 'round'
          })
        })

        //Rosso
        const RossoStyle = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [242, 25, 10, 0.8],
            width: 6,
            lineCap: 'round',
            lineJoint: 'round'
          })
        })

        //Nero
        const NeroStyle = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [23, 22, 22, 0.8],
            width: 6,
            lineCap: 'round',
            lineJoint: 'round'
          })
        })

      const featureMTB = function(feature){
        let coloreMTB = feature.get('Colore');
        if (coloreMTB === 'Viola'){
          feature.setStyle([ViolaStyle])
        }
        if (coloreMTB === 'Verde'){
          feature.setStyle([VerdeStyle])
        }
        if (coloreMTB === 'Blu'){
          feature.setStyle([BluStyle])
        }
        if (coloreMTB === 'Rosso'){
          feature.setStyle([RossoStyle])
        }
        if (coloreMTB === 'Nero'){
          feature.setStyle([NeroStyle])
        }
      }

      // MTB Track
      const MTBTrack = new ol.layer.VectorImage({
        source: new ol.source.Vector({
          url: './data/vector/MTB.geojson',
          format: new ol.format.GeoJSON({
            dataProjection: 'EPSG:3003'
          })
        }),
        visible: true,
        title: 'MTB',
        zIndex: 1,
        minZoom: 13,
        style: featureMTB
      })

      
      //NumberedPath Styling
      const NumberedPathStyle = function(feature){
        //console.log(feature.get('num'));
        let NumberedPathNUM = feature.get('num');
        let NumberedPathNUMString = NumberedPathNUM.toString();
        let TextNumberedPahtStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: NumberedPathNUMString,
            scale: 0.5,
            font: 'bold 30px arial',
            fill: new ol.style.Fill({
              color: [217, 38, 7, 1]
            }),
            stroke: new ol.style.Stroke({
              color: [255, 249, 232, 1],
              width: 5
            }),
            placement: 'line',
            maxAngle: 0.4
          })
        })

        let NumberedPathLineStyle = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [237, 36, 36, 1],
            width: 3,
            lineCap: 'round',
            lineJoint: 'round'
          })
        })

        feature.setStyle([NumberedPathLineStyle, TextNumberedPahtStyle])

      }

      const NumberedPathWithNumber = new ol.layer.VectorImage({
        source: new ol.source.Vector({
          url: './data/vector/NumberedPathFull3003.geojson',
          format: new ol.format.GeoJSON({
            dataProjection: 'EPSG:3003'
          })
        }),
        visible: true,
        title: 'NumberedPath',
        zIndex: 4,
        minZoom: 13,
        style: NumberedPathStyle
      })

  
      const NumberedPathNoNumber = new ol.layer.VectorImage({
        source: new ol.source.Vector({
          url: './data/vector/NumberedPathFull3003.geojson',
          format: new ol.format.GeoJSON({
            dataProjection: 'EPSG:3003'
          })
        }),
        visible: true,
        title: 'NumberedPathNoNumber',
        zIndex: 3,
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [237, 36, 36, 1],
            width: 3,
            lineCap: 'round',
            lineJoint: 'round'
          })
        })
      })

      const ooPathStyle = function(feature){

        let ooPathString = feature.get('nome');

        let ooPathTextStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: ooPathString,
            scale: 0.5,
            font: 'bold 30px arial',
            fill: new ol.style.Fill({
              color: [217, 38, 7, 1]
            }),
            stroke: new ol.style.Stroke({
              color: [255, 249, 232, 1],
              width: 5
            }),
            placement: 'line',
            maxAngle: 0.4
          })
        })

        let ooPathLineStyle = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [237, 36, 36, 1],
            width: 3,
            lineCap: 'round',
            lineJoint: 'round'
          })
        })

        feature.setStyle([ooPathTextStyle, ooPathLineStyle])

      }

      const ooPath = new ol.layer.VectorImage({
        source: new ol.source.Vector({
          url: './data/vector/00Path3003.geojson',
          format: new ol.format.GeoJSON({
            dataProjection: 'EPSG:3003'
          })
        }),
        visible: true,
        title: 'ooPath',
        zIndex: 4,
        minZoom: 13,
        style: ooPathStyle
      })

      const ooPathNoNumber = new ol.layer.VectorImage({
        source: new ol.source.Vector({
          url: './data/vector/00Path3003.geojson',
          format: new ol.format.GeoJSON({
            dataProjection: 'EPSG:3003'
          })
        }),
        visible: true,
        title: 'ooPath',
        zIndex: 3,
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [237, 36, 36, 1],
            width: 3,
            lineCap: 'round',
            lineJoint: 'round'
          })
        })
      })

      
      const PathTrack = new ol.layer.VectorImage({
        source: new ol.source.Vector({
          url: './data/vector/PathTrack3003.geojson',
          format: new ol.format.GeoJSON({
            dataProjection: 'EPSG:3003'
          })
        }),
        visible: true,
        title: 'PathTrack',
        zIndex: 2,
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [237, 36, 36, 1],
            width: 1.7,
            lineCap: 'round',
            lineJoint: 'round',
            lineDash: [3, 3]
          })
        })
      })

    

    // Raster Layers

    const MappaSU = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: './data/raster/MappaSu.png',
            //imageExtent: [1603234.394, 4816553.414, 1623234.394, 4828928.414]
            imageExtent: [1603254.394, 4816553.414, 1623254.394, 4828928.414]
        }),
        visible: true,
        projection: 'EPGS:3003',
        title: 'MappaSU'
    })

    const MappaGIU = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: './data/raster/MappaGiu.png',
            //imageExtent: [1603234.394, 4804178.414, 1623234.394, 4816553.414]
            imageExtent: [1603254.394, 4804178.414, 1623254.394, 4816553.414]
        }),
        visible: true,
        projection: 'EPGS:3003',
        title: 'MappaGIU'
    })

      // Adding layers Group
      const layerGroup = new ol.layer.Group({
        layers:[
            MappaGIU,
            MappaSU,
            NumberedPathWithNumber,
            NumberedPathNoNumber,
            PathTrack,
            MTBTrack,
            ooPath,
            ooPathNoNumber,
            StartStop
        ]
    })
    map.addLayer(layerGroup);

    //Popup overlay
    const overlayContainerElement = document.querySelector('.overlay-container')
    const overlayLayer = new ol.Overlay({
      element: overlayContainerElement
    })
    map.addOverlay(overlayLayer);
    //connect a js const to html span
    const overlayMTBname = document.getElementById('MTB-track-name');

    // PopUp logic
    map.on('click', function(e){

      //Clear previous Popup at each click
      overlayLayer.setPosition(undefined);

      //Clear Popup html inner span
      overlayMTBname.innerHTML = '';

      //Detect feature at clicked position
      map.forEachFeatureAtPixel(e.pixel, function(feature, layer){

        //Read coordinate of clicked position
        let clickedCoordinate = e.coordinate;

        //read layer and num if present
        let clickedMTBname = feature.get('layer');

        //Display MTB Name
        if(clickedMTBname != undefined){
          overlayLayer.setPosition(clickedCoordinate);
          overlayMTBname.innerHTML = clickedMTBname;
        }
      })
    })

      // Geolocation API
  const viewProjection = map.getView().getProjection();
  const geolocation = new ol.Geolocation({
    tracking: true,
    trackingOptions: {
      enableHighAccuracy: true
    },
    projection: viewProjection
  })

  //crea l'overlay con il simbolo della posizione
  const marker = new ol.Overlay({
    element: document.getElementById('location'),
    positioning: 'center-center'
  })
  map.addOverlay(marker);
  
  //posiziona l'overlay con il simbolo della posizione
  geolocation.on('change:position', function(e){
    let geolocation = this.getPosition();
    marker.setPosition(geolocation);
  })

  //posiziona il centro della carta sulla posizione attuale
  document.getElementById('locationBtn').addEventListener('click', function(e){
    console.log('clickedBtn');
    console.log(geolocation.getPosition())
    let actualCoordinate = geolocation.getPosition();
    map.getView().setCenter(actualCoordinate);
  })

  //Lithing logic
  // onstyle
   const onStyle = function(feature){
    const styles = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: [255, 255, 255, 0.8],
          width: 10,
          lineCap: 'round',
          lineJoint: 'round'
        })
      })
    ]
    return styles
  }

  // offstyle
  const offStyle = function(feature){
    const styles = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: [255, 255, 255, 0.0],
          width: 10,
          lineCap: 'round',
          lineJoint: 'round'
        })
      })
    ]
    return styles
  }

  const onoffMTB = new ol.layer.VectorImage({
    source: new ol.source.Vector({
      url: './data/vector/onoffMtb.geojson',
      format: new ol.format.GeoJSON({
        dataProjection: 'EPSG:3003'
      })
    }),
    visible: true,
    title: 'onoffMtb',
    zIndex: 0,
    minZoom: 13,
    style: offStyle
  })
  map.addLayer(onoffMTB);


//Navigationbar logic
  const anchorNavElements = document.querySelectorAll('.onoffContainer > a');
  for(let anchorNavElement of anchorNavElements){
    anchorNavElement.addEventListener('click', function(e){
      let clickedAnchorElement = e.currentTarget;
      let clickedAnchorElementID = clickedAnchorElement.id;
      let clickedAnchorElementClass = clickedAnchorElement.className;
      let allMtbFeature = onoffMTB.getSource().getFeatures();
      console.log('a clicked');
      allMtbFeature.forEach(function(feature){
        feature.setStyle(offStyle);
      })

       if(clickedAnchorElementClass === 'on'){
          clickedAnchorElement.className = clickedAnchorElement.className.replace('on', 'off');
        }else{
          let allAnchorElements = document.querySelectorAll('.onoffContainer > a');
          allAnchorElements.forEach(element =>{
            element.className = 'off'
          });
          clickedAnchorElement.className = 'on';
          console.log(allAnchorElements);
          allMtbFeature.forEach(function(feature){
            let featureMtbColor = feature.get('Colore');
            if(clickedAnchorElementID === featureMtbColor){
              feature.setStyle(onStyle);
            }
          })
        }
    })
  }

  map.on('singleclick', function(e){
    let allMtbFeature = onoffMTB.getSource().getFeatures();
    allMtbFeature.forEach(function(feature){
      feature.setStyle(offStyle);
    })
    let allAnchorElements = document.querySelectorAll('.onoffContainer > a');
          allAnchorElements.forEach(element =>{
            element.className = 'off'
          });
  })


}