export function main(){
    function hideAllTimes(){
        // #pushobj > section > div.contents-wrap > div > ul > li:nth-child(any) > div > div.playdata__history-list__song-info > div.playdata__history-list__song-info__top
        const selectors = 'div.playdata__history-list__song-info__top';
        const datesPlayed = document.querySelectorAll(selectors);
        datesPlayed.forEach(function(e){
            const searchValue = /[0-9]{2}:[0-9]{2}:[0-9]{2}$/;
            const replaceValue = '##:##:##';
            const modifiedCode = e.innerHTML.replace(searchValue, replaceValue);
            e.innerHTML = modifiedCode;
        });
    };

    function showAllTables(){
        // #pushobj > section > div.contents-wrap > div > ul > li:nth-child(any) > div > a
        const selectors = 'a.playdata__history-list__detail-btn';
        const actionButtons = document.querySelectorAll(selectors);
        actionButtons.forEach(function(e){
            e.click();
        });
    };

    hideAllTimes();
    showAllTables();
};
