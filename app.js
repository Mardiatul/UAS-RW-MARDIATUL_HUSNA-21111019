document.addEventListener("DOMContentLoaded", function () {
  const videoContainer = document.querySelector(".video-container");

  fetch("https://lailyn.github.io/uas-rw-2024/youtube_videos_20.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((video) => {
        const videoElement = document.createElement("div");
        videoElement.classList.add("video");

        videoElement.innerHTML = `
                    <div class="thumbnail">
                        <img src="${video.thumbnail}" alt="Thumbnail">
                    </div>
                    <div class="video-info">
                        <div class="video-title">${video.title}</div>
                        <div class="channel-info">
                            <img src="https://picsum.photos/seed/${
                              video.channel_name
                            }/36/36" alt="Channel Profile Picture">
                            <div class="channel-name">${
                              video.channel_name
                            }</div>
                        </div>
                        <div class="views">${video.views} views</div>
                        <div class="upload-date">${video.upload_date}</div>
                        <div class="show-comments-btn" onclick="toggleComments(this)">Show Comments</div>
                        <div class="comments-section">
                            <h4>Comments</h4>
                            ${video.comments
                              .map(
                                (comment) => `
                                <div class="comment">
                                    <img src="https://picsum.photos/seed/${comment.user}/40/40" alt="User Profile Picture">
                                    <div class="comment-body">
                                        <p><strong>${comment.user}</strong></p>
                                        <p>${comment.comment}</p>
                                        <p>${comment.comment_date} • ${comment.likes} likes</p>
                                    </div>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                `;

        videoContainer.appendChild(videoElement);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function toggleComments(button) {
  const commentsSection = button.nextElementSibling;
  if (commentsSection.style.display === "block") {
    commentsSection.style.display = "none";
    button.textContent = "Show Comments";
  } else {
    commentsSection.style.display = "block";
    button.textContent = "Hide Comments";
  }
}
