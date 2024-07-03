<template>
  <div class="customer-list p-8 w-[800px] mx-auto">
    <h1 class="text-4xl font-bold text-center mb-7 mt-1">读者列表</h1>
    <a-table :columns="columns" :data-source="sortedCustomers" :pagination="false" row-key="id">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            学生名称
          </span>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>{{ record.name }}</a>
        </template>
        <template v-else-if="column.key === 'gender'">
          <span>{{ record.gender }}</span>
        </template>
        <template v-else-if="column.key === 'level'">
          <a-tag :color="getLevelColor(record.level)">
            {{ record.level }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <span class="flex justify-center space-x-2">
            <a-button  type="primary" @click="editCustomer(record.id)">编辑</a-button>
            <a-button danger @click="deleteCustomer(record.id)">删除</a-button>
          </span>
        </template>
      </template>
    </a-table>
    <div class="flex justify-center mt-6 w-full">
      <a-button  @click="openAddCustomerModal">新增顾客</a-button>
    </div>

    <a-modal v-model:open="showFlag" title="读者信息" @ok="submitFn" @cancel="closeModal" ok-text="确定" cancel-text="取消">
      <div class="space-y-4">
        <div class="flex flex-col">
          <label class="mb-2 font-semibold">读者名称</label>
          <a-input v-model:value="customerName" placeholder="输入读者名称">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </div>
        <div class="flex flex-col">
          <label class="mb-2 font-semibold">性别</label>
          <a-select v-model:value="customerGender" style="width: 100%;">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </div>
        <div class="flex flex-col">
          <label class="mb-2 font-semibold">等级</label>
          <a-select v-model:value="customerLevel" style="width: 100%;">
            <a-select-option value="S">S</a-select-option>
            <a-select-option value="A">A</a-select-option>
            <a-select-option value="B">B</a-select-option>
            <a-select-option value="C">C</a-select-option>
          </a-select>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { UserOutlined, SmileOutlined } from '@ant-design/icons-vue';
import { Tag } from 'ant-design-vue';

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

const deleteCustomer = id => {
  const index = customers.findIndex(customer => customer.id === id);
  if (index !== -1) {
    customers.splice(index, 1); // 删除数据
    // 更新 id，使其连续递增
    customers.forEach((customer, idx) => {
      customer.id = idx + 1;
    });
    saveToLocalStorage(); // 保存到 localStorage
  }
};

const editCustomer = id => {
  isEdit.value = true;
  const index = customers.findIndex(customer => customer.id === id);
  if (index !== -1) {
    curIdx.value = index;
    const customer = customers[index];
    customerName.value = customer.name;
    customerGender.value = customer.gender;
    customerLevel.value = customer.level;
    showFlag.value = true;
  }
};

const submitFn = () => {
  if (isEdit.value) { // 编辑
    const updatedCustomer = customers[curIdx.value];
    updatedCustomer.name = customerName.value;
    updatedCustomer.gender = customerGender.value;
    updatedCustomer.level = customerLevel.value;
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

const levels = { S: 4, A: 3, B: 2, C: 1 };

const sortedCustomers = computed(() => {
  return [...customers].sort((a, b) => a.id - b.id);
});

const getLevelColor = (level) => {
  switch (level) {
    case 'S':
      return 'gold';
    case 'A':
      return 'green';
    case 'B':
      return 'blue';
    case 'C':
      return 'red';
    default:
      return 'default';
  }
};

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '顾客名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: '等级',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: '操作',
    key: 'action',
  },
];
</script>

