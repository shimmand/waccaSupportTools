function main() {
    let selector = '';
    let value = '';

    const keys = ['partId1', 'partId2', 'partId3'];
    const query = new URLSearchParams(window.location.search);
    
    keys.forEach(key => {
        selector = `select[id="${key}"]`;
        value = query.get(key);
        document.querySelector(selector).value = value;
    });

    window.alert(`
        カスタマイズ称号の読み込みが完了しました。
        アラートを閉じた後、「変更する」をクリックしてください。
        Your customized title has been loaded.
        After closing this alert, please click "変更する (Apply)".
        `.replaceAll(/(^ {8}|^\n)/gm, '')
    );
}

main();
