// const data = {
//   AIRLINE: "DL",
//   ORIGIN: "LAX",
//   DEST: "JFK",
//   MONTH: 1,
//   DAY_OF_WEEK: 1,
//   DEP_HOUR: 1,
// };
console.log("Script loaded");
document.getElementById('flightForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const airline = document.getElementById('airline').value;
            const departure = document.getElementById('departure').value;
            const arrival = document.getElementById('arrival').value;
            const departureTime = document.getElementById('departureTime').value;
            const departureDate = document.getElementById('departureDate').value;
            // Convert to Date object
            const dateObj = new Date(departureDate);

            // Get day of the week (0 = Sunday, 6 = Saturday)
            // Convert to 1–7 (1 = Monday, 7 = Sunday)
            let dayOfWeek = dateObj.getDay();
            dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
            data = {
                    AIRLINE: airline,
                    ORIGIN: departure,
                    DEST: arrival,
                    MONTH: dateObj.getMonth() + 1, // getMonth() returns 0-11
                    DAY_OF_WEEK:dayOfWeek,
                    DEP_HOUR: departureTime.split(':')[0],
                }
            // Update flight information display
            const flightDetails = document.querySelector('.flight-details');
            flightDetails.innerHTML = `
                <div>AIRLINE : ${airline || 'Sample Airline Name'}</div>
                <div>DEPARTURE : ${departure || 'Sample Airport Name'}</div>
                <div>ARRIVAL : ${arrival || 'Sample Airport Name'}</div>
                <div>DEPARTURE TIME : ${departureTime || '00:00'}</div>
            `;
            fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .then((res) => {
                // Simulate prediction with random probability
                const probability = res.delay_percent; // 30-70%
                document.querySelector('.probability-value').textContent = probability;
                
                // Update probability color based on value
                const probElement = document.querySelector('.probability-value');
                if (probability >= 60) {
                    probElement.style.color = '#d32f2f';
                } else if (probability >= 40) {
                    probElement.style.color = '#f57c00';
                } else {
                    probElement.style.color = '#388e3c';
                }
                // document.body.innerText = `Delay Probability: ${res.delay_probability} (${res.delay_percent})`;
            })
            .catch((err) => {
                document.querySelector('.probability-value').textContent = err + '!';
                // document.body.innerText = `Error: ${err}`;
            });
        });


/* 
    <script>
        document.getElementById('flightForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const airline = document.getElementById('airline').value;
            const departure = document.getElementById('departure').value;
            const arrival = document.getElementById('arrival').value;
            const departureTime = document.getElementById('departureTime').value;
            
            // Update flight information display
            const flightDetails = document.querySelector('.flight-details');
            flightDetails.innerHTML = `
                <div>AIRLINE : ${airline || 'Sample Airline Name'}</div>
                <div>DEPARTURE : ${departure || 'Sample Airport Name'}</div>
                <div>ARRIVAL : ${arrival || 'Sample Airport Name'}</div>
                <div>DEPARTURE TIME : ${departureTime || '00:00'}</div>
            `;
            
            // Simulate prediction with random probability
            const probability = Math.floor(Math.random() * 40) + 30; // 30-70%
            document.querySelector('.probability-value').textContent = probability + '%';
            
            // Update probability color based on value
            const probElement = document.querySelector('.probability-value');
            if (probability >= 60) {
                probElement.style.color = '#d32f2f';
            } else if (probability >= 40) {
                probElement.style.color = '#f57c00';
            } else {
                probElement.style.color = '#388e3c';
            }
        });
    </script>
*/