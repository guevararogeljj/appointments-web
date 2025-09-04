<template>
  <div class="chatbot-ai-container">
    <div v-if="monitorGuidList.length > 0" class="guid-list-container">
      <h3 class="guid-title">🟢 GUIDs de monitor recibidos:</h3>
      <ul class="guid-list">
        <li
          v-for="(guid, idx) in monitorGuidList.slice(-5)"
          :key="idx"
          class="guid-item"
        >
          <span class="guid-badge">#{{ monitorGuidList.length - 4 + idx > 0 ? monitorGuidList.length - 4 + idx : idx + 1 }}</span>
          <span class="guid-value">{{ guid }}</span>
        </li>
      </ul>
    </div>
    <div v-else class="message waiting-message">
      <span class="waiting-emoji">⏳</span> Esperando GUID del monitor...
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import connection from '../services/signalRMonitorHub';
import { onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'ChatbotKConsultores',
  setup() {
    const input = ref('');
    const messages = ref([
      { from: 'bot', text: '¡Hola! Soy tu asesor virtual de KConsultores, ¿cómo puedo ayudarte?' }
    ]);
    const monitorGuidList = ref<string[]>([]);

    onMounted(async () => {
      await connection.start();
      connection.on('MonitorGuidSent', (guid: string) => {
        monitorGuidList.value.push(guid);
        console.log('[Monitor.vue] MonitorGuidSent recibido:', guid);
      });

      connection.on('ReceiveMessage', (message: string) => {
        if (message.startsWith('Sent monitor GUID:')) {
          const guid = message.replace('Sent monitor GUID:', '').trim();
          monitorGuidList.value.push(guid);
          console.log('[Monitor.vue] ReceiveMessage con GUID:', guid);
        }
      });

      connection.on('ReceiveMonitorMessage', (data: any) => {
        console.log('[Monitor.vue] ReceiveMonitorMessage recibido:', data);
        monitorGuidList.value.push(data);
      });
    });

    onUnmounted(() => {
      connection.stop();
    });

    return {
      input,
      messages,
      monitorGuidList
    };
  }
});
</script>

<style scoped>
.guid-list-container {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  border-radius: 16px;
  padding: 18px 16px;
  box-shadow: 0 4px 18px 0 rgba(0,0,0,0.18);
  margin-bottom: 12px;
  animation: fadeIn 1s;
  max-height: 320px;
  overflow-y: auto;
}

.guid-title {
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 10px;
  text-shadow: 1px 1px 4px #00000055;
  letter-spacing: 1px;
}

.guid-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 220px;
  overflow-y: auto;
}

.guid-item {
  background: rgba(0, 255, 255, 0.15);
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 12px 16px;
  color: #fff;
  font-weight: 700;
  font-size: 1.12rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.13);
  transition: background 0.2s;
  border-left: 5px solid #00e1ff;
}

.guid-item:hover {
  background: rgba(0,255,255,0.25);
}

.guid-badge {
  background: #00e1ff;
  color: #232526;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 16px;
  font-size: 1.1rem;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.13);
}

.guid-value {
  word-break: break-all;
  font-family: 'Fira Mono', 'Consolas', monospace;
  font-size: 1.13rem;
  letter-spacing: 0.5px;
}

.waiting-message {
  color: #fff;
  background: linear-gradient(135deg, #232526 0%, #00e1ff 100%);
  border-radius: 12px;
  padding: 18px 14px;
  font-size: 1.15rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.15);
  animation: pulse 1.2s infinite alternate;
}

.waiting-emoji {
  font-size: 1.6rem;
  margin-right: 12px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}

@keyframes pulse {
  from { background: linear-gradient(135deg, #232526 0%, #00e1ff 100%);}
  to { background: linear-gradient(135deg, #00e1ff 0%, #232526 100%);}
}
</style>