// いつもの
export function main() {
    // すべての譜面で繰り返す
    let titles = document.querySelectorAll('li.item');
    for( let i = 0; i < titles.length; i++ ){
        // 曲名と難易度から、譜面定数を取得
        let
            item = titles[i],
            songTitle = item.querySelector('div.playdata__rate-list__song-info__name').innerText,
            diffValue = item.querySelector('div[class*="diff_icon"]').innerText,
            ratingValue = getRatingValue( songTitle, diffValue );
        
        // 譜面定数を取得できた場合のみノード操作を実行
        if( ratingValue != '0.0' ){
            // 難易度アイコンに記載のレベルを譜面定数に置換
            item.querySelector('div[class*="diff_icon"]').innerHTML = diffValue.replace( /[0-9+]{1,3}/, ratingValue );

            // 譜面のプレイスコアを取得し、レーティング情報のDIV要素を生成
            let
                yourScore = item.querySelector('div.playdata__rate-list__song-info__score').innerText.match(/[0-9]{1,7}/),
                htmlText = getInsertHtml(ratingValue, yourScore); 
            
            // プレイスコアの直前（リスト項目中央）にレーティング情報のDIV要素を挿入
            item.querySelector('div.playdata__rate-list__song-info__score').insertAdjacentHTML( 'beforebegin', htmlText )
        }
    }
};


// レーティング情報のDIV要素を生成
function getInsertHtml( ratingValue, yourScore ) {
    // プレイスコアに応じた、譜面定数の倍率を取得
    let
        strength = getStrengthTable(),
        yourStrength = 0;

    for( let i = 0; i < strength.length; i++ ){
        if( yourStrength == 0 ){
            if( strength[i][0] <= Number(yourScore) ) yourStrength = strength[i][1]
        }
    };

    // 譜面別レーティングを算出
    let
        adjustedRating = ( yourStrength * ratingValue ).toFixed(2),
        paragStyle = '';
    
    // 譜面定数の倍率が上限値の場合、レーティング情報のフォント色を赤字に変更
    if( yourStrength == 4 ) paragStyle = 'style="color:#ff0084"'
    
    // DIV要素のHTMLを生成
    return [
        '<div class="playdata__rate-list__song-info__score">',
            '<span class="song-score">RATE ' + yourStrength.toFixed(2) + 'x</span>',
            '<p ' + paragStyle + '>' + adjustedRating.toString() + '</p>',
        '</div>'
    ].join('')
};


// 定数：譜面定数の倍率の対応表（プレイスコア950000以上のみ）
// [ [ 0 プレイスコア, 1 倍率 ] ]
function getStrengthTable() {
    return [
        [990000, 4],
        [980000, 3.75],
        [970000, 3.5],
        [960000, 3.25],
        [950000, 3]
    ]
};


// 曲名と難易度から譜面定数を取得
function getRatingValue( songTitle, diffValue ) {
    //譜面定数表の曲名と照合
    let rating = getRatingTable();
    for( let i = 0; i < rating.length; i++ ){
        // 曲名が一致したら、難易度別の譜面定数を取得
        if( rating[i][0] == songTitle ) {
            if( rating[i][1] == diffValue ) return rating[i][2].toFixed(1);
            if( rating[i][3] == diffValue ) return rating[i][4].toFixed(1);
            if( rating[i][5] == diffValue ) return rating[i][6].toFixed(1);
            if( rating[i][7] == diffValue ) return rating[i][8].toFixed(1)
        }
    }
};


// 定数：譜面定数表（Lv12以上）
// 外部CSVから取得する仕組みにしたかったものの、
// 処理時間がやたら長いので関数に埋め込み。
// あえて難易度の種類だけでなくレベルの数値も含めることで、
// 将来に譜面のレベル変更が発生した際、当表が未更新の段階で誤った定数を返さないように対策。
// [ [ 0 曲名, 1 NORMALレベル, 2 NORMAL定数, 3 HARDレベル, 4 HARD定数,
//     5 EXPERTレベル, 6 EXPERT定数, 7 INFERNOレベル, 8 INFERNO定数 ] ]
function getRatingTable() {
    return [
        ["ぺこみこ大戦争！！", "NORMAL 4", 0.0, "HARD 8", 0.0, "EXPERT 11", 0.0, "INFERNO 13", 13.2],
        ["Say!ファンファーレ!", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.5, "INFERNO 0", 0.0],
        ["NEXT COLOR PLANET", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 12", 12.6, "INFERNO 0", 0.0],
        ["夢見る空へ", "NORMAL 2", 0.0, "HARD 7+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["お願いマッスル", "NORMAL 1", 0.0, "HARD 7+", 0.0, "EXPERT 10+", 0.0, "INFERNO 0", 0.0],
        ["マッチョアネーム？", "NORMAL 2", 0.0, "HARD 6", 0.0, "EXPERT 12", 12.0, "INFERNO 0", 0.0],
        ["HELLO to DREAM", "NORMAL 1", 0.0, "HARD 6", 0.0, "EXPERT 9+", 0.0, "INFERNO 0", 0.0],
        ["over and over", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["トロピカッ☆バケーション", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 10+", 0.0, "INFERNO 0", 0.0],
        ["秒針を噛む", "NORMAL 2", 0.0, "HARD 6+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["ないものねだり", "NORMAL 2", 0.0, "HARD 7+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["HOT LIMIT", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["キラメキライダー☆", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["ガヴリールドロップキック", "NORMAL 3", 0.0, "HARD 6+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["This game", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 10+", 0.0, "INFERNO 0", 0.0],
        ["RAGE OF DUST", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["Make it！", "NORMAL 1", 0.0, "HARD 5", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["Make it！ (DJ Genki Remix)", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["キラッとスタート", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["キラッとスタート (USAO Remix)", "NORMAL 4", 0.0, "HARD 8", 0.0, "EXPERT 12+", 12.7, "INFERNO 0", 0.0],
        ["ハート♥イロ♥トリドリ〜ム", "NORMAL 1", 0.0, "HARD 6", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["ダダダダ天使", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 12", 12.0, "INFERNO 0", 0.0],
        ["青空のラプソディ", "NORMAL 2", 0.0, "HARD 6+", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["Bravely You", "NORMAL 1", 0.0, "HARD 6", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["ぼなぺてぃーと♡S", "NORMAL 2", 0.0, "HARD 7+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["デタラメなマイナスとプラスにおけるブレンド考", "NORMAL 2", 0.0, "HARD 5+", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["輪廻転生", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 12", 12.3, "INFERNO 0", 0.0],
        ["ストライク・ザ・ブラッド", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["新宝島", "NORMAL 1", 0.0, "HARD 6", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["U.S.A.", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["Shiny Smily Story", "NORMAL 3", 0.0, "HARD 6", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["Dream☆Story", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["without U", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["シャルル", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["ドラマツルギー", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["オドループ", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["only my railgun", "NORMAL 3", 0.0, "HARD 6+", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["にめんせい☆ウラオモテライフ!", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["You Only Live Once", "NORMAL 1", 0.0, "HARD 5", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["残酷な天使のテーゼ", "NORMAL 1", 0.0, "HARD 5", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["ただ君に晴れ", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["The Light", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 12", 12.1, "INFERNO 0", 0.0],
        ["AIAIAI (feat. 中田ヤスタカ)", "NORMAL 1", 0.0, "HARD 6", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["Hello, Morning", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["Raise Your Heart!!", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["SHINY DAYS", "NORMAL 1", 0.0, "HARD 5", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["EXCITE", "NORMAL 1", 0.0, "HARD 6", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["シュガーソングとビターステップ", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["ファティマ", "NORMAL 2", 0.0, "HARD 6+", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["回レ！雪月花", "NORMAL 2", 0.0, "HARD 8", 0.0, "EXPERT 10+", 0.0, "INFERNO 0", 0.0],
        ["ピースサイン", "NORMAL 2", 0.0, "HARD 6+", 0.0, "EXPERT 9+", 0.0, "INFERNO 0", 0.0],
        ["徒花ネクロマンシー", "NORMAL 3", 0.0, "HARD 6+", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["ようこそジャパリパークへ", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["かくしん的☆めたまるふぉ～ぜっ!", "NORMAL 1", 0.0, "HARD 5", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["POP TEAM EPIC", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["ファッとして桃源郷", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["Nameless Story", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["TOMORROW", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["五等分の気持ち", "NORMAL 2", 0.0, "HARD 6", 0.0, "EXPERT 9+", 0.0, "INFERNO 0", 0.0],
        ["ギミチョコ!!", "NORMAL 4", 0.0, "HARD 10", 0.0, "EXPERT 12+", 12.9, "INFERNO 0", 0.0],
        ["ウマーベラス", "NORMAL 1", 0.0, "HARD 6+", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["アスノヨゾラ哨戒班", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["ヒビカセ", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.3, "INFERNO 0", 0.0],
        ["脳漿炸裂ガール", "NORMAL 5", 0.0, "HARD 9", 0.0, "EXPERT 13", 13.4, "INFERNO 0", 0.0],
        ["ポジティブ☆ダンスタイム", "NORMAL 3", 0.0, "HARD 8+", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["Gimme×Gimme feat. 初音ミク・鏡音リン", "NORMAL 2", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.0, "INFERNO 0", 0.0],
        ["39みゅーじっく！", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 10+", 0.0, "INFERNO 0", 0.0],
        ["ブリキノダンス", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 12", 12.3, "INFERNO 0", 0.0],
        ["チュルリラ・チュルリラ・ダッダッダ！", "NORMAL 4", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.3, "INFERNO 0", 0.0],
        ["おばけのウケねらい", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["ベノム", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 12", 12.1, "INFERNO 0", 0.0],
        ["リアル初音ミクの消失", "NORMAL 6", 0.0, "HARD 10", 0.0, "EXPERT 13+", 13.7, "INFERNO 0", 0.0],
        ["セツナトリップ", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 12", 12.1, "INFERNO 0", 0.0],
        ["カゲロウデイズ", "NORMAL 4", 0.0, "HARD 9", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["天ノ弱", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["ゴーストルール", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["ロストワンの号哭", "NORMAL 4", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.2, "INFERNO 0", 0.0],
        ["いーあるふぁんくらぶ", "NORMAL 2", 0.0, "HARD 6", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["初音ミクの消失", "NORMAL 5", 0.0, "HARD 10", 0.0, "EXPERT 13+", 13.8, "INFERNO 0", 0.0],
        ["劣等上等", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["アカリがやってきたぞっ", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["太陽系デスコ", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 10+", 0.0, "INFERNO 0", 0.0],
        ["気まぐれメルシィ feat. 初音ミク", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["幸せになれる隠しコマンドがあるらしい", "NORMAL 5", 0.0, "HARD 10", 0.0, "EXPERT 13", 13.3, "INFERNO 0", 0.0],
        ["千本桜", "NORMAL 2", 0.0, "HARD 7+", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["エイリアンエイリアン", "NORMAL 2", 0.0, "HARD 6+", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["砂の惑星 feat. 初音ミク", "NORMAL 3", 0.0, "HARD 8+", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["マトリョシカ", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["Seyana. ～何でも言うことを聞いてくれるアカネチャン～", "NORMAL 2", 0.0, "HARD 9", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["フラジール", "NORMAL 1", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["ロキ", "NORMAL 4", 0.0, "HARD 9", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["ウミユリ海底譚", "NORMAL 1", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["スクランブル交際", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["乙女解剖", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["Help me, ERINNNNNN!!", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["進捗どうですか？", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.6, "INFERNO 0", 0.0],
        ["Sweet Requiem", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 12+", 12.8, "INFERNO 0", 0.0],
        ["明星ロケット", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["ゆけむり魂温泉 II", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 12", 12.0, "INFERNO 0", 0.0],
        ["Calamity Fortune", "NORMAL 4", 0.0, "HARD 10", 0.0, "EXPERT 13+", 13.7, "INFERNO 0", 0.0],
        ["ケロ⑨Destiny", "NORMAL 2", 0.0, "HARD 6", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["風に乗せた願い", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["LOVE EAST", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["天狗の落とし文 feat. ytr", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.1, "INFERNO 0", 0.0],
        ["神寂", "NORMAL 4", 0.0, "HARD 10+", 0.0, "EXPERT 13", 13.5, "INFERNO 0", 0.0],
        ["悪戯センセーション", "NORMAL 2", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.1, "INFERNO 0", 0.0],
        ["ナイト・オブ・ナイツ (かめりあ’s“ワンス・アポン・ア・ナイト”Remix)", "NORMAL 5", 0.0, "HARD 10", 0.0, "EXPERT 13", 13.1, "INFERNO 0", 0.0],
        ["Mami Mami Zone", "NORMAL 4", 0.0, "HARD 9", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["チルノのパーフェクトさんすう教室", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["待チ人ハ来ズ。", "NORMAL 2", 0.0, "HARD 6", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["taboo tears you up 2017", "NORMAL 4", 0.0, "HARD 9+", 0.0, "EXPERT 12", 12.4, "INFERNO 0", 0.0],
        ["Bad Apple!! feat. nomico", "NORMAL 1", 0.0, "HARD 5", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["ナイト・オブ・ナイツ", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 12", 12.0, "INFERNO 0", 0.0],
        ["WARNING×WARNING×WARNING", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["ニュー・ウェーブ", "NORMAL 2", 0.0, "HARD 6", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["ガンガン・ドンドン", "NORMAL 2", 0.0, "HARD 6", 0.0, "EXPERT 9+", 0.0, "INFERNO 0", 0.0],
        ["スマイル・アンド・ティアズ", "NORMAL 2", 0.0, "HARD 6", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["STILL HOT IN MY HEART", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["Over the sweat and tears", "NORMAL 1", 0.0, "HARD 5", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["Singin'☆Shine！", "NORMAL 1", 0.0, "HARD 5", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["Grayed Out-Antifront-", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 13", 13.2, "INFERNO 0", 0.0],
        ["インドア系ならトラックメイカー", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 12+", 12.9, "INFERNO 0", 0.0],
        ["ダンシング☆サムライ", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["WHITE", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["Brain Power", "NORMAL 4", 0.0, "HARD 9+", 0.0, "EXPERT 13", 13.0, "INFERNO 0", 0.0],
        ["聖者の鼓動", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 12", 12.4, "INFERNO 0", 0.0],
        ["BUCHiGiRE Berserker", "NORMAL 4", 0.0, "HARD 10+", 0.0, "EXPERT 13+", 13.9, "INFERNO 0", 0.0],
        ["君のStarlight Road", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["FUJIN Rumble", "NORMAL 5", 0.0, "HARD 10+", 0.0, "EXPERT 13", 13.6, "INFERNO 0", 0.0],
        ["Eyes on me feat. Such", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 12", 12.4, "INFERNO 0", 0.0],
        ["GOODWORLD", "NORMAL 2", 0.0, "HARD 9", 0.0, "EXPERT 12", 12.6, "INFERNO 0", 0.0],
        ["Altale", "NORMAL 4", 0.0, "HARD 9", 0.0, "EXPERT 12", 12.3, "INFERNO 0", 0.0],
        ["ベースラインやってる？笑", "NORMAL 4", 0.0, "HARD 9+", 0.0, "EXPERT 12", 12.5, "INFERNO 0", 0.0],
        ["EU over Progress", "NORMAL 6", 0.0, "HARD 10+", 0.0, "EXPERT 12+", 12.7, "INFERNO 0", 0.0],
        ["燐廻", "NORMAL 2", 0.0, "HARD 7+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["『エキセントリック少年ボウイ』のテーマ", "NORMAL 1", 0.0, "HARD 5+", 0.0, "EXPERT 12", 12.6, "INFERNO 0", 0.0],
        ["Jägermeister", "NORMAL 3", 0.0, "HARD 8+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["What's this?", "NORMAL 3", 0.0, "HARD 6", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["FREEDOM DiVE↓", "NORMAL 6", 0.0, "HARD 10+", 0.0, "EXPERT 13+", 13.9, "INFERNO 0", 0.0],
        ["Honey Panic!", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 12", 12.3, "INFERNO 0", 0.0],
        ["Pixel Galaxy", "NORMAL 2", 0.0, "HARD 7", 0.0, "EXPERT 10+", 0.0, "INFERNO 0", 0.0],
        ["集結の華々", "NORMAL 2", 0.0, "HARD 6", 0.0, "EXPERT 10+", 0.0, "INFERNO 0", 0.0],
        ["conflict", "NORMAL 5", 0.0, "HARD 10", 0.0, "EXPERT 13", 13.4, "INFERNO 0", 0.0],
        ["こんにちは、ARuFaです。", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["ぼくの夢、メチャクソ無限湧き", "NORMAL 4", 0.0, "HARD 9", 0.0, "EXPERT 12", 12.5, "INFERNO 0", 0.0],
        ["ゲームオーバー (feat. TORIENA)", "NORMAL 2", 0.0, "HARD 7+", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["ルーンファクトリー４スペシャルより「この想いを乗せて」", "NORMAL 1", 0.0, "HARD 5", 0.0, "EXPERT 9", 0.0, "INFERNO 0", 0.0],
        ["ARTEMiS", "NORMAL 4", 0.0, "HARD 10", 0.0, "EXPERT 13+", 13.9, "INFERNO 0", 0.0],
        ["with U", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 11+", 0.0, "INFERNO 13", 13.6],
        ["Tell Me", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["LETHAL;WEAPON", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 12+", 12.9, "INFERNO 0", 0.0],
        ["THE MUZZLE FACING", "NORMAL 4", 0.0, "HARD 9+", 0.0, "EXPERT 13+", 13.7, "INFERNO 0", 0.0],
        ["GASHATT", "NORMAL 4", 0.0, "HARD 10", 0.0, "EXPERT 12", 12.5, "INFERNO 0", 0.0],
        ["Demon's Rave", "NORMAL 5", 0.0, "HARD 10", 0.0, "EXPERT 12+", 12.8, "INFERNO 0", 0.0],
        ["jacaranda", "NORMAL 4", 0.0, "HARD 9", 0.0, "EXPERT 12+", 12.8, "INFERNO 0", 0.0],
        ["CHECKER FLAG", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 12+", 12.9, "INFERNO 0", 0.0],
        ["Stratoliner", "NORMAL 4", 0.0, "HARD 9+", 0.0, "EXPERT 12+", 12.7, "INFERNO 0", 0.0],
        ["Utopia feat. shully", "NORMAL 5", 0.0, "HARD 9", 0.0, "EXPERT 12+", 12.7, "INFERNO 0", 0.0],
        ["Let you DIVE!", "NORMAL 3", 0.0, "HARD 9+", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["Poppin' Shower", "NORMAL 3", 0.0, "HARD 9+", 0.0, "EXPERT 12", 12.5, "INFERNO 0", 0.0],
        ["While Shining feat.Yukacco", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.3, "INFERNO 0", 0.0],
        ["ALiVE", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["ONOMATO Pairing!!!", "NORMAL 2", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.4, "INFERNO 0", 0.0],
        ["SUPER REACTOR", "NORMAL 4", 0.0, "HARD 8", 0.0, "EXPERT 13", 13.0, "INFERNO 0", 0.0],
        ["GENOCIDER", "NORMAL 6", 0.0, "HARD 11", 0.0, "EXPERT 14", 14.0, "INFERNO 0", 0.0],
        ["ツアー・ファイナル", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 12", 12.3, "INFERNO 0", 0.0],
        ["Metamorphose", "NORMAL 4", 0.0, "HARD 10", 0.0, "EXPERT 12+", 12.8, "INFERNO 0", 0.0],
        ["MAGiC4LG1RL M3GA S7R1KE!", "NORMAL 4", 0.0, "HARD 10", 0.0, "EXPERT 13", 13.1, "INFERNO 0", 0.0],
        ["METEOR BURST", "NORMAL 5", 0.0, "HARD 10+", 0.0, "EXPERT 13+", 13.8, "INFERNO 0", 0.0],
        ["XTREME", "NORMAL 6", 0.0, "HARD 11", 0.0, "EXPERT 12+", 12.9, "INFERNO 14", 14.1],
        ["天使光輪", "NORMAL 7", 0.0, "HARD 11", 0.0, "EXPERT 13", 13.2, "INFERNO 14", 14.1],
        ["Ultra Red", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 12+", 12.8, "INFERNO 0", 0.0],
        ["サイクルヒット", "NORMAL 5", 0.0, "HARD 10", 0.0, "EXPERT 13", 13.6, "INFERNO 0", 0.0],
        ["Strange Bar", "NORMAL 3", 0.0, "HARD 10", 0.0, "EXPERT 12+", 12.8, "INFERNO 0", 0.0],
        ["Murasaki", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 12", 12.4, "INFERNO 0", 0.0],
        ["Mazy Metroplex", "NORMAL 4", 0.0, "HARD 10+", 0.0, "EXPERT 13+", 13.7, "INFERNO 0", 0.0],
        ["LOSE CONTROL", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["†DOOF†SENC†", "NORMAL 6", 0.0, "HARD 10", 0.0, "EXPERT 13", 13.6, "INFERNO 0", 0.0],
        ["Shiny Memory feat.Yukacco", "NORMAL 3", 0.0, "HARD 9+", 0.0, "EXPERT 12", 12.5, "INFERNO 0", 0.0],
        ["BLVST BEVT", "NORMAL 4", 0.0, "HARD 10", 0.0, "EXPERT 12", 12.6, "INFERNO 0", 0.0],
        ["JINGLE DEATH", "NORMAL 4", 0.0, "HARD 10", 0.0, "EXPERT 13", 13.2, "INFERNO 0", 0.0],
        ["Invisible Frenzy", "NORMAL 7", 0.0, "HARD 11", 0.0, "EXPERT 14", 14.0, "INFERNO 0", 0.0],
        ["VOX Diamond", "NORMAL 4", 0.0, "HARD 7+", 0.0, "EXPERT 12", 12.6, "INFERNO 0", 0.0],
        ["Chariot", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.4, "INFERNO 0", 0.0],
        ["Akareram", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["Galaxy Friends", "NORMAL 4", 0.0, "HARD 8+", 0.0, "EXPERT 12+", 12.7, "INFERNO 0", 0.0],
        ["13 Donkeys", "NORMAL 2", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.2, "INFERNO 0", 0.0],
        ["ADAM", "NORMAL 5", 0.0, "HARD 10", 0.0, "EXPERT 13", 13.5, "INFERNO 0", 0.0],
        ["ATARAX1A", "NORMAL 4", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.5, "INFERNO 0", 0.0],
        ["HiGHER", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 12", 12.2, "INFERNO 0", 0.0],
        ["Source of Creation", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["Exitium", "NORMAL 6", 0.0, "HARD 11", 0.0, "EXPERT 14", 14.0, "INFERNO 0", 0.0],
        ["Blaze", "NORMAL 3", 0.0, "HARD 8+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["GRiDGALAXY", "NORMAL 4", 0.0, "HARD 8", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["Jingle", "NORMAL 4", 0.0, "HARD 9+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["BATTLE NO.1", "NORMAL 6", 0.0, "HARD 10", 0.0, "EXPERT 13+", 13.7, "INFERNO 0", 0.0],
        ["LEVATEiN feat. 野宮あゆみ", "NORMAL 4", 0.0, "HARD 9", 0.0, "EXPERT 12", 12.4, "INFERNO 0", 0.0],
        ["BIG HEAD BANGING", "NORMAL 6", 0.0, "HARD 11", 0.0, "EXPERT 13+", 13.8, "INFERNO 0", 0.0],
        ["Knight Rider", "NORMAL 6", 0.0, "HARD 10+", 0.0, "EXPERT 13", 13.4, "INFERNO 0", 0.0],
        ["PARALLEL★PRISM", "NORMAL 3", 0.0, "HARD 7+", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["Rainbow Dream", "NORMAL 3", 0.0, "HARD 8+", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["Quon", "NORMAL 5", 0.0, "HARD 10", 0.0, "EXPERT 12+", 12.8, "INFERNO 13+", 13.9],
        ["Poseidon", "NORMAL 5", 0.0, "HARD 9+", 0.0, "EXPERT 13+", 13.8, "INFERNO 0", 0.0],
        ["HELL FLAME", "NORMAL 5", 0.0, "HARD 10", 0.0, "EXPERT 12+", 12.7, "INFERNO 0", 0.0],
        ["Gate One", "NORMAL 4", 0.0, "HARD 9", 0.0, "EXPERT 12", 12.0, "INFERNO 0", 0.0],
        ["Over My Hand", "NORMAL 3", 0.0, "HARD 9", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["Are You Ready", "NORMAL 4", 0.0, "HARD 10", 0.0, "EXPERT 12", 12.3, "INFERNO 0", 0.0],
        ["MEMORiZE", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 9+", 0.0, "INFERNO 0", 0.0],
        ["illanai-assorted", "NORMAL 4", 0.0, "HARD 8+", 0.0, "EXPERT 12+", 12.9, "INFERNO 0", 0.0],
        ["Sunshine", "NORMAL 4", 0.0, "HARD 8", 0.0, "EXPERT 11", 0.0, "INFERNO 0", 0.0],
        ["BOOM! BOOM!! BOOM!!!", "NORMAL 4", 0.0, "HARD 10", 0.0, "EXPERT 12", 12.0, "INFERNO 0", 0.0],
        ["Ever Free(Raw Edit)", "NORMAL 3", 0.0, "HARD 8", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["Try again", "NORMAL 4", 0.0, "HARD 8+", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["BLUE SKY feat. 野宮あゆみ", "NORMAL 3", 0.0, "HARD 7", 0.0, "EXPERT 10", 0.0, "INFERNO 0", 0.0],
        ["Sound Chimera", "NORMAL 5", 0.0, "HARD 10+", 0.0, "EXPERT 12+", 12.7, "INFERNO 0", 0.0],
        ["Soldiers", "NORMAL 4", 0.0, "HARD 8+", 0.0, "EXPERT 11+", 0.0, "INFERNO 0", 0.0],
        ["Fight for the CORE feat. Daisuke", "NORMAL 4", 0.0, "HARD 10+", 0.0, "EXPERT 12", 12.6, "INFERNO 0", 0.0],
        ["Shining Harmony", "NORMAL 4", 0.0, "HARD 9", 0.0, "EXPERT 12", 12.2, "INFERNO 0", 0.0]
    ]
};
