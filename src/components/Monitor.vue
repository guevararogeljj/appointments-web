<template>
  <div class="chatbot-ai-container">
    <div v-if="monitorGuidList.length > 0" class="guid-list-container">
      <h3 class="guid-title">🟢 Últimos 5 eventos de monitor recibidos:</h3>
      <ul class="guid-list">
        <li
          v-for="(item, idx) in monitorGuidList.slice(-5)"
          :key="idx"
          class="guid-item"
        >
          <span class="guid-badge">#{{ monitorGuidList.length - 4 + idx > 0 ? monitorGuidList.length - 4 + idx : idx + 1 }}</span>
          <span class="guid-value">
            <strong>{{ item.exchangeName }}</strong> — 
            <span class="counts">{{ item.counts }}</span>
            <span class="timestamp">{{ new Date(item.timestamp).toLocaleString() }}</span>
          </span>
        </li>
      </ul>
    </div>
    <div v-else class="message waiting-message">
      <span class="waiting-emoji">⏳</span> Esperando eventos del monitor...
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
    const monitorGuidList = ref<{ exchangeName: string, counts: any, timestamp: string }[]>([]);

    onMounted(async () => {
      await connection.start();
      connection.on('ReceiveQueueCounts', (exchangeName: string, counts: any, timestamp: string) => {
        console.log('[Monitor.vue] ReceiveQueueCounts recibido:', exchangeName, counts, timestamp);
        monitorGuidList.value = [];
        monitorGuidList.value.push({ exchangeName, counts, timestamp });
      });
    });

    onUnmounted(() => {
      connection.stop();
    });

    return {
      monitorGuidList
    };
  }
});
</script>

<style scoped>
.guid-list-container {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
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
  background: rgba(255,255,255,0.13);
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 12px 16px;
  color: #fff;
  font-weight: 700;
  font-size: 1.12rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.13);
  border-left: 5px solid #ffb347;
  transition: background 0.2s;
}

.guid-item:hover {
  background: rgba(255,255,255,0.22);
}

.guid-badge {
  background: #ffb347;
  color: #1e3c72;
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
  display: flex;
  flex-direction: column;
}

.counts {
  color: #ffe082;
  font-weight: bold;
  margin-left: 8px;
}

.timestamp {
  color: #b3c6ff;
  font-size: 0.95rem;
  margin-left: 8px;
}

.waiting-message {
  color: #fff;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
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
  from { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);}
  to { background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);}
}
</style>