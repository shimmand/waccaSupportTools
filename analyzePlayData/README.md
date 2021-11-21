# README.md
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
    
When you are done adding new languages, finally, create a function to control the display state, and add a button on the page to run the function.  
To switch the display state of the text for each language, I have prepared two simple functions.  
- `hideLangTextElement([selector])`: *Add* the `.d-none` class to the element that matches `selector` on the page.
- `showLangTextElement([selector])`: *Remove* the `.d-none` class to the element that matches `selector` on the page.

For example, the `switchToKorean()` function, looks like the following code:  

    function switchToKorean() {
        hideLangTextElement('.lang-eng');
        hideLangTextElement('.lang-jpn');
        showLangTextElement('.lang-kor');
    }

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
        
        <!-- NEW!! -->
        <button type="button" class="btn btn-outline-primary" id="btn-korean" onclick="switchToKorean()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                ...
            </svg>
            English
        </button>
    </div>
