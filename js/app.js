
var timerController;// controller to stop and start timer
var tableSortDirection = "";//show current sort direction status

//load user data json object
function load() {
    var getUsersInfoObj = JSON.parse(JSON.stringify(USERS));
    createUserInfoTableRow(getUsersInfoObj);
}

// create row with user info for the user info table
function createUserInfoTableRow(userInfoObj) {
  
    var patt = /(<([^>]+)>)/ig;//regex pattern to check HTML tags in users informations
    for (var i in userInfoObj) {
       
        var row = document.createElement('tr'); // create row node
        var col = document.createElement('td'); // create 1 column node
        var col2 = document.createElement('td'); // create 2 column node
        var col3 = document.createElement('td'); // create 3  column node
        var col4 = document.createElement('td'); // create 4 column node
        var col5 = document.createElement('td'); // create 5 column node
        row.appendChild(col); // append 1 column to row
        row.appendChild(col2); // append 2 column to row
        row.appendChild(col3); // append 3 column to row
        row.appendChild(col4); // append 4 column to row
        row.appendChild(col5); // append 5 column to row

        //check if HTML tag exist if no then show users info else how an error saying the HTML tag is present in user tag
        if (!patt.test(userInfoObj[i].name.title) && !patt.test(userInfoObj[i].name.last) && !patt.test(userInfoObj[i].name.first)) {
            col.innerHTML = '<span style="text-overflow:ellipsis; overflow:hidden; max-width:15em;white-space: nowrap;display:block">' + userInfoObj[i].name.title + ' ' + userInfoObj[i].name.last + ' ' + userInfoObj[i].name.first + ' </span>';
        }
        else {
            col.innerHTML = '<h5 style="color:red">HTML tag found insted of phone number</h5>';
        } 
        if (!patt.test(userInfoObj[i].email)) {
            col2.innerHTML = '' + userInfoObj[i].email +'';
        }
        else {
            col2.innerHTML = '<h5 style="color:red">HTML tag found insted of phone number</h5>';
        } 
        if (!patt.test(userInfoObj[i].phone)) {
            col3.innerHTML = '' + userInfoObj[i].phone + '';
        }
        else {
            col3.innerHTML = '<h5 style="color:red">HTML tag found insted of phone number</h5>';
        } 
        if (!patt.test(userInfoObj[i].pictureUrl)) {
            col4.innerHTML = '<img src="' + userInfoObj[i].pictureUrl + '" alt="NoImageFound" style="width:80px;height:80px" />';
        }
        else {
            col4.innerHTML = '<h5 style="color:red">HTML tag found insted of phone number</h5>';
        } 
        if (!patt.test(userInfoObj[i].accountBalance)) {
            col5.innerHTML = '' + userInfoObj[i].accountBalance + '';
        }
        else {
            col5.innerHTML = '<h5 style="color:red">HTML tag found insted of phone number</h5>';
        } 
             
        var table = document.getElementById("userInfoTable"); // find table to append to
        table.appendChild(row); // append row to table
       
    }
    
}

load();

// rearrange table rows randomly 
function rowRandomizer() {
    
    let table = document.getElementById("userInfoTable");
   
    let rowsCollection = table.querySelectorAll("tr");

    let rows = Array.from(rowsCollection).slice(1); //skip the header row
  
    shuffleRow(rows); //shuffle rows

    // append table again
    for (const row of rows) {
        table.appendChild(row);
    }
}

// shuffle row randomly 
function shuffleRow(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//function to sort column in ascending and descending order
function sortTable(n) {
    var table = document.getElementById("userInfoTable");
    var rows, i, x, y, count = 0;
    var switching = true;

    // default direction in descending
    var direction = "ascending";

   

    while (switching) {
        switching = false;
        var rows = table.rows;

        //Loop to go through all rows 
        for (i = 1; i < (rows.length - 1); i++) {
            var Switch = false;

            // Fetch 2 elements that need to be compared 
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            // Check the sorting direction 
            if (direction == "ascending") {

                // Check if 2 rows need to be switched 
                if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                    Switch = true;
                    break;
                }
            } else if (direction == "descending") {
                if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                    Switch = true;
                    break;
                }
            }
        }

        if (Switch) {
            // interchange row values
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            count++;
        } else {
            if (count == 0 && direction == "ascending") {
                direction = "descending";
                switching = true;
            }
        }
    }
}


//check for duplicate balance amount
function checkDuplicationBalance(n) {
    var checkDuplicateVal = true;
    var table = document.getElementById("userInfoTable");
    var rows = table.rows;
    var rows, i, j, x, y;

    for (i = 1; i < (rows.length - 1); i++) {
        x = rows[i].getElementsByTagName("TD")[n];
        for (j = 1; j < (rows.length - 1); j++) {
            y = rows[j].getElementsByTagName("TD")[n];
            if (i != j) {
                if (parseInt(x.innerHTML) == parseInt(y.innerHTML)) {
                    checkDuplicateVal = true;

                    return checkDuplicateVal;
                } else {
                    checkDuplicateVal = false;

                }
            }

        }
    }

    return checkDuplicateVal;
}
var onStartBtnClick = function () {
    timerController = setInterval(rowRandomizer, 1000);
    document.getElementById('sort').setAttribute("disabled", "disabled");
   
}
var onStopBtnClick = function () {
    clearInterval(timerController);
    document.getElementById('sort').removeAttribute("disabled");
    tableSortDirection ="";
}
var onSortClick = function () {
    sortTable(4);
}


document.getElementById('start').onclick = onStartBtnClick; // Start timer to rearrange table rows randomly every 1 seconds and disable sort button
document.getElementById('stop').onclick = onStopBtnClick;//clear timer and enable sort button
document.getElementById('sort').onclick = onSortClick;//ascending and descending order