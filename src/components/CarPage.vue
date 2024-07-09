<script setup lang="ts">
import type { Car } from '../types/index';
import { ref } from 'vue';

interface Props {
  car: Car;
}

const props = defineProps<Props>();

const editModel = ref<string>('');
const editName = ref<string>('');
const editPrice = ref<number>(1);
const isEditCar = ref<boolean>(false);

interface Emits {
  (e: 'deleteCar', value: number): void;
  (e: 'editCar', id: number, model: string, name: string, price: number): void;
}

const emit = defineEmits<Emits>();

const deleteCarHandler = (id: number) => {
  emit('deleteCar', id);
};

const editCarHandler = () => {
  isEditCar.value = true;
  editModel.value = props.car.model;
  editName.value = props.car.name;
  editPrice.value = props.car.price;
};

const saveEditedCarHandler = (
  id: number,
  model: string,
  name: string,
  price: number,
) => {
  emit('editCar', id, model, name, price);
  isEditCar.value = false;
};
</script>

<template>
  <article class="car">
    <div v-if="!isEditCar" class="details">
      <section class="left_content">
        <div>Цвет:</div>
        <div>Модель:</div>
        <div>Название:</div>
        <div>Цена:</div>
        <div>Год:</div>
      </section>
      <section class="right_content">
        <div>{{ car.color }}</div>
        <div>{{ car.model }}</div>
        <div>{{ car.name }}</div>
        <div>{{ car.price }}</div>
        <div>{{ car.year }}</div>
      </section>
    </div>
    <div v-if="!isEditCar" class="car_btns">
      <div class="edit" @click="editCarHandler"></div>
      <div class="delete" @click="deleteCarHandler(props.car.id)"></div>
    </div>
    <div v-if="isEditCar" class="fieldsForEdit">
      <a-input
        class="editCar"
        v-model:value="editModel"
        placeholder="введите данные"
        allow-clear
      />
      <a-input
        class="editCar"
        v-model:value="editName"
        placeholder="введите данные"
        allow-clear
      />
      <a-input
        class="editCar"
        type="number"
        onkeydown="return event.keyCode !== 69"
        min="1"
        v-model:value="editPrice"
        placeholder="введите данные"
        allow-clear
      />
      <a-button
        type="primary"
        @click="
          saveEditedCarHandler(props.car.id, editModel, editName, editPrice)
        "
        >Сохранить</a-button
      >
    </div>
  </article>
</template>

<style scoped>
.car_btns {
  display: flex;
  flex-direction: row;
}

.car_btns :first-child {
  margin-right: 15px;
}

.car_btns div {
  cursor: pointer;
}

.edit {
  width: 40px;
  height: 40px;
  background-image: url(../assets/images/edit.png);
}

.delete {
  width: 40px;
  height: 40px;
  background-image: url(../assets/images/delete.jpeg);
  border-radius: 7px;
}

.fields {
  width: 318px;
  height: 40px;
  padding: 10px;
  outline: none;
  background: white;
  margin: 10px;
}

.car {
  width: 357px;
  height: 314px;
  border-radius: 16px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
  margin: 15px;
}

.details {
  margin: 14px 0px;
  display: flex;
  flex-direction: row;
}

.right_content {
  margin-left: 30px;
  color: rgba(129, 137, 163, 1);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  vertical-align: middle;
}

.left_content {
  color: rgba(38, 44, 64, 1);
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  vertical-align: middle;
}

.left_content div,
.right_content div {
  margin-bottom: 15px;
}

.fieldsForEdit {
  text-align: center;
}

.editCar {
  margin-bottom: 10px;
}
</style>
