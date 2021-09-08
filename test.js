export function main(){
    const songs = document.querySelectorAll('li.item');
    let scoresList = [];

    songs.forEach(function(e){
        const title = e.querySelector('.playdata__score-list__song-info__name');
        const scores = e.querySelectorAll('.playdata__score-list__song-info__score');

        scoresList.push(
            [
                title.innerText,
                parseInt(scores[0].innerText.match(/[0-9]+/)),
                parseInt(scores[1].innerText.match(/[0-9]+/)),
                parseInt(scores[2].innerText.match(/[0-9]+/)),
                parseInt(scores[3].innerText.match(/[0-9]+/))
            ]
        );
    });


    scoresList.forEach(function(e, i){
        scoresList[i] = e.join(',');
    });

    const stringToCopy = scoresList.join('\n');
    
    const tempTextarea = document.createElement('textarea');
    tempTextarea.textContent = stringToCopy;
    
    var bodyNode = document.querySelectorAll('body')[0];
    bodyNode.appendChild(tempTextarea);
    
    tempTextarea.select();
    document.execCommand('copy');

    bodyNode.removeChild(tempTextarea);
};
