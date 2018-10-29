<template>
  <div
    ref="map"
    class="map"
  >
  </div>
</template>

<script>
  import GoogleMapsLoader from 'google-maps';

  export default {
    props: {
      coordinates: {
        type: Object,
        default() {
          return {
            lat: 38.2569643,
            lng: -85.7609778
          };
        }
      },
      zoom: {
        type: Number,
        default() {
          return 15;
        }
      },
      showMarker: {
        type: Boolean,
        default() {
          return true;
        }
      }
    },
    created() {
      // Don't load map script on prerender
      if (window.prerender) {
        return;
      }

      // TODO: update key and styles
      GoogleMapsLoader.KEY = 'AIzaSyBGUow8w0k9wkWUGgOJv63m8_PFDjOrBWk';
      GoogleMapsLoader.VERSION = '3.34';
      GoogleMapsLoader.load((google) => {
        /* eslint no-new: 0 */
        /* eslint quote-props: 0 */
        const map = new google.maps.Map(
          this.$refs.map,
          {
            center: this.coordinates,
            zoom: this.zoom,
            disableDefaultUI: true,
            styles: [
              {
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#212121'
                  }
                ]
              },
              {
                'elementType': 'labels.icon',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#757575'
                  }
                ]
              },
              {
                'elementType': 'labels.text.stroke',
                'stylers': [
                  {
                    'color': '#212121'
                  }
                ]
              },
              {
                'featureType': 'administrative',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#757575'
                  },
                  {
                    'weight': 1.5
                  }
                ]
              },
              {
                'featureType': 'administrative.country',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#9e9e9e'
                  }
                ]
              },
              {
                'featureType': 'administrative.land_parcel',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'featureType': 'administrative.locality',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#bdbdbd'
                  }
                ]
              },
              {
                'featureType': 'poi',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#757575'
                  }
                ]
              },
              {
                'featureType': 'poi.park',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#181818'
                  }
                ]
              },
              {
                'featureType': 'poi.park',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#616161'
                  }
                ]
              },
              {
                'featureType': 'poi.park',
                'elementType': 'labels.text.stroke',
                'stylers': [
                  {
                    'color': '#1b1b1b'
                  }
                ]
              },
              {
                'featureType': 'road',
                'elementType': 'geometry.fill',
                'stylers': [
                  {
                    'color': '#5a5c5e'
                  }
                ]
              },
              {
                'featureType': 'road',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#8a8a8a'
                  }
                ]
              },
              {
                'featureType': 'road.arterial',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#5a5c5e'
                  }
                ]
              },
              {
                'featureType': 'road.highway',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#8a8d8e'
                  }
                ]
              },
              {
                'featureType': 'road.highway.controlled_access',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#8a8d8e'
                  }
                ]
              },
              {
                'featureType': 'road.local',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#fbe1ad'
                  }
                ]
              },
              {
                'featureType': 'transit',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#757575'
                  }
                ]
              },
              {
                'featureType': 'water',
                'elementType': 'geometry',
                'stylers': [
                  {
                    'color': '#0f0f0f'
                  }
                ]
              },
              {
                'featureType': 'water',
                'elementType': 'labels.text.fill',
                'stylers': [
                  {
                    'color': '#fbe1ad'
                  }
                ]
              }
            ]
          }
        );

        if (this.showMarker) {
          new google.maps.Marker({
            position: this.coordinates,
            map,
            icon: {
              url: '/static/images/map-marker.svg',
              scaledSize: new google.maps.Size(42, 42)
            }
          });
        }
      });
    },
    methods: {
      handleMapResize() {
        setTimeout(() => {
          GoogleMapsLoader.load((google) => {
            google.maps.event.trigger(this.$refs.map, 'resize');
          });
        }, 500);
      }
    }
  };
</script>
