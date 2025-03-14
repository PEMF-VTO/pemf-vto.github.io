document.addEventListener('DOMContentLoaded', function() {
    // 初始化每个视频的控制器
    initVideoController('ours_demo', 'ours_playPauseBtn', 'ours_progressBar', 'ours_progress', 'ours_timeDisplay');
    initVideoController('vivid_demo', 'vivid_playPauseBtn', 'vivid_progressBar', 'vivid_progress', 'vivid_timeDisplay');
    initVideoController('tiktok_demo', 'tiktok_playPauseBtn', 'tiktok_progressBar', 'tiktok_progress', 'tiktok_timeDisplay');
  
    function initVideoController(videoId, playPauseBtnId, progressBarId, progressId, timeDisplayId) {
      const video = document.getElementById(videoId);
      const playPauseBtn = document.getElementById(playPauseBtnId);
      const progressBar = document.getElementById(progressBarId);
      const progress = document.getElementById(progressId);
      const timeDisplay = document.getElementById(timeDisplayId);
  
      // 播放/暂停按钮点击事件
      playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
          video.play();
          playPauseBtn.textContent = '⏸'; // 暂停符号
        } else {
          video.pause();
          playPauseBtn.textContent = '▶'; // 播放符号
        }
      });
  
      // 更新进度条和时间显示
      video.addEventListener('timeupdate', function() {
        const progressPercent = (video.currentTime / video.duration) * 100;
        progress.style.width = progressPercent + '%';
  
        const currentTime = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
      });
  
      // 点击进度条跳转到指定时间
      progressBar.addEventListener('click', function(event) {
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = (event.clientX - rect.left) / rect.width;
        video.currentTime = clickPosition * video.duration;
      });
  
      // 格式化时间（秒转换为分钟:秒）
      function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${pad(minutes)}:${pad(secs)}`;
      }
  
      // 补零函数
      function pad(num) {
        return num < 10 ? `0${num}` : num;
      }
    }
  });