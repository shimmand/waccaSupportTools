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
            's_plus' : 0,
            'ss' : 0,
            'ss_plus' : 0,
            'sss' : 0,
            'sss_plus' : 0,
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
            let stageLevelClass = stageLevel.toLowerCase().replace(' ','').replace('+','.1');

            // 譜面レベルに記載のあるもののみ処理
            if (level.indexOf(stageLevel) != -1){
                // 該当レベルの譜面数（母数）を1加算 
                result[stageLevel]['stageCount'] += 1;

                // プレイ評価のアイコンが存在する場合のみ処理
                // スコアに応じて譜面数を1加算
                if (rateIcon != 'no_rate.svg'){

                    // 900k以上？
                    if (Number(playScore) >= 900000){
                        result[stageLevel]['s'] += 1;
                        s.setAttribute(`${stageLevelClass}_rate_s`, 1);
                    } else {
                        s.setAttribute(`${stageLevelClass}_rate_s`, 0);
                    };

                    // 930k以上？
                    if (Number(playScore) >= 930000){
                        result[stageLevel]['s_plus'] += 1;
                        s.setAttribute(`${stageLevelClass}_rate_s_plus`, 1);
                    } else {
                        s.setAttribute(`${stageLevelClass}_rate_s_plus`, 0);
                    };

                    // 950k以上？
                    if (Number(playScore) >= 950000){
                        result[stageLevel]['ss'] += 1;
                        s.setAttribute(`${stageLevelClass}_rate_ss`, 1);
                    } else {
                        s.setAttribute(`${stageLevelClass}_rate_ss`, 0);
                    };

                    // 970k以上？
                    if (Number(playScore) >= 970000){
                        result[stageLevel]['ss_plus'] += 1;
                        s.setAttribute(`${stageLevelClass}_rate_ss_plus`, 1);
                    } else {
                        s.setAttribute(`${stageLevelClass}_rate_ss_plus`, 0);
                    };

                    // 980k以上？
                    if (Number(playScore) >= 980000){
                        result[stageLevel]['sss'] += 1;
                        s.setAttribute(`${stageLevelClass}_rate_sss`, 1);
                    } else {
                        s.setAttribute(`${stageLevelClass}_rate_sss`, 0);
                    };

                    // 990k以上？
                    if (Number(playScore) >= 990000){
                        result[stageLevel]['sss_plus'] += 1;
                        s.setAttribute(`${stageLevelClass}_rate_sss_plus`, 1);
                    } else {
                        s.setAttribute(`${stageLevelClass}_rate_sss_plus`, 0);
                    };
                };

                // コンボ評価に応じて譜面数を1加算
                if (achieveIcon != 'no_achieve.svg'){
                    if (Number(String(achieveIcon).match(/[0-9]+/g)) >= 1){
                        result[stageLevel]['clear'] += 1;
                        s.setAttribute(`${stageLevelClass}_clear`, 1);
                    } else {
                        s.setAttribute(`${stageLevelClass}_clear`, 0);
                    };

                    if (Number(String(achieveIcon).match(/[0-9]+/g)) >= 2){
                        result[stageLevel]['missless'] += 1;
                        s.setAttribute(`${stageLevelClass}_missless`, 1);
                    } else {
                        s.setAttribute(`${stageLevelClass}_missless`, 0);
                    };

                    if (Number(String(achieveIcon).match(/[0-9]+/g)) >= 3){
                        result[stageLevel]['fullcombo'] += 1;
                        s.setAttribute(`${stageLevelClass}_fullcombo`, 1);
                    } else {
                        s.setAttribute(`${stageLevelClass}_fullcombo`, 0);
                    };

                    if (Number(String(achieveIcon).match(/[0-9]+/g)) == 4){
                        result[stageLevel]['allmarvelous'] += 1;
                        s.setAttribute(`${stageLevelClass}_allmarvelous`, 1);
                    } else {
                        s.setAttribute(`${stageLevelClass}_allmarvelous`, 0);
                    };
                };
            };
            
        });

    });

    // 集計結果をもとにHTMLのコードを生成
    let insertCode = '';
    level.forEach(function(l){
        const success = ` style="color: deeppink; font-weight: bold;"`;
        let
            difficulty = '',
            stageLevel = l,
            stageCount = result[l]['stageCount'],
            rateS = result[l]['s'],
            styleS = '',
            rateSP = result[l]['s_plus'],
            styleSP = '',
            rateSS = result[l]['ss'],
            styleSS = '',
            rateSSP = result[l]['ss_plus'],
            styleSSP = '',
            rateSSS = result[l]['sss'],
            styleSSS = '',
            rateSSSP = result[l]['sss_plus'],
            styleSSSP = '',
            clear = result[l]['clear'],
            styleClear = '',
            missless = result[l]['missless'],
            styleMissless = '',
            fullcombo = result[l]['fullcombo'],
            styleFullcombo = '',
            allmarvelous = result[l]['allmarvelous'],
            styleAllmarvelous = '',
            stageLevelClass = stageLevel.toLowerCase().replace(' ','').replace('+','.1'),
            click = '';

        // INFERNO
        if (l.indexOf('INFERNO') != -1){
            difficulty = 'inferno';
            click = `document.querySelector('#isInferno').click();`;
        } else {
            difficulty = 'expert';
            click = `document.querySelector('#isExpert').click();`;
        };

        if (stageCount == rateS) styleS = success;

        if (stageCount == rateSP) styleSP = success;

        if (stageCount == rateSS) styleSS = success;

        if (stageCount == rateSSP) styleSSP = success;

        if (stageCount == rateSSS) styleSSS = success;

        if (stageCount == rateSSSP) styleSSSP = success;

        if (stageCount == clear) styleClear = success;

        if (stageCount == missless) styleMissless = success;

        if (stageCount == fullcombo) styleFullcombo = success;

        if (stageCount == allmarvelous) styleAllmarvelous = success;

        if (insertCode != '') insertCode += '\n';

        insertCode +=  `
            <div class="playdata__playerdata">
                <div class="playdata__score-point">
                    <div class="diff_icon_${difficulty}" style="line-height: 30px; margin: 0 0 4px; width: auto;">${stageLevel}</div>
                    <ul class="playdata__score-point__wrap">
                        <li>
                            <div>
                                <img src="/img/web/play_data/icon/c_txt_clear.png">
                            </div>
                            <a onclick="javascript:${click} grid.filter(function (item) { var element = item.getElement(); return element.getAttribute('${stageLevelClass}_clear') == document.querySelectorAll('input.filter-option')[0].checked}); location.href = '#isNormal'">
                                <p class="score-point__difficulty difficulty__all is-show"${styleClear}>${clear}/
                                    <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                                </p>
                            </a>
                        </li>

                        <li class="rate">
                            <div>
                                <img src="/img/web/play_data/icon/c_txt_s.png">
                            </div>
                            <a onclick="javascript:${click} grid.filter(function (item) { var element = item.getElement(); return element.getAttribute('${stageLevelClass}_rate_s') == document.querySelectorAll('input.filter-option')[0].checked}); location.href = '#isNormal'">
                                <p class="score-point__difficulty difficulty__all is-show"${styleS}>${rateS}/
                                    <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                                </p>
                            </a>
                        </li>

                        <li class="rate">
                            <div>
                                <img src="/img/web/play_data/icon/c_txt_s_plus.png">
                            </div>
                            <a onclick="javascript:${click} grid.filter(function (item) { var element = item.getElement(); return element.getAttribute('${stageLevelClass}_rate_s_plus') == document.querySelectorAll('input.filter-option')[0].checked}); location.href = '#isNormal'">
                                <p class="score-point__difficulty difficulty__all is-show"${styleSP}>${rateSP}/
                                    <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                                </p>
                            </a>
                        </li>

                        <li>
                            <div>
                                <img src="/img/web/play_data/icon/c_txt_missless.png">
                            </div>
                            <a onclick="javascript:${click} grid.filter(function (item) { var element = item.getElement(); return element.getAttribute('${stageLevelClass}_missless') == document.querySelectorAll('input.filter-option')[0].checked}); location.href = '#isNormal'">
                                <p class="score-point__difficulty difficulty__all is-show"${styleMissless}>${missless}/
                                    <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                                </p>
                            </a>
                        </li>

                        <li class="rate">
                            <div>
                                <img src="/img/web/play_data/icon/c_txt_ss.png">
                            </div>
                            <a onclick="javascript:${click} grid.filter(function (item) { var element = item.getElement(); return element.getAttribute('${stageLevelClass}_rate_ss') == document.querySelectorAll('input.filter-option')[0].checked}); location.href = '#isNormal'">
                                <p class="score-point__difficulty difficulty__all is-show"${styleSS}>${rateSS}/
                                    <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                                </p>
                            </a>
                        </li>

                        <li class="rate">
                            <div>
                                <img src="/img/web/play_data/icon/c_txt_ss_plus.png">
                            </div>
                            <a onclick="javascript:${click} grid.filter(function (item) { var element = item.getElement(); return element.getAttribute('${stageLevelClass}_rate_ss_plus') == document.querySelectorAll('input.filter-option')[0].checked}); location.href = '#isNormal'">
                                <p class="score-point__difficulty difficulty__all is-show"${styleSSP}>${rateSSP}/
                                    <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                                </p>
                            </a>
                        </li>

                        <li>
                            <div>
                                <img src="/img/web/play_data/icon/c_txt_full.png">
                            </div>
                            <a onclick="javascript:${click} grid.filter(function (item) { var element = item.getElement(); return element.getAttribute('${stageLevelClass}_fullcombo') == document.querySelectorAll('input.filter-option')[0].checked}); location.href = '#isNormal'">
                                <p class="score-point__difficulty difficulty__all is-show"${styleFullcombo}>${fullcombo}/
                                    <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                                </p>
                            </a>
                        </li>

                        <li class="rate">
                            <div>
                                <img src="/img/web/play_data/icon/c_txt_sss.png">
                            </div>
                            <a onclick="javascript:${click} grid.filter(function (item) { var element = item.getElement(); return element.getAttribute('${stageLevelClass}_rate_sss') == document.querySelectorAll('input.filter-option')[0].checked}); location.href = '#isNormal'">
                                <p class="score-point__difficulty difficulty__all is-show"${styleSSS}>${rateSSS}/
                                    <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                                </p>
                            </a>
                        </li>

                        <li class="rate">
                            <div>
                                <img src="/img/web/play_data/icon/c_txt_sss_plus.png">
                            </div>
                            <a onclick="javascript:${click} grid.filter(function (item) { var element = item.getElement(); return element.getAttribute('${stageLevelClass}_rate_sss_plus') == document.querySelectorAll('input.filter-option')[0].checked}); location.href = '#isNormal'">
                                <p class="score-point__difficulty difficulty__all is-show"${styleSSSP}>${rateSSSP}/
                                    <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                                </p>
                            </a>
                        </li>
                        
                        <li>
                            <div>
                                <img src="/img/web/play_data/icon/c_txt_all_m.png">
                            </div>
                            <a onclick="javascript:${click} grid.filter(function (item) { var element = item.getElement(); return element.getAttribute('${stageLevelClass}_allmarvelous') == document.querySelectorAll('input.filter-option')[0].checked}); location.href = '#isNormal'">
                                <p class="score-point__difficulty difficulty__all is-show"${styleAllmarvelous}>${allmarvelous}/
                                    <span class="score-point__difficulty difficulty__all is-show">${stageCount}</span>
                                </p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr>`;
    });

    // 集計結果を挿入
    document.querySelector('div.playdata__filter-btn').insertAdjacentHTML('beforebegin', insertCode);

    const info = `<div style="text-align: center; font-size: 0.8em;">
                    <p style="font-weight: bold;">達成状況ビューアー</p>
                    <p>各項目の譜面数をタップすると、譜面の一覧でフィルターが適用され、該当の譜面のみが表示されます。</p>
                    <p>フィルターの条件は、以下の「フィルター設定」で変更することができます。</p>
                    <p>難易度タブを切り替えたり、デフォルトの「フィルタ」ボタンでフィルターを適用したりすると、前述のフィルターは解除されます。</p>
                    <hr>
                    <p style="font-weight: bold;">フィルター設定</p>
                    <input type="radio" id="achieved" name="filter-option" class="filter-option" checked>
                    <label for="achieved">達成済みの譜面を表示</label>
                    <input type="radio" id="unachieved" name="filter-option" class="filter-option">
                    <label for="unachieved">未達成の譜面を表示</label>
                    <p>上記のラジオボタンを変更すると、この後に譜面数をタップした時から反映されます。</p>
                </div>
                <hr>`;
    document.querySelector('div.contents-wrap').insertAdjacentHTML('afterbegin', info);
};
