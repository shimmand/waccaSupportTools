export function main(){
    function hideAllTimes(){
        // #pushobj > section > div.contents-wrap > div > ul > li:nth-child(any) > div > div.playdata__history-list__song-info > div.playdata__history-list__song-info__top
        const selectors = 'div.playdata__history-list__song-info__top';
        const datailedTables = document.querySelectorAll(selectors);
        datailedTables.forEach(function(e){
            const searchValue = /[0-9]{2}:[0-9]{2}:[0-9]{2}$/;
            const replaceValue = '##:##:##';
            const modifiedCode = e.innerHTML.replace(searchValue, replaceValue);
            e.innerHTML = modifiedCode;
        });
    };
    
    hideAllTimes();
};
