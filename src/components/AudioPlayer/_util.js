/**
 * 解决网页只播放一个音频
 * @returns {undefined}
 */
function pauseAllAudio () {
    let audios = document.getElementsByTagName('audio');
    for (let i = 0; i < audios.length; i++) {
        console.log(audios);
        audios[i].paused || audios[i].pause();
    }
}

export default pauseAllAudio;
