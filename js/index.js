'use strict'

// const API_KEY = 'AIzaSyCv7Qck1lm4BfGvY2ywrDw67YwQQYtfYpE'
const API_KEY = 'AIzaSyDAwJrvaHGHQY3MA8a46MbjP9uIB0_oPC4'
const VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/videos'
const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'

const videoListItems = document.querySelector('.video-list__items');

const fixToCorrectTime = (badTime) => {
  
};

const fetchTrendingVideos = async () => {
  try {
    const url = new URL(VIDEOS_URL)

    url.searchParams.append('part', 'contentDetails,id,snippet')
    url.searchParams.append('chart', 'mostPopular')
    url.searchParams.append('regionCode', 'RU')
    url.searchParams.append('maxResults', '12')
    url.searchParams.append('key', `${API_KEY}`)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('ERROR:', error);
  }
};

const displayVideo = (videos) => {
  videoListItems.textContent = ''

  const listVideos = videos.items.map(video => {
    const li = document.createElement('li')
    li.classList.add('video-list__item')
    console.log('viseo:', video);
    li.innerHTML = `
    <article class="video-card">
      <a href="/video.html?id=${video.id}" class="video-card__link">
        <img src="${video.snippet.thumbnails.standard?.url || video.snippet.thumbnails.standard?.height}" alt="Превью видео ${video.snippet.title}" class="video-card__thumbnail">

        <h3 class="video-card__title">${video.snippet.title}</h3>

        <p class="video-card__channel">${video.snippet.channelTitle}</p>

        <p class="video-card__duration">${video.contentDetails.duration}</p>
      </a>
      <button class="video-card__favorite" type="button" aria-label="Добавить в избранное, Филисофия Идущего к реке">
        <svg class="video-card__icon"> 
          <use class="star-o" xlink:href="./image/sprite.svg#star-ob"></use>
          <use class="star" xlink:href="./image/sprite.svg#star"></use>
        </svg>
      </button>
    </article>
    `;

    return li;
  })

  videoListItems.append(...listVideos)
};

fetchTrendingVideos().then(displayVideo)



