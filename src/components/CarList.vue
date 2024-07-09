<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CarPage from '../components/CarPage.vue';
import MapPage from '../components/MapPage.vue';
import type { Car } from '../types/index';
import { getAllCars } from '../api/api';

const cars = ref<Car[]>([]);
const temporaryCarsStorage = ref<Car[]>([]);
const selectedValue = ref<string>('0');

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

const sortBy = () => {
  const values = selectedValue.value.split(' ');
  if (values[0] === 'asc') {
    cars.value.sort((car1, car2) =>
      values[1] === 'year' ? car1.year - car2.year : car1.price - car2.price,
    );
  }
  if (values[0] === 'desc') {
    cars.value.sort((car1, car2) =>
      values[1] === 'year' ? car2.year - car1.year : car2.price - car1.price,
    );
  }
};

onMounted(() => {
  getCars();
});
</script>

<template>
  <article class="sorting">
    <div>
      <p>Сортировать по:</p>
      <select class="select-design" @change="sortBy" v-model="selectedValue">
        <option value="0" disabled hidden>Сортировка по цене</option>
        <option value="asc price">Цена по возрастанию</option>
        <option value="desc price">Цена по убыванию</option>
        <option value="asc year">Год по возрастанию</option>
        <option value="desc year">Год по убыванию</option>
      </select>
    </div>
  </article>
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

.select-design {
  width: 288px;
  height: 40px;
  background: rgba(242, 242, 242, 1);
  padding: 0px 16px;
}
</style>
