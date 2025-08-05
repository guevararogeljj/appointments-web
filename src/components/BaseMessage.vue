
<template>
  <!-- Este componente no renderiza nada, solo dispara SweetAlert2 -->
  <div style="display:none"></div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'BaseMessage',
  props: {
    message: { type: String, default: '' },
    type: {
      type: String as () => 'info' | 'success' | 'warning' | 'error',
      default: 'info',
    },
    color: { type: String, default: '' },
    modelValue: { type: Boolean, default: true },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const showAlert = () => {
      if (!props.message) return;
      Swal.fire({
        text: props.message,
        icon: props.type,
        confirmButtonColor: props.color || undefined,
        customClass: {
          popup: 'rounded-xl',
        },
      }).then(() => {
        emit('update:modelValue', false);
      });
    };

    onMounted(() => {
      if (props.modelValue && props.message) showAlert();
    });
    watch(() => props.message, (val) => {
      if (props.modelValue && val) showAlert();
    });
    watch(() => props.modelValue, (val) => {
      if (val && props.message) showAlert();
    });

    return {};
  },
});
</script>
