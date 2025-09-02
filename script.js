import Map from "https://js.arcgis.com/4.33/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.33/@arcgis/core/views/MapView.js";
import ImageryLayer from "https://js.arcgis.com/4.33/@arcgis/core/layers/ImageryLayer.js";
import RasterFunction from "https://js.arcgis.com/4.33/@arcgis/core/layers/support/RasterFunction.js";

/***************************************
 * Popup template for NDVI
 **************************************/
const imagePopupTemplate = {
  title: "NDVI Data from {SensorName} satellite",
  content: `
      NDVI Value: <b>{Raster.ServicePixelValue}</b>
      <br>Original Bands (B, G, R, NIR): <b>{Raster.ItemPixelValue}</b>
  `,
};

/*******************************************************************
 * Create ImageryLayer with NDVI raster function
 ******************************************************************/
const serviceRFT = new RasterFunction({
  functionName: "NDVI Colorized", // NDVI template name from Landsat 8 service
  variableName: "Raster",
});

const layer = new ImageryLayer({
  url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
  rasterFunction: serviceRFT,
  popupTemplate: imagePopupTemplate,
});

/*************************
 * Add image layer to map
 ************************/
const map = new Map({
  basemap: "hybrid",
  layers: [layer],
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-93.5, 41.5], // Midwest center (Iowa)
  zoom: 6,
  popup: {
    actions: [],
  },
});