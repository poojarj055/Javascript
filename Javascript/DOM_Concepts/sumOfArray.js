function sumArray() {
            let input = document.getElementById("arrayInput").value;
            // Split the input string into an array of numbers
            let arr = input.split(',').map(Number);

            // Calculate the sum of the array elements
            const sum = arr.reduce((acc, curr) => acc + curr, 0);

            // Display the result
           // document.getElementById("result").innerText = "Sum:" +sum;
    		document.getElementById("result").textContent =sum;
        }
