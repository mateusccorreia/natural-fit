
async function debugExercises() {
    try {
        console.log('Fetching chest exercises...');
        const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest?limit=1', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0e62301c6fmsh192754c5e851a76p11fd25jsn799d16a030f8',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        });
        const data = await response.json();
        if (data && data.length > 0) {
            console.log('Keys:', Object.keys(data[0]));
            console.log('gifUrl value:', data[0].gifUrl);
        } else {
            console.log('No data found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

debugExercises();
