// 검색 버튼 클릭 시 호출될 함수
document.getElementById('search-output').addEventListener('click', searchMovies);

// 영화 검색 함수
function searchMovies() {
    // 검색어 가져오기
    const query = document.getElementById('search-input').value;
    // OMDB API를 사용하여 검색 요청
    fetch(`http://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${query}`)
        .then(response => response.json())
        .then(data => {
            // 검색 결과 표시 함수 호출
            displayResults(data.Search);
        })
        .catch(error => console.error('Error:', error));
}

// 검색 결과 표시 함수
function displayResults(movies) {
    // 결과를 표시할 컨테이너 선택
    const resultsContainer = document.querySelector('.result'); // '.result'로 수정
    resultsContainer.innerHTML = '';
    if (movies) {
        // 각 영화별 카드 생성 및 결과 출력
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('card');
            movieCard.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title} 포스터">
                <div class="card-content">
                    <h2 class="card-title">${movie.Title}</h2>
                    <p class="card-year">${movie.Year}</p>
                </div>
            `;
            resultsContainer.appendChild(movieCard);
            // 각 카드에 클릭 이벤트 추가하여 영화 세부 정보 표시 함수 호출
            movieCard.addEventListener('click', () => displayMovieDetails(movie.imdbID));
        });
    } else {
        // 검색 결과가 없을 경우 메시지 출력
        resultsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
    }
}

// 영화 세부 정보 표시 함수
function displayMovieDetails(id) {
    // OMDB API를 사용하여 영화 세부 정보 요청
    fetch(`http://www.omdbapi.com/?apikey=YOUR_API_KEY&i=${id}`)
        .then(response => response.json())
        .then(movie => {
            const resultsContainer = document.querySelector('.result'); // '.result'로 수정
            // 세부 정보를 카드 형식으로 표시
            resultsContainer.innerHTML = `
                <div class="card">
                    <img src="${movie.Poster}" alt="${movie.Title} 포스터">
                    <div class="card-content">
                        <h2 class="card-title">${movie.Title}</h2>
                        <p class="card-year">${movie.Year}</p>
                        <p><strong>감독:</strong> ${movie.Director}</p>
                        <p><strong>출연:</strong> ${movie.Actors}</p>
                        <p><strong>줄거리:</strong> ${movie.Plot}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => console.error('Error:', error));
}
