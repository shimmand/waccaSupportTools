# README.md
## File structure
1. `launcher.js`: This is a launcher for `main.js`. It is used as a bookmarklet. (URI encoding is required.)
2. `main.js`: Collects play scores from "Song Scores" Page in My Page. Called from `launcher.js`.
3. `index.html`: This is the page to jump to `bit.ly`.　
4. (`bit.ly`: Used for access analysis.)
5. `rating.html`: The main unit of the web program.

## Translating to other languages
### rating.html
This page is designed to make it easy to add new languages.  
To add a new language, all you need to do is to add a `span` element inside a block element (ex. `div`) like the following, and add a button to display that language.  
This time, I used the `.lang-jpn` class for Japanese text and the `.lang-eng` class for English text.  

    <div>
        <span class="lang-jpn">プレイデータ</span>
        <span class="lang-eng d-none">Play Data</span>
    </div>
    
The display state of the text is controlled by the `.d-none` class, so if you don't want the text to be displayed in the initial state, please add that class to your language text.  
If you want to add Korean text, it would look like this:

    <div>
        <span class="lang-jpn">プレイデータ</span>
        <span class="lang-eng d-none">Play Data</span>
        <span class="lang-kor d-none">플레이 성적</span>
    </div>
    
You can specify whatever you want for the class name, but here, as an example, I used `.lang-kor` class for Korean.  
Also, if you want to display the Korean language initially, the code will look like this:  

    <div>
        <span class="lang-jpn d-none">プレイデータ</span>
        <span class="lang-eng d-none">Play Data</span>
        <span class="lang-kor">플레이 성적</span>
    </div>
    
Of course, you can also delete other languages:  

    <div>
        <span class="lang-eng d-none">Play Data</span>
        <span class="lang-kor">플레이 성적</span>
    </div>
    
When you are done adding new languages text, finally, create a function to control the display state, and add a button on the page to run the function.  
To switch the display state of the text for each language, I have prepared two simple functions.  
- `hideLangTextElement([selector])`: *Add* the `.d-none` class to the element that matches `selector` on the page.
- `showLangTextElement([selector])`: *Remove* the `.d-none` class to the element that matches `selector` on the page.

For example, the `switchToKorean()` function, looks like the following code:  

    function switchToKorean() {
        hideLangTextElement('.lang-eng');
        hideLangTextElement('.lang-jpn');
        showLangTextElement('.lang-kor');
    }

Also, please make changes to the two original functions.  
If you delete the existing language, please delete the functions as well.  
 
```
    function switchToJapanese() {
        hideLangTextElement('.lang-eng');
        hideLangTextElement('.lang-kor');
        showLangTextElement('.lang-jpn');
    }

    function switchToEnglish() {
        hideLangTextElement('.lang-jpn');
        hideLangTextElement('.lang-kor');
        showLangTextElement('.lang-eng');
    }
```

Once you have this function, add the button on the page and you are done.  
Since you already have a button group in place, it will be easiest to add it there.  
    
    <div class="btn-group me-2" role="group">
        <button type="button" class="btn btn-outline-primary" id="btn-japanese" onclick="switchToJapanese()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                ...
            </svg>
            Japanese
        </button>
        <button type="button" class="btn btn-outline-primary" id="btn-english" onclick="switchToEnglish()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                ...
            </svg>
            English
        </button>
        
        <button type="button" class="btn btn-outline-primary" id="btn-korean" onclick="switchToKorean()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                ...
            </svg>
            English
        </button>
    </div>

### main.js
The translation of this script is easier than that of "rating.html".  
There are four places that need to be translated:  

1. const `insertCode`: An element inserted on the page when the bookmarklet is executed.
```
const insertCode = 
    `<div style="text-align: left; font-size: 0.8em; padding: 20px">
        <p style="font-weight: bold; padding: 10px 0 10px;">WACCA RATING ANALYZER v1.01</p>
        <p>スコアの取得が完了しました。</p>
        <p>計算を開始するには、以下のボタンを押してください。</p>
        <p>The web program is now ready to run.</p>
        <p>To continue, press the button below.</p>
        <div style="padding: 10px 0 10px;">
            <button onclick="${openMainPage}">ツールを開く / Open the Web Program</button>
        </div>
        <p>ブラウザーが取得したデータ:</p>
        <p>Data collected by the browser:</p>
        <textarea style="width: 100%; height: 100px;" id="scoresList" readonly>${scoresList.join('\n')}</textarea>
    </div>`;
```
    
2. const `invHostnameMsg`: Dialog when a bookmarklet is executed on the wrong domain.
```
    const invHostnameMsg = 'ここはWACCAのマイページではありません。\nWACCAのマイページへログインし、「プレイデータ」タブの中にある「楽曲スコア」ページで、改めて実行してください。\nThis is not WACCA\'s My Page.\nPlease log in to WACCA\'s My Page and run it again on the "Song Scores(楽曲スコア)" page in the "Play Data(プレイデータ)" tab.';
```

3. const `loggedOutMsg`: Dialog when a bookmarklet is executed while the user is logged out.
```
    const loggedOutMsg = 'WACCAのマイページへログインしていないようです。\nWACCAのマイページへログインし、「プレイデータ」タブの中にある「楽曲スコア」ページで、改めて実行してください。\nIt seems that you have not logged in to WACCA\'s My Page.\nPlease log in to WACCA\'s My Page and run it again on the "Song Scores(楽曲スコア)" page in the "Play Data(プレイデータ)" tab.';
```

4. const `invDirectoryMsg`: Dialog when a bookmarklet is executed on the wrong page, even though it is on My Page.
```
    const invDirectoryMsg = 'このページではブックマークレットを実行できません。このダイアログを閉じると「楽曲スコア」ページへ移動しますので、そこで改めて実行してください。\nThe bookmarklet cannot be run on this page. When you close this dialog, you will be redirected to the "Music Scores(楽曲スコア)" page, so please run it again there.';
```
