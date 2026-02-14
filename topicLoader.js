// topicLoader.js
// Shared lazy-loader for per-topic bundles generated in data/topics/*.js
// NOTE: This file does not change UI/styles; it only centralizes data loading.

(function (global) {
  const cache = Object.create(null);
  const inflight = Object.create(null);

  /**
   * Load a topic bundle from `data/topics/<topicId>.js`.
   * The bundle is expected to set `window.currentTopicData`.
   *
   * @param {string} topicId
   * @param {{ version?: string, basePath?: string }} [opts]
   * @returns {Promise<any|null>}
   */
  async function loadTopicData(topicId, opts) {
    const options = opts || {};
    const version = options.version || '1';
    const basePath = options.basePath || 'data/topics';

    if (!/^[a-z0-9_]+$/i.test(topicId)) return null;
    if (cache[topicId]) return cache[topicId];
    if (inflight[topicId]) return inflight[topicId];

    inflight[topicId] = new Promise((resolve) => {
      const scriptId = `topic-script-${topicId}`;
      const existing = document.getElementById(scriptId);
      if (existing) {
        resolve(cache[topicId] || null);
        inflight[topicId] = null;
        return;
      }

      global.currentTopicData = null;

      const s = document.createElement('script');
      s.id = scriptId;
      s.src = `${basePath}/${topicId}.js?v=${encodeURIComponent(version)}`;
      s.onload = () => {
        cache[topicId] = global.currentTopicData || null;
        resolve(cache[topicId]);
        inflight[topicId] = null;
      };
      s.onerror = () => {
        resolve(null);
        inflight[topicId] = null;
      };

      document.head.appendChild(s);
    });

    return inflight[topicId];
  }

  function clearTopicCache(topicId) {
    if (!topicId) {
      Object.keys(cache).forEach((k) => delete cache[k]);
      return;
    }
    delete cache[topicId];
  }

  global.TopicLoader = {
    loadTopicData,
    clearTopicCache,
  };
})(window);
