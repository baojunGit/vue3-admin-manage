<script setup lang="ts">
import { reactive, toRefs, nextTick } from 'vue';
import { successMessage } from '@/utils/message';
interface RoleItem {
	roleName?: string;
	type?: number;
	status?: number;
	desc?: string;
}
const state = reactive({
	visible: false,
	title: '',
	formRef: null,
	form: {} as RoleItem,
	rules: {
		roleName: [{ required: true, trigger: 'blur', message: '请输入角色名称' }],
		type: [{ required: true, trigger: 'blur', message: '请选择角色类型' }]
	}
});

const init = row => {
	if (row?.id) {
		state.title = '编辑';
		nextTick(() => {
			state.form = Object.assign({}, row);
		});
	} else {
		state.title = '添加';
	}
	state.visible = true;
};

const handleClose = () => {
	state.formRef.resetFields();
	state.visible = false;
};

// 声明事件
const emit = defineEmits(['refresh']);
const handleSave = () => {
	state.formRef.validate(async valid => {
		if (!valid) return;
		successMessage('模拟保存/新增成功');
		// emit子传父调用父组件事件, 有传参就逗号隔开
		emit('refresh');
		handleClose();
	});
};

const { formRef, visible, title, form, rules } = toRefs(state);

defineExpose({
	init
});
</script>

<template>
	<el-dialog
		v-model="visible"
		:title="title"
		width="500px"
		@close="handleClose"
	>
		<el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
			<el-form-item label="角色名称" prop="roleName">
				<el-input v-model.trim="form.roleName" />
			</el-form-item>
			<el-form-item label="角色类型" prop="type">
				<el-select v-model="form.type" style="width: 100%">
					<el-option label="非关联数据类角色" :value="0"></el-option>
					<el-option label="关联数据类角色" :value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="角色描述" prop="desc">
				<el-input v-model.trim="form.desc" />
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-radio-group v-model="form.status">
					<el-radio :label="1"> 正常 </el-radio>
					<el-radio :label="0"> 停用 </el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="handleClose"> 取 消 </el-button>
			<el-button type="primary" @click="handleSave"> 确 定 </el-button>
		</template>
	</el-dialog>
</template>

<style lang="scss" scoped></style>
