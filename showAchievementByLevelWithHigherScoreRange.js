export function main(){

    // セレクタ用のパラメーター（難易度）
    const difficulty = [
        'normal',
        'hard',
        'expert',
        'inferno'
    ];

    // 譜面レベルの一覧と並び。今後難易度が増えた場合にはここへ追記する。
    const level = [
        'INFERNO 14',
        'INFERNO 13+',
        'INFERNO 13',
        'EXPERT 14',
        'EXPERT 13+',
        'EXPERT 13',
        'EXPERT 12+',
        'EXPERT 12',
        'EXPERT 11+',
        'EXPERT 11',
        'EXPERT 10+',
        'EXPERT 10',
        'EXPERT 9+',
        'EXPERT 9'
    ];

    // 集計結果を入れるための配列
    let result = {};

    // 配列の準備
    level.forEach(function(l){
        result[l] = {
            'stageCount' : 0,
            's' : 0,
            'ss' : 0,
            'sss' : 0,
            '990k' : 0,
            '995k' : 0,
            'clear' : 0,
            'missless' : 0,
            'fullcombo' : 0,
            'allmarvelous' : 0
        }
    });

    // 楽曲リストを取得
    let songNode = document.querySelectorAll('li.item');

    // 楽曲リスト内で繰り返す
    songNode.forEach(function(s){
        difficulty.forEach(function(d){
            // '!d!'は難易度。難易度ごとに別のクラス名となっているため、パラメーター式にノードを選択する。
            let stageLevel = String(s.querySelector(String('div.difficulty__!d! div.playdata__score-list__song-info__lv').replace('!d!', d)).innerText).trim();
            let playScore = s.querySelector(String('div.difficulty__!d! div.playdata__score-list__song-info__score').replace('!d!', d)).innerText.match(/[0-9]+/g);
            let rateIcon = s.querySelectorAll(String('div.score__icon__!d! img').replace('!d!', d))[0].src.match(/[^/]+?$/g);
            let achieveIcon = s.querySelectorAll(String('div.score__icon__!d! img').replace('!d!', d))[1].src.match(/[^/]+?$/g);
            // 譜面レベルに記載のあるもののみ処理
            if (level.indexOf(stageLevel) != -1){
                // 該当レベルの譜面数を1加算 
                result[stageLevel]['stageCount'] += 1;

                // スコア評価に応じて譜面数を1加算
                if (rateIcon != 'no_rate.svg'){
                    if (Number(String(rateIcon).match(/[0-9]+/g)) >= 7) result[stageLevel]['s'] += 1;
                    if (Number(String(rateIcon).match(/[0-9]+/g)) >= 8) result[stageLevel]['ss'] += 1;
                    if (Number(String(rateIcon).match(/[0-9]+/g)) >= 9) result[stageLevel]['sss'] += 1;
                    if (Number(playScore) >= 990000) result[stageLevel]['990k'] += 1;
                    if (Number(playScore) >= 995000) result[stageLevel]['995k'] += 1
                };

                // コンボ評価に応じて譜面数を1加算
                if (achieveIcon != 'no_achieve.svg'){
                    if (Number(String(achieveIcon).match(/[0-9]+/g)) >= 1) result[stageLevel]['clear'] += 1;
                    if (Number(String(achieveIcon).match(/[0-9]+/g)) >= 2) result[stageLevel]['missless'] += 1;
                    if (Number(String(achieveIcon).match(/[0-9]+/g)) >= 3) result[stageLevel]['fullcombo'] += 1;
                    if (Number(String(achieveIcon).match(/[0-9]+/g)) == 4) result[stageLevel]['allmarvelous'] += 1
                };
            };
            
        });

    });

    // 集計結果をもとにHTMLのコードを生成
    let insertCode = '';
    level.forEach(function(l){
        const success = ` style="color: deeppink; font-weight: bold"`;
        let
            difficulty = '',
            stageLevel = l,
            stageCount = result[l]['stageCount'],
            rateS = result[l]['s'],
            styleS = '',
            rateSS = result[l]['ss'],
            styleSS = '',
            rateSSS = result[l]['sss'],
            styleSSS = '',
            rate990k = result[l]['990k'],
            style990k = '',
            rate995k = result[l]['995k'],
            style995k = '',
            clear = result[l]['clear'],
            styleClear = '',
            missless = result[l]['missless'],
            styleMissless = '',
            fullcombo = result[l]['fullcombo'],
            styleFullcombo = '',
            allmarvelous = result[l]['allmarvelous'],
            styleAllmarvelous = '';

        if (l.indexOf('INFERNO') != -1){
            difficulty = 'inferno'
        } else {
            difficulty = 'expert'
        };

        if (stageCount == rateS) styleS = success;

        if (stageCount == rateSS) styleSS = success;

        if (stageCount == rateSSS) styleSSS = success;

        if (stageCount == rate990k) style990k = success;

        if (stageCount == rate995k) style995k = success;

        if (stageCount == clear) styleClear = success;

        if (stageCount == missless) styleMissless = success;

        if (stageCount == fullcombo) styleFullcombo = success;

        if (stageCount == allmarvelous) styleAllmarvelous = success;

        if (insertCode != '') insertCode += '\n';

        insertCode +=  `
            <div class="playdata__playerdata">
                <div class="playdata__score-point">  
                    <ul class="playdata__score-point__wrap">
                        <li>
                            <div class="diff_icon_${difficulty}">${stageLevel}</div>
                        </li>
                        <li>
                        <div>
                            <img src="/img/web/play_data/icon/c_txt_s.png">
                        </div>
                        <p class="score-point__difficulty difficulty__all is-show"${styleS}>${rateS}/
                            <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                        </p>
                        </li>
                        <li>
                        <div>
                            <img src="/img/web/play_data/icon/c_txt_clear.png">
                        </div>
                        <p class="score-point__difficulty difficulty__all is-show"${styleClear}>${clear}/
                            <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                        </p>
                        </li>
                        <li>
                        <div>
                            <img src="/img/web/play_data/icon/c_txt_ss.png">
                        </div>
                        <p class="score-point__difficulty difficulty__all is-show"${styleSS}>${rateSS}/
                            <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                        </p>
                        </li>
                        <li>
                        <div>
                            <img src="/img/web/play_data/icon/c_txt_missless.png">
                        </div>
                        <p class="score-point__difficulty difficulty__all is-show"${styleMissless}>${missless}/
                            <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                        </p>
                        </li>
                        <li>
                        <div>
                            <img src="/img/web/play_data/icon/c_txt_sss.png">
                        </div>
                        <p class="score-point__difficulty difficulty__all is-show"${styleSSS}>${rateSSS}/
                            <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                        </p>
                        </li>
                        <li>
                        <div>
                            <img src="/img/web/play_data/icon/c_txt_full.png">
                        </div>
                        <p class="score-point__difficulty difficulty__all is-show"${styleFullcombo}>${fullcombo}/
                            <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                        </p>
                        </li>
                        <li>
                        <div>
                            <p style="color:hotpink;font-weight:bold;font-style:italic">990k</p>
                        </div>
                        <p class="score-point__difficulty difficulty__all is-show"${style990k}>${rate990k}/
                            <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                        </p>
                        </li>
                        <li>
                        <div>
                            <img src="/img/web/play_data/icon/c_txt_all_m.png">
                        </div>
                        <p class="score-point__difficulty difficulty__all is-show"${styleAllmarvelous}>${allmarvelous}/
                            <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                        </p>
                        </li>
                        <li>
                        <div>
                            <p style="color:hotpink;font-weight:bold;font-style:italic">995k</p>
                        </div>
                        <p class="score-point__difficulty difficulty__all is-show"${style995k}>${rate995k}/
                            <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                        </p>
                        </li>
                    </ul>
                </div>
            </div>
            <hr>`;
    });

    // 集計結果を挿入
    document.querySelector('div.playdata__filter-btn').insertAdjacentHTML('beforebegin', insertCode);

    // メッセージを表示
    alert('集計が完了しました。\n元に戻すには画面を更新するか、他のページへ遷移してください。');

};
