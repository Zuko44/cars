<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CarPage from '../components/CarPage.vue';
import MapPage from '../components/MapPage.vue';
import type { Car } from '../types/index';
import { getAllCars } from '../api/api';

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

const deleteCarHandler = (id: number) => {
  cars.value = cars.value.filter((car) => car.id !== id);
};

const editCarHandler = (
  id: number,
  model: string,
  name: string,
  price: number,
) => {
  const car = cars.value.find((car: Car) => car.id === id);
  if (car) {
    car.model = model;
    car.name = name;
    car.price = price;
  }
};

const sortByAscending = (msg: string) => {
  if (msg === 'price') {
    cars.value.sort((car1: Car, car2: Car) => car1.price - car2.price);
  } else {
    cars.value.sort((car1: Car, car2: Car) => car1.year - car2.year);
  }
};

const sortByDescending = (msg: string) => {
  if (msg === 'price') {
    cars.value.sort((car1: Car, car2: Car) => car2.price - car1.price);
  } else {
    cars.value.sort((car1: Car, car2: Car) => car2.year - car1.year);
  }
};

onMounted(() => {
  getCars();
});
</script>

<template>
  <section class="sorting">
    <a-button type="primary button" @click="sortByAscending('year')"
      >Сортировать по возрастанию года выпуска</a-button
    >
    <a-button type="primary button" @click="sortByDescending('year')"
      >Сортировать по убыванию года выпуска</a-button
    >
    <a-button type="primary button" @click="sortByAscending('price')"
      >Сортировать по возрастанию цены</a-button
    >
    <a-button type="primary button" @click="sortByDescending('price')"
      >Сортировать по убыванию цены</a-button
    >
  </section>
  <main>
    <div class="cars">
      <CarPage
        v-for="car in cars"
        :key="car.id"
        :car="car"
        @deleteCar="deleteCarHandler"
        @editCar="editCarHandler"
      />
    </div>
    <MapPage />
  </main>
</template>

<style scoped>
.sorting {
  text-align: center;
  margin: 20px;
}

.button {
  margin: 15px;
}

.cars {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
