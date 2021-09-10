export function main(){
    // #pushobj > section > div.contents-wrap > div.playdata__score-list > ul > li:nth-child(any)
    const songs = document.querySelectorAll('li.item');
    let scoresList = [];

    songs.forEach(e => {
        const title = e.querySelector('.playdata__score-list__song-info__name');
        const escapedTitle = title.innerText.replace(',', '__');
        const levels = e.querySelectorAll('.playdata__score-list__song-info__lv');
        const scores = e.querySelectorAll('.playdata__score-list__song-info__score');
        const pattern = /(HARD|NORMAL|EXPERT|INFERNO) [0-9]{1,2}\+*/;

        // [0: 曲名, 1: NORMALの譜面レベル, 2: NORMALのスコア]
        scoresList.push(
            [
                escapedTitle,
                levels[0].innerText.match(pattern)[0],
                parseInt(scores[0].innerText.match(/[0-9]+/))
            ]
        );

        // [0: 曲名, 1: HARDの譜面レベル, 2: HARDのスコア]
        scoresList.push(
            [
                escapedTitle,
                levels[1].innerText.match(pattern)[0],
                parseInt(scores[1].innerText.match(/[0-9]+/))
            ]
        );

        // [0: 曲名, 1: EXPERTの譜面レベル, 2: EXPERTのスコア]
        scoresList.push(
            [
                escapedTitle,
                levels[2].innerText.match(pattern)[0],
                parseInt(scores[2].innerText.match(/[0-9]+/))
            ]
        );

        // [0: 曲名, 1: INFERNOの譜面レベル, 2: INFERNOのスコア]
        scoresList.push(
            [
                escapedTitle,
                levels[3].innerText.match(pattern)[0],
                parseInt(scores[3].innerText.match(/[0-9]+/))
            ]
        );

    });

    scoresList.forEach((e, i) => {
        scoresList[i] = e.join(',');
    });

    text = 
    `<div style="text-align: left; font-size: 0.8em; padding: 20px">
        <script>
            function openMainPage(){        
                setData = document.querySelector('scoresList').innerText;
        
                if (navigator.clipboard == undefined){
                    window.clipboardData.setData('Text', setData);
                } else {
                    navigator.clipboard.writeText(setData);
                };
        
                window.open('https://shimmand.github.io/waccaSupportTools/analyzePlayData/entrance.html');
            };
        </script>
        <p style="font-weight: bold; padding: 10px 0 10px;">レーティング計算ツール v1.00</p>
        <p>スコアの収集が完了しました。</p><p>計算を開始するには、以下のボタンをクリックしてください。</p>
        <div style="padding: 10px 0 10px;">
            <button onclick="openMainPage()">ツールを開く</button>
        </div>
        <p>収集されたデータ:</p>
        <textarea style="width: 100%; height: 100px;" id="scoresList" readonly>${scoresList.join('\n')}</textarea>
    </div>`;

    parentNode = document.querySelector('.playdata__score-list');
    parentNode.insertAdjacentHTML('beforebegin', text);
    window.location.href = '#isNormal'
};