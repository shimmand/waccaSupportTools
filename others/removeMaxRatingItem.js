export function main() {
    // すべての譜面で繰り返す
    let titles = document.querySelectorAll('li.item');
    for( let i = titles.length - 1; i >= 0; i-- ){
        // 取得されたレーティング情報を抽出
        let
            item = titles[i],
            ratingValue = item.querySelector('span.song-score').innerText;
        
        // レーティング倍率が4、またはレーティング情報が取得できなかった場合はリスト項目ごと消去
        if( ratingValue == "RATE 4.00x" || ratingValue == "SCORE" ) item.remove()
    };

    // リストを再描画
    let
        newMusicBestGrid = new Muuri('.new__music__best__grid'),
        oldMusicBestGrid = new Muuri('.old__music__best__grid'),
        newMusicCandidateGrid = new Muuri('.new__music__candidate__grid'),
        oldMusicCandidateGrid = new Muuri('.old__music__candidate__grid');
};