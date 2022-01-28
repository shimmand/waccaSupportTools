function main() {
    let selector = '';
    selector = 'select[id*=partId]';
    const selects = document.querySelectorAll(selector);
    
    if (selects.length !== 3) {
        return false;
    }

    let param = [
        ['partId1', '', ''],
        ['partId2', '', ''],
        ['partId3', '', '']
    ];

    selects.forEach((select, index) => {
        param[index][1] = select.value;
        selector = `option[value="${select.value}"]`;
        param[index][2] = document.querySelector(selector).innerText;
    });

    const title = `${param[0][2]}${param[1][2]}${param[2][2]}`;
    document.title = title;

    const location = window.location.href.replace(window.location.search, '');
    const query = `?partId1=${param[0][1]}&partId2=${param[1][1]}&partId3=${param[2][1]}`;
    const url = `${location}${query}`;
    history.replaceState('', title, url);

    window.alert(`
        「${title}」
        ${param[0][1]} : ${param[0][2]}
        ${param[1][1]} : ${param[1][2]}
        ${param[2][1]} : ${param[2][2]}
        \n
        以上の内容でカスタマイズ称号を保存します。
        アラートを閉じた後、このページをブックマークに追加してください。
        You are now ready to save your customized title with the above selections.
        After closing this alert, please add this page to your bookmarks.
        `.replaceAll(/(^ {8}|^\n)/gm, '')
    );
}

main();
