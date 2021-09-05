function getCSV(dataPath) {
    const request = new XMLHttpRequest();

    request.addEventListener('load', (event) => {
        const response = event.target.responseText;
        toArray(response);
    });

    request.open('GET', dataPath, true);
    request.send();
};

function toArray(data) {
    const dataArray = [];
    const dataString = data.split('\n');

    for (let i = 0; i < dataString.length; i++) {
        dataArray[i] = dataString[i].split(',');
    };

    console.log(dataArray);
};

getCSV('https://shimmand.github.io/wacca_support_tools/chartsData/latest.csv');
