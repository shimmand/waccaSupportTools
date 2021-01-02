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

    // 挿入するHTMLの雛形
    const template = `
    <div class="playdata__playerdata">
        <div class="playdata__score-point">  
            <ul class="playdata__score-point__wrap">
                <li>
                    <div class="diff_icon_!difficulty!">!stageLevel!</div>
                </li>
                <li>
                <div>
                    <img src="/img/web/play_data/icon/c_txt_s.png">
                </div>
                <p class="score-point__difficulty difficulty__all is-show">!s!/
                    <span class="score-point__difficulty difficulty__all is-show">!stageCount!</span>
                </p>
                </li>
                <li>
                <div>
                    <img src="/img/web/play_data/icon/c_txt_clear.png">
                </div>
                <p class="score-point__difficulty difficulty__all is-show">!clear!/
                    <span class="score-point__difficulty difficulty__all is-show">!stageCount!</span>
                </p>
                </li>
                <li>
                <div>
                    <img src="/img/web/play_data/icon/c_txt_ss.png">
                </div>
                <p class="score-point__difficulty difficulty__all is-show">!ss!/
                    <span class="score-point__difficulty difficulty__all is-show">!stageCount!</span>
                </p>
                </li>
                <li>
                <div>
                    <img src="/img/web/play_data/icon/c_txt_missless.png">
                </div>
                <p class="score-point__difficulty difficulty__all is-show">!missless!/
                    <span class="score-point__difficulty difficulty__all is-show">!stageCount!</span>
                </p>
                </li>
                <li>
                <div>
                    <img src="/img/web/play_data/icon/c_txt_sss.png">
                </div>
                <p class="score-point__difficulty difficulty__all is-show">!sss!/
                    <span class="score-point__difficulty difficulty__all is-show">!stageCount!</span>
                </p>
                </li>
                <li>
                <div>
                    <img src="/img/web/play_data/icon/c_txt_full.png">
                </div>
                <p class="score-point__difficulty difficulty__all is-show">!fullcombo!/
                    <span class="score-point__difficulty difficulty__all is-show">!stageCount!</span>
                </p>
                </li>
                <li>
                <div>
                    <p style="color:hotpink;font-weight:bold;font-style:italic">990k</p>
                </div>
                <p class="score-point__difficulty difficulty__all is-show">!990k!/
                    <span class="score-point__difficulty difficulty__all is-show">!stageCount!</span>
                </p>
                </li>
                <li>
                <div>
                    <img src="/img/web/play_data/icon/c_txt_all_m.png">
                </div>
                <p class="score-point__difficulty difficulty__all is-show">!allmarvelous!/
                    <span class="score-point__difficulty difficulty__all is-show">!stageCount!</span>
                </p>
                </li>
                <li>
                <div>
                    <p style="color:hotpink;font-weight:bold;font-style:italic">995k</p>
                </div>
                <p class="score-point__difficulty difficulty__all is-show">!995k!/
                    <span class="score-point__difficulty difficulty__all is-show">!stageCount!</span>
                </p>
                </li>
            </ul>
        </div>
    </div>
    <hr>`;

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
        let tmp = template;
        if (l.indexOf('INFERNO') != -1){
            tmp = tmp.replaceAll('!difficulty!', 'inferno')
        } else {
            tmp = tmp.replaceAll('!difficulty!', 'expert')
        };
        tmp = tmp.replaceAll('!stageLevel!', l);
        tmp = tmp.replaceAll('!stageCount!', result[l]['stageCount']);
        tmp = tmp.replaceAll('!s!', result[l]['s']);
        tmp = tmp.replaceAll('!ss!', result[l]['ss']);
        tmp = tmp.replaceAll('!sss!', result[l]['sss']);
        tmp = tmp.replaceAll('!990k!', result[l]['990k']);
        tmp = tmp.replaceAll('!995k!', result[l]['995k']);
        tmp = tmp.replaceAll('!clear!', result[l]['clear']);
        tmp = tmp.replaceAll('!missless!', result[l]['missless']);
        tmp = tmp.replaceAll('!fullcombo!', result[l]['fullcombo']);
        tmp = tmp.replaceAll('!allmarvelous!', result[l]['allmarvelous']);
        if (insertCode != '') insertCode += '\n';
        insertCode += tmp
    });

    // 集計結果を挿入
    document.querySelector('div.playdata__filter-btn').insertAdjacentHTML('beforebegin', insertCode);

    // メッセージを表示
    alert('集計が完了しました。\n元に戻すには画面を更新するか、他のページへ遷移してください。');

};
