'use strict'

// const API_KEY = 'AIzaSyCv7Qck1lm4BfGvY2ywrDw67YwQQYtfYpE'
const API_KEY = 'AIzaSyDAwJrvaHGHQY3MA8a46MbjP9uIB0_oPC4'
const VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/videos'
const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'

const videoListItems = document.querySelector('.video-list__items');

const fixToCorrectTime = (isoDuration) => {
  // let time = ''

  // let arrTime = badTime.slice(2).split('')

  // arrTime.forEach(item => {
  //   if(parseInt(item)) {
  //     time += item
  //   } else if (item == 'H') {
  //     time += 'ч. '
  //   } else if (item == 'M') {
  //     time += 'м. '
  //   } else if (item == 'S') {
  //     time += 'c. '
  //   }
  // });
  
  // console.log(time);
  // return time

  const hoursMatch = isoDuration.match(/(\d+)H/)
  const minutesMatch = isoDuration.match(/(\d+)M/)
  const secondsMatch = isoDuration.match(/(\d+)S/)

  const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0
  const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0
  const seconds = secondsMatch ? parseInt(secondsMatch[1]) : 0

  let res = ''

  if (hours > 0) {
    res += `${hours} ч `
  }

  if (minutes > 0) {
    res += `${minutes} мин `
  }

  if (seconds > 0) {
    res += `${seconds} сек`
  }

  return res.trim()
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

    fixToCorrectTime(video.contentDetails.duration)
    const li = document.createElement('li')
    li.classList.add('video-list__item')
    console.log('viseo:', video);
    li.innerHTML = `
    <article class="video-card">
      <a href="/video.html?id=${video.id}" class="video-card__link">
        <img src="${video.snippet.thumbnails.standard?.url || video.snippet.thumbnails.standard?.height}" alt="Превью видео ${video.snippet.title}" class="video-card__thumbnail">

        <h3 class="video-card__title">${video.snippet.title}</h3>

        <p class="video-card__channel">${video.snippet.channelTitle}</p>

        <p class="video-card__duration">${fixToCorrectTime(video.contentDetails.duration)}</p>
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



