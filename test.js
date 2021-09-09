export function main(){
    const songs = document.querySelectorAll('li.item');
    let scoresList = [];

    songs.forEach(e => {
        const title = e.querySelector('.playdata__score-list__song-info__name');
        const levels = e.querySelectorAll('.playdata__score-list__song-info__lv');
        const scores = e.querySelectorAll('.playdata__score-list__song-info__score');

        scoresList.push(
            [
                title.innerText,
                levels[0].innerText.trim(),
                parseInt(scores[0].innerText.match(/[0-9]+/)),
                levels[1].innerText.trim(),
                parseInt(scores[1].innerText.match(/[0-9]+/)),
                levels[2].innerText.trim(),
                parseInt(scores[2].innerText.match(/[0-9]+/)),
                levels[3].innerText.trim(),
                parseInt(scores[3].innerText.match(/[0-9]+/))
            ]
        );
    });

    scoresList.forEach((e, i) => {
        scoresList[i] = e.join(',');
    });

    const stringToCopy = scoresList.join('\n');
    
    let tempTextarea = document.createElement('textarea');
    tempTextarea.textContent = stringToCopy;
    
    var bodyNode = document.querySelectorAll('body')[0];
    bodyNode.appendChild(tempTextarea);
    
    console.log(tempTextarea.textContent);
    tempTextarea.select();
    document.execCommand('copy');

    bodyNode.removeChild(tempTextarea);

    window.open('https://shimmand.github.io/waccaSupportTools/analyzePlayData/entrance.html');
};
