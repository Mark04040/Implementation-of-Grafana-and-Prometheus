document.getElementById('data-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const data = { name, email };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar los datos');
    });
});

