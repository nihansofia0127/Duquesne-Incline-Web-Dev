$(document).ready(function () {
    $("#fullGiftShop").hide();
    $("#readLessGiftBtn").hide();

    $("#readMoreGiftBtn").click(function () {
        $("#shortGiftShop").hide();
        $("#fullGiftShop").fadeIn();
        $("#readLessGiftBtn").show();
    });

    $("#readLessGiftBtn").click(function () {
        $("#fullGiftShop").fadeOut(function () {
            $("#shortGiftShop").show();
            $("#readLessGiftBtn").hide();
        });
    });
});


$(document).ready(function() {
    $('#submit_button').on('click', function(event) {
        
        let valid = true;

        // Name validation
        const name = $('#name');
        if (!name[0].checkValidity()) {
            valid = false;
        }

        // Email validation
        const email = $('#email');
        if (!email[0].checkValidity()) {
            valid = false;
        }

        // Phone validation (optional, but must be 10 digits if filled)
        const phone = $('#phone');
        if (phone.val().trim() !== "") {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.val())) {
                valid = false;
            } 
        }

        // Zip code validation (optional, but must be 5 digits if filled)
        const zipCode = $('#zipCode');
        if (zipCode.val().trim() !== "") {
            const zipRegex = /^[0-9]{5}$/;
            if (!zipRegex.test(zipCode.val())) {
                valid = false;
            }
        }

        // If form is valid, process submission
        if (valid) {
            // Collect form data
            const formData = {
                name: name.val().trim(),
                email: email.val().trim(),
                smsConsent: $('#smsConsent').is(':checked'),
                phone: phone.val().trim() || null,
                zipCode: zipCode.val().trim() || null
            };

            console.log("Form submitted:", formData);
            
            $('#mailingListForm')[0].reset();
            $('#formSuccess').text("Thank you for joining our mailing list!");
            $('#mailingListForm')[0].reset();
            
        } else {
            $('#formError').text("Please correct the errors in the form.");
        }
    });
});



$(document).ready(function() {
    // Pittsburgh coordinates
    const lat = 40.4406;
    const lon = -79.9959;
    
    const apiKey = '79e1dec5ae49acf58e2e8c55eff60aaa';
    
    // Fetch current weather
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Fetch forecast after current weather
            fetchForecast(lat, lon, apiKey, data);
        },
        error: function(error) {
            $('#weather-data').html('<div class="error">Unable to load weather data. Please try again later.</div>');
            console.error('Error fetching weather data:', error);
        }
    });
    
    function fetchForecast(lat, lon, apiKey, currentData) {
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`,
            method: 'GET',
            dataType: 'json',
            success: function(forecastData) {
                displayWeather(currentData, forecastData);
            },
            error: function(error) {
                // Still display current weather if forecast fails
                displayWeather(currentData, null);
                console.error('Error fetching forecast data:', error);
            }
        });
    }
    
    function displayWeather(current, forecast) {
        // Clear loading message
        $('#weather-data').empty();
        
        // Current weather section
        const currentWeather = $('<div class="current-weather"></div>');
        currentWeather.append(`<h3>Current Conditions</h3>`);
        currentWeather.append(`<img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" alt="${current.weather[0].description}" class="weather-icon">`);
        currentWeather.append(`<div class="temp">${Math.round(current.main.temp)}°F</div>`);
        currentWeather.append(`<div class="conditions">${current.weather[0].description}</div>`);
        currentWeather.append(`<div>Feels like: ${Math.round(current.main.feels_like)}°F</div>`);
        currentWeather.append(`<div>Humidity: ${current.main.humidity}%</div>`);
        currentWeather.append(`<div>Wind: ${Math.round(current.wind.speed)} mph</div>`);
        
        // Add current weather to container
        $('#weather-data').append(currentWeather);
        
        // Process and display forecast if available
        if (forecast) {
            // Get one forecast per day (noon)
            const dailyForecasts = {};
            
            forecast.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString('en-US', {weekday: 'short'});
                
                // Use noon forecast for each day
                if (date.getHours() >= 11 && date.getHours() <= 13) {
                    if (!dailyForecasts[day]) {
                        dailyForecasts[day] = item;
                    }
                }
            });
            
            // Create forecast section
            const forecastSection = $('<div class="forecast"></div>');
            forecastSection.append('<h3>5-Day Forecast</h3>');
            
            const forecastDays = $('<div class="forecast-days"></div>');
            
            // Get up to 5 days from the daily forecasts
            Object.keys(dailyForecasts).slice(0, 5).forEach(day => {
                const item = dailyForecasts[day];
                const forecastDay = $('<div class="forecast-day"></div>');
                
                forecastDay.append(`<div>${day}</div>`);
                forecastDay.append(`<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}" class="weather-icon">`);
                forecastDay.append(`<div class="temp">${Math.round(item.main.temp)}°F</div>`);
                forecastDay.append(`<div class="conditions">${item.weather[0].description}</div>`);
                
                forecastDays.append(forecastDay);
            });
            
            forecastSection.append(forecastDays);
            $('#weather-data').append(forecastSection);
        }
        
        // Add visit recommendations based on current weather
        let recommendation = '';
        const conditions = current.weather[0].main.toLowerCase();
        const temp = current.main.temp;
        
        if (conditions.includes('clear') || conditions.includes('sun')) {
            recommendation = 'Perfect day for a visit! Clear conditions offer the best views of Pittsburgh.';
        } else if (conditions.includes('rain') || conditions.includes('drizzle')) {
            recommendation = 'Light rain expected. Bring an umbrella, but views can still be spectacular between showers.';
        } else if (conditions.includes('thunderstorm')) {
            recommendation = 'Thunderstorms in the forecast. Consider checking our indoor observation deck for safety.';
        } else if (conditions.includes('snow')) {
            recommendation = 'Snowy conditions expected. The incline operates normally, but dress warmly and expect potentially limited visibility.';
        } else if (conditions.includes('fog') || conditions.includes('mist')) {
            recommendation = 'Foggy conditions may limit visibility today. Check our webcam for current views before visiting.';
        } else if (temp > 85) {
            recommendation = 'Hot day ahead! Our observation deck is air-conditioned for your comfort.';
        } else if (temp < 32) {
            recommendation = 'Freezing temperatures expected. Dress warmly for your visit.';
        } else {
            recommendation = 'Good conditions for visiting the Duquesne Incline. Enjoy your trip!';
        }
        
        $('#weather-data').append(`<div class="weather-note"><strong>Visit Recommendation:</strong> ${recommendation}</div>`);
    }
});


