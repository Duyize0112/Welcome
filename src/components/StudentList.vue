<template>
  <div class="customer-list p-8">
    <h1 class="text-4xl font-bold text-center mb-7 mt-1">顾客列表</h1>
   
    <ul class="bg-white shadow rounded-lg overflow-hidden">
      <li class="grid grid-cols-5 bg-gray-700 text-white p-4">
        <span class="font-semibold">序号</span>
        <span class="font-semibold">顾客名称</span>
        <span class="font-semibold">性别</span>
        <span class="font-semibold">等级</span>
        <div class="font-semibold text-center">操作</div>
      </li>
      <li v-for="(customer, index) in customers" :key="customer.id" class="grid grid-cols-5 p-4 border-b border-gray-300">
        <span>{{ index + 1 }}.</span>
        <span>{{ customer.name }}</span>
        <span>{{ customer.gender }}</span>
        <span>{{ customer.level }}</span>
        <div class="flex justify-center space-x-2">
          <button class="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-900" @click="editCustomer(index)">编辑</button>
          <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700" @click="deleteCustomer(index)">删除</button>
        </div>
      </li>
    </ul>
    <div class="flex justify-center mt-6 w-full">
      <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700" @click="openAddCustomerModal">新增顾客</button>
    </div>

    <div v-if="showFlag" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white rounded-lg p-8 w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">{{isEdit ? '编辑顾客' : '新增顾客'}}</h2>
        <div class="space-y-4">
          <div class="flex flex-col">
            <label class="mb-2 font-semibold">名称</label>
            <input type="text" v-model="customerName" class="p-2 border rounded">
          </div>
          <div class="flex flex-col">
            <label class="mb-2 font-semibold">性别</label>
            <select v-model="customerGender" class="p-2 border rounded">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="mb-2 font-semibold">等级</label>
            <select v-model="customerLevel" class="p-2 border rounded">
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end space-x-2 mt-6">
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700" @click="closeModal">取消</button>
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" @click="submitFn">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';

let showFlag = ref(false);
let isEdit = ref(false);
let curIdx = ref(0);

let customerName = ref('');
let customerGender = ref('男');
let customerLevel = ref('C');
let customers = reactive(JSON.parse(localStorage.getItem('customers')) || [
  { id: 1, name: 'Alice', gender: '女', level: 'A' },
  { id: 2, name: 'Bob', gender: '男', level: 'B' },
  { id: 3, name: 'Charlie', gender: '男', level: 'C' },
]);

const saveToLocalStorage = () => {
  localStorage.setItem('customers', JSON.stringify(customers));
};

const openAddCustomerModal = () => {
  isEdit.value = false;
  customerName.value = '';
  customerGender.value = '男';
  customerLevel.value = 'C';
  showFlag.value = true;
};

const closeModal = () => {
  showFlag.value = false;
};

const deleteCustomer = index => {
  customers.splice(index, 1);
  saveToLocalStorage();
};

const editCustomer = index => {
  isEdit.value = true;
  curIdx.value = index;
  const customer = customers[index];
  customerName.value = customer.name;
  customerGender.value = customer.gender;
  customerLevel.value = customer.level;
  showFlag.value = true;
};
localStorage.removeItem('customers');
const submitFn = () => {
  if (isEdit.value) { // 编辑
    const updatedCustomer = customers.splice(curIdx.value, 1)[0];
    updatedCustomer.name = customerName.value;
    updatedCustomer.gender = customerGender.value;
    updatedCustomer.level = customerLevel.value;
    customers.unshift(updatedCustomer);
  } else { // 新增
    customers.unshift({
      id: customers.length + 1,
      name: customerName.value,
      gender: customerGender.value,
      level: customerLevel.value
    });
  }
  saveToLocalStorage();
  showFlag.value = false;
};
</script>
