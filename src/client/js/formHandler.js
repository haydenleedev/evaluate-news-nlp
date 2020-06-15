const results = document.getElementById('results');

function handleSubmit(event) {
    event.preventDefault()

    const inputText = document.getElementById('text').value;
    const errorEle = document.getElementById('error');
    if (Client.urlValidation(inputText)) {
        postData('http://localhost:8081/inputText', {text: inputText})
        .then(() => updateUI());

        if (errorEle){
            document.getElementById('error').remove();
        }
         console.log("::: Form Submitted :::")
    } else {
        console.log("Wrong Format!");
        results.innerHTML = "";
        
        if (errorEle){
            document.getElementById('error').remove();
        }
        document.getElementById("text").insertAdjacentHTML('afterend', '<p id="error">Please enter a url address.</p>')
    }
    
}


const postData = async (url ='', data = {}) => {
    console.log("data1: " + data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


const updateUI = async () => {
    const request = await fetch("http://localhost:8081/allData");

    try {
        const newData = await request.json();
        const div = document.createElement('div');
        let count = newData.length-1;
        console.log(count);
        console.log("fianl data: " + newData);

        results.innerHTML = `<p>${newData[count].polarity}</p><p>${newData[count].subjectivity}</p><p>${newData[count].text}</p><p>${newData[count].polarity_confidence}</p><p>${newData[count].subjectivity_confidence}</p>`;

    } catch(error) {
        console.log("error", error);
    }   
}


export { handleSubmit }
