if (document.getElementById("searchForm") != null) {
    var form = document.getElementById("searchForm");
    console.log(form);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var text = form["searchText"].value;
        form["searchText"].value = "";
        getMovies(text);
    });
}

/*axios.get('https://api.themoviedb.org/3/search/movie?api_key=cf3fb230bd5cbb2df68bc0165dda4da7&language=en-US&query=howdy&page=1&include_adult=false').then(function (response) {
    var movies = response.data.results;
    var output;

    for (var i = 0; i < movies.length; i++) {
        output += `
            <div class="col-md3">
                <div class="well text-center">
                    <h5>${movies[i].title}</h5>
                </div>
            </div>
            `;
    }

    console.log(output);
});*/



function getMovies(searchText) {
    console.log(searchText);

    axios.get('https://api.themoviedb.org/3/search/movie?api_key=cf3fb230bd5cbb2df68bc0165dda4da7&language=en-US&query=' + searchText + '&page=1&include_adult=false').then(function (response) {
        var movies = response.data.results;
        console.log(movies);
        var output = "";

        for (var i = 0; i < movies.length; i++) {
            var movie = movies[i];
            var imageSrc = "";
            if (movie.poster_path != null) {
                imageSrc = "http://image.tmdb.org/t/p/w185/" + movie.poster_path;
            } else {
                imageSrc = "images/MissingPhoto.png";
            }
            output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${imageSrc}">
                    <h5>${movie.title}</h5>
                    <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
            `;
        }

        document.getElementById("movies").innerHTML = output;
    }).catch(function (err) {
        console.log(err);
    });
}

function movieSelected(id) {
    //Storing data locally until browser is closed
    sessionStorage.setItem('movieID', id);

    window.location = "movie.html";

    return false;
}

function getMovie() {
    var movieID = sessionStorage.getItem('movieID');
    console.log(movieID);

    axios.get('https://api.themoviedb.org/3/movie/' + movieID + '?api_key=cf3fb230bd5cbb2df68bc0165dda4da7&language=en-US').then(function (response) {
        console.log(response);

        var movie = response.data;
        var imageSrc = "";
        var output = "";

        if (movie.genres[0] == null) {
            movie.genres[0] = {
                id: 0,
                name: "N/A"
            };
        }
        
        if (movie.runtime == 0) {
            movie.runtime = "Unknown";
        }

        if (movie.poster_path != null) {
            imageSrc = "http://image.tmdb.org/t/p/w185/" + movie.poster_path;
        } else {
            imageSrc = "images/MissingPhoto.png";
        }

        output += `
            <div class="row">
                <div class="col-md-4">
                    <img src="${imageSrc}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}</li>
                        <li class="list-group-item"><strong>Run Time:</strong> ${movie.runtime} minutes</li>
                        <li class="list-group-item"><strong>Status:</strong> ${movie.status}</li>
                        <li class="list-group-item"><strong>Vote:</strong> ${movie.vote_average}/10 out of ${movie.vote_count} vote(s)</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class=col-md-12>
                    <div class="well">
                        <h3>Overview:</h3>
                        ${movie.overview}
                        <hr>
                        <a href="http://www.imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">IMDB Page</a>
                        <a href="index.html" class="btn btn-default">Go back to Search</a>
                    </div>
                </div>
            </div>
            `;

        document.getElementById("movie").innerHTML = output;

    }).catch(function (err) {
        console.log(err);
    });
}
