console.log('Connected ')
const latestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const posts = data;
    console.log(posts);
    newPost(posts);
}
latestPost()

const newPost = (posts) => {
    const latestPostContent = document.getElementById('latest-post-content');

    posts.forEach(post => {
        const latestPostInsideContent = document.createElement('div');
        latestPostInsideContent.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
            <figure class="mx-4 mt-4">
                <img
                    src="${post?.cover_image}"
                    alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">
                    <i class="fa-regular fa-calendar-days"></i>${post?.author?.posted_date || 'Date not available'}
                <div class="badge ${post?.author?.posted_date ? 'badge-primary': 'badge-secondary'}">
                    <i class="fa-solid fa-check"></i>
                </div>
                </h2>
                <h2 class="card-title">
                    ${post.title}
                </h2>
                <p>
                    ${post.description}
                </p>
                 <div
                    class="card-actions flex items-center gap-4">
                    <div class="avatar">
                        <div class="w-12 rounded-full">
                            <img
                                src="${post.profile_image}" />
                        </div>
                    </div>
                    <div>
                        <h3
                            class="font-semibold text-base">${post?.author?.name}</h3>
                        <p class="text-xs">${post?.author?.designation || 'No Designation'}</p>
                    </div>
                </div>
            </div>
        </div>   
        `
        latestPostContent.appendChild(latestPostInsideContent);
        // const postedDate = latestPostInsideContent.querySelector('.badge')
        // if (post.author.posted_date) {
        //     postedDate.classList.add('badge-primary')
        //     postedDate.classList.remove('badge-secondary')
        // }
        // else
        // {
        //     postedDate.classList.remove('badge-primary')
        //     postedDate.classList.add('badge-secondary')
        // }
    });

}