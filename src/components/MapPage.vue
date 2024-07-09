<script setup lang="ts">
import { shallowRef } from 'vue';
import type { YMap } from '@yandex/ymaps3-types';
import type { Car } from '../types/index';
import { getAllCars } from '../api/api';
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
} from 'vue-yandex-maps';
import type { LngLat } from '@yandex/ymaps3-types';
import { ref, onMounted } from 'vue';

//Можно использовать для различных преобразований
const map = shallowRef<null | YMap>(null);
const cars = ref<Car[]>([]);
const temporaryCarsStorage = ref<Car[]>([]);

const getCars = async () => {
  getAllCars().then((result: Car[]) => {
    console.log(result);
    cars.value = result;
    temporaryCarsStorage.value = result;
    console.log(cars.value);
    console.log(temporaryCarsStorage.value);
  });
};

const markers = [
  {
    coordinates: [37.623, 55.752] as LngLat,
  },
  {
    coordinates: [38.125, 55.622] as LngLat,
  },
  {
    coordinates: [37.295, 55.415] as LngLat,
  },
];

const convertToCoordinates = (car: Car): LngLat => {
  const coordinates: LngLat = [car.latitude, car.longitude];
  console.log(coordinates);
  console.log(typeof coordinates);
  return coordinates;
};

onMounted(() => {
  getCars();
});
</script>

<template>
  <yandex-map
    v-model="map"
    :settings="{
      location: {
        center: [37.617644, 55.755819],
        zoom: 9,
      },
    }"
    width="100%"
    height="500px"
  >
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />

    <yandex-map-marker
      v-for="car in cars"
      :key="car.model"
      position="top-center left-center"
      :settings="{ coordinates: convertToCoordinates(car) }"
    >
      <img alt="car.model" class="pin" src="../components/icons/geo.svg" />
    </yandex-map-marker>
  </yandex-map>
</template>

<style scoped>
.pin {
  cursor: pointer;
  max-width: unset;
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
</style>
